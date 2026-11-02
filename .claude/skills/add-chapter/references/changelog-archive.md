# Changelog archive

Entries moved here on 2026-11-01 (after Ch37) because their fix is now fully and
verbatim present in `SKILL.md` or a bundled script — rereading the entry below teaches
nothing beyond rereading the current skill file. Kept verbatim (including original
dates) for deep history; `references/changelog.md` keeps only recent entries and any
entry describing a still-open/unresolved issue in the actual data files. If a rule here
is ever challenged or a bundled script changes, this is where the "why" lives.

- 2026-11-01: Review after Ch37: `read-latest.cjs`'s transcript for Varg's `star` field
  silently dropped its final sentence between tool output and this context, with no
  truncation marker — `verify-chapter.cjs` caught it ("star does not preserve its latest
  baseline text") when the hand-copied star failed the prefix check. Added a note to copy
  `desc`/`star` only via a script reading the data file directly, and to treat the
  verifier's PASS/FAIL as authoritative over the transcript for preservation, not just a
  final gate. SUPERSEDED after Ch42: the prose note alone wasn't enough — it got skipped
  on a later chapter anyway — so the recommendation became a bundled script,
  `scripts/append-node.cjs`, which removes the retyping step rather than just warning
  about it.
- 2026-11-01 (flagged after Ch8, fixed after Ch38): the `collares` node's Ch4 entry in
  `book2/nodes.js` had Ch6 content appended into it in place — the same in-place-edit
  mistake the Ch6/Ch7 `elvar` incidents above describe, just undetected on a non-POV
  node for 30 chapters. Fixing it surfaced a second, more serious bug in the same
  cluster: the existing Ch8 entry's `desc`/`star` did NOT fully overwrite the merged
  Ch4+Ch6 entry's text — it dropped back to the one-sentence generic intro and jumped
  straight to Ch8 content, silently deleting the Ch2/Ch4/Ch6 activation-formula and
  collar-rules narrative from the node actually rendered in the map (last-entry-wins via
  `Object.assign`). Fixed by splitting the merged entry into separate Ch4 and Ch6
  entries (each a full overwrite of everything before it) and rebuilding the Ch8 entry
  as a full overwrite of the fixed Ch6 text plus the original Ch8-only addition,
  extracted programmatically from the live file rather than retyped. Lesson: when a
  node's history is split into "this chapter's addition" and "everything else", a
  content-loss bug can hide in the *next* chapter's entry just as easily as in the
  entry being fixed — check the one immediately after a merged entry too, not just the
  merged one itself.
- 2026-11-01: Review after Ch36: scope link lookups to specific relevant endpoints
  before including a central POV id. A broad Orka/context query returned 161 stored
  relationships over three pages, mostly unrelated to the current facts. Extend the
  sentence review to articles and complete node titles after links such as
  `dirige la → La Escala…` and `observa la → Los Battle-Grim…` needed correction.
- 2026-11-01: Review after Ch35: distinguish inherited ancestry, identified inner
  beasts, and demonstrated abilities (Bjarn's oso does not erase Snaka ancestry;
  Biórr's predictions about Breca remain predictions). Review labels/types when a
  reappearance resolves a disappearance, as with Harek's stale `†?` label. Removed
  duplicate search implementation guidance already enforced by the bundled helper.
- 2026-11-01: Review after Ch34: added `scripts/read-links.cjs` for bounded relationship
  lookup. The run hand-wrote an outgoing-only link filter, which could omit incoming
  evidence. The helper matches either endpoint, accepts multiple ids, paginates output,
  and retains source files and broken markers without claiming to resolve the active graph.
- 2026-11-01: Review after Ch33: allow repeated `--id ID` selectors in
  `search-descriptions.cjs`, with per-id excerpt deduplication and one shared page limit.
  Checking Járn required six separate excerpt calls after a multi-id attempt failed;
  the matches were uses of the ordinary word for iron in spells, not a prior character.
  Added a context-check example to distinguish such matches from identities.
- 2026-11-01: Review after Ch32: added guidance for embedded stories that reuse real
  characters' names. Keep fictional actions in the tale, make namesake links explicit,
  and record observed reactions without inferring a change of loyalty. Svik's fable
  required this distinction for Helka, Einar, Frek, and Hákon.
- 2026-11-01: Review after Ch28: added `scripts/match-entities.cjs` and made it the
  recommended targeted-inventory path. The run again printed about 4,100 tokens of
  full inventory despite the Ch27 targeted-output rule. The helper loads all parsed
  nodes, retains historical labels, supports accent-insensitive Unicode-boundary
  matching, and reports candidate ids plus unmatched names. Description/alias fallbacks
  and mandatory full reads for update targets remain unchanged.
- 2026-11-01: Review after Ch27: allow targeted inventory output after the complete
  chapter has been read. Printing the entire grouped inventory consumed about 4,100
  tokens, mostly unrelated names. Still build from every parsed node; print relevant
  matches and explicit unmatched names, check combined labels and spelling variants,
  and retain description fallbacks and full reads for every updated node. Full compact
  output remains the fallback when entity coverage or matching is uncertain.
- 2026-11-01: Review after Ch24: added `scripts/check-chapter.cjs` and moved the
  duplicate/partial-chapter check ahead of larger reads. Searching for the bare number
  24 matched long accumulated descriptions and truncated output. The helper parses
  summary chapter numbers and scans only comment headings, reporting counts and
  bounded line locations without dumping chapter prose.
- 2026-11-01: Review after Ch22: added `--review-links` to the chapter verifier.
  The run hand-built an endpoint-label map to perform the required sentence review;
  the verifier now prints appended relationships using current-book labels and marks
  broken-link removals. This removes repeated review boilerplate while retaining
  the manual check of direction and meaning.
- 2026-11-01: Review after Ch21: search descriptions through a latest-entry map first,
  with bounded, deduplicated excerpts and an earlier-entry fallback for absent names.
  Searching every chapter version repeated the same Vafri and Jaromir context many
  times; latest-per-id lookup removes that noise while the fallback protects against
  historical overwrite mistakes. Full latest-entry reads remain required before edits.
- 2026-11-01: Review after Ch18: require a compact source-label → relationship →
  target-label review of appended links. The structural verifier passed links whose
  verbs described the reverse direction; endpoint validity cannot catch this. Added
  direction examples and explicit wording for links to combined character nodes.
- 2026-11-01: Review after Ch17: group the parsed id/label inventory by id and retain
  every distinct label. The inventory repeated entities for each earlier chapter update,
  wasting output budget without adding matching information. Full latest-entry reads
  remain unchanged.
- 2026-11-01: Review after Ch16: added `scripts/read-chapter.py` for local HTML input.
  Replaces the run's one-off HTML extraction and manual character slicing with bounded
  numbered pages and continuation/end markers. Skips non-content elements and preserves
  inline words, including drop-cap names that separate-data joining had split.
- 2026-11-01: Review after Ch15: distinguish likely update targets from context-only
  references before selecting full-entry read batches. The run read eight pages including
  long Skalk, Vol, and Varg histories that were not updated. Use parsed links or bounded
  excerpts to check retold facts first, while retaining mandatory full reads for every
  updated entry and any context that exposes a new fact or contradiction.
- 2026-11-01: After Ch14, added `scripts/read-latest.cjs` to select latest entries and
  paginate their full text in 10,000-character chunks with explicit continuation markers.
  A manually selected batch of long descriptions still truncated despite the existing
  output-budget guidance. The skill now directs each page into a separate response,
  including when a single accumulated description spans pages.
- 2026-11-01: After Book 2 Ch10, added a unique pre-edit snapshot step (the workspace
  has no Git repository) and made preservation checks explicit for array prefixes and
  accumulated desc/star text. Clarified that output limits apply to a whole batch:
  returning inventories alongside full chapter/data reads caused truncation again.
- 2026-11-01: After Book 2 Ch9, added compact parsed-array inventories and programmatic
  description copying when an exact-line Read tool is unavailable; batching inventory
  with full summaries truncated output during this run.
- 2026-11-01: Retired the separate revelations file and callouts after integrating its
  remaining facts into Book 2 nodes and links. Later-book discoveries now go directly
  into those files with source markers; contradictory claims and inferred identities
  remain qualified rather than becoming confirmed graph relationships.
- 2026-11-01: Added id-inventory-in-one-pass, exact-line-read, combined-id-divergence,
  and unnamed-character guidance, plus a link-integrity check, after Book 2 Ch1 — grepping
  ~30 terms one at a time against `book1/nodes.js` produced truncated output and extra
  round-trips; copying a long `desc` line through bash risked silent truncation; `mord-lif`
  diverged when Mord died; three unnamed characters appeared with no id to mint.
- 2026-11-01: Added multi-line-object and raw-file-truncation notes after Book 2 Ch2 —
  several `grep`-matched lines (e.g. `hijas-orna-ulfrir`, `blod-svarid`, `ilska`) ended at
  `type:` with `desc`/`star` on following lines, so `limit: 1` reads looked empty and had
  to be re-read wider; the chapter's source `.html` file was handed back with a trailing
  `<<ccr:...>>` marker that needed an explicit `caveman_retrieve` to recover the chapter's
  second half before it could be summarized.
- 2026-11-01: Added the whole-file-token-cap note after Book 2 Ch3 — `book2/nodes.js` had
  grown past 25k tokens and a plain `Read` on it was rejected outright, requiring two
  `offset`/`limit` follow-up reads to see the rest of the file before cross-referencing
  existing entries (e.g. `olvir-yrsa`, `skalk`, `hombre-ojos-rojos`) for the chapter's
  revelations.
- 2026-11-01: Added the unfiltered-inventory-grep and name-spelling-variant notes after
  Book 2 Ch4 — pre-narrowing the book1 id-inventory grep to a guessed keyword list missed
  `huld` and `solin`, costing a second grep once the chapter needed them; the chapter text
  spelled an established Norn as "Verdani" (map has "Verdandi") and apparently typo'd
  "Skuld" as "Skáld", both needing manual judgment calls that the skill didn't flag.
- 2026-11-01: Added the revealed-name-in-desc note after Book 2 Ch5 — the chapter named
  "Ilmur" as a returning character, and the label inventory (which only matches `label:`
  values) showed no such label anywhere; a direct grep for "ilmur" found it inside the
  `desc` of the node labeled `Hundur (Thrall)` in book1/nodes.js, where Ilmur's name had
  been revealed in prose without ever changing the node's label. Without that extra grep
  this would have minted a duplicate id for an already-tracked character.
- 2026-11-01: Added the no-browser-available fallback note after Book 2 Ch6 — this
  environment had no browser-automation tool to open `mapa.html` and visually confirm the
  gold ring/panel/tab/callout, so the Verification section now says to report the
  `node --check` + link-integrity checks as what was done and leave the visual check to
  the user, instead of silently skipping it or claiming it was performed.
- 2026-11-01: Refined the token-cap chunk-size guidance and added a same-POV-continuation
  shortcut after a second look at Book 2 Ch6 — `limit: 95` (the number this file already
  suggested) still overflowed by 2-3x when the offset landed inside the chapter-4 block of
  `book2/nodes.js`, because later chapters pack far longer `desc`/`star` text per line than
  the file's early cast-list-style entries; and since Ch6 continued Ch4's cliffhanger with
  no scene break, nearly every node needing an update (Elvar, Uspa, Grend, Sighvat, Huld,
  Orv, Sólín, Skuld, the Vergelmir objects) turned out already clustered in Ch4/Ch5's own
  section, found by grepping the `// CAPÍTULO` comments instead of looking each one up by
  name.
- 2026-11-01: Skill review after Ch9: made parsed inventories the default, corrected
  latest-description selection and multi-file syntax checking, made link failures fatal
  at each book cap, added summary uniqueness/order and append-preservation checks, and
  moved detailed history out of the entrypoint. Clarified duplicate-chapter handling,
  source conflicts, tool availability, and blocked-browser fallback.
- 2026-11-01: Review after Ch11: replaced repeated hand-written verification snippets
  with `scripts/verify-chapter.cjs`, tested against the actual Ch11 pre-edit snapshot.
  Centralizes syntax, per-book endpoint checks, summary order/uniqueness, unchanged
  baseline prefixes, unique appended node ids, and full desc/star preservation; also
  checks the requested chapter number and update metadata. Keeps source review and
  browser verification separate from automated validation.
- 2026-11-01: Review after Ch12: added character-bounded suffix inspection for array
  endings. A line-count tail of three data files included huge accumulated descriptions
  and summaries and truncated the combined output; a 120-character suffix per file
  supplied the needed closing-array syntax without that overflow.
- 2026-11-01: Review after Ch25: required Unicode name boundaries for short-name
  description searches. A substring search for Iva matched ordinary Spanish words
  across many histories and truncated the output; the bounded search returned no
  existing entity and allowed a new id to be created without ambiguous matches.
- 2026-11-01: Review after Ch29: added translated-name matching before description
  fallback (`The Dead Drengr` / `El Drengr Muerto`). Required a compact candidate
  listing before excerpts for common terms and separate responses for link inspection:
  a combined unmatched-name search and link dump truncated despite bounded excerpts.
- 2026-11-01: Review after Ch31: added `scripts/search-descriptions.cjs` after another
  one-off description search truncated despite bounded individual excerpts. The helper
  lists candidates/counts first, retrieves excerpts only for a selected id, paginates
  both modes, uses Unicode name boundaries, and falls back to historical descriptions
  when no latest description matches. Documented literal spelling/accent behavior.
