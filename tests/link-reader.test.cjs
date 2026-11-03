const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/read-links.cjs');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'link-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const book of [1, 2]) {
    fs.mkdirSync(path.join(root, `book${book}`));
    const suffix = book === 1 ? '' : 'Book2';
    fs.writeFileSync(path.join(root, `book${book}/nodes.js`), `const nodes${suffix} = ${JSON.stringify(book === 1 ? ['a', 'b', 'hub', 'empty'].map(id => ({ id, label: id.toUpperCase() })) : [{ id: 'a', label: 'Latest A' }])};`);
    const links = book === 1 ? [
      { source: 'a', target: 'b', label: 'forward', type: 'rel' },
      { source: 'b', target: 'a', label: 'reverse', type: 'rel' },
      { source: 'a', target: 'hub', label: 'unrelated hub history', type: 'rel' },
      { source: 'a', target: 'b', label: 'forward', status: 'broken', reason: 'ended' },
    ] : [{ source: 'a', target: 'b', label: 'later evidence', type: 'rel' }];
    fs.writeFileSync(path.join(root, `book${book}/links.js`), `const links${suffix} = ${JSON.stringify(links)};`);
  }
  return root;
}
function run(root, ...args) {
  return spawnSync(process.execPath, [script, ...args.map(String)], { cwd: root, encoding: 'utf8' });
}
test('exact-pair lookup retains both directions and broken history, excludes hub links, and respects book cap', t => {
  const root = fixture(t);
  const result = run(root, 1, 1, '--between', 'a', 'b');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /3 stored links/);
  assert.match(result.stdout, /A \[a\] → forward → B \[b\]/);
  assert.match(result.stdout, /B \[b\] → reverse → A \[a\]/);
  assert.match(result.stdout, /\[BROKEN\].*ended/);
  assert.doesNotMatch(result.stdout, /unrelated hub history|later evidence|Latest A/);
  assert.equal(run(root, 1, 1, '--between', 'b', 'a').stdout, result.stdout);
  const later = run(root, 2, 1, '--between', 'a', 'b');
  assert.equal(later.status, 0, later.stderr);
  assert.match(later.stdout, /4 stored links/);
  assert.match(later.stdout, /Latest A.*later evidence/);
  const union = run(root, 1, 1, 'a', 'b');
  assert.equal(union.status, 0, union.stderr);
  assert.match(union.stdout, /unrelated hub history/);
});
test('exact-pair lookup gives explicit absence and rejects malformed or unknown endpoints', t => {
  const root = fixture(t);
  const absent = run(root, 1, 1, '--between', 'a', 'empty');
  assert.equal(absent.status, 0, absent.stderr);
  assert.match(absent.stdout, /0 stored links[\s\S]*NO MATCHES[\s\S]*END:/);
  for (const args of [ ['--between'], ['--between', 'a'], ['--between', 'a', 'b', 'hub'], ['--between', 'a', 'unknown'], ['a', '--between', 'b'], ['--unknown', 'a'] ]) {
    assert.notEqual(run(root, 1, 1, ...args).status, 0, JSON.stringify(args));
  }
  assert.notEqual(run(root, 1, 2, '--between', 'a', 'empty').status, 0);
});
