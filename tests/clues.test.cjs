const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const core = require('../clues-core.js');
const root = path.join(__dirname, '..');
const context = vm.createContext({});
for (const file of ['book1/nodes.js', 'book2/nodes.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const revisions = JSON.parse(vm.runInContext('JSON.stringify([...nodes.map(n => ({...n, book:1})), ...nodesBook2.map(n => ({...n, book:2}))])', context));
const backup = entries => ({ format: 'bloodsworn-clues', version: 1, entries });

test('existing observations remain read-only and every visible current note is indexed', () => {
  const original = JSON.stringify(revisions);
  const entries = core.sourceEntries(revisions, 2);
  const latest = new Map(revisions.map(n => [n.id, n]));
  assert.equal(entries.length, [...latest.values()].filter(n => n.star?.trim()).length);
  assert.equal(entries.length, 377);
  assert.equal(new Set(entries.map(c => c.id)).size, entries.length);
  assert.ok(entries.every(c => c.status === 'unreviewed' && c.evidence === '' && c.theory === ''));
  assert.equal(JSON.stringify(revisions), original);
});

test('book 1 view uses book 1 notes and excludes later saved entries', () => {
  const base = core.sourceEntries(revisions, 1);
  const later = core.sourceEntries(revisions, 2).find(c => c.book === 2);
  const saved = { [later.id]: { ...later, title: 'Future revelation' } };
  const entries = core.entries(revisions, saved, 1);
  assert.ok(entries.every(c => c.book === 1));
  assert.deepEqual(entries, base);
  const orka = entries.find(c => c.nodeIds.includes('orka'));
  assert.equal(orka.note, revisions.find(n => n.id === 'orka' && n.book === 1).star);
});

test('classification and club questions round-trip without losing evidence or history', () => {
  const entry = { ...core.sourceEntries(revisions, 2)[0], status: 'resolved', evidence: 'Cap. 10: evidencia',
    theory: 'Nuestra interpretación', chapter: 'Libro 2, capítulo 10',
    history: [{ at: new Date().toISOString(), text: 'Abierta → Resuelta' }] };
  const club = { ...entry, id: 'club:test-1', origin: 'club', title: '¿Por qué?', nodeIds: ['orka', 'varg'] };
  const saved = core.validateBackup(JSON.parse(JSON.stringify(backup([entry, club]))));
  const entries = core.entries(revisions, saved, 2);
  assert.deepEqual(entries.find(c => c.id === entry.id), entry);
  assert.deepEqual(entries.find(c => c.id === club.id), club);
  assert.equal(core.normalize('Úlfhéðnar'), 'ulfheðnar');
});

test('rejects invalid and duplicate backup entries before any import', () => {
  const entry = core.sourceEntries(revisions, 2)[0];
  for (const data of [null, {}, backup([entry, entry]), backup([{ ...entry, status: 'invented' }]),
    backup([{ ...entry, history: [null] }]), backup([{ ...entry, nodeIds: '__proto__' }]),
    backup([{ ...entry, id: '__proto__' }]), backup([{ ...entry, book: 3 }])]) {
    assert.throws(() => core.validateBackup(data));
  }
});
