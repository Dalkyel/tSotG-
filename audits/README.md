# Audit evidence and chapter handoff

Read the live `bookN/nodes.js`, `links.js` and `summaries.js` as the current archive.
Book Two Chapter 50 was the final rebuild; continue with new Chapter 51 using
[the add-chapter workflow](../.claude/skills/add-chapter/SKILL.md).

`book2-chapter-8/` through `book2-chapter-50/` preserve the 43 available chapter
ownership, event and thread reviews and per-ID clue checklists. Chapter 50 also
retains its applied manifest. These files were moved unchanged from the retired
rebuild folders. Earlier Book Two chapter review files were not present there.
The checklists' temporary baseline paths may have expired: inspect them with
`read-checklist.cjs`, then review current live evidence for the new chapter.
Saved PASS markers attest to the original review, not to a new chapter or audit.

The Chapter 50 checklist is the latest chapter assessment, but later maintenance
can supersede its states and metadata. Consult these archive-wide audits as needed:

- [Secrets and pending questions through B2C50](secrets-through-book2-ch50.md),
  its JSON evidence, supplemental screen, repair manifest and review records.
- [Active-category follow-up](active-category-followup.md) for the later Harek
  category retirement.
- [Book Two viewpoint arcs](book2-viewpoint-arcs.md) for Biórr/Guðvarr membership
  and backlog selection.
- [Book One chapters 1–15 event coverage](book1-chapters-1-15-event-review.md)
  for the retained event audit and its source-availability limitation.

For new chapters, save the manifest, three semantic reviews and checked clue
checklist under `bookN-chapter-C/` in this directory.

Both rebuild folders have been removed. Their data was already incorporated into
the live archive; Book Two's live data additionally contains later clue annotations.
Duplicate datasets, original reference copies, integration backups, preview HTML,
progress/hashes and reconciliation/completion state are unnecessary for additions.
Historical audit manifests and maintenance logs still name the paths used at the
time of those actions. Those paths and hashes are provenance, not current inputs;
the retired tracked files can be recovered from Git history if needed.
