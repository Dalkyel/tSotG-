#!/usr/bin/env node
// Run from the project root; evaluates trusted local node arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { warnIfBypassingActiveRebuild } = require('./rebuild-guard.cjs');

const [bookArg, ...names] = process.argv.slice(2);
const book = Number(bookArg);
const dumpAll = names.length === 1 && names[0] === '--all';
assert.ok(Number.isInteger(book) && book >= 1 && (names.length || dumpAll),
  'Usage: node .claude/skills/add-chapter/scripts/match-entities.cjs BOOK NAME [NAME ...]\n' +
  '   or: node .claude/skills/add-chapter/scripts/match-entities.cjs BOOK --all');
warnIfBypassingActiveRebuild(book);

// Keep all historical labels, including variants replaced in later chapters.
const inventory = new Map();
for (let n = 1; n <= book; n++) {
  const file = `book${n}/nodes.js`;
  const variable = n === 1 ? 'nodes' : `nodesBook${n}`;
  const entries = new Function(fs.readFileSync(file, 'utf8') + `; return ${variable};`)();
  for (const { id, label } of entries) {
    if (!inventory.has(id)) inventory.set(id, new Set());
    inventory.get(id).add(label);
  }
}
if (dumpAll) {
  // Full compact listing: use only when the chapter's entity list isn't complete
  // or targeted matching is uncertain — otherwise pass names to filter.
  for (const [id, labels] of inventory) console.log(`${id} | ${JSON.stringify([...labels])}`);
  process.exit(0);
}
// Source prose may space a compound that inventory labels/ids hyphenate.
// Normalize separators without removing word boundaries or other punctuation.
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '')
  .toLowerCase().replace(/[\p{Dash_Punctuation}\s]+/gu, ' ').trim();
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const matched = new Map();
const unmatched = [];
for (const name of names) {
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escape(normalize(name))}(?![\\p{L}\\p{N}])`, 'u');
  const ids = [];
  for (const [id, labels] of inventory) {
    if (pattern.test(normalize(id)) || [...labels].some(label => pattern.test(normalize(label)))) {
      ids.push(id);
      matched.set(id, labels);
    }
  }
  console.log(`${JSON.stringify(name)} -> ${ids.length ? ids.join(', ') : 'UNMATCHED'}`);
  if (!ids.length) unmatched.push(name);
}
console.log('Matched inventory:');
for (const [id, labels] of matched) console.log(`${id} | ${JSON.stringify([...labels])}`);
console.log(`Unmatched names: ${JSON.stringify(unmatched)}`);
console.log('Unmatched names still require spelling/alias checks and description searches before creating IDs.');
