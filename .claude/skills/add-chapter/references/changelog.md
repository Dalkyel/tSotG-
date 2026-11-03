# Changelog

- 2026-11-03: Book Two Ch13 — first real use of three tools added in a direct skill
  review (not a per-chapter friction check): shared `scripts/paginate.cjs` across the
  five pagination-based readers plus `verify-chapter.cjs`'s `--review-nodes` pager
  (fixing an 8000-vs-10000 page-size drift and giving all of them the UTF-16
  surrogate-pair safety only `read-checklist.cjs` had before); `verify-chapter.cjs
  --review-overlap`, flagging a 12+-consecutive-word shared passage between appended
  nodes; and `scripts/rebuild-guard.cjs`, warning when a shared reader is called
  outside `rebuild.cjs`/`reprocess.cjs` while that book's rebuild/reprocessing is
  active. `--review-overlap` caught a real violation on its first real use: `varg`
  and `leccion-control-lobo` ended up sharing a verbatim 12-word clause ("logra
  contener el impulso de matar a un enemigo caído, aunque solo...") because both
  entries described the same wolf-control moment. Fixed through the normal
  `--replace-applied` correction workflow (not a manual edit), not by inventing a new
  procedure — the existing non-batch correction path already covered this case. No
  other friction this run; `rebuild-guard.cjs` never fired on a legitimate call since
  every book-2 read went through `reprocess.cjs`.

- 2026-11-03: Book Two Ch12 — checking a still-pending 156-row checklist emitted
  468 diagnostics and truncated the response. `review-backlog.cjs check` now reports
  the full error count, first 24 diagnostics and the saved-row reader for inspection.
  All rows still validate, failures remain fatal, and evidence files are untouched.
  Added regression coverage for bounded output, non-mutation, an error on the final
  row and success only after all assessments are complete. Documented recovery in
  the thread gate.

- 2026-11-03: Book Two Ch11 — the initial progress-file dump included growing
  historical logs and hashes and contributed to truncated output. Added guarded,
  read-only `reprocess.cjs status` for compact mode/next-chapter routing and active
  source/run/baseline recovery. Routed initialization checks to it and tested ready,
  active and complete states, non-mutation, invalid arguments and archive-drift
  rejection. It does not replace source reads or semantic reviews.

Entries here are either recent (not yet proven in over several more chapters) or
describe a still-open/unresolved issue in the actual data files. Once an entry's fix is
fully and verbatim absorbed into `SKILL.md`, its workflow references or a bundled script
— so rereading the entry
teaches nothing beyond rereading the current skill file — move it to
[references/changelog-archive.md](changelog-archive.md) rather than deleting it. Never
archive an entry that flags an unresolved problem in `book{N}/*.js` until that problem is
actually fixed.

- 2026-11-03: Book Two Ch10 — dumping the archived 153-item checklist alongside
  helper code truncated the response. Added `read-checklist.cjs` with lossless
  8,000-character pages and optional exact-ID selection. It reads saved review rows
  without requiring expired temporary baselines, preserves pending assessments and
  all evidence fields, and explicitly does not certify coverage or semantic PASS.
  Added two regression tests for pagination, archival independence, selection,
  invalid arguments and non-mutation. Routed saved-review inspection to it in the
  skill and review/reprocessing references.

- 2026-11-02: Promoted all 53 rebuilt Book One chapters into the live archive and
  integrated the existing 50 Book Two chapters. Permanent before/reference copies retain
  the originals. Reconciled combined character IDs, reconnected canonical places/lineage,
  preserved rebuilt descriptions through later revisions, and repaired summary entity
  matching without changing visible prose. Added `book2-reprocessing.md`, chapter-owned
  record parsing, rebasing and the `reprocess.cjs` workflow: review only the chronological
  prefix, publish into existing live files, keep later chapters visible. Added explicit
  promoted/ready routing, review/hash/source/completion guards and migration/replacement
  regression coverage. Existing Book Two evidence has been structurally integrated, not
  re-read from chapter sources; its ownership and clue lifecycle still need the planned
  source reprocessing. Unscoped legacy clue notes and the shared Skullsplitter claim
  remain recorded for that review, not silently resolved by migration.

- 2026-11-02: Book One rebuild Ch53 — a canonical-event identity search surfaced
  reference `convergencia-grimholt` prose that interprets «Orka Skullsplitter» as proof
  she was the former chief. The chapter establishes the epithet and Glornir/Thorkel
  kinship, but does not explain the earlier `skullsplitter` naval-death account or
  establish that office. Added the shared-epithet check to the source/entity workflow;
  staged profiles and `pasado-orka` preserve the distinction. The reference/live event's
  stronger leadership/identity claim remains unresolved for final source reconciliation;
  do not copy it into the rebuild merely because the canonical event id matches.

- 2026-11-02: Book One rebuild Ch52 — the mandatory whole-POV crossover rule selected
  98 entries / 96,262 characters / 13 pages because Elvar's chapter names Drekr.
  The complete read confirmed that the actual Orka developments concern Drekr, missing
  children/Breca, Hakon/Helka and the cult; unrelated Orka histories stayed unchanged.
  Updated `review-gates.md` to allow explicit affected-family selection through existing
  `--include` options, with the chapter's own POV and untagged prose still mandatory,
  all-POV per-id assessments retained, selection rationale recorded, and complete extra
  POV reading required whenever relevance cannot be bounded confidently. No reader or
  checklist behavior changed. This selection policy should be evaluated in later runs.

- 2026-11-02: Book 1 rebuild Ch47 — two mechanical mistakes while running the already-
  documented helpers, both fixed directly in `book1-rebuild.md`/`review-gates.md` (now
  absorbed there, not just here):
  (1) Called `append-chapter` with `--review-links --review-summary`; those flags belong
  only to `verify-chapter` and `append-chapter` rejected the call with `Unknown, duplicate
  or incomplete option`. `book1-rebuild.md` now says explicitly that `append-chapter` only
  takes `--staged-preview`/`--replace-applied` and that the review flags need a separate
  `verify-chapter` call afterward.
  (2) Tried to read page 3 of an already-read id by appending `3` after the id
  (`read-latest 1 varg 3`) instead of replacing the leading page argument
  (`read-latest 3 varg`); the trailing `3` was parsed as a second, unresolvable id and
  failed with `Unknown ids: 3`. `book1-rebuild.md` now gives both forms side by side.
  (3) Left the thread-lifecycle checklist's `remaining` field as `""` on every
  `unchanged` item; `review-backlog.cjs check` failed on all 108 of them at once with
  `Missing remaining question or explicit none` — the gate text already said "or explicit
  `none`" but it read as optional rather than as a required literal value.
  `review-gates.md` now says explicitly that `remaining` must be nonempty text and gives
  the literal word `none` as what to write.
- 2026-11-02: Book 1 rebuild Ch20 — two mistakes, both fixed directly in SKILL.md (now
  absorbed there, not just here):
  (1) Wrote three new nodes (a mission EVENTO, its TRAMA question, and a landing EVENTO)
  with `group: 'VARG'` instead of `'EVENTO'`/`'TRAMA'`, confusing the POV arc-link
  (`cat-varg → incluye → id`) with the structural `group` field. Surfaced only because a
  `group === 'TRAMA'` backlog query for the thread-lifecycle review silently skipped the
  mis-grouped node.
  (2) The new mission EVENTO's first draft repeated, almost verbatim, the departure
  sentence already owned by the existing `partida-liga` EVENTO (both scenes happen in the
  same chapter beat: Helka's commission and the actual rowing-out). `verify-chapter.cjs`
  passed anyway — it checks syntax and link identity, not content overlap between sibling
  nodes — so this was caught only by manually re-reading both nodes' final text side by
  side during the ownership review, not by any automated check.
  Separately, the same chapter's event-coverage pass caught (correctly, as designed) that
  Queen Helka's in-person arrival/mediation existed only in her profile and an open-TRAMA
  node, which doesn't satisfy event coverage; added a dedicated EVENTO for it. Noted in
  SKILL.md's event-coverage gate as a general tell: a TRAMA whose `desc` is ballooning
  into scene narration usually means a dedicated EVENTO is missing, not that the TRAMA is
  doing its job well.
- 2026-11-01: Confirmed, on request, that this was not the first occurrence — Book 2 Ch6
  had made the identical mistake on the `elvar` node and it went uncaught at the time:
  Ch6's entire Elvar-POV update (the Vergelmir ambush, Skuld's punishment, the
  Ulfrir-resurrection plan) was appended into the Ch4 `elvar` entry's `desc`/`star`
  in place, left sitting under the `// CAPÍTULO 4` comment with a `previousState` that
  still only described the Ch4 cliffhanger. Found by comparing entry counts per id:
  `grend`/`sighvat`/`uspa`/`hijas-orna-ulfrir` each correctly had one entry per chapter
  they were touched in, but `elvar` — the Ch6 POV character, who had to be touched that
  chapter — had only two entries instead of three. Fixed by splitting the Ch4 entry back
  to its Ch4-only content and adding a proper Ch6 entry (full accumulated desc/star +
  Ch6 material) under the `// CAPÍTULO 6` header, ahead of `solin`. Lesson for future
  cleanup like this: do the split with a small Node script operating on exact-substring
  anchors rather than hand-retyping multi-thousand-character `desc` strings into Edit's
  old_string/new_string — safer, but double-check every index arithmetic (a length
  added twice in one such script silently ate the next node's `id:`/`label:` prefix here,
  caught only because `node --check` then failed).
- 2026-11-02: Book 2 Ch49 — needed to confirm six specific relationship pairs (e.g.
  ulfrir↔orka, sighvat↔halja-vali) had no existing link before adding new ones. Reasoned
  that batching all seven involved ids into one `read-links.cjs` call would be more
  efficient than six separate `grep` checks — it returned 268 stored links across 5 pages
  (mostly irrelevant book1 history pulled in via the two hub ids `elvar`/`orka`), only one
  page of which was ever read before abandoning it for the `grep`-per-pair approach the
  skill already prescribed for a single pairing. Generalized that existing rule in
  SKILL.md step 3 to cover checking several pairs, not just one, so the same
  batching-looks-efficient reasoning doesn't recur.
- 2026-11-02: Book 2 Ch50 — two causes of friction, both fixed directly:
  (1) An `Edit` on `links.js`'s closing `},\n];`, with `old_string` typed from a Bash
  `tail -40` view of the file, failed to match. The actual file used double-quoted keys
  (`source: "wave-jarl"`); the Bash output had rendered it with single quotes. This
  environment's command-output condensation layer can silently normalize cosmetic
  details like quote style when printing `Bash` output — it is not a byte-exact view of
  the file. Fixed by re-reading the same tail with `Read` (which is byte-exact) before
  retrying the `Edit`. Lesson, generalizing beyond the existing indentation-mismatch
  entry already archived from Ch49: before any `Edit` whose `old_string` is the literal
  closing lines of `nodes.js`/`links.js`/`summaries.js`, get that `old_string` from `Read`,
  never from `Bash cat`/`tail` output, in this environment.
  (2) Needed the chapter number behind a `search-descriptions.cjs` excerpt (to cite it
  accurately in a new node append) and reached for a one-off inline `node -e` script using
  `matchAll` + `console.log` of the match object — which prints the regex match's `input`
  property, i.e. the *entire* searched string (2MB+), not just the match. Fixed at the
  tool level instead of noting it as a one-off mistake: `search-descriptions.cjs` now
  finds the nearest preceding `LIBRO N, CAPÍTULO M` marker inside each matched entity's own
  `desc` and prefixes every excerpt with it, so this lookup never needs a hand-rolled
  script again.

- 2026-11-02: Started the user-authorized Book One chronological rebuild in `book1/rebuild/book1/`, with an immutable original reference copy and an isolated preview. The verifier rejected Book One solely because of its `book >= 2` argument guard; enabled Book One using its existing variable-name support. Documented staged helper working directories, canonical ID reuse without future facts, and the required final Book Two reconciliation. The live loader now merges the full archive, so replaced the stale frozen-base/reading-cap introduction.

- 2026-11-02: Book One Ch1 summary-link correction — the staged preview retained the old summary panel after the live UI switched to a dialog with a chapter sidebar, so the shared mention renderer could not run. Regenerated the preview from the current HTML, normalized summary terms to matcher capitalization/canonical labels, and added the explicitly named Friðaröld era node. Added regression coverage for all emphasized terms, repeated character mentions, and preview/renderer DOM compatibility; documented these checks in the skill.

- 2026-11-02: Book One Ch2 rebuild found an unresolved identity ambiguity in the original/live `book1/nodes.js`: `snepil` is labeled “Snepil Kolskegg (†)” and treats him as Varg’s dead owner. Chapter 2 separately names Kolskegg’s farm and Snepil’s strangling without explicitly identifying the names as one person. The staged `snepil` entry preserves that uncertainty; the original archive is unchanged. Resolve against later source text during rebuild reconciliation.

- 2026-11-02: Book One Ch18 rebuild — two small doc gaps in `references/book1-rebuild.md`,
  both fixed directly in that file. (1) Its own prose said "use `scripts/rebuild.cjs`"
  while every one of its own examples actually called
  `.claude/skills/add-chapter/scripts/rebuild.cjs`; following the prose literally failed
  with `MODULE_NOT_FOUND` since no top-level `scripts/rebuild.cjs` exists. (2) The note
  "The `1` after `read-latest` or `read-backlog` is a page number" did not mention
  `read-links`, so calling it with a leading book-cap argument (mirroring the live
  workflow's `read-links.cjs BOOK PAGE ids...` signature) raised `Unknown ids: 1` before
  the correct `read-links PAGE ids...` form was found by trial. Both corrected in place.
  (3) That same run touched 24 node ids in one chapter. Writing each `append-node.cjs`
  spec as a separate shell `echo '...' > spec.json` heredoc would have meant
  hand-escaping long Spanish prose full of «guillemets», em dashes and accents inside
  shell quoting — real risk of silent corruption, not just the baseline-retyping risk
  the appender already guards against. Used one small Node script instead, building
  every spec as a plain JS object literal and writing each via `JSON.stringify`, then
  looped `append-node.cjs` over the generated files — no escaping risk at all. Also
  found that the loop's per-call "OK: ..." confirmations got silently elided by this
  environment's output-condensation layer, so success was reconfirmed afterward with a
  `grep -c` per id plus a final `node --check`. Generalized both into SKILL.md's
  append-node bullet.

- 2026-11-02: Book One Ch19 rebuild — three fixes, all applied directly.
  (1) Vesli's drafted node entry restated the full attack account (wall-climbers,
  Thorkel barring the gate, his transformation, the clawed attacker, the tennúr
  grabbing for Breca) nearly verbatim against both `orka`'s own narration and the
  `thorkel-muerte` EVENTO's reconstruction — three copies of one paragraph, caught only
  by the after-writing ownership audit, not prevented by it. Generalized into a new
  SKILL.md ownership-gate bullet: testimony belongs on the event node; narrator/listener
  entries get only their own stake plus a pointer.
  (2) The chapter summary emphasized `Maður` (Old Norse for "man," used in Vesli's
  broken speech) as `<strong>Maður</strong>`; the verifier failed with "does not resolve
  completely to one node." `match-entities.cjs` and `search-descriptions.cjs` had already
  returned `UNMATCHED`/`NO MATCHES` for it earlier in the same run — the information to
  avoid this was already in hand, just not connected to the emphasis step. Added a line
  to SKILL.md's summary section to check pending `<strong>` terms against step 2's
  UNMATCHED/NO MATCHES results before writing them.
  (3) `book1/rebuild/progress.json` already listed Chapter 18 as complete (all three gate
  reviews present on disk), but `README.md`'s chronological log had no Chapter 18
  paragraph — a prior session's gap that nothing would have caught before Chapter 19
  started, since the two files are never cross-checked. Backfilled the missing paragraph
  and added a step to `book1-rebuild.md` to check README against `completedChapters`
  before starting a new chapter.

- 2026-11-02: Book One Ch21 rebuild — two fixes, both applied directly.
  (1) `grep -c "id: \"ID\"" book1/nodes.js` — the exact verification command SKILL.md
  itself recommends after a batched `append-node.cjs` loop — returned 0 "before"
  occurrences for `pasado-elvar` and `berak-venta`, two ids that had existed since
  Chapter 9. Cause: the staged file mixes compact single-line JSON node objects
  (`{"id":"x","label":...}`, no space after the colon) with the spaced JS-literal style
  `append-node.cjs` writes (`id: "x", label: ...`); the grep pattern only matches the
  latter. Trusting the grep count as written would have read a genuine append as a
  failure, or hidden a genuine duplicate. Caught only by re-checking with a small
  `node -e` script that parses the array instead of pattern-matching text. Replaced the
  grep-based instruction in SKILL.md's append-node bullet with the parse-based one-liner.
  (2) First drafts of `pasado-elvar` and `berak-venta` (both resolved this chapter by two
  brand-new EVENTO nodes created in the same run) each re-narrated the full sale/
  revelation scene almost verbatim against the new EVENTOs — the same failure class as
  the Chapter 20 incident already in this changelog, but triggered by simultaneous
  creation rather than a TRAMA's narration growing across many chapters. Caught by the
  ownership-gate side-by-side re-read, not prevented by it. Trimmed both TRAMA appends to
  `ESTADO: ...` plus a one-line answer and a "Véase EVENTO-ID" pointer. Added a bullet to
  SKILL.md's event-coverage gate making this the default drafting instruction (write the
  TRAMA append short on the first pass, not narrative-then-trim) rather than only a
  post-hoc detection step.

