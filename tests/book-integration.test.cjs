const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const A = require('../.claude/skills/add-chapter/scripts/archive-records.cjs');
const { validateCombined } = require('../.claude/skills/add-chapter/scripts/reprocess.cjs');
const root = path.resolve(__dirname, '..');
const one = A.loadBook(root, 1), two = A.loadBook(root, 2);
const state = JSON.parse(fs.readFileSync(path.join(root, 'book2/rebuild/progress.json')));
const reviewed = A.loadBook(path.join(root, 'book2/rebuild/reviewed'), 2);
test('live Book One is the complete rebuilt archive and both books resolve every endpoint and emphasized summary mention', () => {
  for (const kind of ['nodes', 'links', 'summaries']) assert.equal(fs.readFileSync(`${root}/book1/${kind}.js`, 'utf8'), fs.readFileSync(`${root}/book1/rebuild/book1/${kind}.js`, 'utf8'));
  assert.deepEqual(one.summaries.map(x => x.value.chapter), Array.from({ length: 53 }, (_, i) => i + 1));
  validateCombined(one, two, root);
  assert.deepEqual(two.summaries.map(x => x.value.chapter), Array.from({ length: 50 }, (_, i) => i + 1));
});
test('every later shared profile preserves the rebuilt Book One history and individual identities own their relationships', () => {
  const base = A.latest(one.nodes), ids = new Set(two.nodes.map(x => x.value.id));
  for (const { value: node } of two.nodes) if (base.has(node.id)) {
    assert.ok(node.desc.startsWith(base.get(node.id).desc), node.id + ' loses rebuilt description');
    assert.ok(node.star.startsWith(base.get(node.id).star || ''), node.id + ' loses rebuilt clues');
  }
  const retired = ['mord-lif', 'halja-vali', 'olvir-yrsa', 'hijas-orna-ulfrir', 'ulfhednar', 'bosque-horca', 'altar-lik-rifa-boneback'];
  assert.ok(retired.every(id => !ids.has(id)));
  assert.ok(two.links.every(({ value: l }) => !retired.includes(l.source) && !retired.includes(l.target)));
  const links = two.links.map(x => x.value);
  // Ch18's reviewed account gives Lif the act of offering shared grief to Halja.
  // Preserve the reviewed direction rather than requiring the legacy inverse edge.
  if (state.completedChapters.includes(18)) {
    assert.deepEqual(two.links.filter(x => x.chapter === 18).map(x => x.value), reviewed.links.filter(x => x.chapter === 18).map(x => x.value));
    assert.ok(two.links.some(x => x.chapter === 18 && x.value.source === 'lif' && x.value.target === 'halja' && x.value.label === 'comparte el duelo por un hermano con'));
  } else assert.ok(links.some(l => l.source === 'halja' && l.target === 'lif'));
  // The legacy Ch3 carrier was identified as Yrsa; source reprocessing leaves her unnamed.
  // Check the reviewed relationships themselves instead of requiring that old claim.
  if (state.completedChapters.includes(3)) {
    assert.deepEqual(two.links.filter(x => x.chapter === 3).map(x => x.value), reviewed.links.filter(x => x.chapter === 3).map(x => x.value));
    assert.ok(two.links.some(x => x.chapter === 3 && x.value.source === 'consejo-guerra-grimholt' && x.value.target === 'vol'));
  } else assert.ok(links.some(l => l.source === 'yrsa' && l.target === 'vol'));
  if (state.completedChapters.includes(1)) {
    assert.ok(links.some(l => l.source === 'tumulo-mord' && l.target === 'mord'));
    assert.ok(links.some(l => l.source === 'tumulo-mord' && l.target === 'grimholt'));
  } else assert.ok(links.some(l => l.source === 'mord' && l.target === 'grimholt'));
  assert.ok(links.some(l => l.source === 'myrk' && l.target === 'hombre-ojos-rojos'));
  assert.ok(links.some(l => l.source === 'breca' && l.target === 'ulfhednar-linaje'));
  assert.ok(!links.some(l => l.source === 'breca' && l.target === 'guardia-ulfhednar-helka'));
});
test('reviewed chapters match their checkpoint and unreviewed summaries preserve original visible prose', () => {
  const backup = A.loadBook(path.join(root, 'book1/rebuild/integration/before'), 2);
  const plain = text => text.replace(/<[^>]*>/g, '');
  for (const item of backup.summaries) {
    const current = two.summaries.find(x => x.chapter === item.chapter);
    if (state.completedChapters.includes(item.chapter)) {
      assert.deepEqual(current.value, reviewed.summaries.find(x => x.chapter === item.chapter).value);
    } else assert.equal(plain(current.value.summary), plain(item.value.summary));
  }
  assert.deepEqual(A.hashes(path.join(root, 'book2/rebuild/reference')), state.referenceHashes);
});
test('promoted Book One refuses further staged writes', () => {
  const {spawnSync}=require('node:child_process');
  const before=fs.readFileSync(path.join(root,'book1/rebuild/book1/nodes.js'));
  const result=spawnSync(process.execPath,[path.join(root,'.claude/skills/add-chapter/scripts/rebuild.cjs'),'append-node','orka','missing-spec.json'],{cwd:root,encoding:'utf8'});
  assert.notEqual(result.status,0);assert.match(result.stderr,/complete and promoted/);
  assert.deepEqual(fs.readFileSync(path.join(root,'book1/rebuild/book1/nodes.js')),before);
});
