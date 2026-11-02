# Mandatory semantic review gates

These requirements apply to live and rebuilt archives. Read all three gates before
drafting and apply their final reviews before recording completion.

## HARD GATE — Fact ownership

This is a required part of every chapter addition, reference integration and correction,
including the Book One rebuild. **Do not write an addition, mark progress complete, or
report success while it fails this gate.** A syntactically valid entry can still fail.

**Before writing:** after the full-entry reads, assign each proposed fact to the entity
or event it primarily describes. Audit the complete latest descriptions of every entry
you will touch, including inherited text, not just the proposed append. Apply these rules:

- A terminology/type/species entry **must define the term and supported general
  properties**. It must not narrate an individual's measurements, injuries, actions,
  dialogue or encounters. Níðing explains an insult/forajido; Vaesen explains a creature
  category; Spertus does not retell Spert's scenes. A single specimen does not establish
  universal properties. Describe observed magical mechanisms abstractly; put the
  demonstration's participants and chronology in their own entries.
- A named entity's entry **must primarily describe that entity**. Wave-Jarl owns its
  fifty oars and fittings; Drakkar does not. Berser owns divine identity and attributed
  lineage; Berak owns his transformation. Snakavik owns supported place facts and
  connections; Agnar owns his sale plan and Elvar her emotional reaction. Source
  attribution may name another character without transferring ownership of the fact.
