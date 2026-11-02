(function (root) {
  'use strict';
  function validate(data) {
    if (!data || data.version !== 1 || !Array.isArray(data.items)) throw Error('No se pudieron leer los marcadores guardados.');
    const unique = new Map();
    for (const item of data.items) {
      if (!item || !['node', 'clue'].includes(item.kind) || typeof item.id !== 'string' || !item.id || item.id.length > 512) {
        throw Error('Los marcadores guardados contienen una entrada inválida.');
      }
      unique.set(JSON.stringify([item.kind, item.id]), { kind: item.kind, id: item.id });
    }
    return [...unique.values()];
  }
  function visible(items, nodes, clues) {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const clueMap = new Map(clues.map(c => [c.id, c]));
    return items.flatMap(item => {
      let source = item.kind === 'node' ? nodeMap.get(item.id) : clueMap.get(item.id);
      // A source bookmark created on an older book still opens that topic's current observation.
      if (!source && item.kind === 'clue') {
        const nodeId = item.id.match(/^source:\d+:(.+)$/)?.[1];
        if (nodeId) source = clues.find(c => c.origin === 'source' && c.nodeIds.includes(nodeId));
      }
      return source ? [{ ...item, label: item.kind === 'node' ? source.label : source.title,
        ...(source.id !== item.id ? { targetId: source.id } : {}),
        subtitle: item.kind === 'node' ? source.type : 'Pregunta u observación del club' }] : [];
    });
  }
  const api = { validate, visible };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.BookmarkStore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
