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

Start with the routing and section index, not a full-file dump:

```sh
sed -n '1,90p' .claude/skills/add-chapter/SKILL.md
rg -n '^## ' .claude/skills/add-chapter/SKILL.md
```

Then follow the required source/entity and semantic-gate references below, reading them
in bounded responses. Read baseline capture, node/link/summary format and verification
in this file before editing.
Read later-book and new-book sections only when those operations apply. Read other
skills and mode-specific references in separate responses; a combined dump can truncate
even when each file would fit alone. Retrieve any omitted content before proceeding.

This project tracks characters, places, events, and lore across the Bloodsworn Saga
trilogy in a D3 mind map (`index.html`). Normal sessions append to the current book's
own folder. `data-core.js` merges the full archive in book/array order: the latest
same-id entry wins, and all revisions remain available. The app no longer hides data
behind book/chapter reading caps. Reader helpers still accept a book cap to bound
source inspection; this is not a display restriction.

## Authorized Book One rebuild

A separate, parallel effort (`book1/rebuild/`) has its own routing, paths and completion
procedure in [references/book1-rebuild.md](references/book1-rebuild.md). It replaces
the live commands below, while the shared source/entity workflow, formats, three hard
gates and review requirements still apply. For a Book One request, first check whether
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

Read [source-and-entity-workflow.md](references/source-and-entity-workflow.md) before
chapter preflight, source retrieval, entity resolution or drafting. It contains the
required identity checks, full-entry reads and safe append procedures; rebuild mode
substitutes its helper commands without skipping those requirements. Read it in separate
bounded responses, for example lines 1–120, 121–240 and 241–360, through the end.

## Mandatory semantic gates

Read all three gates in [review-gates.md](references/review-gates.md) before drafting.
Use its heading index and read one gate per response. Completion requires:

- **Fact ownership:** full baseline audit plus final node/link review, recorded in
  `ownership-review.md` with `Ownership review: PASS`.
- **Key event coverage:** every important occurrence has an appropriate EVENTO and
  active EVENTOS CLAVE connection, recorded in `event-review.md` with
  `Event coverage review: PASS`.
- **Thread and clue lifecycle:** review the complete cross-POV backlog, persist new
  evidence and evidence-backed closures, recorded in `thread-review.md` with
  `Thread lifecycle review: PASS`.

Keep these files beside the unique run's `baseline/`. A verifier PASS does not replace
any semantic gate. The linked procedures remain mandatory, not optional background.

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

Resolve structural category ids with the normal matcher before composing links too.
A group key such as `OBJETO` or `LUGAR` does not imply that `cat-objetos` or
`cat-lugares` exists; use an existing suitable category (for example, `cat-magia`
or `cat-mundo`) confirmed in the selected archive.

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
Inventory matching and rendered mention matching have different acceptance rules:
`match-entities.cjs` finding a name inside a label confirms only an inventory candidate,
not that the same short name will link in the summary. Compose first mentions from the
confirmed node's canonical label (subject to the parenthetical-label rules below).
For example, staged `Svik` finds id `svik`, but the summary must use `Svik Hrulfsson`
when no short-name alias is available. Do not add aliases or rename nodes merely to
make a drafted summary pass; use the existing supported name and verify its identity.
The chapter verifier checks that every `<strong>` term resolves completely to one node
using the shared matcher and the preview's inventory and guides. Review that the resolved
node is the intended entity; the automated check cannot establish identity. Before emphasizing a term, check
it is not a name that [entity resolution, step 2](references/source-and-entity-workflow.md) already returned as `UNMATCHED` (by `match-entities.cjs`) or
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

For the node ownership review, run a separate `verify-chapter.cjs BOOK CHAPTER BASELINE
--review-nodes=1` call (or `rebuild.cjs verify-chapter CHAPTER BASELINE
--review-nodes=1` for staged work), then request each indicated page. This report is
available only after all normal verification checks pass; apply the baseline-audit
conditions in the [ownership gate](references/review-gates.md#hard-gate--fact-ownership).

The `--review-links` option resolves endpoint labels at the current book cap and prints
only appended relationships, marking broken-link removals explicitly. Read these
sentences for semantic direction; the verifier cannot judge their meaning.
Use `--review-summary` to print each distinct emphasized term with its resolved label
and stable id. Check these identities against the source, especially where an individual,
species or god shares a name. A complete match can still point to the wrong subject;
this report replaces an ad hoc matcher query, not the semantic review.

**Completion requires the [ownership gate](references/review-gates.md#hard-gate--fact-ownership),
[event-coverage gate](references/review-gates.md#hard-gate--key-event-coverage) and
[thread-lifecycle gate](references/review-gates.md#hard-gate--thread-and-clue-lifecycle) to pass**, with
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
