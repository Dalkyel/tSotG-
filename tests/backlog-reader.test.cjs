const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const scripts = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'backlog-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function writeNodes(root, book, nodes) {
  fs.mkdirSync(path.join(root, `book${book}`), { recursive: true });
  fs.writeFileSync(path.join(root, `book${book}/nodes.js`),
    `const ${book === 1 ? 'nodes' : `nodesBook${book}`} = ${JSON.stringify(nodes)};`);
}
function run(root, ...args) {
  return spawnSync(process.execPath, [path.join(scripts, 'read-backlog.cjs'), ...args.map(String)],
    { cwd: root, encoding: 'utf8' });
}
function pageText(result) {
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.slice(result.stdout.indexOf('\n', result.stdout.indexOf('Page ')) + 1,
    result.stdout.search(/\n(?:CONTINUES:|END:)/));
}

test('Book Two POV filters retain shared old/new arc memberships and untagged clues', t => {
  const root = fixture(t);
  writeNodes(root, 1, [
    { id: 'biorr', group: 'ELVAR', star: 'Earlier perspective.' },
    { id: 'shared', group: 'TRAMA', desc: 'One question shared across arcs.' },
    { id: 'court', group: 'TRAMA', desc: 'Court intrigue.' },
    { id: 'untagged', group: 'TRAMA', desc: 'Review across POVs.' },
    { id: 'retired', group: 'TRAMA', desc: 'Former membership.' },
  ]);
  fs.writeFileSync(path.join(root, 'book1/links.js'), `const links = ${JSON.stringify([
    { source: 'cat-elvar', target: 'biorr', label: 'incluye', type: 'arc' },
    { source: 'cat-elvar', target: 'shared', label: 'incluye', type: 'arc' },
    { source: 'cat-biorr', target: 'retired', label: 'incluye', type: 'arc' },
  ])};`);
  writeNodes(root, 2, [{ id: 'biorr', group: 'BIORR', star: 'Own viewpoint.' }]);
  fs.writeFileSync(path.join(root, 'book2/links.js'), `const linksBook2 = ${JSON.stringify([
    { source: 'cat-biorr', target: 'biorr', label: 'incluye', type: 'arc' },
    { source: 'cat-biorr', target: 'shared', label: 'incluye', type: 'arc' },
    { source: 'cat-gudvarr', target: 'court', label: 'incluye', type: 'arc' },
    { source: 'cat-biorr', target: 'retired', label: 'incluye', status: 'broken' },
  ])};`);
  const biorr = JSON.parse(pageText(run(root, 2, 1, '--pov', 'BIORR', '--compact')));
  assert.deepEqual(biorr.map(n => n.id), ['biorr', 'shared', 'untagged', 'retired']);
  assert.deepEqual(biorr.find(n => n.id === 'shared').povs, ['ELVAR', 'BIORR']);
  assert.deepEqual(biorr.find(n => n.id === 'biorr').povs, ['BIORR', 'ELVAR']);
  const oldArc = JSON.parse(pageText(run(root, 2, 1, '--pov', 'ELVAR', '--compact')));
  assert.ok(oldArc.some(n => n.id === 'shared'));
  const court = JSON.parse(pageText(run(root, 2, 1, '--pov', 'GUDVARR', '--compact')));
  assert.deepEqual(court.map(n => n.id), ['court', 'untagged', 'retired']);
  const index = pageText(run(root, 2, 1, '--index'));
  assert.match(index, /shared \[ELVAR\] \[BIORR\] \[TRAMA\]/);
  assert.match(index, /court \[GUDVARR\] \[TRAMA\]/);
  assert.match(index, /retired \[TRAMA\]/);
  assert.doesNotMatch(pageText(run(root, 1, 1, '--index')), /biorr \[BIORR\]/);
});

