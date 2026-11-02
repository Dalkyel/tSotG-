#!/usr/bin/env node
// Run from the project root; evaluates trusted local node arrays only.
//
// Appends one new node entry to book{N}/nodes.js without ever passing the
// existing baseline desc/star text back through the caller: this script reads
// it straight from the file and splices it internally, so an update can never
// retype (and silently corrupt) accumulated canon text. Only genuinely new
// content — the chapter's own addition — needs to be supplied by the caller.
//
// Usage: node append-node.cjs BOOK ID SPEC_FILE
//
// SPEC_FILE is a small JSON file:
//   update (existing id, baseline desc/star read from the file and extended):
//     { "mode": "update", "descAppend": "...", "starAppend": "..." (optional),
//       "previousState": "...", "status": "updated" (optional, default "updated"),
//       "label"/"group"/"type": "..." (optional overrides),
//       "header": "// ── LIBRO N, CAPÍTULO M — POV ──" (optional; include only
//                  on the first node appended for a new chapter section) }
//   new (brand-new id, full fields supplied as-is, no baseline involved):
//     { "mode": "new", "label": "...", "group": "...", "type": "...",
//       "desc": "...", "star": "...", "header": "..." (optional) }
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');

const [bookArg, id, specPath] = process.argv.slice(2);
const book = Number(bookArg);
assert.ok(Number.isInteger(book) && book >= 1 && id && specPath,
  'Usage: node .claude/skills/add-chapter/scripts/append-node.cjs BOOK ID SPEC_FILE');

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
assert.ok(spec.mode === 'update' || spec.mode === 'new', 'spec.mode must be "update" or "new"');

const file = `book${book}/nodes.js`;
const variable = book === 1 ? 'nodes' : `nodesBook${book}`;
const text = fs.readFileSync(file, 'utf8');
const currentArray = new Function(text + `; return ${variable};`)();

let label, group, type, status, previousState, desc, star;

if (spec.mode === 'update') {
  const latest = new Map();
  for (let n = 1; n <= book; n++) {
    const bfile = `book${n}/nodes.js`;
    const bvar = n === 1 ? 'nodes' : `nodesBook${n}`;
    const arr = n === book ? currentArray : new Function(fs.readFileSync(bfile, 'utf8') + `; return ${bvar};`)();
    arr.forEach(node => latest.set(node.id, node));
  }
  const baseline = latest.get(id);
  assert.ok(baseline, `Unknown id "${id}" through Book ${book} — use mode: "new" for a brand-new node`);
  assert.ok(spec.descAppend && spec.descAppend.trim(), 'spec.descAppend is required for mode: "update"');
  assert.ok(spec.previousState && spec.previousState.trim(), 'spec.previousState is required for mode: "update"');

  label = spec.label ?? baseline.label;
  group = spec.group ?? baseline.group;
  type = spec.type ?? baseline.type;
  status = spec.status ?? 'updated';
  previousState = spec.previousState;
  desc = [baseline.desc ?? '', spec.descAppend].filter(Boolean).join(' ');
  star = [baseline.star ?? '', spec.starAppend ?? ''].filter(Boolean).join(' ');
} else {
  assert.ok(!currentArray.some(node => node.id === id), `Id "${id}" already exists in ${file} — use mode: "update"`);
  for (const field of ['label', 'group', 'type', 'desc']) {
    assert.ok(spec[field] && String(spec[field]).trim(), `spec.${field} is required for mode: "new"`);
  }
  ({ label, group, type, desc } = spec);
  star = spec.star ?? '';
}

const lines = [
  '    {',
  `        id: ${JSON.stringify(id)}, label: ${JSON.stringify(label)}, group: ${JSON.stringify(group)}, type: ${JSON.stringify(type)},`,
];
if (spec.mode === 'update') {
  lines.push(`        status: ${JSON.stringify(status)},`);
  lines.push(`        previousState: ${JSON.stringify(previousState)},`);
}
lines.push(`        desc: ${JSON.stringify(desc)},`);
lines.push(`        star: ${JSON.stringify(star)}`);
lines.push('    },');
const block = lines.join('\n');

const closeRe = /\n\]\s*;\s*$/;
const m = text.match(closeRe);
assert.ok(m, `Could not find the trailing "];" to insert before in ${file}`);
const insertion = '\n' + (spec.header ? `\n${spec.header}\n` : '') + block;
const newText = text.slice(0, m.index) + insertion + m[0];

fs.writeFileSync(file, newText);
execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
console.log(`OK: ${spec.mode === 'update' ? 'updated' : 'created'} "${id}" in ${file} ` +
  `(desc ${desc.length} chars, star ${star.length} chars). Baseline text was read from disk, not retyped.`);
