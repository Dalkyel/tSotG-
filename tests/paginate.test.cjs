const test = require('node:test');
const assert = require('node:assert/strict');
const { paginate } = require('../.claude/skills/add-chapter/scripts/paginate.cjs');

test('paginate splits into exact-size pages with no loss and no overlap', () => {
  const payload = 'x'.repeat(8000) + 'y'.repeat(8000) + 'z'.repeat(1);
  const chunks = paginate(payload, 8000);
  assert.equal(chunks.length, 3);
  assert.equal(chunks.join(''), payload);
  assert.equal(chunks[0].length, 8000);
  assert.equal(chunks[1].length, 8000);
  assert.equal(chunks[2], 'z');
});

test('paginate returns a single empty page for empty input', () => {
  assert.deepEqual(paginate(''), ['']);
});

test('paginate never splits a UTF-16 surrogate pair across a page boundary', () => {
  // U+1F3D4 (🏔) is a surrogate pair; place it exactly on what would be the page boundary.
  const mountain = '\u{1F3D4}';
  const payload = 'a'.repeat(7999) + mountain + 'b'.repeat(100);
  const chunks = paginate(payload, 8000);
  assert.equal(chunks.join(''), payload);
  for (const chunk of chunks) {
    // A lone high surrogate with no following low surrogate would indicate a split.
    assert.ok(!/[\uD800-\uDBFF]$/.test(chunk), `chunk ends mid-surrogate-pair: ${JSON.stringify(chunk.slice(-10))}`);
  }
});