- When a character recounts an event to another character, the authoritative account
  belongs on the EVENTO node for that event, not copied in full onto the narrator's and
  the listener's own entries too. Give the narrator's and listener's entries only their
  own stake in it (a wound, an action, a one-line attribution such as "es quien relata a
  X cómo ocurrió Y; véase evento-id") and let readers follow the link for the content.
  Drafting the same paragraph onto three entries is the inverse of ownership, not a safe
  default for a POV chapter built around testimony.
- Separate a custom from its occurrence (Alþing versus the Fellur assembly), and a place
  type from a specific place (Steading versus a family's farm). Link instances/events
  to the relevant definition. Preserve geography, local history and mythology that
  actually describe the entry's subject, with qualifications for disputed claims.
- **Mentioning an entity is not sufficient reason to update it.** If a chapter adds only
  an example, visit, reaction or reference, update the actual participant/place/event
  as appropriate and add a meaningful relationship if needed. A short supported profile
  is valid; do not pad it with a recap, invented lore or what the chapter does not explain.

If any sentence fails, **relocate it before proceeding**. Confirm whether its fact already
exists at the proper destination; preserve missing facts there without duplicating them.
Correct affected links and propagate repairs through later same-id revisions. For a
contaminated baseline, keep a separate pre-repair snapshot, finish and validate the repair,
then capture a fresh chapter baseline. Never bypass preservation checks to conceal a repair.
When correcting this pattern, inspect the other entries of the affected kinds as well as
the user's example.

Event coverage and ongoing mystery/clue tracking must also pass the separate
[event-coverage gate](#hard-gate--key-event-coverage) and
[thread-lifecycle gate](#hard-gate--thread-and-clue-lifecycle) below.

**After writing, before completion:** review every new entry in full, every updated entry's
new text and changed metadata, and each changed link as a sentence; repeat the ownership
audit against the chapter. When the complete latest baseline `desc`/`star` was already read
and audited in this run, use the verifier's `--review-nodes=1` report instead of printing
that unchanged history again. It runs all normal checks before reporting complete new
nodes, exact appended `desc`/`star` suffixes and before/after values for changed metadata
(including removed fields). Read numbered pages separately through `END`; keep node,
link and summary reports in separate responses to avoid combined-output truncation.
Use `read-latest` for complete entries whenever the baseline audit is missing, a page was
truncated, an inherited ownership issue is suspected, or the new evidence requires
reconsidering earlier text. Verified preservation does not establish semantic ownership.
Record the reviewed ids,
any relocations, and `Ownership review: PASS` in `ownership-review.md` inside the unique
run directory, beside `baseline/`. Record PASS only after every violation is fixed. This
is a mandatory semantic review; syntax, endpoint and mention-matching checks do not
establish ownership. Run the normal verifier after any resulting chapter edits. For a
historical repair, validate the repair against its own snapshot rather than pretending
it is an append-only chapter run. Only then update progress or report completion.

## HARD GATE — Key event coverage

Every important event must be discoverable under **EVENTOS CLAVE** (`cat-eventos`),
including in the Book One rebuild. Before drafting, inventory the chapter's important
scenes and reported incidents across every represented POV: deaths, attacks, rescues,
captures, oaths, consequential decisions, departures and discoveries. Include quiet
turning points and attributed historical events when they matter to the story; routine
chores, repeated background facts and every individual blow do not need separate nodes.

- Map each candidate to an existing event id or create a `group: 'EVENTO'` node after
  normal identity checks. One coherent event may cover several connected actions;
  update its accumulated history rather than duplicating a duel, rescue or capture
  already represented there. A fact appearing only in a profile, place, summary or
  `TRAMA` node does not satisfy event coverage.
  For a conversation containing several important revelations, check each against
  the proposed event's actual text before applying the manifest. A shared scene title
  or participant list does not capture an omitted revelation. Include connected
  disclosures in that event rather than creating a separate event for each one;
  this includes learning a previously unnamed recurring character's name.
- When a chapter both resolves an existing pending EVENTO (a long-announced departure
  finally happening) and introduces new content in that same scene (the reason behind
  it), re-read the resolving EVENTO's final text and the new node's final text side by
  side before finishing — it is easy to draft the new node so it repeats the scene the
  existing EVENTO already owns. The verifier cannot catch this: it checks syntax and
  link identity, not content overlap between sibling nodes. (In a Book 1 rebuild Chapter
  20 run, a new "mission" EVENTO first repeated, almost verbatim, the departure sentence
  already owned by the existing `partida-liga` EVENTO it was meant to follow from; caught
  only by a manual side-by-side re-read after the verifier had already passed.)
- The same duplication happens, by default, whenever a chapter's new EVENTO is what
  resolves a `TRAMA`'s pending question — write the TRAMA's append as a status-and-evidence
  pointer to the EVENTO from the first draft, not as a second scene account to be trimmed
  later. Drafting both nodes with a full narrative and relying on the side-by-side re-read
  to catch the overlap works, but it is a detection step, not a prevention one, and it is
  easy to forget under time pressure. (In a Book 1 rebuild Chapter 21 run, the first draft
  of `pasado-elvar` and `berak-venta` — both resolved in that chapter by two brand-new
  EVENTO nodes created in the same run — each re-narrated the full sale/revelation scene
  almost verbatim; the fix was to cut each TRAMA's append down to `ESTADO: ...` plus
  "Véase EVENTO-ID para el desarrollo completo" and nothing else.) When a chapter's
  evidence resolves a TRAMA via a new EVENTO, write the TRAMA append short on the first
  pass: resolution status, the one-line answer to the open question, and the cross-reference
  — never the blow-by-blow.
- A `TRAMA` node whose `desc` is growing into a full scene account rather than a
  question-and-evidence log is a tell that a dedicated EVENTO for that scene is missing,
  not that the TRAMA is doing its job well. If an open question's chapter-by-chapter
  history already reads like narration, give the scene its own EVENTO and trim the
  TRAMA back to the question's status and evidence, cross-referencing the EVENTO for
  detail.
- Record what actually happened, its source chapter, participants, place when known,
  and supported outcome. Distinguish witnessed action, a character's report and myth;
  the chapter of discovery is not necessarily the date of the incident. Preserve
  uncertainty about perpetrators, motives and consequences.
- Give each event an active direct link to `cat-eventos` and meaningful links to its
  participants and relevant places/evidence. Respect link direction. A plot question
  retains its `TRAMA` id and connects to the event: the discovery of a death can be a
  completed event while the killer's identity remains open. An agreement to depart is
  an event; the proposed journey has not occurred merely because it was agreed.
- Before completion, compare the inventory with the finished archive and record each
  candidate's chapter, event id and coverage (new, existing/updated, or excluded with
  a reason) in `event-review.md` beside `baseline/`. Read the event descriptions and
  resolved links. Record `Event coverage review: PASS` only after every important
  candidate has an event and active category connection. The verifier checks category
  connections for added/updated EVENTO nodes; it cannot detect an omitted story event.

For a historical backfill, snapshot first, insert additions into the chapters where
their evidence became available, preserve existing objects and summary text, and add
later identifications/links in their own source sections. Validate that every chapter's
links resolve to ids known by that chapter and that earlier same-id revisions remain
prefixes of later ones. Use a repair-preservation check against the snapshot rather
than the new-chapter append-only verifier. If source files are unavailable, identify
the archived evidence used and limit the coverage claim accordingly.

## HARD GATE — Thread and clue lifecycle

**Every mystery, open plot question, unresolved goal and recorded clue must be followed
until the source resolves it or definitively disproves the associated hypothesis.** This
is mandatory for every chapter and all POVs, including the Book One rebuild. Do not mark
progress complete or report success while this review is incomplete. It is not enough
to create a thread once or to pass the JavaScript verifier.

1. **Review the existing backlog after reading the complete chapter, before drafting.**
   Start with the bundled, paginated reader instead of a one-off array query:

   ```sh
   node .claude/skills/add-chapter/scripts/read-backlog.cjs 2 1
   # Book One rebuild (no book argument):
   node .claude/skills/add-chapter/scripts/rebuild.cjs read-backlog 1
   ```

   Read each page separately through `END`. It selects the latest same-id entry in
   book/array order and prints every `TRAMA` description and every nonempty `star`
   field across all POVs, including closed history and thematic notes for manual
   classification. It does not infer states or filter by the current POV. Other
   descriptions are omitted: use `read-latest` to establish a clue's source/context
   and before updating its owner, and `read-links` for relevant relationships. This
   candidate list does not replace reviewing pending goals/clues found in those full
   entries or the new chapter.
   After reading the full backlog, use `read-backlog.cjs BOOK PAGE --index` (rebuild:
   `rebuild.cjs read-backlog PAGE --index`) for a compact list of the same candidate ids,
   marked `[TRAMA]` and/or `[star]`, when checking the final review record for omissions.
   This avoids a one-off parser with guessed array names. The index includes closed
   history and thematic notes, infers no states, and cannot replace the full review.
   Any checklist made from it starts with pending assessments; classify each item
   against the evidence before recording PASS.
   Use the baseline-backed checklist to avoid hand-transcribing this inventory. After
   capturing the chapter baseline, initialize it beside `thread-review.md` (never
   overwrite an existing assessment file):

   ```sh
   node .claude/skills/add-chapter/scripts/review-backlog.cjs 2 40 "$chapter_baseline" init "$chapter_run/thread-checklist.json"
   # Book One rebuild: book is implicit, chapter is not
   node .claude/skills/add-chapter/scripts/rebuild.cjs review-backlog 40 "$chapter_baseline" init "$chapter_run/thread-checklist.json"
   ```

   It uses the same candidate selector as the full reader and leaves every assessment
   pending. Complete each item's `assessment` (`unchanged`, `advanced`, `partial`,
   `resolved`, `disproved`, `closed-history`, or `thematic`), `evidence` (source and
   item-specific reason), and `remaining` (pending question, or explicit `none`). Keep
   the generated `id` and `fields`; cover every clue within a multi-clue star in the
   evidence, or point to its explicit discussion in `thread-review.md`. Grouped prose
   assessments remain valid, but each ID needs its own checklist row referencing the
   applicable assessment. Do not fill rows with generic unchanged boilerplate.
   Inventory all open/partial threads and unresolved or not-yet-classified recorded clues,
   not just the current POV's named entities. Include `TRAMA` nodes and observations in
   `star` fields. Retain closed items as history; revisit them when new evidence bears
   on their closure. Use the
   latest accumulated entries, their source markers and relevant links; read full entries
   before updating them. Check whether the chapter supplies evidence for another POV's
   mystery. Do not treat silence, elapsed chapters or a POV change as resolution.
2. **Capture every new question and clue.** Review each storyline represented in the
   material. `TRAMAS ACTIVAS` serves Orka, Varg and Elvar; do not populate it for only
   one POV or force equal counts. Reuse an existing question when the evidence advances
   it. Give each distinct unresolved question/objective a stable `group: 'TRAMA'` node,
   linked to `cat-tramas`, its POV/participants, and relevant evidence. A clue may remain
   a clearly identified observation in its subject's `star`, linked or explicitly
   cross-referenced to the question it supports; it need not become a duplicate plot node.
   Keep observations separate from theories, and do not invent a mystery or future answer
   for ordinary descriptive detail. Preserve all already-recorded clues for review.
   Before composing node specs, draft the new chapter's questions and goals in
   `thread-review.md`: source evidence → existing/new id → current state → pending
   outcome. Include explicit requests, vows and agreed plans even when they occur in
   quiet dialogue; do not limit this pass to mysteries or the closing danger. This
   catches an unfulfilled learning request or revenge vow before the final audit.
3. **Persist the evidence trail in the archive.** For each question/clue, record its
   precise question/observation, first source book/chapter, supporting or conflicting
   evidence, related ids, and current state in its own `desc`/`star` and links. Never rely
   on chat memory or a temporary audit file as the only record. Append chapter-marked
   developments to the same id using the full-history rules. Keep the latest state
   explicit in Spanish: `ESTADO: ABIERTA`, `ESTADO: PARCIAL`, `ESTADO: RESUELTA`, or
   `ESTADO: DESCARTADA` (a disproved hypothesis). Do not overload node `status`, which
   uses `updated`, or confuse it with browser-local clue-board status.
4. **Assess each backlog item against the new evidence.** Record one outcome for every
   open/partial item: unchanged, advanced, partially answered, resolved, or disproved.
   No new archive revision is needed for an unchanged item, but it must appear in the
   chapter's review record. A clue must remain linked to its question as evidence changes;
   an unresolved question must never disappear because a new clue or name replaced it.
   If one item bundles several questions, distinguish their outcomes and keep the
   unanswered remainder open. For example, learning why Varg wants an akáll answers
   its purpose, but does not mean the invocation has occurred or his revenge is complete.
   A generated checklist may enumerate ids, but leave its assessment fields pending
   until reviewed; do not prefill every row with a generic "unchanged" verdict. For a
   `star` containing several clues, identify each unresolved observation by its source
   marker or a short quotation/paraphrase. Classify thematic notes and closed history
   separately from unresolved questions. Unchanged items may share a compact assessment
   when it names the actual pending questions and explains why this chapter leaves them
   unchanged; repeating the same boilerplate for every candidate is not that assessment.
5. **Close only on source evidence.** Record the actual answer/payoff, the exact resolving
   book/chapter and the evidence that establishes it. A character's guess, reader theory,
   suggestive parallel, destination announcement or promised action is not completion.
   Partial answers stay partial. Disproving a theory does not automatically solve the
   underlying mystery. If later evidence genuinely overturns a closure, append an explicit
   reopening with its source and explanation; preserve the earlier reasoning.
6. **Make closure visible while preserving history.** Append a new revision with the
   closure marker and answer, update a stale pending label/type when needed, and connect
   it to the resolving event/entity. Retain earlier clues, questions and theories as
   historical evidence, qualified by the latest outcome; do not delete or silently
   rewrite them. Retire its active-category edge with a broken-link marker matching the
   original source, target and label exactly, and cite the resolution in `reason`. Keep
   the resolved node reachable through its participants/evidence. Partially resolved
   threads retain their active edge. Check broken markers when reviewing category
   history rather than assuming every stored edge is still active.
7. **Verify discovery as well as records.** Category-only links to a character/event do
   not create a plot: the relationship viewer excludes structural categories and its
   plot filter requires `TRAMA` nodes. Confirm that active questions connect both to the
   shared category and relevant participants, and that closed questions are no longer
   presented there as active. Do not claim the plot filter or clue board automatically
   understands prose states: `TRAMA` filters by kind, and source clue-board entries start
   as `unreviewed`; saved board states are separate browser data. Do not alter the user's
   board notes or claim their saved statuses changed merely by editing node text.
8. **Record a completion gate result.** In `thread-review.md` beside the run's `baseline/`,
   list every prior open/partial thread and unresolved/unclassified clue by stable id
   (identify a `star`
   clue by its owning node and source marker), its outcome, evidence chapter, remaining
   question, and any new/changed links. Include new items, closures and POV coverage.
   Unchanged items may use a compact list. Record `Thread lifecycle review: PASS` only
   when all items are accounted for and all required archive updates are complete.
   Review new evidence and all closure decisions semantically, then run normal checks.
   After applying or revising chapter data, sync the checklist before completing its
   final assessments. Sync adds new candidates with the correct evidence fields and
   pending assessments, retains baseline-only clues and existing notes, and resets an
   existing assessment to pending if that entry gains an evidence field. It does not
   infer story states or detect changed prose within an already-listed field; manually
   revisit every changed clue even when sync reports no additions.

   ```sh
   node .claude/skills/add-chapter/scripts/review-backlog.cjs 2 40 "$chapter_baseline" sync "$chapter_run/thread-checklist.json"
   # Book One rebuild
   node .claude/skills/add-chapter/scripts/rebuild.cjs review-backlog 40 "$chapter_baseline" sync "$chapter_run/thread-checklist.json"
   ```

   Assess the pending rows, then check the completed checklist before recording PASS:

   ```sh
   node .claude/skills/add-chapter/scripts/review-backlog.cjs 2 40 "$chapter_baseline" check "$chapter_run/thread-checklist.json"
   # Book One rebuild
   node .claude/skills/add-chapter/scripts/rebuild.cjs review-backlog 40 "$chapter_baseline" check "$chapter_run/thread-checklist.json"
   ```

   The check requires the union of baseline and current candidates, catching clues that
   vanished from a later star as well as new questions. Use sync for missing candidates
   or evidence fields instead of transcribing inventory markers or regenerating the
   checklist over completed work. Duplicate/missing IDs, wrong-run metadata and unfinished fields fail. This is
   a mechanical coverage check, not a semantic PASS: it cannot establish that every
   subclue was followed, an explanation is accurate, or a mystery was correctly resolved.
   Progress and completion still require all three hard-gate review records.

