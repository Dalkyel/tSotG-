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
- `book1/`, `book2/` — per-book `nodes.js`, `links.js`, `summaries.js` data, plus a `rebuild/` pipeline (see `book1/rebuild/README.md`) used to ingest and reconcile new chapters.
- `shared/` — assets and logic shared across books (the Vigríð map overlay).
- `tests/` — the Node test suite.
