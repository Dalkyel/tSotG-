const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const A = require('../.claude/skills/add-chapter/scripts/archive-records.cjs');
const core = require('../characters-core.js');
const root = path.resolve(__dirname, '..');
// Discover the live books so adding chapters or another book needs no rebuild state.
const books = fs.readdirSync(root).filter(name => /^book\d+$/.test(name))
  .map(name => Number(name.slice(4))).sort((a, b) => a - b);
const archive = books.map(book => A.loadBook(root, book));
const [one, two] = archive;

test('live books retain their completed chapters and resolve endpoints and emphasized summary mentions', () => {
  assert.deepEqual(one.summaries.map(x => x.value.chapter), Array.from({ length: 53 }, (_, i) => i + 1));
  assert.deepEqual(two.summaries.slice(0, 50).map(x => x.value.chapter), Array.from({ length: 50 }, (_, i) => i + 1));
  const ids = new Set();
  for (const data of archive) {
    data.nodes.forEach(x => ids.add(x.value.id));
    for (const { value: link } of data.links) {
      assert.ok(ids.has(link.source) && ids.has(link.target), `Unresolved endpoint: ${link.source} → ${link.target}`);
    }
    const chapters = data.summaries.map(x => x.value.chapter);
    assert.deepEqual(chapters, [...new Set(chapters)].sort((a, b) => a - b), 'Summary chapters must be unique and ordered');
  }
  const revisions = archive.flatMap(data => data.nodes.map(x => x.value));
  const guides = new Function(fs.readFileSync(path.join(root, 'characters-data.js'), 'utf8') + ';return CHARACTER_GUIDES;')();
  const matcher = core.buildMentionMatcher([...new Map(revisions.map(n => [n.id, n])).values()], revisions, guides);
  for (const data of archive) for (const { value: summary } of data.summaries) {
    for (const [, term] of summary.summary.matchAll(/<strong>(.*?)<\/strong>/g)) {
      const matches = core.findMentions(term, matcher);
      assert.ok(matches.length === 1 && matches[0].text === term, `Chapter ${summary.chapter}: unresolved summary term ${term}`);
    }
  }
});

test('later profiles preserve Book One history and individual identities own their relationships', () => {
  const base = A.latest(one.nodes);
  for (const data of archive.slice(1)) for (const { value: node } of data.nodes) if (base.has(node.id)) {
    assert.ok(node.desc.startsWith(base.get(node.id).desc), node.id + ' loses Book One description');
    assert.ok(node.star.startsWith(base.get(node.id).star || ''), node.id + ' loses Book One clues');
  }
  const retired = ['mord-lif', 'halja-vali', 'olvir-yrsa', 'hijas-orna-ulfrir', 'ulfhednar', 'bosque-horca', 'altar-lik-rifa-boneback'];
  assert.ok(two.nodes.every(x => !retired.includes(x.value.id)));
  const links = two.links.map(x => x.value);
  assert.ok(links.every(l => !retired.includes(l.source) && !retired.includes(l.target)));
  assert.ok(two.links.some(x => x.chapter === 18 && x.value.source === 'lif' && x.value.target === 'halja' && x.value.label === 'comparte el duelo por un hermano con'));
  assert.ok(two.links.some(x => x.chapter === 3 && x.value.source === 'consejo-guerra-grimholt' && x.value.target === 'vol'));
  for (const [source, target] of [['tumulo-mord', 'mord'], ['tumulo-mord', 'grimholt'], ['myrk', 'hombre-ojos-rojos'], ['breca', 'ulfhednar-linaje']]) {
    assert.ok(links.some(l => l.source === source && l.target === target), `${source} → ${target}`);
  }
  assert.ok(!links.some(l => l.source === 'breca' && l.target === 'guardia-ulfhednar-helka'));
});
