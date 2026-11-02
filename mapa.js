const linkColors = {
  cat: '#9d875c',
  arc: '#9f9476',
  rel: '#ad8acb',
  magic: '#62bdb6',
  conflict: '#dc736a',
  goal: '#d1b75d',
  event: '#bd9867',
  lore: '#80b889',
  history: '#b18bb3',
  geo: '#7ca68b',
  trama: '#dbb16c',
};

// ═══════════════════════════════════════════════════════
// DATA MERGE: Combine Book 1 + Book 2 data
// ═══════════════════════════════════════════════════════

// data-init.js has merged the full archive for every view.

// ═══════════════════════════════════════════════════════
// D3 SETUP
// ═══════════════════════════════════════════════════════
const svg = d3.select('#graph');
const container = document.getElementById('graph-container');
const width = () => container.clientWidth;
const height = () => container.clientHeight;

const g = svg.append('g');

// Zoom
const zoom = d3.zoom()
  .scaleExtent([0.15, 3])
  .on('zoom', e => { g.attr('transform', e.transform); window.refreshMapReadability?.(); });
svg.call(zoom);

// Arrow markers
const defs = svg.append('defs');
Object.entries(linkColors).forEach(([type, color]) => {
  defs.append('marker')
    .attr('id', `arrow-${type}`)
    .attr('viewBox', '0 -4 8 8')
    .attr('refX', 18)
    .attr('refY', 0)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-4L8,0L0,4')
    .attr('fill', color)
    .attr('opacity', 0.6);
});

// ── Force simulation ─────────────────────────────────
const nodeMap = {};
nodes.forEach(n => {
  const g = GROUPS[n.group];
  n.r = g?.r || 12;
  n.color = g?.color || '#3a3a3a';
  n.stroke = g?.stroke || '#8a8a8a';
  nodeMap[n.id] = n;
});

// ── Narrative clustering force ───────────────────────────
// Assigns each node to a POV cluster (orka, varg, elvar) based on
// link connectivity, then pulls toward that POV's centroid.
const POV_IDS = ['orka', 'varg', 'elvar'];

function computeAffinity(nodes, links) {
  const affinity = {}; // nodeId -> 'orka'|'varg'|'elvar'|null
  // Build adjacency
  const adj = {};
  nodes.forEach(n => { adj[n.id] = new Set(); });
  links.forEach(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source;
    const t = typeof l.target === 'object' ? l.target.id : l.target;
    if (adj[s]) adj[s].add(t);
    if (adj[t]) adj[t].add(s);
  });
  // BFS from each POV, max depth 2
  POV_IDS.forEach(pov => {
    const visited = new Set([pov]);
    let frontier = [pov];
    for (let depth = 0; depth < 2; depth++) {
      const next = [];
      frontier.forEach(id => {
        (adj[id] || []).forEach(nb => {
          if (!visited.has(nb)) { visited.add(nb); next.push(nb); }
        });
      });
      frontier = next;
    }
    visited.forEach(id => {
      if (POV_IDS.includes(id)) return;
      if (!affinity[id]) affinity[id] = {};
      if (!affinity[id][pov]) affinity[id][pov] = 0;
      // Direct neighbors get weight 2, depth-2 get weight 1
      affinity[id][pov] += adj[id]?.has(pov) ? 2 : 1;
    });
  });
  // Resolve: pick POV with highest score; ties go to group heuristic
  const result = {};
  const groupHint = { ORKA: 'orka', VARG: 'varg', ELVAR: 'elvar' };
  nodes.forEach(n => {
    if (POV_IDS.includes(n.id) || n.group === 'CENTER' || n.group === 'CAT') {
      result[n.id] = null;
      return;
    }
    const scores = affinity[n.id];
    if (scores) {
      let best = null, bestVal = 0;
      for (const pov of POV_IDS) {
        if ((scores[pov] || 0) > bestVal) { bestVal = scores[pov]; best = pov; }
      }
      result[n.id] = best;
    } else {
      // Fallback: use group name as hint
      result[n.id] = groupHint[n.group] || null;
    }
  });
  return result;
}

