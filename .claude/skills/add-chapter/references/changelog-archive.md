# Changelog archive

- 2026-11-03: Book Two Ch47 — the legacy summary reversed the tiller handoff
  between Glornir and Æsa. Added giver/recipient/object checks across event, link
  and summary to the legacy-summary cross-check. Source-reviewed chapter content
  corrects the transfer. Fully absorbed into the reprocessing guide; archived
  immediately.

- 2026-11-03: Book Two Ch45 — the legacy summary transferred Orka's private
  vow to Ulfrir and generalized who was deceived by the staged attack. Added
  speaker/addressee checks across remembered dialogue and internal replies,
  and separate collaborator/unbriefed-ally/victim knowledge checks to the
  legacy-summary cross-check. Source-reviewed chapter content corrects both.
  Fully absorbed into the reprocessing guide; archived immediately.

- 2026-11-03: Book Two Ch44 — `--include bjarn` failed despite Bjarn being a
  known entity, because he had no backlog evidence field. Clarified selecting
  includes from the unfiltered backlog index and reading noncandidate profiles
  separately while including their actual clue owners. Fully absorbed into the
  thread gate; archived immediately. No helper behavior changed.

- 2026-11-03: Book Two Ch43 — an exact Bersi name match pointed to the captor
  killed in Book One Ch33, while the source introduces a living shield-dance
  contestant. Added the role/chronology check and separate-id, distinct-label
  procedure to source/entity resolution. Fully absorbed there; archived immediately.

- 2026-11-03: Book Two Ch42 — publication exposed Sterkur's Ch43 introduction
  under the Ch42 section. Added explicit `afterChapter` support to `reconcile-later`,
  retaining before/after, unchanged-record, hash and reviewed-prefix guards. The audit
  records both chapters; a regression proves future endpoints survive composition
  without entering the current chronological context. Corrected only Sterkur's section
  assignment, preserving all node fields and the immutable archive. The entrypoint and
  reprocessing guide now document diagnosis and the audited repair. Fully absorbed;
  archived immediately.

- 2026-11-03: Book Two Ch41 — batched reference reads again exhausted the shared
  outer tool output budget; the thread gate also exceeds a single bounded slice.
  Replaced the one-gate-per-response instruction with 80–100-line slices and explicit
  outer-call isolation. Aligned Book Two's conditional browser-preview instruction
  with the main skill's manual visual-confirmation rule. Fully absorbed into the
  entrypoint and reprocessing reference; archived immediately.

- 2026-11-03: Book Two Ch40 — selecting `--pov ELVAR` because Biórr's profile
  carries that arc pulled 96 backlog candidates across 15 prose pages. Clarified
  viewpoint versus stored arc tags, selecting affected families before page 1,
  and retaining all-POV checklist coverage with `--untagged` plus explicit IDs.
  Fully absorbed into the reprocessing guide and main skill routing.

- 2026-11-03: Book Two Ch39 — the legacy summary transferred Orka's private
  inference about Breca and Bjarn to Uspa, repeated dialogue from Ch38, and could
  promote Halja's outdated conjecture about catching Skalk into current knowledge.
  Added these attribution, chapter-boundary and report-age checks to the existing
  legacy-summary cross-check in `book2-reprocessing.md`. Fully absorbed into that
  procedure; archived immediately. No helper behavior changed.

- 2026-11-03: Book Two Ch26 — documented early sequence and source-path checks
  after the requested Ch28 path was missing and the checkpoint was at Ch25.
  Added guidance for overlapping POV accounts and for checking whether a death
  changes an earlier promise. Both review findings are covered in the active gates.

- 2026-11-03: Book Two Ch18 — searching reference descriptions for
  `CAPÍTULO 18` also returned Book One history. Documented full book-and-chapter
  source markers for chapter-specific discovery in `book2-reprocessing.md`.
  Post-publication checks also caught a legacy Halja→Lif direction assertion that
  passed against the previous live archive. Confirmed the source-reviewed Lif→Halja
  relationship and updated the test to require the chapter's reviewed links and exact
  supported individual endpoints. Added the live-archive integration/profile/focus
  checks after publication because pre-publication tests cannot exercise the new live
  replacement. Fully absorbed into the reference/test; archived immediately. No helper
  behavior changed.

- 2026-11-03: Book Two Ch17 — `Dark of Moon` missed the existing
  `Dark-of-Moon Hills` label and required another lookup. The entity matcher now
  treats whitespace and hyphens/Unicode dashes as equivalent, retaining accent-insensitive matching,
  Unicode whole-name boundaries, literal other punctuation, historical labels and
  book caps. Documented in the source/entity workflow and tested with isolated
  fixtures, including negative substring/concatenation cases and non-mutation.
  Fully absorbed into the helper/reference; archived immediately.

- 2026-11-03: Book Two Ch16 — corrected the summary reference’s relative link to
  `source-and-entity-workflow.md`. The required regression suite passed 59 tests but
  its default TAP output truncated a tool response; the Book Two workflow now uses
  Node’s compact dot reporter, checking exit status and rerunning failures with the
  spec reporter for diagnostic details.
  Both documentation fixes were verified and are recorded in the archive; no helper
  behavior changed.

- 2026-11-03: Book Two Ch14 — final link review caught participles agreeing with
  implied scene nouns rather than the actual verb-phrase titles; corrected labels
  through `--replace-applied` and added a concise pre-draft agreement example to
  `SKILL.md`. Completion also rejected `Chapter 14 — Biórr:` because its guard
  requires the exact `Chapter N: ` prefix and no newline; made that contract
  explicit in `book2-reprocessing.md`. Both fixes are fully absorbed here and
  archived immediately; no helper behavior changed.

