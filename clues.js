/* Clue workbench: original book data stays read-only; edits live separately. */
(() => {
  'use strict';
  const { statuses, normalize } = ClueBoard;
  const storageKey = 'bloodsworn-clues-v1';
  let saved = Object.create(null), selectedId = null, dirty = false;
  let startupError = '';
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) saved = ClueBoard.validateBackup(JSON.parse(raw));
  } catch (_) {
    startupError = 'No se pudieron leer las notas guardadas. Exporta una copia antes de guardar nuevos cambios.';
  }
  // Never overwrite unreadable storage with an empty board.
  const storageReadable = !startupError;
  const sourceNodes = new Map();
  clueSourceRevisions.forEach(n => sourceNodes.set(n.id, n));
  const dialog = document.createElement('dialog');
  dialog.id = 'clue-board';
  dialog.setAttribute('aria-labelledby', 'clue-heading');
  dialog.innerHTML = `
    <div class="clue-topbar">
      <div><h1 id="clue-heading">Pistas y preguntas</h1><p>${DATA_LABEL} · Observaciones y teorías del club</p></div>
      <button type="button" id="clue-close" aria-label="Cerrar tablero">Cerrar ✕</button>
    </div>
    <p class="clue-intro">Todas las observaciones y notas guardadas están disponibles. «Por revisar» no significa que una pregunta siga abierta.</p>
    <div class="clue-toolbar">
      <label>Buscar<input id="clue-search" type="search" placeholder="Personaje, pregunta o teoría…"></label>
      <label>Estado<select id="clue-status"><option value="">Todos los estados</option></select></label>
      <label>Vinculada a<select id="clue-node"><option value="">Todos los personajes y temas</option></select></label>
      <button type="button" id="clue-new">+ Nueva pregunta</button>
    </div>
    <div class="clue-transfer"><span>Guardado en este navegador. Para compartir, exporta una copia.</span>
      <button type="button" id="clue-export">Exportar copia</button>
      <button type="button" id="clue-import">Importar copia</button>
      <input type="file" id="clue-file" accept="application/json,.json" hidden>
    </div>
    <p id="clue-message" role="status" aria-live="polite"></p>
    <div class="clue-workspace"><section class="clue-results" aria-label="Resultados">
      <p id="clue-count" aria-live="polite"></p><div id="clue-list"></div>
    </section><section id="clue-detail" aria-label="Detalle de la pista"></section></div>`;
  document.body.append(dialog);
  const $ = id => document.getElementById(id);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const allEntries = () => ClueBoard.entries(clueSourceRevisions, saved);
  const message = text => { $('clue-message').textContent = text; };
  const mayLeave = () => !dirty || window.confirm('Hay cambios sin guardar. ¿Quieres descartarlos?');
  const options = (select, choices) => choices.forEach(([value, text]) => select.add(new Option(text, value)));
  options($('clue-status'), Object.entries(statuses));
  const sortedNodes = [...sourceNodes.values()].sort((a, b) => a.label.localeCompare(b.label, 'es'));
  options($('clue-node'), sortedNodes.map(n => [n.id, n.label]));

  function persist(next) {
    if (!storageReadable) { message(startupError); return false; }
    try {
      localStorage.setItem(storageKey, JSON.stringify({ format: 'bloodsworn-clues', version: 2, entries: Object.values(next) }));
      saved = next;
      return true;
    } catch (_) {
      message('No se pudieron guardar los cambios. Mantén el formulario abierto y comprueba el almacenamiento del navegador.');
      return false;
    }
  }

  function filteredEntries() {
    const query = normalize($('clue-search').value.trim());
    const status = $('clue-status').value, nodeId = $('clue-node').value;
    return allEntries().filter(c => (!status || c.status === status) && (!nodeId || c.nodeIds.includes(nodeId)) &&
      (!query || normalize([c.title, c.note, c.evidence, c.theory, c.chapter,
        ...c.nodeIds.map(id => sourceNodes.get(id)?.label || '')].join(' ')).includes(query)));
  }

  function renderList() {
    const matches = filteredEntries();
    $('clue-count').textContent = `${matches.length} de ${allEntries().length} entradas`;
    const list = $('clue-list');
    list.replaceChildren();
    if (!matches.length) list.append(el('p', 'No hay coincidencias. Prueba otro filtro o crea una pregunta.', 'clue-empty'));
    matches.forEach(c => {
      const button = el('button', undefined, 'clue-card');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(c.id === selectedId));
      button.append(el('span', statuses[c.status], `clue-badge status-${c.status}`), el('strong', c.title),
        el('span', (c.note || c.theory || c.evidence || 'Pregunta del club').slice(0, 180), 'clue-preview'),
        el('small', `${c.origin === 'source' ? 'Nota original' : 'Pregunta del club'} · Libro ${c.book}`));
      button.addEventListener('click', () => {
        if (!mayLeave()) return;
        selectedId = c.id; renderList(); renderDetail(c);
      });
      list.append(button);
    });
  }

  function field(form, label, name, value, multiline = false) {
    const wrapper = el('label', label);
    const input = document.createElement(multiline ? 'textarea' : 'input');
    input.name = name;
    input.value = value || '';
    if (multiline) input.rows = 4;
    wrapper.append(input); form.append(wrapper);
    return input;
  }

  function renderDetail(c, isNew = false) {
    dirty = false;
    const pane = $('clue-detail');
    pane.replaceChildren();
    const heading = el('h2', isNew ? 'Nueva pregunta del club' : c.title);
    heading.tabIndex = -1;
    pane.append(heading);
    if (!isNew) pane.append(BookmarkUI.button('clue', c.id));
    const form = document.createElement('form');
    form.addEventListener('input', () => { dirty = true; });
    form.addEventListener('change', () => { dirty = true; });
    const title = field(form, 'Pregunta o título', 'title', c.title);
    title.required = true;
    const statusLabel = el('label', 'Estado');
    const status = document.createElement('select');
    status.name = 'status'; options(status, Object.entries(statuses)); status.value = c.status;
    statusLabel.append(status); form.append(statusLabel);
    const chapter = field(form, 'Referencia concreta de la evidencia (opcional)', 'chapter', c.chapter);
    chapter.placeholder = 'Ej.: Libro 2, capítulo 18';
    const bookLabel = el('label', 'Libro de esta entrada');
    const book = document.createElement('select'); book.name = 'book';
    options(book, Array.from({ length: MAX_BOOK }, (_, i) => [i + 1, `Libro ${i + 1}`]));
    book.value = c.book; book.disabled = c.origin === 'source';
    bookLabel.append(book); form.append(bookLabel);
    const relatedLabel = el('label', 'Personajes y temas vinculados (selección múltiple)');
    const related = document.createElement('select'); related.multiple = true; related.size = 5; related.name = 'related';
    options(related, sortedNodes.map(n => [n.id, n.label]));
    // Preserve imported references even if they are absent from this dataset.
    options(related, c.nodeIds.filter(id => !sourceNodes.has(id)).map(id => [id, `${id} (sin nodo disponible)`]));
    [...related.options].forEach(o => { o.selected = c.nodeIds.includes(o.value); });
    relatedLabel.append(related); form.append(relatedLabel);
    const evidence = field(form, 'Evidencias del texto — añade el capítulo y lo que confirma', 'evidence', c.evidence, true);
    const theory = field(form, 'Interpretación o teoría del club — qué sospechamos y por qué', 'theory', c.theory, true);
    const submit = el('button', 'Guardar entrada', 'clue-primary'); submit.type = 'submit';
    form.append(el('p', 'Las revisiones se guardan con fecha y hora en este navegador.', 'clue-save-note'));
    form.append(submit);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!title.value.trim()) { title.setCustomValidity('Escribe una pregunta o un título.'); title.reportValidity(); return; }
      const updated = { ...c, title: title.value.trim(), status: status.value, book: Number(book.value),
        chapter: chapter.value.trim(), evidence: evidence.value.trim(), theory: theory.value.trim(),
        nodeIds: [...related.selectedOptions].map(o => o.value) };
      const changes = ['title', 'status', 'book', 'chapter', 'evidence', 'theory', 'nodeIds']
        .filter(k => JSON.stringify(c[k]) !== JSON.stringify(updated[k]));
      if (!isNew && !changes.length) { message('No hay cambios pendientes.'); return; }
      const labels = { title: 'Título', status: 'Estado', book: 'Libro', chapter: 'Referencia', evidence: 'Evidencias', theory: 'Teoría', nodeIds: 'Vínculos' };
      const display = (key, value) => key === 'status' ? statuses[value] : Array.isArray(value) ? value.join(', ') : String(value || '(vacío)');
      const now = new Date().toISOString();
      delete updated.availableAt; updated.updatedAt = now;
      const previous = saved[updated.id];
      if (previous) {
        const { versions, ...snapshot } = previous;
        updated.versions = [...(versions || []), snapshot];
      }
      updated.history = [...c.history, { at: now, text: isNew ? 'Pregunta creada por el club.' :
        changes.map(k => `${labels[k]}: ${display(k, c[k])}\n→ ${display(k, updated[k])}`).join('\n\n') }];
      if (persist({ ...saved, [updated.id]: updated })) {
        selectedId = updated.id; renderList(); renderDetail(updated);
        message('Entrada guardada en este navegador. Exporta una copia para compartirla.');
      }
    });
    title.addEventListener('input', () => title.setCustomValidity(''));
    pane.append(form);

    if (c.note) {
      pane.append(el('h3', 'Observación importada'), el('p', c.note, 'clue-original'));
    }
    if (c.nodeIds.length) {
      pane.append(el('h3', 'Explorar conexiones'));
      const links = el('div', undefined, 'clue-related');
      c.nodeIds.forEach(id => {
        const n = nodeMap[id];
        if (!n) return;
        const button = el('button', n.label); button.type = 'button';
        button.addEventListener('click', () => {
          if (!mayLeave()) return;
          dirty = false; dialog.close(); window.openRelationshipMap(id);
        });
        links.append(button);
      });
      pane.append(links);
    }
    const history = el('details'); history.append(el('summary', `Historial del club (${c.history.length})`));
    if (!c.history.length) history.append(el('p', 'Sin revisiones del club.'));
    [...c.history].reverse().forEach(h => {
      const date = new Date(h.at);
      history.append(el('h4', `${Number.isNaN(date.getTime()) ? h.at : date.toLocaleString('es')}${h.reading ? ` · Libro ${h.reading.book}, capítulo ${h.reading.chapter}` : ''}`),
        el('p', h.text, 'clue-original'));
    });
    pane.append(history);
    if (c.versions?.length) {
      const versions = el('details');
      versions.append(el('summary', `Versiones guardadas (${c.versions.length})`));
      [...c.versions].reverse().forEach((version, index) => {
        const item = el('details');
        const date = new Date(version.updatedAt || version.history.at(-1)?.at || '');
        item.append(el('summary', `Versión ${c.versions.length - index}${Number.isNaN(date.getTime()) ? '' : ` · ${date.toLocaleString('es')}`}`),
          el('h4', version.title), el('p', statuses[version.status]));
        for (const [key, label] of [['chapter', 'Referencia'], ['note', 'Observación'], ['evidence', 'Evidencias'], ['theory', 'Teoría']]) {
          if (version[key]) item.append(el('h4', label), el('p', version[key], 'clue-original'));
        }
        if (version.history.length) {
          const edits = el('details'); edits.append(el('summary', 'Historial de esta versión'));
          version.history.forEach(edit => edits.append(el('p', `${edit.at}\n${edit.text}`, 'clue-original')));
          item.append(edits);
        }
        versions.append(item);
      });
      pane.append(versions);
    }
    const sources = el('details'); sources.append(el('summary', 'Notas y contexto originales (sin modificar)'));
    const originalId = c.origin === 'source' ? c.id.replace(/^source:[12]:/, '') : null;
    const revisions = clueSourceRevisions.filter(n => (n.id === originalId || c.nodeIds.includes(n.id)));
    if (!revisions.length) sources.append(el('p', 'Vincula esta pregunta a un personaje o tema para consultar sus notas.'));
    revisions.forEach((n, i) => {
      const revision = el('details');
      revision.append(el('summary', `${n.label} · Libro ${n.book} · registro ${i + 1}`));
      if (n.star) revision.append(el('h4', 'Observación original'), el('p', n.star, 'clue-original'));
      if (n.previousState) revision.append(el('h4', 'Estado anterior registrado'), el('p', n.previousState, 'clue-original'));
      revision.append(el('h4', 'Contexto original'), el('p', n.desc, 'clue-original'));
      sources.append(revision);
    });
    pane.append(sources);
    heading.focus({ preventScroll: true });
  }

  function showEmptyDetail() {
    $('clue-detail').replaceChildren(el('h2', 'Un lugar para seguir las preguntas'),
      el('p', 'Selecciona una observación para revisarla, separar evidencia de teoría y consultar su historia. También puedes crear una pregunta propia.'));
  }
  ['clue-search', 'clue-status', 'clue-node'].forEach(id => $(id).addEventListener(id === 'clue-search' ? 'input' : 'change', renderList));
  $('btn-clues').addEventListener('click', () => {
    summaryPanel.classList.remove('visible');
    renderList();
    if (!selectedId) showEmptyDetail();
    dialog.showModal();
    if (startupError) message(startupError);
  });
  $('clue-close').addEventListener('click', () => {
    if (mayLeave()) { dirty = false; dialog.close(); }
  });
  window.getVisibleClues = allEntries;
  window.openClueEntry = id => {
    const c = allEntries().find(entry => entry.id === id);
    if (!c || !mayLeave()) return false;
    selectedId = id; $('clue-search').value = ''; $('clue-status').value = ''; $('clue-node').value = '';
    if (!dialog.open) dialog.showModal();
    renderList(); renderDetail(c); return true;
  };
  dialog.addEventListener('cancel', event => {
    if (!mayLeave()) event.preventDefault();
    else dirty = false;
  });
  $('clue-new').addEventListener('click', () => {
    if (!mayLeave()) return;
    selectedId = null; renderList();
    renderDetail({ id: `club:${crypto.randomUUID()}`, title: '', note: '', status: 'open', origin: 'club',
      book: MAX_BOOK, chapter: '', evidence: '', theory: '', nodeIds: [], history: [] }, true);
  });
  $('clue-export').addEventListener('click', () => {
    // Export every saved entry and its preserved revisions.
    // Include the current source observations as well.
    const exportEntries = { ...Object.fromEntries(allEntries().map(c => [c.id, c])), ...saved };
    const raw = startupError ? localStorage.getItem(storageKey) : JSON.stringify({
      format: 'bloodsworn-clues', version: 2, entries: Object.values(exportEntries),
    }, null, 2);
    const url = URL.createObjectURL(new Blob([raw || ''], { type: 'application/json' }));
    const link = el('a'); link.href = url; link.download = 'bloodsworn-pistas.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    message('Copia exportada con todas las entradas y revisiones guardadas.');
  });
  $('clue-import').addEventListener('click', () => {
    if (mayLeave()) $('clue-file').click();
  });
  $('clue-file').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
      const incoming = ClueBoard.validateBackup(JSON.parse(await file.text()));
      const next = { ...saved }; let added = 0, existing = 0;
      for (const [id, c] of Object.entries(incoming)) {
        if (Object.hasOwn(next, id)) { existing++; continue; }
        next[id] = c; added++;
      }
      if (persist(next)) {
        renderList();
        if (selectedId) {
          const current = allEntries().find(c => c.id === selectedId);
          if (current) renderDetail(current);
        }
        message(`${added} entradas importadas; ${existing} ya guardadas se conservaron sin cambios. Todas las notas están disponibles.`);
      }
    } catch (error) { message(`No se importó la copia. ${error.message}`); }
    finally { event.target.value = ''; }
  });
})();
