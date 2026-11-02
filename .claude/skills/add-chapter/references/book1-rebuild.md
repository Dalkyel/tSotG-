# Authorized Book One rebuild

This governs a separate, parallel effort — a user-authorized fresh chronological rebuild
of Book One, tracked in `book1/rebuild/` — not the normal "add the chapter we just read"
workflow in `SKILL.md`. An incomplete `book1/rebuild/progress.json` makes this the default
workflow for Book One chapter requests unless the user explicitly selects the live archive.
Book Two requests continue to use the live workflow.

The user requested a fresh chronological rebuild, starting with Chapter 1. During this
rebuild, write to `book1/rebuild/book1/{nodes,links,summaries}.js`, not the live
`book1/*.js`. The original Book One files are backed up at
`book1/rebuild/reference/book1/`; treat them as identity/completeness references only,
not factual baselines to copy into chapter descriptions. Live Book Two stays intact.

- Read `book1/rebuild/progress.json` first. Continue in chapter order; inspect existing
  work rather than duplicating a completed chapter. Read source XHTML from the project
  root with `read-chapter.py`, just as for HTML.
- Run the existing Node helpers with working directory `book1/rebuild`, book argument
  `1`, and absolute paths to the scripts. This makes preflight, latest-entry reads,
  append operations and verification address the rebuilt files. For original canonical
  ID/label matching, run the matcher/search helpers from `book1/rebuild/reference`.
  A reference match does not mean an entity already exists in the rebuild: create a new
  node using that ID if it is absent from the rebuilt inventory. Descriptions and stars
  must be grounded only in chapters processed so far; retain later revelations solely
  in the untouched reference/live archive. Reuse IDs for historical events even when
  their canonical names are learned later, explicitly noting that distinction.
- Snapshot the staged three files into a unique temporary baseline before each chapter.
  Verify from the staging working directory with `verify-chapter.cjs 1 CHAPTER BASELINE
  --review-links`. It supports Book One and requires the same append/preservation checks.
  Verify the live archive hashes recorded in `progress.json` remain unchanged.
- Update `completedChapters` after verification succeeds. Preview with
  `book1/rebuild/index.html`; regenerate that preview from the live HTML if its layout
  changes, retaining the base URL and staged-data substitutions described in the README.
- Do not replace the live archive with a partial rebuild. At completion, reconcile
  canonical IDs, Book Two endpoints and accumulated descriptions (later versions must
  retain newly recovered earlier facts), then validate the combined archive before
  switching the live files.
