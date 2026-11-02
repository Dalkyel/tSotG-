const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rebuild-completion-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const scripts = path.join(root, '.claude/skills/add-chapter/scripts');
  const stage = path.join(root, 'book1/rebuild');
  const run = path.join(root, 'run with spaces');
  const baseline = path.join(run, 'baseline');
  for (const dir of [scripts, path.join(stage, 'book1'), baseline, path.join(root, 'book2')])
    fs.mkdirSync(dir, { recursive: true });
  for (const file of ['rebuild.cjs', 'finish-rebuild-chapter.cjs'])
    fs.copyFileSync(path.resolve(__dirname, '../.claude/skills/add-chapter/scripts', file), path.join(scripts, file));
  fs.writeFileSync(path.join(scripts, 'verify-chapter.cjs'), 'console.log("VERIFIER-RAN");');
  const liveHashes = {};
  for (const book of [1, 2]) for (const kind of ['nodes', 'links', 'summaries']) {
    const file = `book${book}/${kind}.js`;
    fs.writeFileSync(path.join(root, file), 'live');
    liveHashes[file] = createHash('sha256').update('live').digest('hex');
  }
  fs.writeFileSync(path.join(root, 'book1/chapter 2.xhtml'), '<html>source</html>');
  const progressFile = path.join(stage, 'progress.json');
  const readmeFile = path.join(stage, 'README.md');
  fs.writeFileSync(progressFile, JSON.stringify({ completedChapters: [1], source: 'book1/chapter 1.xhtml', liveHashes, extra: 'preserve' }));
  fs.writeFileSync(readmeFile, '# Rebuild\n\nCompleted: Chapters 1–1. Latest source: `../chapter 1.xhtml`.\n\nChapter 1: Prior log.\n');
  fs.writeFileSync(path.join(baseline, 'summaries.js'), 'const chapterSummaries = [{chapter:1}];');
  fs.writeFileSync(path.join(stage, 'book1/summaries.js'), 'const chapterSummaries = [{chapter:1},{chapter:2}];');
  for (const [file, marker] of [['ownership-review.md', 'Ownership review: PASS'], ['event-review.md', 'Event coverage review: PASS'], ['thread-review.md', 'Thread lifecycle review: PASS']])
    fs.writeFileSync(path.join(run, file), `# Chapter 2\n\nReviewed evidence.\n\n${marker}\n`);
  const spec = path.join(run, 'completion.json');
  fs.writeFileSync(spec, JSON.stringify({ source: 'book1/chapter 2.xhtml', log: 'Chapter 2: Spanish content verified — revisión completa.' }));
  const invoke = (...args) => spawnSync(process.execPath, [path.join(scripts, 'rebuild.cjs'), ...args], { cwd: root, encoding: 'utf8' });
  return { root, scripts, stage, run, baseline, progressFile, readmeFile, spec,
    invoke, finish: () => invoke('finish-chapter', '2', path.relative(root, baseline), path.relative(root, spec)),
    snapshot: () => [readmeFile, progressFile].map(file => fs.readFileSync(file, 'utf8')) };
}

test('rebuild completion verifies then synchronizes metadata, preserving history and rejecting retries', t => {
  const f = fixture(t), before = f.snapshot();
  const result = f.finish();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /VERIFIER-RAN/);
  const p = JSON.parse(fs.readFileSync(f.progressFile));
  assert.deepEqual(p.completedChapters, [1, 2]);
  assert.equal(p.source, 'book1/chapter 2.xhtml');
  assert.equal(fs.realpathSync(p.baseline), fs.realpathSync(f.baseline));
  assert.equal(p.extra, 'preserve');
  assert.deepEqual(p.liveHashes, JSON.parse(before[1]).liveHashes);
  const readme = fs.readFileSync(f.readmeFile, 'utf8');
  assert.match(readme, /Completed: Chapters 1–2/);
  assert.match(readme, /Chapter 1: Prior log\./);
  assert.match(readme, /Chapter 2: Spanish content verified — revisión completa\./);
  const after = f.snapshot();
  assert.notEqual(f.finish().status, 0);
  assert.deepEqual(f.snapshot(), after);
});

