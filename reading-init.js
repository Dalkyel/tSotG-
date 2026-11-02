// Resolve one limit before any graph, search index, archive, or clue UI is built.
const READING_ALL_SUMMARIES = [
  ...chapterSummaries.map(s => ({ ...s, book: 1 })),
  ...chapterSummariesBook2.map(s => ({ ...s, book: 2 })),
];
const READING_MAX_CHAPTERS = Object.fromEntries([1, 2].map(book => [book,
  Math.max(0, ...READING_ALL_SUMMARIES.filter(s => s.book === book).map(s => s.chapter)),
]));
const MAX_BOOK = 2;
const readingParams = new URLSearchParams(location.search);
let savedReadingLimit;
try {
  savedReadingLimit = JSON.parse(localStorage.getItem('bloodsworn-reading-limit') || 'null');
  const legacyBook = Number(localStorage.getItem('bloodsworn-book-cap'));
  if ([1, 2].includes(legacyBook) && legacyBook !== savedReadingLimit?.book) {
    savedReadingLimit = { book: legacyBook, chapter: READING_MAX_CHAPTERS[legacyBook] };
  }
} catch (_) { /* A shared link still works when local storage is unavailable. */ }
const readingHasLink = readingParams.has('book') || readingParams.has('chapter');
const READING_LIMIT = Object.freeze(ReadingProgress.parseLimit(
  readingHasLink ? { book: readingParams.get('book'), chapter: readingParams.get('chapter') } : savedReadingLimit,
  READING_MAX_CHAPTERS, readingHasLink ? { book: 1, chapter: 0 } : { book: 2, chapter: READING_MAX_CHAPTERS[2] },
));
const readingLinkPoint = ReadingProgress.parseLimit({ book: readingParams.get('book'), chapter: readingParams.get('chapter') },
  READING_MAX_CHAPTERS, { book: -1, chapter: -1 });
const READING_LINK_VALID = readingHasLink && readingLinkPoint.book === READING_LIMIT.book && readingLinkPoint.chapter === READING_LIMIT.chapter;
if (READING_LINK_VALID) {
  try {
    localStorage.setItem('bloodsworn-reading-limit', JSON.stringify(READING_LIMIT));
    localStorage.setItem('bloodsworn-book-cap', String(READING_LIMIT.book));
  } catch (_) { /* The explicit URL remains authoritative. */ }
}
const BOOK_CAP = READING_LIMIT.book;
const CHAPTER_CAP = READING_LIMIT.chapter;
const READING_LABEL = `Libro ${BOOK_CAP} · ${CHAPTER_CAP === 0 ? 'Antes del capítulo 1' : `Capítulo ${CHAPTER_CAP}`}`;
const READING_IS_PARTIAL = CHAPTER_CAP < READING_MAX_CHAPTERS[BOOK_CAP];
const ACTIVE_CHARACTER_GUIDES = READING_IS_PARTIAL ? {} : CHARACTER_GUIDES;
const ACTIVE_RELATION_HINTS = READING_IS_PARTIAL ? {} : CHARACTER_RELATION_HINTS;
const READING_RAW = {
  baseNodes: nodes.map(n => ({ ...n })), baseLinks: links.map(l => ({ ...l })),
  nextNodes: nodesBook2.map(n => ({ ...n })), nextLinks: linksBook2.map(l => ({ ...l })),
  summaries: READING_ALL_SUMMARIES, maxima: READING_MAX_CHAPTERS, metadata: READING_METADATA,
};
const READING_VIEW = ReadingProgress.project(READING_RAW, READING_LIMIT);
nodes.splice(0, nodes.length, ...READING_VIEW.nodes);
links.splice(0, links.length, ...READING_VIEW.links);
chapterSummaries.splice(0, chapterSummaries.length, ...READING_VIEW.summaries);
const clueSourceRevisions = READING_VIEW.revisions;

const capSelect = document.getElementById('book-cap');
const chapterCapSelect = document.getElementById('chapter-cap');
for (let book = 1; book <= MAX_BOOK; book++) capSelect.add(new Option(`Libro ${book}`, book, false, book === BOOK_CAP));
function populateChapterLimit(book, chapter) {
  chapterCapSelect.replaceChildren();
  for (let i = 0; i <= READING_MAX_CHAPTERS[book]; i++) {
    chapterCapSelect.add(new Option(i === 0 ? 'Antes del capítulo 1' : `Hasta capítulo ${i}`, i, false, i === chapter));
  }
}
populateChapterLimit(BOOK_CAP, CHAPTER_CAP);
capSelect.addEventListener('change', () => populateChapterLimit(Number(capSelect.value), READING_MAX_CHAPTERS[capSelect.value]));
document.querySelector('.header-sub').textContent = `Límite del club · ${READING_LABEL}`;
const readingNotice = document.getElementById('reading-notice');
function readingMessage(message) { readingNotice.textContent = message; readingNotice.hidden = false; }
if (READING_VIEW.summaryMode) readingMessage('Las fichas de este tramo se construyen solo con los resúmenes leídos. Las notas acumuladas sin fecha se incorporan al completar el Libro 1.');
if (READING_VIEW.undated && !READING_VIEW.summaryMode) readingMessage(`${READING_VIEW.undated} registros pendientes de fechar quedan ocultos para respetar el límite.`);
if (!nodes.length) readingMessage('Selecciona el primer capítulo leído para empezar.');
if (readingHasLink && !READING_LINK_VALID) {
  readingMessage('El enlace no contiene un límite válido. Se muestra el inicio; selecciona el libro y capítulo del club.');
}
if (!nodes.length) {
  ['btn-focus', 'btn-characters'].forEach(id => { document.getElementById(id).disabled = true; });
}
document.getElementById('apply-reading-limit').addEventListener('click', () => {
  const next = ReadingProgress.parseLimit({ book: capSelect.value, chapter: chapterCapSelect.value }, READING_MAX_CHAPTERS, READING_LIMIT);
  try {
    localStorage.setItem('bloodsworn-reading-limit', JSON.stringify(next));
    localStorage.setItem('bloodsworn-book-cap', String(next.book));
  } catch (_) { /* The URL carries the setting even without storage. */ }
  const url = new URL(location.href); url.searchParams.set('book', next.book); url.searchParams.set('chapter', next.chapter);
  location.href = url.href;
});
document.getElementById('share-reading-limit').addEventListener('click', async () => {
  const url = new URL(location.href); url.searchParams.set('book', BOOK_CAP); url.searchParams.set('chapter', CHAPTER_CAP);
  const text = location.protocol === 'file:' ? `${READING_LABEL}\n?book=${BOOK_CAP}&chapter=${CHAPTER_CAP}` : url.href;
  try {
    await navigator.clipboard.writeText(text);
    readingMessage(location.protocol === 'file:' ? `${READING_LABEL} copiado. En la web compartida del club, añade ?book=${BOOK_CAP}&chapter=${CHAPTER_CAP} a la dirección.` : `Enlace copiado: ${READING_LABEL}. Quien lo abra verá este mismo límite.`);
  } catch (_) {
    // Selectable fallback for browsers that do not allow clipboard access.
    readingNotice.replaceChildren(); readingNotice.hidden = false;
    const label = document.createElement('label'); label.textContent = `Copia el límite del club: ${READING_LABEL} `;
    const input = document.createElement('input'); input.value = text; input.readOnly = true;
    input.setAttribute('aria-label', 'Límite o enlace para compartir'); label.append(input); readingNotice.append(label); input.select();
  }
});
