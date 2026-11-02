/* Pure data helpers shared by the board and its validation tests. */
(function (root) {
  'use strict';
  const statuses = {
    unreviewed: 'Por revisar', open: 'Abierta', partial: 'Parcialmente respondida',
    resolved: 'Resuelta', contradicted: 'Contradicha',
  };
  const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  function sourceEntries(revisions) {
    const latest = new Map();
    revisions.forEach(n => latest.set(n.id, n));
    return [...latest.values()].filter(n => n.star && n.star.trim()).map(n => ({
      id: `source:${n.book}:${n.id}`, title: n.label, note: n.star,
      status: 'unreviewed', book: n.book, nodeIds: [n.id],
      evidence: '', theory: '', chapter: '', history: [], origin: 'source',
    }));
  }

  function entries(revisions, saved) {
    const imported = sourceEntries(revisions);
    const ids = new Set(imported.map(c => c.id));
    return imported.map(c => ({ ...c, ...(saved[c.id] || {}), note: c.note }))
      // Retain edits to older source observations as well as independent club questions.
      .concat(Object.values(saved).filter(c => !ids.has(c.id)));
  }

  // Validate the whole file before merging; never partially import a bad backup.
  function validateBackup(data) {
    if (!data || data.format !== 'bloodsworn-clues' || ![1, 2].includes(data.version) || !Array.isArray(data.entries)) {
      throw new Error('El archivo no es una copia compatible del tablero.');
    }
    const result = Object.create(null);
    const validPoint = point => point && [1, 2].includes(point.book) && Number.isInteger(point.chapter) && point.chapter >= 0;
    function clean(c, allowVersions = true) {
      if (!c || typeof c.id !== 'string' || !/^(source:[12]:.+|club:[\w-]+)$/.test(c.id) ||
          !['source', 'club'].includes(c.origin) || !Object.hasOwn(statuses, c.status) ||
          ![1, 2].includes(c.book) || !Array.isArray(c.nodeIds) || !c.nodeIds.every(x => typeof x === 'string') ||
          !['title', 'note', 'evidence', 'theory', 'chapter'].every(k => typeof c[k] === 'string') ||
          !c.title.trim() || !Array.isArray(c.history) ||
          !c.history.every(h => h && typeof h.at === 'string' && typeof h.text === 'string' && (!h.reading || validPoint(h.reading))) ||
          (c.availableAt && !validPoint(c.availableAt)) || (c.updatedAt && typeof c.updatedAt !== 'string') ||
          (c.versions && (!allowVersions || !Array.isArray(c.versions))) ||
          (c.origin === 'source' && !c.id.startsWith(`source:${c.book}:`)) ||
          (c.origin === 'club' && !c.id.startsWith('club:'))) {
        throw new Error('Una entrada tiene datos incompletos o inválidos. No se importó el archivo.');
      }
      const value = {
        id: c.id, origin: c.origin, status: c.status, book: c.book,
        nodeIds: [...c.nodeIds], title: c.title, note: c.note,
        evidence: c.evidence, theory: c.theory, chapter: c.chapter,
        history: c.history.map(h => ({ at: h.at, text: h.text, ...(h.reading ? { reading: { ...h.reading } } : {}) })),
        ...(c.availableAt ? { availableAt: { ...c.availableAt } } : {}),
        ...(c.updatedAt ? { updatedAt: c.updatedAt } : {}),
      };
      if (c.versions) value.versions = c.versions.map(version => {
        const snapshot = clean(version, false);
        if (snapshot.id !== c.id || snapshot.origin !== c.origin) throw new Error('Una revisión no corresponde a su entrada.');
        return snapshot;
      });
      return value;
    }
    for (const c of data.entries) {
      const value = clean(c);
      if (Object.hasOwn(result, value.id)) throw new Error('La copia contiene entradas duplicadas.');
      result[value.id] = value;
    }
    return result;
  }

  const api = { statuses, normalize, sourceEntries, entries, validateBackup };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ClueBoard = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
