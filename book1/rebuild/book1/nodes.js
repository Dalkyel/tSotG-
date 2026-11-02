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
    {
        id: "fridarold", label: "Friðaröld (Edad de la Paz)", group: "COSMO", type: "Época — Era actual",
        desc: "LIBRO 1, CAPÍTULO 1: La historia comienza en el año 297 del Friðaröld, llamado Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos. Ante la matanza de Asgrim e Idrun, Orka cuestiona ese nombre y describe el presente como una edad de tormenta y asesinato.",
        star: "★ El nombre oficial de la época contrasta con la violencia que presencia la familia."
    },

// ── LIBRO 1, CAPÍTULO 2 — VARG ──
    {
        id: "cat-varg", label: "ARCO VARG", group: "CAT", type: "Categoría",
        desc: "LIBRO 1, CAPÍTULO 2: La huida de Varg y su búsqueda de ayuda entre los Bloodsworn.",
        star: ""
    },
    {
        id: "varg", label: "Varg", group: "VARG", type: "Personaje — Esclavo fugitivo",
        desc: "LIBRO 1, CAPÍTULO 2: Llega a Liga tras nueve o diez días de huida, convencido de que lo persiguen aunque no ve a nadie. Desconoce su edad y a sus padres; recuerda treinta inviernos y veranos de esclavitud en la granja de Kolskegg, veinte leguas al noreste de Liga, río arriba. Corre con una resistencia que él mismo considera casi inagotable. Recuerda haber estrangulado a Snepil, pero no cómo llegó a rodearle el cuello con las manos: el recuerdo emerge de una niebla roja. Se vuelve a poner y cierra con llave el collar de hierro para entrar en Liga fingiendo que busca alojamiento para su amo, al que llama Snepil. Lleva monedas con la efigie de Helka; compra comida tras al menos tres días sin comer, paga información y silencio al vendedor y obtiene su cuchilla. Busca un Galdurman o una bruja Seiðr para realizar un akáll, cuya finalidad concreta aún no explica. Se toca repetidamente una bolsa del cinturón, de contenido no revelado. Svik le niega contratar a Vol, que solo sirve a los Bloodsworn. Al ver la prueba de reclutamiento, Varg termina ofreciéndose a luchar contra Einar Medio-Trol.",
        star: "★★ La laguna de memoria al matar a Snepil, la resistencia al correr y la bolsa que protege quedan sin explicación. El capítulo termina antes de su combate con Einar."
    },
    {
        id: "liga", label: "Liga", group: "LUGAR", type: "Lugar — Puerto y mercado",
        desc: "LIBRO 1, CAPÍTULO 2: Puerto amurallado en la ribera sudoriental de un fiordo, sobre una playa de arena negra junto a la desembocadura de un río. Las calles de madera, barro y puestos comerciales suben hasta el salón de Jarl Logur, al pie de los riscos. Acoge barcos mercantes y un drakkar destacado entre ellos; los Bloodsworn atracaron el día anterior. Varg presencia la llegada de comerciantes y guerreros de Iskidan. Su mercado vende comida, pieles, marfil y partes de Vaesen.",
        star: ""
    },
    {
        id: "snepil", label: "Snepil (†) / Kolskegg", group: "VARG", type: "Personajes — Nombres de la esclavitud de Varg",
        desc: "LIBRO 1, CAPÍTULO 2: La fuente llama Kolskegg al dueño de la granja donde Varg pasó treinta inviernos, situada veinte leguas al noreste de Liga. Varg recuerda haber estrangulado a un hombre llamado Snepil, sin recordar cómo empezó, y usa su nombre al inventar que busca alojamiento para su amo. El archivo original agrupa ambos nombres bajo este id; este capítulo no aclara explícitamente si Snepil y Kolskegg son la misma persona. No se atribuye aquí la muerte a Kolskegg como hecho confirmado.",
        star: "★ La identidad entre los dos nombres queda pendiente de aclaración textual."
    },
    {
        id: "slyda", label: "Slyda", group: "VARG", type: "Personaje — Guardia de Liga",
        desc: "LIBRO 1, CAPÍTULO 2: Guardia de cabello oscuro trenzado, cota de malla, seax y lanza. Interroga a Varg en la puerta y le exige bajar la capucha; un guardia anciano le pide dejarlo pasar. Varg afirma servir a Snepil y Slyda finalmente le permite entrar.",
        star: ""
    },
    {
        id: "helka", label: "Reina Helka", group: "VARG", type: "Personaje — Reina",
        desc: "LIBRO 1, CAPÍTULO 2: Su perfil de nariz afilada y cabello recogido figura en las monedas de bronce que lleva Varg. Él solo conoce rumores sobre su pretensión de controlar media Vigríð y su crueldad con los enemigos. Un drengr cobraba sus tributos en la granja de Kolskegg. El vendedor de comida critica sus impuestos. Svik usa su nombre como ejemplo hipotético: ni siquiera ella podría contratar a Vol.",
        star: ""
    },
    {
        id: "bloodsworn", label: "Bloodsworn (Hermanos de Sangre)", group: "VARG", type: "Facción — Compañía mercenaria",
        desc: "LIBRO 1, CAPÍTULO 2: Compañía famosa en Vigríð y, según Varg, probablemente más allá. Se alquila al mejor postor para cazar Vaesen, buscar reliquias divinas, intervenir en disputas fronterizas o proteger a los poderosos. Llegó a Liga el día anterior y es huésped de Jarl Logur. Sus escudos negros llevan salpicaduras rojas. Cuenta con la bruja Seiðr esclava Vol. Tras la muerte de uno de sus miembros, celebra una prueba de armas para cubrir un puesto en su drakkar; Einar combate con los aspirantes y Svik controla el acceso.",
        star: ""
    },
    {
        id: "jarl-logur", label: "Jarl Logur", group: "VARG", type: "Personaje — Jarl de Liga",
        desc: "LIBRO 1, CAPÍTULO 2: Anfitrión de los Bloodsworn en Liga. Su salón domina la población y la prueba de armas se celebra en el espacio ante él. Varg reconoce su emblema: una vela roja sobre fondo azul pálido. No se describe una intervención personal del jarl.",
        star: ""
    },
    {
        id: "svik", label: "Svik Hrulfsson", group: "VARG", type: "Personaje — Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 2: Guerrero esbelto de cabello rojo cuidadosamente trenzado y barba recortada y aceitada. Lleva una buena cota de malla y un seax decorado. Se presenta como Svik Hrulfsson, apodado Tangle-Hair por no llevar nunca el pelo enredado. Pide el nombre de Varg a la entrada de la prueba, bromea sobre sus motivos para buscar magia y reconoce la seriedad de un akáll. Rechaza dejarle contratar a Vol: sus talentos se reservan a la compañía. Explica que Einar combate sin escudo para dar alguna oportunidad a los aspirantes.",
        star: ""
    },
    {
        id: "einar", label: "Einar Medio-Trol", group: "VARG", type: "Personaje — Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 2: Svik lo llama Einar Half-Troll, aquí Medio-Trol. Es enorme, de barba roja trenzada hasta la cintura y musculatura comparable a raíces de roble. Combate sin camisa ni escudo contra los aspirantes. Varg lo ve resistir golpes, romper un escudo de un puñetazo y alzar y arrojar al suelo a su rival, que queda inconsciente. Apenas muestra unas marcas tras al menos veinte combates. Su apodo no demuestra ascendencia de trol.",
        star: "★ Varg acepta enfrentarse a él al cerrar el capítulo; todavía no han luchado."
    },
    {
        id: "vol", label: "Vol", group: "VARG", type: "Personaje — Bruja Seiðr esclava",
        desc: "LIBRO 1, CAPÍTULO 2: Mujer de cabello negro con tatuajes azules por la mandíbula y el cuello, donde lleva un collar de hierro. Varg la ve conversando con un guerrero calvo, corpulento y de barba entrecana que se apoya en un hacha larga; ese guerrero no recibe nombre en este capítulo. Svik identifica a Vol y afirma que sus talentos pertenecen exclusivamente a los Bloodsworn. Varg quiere contratarla para un akáll, pero no llega a hablar con ella.",
        star: ""
    },
    {
        id: "seidr", label: "Seiðr", group: "MAGIA", type: "Magia — Brujería",
        desc: "LIBRO 1, CAPÍTULO 2: Varg busca una bruja Seiðr, o alternativamente un Galdurman, para realizar un akáll. El vendedor de comida se traza una runa en el pecho al oír su pregunta. Vol es una bruja Seiðr esclava de los Bloodsworn. No se muestra ningún rito ni se explica aún la diferencia entre ambas clases de practicantes.",
        star: ""
    },
    {
        id: "akall-concepto", label: "Akáll (Invocación)", group: "MAGIA", type: "Magia — Invocación",
        desc: "LIBRO 1, CAPÍTULO 2: Svik traduce akáll como invocación y advierte que se trata de un asunto serio. Varg insiste en necesitarlo y toca la bolsa de su cinturón. No revela todavía su objetivo concreto ni se practica el rito; no se atribuyen aquí mecanismos o resultados futuros.",
        star: ""
    },
    {
        id: "iskidan", label: "Iskidan", group: "LUGAR", type: "Lugar — Tierra al sur del mar",
        desc: "LIBRO 1, CAPÍTULO 2: Tierra muy lejana al sur, al otro lado del mar. Varg ha oído relatos sobre sus grandes ríos, llanuras herbosas, sol intenso y la ciudad de Gravka. En Liga ve desembarcar personas que una trabajadora portuaria identifica como procedentes de Iskidan: llevan caftanes, gorros de fieltro y piel y ropas de colores; sus escoltas portan armadura laminar y espadas curvas. Varg cree oír caballos dentro de un knarr; otros dos barcos semejantes se aproximan.",
        star: ""
    },
    {
        id: "gravka", label: "Gravka", group: "LUGAR", type: "Lugar — Gran Ciudad",
        desc: "LIBRO 1, CAPÍTULO 2: La Gran Ciudad de Iskidan, conocida por Varg a través de relatos; no la ha visitado.",
        star: ""
    },
    {
        id: "faunir", label: "Faunir", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: En el mercado de Liga se vende sangre seca de Faunir. La criatura no aparece viva ni recibe descripción física.",
        star: ""
    },
    {
        id: "trol", label: "Trol", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: Un vendedor de Liga ofrece un diente de trol del tamaño de un puño. No se ve ningún trol vivo. Medio-Trol es el apodo de Einar, sin confirmación de parentesco con estas criaturas.",
        star: ""
    },
    {
        id: "skraeling", label: "Skraeling", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: Varg observa un cuenco lleno de ojos de skraeling a la venta en Liga; no aparecen criaturas vivas ni se describen sus capacidades.",
        star: ""
    },
    {
        id: "froa-especie", label: "Froa-espíritu", group: "VAESEN", type: "Vaesen — Categoría",
        desc: "LIBRO 1, CAPÍTULO 2: Un vendedor de Liga ofrece un collar confeccionado con el cabello semejante a agujas de un Froa-espíritu. La mención no identifica un individuo ni demuestra que corresponda a ninguna Froa concreta del archivo original.",
        star: ""
    },
    {
        id: "prueba-armas-liga", label: "Prueba de Armas de Liga", group: "EVENTO", type: "Evento — Reclutamiento Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 2: La compañía busca reemplazar a un miembro muerto mediante combates ante el salón de Jarl Logur. Una aspirante anónima explica a Varg el puesto vacante y le obliga a esperar turno. Cincuenta o sesenta guerreros rodean el espacio; salen aspirantes heridos o inconscientes. Einar combate sin escudo y vence al rival que Varg observa. Tras el rechazo de Svik a contratar a Vol, Varg anuncia que luchará contra Einar. El resultado queda pendiente.",
        star: ""
    },
    {
        id: "vaesen-gen", label: "Vaesen", group: "VAESEN", type: "Criaturas — Categoría",
        status: "updated",
        previousState: "Añade el comercio de partes de Vaesen y su caza por mercenarios.",
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior al abrirse el foso durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con sus propios instrumentos naturales para matar. Estos rasgos hacen dudar de que sean los autores de la matanza de Asgrim e Idrun. LIBRO 1, CAPÍTULO 2: En Liga se comercializan sangre seca de Faunir, un diente de trol, ojos de skraeling y un collar de cabello de Froa-espíritu. Los Bloodsworn son conocidos, entre otros trabajos, por cazar Vaesen. Estas menciones comerciales no son avistamientos de criaturas vivas.",
        star: ""
    },
    {
        id: "vigrið", label: "Vigríð", group: "LUGAR", type: "Lugar — Llanura de Batalla",
        status: "updated",
        previousState: "Añade contexto político y mercenario desde la perspectiva de Varg.",
        desc: "LIBRO 1, CAPÍTULO 1: Thorkel llama a Vigríð la Llanura de Batalla y tierra de reinos destrozados. Incluye las tierras entre el mar y las montañas visibles al norte, y otras cien leguas más allá. Según su relato, los dioses lucharon y murieron aquí; la caída de Snaka quebró la tierra y permitió la entrada del mar. LIBRO 1, CAPÍTULO 2: Varg conoce la fama de los Bloodsworn en estas tierras. Ha oído que Helka pretende controlar media Vigríð; esto se presenta como rumor conocido por él, sin confirmar el alcance de su dominio. Iskidan se encuentra al otro lado del mar, muy al sur.",
        star: ""
    },
];
