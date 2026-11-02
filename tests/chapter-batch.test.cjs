const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const scripts = path.resolve(__dirname, '../.claude/skills/add-chapter/scripts');
function fixture(t, book = 1) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chapter-batch-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (let n = 1; n <= book; n++) {
    fs.mkdirSync(path.join(root, `book${n}`));
    for (const kind of ['nodes', 'links', 'summaries']) {
      const variable = (kind === 'summaries' ? 'chapterSummaries' : kind) + (n === 1 ? '' : `Book${n}`);
      const entries = kind === 'nodes' && n === 1 ? [{ id: 'elvar', label: 'Elvar', group: 'ELVAR', type: 'Personaje — Guerrera', desc: 'Historia previa — «íntegra».', star: 'Pista anterior.' }] : [];
      fs.writeFileSync(path.join(root, `book${n}/${kind}.js`), `const ${variable} = [\n${entries.map(n => JSON.stringify(n) + ',').join('\n')}\n];\n`);
    }
  }
  fs.mkdirSync(path.join(root, 'baseline'));
  for (const kind of ['nodes', 'links', 'summaries']) fs.copyFileSync(path.join(root, `book${book}/${kind}.js`), path.join(root, `baseline/${kind}.js`));
  return root;
}
function manifest() {
  return { header: '// LIBRO 1, CAPÍTULO 1 — ELVAR', nodes: [
    { id: 'elvar', mode: 'update', descAppend: 'Nueva acción.', starAppend: 'Otra pista.', previousState: 'Actúa.' },
    { id: 'nuevo', mode: 'new', label: 'Nuevo', group: 'LUGAR', type: 'Lugar', desc: 'Un lugar.' },
  ], links: [{ source: 'elvar', target: 'nuevo', label: 'visita', type: 'event' }],
  summary: { chapter: 1, title: 'Capítulo 1 — Elvar', summary: '<strong>Elvar</strong> visita <strong>Nuevo</strong>.' } };
}
function run(root, spec, book = 1) {
  fs.writeFileSync(path.join(root, 'chapter.json'), JSON.stringify(spec));
  return spawnSync(process.execPath, [path.join(scripts, 'append-chapter.cjs'), book, 1, 'baseline', 'chapter.json', '--staged-preview'].map(String), { cwd: root, encoding: 'utf8' });
}
function snapshot(root, book = 1) {
  return ['nodes', 'links', 'summaries'].map(k => fs.readFileSync(path.join(root, `book${book}/${k}.js`), 'utf8'));
}
test('batch appends accumulated revisions, links and summary together and rejects a retry', t => {
  const root = fixture(t), before = snapshot(root), spec = manifest();
  const result = run(root, spec);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /APPLIED: 2 node revisions \(each count \+1\), 1 links, 1 summary/);
  const [nodes, links, summaries] = snapshot(root);
  const parsed = new Function(nodes + ';return nodes;')();
  assert.equal(parsed[1].desc, 'Historia previa — «íntegra». Nueva acción.');
  assert.equal(parsed[1].star, 'Pista anterior. Otra pista.');
  assert.match(links, /"target":"nuevo"/);
  assert.match(summaries, /<strong>Nuevo<\/strong>/);
  assert.deepEqual(snapshot(root, 1).map((s, i) => s.startsWith(before[i].slice(0, before[i].lastIndexOf('\n]')))), [true, true, true]);
  const applied = snapshot(root);
  assert.notEqual(run(root, spec).status, 0);
  assert.deepEqual(snapshot(root), applied);
});
test('batch failures in a later node or verification leave all archive bytes unchanged', t => {
  for (const alter of [
    spec => spec.nodes[1].mode = 'invalid',
    spec => spec.nodes.push({ ...spec.nodes[1] }),
    spec => spec.links[0].target = 'missing',
    spec => spec.summary.summary = '<strong>Unknown</strong>',
    spec => spec.summary.chapter = 2,
    spec => spec.nodes[1].group = 'EVENTO',
  ]) {
    const root = fixture(t), before = snapshot(root), spec = manifest();
    alter(spec);
    assert.notEqual(run(root, spec).status, 0);
    assert.deepEqual(snapshot(root), before);
  }
});
test('batch supports earlier-book baselines and an empty nodes/links chapter', t => {
  const root = fixture(t, 2), firstBook = snapshot(root, 1);
  assert.equal(run(root, manifest(), 2).status, 0);
  assert.deepEqual(snapshot(root, 1), firstBook);
  const other = fixture(t);
  assert.equal(run(other, { nodes: [], links: [], summary: { chapter: 1, title: 'Capítulo 1', summary: 'Un descanso.' } }).status, 0);
});
test('batch restores previously published files when a later write fails', t => {
  const root = fixture(t), before = snapshot(root);
  const preload = path.join(root, 'fail-write.cjs');
  fs.writeFileSync(preload, `const fs=require('fs'); const write=fs.writeFileSync; let failed=false;
    fs.writeFileSync=function(file,...args){
      if(!failed && file===${JSON.stringify(path.join(fs.realpathSync(root), 'book1/links.js'))}) {
        failed=true; throw new Error('simulated publish failure');
      }
      return write.call(this,file,...args);
    };`);
  fs.writeFileSync(path.join(root, 'chapter.json'), JSON.stringify(manifest()));
  const result = spawnSync(process.execPath, ['--require', preload, path.join(scripts, 'append-chapter.cjs'), '1', '1', 'baseline', 'chapter.json', '--staged-preview'], { cwd: root, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /simulated publish failure/);
  assert.deepEqual(snapshot(root), before);
});
test('rebuild batch resolves caller paths, isolates staged writes and rejects reference mode', t => {
  const root = fixture(t), localScripts = path.join(root, '.claude/skills/add-chapter/scripts');
  fs.mkdirSync(localScripts, { recursive: true });
  for (const helper of ['rebuild', 'append-chapter', 'append-node', 'append-entries', 'verify-chapter']) fs.copyFileSync(path.join(scripts, helper + '.cjs'), path.join(localScripts, helper + '.cjs'));
  fs.copyFileSync(path.resolve(__dirname, '../characters-core.js'), path.join(root, 'characters-core.js'));
  const { createHash } = require('node:crypto');
  const staged = path.join(root, 'book1/rebuild');
  fs.mkdirSync(path.join(staged, 'book1'), { recursive: true });
  const liveHashes = {};
  fs.mkdirSync(path.join(root, 'book2'));
  for (const book of [1, 2]) for (const kind of ['nodes', 'links', 'summaries']) {
    const file = `book${book}/${kind}.js`;
    if (book === 1) fs.copyFileSync(path.join(root, file), path.join(staged, file));
    else fs.writeFileSync(path.join(root, file), 'unchanged live Book Two');
    liveHashes[file] = createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  }
  fs.writeFileSync(path.join(staged, 'progress.json'), JSON.stringify({ liveHashes }));
  fs.writeFileSync(path.join(root, 'chapter.json'), JSON.stringify(manifest()));
  const launch = extra => spawnSync(process.execPath, [path.join(localScripts, 'rebuild.cjs'), ...extra, 'append-chapter', '1', 'baseline', 'chapter.json'], { cwd: root, encoding: 'utf8' });
  const live = snapshot(root);
  assert.notEqual(launch(['--reference']).status, 0);
  const protectedFile = path.join(root, 'book2/nodes.js');
  fs.appendFileSync(protectedFile, ' changed');
  const blocked = launch([]);
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr, /Live archive changed/);
  assert.deepEqual(snapshot(staged), live);
  fs.writeFileSync(protectedFile, 'unchanged live Book Two');
  const result = launch([]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /staged preview; no guides/);
  assert.deepEqual(snapshot(root), live);
  assert.match(fs.readFileSync(path.join(staged, 'book1/nodes.js'), 'utf8'), /Nueva acción/);
});