- 2026-11-03: Book Two reprocessing Ch9 — the 83-candidate backlog selection
  required twelve pages with repeated JSON formatting. Added optional `--compact`
  to the existing reader, preserving every selected field while removing indentation.
  The actual final chronological-context selection drops from 95,612 to 91,915
  characters (3.9%; still twelve pages), with decoded data identical. Default JSON
  and index behavior stay compatible. Regression coverage checks complete Unicode,
  quotes/newlines, multi-page evidence, cross-POV selection, empty results and invalid
  options/pages; all eleven affected reader/integration tests pass. Documented stable
  formatting across pages and separate index use in the entrypoint and workflow
  references; fully absorbed and archived immediately. The standard skill validator
  remains unavailable because PyYAML is missing; Ruby YAML, local references and
  JavaScript syntax were checked instead.

- 2026-11-03: Book Two reprocessing Ch8 — the prior chapter's recorded temporary
  run no longer contained its checklist, demonstrating that completion evidence can
  disappear with OS cleanup. `finish-chapter` now retains the three semantic reports,
  checklist, completion spec and optional batch manifest under
  `book2/rebuild/reviews/chapter-N/`, records their hashes in progress and includes
  them in the publication transaction. Existing evidence blocks overwriting. Chapter
  8's still-available evidence was archived after completion; earlier missing reports
  were not recreated. Regression coverage checks exact bytes/hashes, survival after
  temporary-file removal and collision refusal without live publication. All 53
  chapter suites passed; the 10 affected reprocessing/integration tests passed after
  the change. Guidance is fully absorbed in `book2-reprocessing.md` and the launcher;
  archived immediately. PyYAML remains unavailable for the standard skill validator;
  Ruby YAML frontmatter, local reference and JavaScript syntax checks were used.

- 2026-11-03: Book Two reprocessing Ch7 — Lif renews a previously completed
  training goal. Confirmed that `data-core.js` permanently suppresses an exact
  source/target/label key once broken, so re-adding `incluye` would leave the thread
  undiscoverable. Documented scope-preserving reopening, pair-history inspection,
  a distinct meaningful category label and merged-graph verification in
  `review-gates.md`. The existing broken marker remains historical. Also replaced
  a failing legacy Elvar `desc.length > 29000` assertion with exact latest-source
  preservation and a deliberately long fixture; documented this regression repair
  in `book2-reprocessing.md`. All 53 required tests pass. Fully absorbed into the
  workflow references and test; archived immediately.

- 2026-11-03: Book Two reprocessing Ch6 — source pagination split “continued”
  across pages, making the boundary harder to read. `read-chapter.py` now prefers
  a paragraph boundary in the latter half of each bounded page, then whitespace,
  and hard-splits only when neither is available. Separators and all source text
  are preserved exactly. Documented the at-most-10,000-character contract; four
  regression tests cover extraction/hidden content, lossless paragraph and word
  boundaries, Unicode, overlong tokens and invalid pages. Fully absorbed in the
  helper and source workflow; archived immediately.

- 2026-11-03: Book Two reprocessing Ch5 — guessed event IDs missed the existing
  `plan-likrafa-nastrandir`; a candidate-only reference search for participant `Myrk`
  found it. Added that discovery sequence to `book2-reprocessing.md`: participant
  candidate search, label/id confirmation, minimal scene excerpt, then stop and draft
  from the supplied source. A failed guessed-id match is not evidence of event absence.
  Fully absorbed into the workflow reference; archived immediately.

- 2026-11-02: Book Two reprocessing Ch3 — final review corrected an internal dream
  recollection drafted as a spoken report, and goal planning reused Lif's existing
  Guðvarr revenge thread for the oath over Mord rather than splitting one continuing
  objective. Added concise narration/testimony and renewed-vow identity checks to
  review-gates.md, retaining the separate Torvik vengeance goal. Fully absorbed in
  the shared review rules; archived immediately.

- 2026-11-02: Book Two reprocessing Ch1 — relationship checks retrieved unrelated
  endpoint history, while the source workflow's raw-grep shortcut named the live book
  file despite chronological-context isolation. Added parsed `read-links --between ID ID`
  with both directions, broken markers, book caps, explicit absence and validated options.
  Documented launcher usage in the source workflow and reprocessing reference; regression
  tests cover pair selection, reverse edges, removals, caps and malformed input. Fully
  absorbed in the helper and references; archived immediately.

- 2026-11-02: Post-Ch51 skill review — ORKA and VARG both required full backlog
  review, but a second `--pov` was rejected; separate reads repeated every untagged
  clue (16 pages in total). The reader now accepts distinct repeatable `--pov`
  options and emits one ordered union, retaining untagged clues and explicit
  inclusions once. Duplicate/invalid selections still fail; the unfiltered checklist
  remains mandatory. Added union/index, overlap and lossless multipage regression
  coverage; documented the combined command in review-gates.md. Fully absorbed
  into the script and workflow reference; archived immediately.

- 2026-11-02: Post-Ch50 skill review — the unrepresented-POV shortcut lacked a
  prose-selection command. Added `read-backlog --pov ORKA|VARG|ELVAR` with all
  untagged candidates retained, repeatable validated `--include ID`, explicit omitted
  counts and pagination reminders. The unfiltered index/checklist still cover every
  candidate. Documented that Drekr represents ORKA in Ch50, so the complete ORKA
  backlog is required too; including only Drekr is insufficient. Regression coverage
  checks arc/group selection, untagged retention, cross-POV inclusions, invalid
  options and lossless pagination. Fully absorbed in scripts and review-gates.md;
  archived immediately.

- 2026-11-02: Post-Ch45 skill review — the run individually assessed 115 checklist
  candidates, then copied every row into Markdown as well. The thread gate now makes
  the companion checklist the preferred complete per-id record, with a shorter
  `thread-review.md` covering new evidence, closures, link changes and all POVs.
  Full backlog reading, item-specific assessments, archive updates, sync/check and
  PASS remain required. Two additional reference searches (a confirmed event for
  `rechaza`, and a confirmed character profile for its own name) returned no useful
  evidence; the rebuild workflow now stops retrieval after identity is established
  and reserves reference prose for unresolved distinctions. Fully absorbed into
  the workflow references; archived immediately.

