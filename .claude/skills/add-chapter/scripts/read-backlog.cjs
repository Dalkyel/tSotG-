#!/usr/bin/env node
// Inventory review candidates, not inferred states: closed history and thematic
// stars must still be classified by the reader against the complete chapter.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const [bookArg, pageArg, ...extra] = process.argv.slice(2);
const book = Number(bookArg), page = Number(pageArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && !extra.length,
  'Usage: node .claude/skills/add-chapter/scripts/read-backlog.cjs BOOK PAGE');

const latest = new Map();
for (let b = 1; b <= book; b++) {
  const file = `book${b}/nodes.js`;
  const variable = b === 1 ? 'nodes' : `nodesBook${b}`;
  const nodes = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
  nodes.forEach(node => latest.set(node.id, { file, node }));
}
const candidates = [...latest.values()]
  .filter(({ node }) => node.group === 'TRAMA' || String(node.star ?? '').trim())
  .map(({ file, node }) => ({
    file, id: node.id, label: node.label, group: node.group,
    ...(node.group === 'TRAMA' ? { desc: node.desc ?? '' } : {}),
    star: node.star ?? '',
  }));
const payload = JSON.stringify(candidates, null, 2);
const pageSize = 8000, pages = Math.ceil(payload.length / pageSize);
assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
console.log(`Backlog review candidates through Book ${book}: ${candidates.length} latest entries (all TRAMA nodes and nonempty star fields, across all POVs).`);
console.log(`Page ${page}/${pages}; ${payload.length} total characters.`);
console.log(payload.slice((page - 1) * pageSize, page * pageSize));
console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same book.` : 'END: all review candidates displayed.');
console.log('Includes closed history and thematic notes; classify manually. Non-TRAMA descriptions are omitted: use read-latest before updating and read-links for relevant relationships.');
