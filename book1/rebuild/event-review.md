# Revisión de EVENTOS CLAVE — capítulos 1–15

Alcance: reconstrucción cronológica de Libro 1, hasta el capítulo 15. Auditoría de los resúmenes, perfiles y eventos con marcadores de capítulo preservados en `book1/rebuild/book1/`. Los XHTML fuente ya no están en la carpeta: esta revisión cubre los hechos conservados en el archivo y no certifica que este contenga todos los hechos del texto original. No se usó el archivo original completo como base factual. Solo se consultaron sus etiquetas para identidad canónica; se reutiliza `barrow-virk`.

| Capítulo | Sucesos importantes conservados | IDs de evento | Cobertura |
|---|---|---|---|
| 1 | Cacería interrumpida por el lobo herido; hallazgo de Asgrim e Idrun y ausencia de Harek; caída de los dioses relatada | `encuentro-fell-wolf`, `asgrim-death`, `gudfall` | Existentes |
| 2 | Huida, recuerdo de matar a Snepil, entrada en Liga; reclutamiento y desafío a Einar | `huida-varg-liga`, `prueba-armas-liga` | Huida nueva; prueba existente |
| 3 | Rastreo hasta las barcas, traslado de los muertos y confrontación en Fellur; anuncio del Alþing | `asgrim-death`, `althing-fellur` | Existentes; no se presenta la asamblea futura como celebrada |
| 4 | Duelo con Einar; muerte de Frøya revelada; captura por Leif y rescate | `prueba-armas-liga`, `muerte-froya`, `rescate-varg` | Dos nuevos; duelo existente |
| 5 | Desembarco, ataque a Hrut y la aldea y persecución | `asalto-iskalt` | Existente; no fragmentar cada golpe |
| 6 | Salida de Breca, ayuda a Vesli, búsqueda y hallazgo, golpe de Orka e intervención de Thorkel | `rescate-vesli` | Nuevo; el posible Näcken no se convierte en un encuentro confirmado |
| 7 | Lucha con el trol, quema del objeto, captura de la familia y transformación forzada de Berak | `asalto-iskalt` | Existente; reúne acciones de la misma persecución y desenlace |
| 8 | Acogida de Vesli confirmada; juramento de sangre; convocatoria del Alþing | `rescate-vesli`, `juramento-vesli`, `althing-fellur` | Revisión de rescate y juramento nuevos; convocatoria existente |
| 9 | Ataque de la serpiente y rescate del niño; premios y partida hacia Snakavik; encierro mítico relatado | `ataque-sjavarorm-iskalt`, `partida-iskalt`, `encierro-lik-rifa` | Dos nuevos; ataque y rescate existentes |
| 10 | Casos de Howbyr y Kergarth referidos; anuncio del juramento de Sigrún y disputa política; desafío y elección de segundos | `desaparicion-haraldursons`, `matanza-kergarth`, `althing-fellur`, `holmganga-event` | Dos incidentes referidos nuevos; asamblea y desafío existentes |
| 11 | Convalecencia y nombre del rescatador; primera lección de escudo | `rescate-varg`, `entrenamiento-varg` | Revisión de rescate nueva; lección existente |
| 12 | Duelo, muerte de Virk, intervención y herida de Thorkel, castigo de la esclava, rechazo de justicia y sangre lamida | `holmganga-event`, `althing-fellur` | Existentes; las dudas sobre la sangre siguen en sangre-thorkel |
| 13 | Saga de Galinn; exigencia de Jaromir, negativa de Glornir, amenaza de Ilia y retirada sin Sulich | `gudfall`, `reclamacion-sulich` | Confrontación nueva; saga conserva evento mítico existente |
| 14 | Refugio, roca descubierta y activada, explicación de la guerra, primera venganza mítica, ataque de gusanos | `revelacion-roca-escarcha`, `venganza-bosque-horcas`, `encierro-lik-rifa`, `gudfall`, `ataque-night-wyrms` | Revelación y venganza nuevas; revisión del encierro; guerra y ataque existentes |
| 15 | Intento de Mord contenido, entierro de Virk; acuerdo de marcharse; hallazgo de Froa y el árbol, gritos desde el oeste | `barrow-virk`, `acuerdo-partida-orka`, `hallazgo-froa` | Tres nuevos; venganza, viaje, asesinos y origen de gritos siguen pendientes |

No se crean eventos separados para cada tarea doméstica, gesto, sonrisa, objeto descrito o golpe dentro de una escena ya cubierta. La polilla del capítulo 15 conserva su función temática en Orka/Breca; la petición de aprender espada permanece como objetivo pendiente, sin inventar una lección. Las evocaciones fragmentarias del pasado no se convierten en hechos históricos más precisos de lo que permiten los registros. Los planes de venta, invocación, venganza y partida siguen como TRAMA; las decisiones y encuentros efectivamente narrados tienen EVENTO.

Se añadieron 15 identidades de evento, con 18 revisiones distribuidas por su capítulo de evidencia, y 137 vínculos. Las tres revisiones posteriores amplían el rescate de Vesli (capítulo 8), identifican a Glornir como rescatador (11) y amplían el encierro de Lik-Rifa según Uspa (14), preservando cada descripción anterior. Todos los 25 eventos resultantes tienen vínculo activo directo a `cat-eventos` y conexiones útiles.

Validación: conservación byte por byte del texto original al retirar las inserciones; resúmenes intactos; identificadores disponibles en cada capítulo; acumulación de revisiones; referencias enfatizadas completas; seis hashes del archivo activo intactos; 31 pruebas de regresión aprobadas. No se realizó inspección visual del navegador.

Event coverage review: PASS (hechos conservados en el archivo de capítulos 1–15).