test('compact prose preserves every selected field across pages and reduces formatting overhead', t => {
  const root = fixture(t);
  writeNodes(root, 1, [
    { id: 'early-clue', label: 'Pista', group: 'ELVAR', star: 'Short clue before a long record' },
    { id: 'elvar', label: 'Elvar', group: 'ELVAR', star: 'Latest clue: "á"\n'.repeat(900) },
    { id: 'shared', label: 'Pregunta', group: 'TRAMA', desc: 'ESTADO: PARCIAL; evidencia íntegra', star: 'another clue' },
    { id: 'drekr', group: 'ORKA', star: 'included cross-POV evidence' },
    { id: 'varg', group: 'VARG', star: 'omitted evidence' },
  ]);
  const options = ['--pov', 'ELVAR', '--include', 'drekr'];
  function readAll(...format) {
    let payload = '', pages = 1;
    for (let page = 1; page <= pages; page++) {
      const result = run(root, 1, page, ...options, ...format);
      const chunk = pageText(result);
      assert.ok(chunk.length <= 8000);
      pages = Number(result.stdout.match(/Page \d+\/(\d+)/)[1]);
      payload += chunk;
    }
    return { payload, pages };
  }
  const normal = readAll(), compact = readAll('--compact');
  assert.ok(compact.pages > 1);
  assert.equal(pageText(run(root, 1, 1, ...options, '--compact')).length, 8000);
  assert.ok(compact.payload.length < normal.payload.length);
  assert.deepEqual(JSON.parse(compact.payload), JSON.parse(normal.payload));
  assert.deepEqual(JSON.parse(compact.payload).map(n => n.id), ['early-clue', 'elvar', 'shared', 'drekr']);
  assert.notEqual(run(root, 1, compact.pages + 1, ...options, '--compact').status, 0);
  assert.notEqual(run(root, 1, 1, '--compact', '--compact').status, 0);
  assert.notEqual(run(root, 1, 1, '--index', '--compact').status, 0);
  writeNodes(root, 1, []);
  assert.deepEqual(JSON.parse(pageText(run(root, 1, 1, '--compact'))), []);
});

test('backlog reader respects book caps and latest revisions across all POVs', t => {
  const root = fixture(t);
  writeNodes(root, 1, [
    { id: 'orka', group: 'ORKA', desc: 'LONG PERSONAL HISTORY', star: 'old clue' },
    { id: 'orka', group: 'ORKA', desc: 'LONG PERSONAL HISTORY', star: 'latest clue' },
    { id: 'varg-thread', group: 'TRAMA', desc: 'ESTADO: PARCIAL', star: '' },
    { id: 'elvar-closed', group: 'TRAMA', desc: 'ESTADO: RESUELTA', star: '' },
    { id: 'myth', group: 'COSMO', star: 'Thematic note, not necessarily a clue' },
    { id: 'plain', group: 'ORKA', desc: 'ordinary profile', star: '  ' },
  ]);
  writeNodes(root, 2, [
    { id: 'orka', group: 'ORKA', star: '' },
    { id: 'varg-thread', group: 'TRAMA', desc: 'ESTADO: RESUELTA; Book Two answer' },
    { id: 'future', group: 'TRAMA', desc: 'future question' },
  ]);
  const first = run(root, 1, 1);
  const entries = JSON.parse(pageText(first));
  assert.deepEqual(entries.map(n => n.id), ['orka', 'varg-thread', 'elvar-closed', 'myth']);
  assert.equal(entries[0].star, 'latest clue');
  assert.equal(entries[0].file, 'book1/nodes.js');
  assert.equal(entries[0].desc, undefined);
  assert.equal(entries[2].desc, 'ESTADO: RESUELTA');
  assert.doesNotMatch(first.stdout, /LONG PERSONAL HISTORY|Book Two answer|future question/);
  const second = JSON.parse(pageText(run(root, 2, 1)));
  assert.deepEqual(second.map(n => n.id), ['varg-thread', 'elvar-closed', 'myth', 'future']);
  assert.equal(second[0].file, 'book2/nodes.js');
  assert.equal(second[0].desc, 'ESTADO: RESUELTA; Book Two answer');
});

test('backlog reader paginates without losing long clues and rejects invalid pages', t => {
  const root = fixture(t);
  writeNodes(root, 1, [{ id: 'long', group: 'TRAMA', desc: 'evidence '.repeat(2500), star: 'final clue' }]);
  let payload = '', pages;
  for (let page = 1; page === 1 || page <= pages; page++) {
    const result = run(root, 1, page);
    const chunk = pageText(result);
    pages = Number(result.stdout.match(/Page \d+\/(\d+)/)[1]);
    assert.ok(chunk.length <= 8000);
    assert.match(result.stdout, page < pages ? /CONTINUES:/ : /END:/);
    payload += chunk;
  }
  assert.ok(pages > 1);
  assert.equal(JSON.parse(payload)[0].desc, 'evidence '.repeat(2500));
  assert.equal(JSON.parse(payload)[0].star, 'final clue');
  assert.notEqual(run(root, 1, pages + 1).status, 0);
  assert.notEqual(run(root, 1, 0).status, 0);
  assert.notEqual(run(root, 1, 1, 'extra').status, 0);
  writeNodes(root, 1, []);
  assert.deepEqual(JSON.parse(pageText(run(root, 1, 1))), []);
});

