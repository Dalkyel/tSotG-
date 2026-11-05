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

Book Two, Chapter 50 was the final rebuilt chapter. From Chapter 51 onward, create
new chapters directly in the live archive. Use the live book files for accumulated
history, current clues and pending questions.
Determine the requested book/chapter and source path, then run the live preflight.
If that chapter already exists, inspect for an unfinished addition or an explicitly
requested correction rather than appending it twice.

Before editing, read the baseline procedure, applicable node/link/summary formats,
verification, and the source/entity and semantic-gate references. Read long references
in separate bounded slices through EOF; retrieve any omitted content before proceeding.
Read later-book and new-book sections only when those operations apply.

This project tracks characters, places, events, and lore across the Bloodsworn Saga
trilogy in a D3 mind map (`index.html`). Normal sessions append to the current book's
own folder. `data-core.js` merges the full archive in book/array order: the latest
same-id entry wins, and all revisions remain available. The app no longer hides data
behind book/chapter reading caps. Reader helpers still accept a book cap to bound
source inspection; this is not a display restriction.

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

Read [source-and-entity-workflow.md](references/source-and-entity-workflow.md) before
chapter preflight, source retrieval, entity resolution or drafting. It contains the
required identity checks, full-entry reads and safe append procedures. Read it in separate
bounded responses, for example lines 1–120, 121–240 and 241–360, through the end.
Its metadata-only reader can complete a TRAMA audit after a full, same-version backlog
prose read; `--without-star` completes other profiles after their full, same-version
backlog star read. Both avoid duplicate reads without skipping entry fields.

## Mandatory semantic gates

Read all three gates in [review-gates.md](references/review-gates.md) before drafting.
Use its heading index and read each gate in bounded slices (about 80–100 lines),
continuing through the next heading or EOF. The thread gate is too long for a
single response. Return each slice in a separate outer tool call: multiple
`exec_command` results inside one orchestration call still share that call's output
budget. Retrieve omitted content before drafting. Completion requires:

- **Fact ownership:** full baseline audit plus final node/link review, recorded in
  `ownership-review.md` with `Ownership review: PASS`.
- **Key event coverage:** every important occurrence has an appropriate EVENTO and
  active EVENTOS CLAVE connection, recorded in `event-review.md` with
  `Event coverage review: PASS`.
- **Thread and clue lifecycle:** review the complete cross-POV backlog, persist new
  evidence and evidence-backed closures, recorded in `thread-review.md` with
  `Thread lifecycle review: PASS`. Use the gate's baseline-backed checklist helper
  to catch omitted IDs and unfinished assessments before recording PASS. The reader's
  `--pov` selection retains untagged clues; apply the gate's cross-POV conditions and
  keep the unfiltered index/checklist for complete coverage. For Guðvarr/Biórr,
  use the registered `GUDVARR`/`BIORR` filters and include affected cross-POV clues;
  an arc tag records narrative relevance, not a character's knowledge. Optional `--compact`
  removes formatting overhead from prose pages without omitting evidence; keep the
  same format throughout a paginated read.

Use `scripts/read-checklist.cjs CHECKLIST.json PAGE [ID ...]` for bounded inspection
of this run's assessments. Keep the manifest, three review files and checklist beside
the unique temporary run's `baseline/` through verification and completion. These are
temporary working files; do not copy them into the repository. Persist new evidence,
clue states and pending questions in the live nodes and links so the next chapter
can continue without past review files.
A verifier PASS does not replace
any semantic gate. The linked procedures remain mandatory, not optional background.
Each marker (`Ownership review: PASS`, `Event coverage review: PASS`,
`Thread lifecycle review: PASS`) must appear as its own bare line in the corresponding
review file. Record PASS only after the review and checklist checks are complete.

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
- For people, keep `type` prefixed with `Personaje —` (or an established `POV`/`Divinidad` form), including when the rest names an occupation or death. `focus-core.js` uses this prefix to classify and prioritize character neighbors; an occupation-only type such as Virk’s legacy `Pescador — Fallecido` can push a family connection beyond the initial twelve-neighbor view as events accumulate. When current evidence warrants a new revision of such a person, normalize its type there and retain the occupation/state after the prefix.
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
  Use `scripts/append-node.cjs` ([source workflow, step 3](references/source-and-entity-workflow.md)) to apply this rule — it reads the
  latest `desc`/`star` from the file and appends your new text itself, so the full-overwrite
  requirement is satisfied by construction instead of by careful retyping.
