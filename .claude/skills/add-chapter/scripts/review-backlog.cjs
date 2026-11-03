#!/usr/bin/env node
// Mechanical completeness only. Never infer a story state or write a semantic PASS.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { backlogCandidates } = require('./backlog-data.cjs');

try {
  const [bookArg, chapterArg, baselineArg, mode, outputArg, ...extra] = process.argv.slice(2);
  const book = Number(bookArg), chapter = Number(chapterArg);
  assert.ok(Number.isInteger(book) && book >= 1 && Number.isInteger(chapter) && chapter >= 1 &&
    baselineArg && outputArg && ['init', 'sync', 'check'].includes(mode) && !extra.length,
  'Usage: node review-backlog.cjs BOOK CHAPTER BASELINE init|sync|check CHECKLIST.json');
  const baseline = path.resolve(baselineArg), output = path.resolve(outputArg);
  const before = backlogCandidates(book, path.join(baseline, 'nodes.js'));
  const after = backlogCandidates(book);
  const required = new Map();
  for (const candidate of [...before, ...after]) {
    const prior = required.get(candidate.id);
    required.set(candidate.id, {
      id: candidate.id, label: candidate.label,
      fields: [...new Set([...(prior?.fields ?? []),
        ...(candidate.group === 'TRAMA' ? ['desc'] : []), ...(candidate.star.trim() ? ['star'] : [])])],
    });
  }
  if (mode === 'init') {
    const checklist = { book, chapter, baseline, items: [...required.values()].map(candidate => ({
      ...candidate, assessment: null, evidence: '', remaining: '',
    })) };
    fs.writeFileSync(output, JSON.stringify(checklist, null, 2) + '\n', { flag: 'wx' });
    console.log(`CREATED: ${required.size} pending assessments in ${output}. No states inferred; read the full backlog and chapter before completing them.`);
  } else {
    const checklist = JSON.parse(fs.readFileSync(output, 'utf8'));
    assert.ok(checklist.book === book && checklist.chapter === chapter && checklist.baseline === baseline,
      'Checklist book/chapter/baseline does not match this run');
    assert.ok(Array.isArray(checklist.items), 'Checklist items must be an array');
    if (mode === 'sync') {
      const seen = new Set();
      for (const item of checklist.items) {
        assert.ok(item && typeof item.id === 'string', 'Item without an id');
        assert.ok(!seen.has(item.id), `Duplicate id: ${item.id}`);
        assert.ok(required.has(item.id), `Unknown candidate: ${item.id}`);
        assert.ok(Array.isArray(item.fields), `Missing fields array: ${item.id}`);
        seen.add(item.id);
      }
      let added = 0, expanded = 0;
      for (const candidate of required.values()) {
        const item = checklist.items.find(item => item.id === candidate.id);
        if (!item) {
          checklist.items.push({ ...candidate, assessment: null, evidence: '', remaining: '' });
          added++;
        } else if (candidate.fields.some(field => !item.fields.includes(field))) {
          item.fields = [...new Set([...item.fields, ...candidate.fields])];
          // Keep the reviewer's notes, but require review of newly introduced evidence.
          item.assessment = null;
          expanded++;
        }
      }
      if (added || expanded) {
        const scratch = fs.mkdtempSync(path.join(path.dirname(output), '.backlog-sync-'));
        try {
          const temporary = path.join(scratch, 'checklist.json');
          fs.writeFileSync(temporary, JSON.stringify(checklist, null, 2) + '\n');
          fs.renameSync(temporary, output);
        } finally {
          fs.rmSync(scratch, { recursive: true, force: true });
        }
      }
      console.log(`SYNCED: ${added} new candidates; ${expanded} expanded evidence fields reset to pending. Existing notes preserved; assess pending rows before check. Same-field prose changes still require manual review.`);
      process.exit(0);
    }
    const seen = new Set(), errors = [];
    const outcomes = new Set(['unchanged', 'advanced', 'partial', 'resolved', 'disproved', 'closed-history', 'thematic']);
    const meaningful = value => typeof value === 'string' && value.trim() &&
      !/^(?:pending|todo|tbd|por revisar|pendiente)[.!]?$/i.test(value.trim());
    for (const item of checklist.items) {
      if (!item || typeof item.id !== 'string') { errors.push('Item without an id'); continue; }
      if (seen.has(item.id)) errors.push(`Duplicate id: ${item.id}`);
      seen.add(item.id);
      if (!required.has(item.id)) errors.push(`Unknown candidate: ${item.id}`);
      if (!outcomes.has(item.assessment)) errors.push(`Unassessed/invalid outcome: ${item.id}`);
      if (!meaningful(item.evidence)) errors.push(`Missing evidence/reason: ${item.id}`);
      if (!meaningful(item.remaining)) errors.push(`Missing remaining question or explicit none: ${item.id}`);
      for (const field of required.get(item.id)?.fields ?? []) {
        if (!Array.isArray(item.fields) || !item.fields.includes(field)) errors.push(`Missing evidence field ${field}: ${item.id}`);
      }
    }
    for (const id of required.keys()) if (!seen.has(id)) errors.push(`Missing candidate: ${id}`);
    if (errors.length) {
      const limit = 24;
      const details = errors.slice(0, limit);
      if (errors.length > limit) details.push(
        `${errors.length - limit} additional errors omitted. Inspect checklist rows with read-checklist.cjs CHECKLIST.json PAGE [ID ...], fix them, then rerun check.`);
      throw new Error(`${errors.length} checklist errors:\n${details.join('\n')}`);
    }
    console.log(`COMPLETE: ${required.size} baseline/current candidate IDs accounted for. This checks coverage and filled fields only; semantic review and thread-review.md PASS are still required.`);
  }
} catch (error) {
  console.error(`Backlog checklist failed: ${error.message}`);
  process.exitCode = 1;
}
