---
name: add-chapter
description: >
  Use this after a Bloodsworn Saga book club session to add a chapter's content to the
  interactive mind map (index.html), or to validate reference material against it. Trigger
  examples: "add chapter 5 of book 2", "we just read chapter 12, update the map", "log
  this chapter", "here are my notes from today's reading, add them", "update the map with
  what happened in this chapter", "validate this cast list/glossary against the map",
  "check this against what we already have". Takes chapter notes, a summary, raw chapter
  text, or non-chapter reference material (cast list, glossary, recap, map key) as input.
---

# Adding a chapter to the Bloodsworn mind map

This project tracks characters, places, events, and lore across the Bloodsworn Saga
trilogy in a D3 mind map (`index.html`). Normal sessions append to the current book's
own folder. `data-core.js` merges the full archive in book/array order: the latest
same-id entry wins, and all revisions remain available. The app no longer hides data
behind book/chapter reading caps. Reader helpers still accept a book cap to bound
source inspection; this is not a display restriction.

## Authorized Book One rebuild

A separate, parallel effort (`book1/rebuild/`) with its own procedure — read
[references/book1-rebuild.md](references/book1-rebuild.md) instead of this file when the
user is actively continuing that rebuild. For a Book One request, first check whether
`book1/rebuild/progress.json` exists and records an incomplete rebuild. If it does,
continue that rebuild by default, including for an ordinary "add chapter N" request,
unless the user explicitly selects the live archive. Read the rebuild procedure before
running preflight or editing data. Book Two requests use the live workflow. For staged
runs, use `scripts/rebuild.cjs` as described in that procedure; it selects the staged or
read-only reference archive without changing the caller's working directory. Capture the
absolute project root for source, progress and README paths.

## Input types

- **Chapter content** (notes, a summary, or raw text from an actual chapter) → follow
  steps 1-3 below: write nodes, links, and a chapter summary entry.
- **Reference/front-matter material** (cast list, glossary, map key, "the story so far"
  recap, appendix) → this is **not** a chapter. Don't write a chapter summary entry for
  it. Instead, use it to **validate** what's already captured: cross-check every claim
  against `book1/nodes.js` and the current book's own nodes and links,
  then report what's accurate, what's missing, and what's wrong. When asked to integrate
  the material, add confirmed missing facts directly to the current book's nodes and
  links; preserve contradictions as qualified source notes (see step 4). Only add
  net-new characters it introduces as nodes if the user asks.

## Before writing anything

Read this skill in bounded sections and read mode-specific references separately;
do not combine the full skill, another skill and rebuild instructions in one response.
If a read is truncated, retrieve the omitted sections before proceeding.

