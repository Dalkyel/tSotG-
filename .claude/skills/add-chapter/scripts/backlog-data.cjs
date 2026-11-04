const fs = require('node:fs');
const { POV_ARCS } = require('../../../../mapa-core.js');

const POV_CATEGORIES = Object.fromEntries(POV_ARCS.map(arc => [arc.category, arc.group]));
const POV_GROUPS = POV_ARCS.map(arc => arc.group);

// Live registered viewpoint arcs, read fresh each call (no baseline
// override): used only to label which POV a backlog candidate belongs to for the
// read-backlog --index shortcut. Category links are structural and essentially static,
// so skipping a baseline override here keeps this additive and side-effect-free for the
// review-backlog before/after diff, which never reads this field.
function povByTarget(book) {
  const pov = new Map();
  const allLinks = [];
  for (let b = 1; b <= book; b++) {
    const file = `book${b}/links.js`;
    if (!fs.existsSync(file)) continue;
    const variable = b === 1 ? 'links' : `linksBook${b}`;
    const links = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
    allLinks.push(...links);
  }
  const key = link => JSON.stringify([link.source, link.target, link.label]);
  const broken = new Set(allLinks.filter(link => link.status === 'broken').map(key));
  for (const link of allLinks) {
    const tag = POV_CATEGORIES[link.source];
    if (!tag || link.type !== 'arc' || link.status === 'broken' || broken.has(key(link))) continue;
    if (!pov.has(link.target)) pov.set(link.target, new Set());
    pov.get(link.target).add(tag);
  }
  return pov;
}

// Shared selection for the reader and review checklist. A chapter baseline replaces
// only the current book, just as the chapter verifier's snapshots do.
function backlogCandidates(book, currentBookFile) {
  const latest = new Map();
  for (let b = 1; b <= book; b++) {
    const file = `book${b}/nodes.js`;
    const variable = b === 1 ? 'nodes' : `nodesBook${b}`;
    const source = b === book && currentBookFile ? currentBookFile : file;
    const nodes = new Function(fs.readFileSync(source, 'utf8') + `; return ${variable};`)();
    nodes.forEach(node => latest.set(node.id, { file, node }));
  }
  const pov = povByTarget(book);
  return [...latest.values()]
    .filter(({ node }) => node.group === 'TRAMA' || String(node.star ?? '').trim())
    .map(({ file, node }) => {
      const tags = [...new Set([
        ...(POV_GROUPS.includes(node.group) ? [node.group] : []),
        ...(pov.get(node.id) ?? []),
      ])];
      return {
        file, id: node.id, label: node.label, group: node.group,
        ...(node.group === 'TRAMA' ? { desc: node.desc ?? '' } : {}),
        star: node.star ?? '',
        // Preserve the direct group as the primary tag, plus every confirmed arc.
        pov: tags[0] ?? null,
        ...(tags.length > 1 ? { povs: tags } : {}),
      };
    });
}

module.exports = { backlogCandidates, POV_GROUPS };