function forceCluster(strength = 0.12) {
  let _nodes;
  let affinityMap;
  function force(alpha) {
    // Compute POV centroids
    const povPos = {};
    _nodes.forEach(n => {
      if (POV_IDS.includes(n.id)) povPos[n.id] = { x: n.x, y: n.y };
    });
    // Also compute group centroids as fallback
    const groupCentroids = {};
    const groupCounts = {};
    _nodes.forEach(n => {
      if (!groupCentroids[n.group]) { groupCentroids[n.group] = { x: 0, y: 0 }; groupCounts[n.group] = 0; }
      groupCentroids[n.group].x += n.x;
      groupCentroids[n.group].y += n.y;
      groupCounts[n.group]++;
    });
    for (const g in groupCentroids) { groupCentroids[g].x /= groupCounts[g]; groupCentroids[g].y /= groupCounts[g]; }

    _nodes.forEach(n => {
      if (n.group === 'CENTER' || n.group === 'CAT' || POV_IDS.includes(n.id)) return;
      const pov = affinityMap[n.id];
      let target;
      if (pov && povPos[pov]) {
        target = povPos[pov];
      } else {
        target = groupCentroids[n.group];
      }
      if (target) {
        n.vx += (target.x - n.x) * strength * alpha;
        n.vy += (target.y - n.y) * strength * alpha;
      }
    });
  }
  force.initialize = function(n) {
    _nodes = n;
    affinityMap = computeAffinity(_nodes, links);
  };
  return force;
}

const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(d => {
    if (d.type === 'cat') return 200;
    if (d.type === 'arc') return 160;
    return 140;
  }).strength(d => d.type === 'cat' ? 0.8 : 0.4))
  .force('charge', d3.forceManyBody().strength(d => {
    if (d.group === 'CENTER') return -1200;
    if (d.group === 'CAT') return -700;
    return -400;
  }))
  .force('center', d3.forceCenter(width() / 2, height() / 2))
  .force('collision', d3.forceCollide(d => d.r + 28))
  .force('cluster', forceCluster(0.12))
  .force('x', d3.forceX(width() / 2).strength(0.02))
  .force('y', d3.forceY(height() / 2).strength(0.02))
  .alphaDecay(0.02)
  .velocityDecay(0.3);

// ── Draw links ─────────────────────────────────────────
const linkSel = g.append('g').attr('class', 'links')
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('class', 'link')
  .attr('stroke', d => linkColors[d.type] || '#9f9476')
  .attr('stroke-dasharray', d => d.book > 1 ? '4,2' : null)
  .attr('marker-end', d => `url(#arrow-${d.type})`);

// ── Draw nodes ──────────────────────────────────────────
const nodeSel = g.append('g').attr('class', 'nodes')
  .selectAll('g')
  .data(nodes)
  .join('g')
  .attr('class', d => `node ${d.group === 'CENTER' ? 'center-node' : ''} ${d.group === 'CAT' ? 'category-node' : ''} ${d.book > 1 ? 'new-book' : ''}`)
  .call(d3.drag()
    .on('start', (e, d) => {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    })
    .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
    .on('end', (e, d) => {
      if (!e.active) simulation.alphaTarget(0);
      d.fx = null; d.fy = null;
    })
  );

nodeSel.append('circle')
  .attr('r', d => d.r)
  .attr('fill', d => d.color)
  .attr('stroke', d => d.stroke)
  .attr('stroke-width', 1.5);

// Names sit outside the circles; readability.js sizes and spaces them at screen scale.
nodeSel.append('text').attr('class', 'map-node-label').attr('text-anchor', 'middle')
  .attr('y', d => d.r + 20).attr('font-size', 14).attr('pointer-events', 'none')
  .text(d => d.label.length > 30 ? d.label.slice(0, 28) + '…' : d.label);
nodeSel.append('title').text(d => `${d.label} — ${d.type}`);
nodeSel.attr('role', 'button').attr('tabindex', 0).attr('aria-label', d => `${d.label}. Abrir detalle.`)
  .on('keydown', (event, d) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectNode(d); }
  });

// ── Tick ───────────────────────────────────────────────
function updateGraphPositions() {
  linkSel
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
  nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  window.refreshMapReadability?.();
}
simulation.on('tick', updateGraphPositions);

// ── Tooltip ────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');
const ttName = document.getElementById('tt-name');
const ttDesc = document.getElementById('tt-desc');

if (!('ontouchstart' in window)) {
  nodeSel
    .on('mouseenter', (e, d) => {
      ttName.textContent = d.label.replace(' ', ' ');
      ttDesc.textContent = d.type;
      tooltip.classList.add('visible');
    })
    .on('mousemove', e => {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top = (e.clientY - 8) + 'px';
    })
    .on('mouseleave', () => tooltip.classList.remove('visible'));
}

// ── Panel ──────────────────────────────────────────────
const panel = document.getElementById('detail-panel');
const pType = document.getElementById('p-type');
const pName = document.getElementById('p-name');
const pDesc = document.getElementById('p-desc');
const pConns = document.getElementById('p-connections');
const pStar = document.getElementById('p-star');
let selectedNode = null;

