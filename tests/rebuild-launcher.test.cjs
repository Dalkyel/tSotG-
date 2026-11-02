const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');

test('staged verification gates the child on all six recorded live hashes', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rebuild-launcher-'));
  try {
    const scripts = path.join(root, '.claude/skills/add-chapter/scripts');
    const stage = path.join(root, 'book1/rebuild');
    fs.mkdirSync(scripts, { recursive: true });
    fs.mkdirSync(stage, { recursive: true });
    fs.mkdirSync(path.join(root, 'book2'));
    fs.copyFileSync(path.resolve(__dirname, '../.claude/skills/add-chapter/scripts/rebuild.cjs'), path.join(scripts, 'rebuild.cjs'));
    // Stand in for the verifier so the test observes whether it was dispatched.
    fs.writeFileSync(path.join(scripts, 'verify-chapter.cjs'), 'console.log("CHILD-RAN", JSON.stringify(process.argv.slice(2)));');
    const liveHashes = {};
    for (const book of [1, 2]) {
      for (const kind of ['nodes', 'links', 'summaries']) {
        const file = `book${book}/${kind}.js`;
        fs.writeFileSync(path.join(root, file), file);
        liveHashes[file] = createHash('sha256').update(file).digest('hex');
      }
    }
    const save = () => fs.writeFileSync(path.join(stage, 'progress.json'), JSON.stringify({ liveHashes }));
    const run = () => spawnSync(process.execPath, [path.join(scripts, 'rebuild.cjs'), 'verify-chapter', '6', 'baseline'], { cwd: root, encoding: 'utf8' });
    save();
    const good = run();
    assert.equal(good.status, 0, good.stderr);
    assert.match(good.stdout, /CHILD-RAN/);
    assert.match(good.stdout, /--staged-preview/);
    for (const file of Object.keys(liveHashes)) {
      fs.appendFileSync(path.join(root, file), 'changed');
      const changed = run();
      assert.notEqual(changed.status, 0, file);
      assert.ok(changed.stderr.includes(`Live archive changed: ${file}`));
      assert.doesNotMatch(changed.stdout, /CHILD-RAN/);
      fs.writeFileSync(path.join(root, file), file);
    }
    delete liveHashes['book2/summaries.js'];
    save();
    const missing = run();
    assert.notEqual(missing.status, 0);
    assert.match(missing.stderr, /Missing recorded live hash: book2\/summaries.js/);
    assert.doesNotMatch(missing.stdout, /CHILD-RAN/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
