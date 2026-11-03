const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/match-entities.cjs');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'entity-matcher-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const entries = [
    [
      { id: 'colinas-luna-oscura', label: 'Colinas de Luna Oscura (Dark-of-Moon Hills)' },
      { id: 'red-fain', label: 'Réd–Fain' },
      { id: 'old-name', label: 'Old–Name' },
      { id: 'iva', label: 'Íva' },
      { id: 'viva', label: 'Viva' },
      { id: 'punctuation', label: 'A.B' },
    ],
    [
      { id: 'old-name', label: 'New Name' },
      { id: 'future-only', label: 'Future Only' },
    ],
  ];
  entries.forEach((nodes, index) => {
    const book = index + 1;
    fs.mkdirSync(path.join(root, `book${book}`));
    fs.writeFileSync(path.join(root, `book${book}/nodes.js`),
      `const nodes${book === 1 ? '' : `Book${book}`} = ${JSON.stringify(nodes)};\n`);
  });
  return root;
}

function run(root, book, ...names) {
  const result = spawnSync(process.execPath, [script, String(book), ...names], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

test('entity matching treats spaced and hyphenated compounds as candidates while retaining historical labels and book caps', t => {
  const root = fixture(t);
  const before = [1, 2].map(book => fs.readFileSync(path.join(root, `book${book}/nodes.js`), 'utf8'));
  const out = run(root, 1, 'Dark of Moon', 'dark-of-moon', '  DARK\tOF  MOON ', 'red fain', 'red‑fain', 'Future Only');
  assert.match(out, /"Dark of Moon" -> colinas-luna-oscura/);
  assert.match(out, /"dark-of-moon" -> colinas-luna-oscura/);
  assert.match(out, /"  DARK\\tOF  MOON " -> colinas-luna-oscura/);
  assert.match(out, /"red fain" -> red-fain/);
  assert.match(out, /"red‑fain" -> red-fain/);
  assert.match(out, /"Future Only" -> UNMATCHED/);
  const later = run(root, 2, 'Old Name', 'New-Name', 'Future Only');
  assert.match(later, /"Old Name" -> old-name/);
  assert.match(later, /"New-Name" -> old-name/);
  assert.match(later, /"Future Only" -> future-only/);
  assert.match(later, /old-name \| \["Old–Name","New Name"\]/);
  assert.deepEqual([1, 2].map(book => fs.readFileSync(path.join(root, `book${book}/nodes.js`), 'utf8')), before);
});

test('separator normalization preserves Unicode whole-name boundaries and literal punctuation', t => {
  const root = fixture(t);
  const out = run(root, 1, 'Iva', 'DarkofMoon', 'ark of Moon', 'A.B', 'A B', 'A+B');
  assert.match(out, /"Iva" -> iva\n/);
  assert.match(out, /"DarkofMoon" -> UNMATCHED/);
  assert.match(out, /"ark of Moon" -> UNMATCHED/);
  assert.match(out, /"A.B" -> punctuation/);
  assert.match(out, /"A B" -> UNMATCHED/);
  assert.match(out, /"A\+B" -> UNMATCHED/);
});
