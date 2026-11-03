const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/read-checklist.cjs');

function fixture(t, items) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'checklist-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, 'archived.json');
  const data = { book: 2, chapter: 10, baseline: '/missing/expired-baseline', items };
  fs.writeFileSync(file, JSON.stringify(data));
  return { file, data, run: (...args) => spawnSync(process.execPath, [script, file, ...args].map(String),
    { cwd: root, encoding: 'utf8' }) };
}
function payload(result) {
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.split('\n').slice(3, -2).join('\n');
}

test('saved checklist pages preserve all fields and evidence without a baseline or archive', t => {
  const f = fixture(t, [{ id: 'long', fields: ['desc', 'star'], assessment: null,
    evidence: 'Primera pista. '.repeat(1800) + '🐺'.repeat(8001) + 'Última pista.', remaining: 'Pregunta pendiente.' },
  { id: 'closed', assessment: 'closed-history', evidence: 'Testimonio atribuido.', remaining: 'none' }]);
  const before = fs.readFileSync(f.file, 'utf8');
  const first = f.run(1);
  const pages = Number(first.stdout.match(/Page 1\/(\d+)/)[1]);
  assert.ok(pages > 1);
  const chunks = [];
  for (let p = 1; p <= pages; p++) {
    const result = f.run(p); const chunk = payload(result);
    assert.ok(chunk.length <= 8000); chunks.push(chunk);
    assert.match(result.stdout, p === pages ? /END:/ : /CONTINUES:/);
  }
  assert.deepEqual(JSON.parse(chunks.join('')), f.data.items);
  assert.match(first.stdout, /no archive\/source validation or semantic PASS/);
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
});

test('targeted checklist reads retain stored order, fail unknown IDs and never mutate notes', t => {
  const f = fixture(t, [{ id: 'one', evidence: 'Uno' }, { id: 'two', evidence: 'Dos' }, { id: 'three', evidence: 'Tres' }]);
  const before = fs.readFileSync(f.file, 'utf8');
  assert.deepEqual(JSON.parse(payload(f.run(1, 'three', 'one'))), [f.data.items[0], f.data.items[2]]);
  for (const args of [[0], [1.5], [99], [1, 'unknown'], [1, 'one', 'one'], [1, '--pending']])
    assert.notEqual(f.run(...args).status, 0);
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
  f.data.items.push({ id: 'one' }); fs.writeFileSync(f.file, JSON.stringify(f.data));
  assert.match(f.run(1).stderr, /duplicate checklist id/);
});
