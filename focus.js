(() => {
  'use strict';
  const graph = FocusMap.index(nodes, links);
  const kinds = { characters: 'Personajes y dioses', factions: 'Compañías y poderes', events: 'Eventos', plots: 'Preguntas y tramas',
    places: 'Lugares', magic: 'Magia', lore: 'Objetos, criaturas y trasfondo' };
  const types = { rel: 'Relaciones', conflict: 'Conflictos', event: 'Eventos', magic: 'Magia', goal: 'Objetivos',
    trama: 'Tramas', lore: 'Trasfondo', history: 'Historia', geo: 'Geografía', arc: 'Arcos narrativos' };
  const normalize = CharacterReference.normalize;
  const isMobile = () => matchMedia('(max-width: 768px)').matches;
  const batchSize = () => matchMedia('(max-width: 1100px)').matches ? 6 : 12;
  const preferred = {
    ...CHARACTER_KEY_LINKS,
    orka: [...CHARACTER_KEY_LINKS.orka, 'mord-lif', 'saeunn', 'elvar', 'myrk', 'spert', 'vesli', 'halja', 'varg'],
    varg: [...CHARACTER_KEY_LINKS.varg, 'rokia', 'einar', 'torvik', 'terna', 'brimil', 'brak-trolls-bane', 'leif', 'refna'],
    elvar: [...CHARACTER_KEY_LINKS.elvar, 'agnar', 'bjarn', 'sighvat', 'orka', 'ulfrir', 'skuld', 'ilska', 'brodir'],
  };
  const initialState = id => {
    const next = FocusMap.initial(id); next.limits[id] = batchSize(); return next;
  };
  const searchNames = new Map([...graph.nodes.values()].map(n => [n.id,
    CharacterReference.aliases(n, clueSourceRevisions.filter(r => r.book <= BOOK_CAP), ACTIVE_CHARACTER_GUIDES).map(normalize)]));
  let state = null, current = null, past = [], future = [], layout = [], layoutLinks = [];
  let cache = new Map(), selectedEdge = null, hoveredEdge = null;
  const el = (tag, text, className) => {
    const n = document.createElement(tag); if (text !== undefined) n.textContent = text;
    if (className) n.className = className; return n;
  };
  const button = (text, handler, className) => {
    const b = el('button', text, className); b.type = 'button'; b.addEventListener('click', handler); return b;
  };
  const dialog = el('dialog', undefined, 'focus-dialog');
  dialog.id = 'relationship-map'; dialog.setAttribute('aria-labelledby', 'focus-heading');
  dialog.innerHTML = `
    <div class="focus-heading"><div><h1 id="focus-heading">Explorar conexiones</h1>
      <p id="focus-subtitle"></p></div><button id="focus-close" type="button">Cerrar ✕</button></div>
    <div class="focus-toolbar">
      <div class="focus-search"><label for="focus-search">Buscar otro centro</label><input id="focus-search" type="search" autocomplete="off" placeholder="Personaje, evento, pista…" aria-controls="focus-search-results" aria-expanded="false"><div id="focus-search-results" hidden></div></div>
      <label>Mostrar nodos<select id="focus-kind"><option value="">Todos los tipos</option></select></label>
      <label>Tipo de vínculo<select id="focus-type"><option value="">Todos los vínculos</option></select></label>
    </div>
    <nav class="focus-navigation" aria-label="Navegación del mapa">
      <button id="focus-back" type="button">← Volver</button><button id="focus-forward" type="button">Adelante →</button>
      <button id="focus-reset" type="button">Solo conexiones iniciales</button><button id="focus-fit" type="button">Ajustar vista</button>
      <button id="focus-full" type="button">Mapa completo ↗</button>
    </nav>
    <p class="focus-instructions">Pulsa un nodo para leer sus vínculos; usa «Mostrar más conexiones» para abrir una rama. Pulsa una línea para leer la relación.</p>
    <div class="focus-body"><section class="focus-canvas" aria-label="Mapa de conexiones">
      <p id="focus-count" role="status" aria-live="polite"></p><svg id="focus-graph" aria-label="Red de relaciones del tema elegido"></svg>
      <div class="focus-zoom"><button id="focus-zoom-in" type="button" aria-label="Acercar mapa de conexiones">+</button><button id="focus-zoom-out" type="button" aria-label="Alejar mapa de conexiones">−</button></div>
    </section><aside id="focus-detail" aria-label="Detalle de la selección"></aside></div>`;
  document.body.append(dialog);
  const $ = id => document.getElementById(id);
  Object.entries(kinds).forEach(([key, label]) => $('focus-kind').add(new Option(label, key)));
  Object.entries(types).forEach(([key, label]) => $('focus-type').add(new Option(label, key)));
  const canvas = d3.select('#focus-graph');
  const scene = canvas.append('g');
  const defs = canvas.append('defs');
  ['start', 'end'].forEach(direction => {
    defs.append('marker').attr('id', `focus-arrow-${direction}`).attr('viewBox', '0 -5 10 10')
      .attr('refX', direction === 'end' ? 10 : 0).attr('refY', 0).attr('markerWidth', 5).attr('markerHeight', 5)
      .attr('orient', 'auto-start-reverse').append('path').attr('d', 'M0,-4L9,0L0,4').attr('fill', '#b6a077');
  });
  const edgeLayer = scene.append('g'), nodeLayer = scene.append('g');
  const edgeLabel = scene.append('text').attr('class', 'focus-edge-label').attr('text-anchor', 'middle').attr('pointer-events', 'none').style('display', 'none');
  const localZoom = d3.zoom().scaleExtent([0.18, 2.8]).on('zoom', event => {
    scene.attr('transform', event.transform); scaleLabels(event.transform.k);
  });
  canvas.call(localZoom).on('dblclick.zoom', null);
  const clone = value => JSON.parse(JSON.stringify(value));
  function snapshot() {
    const transform = d3.zoomTransform(canvas.node());
    return { state: clone(state), positions: layout.map(n => [n.id, { x: n.x, y: n.y }]),
      camera: { x: transform.x, y: transform.y, k: transform.k } };
  }
  function commit(next) {
    if (JSON.stringify(next) === JSON.stringify(state)) return;
    if (state) past.push(snapshot());
    future = []; state = next; selectedEdge = null; hoveredEdge = null; render();
  }
  function travel(from, to) {
    if (!from.length) return;
    to.push(snapshot()); const entry = from.pop(); state = entry.state;
    cache = new Map(entry.positions); selectedEdge = null; hoveredEdge = null; render(entry.camera);
  }
  function center(id) {
    const next = initialState(id);
    if (state) { next.nodeKind = state.nodeKind; next.linkType = state.linkType; }
    commit(next);
  }
  function scaleLabels(scale) {
    nodeLayer.selectAll('text').attr('font-size', 14 / scale);
    nodeLayer.selectAll('.focus-node-hit').attr('x', -22 / scale).attr('y', -22 / scale)
      .attr('width', 44 / scale).attr('height', 44 / scale);
    edgeLabel.attr('font-size', 14 / scale); updateEdgeLabel();
  }
  function fit() {
    if (!layout.length || !dialog.open) return;
    const w = canvas.node().clientWidth, h = canvas.node().clientHeight;
    const x0 = d3.min(layout, n => n.x) - 140, x1 = d3.max(layout, n => n.x) + 140;
    const y0 = d3.min(layout, n => n.y) - 65, y1 = d3.max(layout, n => n.y) + 80;
    const scale = Math.max(0.18, Math.min(1.3, w / (x1 - x0), h / (y1 - y0)) * 0.88);
    canvas.call(localZoom.transform, d3.zoomIdentity.translate(w / 2 - (x0 + x1) / 2 * scale, h / 2 - (y0 + y1) / 2 * scale).scale(scale));
  }
  function position() {
    edgeLayer.selectAll('.focus-edge').attr('transform', null).each(function (edge) {
      const dx = edge.target.x - edge.source.x, dy = edge.target.y - edge.source.y;
      const distance = Math.hypot(dx, dy) || 1, ux = dx / distance, uy = dy / distance;
      const x1 = edge.source.x + ux * 25, y1 = edge.source.y + uy * 25;
      const x2 = edge.target.x - ux * 25, y2 = edge.target.y - uy * 25;
      d3.select(this).selectAll('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);
    });
    nodeLayer.selectAll('.focus-node').attr('transform', n => `translate(${n.x},${n.y})`);
    layout.forEach(n => cache.set(n.id, { x: n.x, y: n.y }));
    updateEdgeLabel();
  }
  function activateNode(id) {
    state.selectedId = id; selectedEdge = null; hoveredEdge = null; highlight(); renderDetail();
    revealDetail();
  }
  function revealDetail() {
    const heading = $('focus-detail').querySelector('h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    if (isMobile()) $('focus-detail').scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  function keyboardActivate(event, action) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); action(); }
  }
  function render(camera) {
    current = FocusMap.view(graph, state, preferred);
    if (!current.ids.has(state.selectedId)) state.selectedId = state.rootId;
    $('focus-kind').value = state.nodeKind; $('focus-type').value = state.linkType;
    $('focus-back').disabled = !past.length; $('focus-forward').disabled = !future.length;
    $('focus-subtitle').textContent = `${graph.nodes.get(state.rootId).label} · ${READING_LABEL}`;
    const rootTotal = FocusMap.neighbors(graph, state.rootId, state, preferred).length;
    $('focus-count').textContent = `${current.nodes.length} nodos · ${current.edges.length} conexiones agrupadas · ${rootTotal} vecinos directos del centro con estos filtros`;
    layout = current.nodes.map((n, i) => ({ ...n,
      x: n.id === state.rootId ? 0 : cache.get(n.id)?.x ?? Math.cos(i / current.nodes.length * Math.PI * 2) * 260,
      y: n.id === state.rootId ? 0 : cache.get(n.id)?.y ?? Math.sin(i / current.nodes.length * Math.PI * 2) * 260,
      vx: 0, vy: 0, fx: n.id === state.rootId ? 0 : null, fy: n.id === state.rootId ? 0 : null,
    }));
    layoutLinks = current.edges.map(edge => ({ ...edge }));
    const localSimulation = d3.forceSimulation(layout).stop()
      .force('link', d3.forceLink(layoutLinks).id(n => n.id).distance(190).strength(0.45))
      .force('charge', d3.forceManyBody().strength(-700))
      .force('collision', d3.forceCollide(76))
      .force('x', d3.forceX(0).strength(0.025)).force('y', d3.forceY(0).strength(0.025));
    if (!camera) localSimulation.tick(100);
    const edges = edgeLayer.selectAll('.focus-edge').data(layoutLinks, edge => edge.key).join('g')
      .attr('class', 'focus-edge').attr('role', 'button').attr('tabindex', 0)
      .attr('aria-label', edge => `${edge.source.label} y ${edge.target.label}: ${edge.records.length} vínculos`)
      .on('click', (event, edge) => { selectedEdge = edge.key; highlight(); renderDetail(); revealDetail(); })
      .on('pointerenter.readability', (event, edge) => { if (event.pointerType !== 'touch') { hoveredEdge = edge.key; updateEdgeLabel(); } })
      .on('pointerleave.readability', () => { hoveredEdge = null; updateEdgeLabel(); })
      .on('keydown', (event, edge) => keyboardActivate(event, () => { selectedEdge = edge.key; highlight(); renderDetail(); revealDetail(); }));
    edges.selectAll('*').remove();
    edges.append('line').attr('class', 'focus-edge-hit');
    edges.append('line').attr('class', 'focus-edge-line')
      .attr('stroke', edge => linkColors[edge.records[0].type] || '#9b855f')
      .attr('marker-end', edge => edge.records.some(r => r.source === edge.source.id) ? 'url(#focus-arrow-end)' : null)
      .attr('marker-start', edge => edge.records.some(r => r.source === edge.target.id) ? 'url(#focus-arrow-start)' : null);
    edges.append('title').text(edge => edge.records.map(r => `${graph.nodes.get(r.source).label} → ${r.label} → ${graph.nodes.get(r.target).label}`).join('\n'));
    const drawnNodes = nodeLayer.selectAll('.focus-node').data(layout, n => n.id).join('g')
      .attr('class', 'focus-node').attr('role', 'button').attr('tabindex', 0)
      .attr('aria-label', n => `${n.label}. Leer vínculos y ampliar conexiones.`)
      .on('click', (event, n) => activateNode(n.id))
      .on('keydown', (event, n) => keyboardActivate(event, () => activateNode(n.id)))
      .call(d3.drag().on('drag', (event, n) => { n.x = event.x; n.y = event.y; position(); }));
    drawnNodes.selectAll('*').remove();
    drawnNodes.append('rect').attr('class', 'focus-node-hit').attr('fill', 'transparent');
    drawnNodes.append('circle').attr('r', n => n.id === state.rootId ? 26 : 21)
      .attr('fill', n => n.color || GROUPS[n.group]?.color || '#3a3a3a').attr('stroke', n => n.stroke || GROUPS[n.group]?.stroke || '#b89a69');
    drawnNodes.append('text').attr('y', 46).attr('text-anchor', 'middle')
      .text(n => n.label.length > 28 ? n.label.slice(0, 26) + '…' : n.label);
    drawnNodes.append('title').text(n => `${n.label}\n${n.type}`);
    position(); highlight(); renderDetail();
    if (camera) canvas.call(localZoom.transform, d3.zoomIdentity.translate(camera.x, camera.y).scale(camera.k));
    else fit();
  }
  function highlight() {
    nodeLayer.selectAll('.focus-node').classed('focus-root', n => n.id === state.rootId)
      .classed('focus-selected', n => !selectedEdge && n.id === state.selectedId)
      .classed('focus-expanded', n => state.expanded.includes(n.id));
    edgeLayer.selectAll('.focus-edge').classed('focus-edge-selected', edge => selectedEdge ? edge.key === selectedEdge :
      edge.source.id === state.selectedId || edge.target.id === state.selectedId);
    updateEdgeLabel();
  }
  function updateEdgeLabel() {
    const edge = layoutLinks.find(item => item.key === (hoveredEdge || selectedEdge));
    if (!edge) { edgeLabel.style('display', 'none'); return; }
    const record = edge.records[0], text = record.label || types[record.type] || record.type;
    const k = d3.zoomTransform(canvas.node()).k;
    edgeLabel.style('display', null).attr('font-size', 14 / k).attr('x', (edge.source.x + edge.target.x) / 2)
      .attr('y', (edge.source.y + edge.target.y) / 2 - 9 / k)
      .text(`${text.length > 55 ? text.slice(0, 53) + '…' : text}${edge.records.length > 1 ? ` (+${edge.records.length - 1})` : ''}`);
  }
  function expand(id, all = false) {
    const total = FocusMap.neighbors(graph, id, state, preferred).length;
    const next = clone(state);
    if (!next.expanded.includes(id)) next.expanded.push(id);
    next.limits[id] = all ? total : Math.min(total, (next.limits[id] || 0) + batchSize());
    commit(next);
    if (isMobile()) document.querySelector('.focus-canvas').scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  function recordText(record) {
    return `${graph.nodes.get(record.source).label} → ${record.label || types[record.type] || record.type} → ${graph.nodes.get(record.target).label}`;
  }
  function renderDetail() {
    const pane = $('focus-detail'); pane.replaceChildren();
    if (selectedEdge) {
      const edge = current.edges.find(e => e.key === selectedEdge);
      if (!edge) { selectedEdge = null; renderDetail(); return; }
      pane.append(el('p', 'Relación seleccionada', 'focus-eyebrow'), el('h2', `${graph.nodes.get(edge.source).label} ↔ ${graph.nodes.get(edge.target).label}`));
      pane.append(el('p', 'Vínculos registrados a lo largo de la lectura.', 'focus-muted'));
      [edge.source, edge.target].forEach(id => pane.append(button(`Ver ${graph.nodes.get(id).label}`, () => activateNode(id))));
      edge.records.forEach(record => {
        const item = el('div', undefined, 'focus-record');
        item.append(el('p', recordText(record)), el('small', `Libro ${record.book}${Number.isInteger(record.chapter) ? ` · Capítulo ${record.chapter}` : ''} · ${types[record.type] || record.type}`)); pane.append(item);
      });
      return;
    }
    const id = state.selectedId, node = graph.nodes.get(id);
    const p = CharacterReference.profile(node, clueSourceRevisions, BOOK_CAP, ACTIVE_CHARACTER_GUIDES);
    pane.append(el('p', id === state.rootId ? 'Centro del mapa' : node.type, 'focus-eyebrow'), el('h2', node.label), el('p', p.intro));
    pane.append(BookmarkUI.button('node', id));
    const neighbors = FocusMap.neighbors(graph, id, state, preferred);
    const hidden = neighbors.filter(item => !current.ids.has(item.id)).length;
    pane.append(el('p', `${neighbors.length} vecinos con estos filtros · ${hidden} fuera de la vista`, 'focus-muted'));
    const expandButton = button(`Mostrar más conexiones (${hidden} fuera de la vista)`, () => expand(id), 'focus-primary');
    expandButton.disabled = !hidden; pane.append(expandButton);
    if (hidden > 12) pane.append(button('Mostrar todas sus conexiones', () => expand(id, true)));
    if (id !== state.rootId) pane.append(button('Centrar el mapa aquí', () => center(id)));
    if (id !== state.rootId && state.expanded.includes(id)) pane.append(button('Cerrar esta rama', () => {
      const next = clone(state); next.expanded = next.expanded.filter(key => key !== id); delete next.limits[id]; commit(next);
    }));
    if (CharacterReference.kind(node)) pane.append(button('Abrir ficha del personaje', () => { dialog.close(); window.openCharacterReference(id); }));
    const visible = current.edges.filter(edge => edge.source === id || edge.target === id);
    pane.append(el('h3', 'Vínculos visibles'));
    if (!visible.length) pane.append(el('p', 'No hay vínculos visibles con estos filtros. Prueba otro tipo de nodo o de vínculo.'));
    visible.forEach(edge => {
      const other = edge.source === id ? edge.target : edge.source;
      const item = el('div', undefined, 'focus-record');
      item.append(button(graph.nodes.get(other).label, () => activateNode(other), 'focus-text-button'),
        el('p', CharacterReference.excerpt(recordText(edge.records.at(-1)), 190)),
        button(`Leer ${edge.records.length === 1 ? 'el vínculo' : `los ${edge.records.length} vínculos`}`, () => { selectedEdge = edge.key; highlight(); renderDetail(); revealDetail(); }));
      pane.append(item);
    });
    const original = el('details'); original.append(el('summary', 'Descripción original completa'), el('p', node.desc, 'focus-original')); pane.append(original);
  }
  function closeSearch() { $('focus-search-results').hidden = true; $('focus-search').setAttribute('aria-expanded', 'false'); }
  $('focus-search').addEventListener('input', () => {
    const query = normalize($('focus-search').value), list = $('focus-search-results'); list.replaceChildren();
    if (!query) { closeSearch(); return; }
    const matches = [...graph.nodes.values()].map(n => ({ n, score: searchNames.get(n.id).some(name => name === query) ? 2 :
      searchNames.get(n.id).some(name => name.includes(query)) ? 1 : 0 })).filter(item => item.score)
      .sort((a, b) => b.score - a.score || a.n.label.localeCompare(b.n.label, 'es')).slice(0, 10);
    matches.forEach(({ n }) => list.append(button(n.label, () => { center(n.id); closeSearch(); $('focus-search').value = ''; })));
    if (!matches.length) list.append(el('p', 'No hay coincidencias.'));
    list.hidden = false; $('focus-search').setAttribute('aria-expanded', 'true');
  });
  $('focus-search').addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('focus-search-results').hidden) { event.preventDefault(); event.stopPropagation(); closeSearch(); }
    if (event.key === 'Enter') { event.preventDefault(); $('focus-search-results').querySelector('button')?.click(); }
    if (event.key === 'ArrowDown') { event.preventDefault(); $('focus-search-results').querySelector('button')?.focus(); }
  });
  dialog.addEventListener('click', event => {
    if (!event.target.closest('.focus-search')) closeSearch();
  });
  ['focus-kind', 'focus-type'].forEach((id, i) => $(id).addEventListener('change', () => {
    const next = clone(state); next[i === 0 ? 'nodeKind' : 'linkType'] = $(id).value; commit(next);
  }));
  $('focus-back').addEventListener('click', () => travel(past, future));
  $('focus-forward').addEventListener('click', () => travel(future, past));
  $('focus-reset').addEventListener('click', () => {
    const next = initialState(state.rootId); next.nodeKind = state.nodeKind; next.linkType = state.linkType; commit(next);
  });
  $('focus-fit').addEventListener('click', fit);
  $('focus-close').addEventListener('click', () => dialog.close());
  $('focus-zoom-in').addEventListener('click', () => canvas.call(localZoom.scaleBy, 1.3));
  $('focus-zoom-out').addEventListener('click', () => canvas.call(localZoom.scaleBy, 0.77));
  $('focus-full').addEventListener('click', () => {
    dialog.close(); const node = nodeMap[state.rootId]; selectNode(node);
    svg.transition().duration(350).call(zoom.transform, d3.zoomIdentity.translate(width() / 2 - node.x, height() / 2 - node.y));
  });
  function open(id) {
    const root = graph.nodes.has(id) ? id : state?.rootId || 'orka';
    if (!graph.nodes.has(root)) return;
    summaryPanel.classList.remove('visible');
    closeSearch(); $('focus-search').value = '';
    if (!dialog.open) dialog.showModal();
    if (!state || root !== state.rootId) { commit(initialState(root)); }
    else render();
  }
  $('btn-focus').addEventListener('click', () => open(selectedNode?.id));
  $('p-focus').addEventListener('click', () => open(selectedNode?.id));
  window.openRelationshipMap = open;
  new ResizeObserver(() => { if (dialog.open && current) fit(); }).observe(canvas.node());
})();