function showPanel(d) {
  const referenceButton = document.getElementById('p-reference');
  document.getElementById('p-focus').hidden = ['CENTER', 'CAT'].includes(d.group);
  referenceButton.hidden = !CharacterReference.kind(d);
  referenceButton.onclick = () => window.openCharacterReference?.(d.id);
  pType.textContent = d.type;
  pName.textContent = d.label.replace(' ', ' ');
  pDesc.textContent = d.desc;
  document.getElementById('p-overview').textContent = CharacterReference.profile(d, clueSourceRevisions, CHARACTER_GUIDES).intro;
  document.getElementById('p-full-description').open = false;
  const bookmark = document.getElementById('p-bookmark'); bookmark.replaceChildren();
  if (!['CENTER', 'CAT'].includes(d.group)) bookmark.append(BookmarkUI.button('node', d.id));
  const notes = document.querySelector('.panel-original-notes'); notes.hidden = !d.star; notes.open = false;
  pStar.replaceChildren();
  if (d.star) { const note = document.createElement('div'); note.className = 'star-note'; note.textContent = d.star; pStar.append(note); }
  document.getElementById('p-connection-search').value = '';
  const typeSelect = document.getElementById('p-connection-type');
  typeSelect.replaceChildren(new Option('Todos los vínculos', ''));
  [...new Set(links.filter(l => l.source.id === d.id || l.target.id === d.id).map(l => l.type))]
    .forEach(type => typeSelect.add(new Option(mapRelationTypes[type] || type, type)));
  renderPanelConnections();
  panel.classList.remove('hidden');
}

const mapRelationTypes = { rel: 'Relaciones personales', conflict: 'Conflictos', event: 'Eventos', magic: 'Magia',
  goal: 'Objetivos', trama: 'Preguntas y tramas', lore: 'Trasfondo', history: 'Historia', geo: 'Geografía', arc: 'Arcos', cat: 'Categorías' };
function renderPanelConnections() {
  if (!selectedNode) return;
  const id = selectedNode.id, query = CharacterReference.normalize(document.getElementById('p-connection-search').value);
  const type = document.getElementById('p-connection-type').value;
  const all = links.filter(l => l.source.id === id || l.target.id === id);
  const matches = all.filter(l => {
    const other = l.source.id === id ? l.target : l.source;
    return (!type || l.type === type) && (!query ||
      CharacterReference.normalize(`${other.label} ${l.label}`).includes(query) ||
      mapSearchNames.get(other.id)?.some(name => name.includes(query)));
  });
  document.getElementById('p-connection-count').textContent = `${matches.length} de ${all.length} vínculos registrados`;
  pConns.replaceChildren();
  const make = (tag, text, className) => { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (className) el.className = className; return el; };
  for (const [key, label] of Object.entries(mapRelationTypes)) {
    const records = matches.filter(l => l.type === key); if (!records.length) continue;
    const group = make('details', undefined, 'conn-group'); group.open = !!query || !!type || key === 'rel' || all.length <= 10;
    group.append(make('summary', `${label} (${records.length})`));
    const others = new Map();
    records.forEach(l => { const other = l.source.id === id ? l.target : l.source; if (!others.has(other.id)) others.set(other.id, { node: other, records: [] }); others.get(other.id).records.push(l); });
    [...others.values()].sort((a, b) => a.node.label.localeCompare(b.node.label, 'es')).forEach(item => {
      const row = make('div', undefined, 'conn-item'); row.style.borderLeftColor = item.node.stroke;
      const content = make('div'); const target = make('button', item.node.label, 'conn-name conn-target'); target.type = 'button';
      target.addEventListener('click', () => selectNode(item.node)); content.append(target);
      const description = l => `${l.source.label} → ${l.label || label} → ${l.target.label}`;
      const latest = item.records.at(-1);
      content.append(make('p', description(latest), 'conn-rel'));
      content.append(make('small', `Libro ${latest.book || 1}${Number.isInteger(latest.chapter) ? ` · Capítulo ${latest.chapter}` : ''}`, 'conn-source'));
      if (item.records.length > 1) {
        const history = make('details', undefined, 'conn-records'); history.append(make('summary', `Ver los ${item.records.length} registros`));
        item.records.forEach(l => history.append(make('p', `${description(l)} · Libro ${l.book || 1}${Number.isInteger(l.chapter) ? `, capítulo ${l.chapter}` : ''}`, 'conn-rel')));
        content.append(history);
      }
      row.append(content); group.append(row);
    });
    pConns.append(group);
  }
  if (!matches.length) pConns.append(make('p', 'No hay vínculos que coincidan con la búsqueda.'));
}
document.getElementById('p-connection-search').addEventListener('input', renderPanelConnections);
document.getElementById('p-connection-type').addEventListener('change', renderPanelConnections);

