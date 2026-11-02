const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../bookmarks-core.js');

test('bookmarks preserve identifiers and resolve names from the archive', () => {
  const entries = core.validate({ version: 1, items: [
    { kind: 'node', id: 'hrolf', label: 'Hrolf (†)' }, { kind: 'clue', id: 'club:question', title: 'Future answer' },
  ] });
  assert.deepEqual(entries, [{ kind: 'node', id: 'hrolf' }, { kind: 'clue', id: 'club:question' }]);
  const early = core.visible(entries, [{ id: 'hrolf', label: 'Hrolf', type: 'Personaje' }], []);
  assert.equal(early.length, 1);
  assert.equal(early[0].label, 'Hrolf');
  assert.ok(!JSON.stringify(early).includes('†'));
  assert.ok(!JSON.stringify(early).includes('Future answer'));
});

test('unavailable references remain stored without displaying invalid links', () => {
  const items = [{ kind: 'node', id: 'saeunn' }, { kind: 'node', id: 'orka' }, { kind: 'clue', id: 'club:future' }];
  const original = JSON.stringify(items);
  const early = core.visible(items, [{ id: 'orka', label: 'Orka', type: 'Personaje' }], []);
  assert.deepEqual(early.map(item => item.id), ['orka']);
  const later = core.visible(items, [{ id: 'saeunn', label: 'Sæunn', type: 'Personaje' }, { id: 'orka', label: 'Orka', type: 'Personaje' }],
    [{ id: 'club:future', title: 'A later question' }]);
  assert.equal(later.length, 3);
  assert.equal(JSON.stringify(items), original);
});

test('clue bookmarks use the current question title', () => {
  const items = [{ kind: 'clue', id: 'club:test' }];
  assert.equal(core.visible(items, [], [{ id: 'club:test', title: 'Who did it?' }])[0].label, 'Who did it?');
  assert.equal(core.visible(items, [], [{ id: 'club:test', title: 'The answer is known' }])[0].label, 'The answer is known');
});

test('validation deduplicates markers and rejects malformed storage atomically', () => {
  assert.equal(core.validate({ version: 1, items: [{ kind: 'node', id: 'orka' }, { kind: 'node', id: 'orka' }] }).length, 1);
  for (const value of [null, {}, { version: 2, items: [] }, { version: 1, items: [null] },
    { version: 1, items: [{ kind: 'script', id: 'x' }] }, { version: 1, items: [{ kind: 'node', id: '' }] }]) {
    assert.throws(() => core.validate(value));
  }
});

test('an old source bookmark still opens the current observation for that topic', () => {
  const result = core.visible([{ kind: 'clue', id: 'source:1:orka' }], [], [
    { id: 'source:2:orka', origin: 'source', nodeIds: ['orka'], title: 'Orka observations' },
  ]);
  assert.equal(result[0].id, 'source:1:orka');
  assert.equal(result[0].targetId, 'source:2:orka');
});
