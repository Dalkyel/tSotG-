# Authorized Book One rebuild

This governs a separate, parallel effort — a user-authorized fresh chronological rebuild
of Book One, tracked in `book1/rebuild/` — not the normal "add the chapter we just read"
workflow in `SKILL.md`. An incomplete `book1/rebuild/progress.json` makes this the default
workflow for Book One chapter requests unless the user explicitly selects the live archive.
Book Two requests continue to use the live workflow.

The user requested a fresh chronological rebuild, starting with Chapter 1. During this
rebuild, write to `book1/rebuild/book1/{nodes,links,summaries}.js`, not the live
`book1/*.js`. The original Book One files are backed up at
`book1/rebuild/reference/book1/`; treat them as identity/completeness references only,
not factual baselines to copy into chapter descriptions. Live Book Two stays intact.

- Read `book1/rebuild/progress.json` first. Continue in chapter order; inspect existing
  work rather than duplicating a completed chapter. Read source XHTML from the project
  root with `read-chapter.py`, just as for HTML.
- Before starting a new chapter, confirm `README.md`'s chronological log already has a
  paragraph for every chapter number in `progress.json`'s `completedChapters` — the two
  can drift silently, since nothing re-checks README once a chapter's gates pass and its
  number is recorded (Chapter 18 was found fully gated, verified and committed to
  `completedChapters`, but its README paragraph was never written, only surfacing when
  Chapter 19 started). Append any missing paragraph before writing the current chapter's.
- Stay in the project root and use `.claude/skills/add-chapter/scripts/rebuild.cjs` to
  run Node helpers (not a top-level `scripts/rebuild.cjs` — no such path exists; the
  launcher lives only under the skill's own `scripts/` directory). It derives
  the project root from its own location, pins the child process to the staged archive,
  supplies book argument `1`, and prints the selected archive. Do not pass a book number.
  Use `--reference` for original canonical ID/label matching; that mode rejects writers.
  Examples from the project root:

  ```sh
  node .claude/skills/add-chapter/scripts/rebuild.cjs check-chapter 4
  node .claude/skills/add-chapter/scripts/rebuild.cjs match-entities Varg Einar
  node .claude/skills/add-chapter/scripts/rebuild.cjs --reference match-entities Leif Orl
  node .claude/skills/add-chapter/scripts/rebuild.cjs read-latest 1 varg einar
  node .claude/skills/add-chapter/scripts/rebuild.cjs read-backlog 1
  node .claude/skills/add-chapter/scripts/rebuild.cjs append-chapter 4 /absolute/baseline /absolute/scratch/chapter.json
  node .claude/skills/add-chapter/scripts/rebuild.cjs append-node varg /absolute/scratch/spec.json
  node .claude/skills/add-chapter/scripts/rebuild.cjs append-entries links /absolute/scratch/links.json
  node .claude/skills/add-chapter/scripts/rebuild.cjs append-entries summaries /absolute/scratch/summaries.json
  node .claude/skills/add-chapter/scripts/rebuild.cjs verify-chapter 4 /absolute/baseline --review-links --review-summary
  node .claude/skills/add-chapter/scripts/rebuild.cjs verify-chapter 4 /absolute/baseline --review-nodes=1
  ```

  The `1` after `read-latest`, `read-backlog`, or `read-links` is a page number, not a
  book cap — the launcher already supplies book `1` implicitly, so passing a book
  argument before the page number (as the live-workflow `read-links.cjs` signature
  requires) raises `Unknown ids: 1`. Batch arguments are `append-chapter CHAPTER BASELINE SPEC`; all three data
  files must still match that pre-edit baseline. Spec/baseline paths are resolved against
  the caller's directory before launching. If calling from elsewhere, use the absolute
  launcher path; do not change directory for individual helpers. Read/update progress
  and README using absolute paths derived from the captured project root.
  A reference match does not mean an entity already exists in the rebuild: create a new
  node using that ID if it is absent from the rebuilt inventory. Descriptions and stars
  must be grounded only in chapters processed so far; retain later revelations solely
  in the untouched reference/live archive. Reuse IDs for historical events even when
  their canonical names are learned later, explicitly noting that distinction.
  Match the full chapter entity list against the staged inventory first. Query the
  reference only for identities still unresolved there; repeating already-confirmed
  names adds irrelevant later labels and spoiler-bearing event titles to the output.
- Snapshot the staged three files into a unique temporary baseline before each chapter.
  Verify with `rebuild.cjs verify-chapter CHAPTER BASELINE --review-links --review-summary`.
  It requires the same append/preservation checks as the live workflow. The launcher
  automatically supplies `--staged-preview`, so summary-link validation uses empty
  guides, matching the isolated preview; no one-off matcher script is needed.
  The launcher also checks all six live archive hashes against `progress.json` and
  fails if a recorded hash is missing or a live file changed; no separate hash script
  is needed. Do not refresh those recorded hashes to make a failure pass.
- For rebuild regression checks, use the existing test filenames explicitly:

  ```sh
  node --test tests/book1-rebuild.test.cjs tests/characters.test.cjs tests/focus.test.cjs tests/chapter-verifier.test.cjs tests/rebuild-launcher.test.cjs tests/backlog-reader.test.cjs tests/chapter-appender.test.cjs tests/chapter-batch.test.cjs
  ```

  Confirm the output includes the `chapter verifier` tests, including the summary identity
  review; a successful exit alone
  did not reveal a mistyped verifier-test filename in the Chapter 9 run.
- Apply all three mandatory gates in `SKILL.md`: fact ownership, key-event coverage
  and thread/clue lifecycle.
  Before each chapter, review the existing open/partial questions and clues across all
  POVs; record developments and evidence-backed closures in the staged archive.
  Keep `ownership-review.md`, `event-review.md` and `thread-review.md` in the chapter run directory.
  After all three semantic gates and verification succeed, update the README's
  `Completed`/`Latest source` header and append the current chapter's log paragraph,
  then update `progress.json`'s source, baseline and `completedChapters`. Cross-check
  that the header, numbered chapter paragraphs and progress all end at the same chapter
  before reporting completion. The preflight log check does not catch a stale header.
  Preview with
  `book1/rebuild/index.html`; regenerate that preview from the live HTML if its layout
  changes, retaining the base URL and staged-data substitutions described in the README.
- Do not replace the live archive with a partial rebuild. At completion, reconcile
  canonical IDs, Book Two endpoints and accumulated descriptions (later versions must
  retain newly recovered earlier facts), then validate the combined archive before
  switching the live files.
