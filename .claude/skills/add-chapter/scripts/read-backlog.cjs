#!/usr/bin/env node
// Inventory review candidates, not inferred states: closed history and thematic
// stars must still be classified by the reader against the complete chapter.
const assert = require('node:assert/strict');
const { backlogCandidates } = require('./backlog-data.cjs');

const [bookArg, pageArg, ...extra] = process.argv.slice(2);
const book = Number(bookArg), page = Number(pageArg);
const indexOnly = extra.length === 1 && extra[0] === '--index';
assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(page) && page >= 1 && (!extra.length || indexOnly),
  'Usage: node .claude/skills/add-chapter/scripts/read-backlog.cjs BOOK PAGE [--index]');

const candidates = backlogCandidates(book);
const payload = indexOnly
  ? candidates.map(node => `${node.id}${node.pov ? ` [${node.pov}]` : ''}${node.group === 'TRAMA' ? ' [TRAMA]' : ''}${node.star.trim() ? ' [star]' : ''}`).join('\n')
  : JSON.stringify(candidates, null, 2);
const pageSize = 8000, pages = Math.ceil(payload.length / pageSize);
const pageCount = Math.max(1, pages);
assert.ok(page <= pageCount, `Requested page ${page}; only ${pageCount} pages available`);
console.log(`Backlog review candidates through Book ${book}: ${candidates.length} latest entries (all TRAMA nodes and nonempty star fields, across all POVs).`);
if (indexOnly) console.log('INDEX ONLY: candidate ids and evidence fields, not inferred states or a substitute for the full paginated review.');
console.log(`Page ${page}/${pageCount}; ${payload.length} total characters.`);
console.log(payload.slice((page - 1) * pageSize, page * pageSize));
console.log(page < pageCount ? `CONTINUES: read page ${page + 1} with the same book${indexOnly ? ' and --index' : ''}.` : 'END: all review candidates displayed.');
console.log('Includes closed history and thematic notes; classify manually. Non-TRAMA descriptions are omitted: use read-latest before updating and read-links for relevant relationships.');