test('rebuild completion requires each semantic gate attestation before writing', t => {
  const f = fixture(t), before = f.snapshot();
  for (const file of ['ownership-review.md', 'event-review.md', 'thread-review.md']) {
    const target = path.join(f.run, file), saved = fs.readFileSync(target);
    fs.writeFileSync(target, 'Pending review; do not record PASS yet');
    assert.notEqual(f.finish().status, 0, file);
    assert.deepEqual(f.snapshot(), before);
    fs.writeFileSync(target, saved);
  }
});

test('rebuild completion blocks drift in README, progress and baseline or staged chapter lists', t => {
  const f = fixture(t);
  for (const [file, mutate] of [
    [f.readmeFile, s => s.replace('Chapters 1–1', 'Chapters 1–0')],
    [f.readmeFile, s => s.replace('Chapter 1: Prior log.', '')],
    [f.readmeFile, s => s + '\nChapter 1: Duplicate.\n'],
    [f.progressFile, s => s.replace('chapter 1.xhtml', 'chapter 0.xhtml')],
    [path.join(f.baseline, 'summaries.js'), () => 'const chapterSummaries = [];'],
    [path.join(f.stage, 'book1/summaries.js'), () => 'const chapterSummaries = [{chapter:1},{chapter:3}];'],
  ]) {
    const saved = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, mutate(saved));
    const before = f.snapshot();
    assert.notEqual(f.finish().status, 0, file);
    assert.deepEqual(f.snapshot(), before);
    fs.writeFileSync(file, saved);
  }
});

test('rebuild completion blocks failed verification and changed live files', t => {
  const f = fixture(t), before = f.snapshot();
  const verifier = path.join(f.scripts, 'verify-chapter.cjs');
  fs.writeFileSync(verifier, 'process.exit(1);');
  assert.notEqual(f.finish().status, 0);
  assert.deepEqual(f.snapshot(), before);
  fs.writeFileSync(verifier, 'console.log("VERIFIER-RAN");');
  fs.appendFileSync(path.join(f.root, 'book2/nodes.js'), 'changed');
  const changed = f.finish();
  assert.notEqual(changed.status, 0);
  assert.match(changed.stderr, /Live archive changed/);
  assert.doesNotMatch(changed.stdout, /VERIFIER-RAN/);
  assert.deepEqual(f.snapshot(), before);
});

test('rebuild completion rejects mismatched source, multiline logs and reference writes', t => {
  const f = fixture(t), before = f.snapshot();
  for (const spec of [
    { source: 'book1/chapter 3.xhtml', log: 'Chapter 2: Wrong source.' },
    { source: 'book1/chapter 2.xhtml', log: 'Chapter 2: First.\nChapter 3: Injected.' },
  ]) {
    fs.writeFileSync(f.spec, JSON.stringify(spec));
    assert.notEqual(f.finish().status, 0);
    assert.deepEqual(f.snapshot(), before);
  }
  assert.notEqual(f.invoke('--reference', 'finish-chapter', '2', f.baseline, f.spec).status, 0);
});

test('rebuild completion restores both metadata files if the second write fails', t => {
  const f = fixture(t), before = f.snapshot();
  const hook = path.join(f.root, 'fail-write.cjs');
  fs.writeFileSync(hook, `
    const fs = require('node:fs');
    const write = fs.writeFileSync;
    let failed = false;
    fs.writeFileSync = function(file, ...args) {
      if (!failed && String(file) === ${JSON.stringify(fs.realpathSync(f.progressFile))}) {
        failed = true;
        throw new Error('simulated metadata write failure');
      }
      return write.call(this, file, ...args);
    };
  `);
  const result = spawnSync(process.execPath,
    ['--require', hook, path.join(f.scripts, 'finish-rebuild-chapter.cjs'), '1', '2', f.baseline, f.spec],
    { cwd: f.root, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /simulated metadata write failure/);
  assert.deepEqual(f.snapshot(), before);
});
