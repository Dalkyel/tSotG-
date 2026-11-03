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
  const tripSelect = document.getElementById('map-trip-select');
  const tripLegend = document.getElementById('map-trip-legend');
  const routesSvg = document.getElementById('map-routes');
  const IMG_W = 1000;
  const IMG_H = 1323;

  const TRIP_COLORS = { orka: '#c0392b', varg: '#4a90d9', elvar: '#5fbf6a' };
  const TRIP_NAMES = { orka: 'Orka', varg: 'Varg', elvar: 'Elvar' };
  const TRIP_ORDER = Object.keys(TRIP_COLORS);
  const TRIP_SEGMENT_OFFSET = 10; // map-space units between parallel lines on a shared segment

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

  // Two-finger pinch zoom. wrap's touch-action (pan-x pan-y, no native
  // pinch-zoom) hands the gesture to us instead of the whole page.
  let pinchStartDist = null;
  let pinchStartScale = 1;
  const touchDistance = ([a, b]) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

  wrap.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      pinchStartDist = touchDistance(e.touches);
      pinchStartScale = scale;
      stage.style.transition = 'none';
    }
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && pinchStartDist) {
      e.preventDefault();
      setScale(pinchStartScale * (touchDistance(e.touches) / pinchStartDist));
    }
  }, { passive: false });

  wrap.addEventListener('touchend', e => {
    if (e.touches.length < 2) {
      pinchStartDist = null;
      stage.style.transition = '';
    }
  });

  togglePinsBtn.addEventListener('click', () => {
    const hidden = overlay.classList.toggle('pins-hidden');
    togglePinsBtn.setAttribute('aria-pressed', String(hidden));
    togglePinsBtn.title = hidden ? 'Mostrar marcadores' : 'Ocultar marcadores';
    togglePinsBtn.setAttribute('aria-label', togglePinsBtn.title);
  });

  // Straight line between each consecutive pair of stops in a character's
  // trip (book1/trips.js), in the map image's own 1000×1323 coordinate space
  // — the svg's viewBox maps that 1:1 without the %-conversion renderPins uses.
  // Each character gets its own color so several trips can overlap legibly.
  // When two or more characters share the exact same segment (e.g. Orka and
  // Varg both arrive via montañas-espinazo → grimholt), that segment is
  // split into parallel offset lines, like a transit map, instead of one
  // color hiding the other.
  function renderTrips(charIds) {
    routesSvg.replaceChildren();

    const segments = [];
    charIds.forEach(charId => {
      const stops = (characterTrips[charId] || []).map(id => mapPins[id]).filter(Boolean);
      for (let i = 0; i < stops.length - 1; i++) segments.push({ charId, a: stops[i], b: stops[i + 1] });
    });

    const groups = new Map();
    segments.forEach(seg => {
      const key = [seg.a, seg.b].map(p => `${p.x},${p.y}`).sort().join('|');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(seg);
    });

    groups.forEach(group => {
      group.sort((s1, s2) => TRIP_ORDER.indexOf(s1.charId) - TRIP_ORDER.indexOf(s2.charId));
      const { a, b } = group[0];
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const perpX = -dy / len, perpY = dx / len;
      group.forEach((seg, i) => {
        const shift = (i - (group.length - 1) / 2) * TRIP_SEGMENT_OFFSET;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'trip-line');
        line.setAttribute('stroke', TRIP_COLORS[seg.charId] || '#fff');
        line.setAttribute('x1', seg.a.x + perpX * shift);
        line.setAttribute('y1', seg.a.y + perpY * shift);
        line.setAttribute('x2', seg.b.x + perpX * shift);
        line.setAttribute('y2', seg.b.y + perpY * shift);
        routesSvg.append(line);
      });
    });

    tripLegend.replaceChildren();
    tripLegend.hidden = charIds.length === 0;
    charIds.forEach(charId => {
      const item = document.createElement('span');
      item.className = 'legend-item';
      const dot = document.createElement('span');
      dot.className = 'legend-dot';
      dot.style.background = TRIP_COLORS[charId] || '#fff';
      item.append(dot, document.createTextNode(TRIP_NAMES[charId] || charId));
      tripLegend.append(item);
    });
  }

  tripSelect.addEventListener('change', () => {
    const value = tripSelect.value;
    renderTrips(value === 'all' ? Object.keys(characterTrips) : value ? [value] : []);
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
    tripSelect.value = '';
    renderTrips([]);
    dialog.showModal();
    resetView();
  });
  closeBtn.addEventListener('click', () => dialog.close());
})();
