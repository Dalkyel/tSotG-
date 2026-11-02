(function (root) {
  'use strict';
  // Merge the complete archive. Dates and former reading settings never hide records.
  function merge(books) {
    const nodes = new Map(), links = [], revisions = [], summaries = [], broken = new Set();
    const ordered = [...books].sort((a, b) => a.book - b.book);
    ordered.forEach(book => {
      book.nodes.forEach(source => {
        const revision = { ...source, book: book.book };
        revisions.push(revision);
        nodes.set(source.id, { ...nodes.get(source.id), ...revision });
      });
      book.links.forEach(source => {
        if (source.status === 'broken') broken.add(JSON.stringify([source.source, source.target, source.label]));
        else links.push({ ...source, book: book.book });
      });
      book.summaries.forEach(summary => summaries.push({ ...summary, book: book.book }));
    });
    return { nodes: [...nodes.values()], revisions, summaries, maxBook: Math.max(...ordered.map(book => book.book)),
      links: links.filter(link => !broken.has(JSON.stringify([link.source, link.target, link.label])) && nodes.has(link.source) && nodes.has(link.target)) };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { merge }; else root.ArchiveData = { merge };
})(typeof globalThis !== 'undefined' ? globalThis : this);
