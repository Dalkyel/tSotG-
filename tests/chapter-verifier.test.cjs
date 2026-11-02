const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const verifier = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/verify-chapter.cjs');

function verify(term, staged = true) {
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
      ] : kind === 'summaries' ? [{ chapter: 1, title: 'Capítulo 1', summary: `<strong>${term}</strong>` }] : [];
      fs.writeFileSync(path.join(cwd, 'book1', `${kind}.js`), `const ${variable} = ${JSON.stringify(data)};`);
    }
    const result = spawnSync(process.execPath, [verifier, '1', '1', baseline, ...(staged ? ['--staged-preview'] : [])], { cwd, encoding: 'utf8' });
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
