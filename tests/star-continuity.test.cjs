const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const archive = require('../data-core.js');
const root = path.join(__dirname, '..');
const context = vm.createContext({});
for (const file of ['book1/nodes.js', 'book2/nodes.js', 'book1/links.js', 'book2/links.js', 'book1/summaries.js', 'book2/summaries.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const books = JSON.parse(vm.runInContext(`JSON.stringify([
  {book:1,nodes,links,summaries:chapterSummaries},
  {book:2,nodes:nodesBook2,links:linksBook2,summaries:chapterSummariesBook2}
])`, context));

// `star`, like `desc`, is merged by full overwrite of the latest same-id revision (data-core.js).
// A chapter edit that doesn't copy the prior star text forward silently erases it from the live map.
test('once a node records a star annotation, its latest revision never drops it back to empty', () => {
  const { revisions } = archive.merge(books);
  const lastNonEmpty = new Map(), latest = new Map();
  for (const n of revisions) {
    latest.set(n.id, n);
    if ((n.star || '').trim()) lastNonEmpty.set(n.id, n.star.trim());
  }
  const regressed = [...lastNonEmpty.keys()].filter(id => !(latest.get(id).star || '').trim());
  assert.deepEqual(regressed, [],
    `Star annotation dropped by a later revision for: ${regressed.join(', ')}. ` +
    'Copy the prior star text forward (see append-node.cjs) instead of leaving it empty.');
});
