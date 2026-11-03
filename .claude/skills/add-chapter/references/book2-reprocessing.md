# Book Two — replace reviewed chapters in the live archive

Use this for the user-authorized chronological reprocessing of existing Book Two
chapters. Book One's 53-chapter rebuild is complete and promoted. The app continues to
load `book1/*.js` and `book2/*.js`. All existing Book Two chapters stay visible while
reviewed replacements are published into those same three Book Two files.

## State and evidence boundaries

- `book2/rebuild/progress.json` records completed chapters, the active run, source hashes,
  and expected live/reference/reviewed hashes. Next chapter is initially 1; the existing
  50 summaries are legacy content, not proof that reprocessing has been done.
- `book2/rebuild/reference/book{1,2}/` is the immutable, integrated starting archive.
  It supplies identity/completeness checks, never facts to copy as chapter evidence.
- `book2/rebuild/reviewed/book2/` holds only the processed prefix used by the tools.
  This internal checkpoint prevents future chapters from contaminating source reads;
  it is not a second app or a replacement for publishing `book2/*.js`.
- Each unique run has `baseline/`, `context/book{1,2}/`, the chapter manifest and all
  three semantic review records. Context Book One is the promoted complete book;
  context Book Two stops at the preceding reviewed chapter. The app retains later
  legacy chapters independently. Never run the bare live readers/appender to draft
  a replacement: they would read the entire existing Book Two archive.

The original files before promotion are also preserved at
`book1/rebuild/integration/before/`; the integration report documents canonical ID
changes. Do not recreate combined people (`mord-lif`, `olvir-yrsa`, `halja-vali`,
`hijas-orna-ulfrir`). Use `mord`, `lif`, `olvir`, `yrsa`, `halja`, `vali`, `urd`,
`verdani` and `skuld`, assigning actions individually. The lineage is
`ulfhednar-linaje`; Helka's enslaved guard is `guardia-ulfhednar-helka`.

## Prepare and run a chapter

Stay at the absolute project root. The launcher is
`.claude/skills/add-chapter/scripts/reprocess.cjs`; Book 2 is implicit, so do not pass
another book number. Read the source/entity workflow and all three review gates just
as in the Book One rebuild. All ownership, full-entry reads, event-category coverage,
all-POV clue lifecycle, Spanish summaries and identity checks remain mandatory.

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs check-chapter 1
node .claude/skills/add-chapter/scripts/reprocess.cjs prepare 1 "book2/chapter 1.xhtml"
```

Prepare requires the actual supplied local source (HTML/XHTML/text path is recorded
exactly), creates a unique run and baseline, and prints their absolute paths. It does
not change live data. Read that complete source with `read-chapter.py` from the project
root, one page per response through END. If an active run already exists, continue it;
do not initialize again, recapture a baseline or remove progress to bypass a failure.
`init` is a one-time setup command, already completed for this archive.

Every helper below reads/writes the active chronological context. Leading `1` on a
reader means page 1; chapter numbers and baseline/spec paths are separate arguments.
Replace `RUN` and `BASELINE` with the absolute paths printed by prepare.

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs match-entities Orka Lif
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference match-entities Myrk
node .claude/skills/add-chapter/scripts/reprocess.cjs read-latest 1 orka lif
node .claude/skills/add-chapter/scripts/reprocess.cjs read-links 1 rescate-breca
node .claude/skills/add-chapter/scripts/reprocess.cjs read-links 1 --between orka glornir
node .claude/skills/add-chapter/scripts/reprocess.cjs read-backlog 1 --index
node .claude/skills/add-chapter/scripts/reprocess.cjs read-backlog 1 --pov ORKA
node .claude/skills/add-chapter/scripts/reprocess.cjs review-backlog 1 BASELINE init RUN/thread-checklist.json
node .claude/skills/add-chapter/scripts/reprocess.cjs append-chapter 1 BASELINE RUN/chapter.json
node .claude/skills/add-chapter/scripts/reprocess.cjs verify-chapter 1 BASELINE --review-nodes=1
node .claude/skills/add-chapter/scripts/reprocess.cjs verify-chapter 1 BASELINE --review-links --review-summary
node .claude/skills/add-chapter/scripts/reprocess.cjs review-backlog 1 BASELINE sync RUN/thread-checklist.json
node .claude/skills/add-chapter/scripts/reprocess.cjs review-backlog 1 BASELINE check RUN/thread-checklist.json
```

`search-descriptions`, `append-node` and `append-entries` use the same implicit-book
substitution as Book One. Batch manifests and `--replace-applied PREVIOUS_SPEC` work
unchanged for unfinished drafts. Use the original baseline and retain the exact applied
manifest. Review flags belong to verify, not append. Summary verification intentionally
uses empty guides in context, so use the confirmed canonical names as in Book One.

For reference-only identity checks, start with `--reference match-entities`.
When prose is needed to distinguish candidates, prefer a targeted excerpt before
`--reference read-latest`, which can expose the entity’s entire later-book history:

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference search-descriptions 1 "Orv" --id orv-sneak --max-excerpts 1
```

A reference match establishes a candidate canonical id, not chapter evidence. An
unambiguous full character label matching the named individual and role in the source
can settle that id without a prose read. Do not search that same name in its own
`desc` merely to repeat the label check: descriptions often omit their subject's name,
so `NO MATCHES` there does not invalidate a label match. Retrieve prose when needed to
distinguish identities or check a translated event, not as a mandatory second lookup.
Stop once identity is settled; compose the entry from the current chapter alone. Use the
full reference entry only if the bounded excerpt cannot settle identity. This does not
replace the mandatory full chronological-context read before updating an existing node.

For a new chronological event whose canonical reference id is unknown, a failed
match of a guessed id does not establish absence. Search the reference descriptions
for a distinctive named participant using the default candidate-only output, select
the plausible event candidates, then confirm their labels/ids and retrieve only the
excerpt needed to distinguish the scene. For example, Chapter 5's `Myrk` candidate
search reveals `plan-likrafa-nastrandir`, which guesses such as `encargo-myrk` miss:

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference search-descriptions 1 Myrk
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference match-entities plan-likrafa-nastrandir
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference search-descriptions 1 "CAPÍTULO 5" --id plan-likrafa-nastrandir --max-excerpts 1
```