- 2026-11-02: Post-Ch44 skill review — the camp-conversation EVENTO initially omitted
  Ilmur's naming although his profile and the summary captured it; fixed through
  manifest replacement after the regression suite had already passed, then reran
  the entire suite for the prose correction. The event gate now checks each important
  disclosure against the shared event's actual text before applying the manifest.
  Verification guidance now places regression tests after content review and limits
  repeat runs to changes affecting covered behavior or unresolved concerns; chapter
  verification and affected semantic reviews still follow every edit. Fully absorbed
  into the event gate and main verification instructions; archived immediately.

- 2026-11-02: Ch43 skill optimization — replaced manual addition of new checklist
  candidates with `review-backlog ... sync CHECKLIST.json`. It preserves existing
  notes and baseline-only clues, creates correctly shaped pending rows, and resets
  assessments when evidence fields expand. Wrong-run metadata, duplicate IDs and
  unknown IDs fail without writing; unchanged syncs preserve file bytes. Same-field
  prose changes still require manual review. Tests and thread-gate instructions
  cover the behavior; fully absorbed into the helper and workflow references.

- 2026-11-02: Book 1 rebuild Ch43 — a manually added checklist row used `fields:
  ['TRAMA']`, confusing the backlog index marker with the checklist's evidence fields.
  The checker caught it; corrected to `['desc']`. The thread gate now explicitly
  documents `desc`/`star` for new rows. Fully absorbed into that reference.

- 2026-11-02: Post-Ch42 skill review — corrections to generated nodes/links hit quote-style
  and globally repeated label anchors even though the workflow already warned about
  them. Added `append-chapter --replace-applied PREVIOUS_SPEC`: reproduce the exact
  applied manifest before replacing the chapter suffix from the original baseline,
  validate in scratch, detect intervening edits and roll back to the prior draft on
  caught publication failure. Wrong specs, hand edits, changed baselines and later
  chapters fail without publishing; the rebuild launcher resolves caller-relative
  previous-spec paths and rejects completed chapters. Regression tests cover these
  cases, repeat revisions, Book Two accumulation and rollback. Instructions now prefer
  manifest revision and require renewed semantic reviews; fallback anchors are scoped
  to the current section. Fully absorbed into scripts and workflow references.

- 2026-11-02: Post-Ch41 skill review — corrected the remaining abbreviated rebuild
  launcher path in the main skill to `.claude/skills/add-chapter/scripts/rebuild.cjs`.
  Added a reference-only combined-character lookup rule: a clear label plus current
  source establishes membership without reading a whole future profile; ambiguous
  membership uses a bounded name/kinship excerpt. The Ch41 full `halja-vali` read
  exposed later casualties despite membership already being clear. Staged update
  targets still require complete latest-entry reads. Both fixes are fully absorbed
  into the entrypoint and rebuild reference; archived immediately.

- 2026-11-02: Post-Ch40 skill review — reconciling 109 backlog candidates against
  grouped prose required manual ID bookkeeping. Added `review-backlog.cjs` to generate
  pending per-ID assessments and check coverage against both baseline and current
  candidates, retaining clues removed by later revisions and requiring newly introduced
  candidates. The full reader and checklist share one selector. Missing/duplicate IDs,
  wrong-run metadata and unfinished assessments fail; semantic interpretation, subclue
  coverage and all three review attestations remain manual. Added staged launcher path
  handling, reference-write rejection, regression tests and gate instructions. Fully
  absorbed into the scripts and workflow references; archived immediately.

- 2026-11-02: Post-Ch38 skill review — readiness checking required a custom script
  to compare completed chapters with README logs, and a combined README/progress read
  truncated as the chronological log grew. Rebuild `check-chapter` now validates the
  consecutive progress list, exact log sequence, latest source and README header,
  printing only the completion count and next chapter before the existing chapter
  presence report. Completion uses the same metadata validator to prevent rule drift.
  Added regression coverage for missing/duplicate logs, stale headers/sources,
  nonconsecutive progress, unchanged files and reference-mode inspection. Fully
  absorbed in the helpers and rebuild procedure; archived immediately.

- 2026-11-02: Post-Ch35 skill review — another initial whole-file read truncated the
  925-line entrypoint despite its bounded-read warning. Moved the source/entity/append
  procedure and three semantic gates into mandatory linked references, preserving their
  text and updating relative links and rebuild routing. The entrypoint retains mode
  selection, explicit completion gates, formats and verification. Also changed canonical
  event lookup to try the named venue/object and its established translation before
  generic description terms: guessed `Combate con Drekr` missed the canonical venue
  title, while `taberna`/`caballo` exposed unrelated future labels in Ch35. Fully absorbed
  into the workflow references and rebuild instructions; archived immediately.

- 2026-11-02: Post-Ch34 skill review — completion again required a temporary script
  to check review files and synchronize README/progress. Added the rebuild-only
  `finish-chapter` helper with ordered history/header/source checks, all three review
  attestations, baseline/staged summary checks, fresh verifier/live-hash gating,
  preserved metadata, retry rejection and rollback on caught write errors. Added
  focused tests and documented the command/schema. Also narrowed canonical event
  lookups to distinctive action/object wording after an unnecessary reference search
  for already-confirmed participants exposed later labels. Fully absorbed in the
  helper and rebuild instructions; archived immediately.

- 2026-11-02: Post-Ch33 skill review — the initial full skill/other-skill dump
  truncated, the rebuild routing's "instead of this file" obscured which shared gates
  still applied, a generated 95-row backlog assessment defaulted most candidates to
  identical "unchanged" boilerplate, and a collateral reference event match led to an
  unnecessary full read of later combat. Added an upfront bounded reading/index command,
  clarified shared versus rebuild procedures, required pending assessment templates and
  item-specific clue classification, and bounded collateral reference-event inspection.
  These changes are fully absorbed in SKILL.md and book1-rebuild.md; archived immediately.

