const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../characters-core.js');
const root = path.join(__dirname, '..');
const load = (kind, variable) => new Function(
  fs.readFileSync(path.join(root, 'book1', `${kind}.js`), 'utf8') + `;return ${variable};`
)();

test('live Book One events are discoverable under EVENTOS CLAVE with useful connections', () => {
  const archive = require('../data-core.js').merge([{
    book: 1, nodes: load('nodes', 'nodes'), links: load('links', 'links'),
    summaries: load('summaries', 'chapterSummaries'),
  }]);
  const events = archive.nodes.filter(node => node.group === 'EVENTO');
  for (const id of ['rescate-varg', 'rescate-vesli', 'juramento-vesli', 'reclamacion-sulich',
    'revelacion-roca-escarcha', 'barrow-virk', 'hallazgo-froa', 'acuerdo-partida-orka']) {
    assert.ok(events.some(node => node.id === id), `Missing key event: ${id}`);
  }
  for (const event of events) {
    const touching = archive.links.filter(link => link.source === event.id || link.target === event.id);
    assert.ok(touching.some(link => link.source === 'cat-eventos' || link.target === 'cat-eventos'),
      `${event.id} must be listed under EVENTOS CLAVE`);
    assert.ok(touching.some(link => !link.source.startsWith('cat-') && !link.target.startsWith('cat-')),
      `${event.id} must connect to participants, places or evidence`);
  }
  assert.equal(archive.nodes.find(node => node.id === 'decision-huida').group, 'TRAMA');
  assert.ok(archive.links.some(link => link.source === 'acuerdo-partida-orka' && link.target === 'decision-huida'),
    'A completed agreement must keep the unfulfilled departure discoverable');
});

test('Book One Chapter 1 key terms resolve through the same mention matcher as Book Two', () => {
  const nodes = load('nodes', 'nodes');
  const summary = load('summaries', 'chapterSummaries').find(s => s.chapter === 1).summary;
  const matcher = core.buildMentionMatcher(nodes, nodes.map(n => ({ ...n, book: 1 })), {});
  for (const [, term] of summary.matchAll(/<strong>(.*?)<\/strong>/g)) {
    const matches = core.findMentions(term, matcher);
    assert.equal(matches.length, 1, `Missing or ambiguous summary link: ${term}`);
    assert.equal(matches[0].text, term, `Only part of the key term is linked: ${term}`);
    assert.ok(nodes.some(n => n.id === matches[0].id));
  }
  const text = summary.replace(/<[^>]*>/g, ' ');
  const mentions = core.findMentions(text, matcher);
  for (const name of ['Orka', 'Thorkel', 'Breca', 'Asgrim', 'Harek']) {
    assert.equal(mentions.filter(m => m.text === name).length, text.split(name).length - 1,
      `Every occurrence of ${name} should be linked, including plain text`);
  }
});

test('live app supplies the current summary UI and shared link renderer', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /<dialog[^>]*id="summary-panel"/);
  for (const id of ['chapter-list', 'chapter-pane', 'book-tabs', 'summary-close']) {
    assert.ok(html.includes(`id="${id}"`), `Missing summary UI element: ${id}`);
  }
  assert.match(html, /<script src="mapa\.js"><\/script>/);
  assert.match(html, /<script src="characters-core\.js"><\/script>/);
  assert.match(html, /src="book1\/summaries\.js"/);
  assert.ok(html.includes('src="book2/summaries.js"'));
  assert.ok(html.includes('src="characters-data.js"'));
});

test('Chapter 7 creature mentions resolve to connection-map nodes with relationships', () => {
  const revisions = load('nodes', 'nodes');
  const nodes = [...new Map(revisions.map(n => [n.id, n])).values()];
  const matcher = core.buildMentionMatcher(nodes, revisions, {});
  const focus = require('../focus-core.js');
  const graph = focus.index(nodes, load('links', 'links'));
  for (const [term, id] of [['Arañas del Hielo', 'araña-hielo'], ['Trol', 'trol']]) {
    assert.deepEqual(core.findMentions(term, matcher).map(m => m.id), [id]);
    const view = focus.view(graph, focus.initial(id), {});
    assert.ok(view.ids.has(id));
    assert.ok(view.edges.length > 0, `${term} must open with its recorded relationships`);
  }
});

test('connection viewer initializes with empty character guides', () => {
  const vm = require('node:vm');
  const elements = new Map();
  const element = () => ({
    append() {}, setAttribute() {}, addEventListener() {}, add() {},
  });
  const selection = new Proxy({}, { get: (_, key) => key === 'node' ? () => ({}) : () => selection });
  const window = {};
  const context = {
    nodes: load('nodes', 'nodes'), links: load('links', 'links'),
    FocusMap: require('../focus-core.js'), CharacterReference: core,
    CHARACTER_GUIDES: {}, CHARACTER_KEY_LINKS: {}, window,
    clueSourceRevisions: load('nodes', 'nodes'),
    document: { createElement: element, body: element(), getElementById(id) {
      if (!elements.has(id)) elements.set(id, element());
      return elements.get(id);
    } },
    d3: { select: () => selection, zoom: () => selection },
    Option: function () {}, ResizeObserver: class { observe() {} },
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'focus.js'), 'utf8'), context);
  assert.equal(typeof window.openRelationshipMap, 'function', 'Creature summary links need this registered opener');
});

test('Mord and Lif summary links open separate profiles and family connections', () => {
  const revisions = load('nodes', 'nodes');
  const nodes = [...new Map(revisions.map(node => [node.id, node])).values()];
  const links = load('links', 'links');
  const matcher = core.buildMentionMatcher(nodes, revisions, {});
  const focus = require('../focus-core.js');
  const graph = focus.index(nodes, links);
  for (const [name, id] of [['Mord', 'mord'], ['Lif', 'lif']]) {
    assert.deepEqual(core.findMentions(name, matcher).map(mention => mention.id), [id]);
    const view = focus.view(graph, focus.initial(id), {});
    assert.ok(view.ids.has('virk'), `${name}'s profile must connect to his father`);
  }
  assert.deepEqual(core.findMentions('Mord y Lif', matcher).map(mention => mention.id), ['mord', 'lif']);
  assert.ok(!links.some(link => link.source === 'mord-lif' || link.target === 'mord-lif'));
  const summary = load('summaries', 'chapterSummaries').find(item => item.chapter === 10).summary;
  assert.ok(summary.includes('<strong>Mord</strong> y <strong>Lif</strong>'));
});

test('Varg and Elvar expose unresolved threads through the plot filter', () => {
  const revisions = load('nodes', 'nodes');
  const nodes = [...new Map(revisions.map(node => [node.id, node])).values()];
  const links = load('links', 'links');
  const focus = require('../focus-core.js');
  const graph = focus.index(nodes, links);
  for (const id of ['varg', 'elvar']) {
    const state = { ...focus.initial(id), nodeKind: 'plots' };
    const view = focus.view(graph, state, {});
    const threads = view.nodes.filter(node => node.group === 'TRAMA');
    assert.ok(threads.length > 0, `${id} must have discoverable unresolved threads`);
    assert.ok(threads.every(thread => links.some(link =>
      link.source === 'cat-tramas' && link.target === thread.id)),
    `${id}'s plot threads must also belong to the shared active-thread category`);
  }
});
