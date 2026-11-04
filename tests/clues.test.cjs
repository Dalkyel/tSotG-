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
  assert.equal(new Set(entries.map(c => c.id)).size, entries.length);
  // Status defaults to the chapter's own "ESTADO: …" marker when present, else unreviewed.
  for (const c of entries) {
    const node = latest.get(c.id.replace(/^source:\d+:/, ''));
    const expected = core.detectStatus(node) || 'unreviewed';
    assert.equal(c.status, expected);
  }
  assert.ok(entries.every(c => c.evidence === '' && c.theory === ''));
  assert.equal(JSON.stringify(revisions), original);
});

test('detectStatus reads the last ESTADO marker and maps it to a clue status', () => {
  // TRAMA threads re-tag reliably, so even a single mention is trusted.
  assert.equal(core.detectStatus({ group: 'TRAMA', desc: 'LIBRO 2, CAPÍTULO 3: Avance. ESTADO: ABIERTA' }), 'open');
  assert.equal(core.detectStatus({ group: 'TRAMA', desc: 'ESTADO: ABIERTA ... más tarde ... ESTADO: PARCIAL' }), 'partial');
  assert.equal(core.detectStatus({ group: 'TRAMA', desc: 'Sin marca alguna aquí.' }), null);
  assert.equal(core.detectStatus({ group: 'TRAMA', desc: '', star: 'ESTADO: RESUELTA' }), 'resolved');
  assert.equal(core.detectStatus({ group: 'TRAMA', desc: 'ESTADO: DESCARTADA' }), 'resolved');
  // A single ESTADO mention on a non-TRAMA node (e.g. an EVENTO tagged once at a cliffhanger,
  // then resolved by later untagged prose) is unreliable and must not be trusted.
  assert.equal(core.detectStatus({ group: 'EVENTO', desc: 'El capítulo termina en suspenso. ESTADO: ABIERTA' }), null);
  // Two or more mentions on a non-TRAMA node show it was genuinely revisited, and are trusted.
  assert.equal(core.detectStatus({ group: 'ELVAR', star: 'CAP 5: ESTADO: ABIERTA. CAP 9: ESTADO: PARCIAL' }), 'partial');
});

test('all saved questions remain visible regardless of old reading dates', () => {
  const base = core.sourceEntries(revisions);
  const example = { ...base[0], id: 'club:undated', origin: 'club', title: 'Undated club question' };
  const later = { ...example, id: 'club:later', title: 'Later question', availableAt: { book: 2, chapter: 48 } };
  const saved = { [example.id]: example, [later.id]: later };
  const entries = core.entries(revisions, saved);
  assert.equal(entries.length, base.length + 2);
  assert.ok(entries.some(c => c.id === later.id));
  assert.ok(entries.some(c => c.id === example.id));
});

test('classification and club questions round-trip without losing evidence or history', () => {
  const entry = { ...core.sourceEntries(revisions, 2)[0], status: 'resolved', evidence: 'Cap. 10: evidencia',
    theory: 'Nuestra interpretación', chapter: 'Libro 2, capítulo 10',
    history: [{ at: new Date().toISOString(), text: 'Abierta → Resuelta' }] };
  const club = { ...entry, id: 'club:test-1', origin: 'club', title: '¿Por qué?', nodeIds: ['orka', 'varg'] };
  const saved = core.validateBackup(JSON.parse(JSON.stringify(backup([entry, club]))));
  const entries = core.entries(revisions, saved, 2);
  // Every entry present in `saved` is flagged as already reviewed by the club.
  assert.deepEqual(entries.find(c => c.id === entry.id), { ...entry, reviewedByClub: true });
  assert.deepEqual(entries.find(c => c.id === club.id), { ...club, reviewedByClub: true });
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
