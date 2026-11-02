# Changelog

Entries here are either recent (not yet proven in over several more chapters) or
describe a still-open/unresolved issue in the actual data files. Once an entry's fix is
fully and verbatim absorbed into `SKILL.md` or a bundled script — so rereading the entry
teaches nothing beyond rereading the current skill file — move it to
[references/changelog-archive.md](changelog-archive.md) rather than deleting it. Never
archive an entry that flags an unresolved problem in `book{N}/*.js` until that problem is
actually fixed.

- 2026-11-01: Book 2 Ch47 — checking whether "three ships ambushed the Sea-Wolf, Bloodsworn
  searched beaches/seabed" (a detail recounted secondhand by Røkia) already had its own
  event node, I reached for plain `grep -n "phrase1\|phrase2\|phrase3"` across `book2/nodes.js`
  instead of `search-descriptions.cjs`. Each call returned 200KB+ of output because the
  match landed inside Orka's single-line accumulated `desc`, dumping the whole line twice.
  `search-descriptions.cjs` already supports arbitrary literal phrases (not just candidate
  names) and paginates at 8,000 characters — it would have avoided this entirely. Added a
  note in SKILL.md making this explicit at the point where the helper is introduced.
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
- 2026-11-01: Post-Ch48 skill review (asked directly, not the per-chapter friction check):
  scanning the full changelog archive, step 2 (entity resolution) turned out to be the
  single most-patched part of the skill — Ilmur, Iva, Verdani/Skuld, Dead Drengr
  translation, Járn, Úlfhéðnar, and now Gudrun (below) are seven separate incidents, all
  in the same ~90-line prose block, each fixed by appending one more caveat. Restructured
  step 2 into an explicit ordered checklist (match-entities → search-descriptions → re-run
  match-entities for names found only inside *other* entities' descriptions →
  mint-with-near-miss-checks), preserving every example and caveat's substance but making
  the decision order explicit instead of requiring all seven to be held in mind at once.
  The Ch48/Gudrun entry this generalizes from is now archived — its fix is fully present
  in step 2c.
