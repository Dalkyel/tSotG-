const fs = require('node:fs');

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
  return [...latest.values()]
    .filter(({ node }) => node.group === 'TRAMA' || String(node.star ?? '').trim())
    .map(({ file, node }) => ({
      file, id: node.id, label: node.label, group: node.group,
      ...(node.group === 'TRAMA' ? { desc: node.desc ?? '' } : {}),
      star: node.star ?? '',
    }));
}

module.exports = { backlogCandidates };
