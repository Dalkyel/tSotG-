const nodes = [

// ── LIBRO 1, CAPÍTULO 1 — ORKA ──
    {
        id: "root", label: "La Sombra de los Dioses", group: "CENTER", type: "Obra",
        desc: "Libro I de Bloodsworn, de John Gwynne. La historia comienza en el año 297 del Friðaröld, la llamada Edad de la Paz.",
        star: ""
    },
    {
        id: "cat-orka", label: "ARCO ORKA", group: "CAT", type: "Categoría",
        desc: "Orka, Thorkel y su hijo Breca en las colinas sobre Fellur.",
        star: ""
    },
    {
        id: "cat-mundo", label: "MUNDO & COSMOS", group: "CAT", type: "Categoría",
        desc: "La geografía de Vigríð y el relato de la caída de los dioses.",
        star: ""
    },
    {
        id: "cat-eventos", label: "EVENTOS CLAVE", group: "CAT", type: "Categoría",
        desc: "Sucesos descubiertos durante la lectura.",
        star: ""
    },
    {
        id: "cat-tramas", label: "TRAMAS ACTIVAS", group: "CAT", type: "Categoría",
        desc: "Preguntas abiertas por los capítulos procesados.",
        star: ""
    },
    {
        id: "cat-magia", label: "MAGIA", group: "CAT", type: "Categoría",
        desc: "Protecciones y fenómenos mágicos mencionados en la historia.",
        star: ""
    },
    {
        id: "cat-dioses", label: "PANTEÓN DIVINO", group: "CAT", type: "Categoría",
        desc: "Los dioses del relato transmitido por Thorkel.",
        star: ""
    },
    {
        id: "cat-norse", label: "CULTURA NÓRDICA", group: "CAT", type: "Categoría",
        desc: "Costumbres y formas de vida descritas en el texto.",
        star: ""
    },
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata."
    },
    {
        id: "asgrim", label: "Asgrim (†)", group: "ORKA", type: "Personaje — Muerto",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Idrun y padre de Harek. Su granja está en las colinas sobre Fellur. Orka lo encuentra muerto entre las puertas abiertas de la empalizada, con una estocada al corazón, una lanza rota y un hacha ensangrentada cerca. Es ancho de hombros, de cabello gris y cuerpo fibroso; lleva un anillo de plata en un brazo. Los cuervos han picoteado ojos y labios; Orka atribuye la falta de dientes a los tennur. La sangre y las marcas de arrastre próximas sugieren que hirió a un atacante. Orka pone el hacha en su mano para su viaje por el camino del alma.",
        star: "★ La herida de arma y las huellas son indicios sobre el ataque; no identifican todavía a sus autores."
    },
    {
        id: "idrun", label: "Idrun (†)", group: "ORKA", type: "Personaje — Muerta",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Asgrim y madre de Harek. Orka y Thorkel encuentran su cuerpo clavado a la puerta de la granja, con los brazos extendidos y el vientre abierto. El calor que aún desprenden sus entrañas indica lo reciente de la muerte. Orka comprende que los gritos que habían oído eran suyos. El capítulo no establece un motivo ni una interpretación ritual.",
        star: "★ Su muerte lenta contrasta con la estocada rápida que mató a Asgrim."
    },
    {
        id: "harek", label: "Harek", group: "ORKA", type: "Personaje — Paradero desconocido",
        desc: "LIBRO 1, CAPÍTULO 1: Hijo de Asgrim e Idrun y amigo de Breca, con quien ha jugado en la playa de Fellur. Breca lo recuerda al oír gritos en dirección a su granja. Tras encontrar muertos a sus padres, el capítulo termina con la pregunta de Breca sobre dónde está Harek. Su suerte y las circunstancias de su ausencia no se aclaran.",
        star: "★★ La pregunta por Harek cierra el capítulo y abre una búsqueda; aún no se confirma un secuestro ni su muerte."
    },
    {
        id: "fellur", label: "Fellur", group: "LUGAR", type: "Lugar — Aldea pesquera",
        desc: "LIBRO 1, CAPÍTULO 1: Aldea pesquera en la orilla oriental de un fiordo profundo, por debajo de las colinas boscosas donde caza la familia de Orka. El fiordo desemboca al sur en el mar. Orka y Thorkel visitan la aldea para intercambiar provisiones; Breca y Harek han jugado en su playa. Un sendero desciende desde la granja de Asgrim hacia la aldea y el fiordo.",
        star: ""
    },
    {
        id: "vigrið", label: "Vigríð", group: "LUGAR", type: "Lugar — Llanura de Batalla",
        desc: "LIBRO 1, CAPÍTULO 1: Thorkel llama a Vigríð la Llanura de Batalla y tierra de reinos destrozados. Incluye las tierras entre el mar y las montañas visibles al norte, y otras cien leguas más allá. Según su relato, los dioses lucharon y murieron aquí; la caída de Snaka quebró la tierra y permitió la entrada del mar.",
        star: ""
    },
    {
        id: "snaka", label: "Snaka", group: "DIOS", type: "Dios Muerto — Padre",
        desc: "LIBRO 1, CAPÍTULO 1: En la saga que Thorkel cuenta a Breca, Snaka es la serpiente, el Más Anciano y padre de los dioses; algunos lo consideran el mayor de ellos, y era el más grande. Había crecido desde el nacimiento del mundo. Sus hijos incluyen águila, oso, lobo y dragón, sin que este capítulo les dé nombres propios. Murió a manos de sus hijos en la guerra divina. Su caída destrozó reinos y sus huesos, cubiertos de tierra, forman las montañas que contempla la familia.",
        star: "★★ La geografía se presenta como el resto material de un cuerpo divino, a través de la saga de Thorkel."
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "foso-vaesen", label: "Foso de los Vaesen", group: "LUGAR", type: "Lugar — Cosmológico",
        desc: "LIBRO 1, CAPÍTULO 1: Según la explicación de Orka, el foso se abrió con la caída de Snaka y dejó salir al mundo del cielo y el mar a las criaturas de dientes, garras y poder que habitaban el mundo inferior. El capítulo no lo visita ni describe su ubicación precisa.",
        star: ""
    },
    {
        id: "vaesen-gen", label: "Vaesen", group: "VAESEN", type: "Criaturas — Categoría",
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior al abrirse el foso durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con sus propios instrumentos naturales para matar. Estos rasgos hacen dudar de que sean los autores de la matanza de Asgrim e Idrun.",
        star: ""
    },
    {
        id: "fell-wolf", label: "Fell-Wolf", group: "VAESEN", type: "Vaesen",
        desc: "LIBRO 1, CAPÍTULO 1: Lobo enorme de pelaje gris pizarra, largas garras y grandes dientes. Irrumpe en el claro durante la cacería, sangrando por numerosas heridas y sin detenerse a atacar los renos. Su paso espanta la manada y frustra el lanzamiento de Breca. Thorkel prueba una gota de su sangre y explica que está herido y no piensa en comer. No se sabe quién lo hirió ni si guarda relación con los gritos posteriores.",
        star: "★ La pregunta de Breca sobre qué pudo herir a semejante criatura queda abierta."
    },
    {
        id: "tennur", label: "Tennur", group: "VAESEN", type: "Vaesen — Enjambre",
        desc: "LIBRO 1, CAPÍTULO 1: Orka atribuye a los tennur la extracción de los dientes de Asgrim. Los describe como pequeñas criaturas bípedas que codician los dientes humanos, con dedos de hueso afilado y dientes cortantes. Solos son una molestia; en grupo pueden resultar mortales. Orka busca señales de ellos en los árboles y la roca, pero no aparece ninguno en escena.",
        star: "★ Su intervención se deduce del saqueo del cadáver; no se establece que mataran a Asgrim."
    },
    {
        id: "runa-ward", label: "Runa Warding", group: "OBJETO", type: "Magia — Protección",
        desc: "LIBRO 1, CAPÍTULO 1: Thorkel identifica una runa protectora tallada en la puerta de la granja de Asgrim. Orka recuerda que las runas mantienen alejados a todos los vaesen salvo los más poderosos. Su presencia, unida a la estocada y al hacha ensangrentada, favorece la hipótesis de un ataque humano, pero no la confirma por sí sola.",
        star: "★ Una protección contra criaturas no basta para explicar quién perpetró la matanza."
    },
    {
        id: "steading", label: "Steading (Granja)", group: "NORSE", type: "Vida Diaria — Vivienda",
        desc: "LIBRO 1, CAPÍTULO 1: La granja de Asgrim ocupa una plataforma en la ladera, junto a una pared de roca. Una casa grande con tejado de hierba y varios edificios auxiliares están rodeados por una empalizada más alta que Orka. Un sendero en el lado oriental baja hacia Fellur y el fiordo.",
        star: ""
    },
    {
        id: "asgrim-death", label: "Tragedia de Familia Asgrim", group: "EVENTO", type: "Evento — Hallazgo de la matanza",
        desc: "LIBRO 1, CAPÍTULO 1: Mientras cazan, Orka, Thorkel y Breca ven un fell-wolf herido y oyen gritos hacia la granja de Asgrim. Al llegar encuentran a Asgrim muerto de una estocada al corazón y a Idrun clavada y destripada en la puerta. Orka coloca el hacha en la mano de Asgrim e identifica el saqueo de sus dientes como obra de tennur. Una zona de sangre y huellas de arrastre sugieren que alguien más fue herido y retirado. La runa protectora y el uso de armas orientan la sospecha hacia hombres, sin identificar culpables. El paradero de Harek queda sin resolver.",
        star: "★★★ El hallazgo rompe la apariencia de paz y abre dos preguntas: quién atacó a la familia y dónde está Harek."
    },
];
