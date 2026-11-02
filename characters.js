(() => {
  'use strict';
  const core = CharacterReference;
  const profiles = nodes.filter(n => core.kind(n)).map(n => core.profile(n, clueSourceRevisions, CHARACTER_GUIDES));
  const byId = new Map(profiles.map(p => [p.node.id, p]));
  const visited = [];
  let activeId = null;
  const categories = { people: 'Personajes y seres con nombre', factions: 'Compañías y poderes', events: 'Eventos',
    plots: 'Preguntas y tramas', places: 'Lugares', lore: 'Linajes, magia y objetos' };
  const types = { rel: 'Relación', conflict: 'Conflicto', event: 'Evento', magic: 'Magia', arc: 'Arco',
    goal: 'Objetivo', lore: 'Trasfondo', history: 'Historia', geo: 'Geografía', trama: 'Trama', cat: 'Categoría' };
  const el = (tag, text, className) => {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (className) item.className = className;
    return item;
  };
  const button = (text, handler, className) => {
    const b = el('button', text, className); b.type = 'button'; b.addEventListener('click', handler); return b;
  };
  const dialog = el('dialog', undefined, 'reference');
  dialog.id = 'character-reference'; dialog.setAttribute('aria-labelledby', 'reference-heading');
  dialog.innerHTML = `
    <div class="reference-header"><div><h1 id="reference-heading">Personajes</h1>
      <p>Una guía para recordar quién es quién · ${DATA_LABEL}</p></div>
      <button id="reference-close" type="button" aria-label="Cerrar índice de personajes">Cerrar ✕</button></div>
    <div class="reference-layout"><aside class="reference-index" aria-label="Índice de personajes">
      <label for="reference-search">Nombre, apodo o título</label>
      <input id="reference-search" type="search" placeholder="Nombre o apodo…" autocomplete="off">
      <label class="reference-sr" for="reference-kind">Tipo de personaje</label>
      <select id="reference-kind"><option value="">Todos los personajes</option><option value="people">Personas</option>
        <option value="gods">Dioses</option><option value="beings">Otros seres con nombre</option></select>
      <div id="reference-protagonists" aria-label="Protagonistas"></div>
      <p id="reference-count" role="status" aria-live="polite"></p><div id="reference-list"></div>
    </aside><article id="reference-profile" aria-label="Ficha del personaje"></article></div>`;
  document.body.append(dialog);
  const $ = id => document.getElementById(id);
  const search = $('reference-search'), filter = $('reference-kind'), pane = $('reference-profile');

  function renderIndex() {
    const matches = core.search(profiles, search.value, filter.value);
    $('reference-count').textContent = `${matches.length} ${matches.length === 1 ? 'ficha' : 'fichas'}`;
    const list = $('reference-list'); list.replaceChildren();
    if (!matches.length) list.append(el('p', 'No hay coincidencias. Prueba un nombre más corto u otro filtro.', 'reference-empty'));
    matches.forEach(p => {
      const b = button('', () => showProfile(p.node.id), 'reference-result');
      b.setAttribute('aria-current', p.node.id === activeId ? 'true' : 'false');
      b.append(el('strong', p.node.label), el('span', core.excerpt(p.intro, 105)), el('small', p.node.type));
      list.append(b);
    });
  }

  function navigateMap(node) {
    dialog.close(); selectNode(node);
    const scale = 1.15;
    svg.transition().duration(400).call(zoom.transform,
      d3.zoomIdentity.translate(width() / 2 - node.x * scale, height() / 2 - node.y * scale).scale(scale));
  }

  function renderConnections(node) {
    const section = el('section', undefined, 'reference-connections');
    section.append(el('h2', 'Relaciones y contexto'));
    const groups = core.groupedConnections(node.id, nodes, links);
    const input = el('input'); input.type = 'search'; input.placeholder = 'Filtrar vínculos por nombre o relación…';
    input.setAttribute('aria-label', 'Filtrar relaciones de este personaje');
    section.append(input, el('p', 'Los vínculos conservan lo registrado en distintos momentos de la historia.', 'reference-muted'));
    const result = el('div'); const count = el('p', '', 'reference-muted'); count.setAttribute('role', 'status');
    section.append(count, result);
    const draw = () => {
      result.replaceChildren(); const query = core.normalize(input.value); let total = 0;
      Object.entries(categories).forEach(([key, label]) => {
        const items = [...(groups.get(key)?.values() || [])].filter(item => !query ||
          core.normalize([item.node.label, item.node.id, ...item.links.map(l => l.label)].join(' ')).includes(query))
          .sort((a, b) => a.node.label.localeCompare(b.node.label, 'es'));
        if (!items.length) return;
        total += items.length;
        const details = el('details', undefined, 'reference-group');
        details.open = !!query || key === 'factions';
        details.append(el('summary', `${label} (${items.length})`));
        const grid = el('div', undefined, 'reference-connection-grid');
        items.forEach(item => {
          const card = el('div', undefined, 'reference-connection');
          card.append(button(item.node.label, () => showProfile(item.node.id), 'reference-link'));
          const record = l => `${l.source} → ${l.label || types[l.type] || l.type} → ${l.target}`;
          const latest = item.links.at(-1);
          card.append(el('p', record(latest)), el('small', `Libro ${latest.book}${Number.isInteger(latest.chapter) ? ` · Capítulo ${latest.chapter}` : ''} · ${types[latest.type] || latest.type}`));
          if (item.links.length > 1) {
            const all = el('details'); all.append(el('summary', `Ver los ${item.links.length} vínculos registrados`));
            item.links.forEach(l => all.append(el('p', `${record(l)} · Libro ${l.book}${Number.isInteger(l.chapter) ? `, capítulo ${l.chapter}` : ''}`)));
            card.append(all);
          }
          grid.append(card);
        });
        details.append(grid); result.append(details);
      });
      count.textContent = `${total} ${total === 1 ? 'tema vinculado' : 'temas vinculados'}`;
      if (!total) result.append(el('p', 'No hay vínculos que coincidan con esta búsqueda.'));
    };
    input.addEventListener('input', draw); draw(); return section;
  }

  function showProfile(id, back = false) {
    const node = nodeMap[id]; if (!node) return;
    if (activeId && activeId !== id && !back) visited.push(activeId);
    activeId = id;
    const p = byId.get(id) || core.profile(node, clueSourceRevisions, {});
    pane.replaceChildren();
    const nav = el('div', undefined, 'reference-profile-nav');
    const previous = button('← Volver a la ficha anterior', () => showProfile(visited.pop(), true));
    previous.disabled = !visited.length;
    nav.append(previous, BookmarkUI.button('node', node.id), button('Explorar conexiones', () => { dialog.close(); window.openRelationshipMap(node.id); }),
      button('Ver en el mapa ↗', () => navigateMap(node)));
    pane.append(nav);
    const heading = el('h2', node.label, 'reference-name'); heading.tabIndex = -1;
    pane.append(el('p', node.type, 'reference-eyebrow'), heading,
      el('p', p.intro, 'reference-intro'));
    if (p.introIsExcerpt) pane.append(el('small', 'Presentación extraída de las notas originales.', 'reference-muted'));
    const extraAliases = p.aliases.filter(a => core.normalize(a) !== core.normalize(node.label) && core.normalize(a) !== core.normalize(node.id));
    if (extraAliases.length) pane.append(el('p', `También puedes buscar: ${extraAliases.join(' · ')}`, 'reference-aliases'));

    if (p.latest) {
      const latest = el('section', undefined, 'reference-latest');
      latest.append(el('h3', 'Último desarrollo registrado'),
        el('p', `Libro ${p.latest.book} · Capítulo ${p.latest.chapter}${p.latest.qualifier ? ' ' + p.latest.qualifier : ''}`, 'reference-eyebrow'),
        el('p', p.latest.preview));
      pane.append(latest);
    }
    const grouped = core.groupedConnections(id, nodes, links);
    const neighbors = new Map([...grouped.values()].flatMap(group => [...group]));
    const keyLinks = (CHARACTER_KEY_LINKS[id] || []).map(key => neighbors.get(key)).filter(Boolean);
    if (keyLinks.length) {
      const keySection = el('section', undefined, 'reference-key-links');
      keySection.append(el('h2', 'Vínculos para orientarte'));
      const grid = el('div', undefined, 'reference-connection-grid');
      keyLinks.forEach(item => {
        const card = el('div', undefined, 'reference-connection');
        const relation = item.links[0];
        card.append(button(item.node.label, () => showProfile(item.node.id), 'reference-link'),
          el('p', CHARACTER_RELATION_HINTS[id]?.[item.node.id] || `${relation.source} → ${relation.label || types[relation.type]} → ${relation.target}`));
        grid.append(card);
      });
      keySection.append(grid); pane.append(keySection);
    }
    pane.append(renderConnections(node));

    if (p.timeline.length) {
      const timeline = el('section', undefined, 'reference-timeline');
      timeline.append(el('h2', 'Recorrido por capítulos'),
        el('p', 'Entradas que tienen un capítulo identificado en tus notas.', 'reference-muted'));
      [...p.timeline].reverse().forEach(event => {
        const entry = el('details');
        entry.append(el('summary', `Libro ${event.book} · Capítulo ${event.chapter}${event.qualifier ? ' ' + event.qualifier : ''}`),
          el('p', core.excerpt(event.text, 220), 'reference-timeline-preview'), el('div', event.text, 'reference-original'));
        timeline.append(entry);
      });
      pane.append(timeline);
    }
    if (node.star) {
      const notes = el('details', undefined, 'reference-archive');
      notes.append(el('summary', 'Observaciones e interrogantes originales'), el('div', node.star, 'reference-original'));
      pane.append(notes);
    }
    const original = el('details', undefined, 'reference-archive');
    original.append(el('summary', 'Descripción completa'), el('div', node.desc, 'reference-original'));
    pane.append(original);
    const archive = el('details', undefined, 'reference-archive');
    archive.append(el('summary', `Historial de fichas originales (${p.revisions.length})`));
    p.revisions.forEach((revision, index) => {
      const item = el('details');
      item.append(el('summary', `Libro ${revision.book} · Registro ${index + 1} · ${revision.label}`));
      if (revision.previousState) item.append(el('h3', 'Estado anterior registrado'), el('div', revision.previousState, 'reference-original'));
      item.append(el('div', revision.desc, 'reference-original'));
      if (revision.star) item.append(el('h3', 'Observación original'), el('div', revision.star, 'reference-original'));
      archive.append(item);
    });
    pane.append(archive);
    renderIndex(); pane.scrollTop = 0;
    if (dialog.open) {
      heading.focus({ preventScroll: true });
      if (matchMedia('(max-width: 768px)').matches) pane.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function open(id, query = '') {
    summaryPanel.classList.remove('visible');
    search.value = query; filter.value = '';
    if (!dialog.open) dialog.showModal();
    if (id) showProfile(id);
    else {
      renderIndex();
      if (!activeId) {
        pane.replaceChildren(el('p', 'Elige un nombre para abrir su ficha', 'reference-eyebrow'),
          el('h2', '¿Quién era este personaje?', 'reference-welcome'),
          el('p', 'Busca por nombre o apodo. Cada ficha reúne un recordatorio breve, el último desarrollo registrado y sus relaciones; la historia completa sigue disponible.'),
          el('h3', 'Protagonistas'));
        const picks = el('div', undefined, 'reference-featured');
        ['orka', 'varg', 'elvar'].forEach(key => {
          const p = byId.get(key); if (!p) return;
          const b = button('', () => showProfile(key));
          b.append(el('strong', p.node.label), el('span', p.intro)); picks.append(b);
        });
        pane.append(picks);
      }
      search.focus();
    }
  }
  ['orka', 'varg', 'elvar'].forEach(id => {
    if (byId.has(id)) $('reference-protagonists').append(button(nodeMap[id].label.split(' ')[0], () => showProfile(id)));
  });
  search.addEventListener('input', renderIndex); filter.addEventListener('change', renderIndex);
  search.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const first = core.search(profiles, search.value, filter.value)[0];
      if (first) { event.preventDefault(); showProfile(first.node.id); }
    }
    if (event.key === 'ArrowDown') { event.preventDefault(); $('reference-list').querySelector('button')?.focus(); }
  });
  $('btn-characters').addEventListener('click', () => open());
  $('reference-close').addEventListener('click', () => dialog.close());
  window.openCharacterReference = open;

  // Give the existing map search actual, clickable results as well as highlights.
  const mapSearch = $('search-input');
  const results = el('div', undefined, 'reference-map-results'); results.id = 'map-search-results'; results.hidden = true;
  results.setAttribute('aria-label', 'Resultados de búsqueda');
  mapSearch.parentElement.append(results);
  mapSearch.setAttribute('aria-controls', results.id); mapSearch.setAttribute('aria-expanded', 'false');
  const closeResults = () => { results.hidden = true; mapSearch.setAttribute('aria-expanded', 'false'); };
  function renderMapResults() {
    const query = mapSearch.value.trim(); results.replaceChildren();
    if (!query) { closeResults(); return; }
    const matches = core.search(profiles, query);
    const others = nodes.filter(n => !byId.has(n.id) && !['CENTER', 'CAT'].includes(n.group) &&
      core.normalize(`${n.id} ${n.label}`).includes(core.normalize(query)));
    [...matches.map(p => p.node), ...others].slice(0, 10).forEach(n => {
      const b = button('', () => {
        closeResults();
        if (byId.has(n.id)) open(n.id); else selectNode(n);
      });
      b.append(el('strong', n.label), el('small', byId.has(n.id) ? 'Abrir ficha de personaje' : n.type)); results.append(b);
    });
    if (!results.children.length) results.append(el('p', 'No hay coincidencias.'));
    results.hidden = false; mapSearch.setAttribute('aria-expanded', 'true');
  }
  mapSearch.addEventListener('input', renderMapResults);
  mapSearch.addEventListener('focus', () => { if (mapSearch.value.trim()) renderMapResults(); });
  mapSearch.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeResults();
    if (event.key === 'ArrowDown') { event.preventDefault(); results.querySelector('button')?.focus(); }
    if (event.key === 'Enter') { event.preventDefault(); results.querySelector('button')?.click(); }
  });
  document.addEventListener('click', event => {
    if (!results.contains(event.target) && event.target !== mapSearch) closeResults();
  });
})();
