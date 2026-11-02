#!/usr/bin/env node
// Publish completion metadata only after review attestations and staged verification.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { checkRebuildState } = require('./check-rebuild-state.cjs');

function finish() {
  const [book, chapterArg, baselineArg, specArg, ...extra] = process.argv.slice(2);
  const chapter = Number(chapterArg);
  assert.ok(book === '1' && Number.isInteger(chapter) && chapter > 0 && baselineArg && specArg && !extra.length,
    'Usage: rebuild.cjs finish-chapter CHAPTER BASELINE SPEC.json');
  const root = path.resolve(__dirname, '../../../..');
  const stage = path.join(root, 'book1/rebuild');
  const baseline = path.resolve(baselineArg);
  const run = path.dirname(baseline);
  const spec = JSON.parse(fs.readFileSync(path.resolve(specArg), 'utf8'));
  const source = `book1/chapter ${chapter}.xhtml`;
  assert.equal(spec.source, source, 'Completion source must match the requested chapter XHTML');
  assert.ok(fs.statSync(path.join(root, source)).isFile(), 'Source file missing');
  assert.ok(typeof spec.log === 'string' && spec.log.startsWith(`Chapter ${chapter}: `)
    && spec.log.trim().length > `Chapter ${chapter}: `.length && !/[\r\n]/.test(spec.log),
  'Supply one complete Chapter N: log paragraph');
  for (const [file, marker] of [
    ['ownership-review.md', 'Ownership review: PASS'],
    ['event-review.md', 'Event coverage review: PASS'],
    ['thread-review.md', 'Thread lifecycle review: PASS'],
  ]) {
    const review = fs.readFileSync(path.join(run, file), 'utf8');
    assert.ok(review.split(/\r?\n/).some(line => line.trim() === marker), `Missing ${marker} in ${file}`);
  }
  const progressFile = path.join(stage, 'progress.json');
  const readmeFile = path.join(stage, 'README.md');
  const beforeProgress = fs.readFileSync(progressFile, 'utf8');
  const beforeReadme = fs.readFileSync(readmeFile, 'utf8');
  const progress = JSON.parse(beforeProgress);
  checkRebuildState(progress, beforeReadme);
  const expected = Array.from({ length: chapter - 1 }, (_, i) => i + 1);
  assert.deepEqual(progress.completedChapters, expected, 'Complete chapters in order; retries are rejected');
  const headerPattern = /^Completed: .* Latest source: .*\.$/gm;
  const chapters = file => {
    const entries = new Function(fs.readFileSync(file, 'utf8') + '; return chapterSummaries;')();
    return entries.map(entry => entry.chapter);
  };
  assert.deepEqual(chapters(path.join(baseline, 'summaries.js')), expected, 'Baseline summaries do not match prior progress');
  assert.deepEqual(chapters(path.join(stage, 'book1/summaries.js')), [...expected, chapter],
    'Staged summaries do not end at the requested chapter');

  // The launcher validates all six live hashes before dispatching the verifier.
  const result = spawnSync(process.execPath,
    [path.join(__dirname, 'rebuild.cjs'), 'verify-chapter', String(chapter), baseline],
    { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, 'Chapter verification failed; completion metadata unchanged');
  assert.equal(fs.readFileSync(progressFile, 'utf8'), beforeProgress, 'Progress changed during verification');
  assert.equal(fs.readFileSync(readmeFile, 'utf8'), beforeReadme, 'README changed during verification');
  const nextReadme = beforeReadme.replace(headerPattern,
    `Completed: Chapters 1–${chapter}. Latest source: \`../chapter ${chapter}.xhtml\`.`)
    .trimEnd() + `\n\n${spec.log.trim()}\n`;
  const nextProgress = JSON.stringify({ ...progress, source, baseline, completedChapters: [...expected, chapter] }, null, 2) + '\n';
  // Restore on caught write errors; this is not a crash-atomic multi-file transaction.
  try {
    fs.writeFileSync(readmeFile, nextReadme);
    fs.writeFileSync(progressFile, nextProgress);
  } catch (error) {
    fs.writeFileSync(readmeFile, beforeReadme);
    fs.writeFileSync(progressFile, beforeProgress);
    throw error;
  }
  console.log(`COMPLETE: Chapter ${chapter}; README header/log and progress synchronized. Review PASS markers are human attestations, not semantic validation.`);
}
try { finish(); } catch (error) { console.error(`Completion failed: ${error.message}`); process.exitCode = 1; }
