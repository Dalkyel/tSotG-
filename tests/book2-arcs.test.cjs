const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const A = require('../.claude/skills/add-chapter/scripts/archive-records.cjs');
const { merge } = require('../data-core.js');
const { POV_ARCS } = require('../mapa-core.js');
const root = path.resolve(__dirname, '..');

test('all five viewpoint arcs reach their narrator and Book Two scene/thread records', () => {
  const graph = merge([1, 2].map(book => ({ book, ...Object.fromEntries(
    ['nodes', 'links', 'summaries'].map(kind => [kind, A.read(root, book, kind).map(r => r.value)])
  ) })));
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  const groups = new Function(fs.readFileSync(path.join(root, 'groups.js'), 'utf8') + ';return GROUPS;')();
  for (const arc of POV_ARCS) {
    assert.equal(byId.get(arc.category)?.group, 'CAT', arc.category);
    assert.ok(groups[arc.group], arc.group);
    assert.ok(graph.links.some(l => l.source === 'root' && l.target === arc.category));
    assert.ok(graph.links.some(l => l.source === arc.category && l.target === arc.id && l.type === 'arc'));
  }
  assert.equal(byId.get('biorr').group, 'BIORR');
  assert.equal(byId.get('gudvarr').group, 'GUDVARR');
  for (const [category, target] of [
    ['cat-biorr', 'revelacion-infancia-biorr'], ['cat-biorr', 'promesa-rotta-biorr'],
    ['cat-gudvarr', 'huida-gudvarr-captura-kalv'], ['cat-gudvarr', 'vigilancia-hyrndur-gudvarr'],
  ]) assert.ok(graph.links.some(l => l.source === category && l.target === target), `${category} → ${target}`);
  // The parallel Leif/Sterkur scene is not Guðvarr's viewpoint.
  assert.ok(!graph.links.some(l => l.source === 'cat-gudvarr' && l.target === 'autorizacion-caza-varg'));

  const twoNodes = A.read(root, 2, 'nodes'), twoLinks = A.read(root, 2, 'links');
  const available = new Set(A.read(root, 1, 'nodes').map(r => r.value.id));
  for (let chapter = 0; chapter <= 50; chapter++) {
    twoNodes.filter(r => r.chapter === chapter).forEach(r => available.add(r.value.id));
    for (const { value: link } of twoLinks.filter(r => r.chapter === chapter)) {
      assert.ok(available.has(link.source) && available.has(link.target), `B2C${chapter}: ${link.source} → ${link.target}`);
    }
  }
  assert.equal(twoNodes.find(r => r.value.id === 'cat-biorr').chapter, 5);
  assert.equal(twoNodes.find(r => r.value.id === 'cat-gudvarr').chapter, 12);
  assert.ok(!A.read(root, 1, 'nodes').some(r => ['BIORR', 'GUDVARR'].includes(r.value.group)));
});
