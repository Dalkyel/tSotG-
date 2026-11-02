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
  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const LETTER = 'A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF\\u00D0\\u00F0\\u00DE\\u00FE';
  function buildMentionMatcher(nodes, revisions, guides) {
    const seen = new Set();
    const entries = [];
    // Every node is mentionable (characters, places, objects, factions, events, lore, …)
    // except the CENTER/CAT structural hubs, which aren't real archive entries.
    nodes.filter(n => !['CENTER', 'CAT'].includes(n.group)).forEach(node => {
      const id = node.id;
      const isPerson = kind(node);
      aliases(node, revisions, guides).forEach(raw => {
        const stripped = String(raw || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
        // Shared-ficha labels ("Mord y Lif", "Urd, Verdandi y Skuld") name several people in
        // one node with no individual alias of their own. Keep the combined phrase as a
        // candidate but also split it, so a lone mention of "Skuld" still links somewhere.
        // Only people/gods/beings get this treatment: an event or plot title like "Viaje y
        // venta de Berak" is one phrase, not two entities, and splitting it on "y" would turn
        // ordinary words into spurious links.
        const parts = isPerson ? stripped.split(/,\s*|\s+y\s+/).map(p => p.trim()).filter(Boolean) : [];
        const candidates = parts.length > 1 ? [stripped, ...parts] : [stripped];
        candidates.forEach(name => {
          const key = name.toLowerCase();
          // Skip the lowercase id-slug fallback aliases() always includes first (e.g. "varg" for
          // id "varg") so they never shadow the real, properly-cased name ("Varg") in the dedup.
          if (name.length < 3 || !/^[A-ZÀ-ÖØ-ÞÐ]/.test(name) || seen.has(key)) return;
          seen.add(key);
          entries.push({ name, id });
        });
      });
    });
    entries.sort((a, b) => b.name.length - a.name.length);
    const byName = new Map(entries.map(e => [e.name, e.id]));
    const pattern = entries.map(e => escapeRegExp(e.name)).join('|');
    // No lookbehind here on purpose: (?<!...) didn't ship in Safari until 16.4 (2023), so
    // building it throws a SyntaxError on older/unpatched iOS and silently breaks every
    // caller downstream. The leading boundary is a capture group instead — group 1 is the
    // actual name, and findMentions derives its start offset from the surrounding match.
    const regex = pattern ? new RegExp(`(?:^|[^${LETTER}])(${pattern})(?![${LETTER}])`, 'g') : null;
    return { regex, idFor: name => byName.get(name) };
  }
  function findMentions(text, matcher) {
    if (!matcher?.regex || !text) return [];
    const matches = [];
    for (const m of String(text).matchAll(matcher.regex)) {
      const name = m[1];
      const start = m.index + (m[0].length - name.length);
      matches.push({ start, end: start + name.length, text: name, id: matcher.idFor(name) });
    }
    return matches;
  }
  const api = { normalize, kind, excerpt, chapterSections, timeline, aliases, profile, search, groupedConnections, buildMentionMatcher, findMentions };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CharacterReference = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