- **Fact ownership is mandatory.** Apply the [hard ownership gate](references/review-gates.md#hard-gate--fact-ownership)
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
  additions do not receive that styling.
- For a story told inside the chapter, distinguish its fictional characters from
  their real-world namesakes. Svik's fable in Book 2 Ch32 calls its characters Helka,
  Einar, Frek, and Hákon; their fictional actions are not biographical facts about
  those existing nodes. Capture the tale in a clearly labeled story node when useful,
  link namesakes only with explicit wording, and update real characters with their
  observed participation or reactions. Do not infer a change of loyalty from silence
  or body language alone.

**Group guide** (`groups.js`): `ORKA` / `VARG` / `ELVAR` / `BIORR` / `GUDVARR` for anything that clusters with
that POV's storyline (the force layout pulls these toward that POV's centroid via
`POV_IDS` in `mapa.js`). Otherwise pick by category: `LUGAR` (places), `VAESEN`
(creatures), `FACCION` (factions/companies), `EVENTO` (discrete events), `OBJETO`
(objects/items), `DIOS` (dead gods), `MAGIA` (magic systems/rituals), `NORSE`
(real-world culture/lore notes), `TRAMA` (open plot threads), `COSMO` (cosmology/myth).
Never invent a new group key without also adding it to `groups.js`.
The registered viewpoints and category IDs live in `mapa-core.js` (`POV_ARCS`), shared
by clustering, the legend and backlog readers. Biórr and Guðvarr have dedicated arcs
from their first Book Two POV chapters (5 and 12). Shared records may carry multiple
POV arc links; membership is a navigation/source tie, not a claim that each character
knows the evidence or was physically present. Add the relevant new-POV link when
reviewing its chapters instead of automatically placing those records only under
Elvar or Orka.
A node's POV tie-in is the separate `cat-orka`/`cat-varg`/`cat-elvar`/`cat-biorr`/`cat-gudvarr` → `incluye` → id
arc link, never the `group` field: an EVENTO or TRAMA node created for a single POV's own
storyline (a new mission that POV receives, a question only that POV's chapters raise)
still takes `group: 'EVENTO'`/`'TRAMA'`, not `group: 'VARG'`/`'ORKA'`/`'ELVAR'`, even
though it is arc-linked to that POV's category. (A Book 1 Chapter 20 run first
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

Resolve structural category ids with the normal matcher before composing links too.
A group key such as `OBJETO` or `LUGAR` does not imply that `cat-objetos` or
`cat-lugares` exists; use an existing suitable category (for example, `cat-magia`
or `cat-mundo`) confirmed in the selected archive.

**Every new POV-tied node needs an arc link, in the same direction, in addition to
any structural category link.** The pattern is always
`{ source: 'cat-orka'|'cat-varg'|'cat-elvar'|'cat-biorr'|'cat-gudvarr', target: 'new-id', label: 'incluye', type: 'arc' }`
— confirm with `read-links --between cat-orka SOME-EXISTING-ID` on a comparable node
rather than guessing. This applies to a plain character node too (e.g. `haga`,
`skefil`, `vafri` each carry a `cat-orka → incluye →` link even though their own
`group` is already `ORKA`), not only to `EVENTO`/`TRAMA` nodes. A new `EVENTO` or
`TRAMA` additionally needs the structural link
`{ source: 'cat-eventos'|'cat-tramas', target: 'new-id', label: 'incluye', type: 'arc' }`
— both links use `incluye` and `type: 'arc'`, just a different source category.

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
When batching participant links, choose the shared endpoint from the grammatical
subject of the labels before building the array. With actor verbs, use the event
as the shared target, as in `Svik Hrulfsson → organiza la estratagema en →
Interrogatorio y Muerte de Brimil`. If the event is the shared source, write labels
from its perspective, such as `ocurre en` for a place or `tiene como testigo a` for a
witness. Keep participant, place and category links in separate batches when their
directions differ. Read one full sentence from each batch before applying, then
review every resulting link with `--review-links`.
Check agreement with the actual source title too, rather than an implied word such as
«conversación», «alianza» or «misión». For a title like `Biórr Revela su Infancia
Esclavizada`, use `tiene como interlocutor a → Ilmur` rather than `escuchada por →
Ilmur`; a verb phrase avoids a participle agreeing with an absent noun. Compose these
labels against the confirmed full titles before applying the manifest.
For a new event that will be the target of several links, read those sentences
with its proposed title before settling the title. If several edges need an
implied noun, use a title that names the action directly. For example,
`El Encargo de Guðvarr sobre Hakon → avanza con la → Capa de Guðvarr para Hakon`
reads through its target. A title that starts with «Guðvarr cubre…» would require
rewriting the edge as a clause. If several participants react to a decision,
a noun phrase such as `El Aplazamiento de la Liberación de Hakon` can serve
directly as the object of `objeta` or `protesta por`. Apply the same check when retitling a resolved
thread, since its earlier edges will render with the new label.
For any existing node whose `label` changes, run the applicable `read-links` reader
on that single id after applying the draft, paging through END. Review the historical
sentences with the new label as well as the appended links: `--review-links` prints
only appended relationships and cannot expose a broken older sentence. Prefer a title
that preserves their grammatical role. In Book Two Ch49, a provisional retitle of
`abasto-battle-grim-starl` as «Los Víveres Embarcados en Starl» turned earlier
«recibe el encargo de realizar → …» links into awkward sentences. «El Abastecimiento
en Starl» removed the stale pending title while preserving those existing task links.
Put source attribution before the verb inside the link label, so the sentence still
reads naturally through its target: `Cadena de Ulfrir → según Yrsa, sirvió para encadenar a
→ Ulfrir`, not `sirvió para encadenar a, según Yrsa → Ulfrir`. Keep the subject's role
accurate too: an accusation `es contenida por → Glornir`; it does not itself prevent
the violence.

To retire a Book 1 relationship that no longer holds, add a **broken-link marker**
instead of a normal link — `label` must match the original book1 link's label exactly,
since that's the removal key:

```js
{ source: 'node-id', target: 'other-node-id', label: 'exact original label', status: 'broken', reason: 'why it ended' }
```

The marker field is `status: 'broken'`, including in batch manifests; `broken: true`
is not recognized and is validated as a normal link instead.

## 3. Chapter summary — `book{N}/summaries.js`

```js
{ chapter: N, title: "Capítulo N — POV", summary: "..." }
```

Match `book1/summaries.js` style: Spanish prose, `<br><br>` between paragraphs, `<strong>`
for first-mention proper nouns/key terms, `<em>` for emphasis. This is what populates the
"Libro N" tab in the chapter panel — no other wiring needed, the tab appears automatically
the first time this book's `summaries.js` goes from empty to non-empty.

Before drafting the summary, read [chapter-summary-links.md](references/chapter-summary-links.md)
for canonical mentions, ambiguous names, parenthetical labels and preview checks.
These rules apply to every mode; successful inventory matching alone does not prove
that a summary mention resolves to the intended entity or opens correctly.

## 4. Later-book discoveries — integrate directly into nodes and links

The current book's node and link files are the single source of truth, including facts
that recontextualize an earlier book. Do not create or maintain a separate revelations
file or duplicate callouts. The live UI displays the complete loaded archive; it does
not hide later-book updates.

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
Loading the scripts alone does not register the book.

## Verification

Use the chapter verifier and semantic reviews while refining the draft, then run
the applicable regression suite once the content is settled. This avoids repeating
the suite for a prose correction caught during review. After any subsequent edit,
rerun the chapter verifier and affected reviews; repeat regression tests when the
change affects behavior they cover or leaves a relevant concern unresolved.
If a regression hard-codes a character's former latest chapter, retain its behavior
coverage with fixed sample revisions instead of advancing the expected number after
each addition. Cover both a matching curated guide and fallback to newer archive text
when the guide is stale; do not change live character history to satisfy that assertion.

Run the bundled verifier from the project root, using the actual unique pre-edit
baseline directory saved above (replace the numbers for the current book/chapter):

```sh
node .claude/skills/add-chapter/scripts/verify-chapter.cjs 2 51 "$chapter_baseline" --review-links --review-summary --review-overlap
```

The verifier checks each book's files separately for JavaScript syntax, resolves link
endpoints against ids available at that book's reading cap, and requires unique ordered
chapter summaries. It compares the current book's parsed arrays against the snapshot,
requiring unchanged original prefixes and exactly one appended summary for the requested
chapter. It also requires unique ids among appended nodes, `status: 'updated'` and a
nonempty `previousState` for existing ids, preservation of the full latest baseline
`desc` and `star`, and complete mention matches for emphasized summary terms. It evaluates trusted local data files only. A failure is fatal: fix it
before reporting success. Repeated ids across earlier chapter sections remain valid.

For the node ownership review, run a separate `verify-chapter.cjs BOOK CHAPTER BASELINE
--review-nodes=1` call, then request each indicated page. This report is
available only after all normal verification checks pass; apply the baseline-audit
conditions in the [ownership gate](references/review-gates.md#hard-gate--fact-ownership).

The `--review-links` option resolves endpoint labels at the current book cap and prints
only appended relationships, marking broken-link removals explicitly. Read these
sentences for semantic direction; the verifier cannot judge their meaning.
Use `--review-summary` to print each distinct emphasized term with its resolved label
and stable id. Check these identities against the source, especially where an individual,
species or god shares a name. A complete match can still point to the wrong subject;
this report replaces an ad hoc matcher query, not the semantic review.
Use `--review-overlap` to flag any run of 12+ identical consecutive words shared between
this chapter's appended nodes — the recurring sibling-narration-duplication failure (see
the [event-coverage gate](references/review-gates.md#hard-gate--key-event-coverage)).
It only surfaces candidates; read the flagged passage yourself before deciding whether to
trim it.

**Completion requires the [ownership gate](references/review-gates.md#hard-gate--fact-ownership),
[event-coverage gate](references/review-gates.md#hard-gate--key-event-coverage) and
[thread-lifecycle gate](references/review-gates.md#hard-gate--thread-and-clue-lifecycle) to pass**, with
`ownership-review.md`, `event-review.md` and `thread-review.md` in the run directory. A verifier PASS alone
is insufficient; an unreviewed clue or missing closure blocks completion.

These checks do not establish factual accuracy or visual correctness. Review the added
content against the complete chapter. Visual confirmation in `index.html` (the new/updated
node appears with the correct description and book metadata, its connections show in the
panel, the chapter appears under the right "Libro N" tab, and newly integrated facts
appear in the intended descriptions or connections) is left to the user — report the checks
actually completed and do not attempt browser automation to perform it.

## Improving this skill

Treat friction encountered while running this skill as signal, not noise. After finishing
a chapter (or a validation pass), before reporting done:

1. Ask whether anything in *this run* was slower, riskier, or more manual than it should
   have been — a search that took many round-trips, a rule you had to guess at because
   the skill didn't cover it, a check you invented on the spot. Only count what actually
   happened this run — don't speculate about hypothetical future chapters.
2. If you found something concrete and generalizable, edit this file or its applicable
   workflow reference directly with the specific fix (not a vague note) — same bar as
   any other edit: small, load-bearing, no
   speculative generality for cases that haven't occurred yet.
3. Append a concise dated entry to [references/changelog.md](references/changelog.md)
   so the next run doesn't rediscover the same friction. Once an entry's fix is fully and
   verbatim absorbed into this file, its workflow references or a bundled script
   (rereading it teaches nothing beyond rereading the current skill), move it to
   [references/changelog-archive.md](references/changelog-archive.md) instead of leaving
   it to accumulate forever — except an entry flagging a still-open/unresolved issue in
   `book{N}/*.js`, which stays live until that issue is actually fixed.

For prior incidents and maintenance history, see [references/changelog.md](references/changelog.md)
and, for older fully-superseded entries, [references/changelog-archive.md](references/changelog-archive.md).
Read them when investigating a recurrence or changing a rule justified by an earlier incident.
For these growing logs, locate dated entries with `rg -n '^- [0-9]{4}'` first,
then read the relevant line ranges in separate bounded responses; do not dump both
logs together. Archive only entries whose full contents you have reviewed.
