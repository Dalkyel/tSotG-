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
user is actively continuing that rebuild. An ordinary "add chapter N" request (live Book
One or Book Two) never needs it. For staged runs, capture the absolute project root before
changing working directory and use absolute helper and input paths; keep staged data
paths relative to the staging directory. Do not reuse root-relative paths after changing
into `book1/rebuild` or its reference directory.

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
   combined id whose people's stories have diverged (keep ids like `mord-lif` combined,
   describing each person's fate within the entry, unless the user asks for a split).

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
            "previousState":"short note of what changed"}' > /tmp/spec.json
     node .claude/skills/add-chapter/scripts/append-node.cjs 2 biorr /tmp/spec.json
     ```

     Write the spec JSON to the scratchpad directory, not `/tmp`. `descAppend`/`starAppend`
     are the only things you compose by hand — genuinely new material, never a copy of
     existing text — and they're joined onto the baseline with a single space. Omit
     `header` on every node after the first one appended for a given chapter section.
     For a brand-new id (no baseline to extend), use `{"mode":"new", "label":..., "group":...,
     "type":..., "desc":..., "star":...}` instead — all fields supplied directly, since
     there is nothing to append to. The script runs `node --check` on the file before
     exiting, so a malformed result fails loudly instead of landing silently. This is why
     the risk below was never fixable by a "be more careful" rule — only by removing the
     retyping step entirely.
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
   - `links.js` and `summaries.js` have no bundled appender (unlike `append-node.cjs`
     for `nodes.js`), so their closing `},\n];` is still edited directly with `Edit`.
     Build that `old_string` from a `Read` of the file's tail, never from `Bash`
     `cat`/`tail` output or a guessed indent: this environment's output-condensation
     layer can silently normalize a cosmetic detail — quote style, a stray tab-width
     inconsistency in indentation — that `Edit` still matches byte-exact against. One
     run's `old_string` assumed the same 4-space indent every other entry used and
     failed twice against a closing brace that actually had none; another's assumed
     single-quoted keys against a file section that used double quotes. If an `Edit`
     on that closing syntax fails to match once, don't retry with a second guess —
     anchor `old_string` on the last few words of real content plus the literal
     `},\n];` with no assumed indentation or quote style, re-reading via `Read` first
     if still unsure.
   - If reading source lines, include the entire object: `desc` and `star` may be on
     following lines. For same-POV continuations, chapter boundary comments can locate
     the previous scene's cluster quickly; inspect later same-id entries before copying.
   - A prior entry may already contain content from a later chapter than its section
     header (a known historical editing mistake). Use its full accumulated text as the
     baseline, create a fresh entry for the current chapter, and flag the misplaced
     history. Repairing earlier sections is a separate task.
   - Read the complete chapter input. If output is truncated or condensed, retrieve the
     omitted content using an available retrieval tool, or read smaller bounded chunks.
     Use `caveman_retrieve` for a `<<ccr:...>>` handle only when that tool is available.
     Do not treat a partial read as the full chapter.
     For local HTML input, use the bundled stdlib reader instead of writing a temporary
     extractor: `python3 .claude/skills/add-chapter/scripts/read-chapter.py "book2/chapter 17.html" 1`.
     It skips head/script/style content, preserves inline text (including drop-cap names),
     and prints 10,000-character pages. Read each numbered page in a separate tool response
     until `END`; do not batch chapter pages with inventories or full node entries.
4. Before appending, rerun the compact preflight if the data files have changed since
   the initial check. Record input conflicts
   with source markers rather than silently replacing earlier claims (e.g. Myrk's ten
   assigned warriors in Ch5 versus fifteen departing in Ch9).

## Capture the baseline before editing

Save the current book's three data files in a unique temporary directory before the
first mutation, even when Git is unavailable. Keep that directory path for verification;
do not reuse a fixed directory that may contain another run's baseline. For Book 2:

```sh
chapter_baseline=$(mktemp -d "${TMPDIR:-/tmp}/add-chapter.XXXXXX")
cp book2/nodes.js book2/links.js book2/summaries.js "$chapter_baseline/"
printf '%s\n' "$chapter_baseline"
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
  already has a `mord-lif` or `glornir` entry from an earlier chapter) → add a **new**
  node object in the current chapter's section — do not edit the earlier chapter's entry
  in place. `mapa.js` merges same-id entries within one book via `Object.assign` in array
  order, so only the *last* entry's fields actually render; the file's chronological,
  one-entry-per-chapter structure exists to keep a readable diff history, not because the
  merge requires it. Copy the most recent existing entry's full `desc` (the latest
  chapter's version, not the original book1 one) and append the new material to it, same
  as the full-overwrite rule above.
