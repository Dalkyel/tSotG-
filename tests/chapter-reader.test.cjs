const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const reader = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/read-chapter.py');

function fixture(t, html) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chapter-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, 'chapter.html');
  fs.writeFileSync(file, html);
  return file;
}
function run(file, page) {
  return spawnSync('python3', [reader, file, String(page)], { encoding: 'utf8' });
}
function readAll(file) {
  const chunks = [];
  let count = 1;
  for (let page = 1; page <= count; page++) {
    const result = run(file, page);
    assert.equal(result.status, 0, result.stderr);
    count = Number(result.stdout.match(/^Page \d+\/(\d+);/)[1]);
    const footer = result.stdout.lastIndexOf(page < count ? '\nCONTINUES:' : '\nEND:');
    const chunk = result.stdout.slice(result.stdout.indexOf('\n') + 1, footer);
    assert.ok([...chunk].length <= 10000);
    chunks.push(chunk);
  }
  return chunks;
}

test('chapter extraction preserves inline names and excludes hidden content', t => {
  const file = fixture(t, '<head><title>Hidden title</title></head><h1>CHAPTER SIX</h1>' +
    '<p><span>E</span>lvar &amp; <em>Uspa</em>.</p><script>Hidden script</script><style>Hidden style</style>');
  assert.deepEqual(readAll(file), ['CHAPTER SIX\nElvar & Uspa.']);
  assert.notEqual(run(file, 0).status, 0);
  assert.notEqual(run(file, 2).status, 0);
});

test('chapter pages prefer paragraph boundaries and reassemble without loss', t => {
  const paragraphs = ['Elvar '.repeat(1100).trim(), 'Uspa '.repeat(1000).trim(), 'Skuld 🐺 '.repeat(700).trim()];
  const file = fixture(t, paragraphs.map(p => `<p>${p}</p>`).join(''));
  const chunks = readAll(file);
  assert.ok(chunks.length > 1);
  assert.equal(chunks[0], paragraphs[0] + '\n');
  assert.equal(chunks.join(''), paragraphs.join('\n'));
});

test('overlong paragraphs split at whitespace without bisecting words', t => {
  const expected = 'resurrection '.repeat(1800).trim();
  const chunks = readAll(fixture(t, `<p>${expected}</p>`));
  assert.ok(chunks.length > 1);
  assert.ok(chunks.slice(0, -1).every(chunk => chunk.endsWith(' ')));
  assert.ok(chunks.slice(1).every(chunk => chunk.startsWith('resurrection')));
  assert.equal(chunks.join(''), expected);
});

test('unbroken passages still honor the bound and preserve all characters', t => {
  const expected = 'Þ'.repeat(25001);
  const file = fixture(t, `<p>${expected}</p>`);
  const chunks = readAll(file);
  assert.deepEqual(chunks.map(c => c.length), [10000, 10000, 5001]);
  assert.equal(chunks.join(''), expected);
  assert.notEqual(run(file, 4).status, 0);
});