function selectNode(d) {
  window.clearMapRelationship?.();
  selectedNode = d;
  showPanel(d);

  // Highlight connected
  const connectedIds = new Set([d.id]);
  links.forEach(l => {
    if (l.source.id === d.id) connectedIds.add(l.target.id);
    if (l.target.id === d.id) connectedIds.add(l.source.id);
  });

  nodeSel
    .classed('selected', nd => nd.id === d.id)
    .classed('faded', nd => !connectedIds.has(nd.id));

  linkSel
    .classed('highlighted', l => l.source.id === d.id || l.target.id === d.id)
    .classed('faded', l => l.source.id !== d.id && l.target.id !== d.id);
  window.refreshMapReadability?.();
}

function clearSelection() {
  window.clearMapRelationship?.();
  selectedNode = null;
  nodeSel.classed('selected faded', false);
  linkSel.classed('highlighted faded', false);
  panel.classList.add('hidden');
  window.refreshMapReadability?.();
}

nodeSel.on('click', (e, d) => {
  e.stopPropagation();
  if (selectedNode && selectedNode.id === d.id) clearSelection();
  else selectNode(d);
});

svg.on('click', clearSelection);
document.getElementById('panel-close').addEventListener('click', clearSelection);

// ── Zoom controls ─────────────────────────────────────
document.getElementById('btn-zoom-in').addEventListener('click', () => {
  svg.transition().duration(300).call(zoom.scaleBy, 1.4);
});
document.getElementById('btn-zoom-out').addEventListener('click', () => {
  svg.transition().duration(300).call(zoom.scaleBy, 0.7);
});
function resetZoom(animate) {
  let t = d3.zoomIdentity.translate(width() / 2, height() / 2).scale(0.75).translate(-width() / 2, -height() / 2);

  (animate ? svg.transition().duration(500) : svg).call(zoom.transform, t);
}

document.getElementById('btn-reset').addEventListener('click', () => resetZoom(true));

// ── Search functionality ──────────────────────────────
const searchInput = document.getElementById('search-input');
const visibleSearchRevisions = clueSourceRevisions;
const mapSearchNames = new Map(nodes.map(n => [n.id,
  CharacterReference.aliases(n, visibleSearchRevisions, CHARACTER_GUIDES).map(CharacterReference.normalize),
]));
if (!searchInput) {
  console.error('Search input not found');
} else {
  let searchTimeout;
  const isMobile = 'ontouchstart' in window;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) { clearSelection(); return; }
      const matchIds = new Set();
      const normalizedQuery = CharacterReference.normalize(query);
      nodes.forEach(n => {
        if (mapSearchNames.get(n.id).some(name => name.includes(normalizedQuery))) {
          matchIds.add(n.id);
        }
      });
      if (matchIds.size) {
        nodeSel
          .classed('selected', n => matchIds.has(n.id))
          .classed('faded', n => !matchIds.has(n.id));
        linkSel.classed('highlighted', false).classed('faded', false);
        const exact = nodes.find(n => n.label.toLowerCase() === query || n.id.toLowerCase() === query);
        if (exact) selectNode(exact);
      } else {
        nodeSel.classed('selected', false).classed('faded', true);
        linkSel.classed('highlighted', false).classed('faded', true);
      }
      window.refreshMapReadability?.();
    }, isMobile ? 300 : 150);
  });
  if (isMobile) {
    searchInput.addEventListener('focus', () => searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    document.querySelector('.controls').addEventListener('touchstart', e => e.stopPropagation(), { passive: false });
  }
}

// Initial zoom
setTimeout(() => resetZoom(false), 100);

// Resize
window.addEventListener('resize', () => {
  simulation.force('center', d3.forceCenter(width() / 2, height() / 2));
  simulation.alpha(0.1).restart();
});

// ── Summary Panel ─────────────────────────────────────
const summaryPanel = document.getElementById('summary-panel');
const chapterListEl = document.getElementById('chapter-list');
const chapterPaneEl = document.getElementById('chapter-pane');
const btnSummaries = document.getElementById('btn-summaries');
const summaryClose = document.getElementById('summary-close');

