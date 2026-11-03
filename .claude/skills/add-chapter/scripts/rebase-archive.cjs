// Rebase unreprocessed revisions onto a new, reviewed history. No story inference.
const assert = require('node:assert/strict');
function suffix(text = '', previous = '', chapter, field = 'desc') {
  if (!previous) return text;
  if (text.startsWith(previous)) return text.slice(previous.length).trim();
  if (!text) return '';
  // Legacy profiles sometimes rewrote/truncated the inherited introduction. The
  // file's section number supplies ownership; passing mentions never set the cap.
  const marker = chapter ? new RegExp(`(?:LIBRO\\s*2,?\\s*)?CAP[IÍ]TULO\\s+${chapter}(?=\\D|$)`, 'i')
    : /(?:GLOSARIO|REPARTO)\s+(?:DE[L]?\s+)?LIBRO\s*2/i;
  const match = marker.exec(text);
  if (match) return text.slice(match.index).trim();
  if (field === 'star') return text; // Unmarked clues remain available for semantic review.
  assert.fail(`Cannot isolate Book 2 chapter ${chapter} text; supply an explicit migration correction`);
}
function join(base = '', delta = '') { return [base, delta].filter(Boolean).join(' '); }
function rebase(items, oldBase, newBase) {
  const previous = new Map(oldBase), latest = new Map(newBase);
  return items.map(item => {
    const node = item.value, before = previous.get(node.id), base = latest.get(node.id);
    const value = { ...node };
    if (base) {
      for (const field of ['desc', 'star']) value[field] = join(base[field], suffix(node[field], before?.[field], item.chapter, field));
      for (const field of ['label', 'type', 'group']) if (before && node[field] === before[field]) value[field] = base[field];
      value.status = 'updated'; value.previousState ||= 'Revisión conservada al conectar el historial reconstruido.';
    }
    previous.set(node.id, node); latest.set(node.id, value);
    return { ...item, value };
  });
}
module.exports = { suffix, join, rebase };
