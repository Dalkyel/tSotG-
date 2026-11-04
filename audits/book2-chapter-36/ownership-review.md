# Ownership review — Book 2, Chapter 36

## Baseline audit

Read the complete latest entries (desc + star) for every id touched before drafting:
`orka`, `myrk`, `halja`, `starl`, `pasado-orka`, `rescate-breca`, `rumbo-starl-orka`,
`interrogatorio-myrk`, `culto-dragon`, `battle-grim`, `percepcion-liberacion-lik-rifa`,
`ulfrir`, `resucitar-y-someter-ulfrir`, `snaka`, `retorno-wave-jarl`,
`llegada-wave-jarl-horndal`, `lake-horndal`, plus the matcher/search passes that ruled
out reusing the existing `haga` (Grimholt warrior, †?, unrelated person who shares only
the name) for the new Starl slaver.

## Applied rules, by entry

- **orka** (update): new text is confined to Orka's own actions (the horse-blood cut,
  the Tainted-thrall purchase, the headache/howl) — each immediately cross-referenced
  to the node that actually owns the open question (`sangre-caballo-myrk`,
  `compra-tainted-starl`, `pasado-orka`) rather than argued out here. No padding, no
  recap of the arrival scene already owned by `rumbo-starl-orka`.
- **myrk** (update): confined to her own statement and continued captivity; the route
  she gives is evidence recorded on `rescate-breca`/`rumbo-starl-orka`, not re-narrated
  on her profile beyond the one exchange.
- **halja** (update): confined to her own actions (scouting, accompanying, relaying the
  rumor, identifying the shields); each cross-referenced to its owning node.
- **starl** (update): place facts only — governance, layout, market, docks. No
  individual's actions narrated beyond the one sentence explaining why the town's
  guards don't question Orka's cautive (a fact about the town's practice, not about
  Orka).
- **pasado-orka** (update): the new manifestation (pulse/howl intensifying near the
  Battle-Grim ship) is recorded here, the node that already owns this exact class of
  unexplained fact, not duplicated into `orka`'s own entry beyond a one-line pointer.
  The possible Ulfrir connection is stated as an unconfirmed reader-level link, not
  asserted as fact or as something Orka herself recognizes.
- **rescate-breca** (update): short status/evidence append (route corroboration), no
  re-narration of the Starl scene, which `rumbo-starl-orka` already owns.
- **rumbo-starl-orka** (update): this EVENTO is the one place that legitimately carries
  the chapter's own scene (arrival, provisioning, the thrall purchase, the rumor, the
  sighting) — every other touched node cross-references it tersely instead of repeating
  it. `--review-overlap` confirmed no 12+-word shared run among the 17 appended nodes.
- **culto-dragon** (update): confined to the faction's own observed activity (the
  preacher, the niðings, the far-south reach); not retold a second time on `orka`'s or
  `halja`'s own entries beyond a one-line pointer.
- **battle-grim** (update): confined to the faction's own sighting; the Wave-Jarl/
  Ch34 connection is explicitly marked "a nivel de lector" since the chapter's own POV
  (Orka) has no way to know it — not upgraded to a fact Orka recognizes.
- **percepcion-liberacion-lik-rifa** (update): confined to the market rumor and how it
  resonates with Orka's own private dreams — the node's actual subject — not folded into
  `rumbo-lik-rifa` (Lik-Rifa's own confirmed movements, which this rumor does not touch).
- **saeunn** (new): entry primarily describes her — appearance, name, manner, the
  clothes bought for her. The purchase's unexplained purpose is cross-referenced to
  `compra-tainted-starl`, not argued out on her own profile.
- **haga-starl** (new): distinct id and a non-parenthetical distinct label ("Haga de
  Starl") from the existing Book 1 `haga` (a different, unrelated Grimholt warrior who
  merely shares the bare name) — confirmed via `read-latest` that the existing `haga`
  entry is someone else entirely before minting this one. Per
  [source-and-entity-workflow.md](../../../../.claude/skills/add-chapter/references/source-and-entity-workflow.md)
  and the chapter-summary-links disambiguation rule (Hundur/Dios-Sabueso precedent), a
  bare "Haga" would have been ambiguous in the summary; the distinct label prevents that.
- **avistamiento-battle-grim-starl** (new EVENTO): records the sighting itself once;
  `rumbo-starl-orka`, `orka`, `halja`, `battle-grim` and `pasado-orka` all point to it
  rather than repeating the scene.
- **convergencia-orka-battle-grim** (new TRAMA): written short on the first pass —
  status + the reader-level evidence pointer — per the event-coverage gate's explicit
  instruction, not a second narrative account of the sighting.
- **compra-tainted-starl** / **sangre-caballo-myrk** (new TRAMA): each owns exactly one
  unexplained action and nothing else; no invented lore or payoff, just the observed
  fact and the open question.
- **rio-hvita** (new LUGAR): place facts only (course, connection to Snakavik);
  mentioned because it resolves what would otherwise be a broken `<strong>` mention in
  the chapter summary, not padded beyond what the chapter states.

## Final review

All 17 appended/updated node entries and all 27 appended links were re-read in full via
`verify-chapter.cjs --review-nodes=1/2` and `--review-links` after drafting. Every
`<strong>` summary mention was checked against the intended entity via
`--review-summary` (16 terms, all resolving to the intended id, including the
disambiguated `Haga de Starl`). No violations found; no relocations were needed.

Ownership review: PASS