const bookTabsEl = document.getElementById('book-tabs');
let activeBookTab = chapterSummaries.at(-1)?.book || MAX_BOOK;
let activeChapter = chapterSummaries.at(-1)?.chapter ?? null;
const mentionMatcher = CharacterReference.buildMentionMatcher(nodes, clueSourceRevisions, CHARACTER_GUIDES);

function renderBookTabs() {
  const books = [...new Set(chapterSummaries.map(ch => ch.book || 1))].sort((a, b) => a - b);
  bookTabsEl.innerHTML = books.map(b =>
    `<button class="book-tab${b === activeBookTab ? ' active' : ''}" data-book="${b}">Libro ${b}</button>`
  ).join('');
  bookTabsEl.querySelectorAll('.book-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeBookTab = parseInt(btn.dataset.book, 10);
      const chaptersInBook = chapterSummaries.filter(ch => (ch.book || 1) === activeBookTab);
      activeChapter = chaptersInBook.at(-1)?.chapter ?? null;
      renderBookTabs();
      renderChapterList();
    });
  });
}

function renderChapterList() {
  // Newest chapter first: on mobile/touch screen readers, reaching the
  // latest entry in a long, ever-growing list costs one swipe instead of
  // scrolling or tabbing past every prior chapter.
  const chapters = chapterSummaries.filter(ch => (ch.book || 1) === activeBookTab).reverse();
  chapterListEl.innerHTML = chapters.map(ch => `
    <button class="reference-result" type="button" data-chapter="${ch.chapter}" aria-current="${ch.chapter === activeChapter}">
      <strong>${ch.title}</strong>
    </button>
  `).join('');
  if (!chapters.length) chapterListEl.innerHTML = '<p class="reference-empty">Todavía no hay resúmenes para este libro.</p>';
  chapterListEl.querySelectorAll('.reference-result').forEach(btn => {
    btn.addEventListener('click', () => showChapter(parseInt(btn.dataset.chapter, 10)));
  });
  showChapter(activeChapter);
}

function showChapter(chapter) {
  const entry = chapterSummaries.find(ch => (ch.book || 1) === activeBookTab && ch.chapter === chapter);
  activeChapter = entry?.chapter ?? null;
  chapterListEl.querySelectorAll('.reference-result').forEach(btn =>
    btn.setAttribute('aria-current', parseInt(btn.dataset.chapter, 10) === activeChapter));
  if (!entry) { chapterPaneEl.innerHTML = '<p class="reference-empty">Todavía no hay resúmenes para este libro.</p>'; return; }
  chapterPaneEl.innerHTML = `
    <p class="reference-eyebrow">Libro ${entry.book || 1} · Capítulo ${entry.chapter}</p>
    <h2 class="reference-name">${entry.title}</h2>
    <div class="chapter-text">${entry.summary}</div>
  `;
  linkifyMentions(chapterPaneEl.querySelector('.chapter-text'));
  chapterPaneEl.scrollTop = 0;
}

// Wraps mentions of any archive node (characters, places, objects, factions, events, lore…)
// in clickable links without disturbing
// the existing <strong>/<em>/<br> markup, by walking text nodes rather than the
// raw HTML string.
function linkifyMentions(container) {
  if (!container || !mentionMatcher.regex) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);
  textNodes.forEach(textNode => {
    const matches = CharacterReference.findMentions(textNode.data, mentionMatcher);
    if (!matches.length) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    matches.forEach(m => {
      if (m.start > cursor) fragment.append(textNode.data.slice(cursor, m.start));
      const link = document.createElement('button');
      link.type = 'button'; link.className = 'mention'; link.dataset.id = m.id;
      link.textContent = m.text;
      fragment.append(link);
      cursor = m.end;
    });
    if (cursor < textNode.data.length) fragment.append(textNode.data.slice(cursor));
    textNode.replaceWith(fragment);
  });
}

chapterPaneEl.addEventListener('click', event => {
  const link = event.target.closest('.mention');
  if (!link) return;
  const id = link.dataset.id;
  if (CharacterReference.kind(nodeMap[id])) window.openCharacterReference(id);
  else window.openRelationshipMap(id);
});

function loadSummaries() {
  renderBookTabs();
  renderChapterList();
}

function openSummaries() {
  if (bookTabsEl.innerHTML === '') loadSummaries();
  if (!summaryPanel.open) summaryPanel.showModal();
}

btnSummaries.addEventListener('click', openSummaries);
summaryClose.addEventListener('click', () => summaryPanel.close());
openSummaries();
summaryClose.addEventListener('click', () => summaryPanel.classList.remove('visible'));