- 2026-11-02: Post-Ch32 skill review — applying 17 node specs, links and a summary
  required another temporary Node loop and a separate parsed-count script. Added
  `append-chapter.cjs BOOK CHAPTER BASELINE SPEC` with a single manifest, scratch
  preparation through the existing appenders, per-id count checks, normal verification
  before publishing, stale-baseline/retry rejection, and restoration on caught write
  errors. The rebuild launcher resolves both paths, checks live hashes and supplies
  staged mention matching. Semantic review and progress updates remain separate.
  Tests cover preservation, late failures, verification failures, retries, later books,
  empty changes and staged/reference isolation. Fully absorbed into the helper and
  skill; archived immediately.

- 2026-11-02: Book One Ch30 — inventory matching accepted `Svik` as a candidate
  for `svik`, but the staged summary matcher rejected that short name because the
  canonical label is `Svik Hrulfsson` and no short-name guide alias is loaded.
  Corrected the summary and documented the distinction between inventory candidates
  and rendered mentions, using existing canonical names rather than changing archive
  identities or adding aliases to accommodate prose. Fully absorbed in SKILL.md;
  archived immediately.

- 2026-11-02: Book One Ch29 — guessed `cat-objetos` and `cat-lugares` endpoints
  failed verification because those category nodes do not exist in the staged archive.
  Replaced them with confirmed `cat-magia` and `cat-mundo` endpoints. Added an explicit
  pre-drafting category-id check to the link instructions; fully absorbed and archived.

- 2026-11-02: Post-Ch26 skill review — the final ownership pass reprinted about
  50,600 characters of complete entries after their baseline histories had already
  been audited and verified unchanged. Added verifier `--review-nodes=PAGE`: full
  new nodes, exact desc/star additions and before/after metadata changes, paginated
  at 10,000 characters, emitted only after normal checks pass. The chapter-26
  report is 18,596 characters across two pages. The skill permits this review
  only after a complete baseline audit in the same run, requiring full-entry
  reads when earlier evidence must be reconsidered or an ownership issue is
  suspected. Added tests for preservation failures, complete new entries, changed
  and removed metadata, lossless pagination and invalid pages. All eight focused
  verifier/launcher tests and the real staged chapter verification pass. Fully
  absorbed into the verifier, tests and workflow; archived immediately.

- 2026-11-02: Post-Ch25 skill review — the run rewrote the routine links/summary
  insertion script because only nodes had a bundled appender. Added
  `append-entries.cjs BOOK links|summaries SPEC_FILE`, preserving original bytes before
  the array terminator and all parsed entries, validating basic fields/syntax before
  writing, and rejecting duplicate/out-of-order summary chapters without mutation.
  The rebuild launcher resolves spec paths from the caller and rejects reference-mode
  writes. Updated live/rebuild examples and added five regression tests covering
  preservation, omitted final commas, later-book variables, broken links, invalid input
  and staged isolation. All 11 focused appender/launcher/verifier tests pass. Fully
  absorbed into the helper and workflow documentation; archived immediately.

- 2026-11-02: Post-Ch24 skill review — documented how to preserve a historical
  death claim while recording later uncertainty without asserting survival or
  resurrection, including source-availability limits and current labels/threads.
  The rebuild completion instructions now update and cross-check README's completion
  header, chapter log and progress.json together; the Ch24 preflight found the header
  stale at Chapter 21 even though log and progress already included Chapter 23.
  Fully absorbed into SKILL.md and references/book1-rebuild.md. Moved the fully
  absorbed Ch22/Ch23 identity-handling entries here from the active changelog.

