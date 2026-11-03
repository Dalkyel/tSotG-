const fs = require('node:fs');
const path = require('node:path');

// Reader scripts resolve book{N} files against cwd. rebuild.cjs/reprocess.cjs redirect
// cwd and set ADD_CHAPTER_STAGED; called directly, cwd is the project root and this
// warns instead of silently matching against the live, unstaged archive (see
// references/changelog.md, Book 1 rebuild Ch49). Advisory only: reading live data
// directly during active Book 2 reprocessing is sometimes exactly what's intended
// (an explicitly requested live chapter append), so this never blocks the call.
function warnIfBypassingActiveRebuild(book, cwd = process.cwd()) {
  if (process.env.ADD_CHAPTER_STAGED) return;
  const file = path.join(cwd, `book${book}/rebuild/progress.json`);
  if (!fs.existsSync(file)) return;
  const { status } = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (status === 'promoted') return;
  console.error(`WARNING: book${book}/rebuild/progress.json status is "${status ?? 'unknown'}" (active). ` +
    `This is reading book${book}'s LIVE files directly, not the staged archive. If you meant the ` +
    `staged rebuild/reprocessing, use ${book === 1 ? 'rebuild.cjs' : 'reprocess.cjs'} instead.`);
}

module.exports = { warnIfBypassingActiveRebuild };
