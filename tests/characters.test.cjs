const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const core = require('../characters-core.js');
const context = vm.createContext({});
for (const file of ['book1/nodes.js', 'book2/nodes.js', 'book1/links.js', 'book2/links.js', 'characters-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const data = JSON.parse(vm.runInContext('JSON.stringify({base:nodes,updates:nodesBook2,links:[...links,...linksBook2],guides:CHARACTER_GUIDES})', context));
const revisions = [...data.base.map(n => ({ ...n, book: 1 })), ...data.updates.map(n => ({ ...n, book: 2 }))];
function view(cap) {
  const map = new Map();
  revisions.filter(n => n.book <= cap).forEach(n => map.set(n.id, { ...map.get(n.id), ...n }));
  const nodes = [...map.values()];
  return { nodes, profiles: nodes.filter(n => core.kind(n)).map(n => core.profile(n, revisions.filter(r => r.book <= cap), data.guides)) };
}

test('name search resolves accent, Norse lettering, phonetics, and shared entries', () => {
  const { profiles } = view(2);
  for (const [query, expected] of Object.entries({ Gudvarr: 'gudvarr', Guthvarr: 'gudvarr', Guðvarr: 'gudvarr',
    Ilmur: 'hundur', Lif: 'lif', Mord: 'mord', Saeunn: 'saeunn', Rokia: 'rokia', Froya: 'froya', 'Pelo-Enredado': 'svik' })) {
    assert.equal(core.search(profiles, query)[0]?.node.id, expected, query);
  }
  assert.ok(core.search(profiles, '', 'gods').every(p => p.kind === 'gods'));
  assert.equal(core.search(profiles, 'nonexistent-character-zzzz').length, 0);
  assert.ok(core.search(profiles, 'Galdurman').some(p => p.node.id === 'skalk'));
  const gudvarr = profiles.find(p => p.node.id === 'gudvarr');
  assert.ok(core.aliases(gudvarr.node, revisions, data.guides).includes('Guthvarr'));
});

test('profiles and histories use the supplied archive revisions', () => {
  const one = view(1), two = view(2);
  assert.equal(core.search(one.profiles, 'Saeunn').length, 0);
  const biorr1 = one.profiles.find(p => p.node.id === 'biorr');
  const biorr2 = two.profiles.find(p => p.node.id === 'biorr');
  assert.ok(!biorr1.intro.includes('agente de Ilska'));
  assert.ok(biorr2.intro.includes('agente de Ilska'));
  assert.ok(one.profiles.every(p => p.revisions.every(n => n.book === 1) && p.timeline.every(e => e.book === 1)));
  assert.ok(one.profiles.every(p => !p.latest || p.latest.book === 1));
});

test('last development and timeline use chapter headings, not passing references', () => {
  const { profiles } = view(2);
  const p = profiles.find(p => p.node.id === 'gudvarr');
  assert.equal(p.latest.chapter, 48);
  assert.ok(p.latest.curated);
  assert.ok(p.latest.preview.includes('Kalv'));
  assert.ok(p.latest.text.includes('Kalv'));
  assert.equal(core.chapterSections('Esto pasó en el capítulo 48. Ver Libro 2, capítulo 30.').length, 0);
  const sections = core.chapterSections('LIBRO 2, CAPÍTULO 43 (EVENTO PARALELO, SIN POV): una amenaza. LIBRO 2, CAPÍTULO 44: otra escena.');
  assert.equal(sections.length, 2);
  assert.equal(sections[0].qualifier, '(EVENTO PARALELO, SIN POV)');
  assert.equal(sections[1].text, 'otra escena.');
});

test('grouping collects repeated connections without losing labels or directions', () => {
  const { nodes } = view(2);
  const groups = core.groupedConnections('orka', nodes, data.links);
  const items = [...groups.values()].flatMap(g => [...g.values()]);
  const count = items.reduce((n, item) => n + item.links.length, 0);
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const expected = data.links.filter(l => {
    if (l.source !== 'orka' && l.target !== 'orka') return false;
    const n = nodeMap.get(l.source === 'orka' ? l.target : l.source);
    return n && !['CENTER', 'CAT'].includes(n.group);
  });
  assert.equal(count, expected.length);
  assert.ok(items.some(item => item.links.length > 1));
  const incoming = items.flatMap(item => item.links).find(l => l.source !== nodeMap.get('orka').label);
  assert.ok(incoming);
  const objectLinks = data.links.map(l => ({ ...l, source: { id: l.source }, target: { id: l.target } }));
  assert.deepEqual(core.groupedConnections('orka', nodes, objectLinks), groups);
});

test('mention matcher links accented, Norse, shared, and unguided names without false positives', () => {
  const { nodes } = view(2);
  const matcher = core.buildMentionMatcher(nodes, revisions, data.guides);
  const text = 'Guðvarr y Røkia hablan con Arild. Troll-Slayer observa. Mord y Lif escuchan.'
    + ' Embargaron el Vargstad sin que Varg lo supiera.';
  const matches = core.findMentions(text, matcher);
  assert.deepEqual(matches.map(m => [m.text, m.id]), [
    ['Guðvarr', 'gudvarr'], ['Røkia', 'rokia'], ['Arild', 'arild'],
    ['Troll-Slayer', 'elvar'], ['Mord', 'mord'], ['Lif', 'lif'], ['Varg', 'varg'],
  ]);
  // 'Arild' has no CHARACTER_GUIDES entry; the matcher still finds it from the node label.
  assert.equal(data.guides.arild, undefined);
  // "Vargstad"/"Embargaron" must not trigger a match for "Varg".
  assert.ok(!matches.some(m => m.id === 'varg' && m.start !== text.lastIndexOf('Varg')));
});

test('mention matcher splits shared-ficha labels so each named person links on their own', () => {
  const { nodes } = view(2);
  const matcher = core.buildMentionMatcher(nodes, revisions, data.guides);
  const soloSkuld = core.findMentions('Skuld vigila.', matcher);
  assert.deepEqual(soloSkuld.map(m => [m.text, m.id]), [['Skuld', 'skuld']]);
  const combined = core.findMentions('Urd, Verdandi y Skuld custodian.', matcher);
  assert.deepEqual(combined.map(m => [m.text, m.id]), [['Urd', 'urd'], ['Verdandi', 'verdani'], ['Skuld', 'skuld']]);
});

test('mention matcher links places, objects, factions, and lore, not just characters', () => {
  const { nodes } = view(2);
  const matcher = core.buildMentionMatcher(nodes, revisions, data.guides);
  const text = 'Partieron de Fellur hacia Darl a bordo del Wave-Jarl, llevando una Brynja bien ajustada. Los Terrores de la batalla seguían el Seiðr de Vol.';
  const matches = core.findMentions(text, matcher);
  assert.deepEqual(matches.map(m => [m.text, m.id]), [
    ['Fellur', 'fellur'], ['Darl', 'darl'], ['Wave-Jarl', 'wave-jarl'], ['Brynja', 'brynja'], ['Terrores de la batalla', 'battle-grim'], ['Seiðr', 'seidr'], ['Vol', 'vol'],
  ]);
  // Event/plot titles joined with "y" are one phrase, not two entities — they must not be
  // split the way shared character fichas ("Mord y Lif") are.
  const eventNode = {id: 'test-viaje', label: 'Viaje y venta de Berak en Snakavik', group: 'EVENTO', type: 'Evento'};
  const eventMatcher = core.buildMentionMatcher([...nodes, eventNode], [...revisions, eventNode], data.guides);
  assert.equal(core.findMentions('Viaje a ninguna parte.', eventMatcher).length, 0);
});

test('profiles preserve complete source descriptions and all source snapshots', () => {
  const original = JSON.stringify(revisions);
  const { profiles } = view(2);
  const elvar = profiles.find(p => p.node.id === 'elvar');
  assert.equal(elvar.node.desc, revisions.filter(n => n.id === 'elvar').at(-1).desc);
  const longNode = { ...elvar.node, desc: 'Historia completa sin recortes. '.repeat(1200) };
  const longProfile = core.profile(longNode, [longNode], {});
  assert.equal(longProfile.node.desc, longNode.desc);
  assert.equal(longProfile.revisions[0].desc, longNode.desc);
  assert.ok(longProfile.intro.length < 400);
  assert.ok(elvar.intro.length < 400);
  assert.equal(elvar.revisions.length, revisions.filter(n => n.id === 'elvar').length);
  assert.equal(JSON.stringify(revisions), original);
  assert.ok(Object.keys(data.guides).every(id => view(2).nodes.some(n => n.id === id)));
});
