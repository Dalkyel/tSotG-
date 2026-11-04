// Chronological trips across Book 1 and the recorded Book 2 chapters (1–51),
// checked against book1/summaries.js and book2/summaries.js. Keep return visits:
// these are journeys, not a list of unique places. Only include reached places,
// not announced destinations or Myrk's false trail toward Iskalt.
// Each entry is an ordered list of shared/map-pins.js ids; the map draws a
// straight line between each consecutive pair.
//
// orka: granja (sin pin) → Fellur (cap. 1-22, repetida) → Darl (cap. 24-37) →
//   Montañas Espinazo (cap. 40, 46) → Grimholt (cap. 49, 51).
// varg: Liga (cap. 2-20) → Río Slågen (cap. 26, 30) → Montañas Espinazo
//   (cap. 34-47) → Grimholt (cap. 53).
// elvar: Isla de Iskalt (cap. 5-9) → Snakavik (cap. 21-29) → Starl (cap. 32) →
//   Lago Horndal (cap. 32) → Oskutreð (cap. 38-52).
//
// Book 2 (chapter numbers below refer to this book):
// orka: Grimholt (1–7) → Cámara de Rotta, in Montañas Espinazo (15–22;
//   no exact pin for the chamber) → Starl (36–49) → Lago Horndal shore (50).
// varg: Grimholt (3–7) → Montañas Espinazo (11) → Darl (24–29) →
//   Drammur (29–32) → Liga (37). Still at sea toward Iskidan in 47 and 51.
// elvar: Oskutreð (2–8) → Isbrún (17, 28) → Lago Horndal (34, 38) →
//   Starl (38–49). Leaves toward Hvítá/Snakavik in 49; neither reached yet.
// biorr: unnamed northern camp (5, 9; no pin) → Isbrún (14) →
//   Foso de los Vaesen (30) → Montañas Espinazo (35, 40) → Nastrandir (40–44).
// gudvarr: fleeing Grimholt → Drammur (12) → Darl (16–48).
// Unmapped camps, sub-locations and open sea have no invented coordinates.
const characterTrips = {
  orka: ['fellur', 'darl', 'grimholt', 'montanas-espinazo', 'starl', 'lake-horndal'],
  varg: ['liga', 'rio-slagen', 'montanas-espinazo', 'grimholt', 'montanas-espinazo', 'darl', 'drammur', 'liga'],
  elvar: ['iskalt', 'snakavik', 'rio-hvita', 'starl', 'lake-horndal', 'isbrun', 'oskutred', 'isbrun', 'lake-horndal', 'starl'],
  biorr: ['isbrun', 'foso-vaesen', 'montanas-espinazo', 'nastrandir'],
  gudvarr: ['grimholt', 'drammur', 'darl'],
};
