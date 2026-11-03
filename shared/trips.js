// Chronological trips for Book 1's three POV characters, in the order each
// place is first reached per their chapter summaries (book1/summaries.js).
// Each entry is an ordered list of shared/map-pins.js ids; the map draws a
// straight line between each consecutive pair.
//
// orka: granja (sin pin) → Fellur (cap. 1-22, repetida) → Darl (cap. 24-37) →
//   Montañas Espinazo (cap. 40, 46) → Grimholt (cap. 49, 51).
// varg: Liga (cap. 2-20) → Río Slågen (cap. 26, 30) → Montañas Espinazo
//   (cap. 34-47) → Grimholt (cap. 53).
// elvar: Isla de Iskalt (cap. 5-9) → Snakavik (cap. 21-29) → Starl (cap. 32) →
//   Lago Horndal (cap. 32) → Oskutreð (cap. 38-52).
const characterTrips = {
  orka: ['fellur', 'darl', 'grimholt'],
  varg: ['liga', 'rio-slagen', 'montanas-espinazo', 'grimholt'],
  elvar: ['iskalt', 'snakavik', 'rio-hvita', 'starl', 'lake-horndal', 'oskutred'],
};
