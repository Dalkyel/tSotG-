#!/usr/bin/env node
// Reprocess Book Two through an isolated chronological context, then replace the
// reviewed live prefix while retaining and rebasing every unreviewed later chapter.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const A = require('./archive-records.cjs'), { rebase } = require('./rebase-archive.cjs');
const kinds = ['nodes', 'links', 'summaries'];
const readers = ['match-entities', 'search-descriptions', 'read-latest', 'read-links', 'read-backlog', 'check-chapter'];
const helpers = [...readers, 'review-backlog', 'append-chapter', 'append-node', 'append-entries', 'verify-chapter'];
// Keep semantic evidence after the OS removes the temporary drafting context.
function collectReviewEvidence(root, chapter, run, completion) {
  assert.ok(Number.isInteger(chapter) && chapter > 0, 'Invalid review chapter');
  const directory = `book2/rebuild/reviews/chapter-${chapter}`;
  const files = new Map(), hashes = {};
  for (const name of ['ownership-review.md', 'event-review.md', 'thread-review.md', 'thread-checklist.json', 'completion.json', 'chapter.json']) {
    const source = name === 'completion.json' ? completion : path.join(run, name);
    if (name === 'chapter.json' && !fs.existsSync(source)) continue; // Individual appenders need no batch manifest.
    const destination = path.join(root, directory, name);
    assert.ok(!fs.existsSync(destination), `Review evidence already exists: ${destination}`);
    const bytes = fs.readFileSync(source);
    files.set(destination, bytes); hashes[name] = A.hash(bytes);
  }
  return { files, record: { directory, hashes } };
}
function validateCombined(one, two, root) {
  const ids = new Set(one.nodes.map(x => x.value.id));
  for (const data of [one, two]) {
    data.nodes.forEach(x => ids.add(x.value.id));
    for (const { value: link } of data.links) assert.ok(ids.has(link.source) && ids.has(link.target), `Unresolved endpoint: ${link.source} → ${link.target}`);
    const chapters = data.summaries.map(x => x.value.chapter);
    assert.deepEqual(chapters, [...new Set(chapters)].sort((a, b) => a - b), 'Summary chapters must be unique and ordered');
  }
  const revisions = [...one.nodes, ...two.nodes].map(x => x.value);
  const core = require(path.join(root, 'characters-core.js'));
  const guideFile = path.join(root, 'characters-data.js');
  const guides = fs.existsSync(guideFile) ? new Function(fs.readFileSync(guideFile, 'utf8') + ';return CHARACTER_GUIDES;')() : {};
  const matcher = core.buildMentionMatcher([...new Map(revisions.map(n => [n.id, n])).values()], revisions, guides);
  for (const data of [one, two]) for (const { value: summary } of data.summaries) {
    for (const [, term] of summary.summary.matchAll(/<strong>(.*?)<\/strong>/g)) {
      const matches = core.findMentions(term, matcher);
      assert.ok(matches.length === 1 && matches[0].text === term, `Chapter ${summary.chapter}: unresolved summary term ${term}`);
    }
  }
}
function compose(one, reference, reviewed, chapter) {
  const front = Object.fromEntries(kinds.map(k => [k, reference[k].filter(x => x.chapter === 0)]));
  const oldBase = A.latest([...one.nodes, ...reference.nodes.filter(x => x.chapter <= chapter)]);
  const newBase = A.latest([...one.nodes, ...front.nodes, ...reviewed.nodes]);
  return {
    nodes: [...front.nodes, ...reviewed.nodes, ...rebase(reference.nodes.filter(x => x.chapter > chapter), oldBase, newBase)],
    links: [...front.links, ...reviewed.links, ...reference.links.filter(x => x.chapter > chapter)],
    summaries: [...reviewed.summaries, ...reference.summaries.filter(x => x.chapter > chapter)],
  };
}
function effectiveReference(stateRoot, state) {
  const reference = A.loadBook(path.join(stateRoot, 'reference'), 2);
  for (const [kind, hash] of Object.entries(state.reconciledHashes ?? {})) {
    assert.ok(['nodes', 'links'].includes(kind), 'Unsupported reconciled record kind');
    const file = path.join(stateRoot, `reconciled/book2/${kind}.js`);
    assert.equal(A.hash(fs.readFileSync(file)), hash, 'Reconciled later records changed outside reconciliation');
    reference[kind] = A.read(path.join(stateRoot, 'reconciled'), 2, kind);
  }
  return reference;
}
function reconcileLater(root, stateRoot, state, stateText, progressFile, args) {
  assert.equal(args.length, 1, 'Usage: reprocess.cjs reconcile-later SPEC.json');
  const spec = JSON.parse(fs.readFileSync(path.resolve(args[0]), 'utf8'));
  assert.ok(typeof spec.log === 'string' && spec.log.trim(), 'Supply a reconciliation log');
  assert.ok(['nodes','links'].some(k => Array.isArray(spec[k]) && spec[k].length), 'Supply explicit before/after records');
  const actualHashes = A.hashes(root);
  assert.deepEqual(actualHashes, spec.liveHashes, 'Live archive changed since reconciliation review');
  for (const file of Object.keys(state.liveHashes).filter(file => !['book2/nodes.js','book2/links.js'].includes(file)))
    assert.equal(actualHashes[file], state.liveHashes[file], 'Only later Book Two node/link edits can be reconciled');
  const reference = effectiveReference(stateRoot, state), one = A.loadBook(root, 1);
  const reviewed = A.loadBook(path.join(stateRoot, 'reviewed'), 2), cap = state.completedChapters.length;
  for (const change of [...(spec.nodes ?? []), ...(spec.links ?? [])])
    assert.ok(change.chapter > cap, 'Cannot reconcile the reviewed prefix or front matter');
  const expected = cap ? compose(one, reference, reviewed, cap) : structuredClone(reference);
  const live = A.loadBook(root, 2), changes = new Map();
  let count = 0;
  for (const kind of ['nodes','links']) {
    assert.equal(A.hash(A.render(expected[kind], kind, 2)), state.liveHashes[`book2/${kind}.js`], `Cannot reconstruct expected live ${kind}`);
    assert.equal(live[kind].length, expected[kind].length, 'Reconciliation cannot add or remove records');
    const changed = new Set();
    for (const change of spec[kind] ?? []) {
      const i = change.index;
      assert.ok(Number.isInteger(i) && i >= 0 && i < expected[kind].length && !changed.has(i), 'Invalid or duplicate record index');
      changed.add(i);
      assert.ok(expected[kind][i].chapter > cap, 'Cannot reconcile the reviewed prefix or front matter');
      assert.equal(change.chapter, expected[kind][i].chapter, 'Chapter ownership differs');
      assert.equal(live[kind][i].chapter, change.chapter, 'Live chapter ownership changed');
      assert.deepEqual(change.before, expected[kind][i].value, 'Before record does not match expected archive');
      assert.deepEqual(change.after, live[kind][i].value, 'After record does not match live archive');
      assert.notDeepEqual(change.before, change.after, 'Reconciliation record is unchanged');
      const ordinal = expected[kind].slice(0, i).filter(x => x.chapter === change.chapter).length;
      const target = reference[kind].filter(x => x.chapter === change.chapter)[ordinal];
      assert.ok(target, 'Missing reference record');
      target.value = change.after;
    }
    expected[kind].forEach((record, i) => {
      if (!changed.has(i)) {
        assert.equal(live[kind][i].chapter, record.chapter, 'Unreviewed chapter move');
        assert.deepEqual(live[kind][i].value, record.value, 'Unreviewed node/link change');
      }
    });
    if (changed.size) {
      const text = A.render(reference[kind], kind, 2);
      changes.set(path.join(stateRoot, `reconciled/book2/${kind}.js`), text);
      state.reconciledHashes ??= {}; state.reconciledHashes[kind] = A.hash(text);
      count += changed.size;
    }
  }
  const recomposed = cap ? compose(one, reference, reviewed, cap) : reference;
  for (const kind of ['nodes','links'])
    assert.equal(A.hash(A.render(recomposed[kind], kind, 2)), actualHashes[`book2/${kind}.js`], 'Reconciled records do not reproduce the live archive');
  validateCombined(one, live, root);
  const audit = `reconciliations/${(state.reconciliations?.length ?? 0) + 1}.json`;
  state.reconciliations ??= [];
  state.reconciliations.push({ file: audit, log: spec.log, chapters: [...new Set([...(spec.nodes ?? []), ...(spec.links ?? [])].map(x => x.chapter))], liveHashes: actualHashes });
  state.liveHashes = actualHashes;
  changes.set(path.join(stateRoot, audit), JSON.stringify(spec, null, 2) + '\n');
  changes.set(progressFile, JSON.stringify(state, null, 2) + '\n');
  assert.deepEqual(A.hashes(root), actualHashes, 'Live archive changed during reconciliation');
  assert.equal(fs.readFileSync(progressFile, 'utf8'), stateText, 'Progress changed during reconciliation');
  A.writeTransaction(changes);
  console.log(`RECONCILED: ${count} later records preserved; immutable reference, live files and active chapter context unchanged.`);
}
function main(argv, root = path.resolve(__dirname, '../../../..')) {
  const stateRoot = path.join(root, 'book2/rebuild'), progressFile = path.join(stateRoot, 'progress.json');
  const [command, ...args] = argv;
  if (command === 'init') {
    assert.equal(args.length, 0); assert.ok(!fs.existsSync(progressFile), 'Book Two reprocessing is already initialized');
    validateCombined(A.loadBook(root, 1), A.loadBook(root, 2), root);
    const changes = new Map();
    for (const book of [1, 2]) for (const kind of kinds) changes.set(path.join(stateRoot, `reference/book${book}/${kind}.js`), fs.readFileSync(path.join(root, `book${book}/${kind}.js`)));
    for (const kind of kinds) changes.set(path.join(stateRoot, `reviewed/book2/${kind}.js`), A.render([], kind, 2));
    changes.set(progressFile, JSON.stringify({ status: 'ready', book: 2, completedChapters: [], chapters: [], liveHashes: A.hashes(root), referenceHashes: A.hashes(root), reviewedHashes: Object.fromEntries(kinds.map(k => [k, A.hash(A.render([], k, 2))])), visibility: 'keep-all-chapters' }, null, 2) + '\n');
    A.writeTransaction(changes); console.log('READY: Book Two reference backed up; 0 reprocessed chapters. All live chapters remain visible.'); return;
  }
  const stateText = fs.readFileSync(progressFile, 'utf8'), state = JSON.parse(stateText);
  assert.deepEqual(state.completedChapters, Array.from({ length: state.completedChapters.length }, (_, i) => i + 1), 'Nonconsecutive Book Two progress');
  assert.deepEqual(A.hashes(path.join(stateRoot, 'reference')), state.referenceHashes, 'Immutable Book Two reference changed');
  for (const kind of kinds) assert.equal(A.hash(fs.readFileSync(path.join(stateRoot, `reviewed/book2/${kind}.js`))), state.reviewedHashes[kind], 'Reviewed prefix changed outside completion');
  if (command === 'reconcile-later') return reconcileLater(root, stateRoot, state, stateText, progressFile, args);
  assert.deepEqual(A.hashes(root), state.liveHashes, 'Live archive changed outside reprocessing; reconcile explicitly before continuing');
  effectiveReference(stateRoot, state);
  const next = state.completedChapters.length + 1;
  if (command === 'status') {
    assert.equal(args.length, 0, 'Usage: reprocess.cjs status');
    console.log(JSON.stringify({
      status: state.status,
      completedCount: state.completedChapters.length,
      nextChapter: state.status === 'complete' ? null : next,
      visibleChapters: A.loadBook(root, 2).summaries.length,
      active: state.active ? {
        chapter: state.active.chapter, source: state.active.source,
        run: state.active.run, baseline: state.active.baseline,
      } : null,
    }, null, 2));
    return;
  }
  if (command === 'check-chapter') {
    assert.equal(args.length, 1); assert.equal(Number(args[0]), next, 'Reprocess chapters consecutively; inspect completed work rather than duplicating it');
    console.log(`Book Two: ${next - 1} reprocessed chapters; next: ${next}; all ${A.loadBook(root, 2).summaries.length} live chapters visible.`); return;
  }
  if (command === 'prepare') {
    assert.equal(args.length, 2, 'Usage: reprocess.cjs prepare CHAPTER SOURCE');
    assert.equal(Number(args[0]), next, 'Complete Book Two chapters in order'); assert.ok(!state.active, 'An active run already exists; continue it instead of taking a new baseline');
    const source = path.resolve(root, args[1]); assert.ok(fs.statSync(source).isFile(), 'Missing source chapter');
    const run = fs.mkdtempSync(path.join(os.tmpdir(), `reprocess.book2ch${next}.`));
    fs.mkdirSync(path.join(run, 'baseline')); fs.mkdirSync(path.join(run, 'context/book1'), { recursive: true }); fs.mkdirSync(path.join(run, 'context/book2'));
    for (const kind of kinds) {
      fs.copyFileSync(path.join(root, `book1/${kind}.js`), path.join(run, `context/book1/${kind}.js`));
      for (const dir of ['baseline', 'context/book2']) fs.copyFileSync(path.join(stateRoot, `reviewed/book2/${kind}.js`), path.join(run, dir, `${kind}.js`));
    }
    state.active = { chapter: next, run, baseline: path.join(run, 'baseline'), source: path.relative(root, source), sourceHash: A.hash(fs.readFileSync(source)) };
    A.writeTransaction(new Map([[progressFile, JSON.stringify(state, null, 2) + '\n']]));
    console.log(`PREPARED: ${run}\nBaseline: ${state.active.baseline}\nSource context: reviewed Book Two prefix only. Live files unchanged.`); return;
  }
  if (command === '--reference') {
    const helper = args.shift(); assert.ok(readers.includes(helper), 'Reference mode is read-only');
    return child(helper, args, path.join(stateRoot, 'reference'));
  }
  const active = state.active; assert.ok(active && active.chapter === next, 'Prepare the next chapter first');
  assert.equal(A.hash(fs.readFileSync(path.resolve(root, active.source))), active.sourceHash, 'Chapter source changed during the run');
  const context = path.join(active.run, 'context');
  for (const kind of kinds) {
    assert.equal(A.hash(fs.readFileSync(path.join(context, `book1/${kind}.js`))), state.liveHashes[`book1/${kind}.js`], 'Book One context changed');
    assert.equal(A.hash(fs.readFileSync(path.join(active.baseline, `${kind}.js`))), state.reviewedHashes[kind], 'Chapter baseline changed');
  }
  if (command === 'finish-chapter') {
    assert.equal(args.length, 2, 'Usage: reprocess.cjs finish-chapter CHAPTER COMPLETION.json'); assert.equal(Number(args[0]), next);
    const spec = JSON.parse(fs.readFileSync(path.resolve(args[1]), 'utf8'));
    assert.equal(spec.source, active.source, 'Completion must name the prepared source');
    assert.ok(typeof spec.log === 'string' && spec.log.startsWith(`Chapter ${next}: `) && !/[\r\n]/.test(spec.log), 'Supply one Chapter N: log paragraph');
    for (const [file, marker] of [['ownership-review.md', 'Ownership review: PASS'], ['event-review.md', 'Event coverage review: PASS'], ['thread-review.md', 'Thread lifecycle review: PASS']]) {
      assert.ok(fs.readFileSync(path.join(active.run, file), 'utf8').split(/\r?\n/).some(line => line.trim() === marker), `Missing ${marker}`);
    }
    child('verify-chapter', [next, active.baseline, '--staged-preview'], context);
    child('review-backlog', [next, active.baseline, 'check', path.join(active.run, 'thread-checklist.json')], context);
    const one = A.loadBook(root, 1), reference = effectiveReference(stateRoot, state), reviewed = A.loadBook(context, 2);
    assert.deepEqual(reviewed.summaries.map(x => x.value.chapter), [...state.completedChapters, next], 'Reviewed summaries do not match progress');
    const live = compose(one, reference, reviewed, next); validateCombined(one, live, root);
    const changes = new Map();
    for (const kind of kinds) {
      const text = fs.readFileSync(path.join(context, `book2/${kind}.js`));
      changes.set(path.join(stateRoot, `reviewed/book2/${kind}.js`), text);
      changes.set(path.join(root, `book2/${kind}.js`), A.render(live[kind], kind, 2)); state.reviewedHashes[kind] = A.hash(text);
    }
    const evidence = collectReviewEvidence(root, next, active.run, path.resolve(args[1]));
    for (const [file, bytes] of evidence.files) changes.set(file, bytes);
    state.completedChapters.push(next); state.chapters.push({ chapter: next, source: active.source, sourceHash: active.sourceHash, run: active.run, reviews: evidence.record, log: spec.log });
    state.status = next === reference.summaries.at(-1)?.value.chapter ? 'complete' : 'in-progress'; delete state.active;
    for (const kind of kinds) state.liveHashes[`book2/${kind}.js`] = A.hash(changes.get(path.join(root, `book2/${kind}.js`)));
    changes.set(progressFile, JSON.stringify(state, null, 2) + '\n');
    assert.deepEqual(A.hashes(root), JSON.parse(stateText).liveHashes, 'Live archive changed during verification');
    assert.equal(fs.readFileSync(progressFile, 'utf8'), stateText, 'Progress changed during verification');
    A.writeTransaction(changes); console.log(`COMPLETE: Book Two chapter ${next} replaced in live files; ${live.summaries.length} chapters remain visible.`); return;
  }
  assert.ok(helpers.includes(command), 'Unknown Book Two helper');
  const fileArgs = command === 'review-backlog' ? [1, 3] : command === 'append-chapter' ? [1, 2] : ['append-node', 'append-entries', 'verify-chapter'].includes(command) ? [1] : [];
  fileArgs.forEach(i => { if (args[i]) args[i] = path.resolve(args[i]); });
  if (command === 'append-chapter') { const i = args.indexOf('--replace-applied'); if (i !== -1 && args[i + 1]) args[i + 1] = path.resolve(args[i + 1]); }
  if (['append-chapter', 'verify-chapter'].includes(command)) args.push('--staged-preview');
  return child(command, args, context);
}
function child(helper, args, cwd) {
  const result = spawnSync(process.execPath, [path.join(__dirname, helper + '.cjs'), '2', ...args.map(String)],
    { cwd, env: { ...process.env, ADD_CHAPTER_STAGED: '1' }, stdio: 'inherit' });
  if (result.error) throw result.error; assert.equal(result.status, 0, `${helper} failed; live completion not published`);
}
if (require.main === module) { try { main(process.argv.slice(2)); } catch (error) { console.error('Book Two reprocessing failed: ' + error.message); process.exitCode = 1; } }
module.exports = { main, compose, validateCombined, collectReviewEvidence };
