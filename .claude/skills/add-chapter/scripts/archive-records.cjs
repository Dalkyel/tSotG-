// Trusted local JS arrays only. Keep chapter ownership from section comments,
// never from chapter numbers inside accumulated descriptions.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const variable = (kind, book) => (kind === 'summaries' ? 'chapterSummaries' : kind) + (book === 1 ? '' : `Book${book}`);
function records(text, kind, book) {
  const declaration = new RegExp(`\\bconst\\s+${variable(kind, book)}\\s*=\\s*\\[`).exec(text);
  assert.ok(declaration, `Missing ${variable(kind, book)} array`);
  const values = new Function(text + `;return ${variable(kind, book)};`)();
  const spans = []; let depth = 1, quote = null, comment = null, start, previous = declaration.index + declaration[0].length, chapter = 0;
  for (let i = previous; i < text.length && depth; i++) {
    const c = text[i], next = text[i + 1];
    if (comment === 'line') { if (c === '\n') comment = null; continue; }
    if (comment === 'block') { if (c === '*' && next === '/') { comment = null; i++; } continue; }
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = null; continue; }
    if (c === '/' && next === '/') { comment = 'line'; i++; continue; }
    if (c === '/' && next === '*') { comment = 'block'; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{' || c === '[') { if (depth === 1 && c === '{') start = i; depth++; }
    if (c === '}' || c === ']') {
      depth--;
      if (depth === 1 && c === '}') {
        const gap = text.slice(previous, start);
        for (const match of gap.matchAll(/^\s*\/\/[^\n]*?(?:CAP[IÍ]TULO|CHAPTER)\s+(\d+)\b/gim)) chapter = Number(match[1]);
        const value = values[spans.length];
        spans.push({ chapter: kind === 'summaries' ? value.chapter : chapter, value, start, end: i + 1 }); previous = i + 1;
      }
    }
  }
  assert.equal(spans.length, values.length, 'Cannot assign every record to a chapter');
  return spans;
}
function read(root, book, kind) { return records(fs.readFileSync(`${root}/book${book}/${kind}.js`, 'utf8'), kind, book); }
function loadBook(root, book) { return Object.fromEntries(['nodes', 'links', 'summaries'].map(k => [k, read(root, book, k)])); }
function latest(items) { return new Map(items.map(item => [item.value.id, item.value])); }
module.exports = { variable, records, read, loadBook, latest };
