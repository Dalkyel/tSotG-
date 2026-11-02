#!/usr/bin/env node
// Run from the project root; evaluates trusted local node arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const [bookArg, pageArg, ...ids] = process.argv.slice(2);
const book = Number(bookArg), page = Number(pageArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && ids.length,
  'Usage: node .claude/skills/add-chapter/scripts/read-latest.cjs BOOK PAGE ID [ID ...]');

const latest = new Map();
for (let n = 1; n <= book; n++) {
  const file = `book${n}/nodes.js`;
  const variable = n === 1 ? 'nodes' : `nodesBook${n}`;
  const entries = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
  entries.forEach(node => latest.set(node.id, { file, node }));
}
const missing = ids.filter(id => !latest.has(id));
assert.equal(missing.length, 0, `Unknown ids: ${missing.join(', ')}`);
const payload = JSON.stringify([...new Set(ids)].map(id => latest.get(id)), null, 2);
// Paginate the serialized text, including very long individual descriptions.
const pageSize = 10000;
const pages = Math.ceil(payload.length / pageSize);
assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
console.log(`Page ${page}/${pages}; ${payload.length} total characters; latest entries through Book ${book}.`);
console.log(payload.slice((page - 1) * pageSize, page * pageSize));
console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same book and ids.` : 'END: all requested entries have been displayed across these pages.');
