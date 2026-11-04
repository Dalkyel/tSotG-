(() => {
  'use strict';
  const groupLabels = { CENTER: 'Saga', CAT: 'Categorías',
    ...Object.fromEntries(MapaCore.POV_ARCS.map(arc => [arc.group, `Arco de ${arc.label}`])),
    COSMO: 'Cosmología', LUGAR: 'Lugares', VAESEN: 'Vaesen', TRAMA: 'Preguntas y tramas', FACCION: 'Facciones y poderes',
    EVENTO: 'Eventos', OBJETO: 'Objetos', DIOS: 'Dioses', MAGIA: 'Magia', NORSE: 'Cultura nórdica' };
  const el = (tag, text, className) => {
    const node = document.createElement(tag); if (text !== undefined) node.textContent = text;
    if (className) node.className = className; return node;
  };
  const legend = el('details', undefined, 'map-legend'); legend.id = 'map-legend';
  legend.open = !matchMedia('(max-width: 768px)').matches;
  legend.append(el('summary', 'Leyenda · colores y líneas'), el('p', 'Los colores agrupan las notas por arco o tema.'));
  const colorList = el('div', undefined, 'map-legend-colors');
  const presentGroups = new Set(nodes.map(n => n.group));
  for (const [group, label] of Object.entries(groupLabels)) {
    if (!presentGroups.has(group) || ['CENTER', 'CAT'].includes(group)) continue;
    const item = el('span', undefined, 'map-legend-item');
    const swatch = el('i'); swatch.style.backgroundColor = GROUPS[group]?.color; swatch.style.borderColor = GROUPS[group]?.stroke;
    item.append(swatch, document.createTextNode(label)); colorList.append(item);
  }
  legend.append(colorList);
  const lineList = el('div', undefined, 'map-legend-lines');
  for (const type of ['rel', 'conflict', 'magic', 'trama']) {
    if (!links.some(l => l.type === type)) continue;
    const item = el('span', undefined, 'map-legend-item'), swatch = el('i', undefined, 'legend-line');
    swatch.style.borderColor = linkColors[type]; item.append(swatch, document.createTextNode(mapRelationTypes[type])); lineList.append(item);
  }
  legend.append(lineList, el('p', '→ Dirección registrada del vínculo.'));
  if (nodes.some(n => n.book > 1)) legend.append(el('p', '◌ Borde y línea discontinuos: registro del Libro 2.'));
  legend.append(el('p', 'Acerca para ver más nombres. Selecciona un nodo o una línea para leer sus vínculos.'));
  container.append(legend);
  const focusLegend = legend.cloneNode(true); focusLegend.removeAttribute('id'); focusLegend.className = 'map-legend focus-legend';
  focusLegend.open = false; focusLegend.querySelector('summary').textContent = 'Leyenda';
  document.querySelector('.focus-canvas').append(focusLegend);

  const card = el('section', undefined, 'map-relationship-card'); card.id = 'map-relationship-card'; card.hidden = true;
  card.setAttribute('aria-label', 'Relación seleccionada'); container.append(card);
  const relationLabel = g.append('text').attr('class', 'map-relationship-label').attr('text-anchor', 'middle').attr('pointer-events', 'none').style('display', 'none');
  let hoveredId = null, hoveredLink = null, chosenLink = null, pending = false;
  const degree = new Map(nodes.map(n => [n.id, 0]));
  links.forEach(l => { degree.set(l.source.id, degree.get(l.source.id) + 1); degree.set(l.target.id, degree.get(l.target.id) + 1); });
  function short(text, size) { return text.length > size ? text.slice(0, size - 1) + '…' : text; }
  function relationshipText(link) { return `${link.source.label} → ${link.label || mapRelationTypes[link.type] || link.type} → ${link.target.label}`; }
  function pairMatches(a, b) { return a.source.id === b.source.id && a.target.id === b.target.id || a.source.id === b.target.id && a.target.id === b.source.id; }
  function closeRelationship() {
    chosenLink = null; hoveredLink = null; card.hidden = true; linkSel.classed('active-link', false); refresh();
  }
  function chooseRelationship(link) {
    chosenLink = link; hoveredLink = null; card.replaceChildren(); card.hidden = false;
    const close = el('button', 'Cerrar ✕', 'relationship-close'); close.type = 'button'; close.addEventListener('click', closeRelationship);
    card.append(close, el('h2', 'Vínculos registrados'));
    const targets = el('div', undefined, 'relationship-targets');
    [link.source, link.target].forEach(node => {
      const button = el('button', node.label); button.type = 'button'; button.addEventListener('click', () => selectNode(node)); targets.append(button);
    });
    card.append(targets, el('p', 'Pueden corresponder a momentos distintos de la lectura.'));
    links.filter(other => pairMatches(link, other)).forEach(other => {
      const row = el('div', undefined, 'relationship-record');
      row.append(el('p', relationshipText(other)), el('small', `${mapRelationTypes[other.type] || other.type} · Libro ${other.book || 1}${Number.isInteger(other.chapter) ? `, capítulo ${other.chapter}` : ''}`));
      card.append(row);
    });
    linkSel.classed('active-link', other => pairMatches(link, other)); refresh();
  }
  function draw() {
    pending = false;
    const transform = d3.zoomTransform(svg.node()), k = transform.k;
    const w = width(), h = height();
    const connected = new Set(selectedNode ? [selectedNode.id] : []);
    if (selectedNode) links.forEach(l => {
      if (l.source.id === selectedNode.id) connected.add(l.target.id);
      if (l.target.id === selectedNode.id) connected.add(l.source.id);
    });
    const candidates = nodes.map(n => {
      const primary = n.id === selectedNode?.id || n.id === hoveredId;
      const bookmarked = BookmarkUI.has('node', n.id);
      const related = connected.has(n.id);
      const score = primary ? 100000 : related ? 10000 : bookmarked ? 9000 :
        ['CENTER', 'CAT'].includes(n.group) ? 7000 : ['orka', 'varg', 'elvar'].includes(n.id) ? 8000 : degree.get(n.id);
      return { n, primary, score, x: n.x * k + transform.x, y: n.y * k + transform.y };
    }).filter(item => Number.isFinite(item.x) && item.x >= 0 && item.x <= w && item.y > -15 && item.y < h - 25)
      .sort((a, b) => b.score - a.score || a.n.id.localeCompare(b.n.id));
    const occupied = [], shown = new Set(), anchors = new Map();
    // Reserve the visible legend and relationship card, keeping names clear of controls.
    const area = container.getBoundingClientRect();
    [legend, card, document.querySelector('.controls')].forEach(element => {
      if (element.hidden) return;
      const rect = element.getBoundingClientRect();
      occupied.push({ x: rect.left - area.left, y: rect.top - area.top, w: rect.width, h: rect.height });
    });
    const budget = selectedNode ? 90 : k < 0.6 ? 30 : k < 1 ? 65 : k < 1.8 ? 150 : 450;
    for (const item of candidates) {
      if (shown.size >= budget && !item.primary) continue;
      if (selectedNode && !connected.has(item.n.id) && !item.primary) continue;
      const labelWidth = Math.min(30, item.n.label.length) * 7 + 10;
      const anchor = item.x + labelWidth / 2 > w - 6 ? 'end' : item.x - labelWidth / 2 < 6 ? 'start' : 'middle';
      const box = { x: item.x - (anchor === 'end' ? labelWidth : anchor === 'middle' ? labelWidth / 2 : 0), y: item.y + item.n.r * k + 4, w: labelWidth, h: 21 };
      const collides = occupied.some(other => box.x < other.x + other.w && box.x + box.w > other.x && box.y < other.y + other.h && box.y + box.h > other.y);
      if (!item.primary && collides) continue;
      shown.add(item.n.id); anchors.set(item.n.id, anchor); occupied.push(box);
    }
    nodeSel.select('.map-node-label').attr('font-size', 14 / k).attr('y', n => n.r + 17 / k)
      .style('display', n => shown.has(n.id) ? null : 'none').style('opacity', n => n.id === hoveredId ? 1 : null)
      .style('text-anchor', n => anchors.get(n.id) || 'middle');
    nodeSel.attr('tabindex', n => shown.has(n.id) ? 0 : -1);
    const active = hoveredLink || chosenLink;
    if (active) {
      relationLabel.style('display', null).attr('font-size', 14 / k).attr('x', (active.source.x + active.target.x) / 2)
        .attr('y', (active.source.y + active.target.y) / 2 - 8 / k).text(short(active.label || mapRelationTypes[active.type] || active.type, 70));
    } else relationLabel.style('display', 'none');
  }
  function refresh() { if (!pending) { pending = true; requestAnimationFrame(draw); } }
  window.refreshMapReadability = refresh;
  window.clearMapRelationship = closeRelationship;
  legend.addEventListener('toggle', refresh);
  nodeSel.on('pointerenter.readability', (event, node) => { if (event.pointerType !== 'touch') { hoveredId = node.id; refresh(); } })
    .on('pointerleave.readability', () => { hoveredId = null; refresh(); })
    .on('focus.readability', (event, node) => { hoveredId = node.id; refresh(); })
    .on('blur.readability', () => { hoveredId = null; refresh(); });
  linkSel.append('title').text(relationshipText);
  linkSel.on('pointerenter.readability', (event, link) => { if (event.pointerType !== 'touch') { hoveredLink = link; refresh(); } })
    .on('pointerleave.readability', () => { hoveredLink = null; refresh(); })
    .on('click.readability', (event, link) => { event.stopPropagation(); chooseRelationship(link); });
  new ResizeObserver(refresh).observe(container);
  refresh();
})();
