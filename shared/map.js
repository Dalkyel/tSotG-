// Geographic map overlay (pilot): pins place nodes onto the official vigrid.jpeg
// map at their real position, reusing the existing node data and detail panel.
(function () {
  const dialog = document.getElementById('map-panel');
  const overlay = document.getElementById('map-overlay');
  const stage = document.getElementById('map-stage');
  const wrap = document.getElementById('map-overlay-wrap');
  const openBtn = document.getElementById('btn-map');
  const closeBtn = document.getElementById('map-close');
  const zoomInBtn = document.getElementById('btn-map-zoom-in');
  const zoomOutBtn = document.getElementById('btn-map-zoom-out');
  const zoomResetBtn = document.getElementById('btn-map-zoom-reset');
  const togglePinsBtn = document.getElementById('btn-map-toggle-pins');
  const IMG_W = 1000;
  const IMG_H = 1323;

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;
  let scale = 1;

  function setScale(next) {
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    stage.style.transform = `scale(${scale})`;
  }

  function resetView() {
    setScale(1);
    wrap.scrollTo(0, 0);
  }

  zoomInBtn.addEventListener('click', () => setScale(scale * 1.4));
  zoomOutBtn.addEventListener('click', () => setScale(scale / 1.4));
  zoomResetBtn.addEventListener('click', resetView);

  togglePinsBtn.addEventListener('click', () => {
    const hidden = overlay.classList.toggle('pins-hidden');
    togglePinsBtn.setAttribute('aria-pressed', String(hidden));
    togglePinsBtn.title = hidden ? 'Mostrar marcadores' : 'Ocultar marcadores';
    togglePinsBtn.setAttribute('aria-label', togglePinsBtn.title);
  });

  function renderPins() {
    overlay.replaceChildren();
    Object.entries(mapPins).forEach(([id, pos]) => {
      const node = nodes.find(n => n.id === id);
      if (!node) return; // Not in the archive yet — skip rather than fail.
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'map-pin';
      pin.style.left = `${(pos.x / IMG_W) * 100}%`;
      pin.style.top = `${(pos.y / IMG_H) * 100}%`;
      pin.setAttribute('aria-label', node.label);
      pin.title = node.label;
      pin.addEventListener('click', () => {
        selectNode(node);
        dialog.close();
      });
      overlay.append(pin);
    });
  }

  openBtn.addEventListener('click', () => {
    renderPins();
    dialog.showModal();
    resetView();
  });
  closeBtn.addEventListener('click', () => dialog.close());
})();
