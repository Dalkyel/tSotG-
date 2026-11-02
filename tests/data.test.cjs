const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const archive = require('../data-core.js');
const clues = require('../clues-core.js');
const context = vm.createContext({});
for (const file of ['book1/nodes.js', 'book2/nodes.js', 'book1/links.js', 'book2/links.js', 'book1/summaries.js', 'book2/summaries.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const books = JSON.parse(vm.runInContext(`JSON.stringify([
  {book:1,nodes,links,summaries:chapterSummaries},
  {book:2,nodes:nodesBook2,links:linksBook2,summaries:chapterSummariesBook2}
])`, context));

test('full archive includes all books, current nodes, links, snapshots, and summaries', () => {
  const before = JSON.stringify(books);
  const result = archive.merge(books);
  const allNodes = books.flatMap(book => book.nodes);
  const ids = new Set(allNodes.map(n => n.id));
  const allLinks = books.flatMap(book => book.links);
  const key = link => JSON.stringify([link.source, link.target, link.label]);
  const broken = new Set(allLinks.filter(l => l.status === 'broken').map(key));
  const expectedLinks = allLinks.filter(l => l.status !== 'broken' && !broken.has(key(l)) && ids.has(l.source) && ids.has(l.target));
  assert.equal(result.nodes.length, ids.size);
  assert.deepEqual(result.links.map(key), expectedLinks.map(key));
  assert.equal(result.revisions.length, books.reduce((total, book) => total + book.nodes.length, 0));
  assert.equal(result.summaries.length, books.reduce((total, book) => total + book.summaries.length, 0));
  assert.equal(result.maxBook, 2);
  assert.equal(JSON.stringify(books), before);
  assert.ok(result.nodes.some(n => n.id === 'saeunn'));
  assert.ok(result.nodes.find(n => n.id === 'gudvarr').desc.includes('CAPÍTULO 48'));
});

test('new or undated content loads without metadata regeneration or a chapter restriction', () => {
  const input = structuredClone(books);
  input[1].nodes.push({ id: 'new-note', label: 'New information', group: 'TRAMA', type: 'Trama', desc: 'Added without a date', star: 'A new question' });
  input[1].links.push({ source: 'orka', target: 'new-note', label: 'related to', type: 'trama' });
  input[1].summaries.push({ chapter: 49, title: 'New chapter', summary: 'New summary' });
  const result = archive.merge(input);
  assert.ok(result.nodes.some(n => n.id === 'new-note'));
  assert.ok(result.links.some(l => l.target === 'new-note'));
  assert.ok(result.summaries.some(s => s.book === 2 && s.chapter === 49));
});

test('latest node state is merged while original descriptions and snapshots are preserved', () => {
  const result = archive.merge(books);
  const latest = books[1].nodes.filter(n => n.id === 'orka').at(-1);
  assert.equal(result.nodes.find(n => n.id === 'orka').desc, latest.desc);
  assert.equal(result.revisions.find(n => n.id === 'orka' && n.book === 1).desc, books[0].nodes.find(n => n.id === 'orka').desc);
});

test('legacy clue backups retain dates and every saved revision without hiding the current entry', () => {
  const initial = { id: 'club:retained', origin: 'club', title: 'Earlier question', note: '', status: 'open', book: 2,
    nodeIds: ['orka'], chapter: 'Chapter 32', history: [], evidence: 'Earlier evidence', theory: '',
    availableAt: { book: 2, chapter: 32 } };
  const current = { ...initial, title: 'Current question', availableAt: { book: 2, chapter: 48 },
    evidence: 'Complete answer', status: 'resolved', versions: [initial] };
  const saved = clues.validateBackup({ format: 'bloodsworn-clues', version: 2, entries: [current] });
  const result = clues.entries(archive.merge(books).revisions, saved);
  assert.deepEqual(result.find(c => c.id === current.id), current);
  assert.deepEqual(saved[current.id].versions[0], initial);
});

test('edits to an older source observation remain accessible after its node is updated', () => {
  const old = clues.sourceEntries(books[0].nodes.map(n => ({ ...n, book: 1 }))).find(c => c.nodeIds.includes('orka'));
  const saved = { [old.id]: { ...old, evidence: 'Bookclub evidence we must keep' } };
  const entries = clues.entries(archive.merge(books).revisions, saved);
  assert.ok(entries.some(c => c.id === old.id && c.evidence === 'Bookclub evidence we must keep'));
  assert.ok(entries.some(c => c.id === 'source:2:orka'));
});