- 2026-11-02: Book 1 rebuild Ch46 — two mistakes, both fixed directly in SKILL.md and
  review-gates.md (now absorbed there, not just here):
  (1) `ownership-review.md`/`event-review.md`/`thread-review.md` were first written with
  the PASS markers wrapped in Markdown bold (`**Ownership review: PASS**`), matching how
  the rest of each file was formatted. `finish-chapter` rejected all three with "Missing
  Ownership review: PASS in ownership-review.md" even though the text was plainly present
  as a substring — `finish-rebuild-chapter.cjs` requires an exact, trimmed, standalone
  line match, not a substring search. Cost a full completion round-trip to diagnose and
  re-edit three files. SKILL.md's semantic-gates bullet list now states the bare-line,
  no-Markdown requirement explicitly.
  (2) Read all 14 pages of the full cross-POV backlog (111,826 characters) before
  assessing the thread-lifecycle checklist, even though the chapter's complete entity
  list (built during entity resolution) contained zero Varg or Elvar names — every one of
  the ~80 Varg/Elvar backlog candidates was ultimately assessed on the single shared
  reason "different POV, not represented this chapter," with nothing drawn from its own
  prose. Since this saga's chapters are each strictly one POV, this waste recurs on every
  chapter. review-gates.md's thread-lifecycle gate now documents the shortcut: once the
  entity list confirms no overlap, assess an unrepresented POV's candidates straight from
  the cheap `--index` listing instead of their full paginated prose.

