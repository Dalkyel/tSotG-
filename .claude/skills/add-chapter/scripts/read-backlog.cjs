#!/usr/bin/env node
// Inventory review candidates, not inferred states: closed history and thematic
// stars must still be classified by the reader against the complete chapter.
const assert = require('node:assert/strict');
const { backlogCandidates } = require('./backlog-data.cjs');
const { paginate } = require('./paginate.cjs');
const { warnIfBypassingActiveRebuild } = require('./rebuild-guard.cjs');

const [bookArg, pageArg, ...extra] = process.argv.slice(2);
const book = Number(bookArg), page = Number(pageArg);
let indexOnly = false;
let compact = false;
let untaggedOnly = false;
const selectedPovs = new Set();
const include = new Set();
const usage = 'Usage: read-backlog.cjs BOOK PAGE [--index | --compact] [--untagged | --pov ORKA|VARG|ELVAR ...] [--include ID ...]';
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1, usage);
for (let i = 0; i < extra.length; i++) {
  if (extra[i] === '--index' && !indexOnly) indexOnly = true;
  else if (extra[i] === '--compact' && !compact) compact = true;
  else if (extra[i] === '--untagged' && !untaggedOnly) untaggedOnly = true;
  else if (extra[i] === '--pov') {
    const pov = extra[++i];
    assert.ok(['ORKA', 'VARG', 'ELVAR'].includes(pov) && !selectedPovs.has(pov), usage);
    selectedPovs.add(pov);
  } else if (extra[i] === '--include') {
    const id = extra[++i];
    assert.ok(id && !id.startsWith('--') && !include.has(id), usage);
    include.add(id);
  } else assert.fail(usage);
}
assert.ok(!(indexOnly && compact), '--compact is a prose format; use --index separately');
assert.ok(!(untaggedOnly && selectedPovs.size), '--untagged cannot be combined with --pov');
const filtered = untaggedOnly || selectedPovs.size > 0;
assert.ok(!include.size || filtered, '--include requires --pov or --untagged');
warnIfBypassingActiveRebuild(book);
const allCandidates = backlogCandidates(book);
for (const id of include) assert.ok(allCandidates.some(node => node.id === id), `Unknown backlog candidate: ${id}`);
// Untagged items always remain: absence of a tag does not establish irrelevance.
const candidates = filtered
  ? allCandidates.filter(node => !node.pov || selectedPovs.has(node.pov) || include.has(node.id))
  : allCandidates;
const payload = indexOnly
  ? candidates.map(node => `${node.id}${node.pov ? ` [${node.pov}]` : ''}${node.group === 'TRAMA' ? ' [TRAMA]' : ''}${node.star.trim() ? ' [star]' : ''}`).join('\n')
  : compact
    ? `[${candidates.map(candidate => JSON.stringify(candidate)).join(',\n')}]`
    : JSON.stringify(candidates, null, 2);
const chunks = paginate(payload);
const pageCount = chunks.length;
assert.ok(page <= pageCount, `Requested page ${page}; only ${pageCount} pages available`);
console.log(`Backlog review candidates through Book ${book}: ${allCandidates.length} latest entries (all TRAMA nodes and nonempty star fields, across all POVs).`);
if (untaggedOnly) console.log(`Untagged selection: ${candidates.length} selected entries including ${include.size} explicit inclusions; ${allCandidates.length - candidates.length} omitted. Use the unfiltered index and checklist for all-POV coverage.`);
if (selectedPovs.size) console.log(`POV selection: ${candidates.length} selected entries for ${[...selectedPovs].join(', ')} plus all untagged candidates and ${include.size} explicit inclusions; ${allCandidates.length - candidates.length} omitted. Use the unfiltered index and checklist for all-POV coverage.`);
if (indexOnly) console.log('INDEX ONLY: candidate ids and evidence fields, not inferred states or a substitute for the full paginated review.');
console.log(`Page ${page}/${pageCount}; ${payload.length} total characters.`);
console.log(chunks[page - 1]);
console.log(page < pageCount ? `CONTINUES: read page ${page + 1} with the same book and options.` : 'END: all review candidates displayed.');
console.log('Includes closed history and thematic notes; classify manually. Non-TRAMA descriptions are omitted: use read-latest before updating and read-links for relevant relationships.');
