(function (root) {
  'use strict';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/[^a-z0-9]+/g, ' ').trim();
  function signature(value) {
    let hash = 2166136261;
    const text = JSON.stringify(value);
    for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    return (hash >>> 0).toString(16);
  }
  function allows(point, limit) {
    return point && Number.isInteger(point.book) && Number.isInteger(point.chapter) &&
      (point.book < limit.book || point.book === limit.book && point.chapter <= limit.chapter);
  }
  function parseLimit(value, maxima, fallback) {
    if (value?.book == null || value?.chapter == null || String(value.book).trim() === '' || String(value.chapter).trim() === '') return { ...fallback };
    const book = Number(value?.book), chapter = Number(value?.chapter);
    return Number.isInteger(book) && Object.hasOwn(maxima, book) && Number.isInteger(chapter) && chapter >= 0 && chapter <= maxima[book]
      ? { book, chapter } : { ...fallback };
  }
  function annotate(records, book, metadata, maxima) {
    return records.map((record, i) => ({ ...record, book,
      chapter: metadata && metadata.signatures[i] === signature(record) && Number.isInteger(metadata.chapters[i])
        ? metadata.chapters[i] : maxima[book] + 1,
    }));
  }
  function plain(html) {
    return String(html || '').replace(/<br\s*\/?\s*>/gi, '\n\n').replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  }
  function earlyBookOne(base, summaries, limit) {
    const nodes = new Map(), links = [], revisions = [];
    const named = base.filter(n => /^(Personaje|POV|Divinidad)/i.test(n.type) || n.group === 'DIOS' ||
      ['helka', 'storr', 'spert', 'vesli', 'hrung', 'cuervos-gigantes'].includes(n.id));
    const ignored = new Set(['el', 'la', 'los', 'las', 'jarl', 'reina', 'principe', 'familia', 'gran', 'joven', 'hombre']);
    for (const summary of summaries.filter(s => s.chapter <= limit.chapter)) {
      const text = plain(summary.summary), paragraphs = text.split(/\n\s*\n/);
      const chapterId = `reading-book1-chapter${summary.chapter}`;
      nodes.set(chapterId, { id: chapterId, label: summary.title, type: 'Evento — Capítulo leído', group: 'EVENTO',
        desc: text, star: '', book: 1, chapter: summary.chapter });
      for (const original of named) {
        const label = original.label.split('(')[0].trim();
        const first = label.split(/\s+/)[0];
        const terms = [label, ...(!ignored.has(normalize(first)) && first.length >= 3 ? [first] : []), original.id.replace(/-/g, ' ')];
        const matches = terms.filter(term => {
          const normalized = normalize(term);
          return normalized.length >= 3 && new RegExp(`(?:^| )${normalized}(?: |$)`).test(normalize(text));
        }).sort((a, b) => b.length - a.length);
        if (!matches.length) continue;
        // Display only the name that occurs in a read summary, never its later title or identity.
        const term = matches[0];
        const relevant = paragraphs.filter(p => new RegExp(`(?:^| )${normalize(term)}(?: |$)`).test(normalize(p)));
        const previous = nodes.get(original.id);
        const safe = { id: original.id, label: previous?.label || term, type: 'Personaje — Referencia de capítulos leídos',
          group: ['orka', 'varg', 'elvar'].includes(original.id) ? original.id.toUpperCase() : 'FACCION',
          desc: [previous?.desc, `LIBRO 1, CAPÍTULO ${summary.chapter}: ${relevant.join('\n\n')}`].filter(Boolean).join('\n\n'),
          star: '', book: 1, chapter: summary.chapter };
        nodes.set(original.id, safe); revisions.push({ ...safe });
        links.push({ source: original.id, target: chapterId, label: 'mencionado en el resumen de', type: 'event', book: 1, chapter: summary.chapter });
      }
    }
    return { nodes: [...nodes.values()], links, revisions };
  }
  function project({ baseNodes, baseLinks, nextNodes, nextLinks, summaries, maxima, metadata }, limit) {
    const allowedSummaries = summaries.filter(s => allows(s, limit));
    if (limit.book === 1 && limit.chapter < maxima[1]) {
      return { ...earlyBookOne(baseNodes, summaries.filter(s => s.book === 1), limit), summaries: allowedSummaries,
        summaryMode: true, undated: baseNodes.length + baseLinks.length };
    }
    const revisions = baseNodes.map(n => ({ ...n, book: 1, chapter: maxima[1] }));
    const later = annotate(nextNodes, 2, metadata.files['book2/nodes.js'], maxima);
    revisions.push(...later.filter(n => allows(n, limit)));
    const merged = new Map();
    revisions.forEach(n => merged.set(n.id, { ...merged.get(n.id), ...n }));
    const links = baseLinks.map(l => ({ ...l, book: 1, chapter: maxima[1] }));
    const laterLinks = annotate(nextLinks, 2, metadata.files['book2/links.js'], maxima);
    const broken = new Set();
    laterLinks.filter(l => allows(l, limit)).forEach(l => {
      if (l.status === 'broken') broken.add(JSON.stringify([l.source, l.target, l.label])); else links.push(l);
    });
    return { nodes: [...merged.values()], revisions, summaries: allowedSummaries, summaryMode: false,
      undated: later.filter(n => n.chapter > maxima[2]).length + laterLinks.filter(l => l.chapter > maxima[2]).length,
      links: links.filter(l => !broken.has(JSON.stringify([l.source, l.target, l.label])) && merged.has(l.source) && merged.has(l.target)) };
  }
  const api = { signature, allows, parseLimit, annotate, plain, earlyBookOne, project };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ReadingProgress = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
