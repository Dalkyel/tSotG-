(function (root) {
  'use strict';
  const namedBeings = new Set(['spert', 'vesli', 'hrung', 'cuervos-gigantes', 'tannbursta']);
  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/æ/g, 'ae')
      .replace(/ø/g, 'o').replace(/œ/g, 'oe').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function kind(node) {
    if (/^(POV|Personaje)/i.test(node.type) || ['helka', 'storr'].includes(node.id)) return 'people';
    if (node.group === 'DIOS' || /^Divinidad/.test(node.type)) return 'gods';
    if (namedBeings.has(node.id)) return 'beings';
    return null;
  }
  function excerpt(text, limit = 300) {
    const clean = String(text || '').replace(/\[Pronunciación:[^\]]*\]/gi, '')
      .replace(/\(ver nodo [^)]+\)/gi, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= limit) return clean;
    const chunk = clean.slice(0, limit);
    const sentence = Math.max(chunk.lastIndexOf('. '), chunk.lastIndexOf('? '), chunk.lastIndexOf('! '));
    return sentence > limit * 0.4 ? chunk.slice(0, sentence + 1) : chunk.slice(0, chunk.lastIndexOf(' ')) + '…';
  }
  function chapterSections(text) {
    // Only explicit section headings count, never incidental mentions of a chapter.
    const pattern = /LIBRO\s+(\d+)\s*,?\s*CAP[ÍI]TULO\s+(\d+)(\s*\([^)]*\))?\s*:/gi;
    const matches = [...String(text || '').matchAll(pattern)];
    return matches.map((m, i) => ({ book: Number(m[1]), chapter: Number(m[2]),
      qualifier: (m[3] || '').trim(),
      text: text.slice(m.index + m[0].length, matches[i + 1]?.index ?? text.length).trim() }));
  }
  function timeline(revisions, id) {
    const sections = new Map();
    revisions.filter(n => n.id === id).forEach(n => {
      chapterSections(n.desc).filter(s => s.text).forEach(s => sections.set(`${s.book}:${s.chapter}`, s));
    });
    return [...sections.values()].sort((a, b) => a.book - b.book || a.chapter - b.chapter);
  }
  function aliases(node, revisions, guides) {
    const guide = guides[node.id] || {};
    const knownNames = [node.label, ...revisions.filter(n => n.id === node.id).map(n => n.label)];
    return [...new Set([node.id.replace(/-/g, ' '), ...knownNames,
      ...knownNames.map(name => name.replace(/ð/g, 'th').replace(/Ð/g, 'Th')), ...(guide.aliases || [])])];
  }
  function profile(node, revisions, guides = {}) {
    const own = revisions.filter(n => n.id === node.id);
    const latestBook = Math.max(1, ...revisions.map(n => n.book || 1));
    const guide = guides[node.id] || {};
    const events = timeline(revisions, node.id);
    const latest = events.at(-1);
    const recent = guide.recent;
    const useRecent = recent && latest && recent.book === latest.book && recent.chapter === latest.chapter;
    return { node, kind: kind(node), aliases: aliases(node, revisions, guides),
      intro: guide.byBook?.[latestBook] || guide.intro || excerpt(node.desc.replace(/^LIBRO\s+\d+\s*,?\s*CAP[ÍI]TULO\s+\d+(\s*\([^)]*\))?\s*:\s*/i, '')),
      introIsExcerpt: !(guide.byBook?.[latestBook] || guide.intro),
      latest: latest ? { ...latest, preview: useRecent ? recent.text : excerpt(latest.text, 420), curated: !!useRecent } : null,
      timeline: events, revisions: own };
  }
  function search(profiles, query, filter = '') {
    const q = normalize(query);
    return profiles.filter(p => !filter || p.kind === filter).map(p => {
      const names = p.aliases.map(normalize);
      let score = !q ? 1 : names.some(n => n === q) ? 100 : names.some(n => n.startsWith(q)) ? 80 :
        names.some(n => q.split(' ').every(word => n.includes(word))) ? 60 :
        q.split(' ').every(word => normalize(p.node.type).includes(word)) ? 30 : 0;
      return { p, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.p.node.label.localeCompare(b.p.node.label, 'es')).map(x => x.p);
  }
  function groupedConnections(nodeId, nodes, links) {
    const byId = new Map(nodes.map(n => [n.id, n]));
    const groups = new Map();
    const endpoint = n => typeof n === 'object' ? n.id : n;
    links.forEach(link => {
      const s = endpoint(link.source), t = endpoint(link.target);
      if (s !== nodeId && t !== nodeId) return;
      const other = byId.get(s === nodeId ? t : s);
      if (!other || ['CENTER', 'CAT'].includes(other.group)) return;
      const category = kind(other) ? 'people' : /^Facc/i.test(other.type) ? 'factions' :
        other.group === 'EVENTO' ? 'events' : other.group === 'TRAMA' ? 'plots' :
        other.group === 'LUGAR' ? 'places' : 'lore';
      if (!groups.has(category)) groups.set(category, new Map());
      const group = groups.get(category);
      if (!group.has(other.id)) group.set(other.id, { node: other, links: [] });
      group.get(other.id).links.push({ source: byId.get(s)?.label || s, target: byId.get(t)?.label || t,
        label: link.label, type: link.type, book: link.book || 1,
        ...(Number.isInteger(link.chapter) ? { chapter: link.chapter } : {}) });
    });
    return groups;
  }
  const api = { normalize, kind, excerpt, chapterSections, timeline, aliases, profile, search, groupedConnections };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CharacterReference = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