- **CRITICAL — `desc` is a full overwrite, not a delta.** `mapa.js` merges an updated
  node with `Object.assign(nodeIndex[n.id], n)`, which replaces the entire `desc` string.
  If you only write the new chapter's info, the character's Book 1 backstory disappears
  from their panel. Always use the latest same-id `desc` across Book 1, prior books,
  and earlier entries in the current book; copy it in full and append the new material — same accumulation style already used throughout `book1/nodes.js` (e.g.
  look at the `biorr` or `agnar` entries: one long, chronologically-growing paragraph).
`previousState` stays short — it's a maintenance note for future edits, not shown in the UI.
  Use `scripts/append-node.cjs` (see step 3 above) to apply this rule — it reads the
  latest `desc`/`star` from the file and appends your new text itself, so the full-overwrite
  requirement is satisfied by construction instead of by careful retyping.
- When a chapter resolves an entity's current state, review `label` and `type` as
  well as `desc`. For example, Harek's living reappearance in Book 2 Ch35 requires
  removing the stale `†?` label and replacing his "Desaparecido" type. Preserve the
  earlier disappearance in the accumulated description.
- Distinguish divine ancestry, the inner beast a character identifies, and powers
  actually demonstrated. In Ch35, Bjarn identifies an oso without disproving his
  maternal Snaka ancestry; Breca identifies both lobo and oso, but has not yet
  demonstrated all the abilities Biórr predicts. Keep predictions attributed rather
  than upgrading them to confirmed powers in descriptions or links.
- Do not set `book` yourself — `mapa.js` stamps `n.book = 2` (etc.) automatically during
  merge, which is also what drives the gold dashed "new in this book" ring on the node.
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
rewriting the relationship too. For combined nodes, name the relevant person in the
label when needed (e.g. `La Lección de Escudo de Lif → instruye a Lif → Mord y Lif`).
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
Check that each emphasized entity name resolves completely to its intended node with
the preview's actual inventory and guides. Matching is case-sensitive: use canonical
capitalization (e.g. `Fell-Wolf`, `Tennur`, `Foso de los Vaesen`, `Runa Warding`) or a
supported alias. Plain-text repetitions should resolve too. A named era such as
`Friðaröld` needs its own non-structural node to be linkable; a mention only in the root
description does not suffice. Staged previews must use the current summary dialog
with `chapter-list` and `chapter-pane` elements and the shared renderer; an older copied
HTML shell can prevent all summary links from rendering. Verify this contract with
`node --test tests/book1-rebuild.test.cjs tests/characters.test.cjs` during the rebuild.

## 4. Later-book discoveries — integrate directly into nodes and links

The current book's node and link files are the single source of truth, including facts
that recontextualize an earlier book. Do not create or maintain a separate revelations
file or duplicate callouts. Book-capped loading already hides these updates from readers
who have not reached that book.

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
Nothing else changes — `MAX_BOOK` in `mapa.js` auto-detects `nodesBook3` and the cap
selector, badges, and chapter tabs all extend themselves.

## Verification

Run the bundled verifier from the project root, using the actual unique pre-edit
baseline directory saved above (replace the numbers for the current book/chapter):

```sh
node .claude/skills/add-chapter/scripts/verify-chapter.cjs 2 11 "$chapter_baseline" --review-links
```

The verifier checks each book's files separately for JavaScript syntax, resolves link
endpoints against ids available at that book's reading cap, and requires unique ordered
chapter summaries. It compares the current book's parsed arrays against the snapshot,
requiring unchanged original prefixes and exactly one appended summary for the requested
chapter. It also requires unique ids among appended nodes, `status: 'updated'` and a
nonempty `previousState` for existing ids, and preservation of the full latest baseline
`desc` and `star`. It evaluates trusted local data files only. A failure is fatal: fix it
before reporting success. Repeated ids across earlier chapter sections remain valid.

The `--review-links` option resolves endpoint labels at the current book cap and prints
only appended relationships, marking broken-link removals explicitly. Read these
sentences for semantic direction; the verifier cannot judge their meaning.

These checks do not establish factual accuracy or visual correctness. Review the added
content against the complete chapter, then open `index.html` and confirm: the new/updated
node appears with the correct description and a gold ring, its connections show in the
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
