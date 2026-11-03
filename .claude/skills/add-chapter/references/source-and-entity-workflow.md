# Source, identity and append workflow

Read this complete procedure for chapter additions and the applicable steps for reference
integration. Book One rebuild commands are substituted by [book1-rebuild.md](book1-rebuild.md);
source reading, identity resolution and accumulation requirements still apply. For active
Book Two reprocessing, substitute the `reprocess.cjs` commands and chronological context
from [book2-reprocessing.md](book2-reprocessing.md); never inspect the full live Book Two
archive as the factual baseline for an earlier replacement chapter.

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
   Read the complete chapter before inventory work. For local HTML/XHTML, use the
   bundled stdlib reader instead of writing an extractor:

   ```sh
   python3 .claude/skills/add-chapter/scripts/read-chapter.py "book2/chapter 17.html" 1
   ```

   It skips head/script/style content, preserves inline text (including drop-cap names),
   and prints pages of at most 10,000 characters, preferring paragraph boundaries,
   then whitespace, with a hard split only for an overlong unbroken passage. Page
   boundaries retain every character; do not mix pages from different source versions.
   Read each numbered page in a separate tool response
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
   and matches accent-insensitive complete names within ids and labels, treating spaces
   and hyphens (including Unicode dashes) as equivalent separators. For example,
   `Dark of Moon` finds `Dark-of-Moon Hills`; word boundaries remain required, so
   `DarkofMoon` does not. It prints candidate
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

   **A shared epithet is a candidate, not an identity merger.** When a newly revealed
   name matches an existing person's title, compare the independently established people,
   relationships and attributed history before reusing that person's id. Preserve the
   new name on the confirmed person and keep any unexplained overlap as qualified evidence
   in the relevant existing thread; do not transfer the other profile's rank, death or
   deeds. Read reference prose only to settle the requested identity, and check its
   conclusions against the current chapter rather than importing its interpretation.
   In Chapter 53, «Orka Skullsplitter» identifies Orka and the exchange establishes
   Thorkel as Glornir's brother; it does not by itself establish that Orka held the
   former chief's office or explain the earlier naval-death account attached to
   `skullsplitter`. Keep those historical claims attributed until source evidence
   reconciles them.

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

   For identity checks needing only a small excerpt, `--max-excerpts N` limits output
   per selected id and explicitly counts omitted excerpts. It requires `--id`; the
   default remains unlimited and paginated. For example, append `--max-excerpts 1`
   to a targeted `--id skalk` search. A limited result is not a full-entry read
   or proof that later evidence is absent. Remove or raise the limit when the first
   excerpt does not settle the identity; use `read-latest` before updating an entity.

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
   mint no id until they're named). This applies even after a bounded reference check
   (book1-rebuild.md's identity-check procedure) turns up a fully-named node for what the
   current chapter only shows as an anonymous character/creature: the match confirms the
   figure will matter later, not that today's unnamed appearance may borrow that future
   name or label. In a Book 1 rebuild Chapter 49 run, a reference search to confirm an
   event id for two unnamed giant ravens also surfaced their eventual named node ("Grok y
   Kló"); the ravens stayed unnamed in that chapter's own text and link/summary prose,
   with no node minted for them at all, exactly as this rule requires. First rule out two
   near-misses: a near-miss spelling in
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

   A fourth case: a word that is also an ordinary common noun or kinship title (one
   meaning "man", "brother", "maiden") can still be this person's actual name, distinct
   from the generic-word-with-no-node case documented in the
   [chapter summary rules](../SKILL.md#3-chapter-summary--booknsummariesjs) (`Maður`). Mint the id only
   when the text treats the word as one specific individual's own name: consistent
   capitalization across every appearance, use as a direct address/vocative by other
   characters, and the character carrying their own distinct actions and dialogue,
   separate from any sibling or peer who already has a conventional given name. Absent
   those signals, it is the `Maður` case — leave it as plain text and record the person
   by role instead. Book 1, Chapter 23: `Broðir` ("brother" in Old Norse) is capitalized
   throughout, addressed and quoted as an individual, and distinguished from his brother
   Thorun, who already has a conventional name; minted as `brodir`, not left as a
   role-only mention.

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
   hub and pulls its own large history. For one specific pairing, use the exact-pair
   option instead of reading either endpoint's whole history or grepping source files:

   ```sh
   node .claude/skills/add-chapter/scripts/read-links.cjs 2 1 --between elvar bloodsworn
   # Active Book Two reprocessing: implicit book, chronological context only
   node .claude/skills/add-chapter/scripts/reprocess.cjs read-links 1 --between elvar bloodsworn
   ```

   `--between` takes exactly two confirmed endpoint ids, retains both directions and
   broken markers, and prints `NO MATCHES` when absent. It uses parsed data, so quote
   style and field layout cannot hide a link. Use one call per pairing; ordinary multiple
   ids still select their entire union. Read all indicated pages and inspect removals
   before judging a connection active. Rebuild/reprocessing calls must use their launcher
   to avoid the later live archive; never substitute a grep of `book2/links.js` while
   reviewing an earlier replacement chapter.
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
     (defined in [baseline capture](../SKILL.md#capture-the-baseline-before-editing));
     keep specs beside its `baseline/` subdirectory. `descAppend`/`starAppend`
     are the only things you compose by hand — genuinely new material, never a copy of
     existing text — and they're joined onto the baseline with a single space. Omit
     `header` on every node after the first one appended for a given chapter section.
     For a brand-new id (no baseline to extend), use `{"mode":"new", "label":..., "group":...,
     "type":..., "desc":..., "star":...}` instead — all fields supplied directly, since
     there is nothing to append to. The script runs `node --check` on the file before
     exiting, so a malformed result fails loudly instead of landing silently. This is why
     the risk below was never fixable by a "be more careful" rule — only by removing the
     retyping step entirely.
   - **For a whole chapter, prefer the batch appender** instead of writing a temporary
     script to loop over helpers and count revisions. Compose one JSON manifest beside
     `baseline/`, using plain JS objects and `JSON.stringify` when generating Spanish
     prose. Each node contains its `id` plus the same new/update fields documented above;
     an update supplies only its new suffixes, never retyped baseline text:

     ```json
     {
       "header": "// ── LIBRO 2, CAPÍTULO 42 — BIÓRR ──",
       "nodes": [
         {"id":"biorr", "mode":"update", "descAppend":"LIBRO 2, CAPÍTULO 42: ...",
          "previousState":"Descripción breve del cambio."}
       ],
       "links": [
         {"source":"biorr", "target":"elvar", "label":"habla con", "type":"rel"}
       ],
       "summary": {"chapter":42, "title":"Capítulo 42 — Biórr", "summary":"..."}
     }
     ```

     ```sh
     node .claude/skills/add-chapter/scripts/append-chapter.cjs 2 42 "$chapter_baseline" "$chapter_run/chapter.json"
     # Book One rebuild: implicit book 1; use the staged baseline
     node .claude/skills/add-chapter/scripts/rebuild.cjs append-chapter 42 "$chapter_baseline" "$chapter_run/chapter.json"
     ```

     `nodes` and `links` may be empty arrays; `summary` is exactly one entry for the
     requested chapter. Put the optional section `header` only at the manifest level.
     By default, the helper requires the current book's files to match the pre-edit baseline exactly,
     prepares all additions in a scratch archive through the existing appenders, checks
     every supplied id has exactly one extra revision, and runs the normal chapter
     verifier before publishing. Invalid specs, endpoints, summary mentions or event
     connections leave the archive unchanged. An already-applied batch is rejected
     against the old baseline; inspect existing work instead of recapturing a baseline
     and appending it again. It checks for intervening archive edits before publishing
     and restores files on a caught write error; the three-file write is not a
     crash-atomic filesystem transaction.

     The rebuild launcher checks live hashes and supplies staged mention matching.
     Live calls use live guides by default. The batch does not write review records,
     update README/progress, or waive any source, ownership, event or thread review.
     Continue with the normal verifier review options and all three semantic gates.
     For rebuild completion, use `rebuild.cjs finish-chapter` as documented in
     [the rebuild procedure](book1-rebuild.md) after those reviews and tests.
     Keep the individual appenders for targeted work; if using a manual loop, confirm
     counts by parsing arrays (baseline + 1 per id), never formatting-sensitive grep.
   - **Correct an applied batch through its manifest, before chapter completion.** Keep
     the successfully applied manifest unchanged (for example `chapter.applied.json`),
     copy it to `chapter.json`, and edit that new copy. Rebuild the chapter suffix from
     the original baseline instead of editing generated JavaScript or appending duplicate
     revisions:

     ```sh
     node .claude/skills/add-chapter/scripts/append-chapter.cjs 2 42 "$chapter_baseline" "$chapter_run/chapter.json" --replace-applied "$chapter_run/chapter.applied.json"
     # Book One rebuild:
     node .claude/skills/add-chapter/scripts/rebuild.cjs append-chapter 42 "$chapter_baseline" "$chapter_run/chapter.json" --replace-applied "$chapter_run/chapter.applied.json"
     ```

     The helper reproduces the previous manifest in scratch and requires all three
     current files to match it byte-for-byte. Only then does it regenerate and verify
     the corrected chapter from the same baseline. A wrong previous spec, hand edit,
     changed baseline, later chapter or invalid replacement fails without publishing.
     Publication checks for intervening edits and rolls back to the applied draft on
     a caught write failure. After success, keep the newly applied manifest as the
     previous spec for any further correction. Revisit all affected semantic reviews,
     checklist assessments and verifier reports before recording PASS; old attestations
     do not cover a changed draft. The rebuild launcher rejects revisions of completed
     chapters; historical repairs remain a separate workflow.

     For non-batch corrections only, inspect the actual chapter section first:
     `append-entries.cjs` writes compact JSON links and `append-node.cjs` writes spaced
     JS literals. Restrict exact replacement anchors to that section, not the whole
     archive (relationship labels recur across chapters); require exactly one match.
     Parse afterward to assert the intended field values and rerun the verifier review.
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
   - Append links and summaries with `scripts/append-entries.cjs`, rather than rewriting
     the same insertion script per chapter. Write a JSON spec beside `baseline/` with
     an optional single-line `header` comment and a nonempty `entries` array:

     ```json
     {"header":"// ── LIBRO 2, CAPÍTULO 42 ──", "entries":[
       {"source":"node-id", "target":"other-id", "label":"relación", "type":"rel"}
     ]}
     ```

     ```sh
     node .claude/skills/add-chapter/scripts/append-entries.cjs 2 links "$chapter_run/links.json"
     node .claude/skills/add-chapter/scripts/append-entries.cjs 2 summaries "$chapter_run/summaries.json"
     ```

     Summary specs use the same wrapper with chapter/title/summary entries (section 3).
     The helper preserves the original prefix and parsed entries, supports existing arrays
     with or without a final comma, and validates syntax and basic fields before writing.
     Duplicate or unordered summary chapters fail without changing the file. Endpoint,
     mention and semantic checks still belong to the chapter verifier and review gates.
     For the rebuild, use `rebuild.cjs append-entries links|summaries SPEC_PATH`.
   - If reading source lines, include the entire object: `desc` and `star` may be on
     following lines. For same-POV continuations, chapter boundary comments can locate
     the previous scene's cluster quickly; inspect later same-id entries before copying.
   - A prior entry may already contain content from a later chapter than its section
     header (a known historical editing mistake). Use its full accumulated text as the
     baseline, create a fresh entry for the current chapter, and flag the misplaced
     history. Repairing earlier sections is a separate task.
   - A later chapter can qualify an earlier reported death without confirming survival.
     Preserve the earlier chapter-marked claim, then append the new speaker's exact
     degree of certainty on the affected character (for example, «podría vivir»), and
     qualify a definitive death label when warranted (`†?`). Do not describe this as a
     resurrection or a confirmed reappearance. Check the latest related threads for
     inherited death claims and cross-reference the qualification there when they are
     updated; unchanged historical entries remain historical evidence. Distinguish an
     archive's assertion from what the source actually establishes. If the original
     chapter is unavailable, record that limit rather than claiming a source recheck.
4. Before appending, rerun the compact preflight if the data files have changed since
   the initial check. Record input conflicts
   with source markers rather than silently replacing earlier claims (e.g. Myrk's ten
   assigned warriors in Ch5 versus fifteen departing in Ch9).

