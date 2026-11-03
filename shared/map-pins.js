// Pixel coordinates of place nodes on shared/vigrid.jpeg (1000×1323px official map).
// Keyed by the matching node id in book{N}/nodes.js (group: 'LUGAR').
//
// Only locations the cartographer actually drew/labeled on vigrid.jpeg are pinned.
// LUGAR nodes left out are mentioned in the text but have no confirmed point on this
// map: off-map (gravka), unlabeled villages known only by relative distance (howbyr,
// kergarth), unlabeled rivers/features (rio-skarpain, granja-abandonada, valle-boneback,
// cueva-boneback, bosque-horca, camara-rotta, isbrun, colinas-luna-oscura), sub-locations
// co-located with a pinned node (dead-drengr is in Darl; vergelmir/trapdoor-oskutred are
// under Oskutreð), or non-point entries (vigrið = whole continent, llanura-batalla-norte
// = broad region). Add them here if a source ever confirms a position.
//
// A river is drawn on vigrid.jpeg as a line, not a single point, so it may be
// given several points instead of one — each a separate pin, same label and
// click target, placed where that stretch of the line is actually drawn (not
// a traced/connected path: through dense mountain icons the line often isn't
// drawn at all, so points are only added where the line is unambiguous). The
// first point is the one used elsewhere (e.g. character trips in book1/trips.js).
const mapPins = {
  fellur: { x: 754, y: 717 },
  darl: { x: 602, y: 607 },
  liga: { x: 460, y: 763 },
  snakavik: { x: 310, y: 520 },
  svelgarth: { x: 820, y: 571 },
  grimholt: { x: 682, y: 457 },
  nastrandir: { x: 812, y: 395 },
  starl: { x: 404, y: 411 },
  'lake-horndal': { x: 413, y: 390 },
  iskalt: { x: 150, y: 372 },
  eldrafell: { x: 478, y: 294 },
  isbrun: { x: 478, y: 325 },
  oskutred: { x: 582, y: 284 },
  'foso-vaesen': { x: 345, y: 302 },
  'rio-slagen': [{ x: 526, y: 552 }],
  iskidan: { x: 585, y: 1178 },
  'rio-hvita': [{ x: 410, y: 507 }],
  ulaz: { x: 615, y: 1080 },
  'montanas-espinazo': { x: 620, y: 400 },
  drammur: { x: 500, y: 730 },
};