1. Identify which book and chapter number this is, or confirm this is reference material
   rather than a chapter (ask the user if it's ambiguous).
   For chapter input, run the compact preflight before larger reads:

   ```sh
   node .claude/skills/add-chapter/scripts/check-chapter.cjs 2 24
   ```

   It reports the exact parsed summary count, latest summary chapter, and matching
   chapter-comment locations in all three data files without printing prose. If any
   match exists, inspect for incomplete work or requested corrections instead of
   blindly appending. Do not search whole data files for a bare chapter number:
   numbers inside accumulated descriptions can return enormous unrelated lines.
   Read the complete chapter before inventory work. For local HTML/XHTML, use the
   bundled stdlib reader instead of writing an extractor:

   ```sh
   python3 .claude/skills/add-chapter/scripts/read-chapter.py "book2/chapter 17.html" 1
   ```

   It skips head/script/style content, preserves inline text (including drop-cap names),
   and prints 10,000-character pages. Read each numbered page in a separate tool response
   until `END`; do not batch chapter pages with inventories or full entries. If any output
   is truncated or condensed, retrieve the omitted content in smaller chunks before
   proceeding. Use `caveman_retrieve` for a `<<ccr:...>>` handle only when available.

2. After reading the complete chapter, build its full entity list — every named character,
   place, or thing it mentions, including context-only references that won't need a
   full-entry read. Resolve each name against the current inventory in this fixed order,
   stopping at the first step that confirms an id. (Extend the `2` book-cap argument below
   once a later book exists.)

   **a. Match by id/label first.** Run the bundled matcher — never a one-off inventory
   query or a default full listing:

   ```sh
   node .claude/skills/add-chapter/scripts/match-entities.cjs 2 Elvar Huld Skuld Orv Urt
   ```

   Pass every named entity, including context-only references; quote multiword names. It
   builds the complete parsed inventory through the book cap (retaining historical labels)
   and matches accent-insensitive complete names within ids and labels, printing candidate
   ids per name, grouped matching labels, and an explicit unmatched list. Two things it does
   **not** do: confirm identity (a match is a candidate, not a confirmed one — event and
   category labels can contain a character's name too) or translate (`The Dead Drengr`
   comes back UNMATCHED even though the inventory holds `El Drengr Muerto` — recognize such
   translations yourself from story context, then confirm with step **b** before reusing the
   id and retaining the canonical label). When the chapter's entity list isn't complete yet
   or targeted matching feels uncertain, pass `--all` instead of names for the same grouped,
   unfiltered listing — never pre-filter the source arrays by guessed ids:

   ```sh
   node .claude/skills/add-chapter/scripts/match-entities.cjs 2 --all
   ```

   Before escalating an unmatched creature or concept to the reference archive, retry
   recognizable singular/plural and translated forms against the current inventory
   (e.g. `trolls` → `Trol`, `Frost-spiders` → `Arañas del Hielo`). The matcher does not
   stem or translate names. This can confirm an existing staged id without exposing
   later reference labels; it does not establish an unfamiliar translation by itself.

   **b. Still unmatched? Search descriptions, not grep.** A name can be absent from every
   label yet already tracked — revealed only in prose (Ilmur was named inside the `hundur`
   description) — or a fact/event may already have its own node under different wording.
   Use the bounded helper, one name (or any literal phrase — it isn't limited to candidate
   names) per call, never raw `grep` (a single accumulated `desc` line can be tens of
   thousands of characters; checking whether a backstory detail already had an event node
   this way returned 200KB+ of truncated output twice before falling back to an id already
   in hand):

   ```sh
   node .claude/skills/add-chapter/scripts/search-descriptions.cjs 2 1 Ilmur
   node .claude/skills/add-chapter/scripts/search-descriptions.cjs 2 1 Ilmur --id hundur
   node .claude/skills/add-chapter/scripts/search-descriptions.cjs 2 1 Járn --id collares --id uspa
   ```

   The default prints candidate ids/labels/files/match counts without prose; add `--id`
   (repeatable — one shared 8,000-character page limit across the whole selection) only for
   plausible candidates to retrieve deduplicated excerpts. For a common term (`Úlfhéðnar`),
   print candidates/counts first and retrieve excerpts only for plausible identity
   candidates; keep link inspection in a separate response so a large match set can't
   truncate both. A complete-name match can still be an ordinary word in a quoted spell
   (`járn` = iron) — check context before reusing an id for a newly named person. Matching
   is literal, case-insensitive, and Unicode-boundary-aware (short names like `Iva` won't
   match ordinary words like `viva` — preserve this if changing the helper); try
   accent/spelling variants separately. It searches each entity's latest accumulated
   description first and falls back to historical descriptions automatically only when *no*
   latest description matches anywhere — selecting a candidate id doesn't trigger that
   fallback when other latest entries also matched, so inspect earlier entries explicitly if
   evidence suggests a different entity lost a fact. If output is truncated, narrow or
   paginate before concluding a name is absent.

   **c. Still unmatched? Don't trust a hand grep — re-run the matcher.** A name found only
   *inside another entity's own description* (via step **b**) can still have its own node
   that step **b**'s text search couldn't surface, because a node's own `desc` rarely
   repeats its own label as text. Before minting it as new, re-run `match-entities.cjs`
   (step **a**) with that exact name — it checks ids and labels directly. Never fall back to
   a hand-written `grep` for a guessed `id: '...'`/`id: "..."` quote style to settle this:
   Gudrun's node already existed from an earlier chapter, surfaced only via another entity's
   description, and a single-quoted grep silently missed the file's double-quoted source,
   nearly minting a duplicate (caught only by `append-node.cjs`'s own existence check).

   **d. Still genuinely absent? Mint a new id** — lowercase, hyphenated, no accents —
   unless the person is unnamed (record their appearance in the chapter summary instead,
   mint no id until they're named). First rule out two near-misses: a near-miss spelling in
   extracted text (match context to the established id — e.g. Verdani/Verdandi — retain the
   canonical label and note the source variant rather than creating a duplicate) and a
   combined legacy id that actually represents multiple people. Named people must have
   separate identities for future connections, even when introduced or acting together.
   In the rebuild, Mord is `mord` and Lif is `lif`; never recreate `mord-lif` or direct a
   person-specific fact/link to a combined identity. For other legacy combined nodes,
   inspect their membership before creating individual ids; preserve joint facts on each
   relevant individual and put shared scenes in event nodes. The untouched live/reference
   archive may retain historical combined ids; reconcile their endpoints during final
   migration rather than copying them into the rebuild.

   A third case: a recurring character already tracked anonymously (e.g. "la esclava de
   Sigrún", present across several earlier chapters only inside *other* entities' own
   desc text) finally gets a name. Mint the new id and, in its own desc, cross-reference
   the earlier anonymous appearances by chapter number and the ids whose descriptions
   carried them (e.g. "antes identificada solo como «la esclava de Sigrún» en los
   capítulos 10, 12 y 15; véanse sigrun y holmganga-event"). Do not retrofit the name
   into those earlier chapters' own accumulated entries — their text was accurate at the
   time it was written, and editing it would rewrite history the full-overwrite rule
   exists to preserve. (Vafri, Book 1 Chapter 22: tracked anonymously as Sigrún's thrall
   since Chapter 10, named only on death; the new `vafri` node carries the backward
   cross-reference, and `sigrun`/`mord`/`virk`'s own historical entries were left as-is.)

   Mechanics that apply throughout **a**–**d**: a compact inventory or excerpt list can
   still truncate when returned alongside whole files — budget the **combined** output of
   batched calls. Read chapter text and selected full entries in separate, bounded
   responses; never dump a whole accumulated `nodes.js`/`summaries.js` file. For array
   endings or section layout, inspect a character-bounded suffix (e.g. `text.slice(-200)`)
   rather than `tail -n` — one description or summary line can run thousands of characters
   long. Once an id is confirmed, read its full latest entry with `read-latest.cjs` (step 3)
   before updating it — excerpts from step **b** only locate candidates, they never replace
   that full read.
3. Select read batches by the changes the chapter actually makes, not by every name
   it mentions. Separate likely update targets from context-only references (for example,
   an absent character whose earlier actions are merely retold). For context-only checks,
   inspect parsed links or bounded matching description excerpts first; promote an entity
   to a full read if the evidence suggests a new fact, a contradiction, or an update.
   For existing relationships, use the bounded link reader rather than a one-off filter:

   ```sh
   node .claude/skills/add-chapter/scripts/read-links.cjs 2 1 uspa graskinna
   ```

   It returns links touching **either endpoint**, with ids, current labels, source files,
   and explicit broken markers. Multiple ids select their union, not just links between
   them. Read pages separately until `END`. Results are stored history, not the resolved
   active graph: check any matching broken marker before treating a relationship as current.
   Start with the most specific endpoint ids relevant to the proposed facts. Adding a
   central POV id selects its entire relationship history, even alongside narrower ids;
   do that only when those relationships actually need review. For a local geography or
   arrival check, prefer the place, faction, or event ids over a blanket POV lookup —
   but a heavily-connected faction/place/concept id (`bloodsworn`, `oskutred`) is also a
   hub and pulls its own large history. When the only question is whether one *specific*
   pairing already has a link (e.g. "has Elvar ever hired the Bloodsworn before"), skip
   the tool and `grep` the current book's links file for both ids together instead —
   it's a single bounded check, not a relationship review. This still holds when there are
   *several* specific pairings to check in the same chapter (e.g. confirming six different
   pairs have no prior link before adding six new ones): run one targeted `grep` per pair,
   never batch every id involved into one `read-links.cjs` call "for efficiency" — batching
   returns the union of each id's entire history, not just links between the pairs you
   asked about, so it costs more than the pair-by-pair greps it was meant to save (263+
   stored links and several pages of irrelevant Book 1 history, in one observed case).
   Read every entity you will update in full before editing; excerpts never replace that
   requirement. Keep unrelated long histories out of the same paginated batch so a small
   context check does not force reading several unnecessary pages.

   Read each relevant entity's **full latest entry**, including earlier updates in the
   current book, before deciding a fact is new. Build a latest-entry map in book/array
   order; the last same-id object wins. Use the bundled reader for selected full entries:

   ```sh
   node .claude/skills/add-chapter/scripts/read-latest.cjs 2 1 biorr hundur ilska
   ```

   Arguments are book cap, page number, then ids. It selects the latest same-id entry
   and prints at most 10,000 characters of entry text per page, with source file and
   page count. Read every page with the same book/ids, incrementing the page argument;
   pages may split a long description. Run each page in its own tool response with
   enough output budget (e.g. 8,000 tokens); do not combine it with inventories, chapter
   text, links, or other page outputs. Check related nodes and links as well: a restated
   fact needs no duplicate update.
   - When batching several ids in one call, pagination is over their combined output, not
     per id — stopping after "page 1/N" only guarantees the ids whose own entry fits
     within that one page have been fully read; a long entry (a POV character's, say)
     can still be left unfinished even though a page count was shown. Either keep batches
     to ids short enough that page 1 covers all of them, or re-run with a single id to
     confirm when a batched page looks incomplete for that id specifically.
   - Never retype a baseline `desc`/`star` into an Edit call. Use the bundled appender,
     which reads the existing text straight out of the data file and appends your new
     material internally, so the baseline never passes back through you to be
     regenerated:

     ```sh
     echo '{"mode":"update","header":"// ── LIBRO 2, CAPÍTULO 42 — BIÓRR ──",
            "descAppend":"LIBRO 2, CAPÍTULO 42: ...",
            "starAppend":"CAPÍTULO 42: ...",
            "previousState":"short note of what changed"}' > "$chapter_run/spec.json"
     node .claude/skills/add-chapter/scripts/append-node.cjs 2 biorr "$chapter_run/spec.json"
     ```

     Write spec JSON inside the unique temporary run directory used for the baseline
     (defined below); keep specs beside its `baseline/` subdirectory. `descAppend`/`starAppend`
     are the only things you compose by hand — genuinely new material, never a copy of
     existing text — and they're joined onto the baseline with a single space. Omit
     `header` on every node after the first one appended for a given chapter section.
     For a brand-new id (no baseline to extend), use `{"mode":"new", "label":..., "group":...,
     "type":..., "desc":..., "star":...}` instead — all fields supplied directly, since
     there is nothing to append to. The script runs `node --check` on the file before
     exiting, so a malformed result fails loudly instead of landing silently. This is why
     the risk below was never fixable by a "be more careful" rule — only by removing the
     retyping step entirely.
   - For a chapter touching more than a handful of ids, write one small Node script that
     builds every spec as a plain JS object literal (Spanish prose with «guillemets»,
     em dashes and accents needs no escaping there) and writes each with
     `fs.writeFileSync(path, JSON.stringify(spec, null, 2))`, instead of hand-escaping
     each one into a shell `echo '...' > spec.json` heredoc. Then loop `append-node.cjs`
     once per id against the generated files. This removes the actual risk of a shell
     mis-escaping a quote or em dash inside long prose, not just the risk the appender
     already removes (retyping the baseline). After such a loop, output-condensation can
     elide an individual call's "OK: ..." line without flagging it as an error — confirm
     every id actually landed, and that none duplicated. Do not use a bare
     `grep -c "id: \"ID\""`: `book{N}/nodes.js` mixes two serialization styles —
     older entries stored as compact single-line JSON (`{"id":"x","label":...}`,
     no space after the colon) alongside the spaced JS-literal style `append-node.cjs`
     itself writes (`id: "x", label: ...`). A grep tuned to one style silently
     undercounts the other: in a Book 1 rebuild Chapter 21 run, `grep -c "id: \"ID\""`
     reported 0 "before" occurrences for two ids (`pasado-elvar`, `berak-venta`) that
     were in fact long-existing nodes stored in the compact style, which would have
     looked like a real append failure — or masked a real duplicate — had it been
     trusted. Count by parsing the array instead, which is immune to formatting style:
     ```sh
     node -e 'const fs=require("fs");
       const f="book{N}/nodes.js";
       const arr=new Function(fs.readFileSync(f,"utf8")+"; return nodes;")();
       for (const id of ["id1","id2"]) console.log(id, arr.filter(n=>n.id===id).length);'
     ```
     Compare each count against the same check run against the pre-edit baseline
     (expect baseline+1), plus a final `node --check` on the file.
   - Retyping a `star` (or `desc`) field from a tool-output transcript is risky even when
     the transcript shows no truncation marker: an output-condensation layer between the
     tool and this context can silently drop a trailing clause it judges low-signal,
     without any "CONTINUES"/truncation sign — `read-latest.cjs` showed Varg's Ch29 `star`
     ending at "...riesgo el secreto Tainted." when the actual stored text continued with
     "La amenaza de esclavitud de los niños enlaza con su propia historia." This is exactly
     what `append-node.cjs` above exists to prevent. If you ever do fall back to a manual
     Edit for this (you shouldn't), treat `verify-chapter.cjs`'s baseline-prefix check as
     the authority on whether `desc`/`star` were preserved, not the transcript — a PASS
     confirms it, a FAIL on "does not preserve its latest baseline text" means re-extract
     that exact field from the data file programmatically rather than trusting the
     earlier read.
   - `links.js` and `summaries.js` have no bundled appender. When byte-exact
     `Read`/`Edit` tools are available, read the bounded file suffix before choosing an
     edit anchor; do not reconstruct quote style or indentation from shell output.
     Otherwise, use a short local script that reads the file directly, asserts a single
     trailing `\n]\s*;\s*$` array terminator, and inserts JSON-serialized entries before it.
     Keep the existing file prefix intact and run `node --check` afterward. This avoids
     matching regenerated prose or depending on tools absent from the current runtime.
   - If reading source lines, include the entire object: `desc` and `star` may be on
     following lines. For same-POV continuations, chapter boundary comments can locate
     the previous scene's cluster quickly; inspect later same-id entries before copying.
   - A prior entry may already contain content from a later chapter than its section
     header (a known historical editing mistake). Use its full accumulated text as the
     baseline, create a fresh entry for the current chapter, and flag the misplaced
     history. Repairing earlier sections is a separate task.
4. Before appending, rerun the compact preflight if the data files have changed since
   the initial check. Record input conflicts
   with source markers rather than silently replacing earlier claims (e.g. Myrk's ten
   assigned warriors in Ch5 versus fifteen departing in Ch9).

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

**After writing, before completion:** read every changed full entry and each changed link
as a sentence and repeat this ownership audit against the chapter. Record the reviewed ids,
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
   Automated checks alone cannot establish that every clue was followed or that a mystery
   was correctly resolved. Progress and completion require all three hard-gate review records.

## Capture the baseline before editing

Save the current book's three data files in a unique temporary directory before the
first mutation, even when Git is unavailable. Keep that directory path for verification;
do not reuse a fixed directory that may contain another run's baseline. For Book 2:

```sh
chapter_run=$(mktemp -d "${TMPDIR:-/tmp}/add-chapter.XXXXXX")
chapter_baseline="$chapter_run/baseline"
mkdir "$chapter_baseline"
cp book2/nodes.js book2/links.js book2/summaries.js "$chapter_baseline/"
printf '%s\n' "$chapter_run" "$chapter_baseline"
```

Use this snapshot for the preservation checks below; it is a pre-edit reference, not
chapter data to add to the project.

## 1. Nodes — `book{N}/nodes.js`

```js
{
  id: 'existing-or-new-id',
  label: 'Display Name',
  group: 'ORKA',               // see group guide below
  type: 'Personaje — Jefe',    // free-text category label
  desc: '...',                 // see CRITICAL rule below
  star: '★★ ...'                // significance/foreshadowing note, 0-3 stars
}
```

- **New entity** → push a plain node object (no `status` field needed).
- **Existing entity whose info changed/expanded** → add `status: 'updated'` and
  `previousState: 'short note of what changed'`.
- **Existing entity already updated earlier in the SAME book** (e.g. `book2/nodes.js`
  already has a `biorr` or `glornir` entry from an earlier chapter) → add a **new**
  node object in the current chapter's section — do not edit the earlier chapter's entry
  in place. `data-core.js` merges same-id entries in book/array order, so only the
  *last* entry's fields actually render; the file's chronological,
  one-entry-per-chapter structure exists to keep a readable diff history, not because the
  merge requires it. Copy the most recent existing entry's full `desc` (the latest
  chapter's version, not the original book1 one) and append the new material to it, same
  as the full-overwrite rule above.
- **CRITICAL — `desc` is a full overwrite, not a delta.** `data-core.js` merges an updated
  node with object spread, which replaces the entire `desc` string.
  If you only write the new chapter's info, the character's Book 1 backstory disappears
  from their panel. Always use the latest same-id `desc` across Book 1, prior books,
  and earlier entries in the current book; copy it in full and append the new material — same accumulation style already used throughout `book1/nodes.js` (e.g.
  look at the `biorr` or `agnar` entries: one long, chronologically-growing paragraph).
`previousState` stays short — it's a maintenance note for future edits, not shown in the UI.
  Use `scripts/append-node.cjs` (see step 3 above) to apply this rule — it reads the
  latest `desc`/`star` from the file and appends your new text itself, so the full-overwrite
  requirement is satisfied by construction instead of by careful retyping.
- **Fact ownership is mandatory.** Apply the [hard ownership gate](#hard-gate--fact-ownership)
  to every new/updated entry and relationship. This includes terminology, species,
  named objects, gods and places; passing the JavaScript verifier cannot waive it.
- When a chapter resolves an entity's current state, review `label` and `type` as
  well as `desc`. For example, Harek's living reappearance in Book 2 Ch35 requires
  removing the stale `†?` label and replacing his "Desaparecido" type. Preserve the
  earlier disappearance in the accumulated description.
- Distinguish divine ancestry, the inner beast a character identifies, and powers
  actually demonstrated. In Ch35, Bjarn identifies an oso without disproving his
  maternal Snaka ancestry; Breca identifies both lobo and oso, but has not yet
  demonstrated all the abilities Biórr predicts. Keep predictions attributed rather
  than upgrading them to confirmed powers in descriptions or links.
- Do not set `book` yourself — `data-core.js` stamps it from the registered book during
  merge. The current UI applies its dashed book styling to `book > 1`; Book One
  rebuild additions do not receive that styling.
- For a story told inside the chapter, distinguish its fictional characters from
  their real-world namesakes. Svik's fable in Book 2 Ch32 calls its characters Helka,
  Einar, Frek, and Hákon; their fictional actions are not biographical facts about
  those existing nodes. Capture the tale in a clearly labeled story node when useful,
  link namesakes only with explicit wording, and update real characters with their
  observed participation or reactions. Do not infer a change of loyalty from silence
  or body language alone.

**Group guide** (`groups.js`): `ORKA` / `VARG` / `ELVAR` for anything that clusters with
that POV's storyline (the force layout pulls these toward that POV's centroid via
`POV_IDS` in `mapa.js`). Otherwise pick by category: `LUGAR` (places), `VAESEN`
(creatures), `FACCION` (factions/companies), `EVENTO` (discrete events), `OBJETO`
(objects/items), `DIOS` (dead gods), `MAGIA` (magic systems/rituals), `NORSE`
(real-world culture/lore notes), `TRAMA` (open plot threads), `COSMO` (cosmology/myth).
Never invent a new group key without also adding it to `groups.js`.
A node's POV tie-in is the separate `cat-varg`/`cat-orka`/`cat-elvar` → `incluye` → id
arc link, never the `group` field: an EVENTO or TRAMA node created for a single POV's own
storyline (a new mission that POV receives, a question only that POV's chapters raise)
still takes `group: 'EVENTO'`/`'TRAMA'`, not `group: 'VARG'`/`'ORKA'`/`'ELVAR'`, even
though it is arc-linked to that POV's category. (A Book 1 rebuild Chapter 20 run first
wrote three such nodes — a mission EVENTO, its TRAMA question, and a landing EVENTO —
all with `group: 'VARG'`; a `group === 'TRAMA'` backlog query for the thread-lifecycle
review then silently missed the TRAMA one, which is how the mistake surfaced.)

## 2. Links — `book{N}/links.js`

```js
{ source: 'node-id', target: 'other-node-id', label: 'relationship or action', type: 'rel' }
```

`type` must be one of the existing `linkColors` keys in `mapa.js`: `cat`, `arc`, `rel`,
`magic`, `conflict`, `goal`, `event`, `lore`, `history`, `geo`, `trama`. Using a new type
won't error, it'll just render in the default color — prefer an existing one unless the
user explicitly wants a new category (then add it to `linkColors` too).

Write and review each link as a sentence: **source label → relationship label → target
label**. For example, `Orka → imparte → La Lección de Escudo de Lif`, or the reverse
`La Lección de Escudo de Lif → impartida por → Orka`. Reversing the endpoints requires
rewriting the relationship too. **Person-specific connections must target that person's
own id.** For example, `La Lección de Escudo de Lif → instruye a → Lif` targets `lif`,
not Mord or a shared `mord-lif` node. Add separate links when a fact applies to both
brothers; never infer which brother performed an action the source leaves unattributed.
During final verification, use `--review-links` to print only the appended links as
these compact sentences and read each for direction and meaning; valid endpoint ids do not establish a valid
relationship. Check grammar against the complete endpoint title too: `protagoniza →
La Escala…` avoids `dirige la → La Escala…`, and `presencia → Los Battle-Grim…`
avoids `observa la → Los Battle-Grim…`. Avoid generating links from a shared template
when their verbs require different directions or articles.

To retire a Book 1 relationship that no longer holds, add a **broken-link marker**
instead of a normal link — `label` must match the original book1 link's label exactly,
since that's the removal key:

```js
{ source: 'node-id', target: 'other-node-id', label: 'exact original label', status: 'broken', reason: 'why it ended' }
```

## 3. Chapter summary — `book{N}/summaries.js`

```js
{ chapter: N, title: "Capítulo N — POV", summary: "..." }
```

Match `book1/summaries.js` style: Spanish prose, `<br><br>` between paragraphs, `<strong>`
for first-mention proper nouns/key terms, `<em>` for emphasis. This is what populates the
"Libro N" tab in the chapter panel — no other wiring needed, the tab appears automatically
the first time this book's `summaries.js` goes from empty to non-empty.

Summary entity links are generated by `mapa.js` using
`CharacterReference.buildMentionMatcher` / `findMentions`, not by the `<strong>` tags.
The chapter verifier checks that every `<strong>` term resolves completely to one node
using the shared matcher and the preview's inventory and guides. Review that the resolved
node is the intended entity; the automated check cannot establish identity. Before emphasizing a term, check
it is not a name that step 2 already returned as `UNMATCHED` (by `match-entities.cjs`) or
`NO MATCHES` (by `search-descriptions.cjs`): a generic word that looks like a proper
noun — `Maður`, Old Norse for "man", is one observed case — has no node and will fail
the verifier with "does not resolve completely to one node"; render it as plain text
instead. Matching is case-sensitive: use canonical
capitalization (e.g. `Fell-Wolf`, `Tennur`, `Foso de los Vaesen`, `Runa Warding`) or a
supported alias. The matcher strips trailing parenthetical text from labels: for
`Alþing (Althing)`, emphasize `Alþing`; neither the parenthetical alias nor the full
parenthesized label resolves without a separate supported alias. A pronunciation suffix after the closing parenthesis
(e.g. `Oskutreð (Árbol de Ceniza) [pron. Oskutreth]`) prevents that stripping; for a
new staged node, keep the label as `Oskutreð (Árbol de Ceniza)` and put any needed
pronunciation in its description. Verify the short name before finalizing the summary.
When two distinct entities share a name, a parenthetical qualifier is stripped and cannot disambiguate their summary mentions (for example the Hundur-thrall versus the god). For a new staged entity, retain its canonical id and use a distinct non-parenthetical label such as `Hundur, Dios-Sabueso`; emphasize that complete label for the god and verify that each mention resolves to the intended id. Plain-text repetitions should resolve too. A named era such as
`Friðaröld` needs its own non-structural node to be linkable; a mention only in the root
description does not suffice. Staged previews must use the current summary dialog
with `chapter-list` and `chapter-pane` elements and the shared renderer; an older copied
HTML shell can prevent all summary links from rendering. Verify this contract with
`node --test tests/book1-rebuild.test.cjs tests/characters.test.cjs tests/focus.test.cjs`
during the rebuild. Name resolution alone does not prove a link opens: the rebuild
regression suite also checks connection-viewer startup with empty guides and creature
links reaching nodes with relationships.

## 4. Later-book discoveries — integrate directly into nodes and links

The current book's node and link files are the single source of truth, including facts
that recontextualize an earlier book. Do not create or maintain a separate revelations
file or duplicate callouts. The live UI displays the complete loaded archive; it does
not hide later-book updates. Keep the chronological rebuild isolated as described above.

- Add confirmed facts to the existing node's accumulated `desc`, keeping a source marker
  such as `REPARTO DEL LIBRO 2`, `GLOSARIO DEL LIBRO 2`, or `LIBRO 2, CAPÍTULO 3`.
  Add a link when the fact establishes a meaningful relationship between existing nodes.
  Check both descriptions/labels and links before adding: a fact may already be captured
  in a related node or an existing edge.
- Use a fresh entry in the current chapter's section for chapter discoveries, following
  the full-description and one-entry-per-chapter rules above. Reference/front-matter
  updates belong before the chapter sections. If backfilling earlier material, propagate
  the missing fact into subsequent same-id descriptions so later overwrites retain it;
  keep their chapter-specific content intact.
- Distinguish discovery from inference and contradiction: identify the source, qualify
  inferred identities, and record conflicting claims in the description without inventing
  a confirmed relationship. Ask only when an unresolved interpretation is required to
  proceed; an authorized integration does not require a separate revelation approval.
- Reconfirmations need no duplicate entry. Use `previousState` for a short change note
  and `star` when the discovery's significance merits emphasis. Discrete events still
  belong in event nodes/links and the chapter summary; this section adds no event log.

## 5. When starting a new book (e.g. Book 3)

Create `book3/nodes.js`, `book3/links.js`, `book3/summaries.js` exporting empty
`nodesBook3`, `linksBook3`, `chapterSummariesBook3` arrays (copy `book2`'s file headers as
a template), and add the three `<script>` tags to `index.html` next to the Book 2 ones.
Register Book 3 in the array passed to `ArchiveData.merge` in `data-init.js`:

```js
{ book: 3, nodes: nodesBook3, links: linksBook3, summaries: chapterSummariesBook3 },
```

`MAX_BOOK` then comes from the merged archive, and chapter tabs derive from its summaries.
Loading the scripts alone does not register the book. Keep an active Book One rebuild
preview isolated from later-book data.

## Verification

Run the bundled verifier from the project root, using the actual unique pre-edit
baseline directory saved above (replace the numbers for the current book/chapter):

```sh
node .claude/skills/add-chapter/scripts/verify-chapter.cjs 2 11 "$chapter_baseline" --review-links --review-summary
```

The verifier checks each book's files separately for JavaScript syntax, resolves link
endpoints against ids available at that book's reading cap, and requires unique ordered
chapter summaries. It compares the current book's parsed arrays against the snapshot,
requiring unchanged original prefixes and exactly one appended summary for the requested
chapter. It also requires unique ids among appended nodes, `status: 'updated'` and a
nonempty `previousState` for existing ids, preservation of the full latest baseline
`desc` and `star`, and complete mention matches for emphasized summary terms. It evaluates trusted local data files only. A failure is fatal: fix it
before reporting success. Repeated ids across earlier chapter sections remain valid.

The `--review-links` option resolves endpoint labels at the current book cap and prints
only appended relationships, marking broken-link removals explicitly. Read these
sentences for semantic direction; the verifier cannot judge their meaning.
Use `--review-summary` to print each distinct emphasized term with its resolved label
and stable id. Check these identities against the source, especially where an individual,
species or god shares a name. A complete match can still point to the wrong subject;
this report replaces an ad hoc matcher query, not the semantic review.

**Completion requires the [ownership gate](#hard-gate--fact-ownership),
[event-coverage gate](#hard-gate--key-event-coverage) and
[thread-lifecycle gate](#hard-gate--thread-and-clue-lifecycle) to pass**, with
`ownership-review.md`, `event-review.md` and `thread-review.md` in the run directory. A verifier PASS alone
is insufficient; an unreviewed clue or missing closure blocks completion.

These checks do not establish factual accuracy or visual correctness. Review the added
content against the complete chapter, then open `index.html` and confirm: the new/updated
node appears with the correct description and book metadata, its connections show in the
panel, the chapter appears under the right "Libro N" tab, and newly integrated facts
appear in the intended descriptions or connections.

If browser automation is unavailable, its browser is not installed, or access to the
local page is blocked, report the checks actually completed and leave visual confirmation
in `index.html` to the user. Respect browser restrictions; do not install a browser or try
alternate access methods merely to complete this optional visual check.

## Improving this skill

Treat friction encountered while running this skill as signal, not noise. After finishing
a chapter (or a validation pass), before reporting done:

1. Ask whether anything in *this run* was slower, riskier, or more manual than it should
   have been — a search that took many round-trips, a rule you had to guess at because
   the skill didn't cover it, a check you invented on the spot. Only count what actually
   happened this run — don't speculate about hypothetical future chapters.
2. If you found something concrete and generalizable, edit this file directly with the
   specific fix (not a vague note) — same bar as any other edit: small, load-bearing, no
   speculative generality for cases that haven't occurred yet.
3. Append a concise dated entry to [references/changelog.md](references/changelog.md)
   so the next run doesn't rediscover the same friction. Once an entry's fix is fully and
   verbatim absorbed into this file or a bundled script (rereading it teaches nothing
   beyond rereading the current skill), move it to
   [references/changelog-archive.md](references/changelog-archive.md) instead of leaving
   it to accumulate forever — except an entry flagging a still-open/unresolved issue in
   `book{N}/*.js`, which stays live until that issue is actually fixed.

For prior incidents and maintenance history, see [references/changelog.md](references/changelog.md)
and, for older fully-superseded entries, [references/changelog-archive.md](references/changelog-archive.md).
Read them when investigating a recurrence or changing a rule justified by an earlier incident.
