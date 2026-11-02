const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const core = require('../reading-core.js');
const characters = require('../characters-core.js');
const clues = require('../clues-core.js');
const context = vm.createContext({});
const root = path.join(__dirname, '..');
for (const file of ['book1/nodes.js', 'book2/nodes.js', 'book1/links.js', 'book2/links.js', 'book1/summaries.js', 'book2/summaries.js', 'reading-metadata.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const data = JSON.parse(vm.runInContext(`JSON.stringify({baseNodes:nodes,baseLinks:links,nextNodes:nodesBook2,nextLinks:linksBook2,
  summaries:[...chapterSummaries.map(s=>({...s,book:1})),...chapterSummariesBook2.map(s=>({...s,book:2}))],maxima:{1:53,2:48},metadata:READING_METADATA})`, context));
const view = (book, chapter) => core.project(data, { book, chapter });

test('metadata dates every current Book 2 record and matches the source fingerprints', () => {
  for (const [file, records] of [['book2/nodes.js', data.nextNodes], ['book2/links.js', data.nextLinks]]) {
    const meta = data.metadata.files[file];
    assert.equal(meta.chapters.length, records.length);
    assert.deepEqual(meta.signatures, records.map(core.signature));
    assert.equal(meta.sha256, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'));
    assert.ok(meta.chapters.every(n => Number.isInteger(n) && n >= 0 && n <= 48));
  }
});

test('Book 2 chapter 32 excludes later characters, summaries, aliases, and relationships', () => {
  const limit = { book: 2, chapter: 32 }, result = view(2, 32);
  assert.ok(!result.nodes.some(n => n.id === 'saeunn' || n.id === 'gudrun'));
  assert.equal(result.summaries.filter(s => s.book === 2).length, 32);
  assert.ok(result.revisions.every(n => core.allows(n, limit)));
  assert.ok(result.links.every(l => core.allows(l, limit)));
  const profiles = result.nodes.filter(n => characters.kind(n)).map(n => characters.profile(n, result.revisions, 2, {}));
  assert.equal(characters.search(profiles, 'Saeunn').length, 0);
  assert.equal(characters.search(profiles, 'Gudrun').length, 0);
  assert.equal(characters.search(profiles, 'Guthvarr')[0].node.id, 'gudvarr');
  assert.ok(profiles.every(p => p.timeline.every(s => s.book < 2 || s.chapter <= 32)));
});

test('whole cumulative records with later information are delayed conservatively', () => {
  const before = view(2, 4), after = view(2, 6);
  assert.ok(!before.revisions.some(n => n.id === 'huld' && n.book === 2));
  assert.ok(after.revisions.some(n => n.id === 'huld' && n.book === 2));
  const early = view(2, 36), later = view(2, 45);
  assert.ok(!early.nodes.find(n => n.id === 'saeunn').desc.includes('CAPÍTULO 45'));
  assert.ok(later.nodes.find(n => n.id === 'saeunn').desc.includes('CAPÍTULO 45'));
  assert.ok(!view(2, 47).nodes.find(n => n.id === 'hrolf')?.label.includes('†'));
  assert.ok(view(2, 48).nodes.find(n => n.id === 'hrolf')?.label.includes('†'));
});

test('corrected chapter 37 link boundary does not reveal chapter 37 at chapter 36', () => {
  const label = 'paga una deuda de sangre con su botín iskidano a';
  assert.ok(!view(2, 36).links.some(l => l.label === label));
  assert.ok(view(2, 37).links.some(l => l.label === label));
});

test('early Book 1 builds references only from read summaries, never accumulated identities', () => {
  const result = view(1, 1);
  assert.equal(result.summaryMode, true);
  assert.equal(result.summaries.length, 1);
  const orka = result.nodes.find(n => n.id === 'orka');
  assert.equal(orka.label, 'Orka');
  assert.ok(!orka.desc.includes('Skullsplitter'));
  assert.ok(!result.nodes.some(n => n.id === 'elvar' || n.id === 'varg'));
  assert.ok(result.links.every(l => l.type === 'event' && l.chapter === 1));
  assert.ok(result.nodes.every(n => !n.star));
  assert.equal(view(1, 0).nodes.length, 0);
});

test('end-of-book views preserve all original accumulated data', () => {
  const original = JSON.stringify(data);
  const one = view(1, 53), two = view(2, 48);
  assert.equal(one.nodes.length, 325); assert.equal(one.links.length, 1162);
  assert.equal(two.nodes.length, 437); assert.equal(two.links.length, 1836);
  assert.equal(two.revisions.length, data.baseNodes.length + data.nextNodes.length);
  assert.equal(two.summaries.length, 101);
  assert.equal(JSON.stringify(data), original);
});

test('changed records without regenerated metadata are withheld, not assigned a guessed date', () => {
  const changed = structuredClone(data);
  changed.nextNodes.push({ id: 'unverified', label: 'Unverified', desc: 'future', type: 'Personaje', group: 'VARG' });
  changed.nextNodes[0].desc += ' changed after the metadata was compiled';
  const result = core.project(changed, { book: 2, chapter: 48 });
  assert.ok(!result.nodes.some(n => n.id === 'unverified'));
  assert.ok(!result.revisions.some(n => n.desc.includes('changed after')));
  assert.equal(result.undated, 2);
});

test('invalid shared limits fall back safely and boundary chapter zero is accepted', () => {
  const fallback = { book: 1, chapter: 0 };
  for (const point of [null, {}, { book: 2 }, { book: 2, chapter: '' }, { book: 2, chapter: -1 },
    { book: 2, chapter: 49 }, { book: 3, chapter: 1 }, { book: 1, chapter: 1.5 }]) {
    assert.deepEqual(core.parseLimit(point, data.maxima, fallback), fallback);
  }
  assert.deepEqual(core.parseLimit({ book: '2', chapter: '0' }, data.maxima, fallback), { book: 2, chapter: 0 });
});

test('clue snapshots restore earlier evidence and hide undated legacy club edits', () => {
  const base = { id: 'club:chapter-test', origin: 'club', title: 'Question', note: '', status: 'open', book: 2,
    nodeIds: ['orka'], chapter: '', history: [], evidence: 'chapter 32 evidence', theory: '',
    availableAt: { book: 2, chapter: 32 }, updatedAt: '2026-01-01T00:00:00Z' };
  const later = { ...base, evidence: 'chapter 48 answer', status: 'resolved', availableAt: { book: 2, chapter: 48 },
    updatedAt: '2026-01-02T00:00:00Z', versions: [base] };
  const legacy = { ...base, id: 'club:legacy' }; delete legacy.availableAt;
  const saved = clues.validateBackup({ format: 'bloodsworn-clues', version: 2, entries: [later, legacy] });
  const read32 = clues.entries(view(2, 32).revisions, saved, 2, { book: 2, chapter: 32 }, data.maxima);
  assert.equal(read32.find(c => c.id === base.id).evidence, 'chapter 32 evidence');
  assert.ok(!read32.some(c => c.id === legacy.id));
  const read48 = clues.entries(view(2, 48).revisions, saved, 2, { book: 2, chapter: 48 }, data.maxima);
  assert.equal(read48.find(c => c.id === base.id).status, 'resolved');
  assert.ok(read48.some(c => c.id === legacy.id));
  assert.deepEqual(saved[base.id].versions[0], base);
});

test('legacy backup version 1 remains importable without inventing reading provenance', () => {
  const source = clues.sourceEntries(view(2, 48).revisions, 2)[0];
  delete source.availableAt;
  const saved = clues.validateBackup({ format: 'bloodsworn-clues', version: 1, entries: [source] });
  assert.equal(saved[source.id].availableAt, undefined);
  assert.equal(clues.savedAt(saved[source.id], { book: 2, chapter: 32 }, data.maxima), undefined);
});
