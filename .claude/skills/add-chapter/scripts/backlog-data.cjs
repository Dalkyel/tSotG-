const fs = require('node:fs');

const POV_CATEGORIES = { 'cat-orka': 'ORKA', 'cat-varg': 'VARG', 'cat-elvar': 'ELVAR' };

// Live cat-orka/cat-varg/cat-elvar "incluye" arcs, read fresh each call (no baseline
// override): used only to label which POV a backlog candidate belongs to for the
// read-backlog --index shortcut. Category links are structural and essentially static,
// so skipping a baseline override here keeps this additive and side-effect-free for the
// review-backlog before/after diff, which never reads this field.
function povByTarget(book) {
  const pov = new Map();
  for (let b = 1; b <= book; b++) {
    const file = `book${b}/links.js`;
    if (!fs.existsSync(file)) continue;
    const variable = b === 1 ? 'links' : `linksBook${b}`;
    const links = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
    for (const link of links) {
      const tag = POV_CATEGORIES[link.source];
      if (tag && !pov.has(link.target)) pov.set(link.target, tag);
    }
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
    .map(({ file, node }) => ({
      file, id: node.id, label: node.label, group: node.group,
      ...(node.group === 'TRAMA' ? { desc: node.desc ?? '' } : {}),
      star: node.star ?? '',
      // Character nodes carry their own POV group directly; TRAMA/EVENTO/etc. nodes
      // carry it only via the separate cat-* arc link (see SKILL.md's group guide) —
      // check both, preferring the direct group when it's itself a POV.
      pov: ['ORKA', 'VARG', 'ELVAR'].includes(node.group) ? node.group : (pov.get(node.id) ?? null),
    }));
}

module.exports = { backlogCandidates };