test('backlog index uses the same latest candidates without exposing prose or inferring states', t => {
  const root = fixture(t);
  writeNodes(root, 1, [
    { id: 'profile', group: 'ORKA', desc: 'private history', star: 'old observation' },
    { id: 'profile', group: 'ORKA', star: 'latest observation' },
    { id: 'closed', group: 'TRAMA', desc: 'ESTADO: RESUELTA', star: '' },
    { id: 'both', group: 'TRAMA', desc: 'question', star: 'evidence' },
    { id: 'theme', group: 'COSMO', star: 'unique thematic evidence' },
    { id: 'plain', group: 'ORKA', star: '  ' },
  ]);
  writeNodes(root, 2, [{ id: 'profile', group: 'ORKA', star: '' }]);
  fs.writeFileSync(path.join(root, 'book1/links.js'),
    `const links = ${JSON.stringify([{ source: 'cat-orka', target: 'closed', label: 'incluye', type: 'arc' }])};`);
  const index = run(root, 1, 1, '--index');
  assert.equal(pageText(index), 'profile [ORKA] [star]\nclosed [ORKA] [TRAMA]\nboth [TRAMA] [star]\ntheme [star]');
  assert.doesNotMatch(index.stdout, /private history|old observation|latest observation|ESTADO: RESUELTA|unique thematic evidence/);
  const full = JSON.parse(pageText(run(root, 1, 1)));
  assert.deepEqual(pageText(index).split('\n').map(line => line.split(' ')[0]), full.map(n => n.id));
  assert.doesNotMatch(pageText(run(root, 2, 1, '--index')), /profile/);
  assert.notEqual(run(root, 1, 1, '--index', '--unknown').status, 0);
  writeNodes(root, 1, []);
  assert.equal(pageText(run(root, 1, 1, '--index')), '');

  const many = Array.from({ length: 700 }, (_, i) => ({ id: `candidate-${i}`, group: 'TRAMA' }));
  writeNodes(root, 1, many);
  let payload = '';
  let pages = 1;
  for (let page = 1; page <= pages; page++) {
    const result = run(root, 1, page, '--index');
    pages = Number(result.stdout.match(/Page \d+\/(\d+)/)[1]);
    payload += pageText(result);
  }
  assert.ok(pages > 1);
  assert.equal(payload, many.map(n => `${n.id} [TRAMA]`).join('\n'));
  assert.notEqual(run(root, 1, pages + 1, '--index').status, 0);
});

