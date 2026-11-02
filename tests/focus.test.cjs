const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('../focus-core.js');
const context = vm.createContext({});
for (const file of ['book1/nodes.js', 'book2/nodes.js', 'book1/links.js', 'book2/links.js', 'characters-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const data = JSON.parse(vm.runInContext('JSON.stringify({base:nodes,updates:nodesBook2,baseLinks:links,updatesLinks:linksBook2,preferred:CHARACTER_KEY_LINKS})', context));
function graph(cap = 2) {
  const nodes = new Map(data.base.map(n => [n.id, n]));
  if (cap === 2) data.updates.forEach(n => nodes.set(n.id, { ...nodes.get(n.id), ...n }));
  return core.index([...nodes.values()], cap === 2 ? [...data.baseLinks, ...data.updatesLinks] : data.baseLinks);
}

test('initial view is limited to immediate neighbors with useful links first', () => {
  const g = graph(), state = core.initial('orka');
  const view = core.view(g, state, data.preferred);
  assert.equal(view.nodes.length, 13);
  assert.ok(view.ids.has('orka'));
  for (const id of ['breca', 'thorkel', 'glornir', 'drekr']) assert.ok(view.ids.has(id), id);
  for (const id of view.ids) assert.ok(id === 'orka' || g.adjacency.get('orka').has(id));
  assert.ok(view.nodes.every(n => !['CENTER', 'CAT'].includes(n.group)));
});

test('expansion and collapse follow only explicitly opened branches', () => {
  const g = graph(), state = core.initial('orka');
  const initial = core.view(g, state, data.preferred);
  const expanded = { ...state, expanded: ['orka', 'glornir'], limits: { orka: 12, glornir: 12 } };
  const after = core.view(g, expanded, data.preferred);
  assert.ok(after.nodes.length > initial.nodes.length);
  assert.ok([...initial.ids].every(id => after.ids.has(id)));
  for (const id of after.ids) assert.ok(initial.ids.has(id) || g.adjacency.get('glornir').has(id));
  assert.deepEqual(core.view(g, state, data.preferred), initial);
  const all = core.view(g, { ...state, limits: { orka: 9999 } }, data.preferred);
  assert.equal(all.nodes.length, core.neighbors(g, 'orka', state).length + 1);
});

test('node and relationship filters apply to discovery and displayed records', () => {
  const g = graph();
  const state = { ...core.initial('orka'), nodeKind: 'characters', linkType: 'rel' };
  const view = core.view(g, state, data.preferred);
  assert.ok(view.nodes.every(n => n.id === 'orka' || core.kind(n) === 'characters'));
  assert.ok(view.edges.every(edge => edge.records.every(r => r.type === 'rel')));
  const isolated = core.view(g, { ...state, linkType: 'nonexistent-type' });
  assert.equal(isolated.nodes.length, 1);
  assert.equal(isolated.edges.length, 0);
});

test('pair grouping preserves every original relationship and its direction', () => {
  const g = graph();
  const edge = g.adjacency.get('orka').get('thorkel');
  const expected = [...data.baseLinks, ...data.updatesLinks].filter(l =>
    [l.source, l.target].includes('orka') && [l.source, l.target].includes('thorkel'));
  assert.equal(edge.records.length, expected.length);
  assert.deepEqual(edge.records.map(r => [r.source, r.target, r.label]), expected.map(r => [r.source, r.target, r.label]));
  assert.strictEqual(g.adjacency.get('thorkel').get('orka'), edge);
});

test('filters do not reveal disconnected expanded branches and cycles terminate', () => {
  const ns = ['a', 'b', 'c', 'd'].map(id => ({ id, label: id, type: 'Personaje', group: 'VARG' }));
  const ls = [ ['a', 'b', 'rel'], ['b', 'c', 'magic'], ['c', 'a', 'magic'], ['c', 'd', 'rel'] ]
    .map(([source, target, type]) => ({ source, target, type, label: type }));
  const g = core.index(ns, ls);
  const state = { ...core.initial('a'), expanded: ['a', 'b', 'c'], limits: { a: 12, b: 12, c: 12 } };
  assert.equal(core.view(g, state).nodes.length, 4);
  assert.deepEqual([...core.view(g, { ...state, linkType: 'rel' }).ids].sort(), ['a', 'b']);
});

test('graph indexing accepts D3 endpoints and leaves source data unchanged', () => {
  const original = JSON.stringify(data);
  const g = graph(), state = core.initial('varg');
  core.view(g, state, data.preferred);
  assert.equal(JSON.stringify(data), original);
  const ns = data.base;
  const objectLinks = data.baseLinks.map(l => ({ ...l, source: { id: l.source }, target: { id: l.target } }));
  assert.deepEqual(core.index(ns, objectLinks), core.index(ns, data.baseLinks));
});

test('indexing uses only the supplied dataset', () => {
  const g = graph(1);
  assert.equal(g.nodes.has('saeunn'), false);
  const state = core.initial('orka');
  const view = core.view(g, { ...state, limits: { orka: 9999 } });
  assert.ok(view.nodes.every(n => data.base.some(b => b.id === n.id)));
  assert.ok(view.edges.every(edge => edge.records.every(r => r.book === 1)));
});
