const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const scripts = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts');

function nodes(root, book, entries) {
  fs.mkdirSync(path.join(root, `book${book}`), { recursive: true });
  fs.writeFileSync(path.join(root, `book${book}/nodes.js`),
    `const ${book === 1 ? 'nodes' : `nodesBook${book}`} = ${JSON.stringify(entries)};`);
}
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'backlog-review-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const baseline = path.join(root, 'baseline');
  fs.mkdirSync(baseline);
  const file = path.join(root, 'thread-checklist.json');
  return { root, baseline, file,
    snapshot(book) { fs.copyFileSync(path.join(root, `book${book}/nodes.js`), path.join(baseline, 'nodes.js')); },
    run(book, mode, chapter = 40) {
      return spawnSync(process.execPath, [path.join(scripts, 'review-backlog.cjs'), book, chapter, baseline, mode, file].map(String),
        { cwd: root, encoding: 'utf8' });
    },
    read() { return JSON.parse(fs.readFileSync(file, 'utf8')); },
    save(data) { fs.writeFileSync(file, JSON.stringify(data)); },
  };
}
function assess(data) {
  for (const item of data.items) Object.assign(item, {
    assessment: 'unchanged', evidence: `Chapter 40 supplies no answer to ${item.id}'s question.`,
    remaining: `The question recorded on ${item.id} is still unanswered.`,
  });
  return data;
}

test('checklist selects latest candidates at book cap, leaves assessments pending and never overwrites', t => {
  const f = fixture(t);
  nodes(f.root, 1, [
    { id: 'old', star: 'old clue' }, { id: 'old', star: '' },
    { id: 'clue', star: 'unexplained observation' },
    { id: 'closed', group: 'TRAMA', desc: 'resolved' },
    { id: 'plain', desc: 'ordinary profile' },
  ]);
  nodes(f.root, 2, [{ id: 'spoiler', group: 'TRAMA' }]);
  f.snapshot(1);
  assert.equal(f.run(1, 'init').status, 0);
  const data = f.read();
  assert.deepEqual(data.items.map(i => i.id), ['clue', 'closed']);
  assert.deepEqual(data.items.map(i => i.fields), [['star'], ['desc']]);
  assert.ok(data.items.every(i => i.assessment === null && i.evidence === '' && i.remaining === ''));
  assert.notEqual(f.run(1, 'check').status, 0);
  const before = fs.readFileSync(f.file, 'utf8');
  assert.notEqual(f.run(1, 'init').status, 0);
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
  f.save(assess(data));
  const pass = f.run(1, 'check');
  assert.equal(pass.status, 0, pass.stderr);
  assert.match(pass.stdout, /semantic review.*still required/);
});

test('checklist checks both baseline and current clues, including earlier books and new threads', t => {
  const f = fixture(t);
  nodes(f.root, 1, [{ id: 'earlier', star: 'Book One clue' }]);
  nodes(f.root, 2, [{ id: 'removed', star: 'baseline clue' }, { id: 'both', group: 'TRAMA' }]);
  f.snapshot(2);
  assert.equal(f.run(2, 'init').status, 0);
  f.save(assess(f.read()));
  nodes(f.root, 2, [{ id: 'removed', star: '' }, { id: 'both', group: 'TRAMA', star: 'new clue' },
    { id: 'new', group: 'TRAMA' }]);
  const missing = f.run(2, 'check');
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Missing candidate: new/);
  assert.match(missing.stderr, /Missing evidence field star: both/);
  const data = f.read();
  data.items.find(i => i.id === 'both').fields.push('star');
  data.items.push({ id: 'new', fields: ['desc'] });
  f.save(assess(data));
  assert.equal(f.run(2, 'check').status, 0);
  data.items = data.items.filter(i => i.id !== 'removed');
  f.save(data);
  assert.match(f.run(2, 'check').stderr, /Missing candidate: removed/);
});

test('checklist rejects duplicate IDs, unknown IDs, placeholders and mismatched run metadata', t => {
  const f = fixture(t);
  nodes(f.root, 1, [{ id: 'question', group: 'TRAMA', star: 'evidence' }]);
  f.snapshot(1);
  assert.equal(f.run(1, 'init').status, 0);
  const good = assess(f.read());
  const variants = [
    [data => data.items.push({ ...data.items[0] }), /Duplicate id/],
    [data => data.items.push({ ...data.items[0], id: 'unknown' }), /Unknown candidate/],
    [data => data.items[0].assessment = 'pending', /Unassessed\/invalid outcome/],
    [data => data.items[0].evidence = 'TODO', /Missing evidence/],
    [data => data.items[0].remaining = '', /Missing remaining question/],
    [data => data.items[0].fields = ['star'], /Missing evidence field desc/],
    [data => data.chapter++, /does not match this run/],
    [data => data.book++, /does not match this run/],
    [data => data.baseline += '-other', /does not match this run/],
  ];
  for (const [mutate, expected] of variants) {
    const data = structuredClone(good);
    mutate(data); f.save(data);
    const result = f.run(1, 'check');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, expected);
  }
});