- 2026-11-02: Book 1 rebuild Ch23 — "Broðir" (Elvar's younger brother) is literally the
  Old Norse word for "brother," used by the author as if it were his actual name:
  capitalized every time, addressed directly, quoted with his own lines, and
  distinguished from his brother Thorun, who already has a conventional name. No
  existing rule distinguished this from the already-documented `Maður` case (a generic
  word with no node at all); reasoned in-session from the pattern of signals above
  (capitalization, direct address, individual stake) before minting `brodir`. Fixed
  directly in SKILL.md (step 2d, new fourth case) — now absorbed there, not just here.
- 2026-11-02: Book 1 rebuild Ch22 — Vafri (Sigrún's thrall since Ch10, named only on
  death in Ch22) was the first case this rebuild hit of a recurring character tracked
  anonymously across several earlier chapters' *other* entries (sigrun, mord, virk)
  finally getting a name. No existing rule covered whether to retrofit the name into
  those earlier chapters' accumulated entries; reasoned in-session that doing so would
  rewrite history the full-overwrite rule exists to preserve, so the new node's own desc
  carries a backward cross-reference by chapter number instead. Fixed directly in
  SKILL.md (step 2d, new third case alongside near-miss spellings and combined legacy
  ids) — now absorbed there, not just here.
- 2026-11-02: Event-coverage correction after Chapter 15 — profiles, summaries and
  TRAMA nodes had preserved important occurrences without EVENTO nodes under
  EVENTOS CLAVE. Added the mandatory key-event inventory/coverage review, direct
  active category linkage, event-versus-question distinction and historical-backfill
  preservation procedure. The chapter verifier now rejects added/updated events with
  absent or retired category links, accepting either endpoint direction; regression
  coverage tests both cases. Backfilled 15 event identities into the chronological
  Chapters 1–15 rebuild, retaining original objects, summaries and live hashes.
  Source XHTML was unavailable; the durable `book1/rebuild/event-review.md` limits
  coverage to chapter-marked archived evidence. All 31 targeted tests pass. Fully
  absorbed into the skill, verifier, regression checks and event audit.

- 2026-11-02: Post-Ch15 skill review — Breca’s unfulfilled swordcraft request and
  Mord’s revenge vow were caught only in the final lifecycle pass. Added a pre-spec
  question/goal draft to the existing thread-review record, explicitly covering quiet
  requests, vows and agreed plans. Summary identity review had required a one-off
  matcher script despite verifier success; added `--review-summary` to print each
  distinct emphasized term’s resolved label/id, documented it in live and rebuild
  commands, and added regression coverage distinguishing Froa from Froa-espíritu.
  Five verifier/launcher tests and Chapter 15 verification pass, including all 16
  intended summary identities and unchanged live hashes. Archived immediately because
  both fixes are fully absorbed into the skill and verifier.

- 2026-11-02: Post-Ch12 skill review — collecting every POV's TRAMA and star backlog
  required an ad hoc query whose first attempt used `nodesBook1` instead of Book One's
  `nodes`. Added `read-backlog.cjs BOOK PAGE`, available through the rebuild launcher,
  to select latest revisions and paginate all TRAMA descriptions and nonempty star
  fields without inferring states or hiding closed history. Documented source/context
  follow-up reads and the updated regression command. Tests cover book caps, revision
  precedence, closed/thematic candidates, lossless pagination, invalid arguments and
  staged isolation; all 28 targeted tests pass. The staged archive smoke check returned
  all 33 expected candidates across two pages. Archived immediately because the fix is
  fully absorbed into the helper, skill and rebuild reference.

- 2026-11-02: Post-Ch9 skill review — moved complete chapter retrieval before entity matching; defined a unique run directory for baseline and spec files, replacing the undefined scratchpad and contradictory `/tmp/spec.json` guidance; documented the exact rebuild regression command using `tests/chapter-verifier.test.cjs` and its three expected tests. Fully absorbed into SKILL.md and the rebuild reference.

- 2026-11-02: Book One Ch9 — the reference Oskutreð label had a pronunciation suffix after its parenthetical subtitle, preventing the summary matcher from resolving the short name. Used the canonical name and parenthetical subtitle without the suffix in the new staged node; added this exact label-format rule to SKILL.md. Chapter verification now resolves all 21 emphasized terms. Archived immediately because the fix is fully absorbed into the skill.

- 2026-11-02: Book One Ch6 skill review — a combined instruction read truncated,
  reference matching repeated already-confirmed identities and exposed later labels,
  and live-file hashes required a one-off script. Added bounded instruction reads,
  restricted reference matching to unresolved identities, and made rebuild verification
  check all six recorded live hashes automatically, rejecting missing hashes or changed
  files. The launcher regression test covers each live file and missing-hash rejection;
  all 14 targeted tests and Chapter 6 verification pass. These fixes are fully absorbed
  into the skill, rebuild reference and launcher.

Entries moved here on 2026-11-01 (after Ch37) because their fix is now fully and
verbatim present in `SKILL.md` or a bundled script — rereading the entry below teaches
nothing beyond rereading the current skill file. Kept verbatim (including original
dates) for deep history; `references/changelog.md` keeps only recent entries and any
entry describing a still-open/unresolved issue in the actual data files. If a rule here
is ever challenged or a bundled script changes, this is where the "why" lives.

- 2026-11-01: Book 2 Ch48 — "Gudrun" (Hákon's personal drengr) surfaced only via
  `search-descriptions.cjs Gudrun`, which found her named inside the `gudvarr`/`hakon`/
  `dead-drengr` entries but not inside her own `gudrun` node's desc (which never repeats
  her own label as text). Concluded from that she had no node yet — matching
  `read-links.cjs` output even showed two existing links with endpoint `gudrun` — but
  instead of re-running `match-entities.cjs Gudrun` (which matches ids/labels directly
  and would have found her immediately), hand-grepped `id: 'gudrun'` with single quotes
  against a double-quoted source file, got a false "not found", and called
  `append-node.cjs` with `mode: "new"`. The script's own existence check refused the
  write (no corruption — a real safety net), surfacing the real state before any damage.
  Fixed by switching to `mode: "update"` to append the Ch48 material onto her real Ch46
  baseline. SUPERSEDED after a direct post-Ch48 skill review: this specific note (re-run
  match-entities for a name found only inside another entity's description) is now step
  2c of SKILL.md's consolidated entity-resolution checklist, alongside six other
  incidents (Ilmur, Iva, Verdani/Skuld, Dead Drengr translation, Járn, Úlfhéðnar) that
  used to live as separate prose caveats in the same section.
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
- 2026-11-01: Book 2 Ch46 — the SKILL.md example for translated names claimed
  `match-entities.cjs` would resolve `The Dead Drengr` against `El Drengr Muerto`
  itself; it doesn't — it returned UNMATCHED, same as any other untranslated name,
  since it only does accent-insensitive literal matching, not translation. The
  instruction's own example was misleading about which step does the work. No script
  change needed (`search-descriptions.cjs` already finds it fine, since an English
  name matches fine against Spanish excerpt prose); reworded the SKILL.md passage to
  say the recognition is manual/story-knowledge, confirmed via search-descriptions,
  not something the matcher does for you.
- 2026-11-01: Book 2 Ch42 — asked directly what to improve, and the honest answer was
  about my own conduct: despite the two entries below already flagging the retyping risk
  and recommending a script, I appended Ch42's `desc`/`star` text by reading
  `read-latest.cjs`'s output and retyping the baseline by hand into `Edit` calls anyway —
  `verify-chapter.cjs` happened to PASS, but that's catching the risk after the fact, not
  removing it. The pattern (one-off Node script via `vm`, extract baseline, append,
  write) had already been hand-rolled at least three times (Ch6, Ch38, Ch40 below) and
  skipped once (this run) — a sign the workaround belongs in a bundled script, not a
  reminder. Added `scripts/append-node.cjs`: takes a book, an id, and a small spec file
  with only the genuinely new text (`descAppend`/`starAppend`/`previousState`, or full
  fields for a brand-new id); it reads the existing baseline straight from the data file
  via the same `vm`-eval technique as the other scripts, splices the new entry in before
  the closing `];`, and runs `node --check` before exiting — so the baseline text never
  passes through the agent to be regenerated at all. Updated `SKILL.md` to point to it
  everywhere the old "copy programmatically" prose note lived.
- 2026-11-01: Book 2 Ch40 — two small frictions, both resolved without needing a script
  change. (1) Locating the end of `book2/links.js` by grepping the box-drawing header
  format (`// ── LIBRO 2, CAPÍTULO N — POV ──`) found a match only up to Ch24; Ch36/38/39
  use a plain `// LIBRO 2, CAPÍTULO N — POV` comment (no box-drawing, no em-dashes) in the
  same file, so the last-chapter lookup needed a second, looser grep. Worth checking both
  header styles (or just taking the file's last `CAPÍTULO` match regardless of exact
  punctuation) before concluding where a book's last section ends. SUPERSEDED: this is
  now `check-chapter.cjs`'s job — its heading regex matches any `//` comment containing
  `CAPITULO N` regardless of box-drawing or punctuation, so header-style variance no
  longer needs a manual second grep. (2) Read with even a 44-line offset/limit on
  `book2/nodes.js` failed with a 25000-token-exceeded error — individual `desc` strings
  are now long enough that small line windows are not a safe fallback; went straight to
  a Node script (via `vm`) reading the file and extracting the needed ids' latest
  `desc`/`star` into JSON, same programmatic-copy approach the skill already recommends,
  then built the new chapter's entries by string-appending to that JSON in a second
  script and verified with `verify-chapter.cjs` (PASS). SUPERSEDED: this is now
  `read-latest.cjs`'s job.
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
- 2026-11-01: Added the new-entry-per-chapter note after Book 2 Ch7 — edited Orka's
  existing Chapter 1 node entry in place to append Chapter 7 content, which works at
  runtime (she only had one book2 entry so far) but broke the file's own convention, used
  by every multi-chapter id (`mord-lif`, `glornir`, `skalk`...), of adding a fresh node
  object per chapter rather than mutating a prior chapter's entry. Caught it by reading
  `mapa.js`'s merge loop (`Object.assign` per same-id entry, in array order) before it
  propagated to the other six nodes touched that chapter.
- 2026-11-01: Added the narrow-grep note after Book 2 Ch8 — checking ~20 already-known
  ids' latest state across book1/book2 with a plain `grep -n "id: 'a'\|id: 'b'\|..."`
  (no `-o`) dumped the full multi-thousand-character `desc` line per match, exceeding the
  condensation threshold and costing an extra `caveman_retrieve` round-trip for content
  only needed to locate line numbers. SUPERSEDED: this is now `read-latest.cjs`'s job —
  it takes a list of ids directly and paginates the result, no grep needed.
- 2026-11-01: Book 2 Ch47 — checking whether "three ships ambushed the Sea-Wolf, Bloodsworn
  searched beaches/seabed" (a detail recounted secondhand by Røkia) already had its own
  event node, I reached for plain `grep -n "phrase1\|phrase2\|phrase3"` across `book2/nodes.js`
  instead of `search-descriptions.cjs`. Each call returned 200KB+ of output because the
  match landed inside Orka's single-line accumulated `desc`, dumping the whole line twice.
  `search-descriptions.cjs` already supports arbitrary literal phrases (not just candidate
  names) and paginates at 8,000 characters — it would have avoided this entirely. ARCHIVED
  2026-11-02: the fix is now the explicit "never raw grep" note in SKILL.md step 2b, and
  held clean through Ch49 and Ch50 with no recurrence.
- 2026-11-01: Post-Ch48 skill review (asked directly, not the per-chapter friction check):
  scanning the full changelog archive, step 2 (entity resolution) turned out to be the
  single most-patched part of the skill — Ilmur, Iva, Verdani/Skuld, Dead Drengr
  translation, Járn, Úlfhéðnar, and Gudrun (the Ch48 entry above) are seven separate
  incidents, all in the same ~90-line prose block, each fixed by appending one more
  caveat. Restructured step 2 into an explicit ordered checklist (match-entities →
  search-descriptions → re-run match-entities for names found only inside *other*
  entities' descriptions → mint-with-near-miss-checks), preserving every example and
  caveat's substance but making the decision order explicit instead of requiring all
  seven to be held in mind at once. ARCHIVED 2026-11-02: the restructured step 2c is the
  full fix, and Ch49/Ch50 raised no new entity-resolution confusion.
- 2026-11-02: Book 2 Ch49 — appending the new link/summary section to the tail of
  `links.js` and `summaries.js` via `Edit`, an `old_string` built from the last entry's
  closing `},\n];` (copied at the same 4-space indent used by every other entry in the
  file) failed to match twice in a row with no visible reason in the Read output. A
  `python3` byte-level read of the file tail showed the actual closing brace before the
  final `];` had *zero* leading spaces — an inconsistency from how an earlier chapter was
  appended, invisible in Read's line-numbered rendering because the gap is only one
  tab-stop wide. Fixed by shortening `old_string` to the last few words of the summary
  text plus the literal `},\n];` with no assumed indentation. ARCHIVED 2026-11-02:
  generalized together with the Ch50 quote-style entry below into one `SKILL.md` note
  (step 2, near `append-node.cjs`) covering both — never anchor `old_string` on a file's
  closing `},\n];` using indentation or quote style read from `Bash`/a guess; build it
  from `Read` instead.
- 2026-11-01: Book 2 Ch45 friction — `read-links.cjs 2 1 bloodsworn glornir berser oskutred`
  (checking whether Elvar had ever hired the Bloodsworn before) returned 140+ links across
  3 pages, almost all unrelated Book 1 history, because `bloodsworn`/`oskutred` are
  themselves hub ids with huge histories, not just POV ids. Switched to a direct
  `grep -n "'elvar'" book2/links.js | grep -i "bloodsworn"` for the single pairing I
  actually needed, which answered it in one bounded call. Added the fix directly to
  `SKILL.md`'s read-links guidance (step 3) so the next run greps a specific pairing
  instead of reaching for the paginated tool. Separately, drafting Sighvat's chapter
  append I misattributed Orv the Sneak's self-introduction line to Sighvat (both are
  minor characters introduced in the same paragraph of Elvar's crew) — caught only by
  rereading the source chapter text against my own draft before running verify, not by
  any tool. No generalizable fix identified; a careful re-read against source text before
  appending is the existing safeguard and it worked here.

- 2026-11-02: Book One Ch2 — several helper/read calls failed after mixing project-root paths with the staged working directory. Added the absolute-project-root/helper/input-path rule to SKILL.md; staged data paths remain relative to the staging directory.

- 2026-11-02: Book One Ch3 was initially routed to the live archive despite the active rebuild. Reverted those edits and processed the staged chapter. SKILL.md and the rebuild reference now require checking progress.json before Book One preflight and defaulting to the incomplete rebuild unless the user explicitly selects live data.

- 2026-11-02: Book One Ch4 rebuild ran its first preflight against the live archive and later attempted a root-relative progress path from the staging directory. Existing prose already warned against both errors. Added `scripts/rebuild.cjs` to pin helper execution to staged/reference data without caller directory changes, supply Book One automatically, resolve spec/baseline paths before launching, print the selected archive, and reject reference-mode writers. Updated SKILL.md and the rebuild procedure to use it. Verified staged preflight, reference matching from `/tmp`, reference-write rejection, and Chapter 4 verification through the launcher. This fix is fully incorporated in the script and procedure.

- 2026-11-02: Book One Ch5 required a hand-built summary mention check, which caught an unresolved “Battle-Grim” reference in the guide-free preview. Integrated complete emphasized-term matching into `verify-chapter.cjs`; `rebuild.cjs` selects staged empty guides automatically. Documented the check in the skill and rebuild procedure; regression tests cover canonical names, unsupported aliases, partial matches and live-guide behavior.

- 2026-11-02: Book One Ch7 — `trolls` missed the already-staged `Trol` label,
  causing an unnecessary reference lookup before the compact inventory confirmed it.
  Added singular/plural and translation retries before reference escalation. The run
  also used direct file parsing to append links/summaries because this runtime lacks
  the skill’s named `Read`/`Edit` tools; documented the asserted trailing-array insertion
  fallback with JSON serialization and syntax checks. Both fixes are fully incorporated
  in SKILL.md.

- 2026-11-02: Chapter 7 summary links for Arañas del Hielo and Trol resolved correctly but could not open: focus.js spread missing protagonist arrays from the rebuild preview’s empty CHARACTER_KEY_LINKS, aborting viewer initialization. Defaulted those arrays to empty and added regression tests for startup with empty guides and both creature targets with relationships. The skill now includes connection-viewer tests in rebuild verification.

- 2026-11-02: Book One Ch8 — the summary matcher strips trailing parentheses from labels. Both `Althing` and `Alþing (Althing)` failed the staged verifier; `Alþing` passed. Added this concrete naming rule to SKILL.md; matcher behavior is unchanged.

- 2026-11-02: Post-Chapter 10 skill review found remaining loader documentation drift: references to `mapa.js`/`Object.assign`, reading-cap protection, automatic new-book discovery, and a gold ring for Book One additions no longer matched the implementation. Updated SKILL.md to name `data-core.js`, describe the full live archive, require registration in `data-init.js`, and distinguish `book > 1` styling from Book One rebuild additions. Fully incorporated in the skill; no runtime or chapter data changed.

- 2026-11-02: User identified Wave-Jarl specifications stored in the rebuilt Drakkar definition. Moved its steering/fittings details into both Wave-Jarl revisions, retained the existing fifty-oar information there, and reduced Drakkar, Snekkja and Byrðingr to type definitions. Arrival and port details remain in Guðvarr/Fellur and their existing links. Added the definition/instance distinction and propagation rule directly to SKILL.md. Live/reference archives remain unchanged.

- 2026-11-02: User clarified that the definition/instance error extends to Níðing, Vaesen and other terminology. Audited 27 glossary concepts across the staged archive, removed scene recaps from their definitions, and retained specific observations in character/event/place histories. Separated the Fellur assembly, two family farms and the fell-wolf encounter from their generic terms; repointed scene relationships and preserved chronological revisions. Strengthened the existing skill rule to cover all terminology, customs and species, require a class-wide review after this error, and keep named demonstrations outside definitions. Live/reference archives remain unchanged.

- 2026-11-02: User identified the same ownership error in Berser and Snakavik after the terminology cleanup. Reviewed deity and place profiles: moved Berak’s transformation and Elvar’s reaction out of those profiles (already retained in their character histories), reduced incidental scene recaps, kept attributed mythology and actual geographic/local facts, and preserved Iskidan arrival observations in Varg’s history. Added a subject-ownership rule covering all nodes, explicitly including named gods and places. Corrected 33 revisions across 20 subjects; links, summaries, original revision order and live/reference archives are unchanged.

- 2026-11-02: At the user’s explicit request, promoted fact ownership from descriptive guidance to a HARD process gate for chapter additions, reference integrations and repairs. Requires pre-write review of proposed facts and complete touched baselines, relocation and propagation of misplaced facts, post-write entry/link review, and a PASS record in the run directory before progress or completion. The rebuild procedure explicitly requires the same gate. Syntax/endpoint verification cannot waive semantic review. Fully incorporated in the skill and rebuild procedure.

- 2026-11-02: User reaffirmed separate Mord and Lif identities for future connections. Split the staged Chapter 10 combined node into `mord` and `lif`, distributed supported shared facts and relationships to both, added their sibling connection, and split the summary emphasis into independently resolved names. No unidentified son’s speech is assigned to either brother. Replaced the skill’s explicit keep-combined instruction and combined-endpoint example with separate-identity rules. Legacy live/reference IDs remain for final reconciliation.

- 2026-11-02: User identified that staged TRAMAS ACTIVAS covered only Orka-side questions. Added six TRAMA nodes (eight chronological revisions) for Varg’s planned akáll/revenge, bag and origins/memory, and Elvar-side past/return, burned object and Berak’s pending sale, with 26 chapter-grounded relationships. Category-only links to character nodes were insufficient because the relationship viewer excludes structural categories and its plot filter requires TRAMA nodes. Connected threads directly to their POV participants and the shared category; added a plot-filter regression and POV coverage to mandatory completion review. No later answers or changes to existing profiles/summaries.

- 2026-11-02: At the user’s request, promoted POV coverage and ongoing mystery/clue follow-up to a separate HARD thread-lifecycle gate. Every chapter must review prior open/partial questions and recorded clues across POVs, capture new evidence, persist explicit states in existing archive fields, and close only with a cited answer/payoff. Partial answers and disproved theories do not silently close broader mysteries. Requires historical preservation, exact broken active-category edges on closure, and a per-item `thread-review.md` PASS before completion alongside the ownership gate. Documents the actual plot-filter and browser-local clue-board limits; the rebuild procedure requires both gates. Fully incorporated in the skill and procedure.

- 2026-11-02: Book One rebuild Ch14: `Hundur (Dios-Sabueso)` lost its parenthetical qualifier in summary matching and collided with the tracker. Added the distinct non-parenthetical staged-label instruction to SKILL.md; the god keeps canonical id `hundur-dios`. Both summary references were checked for intended identity.

- 2026-11-02: Book One rebuild Ch27 — a link correction assumed spaced JS literals,
  but append-entries.cjs had written compact JSON. The replacement command exited
  successfully without changing the source or labels; the subsequent link review
  exposed the no-op. Added exact-once, chapter-scoped replacement guards and parsed
  post-edit value assertions to SKILL.md. Fully incorporated; no unresolved data issue.

- 2026-11-02: Book One rebuild Ch31 — added event connections exposed Virk’s legacy occupation-only type: the relationship viewer classified him as lore, pushing the father outside Mord’s first twelve neighbors. The existing family regression test caught it. Added Virk’s recalled maxim and normalized his current revision to `Personaje — Pescador fallecido`; all 38 targeted tests pass. The node-type rule is fully absorbed in SKILL.md.

- 2026-11-02: Book 1 rebuild Ch36 — the preflight attempted the absent project-root README. The rebuild procedure now explicitly names `book1/rebuild/README.md` for its chronological-log check.

- 2026-11-02: Book 1 rebuild Ch36 follow-up — reference identity checks returned repeated excerpts and later scenes when searching actor names inside long profiles. Added optional `search-descriptions.cjs --max-excerpts N` per selected id, explicit omitted-excerpt counts, and argument validation; unlimited paginated reads remain the default. The source/entity and rebuild references document distinguishing-action queries, expansion when identity remains uncertain, and the fact that output limits do not impose a chapter cap or replace full-entry reads. Three search regression tests cover per-id limits, default output, Unicode boundaries, historical fallback and invalid options; the rebuild test command includes them.

- 2026-11-02: Book One rebuild Ch37 follow-up — final backlog accounting required a one-off VM parser that initially guessed the wrong Book One array name. Added `read-backlog.cjs BOOK PAGE --index` (rebuild: `rebuild.cjs read-backlog PAGE --index`) to list the same latest cross-POV candidates with TRAMA/star markers and no repeated prose or inferred states. Documented its use only after the complete backlog review, with pending checklist assessments. Regression checks cover candidate parity, latest revisions/book caps, closed/thematic inclusion, empty and paginated output, invalid arguments and staged isolation. Fully incorporated in the helper, review gate and rebuild examples.
- 2026-11-02: Book One rebuild Ch39 follow-up — a reference-only chain ID in a staged
  full-entry batch produced a stack trace and no entries. The reader now fails concisely,
  lists unknown and known requested IDs, and explicitly states that nothing was printed;
  a regression checks all-or-nothing output and successful retry. The rebuild reference
  now keeps reference-only IDs out of staged full-entry batches. Final link review also
  caught source qualifiers between a preposition and its target and an accusation acting
  as the agent that prevents violence; added natural attributed-sentence and subject-role
  examples to the link rules. Fully incorporated; chapter data unchanged by this follow-up.

- 2026-11-02: Book Two Ch2 — reference identity reads for Orv and captura-skuld
  exposed full later-book profiles. Added targeted reference-description excerpts to
  book2-reprocessing.md; mandatory chronological full reads remain unchanged.
  Concurrent Drammur canonical-id repairs changed two profiles and five links after
  prepare. Added guarded reconcile-later with separate effective-reference files,
  exact before/after audit specs, all-record preservation checks and regression tests.
  Original references and the chapter’s active baseline/context stay unchanged.
  Updated integration regressions to compare reprocessed summaries with their reviewed
  checkpoint while retaining original-prose checks on every unreviewed summary, and
  to follow Mord’s source-reviewed event connection instead of a retired legacy edge.

- 2026-11-03: Book Two reprocessing Ch4 — `--reference match-entities Urt`
  settled the canonical full label/id, but a redundant same-name description search
  returned `NO MATCHES` because his profile did not repeat his name. Updated
  `book2-reprocessing.md`: an unambiguous source-matching full character label may
  settle identity; search prose for real ambiguity, and do not treat absent self-name
  text as invalidating a label match. Fully absorbed into the workflow reference.

- 2026-11-03: Ch4 regression exposed a stale integration assertion requiring the legacy
  Ch3 `yrsa → vol` carrier identification, already removed by the reviewed source as
  unsupported. The assertion now preserves all reviewed Ch3 links and checks the
  supported council-to-Vol endpoint. Documented how to investigate legacy assertions
  during reprocessing without restoring unsupported data or weakening archive checks.

- 2026-11-03: Book Two Ch34 checklist comparison showed why the previous question
  and the new verdict need separate handling. The reprocessing reference now documents
  an ID-based lookup and a fresh assessment of each question against the current source,
  including the distinction between earlier progress and an unchanged current chapter.

- 2026-11-03: Book Two Ch46 — the legacy summary promoted a shadow beneath
  Hakon’s skin into a definite tattoo. The reprocessing legacy cross-check now
  preserves observed resemblance, unnamed referents and unheard timing without
  upgrading certainty. A failed draft also used `broken: true`; the main skill now
  explicitly identifies `status: 'broken'` as the batch-marker field. Both fixes
  are fully absorbed into the maintained instructions.

- 2026-11-03: Book Two Ch48 — the legacy summary assigned unnamed actions and
  a drengr's identity, confirmed an implied death and obscured the scope of a
  partial report. Added a focused source-attribution check to the reprocessing
  cross-check. A combined changelog read also truncated; maintenance now locates
  dated entries before reading bounded ranges. Both fixes are fully incorporated
  in the maintained workflow instructions.
