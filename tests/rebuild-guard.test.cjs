const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { warnIfBypassingActiveRebuild } = require('../.claude/skills/add-chapter/scripts/rebuild-guard.cjs');

function withTmpCwd(progress, book = 1) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'rebuild-guard-test-'));
  if (progress !== undefined) {
    fs.mkdirSync(path.join(cwd, `book${book}/rebuild`), { recursive: true });
    fs.writeFileSync(path.join(cwd, `book${book}/rebuild/progress.json`), JSON.stringify(progress));
  }
  return cwd;
}

function captureStderr(fn) {
  const original = console.error;
  const lines = [];
  console.error = (...args) => lines.push(args.join(' '));
  try { fn(); } finally { console.error = original; }
  return lines.join('\n');
}

test('warns when progress.json is active and ADD_CHAPTER_STAGED is unset', () => {
  const cwd = withTmpCwd({ status: 'in-progress' });
  delete process.env.ADD_CHAPTER_STAGED;
  const output = captureStderr(() => warnIfBypassingActiveRebuild(1, cwd));
  assert.match(output, /WARNING: book1\/rebuild\/progress\.json status is "in-progress" \(active\)/);
  assert.match(output, /use rebuild\.cjs instead/);
  fs.rmSync(cwd, { recursive: true, force: true });
});

test('names reprocess.cjs for book 2', () => {
  const cwd = withTmpCwd({ status: 'ready' }, 2);
  delete process.env.ADD_CHAPTER_STAGED;
  const output = captureStderr(() => warnIfBypassingActiveRebuild(2, cwd));
  assert.match(output, /use reprocess\.cjs instead/);
  fs.rmSync(cwd, { recursive: true, force: true });
});

test('stays silent when status is promoted', () => {
  const cwd = withTmpCwd({ status: 'promoted' });
  delete process.env.ADD_CHAPTER_STAGED;
  const output = captureStderr(() => warnIfBypassingActiveRebuild(1, cwd));
  assert.equal(output, '');
  fs.rmSync(cwd, { recursive: true, force: true });
});

test('stays silent when no progress.json exists for that book', () => {
  const cwd = withTmpCwd(undefined);
  delete process.env.ADD_CHAPTER_STAGED;
  const output = captureStderr(() => warnIfBypassingActiveRebuild(1, cwd));
  assert.equal(output, '');
  fs.rmSync(cwd, { recursive: true, force: true });
});

test('stays silent when ADD_CHAPTER_STAGED is set, regardless of status', () => {
  const cwd = withTmpCwd({ status: 'in-progress' });
  process.env.ADD_CHAPTER_STAGED = '1';
  try {
    const output = captureStderr(() => warnIfBypassingActiveRebuild(1, cwd));
    assert.equal(output, '');
  } finally {
    delete process.env.ADD_CHAPTER_STAGED;
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});
