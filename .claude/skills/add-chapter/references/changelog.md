# Changelog

Entries here are either recent (not yet proven in over several more chapters) or
describe a still-open/unresolved issue in the actual data files. Once an entry's fix is
fully and verbatim absorbed into `SKILL.md` or a bundled script — so rereading the entry
teaches nothing beyond rereading the current skill file — move it to
[references/changelog-archive.md](changelog-archive.md) rather than deleting it. Never
archive an entry that flags an unresolved problem in `book{N}/*.js` until that problem is
actually fixed.

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
