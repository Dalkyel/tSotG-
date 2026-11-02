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
      const baselineData = kind === 'nodes' ? (fixture.baselineNodes ?? []) : [];
      fs.writeFileSync(path.join(baseline, `${kind}.js`), `const ${variable} = ${JSON.stringify(baselineData)};`);
      const data = kind === 'nodes' ? [
        ...baselineData,
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

test('chapter verifier node review emits verified suffixes, complete new nodes and metadata changes', () => {
  const before = { id: 'reviewed', label: 'Nombre anterior', group: 'ORKA', type: 'Pendiente', desc: 'Historia ya revisada.', star: 'Pista anterior.', legacy: 'retirar' };
  const after = { id: 'reviewed', label: 'Nombre actual', group: 'ORKA', type: 'Resuelta', status: 'updated', previousState: 'Actualiza el nombre.', desc: before.desc + ' Nueva evidencia.', star: before.star + ' Pista aclarada.' };
  const fixture = { baselineNodes: [before], nodes: [after] };
  const result = verify('Elvar', true, ['--review-nodes=1'], fixture);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /"descAppend": " Nueva evidencia\."/);
  assert.match(result.output, /"starAppend": " Pista aclarada\."/);
  assert.ok(!result.output.includes(before.desc));
  assert.ok(!result.output.includes(before.star));
  assert.match(result.output, /"before": "Nombre anterior"/);
  assert.match(result.output, /"after": "Nombre actual"/);
  assert.match(result.output, /"legacy": \{\s+"before": "retirar",\s+"after": null/);
  assert.match(result.output, /"desc": "Guerrera\."/); // Full new entry.
  assert.match(result.output, /END: all changed nodes displayed/);
  const invalid = verify('Elvar', true, ['--review-nodes=1'], { ...fixture, nodes: [{ ...after, desc: 'Historia sobrescrita.' }] });
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.output, /does not preserve its latest baseline text/);
  assert.ok(!invalid.output.includes('Node review page'));
});

test('chapter verifier node review paginates without loss and rejects invalid pages', () => {
  const fixture = { nodes: [{ id: 'large', label: 'Texto largo', group: 'ORKA', desc: 'inicio-' + 'x'.repeat(12000) + '-final' }] };
  const first = verify('Elvar', true, ['--review-nodes=1'], fixture);
  const second = verify('Elvar', true, ['--review-nodes=2'], fixture);
  assert.equal(first.status, 0, first.output);
  assert.equal(second.status, 0, second.output);
  assert.match(first.output, /Node review page 1\/2/);
  assert.match(first.output, /CONTINUES: use --review-nodes=2/);
  assert.match(second.output, /-final/);
  const pageText = output => output.split('prefixes verified.\n')[1].split(/\n(?:CONTINUES:|END:)/)[0];
  const entries = JSON.parse(pageText(first.output) + pageText(second.output));
  assert.equal(entries.find(entry => entry.node.id === 'large').node.desc, fixture.nodes[0].desc);
  const invalid = verify('Elvar', true, ['--review-nodes=3'], fixture);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.output, /exceeds 2 pages/);
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
