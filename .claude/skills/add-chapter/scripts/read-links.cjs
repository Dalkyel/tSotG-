#!/usr/bin/env node
// Run from the project root; evaluates trusted local node/link arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const [bookArg, pageArg, ...args] = process.argv.slice(2);
const between = args[0] === '--between';
const ids = between ? args.slice(1) : args;
const book = Number(bookArg), page = Number(pageArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && ids.length,
  'Usage: node .claude/skills/add-chapter/scripts/read-links.cjs BOOK PAGE ID [ID ...] | BOOK PAGE --between ID ID');
assert.ok(ids.every(id => !id.startsWith('--')), 'Unknown or misplaced option');
assert.ok(!between || ids.length === 2, '--between requires exactly two endpoint ids');

const labels = new Map(), links = [];
for (let n = 1; n <= book; n++) {
  for (const kind of ['nodes', 'links']) {
    const file = `book${n}/${kind}.js`;
    const variable = kind + (n === 1 ? '' : `Book${n}`);
    const entries = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
    if (kind === 'nodes') entries.forEach(node => labels.set(node.id, node.label));
    else entries.forEach(link => links.push({ file, link }));
  }
}
const selected = new Set(ids);
assert.ok(ids.every(id => labels.has(id)), `Unknown ids: ${ids.filter(id => !labels.has(id)).join(', ')}`);
// Show stored history, including removals; do not mistake a broken marker for an active edge.
const matches = links.filter(({ link }) => between
  ? (link.source === ids[0] && link.target === ids[1]) || (link.source === ids[1] && link.target === ids[0])
  : selected.has(link.source) || selected.has(link.target));
const payload = matches.map(({ file, link }) => {
  const sentence = `${labels.get(link.source)} [${link.source}] → ${link.label} → ${labels.get(link.target)} [${link.target}]`;
  return `${file} | ${link.status === 'broken' ? '[BROKEN] ' : ''}${sentence} | ${link.type ?? 'no type'}${link.reason ? ` | ${link.reason}` : ''}`;
}).join('\n') || 'NO MATCHES';
const pageSize = 8000, pages = Math.ceil(payload.length / pageSize);
assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
console.log(`Page ${page}/${pages}; ${matches.length} stored links ${between ? 'between selected endpoints (both directions)' : 'touching selected ids'} through Book ${book}. Includes history and broken markers, not a resolved active graph.`);
console.log(payload.slice((page - 1) * pageSize, page * pageSize));
console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same book and ids.` : 'END: all matching links displayed.');
