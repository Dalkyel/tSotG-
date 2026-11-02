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
- Run `rebuild.cjs check-chapter N` before source/inventory reads. Alongside chapter
  presence, it checks consecutive progress, the complete README chapter-log sequence,
  the latest-source field and README header, and reports the next chapter compactly.
  Metadata drift fails before chapter inspection; inspect and repair the reported
  mismatch before proceeding. Do not dump the full growing README or recreate a
  log-check script merely to establish readiness. Read individual log paragraphs only
  when their content is relevant. Existing-chapter inspection remains allowed; the
  report does not authorize skipping chronological order.
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
  node .claude/skills/add-chapter/scripts/rebuild.cjs read-backlog 1 --index
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
  To check whether a newly needed event has a canonical ID, match its distinctive
  named venue or object as well as its action, trying the confirmed canonical/translated
  venue label before broadening. A guessed title such as `Combate con Drekr` can miss
  `Combate en El Drengr Muerto`; matching `El Drengr Muerto` surfaces the latter without
  a broad description search. If no distinctive label matches, search descriptions for
  the specific action/object wording (for example `queso`). Avoid already-confirmed
  participants (`Varg`, `Vol`, `Glornir`) and generic terms such as `akall`, `taberna`
  or `caballo`, which return unrelated future scenes. Broad reference matches
  exposed later relationship/event labels during Chapter 34 without helping identify
  the current refusal scene. Do not expand to a character's whole
  future inventory merely to establish that the current event is new.
  A reference matcher can also return a later event because its title contains a place
  or character name. That collateral hit is not a reason to read its full future scene:
  use the place/person identity confirmed by the match and the current chapter's action
  to decide what belongs in this run. If two events genuinely might be the same, retrieve
  bounded description excerpts for the specific distinguishing action before considering
  a full reference entry. In Chapter 33, locating the tavern and freeing children outside
  it did not require reading the reference account of the later interior combat.
  For these reference identity checks, use the distinguishing action phrase with
  `--id ID --max-excerpts 1` first. Searching an actor's name inside their own long
  profile can return overlapping excerpts from many later scenes. The limit reports
  omissions explicitly; expand it only if the identity remains uncertain. It bounds
  output, not chronology, so even the first excerpt may contain later facts and must
  not become chapter evidence.
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
  node --test tests/book1-rebuild.test.cjs tests/characters.test.cjs tests/focus.test.cjs tests/chapter-verifier.test.cjs tests/rebuild-launcher.test.cjs tests/backlog-reader.test.cjs tests/chapter-appender.test.cjs tests/chapter-batch.test.cjs tests/rebuild-completion.test.cjs tests/description-search.test.cjs
  ```

  Confirm the output includes the `chapter verifier` tests, including the summary identity
  review; a successful exit alone
  did not reveal a mistyped verifier-test filename in the Chapter 9 run.
- Apply all three mandatory [semantic gates](review-gates.md): fact ownership,
  key-event coverage and thread/clue lifecycle, using the shared
  [source/entity workflow](source-and-entity-workflow.md).
  Before each chapter, review the existing open/partial questions and clues across all
  POVs; record developments and evidence-backed closures in the staged archive.
  Keep `ownership-review.md`, `event-review.md` and `thread-review.md` in the chapter run directory.
  After all three semantic gates, verifier reviews and required tests succeed, write
  `completion.json` beside `baseline/` with `source` and one complete `Chapter N:` log
  paragraph, then use the completion helper instead of another inline update script:

  ```json
  {"source":"book1/chapter 34.xhtml","log":"Chapter 34: Describe the final additions, review results, tests and visual-check limitations."}
  ```

  ```sh
  node .claude/skills/add-chapter/scripts/rebuild.cjs finish-chapter 34 /absolute/run/baseline /absolute/run/completion.json
  ```

  It requires all three review PASS markers beside `baseline/`, consecutive prior
  progress and README log entries, a matching previous header/source, the current source
  XHTML, and baseline/staged summaries ending at the expected chapters. It reruns normal
  staged verification (including all six live hashes), then updates the README header/log
  and progress source/baseline/completedChapters together, preserving other fields.
  Drift, failed verification and repeated completion fail before metadata writes; repair
  existing drift explicitly rather than bypassing the check. Caught write errors restore
  both files; the pair is not crash-atomic. Review markers attest that you performed the
  semantic reviews; the helper cannot judge their substance or replace tests/visual review.
  Preview with
  `book1/rebuild/index.html`; regenerate that preview from the live HTML if its layout
  changes, retaining the base URL and staged-data substitutions described in the README.
- Do not replace the live archive with a partial rebuild. At completion, reconcile
  canonical IDs, Book Two endpoints and accumulated descriptions (later versions must
  retain newly recovered earlier facts), then validate the combined archive before
  switching the live files.
