const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const verifier = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/verify-chapter.cjs');

function verify(term, staged = true, options = [], fixture = {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'chapter-verifier-test-'));
  try {
    fs.mkdirSync(path.join(cwd, 'book1'));
    const baseline = path.join(cwd, 'baseline');
    fs.mkdirSync(baseline);
    for (const [kind, variable] of Object.entries({ nodes: 'nodes', links: 'links', summaries: 'chapterSummaries' })) {
      fs.writeFileSync(path.join(baseline, `${kind}.js`), `const ${variable} = [];`);
      const data = kind === 'nodes' ? [
        { id: 'elvar', label: 'Elvar', group: 'ELVAR', desc: 'Guerrera.' },
        { id: 'battle-grim', label: 'Terrores de la batalla (Battle-Grim)', group: 'ELVAR', desc: 'Compañía.' },
        { id: 'froa', label: 'Froa (†)', group: 'ORKA', desc: 'Guardiana fallecida.' },
        { id: 'froa-especie', label: 'Froa-espíritu', group: 'VAESEN', desc: 'Categoría de vaesen.' },
        ...(fixture.nodes ?? []),
      ] : kind === 'summaries' ? [{ chapter: 1, title: 'Capítulo 1', summary: `<strong>${term}</strong>` }] : (fixture.links ?? []);
      fs.writeFileSync(path.join(cwd, 'book1', `${kind}.js`), `const ${variable} = ${JSON.stringify(data)};`);
    }
    const result = spawnSync(process.execPath, [verifier, '1', '1', baseline, ...(staged ? ['--staged-preview'] : []), ...options], { cwd, encoding: 'utf8' });
    return { status: result.status, output: result.stdout + result.stderr };
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
}

test('chapter verifier accepts canonical summary names in a staged preview', () => {
  const result = verify('Terrores de la batalla');
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /1 emphasized terms resolve completely \(staged preview; no guides\)/);
});

test('chapter verifier rejects unsupported and partially linked summary names', () => {
  for (const term of ['Battle-Grim', 'Terrores de la batalla (Battle-Grim)']) {
    const result = verify(term);
    assert.notEqual(result.status, 0, term);
    assert.match(result.output, /does not resolve completely to one node/);
  }
});

test('chapter verifier uses live aliases only for the live preview', () => {
  const live = verify('Troll-Slayer', false);
  assert.equal(live.status, 0, live.output);
  const staged = verify('Troll-Slayer');
  assert.notEqual(staged.status, 0);
  assert.match(staged.output, /does not resolve completely to one node/);
});

test('chapter verifier summary review distinguishes an individual from its species', () => {
  for (const [term, target] of [['Froa', 'Froa (†) [froa]'], ['Froa-espíritu', 'Froa-espíritu [froa-especie]']]) {
    const result = verify(term, true, ['--review-summary']);
    assert.equal(result.status, 0, result.output);
    assert.ok(result.output.includes(`${term} → ${target}`), result.output);
  }
  const quiet = verify('Froa');
  assert.equal(quiet.status, 0, quiet.output);
  assert.ok(!quiet.output.includes('Summary mentions —'));
});

test('chapter verifier requires active event-category links in either direction', () => {
  const nodes = [
    { id: 'cat-eventos', label: 'EVENTOS CLAVE', group: 'CAT', desc: 'Categoría.' },
    { id: 'hallazgo-froa', label: 'Hallazgo de Froa', group: 'EVENTO', desc: 'Descubrimiento.' },
  ];
  for (const reverse of [false, true]) {
    const link = { source: reverse ? 'hallazgo-froa' : 'cat-eventos', target: reverse ? 'cat-eventos' : 'hallazgo-froa', label: 'incluye', type: 'arc' };
    const result = verify('Elvar', true, [], { nodes, links: [link] });
    assert.equal(result.status, 0, result.output);
    for (const links of [[], [link, { ...link, status: 'broken', reason: 'Retirada.' }]]) {
      const invalid = verify('Elvar', true, [], { nodes, links });
      assert.notEqual(invalid.status, 0);
      assert.match(invalid.output, /hallazgo-froa: EVENTO must have an active direct link/);
    }
  }
});
