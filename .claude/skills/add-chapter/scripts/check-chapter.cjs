#!/usr/bin/env node
// Run from the project root; evaluates trusted local summary arrays only.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { warnIfBypassingActiveRebuild } = require('./rebuild-guard.cjs');

const [bookArg, chapterArg] = process.argv.slice(2);
const book = Number(bookArg), chapter = Number(chapterArg);
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(chapter) && chapter >= 1,
  'Usage: node .claude/skills/add-chapter/scripts/check-chapter.cjs BOOK CHAPTER');
warnIfBypassingActiveRebuild(book);

const summaryFile = `book${book}/summaries.js`;
const variable = book === 1 ? 'chapterSummaries' : `chapterSummariesBook${book}`;
const summaries = new Function(fs.readFileSync(summaryFile, 'utf8') + `; return ${variable};`)();
const matches = summaries.filter(entry => entry.chapter === chapter);
console.log(`Book ${book}, chapter ${chapter}: ${matches.length} matching summaries; latest summary chapter: ${Math.max(0, ...summaries.map(entry => entry.chapter))}.`);

let sections = 0;
// Match comment headings only, never chapter references inside descriptions.
const heading = new RegExp(`^\\s*//[^\\r\\n]*CAP[ÍI]TULO\\s+${chapter}(?!\\d)`, 'iu');
for (const name of ['nodes', 'links', 'summaries']) {
  const file = `book${book}/${name}.js`;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const locations = lines.flatMap((line, index) => heading.test(line) ? [index + 1] : []);
  sections += locations.length;
  console.log(`${file}: ${locations.length} matching section headings${locations.length ? ` (lines ${locations.slice(0, 20).join(', ')}${locations.length > 20 ? ', …' : ''})` : ''}.`);
}
console.log(matches.length || sections
  ? 'EXISTS OR PARTIAL: inspect existing work before editing; do not blindly append.'
  : 'ABSENT: no matching summary or chapter section heading.');