test('checklist sync preserves notes and baseline-only clues, adds pending rows and reopens expanded fields', t => {
  const f = fixture(t);
  nodes(f.root, 1, [{ id: 'removed', star: 'old clue' }, { id: 'both', group: 'TRAMA' },
    { id: 'unchanged', group: 'TRAMA' }]);
  f.snapshot(1);
  assert.equal(f.run(1, 'init').status, 0);
  f.save(assess(f.read()));
  const before = f.read();
  nodes(f.root, 1, [{ id: 'removed', star: '' }, { id: 'both', group: 'TRAMA', star: 'new clue' },
    { id: 'unchanged', group: 'TRAMA' }, { id: 'new', group: 'TRAMA', star: 'new evidence' }]);
  const sync = f.run(1, 'sync');
  assert.equal(sync.status, 0, sync.stderr);
  assert.match(sync.stdout, /1 new candidates; 1 expanded evidence fields/);
  const data = f.read();
  for (const id of ['removed', 'unchanged'])
    assert.deepEqual(data.items.find(i => i.id === id), before.items.find(i => i.id === id));
  const expanded = data.items.find(i => i.id === 'both');
  assert.deepEqual(expanded.fields, ['desc', 'star']);
  assert.equal(expanded.assessment, null);
  assert.equal(expanded.evidence, before.items.find(i => i.id === 'both').evidence);
  assert.equal(expanded.remaining, before.items.find(i => i.id === 'both').remaining);
  assert.deepEqual(data.items.find(i => i.id === 'new'), {
    id: 'new', fields: ['desc', 'star'], assessment: null, evidence: '', remaining: '',
  });
  assert.notEqual(f.run(1, 'check').status, 0);
  const bytes = fs.readFileSync(f.file, 'utf8');
  assert.equal(f.run(1, 'sync').status, 0);
  assert.equal(fs.readFileSync(f.file, 'utf8'), bytes);
  f.save(assess(data));
  assert.equal(f.run(1, 'check').status, 0);
  for (const mutate of [d => d.chapter++, d => d.items.push({ ...d.items[0] }),
    d => d.items.push({ id: 'unknown', fields: [] })]) {
    const bad = structuredClone(data); mutate(bad); f.save(bad);
    const original = fs.readFileSync(f.file, 'utf8');
    assert.notEqual(f.run(1, 'sync').status, 0);
    assert.equal(fs.readFileSync(f.file, 'utf8'), original);
  }
});

test('rebuild checklist resolves caller paths, stays staged and forbids reference writes', t => {
  const f = fixture(t);
  fs.copyFileSync(path.resolve(__dirname, '../mapa-core.js'), path.join(f.root, 'mapa-core.js'));
  const local = path.join(f.root, '.claude/skills/add-chapter/scripts');
  fs.mkdirSync(local, { recursive: true });
  for (const name of ['rebuild', 'review-backlog', 'backlog-data'])
    fs.copyFileSync(path.join(scripts, `${name}.cjs`), path.join(local, `${name}.cjs`));
  nodes(f.root, 1, [{ id: 'live-spoiler', group: 'TRAMA' }]);
  const stage = path.join(f.root, 'book1/rebuild');
  nodes(stage, 1, [{ id: 'staged', group: 'TRAMA' }]);
  nodes(path.join(stage, 'reference'), 1, [{ id: 'reference-spoiler', group: 'TRAMA' }]);
  fs.copyFileSync(path.join(stage, 'book1/nodes.js'), path.join(f.baseline, 'nodes.js'));
  const run = (...prefix) => spawnSync(process.execPath, [path.join(local, 'rebuild.cjs'), ...prefix,
    'review-backlog', '40', 'baseline', 'init', 'thread-checklist.json'], { cwd: f.root, encoding: 'utf8' });
  assert.equal(run().status, 0);
  assert.deepEqual(f.read().items.map(i => i.id), ['staged']);
  fs.unlinkSync(f.file);
  assert.notEqual(run('--reference').status, 0);
  assert.equal(fs.existsSync(f.file), false);
});


test('large incomplete checklists fail with bounded diagnostics without changing evidence', t => {
  const f = fixture(t);
  nodes(f.root, 1, Array.from({ length: 100 }, (_, i) => ({
    id: `question-${i}`, group: 'TRAMA', desc: `Unresolved question ${i}`,
  })));
  f.snapshot(1);
  assert.equal(f.run(1, 'init').status, 0);
  const before = fs.readFileSync(f.file, 'utf8');
  const incomplete = f.run(1, 'check');
  assert.notEqual(incomplete.status, 0);
  assert.match(incomplete.stderr, /300 checklist errors/);
  assert.match(incomplete.stderr, /Unassessed\/invalid outcome: question-0/);
  assert.match(incomplete.stderr, /276 additional errors omitted/);
  assert.match(incomplete.stderr, /read-checklist\.cjs/);
  assert.ok(incomplete.stderr.split('\n').length < 30);
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
  const reviewed = assess(f.read());
  // A problem beyond the displayed first batch still blocks completion.
  reviewed.items.at(-1).remaining = '';
  f.save(reviewed);
  assert.match(f.run(1, 'check').stderr, /Missing remaining question or explicit none: question-99/);
  f.save(assess(reviewed));
  assert.equal(f.run(1, 'check').status, 0);
});
