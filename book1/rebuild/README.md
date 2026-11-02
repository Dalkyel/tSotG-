# Book One chronological rebuild

The active archive is unchanged. `book1/` in this folder contains the new chapter-by-chapter data, using the same variables and revision conventions as the live archive. `reference/book1/` preserves the original three Book One data files for identity matching and final comparison. Do not use later facts from that reference in an earlier chapter.

Completed: Chapter 1 (Orka). Source: `../chapter 1.xhtml`.

Open `index.html` in this folder to preview the rebuilt chapters independently. It reuses the live UI through `<base href="../../">`, loads only staged Book One data and uses empty character guides so the live reading aids do not introduce later revelations. D3 still requires its existing CDN connection. Regenerate the preview after live HTML changes using these same substitutions. The normal project `index.html` continues to show the original complete archive.

Run the chapter helper scripts by absolute path with this folder as the working directory and book argument 1. Use `reference/` as the working directory only when resolving IDs against the original inventory. For subsequent chapters, baseline the three staged files before appending and verify normally. Progress and initial live-file SHA-256 hashes are recorded in `progress.json`.

Before replacing live data after Chapter 53, validate all original IDs and Book Two link endpoints, compare against the reference for omissions, and propagate recovered earlier facts through later accumulated descriptions. Do not switch a partial rebuild into the live app.

Validation: Chapter 1 passed the chapter verifier (syntax, endpoints, ordered unique summaries, append-only baseline, and link review), group/duplicate checks and archive merge checks. Live-file hashes and reference copies match. The existing project suite passed 25/26 tests; the unchanged live archive fails the clue-count assertion (376 versus 377). Browser visual inspection was blocked because the browser disallows local file URLs; the preview remains available for manual inspection.
