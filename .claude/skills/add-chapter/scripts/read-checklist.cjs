#!/usr/bin/env node
// Read saved assessments without needing the temporary baseline or live archive.
// This reports human-authored evidence; it never infers states or certifies coverage.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { paginate } = require('./paginate.cjs');

try {
  const [file, pageArg, ...selection] = process.argv.slice(2);
  const index = selection[0] === '--index';
  const ids = index ? selection.slice(1) : selection;
  const page = Number(pageArg);
  assert.ok(file && Number.isSafeInteger(page) && page >= 1 &&
    ids.every(id => id && !id.startsWith('--')) && new Set(ids).size === ids.length,
  'Usage: node read-checklist.cjs CHECKLIST.json PAGE [--index] [ID ...]');
  const checklist = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.ok(Number.isInteger(checklist.book) && checklist.book >= 1 &&
    Number.isInteger(checklist.chapter) && checklist.chapter >= 1 &&
    Array.isArray(checklist.items), 'Invalid checklist book/chapter/items');
  const seen = new Set();
  for (const item of checklist.items) {
    assert.ok(item && typeof item.id === 'string' && item.id && !seen.has(item.id),
      `Missing or duplicate checklist id: ${item?.id}`);
    seen.add(item.id);
  }
  for (const id of ids) assert.ok(seen.has(id), `Unknown checklist id: ${id}`);
  const selected = ids.length ? checklist.items.filter(item => ids.includes(item.id)) : checklist.items;
  // Full mode retains every stored field, including long multi-clue evidence.
  const payload = index
    ? selected.map(({ id, assessment, remaining }) =>
      `${id} | ${assessment || 'pending'} | ${remaining || '—'}`).join('\n') || 'NO ITEMS'
    : JSON.stringify(selected);
  const chunks = paginate(payload);
  const pages = chunks.length;
  assert.ok(page <= pages, `Requested page ${page}; only ${pages} pages available`);
  console.log(`Saved checklist: Book ${checklist.book}, chapter ${checklist.chapter}; ${selected.length}/${checklist.items.length} items selected.`);
  console.log('Stored assessments only; no archive/source validation or semantic PASS. Use review-backlog check for active-run coverage.');
  if (index) console.log('INDEX ONLY: ID, saved assessment and remaining question. Omit --index to read complete evidence.');
  console.log(`Page ${page}/${pages}; ${payload.length} total characters.`);
  console.log(chunks[page - 1]);
  console.log(page < pages ? `CONTINUES: read page ${page + 1} with the same checklist, format and IDs.` : 'END: all selected checklist records displayed.');
} catch (error) {
  console.error(`Checklist read failed: ${error.message}`);
  process.exitCode = 1;
}
