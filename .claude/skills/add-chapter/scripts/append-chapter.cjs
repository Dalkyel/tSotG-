#!/usr/bin/env node
// Apply a chapter manifest in a scratch archive; publish only after verification.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');

const [bookArg, chapterArg, baselineArg, specArg, ...options] = process.argv.slice(2);
const book = Number(bookArg), chapter = Number(chapterArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(chapter) && chapter > 0 && baselineArg && specArg,
  'Usage: node append-chapter.cjs BOOK CHAPTER BASELINE_DIR SPEC_FILE [--replace-applied PREVIOUS_SPEC_FILE]');
let previousSpec;
for (let i = 0; i < options.length; i++) {
  if (options[i] === '--replace-applied' && !previousSpec && options[i + 1] && !options[i + 1].startsWith('--')) {
    previousSpec = path.resolve(options[++i]);
  } else assert.fail('Unknown, duplicate or incomplete option');
}
const baseline = path.resolve(baselineArg), spec = JSON.parse(fs.readFileSync(specArg, 'utf8'));
assert.ok(spec.header === undefined || /^\/\/[^\r\n]*$/.test(spec.header), 'header must be a single-line // comment');
assert.ok(Array.isArray(spec.nodes) && Array.isArray(spec.links), 'nodes and links must be arrays (possibly empty)');
assert.ok(spec.summary?.chapter === chapter, 'summary.chapter must match the requested chapter');
const ids = spec.nodes.map(node => node.id);
assert.ok(ids.every(id => typeof id === 'string' && id.trim()), 'Every node needs a nonempty id');
assert.equal(new Set(ids).size, ids.length, 'Duplicate node id in manifest');
assert.ok(spec.nodes.every(node => node.header === undefined), 'Use the manifest header, not per-node headers');
const kinds = ['nodes', 'links', 'summaries'];
const variable = (kind, n) => (kind === 'summaries' ? 'chapterSummaries' : kind) + (n === 1 ? '' : `Book${n}`);
const parse = (source, kind, n) => new Function(source + `;return ${variable(kind, n)};`)();
const root = process.cwd(), originals = new Map();
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'append-chapter-'));
const run = (helper, args) => execFileSync(process.execPath, [path.join(__dirname, helper + '.cjs'), ...args],
  { cwd: scratch, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
try {
  // Copy through the book cap, including earlier-book baselines used by append-node.
  for (let n = 1; n <= book; n++) {
    fs.mkdirSync(path.join(scratch, `book${n}`));
    for (const kind of kinds) {
      const file = `book${n}/${kind}.js`, original = fs.readFileSync(path.join(root, file));
      originals.set(file, original);
      const initial = n === book ? fs.readFileSync(path.join(baseline, `${kind}.js`)) : original;
      if (n === book && !previousSpec) assert.deepEqual(original, initial,
        `${kind}: archive no longer matches the pre-edit baseline; inspect existing work before retrying`);
      fs.writeFileSync(path.join(scratch, file), initial);
    }
  }
  if (previousSpec) {
    // Reproduce the applied manifest from the original baseline before replacing it.
    // Any hand edit, different manifest or later chapter must fail without publishing.
    run('append-chapter', [book, chapter, baseline, previousSpec]);
    for (const kind of kinds) {
      const file = `book${book}/${kind}.js`;
      assert.deepEqual(fs.readFileSync(path.join(scratch, file)), originals.get(file),
        `${kind}: current archive does not exactly match the previous manifest; no chapter files published`);
      fs.copyFileSync(path.join(baseline, `${kind}.js`), path.join(scratch, file));
    }
  }
  for (let i = 0; i < spec.nodes.length; i++) {
    const { id, ...node } = spec.nodes[i];
    const file = path.join(scratch, 'node.json');
    fs.writeFileSync(file, JSON.stringify({ ...node, ...(i === 0 && spec.header ? { header: spec.header } : {}) }));
    run('append-node', [book, id, file]);
  }
  for (const [kind, entries] of [['links', spec.links], ['summaries', [spec.summary]]]) {
    if (!entries.length) continue;
    const file = path.join(scratch, `${kind}.json`);
    fs.writeFileSync(file, JSON.stringify({ header: spec.header, entries }));
    run('append-entries', [book, kind, file]);
  }
  const before = parse(fs.readFileSync(path.join(baseline, 'nodes.js'), 'utf8'), 'nodes', book);
  const after = parse(fs.readFileSync(path.join(scratch, `book${book}/nodes.js`), 'utf8'), 'nodes', book);
  for (const id of ids) assert.equal(after.filter(node => node.id === id).length,
    before.filter(node => node.id === id).length + 1, `${id}: expected exactly one appended revision`);
  const verification = run('verify-chapter', [book, chapter, baseline]);
  // Detect edits since the scratch copy, including earlier-book changes.
  for (const [file, original] of originals) assert.deepEqual(fs.readFileSync(path.join(root, file)), original,
    `${file}: changed during preparation; no chapter files published`);
  const written = [];
  try {
    for (const kind of kinds) {
      const file = `book${book}/${kind}.js`;
      written.push(file);
      fs.writeFileSync(path.join(root, file), fs.readFileSync(path.join(scratch, file)));
    }
  } catch (error) {
    const rollbackErrors = [];
    for (const file of written.reverse()) {
      try { fs.writeFileSync(path.join(root, file), originals.get(file)); }
      catch (restoreError) { rollbackErrors.push(`${file}: ${restoreError.message}`); }
    }
    if (rollbackErrors.length) throw new Error(`${error.message}; restore from ${baseline}: ${rollbackErrors.join('; ')}`);
    throw error;
  }
  console.log(verification.trim());
  console.log(`${previousSpec ? 'REVISED' : 'APPLIED'}: ${ids.length} node revisions (each count +1), ${spec.links.length} links, 1 summary. Semantic review gates remain required.`);
} catch (error) {
  console.error(error.stderr?.toString().trim() || error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}