- 2026-11-02: Book 1 rebuild Ch48 — the Ch46 shortcut above ("assess straight from the
  `--index` listing") told the reader to group unrepresented-POV candidates by POV, but
  `--index` never actually printed a POV tag, only `[TRAMA]`/`[star]`. Classifying all
  123 candidates into Orka/Varg/Elvar still required inferring each id's POV by hand from
  its label — and got several wrong by confident guessing: `virk`, `gudvarr`, `drekr` and
  `combate-nacken` read as Varg's own companions, but are actually tied to Orka's
  Mord-and-Lif rescue arc via their `cat-orka` link; `fuga-orka-fellur`'s own label named
  Orka directly but carries no POV arc link in the archive at all. Fixed the gap instead
  of re-guessing: `backlog-data.cjs` now also resolves each candidate's POV from the
  node's own `group` (when it's itself ORKA/VARG/ELVAR) or its `cat-orka`/`cat-varg`/
  `cat-elvar` arc link, and `read-backlog.cjs --index` prints that tag inline (e.g.
  `virk [ORKA] [star]`); an id with neither still prints untagged rather than guessing.
  `tests/backlog-reader.test.cjs` covers both the direct-group and arc-link paths.
  review-gates.md's thread-lifecycle gate now describes the tag's two sources and this
  exact misclassification as the reason to trust the printed tag over the label.

