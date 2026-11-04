# Ownership review — Book 2, Chapter 13

## Baseline audit (before writing)

Read the complete chapter (3 pages via `read-chapter.py`). Built the entity list and
resolved every named entity against the staged inventory via `match-entities` (Varg,
Røkia, Glornir, Svik, Einar, Njal, Terna, Brimil, Frøya, Kolskegg, Lik-Rifa, Berser,
Skalk, Orka, Helka, Darl, Grimholt, Althing, Galdurman, Vesli, Tennur, Níðing). Three
names were genuinely unmatched (Njal, Terna, Brimil) and confirmed absent from every
description via `search-descriptions` before minting new ids. "Galdurman" resolved as
an existing epithet of `skalk`, not a new entity.

Read full latest entries for every id touched before drafting: `froya`/`muerte-froya`,
`snepil`/`matanza-kolskegg`, `pasado-varg`, `skalk`/`traicion-skalk`/`huida-skalk-vol`,
`svik`/`saga-queso-troll`, `rokia`, `leccion-control-lobo` (confirmed as the exact source
of the "stream, not a flood" / "Oathsworn obey" lesson Varg recalls this chapter),
`promesa-torvik-froya`/`ayuda-torvik-froya`/`venganza-torvik`, `culto-dragon`/
`culto-likrifa-pinar`/`ataque-night-wyrms`. This confirmed: `akall`'s entire premise is
that Frøya was murdered (not merely died), which is exactly what this chapter's new
testimony puts in tension; `ayuda-torvik-froya` was already closed (Torvik died before
fulfilling it) and stays untouched; `culto-dragon` (not `culto-likrifa-pinar`, a
narrower open mystery about a specific altar) is the correct existing node for this
chapter's cult sighting, since Myrk's Ch5 claim that the cult "se extiende por la
tierra" is exactly what a sighting far from the Grimholt confirms.

## Fact ownership applied

- The authoritative scene accounts live on the two new EVENTO nodes
  (`interrogatorio-aldea-njal`, `emboscada-culto-dragon-aldea`). `terna`, `brimil`,
  `njal`, `svik`, `varg` each carry only their own stake plus a pointer, not a second
  full narration — this is the exact failure class flagged by the Ch19/20/21 incidents
  in `references/changelog.md`.
- Terna's testimony about Frøya is placed on `froya`/`muerte-froya`/`akall` as a
  qualifying addition, not a resolution: the existing "perceived death" claim is
  preserved verbatim (full-overwrite rule respected via `append-chapter.cjs`), and the
  new testimony is added as a distinct, source-attributed complication. `froya`'s label
  changed from `Frøya (†)` to `Frøya (†?)`, mirroring the established Harek precedent
  for a death now in genuine doubt — not a resurrection, not a disproof.
- Predictions stayed attributed: Svik's demeanor change is recorded as an observation
  with an explicit open question (`inquietud-svik-grimholt`), not resolved or guessed at.

## Final review

Ran `verify-chapter.cjs --review-nodes=1/2/3`: all 16 node revisions (6 updates, 10 new)
reviewed in full — baseline prefixes preserved byte-for-byte, every appended suffix and
metadata change (the `froya` label change included) matches intent.

Ran `--review-overlap`: **caught a real violation** on the first pass — `varg` and
`leccion-control-lobo` shared a 12-word verbatim clause ("logra contener el impulso de
matar a un enemigo caído, aunque solo..."). Fixed via the proper correction workflow
(`--replace-applied`, not a manual edit): trimmed `varg`'s entry to a short pointer,
leaving `leccion-control-lobo` as the sole authoritative account. Re-ran the check:
clean. Ran `--review-links`: all 39 links read as natural source → label → target
sentences, correct direction, no shared-template grammar mismatches. Ran
`--review-summary`: 11 emphasized terms resolve completely to the intended ids,
including `Frøya` (resolves correctly despite the new `(†?)` suffix) and `Svik
Hrulfsson` (used in full per the house rule that "Svik" alone is not a supported
summary alias).

No further violations found.

Ownership review: PASS
