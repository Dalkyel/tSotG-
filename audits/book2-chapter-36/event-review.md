# Event coverage review — Book 2, Chapter 36

## Inventory of important occurrences

1. **Arrival at Starl and route corroboration.** Orka's party reaches Starl; Halja's
   scouting confirms the Raven-Feeders' trail ends there rather than continuing around
   the lake, partially corroborating Myrk's claim of having sailed across.
   → Coverage: **existing/updated EVENTO** `rumbo-starl-orka` ("Orka Rumbo a Starl: Tres
   Voluntarios"), which already tracked the unfinished journey as of Ch31 ("aún no
   llegan a Starl"). Extended rather than duplicated with a new EVENTO, per the gate's
   "map each candidate to an existing event id" rule. Cross-linked evidence also added
   to `rescate-breca` (the TRAMA this advances).
2. **Purchase of a Tainted thrall (Sæunn) from a slaver (Haga de Starl).** A deliberate,
   consequential decision with an explicitly unrevealed purpose.
   → Coverage: **new TRAMA** `compra-tainted-starl`, holding both the observed fact and
   the open question, consistent with how single unexplained objects/decisions are
   tracked elsewhere in this archive (e.g. `objeto-quemado-iskalt`, `objeto-viga`) without
   a separate EVENTO, since it is a single undisputed transaction with no competing
   accounts to adjudicate.
3. **Blood sample taken from Myrk's horse.** Another deliberate, unexplained action.
   → Coverage: **new TRAMA** `sangre-caballo-myrk`, same reasoning as above.
4. **Dragon-cult preacher sighted at Starl's docks.** A quiet discovery (no combat),
   confirming the cult's reach far south of the Grimholt/Njal's-village sightings.
   → Coverage: **existing FACCION** `culto-dragon`, extended with the new sighting,
   matching the Ch5 precedent (testimony/observation-only sightings update the faction
   node; only the Ch13 ambush — which involved a fight — got its own EVENTO).
5. **Battle-Grim drakkar sighted arriving at Starl's docks.** A distinct occurrence from
   #1 and #4 (different faction, different subject), ending on a cliffhanger before any
   identification or encounter.
   → Coverage: **new EVENTO** `avistamiento-battle-grim-starl`, with an active
   `EVENTOS CLAVE` connection (confirmed by the verifier: "2 added/updated EVENTO nodes
   connected to EVENTOS CLAVE" — the other being the extended `rumbo-starl-orka`, which
   already held its connection from Ch22).
6. **Possible convergence with Elvar's company.** Not an event itself but the pending
   question #5 opens, given the reader-level knowledge that the Battle-Grim's own ship
   (the Wave-Jarl) was last placed moored near Lake Horndal in Ch34.
   → Coverage: **new TRAMA** `convergencia-orka-battle-grim`, written short (status +
   the one-line reader-level cross-reference), not a second account of the sighting —
   applying the gate's explicit instruction to draft this kind of TRAMA short on the
   first pass rather than narrate-then-trim.

## Excluded candidates (no separate coverage needed)

- Orka's and Halja's shopping/provisioning in the market squares, the inn/stable
  arrangements, and Sæunn being clothed: routine logistics and characterization, not a
  discrete event; folded into `rumbo-starl-orka`'s own scene account.
- The brief exchange where Myrk explains the lake-crossing: part of the same scene as
  #1; recorded as evidence on `rescate-breca`/`rumbo-starl-orka`/`myrk`, not a separate
  EVENTO (no interrogation session in the sense of `interrogatorio-myrk`'s Ch22/Ch31
  rounds — this is a roadside question during travel, not a formal round).

## Overlap check

`verify-chapter.cjs --review-overlap` reported no shared run of 12+ consecutive words
among the 17 appended/updated nodes — in particular between `rumbo-starl-orka` (which
owns the full scene) and the narrower nodes (`avistamiento-battle-grim-starl`,
`compra-tainted-starl`, `sangre-caballo-myrk`, `culto-dragon`, `battle-grim`) that
cross-reference it instead of repeating it.

Event coverage review: PASS
