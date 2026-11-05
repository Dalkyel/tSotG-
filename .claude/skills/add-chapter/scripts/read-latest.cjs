#!/usr/bin/env node
// Run from the project root; evaluates trusted local node arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { paginate } = require('./paginate.cjs');

const [bookArg, pageArg, ...extra] = process.argv.slice(2);
let metadataOnly = false;
let withoutStar = false;
const ids = [];
for (const arg of extra) {
  if (arg === '--metadata' && !metadataOnly) metadataOnly = true;
  else if (arg === '--without-star' && !withoutStar) withoutStar = true;
  else {
    assert.ok(!arg.startsWith('--'), `Unknown or duplicate option: ${arg}`);
    ids.push(arg);
  }
}
const book = Number(bookArg), page = Number(pageArg);
assert.ok(!(metadataOnly && withoutStar), '--metadata and --without-star are separate read modes');
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && ids.length,
  'Usage: node .claude/skills/add-chapter/scripts/read-latest.cjs BOOK PAGE [--metadata | --without-star] ID [ID ...]');

const latest = new Map();
for (let n = 1; n <= book; n++) {
  const file = `book${n}/nodes.js`;
  const variable = n === 1 ? 'nodes' : `nodesBook${n}`;
  const entries = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
  entries.forEach(node => latest.set(node.id, { file, node }));
}
const missing = ids.filter(id => !latest.has(id));
if (missing.length) {
  console.error(`Unknown ids in the selected archive: ${[...new Set(missing)].join(', ')}`);
  const available = [...new Set(ids)].filter(id => latest.has(id));
  if (available.length) console.error(`Known requested ids: ${available.join(', ')}`);
  console.error('No entries printed. Resolve unknown ids or remove them from this read batch before retrying.');
  process.exit(1);
}
const payload = JSON.stringify([...new Set(ids)].map(id => {
  const entry = latest.get(id);
  if (withoutStar) {
    const { star, ...profile } = entry.node;
    return { file: entry.file, node: profile };
  }
  if (!metadataOnly) return entry;
  const { desc, star, ...metadata } = entry.node;
  return { file: entry.file, node: metadata };
}), null, 2);
// Paginate the serialized text, including very long individual descriptions.
const chunks = paginate(payload);
const pages = chunks.length;
assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
console.log(`Page ${page}/${pages}; ${payload.length} total characters; latest entries through Book ${book}.`);
if (metadataOnly) console.log('METADATA ONLY: desc/star omitted. Combine with a complete, same-version prose read; this is not a full-entry read.');
if (withoutStar) console.log('WITHOUT STAR: star omitted. Combine with a complete, same-version star read; this is not a full-entry read.');
console.log(chunks[page - 1]);
console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same book, ids and options.` : `END: all requested ${metadataOnly ? 'metadata' : withoutStar ? 'profiles without star' : 'entries'} have been displayed across these pages.`);
