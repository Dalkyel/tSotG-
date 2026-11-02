// Load every recorded book, update, connection, and summary before building the UI.
const archive = ArchiveData.merge([
  { book: 1, nodes, links, summaries: chapterSummaries },
  { book: 2, nodes: nodesBook2, links: linksBook2, summaries: chapterSummariesBook2 },
]);
const MAX_BOOK = archive.maxBook;
const DATA_LABEL = `Archivo completo · Libros 1–${MAX_BOOK}`;
const clueSourceRevisions = archive.revisions;
nodes.splice(0, nodes.length, ...archive.nodes);
links.splice(0, links.length, ...archive.links);
chapterSummaries.splice(0, chapterSummaries.length, ...archive.summaries);
document.querySelector('.header-sub').textContent = DATA_LABEL;

// Old shared URLs can still open the project, but no longer set a reading limit.
const archiveUrl = new URL(location.href);
if (archiveUrl.searchParams.has('book') || archiveUrl.searchParams.has('chapter')) {
  archiveUrl.searchParams.delete('book'); archiveUrl.searchParams.delete('chapter');
  try { history.replaceState(history.state, '', archiveUrl.href); } catch (_) { /* Parameters are ignored regardless. */ }
}
