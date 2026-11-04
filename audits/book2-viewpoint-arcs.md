# Book Two viewpoint arcs

Date: 2026-11-04. Story cutoff: Book Two, chapter 50.

The graph and backlog tooling retained Book One's three-viewpoint configuration.
Biórr's later profiles still used ELVAR and Guðvarr's used ORKA. Their own Book Two
viewpoints therefore lacked dedicated category nodes, clustering anchors and filters.

## Implemented

- Added ARCO BIÓRR / cat-biorr at his first POV chapter, B2C5: 67 existing records.
- Added ARCO GUÐVARR / cat-gudvarr at his first POV chapter, B2C12: 90 existing records.
- Both categories connect to the saga root and their narrator, with 159 new links total.
- Added BIORR and GUDVARR narrator colors and applied those groups to their Book Two
  revisions from their first viewpoint onward. Book One representations remain intact.
- Backfilled related chapter records chronologically, retaining their existing arcs.
  Shared membership records narrative/source relevance, not that the viewpoint character
  knows every connected fact or was physically present. Structural categories and
  generic magic/culture/cosmology definitions are excluded. The parallel Leif/Sterkur
  scene in B2C43 is not assigned to Guðvarr's viewpoint.
- Map clustering, legend labels and backlog POV filters now share the five-viewpoint
  registry in mapa-core.js. Confirmed category membership guides clustering; a shared
  clue retains every arc tag and matches any applicable filter. Broken membership links
  are respected. Untagged evidence remains included by the review filters.
- Updated the add-chapter workflow so future Biórr/Guðvarr chapters use their own arcs
  and still inspect affected cross-POV evidence.

## Preservation and review

The exact selection policy, new category objects, chronological relationships, group
metadata changes and before/after hashes are recorded in book2-viewpoint-arcs.json.
A unique temporary snapshot was captured before data mutation. Parsing verified that
all original records retain their owning chapters and fields, except the explicitly
listed narrator groups. Every existing desc/star string is identical, all previous
links are retained, and all 103 summaries are unchanged. No new story occurrence or
plot outcome was invented. The live and reviewed Book Two copies receive the same
structural maintenance; immutable references and chapter review files remain intact.
The completed reprocessing state records an explicit post-completion audit transition.

Ownership review: PASS
Event coverage review: PASS
Thread lifecycle review: PASS

The attestations concern this structural maintenance, using retained chapter records
and summary POV titles. Original chapter files are unavailable and no new source-text
review is claimed. All previously captured events and unresolved questions keep their
identities, evidence and active/closed states; TRAMAS ACTIVAS still has 73 targets.

## Validation

All 124 Node tests pass, including new tests for both category branches and their
narrators, chapter-bounded endpoints, new clustering anchors, multiple shared arc tags,
new POV filters and preserved earlier-book scope. Existing isolated rebuild fixtures
now copy the shared registry dependency; no assertions were weakened. Syntax and
whitespace checks pass. Both new POV index selections run successfully. All archived
chapter-review hashes and completed-state hashes remain valid.

Visual inspection remains manual. Refresh index.html to see the two new branches and
legend entries. Browser-local notes or clue-board statuses have not been edited.