Read further candidate pages when indicated; reference identity discovery still supplies
no chapter facts. Once the scene identity is settled, stop reference retrieval and draft
from the complete supplied source. Keep connected occurrences in the appropriate event
rather than minting a differently named duplicate because the guessed id was unmatched.

The backlog reader currently recognizes ORKA/VARG/ELVAR as POV filters. For Guðvarr or
Biórr chapters, use the unfiltered prose, or select affected existing POV families plus
all untagged candidates only when the review gate's relevance conditions justify it.
Do not pass unsupported POV names or assume a new POV's clues are absent. Every candidate
still needs an item-specific assessment. Reconcile newly shared Book One threads on
source evidence; no migration or date alone establishes a closure.

## Review and publish

Write `ownership-review.md`, `event-review.md`, `thread-review.md` and the checked
`thread-checklist.json` beside `baseline/`. Each PASS marker must be a bare exact line.
These are semantic attestations, not outputs the helper can infer. Before completion,
review every proposed node/link against the complete source and run the relevant tests:

```sh
node --test tests/book2-reprocess.test.cjs tests/book-integration.test.cjs tests/characters.test.cjs tests/focus.test.cjs tests/chapter-verifier.test.cjs tests/backlog-reader.test.cjs tests/backlog-review.test.cjs tests/chapter-batch.test.cjs tests/link-reader.test.cjs
```

If an integration regression requires a specific legacy relationship removed by a
source-reviewed replacement, inspect the reference record and reviewed checkpoint
before changing data. Correct an obsolete assertion to check preservation of the
reviewed chapter's links and its supported canonical endpoints; never restore an
unsupported identity just to satisfy the old expectation. Keep all syntax, endpoint,
history-preservation and unreviewed-record checks intact.

Prepare `RUN/completion.json` with the exact source recorded by prepare and one log
paragraph describing changes, reviews, tests and any visual limitation:

```json
{"source":"book2/chapter 1.xhtml","log":"Chapter 1: Describe the reviewed replacement and validation."}
```

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs finish-chapter 1 RUN/completion.json
```

Finish reruns chapter verification and checklist checks, verifies source and archive
hashes, then publishes the reviewed prefix plus all later reference chapters. It rebases
later cumulative profiles onto the new reviewed history so they cannot overwrite it
with copied legacy introductions. Later summaries and link records stay intact.
Front-matter records remain in the live archive; they do not enter the drafting context
unless separately reviewed. All emphasized summary entities and all combined endpoints
must still resolve before any publication. A missing dependency blocks publication;
resolve its identity/source-supported record or repair its actual reference before
retrying, rather than silently restoring every removed chapter node.

Live files, reviewed checkpoint and progress update together with restoration on caught
write failures; this is not crash-atomic. Hash drift, missing reviews, source changes,
out-of-order chapters and duplicate completion fail without publishing. Do not rewrite
recorded hashes to suppress a mismatch. External edits need an explicit reconciliation
and their own preservation review.

## Reconcile an external later-chapter edit

When the hash guard reports an external edit, preserve the live files and active run.
Review the actual differences before accepting them. `reconcile-later` supports
replacements of existing later Book Two node/link records; it rejects front matter,
reviewed chapters, added/deleted records, changed Book One files or summaries, omitted
changes and intervening drift. Other edit kinds still require a separate repair.
Do not overwrite the immutable reference or hand-edit hashes.

Create a JSON spec beside the active run’s baseline with a nonempty `log` explaining
the authorized repair, `liveHashes` from `archive-records.cjs`’s `hashes(root)`, and
`nodes`/`links` arrays of changes. Each change contains the zero-based parsed array
`index`, owning `chapter`, and exact `before`/`after` objects. Reconstruct `before`
from the last published archive, using `compose` with the reviewed checkpoint and
the effective reference (original reference with any hash-checked `reconciled/`
files substituted); do not use the unfinished active context. Compare all parsed
records and review every changed field, including canonical-id endpoint repairs.

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs reconcile-later RUN/reconciliation.json
```

The command verifies every before/after object and all untouched records, reproduces
the live archive from the proposed corrections, and validates endpoints and summary
mentions before accepting new hashes. It writes separate `reconciled/book2/` files
and an exact audit spec under `book2/rebuild/reconciliations/`, leaving live files,
the immutable reference, the active baseline and drafting context unchanged. Later
publications rebase this effective reference onto reviewed history; a corrected
chapter is replaced normally when its own source is eventually reprocessed. Record
the reconciliation and preservation checks in the current completion log. It is
preservation of external work, not source-review completion for those later chapters.

After each completion, inspect the combined live archive, its connections and both book
summary tabs when browser access permits. Respect the existing local-file browser
restriction; report actual checks and leave manual preview confirmation when blocked.
At the last legacy chapter, status becomes `complete`; subsequent new chapter additions
use the normal live append workflow unless another rebuild is explicitly requested.
Keep all Book One workflow references and helper scripts: this mode adds routing and
publication mechanics, not a weaker source or semantic review procedure.
