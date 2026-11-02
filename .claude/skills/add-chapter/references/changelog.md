# Changelog

Entries here are either recent (not yet proven in over several more chapters) or
describe a still-open/unresolved issue in the actual data files. Once an entry's fix is
fully and verbatim absorbed into `SKILL.md` or a bundled script — so rereading the entry
teaches nothing beyond rereading the current skill file — move it to
[references/changelog-archive.md](changelog-archive.md) rather than deleting it. Never
archive an entry that flags an unresolved problem in `book{N}/*.js` until that problem is
actually fixed.

- 2026-11-01: Book 2 Ch40 — two small frictions, both resolved without needing a script
  change. (1) Locating the end of `book2/links.js` by grepping the box-drawing header
  format (`// ── LIBRO 2, CAPÍTULO N — POV ──`) found a match only up to Ch24; Ch36/38/39
  use a plain `// LIBRO 2, CAPÍTULO N — POV` comment (no box-drawing, no em-dashes) in the
  same file, so the last-chapter lookup needed a second, looser grep. Worth checking both
  header styles (or just taking the file's last `CAPÍTULO` match regardless of exact
  punctuation) before concluding where a book's last section ends. (2) Read with even a
  44-line offset/limit on `book2/nodes.js` failed with a 25000-token-exceeded error —
  individual `desc` strings are now long enough that small line windows are not a safe
  fallback; went straight to a Node script (via `vm`) reading the file and extracting the
  needed ids' latest `desc`/`star` into JSON, same programmatic-copy approach the skill
  already recommends, then built the new chapter's entries by string-appending to that
  JSON in a second script and verified with `verify-chapter.cjs` (PASS).
- 2026-11-01: Book 2 Ch38 — batched `read-latest.cjs 2 1 elvar uspa grend sighvat solin
  hijas-orna-ulfrir` to review context before updating six of those ids; the combined
  output reported "page 1/5" and the run stopped there without fetching pages 2-5, so
  `elvar`'s own entry (26k chars, needing ~3 pages on its own) was left mostly unread
  even though the five shorter ids were each fully covered within that one page. The
  actual file edit was unaffected (a small Node script read `desc`/`star` straight from
  the live file and appended programmatically, so the write was byte-exact regardless of
  what was read), and a follow-up single-id read of the remaining pages found no
  contradiction, but the under-read was a real compliance gap, not hypothetical. Added a
  note above to flag that batched pagination doesn't mean each batched id was read in
  full.
- 2026-11-01: Post-Ch37 skill review (asked directly, not the per-chapter friction check):
  found two concrete pieces of duplication/weak-signal in the files, not hypothetical.
  (1) `verify-chapter.cjs`'s `desc`/`star` preservation check only said "does not preserve
  its latest baseline text" with no location, which is exactly what cost the extra
  diagnostic script in the entry below — it now reports the divergence index and a
  40-char window of both texts around it. (2) `SKILL.md`'s "full compact listing" fallback
  was a 15-line inline `node <<'JS'` heredoc that reimplemented `match-entities.cjs`'s own
  inventory-building loop verbatim, just without name-filtering — gave `match-entities.cjs`
  an `--all` mode instead and deleted the heredoc, so there is one inventory
  implementation instead of two kept in sync by hand. Also moved ~30 fully-superseded
  changelog entries (chapters whose fix is now verbatim in `SKILL.md` or a script) to
  `changelog-archive.md`, keeping this file focused on open/recent signal.
- 2026-11-01: Review after Ch37: `read-latest.cjs`'s transcript for Varg's `star` field
  silently dropped its final sentence between tool output and this context, with no
  truncation marker — `verify-chapter.cjs` caught it ("star does not preserve its latest
  baseline text") when the hand-copied star failed the prefix check. Added a note to copy
  `desc`/`star` only via a script reading the data file directly, and to treat the
  verifier's PASS/FAIL as authoritative over the transcript for preservation, not just a
  final gate.
- 2026-11-01: Added the new-entry-per-chapter note after Book 2 Ch7 — edited Orka's
  existing Chapter 1 node entry in place to append Chapter 7 content, which works at
  runtime (she only had one book2 entry so far) but broke the file's own convention, used
  by every multi-chapter id (`mord-lif`, `glornir`, `skalk`...), of adding a fresh node
  object per chapter rather than mutating a prior chapter's entry. Caught it by reading
  `mapa.js`'s merge loop (`Object.assign` per same-id entry, in array order) before it
  propagated to the other six nodes touched that chapter.
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
- 2026-11-01: Added the narrow-grep note after Book 2 Ch8 — checking ~20 already-known
  ids' latest state across book1/book2 with a plain `grep -n "id: 'a'\|id: 'b'\|..."`
  (no `-o`) dumped the full multi-thousand-character `desc` line per match, exceeding the
  condensation threshold and costing an extra `caveman_retrieve` round-trip for content
  only needed to locate line numbers.
