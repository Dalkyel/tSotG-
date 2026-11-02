// Geographic map overlay (pilot): pins place nodes onto the official vigrid.jpeg
// map at their real position, reusing the existing node data and detail panel.
(function () {
  const dialog = document.getElementById('map-panel');
  const overlay = document.getElementById('map-overlay');
  const openBtn = document.getElementById('btn-map');
  const closeBtn = document.getElementById('map-close');
  const IMG_W = 1000;
  const IMG_H = 1323;

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
  });
  closeBtn.addEventListener('click', () => dialog.close());
})();
