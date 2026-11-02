// Compact metadata validation shared by rebuild preflight and completion.
const assert = require('node:assert/strict');

function checkRebuildState(progress, readme) {
  const completed = progress.completedChapters;
  assert.ok(Array.isArray(completed), 'Missing completedChapters in progress');
  const expected = Array.from({ length: completed.length }, (_, i) => i + 1);
  assert.deepEqual(completed, expected, 'Progress chapters must be consecutive from chapter 1');
  const logged = [...readme.matchAll(/^Chapter (\d+): /gm)].map(match => Number(match[1]));
  assert.deepEqual(logged, expected, 'README chapter log differs from progress; repair it first');
  const headers = [...readme.matchAll(/^Completed: .* Latest source: .*\.$/gm)];
  assert.equal(headers.length, 1, 'Expected one Completed / Latest source header');
  const latest = completed.length;
  if (latest) {
    assert.equal(progress.source, `book1/chapter ${latest}.xhtml`, 'Stale progress source');
    assert.equal(headers[0][0],
      `Completed: Chapters 1–${latest}. Latest source: \`../chapter ${latest}.xhtml\`.`,
      'Stale README header; repair it first');
  }
  return latest;
}

module.exports = { checkRebuildState };