test('rebuild backlog dispatch stays isolated from live and reference archives', t => {
  const root = fixture(t);
  fs.copyFileSync(path.resolve(__dirname, '../mapa-core.js'), path.join(root, 'mapa-core.js'));
  const targetScripts = path.join(root, '.claude/skills/add-chapter/scripts');
  fs.mkdirSync(targetScripts, { recursive: true });
  for (const helper of ['rebuild', 'read-backlog', 'backlog-data', 'paginate', 'rebuild-guard'])
    fs.copyFileSync(path.join(scripts, `${helper}.cjs`), path.join(targetScripts, `${helper}.cjs`));
  writeNodes(root, 1, [{ id: 'live-spoiler', group: 'TRAMA' }]);
  writeNodes(path.join(root, 'book1/rebuild'), 1, [{ id: 'staged-clue', group: 'TRAMA', desc: 'staged evidence' }]);
  writeNodes(path.join(root, 'book1/rebuild/reference'), 1, [{ id: 'reference-spoiler', group: 'TRAMA' }]);
  const result = spawnSync(process.execPath, [path.join(targetScripts, 'rebuild.cjs'), 'read-backlog', '1'],
    { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.deepEqual(JSON.parse(pageText(result)).map(n => n.id), ['staged-clue']);
  assert.doesNotMatch(result.stdout, /live-spoiler|reference-spoiler/);
  const index = spawnSync(process.execPath, [path.join(targetScripts, 'rebuild.cjs'), 'read-backlog', '1', '--index'],
    { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.equal(pageText(index), 'staged-clue [TRAMA]');
  assert.doesNotMatch(index.stdout, /live-spoiler|reference-spoiler|staged evidence/);
  const compact = spawnSync(process.execPath, [path.join(targetScripts, 'rebuild.cjs'), 'read-backlog', '1', '--compact'],
    { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.deepEqual(JSON.parse(pageText(compact)), JSON.parse(pageText(result)));
});

test('POV selection retains untagged clues, explicit cross-POV inclusions and full index coverage', t => {
  const root = fixture(t);
  writeNodes(root, 1, [
    { id: 'elvar', group: 'ELVAR', star: 'own observation' },
    { id: 'elvar-thread', group: 'TRAMA', desc: 'own question' },
    { id: 'drekr', group: 'ORKA', star: 'cross-POV clue' },
    { id: 'varg', group: 'VARG', star: 'unrelated clue' },
    { id: 'untagged', group: 'TRAMA', desc: 'must inspect' },
  ]);
  fs.writeFileSync(path.join(root, 'book1/links.js'),
    `const links = ${JSON.stringify([{ source: 'cat-elvar', target: 'elvar-thread', label: 'incluye', type: 'arc' }])};`);
  const result = run(root, 1, 1, '--pov', 'ELVAR', '--include', 'drekr');
  assert.deepEqual(JSON.parse(pageText(result)).map(n => n.id), ['elvar', 'elvar-thread', 'drekr', 'untagged']);
  assert.match(result.stdout, /1 omitted/);
  assert.doesNotMatch(pageText(result), /unrelated clue/);
  assert.match(pageText(run(root, 1, 1, '--index')), /varg \[VARG\]/);
  assert.notEqual(run(root, 1, 1, '--pov', 'OTHER').status, 0);
  assert.notEqual(run(root, 1, 1, '--pov').status, 0);
  assert.notEqual(run(root, 1, 1, '--include', 'drekr').status, 0);
  assert.notEqual(run(root, 1, 1, '--pov', 'ELVAR', '--include', 'unknown').status, 0);
  const untagged = run(root, 1, 1, '--untagged', '--include', 'drekr');
  assert.deepEqual(JSON.parse(pageText(untagged)).map(n => n.id), ['drekr', 'untagged']);
  assert.match(untagged.stdout, /3 omitted/);
  assert.deepEqual(JSON.parse(pageText(run(root, 1, 1, '--untagged'))).map(n => n.id), ['untagged']);
  assert.notEqual(run(root, 1, 1, '--untagged', '--pov', 'ELVAR').status, 0);
  assert.notEqual(run(root, 1, 1, '--untagged', '--include', 'unknown').status, 0);
  const union = run(root, 1, 1, '--pov', 'ELVAR', '--pov', 'ORKA', '--include', 'drekr');
  assert.deepEqual(JSON.parse(pageText(union)).map(n => n.id), ['elvar', 'elvar-thread', 'drekr', 'untagged']);
  assert.match(union.stdout, /ELVAR, ORKA/);
  assert.equal(pageText(run(root, 1, 1, '--index', '--pov', 'ELVAR', '--pov', 'ORKA')),
    'elvar [ELVAR] [star]\nelvar-thread [ELVAR] [TRAMA]\ndrekr [ORKA] [star]\nuntagged [TRAMA]');
  assert.notEqual(run(root, 1, 1, '--pov', 'ELVAR', '--pov', 'ELVAR').status, 0);
  assert.notEqual(run(root, 1, 1, '--pov', 'ELVAR', '--include').status, 0);

  writeNodes(root, 1, [{ id: 'long', group: 'ELVAR', star: 'clue '.repeat(4000) }, { id: 'other', group: 'VARG', star: 'omit' }]);
  let payload = '', pages = 1;
  for (let page = 1; page <= pages; page++) {
    const response = run(root, 1, page, '--pov', 'ELVAR');
    pages = Number(response.stdout.match(/Page \d+\/(\d+)/)[1]);
    payload += pageText(response);
    if (page < pages) assert.match(response.stdout, /same book and options/);
  }
  assert.ok(pages > 1);
  assert.equal(JSON.parse(payload)[0].star, 'clue '.repeat(4000));
  assert.equal(JSON.parse(payload).length, 1);
});

test('multiple POV pages form one lossless union including untagged and explicit candidates once', t => {
  const root = fixture(t);
  const nodes = [
    { id: 'orka', group: 'ORKA', star: 'orka clue '.repeat(1400) },
    { id: 'untagged', group: 'TRAMA', desc: 'shared clue '.repeat(1200) },
    { id: 'varg', group: 'VARG', star: 'varg clue '.repeat(1100) },
    { id: 'included', group: 'ELVAR', star: 'cross-POV clue' },
    { id: 'omitted', group: 'ELVAR', star: 'not represented' },
  ];
  writeNodes(root, 1, nodes);
  const options = ['--pov', 'ORKA', '--pov', 'VARG', '--include', 'included', '--include', 'orka'];
  let payload = '', pages = 1;
  for (let page = 1; page <= pages; page++) {
    const result = run(root, 1, page, ...options);
    pages = Number(result.stdout.match(/Page \d+\/(\d+)/)[1]);
    payload += pageText(result);
  }
  assert.ok(pages > 1);
  const entries = JSON.parse(payload);
  assert.deepEqual(entries.map(n => n.id), ['orka', 'untagged', 'varg', 'included']);
  assert.equal(entries[0].star, nodes[0].star);
  assert.equal(entries[1].desc, nodes[1].desc);
  assert.equal(entries[2].star, nodes[2].star);
});
