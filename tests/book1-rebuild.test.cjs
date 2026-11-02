const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../characters-core.js');
const root = path.join(__dirname, '..');
const stage = path.join(root, 'book1/rebuild');
const load = (kind, variable) => new Function(
  fs.readFileSync(path.join(stage, 'book1', `${kind}.js`), 'utf8') + `;return ${variable};`
)();

test('rebuilt Chapter 1 key terms resolve through the same mention matcher as Book Two', () => {
  const nodes = load('nodes', 'nodes');
  const summary = load('summaries', 'chapterSummaries').find(s => s.chapter === 1).summary;
  const matcher = core.buildMentionMatcher(nodes, nodes.map(n => ({ ...n, book: 1 })), {});
  for (const [, term] of summary.matchAll(/<strong>(.*?)<\/strong>/g)) {
    const matches = core.findMentions(term, matcher);
    assert.equal(matches.length, 1, `Missing or ambiguous summary link: ${term}`);
    assert.equal(matches[0].text, term, `Only part of the key term is linked: ${term}`);
    assert.ok(nodes.some(n => n.id === matches[0].id));
  }
  const text = summary.replace(/<[^>]*>/g, ' ');
  const mentions = core.findMentions(text, matcher);
  for (const name of ['Orka', 'Thorkel', 'Breca', 'Asgrim', 'Harek']) {
    assert.equal(mentions.filter(m => m.text === name).length, text.split(name).length - 1,
      `Every occurrence of ${name} should be linked, including plain text`);
  }
});

test('rebuild preview supplies the current summary UI and shared link renderer', () => {
  const html = fs.readFileSync(path.join(stage, 'index.html'), 'utf8');
  assert.match(html, /<dialog[^>]*id="summary-panel"/);
  for (const id of ['chapter-list', 'chapter-pane', 'book-tabs', 'summary-close']) {
    assert.ok(html.includes(`id="${id}"`), `Missing summary UI element: ${id}`);
  }
  assert.match(html, /<script src="mapa\.js"><\/script>/);
  assert.match(html, /<script src="characters-core\.js"><\/script>/);
  assert.match(html, /src="book1\/rebuild\/book1\/summaries\.js"/);
  assert.ok(!html.includes('src="book2/'));
  assert.ok(!html.includes('src="characters-data.js"'));
});
