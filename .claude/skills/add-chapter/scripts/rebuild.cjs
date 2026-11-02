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
const allowed = reference ? readers : [...readers, 'append-node', 'verify-chapter'];
if (!allowed.includes(helper)) {
  console.error(`Usage: node rebuild.cjs [--reference] HELPER ARGS… (Book 1 is implicit).\nAllowed helpers: ${allowed.join(', ')}. Reference writes are forbidden.`);
  process.exit(1);
}

// Resolve file arguments before the child changes directory. Existing readers use
// only names/ids/page numbers; these are the two helpers accepting filesystem paths.
const fileArg = helper === 'append-node' ? 1 : helper === 'verify-chapter' ? 1 : -1;
if (fileArg >= 0 && args[fileArg]) args[fileArg] = path.resolve(args[fileArg]);
const cwd = path.join(root, 'book1/rebuild', reference ? 'reference' : '');
if (helper === 'verify-chapter') {
  // A staged PASS must also establish that the live archive was left intact.
  try {
    const { liveHashes } = JSON.parse(fs.readFileSync(path.join(cwd, 'progress.json'), 'utf8'));
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
const result = spawnSync(process.execPath, [path.join(__dirname, `${helper}.cjs`), '1', ...args], {
  cwd,
  stdio: 'inherit',
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
