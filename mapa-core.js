(function (root) {
  'use strict';
  const POV_IDS = ['orka', 'varg', 'elvar'];

  // Assigns each node to a POV cluster (orka, varg, elvar) based on
  // link connectivity, then pulls toward that POV's centroid.
  function computeAffinity(nodes, links) {
    const affinity = {}; // nodeId -> 'orka'|'varg'|'elvar'|null
    // Build adjacency
    const adj = {};
    nodes.forEach(n => { adj[n.id] = new Set(); });
    links.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source;
      const t = typeof l.target === 'object' ? l.target.id : l.target;
      if (adj[s]) adj[s].add(t);
      if (adj[t]) adj[t].add(s);
    });
    // BFS from each POV, max depth 2
    POV_IDS.forEach(pov => {
      const visited = new Set([pov]);
      let frontier = [pov];
      for (let depth = 0; depth < 2; depth++) {
        const next = [];
        frontier.forEach(id => {
          (adj[id] || []).forEach(nb => {
            if (!visited.has(nb)) { visited.add(nb); next.push(nb); }
          });
        });
        frontier = next;
      }
      visited.forEach(id => {
        if (POV_IDS.includes(id)) return;
        if (!affinity[id]) affinity[id] = {};
        if (!affinity[id][pov]) affinity[id][pov] = 0;
        // Direct neighbors get weight 2, depth-2 get weight 1
        affinity[id][pov] += adj[id]?.has(pov) ? 2 : 1;
      });
    });
    // Resolve: pick POV with highest score; ties go to group heuristic
    const result = {};
    const groupHint = { ORKA: 'orka', VARG: 'varg', ELVAR: 'elvar' };
    nodes.forEach(n => {
      if (POV_IDS.includes(n.id) || n.group === 'CENTER' || n.group === 'CAT') {
        result[n.id] = null;
        return;
      }
      const scores = affinity[n.id];
      if (scores) {
        let best = null, bestVal = 0;
        for (const pov of POV_IDS) {
          if ((scores[pov] || 0) > bestVal) { bestVal = scores[pov]; best = pov; }
        }
        result[n.id] = best;
      } else {
        // Fallback: use group name as hint
        result[n.id] = groupHint[n.group] || null;
      }
    });
    return result;
  }

  function forceCluster(links, strength = 0.12) {
    let _nodes;
    let affinityMap;
    function force(alpha) {
      // Compute POV centroids
      const povPos = {};
      _nodes.forEach(n => {
        if (POV_IDS.includes(n.id)) povPos[n.id] = { x: n.x, y: n.y };
      });
      // Also compute group centroids as fallback
      const groupCentroids = {};
      const groupCounts = {};
      _nodes.forEach(n => {
        if (!groupCentroids[n.group]) { groupCentroids[n.group] = { x: 0, y: 0 }; groupCounts[n.group] = 0; }
        groupCentroids[n.group].x += n.x;
        groupCentroids[n.group].y += n.y;
        groupCounts[n.group]++;
      });
      for (const g in groupCentroids) { groupCentroids[g].x /= groupCounts[g]; groupCentroids[g].y /= groupCounts[g]; }

      _nodes.forEach(n => {
        if (n.group === 'CENTER' || n.group === 'CAT' || POV_IDS.includes(n.id)) return;
        const pov = affinityMap[n.id];
        let target;
        if (pov && povPos[pov]) {
          target = povPos[pov];
        } else {
          target = groupCentroids[n.group];
        }
        if (target) {
          n.vx += (target.x - n.x) * strength * alpha;
          n.vy += (target.y - n.y) * strength * alpha;
        }
      });
    }
    force.initialize = function (n) {
      _nodes = n;
      affinityMap = computeAffinity(_nodes, links);
    };
    return force;
  }

  const api = { POV_IDS, computeAffinity, forceCluster };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MapaCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