- 2026-11-02: Book 1 rebuild Ch49 — two fixes, both absorbed directly into the workflow
  references (not just here):
  (1) Called `search-descriptions.cjs` and `read-latest.cjs` directly (bypassing the
  `rebuild.cjs` launcher) while checking for a moth/raven/staff-mage reference. The bare
  scripts silently defaulted to the live, fully-spoiled `book1/*.js` at the project root
  instead of erroring — a canonical id (`emboscada-grimholt-bosque`) appeared to "already
  exist" in results, which briefly looked like a staged-archive inconsistency before the
  cause (skipped launcher) was found. Cost several tool calls to diagnose. book1-rebuild.md
  now states explicitly that calling a helper script directly, without `rebuild.cjs`, reads
  the live archive with no warning, and names the symptom (an id the launcher calls unknown
  that a bare script just matched) as the tell.
  (2) A bounded `--reference` search run to confirm an event id for two unnamed giant
  ravens also surfaced their eventual named node ("Grok y Kló"). Correctly left them
  unnamed in the chapter's nodes/links/summary (no node minted at all, per the existing
  unnamed-character rule), but the near-miss — almost reusing a future name recovered
  incidentally from an identity check, rather than one actually being verified — wasn't
  called out anywhere. source-and-entity-workflow.md's unnamed-character rule now names
  this exact trap with that example.
