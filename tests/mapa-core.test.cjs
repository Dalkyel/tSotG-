const test = require('node:test');
const assert = require('node:assert/strict');
const { computeAffinity, forceCluster } = require('../mapa-core.js');

const GROUP = { CENTER: 'CENTER', CAT: 'CAT', NODE: 'NODE' };

test('computeAffinity weighs direct neighbors of a POV over depth-2 neighbors', () => {
  const nodes = [
    { id: 'orka', group: GROUP.NODE }, { id: 'varg', group: GROUP.NODE }, { id: 'elvar', group: GROUP.NODE },
    { id: 'direct', group: GROUP.NODE }, { id: 'depth2', group: GROUP.NODE },
  ];
  const links = [
    { source: 'orka', target: 'direct' },
    { source: 'direct', target: 'depth2' },
  ];
  const affinity = computeAffinity(nodes, links);
  assert.equal(affinity.direct, 'orka');
  assert.equal(affinity.depth2, 'orka');
});

test('computeAffinity falls back to group hint when a node has no POV connectivity', () => {
  const nodes = [
    { id: 'orka', group: GROUP.NODE }, { id: 'varg', group: GROUP.NODE }, { id: 'elvar', group: GROUP.NODE },
    { id: 'isolated', group: 'VARG' },
  ];
  const affinity = computeAffinity(nodes, []);
  assert.equal(affinity.isolated, 'varg');
});

test('computeAffinity never assigns POV/CENTER/CAT nodes to a cluster', () => {
  const nodes = [
    { id: 'orka', group: GROUP.NODE }, { id: 'varg', group: GROUP.NODE }, { id: 'elvar', group: GROUP.NODE },
    { id: 'root', group: GROUP.CENTER }, { id: 'cat-x', group: GROUP.CAT },
  ];
  const affinity = computeAffinity(nodes, []);
  assert.equal(affinity.orka, null);
  assert.equal(affinity.root, null);
  assert.equal(affinity['cat-x'], null);
});

test('forceCluster pulls a node toward its affine POV centroid', () => {
  const nodes = [
    { id: 'orka', group: GROUP.NODE, x: 100, y: 0, vx: 0, vy: 0 },
    { id: 'direct', group: GROUP.NODE, x: 0, y: 0, vx: 0, vy: 0 },
  ];
  const links = [{ source: 'orka', target: 'direct' }];
  const force = forceCluster(links, 0.5);
  force.initialize(nodes);
  force(1);
  const direct = nodes.find(n => n.id === 'direct');
  assert.ok(direct.vx > 0, 'node should accelerate toward its POV centroid');
});

test('forceCluster falls back to the group centroid when a node has no POV affinity', () => {
  const nodes = [
    { id: 'orka', group: GROUP.NODE, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'varg', group: GROUP.NODE, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'elvar', group: GROUP.NODE, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'peerA', group: 'LUGAR', x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'peerB', group: 'LUGAR', x: 100, y: 0, vx: 0, vy: 0 },
  ];
  const force = forceCluster([], 0.5);
  force.initialize(nodes);
  force(1);
  const peerA = nodes.find(n => n.id === 'peerA');
  assert.ok(peerA.vx > 0, 'node with no POV link should still cluster toward its group centroid');
});
