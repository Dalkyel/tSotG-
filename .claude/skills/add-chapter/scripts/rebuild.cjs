#!/usr/bin/env node
// Pin Book One helper execution to the staged archive without changing the caller's cwd.
const path = require('node:path');
const fs = require('node:fs');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '../../../..');
const args = process.argv.slice(2);
const reference = args[0] === '--reference';
if (reference) args.shift();
const helper = args.shift();
const readers = ['check-chapter', 'match-entities', 'search-descriptions', 'read-latest', 'read-links', 'read-backlog'];
const allowed = reference ? readers : [...readers, 'review-backlog', 'append-node', 'append-entries', 'append-chapter', 'verify-chapter', 'finish-chapter'];
if (!allowed.includes(helper)) {
  console.error(`Usage: node rebuild.cjs [--reference] HELPER ARGS… (Book 1 is implicit).\nAllowed helpers: ${allowed.join(', ')}. Reference writes are forbidden.`);
  process.exit(1);
}

// Resolve file arguments before the child changes directory. Existing readers use
// only names/ids/page numbers; writer/verifier paths are relative to the caller.
const fileArgs = helper === 'review-backlog' ? [1, 3]
  : ['append-chapter', 'finish-chapter'].includes(helper) ? [1, 2]
  : ['append-node', 'append-entries', 'verify-chapter'].includes(helper) ? [1] : [];
for (const index of fileArgs) if (args[index]) args[index] = path.resolve(args[index]);
if (helper === 'append-chapter') {
  const index = args.indexOf('--replace-applied');
  if (index !== -1 && args[index + 1]) args[index + 1] = path.resolve(args[index + 1]);
}
const cwd = path.join(root, 'book1/rebuild', reference ? 'reference' : '');
if (helper === 'check-chapter' && !reference) {
  try {
    const { checkRebuildState } = require('./check-rebuild-state.cjs');
    const progress = JSON.parse(fs.readFileSync(path.join(cwd, 'progress.json'), 'utf8'));
    const readme = fs.readFileSync(path.join(cwd, 'README.md'), 'utf8');
    const latest = checkRebuildState(progress, readme);
    console.log(`Rebuild metadata: ${latest} completed chapters; README log/header and progress source agree; next chapter: ${latest + 1}.`);
  } catch (error) {
    console.error(`Rebuild preflight failed: ${error.message}`);
    process.exit(1);
  }
}
if (['verify-chapter', 'append-chapter'].includes(helper)) {
  // A staged PASS must also establish that the live archive was left intact.
  try {
    const { liveHashes, completedChapters } = JSON.parse(fs.readFileSync(path.join(cwd, 'progress.json'), 'utf8'));
    if (helper === 'append-chapter' && args.includes('--replace-applied') && completedChapters?.includes(Number(args[0]))) {
      throw new Error('Chapter already completed; manifest revision is only for an unfinished chapter run');
    }
    for (const book of [1, 2]) {
      for (const kind of ['nodes', 'links', 'summaries']) {
        const file = `book${book}/${kind}.js`;
        if (!liveHashes?.[file]) throw new Error(`Missing recorded live hash: ${file}`);
        const actual = createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
        if (actual !== liveHashes[file]) throw new Error(`Live archive changed: ${file}`);
      }
    }
    console.error('PASS: all six live archive hashes unchanged.');
  } catch (error) {
    console.error(`Rebuild verification failed: ${error.message}`);
    process.exit(1);
  }
  args.push('--staged-preview');
}
console.error(`Book One ${reference ? 'reference (read only)' : 'rebuild'}: ${cwd}`);
const result = spawnSync(process.execPath, [path.join(__dirname, `${helper === 'finish-chapter' ? 'finish-rebuild-chapter' : helper}.cjs`), '1', ...args], {
  cwd,
  stdio: 'inherit',
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
