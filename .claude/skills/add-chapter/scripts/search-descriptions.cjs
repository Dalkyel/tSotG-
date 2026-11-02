#!/usr/bin/env node
// Run from the project root; evaluates trusted local node arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const [bookArg, pageArg, name, ...options] = process.argv.slice(2);
const book = Number(bookArg), page = Number(pageArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && name &&
  options.length % 2 === 0 && options.every((value, index) =>
    index % 2 === 0 ? value === '--id' : value && !value.startsWith('--')),
  'Usage: node .claude/skills/add-chapter/scripts/search-descriptions.cjs BOOK PAGE NAME [--id ID ...]');
const selectedIds = new Set(options.filter((_, index) => index % 2 === 1));
const latest = new Map(), history = [];
for (let b = 1; b <= book; b++) {
  const file = `book${b}/nodes.js`;
  const variable = b === 1 ? 'nodes' : `nodesBook${b}`;
  for (const node of new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)()) {
    const entry = { file, node };
    history.push(entry);
    latest.set(node.id, entry);
  }
}
const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'giu');
const matches = entries => entries.flatMap(({ file, node }) => {
  const hits = [...(node.desc || '').matchAll(regex)];
  return hits.length ? [{ file, node, hits }] : [];
});
let results = matches([...latest.values()]);
let mode = 'latest entries';
if (!results.length) {
  results = matches(history);
  mode = 'historical fallback (no latest-entry matches)';
}
const lines = [];
if (options.length) {
  const seenById = new Map();
  for (const id of selectedIds) assert.ok(latest.has(id), `Unknown id: ${id}`);
  for (const { file, node, hits } of results.filter(result => selectedIds.has(result.node.id))) {
    const id = node.id;
    if (!seenById.has(id)) seenById.set(id, new Set());
    const seen = seenById.get(id);
    for (const hit of hits) {
      const excerpt = node.desc.slice(Math.max(0, hit.index - 100), hit.index + hit[0].length + 240);
      if (seen.has(excerpt)) continue;
      seen.add(excerpt);
      lines.push(`${id} | ${file} | ${JSON.stringify(excerpt)}`);
    }
  }
} else {
  const candidates = new Map();
  for (const { file, node, hits } of results) {
    if (!candidates.has(node.id)) candidates.set(node.id, { labels: new Set(), files: new Set(), count: 0 });
    const candidate = candidates.get(node.id);
    candidate.labels.add(node.label);
    candidate.files.add(file);
    candidate.count += hits.length;
  }
  for (const [id, { labels, files, count }] of candidates)
    lines.push(`${id} | ${JSON.stringify([...labels])} | ${[...files].join(', ')} | ${count} matches`);
}
const payload = lines.join('\n') || 'NO MATCHES';
const pageSize = 8000, pages = Math.ceil(payload.length / pageSize);
assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
console.log(`${JSON.stringify(name)}; ${mode}; ${options.length ? 'excerpts for ' + [...selectedIds].join(', ') : 'candidate list'}.`);
console.log(`Page ${page}/${pages}; ${payload.length} total characters.`);
console.log(payload.slice((page - 1) * pageSize, page * pageSize));
console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same arguments.` : 'END: all results displayed.');
console.log('Literal, case-insensitive Unicode name matching; try spelling/accent variants separately. Read full latest entries before editing.');
