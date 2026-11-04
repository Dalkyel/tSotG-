# tSotG — Bloodsworn Saga Mind Map

An interactive mind map (D3.js force graph) tracking characters, events, clues, and plots for a book-club readthrough of John Gwynne's *Bloodsworn Saga*. Nodes represent people, places, factions, lore, and open questions; edges represent relationships and connections. The graph is also where each entity's narrative state is updated chapter by chapter as the books are read.

Live at: **https://dalkyel.github.io/tSotG-/**

## Running locally

This is a static site — no build step. Either open `index.html` directly in a browser, or serve it locally:

```sh
npx serve .
```

## Tests

Pure data/logic modules (the `*-core.js` files) are covered by Node's built-in test runner:

```sh
npm test
```

## Project layout

- `index.html`, `mapa.js` / `mapa-core.js`, `styles.css` — the graph app itself.
- `characters.js`, `clues.js`, `focus.js`, `bookmarks.js`, `readability.js` — feature panels (character reference, clue board, connection explorer, bookmarks, legend/readability), each paired with a `*-core.js` module holding the testable logic.
- `book1/`, `book2/` — live per-book `nodes.js`, `links.js`, `summaries.js` data.
- `.claude/skills/add-chapter/` — source reading, entity matching, safe appenders and semantic checks for new chapters.
- `shared/` — assets and logic shared across books (the Vigríð map overlay).
- `tests/` — the Node test suite.

## Adding chapters

Book Two, Chapter 50 was the last rebuilt chapter. Continue with Chapter 51 by
following [.claude/skills/add-chapter/SKILL.md](.claude/skills/add-chapter/SKILL.md).
Add new nodes, relationships and a summary directly to the live book files; preserve
existing history using the baseline-backed appenders. Run the chapter verifier,
complete the ownership/event/thread reviews, and run `npm test`. Keep the baseline,
manifest, review notes and checklist in the unique temporary run directory through
completion. Persist chapter facts, clue states and pending questions in the live
book files; review artifacts do not need to be stored in the repository.

Repairs to an existing chapter are separate, explicitly requested work.
