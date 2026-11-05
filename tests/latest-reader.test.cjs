const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/read-latest.cjs');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'latest-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const original = { id: 'thread', label: 'Old label', group: 'TRAMA', desc: 'Original history.', star: 'Original clue.' };
  const latest = { ...original, label: 'Current label', type: 'Trama — Partial', status: 'updated',
    previousState: 'Evidence advanced.', desc: 'Original history. New evidence.', star: 'Original clue. New clue.',
    custom: { evidence: 'Retain unknown metadata fields too.' } };
  for (const [book, entries] of [[1, [original]], [2, [{ ...latest, label: 'Superseded revision' }, latest]]]) {
    fs.mkdirSync(path.join(root, `book${book}`));
    fs.writeFileSync(path.join(root, `book${book}/nodes.js`),
      `const ${book === 1 ? 'nodes' : 'nodesBook2'} = ${JSON.stringify(entries)};`);
  }
  return { root, original, latest };
}
function run(root, ...args) {
  return spawnSync(process.execPath, [script, ...args.map(String)], { cwd: root, encoding: 'utf8' });
}
function payload(result) {
  assert.equal(result.status, 0, result.stderr);
  const lines = result.stdout.trimEnd().split('\n');
  return lines.slice(/^(METADATA ONLY|WITHOUT STAR):/.test(lines[1]) ? 2 : 1, -1).join('\n');
}

test('metadata plus complete prose reconstructs the latest entry without losing extra fields or changing files', t => {
  const { root, original, latest } = fixture(t);
  const files = [1, 2].map(b => path.join(root, `book${b}/nodes.js`));
  const before = files.map(f => fs.readFileSync(f, 'utf8'));
  const full = JSON.parse(payload(run(root, 2, 1, 'thread')))[0];
  assert.deepEqual(full, { file: 'book2/nodes.js', node: latest });
  const reduced = run(root, 2, 1, '--metadata', 'thread', 'thread');
  assert.match(reduced.stdout, /METADATA ONLY: desc\/star omitted/);
  const entries = JSON.parse(payload(reduced));
  assert.equal(entries.length, 1);
  const metadata = entries[0].node;
  assert.equal(Object.hasOwn(metadata, 'desc'), false);
  assert.equal(Object.hasOwn(metadata, 'star'), false);
  assert.deepEqual({ ...metadata, desc: latest.desc, star: latest.star }, latest);
  assert.deepEqual(JSON.parse(payload(run(root, 1, 1, 'thread')))[0].node, original);
  assert.deepEqual(files.map(f => fs.readFileSync(f, 'utf8')), before);
});

test('metadata remains paginated and preserves long metadata values in full', t => {
  const { root, latest } = fixture(t);
  latest.previousState = 'Larga nota de mantenimiento. '.repeat(800);
  fs.writeFileSync(path.join(root, 'book2/nodes.js'), `const nodesBook2 = ${JSON.stringify([latest])};`);
  const first = run(root, 2, 1, '--metadata', 'thread');
  const pages = Number(first.stdout.match(/Page 1\/(\d+)/)[1]);
  assert.ok(pages > 1);
  const text = Array.from({ length: pages }, (_, i) => payload(run(root, 2, i + 1, '--metadata', 'thread'))).join('');
  const { desc, star, ...expected } = latest;
  assert.deepEqual(JSON.parse(text), [{ file: 'book2/nodes.js', node: expected }]);
});

test('without-star plus prior star reconstructs the full profile across pages without altering the archive', t => {
  const { root, latest } = fixture(t);
  latest.group = 'ORKA';
  latest.desc = 'Historia y acciones propias. '.repeat(900);
  latest.star = 'Pista ya auditada. '.repeat(700);
  const file = path.join(root, 'book2/nodes.js');
  fs.writeFileSync(file, `const nodesBook2 = ${JSON.stringify([latest])};`);
  const before = fs.readFileSync(file, 'utf8');
  const first = run(root, 2, 1, '--without-star', 'thread');
  assert.match(first.stdout, /WITHOUT STAR: star omitted/);
  const pages = Number(first.stdout.match(/Page 1\/(\d+)/)[1]);
  assert.ok(pages > 1);
  const text = Array.from({ length: pages }, (_, i) => payload(run(root, 2, i + 1, '--without-star', 'thread'))).join('');
  const entries = JSON.parse(text);
  assert.equal(Object.hasOwn(entries[0].node, 'star'), false);
  assert.deepEqual({ ...entries[0].node, star: latest.star }, latest);
  assert.equal(fs.readFileSync(file, 'utf8'), before);
});

test('unknown ids and invalid flags fail without printing partial entry data', t => {
  const { root } = fixture(t);
  const missing = run(root, 2, 1, '--metadata', 'thread', 'absent');
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Unknown ids/);
  assert.equal(missing.stdout, '');
  for (const args of [['--metadata', '--metadata', 'thread'], ['--other', 'thread'], ['--metadata'],
    ['--without-star', '--without-star', 'thread'], ['--metadata', '--without-star', 'thread'],
    ['--without-star', '--metadata', 'thread'], ['--without-star'], ['--without-star', 'thread', 'absent']]) {
    const invalid = run(root, 2, 1, ...args);
    assert.notEqual(invalid.status, 0);
    assert.equal(invalid.stdout, '');
  }
});
