# Book Two — replace reviewed chapters in the live archive

Use this for the user-authorized chronological reprocessing of existing Book Two
chapters. Book One's 53-chapter rebuild is complete and promoted. The app continues to
load `book1/*.js` and `book2/*.js`. All existing Book Two chapters stay visible while
reviewed replacements are published into those same three Book Two files.

## State and evidence boundaries

- `book2/rebuild/progress.json` records completed chapters, the active run, source hashes,
  and expected live/reference/reviewed hashes. Next chapter is initially 1; the existing
  50 summaries are legacy content, not proof that reprocessing has been done. The live
  `book2/summaries.js` entry for the chapter being reprocessed is exactly this kind of
  legacy content: never draft from it, but after independently drafting from the actual
  supplied source, use the [legacy summary cross-check](#legacy-summary-cross-check)
  to catch omissions and source discrepancies. Any name it reuses still needs the normal identity-resolution steps —
  it can carry the same trap a hasty first pass would: in the Chapter 36 run, the legacy
  summary already named a new slaver "Haga", which is also the bare label of an
  unrelated, already-existing Book 1 Grimholt warrior (`haga`); copying that mention
  verbatim would have silently linked the new character's summary mention to the wrong,
  unrelated node. `read-latest` on the candidate id surfaced the collision, and the new
  character was minted as `haga-starl` with the distinct label "Haga de Starl" instead
  (see the shared-epithet rule in
  [source-and-entity-workflow.md](source-and-entity-workflow.md) and the
  Hundur/Dios-Sabueso precedent in
  [chapter-summary-links.md](chapter-summary-links.md)).
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
node .claude/skills/add-chapter/scripts/reprocess.cjs status
node .claude/skills/add-chapter/scripts/reprocess.cjs check-chapter 1
node .claude/skills/add-chapter/scripts/reprocess.cjs prepare 1 "book2/chapter 1.xhtml"
```

Prepare requires the actual supplied local source (HTML/XHTML/text path is recorded
exactly), creates a unique run and baseline, and prints their absolute paths. It does
not change live data. Read that complete source with `read-chapter.py` from the project
root, one page per response through END. If an active run already exists, continue it;
do not initialize again, recapture a baseline or remove progress to bypass a failure.
`init` is a one-time setup command, already completed for this archive.

Preparation is a checkpoint. When the source is available and the guards pass,
continue through publication and the live checks in the same turn. If interrupted,
save a short `source-notes.md` in the active run. Record whether the source reached
END, the exact backlog reader arguments and last consecutive page reviewed, the
event and thread inventory, the applied manifest path if any, and the next command.
On resume, read the note and confirm the run and baseline with `status`. Continue
from the first unchecked page or gate using the same reader selection. If earlier
evidence is missing or the source or context changed, repeat the affected review
before relying on it. An initialized checklist is still pending review.

Compare the requested chapter with `nextChapter` from status and check the supplied
path before opening the longer review references. If the filename is absent, check
the local ebook's chapter heading or table of contents: numbered export files can
contain the requested chapter under a different filename. Prepare the verified
source path only when its chapter is next in sequence.

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
node .claude/skills/add-chapter/scripts/reprocess.cjs verify-chapter 1 BASELINE --review-links
node .claude/skills/add-chapter/scripts/reprocess.cjs verify-chapter 1 BASELINE --review-summary
node .claude/skills/add-chapter/scripts/reprocess.cjs review-backlog 1 BASELINE sync RUN/thread-checklist.json
node .claude/skills/add-chapter/scripts/reprocess.cjs review-backlog 1 BASELINE check RUN/thread-checklist.json
```

For a large backlog prose selection, append `--compact` on every page to retain all
evidence with less formatting overhead. Do not switch formats mid-read or combine it
with the separate `--index` inventory.

For a long selection with multiple cross-POV inclusions, save the exact launcher
command as a page-only wrapper beside the baseline before paging. From the project
root, run `sh RUN/read-backlog.sh 1`, then increment only the page argument:

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs read-backlog "$1" \
  --compact --pov ORKA --include myrk --include rumbo-lik-rifa
```

Replace the example IDs with the full selection for the run. Record the last reviewed
page in `source-notes.md`. If another affected family surfaces, read the added evidence
separately or restart with the expanded selection. Page numbers from the original
selection cannot be carried over to a changed selection.

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

When several new-to-context names or events come from the same reviewed chapter,
start reference discovery with one candidate-only search for the full source marker.
This can find the canonical event and named participants in the same pass, even when
the event's title is unknown. For Chapter 24, this surfaced both
`infiltracion-bloodsworn-darl` and `aesa`:

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference search-descriptions 1 "LIBRO 2, CAPÍTULO 24"
```

Use the full marker with its recorded punctuation so accumulated Book One history
does not match. Confirm plausible ids by label and, when needed, a targeted excerpt.
A missing marker is inconclusive: legacy descriptions may omit it or use different
wording. Continue with the participant-name search above when the chapter-marker
results leave an identity unsettled.

For a Guðvarr or Biórr chapter, choose the prose selection from the unfiltered
index and chapter evidence **before opening page 1**. A profile's stored arc tag is
not the chapter's viewpoint: Biórr's `ELVAR` tag does not by itself require
`--pov ELVAR`. In Ch40, that selection retrieved 96 candidates across 15 pages,
including Elvar's unrelated family and political history. When the affected families
can be bounded, use `read-backlog 1 --compact --untagged --include ID` with the
launcher. Include the POV's own clue owner and every affected tagged candidate;
for a captive-arrival chapter, consider the individual children, both rescuers'
threads, recovery, the dragon's objectives and the opposing campaign, not just
characters present. Record the chosen families and why the remaining arcs are
unaffected, then save the wrapper and read the same selection through END.
If relevance cannot be bounded, use the applicable `--pov` selection or unfiltered
prose. Keep the unfiltered per-ID checklist in every case; narrower prose selection
does not reduce cross-POV review obligations.

## Legacy summary cross-check

Once the independent draft is ready, retrieve only the requested legacy summary.
Use the parsed immutable reference so a search for the chapter number cannot
pull in unrelated revisions or later chapter prose:

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs --reference read-summary 38
```

Replace `38` with the chapter under review. For discrepancies, check the source
for the sequence of actions, who acted or reported each fact, and where the scene
ends. Book Two Ch37's legacy summary placed Palrun's release after Logur's arrival,
described a dead man as co-leading a later attack, and treated the intended
open-sea voyage as already underway. The source shows Glornir releasing Palrun
before Logur arrives, Edel identifying the dead man through his relationship to
the attacker, and the Sea-Wolf rowing away through the fiord. Compare any affected
event descriptions, relationships and thread states as well as the summary.

For a handoff, resolve giver, recipient and object from the source before drafting
the event, link and summary. In Ch47, Glornir hands the tiller to Æsa before coming
over to inspect the sails; the legacy summary reverses that transfer. A nearby
command or leadership role does not establish who receives the object. Check all
three representations against the same source action.

For a conversation continued across POV chapters, check where the supplied chapter
begins before importing a legacy quotation or reaction. Distinguish what is spoken
from the current POV's private inference, and identify whose inference it is. In
Ch39, Orka privately connects Breca and Bjarn with the release ritual; Uspa does not
announce that conclusion. The legacy summary also repeats Uspa's recognition and
«Todavía no» exchange from Ch38. Extend the shared EVENTO for the continuous scene,
but source-mark each chapter's contribution and draft its summary from that chapter's
own text. A prior report retold in the conversation retains its original uncertainty:
Halja's guess that Glornir has probably caught Skalk is not current rescue evidence.

For remembered dialogue followed by an internal reply, resolve the speaker and
addressee across paragraph breaks before retaining a legacy quotation. In Ch45,
Orka's private vow to keep searching addresses Breca; it is not Ulfrir promising
to search for Orka. For a staged action, distinguish collaborators, uninformed
allies and the intended victim rather than assigning one knowledge state to a
whole company: Halja knows the attack is arranged, Lif was not briefed, and Myrk
is deceived into taking the escape opportunity.

Check the legacy summary's degree of certainty as well as its event sequence.
An observer's visual comparison does not establish an object's identity or mechanism.
In Ch46, Guðvarr sees a shadow beneath Hakon's skin that resembles Úlfhéðnar
tattoos; the legacy summary calls it a barely healed tattoo. Retain the observed
mark and attributed resemblance without confirming a tattoo, drawing, lineage or
implant. Likewise, keep an unnamed referent and an unheard whispered date qualified
even when earlier reader knowledge suggests an interpretation.

## Review and publish

Write `ownership-review.md`, `event-review.md`, `thread-review.md` and the checked
`thread-checklist.json` beside `baseline/`. Each PASS marker must be a bare exact line.
These are semantic attestations, not outputs the helper can infer. Before completion,
review every proposed node/link against the complete source and run the relevant tests:

```sh
node --test --test-reporter=dot tests/book2-reprocess.test.cjs tests/book-integration.test.cjs tests/characters.test.cjs tests/focus.test.cjs tests/chapter-verifier.test.cjs tests/backlog-reader.test.cjs tests/backlog-review.test.cjs tests/chapter-batch.test.cjs tests/link-reader.test.cjs
```

The compact dot reporter keeps successful multi-file runs bounded. Check the exit
status; if nonzero, rerun with `--test-reporter=spec` to inspect failure details and
resolve them before completing.

If an integration regression requires a specific legacy relationship removed by a
source-reviewed replacement, inspect the reference record and reviewed checkpoint
before changing data. Correct an obsolete assertion to check preservation of the
reviewed chapter's links and its supported canonical endpoints; never restore an
unsupported identity just to satisfy the old expectation. Keep all syntax, endpoint,
history-preservation and unreviewed-record checks intact.
Likewise, a minimum live-description length is not a preservation guarantee: reviewed
ownership changes can legitimately shorten prose. Compare the profile with its exact
latest source description and use a deliberately long fixture to test that long text
and revision snapshots remain complete, rather than preserving a stale word-count floor.

Prepare `RUN/completion.json` with the exact source recorded by prepare and one log
paragraph describing changes, reviews, tests and any visual limitation:
The `log` must start with the literal `Chapter N: ` (chapter number, colon and space)
and contain no newline. Put the POV or other subtitle after that prefix;
`Chapter 14 — Biórr:` is rejected even though it describes the right chapter.

```json
{"source":"book2/chapter 1.xhtml","log":"Chapter 1: Describe the reviewed replacement and validation."}
```

```sh
node .claude/skills/add-chapter/scripts/reprocess.cjs finish-chapter 1 RUN/completion.json
```

After publication, run the live-archive checks before reporting completion:

```sh
node --test --test-reporter=dot tests/book-integration.test.cjs tests/characters.test.cjs tests/focus.test.cjs
```

The pre-publication suite reads the previous live chapter, not the unfinished
chronological context. It therefore cannot catch a legacy integration assertion
invalidated only when this replacement becomes live. Apply the obsolete-assertion
procedure above if needed; retain the completed archive and its evidence rather than
rewriting them to satisfy an unsupported legacy direction or identity.

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
write failures; this is not crash-atomic. Completion also retains the three review reports,
the per-ID checklist, completion spec and batch manifest (when present) under
`book2/rebuild/reviews/chapter-N/` in that same transaction. The chapter's progress entry
records this relative directory and the evidence hashes. Existing evidence files block
completion rather than being overwritten. Use these durable reports for later audits,
inspecting checklist rows with the standalone
`read-checklist.cjs CHECKLIST.json PAGE [ID ...]` reader;
`run` and checklist baseline paths still identify temporary drafting context, which the
OS may remove. Earlier chapters without a `reviews` entry may have only temporary
reports; do not invent missing attestations or regenerate them from later live data.

When the preceding chapter has a durable checklist, use
`read-checklist.cjs CHECKLIST.json PAGE --index [ID ...]` to compare the previously
recorded open questions with the current backlog by ID. The index shows saved outcomes
and remaining questions without repeating evidence prose. Its pages prefer row
boundaries, splitting a line only when it exceeds the page limit. Request full rows for
ambiguous or multi-clue assessments. When both checklists are available, match rows
by ID to look up the previously recorded pending question. Carry forward the question
only after checking it against the current source and backlog. Write the current
chapter's assessment and evidence separately. A previous `advanced` or `partial`
verdict can become `unchanged` for this chapter while the question remains open.
Review missing IDs, changed evidence fields, and changes inside an existing field
individually before finalizing the current checklist.
The prior index supplements the unfiltered current backlog and required prose reads.

Hash drift, missing reviews, source changes,
out-of-order chapters and duplicate completion fail without publishing. Do not rewrite
recorded hashes to suppress a mismatch. External edits need an explicit reconciliation
and their own preservation review.

If an immutable-reference lookup shows a later link to an ID the reviewed prefix
replaced, check the effective reference before treating it as a publication blocker.
`--reference` reads the original snapshot. Publication uses the hash-checked
reconciled file for each data kind listed in `progress.json` under
`reconciledHashes`. For example, inspect the parsed Chapter 29 link as follows:

```sh
node - <<'JS'
const archive = require('./.claude/skills/add-chapter/scripts/archive-records.cjs');
const { reconciledHashes = {} } = require('./book2/rebuild/progress.json');
const linksRoot = reconciledHashes.links ? 'reconciled' : 'reference';
for (const { chapter, value } of archive.read('book2/rebuild/' + linksRoot, 2, 'links')) {
  if (chapter === 29 && value.source === 'partida-darl-liga' && value.type === 'geo') {
    console.log(chapter, value);
  }
}
JS
```

Keep this check scoped to endpoint preservation. Use the chronological context and
the supplied chapter for factual drafting. If the effective link already uses the
canonical ID, resume the chapter without another reconciliation.

## Reconcile an external later-chapter edit

When the hash guard reports an external edit, preserve the live files and active run.
Review the actual differences before accepting them. `reconcile-later` supports
replacements and explicitly audited chapter reassignments of existing later Book Two
node/link records; it rejects front matter,
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

For an incorrect section assignment, a change may also supply `afterChapter`.
Both chapters must be unreviewed, and the destination must have an existing summary.
Without this explicit field, any chapter move still fails. Preserve record order and
all fields for an assignment-only repair (`before` and `after` are then identical).
Prepare the corresponding live section-comment correction, record its actual hashes,
and reconcile it with the same command; never edit reference files or progress hashes
by hand. Check all parsed assignments so a moved comment does not move neighboring
records accidentally. The audit records both chapters.

If publication reports a missing later endpoint, inspect its reference record's
section chapter and its source markers before adding a node to the current draft.
Book Two Ch42 exposed `sterkur`: its description starts with Ch43 evidence and both
relationships belong to Ch43, but its section was Ch42. Reprocessing Ch42 correctly
removed the misplaced introduction, breaking `leif → sterkur`. An audited
`chapter: 42, afterChapter: 43` correction preserved the future record without
importing it into Ch42. Section comments remain the parser's authority; this repair
does not make description markers override comments automatically. Use source
evidence to settle ambiguous ownership instead of guessing from a chapter reference.

The command verifies every before/after object and all untouched records, reproduces
the live archive from the proposed corrections, and validates endpoints and summary
mentions before accepting new hashes. It writes separate `reconciled/book2/` files
and an exact audit spec under `book2/rebuild/reconciliations/`, leaving live files,
the immutable reference, the active baseline and drafting context unchanged. Later
publications rebase this effective reference onto reviewed history; a corrected
chapter is replaced normally when its own source is eventually reprocessed. Record
the reconciliation and preservation checks in the current completion log. It is
preservation of external work, not source-review completion for those later chapters.

After each completion, run the live-archive checks above for the combined archive,
connections and summary data. Follow the main skill's visual-verification rule:
leave inspection of `index.html` and both book summary tabs to the user, and do not
attempt browser automation. Report the automated checks and the remaining manual
visual confirmation separately.
At the last legacy chapter, status becomes `complete`; subsequent new chapter additions
use the normal live append workflow unless another rebuild is explicitly requested.
Keep all Book One workflow references and helper scripts: this mode adds routing and
publication mechanics, not a weaker source or semantic review procedure.
