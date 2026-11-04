const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const scripts = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts');

function fixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chapter-appender-'));
  try { fn(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}
function run(root, book, kind, spec) {
  const file = path.join(root, 'spec.json');
  fs.writeFileSync(file, JSON.stringify(spec));
  return spawnSync(process.execPath, [path.join(scripts, 'append-entries.cjs'), String(book), kind, file], { cwd: root, encoding: 'utf8' });
}

test('chapter appender preserves original bytes and parsed links with or without a final comma', () => fixture(root => {
  const entry = { source: 'elvar', target: 'hrung', label: 'consulta a «Hrung» — consejo', type: 'event' };
  fs.mkdirSync(path.join(root, 'book1'));
  for (const comma of ['', ',']) {
    const file = path.join(root, 'book1/links.js');
    const prefix = `// Histórico\nconst links = [\n    {source: 'a', target: 'b', label: 'viejo', type: 'rel'}${comma}`;
    fs.writeFileSync(file, prefix + '\n];\n');
    const result = run(root, 1, 'links', { header: '// CAPÍTULO 25 — ELVAR', entries: [entry] });
    assert.equal(result.status, 0, result.stderr);
    const source = fs.readFileSync(file, 'utf8');
    assert.ok(source.startsWith(prefix));
    const array = new Function(source + ';return links;')();
    assert.deepEqual(array, [{ source: 'a', target: 'b', label: 'viejo', type: 'rel' }, entry]);
  }
}));

test('chapter appender supports later-book variables and exact broken-link labels', () => fixture(root => {
  fs.mkdirSync(path.join(root, 'book2'));
  const file = path.join(root, 'book2/links.js');
  fs.writeFileSync(file, 'const linksBook2 = [\n];\n');
  const entry = { source: 'cat-tramas', target: 'pasado-elvar', label: 'incluye', status: 'broken', reason: 'Capítulo 25: resuelta.' };
  const result = run(root, 2, 'links', { entries: [entry] });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(new Function(fs.readFileSync(file, 'utf8') + ';return linksBook2;')(), [entry]);
}));

test('chapter appender rejects duplicate or unordered summaries without modifying the file', () => fixture(root => {
  fs.mkdirSync(path.join(root, 'book2'));
  const file = path.join(root, 'book2/summaries.js');
  const original = 'const chapterSummariesBook2 = [\n    {chapter: 24, title: "Capítulo 24", summary: "Historia previa."},\n];\n';
  fs.writeFileSync(file, original);
  for (const chapters of [[24], [23], [26, 25]]) {
    const result = run(root, 2, 'summaries', { entries: chapters.map(chapter => ({ chapter, title: `Capítulo ${chapter}`, summary: 'Nuevo.' })) });
    assert.notEqual(result.status, 0);
    assert.equal(fs.readFileSync(file, 'utf8'), original);
  }
  const summary = { chapter: 25, title: 'Capítulo 25 — Elvar', summary: '<strong>Elvar</strong><br><br>¿Qué elegirá?' };
  const result = run(root, 2, 'summaries', { entries: [summary] });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(new Function(fs.readFileSync(file, 'utf8') + ';return chapterSummariesBook2;')()[1].summary, summary.summary);
}));

test('chapter appender rejects invalid specs and malformed source before writing', () => fixture(root => {
  fs.mkdirSync(path.join(root, 'book1'));
  const file = path.join(root, 'book1/links.js');
  const original = 'const links = [\n];\n';
  fs.writeFileSync(file, original);
  for (const spec of [
    { entries: [] },
    { header: '// unsafe\ncode', entries: [{ source: 'a', target: 'b', label: 'x', type: 'rel' }] },
    { entries: [{ source: 'a', target: 'b', label: 'x', type: 'invented' }] },
    { entries: [{ source: 'a', target: 'b', label: 'x', status: 'broken' }] },
  ]) {
    assert.notEqual(run(root, 1, 'links', spec).status, 0);
    assert.equal(fs.readFileSync(file, 'utf8'), original);
  }
  const malformed = 'const links = [\n {source: \n];\n';
  fs.writeFileSync(file, malformed);
  assert.notEqual(run(root, 1, 'links', { entries: [{ source: 'a', target: 'b', label: 'x', type: 'rel' }] }).status, 0);
  assert.equal(fs.readFileSync(file, 'utf8'), malformed);
}));
