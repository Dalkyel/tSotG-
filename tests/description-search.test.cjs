const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const helper = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/search-descriptions.cjs');
function fixture(t, nodes) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'description-search-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'book1'));
  fs.writeFileSync(path.join(root, 'book1/nodes.js'), `const nodes = ${JSON.stringify(nodes)};`);
  return (...args) => spawnSync(process.execPath, [helper, '1', '1', ...args.map(String)],
    { cwd: root, encoding: 'utf8' });
}
test('description search limits excerpts per id and reports omitted evidence', t => {
  const desc = `LIBRO 1, CAPÍTULO 36: Skalk offers a debt. ${'x'.repeat(400)} Skalk later scene.`;
  const run = fixture(t, [{ id: 'a', label: 'A', desc }, { id: 'b', label: 'B', desc }]);
  const limited = run('Skalk', '--id', 'a', '--max-excerpts', 1, '--id', 'b');
  assert.equal(limited.status, 0, limited.stderr);
  assert.doesNotMatch(limited.stdout, /Skalk later scene/);
  assert.equal((limited.stdout.match(/OMITTED: 1 additional excerpts/g) || []).length, 2);
  assert.match(limited.stdout, /not a full-entry read/);
  assert.equal((limited.stdout.match(/offers a debt/g) || []).length, 2);
  const full = run('Skalk', '--id', 'a');
  assert.equal(full.status, 0, full.stderr);
  assert.match(full.stdout, /Skalk later scene/);
  assert.doesNotMatch(full.stdout, /OMITTED/);
  const candidates = run('Skalk');
  assert.equal(candidates.status, 0, candidates.stderr);
  assert.equal((candidates.stdout.match(/2 matches/g) || []).length, 2);
});
test('limited search preserves Unicode boundaries and historical fallback', t => {
  const run = fixture(t, [
    { id: 'a', label: 'A', desc: 'Iva knew Bannað jörð.' },
    { id: 'a', label: 'A', desc: 'viva, ordinary text' },
  ]);
  for (const term of ['Iva', 'Bannað jörð']) {
    const result = run(term, '--id', 'a', '--max-excerpts', 1);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /historical fallback/);
    assert.match(result.stdout, /Iva knew Bannað jörð/);
  }
});
test('description search rejects invalid or ambiguous excerpt limits', t => {
  const run = fixture(t, [{ id: 'a', label: 'A', desc: 'Skalk' }]);
  for (const value of [0, -1, 1.5, 'no', 'Infinity'])
    assert.notEqual(run('Skalk', '--id', 'a', '--max-excerpts', value).status, 0);
  assert.notEqual(run('Skalk', '--max-excerpts', 1).status, 0);
  assert.notEqual(run('Skalk', '--id', 'a', '--max-excerpts', 1, '--max-excerpts', 2).status, 0);
  assert.notEqual(run('Skalk', '--id', 'a', '--max-excerpts').status, 0);
});
