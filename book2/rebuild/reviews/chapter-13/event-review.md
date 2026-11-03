# Event coverage review — Book 2, Chapter 13

## Inventory of candidate events

Reviewed all represented POVs (the chapter is single-POV, Varg) for deaths, attacks,
rescues, captures, oaths, consequential decisions, departures and discoveries:

1. **Interrogation at Njal's village + grave identification.** Gathering intelligence
   on the fleeing Grimholt survivors, identifying a body to rule out Skalk, and Terna's
   testimony about Frøya — a consequential discovery scene, not routine travel chatter.
   → New EVENTO `interrogatorio-aldea-njal`, linked active to `cat-eventos`.
2. **Ambush/brawl with the Dragon-Cult preachers.** A real attack with injuries, a
   captured prisoner, and the first real-combat test of Varg's wolf-control lesson —
   clearly a "discrete event," not background color.
   → New EVENTO `emboscada-culto-dragon-aldea`, linked active to `cat-eventos`.

**Considered and explicitly excluded** (per the gate's own guidance not to mint a
node for every background beat):
- Svik's cheese-weapon moment and his negotiation with Njal: part of the same beat as
  (1), not a separate consequential event — folded into `interrogatorio-aldea-njal`'s
  own text rather than split out.
- The dead man's physical description (torn face, maggots, a night-wyrm): flavor detail
  of an already-unnamed, unidentified casualty — no node, per the unnamed-entity rule;
  recorded only inside `interrogatorio-aldea-njal`.
- Svik's visible unease since the Grimholt: this is a **question**, not a resolved
  event — correctly a `TRAMA` (`inquietud-svik-grimholt`), not an EVENTO.

Re-read both new EVENTOs side by side against each other and against every sibling
node touched this chapter before finalizing, specifically checking for the
Ch20/Ch21-style narration-duplication failure the gate calls out — confirmed clean via
`--review-overlap` after one fix (see `ownership-review.md`).

## Category connections

Both new EVENTOs carry an active direct `cat-eventos → incluye →` link (verified by
`verify-chapter.cjs`'s automated check: "4 added/updated EVENTO nodes connected to
EVENTOS CLAVE" — the other two are `muerte-froya` and `leccion-control-lobo`, both
pre-existing EVENTOs updated this chapter that already carried their own active
category link). Both also carry meaningful links to their participants, the location
context (`njal`, `darl`), and the TRAMA/EVENTO nodes they advance (`huida-skalk-vol`,
`froya`, `muerte-froya`, `akall`, `culto-dragon`, `leccion-control-lobo`,
`inquietud-svik-grimholt`).

Event coverage review: PASS
