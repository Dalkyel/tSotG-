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
        desc: "LIBRO 1, CAPÍTULO 1: Aldea pesquera en la orilla oriental de un fiordo profundo, bajo colinas boscosas. El fiordo desemboca al sur en el mar. Un sendero desciende desde la granja de Asgrim hacia la aldea y el fiordo.",
        star: ""
    },
    {
        id: "vigrið", label: "Vigríð", group: "LUGAR", type: "Lugar — Llanura de Batalla",
        desc: "LIBRO 1, CAPÍTULO 1: Llanura de Batalla y tierra de reinos destrozados, según Thorkel. Incluye las tierras entre el mar y las montañas visibles al norte de Fellur, y otras cien leguas más allá. La tradición sitúa aquí la guerra y muerte de los dioses; la caída de Snaka quebró la tierra y permitió la entrada del mar.",
        star: ""
    },
    {
        id: "snaka", label: "Snaka", group: "DIOS", type: "Dios Muerto — Padre",
        desc: "LIBRO 1, CAPÍTULO 1: Según la tradición relatada por Thorkel, Snaka es la serpiente, el Más Anciano y padre de los dioses; algunos lo consideran el mayor de ellos, y era el más grande. Había crecido desde el nacimiento del mundo. Sus hijos incluyen águila, oso, lobo y dragón, todavía sin nombres propios en esta fuente. Murió a manos de sus hijos en la guerra divina. Su caída destrozó reinos y sus huesos, cubiertos de tierra, forman montañas.",
        star: "★★ La geografía se presenta como el resto material de un cuerpo divino, a través de la saga de Thorkel."
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "foso-vaesen", label: "Foso de los Vaesen", group: "LUGAR", type: "Lugar — Cosmológico",
        desc: "LIBRO 1, CAPÍTULO 1: Abertura del mundo inferior por la que, según Orka, escaparon los vaesen al mundo del cielo y el mar durante la caída de Snaka.",
        star: ""
    },
    {
        id: "vaesen-gen", label: "Vaesen", group: "VAESEN", type: "Criaturas — Categoría",
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con medios naturales para matar.",
        star: ""
    },
    {
        id: "fell-wolf", label: "Fell-Wolf", group: "VAESEN", type: "Vaesen",
        desc: "LIBRO 1, CAPÍTULO 1: Vaesen de aspecto lobuno y gran tamaño.",
        star: ""
    },
    {
        id: "tennur", label: "Tennur", group: "VAESEN", type: "Vaesen — Enjambre",
        desc: "LIBRO 1, CAPÍTULO 1: Pequeños vaesen bípedos que codician los dientes humanos, con dedos de hueso afilado y dientes cortantes. Según Orka, solos son una molestia, pero en grupo pueden resultar mortales.",
        star: ""
    },
    {
        id: "runa-ward", label: "Runa Warding", group: "OBJETO", type: "Magia — Protección",
        desc: "LIBRO 1, CAPÍTULO 1: Runa protectora tallada para mantener alejados a los vaesen. Según Orka, su protección no detiene a los más poderosos.",
        star: ""
    },
    {
        id: "steading", label: "Steading (Granja)", group: "NORSE", type: "Vida Diaria — Vivienda",
        desc: "LIBRO 1, CAPÍTULO 1: Granja o conjunto de vivienda y dependencias de una explotación rural.",
        star: ""
    },
    {
        id: "asgrim-death", label: "Tragedia de Familia Asgrim", group: "EVENTO", type: "Evento — Hallazgo de la matanza",
        desc: "LIBRO 1, CAPÍTULO 1: Mientras cazan, Orka, Thorkel y Breca ven un fell-wolf herido y oyen gritos hacia la granja de Asgrim. Al llegar encuentran a Asgrim muerto de una estocada al corazón y a Idrun clavada y destripada en la puerta. Orka coloca el hacha en la mano de Asgrim e identifica el saqueo de sus dientes como obra de tennur. Una zona de sangre y huellas de arrastre sugieren que alguien más fue herido y retirado. La runa protectora y el uso de armas orientan la sospecha hacia hombres, sin identificar culpables. El paradero de Harek queda sin resolver.",
        star: "★★★ El hallazgo rompe la apariencia de paz y abre dos preguntas: quién atacó a la familia y dónde está Harek."
    },
    {
        id: "fridarold", label: "Friðaröld (Edad de la Paz)", group: "COSMO", type: "Época — Era actual",
        desc: "LIBRO 1, CAPÍTULO 1: Era actual, llamada Edad de la Paz porque terminó la guerra antigua y los dioses están muertos. La historia comienza en su año 297.",
        star: ""
    },

    {"id":"granja-asgrim","label":"Granja de Asgrim","group":"LUGAR","type":"Lugar — Granja","desc":"LIBRO 1, CAPÍTULO 1: La granja de Asgrim ocupa una plataforma en la ladera, junto a una pared de roca. Una casa grande con tejado de hierba y varios edificios auxiliares están rodeados por una empalizada más alta que Orka. Un sendero en el lado oriental baja hacia Fellur y el fiordo.","star":""},
    {"id":"encuentro-fell-wolf","label":"Encuentro con el Fell-Wolf","group":"EVENTO","type":"Evento — Cacería interrumpida","desc":"LIBRO 1, CAPÍTULO 1: Lobo enorme de pelaje gris pizarra, largas garras y grandes dientes. Irrumpe en el claro durante la cacería, sangrando por numerosas heridas y sin detenerse a atacar los renos. Su paso espanta la manada y frustra el lanzamiento de Breca. Thorkel prueba una gota de su sangre y explica que está herido y no piensa en comer. No se sabe quién lo hirió ni si guarda relación con los gritos posteriores.","star":"★ La pregunta de Breca sobre qué pudo herir a semejante criatura queda abierta."},

// ── LIBRO 1, CAPÍTULO 2 — VARG ──
    {
        id: "cat-varg", label: "ARCO VARG", group: "CAT", type: "Categoría",
        desc: "LIBRO 1, CAPÍTULO 2: La huida de Varg y su búsqueda de ayuda entre los Bloodsworn.",
        star: ""
    },
    {
        id: "varg", label: "Varg", group: "VARG", type: "Personaje — Esclavo fugitivo",
        desc: "LIBRO 1, CAPÍTULO 2: Llega a Liga tras nueve o diez días de huida, convencido de que lo persiguen aunque no ve a nadie. Desconoce su edad y a sus padres; recuerda treinta inviernos y veranos de esclavitud en la granja de Kolskegg, veinte leguas al noreste de Liga, río arriba. Corre con una resistencia que él mismo considera casi inagotable. Recuerda haber estrangulado a Snepil, pero no cómo llegó a rodearle el cuello con las manos: el recuerdo emerge de una niebla roja. Se vuelve a poner y cierra con llave el collar de hierro para entrar en Liga fingiendo que busca alojamiento para su amo, al que llama Snepil. Lleva monedas con la efigie de Helka; compra comida tras al menos tres días sin comer, paga información y silencio al vendedor y obtiene su cuchilla. Busca un Galdurman o una bruja Seiðr para realizar un akáll, cuya finalidad concreta aún no explica. Se toca repetidamente una bolsa del cinturón, de contenido no revelado. Svik le niega contratar a Vol, que solo sirve a los Bloodsworn. Al ver la prueba de reclutamiento, Varg termina ofreciéndose a luchar contra Einar Medio-Trol. El vendedor de comida se traza una runa en el pecho cuando pregunta por una bruja Seiðr o un Galdurman. En Liga observa desembarcar a personas que una trabajadora portuaria identifica como procedentes de Iskidan. Llevan caftanes, gorros de fieltro y piel y ropas de colores; sus escoltas usan armadura laminar y espadas curvas. Cree oír caballos dentro de un knarr, mientras otros dos barcos semejantes se aproximan.",
        star: "★★ La laguna de memoria al matar a Snepil, la resistencia al correr y la bolsa que protege quedan sin explicación. El capítulo termina antes de su combate con Einar."
    },
    {
        id: "liga", label: "Liga", group: "LUGAR", type: "Lugar — Puerto y mercado",
        desc: "LIBRO 1, CAPÍTULO 2: Puerto amurallado en la ribera sudoriental de un fiordo, sobre una playa de arena negra junto a la desembocadura de un río. Las calles de madera, barro y puestos comerciales suben hasta el salón de Jarl Logur, al pie de los riscos. Acoge barcos mercantes y un drakkar destacado entre ellos; los Bloodsworn atracaron el día anterior. Varg presencia la llegada de comerciantes y guerreros de Iskidan. Su mercado vende comida, pieles, marfil y partes de Vaesen. Se venden sangre seca de Faunir, un diente de trol del tamaño de un puño, un cuenco de ojos de skraeling y un collar de cabello semejante a agujas de Froa-espíritu; estas mercancías no son avistamientos de criaturas vivas.",
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
        desc: "LIBRO 1, CAPÍTULO 2: Forma de brujería cuyos practicantes pueden ser buscados para realizar una invocación o akáll. Todavía no se explica su diferencia con la práctica de un Galdurman.",
        star: ""
    },
    {
        id: "akall-concepto", label: "Akáll (Invocación)", group: "MAGIA", type: "Magia — Invocación",
        desc: "LIBRO 1, CAPÍTULO 2: Invocación. Svik advierte que es un asunto serio; todavía no se describe su procedimiento.",
        star: ""
    },
    {
        id: "iskidan", label: "Iskidan", group: "LUGAR", type: "Lugar — Tierra al sur del mar",
        desc: "LIBRO 1, CAPÍTULO 2: Tierra muy lejana al sur, al otro lado del mar. Los relatos conocidos por Varg hablan de grandes ríos, llanuras herbosas, sol intenso y la ciudad de Gravka.",
        star: ""
    },
    {
        id: "gravka", label: "Gravka", group: "LUGAR", type: "Lugar — Gran Ciudad",
        desc: "LIBRO 1, CAPÍTULO 2: La Gran Ciudad de Iskidan.",
        star: ""
    },
    {
        id: "faunir", label: "Faunir", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen cuya sangre seca se comercializa.",
        star: ""
    },
    {
        id: "trol", label: "Trol", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen cuyos dientes tienen valor comercial.",
        star: ""
    },
    {
        id: "skraeling", label: "Skraeling", group: "VAESEN", type: "Vaesen — Mención comercial",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen cuyos ojos se comercializan.",
        star: ""
    },
    {
        id: "froa-especie", label: "Froa-espíritu", group: "VAESEN", type: "Vaesen — Categoría",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen con cabello semejante a agujas, utilizado para confeccionar collares.",
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
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con medios naturales para matar. LIBRO 1, CAPÍTULO 2: Sus partes y restos tienen valor comercial.",
        star: ""
    },
    {
        id: "vigrið", label: "Vigríð", group: "LUGAR", type: "Lugar — Llanura de Batalla",
        status: "updated",
        previousState: "Añade contexto político y mercenario desde la perspectiva de Varg.",
        desc: "LIBRO 1, CAPÍTULO 1: Llanura de Batalla y tierra de reinos destrozados, según Thorkel. Incluye las tierras entre el mar y las montañas visibles al norte de Fellur, y otras cien leguas más allá. La tradición sitúa aquí la guerra y muerte de los dioses; la caída de Snaka quebró la tierra y permitió la entrada del mar. LIBRO 1, CAPÍTULO 2: Se rumorea que Helka pretende controlar la mitad de estas tierras, sin confirmar el alcance de su dominio. Iskidan queda al otro lado del mar, muy al sur.",
        star: ""
    },

    {"id":"akall","label":"Akáll de Varg","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 2: Varg busca un Galdurman o una bruja Seiðr que realice una invocación. Todavía no revela su finalidad ni consigue que se practique el rito.","star":""},
    {"id":"bolsa-varg","label":"Contenido de la Bolsa de Varg","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 2: Varg protege una bolsa de su cinturón y la toca repetidamente. Su contenido y su importancia permanecen sin revelar.","star":""},
    {"id":"pasado-varg","label":"Orígenes y Recuerdos de Varg","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 2: Varg desconoce a sus padres y no sabe su edad con certeza. El recuerdo de haber estrangulado a Snepil emerge de una niebla roja; no recuerda cómo llegó a rodearle el cuello con las manos. Esas lagunas siguen abiertas.","star":""},

// ── LIBRO 1, CAPÍTULO 3 — ORKA ──
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        status: "updated",
        previousState: "Añade la llegada a Fellur, su reacción a la reliquia y el enfrentamiento contenido con Guðvarr.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza. LIBRO 1, CAPÍTULO 3: Lleva con Breca los cuerpos de Asgrim e Idrun a Fellur mientras Thorkel rastrea a los asesinos. Prefería seguirlos ella, pero reconoce que su esposo es mejor rastreador. Siente presión en la cabeza y el pecho bajo el nudillo de dios de la puerta; disminuye al alejarse. Desmiente a Guðvarr: la estocada de espada no corresponde a dientes ni garras de vaesen. Al recibir sus amenazas revive imágenes de violencia, tiembla y lucha por contenerse ante Breca. La llegada de Thorkel permite cortar la confrontación. Quiere entregar los muertos a sus parientes para que reciban un túmulo, pero termina marchándose con su familia: considera que esta lucha no les corresponde. Guðvarr se burla preguntándole si es una bruja Seiðr capaz de ver el pasado; ella responde que basta reconocer una herida de espada. No demuestra magia ni confirma esa identidad.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        status: "updated",
        previousState: "Añade el rastreo hasta un afluente del Skarpain y su regreso a Fellur.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres. LIBRO 1, CAPÍTULO 3: No encuentra a Harek en la granja. Sigue el rastro de los asesinos por el bosque tras prometer que regresará sin enfrentarse solo a ellos si los descubre; Orka teme que no cumpla esa promesa por salvar al niño. El rastro acaba en un afluente del Skarpain, con señales de tres barcas en la orilla. No encuentra a los fugitivos. Regresa a Fellur durante el enfrentamiento de Orka con Guðvarr; su propia ira se suaviza cuando ella le habla de enterrar a los muertos.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        status: "updated",
        previousState: "Añade su participación en el traslado y el encuentro con Guðvarr.",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek. LIBRO 1, CAPÍTULO 3: Conduce el poni que arrastra el carro con los cuerpos hasta Fellur; Orka le encarga la tarea para darle algo en que concentrarse. Pregunta si su padre encontrará a Harek y anuncia su desaparición ante Virk y Guðvarr. La espada de Guðvarr lo impresiona. Observa preocupado la confrontación de su madre y le tira de la manga para avisar de la llegada de Thorkel.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata."
    },
    {
        id: "asgrim", label: "Asgrim (†)", group: "ORKA", type: "Personaje — Muerto",
        status: "updated",
        previousState: "Añade el traslado del cuerpo y la petición de sepultura.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Idrun y padre de Harek. Su granja está en las colinas sobre Fellur. Orka lo encuentra muerto entre las puertas abiertas de la empalizada, con una estocada al corazón, una lanza rota y un hacha ensangrentada cerca. Es ancho de hombros, de cabello gris y cuerpo fibroso; lleva un anillo de plata en un brazo. Los cuervos han picoteado ojos y labios; Orka atribuye la falta de dientes a los tennur. La sangre y las marcas de arrastre próximas sugieren que hirió a un atacante. Orka pone el hacha en su mano para su viaje por el camino del alma. LIBRO 1, CAPÍTULO 3: Orka y Breca transportan su cuerpo con el de Idrun a Fellur, cubiertos con una manta de lana ensangrentada. Orka pide averiguar si tienen parientes allí y que se les levante un túmulo; el entierro no se muestra.",
        star: "★ La herida de arma y las huellas son indicios sobre el ataque; no identifican todavía a sus autores."
    },
    {
        id: "idrun", label: "Idrun (†)", group: "ORKA", type: "Personaje — Muerta",
        status: "updated",
        previousState: "Añade el traslado del cuerpo y la petición de sepultura.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Asgrim y madre de Harek. Orka y Thorkel encuentran su cuerpo clavado a la puerta de la granja, con los brazos extendidos y el vientre abierto. El calor que aún desprenden sus entrañas indica lo reciente de la muerte. Orka comprende que los gritos que habían oído eran suyos. El capítulo no establece un motivo ni una interpretación ritual. LIBRO 1, CAPÍTULO 3: Su cuerpo viaja junto al de Asgrim en el carro que Orka y Breca llevan a Fellur. Orka solicita que se busque a sus parientes y que ambos reciban un túmulo; no se muestra su entierro.",
        star: "★ Su muerte lenta contrasta con la estocada rápida que mató a Asgrim."
    },
    {
        id: "harek", label: "Harek", group: "ORKA", type: "Personaje — Paradero desconocido",
        status: "updated",
        previousState: "La ausencia pasa a tratarse como rapto; el rastreo no resuelve su suerte.",
        desc: "LIBRO 1, CAPÍTULO 1: Hijo de Asgrim e Idrun y amigo de Breca, con quien ha jugado en la playa de Fellur. Breca lo recuerda al oír gritos en dirección a su granja. Tras encontrar muertos a sus padres, el capítulo termina con la pregunta de Breca sobre dónde está Harek. Su suerte y las circunstancias de su ausencia no se aclaran. LIBRO 1, CAPÍTULO 3: La búsqueda en la granja no da resultado. Breca y Orka lo consideran llevado por los asesinos. Thorkel sigue el rastro hasta señales de tres barcas en un afluente del Skarpain, sin encontrarlo. Su destino y si sigue vivo continúan sin confirmarse.",
        star: "★★ La pregunta por Harek cierra el capítulo y abre una búsqueda; aún no se confirma un secuestro ni su muerte."
    },
    {
        id: "fellur", label: "Fellur", group: "LUGAR", type: "Lugar — Aldea pesquera",
        status: "updated",
        previousState: "Añade geografía local, reliquia protectora y conflicto político.",
        desc: "LIBRO 1, CAPÍTULO 1: Aldea pesquera en la orilla oriental de un fiordo profundo, bajo colinas boscosas. El fiordo desemboca al sur en el mar. Un sendero desciende desde la granja de Asgrim hacia la aldea y el fiordo. LIBRO 1, CAPÍTULO 3: Tiene unas pocas docenas de edificios con techos de caña y paredes de entramado y barro, salón comunal central y una empalizada parcialmente podrida que termina antes de la playa de arena oscura. Sus muelles albergan barcos pesqueros y byrding costeros. Un nudillo de dios muerto incrustado en la puerta ayuda a repeler a los vaesen. La gobierna Jarl Sigrún.",
        star: ""
    },
    {
        id: "helka", label: "Reina Helka", group: "VARG", type: "Personaje — Reina",
        status: "updated",
        previousState: "Añade la propuesta de someter Fellur a Helka y la localización de su corte.",
        desc: "LIBRO 1, CAPÍTULO 2: Su perfil de nariz afilada y cabello recogido figura en las monedas de bronce que lleva Varg. Él solo conoce rumores sobre su pretensión de controlar media Vigríð y su crueldad con los enemigos. Un drengr cobraba sus tributos en la granja de Kolskegg. El vendedor de comida critica sus impuestos. Svik usa su nombre como ejemplo hipotético: ni siquiera ella podría contratar a Vol. LIBRO 1, CAPÍTULO 3: Según Virk, Sigrún lleva más de dos meses en su corte de Darl. Guðvarr transmite que su tía recomienda jurarle lealtad, presentando la protección de Helka como respuesta a Störr y a los vaesen. La adhesión de Fellur queda pendiente de un Althing; el capítulo no muestra a Helka en persona.",
        star: ""
    },
    {
        id: "asgrim-death", label: "Tragedia de Familia Asgrim", group: "EVENTO", type: "Evento — Hallazgo de la matanza",
        status: "updated",
        previousState: "Añade el rastreo y la presentación de los cadáveres en Fellur.",
        desc: "LIBRO 1, CAPÍTULO 1: Mientras cazan, Orka, Thorkel y Breca ven un fell-wolf herido y oyen gritos hacia la granja de Asgrim. Al llegar encuentran a Asgrim muerto de una estocada al corazón y a Idrun clavada y destripada en la puerta. Orka coloca el hacha en la mano de Asgrim e identifica el saqueo de sus dientes como obra de tennur. Una zona de sangre y huellas de arrastre sugieren que alguien más fue herido y retirado. La runa protectora y el uso de armas orientan la sospecha hacia hombres, sin identificar culpables. El paradero de Harek queda sin resolver. LIBRO 1, CAPÍTULO 3: Tras buscar sin éxito a Harek, Thorkel sigue las huellas mientras Orka y Breca llevan los muertos a Fellur. Guðvarr atribuye la matanza a vaesen, pero Orka lo contradice por la estocada de espada. Thorkel encuentra señales de tres barcas en un afluente del Skarpain. Guðvarr promete investigar; no se identifican los asesinos ni se recupera al niño.",
        star: "★★★ El hallazgo rompe la apariencia de paz y abre dos preguntas: quién atacó a la familia y dónde está Harek."
    },
    {
        id: "vaesen-gen", label: "Vaesen", group: "VAESEN", type: "Criaturas — Categoría",
        status: "updated",
        previousState: "Añade la protección de Fellur y distingue acusación política de evidencia.",
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con medios naturales para matar. LIBRO 1, CAPÍTULO 2: Sus partes y restos tienen valor comercial. LIBRO 1, CAPÍTULO 3: Según Orka, prefieren lugares oscuros y tranquilos donde ocultarse. Los huesos de dioses conservan poder protector contra ellos.",
        star: ""
    },
    {
        id: "seidr", label: "Seiðr", group: "MAGIA", type: "Magia — Brujería",
        status: "updated",
        previousState: "Añade la referencia atribuida a la visión del pasado, sin confirmar poderes de Orka.",
        desc: "LIBRO 1, CAPÍTULO 2: Forma de brujería cuyos practicantes pueden ser buscados para realizar una invocación o akáll. Todavía no se explica su diferencia con la práctica de un Galdurman.",
        star: ""
    },
    {
        id: "virk", label: "Virk", group: "ORKA", type: "Personaje — Pescador",
        desc: "LIBRO 1, CAPÍTULO 3: Pescador de Fellur que ha comerciado muchas veces con Orka y Thorkel. Alto, corpulento y franco. Se recupera de una lesión en el brazo sufrida durante una tormenta y sus dos hijos, aún sin nombre, salen a pescar por él. Sale de la taberna con olor a alcohol. Critica que los antiguos jarls se hagan llamar reyes y rechaza que la sumisión a Helka se disfrace de cuidados. Afirma haber oído antes casos de niños llevados; no identifica responsables.",
        star: "★ Su comentario sitúa la desaparición de Harek dentro de un posible patrón."
    },
    {
        id: "gudvarr", label: "Guðvarr", group: "ORKA", type: "Personaje — Drengr",
        desc: "LIBRO 1, CAPÍTULO 3: Joven sobrino y drengr de Jarl Sigrún. Llega por el río en una snekke y transmite su regreso dentro de nueve días y su recomendación de jurar lealtad a Helka. Lleva espada, túnica roja bordada y brazalete de plata; cabello negro aceitado y barba incipiente. Invoca la amenaza de Störr y de los vaesen. Atribuye a estos la muerte de Asgrim e Idrun y se burla de Orka; cuando ella lo desmiente, la amenaza con tres guerreros a su espalda. Tras el regreso de Thorkel promete investigar. Afirma que los vaesen se están volviendo más audaces y que asesinan y roban; esa acusación no confirma que sean responsables de la matanza.",
        star: "★ Su autoridad y arrogancia amenazan con convertir una petición de ayuda en violencia."
    },
    {
        id: "sigrun", label: "Jarl Sigrún", group: "ORKA", type: "Personaje — Jarl",
        desc: "LIBRO 1, CAPÍTULO 3: Gobernante de Fellur y tía de Guðvarr. Según Virk lleva más de dos meses ausente, convocada —palabra que corrige por invitada— a la corte de Helka en Darl. Su sobrino anuncia su regreso dentro de nueve días y transmite que recomienda someterse a Helka. Convocará un Althing en la Roca del Juramento de Fellur para debatirlo. No aparece en persona.",
        star: ""
    },
    {
        id: "storr", label: "Jarl Störr", group: "FACCION", type: "Personaje — Jarl",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr afirma que amenaza desde el oeste y lo usa como argumento para que Fellur se una a Helka. No aparece y no se precisan sus acciones ni dominios.",
        star: ""
    },
    {
        id: "darl", label: "Darl", group: "LUGAR", type: "Lugar — Corte",
        desc: "LIBRO 1, CAPÍTULO 3: Sede de la corte de la Reina Helka.",
        star: ""
    },
    {
        id: "hueso-dios-fellur", label: "Nudillo de Dios (Fellur)", group: "OBJETO", type: "Objeto Mágico — Reliquia",
        desc: "LIBRO 1, CAPÍTULO 3: Nudillo de un dios muerto incrustado en el travesaño de la puerta de Fellur. Conserva un resto de poder que ayuda a mantener fuera a los vaesen. Orka siente presión en la cabeza y el pecho al pasar bajo él, que disminuye al alejarse. No se describe ninguna reacción de Breca.",
        star: "★★ La sensibilidad de Orka ante la reliquia queda observada sin explicar su causa."
    },
    {
        id: "oath-stone-fellur", label: "Roca del Juramento de Fellur", group: "LUGAR", type: "Lugar — Islote de asamblea",
        desc: "LIBRO 1, CAPÍTULO 3: Islote rocoso del fiordo de Fellur, cubierto de musgo, helechos y árboles azotados por el viento. Es lugar de asamblea.",
        star: ""
    },
    {
        id: "rio-skarpain", label: "Río Skarpain", group: "LUGAR", type: "Lugar — Río",
        desc: "LIBRO 1, CAPÍTULO 3: Río al que confluyen numerosos cursos de agua que bajan de las colinas.",
        star: ""
    },
    {
        id: "althing", label: "Alþing (Althing)", group: "NORSE", type: "Cultura — Asamblea",
        desc: "LIBRO 1, CAPÍTULO 3: Asamblea donde una comunidad se reúne para tratar asuntos públicos y expresar su parecer.",
        star: ""
    },
    {
        id: "drengr", label: "Drengr", group: "NORSE", type: "Cultura — Guerrero",
        desc: "LIBRO 1, CAPÍTULO 3: Título de guerrero al servicio de un jarl.",
        star: ""
    },
    {
        id: "snekkja", label: "Snekkja / Snekke", group: "NORSE", type: "Embarcación",
        desc: "LIBRO 1, CAPÍTULO 3: Tipo de embarcación, también llamado snekke. Su aparición en este capítulo muestra que puede navegar por río.",
        star: ""
    },
    {
        id: "byrding", label: "Byrðingr", group: "NORSE", type: "Embarcación — Costera",
        desc: "LIBRO 1, CAPÍTULO 3: Tipo de embarcación costera.",
        star: ""
    },
    {
        id: "gods-bones", label: "Huesos de los Dioses", group: "MAGIA", type: "Magia — Reliquias",
        desc: "LIBRO 1, CAPÍTULO 3: Restos de dioses muertos que conservan poder y pueden emplearse como protección contra los vaesen.",
        star: ""
    },
    {
        id: "helka-poder", label: "Expansión de Helka", group: "TRAMA", type: "Trama — Sumisión política",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr propone que Fellur jure lealtad a Helka y presenta su dominio como protección frente a Störr y los vaesen. Virk denuncia que eso significa gobierno, no cuidados. Habrá un Althing al regreso de Sigrún; no se ha mostrado una decisión colectiva de Fellur.",
        star: "★ La seguridad se convierte en argumento para ceder autonomía."
    },
    {
        id: "ninos-robados", label: "Robos de Ninos", group: "TRAMA", type: "Trama — Desapariciones",
        desc: "LIBRO 1, CAPÍTULO 3: Breca y Orka afirman que los asesinos se llevaron a Harek. Virk dice haber oído antes que se llevan niños. El capítulo sugiere otros casos, pero no aporta nombres, cifras, fechas, autores ni motivos.",
        star: "★★ La afirmación de Virk amplía la inquietud más allá de una sola familia."
    },

    {"id":"althing-fellur","label":"Asamblea de Fellur","group":"EVENTO","type":"Evento — Althing de Sigrún","desc":"LIBRO 1, CAPÍTULO 3: Guðvarr anuncia una asamblea en la Roca del Juramento de Fellur cuando vuelva Sigrún. Todos podrán expresar su parecer sobre jurar lealtad a Helka. La reunión todavía no se celebra.","star":""},

// ── LIBRO 1, CAPÍTULO 4 — VARG ──
    {
        id: "varg", label: "Varg", group: "VARG", type: "Personaje — Nuevo miembro Bloodsworn",
        status: "updated",
        previousState: "Revela a Frøya, el propósito de su búsqueda y su admisión tras el combate y el rescate.",
        desc: "LIBRO 1, CAPÍTULO 2: Llega a Liga tras nueve o diez días de huida, convencido de que lo persiguen aunque no ve a nadie. Desconoce su edad y a sus padres; recuerda treinta inviernos y veranos de esclavitud en la granja de Kolskegg, veinte leguas al noreste de Liga, río arriba. Corre con una resistencia que él mismo considera casi inagotable. Recuerda haber estrangulado a Snepil, pero no cómo llegó a rodearle el cuello con las manos: el recuerdo emerge de una niebla roja. Se vuelve a poner y cierra con llave el collar de hierro para entrar en Liga fingiendo que busca alojamiento para su amo, al que llama Snepil. Lleva monedas con la efigie de Helka; compra comida tras al menos tres días sin comer, paga información y silencio al vendedor y obtiene su cuchilla. Busca un Galdurman o una bruja Seiðr para realizar un akáll, cuya finalidad concreta aún no explica. Se toca repetidamente una bolsa del cinturón, de contenido no revelado. Svik le niega contratar a Vol, que solo sirve a los Bloodsworn. Al ver la prueba de reclutamiento, Varg termina ofreciéndose a luchar contra Einar Medio-Trol. El vendedor de comida se traza una runa en el pecho cuando pregunta por una bruja Seiðr o un Galdurman. En Liga observa desembarcar a personas que una trabajadora portuaria identifica como procedentes de Iskidan. Llevan caftanes, gorros de fieltro y piel y ropas de colores; sus escoltas usan armadura laminar y espadas curvas. Cree oír caballos dentro de un knarr, mientras otros dos barcos semejantes se aproximan. LIBRO 1, CAPÍTULO 4: Rechaza un escudo porque nunca ha usado uno; la guerrera rubia lo anuncia como Varg No-Sense (Sin-Sentido). Su experiencia de pugilista comenzó luchando por comida para Frøya enferma y continuó en combates que enriquecieron a Kolskegg. Golpea y hace arrodillarse a Einar, pero se lesiona la mano contra su protección y termina inconsciente tras morderle la pantorrilla. Despierta de noche junto al fiordo, con heridas en cabeza y mano y posibles costillas rotas. Encuentra la capa doblada, con la cuchilla, las monedas y la llave; conserva también su bolsa del cinturón, cuyo contenido sigue sin revelarse. Se quita el collar y acampa entre los pinos. Llora a su hermana Frøya, muerta, y revela que busca ayuda mágica para vengarla. Según le contó Kolskegg, sus padres los vendieron por un pan y doce huevos de pato cuando tenían cinco y cuatro inviernos. Decide seguir buscando un Galdurman o una bruja Seiðr por Vigríð, y si hace falta cruzar a Iskidan y recorrer los Shattered Realms (Reinos Fragmentados). Leif lo captura con su gente: Varg hiere con la cuchilla a dos atacantes y sostiene que ganó su libertad, pero el padre de Leif quebrantó su juramento. Leif le roba las monedas, lo corta con la lanza y se dispone a amputarle una mano. Lo rescatan el guerrero calvo de barba gris, la mujer canosa con dos perros, Einar y Svik. El calvo declara que Varg ya pertenece a los Bloodsworn. No se muestra todavía un juramento de ingreso.",
        star: "★★ La laguna de memoria al matar a Snepil, la resistencia al correr y la bolsa que protege quedan sin explicación. El capítulo termina antes de su combate con Einar. CAPÍTULO 4: La pertenencia declarada por el rescatador abre el acceso a la compañía de Vol; no se ha realizado el akáll."
    },
    {
        id: "snepil", label: "Snepil (†) / Kolskegg", group: "VARG", type: "Personajes — Nombres de la esclavitud de Varg",
        status: "updated",
        previousState: "Añade el testimonio de Leif, los combates de Varg y la acusación de juramento roto.",
        desc: "LIBRO 1, CAPÍTULO 2: La fuente llama Kolskegg al dueño de la granja donde Varg pasó treinta inviernos, situada veinte leguas al noreste de Liga. Varg recuerda haber estrangulado a un hombre llamado Snepil, sin recordar cómo empezó, y usa su nombre al inventar que busca alojamiento para su amo. El archivo original agrupa ambos nombres bajo este id; este capítulo no aclara explícitamente si Snepil y Kolskegg son la misma persona. No se atribuye aquí la muerte a Kolskegg como hecho confirmado. LIBRO 1, CAPÍTULO 4: Kolskegg compró a Varg y Frøya de niños, según lo que él mismo les contó; más tarde ganó un cofre de plata con los combates de Varg. Leif se presenta como Leif Kolskeggson, hijo del hombre al que acusa a Varg de haber asesinado y despedazado, reconocible solo por su cadena. Varg afirma que el padre le negó una libertad ya ganada, quebrantando su juramento. Al oír la acusación recuerda volver en sí mientras estrangulaba a Snepil, rodeado de sangre y carnicería. La secuencia vincula ambos nombres con la matanza, pero no identifica explícitamente a Snepil y Kolskegg como una sola persona; se conserva la cautela del capítulo 2.",
        star: "★ La identidad entre los dos nombres queda pendiente de aclaración textual."
    },
    {
        id: "einar", label: "Einar Medio-Trol", group: "VARG", type: "Personaje — Bloodsworn",
        status: "updated",
        previousState: "Resuelve el combate de Varg y añade su intervención en el rescate.",
        desc: "LIBRO 1, CAPÍTULO 2: Svik lo llama Einar Half-Troll, aquí Medio-Trol. Es enorme, de barba roja trenzada hasta la cintura y musculatura comparable a raíces de roble. Combate sin camisa ni escudo contra los aspirantes. Varg lo ve resistir golpes, romper un escudo de un puñetazo y alzar y arrojar al suelo a su rival, que queda inconsciente. Apenas muestra unas marcas tras al menos veinte combates. Su apodo no demuestra ascendencia de trol. LIBRO 1, CAPÍTULO 4: Aconseja a Varg permanecer en el suelo cuando caiga. Varg consigue hacerlo arrodillarse con golpes a la espalda y la pierna, pero Einar lo derrota hasta dejarlo inconsciente; Varg le muerde la pantorrilla y le arranca un grito. Lleva una protección dura como hierro fabricada por Jökul que inutiliza el golpe de Varg a la entrepierna. Esa noche interviene en el rescate de Varg, sale entre los árboles y arroja a uno de los hombres de Leif de un puñetazo.",
        star: "★ Varg acepta enfrentarse a él al cerrar el capítulo; todavía no han luchado."
    },
    {
        id: "svik", label: "Svik Hrulfsson", group: "VARG", type: "Personaje — Bloodsworn",
        status: "updated",
        previousState: "Añade sus acciones en el rescate y la reacción de la perra a su gruñido.",
        desc: "LIBRO 1, CAPÍTULO 2: Guerrero esbelto de cabello rojo cuidadosamente trenzado y barba recortada y aceitada. Lleva una buena cota de malla y un seax decorado. Se presenta como Svik Hrulfsson, apodado Tangle-Hair por no llevar nunca el pelo enredado. Pide el nombre de Varg a la entrada de la prueba, bromea sobre sus motivos para buscar magia y reconoce la seriedad de un akáll. Rechaza dejarle contratar a Vol: sus talentos se reservan a la compañía. Explica que Einar combate sin escudo para dar alguna oportunidad a los aspirantes. LIBRO 1, CAPÍTULO 4: Bromea con que Varg no tiene nombre antes del combate. Participa en su rescate de Leif: esquiva una lanza, desliza el seax por el asta y corta los dedos del atacante, al que derriba de un cabezazo. Después emite un gruñido animal que hace retroceder a la perra de Orl; el gesto observado no confirma ninguna ascendencia sobrenatural.",
        star: ""
    },
    {
        id: "bloodsworn", label: "Bloodsworn (Hermanos de Sangre)", group: "VARG", type: "Facción — Compañía mercenaria",
        status: "updated",
        previousState: "Añade el rescate y la declaración de pertenencia de Varg.",
        desc: "LIBRO 1, CAPÍTULO 2: Compañía famosa en Vigríð y, según Varg, probablemente más allá. Se alquila al mejor postor para cazar Vaesen, buscar reliquias divinas, intervenir en disputas fronterizas o proteger a los poderosos. Llegó a Liga el día anterior y es huésped de Jarl Logur. Sus escudos negros llevan salpicaduras rojas. Cuenta con la bruja Seiðr esclava Vol. Tras la muerte de uno de sus miembros, celebra una prueba de armas para cubrir un puesto en su drakkar; Einar combate con los aspirantes y Svik controla el acceso. LIBRO 1, CAPÍTULO 4: Una guerrera rubia ofrece un escudo a Varg y lo anuncia como Varg No-Sense al rechazarlo. Einar lo deja inconsciente en la prueba. Más tarde el guerrero calvo de barba gris, una mujer canosa con dos perros, Einar y Svik lo salvan de Leif. Ante la reclamación de propiedad y weregild de Leif, el calvo declara que Varg es ahora uno de los Bloodsworn. Ninguno de los dos rescatadores anónimos recibe nombre en este capítulo.",
        star: ""
    },
    {
        id: "prueba-armas-liga", label: "Prueba de Armas de Liga", group: "EVENTO", type: "Evento — Reclutamiento Bloodsworn",
        status: "updated",
        previousState: "Resuelve el duelo pendiente y distingue la derrota del ingreso declarado después.",
        desc: "LIBRO 1, CAPÍTULO 2: La compañía busca reemplazar a un miembro muerto mediante combates ante el salón de Jarl Logur. Una aspirante anónima explica a Varg el puesto vacante y le obliga a esperar turno. Cincuenta o sesenta guerreros rodean el espacio; salen aspirantes heridos o inconscientes. Einar combate sin escudo y vence al rival que Varg observa. Tras el rechazo de Svik a contratar a Vol, Varg anuncia que luchará contra Einar. El resultado queda pendiente. LIBRO 1, CAPÍTULO 4: Varg combate sin escudo, pues no sabe usarlo; la guerrera rubia lo anuncia como Varg No-Sense. El público apuesta sobre su derrota. Sus puños no detienen a Einar y se lesiona contra la protección de Jökul. Consigue hacerlo caer sobre una rodilla y morderle la pantorrilla antes de quedar inconsciente. Al despertar fuera de Liga cree haber fracasado; solo al final del posterior rescate el calvo declara su pertenencia a la compañía.",
        star: ""
    },
    {
        id: "froya", label: "Frøya (†)", group: "VARG", type: "Personaje — Hermana muerta de Varg",
        desc: "LIBRO 1, CAPÍTULO 4: Hermana de Varg y su única amiga y consuelo durante la esclavitud. Según lo que Kolskegg contó a Varg, sus padres los vendieron por un pan y doce huevos de pato cuando él tenía cinco inviernos y ella cuatro. Varg comenzó a luchar por una ración extra de caldo cuando Frøya tenía fiebre. Ahora está muerta y Varg busca ayuda de un Galdurman o una bruja Seiðr para saber cómo vengarla; el capítulo no explica cómo murió ni revela el contenido de la bolsa que él protege.",
        star: "★★ Su muerte explica la búsqueda de ayuda mágica de Varg."
    },
    {
        id: "jokul", label: "Jökul", group: "VARG", type: "Personaje — Herrero mencionado",
        desc: "LIBRO 1, CAPÍTULO 4: Einar dice que este herrero le fabricó la protección de la entrepierna. Varg se lesiona la mano al golpearla durante la prueba. Jökul no aparece en persona ni recibe apodo en este capítulo.",
        star: ""
    },
    {
        id: "leif", label: "Leif Kolskeggson", group: "VARG", type: "Personaje — Perseguidor de Varg",
        desc: "LIBRO 1, CAPÍTULO 4: Hombre ancho, de barba negra y labio marcado por una cicatriz. Se presenta como hijo del hombre al que Varg mató y acusa a este de haber asesinado también a tres hombres libres. Lo rastrea con una partida y la perra de Orl. Reclama a Varg como esclavo heredado y por derecho de weregild, mientras Varg afirma haber ganado una libertad negada por su padre. Leif le quita las monedas, le corta las costillas con la lanza y amenaza con arrastrarlo tras su caballo, azotarlo y obligarlo a trabajar de por vida. Ordena a Orl atender a dos heridos y se dispone a cortarle una mano a Varg con la cuchilla. El guerrero calvo de barba gris lo incapacita antes; Leif queda arrodillado, sujetándose la entrepierna. Su reclamación es rechazada porque Varg pertenece ahora a los Bloodsworn.",
        star: "★ Sigue vivo al cerrar el capítulo; su reclamación de propiedad permanece enfrentada a la libertad que afirma Varg."
    },
    {
        id: "orl", label: "Orl", group: "VARG", type: "Personaje — Esclavo y cuidador de una perra",
        desc: "LIBRO 1, CAPÍTULO 4: Anciano de pelo gris ralo y lacio que lleva un collar de hierro. Maneja la perra que rastrea a Varg y apaga con su capa el fuego que prende en su pelaje cuando Varg la arroja contra la hoguera. Leif le ordena atender a sus dos heridos; Orl corta la túnica de la mujer y limpia la herida. Leif dice que Orl tallará una mano de madera para Varg. Tras el rescate, Orl permanece sentado contra un árbol; su perra, que cojea, se acobarda ante el gruñido de Svik. El collar acredita su condición de esclavo, no la de guerrero libre.",
        star: ""
    },
    {
        id: "vergelmir", label: "Vergelmir", group: "LUGAR", type: "Lugar — Cámara de Lik-Rifa en la creencia de Varg",
        desc: "LIBRO 1, CAPÍTULO 4: Lugar del más allá conocido como la cámara de Lik-Rifa.",
        star: ""
    },
    {
        id: "likrafa", label: "Lik-Rifa", group: "DIOS", type: "Entidad mítica — Mencionada por Varg",
        desc: "LIBRO 1, CAPÍTULO 4: Deidad asociada a la cámara de Vergelmir.",
        star: ""
    },

    {"id":"akall","label":"Akáll de Varg","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 2: Varg busca un Galdurman o una bruja Seiðr que realice una invocación. Todavía no revela su finalidad ni consigue que se practique el rito. LIBRO 1, CAPÍTULO 4: Varg revela que busca ayuda mágica para vengar a Frøya. Su incorporación a los Bloodsworn lo acerca a Vol, pero el akáll sigue pendiente.","star":"","status":"updated","previousState":"Se revela el propósito de venganza, pero la invocación continúa pendiente."},

// ── LIBRO 1, CAPÍTULO 5 — ELVAR ──
    {
        id: "cat-elvar", label: "ARCO ELVAR", group: "CAT", type: "Categoría",
        desc: "LIBRO 1, CAPÍTULO 5: Elvar y la compañía de los Battle-Grim, presentados en el capítulo 5.",
        star: ""
    },
    {
        id: "elvar", label: "Elvar", group: "ELVAR", type: "Personaje — Guerrera de los Battle-Grim",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrera rubia y la más joven de la compañía de Agnar. Rema hasta Iskalt y se equipa con brynja, espada, seax, hacha, casco, escudo y lanza. Su escudo rojo muestra espada, hacha y lanza cruzadas con nudos ornamentales. Ambiciona fama de batalla y desprecia el arco por matar a distancia. Se enorgullece de que Agnar la elija para acompañarlo y vigilar a los aldeanos. Advierte a una niña que abandona la multitud y, por orden de Agnar, la sigue. Derriba a un arquero con el escudo y hiere a una lancera; Grend mata a esta cuando intenta cortarle las piernas. Dirige la inspección de una cabaña y descubre el hueco por el que han escapado. Nota el interés de Biórr y aparta la mirada; también aparta la vista cuando un guardia patea a Kráka. Conserva la brynja enrollada en piel de oveja aceitada para evitar la oxidación; se la pone sobre la cabeza y ajusta el cinturón para descargar los hombros. Una punta de lanza raspa su malla y hace saltar una chispa.",
        star: "★ Su búsqueda de fama convive con su participación en la caza de Tainted y la violencia contra los habitantes de Iskalt."
    },
    {
        id: "grend", label: "Grend", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero corpulento, de cabello entrecano y expresión adusta. Rema delante de Elvar y la acompaña cuando Agnar la llama. Le enseñó desde su primer contacto con una espada a comprobar que la hoja no se atasque al desenvainar. Sigue a Elvar en la persecución de una niña y mata de un hachazo a la mujer que intenta herirle las piernas. Obedece su señal para rodear la cabaña, abre parte de la pared con el hacha y encuentra el rastro hacia el bosque. Viste una brynja o cota de malla.",
        star: ""
    },
    {
        id: "sighvat", label: "Sighvat", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero voluminoso que marca el ritmo de los cincuenta remos golpeando un barril con una cuerda anudada y transmite las órdenes de Agnar. Amarra el Wave-Jarl al muelle. Anuncia a los Battle-Grim como cazadores de Vaesen y Tainted y amenaza a los isleños con demostrar su fama. Lleva un saco y sujeta la cadena del esclavo Hundur, al que arrastra y obliga a rastrear. Sigue a Elvar y Grend hasta la cabaña y pregunta al esclavo si Berak estuvo allí; este lo confirma asintiendo. Grita «niðing» a los remeros del Wave-Jarl como insulto.",
        star: ""
    },
    {
        id: "agnar", label: "Agnar", group: "ELVAR", type: "Personaje — Jefe de los Battle-Grim",
        desc: "LIBRO 1, CAPÍTULO 5: Jefe rubio de los Battle-Grim, con trenza de guerrero y el resto de la cabeza rasurado. Lleva piel de oso negro, torques de plata y anillos en los brazos. Gobierna el timón del Wave-Jarl durante la aproximación a Iskalt, deja diez o doce guerreros custodiándolo y desembarca con los demás. Busca a Berak, un hombre grande con cicatrices en un lado de la cara, acompañado por una mujer y un niño. Ofrece dinero o muerte a los aldeanos. Afirma que Berak es Tainted, tocado por los dioses, y que traerá sangre y matanza. Usa un trapo ensangrentado para dar su olor al esclavo Hundur y pronuncia «Hlýða», haciendo palpitar vetas rojas en su collar. Al interponerse Hrut, le corta la lanza y le hiere barbilla y labio; avanza después con escudo y espada mientras estalla la lucha. Al descubrir que los perseguidos han escapado de la cabaña, ordena seguirlos al bosque.",
        star: "★ Su amenaza de prosperar o morir convierte la búsqueda de Berak en un ataque contra la aldea."
    },
    {
        id: "wave-jarl", label: "Wave-Jarl", group: "ELVAR", type: "Barco — Drakkar",
        desc: "LIBRO 1, CAPÍTULO 5: Drakkar de proa de dragón que transporta a los Battle-Grim a Iskalt. Cincuenta remos lo impulsan bajo el ritmo de Sighvat, mientras Agnar maneja el remo de gobierno. Al llegar a Iskalt se recogen los remos en sus soportes y se cierran los agujeros con tapones giratorios. Sus cofres de mar sirven de asiento y guardan el equipo. Kráka canta para mantener a serpientes y otros Vaesen marinos lejos del casco. Entra en un puerto natural y queda amarrado a un muelle; diez o doce guerreros permanecen como guardia.",
        star: ""
    },
    {
        id: "iskalt", label: "Isla de Iskalt", group: "LUGAR", type: "Lugar — Isla septentrional",
        desc: "LIBRO 1, CAPÍTULO 5: Isla muy al norte, donde la primavera llega tarde. Una montaña de fuego, con vetas rojas brillantes entre riscos de granito, permite reconocerla desde el mar. Dos promontorios resguardan un puerto natural con muelle y playa de guijarros. La aldea pesquera tiene ahumaderos, redes, cestas para cangrejos y unas docenas de edificios; más allá crecen álamos y abedules. Hrut se declara su jarl.",
        star: ""
    },
    {
        id: "kraka", label: "Kráka", group: "ELVAR", type: "Personaje — Esclava Tainted",
        desc: "LIBRO 1, CAPÍTULO 5: Esclava Tainted de los Battle-Grim. Canta magia durante la travesía para alejar del casco a las serpientes y otros Vaesen marinos. Tras la llegada a Iskalt queda desplomada en la proa, exhausta, con el pelo negro empapado. Lleva collar y cadena; un guardia la patea y ella se encoge levantando las manos. Elvar aparta la mirada.",
        star: "★ Su magia sirve de protección a quienes la mantienen esclavizada."
    },
    {
        id: "biorr", label: "Biórr", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero de los Battle-Grim que desembarca en Iskalt. Comenta el frío sonriendo a Elvar, quien percibe interés en sus ojos y mira hacia otro lado. Sigue a Elvar, Grend, Sighvat y el esclavo rastreador durante el combate y llega a la cabaña con el rostro encendido por la lucha y la carrera.",
        star: ""
    },
    {
        id: "battle-grim", label: "Terrores de la batalla (Battle-Grim)", group: "ELVAR", type: "Facción — Compañía guerrera",
        desc: "LIBRO 1, CAPÍTULO 5: Compañía de Agnar que viaja en el Wave-Jarl. Sighvat los proclama matadores de Vaesen, cazadores de Tainted y segadores de almas. Sus guerreros curtidos portan hierro y cotas de malla; Elvar es la más joven. Mantienen esclavizados a Kráka y a un rastreador Hundur. Desembarcan en Iskalt buscando a Berak; forman una línea de escudos ante los aldeanos y avanzan con gritos de guerra cuando Agnar ataca a Hrut. Continúan la persecución después de hallar vacía la cabaña.",
        star: ""
    },
    {
        id: "berak", label: "Berak", group: "ELVAR", type: "Personaje — Tainted perseguido",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre al que busca Agnar en Iskalt. Según este, es alto y ancho, tiene cicatrices en un lado de la cara y viaja con una mujer y un niño; calcula que llegó dos o tres días antes. Agnar lo identifica públicamente como Tainted y asegura que traerá sangre y matanza: esta última es la acusación del cazador. El esclavo Hundur confirma por el olor que Berak estuvo en la cabaña, pero el grupo ya ha escapado por un hueco en la pared trasera. No se muestra su captura ni se identifica expresamente al hombre que envía a la niña desde la multitud.",
        star: "★ La persecución continúa hacia el bosque de Iskalt; el grupo no ha sido capturado al terminar el capítulo."
    },
    {
        id: "jarl-hrut", label: "Jarl Hrut", group: "ELVAR", type: "Personaje — Jarl de Iskalt",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre alto con barba trenzada y anillos de hueso, vestido de pieles y armado con lanza y cuchillo de empuñadura de marfil de morsa. Se presenta como jarl de Iskalt y afirma no conocer a ningún Berak que viva en la isla. Se interpone cuando Agnar intenta avanzar. Agnar le corta el asta de la lanza y le abre barbilla y labio, arrancando dientes; luego avanza para atacarlo de nuevo. Los aldeanos acuden a defenderlo. El capítulo no confirma su muerte.",
        star: ""
    },
    {
        id: "hundur", label: "Hundur (Thrall)", group: "ELVAR", type: "Personaje — Esclavo rastreador",
        desc: "LIBRO 1, CAPÍTULO 5: Esclavo al que Agnar denomina su Hundur-thrall; el capítulo no revela su nombre personal. Lleva cabello largo, ojos hundidos y una capa de piel de foca maltrecha. Sighvat lo mantiene sujeto por una cadena al cuello. Agnar le entrega un trapo ensangrentado con el olor de Berak y pronuncia «Hlýða»; vetas rojas palpitan en el collar, el hombre gime y olfatea el paño. Rastrea a ras de suelo y confirma por el olor de la paja que Berak estuvo en la cabaña. No se explica aquí su linaje divino concreto.",
        star: ""
    },
    {
        id: "tainted", label: "Tainted", group: "MAGIA", type: "Concepto — Personas tocadas por los dioses",
        desc: "LIBRO 1, CAPÍTULO 5: Personas tocadas por los dioses, perseguidas y esclavizadas por sus capacidades.",
        star: ""
    },
    {
        id: "collares", label: "Collares de Hierro", group: "MAGIA", type: "Objeto — Collares de sometimiento",
        desc: "LIBRO 1, CAPÍTULO 5: Collares de hierro utilizados para someter esclavos mediante órdenes verbales. Su activación produce vetas rojas y puede causar dolor u obligar a obedecer; no se explica su fabricación. «Hlýða» es una de las órdenes observadas.",
        star: ""
    },
    {
        id: "drakkar", label: "Drakkar (Langskip)", group: "NORSE", type: "Cultura — Nave de guerra",
        desc: "LIBRO 1, CAPÍTULO 5: Nave larga de guerra propulsada a remo. El término designa un tipo de embarcación.",
        star: ""
    },
    {
        id: "brynja", label: "Brynja (Cota de Mallas)", group: "NORSE", type: "Equipo — Armadura",
        desc: "LIBRO 1, CAPÍTULO 5: Cota de malla remachada. Se usa como armadura y puede ajustarse con un cinturón para descargar el peso de los hombros.",
        star: ""
    },
    {
        id: "niding", label: "Níðing", group: "NORSE", type: "Cultura — Insulto",
        desc: "LIBRO 1, CAPÍTULO 5: Término empleado como insulto.",
        star: ""
    },
    {
        id: "asalto-iskalt", label: "Asalto y Persecución en Iskalt", group: "EVENTO", type: "Evento — Ataque a la aldea",
        desc: "LIBRO 1, CAPÍTULO 5: Los Battle-Grim desembarcan para capturar a Berak. Hrut niega conocerlo y Agnar ofrece dinero o muerte a la aldea. Elvar detecta que un hombre envía a una niña entre las chozas. Agnar ordena seguirla y ataca a Hrut cuando este le cierra el paso; los aldeanos responden con lanzas y flechas y la compañía avanza. Elvar derriba a un arquero y hiere a una lancera, a quien Grend mata al defenderla. La niña conduce a los perseguidores hacia una cabaña, pero al entrar Elvar la encuentra vacía. El Hundur confirma el olor de Berak; un hueco en la pared y las huellas que descubre Grend muestran la fuga hacia el bosque. Agnar ordena continuar. El hombre que envió a la niña, la niña y las víctimas anónimas no reciben nombres ni identidades confirmadas.",
        star: "★ La escena termina con la persecución abierta, sin captura de Berak ni confirmación de la muerte de Hrut."
    },
    {
        id: "vaesen-gen", label: "Vaesen", group: "VAESEN", type: "Criaturas — Categoría",
        status: "updated",
        previousState: "Añade los peligros marinos, el canto protector de Kráka y la actividad de los Battle-Grim.",
        desc: "LIBRO 1, CAPÍTULO 1: Criaturas que, según Orka, escaparon del mundo inferior durante la caída de Snaka. Las runas protectoras detienen a todos salvo los más poderosos. Rara vez utilizan armas, pues cuentan con medios naturales para matar. LIBRO 1, CAPÍTULO 2: Sus partes y restos tienen valor comercial. LIBRO 1, CAPÍTULO 3: Según Orka, prefieren lugares oscuros y tranquilos donde ocultarse. Los huesos de dioses conservan poder protector contra ellos. LIBRO 1, CAPÍTULO 5: También hay vaesen marinos, y ciertos cantos mágicos pueden mantenerlos alejados. Elvar considera que son más osados en el extremo norte.",
        star: ""
    },

// ── LIBRO 1, CAPÍTULO 6 — ORKA ──
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        status: "updated",
        previousState: "Despertar con recuerdos de batalla, búsqueda de Breca y reacción violenta al encontrarlo con Vesli.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza. LIBRO 1, CAPÍTULO 3: Lleva con Breca los cuerpos de Asgrim e Idrun a Fellur mientras Thorkel rastrea a los asesinos. Prefería seguirlos ella, pero reconoce que su esposo es mejor rastreador. Siente presión en la cabeza y el pecho bajo el nudillo de dios de la puerta; disminuye al alejarse. Desmiente a Guðvarr: la estocada de espada no corresponde a dientes ni garras de vaesen. Al recibir sus amenazas revive imágenes de violencia, tiembla y lucha por contenerse ante Breca. La llegada de Thorkel permite cortar la confrontación. Quiere entregar los muertos a sus parientes para que reciban un túmulo, pero termina marchándose con su familia: considera que esta lucha no les corresponde. Guðvarr se burla preguntándole si es una bruja Seiðr capaz de ver el pasado; ella responde que basta reconocer una herida de espada. No demuestra magia ni confirma esa identidad. LIBRO 1, CAPÍTULO 6: Despierta empapada en sudor tras revivir una batalla, con el mar, cuerpos y gritos. Oculta su angustia a Thorkel; desea alcohol para amortiguar los recuerdos y resiente que él le haya pedido beber menos. Al descubrir vacía la cama de Breca lo busca con su lanza, interroga a Spert y teme otro rapto al recordar las palabras de Virk y la desaparición de Harek. Sigue a Thorkel hacia el nordeste, remontando el arroyo, y contiene con esfuerzo imágenes violentas y una ira que sabe inútil para encontrar al niño. Abraza y besa a Breca al hallarlo junto a una poza. Le sorprende la posible presencia de un Näcken tan lejos de su río de montaña, pero la preocupación por su hijo desplaza esa observación. Al ver al tennur herido que sostiene, golpea a Breca en la mejilla y le deja una hinchazón amoratada; lo reprende por abandonar la seguridad de la granja y levanta la mano de nuevo. Thorkel la detiene. Orka piensa que podría vencer su resistencia, pero acepta el juicio de su esposo, en quien ha aprendido a confiar especialmente cuando la domina la ira. Descubre que el niño ha dado un diente a la criatura y que esta se llama Vesli.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos. CAPÍTULO 6: Los recuerdos de batalla y la necesidad de alcohol agravan su angustia; el miedo por Breca desemboca en violencia contra él."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        status: "updated",
        previousState: "Rastrea a Breca, sospecha un Näcken y detiene el segundo golpe de Orka.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres. LIBRO 1, CAPÍTULO 3: No encuentra a Harek en la granja. Sigue el rastro de los asesinos por el bosque tras prometer que regresará sin enfrentarse solo a ellos si los descubre; Orka teme que no cumpla esa promesa por salvar al niño. El rastro acaba en un afluente del Skarpain, con señales de tres barcas en la orilla. No encuentra a los fugitivos. Regresa a Fellur durante el enfrentamiento de Orka con Guðvarr; su propia ira se suaviza cuando ella le habla de enterrar a los muertos. LIBRO 1, CAPÍTULO 6: Encuentra la huella de Breca junto al portillo de la granja y el cerrojo abierto, sin señales de otra persona. Con seax y hacha de mano, sigue el rastro hacia el nordeste y remonta el arroyo hasta una poza de la que nace. Al hallar al niño pide que se aparte del agua: dice que huele a Näcken y clava su seax en la tierra blanda; no se muestra ninguna criatura acuática ni el efecto de este gesto. Identifica como tennur a la criatura herida. Sujeta la muñeca de Orka para impedir que vuelva a pegar a Breca y le dice que ya ha dejado claro su reproche. También reprende al niño por el peligro y le pregunta cómo encontró a la criatura. Silba al oír que se llama Vesli y se ríe cuando Breca pide quedarse con ella; todavía no responde a la petición.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        status: "updated",
        previousState: "Sale solo para socorrer a Vesli, le da un diente y pide quedarse con ella.",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek. LIBRO 1, CAPÍTULO 3: Conduce el poni que arrastra el carro con los cuerpos hasta Fellur; Orka le encarga la tarea para darle algo en que concentrarse. Pregunta si su padre encontrará a Harek y anuncia su desaparición ante Virk y Guðvarr. La espada de Guðvarr lo impresiona. Observa preocupado la confrontación de su madre y le tira de la manga para avisar de la llegada de Thorkel. LIBRO 1, CAPÍTULO 6: Sale solo de la granja al oír los gritos de una criatura herida. Sus padres lo encuentran junto a una poza, con un tennur envuelto en su capa sobre el regazo. Orka primero lo abraza y luego, al ver la criatura, le da un golpe que le hincha y amorata la mejilla. El tennur lo protege extendiendo las alas y siseando; Thorkel impide otro golpe. Breca explica que arrancó uno de sus dientes de leche, ya flojo, y se lo dio porque sus padres le habían contado que a los tennur les gustan los dientes; otro diente está saliendo. Dice que la criatura es hembra y que ella le ha dicho su nombre, Vesli. Pregunta si pueden quedársela, sin obtener aún una respuesta explícita.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata. CAPÍTULO 6: Su compasión por Vesli recibe una respuesta protectora; el vínculo no explica todavía ninguna capacidad especial."
    },
    {
        id: "tennur", label: "Tennur", group: "VAESEN", type: "Vaesen — Enjambre",
        status: "updated",
        previousState: "Primera aparición en escena mediante Vesli; aspecto, gusto por los dientes y defensa del niño.",
        desc: "LIBRO 1, CAPÍTULO 1: Pequeños vaesen bípedos que codician los dientes humanos, con dedos de hueso afilado y dientes cortantes. Según Orka, solos son una molestia, pero en grupo pueden resultar mortales.",
        star: ""
    },
    {
        id: "steading", label: "Steading (Granja)", group: "NORSE", type: "Vida Diaria — Vivienda",
        status: "updated",
        previousState: "Añade la vivienda y dependencias de la granja de Orka y Thorkel, distintas de la de Asgrim.",
        desc: "LIBRO 1, CAPÍTULO 1: Granja o conjunto de vivienda y dependencias de una explotación rural.",
        star: ""
    },
    {
        id: "spert", label: "Spert", group: "ORKA", type: "Vaesen — Guardián doméstico",
        desc: "LIBRO 1, CAPÍTULO 6: Spertus que vive bajo una roca cubierta de musgo en el arroyo de la granja de Orka y Thorkel. Orka lo despierta con el extremo de su lanza para preguntarle por Breca. Se queja de hambre: el niño suele traerle cada mañana gachas mezcladas con sangre y saliva. Ante la amenaza de Orka de matarlo, protesta que trabaja protegiéndolos de los Vaesen, pero admite que necesita dormir y no puede vigilar siempre a todos. No sabe dónde está Breca y vuelve a sumergirse. Su cuerpo quitinoso y segmentado mide aproximadamente lo que el brazo de Orka y tiene el grosor de una pierna de Thorkel. Posee muchas patas y un aguijón curvo como una aguja sobre la espalda. Su rostro parece humano, con ojos saltones, piel gris colgante y numerosos dientes puntiagudos; habla con voz áspera.",
        star: ""
    },
    {
        id: "spertus", label: "Spertus", group: "VAESEN", type: "Vaesen — Criatura de arroyo",
        desc: "LIBRO 1, CAPÍTULO 6: Tipo de vaesen asociado a los arroyos.",
        star: ""
    },
    {
        id: "nacken", label: "Näcken", group: "VAESEN", type: "Vaesen — Presencia sospechada",
        desc: "LIBRO 1, CAPÍTULO 6: Vaesen acuático asociado a ríos de montaña. Se considera peligroso; su presencia puede ser sospechada por el olor, sin que eso equivalga a un avistamiento confirmado.",
        star: ""
    },
    {
        id: "vesli", label: "Vesli", group: "ORKA", type: "Vaesen — Tennur herida",
        desc: "LIBRO 1, CAPÍTULO 6: Breca encuentra a esta tennur tras oírla gritar de dolor fuera de la granja. Está herida bajo un ala y en el labio, y descansa envuelta en su capa sobre su regazo junto a una poza. Tiene alas finas, garras, grandes ojos negros, piel rosada sin pelo y dos hileras de dientes. Breca cuenta que se calmó al recibir uno de sus dientes de leche y que ella le dijo su nombre y que es hembra; no se reproduce ese diálogo. Después del golpe de Orka al niño, despliega las alas, muestra los dientes y sisea para protegerlo, aunque parece demasiado débil para mantenerse en pie. Breca pide quedarse con ella y Thorkel se ríe; no se muestra aún una decisión. Sus alas son finas como pergamino; tiene nariz y barbilla agudas, venas oscuras visibles bajo la piel rosada y dos hileras de dientes, la exterior afilada y la interior plana.",
        star: "★ Su defensa de Breca responde a la ayuda que él le ha prestado."
    },

    {"id":"granja-orka","label":"Granja de Orka y Thorkel","group":"LUGAR","type":"Lugar — Granja","desc":"LIBRO 1, CAPÍTULO 6: La granja de Orka y Thorkel tiene una cabaña con dormitorio separado para los padres y una sala donde Breca duerme junto al hogar. El recinto incluye cobertizo de leña, fragua, horno de carbón, huerto de verduras y hierbas, colmena y establo con un poni. Un arroyo lo atraviesa; Spert vive bajo una roca y recibe alimento a cambio de protección. Las puertas marcadas con runas tienen un portillo con cerrojo de hierro para el paso habitual; las hojas grandes se abren para salir con poni y carro a comerciar en Fellur. Remontando el arroyo hacia el nordeste se llega, tras una subida y una cresta, a una poza en el bosque donde encuentran a Breca.","star":""},

// ── LIBRO 1, CAPÍTULO 7 — ELVAR ──
    {
        id: "elvar", label: "Elvar", group: "ELVAR", type: "Personaje — Guerrera de los Battle-Grim",
        status: "updated",
        previousState: "Explora, mata al trol y presencia la coacción contra Berak.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrera rubia y la más joven de la compañía de Agnar. Rema hasta Iskalt y se equipa con brynja, espada, seax, hacha, casco, escudo y lanza. Su escudo rojo muestra espada, hacha y lanza cruzadas con nudos ornamentales. Ambiciona fama de batalla y desprecia el arco por matar a distancia. Se enorgullece de que Agnar la elija para acompañarlo y vigilar a los aldeanos. Advierte a una niña que abandona la multitud y, por orden de Agnar, la sigue. Derriba a un arquero con el escudo y hiere a una lancera; Grend mata a esta cuando intenta cortarle las piernas. Dirige la inspección de una cabaña y descubre el hueco por el que han escapado. Nota el interés de Biórr y aparta la mirada; también aparta la vista cuando un guardia patea a Kráka. Conserva la brynja enrollada en piel de oveja aceitada para evitar la oxidación; se la pone sobre la cabeza y ajusta el cinturón para descargar los hombros. Una punta de lanza raspa su malla y hace saltar una chispa. LIBRO 1, CAPÍTULO 7: Acepta el honor de explorar en vanguardia con Grend y Biórr. Advierte telarañas de arañas del hielo y recuerda su veneno. Tras fallar con la lanza contra el trol, combate con Grend y le abre una arteria del muslo, causando la hemorragia que lo mata. Grend la ayuda a levantarse ilesa. Sonríe a Biórr cuando la sostiene tras un resbalón, pero se libera de su mano; piensa expresamente que Grend no es su padre. Duda de que el cautivo sea Berserkir hasta ver su transformación. Aparta la mirada cuando Agnar amenaza al niño: matar niños no es su forma de ganar fama. Agnar le exige mirar al prisionero y ella presencia su sometimiento. En las ramas de Iskalt reconoce telas con hilos del grosor de un dedo y restos de ratas, un cuervo y una marta; avisa a Grend y Biórr.",
        star: "★ Su búsqueda de fama convive con su participación en la caza de Tainted y la violencia contra los habitantes de Iskalt."
    },
    {
        id: "agnar", label: "Agnar", group: "ELVAR", type: "Personaje — Jefe de los Battle-Grim",
        status: "updated",
        previousState: "Confirma la muerte de Hrut y captura a Berak mediante amenazas al niño.",
        desc: "LIBRO 1, CAPÍTULO 5: Jefe rubio de los Battle-Grim, con trenza de guerrero y el resto de la cabeza rasurado. Lleva piel de oso negro, torques de plata y anillos en los brazos. Gobierna el timón del Wave-Jarl durante la aproximación a Iskalt, deja diez o doce guerreros custodiándolo y desembarca con los demás. Busca a Berak, un hombre grande con cicatrices en un lado de la cara, acompañado por una mujer y un niño. Ofrece dinero o muerte a los aldeanos. Afirma que Berak es Tainted, tocado por los dioses, y que traerá sangre y matanza. Usa un trapo ensangrentado para dar su olor al esclavo Hundur y pronuncia «Hlýða», haciendo palpitar vetas rojas en su collar. Al interponerse Hrut, le corta la lanza y le hiere barbilla y labio; avanza después con escudo y espada mientras estalla la lucha. Al descubrir que los perseguidos han escapado de la cabaña, ordena seguirlos al bosque. LIBRO 1, CAPÍTULO 7: Se confirma que mató a Hrut en la aldea. Deja una docena de guerreros con Thrud y continúa con veintiséis. Envía a Elvar, Grend y Biórr a explorar, y ordena combatir al trol por parejas en vez de formar muro de escudos. Le clava la espada en la espalda. Ordena capturar a la mujer y al niño y reconoce al hombre como Berak Bjornasson, pese a sus negativas. Para probar su condición, amenaza con degollar al niño y le corta levemente el cuello; la transformación de Berak convence a Elvar. Activa el collar con «HALDA» y lo obliga a arrodillarse con «Á HNÉN». Afirma que la sangre del dios muerto Berser corre por Berak y que tres jarls lo buscan por asesinato, deuda de sangre y weregild. Pretende venderlo por un buen precio. Ordena recoger a sus muertos y descuartizar al trol para aprovechar todo lo valioso.",
        star: "★ Su amenaza de prosperar o morir convierte la búsqueda de Berak en un ataque contra la aldea."
    },
    {
        id: "grend", label: "Grend", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Protege a Elvar durante la exploración y el combate; no es su padre.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero corpulento, de cabello entrecano y expresión adusta. Rema delante de Elvar y la acompaña cuando Agnar la llama. Le enseñó desde su primer contacto con una espada a comprobar que la hoja no se atasque al desenvainar. Sigue a Elvar en la persecución de una niña y mata de un hachazo a la mujer que intenta herirle las piernas. Obedece su señal para rodear la cabaña, abre parte de la pared con el hacha y encuentra el rastro hacia el bosque. Viste una brynja o cota de malla. LIBRO 1, CAPÍTULO 7: Vigila el bosque y se interpone, ceñudo, entre Elvar y Biórr cuando este la ayuda. Biórr lo toma por su padre; Elvar piensa que no lo es. Explora junto a ambos por orden de Agnar. Combate por parejas con Elvar contra el trol, la recoge cuando cae y lanza un hachazo a los testículos de la criatura antes de caer ambos. Después la ayuda a levantarse; ella no está herida.",
        star: ""
    },
    {
        id: "biorr", label: "Biórr", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Acerca sus atenciones a Elvar y explora con ella y Grend.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero de los Battle-Grim que desembarca en Iskalt. Comenta el frío sonriendo a Elvar, quien percibe interés en sus ojos y mira hacia otro lado. Sigue a Elvar, Grend, Sighvat y el esclavo rastreador durante el combate y llega a la cabaña con el rostro encendido por la lucha y la carrera. LIBRO 1, CAPÍTULO 7: Sostiene a Elvar cuando resbala; ambos sonríen, pero ella aparta el brazo. Ante la hostilidad de Grend, bromea con que su padre no lo aprecia, sin que Elvar le explique el error. Sigue a ambos fuera del sendero y Agnar lo elige con ellos como explorador. Avanza junto al arroyo y presencia al hombre combatiendo al trol.",
        star: ""
    },
    {
        id: "jarl-hrut", label: "Jarl Hrut (†)", group: "ELVAR", type: "Personaje — Jarl de Iskalt fallecido",
        status: "updated",
        previousState: "Se confirma su muerte a manos de Agnar.",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre alto con barba trenzada y anillos de hueso, vestido de pieles y armado con lanza y cuchillo de empuñadura de marfil de morsa. Se presenta como jarl de Iskalt y afirma no conocer a ningún Berak que viva en la isla. Se interpone cuando Agnar intenta avanzar. Agnar le corta el asta de la lanza y le abre barbilla y labio, arrancando dientes; luego avanza para atacarlo de nuevo. Los aldeanos acuden a defenderlo. El capítulo no confirma su muerte. LIBRO 1, CAPÍTULO 7: El relato de Elvar confirma que Agnar lo mató en el combate de la aldea. Una docena de aldeanos más cayó ante el muro de escudos, tras lo cual los demás se rindieron.",
        star: ""
    },
    {
        id: "sighvat", label: "Sighvat", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Encadena a Berak y participa en la coacción contra sus acompañantes.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero voluminoso que marca el ritmo de los cincuenta remos golpeando un barril con una cuerda anudada y transmite las órdenes de Agnar. Amarra el Wave-Jarl al muelle. Anuncia a los Battle-Grim como cazadores de Vaesen y Tainted y amenaza a los isleños con demostrar su fama. Lleva un saco y sujeta la cadena del esclavo Hundur, al que arrastra y obliga a rastrear. Sigue a Elvar y Grend hasta la cabaña y pregunta al esclavo si Berak estuvo allí; este lo confirma asintiendo. Grita «niðing» a los remeros del Wave-Jarl como insulto. LIBRO 1, CAPÍTULO 7: Lleva encadenado al Hundur durante el ascenso y lo fija a un árbol con un pasador de hierro antes del combate. Golpea con una cadena la cabeza del hombre perseguido, lo derriba de un puñetazo y organiza su inmovilización. Le coloca el collar y remacha el pasador con el pomo de su seax. Golpea a la mujer cuando protesta por la amenaza al niño. La fuerza transformada de Berak lo arrastra junto con seis hombres hasta que Agnar activa el collar. Elvar conoce la contundencia de sus golpes en el pugil-ring.",
        star: ""
    },
    {
        id: "hundur", label: "Hundur (Thrall)", group: "ELVAR", type: "Personaje — Esclavo rastreador",
        status: "updated",
        previousState: "Lleva el rastro hasta el encuentro con el trol y el fugitivo.",
        desc: "LIBRO 1, CAPÍTULO 5: Esclavo al que Agnar denomina su Hundur-thrall; el capítulo no revela su nombre personal. Lleva cabello largo, ojos hundidos y una capa de piel de foca maltrecha. Sighvat lo mantiene sujeto por una cadena al cuello. Agnar le entrega un trapo ensangrentado con el olor de Berak y pronuncia «Hlýða»; vetas rojas palpitan en el collar, el hombre gime y olfatea el paño. Rastrea a ras de suelo y confirma por el olor de la paja que Berak estuvo en la cabaña. No se explica aquí su linaje divino concreto. LIBRO 1, CAPÍTULO 7: Guía a los cazadores por las colinas nevadas; identifica estiércol de trol y extrae un hueso de él. Sighvat fija su cadena a un árbol. Agnar fundamenta en su rastreo la identificación del cautivo como Berak; el esclavo observa con expresión desdichada.",
        star: ""
    },
    {
        id: "berak", label: "Berak Bjornasson", group: "ELVAR", type: "Personaje — Berserkir cautivo",
        status: "updated",
        previousState: "Captura y transformación de Berak; acusaciones atribuidas a Agnar.",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre al que busca Agnar en Iskalt. Según este, es alto y ancho, tiene cicatrices en un lado de la cara y viaja con una mujer y un niño; calcula que llegó dos o tres días antes. Agnar lo identifica públicamente como Tainted y asegura que traerá sangre y matanza: esta última es la acusación del cazador. El esclavo Hundur confirma por el olor que Berak estuvo en la cabaña, pero el grupo ya ha escapado por un hueco en la pared trasera. No se muestra su captura ni se identifica expresamente al hombre que envía a la niña desde la multitud. LIBRO 1, CAPÍTULO 7: Agnar lo identifica como Berak Bjornasson. Combate con lanza a un trol junto a una cascada de lava mientras una mujer y un niño esperan cerca. Después de morir el trol, mata a un guerrero de la compañía con una estocada en la garganta. Acorralado contra la lava, resiste los golpes de Sighvat, pero lo encadenan y le ponen un collar. Niega ser el hombre buscado. Cuando Agnar amenaza al niño, sus ojos se tornan ambarinos, aumenta su volumen, se afilan sus dientes y le crecen uñas como garras; arrastra a seis hombres y a Sighvat. El collar lo detiene al grito de «HALDA» y «Á HNÉN» lo obliga a arrodillarse. Agnar lo declara Berserkir, descendiente de Berser, y afirma que tres jarls lo reclaman por asesinato, deuda de sangre y weregild: las acusaciones proceden de Agnar. Elvar queda convencida de su condición. La mujer y el niño también son capturados; aquí no se revelan sus nombres ni su parentesco explícito con él.",
        star: "★ La persecución continúa hacia el bosque de Iskalt; el grupo no ha sido capturado al terminar el capítulo. CAPÍTULO 7: La captura confirma su poder, que Agnar doblega amenazando al niño y activando el collar."
    },
    {
        id: "battle-grim", label: "Terrores de la batalla (Battle-Grim)", group: "ELVAR", type: "Facción — Compañía guerrera",
        status: "updated",
        previousState: "Resultado del asalto y nuevas muertes durante la captura.",
        desc: "LIBRO 1, CAPÍTULO 5: Compañía de Agnar que viaja en el Wave-Jarl. Sighvat los proclama matadores de Vaesen, cazadores de Tainted y segadores de almas. Sus guerreros curtidos portan hierro y cotas de malla; Elvar es la más joven. Mantienen esclavizados a Kráka y a un rastreador Hundur. Desembarcan en Iskalt buscando a Berak; forman una línea de escudos ante los aldeanos y avanzan con gritos de guerra cuando Agnar ataca a Hrut. Continúan la persecución después de hallar vacía la cabaña. LIBRO 1, CAPÍTULO 7: El ataque a la aldea termina con Hrut muerto, otra docena de aldeanos caídos y los demás rendidos. Su única baja allí es la herida de flecha de Thrud en la pantorrilla; una docena queda con él custodiando prisioneros y veintiséis siguen a Agnar. En las colinas luchan por parejas contra un trol: uno muere ensartado, una mujer arde en la lava y otra es aplastada. Elvar mata al trol; el hombre perseguido mata a otro guerrero antes de ser capturado como Berak. Capturan también a la mujer y al niño y Agnar ordena recoger los muertos y aprovechar el cadáver del trol.",
        star: ""
    },
    {
        id: "tainted", label: "Tainted", group: "MAGIA", type: "Concepto — Personas tocadas por los dioses",
        status: "updated",
        previousState: "Berak manifiesta poderes y Agnar atribuye su linaje a Berser.",
        desc: "LIBRO 1, CAPÍTULO 5: Personas tocadas por los dioses, perseguidas y esclavizadas por sus capacidades. LIBRO 1, CAPÍTULO 7: Los Berserkir constituyen un linaje asociado a Berser.",
        star: ""
    },
    {
        id: "collares", label: "Collares de Hierro", group: "MAGIA", type: "Objeto — Collares de sometimiento",
        status: "updated",
        previousState: "Dos órdenes someten a Berak durante su transformación.",
        desc: "LIBRO 1, CAPÍTULO 5: Collares de hierro utilizados para someter esclavos mediante órdenes verbales. Su activación produce vetas rojas y puede causar dolor u obligar a obedecer; no se explica su fabricación. «Hlýða» es una de las órdenes observadas. LIBRO 1, CAPÍTULO 7: «HALDA» inmoviliza y «Á HNÉN» obliga a arrodillarse. El sometimiento puede vencer la resistencia de un Berserkir transformado.",
        star: ""
    },
    {
        id: "trol", label: "Trol", group: "VAESEN", type: "Vaesen — Trol territorial",
        status: "updated",
        previousState: "Primera aparición de un trol vivo; combate y comportamiento territorial.",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen cuyos dientes tienen valor comercial. LIBRO 1, CAPÍTULO 7: Vaesen territorial. Según el conocimiento de Elvar, los machos suelen ser solitarios salvo durante el apareamiento y parte de la crianza. Las crías nacen grandes, ágiles, fuertes y voraces, y tienen afición por la carne humana.",
        star: ""
    },
    {
        id: "iskalt", label: "Isla de Iskalt", group: "LUGAR", type: "Lugar — Isla septentrional",
        status: "updated",
        previousState: "Geografía de la persecución y protección rúnica de la aldea.",
        desc: "LIBRO 1, CAPÍTULO 5: Isla muy al norte, donde la primavera llega tarde. Una montaña de fuego, con vetas rojas brillantes entre riscos de granito, permite reconocerla desde el mar. Dos promontorios resguardan un puerto natural con muelle y playa de guijarros. La aldea pesquera tiene ahumaderos, redes, cestas para cangrejos y unas docenas de edificios; más allá crecen álamos y abedules. Hrut se declara su jarl. LIBRO 1, CAPÍTULO 7: Una empalizada semicircular de estacas marcadas con runas protege la aldea contra vaesen. En las colinas nevadas, un sendero sigue un arroyo hasta una meseta donde una cascada de roca fundida cae desde un risco de granito en una poza de lava.",
        star: ""
    },
    {
        id: "asalto-iskalt", label: "Asalto y Persecución en Iskalt", group: "EVENTO", type: "Evento — Ataque a la aldea",
        status: "updated",
        previousState: "La persecución concluye con Berak y sus acompañantes capturados.",
        desc: "LIBRO 1, CAPÍTULO 5: Los Battle-Grim desembarcan para capturar a Berak. Hrut niega conocerlo y Agnar ofrece dinero o muerte a la aldea. Elvar detecta que un hombre envía a una niña entre las chozas. Agnar ordena seguirla y ataca a Hrut cuando este le cierra el paso; los aldeanos responden con lanzas y flechas y la compañía avanza. Elvar derriba a un arquero y hiere a una lancera, a quien Grend mata al defenderla. La niña conduce a los perseguidores hacia una cabaña, pero al entrar Elvar la encuentra vacía. El Hundur confirma el olor de Berak; un hueco en la pared y las huellas que descubre Grend muestran la fuga hacia el bosque. Agnar ordena continuar. El hombre que envió a la niña, la niña y las víctimas anónimas no reciben nombres ni identidades confirmadas. LIBRO 1, CAPÍTULO 7: Se confirma la muerte de Hrut y la rendición de los aldeanos. Thrud queda herido en la aldea con una docena de guardias y veintiséis guerreros continúan la persecución. Encuentran al fugitivo luchando contra un trol junto a una poza de lava; la mujer que lo acompaña arroja al fuego un objeto semejante a una tablilla de cera o un libro de pergamino, que se consume, y huye con el niño. Agnar envía cuatro guerreros a capturarlos. Tres miembros de la compañía mueren a manos del trol, al que Elvar mata cortando una arteria. El fugitivo mata a otro guerrero antes de que Sighvat lo someta y le coloque un collar. Agnar lo identifica como Berak y amenaza al niño para provocar su transformación; el collar lo detiene y lo fuerza a arrodillarse. La captura queda consumada y Agnar ordena recoger los muertos y descuartizar al trol. No se identifica el objeto quemado ni se dan nombres a la mujer y al niño. El trol es un macho joven de piel escamosa con musgo y líquenes, colmillos y astas cortas. Reclama el territorio gritando «MINE» y combate con una maza claveteada. Las lanzas apenas penetran su piel; Agnar lo hiere en la espalda antes del golpe mortal de Elvar.",
        star: "★ La escena termina con la persecución abierta, sin captura de Berak ni confirmación de la muerte de Hrut. CAPÍTULO 7: La persecución termina en captura y esclavización, con nuevas bajas de la compañía."
    },
    {
        id: "thrud", label: "Thrud", group: "ELVAR", type: "Personaje — Guerrero herido",
        desc: "LIBRO 1, CAPÍTULO 7: Una flecha le atraviesa la pantorrilla en el combate de la aldea. Es la única baja de la compañía en aquel enfrentamiento. Agnar lo deja atrás, furioso por no seguir, con una docena de guerreros que custodian a los prisioneros.",
        star: ""
    },
    {
        id: "berser", label: "Berser (Dios-Oso)", group: "DIOS", type: "Dios muerto — Linaje atribuido de los Berserkir",
        desc: "LIBRO 1, CAPÍTULO 7: Dios oso muerto, al que Agnar atribuye el origen del linaje de los Berserkir.",
        star: ""
    },
    {
        id: "berserkir", label: "Berserkir (Guerrero-Oso)", group: "MAGIA", type: "Linaje — Tainted de Berser",
        desc: "LIBRO 1, CAPÍTULO 7: Nombre dado a los Tainted cuyo linaje se vincula con Berser, el dios oso.",
        star: ""
    },
    {
        id: "araña-hielo", label: "Arañas del Hielo (Frost-Spiders)", group: "VAESEN", type: "Vaesen — Arañas venenosas",
        desc: "LIBRO 1, CAPÍTULO 7: Vaesen arácnidos que tejen hilos muy gruesos. Según la experiencia de Elvar, su veneno congela la sangre en las venas y detiene el corazón.",
        star: ""
    },

    {"id":"objeto-quemado-iskalt","label":"Misterio del Objeto Quemado","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 7: La mujer que acompaña a Berak arroja a la lava un objeto semejante a una tablilla de cera o un libro de pergamino. No se confirma qué era ni por qué lo destruyó.","star":""},

// ── LIBRO 1, CAPÍTULO 8 — ORKA ──
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        status: "updated",
        previousState: "Contrasta su miedo y sus recuerdos con la elección diaria de Thorkel; acepta acudir al Althing.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza. LIBRO 1, CAPÍTULO 3: Lleva con Breca los cuerpos de Asgrim e Idrun a Fellur mientras Thorkel rastrea a los asesinos. Prefería seguirlos ella, pero reconoce que su esposo es mejor rastreador. Siente presión en la cabeza y el pecho bajo el nudillo de dios de la puerta; disminuye al alejarse. Desmiente a Guðvarr: la estocada de espada no corresponde a dientes ni garras de vaesen. Al recibir sus amenazas revive imágenes de violencia, tiembla y lucha por contenerse ante Breca. La llegada de Thorkel permite cortar la confrontación. Quiere entregar los muertos a sus parientes para que reciban un túmulo, pero termina marchándose con su familia: considera que esta lucha no les corresponde. Guðvarr se burla preguntándole si es una bruja Seiðr capaz de ver el pasado; ella responde que basta reconocer una herida de espada. No demuestra magia ni confirma esa identidad. LIBRO 1, CAPÍTULO 6: Despierta empapada en sudor tras revivir una batalla, con el mar, cuerpos y gritos. Oculta su angustia a Thorkel; desea alcohol para amortiguar los recuerdos y resiente que él le haya pedido beber menos. Al descubrir vacía la cama de Breca lo busca con su lanza, interroga a Spert y teme otro rapto al recordar las palabras de Virk y la desaparición de Harek. Sigue a Thorkel hacia el nordeste, remontando el arroyo, y contiene con esfuerzo imágenes violentas y una ira que sabe inútil para encontrar al niño. Abraza y besa a Breca al hallarlo junto a una poza. Le sorprende la posible presencia de un Näcken tan lejos de su río de montaña, pero la preocupación por su hijo desplaza esa observación. Al ver al tennur herido que sostiene, golpea a Breca en la mejilla y le deja una hinchazón amoratada; lo reprende por abandonar la seguridad de la granja y levanta la mano de nuevo. Thorkel la detiene. Orka piensa que podría vencer su resistencia, pero acepta el juicio de su esposo, en quien ha aprendido a confiar especialmente cuando la domina la ira. Descubre que el niño ha dado un diente a la criatura y que esta se llama Vesli. LIBRO 1, CAPÍTULO 8: Afila su seax mientras vigila a Breca y a Vesli, ahora acogida en la granja. Defiende educar al niño para sobrevivir sin sus padres, pero admite compartir el deseo de protegerlo del sufrimiento. Reconoce que ella y Thorkel han combatido juntos y cometido actos terribles; no logra desprenderse del pasado y envidia la fortaleza emocional de él. Lo llama Thorkel Ulfsson. Se confirma que fue ella quien capturó y vinculó a Spert años atrás: las gachas que le da Breca contienen sangre y saliva de Orka. La posibilidad de tener otro hijo da paso a la alarma por unos jinetes. Toma su lanza y, al ver el hacha larga de Thorkel, revive gritos y la imagen de un guerrero entre llamas, sin identificarlo. Reconoce a los visitantes y juzga que no serían capaces de matar a Asgrim e Idrun. Rechaza involucrarse en disputas de jarls y reinas, pero acepta ir al Althing de Sigrún para no llamar la atención; el presentimiento de Thorkel la deja asustada.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos. CAPÍTULO 6: Los recuerdos de batalla y la necesidad de alcohol agravan su angustia; el miedo por Breca desemboca en violencia contra él. CAPÍTULO 8: La paz familiar convive con recuerdos intrusivos de violencia y el miedo al futuro político."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        status: "updated",
        previousState: "Revela su infancia esclavizada, explica cómo vive con el pasado y propone asistir discretamente a la asamblea.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres. LIBRO 1, CAPÍTULO 3: No encuentra a Harek en la granja. Sigue el rastro de los asesinos por el bosque tras prometer que regresará sin enfrentarse solo a ellos si los descubre; Orka teme que no cumpla esa promesa por salvar al niño. El rastro acaba en un afluente del Skarpain, con señales de tres barcas en la orilla. No encuentra a los fugitivos. Regresa a Fellur durante el enfrentamiento de Orka con Guðvarr; su propia ira se suaviza cuando ella le habla de enterrar a los muertos. LIBRO 1, CAPÍTULO 6: Encuentra la huella de Breca junto al portillo de la granja y el cerrojo abierto, sin señales de otra persona. Con seax y hacha de mano, sigue el rastro hacia el nordeste y remonta el arroyo hasta una poza de la que nace. Al hallar al niño pide que se aparte del agua: dice que huele a Näcken y clava su seax en la tierra blanda; no se muestra ninguna criatura acuática ni el efecto de este gesto. Identifica como tennur a la criatura herida. Sujeta la muñeca de Orka para impedir que vuelva a pegar a Breca y le dice que ya ha dejado claro su reproche. También reprende al niño por el peligro y le pregunta cómo encontró a la criatura. Silba al oír que se llama Vesli y se ríe cuando Breca pide quedarse con ella; todavía no responde a la petición. LIBRO 1, CAPÍTULO 8: Ha permitido que Breca se quede con Vesli. Recuerda que, a la edad de su hijo —diez inviernos—, llevaba collar de esclavo y había sido azotado. Quiere dejarlo disfrutar de la infancia. Él y Orka viven libres, dueños de su granja, sin juramentos ni vínculos que los aten. Explica que cada día elige concentrarse en su esposa y su hijo en vez de en el pasado; propone tener otro hijo. Orka lo llama Thorkel Ulfsson. Afirma que Spert los protege eficazmente y que Vesli quedará ligada a Breca por una deuda de sangre si sobrevive, pudiendo acompañarlo cuando sus padres mueran porque los vaesen viven mucho. Al oír caballos toma un hacha larga de su propia altura y adopta una mirada fría: no permitirá que los raptores se lleven a su hijo. Reconoce a Guðvarr y se relaja; ofrece hospitalidad a los mensajeros. Aconseja acudir al Althing sin destacar, escuchar y marcharse, pues ausentarse atraería comentarios de Guðvarr y le inquieta el interés de Helka por Fellur y las colinas.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje. CAPÍTULO 8: Su optimismo es una elección consciente pese a la esclavitud y los horrores compartidos con Orka."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        status: "updated",
        previousState: "Cuida a Vesli en casa, media ante Spert y recibe su juramento de fidelidad.",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek. LIBRO 1, CAPÍTULO 3: Conduce el poni que arrastra el carro con los cuerpos hasta Fellur; Orka le encarga la tarea para darle algo en que concentrarse. Pregunta si su padre encontrará a Harek y anuncia su desaparición ante Virk y Guðvarr. La espada de Guðvarr lo impresiona. Observa preocupado la confrontación de su madre y le tira de la manga para avisar de la llegada de Thorkel. LIBRO 1, CAPÍTULO 6: Sale solo de la granja al oír los gritos de una criatura herida. Sus padres lo encuentran junto a una poza, con un tennur envuelto en su capa sobre el regazo. Orka primero lo abraza y luego, al ver la criatura, le da un golpe que le hincha y amorata la mejilla. El tennur lo protege extendiendo las alas y siseando; Thorkel impide otro golpe. Breca explica que arrancó uno de sus dientes de leche, ya flojo, y se lo dio porque sus padres le habían contado que a los tennur les gustan los dientes; otro diente está saliendo. Dice que la criatura es hembra y que ella le ha dicho su nombre, Vesli. Pregunta si pueden quedársela, sin obtener aún una respuesta explícita. LIBRO 1, CAPÍTULO 8: Recoge huevos mientras mantiene cerca a Vesli, vendada y acomodada en una carretilla con mantas. Conserva el hematoma del golpe de Orka. Lleva las gachas a Spert y lo detiene cuando amenaza a la tennur; explica que está herida, que su grupo la ha expulsado y que está sola, como antes lo estuvo Spert. Se ríe de que este desconfíe de los vaesen siendo él mismo uno. Presencia el juramento de sangre por el que Vesli promete ser fiel a él y a Spert, a quien llama su guardián. Al llegar los jinetes obedece a Orka y lleva a Vesli en brazos al salón; después se asoma aún sosteniéndola.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata. CAPÍTULO 6: Su compasión por Vesli recibe una respuesta protectora; el vínculo no explica todavía ninguna capacidad especial."
    },
    {
        id: "vesli", label: "Vesli", group: "ORKA", type: "Vaesen — Tennur herida",
        status: "updated",
        previousState: "Habla en escena y sella con sangre su promesa de amistad a Breca y Spert.",
        desc: "LIBRO 1, CAPÍTULO 6: Breca encuentra a esta tennur tras oírla gritar de dolor fuera de la granja. Está herida bajo un ala y en el labio, y descansa envuelta en su capa sobre su regazo junto a una poza. Tiene alas finas, garras, grandes ojos negros, piel rosada sin pelo y dos hileras de dientes. Breca cuenta que se calmó al recibir uno de sus dientes de leche y que ella le dijo su nombre y que es hembra; no se reproduce ese diálogo. Después del golpe de Orka al niño, despliega las alas, muestra los dientes y sisea para protegerlo, aunque parece demasiado débil para mantenerse en pie. Breca pide quedarse con ella y Thorkel se ríe; no se muestra aún una decisión. Sus alas son finas como pergamino; tiene nariz y barbilla agudas, venas oscuras visibles bajo la piel rosada y dos hileras de dientes, la exterior afilada y la interior plana. LIBRO 1, CAPÍTULO 8: Ya vive en la granja, vendada por Breca y transportada en una carretilla. Breca dice que fue expulsada de su grupo; el capítulo no explica el motivo. Ante la amenaza de Spert muestra miedo y los dientes. Habla con voz semejante al roce del viento entre hojas, promete ser amiga del Spertus y del niño humano y asegura que los amigos no roban dientes. A petición de Spert se corta la palma con una garra y jura por la sangre de su vida ser fiel y leal a Breca y a su guardián Spertus. Spert acepta y vuelve a comer. Thorkel interpreta que ella tiene una deuda de sangre con Breca por haberla salvado y quedará vinculada a él si sobrevive. Breca la lleva dentro al llegar los visitantes; sus heridas aún no están curadas.",
        star: "★ Su defensa de Breca responde a la ayuda que él le ha prestado. CAPÍTULO 8: Su juramento de sangre hace explícita la lealtad prometida a Breca y Spert."
    },
    {
        id: "spert", label: "Spert", group: "ORKA", type: "Vaesen — Guardián doméstico",
        status: "updated",
        previousState: "Se confirma su vínculo con Orka; amenaza a Vesli y exige su juramento de sangre.",
        desc: "LIBRO 1, CAPÍTULO 6: Spertus que vive bajo una roca cubierta de musgo en el arroyo de la granja de Orka y Thorkel. Orka lo despierta con el extremo de su lanza para preguntarle por Breca. Se queja de hambre: el niño suele traerle cada mañana gachas mezcladas con sangre y saliva. Ante la amenaza de Orka de matarlo, protesta que trabaja protegiéndolos de los Vaesen, pero admite que necesita dormir y no puede vigilar siempre a todos. No sabe dónde está Breca y vuelve a sumergirse. Su cuerpo quitinoso y segmentado mide aproximadamente lo que el brazo de Orka y tiene el grosor de una pierna de Thorkel. Posee muchas patas y un aguijón curvo como una aguja sobre la espalda. Su rostro parece humano, con ojos saltones, piel gris colgante y numerosos dientes puntiagudos; habla con voz áspera. LIBRO 1, CAPÍTULO 8: Al ver a Vesli abre desmesuradamente las mandíbulas, muestra huesos y dientes y exhala una nube de vapor negro. Breca detiene su amenaza y le recuerda que él también es un vaesen. Spert desconfía de los tennur porque roban dientes y aprecia los suyos. Exige que Vesli selle con sangre su promesa de amistad; tras oírla jurar fidelidad a él y a Breca, retrae la amenaza, aspira de nuevo la niebla y come. La narración confirma que Orka lo capturó y vinculó a ella años atrás, y que la sangre y saliva de las gachas son suyas. Thorkel afirma que todos duermen más seguros gracias a su vigilancia. Vesli lo llama guardián de Breca. Tiene antenas espinosas; despliega las mandíbulas y deja el vapor negro suspendido antes de aspirarlo de nuevo. Considera a los tennur astutos y poco fiables; se trata de su opinión sobre ellos.",
        star: ""
    },
    {
        id: "spertus", label: "Spertus", group: "VAESEN", type: "Vaesen — Criatura de arroyo",
        status: "updated",
        previousState: "Añade la amenaza de vapor negro observada en Spert, sin generalizarla a toda la especie.",
        desc: "LIBRO 1, CAPÍTULO 6: Tipo de vaesen asociado a los arroyos.",
        star: ""
    },
    {
        id: "tennur", label: "Tennur", group: "VAESEN", type: "Vaesen — Enjambre",
        status: "updated",
        previousState: "Vesli habla y jura con sangre; las opiniones sobre la especie se mantienen atribuidas.",
        desc: "LIBRO 1, CAPÍTULO 1: Pequeños vaesen bípedos que codician los dientes humanos, con dedos de hueso afilado y dientes cortantes. Según Orka, solos son una molestia, pero en grupo pueden resultar mortales.",
        star: ""
    },
    {
        id: "gudvarr", label: "Guðvarr", group: "ORKA", type: "Personaje — Drengr",
        status: "updated",
        previousState: "Lleva a la granja la convocatoria obligatoria de Sigrún para dentro de seis días.",
        desc: "LIBRO 1, CAPÍTULO 3: Joven sobrino y drengr de Jarl Sigrún. Llega por el río en una snekke y transmite su regreso dentro de nueve días y su recomendación de jurar lealtad a Helka. Lleva espada, túnica roja bordada y brazalete de plata; cabello negro aceitado y barba incipiente. Invoca la amenaza de Störr y de los vaesen. Atribuye a estos la muerte de Asgrim e Idrun y se burla de Orka; cuando ella lo desmiente, la amenaza con tres guerreros a su espalda. Tras el regreso de Thorkel promete investigar. Afirma que los vaesen se están volviendo más audaces y que asesinan y roban; esa acusación no confirma que sean responsables de la matanza. LIBRO 1, CAPÍTULO 8: Llega a caballo a la granja de Orka y Thorkel con dos mujeres drengr, una de ellas Arild; lleva espada y una buena cota de malla. Anuncia que Sigrún ya ha regresado y convoca el Althing dentro de seis días en la Roca del Juramento del fiordo. Dice que tratará asuntos serios y quiere presentes a todos los habitantes de sus dominios. Aprueba la respuesta de Arild, que exige asistir o abandonar el territorio. Rechaza comida y descanso porque les quedan otras tres granjas por visitar antes de volver a Fellur. Thorkel teme que comente su ausencia si no van.",
        star: "★ Su autoridad y arrogancia amenazan con convertir una petición de ayuda en violencia."
    },
    {
        id: "sigrun", label: "Jarl Sigrún", group: "ORKA", type: "Personaje — Jarl",
        status: "updated",
        previousState: "Guðvarr anuncia su regreso y fija lugar, plazo y asistencia a su Althing.",
        desc: "LIBRO 1, CAPÍTULO 3: Gobernante de Fellur y tía de Guðvarr. Según Virk lleva más de dos meses ausente, convocada —palabra que corrige por invitada— a la corte de Helka en Darl. Su sobrino anuncia su regreso dentro de nueve días y transmite que recomienda someterse a Helka. Convocará un Althing en la Roca del Juramento de Fellur para debatirlo. No aparece en persona. LIBRO 1, CAPÍTULO 8: Según Guðvarr, ya ha regresado y ha convocado un Althing en la Roca del Juramento del fiordo para dentro de seis días. Quiere que acudan todos los habitantes de su dominio para escuchar asuntos serios. Arild presenta la asistencia como condición para permanecer bajo su protección. Sigrún no aparece en la escena; no se conoce todavía su discurso ni la decisión de la asamblea.",
        star: ""
    },
    {
        id: "althing", label: "Alþing (Althing)", group: "NORSE", type: "Cultura — Asamblea",
        status: "updated",
        previousState: "La convocatoria deja de ser una expectativa: se fija a seis días y se exige la asistencia.",
        desc: "LIBRO 1, CAPÍTULO 3: Asamblea donde una comunidad se reúne para tratar asuntos públicos y expresar su parecer.",
        star: ""
    },
    {
        id: "oath-stone-fellur", label: "Roca del Juramento de Fellur", group: "LUGAR", type: "Lugar — Islote de asamblea",
        status: "updated",
        previousState: "La convocatoria de la asamblea en la roca queda fijada para dentro de seis días.",
        desc: "LIBRO 1, CAPÍTULO 3: Islote rocoso del fiordo de Fellur, cubierto de musgo, helechos y árboles azotados por el viento. Es lugar de asamblea.",
        star: ""
    },
    {
        id: "arild", label: "Arild", group: "ORKA", type: "Personaje — Drengr de Sigrún",
        desc: "LIBRO 1, CAPÍTULO 8: Una de las dos mujeres drengr que acompañan a Guðvarr a caballo hasta la granja de Orka y Thorkel. Es alta y fibrosa, de cabello castaño trenzado y rostro anguloso; las mujeres llevan cuero hervido y lana, gorros de fieltro y piel, y lanzas. Declara que quien elija vivir en el dominio de Sigrún, bajo su protección, debe asistir al Althing o buscar otro lugar donde vivir. Guðvarr aprueba sus palabras. La otra mujer permanece sin nombre.",
        star: ""
    },
    {
        id: "holmganga", label: "Holmganga", group: "NORSE", type: "Cultura — Duelo",
        desc: "LIBRO 1, CAPÍTULO 8: Duelo.",
        star: ""
    },
    {
        id: "blood-oath", label: "Juramento de Sangre", group: "MAGIA", type: "Magia — Vínculo jurado",
        desc: "LIBRO 1, CAPÍTULO 8: Juramento de fidelidad o amistad sellado con sangre. La sangre se considera vinculante, pero no se demuestran castigos ni consecuencias mágicas universales. La deuda de sangre por un rescate es una noción relacionada, no necesariamente el mismo vínculo.",
        star: ""
    },

    {"id":"althing-fellur","label":"Asamblea de Fellur","group":"EVENTO","type":"Evento — Althing de Sigrún","desc":"LIBRO 1, CAPÍTULO 3: Guðvarr anuncia una asamblea en la Roca del Juramento de Fellur cuando vuelva Sigrún. Todos podrán expresar su parecer sobre jurar lealtad a Helka. La reunión todavía no se celebra. LIBRO 1, CAPÍTULO 8: Guðvarr anuncia en la granja de Orka y Thorkel que Sigrún ha regresado y la reunión será dentro de seis días, en la Roca del Juramento del fiordo. Arild exige asistir a quienes vivan bajo su protección o buscar otro lugar donde vivir. Orka y Thorkel deciden ir, escuchar sin destacar y marcharse discretamente; el contenido del discurso y la resolución siguen pendientes.","star":"","status":"updated","previousState":"La convocatoria deja de ser una expectativa: se fija a seis días y se exige la asistencia."},

// ── LIBRO 1, CAPÍTULO 9 — ELVAR ──
    {
        id: "elvar", label: "Elvar", group: "ELVAR", type: "Personaje — Guerrera de los Battle-Grim",
        status: "updated",
        previousState: "Recibe dos recompensas, salva al hijo de Berak y afronta el regreso a casa.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrera rubia y la más joven de la compañía de Agnar. Rema hasta Iskalt y se equipa con brynja, espada, seax, hacha, casco, escudo y lanza. Su escudo rojo muestra espada, hacha y lanza cruzadas con nudos ornamentales. Ambiciona fama de batalla y desprecia el arco por matar a distancia. Se enorgullece de que Agnar la elija para acompañarlo y vigilar a los aldeanos. Advierte a una niña que abandona la multitud y, por orden de Agnar, la sigue. Derriba a un arquero con el escudo y hiere a una lancera; Grend mata a esta cuando intenta cortarle las piernas. Dirige la inspección de una cabaña y descubre el hueco por el que han escapado. Nota el interés de Biórr y aparta la mirada; también aparta la vista cuando un guardia patea a Kráka. Conserva la brynja enrollada en piel de oveja aceitada para evitar la oxidación; se la pone sobre la cabeza y ajusta el cinturón para descargar los hombros. Una punta de lanza raspa su malla y hace saltar una chispa. LIBRO 1, CAPÍTULO 7: Acepta el honor de explorar en vanguardia con Grend y Biórr. Advierte telarañas de arañas del hielo y recuerda su veneno. Tras fallar con la lanza contra el trol, combate con Grend y le abre una arteria del muslo, causando la hemorragia que lo mata. Grend la ayuda a levantarse ilesa. Sonríe a Biórr cuando la sostiene tras un resbalón, pero se libera de su mano; piensa expresamente que Grend no es su padre. Duda de que el cautivo sea Berserkir hasta ver su transformación. Aparta la mirada cuando Agnar amenaza al niño: matar niños no es su forma de ganar fama. Agnar le exige mirar al prisionero y ella presencia su sometimiento. En las ramas de Iskalt reconoce telas con hilos del grosor de un dedo y restos de ratas, un cuervo y una marta; avisa a Grend y Biórr. LIBRO 1, CAPÍTULO 9: Lleva poco más de tres años con la compañía y se ha ganado la primera fila del muro de escudos por trabajar más que los demás. Recuerda la máxima de su padre: la bondad vuelve blando. Discute con Grend la supervivencia de Lik-Rifa: no acepta que ignorar la causa de un temblor pruebe la intervención de una diosa. Agnar le entrega un colmillo del trol por el golpe mortal; valora la honra más que el oro. Al atacar una serpiente marina el Wave-Jarl, salta desarmada al agua helada y rescata al hijo de Berak. El canto de la madre desvía a la criatura y Grend lleva a ambos hasta el barco. Pregunta en voz baja a la mujer qué arrojó a la lava, sin obtener respuesta. Agnar la recompensa con un anillo de oro. Su alegría se apaga al saber que irán a Snakavik a vender a Berak a Störr; niega que sea un problema, pero siente angustia. Dice a Grend que vuelven a casa. No se identifica aquí a su padre.",
        star: "★ Su búsqueda de fama convive con su participación en la caza de Tainted y la violencia contra los habitantes de Iskalt. CAPÍTULO 9: Su rescate espontáneo del niño contrasta con la violencia contra la familia; el destino anunciado amenaza su alegría por la fama obtenida."
    },
    {
        id: "grend", label: "Grend", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Cuida a Elvar y arriesga la vida durante el rescate.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero corpulento, de cabello entrecano y expresión adusta. Rema delante de Elvar y la acompaña cuando Agnar la llama. Le enseñó desde su primer contacto con una espada a comprobar que la hoja no se atasque al desenvainar. Sigue a Elvar en la persecución de una niña y mata de un hachazo a la mujer que intenta herirle las piernas. Obedece su señal para rodear la cabaña, abre parte de la pared con el hacha y encuentra el rastro hacia el bosque. Viste una brynja o cota de malla. LIBRO 1, CAPÍTULO 7: Vigila el bosque y se interpone, ceñudo, entre Elvar y Biórr cuando este la ayuda. Biórr lo toma por su padre; Elvar piensa que no lo es. Explora junto a ambos por orden de Agnar. Combate por parejas con Elvar contra el trol, la recoge cuando cae y lanza un hachazo a los testículos de la criatura antes de caer ambos. Después la ayuda a levantarse; ella no está herida. LIBRO 1, CAPÍTULO 9: Deja dormir a Elvar en vez de despertarla para la última guardia y le lleva gachas. Ella recuerda su destreza y que nunca necesita jactarse. Atribuye el temblor a Lik-Rifa: según él, la diosa dragón quedó encerrada bajo Oskutreð antes de Guðfalla y desgarra las almas que pasan por Vergelmir. Desaprueba a Biórr y no niega que le disgusten quienes se interesan por Elvar. Se lanza al mar tras ella, apuñala a la serpiente sin detenerla y, después de que el canto la ahuyente, ayuda a Elvar y al niño a volver a bordo. La reprende por el riesgo, aunque reconoce haberse comportado como un necio aún mayor al seguirla.",
        star: ""
    },
    {
        id: "agnar", label: "Agnar", group: "ELVAR", type: "Personaje — Jefe de los Battle-Grim",
        status: "updated",
        previousState: "Recompensa a Elvar y anuncia la venta prevista en Snakavik.",
        desc: "LIBRO 1, CAPÍTULO 5: Jefe rubio de los Battle-Grim, con trenza de guerrero y el resto de la cabeza rasurado. Lleva piel de oso negro, torques de plata y anillos en los brazos. Gobierna el timón del Wave-Jarl durante la aproximación a Iskalt, deja diez o doce guerreros custodiándolo y desembarca con los demás. Busca a Berak, un hombre grande con cicatrices en un lado de la cara, acompañado por una mujer y un niño. Ofrece dinero o muerte a los aldeanos. Afirma que Berak es Tainted, tocado por los dioses, y que traerá sangre y matanza. Usa un trapo ensangrentado para dar su olor al esclavo Hundur y pronuncia «Hlýða», haciendo palpitar vetas rojas en su collar. Al interponerse Hrut, le corta la lanza y le hiere barbilla y labio; avanza después con escudo y espada mientras estalla la lucha. Al descubrir que los perseguidos han escapado de la cabaña, ordena seguirlos al bosque. LIBRO 1, CAPÍTULO 7: Se confirma que mató a Hrut en la aldea. Deja una docena de guerreros con Thrud y continúa con veintiséis. Envía a Elvar, Grend y Biórr a explorar, y ordena combatir al trol por parejas en vez de formar muro de escudos. Le clava la espada en la espalda. Ordena capturar a la mujer y al niño y reconoce al hombre como Berak Bjornasson, pese a sus negativas. Para probar su condición, amenaza con degollar al niño y le corta levemente el cuello; la transformación de Berak convence a Elvar. Activa el collar con «HALDA» y lo obliga a arrodillarse con «Á HNÉN». Afirma que la sangre del dios muerto Berser corre por Berak y que tres jarls lo buscan por asesinato, deuda de sangre y weregild. Pretende venderlo por un buen precio. Ordena recoger a sus muertos y descuartizar al trol para aprovechar todo lo valioso. LIBRO 1, CAPÍTULO 9: Entrega a Elvar un colmillo de trol como trofeo. Durante el ataque reconoce a la serpiente como Sjávarorm. Tras el canto de la cautiva, la declara bruja Seiðr con sangre de Snaka; esta identificación y el linaje son afirmaciones suyas. Amenaza con matar a su hijo si usa sus poderes contra la tripulación. Golpea a Kráka por no proteger el barco mientras dormía, luego reconoce que quizá le ha exigido demasiado y le da un asta del trol como fuente de poder para el regreso. Ordena en lengua Galdur «Hlýða og fá verðlaun», mientras vetas rojas recorren el hierro de su collar. Premia el valor de Elvar con un anillo de oro y anuncia que piensa llevar a Berak a Snakavik, donde espera el mejor precio de Störr. Aconseja a Elvar afrontar el viaje con ingenio y astucia.",
        star: "★ Su amenaza de prosperar o morir convierte la búsqueda de Berak en un ataque contra la aldea."
    },
    {
        id: "biorr", label: "Biórr", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Alimenta a los cautivos antes de la partida.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero de los Battle-Grim que desembarca en Iskalt. Comenta el frío sonriendo a Elvar, quien percibe interés en sus ojos y mira hacia otro lado. Sigue a Elvar, Grend, Sighvat y el esclavo rastreador durante el combate y llega a la cabaña con el rostro encendido por la lucha y la carrera. LIBRO 1, CAPÍTULO 7: Sostiene a Elvar cuando resbala; ambos sonríen, pero ella aparta el brazo. Ante la hostilidad de Grend, bromea con que su padre no lo aprecia, sin que Elvar le explique el error. Sigue a ambos fuera del sendero y Agnar lo elige con ellos como explorador. Avanza junto al arroyo y presencia al hombre combatiendo al trol. LIBRO 1, CAPÍTULO 9: Sonríe a Elvar al despertar. Lleva dos cuencos de gachas a la esposa de Berak y a su hijo, y se agacha para entregar al niño su comida.",
        star: ""
    },
    {
        id: "berak", label: "Berak Bjornasson", group: "ELVAR", type: "Personaje — Berserkir cautivo",
        status: "updated",
        previousState: "Se confirma el parentesco de los cautivos y se anuncia su destino comercial.",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre al que busca Agnar en Iskalt. Según este, es alto y ancho, tiene cicatrices en un lado de la cara y viaja con una mujer y un niño; calcula que llegó dos o tres días antes. Agnar lo identifica públicamente como Tainted y asegura que traerá sangre y matanza: esta última es la acusación del cazador. El esclavo Hundur confirma por el olor que Berak estuvo en la cabaña, pero el grupo ya ha escapado por un hueco en la pared trasera. No se muestra su captura ni se identifica expresamente al hombre que envía a la niña desde la multitud. LIBRO 1, CAPÍTULO 7: Agnar lo identifica como Berak Bjornasson. Combate con lanza a un trol junto a una cascada de lava mientras una mujer y un niño esperan cerca. Después de morir el trol, mata a un guerrero de la compañía con una estocada en la garganta. Acorralado contra la lava, resiste los golpes de Sighvat, pero lo encadenan y le ponen un collar. Niega ser el hombre buscado. Cuando Agnar amenaza al niño, sus ojos se tornan ambarinos, aumenta su volumen, se afilan sus dientes y le crecen uñas como garras; arrastra a seis hombres y a Sighvat. El collar lo detiene al grito de «HALDA» y «Á HNÉN» lo obliga a arrodillarse. Agnar lo declara Berserkir, descendiente de Berser, y afirma que tres jarls lo reclaman por asesinato, deuda de sangre y weregild: las acusaciones proceden de Agnar. Elvar queda convencida de su condición. La mujer y el niño también son capturados; aquí no se revelan sus nombres ni su parentesco explícito con él. LIBRO 1, CAPÍTULO 9: La narración identifica expresamente a la mujer y al niño como su esposa e hijo. Los collares y grilletes le han dejado la piel en carne viva. Sighvat lo fija al barco con cadenas junto al Hundur. Cuando la serpiente arroja a su hijo al agua, intenta saltar tras él, pero las cadenas lo impiden; grita y forcejea. Elvar rescata al niño. Su esposa ahuyenta a la serpiente cantando; Agnar la llama bruja Seiðr con sangre de Snaka. Agnar planea llevar a Berak a Snakavik para obtener el mejor precio de Jarl Störr; todavía no se produce la venta.",
        star: "★ La persecución continúa hacia el bosque de Iskalt; el grupo no ha sido capturado al terminar el capítulo. CAPÍTULO 7: La captura confirma su poder, que Agnar doblega amenazando al niño y activando el collar."
    },
    {
        id: "kraka", label: "Kráka", group: "ELVAR", type: "Personaje — Esclava Tainted",
        status: "updated",
        previousState: "Su agotamiento permite el ataque; recibe un asta para el viaje.",
        desc: "LIBRO 1, CAPÍTULO 5: Esclava Tainted de los Battle-Grim. Canta magia durante la travesía para alejar del casco a las serpientes y otros Vaesen marinos. Tras la llegada a Iskalt queda desplomada en la proa, exhausta, con el pelo negro empapado. Lleva collar y cadena; un guardia la patea y ella se encoge levantando las manos. Elvar aparta la mirada. LIBRO 1, CAPÍTULO 9: Duerme acurrucada en la proa cuando la serpiente ataca. Agnar la abofetea por no proteger a la tripulación; ella explica que estaba dormida y había cantado protección durante todo el viaje de ida. Elvar observa su agotamiento y el coste del canto Seiðr. Agnar le entrega un asta de trol como poder para el regreso y activa las vetas rojas del collar al ordenarle proteger el casco en lengua Galdur. Al salir al mar canta de nuevo y las formas que Elvar percibe bajo las olas desaparecen. Al tocar su cadena, Agnar pronuncia «Hlýða og fá verðlaun»; las vetas rojas recorren el hierro y ella responde que obedecerá.",
        star: "★ Su magia sirve de protección a quienes la mantienen esclavizada."
    },
    {
        id: "sighvat", label: "Sighvat", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Actúa contra la serpiente y dirige la salida del barco.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero voluminoso que marca el ritmo de los cincuenta remos golpeando un barril con una cuerda anudada y transmite las órdenes de Agnar. Amarra el Wave-Jarl al muelle. Anuncia a los Battle-Grim como cazadores de Vaesen y Tainted y amenaza a los isleños con demostrar su fama. Lleva un saco y sujeta la cadena del esclavo Hundur, al que arrastra y obliga a rastrear. Sigue a Elvar y Grend hasta la cabaña y pregunta al esclavo si Berak estuvo allí; este lo confirma asintiendo. Grita «niðing» a los remeros del Wave-Jarl como insulto. LIBRO 1, CAPÍTULO 7: Lleva encadenado al Hundur durante el ascenso y lo fija a un árbol con un pasador de hierro antes del combate. Golpea con una cadena la cabeza del hombre perseguido, lo derriba de un puñetazo y organiza su inmovilización. Le coloca el collar y remacha el pasador con el pomo de su seax. Golpea a la mujer cuando protesta por la amenaza al niño. La fuerza transformada de Berak lo arrastra junto con seis hombres hasta que Agnar activa el collar. Elvar conoce la contundencia de sus golpes en el pugil-ring. LIBRO 1, CAPÍTULO 9: Asegura a Berak y al Hundur con anillas y pasadores de hierro fijados a la borda. Hiere con un hacha de mano a la serpiente por debajo del cráneo; una sacudida lo derriba. Después dirige los cincuenta remos, marca el ritmo sobre un escudo y da la orden de izar mástil y vela. Gobierna el timón mientras Agnar conversa con Elvar.",
        star: ""
    },
    {
        id: "wave-jarl", label: "Wave-Jarl", group: "ELVAR", type: "Barco — Drakkar",
        status: "updated",
        previousState: "Sufre el ataque y sale de Iskalt rumbo al sur.",
        desc: "LIBRO 1, CAPÍTULO 5: Drakkar de proa de dragón que transporta a los Battle-Grim a Iskalt. Cincuenta remos lo impulsan bajo el ritmo de Sighvat, mientras Agnar maneja el remo de gobierno. Al llegar a Iskalt se recogen los remos en sus soportes y se cierran los agujeros con tapones giratorios. Sus cofres de mar sirven de asiento y guardan el equipo. Kráka canta para mantener a serpientes y otros Vaesen marinos lejos del casco. Entra en un puerto natural y queda amarrado a un muelle; diez o doce guerreros permanecen como guardia. LIBRO 1, CAPÍTULO 9: Carga pescado conservado, carne de tiburón, marfil de morsa, pieles, cabras y los restos valiosos del trol, además de los cautivos. Una serpiente devora parte de una cabra y rompe la borda al caer sobre cubierta; los guerreros revisan las tracas del casco después. La esposa de Berak la ahuyenta con su canto. Parte con cincuenta remos, iza mástil y vela y navega hacia el sur con Kráka protegiéndolo. Agnar anuncia Snakavik como destino.",
        star: ""
    },
    {
        id: "battle-grim", label: "Terrores de la batalla (Battle-Grim)", group: "ELVAR", type: "Facción — Compañía guerrera",
        status: "updated",
        previousState: "Preparan el botín y dejan Iskalt.",
        desc: "LIBRO 1, CAPÍTULO 5: Compañía de Agnar que viaja en el Wave-Jarl. Sighvat los proclama matadores de Vaesen, cazadores de Tainted y segadores de almas. Sus guerreros curtidos portan hierro y cotas de malla; Elvar es la más joven. Mantienen esclavizados a Kráka y a un rastreador Hundur. Desembarcan en Iskalt buscando a Berak; forman una línea de escudos ante los aldeanos y avanzan con gritos de guerra cuando Agnar ataca a Hrut. Continúan la persecución después de hallar vacía la cabaña. LIBRO 1, CAPÍTULO 7: El ataque a la aldea termina con Hrut muerto, otra docena de aldeanos caídos y los demás rendidos. Su única baja allí es la herida de flecha de Thrud en la pantorrilla; una docena queda con él custodiando prisioneros y veintiséis siguen a Agnar. En las colinas luchan por parejas contra un trol: uno muere ensartado, una mujer arde en la lava y otra es aplastada. Elvar mata al trol; el hombre perseguido mata a otro guerrero antes de ser capturado como Berak. Capturan también a la mujer y al niño y Agnar ordena recoger los muertos y aprovechar el cadáver del trol. LIBRO 1, CAPÍTULO 9: Cargan provisiones y mercancías tomadas de la aldea, que sigue sometida y vigilada hasta la partida. Sus guerreros llevan trofeos de hueso, diente, colmillo o uña concedidos por Agnar cuando los considera merecidos. Elvar lleva poco más de tres años con ellos y ocupa la primera fila del muro de escudos. Arrojan lanzas contra la serpiente que ataca el barco y después zarpan de Iskalt hacia el sur. Los guerreros raspan la piel del trol y hierven sus huesos para retirar la carne. Preparan piel, esqueleto y dientes, testículos en salmuera, corazón e hígado conservados con hielo y uñas destinadas a molerse. Los aldeanos de Iskalt siguen bajo vigilancia mientras los guerreros cargan mercancías y preparan la partida.",
        star: ""
    },
    {
        id: "iskalt", label: "Isla de Iskalt", group: "LUGAR", type: "Lugar — Isla septentrional",
        status: "updated",
        previousState: "Tiembla la montaña antes de la partida.",
        desc: "LIBRO 1, CAPÍTULO 5: Isla muy al norte, donde la primavera llega tarde. Una montaña de fuego, con vetas rojas brillantes entre riscos de granito, permite reconocerla desde el mar. Dos promontorios resguardan un puerto natural con muelle y playa de guijarros. La aldea pesquera tiene ahumaderos, redes, cestas para cangrejos y unas docenas de edificios; más allá crecen álamos y abedules. Hrut se declara su jarl. LIBRO 1, CAPÍTULO 7: Una empalizada semicircular de estacas marcadas con runas protege la aldea contra vaesen. En las colinas nevadas, un sendero sigue un arroyo hasta una meseta donde una cascada de roca fundida cae desde un risco de granito en una poza de lava. LIBRO 1, CAPÍTULO 9: La montaña presenta actividad sísmica: un temblor sacude playa y laderas mientras sus vetas rojas brillan con más intensidad. Su causa no queda establecida.",
        star: ""
    },
    {
        id: "trol", label: "Trol", group: "VAESEN", type: "Vaesen — Trol territorial",
        status: "updated",
        previousState: "Se detallan el aprovechamiento del cadáver y el valor mágico del asta.",
        desc: "LIBRO 1, CAPÍTULO 2: Tipo de vaesen cuyos dientes tienen valor comercial. LIBRO 1, CAPÍTULO 7: Vaesen territorial. Según el conocimiento de Elvar, los machos suelen ser solitarios salvo durante el apareamiento y parte de la crianza. Las crías nacen grandes, ágiles, fuertes y voraces, y tienen afición por la carne humana. LIBRO 1, CAPÍTULO 9: Se aprovechan comercialmente piel, huesos, dientes, órganos y uñas. Un colmillo puede valer más que su peso en oro; las astas se usan como fuente de poder mágico.",
        star: ""
    },
    {
        id: "likrafa", label: "Lik-Rifa", group: "DIOS", type: "Deidad — Dragón en la tradición de Grend",
        status: "updated",
        previousState: "Grend explica su creencia sobre la diosa dragón; Elvar la discute.",
        desc: "LIBRO 1, CAPÍTULO 4: Deidad asociada a la cámara de Vergelmir. LIBRO 1, CAPÍTULO 9: Según Grend, es una diosa dragón e hija de Snaka, encerrada mediante astucia en una cámara bajo Oskutreð antes de Guðfalla. Esta tradición sostiene que no murió con los otros dioses y que desgarra las almas de los guerreros en Vergelmir. Los relatos infantiles la presentan como una devoradora de quienes salen de noche. Su supervivencia permanece discutida.",
        star: ""
    },
    {
        id: "vergelmir", label: "Vergelmir", group: "LUGAR", type: "Lugar mítico — Cámara de Lik-Rifa",
        status: "updated",
        previousState: "Se añade la tradición de la última prueba de los guerreros.",
        desc: "LIBRO 1, CAPÍTULO 4: Lugar del más allá conocido como la cámara de Lik-Rifa. LIBRO 1, CAPÍTULO 9: Según Grend, es una cámara oscura bajo Oskutreð donde Lik-Rifa desgarra las almas que recorren el camino de los muertos. Los guerreros deben llegar armados para combatirla en su última prueba. Esta tradición es discutida.",
        star: ""
    },
    {
        id: "snaka", label: "Snaka", group: "DIOS", type: "Dios Muerto — Padre",
        status: "updated",
        previousState: "Grend nombra a su hija dragón y Agnar atribuye un linaje a la cautiva.",
        desc: "LIBRO 1, CAPÍTULO 1: Según la tradición relatada por Thorkel, Snaka es la serpiente, el Más Anciano y padre de los dioses; algunos lo consideran el mayor de ellos, y era el más grande. Había crecido desde el nacimiento del mundo. Sus hijos incluyen águila, oso, lobo y dragón, todavía sin nombres propios en esta fuente. Murió a manos de sus hijos en la guerra divina. Su caída destrozó reinos y sus huesos, cubiertos de tierra, forman montañas. LIBRO 1, CAPÍTULO 9: Según Grend, Lik-Rifa es su hija dragón y quedó encerrada antes de Guðfalla, sin poder luchar junto a él. Agnar le atribuye también la ascendencia divina de la esposa de Berak; es una genealogía no confirmada por ella.",
        star: "★★ La geografía se presenta como el resto material de un cuerpo divino, a través de la saga de Thorkel."
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        status: "updated",
        previousState: "Aparece el nombre y la versión de Grend sobre la ausencia de Lik-Rifa.",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos. LIBRO 1, CAPÍTULO 9: Grend emplea el nombre Guðfalla y sostiene que Lik-Rifa no murió aquel día con los otros dioses: había quedado encerrada y no pudo acudir junto a Snaka. Elvar disputa su supervivencia durante los casi trescientos años transcurridos.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "seidr", label: "Seiðr", group: "MAGIA", type: "Magia — Brujería",
        status: "updated",
        previousState: "Se observan cantos que ahuyentan serpientes y su coste.",
        desc: "LIBRO 1, CAPÍTULO 2: Forma de brujería cuyos practicantes pueden ser buscados para realizar una invocación o akáll. Todavía no se explica su diferencia con la práctica de un Galdurman. LIBRO 1, CAPÍTULO 9: Incluye cantos capaces de ahuyentar criaturas marinas; su uso puede agotar a quien los realiza.",
        star: ""
    },
    {
        id: "storr", label: "Jarl Störr", group: "FACCION", type: "Personaje — Jarl",
        status: "updated",
        previousState: "Agnar lo propone como comprador en Snakavik.",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr afirma que amenaza desde el oeste y lo usa como argumento para que Fellur se una a Helka. No aparece y no se precisan sus acciones ni dominios. LIBRO 1, CAPÍTULO 9: Según Agnar, es famoso por su guardia de esclavos Berserkir y por ello podría pagar el mejor precio por Berak. Agnar anuncia que llevará el cautivo a Snakavik con ese propósito; Störr no aparece ni se cierra ningún trato.",
        star: ""
    },
    {
        id: "collares", label: "Collares de Hierro", group: "MAGIA", type: "Objeto — Collares de sometimiento",
        status: "updated",
        previousState: "Se identifica como Galdur la lengua de las órdenes.",
        desc: "LIBRO 1, CAPÍTULO 5: Collares de hierro utilizados para someter esclavos mediante órdenes verbales. Su activación produce vetas rojas y puede causar dolor u obligar a obedecer; no se explica su fabricación. «Hlýða» es una de las órdenes observadas. LIBRO 1, CAPÍTULO 7: «HALDA» inmoviliza y «Á HNÉN» obliga a arrodillarse. El sometimiento puede vencer la resistencia de un Berserkir transformado. LIBRO 1, CAPÍTULO 9: La lengua de las órdenes se identifica como Galdur.",
        star: ""
    },
    {
        id: "frost-isles", label: "Islas de la Escarcha", group: "LUGAR", type: "Lugar — Islas septentrionales",
        desc: "LIBRO 1, CAPÍTULO 9: El deshielo primaveral desprende de estas islas, situadas más al norte, bloques de hielo que flotan en el mar frente a Iskalt.",
        star: ""
    },
    {
        id: "oskutred", label: "Oskutreð (Árbol de Ceniza)", group: "COSMO", type: "Lugar mítico — Árbol y prisión",
        desc: "LIBRO 1, CAPÍTULO 9: Árbol de Ceniza. Según la tradición de Grend, bajo él se encuentra la cámara donde Lik-Rifa fue encerrada mediante astucia antes de Guðfalla.",
        star: ""
    },
    {
        id: "galdur", label: "Galdur", group: "MAGIA", type: "Magia — Lengua de órdenes",
        desc: "LIBRO 1, CAPÍTULO 9: Lengua utilizada para pronunciar órdenes que activan los collares de sometimiento. Se documenta la fórmula «Hlýða og fá verðlaun»; no se describe todavía su sistema completo.",
        star: ""
    },
    {
        id: "sjavarom", label: "Sjávarorm (Serpiente Marina)", group: "VAESEN", type: "Vaesen — Serpiente marina",
        desc: "LIBRO 1, CAPÍTULO 9: Vaesen con forma de serpiente marina de gran tamaño.",
        star: ""
    },
    {
        id: "snakavik", label: "Snakavik", group: "LUGAR", type: "Lugar — Destino anunciado",
        desc: "LIBRO 1, CAPÍTULO 9: Lugar vinculado a Jarl Störr que Elvar identifica como su hogar.",
        star: ""
    },
    {
        id: "colmillo-trol", label: "Colmillo de Trol", group: "OBJETO", type: "Objeto — Trofeo de Elvar",
        desc: "LIBRO 1, CAPÍTULO 9: Agnar entrega a Elvar un colmillo del trol muerto en Iskalt, perforado y colgado de una correa de cuero. Vale más que su peso en oro, pero para ella importa la honra de haberlo ganado con el golpe mortal.",
        star: ""
    },
    {
        id: "anillo-oro", label: "Anillo de Oro", group: "OBJETO", type: "Objeto — Recompensa de Elvar",
        desc: "LIBRO 1, CAPÍTULO 9: Agnar coloca y ajusta un anillo de oro en el brazo de Elvar para premiar el valor, o locura, de saltar al mar entre serpientes y salvar al hijo de Berak.",
        star: ""
    },
    {
        id: "ataque-sjavarorm-iskalt", label: "Ataque de la Serpiente en Iskalt", group: "EVENTO", type: "Evento — Ataque y rescate",
        desc: "LIBRO 1, CAPÍTULO 9: Durante el embarque, una Sjávarorm ataca el Wave-Jarl y arroja al hijo de Berak al mar. Su padre no puede seguirlo por las cadenas. Elvar salta y lo recoge; Grend intenta frenar a la criatura a cuchilladas. La madre del niño canta desde la borda y logra que la serpiente se retire. Grend ayuda a ambos a volver a bordo y la madre agradece a Elvar el rescate. Agnar descubre en la cautiva una capacidad que interpreta como Seiðr y la amenaza a través de su hijo. La serpiente es gris verdosa y tiene la cabeza tan grande como una cabaña. Devora parte de una cabra, rompe la borda y derriba a Sighvat. Las lanzas y las cuchilladas de Grend la hieren sin detenerla; está a punto de alcanzar a Elvar y al niño cuando el canto de la madre la hace sumergirse. Agnar atribuye el canto de la madre a su condición de bruja Seiðr con sangre de Snaka; el linaje es una interpretación de Agnar.",
        star: ""
    },

    {"id":"objeto-quemado-iskalt","label":"Misterio del Objeto Quemado","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 7: La mujer que acompaña a Berak arroja a la lava un objeto semejante a una tablilla de cera o un libro de pergamino. No se confirma qué era ni por qué lo destruyó. LIBRO 1, CAPÍTULO 9: Elvar pregunta a la mujer qué arrojó a la lava, sin obtener respuesta.","star":"","status":"updated","previousState":"La pregunta explícita de Elvar no obtiene respuesta."},
    {"id":"pasado-elvar","label":"Pasado de Elvar","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 9: Elvar identifica Snakavik como su hogar, pero el regreso anunciado le causa angustia. Recuerda una máxima de su padre sin revelar su identidad. La razón de su reacción y los detalles de su pasado siguen abiertos.","star":""},
    {"id":"berak-venta","label":"Venta de Berak (pendiente)","group":"TRAMA","type":"Trama — Pregunta u objetivo abierto","desc":"LIBRO 1, CAPÍTULO 9: Agnar planea llevar a Berak a Snakavik para venderlo a Jarl Störr, de quien espera un buen precio por su guardia de esclavos Berserkir. La venta no se ha producido y el destino del cautivo sigue abierto.","star":""},

// ── LIBRO 1, CAPÍTULO 10 — ORKA ──
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        status: "updated",
        previousState: "Interviene en la asamblea y acepta ser segunda de Virk.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza. LIBRO 1, CAPÍTULO 3: Lleva con Breca los cuerpos de Asgrim e Idrun a Fellur mientras Thorkel rastrea a los asesinos. Prefería seguirlos ella, pero reconoce que su esposo es mejor rastreador. Siente presión en la cabeza y el pecho bajo el nudillo de dios de la puerta; disminuye al alejarse. Desmiente a Guðvarr: la estocada de espada no corresponde a dientes ni garras de vaesen. Al recibir sus amenazas revive imágenes de violencia, tiembla y lucha por contenerse ante Breca. La llegada de Thorkel permite cortar la confrontación. Quiere entregar los muertos a sus parientes para que reciban un túmulo, pero termina marchándose con su familia: considera que esta lucha no les corresponde. Guðvarr se burla preguntándole si es una bruja Seiðr capaz de ver el pasado; ella responde que basta reconocer una herida de espada. No demuestra magia ni confirma esa identidad. LIBRO 1, CAPÍTULO 6: Despierta empapada en sudor tras revivir una batalla, con el mar, cuerpos y gritos. Oculta su angustia a Thorkel; desea alcohol para amortiguar los recuerdos y resiente que él le haya pedido beber menos. Al descubrir vacía la cama de Breca lo busca con su lanza, interroga a Spert y teme otro rapto al recordar las palabras de Virk y la desaparición de Harek. Sigue a Thorkel hacia el nordeste, remontando el arroyo, y contiene con esfuerzo imágenes violentas y una ira que sabe inútil para encontrar al niño. Abraza y besa a Breca al hallarlo junto a una poza. Le sorprende la posible presencia de un Näcken tan lejos de su río de montaña, pero la preocupación por su hijo desplaza esa observación. Al ver al tennur herido que sostiene, golpea a Breca en la mejilla y le deja una hinchazón amoratada; lo reprende por abandonar la seguridad de la granja y levanta la mano de nuevo. Thorkel la detiene. Orka piensa que podría vencer su resistencia, pero acepta el juicio de su esposo, en quien ha aprendido a confiar especialmente cuando la domina la ira. Descubre que el niño ha dado un diente a la criatura y que esta se llama Vesli. LIBRO 1, CAPÍTULO 8: Afila su seax mientras vigila a Breca y a Vesli, ahora acogida en la granja. Defiende educar al niño para sobrevivir sin sus padres, pero admite compartir el deseo de protegerlo del sufrimiento. Reconoce que ella y Thorkel han combatido juntos y cometido actos terribles; no logra desprenderse del pasado y envidia la fortaleza emocional de él. Lo llama Thorkel Ulfsson. Se confirma que fue ella quien capturó y vinculó a Spert años atrás: las gachas que le da Breca contienen sangre y saliva de Orka. La posibilidad de tener otro hijo da paso a la alarma por unos jinetes. Toma su lanza y, al ver el hacha larga de Thorkel, revive gritos y la imagen de un guerrero entre llamas, sin identificarlo. Reconoce a los visitantes y juzga que no serían capaces de matar a Asgrim e Idrun. Rechaza involucrarse en disputas de jarls y reinas, pero acepta ir al Althing de Sigrún para no llamar la atención; el presentimiento de Thorkel la deja asustada. LIBRO 1, CAPÍTULO 10: Acude con Thorkel y Breca a la Roca del Juramento en la barca de Virk y sus hijos. El drakkar de Sigrún despierta su entusiasmo guerrero. Al oír que adorar a los dioses se castiga con la muerte recuerda a una mujer en una jaula de hierro, con cuervos picoteándole ojos y lengua; no se identifica a la mujer. Virk le cuenta otros raptos y la escasa búsqueda de Harek; Orka sospecha que unos níðing venden niños como esclavos, sin pruebas de sus identidades ni del motivo. Teme por Breca. La guerrera esclavizada y aún sin nombre de Sigrún le provoca inquietud por su mirada despiadada y su desesperanza. Reconoce la franqueza de Sigrún al admitir la inferioridad frente a Helka, pero prevé guerras de conquista. Rompe su propósito de pasar inadvertida y denuncia que Helka exigirá una leva de guerreros, no solo impuestos. Pese a la desaprobación de Thorkel, acepta ser segunda de Virk: si muere, deberá contener a sus hijos y ponerle el hacha en la mano.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos. CAPÍTULO 6: Los recuerdos de batalla y la necesidad de alcohol agravan su angustia; el miedo por Breca desemboca en violencia contra él. CAPÍTULO 8: La paz familiar convive con recuerdos intrusivos de violencia y el miedo al futuro político."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        status: "updated",
        previousState: "Explica la historia de la roca y desaprueba que Orka sea segunda.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres. LIBRO 1, CAPÍTULO 3: No encuentra a Harek en la granja. Sigue el rastro de los asesinos por el bosque tras prometer que regresará sin enfrentarse solo a ellos si los descubre; Orka teme que no cumpla esa promesa por salvar al niño. El rastro acaba en un afluente del Skarpain, con señales de tres barcas en la orilla. No encuentra a los fugitivos. Regresa a Fellur durante el enfrentamiento de Orka con Guðvarr; su propia ira se suaviza cuando ella le habla de enterrar a los muertos. LIBRO 1, CAPÍTULO 6: Encuentra la huella de Breca junto al portillo de la granja y el cerrojo abierto, sin señales de otra persona. Con seax y hacha de mano, sigue el rastro hacia el nordeste y remonta el arroyo hasta una poza de la que nace. Al hallar al niño pide que se aparte del agua: dice que huele a Näcken y clava su seax en la tierra blanda; no se muestra ninguna criatura acuática ni el efecto de este gesto. Identifica como tennur a la criatura herida. Sujeta la muñeca de Orka para impedir que vuelva a pegar a Breca y le dice que ya ha dejado claro su reproche. También reprende al niño por el peligro y le pregunta cómo encontró a la criatura. Silba al oír que se llama Vesli y se ríe cuando Breca pide quedarse con ella; todavía no responde a la petición. LIBRO 1, CAPÍTULO 8: Ha permitido que Breca se quede con Vesli. Recuerda que, a la edad de su hijo —diez inviernos—, llevaba collar de esclavo y había sido azotado. Quiere dejarlo disfrutar de la infancia. Él y Orka viven libres, dueños de su granja, sin juramentos ni vínculos que los aten. Explica que cada día elige concentrarse en su esposa y su hijo en vez de en el pasado; propone tener otro hijo. Orka lo llama Thorkel Ulfsson. Afirma que Spert los protege eficazmente y que Vesli quedará ligada a Breca por una deuda de sangre si sobrevive, pudiendo acompañarlo cuando sus padres mueran porque los vaesen viven mucho. Al oír caballos toma un hacha larga de su propia altura y adopta una mirada fría: no permitirá que los raptores se lleven a su hijo. Reconoce a Guðvarr y se relaja; ofrece hospitalidad a los mensajeros. Aconseja acudir al Althing sin destacar, escuchar y marcharse, pues ausentarse atraería comentarios de Guðvarr y le inquieta el interés de Helka por Fellur y las colinas. LIBRO 1, CAPÍTULO 10: Explica a Breca que la piedra rúnica fue destruida porque servía para jurar y rendir culto a los dioses, ahora prohibido bajo pena de muerte. Vincula la persecución de sus descendientes al odio de los supervivientes de la Guðfalla. Sugiere que la persistencia del pasado explica celebrar allí la asamblea. Se inquieta ante el anuncio de Sigrún y trata de evitar que Orka se comprometa como segunda de Virk, pero sabe que aceptará.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje. CAPÍTULO 8: Su optimismo es una elección consciente pese a la esclavitud y los horrores compartidos con Orka."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        status: "updated",
        previousState: "Asiste a su primera asamblea y reclama que se recuerde a Harek.",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek. LIBRO 1, CAPÍTULO 3: Conduce el poni que arrastra el carro con los cuerpos hasta Fellur; Orka le encarga la tarea para darle algo en que concentrarse. Pregunta si su padre encontrará a Harek y anuncia su desaparición ante Virk y Guðvarr. La espada de Guðvarr lo impresiona. Observa preocupado la confrontación de su madre y le tira de la manga para avisar de la llegada de Thorkel. LIBRO 1, CAPÍTULO 6: Sale solo de la granja al oír los gritos de una criatura herida. Sus padres lo encuentran junto a una poza, con un tennur envuelto en su capa sobre el regazo. Orka primero lo abraza y luego, al ver la criatura, le da un golpe que le hincha y amorata la mejilla. El tennur lo protege extendiendo las alas y siseando; Thorkel impide otro golpe. Breca explica que arrancó uno de sus dientes de leche, ya flojo, y se lo dio porque sus padres le habían contado que a los tennur les gustan los dientes; otro diente está saliendo. Dice que la criatura es hembra y que ella le ha dicho su nombre, Vesli. Pregunta si pueden quedársela, sin obtener aún una respuesta explícita. LIBRO 1, CAPÍTULO 8: Recoge huevos mientras mantiene cerca a Vesli, vendada y acomodada en una carretilla con mantas. Conserva el hematoma del golpe de Orka. Lleva las gachas a Spert y lo detiene cuando amenaza a la tennur; explica que está herida, que su grupo la ha expulsado y que está sola, como antes lo estuvo Spert. Se ríe de que este desconfíe de los vaesen siendo él mismo uno. Presencia el juramento de sangre por el que Vesli promete ser fiel a él y a Spert, a quien llama su guardián. Al llegar los jinetes obedece a Orka y lleva a Vesli en brazos al salón; después se asoma aún sosteniéndola. LIBRO 1, CAPÍTULO 10: Acude entusiasmado a su primer Althing. Le decepciona el tamaño de la roca destruida y pregunta por qué se destruyó algo que alguien quiso construir, por qué se prohíbe el culto y por qué se sigue reuniendo allí la asamblea. Cuando Sigrún menciona a Asgrim e Idrun, añade públicamente el nombre de Harek; Orka siente orgullo por su valor al defender a su amigo.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata. CAPÍTULO 6: Su compasión por Vesli recibe una respuesta protectora; el vínculo no explica todavía ninguna capacidad especial."
    },
    {
        id: "virk", label: "Virk", group: "ORKA", type: "Personaje — Pescador",
        status: "updated",
        previousState: "Se opone a la sumisión, denuncia la búsqueda insuficiente y acepta un duelo.",
        desc: "LIBRO 1, CAPÍTULO 3: Pescador de Fellur que ha comerciado muchas veces con Orka y Thorkel. Alto, corpulento y franco. Se recupera de una lesión en el brazo sufrida durante una tormenta y sus dos hijos, aún sin nombre, salen a pescar por él. Sale de la taberna con olor a alcohol. Critica que los antiguos jarls se hagan llamar reyes y rechaza que la sumisión a Helka se disfrace de cuidados. Afirma haber oído antes casos de niños llevados; no identifica responsables. LIBRO 1, CAPÍTULO 10: Lleva a Orka y su familia al islote con sus hijos Mord y Lif; rechaza cobrarles, pidiendo buen trato al comprar pieles. Dice que Guðvarr solo envió exploradores al río, sin barcos ni perros, y que los libertos Asgrim e Idrun tenían derecho a justicia. Detalla los raptos de Howbyr y Kergarth y propone perseguir a los culpables. Insinúa experiencia de combate anterior a su oficio de pescador; Orka reconoce en él una violencia contenida. Rechaza tributos y pérdida de autonomía bajo Helka. Afirma haber navegado y visto la esclavitud masiva y los sacrificios de niños de Iskidan; Sigrún lo desacredita como relato o fantasía de borracho. Acusa a Guðvarr de incumplir sus deberes y lo ridiculiza. Acepta el holmganga que este le propone. Pide a Orka ser su segunda porque teme que sus hijos intenten vengarlo sin poder vencer a un drengr; si muere, le encarga contenerlos y ponerle el hacha en la mano para el camino del alma. El combate aún no empieza.",
        star: "★ Su comentario sitúa la desaparición de Harek dentro de un posible patrón."
    },
    {
        id: "gudvarr", label: "Guðvarr", group: "ORKA", type: "Personaje — Drengr",
        status: "updated",
        previousState: "Es acusado de negligencia y reta a Virk.",
        desc: "LIBRO 1, CAPÍTULO 3: Joven sobrino y drengr de Jarl Sigrún. Llega por el río en una snekke y transmite su regreso dentro de nueve días y su recomendación de jurar lealtad a Helka. Lleva espada, túnica roja bordada y brazalete de plata; cabello negro aceitado y barba incipiente. Invoca la amenaza de Störr y de los vaesen. Atribuye a estos la muerte de Asgrim e Idrun y se burla de Orka; cuando ella lo desmiente, la amenaza con tres guerreros a su espalda. Tras el regreso de Thorkel promete investigar. Afirma que los vaesen se están volviendo más audaces y que asesinan y roban; esa acusación no confirma que sean responsables de la matanza. LIBRO 1, CAPÍTULO 8: Llega a caballo a la granja de Orka y Thorkel con dos mujeres drengr, una de ellas Arild; lleva espada y una buena cota de malla. Anuncia que Sigrún ya ha regresado y convoca el Althing dentro de seis días en la Roca del Juramento del fiordo. Dice que tratará asuntos serios y quiere presentes a todos los habitantes de sus dominios. Aprueba la respuesta de Arild, que exige asistir o abandonar el territorio. Rechaza comida y descanso porque les quedan otras tres granjas por visitar antes de volver a Fellur. Thorkel teme que comente su ausencia si no van. LIBRO 1, CAPÍTULO 10: Asiste al Althing entre los drengrs de su tía. Según Virk, limitó la búsqueda a exploradores junto al río, sin barcos ni perros. Sigrún dice que él le informó del crimen y sostiene que hizo todo lo posible; Virk lo niega. Al ser ridiculizado por su incompetencia y su nariz goteante, desafía a Virk a holmganga. Insiste en que el desafío público ante jarl, comunidad y piedra no se puede retirar, pese a la orden de Sigrún de detenerse. Virk acepta; el duelo queda pendiente.",
        star: "★ Su autoridad y arrogancia amenazan con convertir una petición de ayuda en violencia."
    },
    {
        id: "sigrun", label: "Jarl Sigrún", group: "ORKA", type: "Personaje — Jarl",
        status: "updated",
        previousState: "Aparece, anuncia su juramento a Helka y autoriza preparar el duelo.",
        desc: "LIBRO 1, CAPÍTULO 3: Gobernante de Fellur y tía de Guðvarr. Según Virk lleva más de dos meses ausente, convocada —palabra que corrige por invitada— a la corte de Helka en Darl. Su sobrino anuncia su regreso dentro de nueve días y transmite que recomienda someterse a Helka. Convocará un Althing en la Roca del Juramento de Fellur para debatirlo. No aparece en persona. LIBRO 1, CAPÍTULO 8: Según Guðvarr, ya ha regresado y ha convocado un Althing en la Roca del Juramento del fiordo para dentro de seis días. Quiere que acudan todos los habitantes de su dominio para escuchar asuntos serios. Arild presenta la asistencia como condición para permanecer bajo su protección. Sigrún no aparece en la escena; no se conoce todavía su discurso ni la decisión de la asamblea. LIBRO 1, CAPÍTULO 10: Se presenta en persona ante la piedra con unos veinticuatro drengrs, entre ellos Guðvarr y Arild, y una guerrera esclavizada sin nombre, de cabeza parcialmente rapada y tatuada, dos seaxes y collar. Lleva ocho años gobernando Fellur y ha ampliado sus tierras atrayendo guerreros con promesas de tierras y rango. Muestra la herida reciente que selló con sangre su juramento a Helka. Justifica la decisión por las amenazas de Störr, Orlyg y la propia Helka; admite impuestos y juramentos, y concede ante Orka que podría haber una leva. Usa Iskidan como ejemplo de unificación política. Afirma haber visto los drakkars, la hueste y las alas de Orna sobre la fortaleza de Darl, y confía en la victoria de Helka. Desestima las denuncias de Virk sobre Iskidan y defiende la actuación de su sobrino. No logra frenar su desafío a Virk; manda elegir segundos y preparar las varas de avellano antes de reanudar la reunión.",
        star: ""
    },
    {
        id: "oath-stone-fellur", label: "Roca del Juramento de Fellur", group: "LUGAR", type: "Lugar — Islote de asamblea",
        status: "updated",
        previousState: "Se describe la piedra destruida y se celebra allí la asamblea.",
        desc: "LIBRO 1, CAPÍTULO 3: Islote rocoso del fiordo de Fellur, cubierto de musgo, helechos y árboles azotados por el viento. Es lugar de asamblea. LIBRO 1, CAPÍTULO 10: Un sendero conduce a un claro con los restos de una gran piedra rúnica destrozada a martillazos. Según Thorkel, pudo alcanzar la altura de un salón y recibía juramentos de sangre y culto a los dioses. Fue destruida por la prohibición de ese culto.",
        star: ""
    },
    {
        id: "althing", label: "Alþing (Althing)", group: "NORSE", type: "Cultura — Asamblea",
        status: "updated",
        previousState: "La asamblea se celebra y se suspende para preparar un holmganga.",
        desc: "LIBRO 1, CAPÍTULO 3: Asamblea donde una comunidad se reúne para tratar asuntos públicos y expresar su parecer. LIBRO 1, CAPÍTULO 10: Puede durar varios días. En el dominio de Sigrún se exige al menos un representante de cada familia.",
        star: ""
    },
    {
        id: "ninos-robados", label: "Robos de Ninos", group: "TRAMA", type: "Trama — Desapariciones",
        status: "updated",
        previousState: "Virk identifica otros pueblos y familias afectados; el móvil sigue siendo una hipótesis.",
        desc: "LIBRO 1, CAPÍTULO 3: Breca y Orka afirman que los asesinos se llevaron a Harek. Virk dice haber oído antes que se llevan niños. El capítulo sugiere otros casos, pero no aporta nombres, cifras, fechas, autores ni motivos. LIBRO 1, CAPÍTULO 10: Virk informa de tres hijos de los Haraldursons de Howbyr —dos niñas y un niño— desaparecidos de sus camas, y de una familia de Kergarth cuyos padres fueron hallados muertos y cuyos hijos varones faltaban. Dice que hay más rumores sin confirmar. Howbyr queda diez o doce leguas al norte y Kergarth seis al este por la costa. No hay noticias de Harek. Orka y Virk sospechan de forajidos que venden niños como esclavos; no se identifica a los raptores ni se confirma ese destino.",
        star: "★★ La afirmación de Virk amplía la inquietud más allá de una sola familia."
    },
    {
        id: "holmganga", label: "Holmganga", group: "NORSE", type: "Cultura — Duelo",
        status: "updated",
        previousState: "Se presentan las reglas y preparativos mediante el desafío a Virk.",
        desc: "LIBRO 1, CAPÍTULO 8: Duelo. LIBRO 1, CAPÍTULO 10: El desafío público se considera irrevocable y rechazarlo supone perder el honor. Los contendientes eligen segundos y se prepara el terreno con varas de avellano. Los familiares deben respetar el resultado en vez de atacar al vencedor.",
        star: ""
    },
    {
        id: "helka", label: "Reina Helka", group: "VARG", type: "Personaje — Reina",
        status: "updated",
        previousState: "Sigrún confirma su adhesión; la conquista y leva quedan como previsiones.",
        desc: "LIBRO 1, CAPÍTULO 2: Su perfil de nariz afilada y cabello recogido figura en las monedas de bronce que lleva Varg. Él solo conoce rumores sobre su pretensión de controlar media Vigríð y su crueldad con los enemigos. Un drengr cobraba sus tributos en la granja de Kolskegg. El vendedor de comida critica sus impuestos. Svik usa su nombre como ejemplo hipotético: ni siquiera ella podría contratar a Vol. LIBRO 1, CAPÍTULO 3: Según Virk, Sigrún lleva más de dos meses en su corte de Darl. Guðvarr transmite que su tía recomienda jurarle lealtad, presentando la protección de Helka como respuesta a Störr y a los vaesen. La adhesión de Fellur queda pendiente de un Althing; el capítulo no muestra a Helka en persona. LIBRO 1, CAPÍTULO 10: Sigrún anuncia haberle jurado lealtad y sellado el juramento con sangre. Espera tributos y juramentos, y admite ante Orka la posibilidad de una leva. Afirma haber visto su flota, hueste y fortaleza de Darl bajo los huesos alados de Orna. Sigrún sostiene que negarse habría provocado una conquista y su sustitución, y predice una victoria de Helka sobre Störr; son valoraciones de Sigrún, no sucesos consumados.",
        star: ""
    },
    {
        id: "helka-poder", label: "Expansión de Helka", group: "TRAMA", type: "Trama — Sumisión política",
        status: "updated",
        previousState: "La adhesión de Sigrún se confirma con oposición pública.",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr propone que Fellur jure lealtad a Helka y presenta su dominio como protección frente a Störr y los vaesen. Virk denuncia que eso significa gobierno, no cuidados. Habrá un Althing al regreso de Sigrún; no se ha mostrado una decisión colectiva de Fellur. LIBRO 1, CAPÍTULO 10: Sigrún ya ha jurado a Helka y lo comunica al Althing mostrando el corte en su brazo. Reconoce que habrá tributos y juramentos, y que podría exigirse una leva. Virk denuncia la pérdida de autonomía; Orka advierte que los habitantes combatirán en guerras de conquista. Sigrún presenta su decisión como defensa ante otros jarls y predice un enfrentamiento decisivo entre Helka y Störr, todavía futuro.",
        star: "★ La seguridad se convierte en argumento para ceder autonomía."
    },
    {
        id: "storr", label: "Jarl Störr", group: "FACCION", type: "Personaje — Jarl",
        status: "updated",
        previousState: "Sigrún describe su expansión y lo sitúa como rival de Helka.",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr afirma que amenaza desde el oeste y lo usa como argumento para que Fellur se una a Helka. No aparece y no se precisan sus acciones ni dominios. LIBRO 1, CAPÍTULO 9: Según Agnar, es famoso por su guardia de esclavos Berserkir y por ello podría pagar el mejor precio por Berak. Agnar anuncia que llevará el cautivo a Snakavik con ese propósito; Störr no aparece ni se cierra ningún trato. LIBRO 1, CAPÍTULO 10: Según Sigrún, desde el noroeste extiende sus fronteras al sur y al este y codicia las tierras y el fiordo de Fellur. Ella predice una guerra con Helka y afirma que Störr ofrecería conquista y esclavitud en vez de protección. No aparece ni se muestra tal invasión.",
        star: ""
    },
    {
        id: "darl", label: "Darl", group: "LUGAR", type: "Lugar — Corte",
        status: "updated",
        previousState: "Sigrún describe la fortaleza y las alas de Orna.",
        desc: "LIBRO 1, CAPÍTULO 3: Sede de la corte de la Reina Helka. LIBRO 1, CAPÍTULO 10: Según Sigrún, los huesos alados del dios Orna se alzan sobre la fortaleza de la reina.",
        star: ""
    },
    {
        id: "iskidan", label: "Iskidan", group: "LUGAR", type: "Lugar — Tierra al sur del mar",
        status: "updated",
        previousState: "Se describe su centralización y se conservan versiones discrepantes sobre su violencia.",
        desc: "LIBRO 1, CAPÍTULO 2: Tierra muy lejana al sur, al otro lado del mar. Los relatos conocidos por Varg hablan de grandes ríos, llanuras herbosas, sol intenso y la ciudad de Gravka. LIBRO 1, CAPÍTULO 10: Según Sigrún, es un vasto reino gobernado desde Gravka por el emperador Kirill. Virk afirma haber visto allí más esclavos que libertos y sacrificios de niños, y acusa al régimen de sostenerse sobre una matanza. Sigrún disputa su testimonio; esas denuncias no quedan resueltas.",
        star: ""
    },
    {
        id: "gravka", label: "Gravka", group: "LUGAR", type: "Lugar — Gran Ciudad",
        status: "updated",
        previousState: "Es identificada como sede del poder de Kirill.",
        desc: "LIBRO 1, CAPÍTULO 2: La Gran Ciudad de Iskidan. LIBRO 1, CAPÍTULO 10: Según Sigrún, es la sede desde la que el emperador Kirill gobierna Iskidan.",
        star: ""
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        status: "updated",
        previousState: "Thorkel relaciona la catástrofe con el odio a los descendientes divinos.",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos. LIBRO 1, CAPÍTULO 9: Grend emplea el nombre Guðfalla y sostiene que Lik-Rifa no murió aquel día con los otros dioses: había quedado encerrada y no pudo acudir junto a Snaka. Elvar disputa su supervivencia durante los casi trescientos años transcurridos. LIBRO 1, CAPÍTULO 10: Thorkel explica a Breca que los supervivientes de la caída de Snaka odiaron y persiguieron a los descendientes de los dioses, culpando a estos de haber roto el mundo. El culto a los dioses muertos está prohibido bajo pena de muerte.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "tainted", label: "Tainted", group: "MAGIA", type: "Concepto — Personas tocadas por los dioses",
        status: "updated",
        previousState: "Thorkel explica la persecución histórica por la sangre divina.",
        desc: "LIBRO 1, CAPÍTULO 5: Personas tocadas por los dioses, perseguidas y esclavizadas por sus capacidades. LIBRO 1, CAPÍTULO 7: Los Berserkir constituyen un linaje asociado a Berser. LIBRO 1, CAPÍTULO 10: Según Thorkel, son descendientes de los dioses cuya sangre se mezcla con la humana. El odio de los supervivientes de la Guðfalla dio origen a su persecución.",
        star: ""
    },
    {
        id: "blood-oath", label: "Juramento de Sangre", group: "MAGIA", type: "Magia — Vínculo jurado",
        status: "updated",
        previousState: "Se muestra el uso político del juramento sellado con sangre.",
        desc: "LIBRO 1, CAPÍTULO 8: Juramento de fidelidad o amistad sellado con sangre. La sangre se considera vinculante, pero no se demuestran castigos ni consecuencias mágicas universales. La deuda de sangre por un rescate es una noción relacionada, no necesariamente el mismo vínculo. LIBRO 1, CAPÍTULO 10: También se usa para sellar lealtades políticas. Antiguamente se prestaban juramentos de sangre a los dioses en piedras rituales.",
        star: ""
    },
    {"id":"mord","label":"Mord","group":"ORKA","type":"Personaje — Hijo de Virk","desc":"LIBRO 1, CAPÍTULO 10: Hijo de Virk y hermano de Lif. Rema junto a su padre y su hermano para llevar a Orka y su familia a la asamblea. Ambos hijos apoyan las objeciones de Virk a la sumisión a Helka. Según su padre, tiene cierta destreza con las armas, pero no puede vencer a un drengr. Su padre teme que intente vengarlo si muere en el duelo y encarga a Orka impedirlo.","star":""},
    {"id":"lif","label":"Lif","group":"ORKA","type":"Personaje — Hijo de Virk","desc":"LIBRO 1, CAPÍTULO 10: Hijo de Virk y hermano de Mord. Rema junto a su padre y su hermano para llevar a Orka y su familia a la asamblea. Ambos hijos apoyan las objeciones de Virk a la sumisión a Helka. Según su padre, tiene cierta destreza con las armas, pero no puede vencer a un drengr. Su padre teme que intente vengarlo si muere en el duelo y encarga a Orka impedirlo.","star":""},
    {
        id: "howbyr", label: "Howbyr", group: "LUGAR", type: "Lugar — Población",
        desc: "LIBRO 1, CAPÍTULO 10: Localidad diez o doce leguas al norte de Fellur.",
        star: ""
    },
    {
        id: "kergarth", label: "Kergarth", group: "LUGAR", type: "Lugar — Población",
        desc: "LIBRO 1, CAPÍTULO 10: Localidad seis leguas al este de Fellur, por la costa.",
        star: ""
    },
    {
        id: "jarl-orlyg", label: "Jarl Orlyg", group: "FACCION", type: "Personaje — Jarl",
        desc: "LIBRO 1, CAPÍTULO 10: Según Sigrún, gobierna desde Svelgarth, al este, y ha saqueado sus tierras. No aparece en escena.",
        star: ""
    },
    {
        id: "svelgarth", label: "Svelgarth", group: "LUGAR", type: "Lugar — Sede de Orlyg",
        desc: "LIBRO 1, CAPÍTULO 10: Sede de Jarl Orlyg, situada al este de los dominios de Sigrún según el discurso de esta.",
        star: ""
    },
    {
        id: "falki", label: "Fálki Torilsson", group: "ORKA", type: "Personaje — Propietario de minas de estaño",
        desc: "LIBRO 1, CAPÍTULO 10: Antiguo granjero enriquecido por depósitos de estaño bajo sus pastos. Orka y Thorkel han comerciado con él. Lleva sombrero rojo de fieltro con piel y anillos de oro en la barba. En la asamblea respalda respetuosamente las dudas de Virk y pregunta por los impuestos de Helka; escucha los beneficios que propone Sigrún, sin declarar una adhesión.",
        star: ""
    },
    {
        id: "emp-kirill", label: "Emperador Kirill", group: "FACCION", type: "Personaje — Gobernante de Iskidan",
        desc: "LIBRO 1, CAPÍTULO 10: Sigrún lo nombra como emperador que gobierna Iskidan desde Gravka. Virk denuncia que su trono está construido sobre cadáveres y afirma haber visto esclavitud masiva y sacrificios de niños en su reino. Sigrún disputa ese testimonio. El capítulo no usa todavía el título canónico posterior de Gran Khagan; se conserva su id del archivo de referencia.",
        star: ""
    },
    {
        id: "orna", label: "Orna", group: "DIOS", type: "Dios — Muerto",
        desc: "LIBRO 1, CAPÍTULO 10: Dios muerto de restos alados. Según Sigrún, sus huesos se alzan sobre la fortaleza de Helka en Darl.",
        star: ""
    },
    {
        id: "holmganga-event", label: "Holmganga Virk vs Guðvarr", group: "EVENTO", type: "Evento — Desafío aceptado; combate pendiente",
        desc: "LIBRO 1, CAPÍTULO 10: Durante el Althing, Virk acusa a Guðvarr de negligencia en la búsqueda de niños y lo ridiculiza. Guðvarr lo reta y sostiene que no puede retirar el desafío público, pese a la oposición de Sigrún. Virk acepta. La jarl suspende la reunión para elegir segundos y colocar varas de avellano. Orka acepta ser segunda de Virk para contener a sus hijos si pierde y ponerle el hacha en la mano si muere. El capítulo termina antes del combate.",
        star: ""
    },    {"id":"althing-fellur","label":"Asamblea de Fellur","group":"EVENTO","type":"Evento — Althing de Sigrún","desc":"LIBRO 1, CAPÍTULO 3: Guðvarr anuncia una asamblea en la Roca del Juramento de Fellur cuando vuelva Sigrún. Todos podrán expresar su parecer sobre jurar lealtad a Helka. La reunión todavía no se celebra. LIBRO 1, CAPÍTULO 8: Guðvarr anuncia en la granja de Orka y Thorkel que Sigrún ha regresado y la reunión será dentro de seis días, en la Roca del Juramento del fiordo. Arild exige asistir a quienes vivan bajo su protección o buscar otro lugar donde vivir. Orka y Thorkel deciden ir, escuchar sin destacar y marcharse discretamente; el contenido del discurso y la resolución siguen pendientes. LIBRO 1, CAPÍTULO 10: Cientos de habitantes se reúnen en el islote; hay tiendas en los prados de Fellur porque la reunión puede durar días. Debe asistir al menos un representante de cada familia del territorio. Sigrún anuncia que ya juró a Helka, sin esperar una votación mostrada en escena. Virk y Fálki cuestionan impuestos y pérdida de libertad; Orka advierte de una leva. La discusión sobre los raptos desemboca en un desafío de Guðvarr a Virk y la asamblea se interrumpe para preparar el duelo.","star":"","status":"updated","previousState":"La asamblea se celebra y se suspende para preparar un holmganga."},
    {"id":"niding","label":"Níðing","group":"NORSE","type":"Cultura — Insulto","desc":"LIBRO 1, CAPÍTULO 5: Término empleado como insulto. LIBRO 1, CAPÍTULO 10: También designa a hombres sin ley o forajidos.","star":"","status":"updated","previousState":"El uso del término permite precisar su sentido de forajido u hombre sin ley."},



// ── LIBRO 1, CAPÍTULO 11 — VARG ──
    {
        id: "varg", label: "Varg", group: "VARG", type: "Personaje — Nuevo miembro Bloodsworn",
        status: "updated",
        previousState: "Añade su convalecencia, la identificación del jefe y el comienzo del entrenamiento.",
        desc: "LIBRO 1, CAPÍTULO 2: Llega a Liga tras nueve o diez días de huida, convencido de que lo persiguen aunque no ve a nadie. Desconoce su edad y a sus padres; recuerda treinta inviernos y veranos de esclavitud en la granja de Kolskegg, veinte leguas al noreste de Liga, río arriba. Corre con una resistencia que él mismo considera casi inagotable. Recuerda haber estrangulado a Snepil, pero no cómo llegó a rodearle el cuello con las manos: el recuerdo emerge de una niebla roja. Se vuelve a poner y cierra con llave el collar de hierro para entrar en Liga fingiendo que busca alojamiento para su amo, al que llama Snepil. Lleva monedas con la efigie de Helka; compra comida tras al menos tres días sin comer, paga información y silencio al vendedor y obtiene su cuchilla. Busca un Galdurman o una bruja Seiðr para realizar un akáll, cuya finalidad concreta aún no explica. Se toca repetidamente una bolsa del cinturón, de contenido no revelado. Svik le niega contratar a Vol, que solo sirve a los Bloodsworn. Al ver la prueba de reclutamiento, Varg termina ofreciéndose a luchar contra Einar Medio-Trol. El vendedor de comida se traza una runa en el pecho cuando pregunta por una bruja Seiðr o un Galdurman. En Liga observa desembarcar a personas que una trabajadora portuaria identifica como procedentes de Iskidan. Llevan caftanes, gorros de fieltro y piel y ropas de colores; sus escoltas usan armadura laminar y espadas curvas. Cree oír caballos dentro de un knarr, mientras otros dos barcos semejantes se aproximan. LIBRO 1, CAPÍTULO 4: Rechaza un escudo porque nunca ha usado uno; la guerrera rubia lo anuncia como Varg No-Sense (Sin-Sentido). Su experiencia de pugilista comenzó luchando por comida para Frøya enferma y continuó en combates que enriquecieron a Kolskegg. Golpea y hace arrodillarse a Einar, pero se lesiona la mano contra su protección y termina inconsciente tras morderle la pantorrilla. Despierta de noche junto al fiordo, con heridas en cabeza y mano y posibles costillas rotas. Encuentra la capa doblada, con la cuchilla, las monedas y la llave; conserva también su bolsa del cinturón, cuyo contenido sigue sin revelarse. Se quita el collar y acampa entre los pinos. Llora a su hermana Frøya, muerta, y revela que busca ayuda mágica para vengarla. Según le contó Kolskegg, sus padres los vendieron por un pan y doce huevos de pato cuando tenían cinco y cuatro inviernos. Decide seguir buscando un Galdurman o una bruja Seiðr por Vigríð, y si hace falta cruzar a Iskidan y recorrer los Shattered Realms (Reinos Fragmentados). Leif lo captura con su gente: Varg hiere con la cuchilla a dos atacantes y sostiene que ganó su libertad, pero el padre de Leif quebrantó su juramento. Leif le roba las monedas, lo corta con la lanza y se dispone a amputarle una mano. Lo rescatan el guerrero calvo de barba gris, la mujer canosa con dos perros, Einar y Svik. El calvo declara que Varg ya pertenece a los Bloodsworn. No se muestra todavía un juramento de ingreso. LIBRO 1, CAPÍTULO 11: Despierta en el salón de Logur tras seis días de fiebre por la herida de Leif, ahora cosida y cauterizada. Recuerda al guerrero calvo ofreciéndole cuero para morder durante la cura; Svik y Røkia lo identifican como Glornir, jefe de los Bloodsworn. Conserva collar, cuchilla y bolsa; comprueba el contenido de esta sin revelarlo. La mano, las costillas y el rostro duelen mucho menos, aunque sigue débil y la herida del costado aún tira. Svik explica que su forma de perder, no una victoria sobre Einar, justificó su admisión. Varg reconoce una deuda por el rescate y la mano salvada. Busca a Vol para vengar a su hermana, pero no la encuentra y Røkia aplaza sus preguntas para entrenarlo por orden de Glornir. Aprende a separar el escudo del torso y sujetarlo con el antebrazo; su experiencia de pugilista le da equilibrio y aprende con rapidez. Subestima la defensa en movimiento: Røkia lo corta en el hombro y acaba con la punta en su garganta. Acepta que necesita aprender. Ve al jefe entrenar con un guerrero de piel oscura, trenza negra, caftán gris, vendas de pierna y espada curva, cuyo aspecto le resulta familiar; el hombre no recibe nombre.",
        star: "★★ La laguna de memoria al matar a Snepil, la resistencia al correr y la bolsa que protege quedan sin explicación. El capítulo termina antes de su combate con Einar. CAPÍTULO 4: La pertenencia declarada por el rescatador abre el acceso a la compañía de Vol; no se ha realizado el akáll. CAPÍTULO 11: La mejoría de mano, costillas y rostro tras seis días es una observación, sin causa sobrenatural confirmada. El guerrero anónimo le resulta familiar; se conserva como indicio junto a pasado-varg, sin identificarlo ni vincularlo de forma confirmada con Iskidan."
    },
    {
        id: "svik", label: "Svik Hrulfsson", group: "VARG", type: "Personaje — Bloodsworn",
        status: "updated",
        previousState: "Añade los cuidados de Varg y su explicación del reclutamiento.",
        desc: "LIBRO 1, CAPÍTULO 2: Guerrero esbelto de cabello rojo cuidadosamente trenzado y barba recortada y aceitada. Lleva una buena cota de malla y un seax decorado. Se presenta como Svik Hrulfsson, apodado Tangle-Hair por no llevar nunca el pelo enredado. Pide el nombre de Varg a la entrada de la prueba, bromea sobre sus motivos para buscar magia y reconoce la seriedad de un akáll. Rechaza dejarle contratar a Vol: sus talentos se reservan a la compañía. Explica que Einar combate sin escudo para dar alguna oportunidad a los aspirantes. LIBRO 1, CAPÍTULO 4: Bromea con que Varg no tiene nombre antes del combate. Participa en su rescate de Leif: esquiva una lanza, desliza el seax por el asta y corta los dedos del atacante, al que derriba de un cabezazo. Después emite un gruñido animal que hace retroceder a la perra de Orl; el gesto observado no confirma ninguna ascendencia sobrenatural. LIBRO 1, CAPÍTULO 11: Ayuda a Varg a incorporarse, le da queso, cerveza rebajada y gachas con miel y le cuenta los seis días de fiebre. Asegura que nadie ha tocado sus pertenencias. Explica que todos perdieron contra Einar y que importó cómo Varg luchó. Llama a Glornir Gold-Giver (Dador de Oro), su apodo favorito. Intercambia pullas con Røkia y observa divertido el comienzo de la lección. Afirma que los pavos reales proceden del sur de Iskidan, más allá de Gravka.",
        star: ""
    },
    {
        id: "einar", label: "Einar Medio-Trol", group: "VARG", type: "Personaje — Bloodsworn",
        status: "updated",
        previousState: "Añade la secuela de la mordedura y su entrenamiento.",
        desc: "LIBRO 1, CAPÍTULO 2: Svik lo llama Einar Half-Troll, aquí Medio-Trol. Es enorme, de barba roja trenzada hasta la cintura y musculatura comparable a raíces de roble. Combate sin camisa ni escudo contra los aspirantes. Varg lo ve resistir golpes, romper un escudo de un puñetazo y alzar y arrojar al suelo a su rival, que queda inconsciente. Apenas muestra unas marcas tras al menos veinte combates. Su apodo no demuestra ascendencia de trol. LIBRO 1, CAPÍTULO 4: Aconseja a Varg permanecer en el suelo cuando caiga. Varg consigue hacerlo arrodillarse con golpes a la espalda y la pierna, pero Einar lo derrota hasta dejarlo inconsciente; Varg le muerde la pantorrilla y le arranca un grito. Lleva una protección dura como hierro fabricada por Jökul que inutiliza el golpe de Varg a la entrepierna. Esa noche interviene en el rescate de Varg, sale entre los árboles y arroja a uno de los hombres de Leif de un puñetazo. LIBRO 1, CAPÍTULO 11: Según Svik, aún cojea por la mordedura de Varg seis días después. Varg lo ve entrenar contra dos guerreros de Logur a la vez, con un escudo enorme y un hacha.",
        star: "★ Varg acepta enfrentarse a él al cerrar el capítulo; todavía no han luchado. CAPÍTULO 11: El duelo pendiente en la nota del capítulo 2 ya terminó en el capítulo 4: Einar venció. La cojera se atribuye a Svik; no demuestra parentesco con troles."
    },
    {
        id: "bloodsworn", label: "Bloodsworn (Hermanos de Sangre)", group: "VARG", type: "Facción — Compañía mercenaria",
        status: "updated",
        previousState: "Identifica al jefe y aclara la admisión y formación de Varg.",
        desc: "LIBRO 1, CAPÍTULO 2: Compañía famosa en Vigríð y, según Varg, probablemente más allá. Se alquila al mejor postor para cazar Vaesen, buscar reliquias divinas, intervenir en disputas fronterizas o proteger a los poderosos. Llegó a Liga el día anterior y es huésped de Jarl Logur. Sus escudos negros llevan salpicaduras rojas. Cuenta con la bruja Seiðr esclava Vol. Tras la muerte de uno de sus miembros, celebra una prueba de armas para cubrir un puesto en su drakkar; Einar combate con los aspirantes y Svik controla el acceso. LIBRO 1, CAPÍTULO 4: Una guerrera rubia ofrece un escudo a Varg y lo anuncia como Varg No-Sense al rechazarlo. Einar lo deja inconsciente en la prueba. Más tarde el guerrero calvo de barba gris, una mujer canosa con dos perros, Einar y Svik lo salvan de Leif. Ante la reclamación de propiedad y weregild de Leif, el calvo declara que Varg es ahora uno de los Bloodsworn. Ninguno de los dos rescatadores anónimos recibe nombre en este capítulo. LIBRO 1, CAPÍTULO 11: Su jefe recibe nombre: Glornir. Ordena que Røkia enseñe a Varg a combatir con escudo, conocimiento que ella considera indispensable para pertenecer a la compañía. Svik explica que la prueba no exigía vencer a Einar, sino mostrar cómo se afrontaba la derrota. Sus guerreros entrenan en el patio junto a hombres de Logur.",
        star: ""
    },
    {
        id: "iskidan", label: "Iskidan", group: "LUGAR", type: "Lugar — Tierra al sur del mar",
        status: "updated",
        previousState: "Añade la referencia geográfica de Svik sobre los pavos reales.",
        desc: "LIBRO 1, CAPÍTULO 2: Tierra muy lejana al sur, al otro lado del mar. Los relatos conocidos por Varg hablan de grandes ríos, llanuras herbosas, sol intenso y la ciudad de Gravka. LIBRO 1, CAPÍTULO 10: Según Sigrún, es un vasto reino gobernado desde Gravka por el emperador Kirill. Virk afirma haber visto allí más esclavos que libertos y sacrificios de niños, y acusa al régimen de sostenerse sobre una matanza. Sigrún disputa su testimonio; esas denuncias no quedan resueltas. LIBRO 1, CAPÍTULO 11: Svik sitúa los pavos reales en el sur de Iskidan, más allá de Gravka; se conserva como información atribuida a él.",
        star: ""
    },
    {
        id: "akall", label: "Akáll de Varg", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Registra el nuevo intento de encontrar a Vol sin dar por cumplido el objetivo.",
        desc: "LIBRO 1, CAPÍTULO 2: Varg busca un Galdurman o una bruja Seiðr que realice una invocación. Todavía no revela su finalidad ni consigue que se practique el rito. LIBRO 1, CAPÍTULO 4: Varg revela que busca ayuda mágica para vengar a Frøya. Su incorporación a los Bloodsworn lo acerca a Vol, pero el akáll sigue pendiente. LIBRO 1, CAPÍTULO 11: Varg insiste en hablar con Vol para cumplir su propósito de venganza. Røkia dice que Vol no está allí, no explica dónde y antepone el entrenamiento ordenado por Glornir. No se realiza la invocación ni se consuma la venganza. ESTADO: PARCIAL; se conoce el propósito, pero el acceso efectivo a Vol y el rito siguen pendientes.",
        star: ""
    },
    {
        id: "bolsa-varg", label: "Contenido de la Bolsa de Varg", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Añade la comprobación de la bolsa tras la fiebre.",
        desc: "LIBRO 1, CAPÍTULO 2: Varg protege una bolsa de su cinturón y la toca repetidamente. Su contenido y su importancia permanecen sin revelar. LIBRO 1, CAPÍTULO 11: Al despertar, Varg busca de inmediato la bolsa, abre el cierre y palpa su interior con alivio. Svik asegura que sus pertenencias no han sido tocadas. El contenido sigue sin mostrarse. ESTADO: ABIERTA; se reafirma su importancia sin revelar qué guarda.",
        star: ""
    },
    {
        id: "pasado-varg", label: "Orígenes y Recuerdos de Varg", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Conserva la impresión de familiaridad sin inventar una identidad.",
        desc: "LIBRO 1, CAPÍTULO 2: Varg desconoce a sus padres y no sabe su edad con certeza. El recuerdo de haber estrangulado a Snepil emerge de una niebla roja; no recuerda cómo llegó a rodearle el cuello con las manos. Esas lagunas siguen abiertas. LIBRO 1, CAPÍTULO 11: En el patio, un guerrero anónimo de piel oscura y trenza negra que entrena con Glornir le resulta familiar. Es una impresión de Varg, no una identificación ni una explicación de su pasado o de la niebla roja. Véase también la observación de su recuperación en varg, sin causa confirmada. ESTADO: ABIERTA; sus orígenes y lagunas no se resuelven.",
        star: ""
    },
    {
        id: "prueba-armas-liga", label: "Prueba de Armas de Liga", group: "EVENTO", type: "Evento — Reclutamiento Bloodsworn",
        status: "updated",
        previousState: "Aclara el criterio de admisión sin alterar el resultado del duelo.",
        desc: "LIBRO 1, CAPÍTULO 2: La compañía busca reemplazar a un miembro muerto mediante combates ante el salón de Jarl Logur. Una aspirante anónima explica a Varg el puesto vacante y le obliga a esperar turno. Cincuenta o sesenta guerreros rodean el espacio; salen aspirantes heridos o inconscientes. Einar combate sin escudo y vence al rival que Varg observa. Tras el rechazo de Svik a contratar a Vol, Varg anuncia que luchará contra Einar. El resultado queda pendiente. LIBRO 1, CAPÍTULO 4: Varg combate sin escudo, pues no sabe usarlo; la guerrera rubia lo anuncia como Varg No-Sense. El público apuesta sobre su derrota. Sus puños no detienen a Einar y se lesiona contra la protección de Jökul. Consigue hacerlo caer sobre una rodilla y morderle la pantorrilla antes de quedar inconsciente. Al despertar fuera de Liga cree haber fracasado; solo al final del posterior rescate el calvo declara su pertenencia a la compañía. LIBRO 1, CAPÍTULO 11: Svik aclara retrospectivamente que todos perdían contra Einar: lo decisivo para admitir a Varg fue cómo perdió. Einar todavía cojea por su mordedura, según Svik. La derrota no equivalía al fracaso de la prueba.",
        star: ""
    },
    {
        id: "rokia", label: "Røkia", group: "VARG", type: "Personaje — Bloodsworn e instructora",
        desc: "LIBRO 1, CAPÍTULO 11: La guerrera rubia que había ofrecido un escudo a Varg en la prueba recibe este nombre. Es directa, severa y peligrosa; desprecia las bromas de Svik. Obedece la orden de Glornir de entrenar a Varg incluso mientras este se recupera. Enseña combate individual antes de la formación de muro: postura, separación del escudo respecto al cuerpo, apoyo del antebrazo, uso ofensivo del borde y el umbo y defensa sin perder de vista al rival. Reconoce su equilibrio y prueba su agarre con golpes crecientes; cuando Varg subestima lo que falta, lo supera con fintas y movimiento, le corta superficialmente el hombro y le coloca la lanza en la garganta hasta que acepta aprender. Dice que Vol está ausente, sin aclarar su paradero.",
        star: ""
    },
    {
        id: "glornir", label: "Glornir", group: "VARG", type: "Personaje — Jefe de los Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 11: Svik y Røkia identifican como Glornir al guerrero calvo de barba gris que rescató a Varg de Leif y declaró su pertenencia a la compañía en el capítulo 4. Es el jefe de los Bloodsworn, llamado Shield-Breaker (Rompe-Escudos); Svik prefiere Gold-Giver (Dador de Oro). Varg lo recuerda ofreciéndole cuero para morder durante el tratamiento de su herida, y Svik le atribuye haberle salvado la vida. Ordena a Røkia iniciar su formación con escudo. Varg lo ve entrenar en el patio con un guerrero de piel oscura y espada curva, todavía anónimo.",
        star: ""
    },
    {
        id: "entrenamiento-varg", label: "Primera Lección de Escudo de Varg", group: "EVENTO", type: "Evento — Instrucción Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 11: En el patio del salón de Logur en Liga, seis días después de que Varg fuera herido por Leif, Røkia inicia su entrenamiento por orden de Glornir. La lección pasa de postura y defensa estática a fintas y desplazamientos. Varg aprende pronto los fundamentos, pero su exceso de confianza termina con un corte en el hombro y una punta en la garganta. Svik observa; Varg acepta seguir aprendiendo. La enseñanza del manejo de la lanza y el combate en muro de escudos no se completa en esta escena.",
        star: ""
    },

// ── LIBRO 1, CAPÍTULO 12 — ORKA ──
    {
        id: "virk", label: "Virk (†)", group: "ORKA", type: "Pescador — Fallecido",
        status: "updated",
        previousState: "Vence en el intercambio de armas, pero muere al intentar prolongar el duelo.",
        desc: "LIBRO 1, CAPÍTULO 3: Pescador de Fellur que ha comerciado muchas veces con Orka y Thorkel. Alto, corpulento y franco. Se recupera de una lesión en el brazo sufrida durante una tormenta y sus dos hijos, aún sin nombre, salen a pescar por él. Sale de la taberna con olor a alcohol. Critica que los antiguos jarls se hagan llamar reyes y rechaza que la sumisión a Helka se disfrace de cuidados. Afirma haber oído antes casos de niños llevados; no identifica responsables. LIBRO 1, CAPÍTULO 10: Lleva a Orka y su familia al islote con sus hijos Mord y Lif; rechaza cobrarles, pidiendo buen trato al comprar pieles. Dice que Guðvarr solo envió exploradores al río, sin barcos ni perros, y que los libertos Asgrim e Idrun tenían derecho a justicia. Detalla los raptos de Howbyr y Kergarth y propone perseguir a los culpables. Insinúa experiencia de combate anterior a su oficio de pescador; Orka reconoce en él una violencia contenida. Rechaza tributos y pérdida de autonomía bajo Helka. Afirma haber navegado y visto la esclavitud masiva y los sacrificios de niños de Iskidan; Sigrún lo desacredita como relato o fantasía de borracho. Acusa a Guðvarr de incumplir sus deberes y lo ridiculiza. Acepta el holmganga que este le propone. Pide a Orka ser su segunda porque teme que sus hijos intenten vengarlo sin poder vencer a un drengr; si muere, le encarga contenerlos y ponerle el hacha en la mano para el camino del alma. El combate aún no empieza. LIBRO 1, CAPÍTULO 12: Acepta combatir hasta la rendición. Pese al dolor del brazo lesionado, desvía la espada de Guðvarr y lo hiere de un hachazo en el hombro; el drengr cae fuera del cuadrado. Tras exigirle que se rinda, pierde el control cuando este lo insulta e intenta matarlo. La guerrera esclavizada de Sigrún se abalanza sobre él, lo apuñala repetidamente y lo mata, después le desgarra el rostro con los dientes. Sus hijos y la familia de Orka envuelven y retiran su cadáver.",
        star: "★ Su comentario sitúa la desaparición de Harek dentro de un posible patrón."
    },
    {
        id: "gudvarr", label: "Guðvarr", group: "ORKA", type: "Personaje — Drengr",
        status: "updated",
        previousState: "Es derrotado y herido; sobrevive a la muerte de Virk.",
        desc: "LIBRO 1, CAPÍTULO 3: Joven sobrino y drengr de Jarl Sigrún. Llega por el río en una snekke y transmite su regreso dentro de nueve días y su recomendación de jurar lealtad a Helka. Lleva espada, túnica roja bordada y brazalete de plata; cabello negro aceitado y barba incipiente. Invoca la amenaza de Störr y de los vaesen. Atribuye a estos la muerte de Asgrim e Idrun y se burla de Orka; cuando ella lo desmiente, la amenaza con tres guerreros a su espalda. Tras el regreso de Thorkel promete investigar. Afirma que los vaesen se están volviendo más audaces y que asesinan y roban; esa acusación no confirma que sean responsables de la matanza. LIBRO 1, CAPÍTULO 8: Llega a caballo a la granja de Orka y Thorkel con dos mujeres drengr, una de ellas Arild; lleva espada y una buena cota de malla. Anuncia que Sigrún ya ha regresado y convoca el Althing dentro de seis días en la Roca del Juramento del fiordo. Dice que tratará asuntos serios y quiere presentes a todos los habitantes de sus dominios. Aprueba la respuesta de Arild, que exige asistir o abandonar el territorio. Rechaza comida y descanso porque les quedan otras tres granjas por visitar antes de volver a Fellur. Thorkel teme que comente su ausencia si no van. LIBRO 1, CAPÍTULO 10: Asiste al Althing entre los drengrs de su tía. Según Virk, limitó la búsqueda a exploradores junto al río, sin barcos ni perros. Sigrún dice que él le informó del crimen y sostiene que hizo todo lo posible; Virk lo niega. Al ser ridiculizado por su incompetencia y su nariz goteante, desafía a Virk a holmganga. Insiste en que el desafío público ante jarl, comunidad y piedra no se puede retirar, pese a la orden de Sigrún de detenerse. Virk acepta; el duelo queda pendiente. LIBRO 1, CAPÍTULO 12: Con Arild como segunda, elige combatir hasta la rendición y Virk acepta. Orka aprecia técnica aprendida en entrenamiento, pero juzga que carece de experiencia real y se deja dominar por la ira. Virk lo hiere gravemente en el hombro, cortando músculo a través de la cota; cae fuera de las varas y reclama el límite de rendición. Sigue insultando a Virk, que alza el hacha para matarlo. Sobrevive a la intervención de la esclava de Sigrún. Arild le venda el hombro; amenaza con retar también a Lif y su tía lo manda callar.",
        star: "★ Su autoridad y arrogancia amenazan con convertir una petición de ayuda en violencia."
    },
    {
        id: "sigrun", label: "Jarl Sigrún", group: "ORKA", type: "Personaje — Jarl",
        status: "updated",
        previousState: "Someter a su esclava y justificar la muerte de Virk expone su autoridad y su fallo de control.",
        desc: "LIBRO 1, CAPÍTULO 3: Gobernante de Fellur y tía de Guðvarr. Según Virk lleva más de dos meses ausente, convocada —palabra que corrige por invitada— a la corte de Helka en Darl. Su sobrino anuncia su regreso dentro de nueve días y transmite que recomienda someterse a Helka. Convocará un Althing en la Roca del Juramento de Fellur para debatirlo. No aparece en persona. LIBRO 1, CAPÍTULO 8: Según Guðvarr, ya ha regresado y ha convocado un Althing en la Roca del Juramento del fiordo para dentro de seis días. Quiere que acudan todos los habitantes de su dominio para escuchar asuntos serios. Arild presenta la asistencia como condición para permanecer bajo su protección. Sigrún no aparece en la escena; no se conoce todavía su discurso ni la decisión de la asamblea. LIBRO 1, CAPÍTULO 10: Se presenta en persona ante la piedra con unos veinticuatro drengrs, entre ellos Guðvarr y Arild, y una guerrera esclavizada sin nombre, de cabeza parcialmente rapada y tatuada, dos seaxes y collar. Lleva ocho años gobernando Fellur y ha ampliado sus tierras atrayendo guerreros con promesas de tierras y rango. Muestra la herida reciente que selló con sangre su juramento a Helka. Justifica la decisión por las amenazas de Störr, Orlyg y la propia Helka; admite impuestos y juramentos, y concede ante Orka que podría haber una leva. Usa Iskidan como ejemplo de unificación política. Afirma haber visto los drakkars, la hueste y las alas de Orna sobre la fortaleza de Darl, y confía en la victoria de Helka. Desestima las denuncias de Virk sobre Iskidan y defiende la actuación de su sobrino. No logra frenar su desafío a Virk; manda elegir segundos y preparar las varas de avellano antes de reanudar la reunión. LIBRO 1, CAPÍTULO 12: Ratifica el duelo hasta la rendición. Tras la intervención de su esclava declara que le ordenó detener a Virk, no matarlo. La somete con palabras de mando y dolor provocado por el collar, hasta que la mujer pide clemencia y se postra a sus pies. Rechaza la petición de justicia de Mord: sostiene que Virk quebrantó el holmganga al intentar matar a Guðvarr después de su rendición, aunque la escena muestra a este invocando el límite pactado sin pronunciar la fórmula que Virk exigía. Ordena retirar el cadáver y suspende el Althing para que la familia atienda al muerto.",
        star: ""
    },
    {
        id: "arild", label: "Arild", group: "ORKA", type: "Personaje — Drengr de Sigrún",
        status: "updated",
        previousState: "Es segunda de Guðvarr y atiende su herida.",
        desc: "LIBRO 1, CAPÍTULO 8: Una de las dos mujeres drengr que acompañan a Guðvarr a caballo hasta la granja de Orka y Thorkel. Es alta y fibrosa, de cabello castaño trenzado y rostro anguloso; las mujeres llevan cuero hervido y lana, gorros de fieltro y piel, y lanzas. Declara que quien elija vivir en el dominio de Sigrún, bajo su protección, debe asistir al Althing o buscar otro lugar donde vivir. Guðvarr aprueba sus palabras. La otra mujer permanece sin nombre. LIBRO 1, CAPÍTULO 12: Actúa como segunda de Guðvarr, le susurra antes del duelo y le entrega el escudo. Después de su derrota le venda el hombro herido.",
        star: ""
    },
    {
        id: "mord", label: "Mord", group: "ORKA", type: "Personaje — Hijo de Virk",
        status: "updated",
        previousState: "El hijo mayor reclama justicia por la muerte de su padre.",
        desc: "LIBRO 1, CAPÍTULO 10: Hijo de Virk y hermano de Lif. Rema junto a su padre y su hermano para llevar a Orka y su familia a la asamblea. Ambos hijos apoyan las objeciones de Virk a la sumisión a Helka. Según su padre, tiene cierta destreza con las armas, pero no puede vencer a un drengr. Su padre teme que intente vengarlo si muere en el duelo y encarga a Orka impedirlo. LIBRO 1, CAPÍTULO 12: Se identifica como el mayor de los hijos de Virk. Presencia el combate y llora junto al cadáver de su padre. Pide justicia a Sigrún, que la deniega alegando que Virk quebrantó el duelo. Con Lif, Orka y Thorkel envuelve y transporta el cuerpo fuera del claro.",
        star: ""
    },
    {
        id: "lif", label: "Lif", group: "ORKA", type: "Personaje — Hijo de Virk",
        status: "updated",
        previousState: "El hijo menor protesta por la provocación y recibe una amenaza.",
        desc: "LIBRO 1, CAPÍTULO 10: Hijo de Virk y hermano de Mord. Rema junto a su padre y su hermano para llevar a Orka y su familia a la asamblea. Ambos hijos apoyan las objeciones de Virk a la sumisión a Helka. Según su padre, tiene cierta destreza con las armas, pero no puede vencer a un drengr. Su padre teme que intente vengarlo si muere en el duelo y encarga a Orka impedirlo. LIBRO 1, CAPÍTULO 12: Se identifica como el menor de los hijos de Virk. Ante la muerte de su padre replica que Guðvarr lo provocó, llamando níðing al drengr; este amenaza con desafiarlo también a holmganga, hasta que Sigrún lo silencia. Llora con Mord y ayuda con Orka y Thorkel a envolver y retirar el cadáver.",
        star: ""
    },
    {
        id: "orka", label: "Orka", group: "ORKA", type: "Personaje — Madre y cazadora",
        status: "updated",
        previousState: "La muerte de Virk y la herida de Thorkel desatan otra pérdida de control.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposa de Thorkel y madre de Breca. Tiene cabello rubio trenzado y ojos gris verdosos, heredados por su hijo. Durante una cacería considera que la ternura de Breca lo deja indefenso ante un mundo cruel; contiene una reprimenda cuando Thorkel le pide esperar. Extrae del árbol la lanza del niño y más tarde reconoce que su lanzamiento fue bueno. Lidera la marcha hacia los gritos procedentes de la granja de Asgrim y adapta su paso al de Breca. La proximidad del peligro la estimula; la sangre del lobo le provoca imágenes de cuerpos despedazados y voces gritando, que aparta con ayuda del contacto de Thorkel. Explica que la caída de Snaka abrió el foso de los vaesen. Ante el cadáver de Asgrim le coloca el hacha en la mano para que recorra el camino del alma armado. Deduce que murió rápidamente por una estocada al corazón, identifica el saqueo de sus dientes como obra de tennur y encuentra indicios de otro herido arrastrado. Las runas protectoras y el uso de armas hacen sospechar una agresión humana, sin confirmar todavía a los responsables. Cuestiona el nombre de Edad de la Paz ante la matanza. LIBRO 1, CAPÍTULO 3: Lleva con Breca los cuerpos de Asgrim e Idrun a Fellur mientras Thorkel rastrea a los asesinos. Prefería seguirlos ella, pero reconoce que su esposo es mejor rastreador. Siente presión en la cabeza y el pecho bajo el nudillo de dios de la puerta; disminuye al alejarse. Desmiente a Guðvarr: la estocada de espada no corresponde a dientes ni garras de vaesen. Al recibir sus amenazas revive imágenes de violencia, tiembla y lucha por contenerse ante Breca. La llegada de Thorkel permite cortar la confrontación. Quiere entregar los muertos a sus parientes para que reciban un túmulo, pero termina marchándose con su familia: considera que esta lucha no les corresponde. Guðvarr se burla preguntándole si es una bruja Seiðr capaz de ver el pasado; ella responde que basta reconocer una herida de espada. No demuestra magia ni confirma esa identidad. LIBRO 1, CAPÍTULO 6: Despierta empapada en sudor tras revivir una batalla, con el mar, cuerpos y gritos. Oculta su angustia a Thorkel; desea alcohol para amortiguar los recuerdos y resiente que él le haya pedido beber menos. Al descubrir vacía la cama de Breca lo busca con su lanza, interroga a Spert y teme otro rapto al recordar las palabras de Virk y la desaparición de Harek. Sigue a Thorkel hacia el nordeste, remontando el arroyo, y contiene con esfuerzo imágenes violentas y una ira que sabe inútil para encontrar al niño. Abraza y besa a Breca al hallarlo junto a una poza. Le sorprende la posible presencia de un Näcken tan lejos de su río de montaña, pero la preocupación por su hijo desplaza esa observación. Al ver al tennur herido que sostiene, golpea a Breca en la mejilla y le deja una hinchazón amoratada; lo reprende por abandonar la seguridad de la granja y levanta la mano de nuevo. Thorkel la detiene. Orka piensa que podría vencer su resistencia, pero acepta el juicio de su esposo, en quien ha aprendido a confiar especialmente cuando la domina la ira. Descubre que el niño ha dado un diente a la criatura y que esta se llama Vesli. LIBRO 1, CAPÍTULO 8: Afila su seax mientras vigila a Breca y a Vesli, ahora acogida en la granja. Defiende educar al niño para sobrevivir sin sus padres, pero admite compartir el deseo de protegerlo del sufrimiento. Reconoce que ella y Thorkel han combatido juntos y cometido actos terribles; no logra desprenderse del pasado y envidia la fortaleza emocional de él. Lo llama Thorkel Ulfsson. Se confirma que fue ella quien capturó y vinculó a Spert años atrás: las gachas que le da Breca contienen sangre y saliva de Orka. La posibilidad de tener otro hijo da paso a la alarma por unos jinetes. Toma su lanza y, al ver el hacha larga de Thorkel, revive gritos y la imagen de un guerrero entre llamas, sin identificarlo. Reconoce a los visitantes y juzga que no serían capaces de matar a Asgrim e Idrun. Rechaza involucrarse en disputas de jarls y reinas, pero acepta ir al Althing de Sigrún para no llamar la atención; el presentimiento de Thorkel la deja asustada. LIBRO 1, CAPÍTULO 10: Acude con Thorkel y Breca a la Roca del Juramento en la barca de Virk y sus hijos. El drakkar de Sigrún despierta su entusiasmo guerrero. Al oír que adorar a los dioses se castiga con la muerte recuerda a una mujer en una jaula de hierro, con cuervos picoteándole ojos y lengua; no se identifica a la mujer. Virk le cuenta otros raptos y la escasa búsqueda de Harek; Orka sospecha que unos níðing venden niños como esclavos, sin pruebas de sus identidades ni del motivo. Teme por Breca. La guerrera esclavizada y aún sin nombre de Sigrún le provoca inquietud por su mirada despiadada y su desesperanza. Reconoce la franqueza de Sigrún al admitir la inferioridad frente a Helka, pero prevé guerras de conquista. Rompe su propósito de pasar inadvertida y denuncia que Helka exigirá una leva de guerreros, no solo impuestos. Pese a la desaprobación de Thorkel, acepta ser segunda de Virk: si muere, deberá contener a sus hijos y ponerle el hacha en la mano. LIBRO 1, CAPÍTULO 12: Es segunda de Virk y le aconseja herir pronto a Guðvarr. Explica a Breca las reglas del duelo. Intenta impedir que Virk mate al drengr, pero la esclava de Sigrún llega antes y mata al pescador. Se lanza hacia ella para impedir que siga mutilando a Virk: considera que este luchó bien y no merece esa deshonra. Cuando Thorkel resulta herido, una furia blanca la impulsa a atacar; él la sujeta y su voz la ayuda a serenarse mientras Breca llora. Comprueba la herida de su esposo y ayuda a los hijos de Virk a retirar el cuerpo. Al marcharse ve a la esclava lamer la sangre de uno de sus seaxes.",
        star: "★★ Su reacción a la sangre sugiere una experiencia de violencia anterior que el capítulo no explica. La dureza con Breca convive con gestos de protección y respeto a los muertos. CAPÍTULO 6: Los recuerdos de batalla y la necesidad de alcohol agravan su angustia; el miedo por Breca desemboca en violencia contra él. CAPÍTULO 8: La paz familiar convive con recuerdos intrusivos de violencia y el miedo al futuro político. CAPÍTULO 12: La furia blanca al ver herido a Thorkel y el efecto calmante de su voz prolongan el indicio de los capítulos 1, 6 y 8; véase pasado-orka. La causa no queda explicada."
    },
    {
        id: "thorkel", label: "Thorkel", group: "ORKA", type: "Personaje — Padre y cazador",
        status: "updated",
        previousState: "Detiene la mutilación, resulta herido y calma a Orka.",
        desc: "LIBRO 1, CAPÍTULO 1: Esposo de Orka y padre de Breca. Hombre enorme, de cabello negro con canas y barba trenzada; una cicatriz desde la mejilla hasta la mandíbula tuerce su sonrisa. Pide paciencia ante la vacilación del niño durante la caza. Tras el paso de un fell-wolf herido prueba una gota de su sangre y sigue su rastro con la mirada; el texto no explica el gesto. Consuela a Breca por el tiro fallido y pide un descanso para sus piernas cortas. Relata cómo Snaka fue muerto por sus hijos y sus restos formaron las montañas de Vigríð. Toca el hombro de Orka cuando queda atrapada en imágenes de violencia. En la granja de Asgrim detecta una runa protectora y se pregunta si la matanza fue obra de hombres. LIBRO 1, CAPÍTULO 3: No encuentra a Harek en la granja. Sigue el rastro de los asesinos por el bosque tras prometer que regresará sin enfrentarse solo a ellos si los descubre; Orka teme que no cumpla esa promesa por salvar al niño. El rastro acaba en un afluente del Skarpain, con señales de tres barcas en la orilla. No encuentra a los fugitivos. Regresa a Fellur durante el enfrentamiento de Orka con Guðvarr; su propia ira se suaviza cuando ella le habla de enterrar a los muertos. LIBRO 1, CAPÍTULO 6: Encuentra la huella de Breca junto al portillo de la granja y el cerrojo abierto, sin señales de otra persona. Con seax y hacha de mano, sigue el rastro hacia el nordeste y remonta el arroyo hasta una poza de la que nace. Al hallar al niño pide que se aparte del agua: dice que huele a Näcken y clava su seax en la tierra blanda; no se muestra ninguna criatura acuática ni el efecto de este gesto. Identifica como tennur a la criatura herida. Sujeta la muñeca de Orka para impedir que vuelva a pegar a Breca y le dice que ya ha dejado claro su reproche. También reprende al niño por el peligro y le pregunta cómo encontró a la criatura. Silba al oír que se llama Vesli y se ríe cuando Breca pide quedarse con ella; todavía no responde a la petición. LIBRO 1, CAPÍTULO 8: Ha permitido que Breca se quede con Vesli. Recuerda que, a la edad de su hijo —diez inviernos—, llevaba collar de esclavo y había sido azotado. Quiere dejarlo disfrutar de la infancia. Él y Orka viven libres, dueños de su granja, sin juramentos ni vínculos que los aten. Explica que cada día elige concentrarse en su esposa y su hijo en vez de en el pasado; propone tener otro hijo. Orka lo llama Thorkel Ulfsson. Afirma que Spert los protege eficazmente y que Vesli quedará ligada a Breca por una deuda de sangre si sobrevive, pudiendo acompañarlo cuando sus padres mueran porque los vaesen viven mucho. Al oír caballos toma un hacha larga de su propia altura y adopta una mirada fría: no permitirá que los raptores se lleven a su hijo. Reconoce a Guðvarr y se relaja; ofrece hospitalidad a los mensajeros. Aconseja acudir al Althing sin destacar, escuchar y marcharse, pues ausentarse atraería comentarios de Guðvarr y le inquieta el interés de Helka por Fellur y las colinas. LIBRO 1, CAPÍTULO 10: Explica a Breca que la piedra rúnica fue destruida porque servía para jurar y rendir culto a los dioses, ahora prohibido bajo pena de muerte. Vincula la persecución de sus descendientes al odio de los supervivientes de la Guðfalla. Sugiere que la persistencia del pasado explica celebrar allí la asamblea. Se inquieta ante el anuncio de Sigrún y trata de evitar que Orka se comprometa como segunda de Virk, pero sabe que aceptará. LIBRO 1, CAPÍTULO 12: Interrumpe la mutilación de Virk de una patada que arroja a la esclava varios pasos. La llama «Ulfrir-kin» y dice que el hombre ya está muerto y su tarea ha terminado. Ella lo ataca con dos seaxes; él esquiva y la derriba de un puñetazo, pero recibe un corte en el costado, que califica de arañazo. Sujeta a Orka y la calma repitiendo que es él. Busca sacar del lugar a Mord y Lif para evitar que los maten, cubre a Virk con su capa y ayuda a transportar el cuerpo.",
        star: "★ Su atención a Orka y Breca contrapesa la severidad de ella. El gesto de probar la sangre queda registrado sin atribuirle poderes ni linaje. CAPÍTULO 8: Su optimismo es una elección consciente pese a la esclavitud y los horrores compartidos con Orka."
    },
    {
        id: "breca", label: "Breca", group: "ORKA", type: "Personaje — Hijo de Orka y Thorkel",
        status: "updated",
        previousState: "Presencia el duelo y la muerte de Virk.",
        desc: "LIBRO 1, CAPÍTULO 1: Tiene diez veranos, cabello negro como su padre y ojos gris verdosos como su madre. Vacila al lanzar una lanza contra un reno; el tiro está bien ejecutado, pero un fell-wolf herido espanta la manada y la lanza se clava en un pino. Se culpa por fallar y recibe ánimo de sus padres. Es amigo de Harek, con quien ha jugado en la playa de Fellur durante las visitas de su familia para comerciar. Pide escuchar otra vez la historia de Snaka. Al llegar a la granja ve por primera vez un ser humano muerto, Asgrim, a quien conocía. Pregunta por los dientes ausentes del cadáver y, al final, por el paradero de Harek. LIBRO 1, CAPÍTULO 3: Conduce el poni que arrastra el carro con los cuerpos hasta Fellur; Orka le encarga la tarea para darle algo en que concentrarse. Pregunta si su padre encontrará a Harek y anuncia su desaparición ante Virk y Guðvarr. La espada de Guðvarr lo impresiona. Observa preocupado la confrontación de su madre y le tira de la manga para avisar de la llegada de Thorkel. LIBRO 1, CAPÍTULO 6: Sale solo de la granja al oír los gritos de una criatura herida. Sus padres lo encuentran junto a una poza, con un tennur envuelto en su capa sobre el regazo. Orka primero lo abraza y luego, al ver la criatura, le da un golpe que le hincha y amorata la mejilla. El tennur lo protege extendiendo las alas y siseando; Thorkel impide otro golpe. Breca explica que arrancó uno de sus dientes de leche, ya flojo, y se lo dio porque sus padres le habían contado que a los tennur les gustan los dientes; otro diente está saliendo. Dice que la criatura es hembra y que ella le ha dicho su nombre, Vesli. Pregunta si pueden quedársela, sin obtener aún una respuesta explícita. LIBRO 1, CAPÍTULO 8: Recoge huevos mientras mantiene cerca a Vesli, vendada y acomodada en una carretilla con mantas. Conserva el hematoma del golpe de Orka. Lleva las gachas a Spert y lo detiene cuando amenaza a la tennur; explica que está herida, que su grupo la ha expulsado y que está sola, como antes lo estuvo Spert. Se ríe de que este desconfíe de los vaesen siendo él mismo uno. Presencia el juramento de sangre por el que Vesli promete ser fiel a él y a Spert, a quien llama su guardián. Al llegar los jinetes obedece a Orka y lleva a Vesli en brazos al salón; después se asoma aún sosteniéndola. LIBRO 1, CAPÍTULO 10: Acude entusiasmado a su primer Althing. Le decepciona el tamaño de la roca destruida y pregunta por qué se destruyó algo que alguien quiso construir, por qué se prohíbe el culto y por qué se sigue reuniendo allí la asamblea. Cuando Sigrún menciona a Asgrim e Idrun, añade públicamente el nombre de Harek; Orka siente orgullo por su valor al defender a su amigo. LIBRO 1, CAPÍTULO 12: Pregunta por las varas de avellano y los tres escudos; escucha la explicación del holmganga y desea a Virk que luche bien y no muera. Permanece cerca de sus padres. Ve el ataque de la esclava a Virk con la boca abierta y los ojos muy abiertos; llora llamando a su madre cuando Thorkel contiene su furia. Orka lo toma de la mano al acercarse para ayudar a envolver el cadáver.",
        star: "★★ La cacería presenta su sensibilidad; el hallazgo de la matanza convierte la lección sobre la muerte en una experiencia humana inmediata. CAPÍTULO 6: Su compasión por Vesli recibe una respuesta protectora; el vínculo no explica todavía ninguna capacidad especial."
    },
    {
        id: "holmganga", label: "Holmganga", group: "NORSE", type: "Cultura — Duelo",
        status: "updated",
        previousState: "Se detallan límites, modalidades, escudos y consecuencias jurídicas.",
        desc: "LIBRO 1, CAPÍTULO 8: Duelo. LIBRO 1, CAPÍTULO 10: El desafío público se considera irrevocable y rechazarlo supone perder el honor. Los contendientes eligen segundos y se prepara el terreno con varas de avellano. Los familiares deben respetar el resultado en vez de atacar al vencedor. LIBRO 1, CAPÍTULO 12: Duelo ritual que resuelve disputas sin dar a los parientes del perdedor derecho a reclamar compensación de sangre o venganza. Su nombre significa en la lengua antigua «ir a la isla»: un lugar sin escapatoria facilita resolver el conflicto. Se lucha dentro de un cuadrado delimitado por varas de avellano; un pie fuera significa rendirse y dos, huir. Se disponen tres escudos y el combate se pausa para sustituir uno roto. Los contendientes pactan primera herida, rendición o muerte.",
        star: ""
    },
    {
        id: "collares", label: "Collares de Hierro", group: "MAGIA", type: "Objeto — Collares de sometimiento",
        status: "updated",
        previousState: "Se amplían los mecanismos de coerción observados, sin atribuirles una fabricación u origen.",
        desc: "LIBRO 1, CAPÍTULO 5: Collares de hierro utilizados para someter esclavos mediante órdenes verbales. Su activación produce vetas rojas y puede causar dolor u obligar a obedecer; no se explica su fabricación. «Hlýða» es una de las órdenes observadas. LIBRO 1, CAPÍTULO 7: «HALDA» inmoviliza y «Á HNÉN» obliga a arrodillarse. El sometimiento puede vencer la resistencia de un Berserkir transformado. LIBRO 1, CAPÍTULO 9: La lengua de las órdenes se identifica como Galdur. LIBRO 1, CAPÍTULO 12: Las órdenes pueden hacer caer al sometido y provocar espasmos, además de dolor, acompañados de fulgores rojos en el hierro. «Brenna, sársauki» se emplea como orden dolorosa reiterada para exigir obediencia.",
        star: ""
    },
    {
        id: "althing-fellur", label: "Asamblea de Fellur", group: "EVENTO", type: "Evento — Althing de Sigrún",
        status: "updated",
        previousState: "La muerte de Virk provoca una nueva suspensión.",
        desc: "LIBRO 1, CAPÍTULO 3: Guðvarr anuncia una asamblea en la Roca del Juramento de Fellur cuando vuelva Sigrún. Todos podrán expresar su parecer sobre jurar lealtad a Helka. La reunión todavía no se celebra. LIBRO 1, CAPÍTULO 8: Guðvarr anuncia en la granja de Orka y Thorkel que Sigrún ha regresado y la reunión será dentro de seis días, en la Roca del Juramento del fiordo. Arild exige asistir a quienes vivan bajo su protección o buscar otro lugar donde vivir. Orka y Thorkel deciden ir, escuchar sin destacar y marcharse discretamente; el contenido del discurso y la resolución siguen pendientes. LIBRO 1, CAPÍTULO 10: Cientos de habitantes se reúnen en el islote; hay tiendas en los prados de Fellur porque la reunión puede durar días. Debe asistir al menos un representante de cada familia del territorio. Sigrún anuncia que ya juró a Helka, sin esperar una votación mostrada en escena. Virk y Fálki cuestionan impuestos y pérdida de libertad; Orka advierte de una leva. La discusión sobre los raptos desemboca en un desafío de Guðvarr a Virk y la asamblea se interrumpe para preparar el duelo. LIBRO 1, CAPÍTULO 12: El duelo termina con la muerte de Virk a manos de la guerrera esclavizada de Sigrún. La jarl rechaza la petición de justicia de sus hijos y declara otra pausa para retirar el cadáver y atender los deberes familiares. La multitud levanta las varas y discute acaloradamente mientras queda libre el lugar manchado por la sangre.",
        star: ""
    },
    {
        id: "holmganga-event", label: "Holmganga Virk vs Guðvarr", group: "EVENTO", type: "Evento — Duelo concluido y muerte de Virk",
        status: "updated",
        previousState: "El combate y su desenlace quedan confirmados; se preserva la distinción entre lo observado y el fallo de Sigrún.",
        desc: "LIBRO 1, CAPÍTULO 10: Durante el Althing, Virk acusa a Guðvarr de negligencia en la búsqueda de niños y lo ridiculiza. Guðvarr lo reta y sostiene que no puede retirar el desafío público, pese a la oposición de Sigrún. Virk acepta. La jarl suspende la reunión para elegir segundos y colocar varas de avellano. Orka acepta ser segunda de Virk para contener a sus hijos si pierde y ponerle el hacha en la mano si muere. El capítulo termina antes del combate. LIBRO 1, CAPÍTULO 12: Orka y Arild actúan como segundas de Virk y Guðvarr. Se acuerda luchar hasta la rendición. Virk hiere el hombro de Guðvarr y lo derriba fuera del cuadrado. Este reclama el límite pactado, pero no dice la rendición que Virk exige y lo insulta. Virk intenta asestarle un golpe mortal. La esclava de Sigrún lo intercepta, lo apuñala hasta matarlo y le desgarra el rostro: ojos ámbar, dientes afilados y una rapidez que Orka apenas sigue. Thorkel la aparta de una patada, la llama «Ulfrir-kin» y resulta herido cuando ella vuelve a atacar. Sigrún la derriba y castiga mediante el collar; sus dientes y ojos recuperan su aspecto anterior. La jarl afirma que solo había ordenado detener a Virk y juzga que su muerte satisface la justicia por quebrantar el duelo. Mord y Lif protestan, sin obtener reparación. Orka, Thorkel y ambos hijos retiran el cadáver; la esclava queda junto a Sigrún y lame sangre de su seax.",
        star: ""
    },
    {
        id: "ulfrir", label: "Ulfrir", group: "COSMO", type: "Nombre — Referencia de linaje",
        desc: "LIBRO 1, CAPÍTULO 12: Nombre invocado por Thorkel al llamar «Ulfrir-kin» a la guerrera esclavizada de Sigrún. La expresión la presenta como emparentada con Ulfrir; este capítulo no expone la identidad ni la historia de ese referente.",
        star: ""
    },
    {
        id: "pasado-orka", label: "Pasado y Furia de Orka", group: "TRAMA", type: "Trama — Historia y reacciones sin explicar",
        desc: "PRIMERA EVIDENCIA: LIBRO 1, CAPÍTULO 1, recuerdos violentos desencadenados por la sangre. Los capítulos 3, 6 y 8 añaden amenazas que reavivan la violencia, pesadillas de batalla, deseo de alcohol y una historia de combates terribles compartida con Thorkel; el capítulo 10 añade el recuerdo de una mujer enjaulada no identificada y la sensibilidad previa al hueso de dios permanece sin explicación. LIBRO 1, CAPÍTULO 12: La herida de Thorkel desencadena una furia blanca que él logra apaciguar sujetándola y hablándole. Pregunta pendiente: qué historia explica estos recuerdos y reacciones de Orka. Son observaciones, no prueba de poderes o linaje; véanse orka, thorkel y hueso-dios-fellur. ESTADO: ABIERTA; hay nuevas manifestaciones, sin respuesta a su causa.",
        star: ""
    },

// ── LIBRO 1, CAPÍTULO 13 — VARG ──
    {
        id: "varg", label: "Varg", group: "VARG", type: "Personaje — Nuevo miembro Bloodsworn",
        status: "updated",
        previousState: "Añade la cena, la amistad de Torvik y el respaldo a Sulich.",
        desc: "LIBRO 1, CAPÍTULO 2: Llega a Liga tras nueve o diez días de huida, convencido de que lo persiguen aunque no ve a nadie. Desconoce su edad y a sus padres; recuerda treinta inviernos y veranos de esclavitud en la granja de Kolskegg, veinte leguas al noreste de Liga, río arriba. Corre con una resistencia que él mismo considera casi inagotable. Recuerda haber estrangulado a Snepil, pero no cómo llegó a rodearle el cuello con las manos: el recuerdo emerge de una niebla roja. Se vuelve a poner y cierra con llave el collar de hierro para entrar en Liga fingiendo que busca alojamiento para su amo, al que llama Snepil. Lleva monedas con la efigie de Helka; compra comida tras al menos tres días sin comer, paga información y silencio al vendedor y obtiene su cuchilla. Busca un Galdurman o una bruja Seiðr para realizar un akáll, cuya finalidad concreta aún no explica. Se toca repetidamente una bolsa del cinturón, de contenido no revelado. Svik le niega contratar a Vol, que solo sirve a los Bloodsworn. Al ver la prueba de reclutamiento, Varg termina ofreciéndose a luchar contra Einar Medio-Trol. El vendedor de comida se traza una runa en el pecho cuando pregunta por una bruja Seiðr o un Galdurman. En Liga observa desembarcar a personas que una trabajadora portuaria identifica como procedentes de Iskidan. Llevan caftanes, gorros de fieltro y piel y ropas de colores; sus escoltas usan armadura laminar y espadas curvas. Cree oír caballos dentro de un knarr, mientras otros dos barcos semejantes se aproximan. LIBRO 1, CAPÍTULO 4: Rechaza un escudo porque nunca ha usado uno; la guerrera rubia lo anuncia como Varg No-Sense (Sin-Sentido). Su experiencia de pugilista comenzó luchando por comida para Frøya enferma y continuó en combates que enriquecieron a Kolskegg. Golpea y hace arrodillarse a Einar, pero se lesiona la mano contra su protección y termina inconsciente tras morderle la pantorrilla. Despierta de noche junto al fiordo, con heridas en cabeza y mano y posibles costillas rotas. Encuentra la capa doblada, con la cuchilla, las monedas y la llave; conserva también su bolsa del cinturón, cuyo contenido sigue sin revelarse. Se quita el collar y acampa entre los pinos. Llora a su hermana Frøya, muerta, y revela que busca ayuda mágica para vengarla. Según le contó Kolskegg, sus padres los vendieron por un pan y doce huevos de pato cuando tenían cinco y cuatro inviernos. Decide seguir buscando un Galdurman o una bruja Seiðr por Vigríð, y si hace falta cruzar a Iskidan y recorrer los Shattered Realms (Reinos Fragmentados). Leif lo captura con su gente: Varg hiere con la cuchilla a dos atacantes y sostiene que ganó su libertad, pero el padre de Leif quebrantó su juramento. Leif le roba las monedas, lo corta con la lanza y se dispone a amputarle una mano. Lo rescatan el guerrero calvo de barba gris, la mujer canosa con dos perros, Einar y Svik. El calvo declara que Varg ya pertenece a los Bloodsworn. No se muestra todavía un juramento de ingreso. LIBRO 1, CAPÍTULO 11: Despierta en el salón de Logur tras seis días de fiebre por la herida de Leif, ahora cosida y cauterizada. Recuerda al guerrero calvo ofreciéndole cuero para morder durante la cura; Svik y Røkia lo identifican como Glornir, jefe de los Bloodsworn. Conserva collar, cuchilla y bolsa; comprueba el contenido de esta sin revelarlo. La mano, las costillas y el rostro duelen mucho menos, aunque sigue débil y la herida del costado aún tira. Svik explica que su forma de perder, no una victoria sobre Einar, justificó su admisión. Varg reconoce una deuda por el rescate y la mano salvada. Busca a Vol para vengar a su hermana, pero no la encuentra y Røkia aplaza sus preguntas para entrenarlo por orden de Glornir. Aprende a separar el escudo del torso y sujetarlo con el antebrazo; su experiencia de pugilista le da equilibrio y aprende con rapidez. Subestima la defensa en movimiento: Røkia lo corta en el hombro y acaba con la punta en su garganta. Acepta que necesita aprender. Ve al jefe entrenar con un guerrero de piel oscura, trenza negra, caftán gris, vendas de pierna y espada curva, cuyo aspecto le resulta familiar; el hombre no recibe nombre. LIBRO 1, CAPÍTULO 13: Tras el agotador entrenamiento de Røkia, que acaba al oír una orden que atribuye a Glornir, cena en el lugar menos honrado del salón, lejos del jarl. Torvik se presenta, lo llama Varg No-Sense y le ofrece una fraternidad de aspirantes; Varg responde que solo tenía una hermana, ahora muerta. La abundancia, la libertad y el sentimiento de pertenencia le producen orgullo y alegría, seguidos de culpa por Frøya. Le inquieta saber que todos deben probar su valor o lealtad antes del juramento (véase juramento-varg-bloodsworn). Ve a Vol sentada junto a Glornir, sin llegar a pedirle el akáll. Reconoce en los visitantes de Iskidan el aspecto de los viajeros que vio desembarcar y del guerrero que entrenaba con el jefe, ahora nombrado Sulich. Se pone en pie con Torvik y los demás Bloodsworn para respaldar al jefe frente a Ilia.",
        star: "★★ La laguna de memoria al matar a Snepil, la resistencia al correr y la bolsa que protege quedan sin explicación. El capítulo termina antes de su combate con Einar. CAPÍTULO 4: La pertenencia declarada por el rescatador abre el acceso a la compañía de Vol; no se ha realizado el akáll. CAPÍTULO 11: La mejoría de mano, costillas y rostro tras seis días es una observación, sin causa sobrenatural confirmada. El guerrero anónimo le resulta familiar; se conserva como indicio junto a pasado-varg, sin identificarlo ni vincularlo de forma confirmada con Iskidan. CAPÍTULO 13: El guerrero del patio recibe el nombre Sulich; la semejanza con los visitantes de Iskidan da contexto a su aspecto, pero no resuelve los orígenes ni las lagunas de Varg."
    },
    {
        id: "glornir", label: "Glornir", group: "VARG", type: "Personaje — Jefe de los Bloodsworn",
        status: "updated",
        previousState: "Añade su negativa a entregar a Sulich y el deber del jefe.",
        desc: "LIBRO 1, CAPÍTULO 11: Svik y Røkia identifican como Glornir al guerrero calvo de barba gris que rescató a Varg de Leif y declaró su pertenencia a la compañía en el capítulo 4. Es el jefe de los Bloodsworn, llamado Shield-Breaker (Rompe-Escudos); Svik prefiere Gold-Giver (Dador de Oro). Varg lo recuerda ofreciéndole cuero para morder durante el tratamiento de su herida, y Svik le atribuye haberle salvado la vida. Ordena a Røkia iniciar su formación con escudo. Varg lo ve entrenar en el patio con un guerrero de piel oscura y espada curva, todavía anónimo. LIBRO 1, CAPÍTULO 13: Explica a Jaromir que el juramento sellado con sangre lo obliga a mantener y proteger a su gente: vivir, luchar y morir juntos. Se niega a entregar a Sulich. Røkia recuerda su nombre Rompe-Escudos; Svik añade Soul-Stealer (Ladrón de Almas), y Einar lo llama cortador, hachador y aplastador. Más de sesenta guerreros de la compañía se levantan para apoyarlo.",
        star: ""
    },
    {
        id: "jarl-logur", label: "Jarl Logur", group: "VARG", type: "Personaje — Jarl de Liga",
        status: "updated",
        previousState: "Añade su hospitalidad y posición en el conflicto de Sulich.",
        desc: "LIBRO 1, CAPÍTULO 2: Anfitrión de los Bloodsworn en Liga. Su salón domina la población y la prueba de armas se celebra en el espacio ante él. Varg reconoce su emblema: una vela roja sobre fondo azul pálido. No se describe una intervención personal del jarl. LIBRO 1, CAPÍTULO 13: Varg lo ve corpulento, de vientre abultado, cabello gris trenzado con hilo de oro y adornos de oro. Ríe con una mujer de edad semejante, sin nombre ni parentesco declarado. Brinda por sus huéspedes y presenta al skáld Galinn. Recibe con un abrazo a su viejo amigo Sergei y ofrece hospitalidad al príncipe Jaromir. Rechaza que este imponga la entrega de Sulich: exige pruebas y testigos libertos de buena reputación, remite el asunto al Alþing y declara su amistad con Glornir. La amenaza y las promesas comerciales del príncipe no logran una entrega en esta escena.",
        star: ""
    },
    {
        id: "jokul", label: "Jökul Hammer-Hand", group: "VARG", type: "Personaje — Herrero y maestro de Torvik",
        status: "updated",
        previousState: "Identifica al maestro de Torvik y su trabajo de orfebrería.",
        desc: "LIBRO 1, CAPÍTULO 4: Einar dice que este herrero le fabricó la protección de la entrepierna. Varg se lesiona la mano al golpearla durante la prueba. Jökul no aparece en persona ni recibe apodo en este capítulo. LIBRO 1, CAPÍTULO 13: Torvik identifica a Jökul Hammer-Hand (Mano de Martillo), hombre ancho y de cintura gruesa sentado cerca de Røkia y Svik, como su maestro herrero. Lo proclama el mejor de Vigríð y muestra una pulsera de plata trenzada con bronce y terminales de cabezas de perro como ejemplo de su trabajo. Varg alude a la rapidez necesaria para mantener el equipo de la compañía.",
        star: ""
    },
    {
        id: "bloodsworn", label: "Bloodsworn (Hermanos de Sangre)", group: "VARG", type: "Facción — Compañía mercenaria",
        status: "updated",
        previousState: "Añade la estructura de exploración y las condiciones del juramento.",
        desc: "LIBRO 1, CAPÍTULO 2: Compañía famosa en Vigríð y, según Varg, probablemente más allá. Se alquila al mejor postor para cazar Vaesen, buscar reliquias divinas, intervenir en disputas fronterizas o proteger a los poderosos. Llegó a Liga el día anterior y es huésped de Jarl Logur. Sus escudos negros llevan salpicaduras rojas. Cuenta con la bruja Seiðr esclava Vol. Tras la muerte de uno de sus miembros, celebra una prueba de armas para cubrir un puesto en su drakkar; Einar combate con los aspirantes y Svik controla el acceso. LIBRO 1, CAPÍTULO 4: Una guerrera rubia ofrece un escudo a Varg y lo anuncia como Varg No-Sense al rechazarlo. Einar lo deja inconsciente en la prueba. Más tarde el guerrero calvo de barba gris, una mujer canosa con dos perros, Einar y Svik lo salvan de Leif. Ante la reclamación de propiedad y weregild de Leif, el calvo declara que Varg es ahora uno de los Bloodsworn. Ninguno de los dos rescatadores anónimos recibe nombre en este capítulo. LIBRO 1, CAPÍTULO 11: Su jefe recibe nombre: Glornir. Ordena que Røkia enseñe a Varg a combatir con escudo, conocimiento que ella considera indispensable para pertenecer a la compañía. Svik explica que la prueba no exigía vencer a Einar, sino mostrar cómo se afrontaba la derrota. Sus guerreros entrenan en el patio junto a hombres de Logur. LIBRO 1, CAPÍTULO 13: Torvik explica que el aspirante debe demostrar valor o lealtad antes de prestar el juramento. El vínculo, sellado con sangre, obliga a guerreros y jefe a mantenerse unidos, luchar y vivir o morir juntos; el jefe debe proveer para ellos y protegerlos. Edel dirige a los exploradores. Torvik sirve como explorador y aprendiz, pero aún no ha jurado. La compañía respalda a Sulich frente a la reclamación de Jaromir.",
        star: ""
    },
    {
        id: "akall", label: "Akáll de Varg", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Registra el regreso visible de Vol sin dar el rito por realizado.",
        desc: "LIBRO 1, CAPÍTULO 2: Varg busca un Galdurman o una bruja Seiðr que realice una invocación. Todavía no revela su finalidad ni consigue que se practique el rito. LIBRO 1, CAPÍTULO 4: Varg revela que busca ayuda mágica para vengar a Frøya. Su incorporación a los Bloodsworn lo acerca a Vol, pero el akáll sigue pendiente. LIBRO 1, CAPÍTULO 11: Varg insiste en hablar con Vol para cumplir su propósito de venganza. Røkia dice que Vol no está allí, no explica dónde y antepone el entrenamiento ordenado por Glornir. No se realiza la invocación ni se consuma la venganza. ESTADO: PARCIAL; se conoce el propósito, pero el acceso efectivo a Vol y el rito siguen pendientes. LIBRO 1, CAPÍTULO 13: Vol está de nuevo a la vista, sentada junto a Glornir en la mesa principal. Su anterior ausencia deja de ser un obstáculo inmediato, pero Varg no conversa con ella ni consigue la invocación. ESTADO: PARCIAL; el rito y la venganza de Frøya siguen pendientes.",
        star: ""
    },
    {
        id: "pasado-varg", label: "Orígenes y Recuerdos de Varg", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Identifica a Sulich sin cerrar las preguntas sobre Varg.",
        desc: "LIBRO 1, CAPÍTULO 2: Varg desconoce a sus padres y no sabe su edad con certeza. El recuerdo de haber estrangulado a Snepil emerge de una niebla roja; no recuerda cómo llegó a rodearle el cuello con las manos. Esas lagunas siguen abiertas. LIBRO 1, CAPÍTULO 11: En el patio, un guerrero anónimo de piel oscura y trenza negra que entrena con Glornir le resulta familiar. Es una impresión de Varg, no una identificación ni una explicación de su pasado o de la niebla roja. Véase también la observación de su recuperación en varg, sin causa confirmada. ESTADO: ABIERTA; sus orígenes y lagunas no se resuelven. LIBRO 1, CAPÍTULO 13: El guerrero del patio es nombrado Sulich. Varg compara su trenza y aspecto con los visitantes de Iskidan y recuerda a los viajeros del puerto del capítulo 2. Esto contextualiza la familiaridad visual, pero no explica sus padres, su amnesia ni la niebla roja. ESTADO: ABIERTA; identificación del guerrero aclarada, origen y lagunas pendientes.",
        star: ""
    },
    {
        id: "snaka", label: "Snaka", group: "DIOS", type: "Dios Muerto — Padre",
        status: "updated",
        previousState: "Añade Eldrafell y los epítetos de la saga.",
        desc: "LIBRO 1, CAPÍTULO 1: Según la tradición relatada por Thorkel, Snaka es la serpiente, el Más Anciano y padre de los dioses; algunos lo consideran el mayor de ellos, y era el más grande. Había crecido desde el nacimiento del mundo. Sus hijos incluyen águila, oso, lobo y dragón, todavía sin nombres propios en esta fuente. Murió a manos de sus hijos en la guerra divina. Su caída destrozó reinos y sus huesos, cubiertos de tierra, forman montañas. LIBRO 1, CAPÍTULO 9: Según Grend, Lik-Rifa es su hija dragón y quedó encerrada antes de Guðfalla, sin poder luchar junto a él. Agnar le atribuye también la ascendencia divina de la esposa de Berak; es una genealogía no confirmada por ella. LIBRO 1, CAPÍTULO 13: La saga de Galinn lo llama serpiente y segador de almas; canta que muda la piel al despertar y que su caída, entre veneno y destrucción de tierras y montañas, quebró las laderas del monte Eldrafell. Se conserva como tradición cantada.",
        star: "★★ La geografía se presenta como el resto material de un cuerpo divino, a través de la saga de Thorkel."
    },
    {
        id: "ulfrir", label: "Ulfrir", group: "DIOS", type: "Dios muerto — Lobo",
        status: "updated",
        previousState: "La saga identifica al referente como dios lobo muerto.",
        desc: "LIBRO 1, CAPÍTULO 12: Nombre invocado por Thorkel al llamar «Ulfrir-kin» a la guerrera esclavizada de Sigrún. La expresión la presenta como emparentada con Ulfrir; este capítulo no expone la identidad ni la historia de ese referente. LIBRO 1, CAPÍTULO 13: Galinn canta a Ulfrir como dios lobo, rompedor de cadenas, que corre a Guðfalla y muere en la batalla. Esta identidad procede de la saga, sin identificar a la esclava de Sigrún ni atribuirle nuevas capacidades.",
        star: ""
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        status: "updated",
        previousState: "Añade la versión poética de Galinn con sus límites de cronología.",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos. LIBRO 1, CAPÍTULO 9: Grend emplea el nombre Guðfalla y sostiene que Lik-Rifa no murió aquel día con los otros dioses: había quedado encerrada y no pudo acudir junto a Snaka. Elvar disputa su supervivencia durante los casi trescientos años transcurridos. LIBRO 1, CAPÍTULO 10: Thorkel explica a Breca que los supervivientes de la caída de Snaka odiaron y persiguieron a los descendientes de los dioses, culpando a estos de haber roto el mundo. El culto a los dioses muertos está prohibido bajo pena de muerte. LIBRO 1, CAPÍTULO 13: Galinn canta el toque del Vackna que despierta a los dioses y los llama a la Llanura de Batalla. Combaten dioses, parientes y descendientes de sangre divina: Berser es atravesado, Orna desgarrada y Ulfrir muerto. Lik-Rifa queda encadenada bajo Oskutreð; cae Snaka, se quiebra Eldrafell y los vaesen salen del foso entre hielo y fuego. El canto presenta el fin y renacimiento del mundo. Su secuencia poética no precisa cuándo fue encarcelada Lik-Rifa; no sustituye la afirmación anterior de Grend de que ocurrió antes de la batalla.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "orna", label: "Orna", group: "DIOS", type: "Dios — Muerto",
        status: "updated",
        previousState: "Añade la forma de águila y muerte según la saga.",
        desc: "LIBRO 1, CAPÍTULO 10: Dios muerto de restos alados. Según Sigrún, sus huesos se alzan sobre la fortaleza de Helka en Darl. LIBRO 1, CAPÍTULO 13: La saga de Galinn la representa alada como un águila, con garras y pico que desgarran, y la cuenta entre los dioses abatidos en la guerra.",
        star: ""
    },
    {
        id: "likrafa", label: "Lik-Rifa", group: "DIOS", type: "Deidad — Dragón en la tradición de Grend",
        status: "updated",
        previousState: "Añade la procedencia mítica y epítetos atribuidos a Galinn.",
        desc: "LIBRO 1, CAPÍTULO 4: Deidad asociada a la cámara de Vergelmir. LIBRO 1, CAPÍTULO 9: Según Grend, es una diosa dragón e hija de Snaka, encerrada mediante astucia en una cámara bajo Oskutreð antes de Guðfalla. Esta tradición sostiene que no murió con los otros dioses y que desgarra las almas de los guerreros en Vergelmir. Los relatos infantiles la presentan como una devoradora de quienes salen de noche. Su supervivencia permanece discutida. LIBRO 1, CAPÍTULO 13: Galinn la llama dragón astuto y desgarradora de cadáveres de las Colinas de Luna Oscura; canta su encadenamiento en una cámara profunda bajo Oskutreð. El poema no aclara la cronología exacta respecto de Guðfalla ni demuestra su estado presente.",
        star: ""
    },
    {
        id: "berser", label: "Berser (Dios-Oso)", group: "DIOS", type: "Dios muerto — Linaje atribuido de los Berserkir",
        status: "updated",
        previousState: "Añade su combate y muerte en la tradición cantada.",
        desc: "LIBRO 1, CAPÍTULO 7: Dios oso muerto, al que Agnar atribuye el origen del linaje de los Berserkir. LIBRO 1, CAPÍTULO 13: En el canto de Galinn combate enfurecido, con espuma en las fauces y garras que desgarran, y cae atravesado. Se registra como tradición sobre el dios, no como una capacidad nueva de Berak.",
        star: ""
    },
    {
        id: "emp-kirill", label: "Gran Khagan Kirill el Magnífico", group: "FACCION", type: "Personaje — Gran Khagan de Iskidan",
        status: "updated",
        previousState: "Añade el título de Gran Khagan y la filiación presentada de Jaromir.",
        desc: "LIBRO 1, CAPÍTULO 10: Sigrún lo nombra como emperador que gobierna Iskidan desde Gravka. Virk denuncia que su trono está construido sobre cadáveres y afirma haber visto esclavitud masiva y sacrificios de niños en su reino. Sigrún disputa ese testimonio. El capítulo no usa todavía el título canónico posterior de Gran Khagan; se conserva su id del archivo de referencia. LIBRO 1, CAPÍTULO 13: Sergei lo llama Gran Khagan, Kirill el Magnífico, y presenta a Jaromir como su hijo. Torvik repite el rumor de que tiene doscientas concubinas y mil hijos y que viaja con doscientos druzhina; las cifras no quedan verificadas.",
        star: ""
    },
    {
        id: "althing", label: "Alþing (Althing)", group: "NORSE", type: "Cultura — Asamblea",
        status: "updated",
        previousState: "Añade la función judicial descrita por Logur.",
        desc: "LIBRO 1, CAPÍTULO 3: Asamblea donde una comunidad se reúne para tratar asuntos públicos y expresar su parecer. LIBRO 1, CAPÍTULO 10: Puede durar varios días. En el dominio de Sigrún se exige al menos un representante de cada familia. LIBRO 1, CAPÍTULO 13: Logur presenta la asamblea como el ámbito adecuado para tramitar reclamaciones de delitos, con pruebas y testimonio de libertos honrados. Una exigencia unilateral de un visitante no basta, según la ley que invoca.",
        star: ""
    },
    {
        id: "torvik", label: "Torvik", group: "VARG", type: "Personaje — Explorador y aprendiz sin juramento",
        desc: "LIBRO 1, CAPÍTULO 13: Joven de cabello negro revuelto, ojos azules, barba incipiente y manos y muñecas gruesas; lleva quemaduras en brazos y túnica. Explorador bajo Edel y aprendiz de Jökul Hammer-Hand. Muestra orgulloso una pulsera trabajada por su maestro. Aún no ha prestado el juramento Bloodsworn: debe demostrar valor o lealtad, según Glornir. Se sienta junto a Varg, lo anima a comer y propone que sean como hermanos. Se levanta para apoyar al jefe durante la amenaza de Ilia. Repite como rumor las cifras sobre la familia y escolta del Khagan.",
        star: ""
    },
    {
        id: "edel", label: "Edel", group: "VARG", type: "Personaje — Jefa de exploradores Bloodsworn",
        desc: "LIBRO 1, CAPÍTULO 13: Torvik la identifica como jefa de exploradores y su superior. Es la mujer de cabello plateado acompañada por perros, ahora alimentándolos con cordero cerca de la mesa principal; así recibe nombre la rescatadora canosa de Varg del capítulo 4.",
        star: ""
    },
    {
        id: "galinn", label: "Galinn el Skáld", group: "VARG", type: "Personaje — Skáld de Liga",
        desc: "LIBRO 1, CAPÍTULO 13: Skáld de Liga, moreno y apuesto, con túnica verde bordada y brazaletes de plata. Logur lo elogia como el mejor del mundo. Acompaña con una lira de siete cuerdas una saga de Guðfalla, desde el toque del Vackna hasta la caída de los dioses y el renacimiento del mundo. Desaparece de la tarima cuando llegan los visitantes.",
        star: ""
    },
    {
        id: "vackna", label: "Vackna (Cuerno-Despertador)", group: "OBJETO", type: "Objeto mítico — Cuerno",
        desc: "LIBRO 1, CAPÍTULO 13: Cuerno cuyo toque despierta a los dioses y resuena por Vigríð al comenzar la guerra divina, según el canto de Galinn. No se revela aquí quién lo toca ni dónde se encuentra actualmente.",
        star: ""
    },
    {
        id: "svin", label: "Svin", group: "DIOS", type: "Dios — Mencionado en la saga",
        desc: "LIBRO 1, CAPÍTULO 13: Galinn lo nombra entre los dioses que acuden a la Llanura de Batalla y lo califica de valiente. El canto no especifica su forma ni su destino individual.",
        star: ""
    },
    {
        id: "tosk", label: "Tosk", group: "DIOS", type: "Dios — Mencionado en la saga",
        desc: "LIBRO 1, CAPÍTULO 13: Galinn lo nombra entre los dioses que acuden a la Llanura de Batalla y lo califica de travieso. No aporta forma ni destino individual.",
        star: ""
    },
    {
        id: "rotta", label: "Rotta", group: "DIOS", type: "Dios — Mencionado en la saga",
        desc: "LIBRO 1, CAPÍTULO 13: Galinn lo nombra entre los dioses que acuden a la Llanura de Batalla y lo califica de engañoso. No aporta forma ni destino individual.",
        star: ""
    },
    {
        id: "eldrafell", label: "Monte Eldrafell", group: "LUGAR", type: "Lugar — Montaña",
        desc: "LIBRO 1, CAPÍTULO 13: Montaña cuyas laderas se quebraron con la caída de Snaka, según la saga de Galinn. El canto lo asocia a hielo, fuego y destrucción del mundo antiguo.",
        star: ""
    },
    {
        id: "colinas-luna-oscura", label: "Colinas de Luna Oscura (Dark-of-Moon Hills)", group: "LUGAR", type: "Lugar — Referencia mítica",
        desc: "LIBRO 1, CAPÍTULO 13: Colinas de las que procede Lik-Rifa según la fórmula de la saga de Galinn. Su localización no se precisa.",
        star: ""
    },
    {
        id: "sergei", label: "Sergei Yanasson de Ulaz", group: "VARG", type: "Personaje — Mercader de Iskidan",
        desc: "LIBRO 1, CAPÍTULO 13: Mercader de las tierras del sur e Iskidan, presentado como Sergei Yanasson de Ulaz. Viste caftán fino, gorro con piel y pantalones amplios con vendas de pierna. Viejo amigo de Logur, que lo abraza y desmonta su saludo ceremonioso. Trae al príncipe Jaromir y sus dos escoltas. Se interpone cuando Ilia amenaza al jefe y convence al príncipe de detener la escalada, atribuyendo el choque a costumbres diferentes.",
        star: ""
    },
    {
        id: "ulaz", label: "Ulaz", group: "LUGAR", type: "Lugar — Procedencia mencionada",
        desc: "LIBRO 1, CAPÍTULO 13: Nombre de procedencia incluido en la presentación de Sergei Yanasson de Ulaz, mercader de Iskidan. No se describe su geografía ni el tipo de asentamiento.",
        star: ""
    },
    {
        id: "jaromir", label: "Principe Jaromir", group: "VARG", type: "Personaje — Príncipe de Iskidan",
        desc: "LIBRO 1, CAPÍTULO 13: Hijo del Gran Khagan Kirill, príncipe de Gravka e Iskidan según su presentación y sus propias palabras. Viaja con dos druzhina y un halcón; lleva armadura laminar, casco adornado de oro, trenza rubia, barba corta y ojos azules. Dice haber viajado deprisa para evitar que lo preceda la noticia. Exige a Sulich por supuestos grandes delitos sin detallarlos ni presentar aún las pruebas. Desafía la autoridad de Glornir, contiene a Ilia por consejo de Sergei y ofrece a Logur riqueza comercial mientras desprecia su salón. Promete volver al día siguiente con testigos y pruebas, y advierte que no pedirá justicia una tercera vez.",
        star: ""
    },
    {
        id: "druzhina", label: "Druzhina (Élite de Iskidan)", group: "FACCION", type: "Facción — Escolta del Khagan y sus hijos",
        desc: "LIBRO 1, CAPÍTULO 13: Escolta de Iskidan vinculada al Khagan y a los príncipes. La presentación de Jaromir atribuye a su rango el derecho a llevar dos escoltas. Usan armadura laminar, cascos con penacho de crin y malla protectora, arcos y carcajes, espadas curvas y hachas pequeñas de mango largo. Torvik atribuye al Khagan una escolta de doscientos como rumor, sin confirmar la cifra.",
        star: ""
    },
    {
        id: "sulich", label: "Sulich", group: "VARG", type: "Personaje — Bloodsworn reclamado por Jaromir",
        desc: "LIBRO 1, CAPÍTULO 13: Recibe nombre el guerrero de cabeza afeitada y trenza larga que Varg había visto entrenar con Glornir. Está sentado entre Einar y Svik y come cordero sin devolver la mirada al príncipe. Ha sellado con sangre el juramento Bloodsworn, según el jefe. Jaromir lo acusa de grandes delitos y quiere llevárselo, pero Glornir rechaza entregarlo. No se exponen los delitos, su versión ni las pruebas. Véase sulich-crisis.",
        star: "★★ CAPÍTULO 13: La acusación abre la pregunta por su pasado y la amenaza de extradición; ambas siguen sin resolver en sulich-crisis."
    },
    {
        id: "ilia", label: "Ilia", group: "VARG", type: "Personaje — Druzhina de Jaromir",
        desc: "LIBRO 1, CAPÍTULO 13: Una de las dos mujeres que escoltan al príncipe Jaromir. Empuña el sable y ofrece cortar la cabeza a Glornir por su insolencia. Se detiene cuando Jaromir se lo ordena, después de que Sergei intervenga. La otra escolta no recibe nombre.",
        star: ""
    },
    {
        id: "sulich-crisis", label: "Crisis por Sulich", group: "TRAMA", type: "Trama — Acusaciones y reclamación pendientes",
        desc: "LIBRO 1, CAPÍTULO 13: PRIMERA EVIDENCIA: LIBRO 1, CAPÍTULO 13. Jaromir exige llevarse a Sulich por grandes delitos que no especifica. Glornir se ampara en el juramento Bloodsworn y Logur exige pruebas y testigos y remite la reclamación al Alþing. Ilia amenaza al jefe, la compañía se levanta y Sergei evita la violencia inmediata. Jaromir promete volver al día siguiente con evidencia y testigos. Preguntas pendientes: qué se imputa realmente a Sulich, qué pruebas existen y cómo se resolverá la exigencia frente a su juramento. La acusación no confirma culpabilidad y la retirada no resuelve la amenaza. ESTADO: ABIERTA.",
        star: "★★ La amenaza queda aplazada hasta el regreso anunciado de Jaromir; no hay entrega, juicio ni resolución."
    },
    {
        id: "juramento-varg-bloodsworn", label: "Juramento de Varg al Bloodsworn (pendiente)", group: "TRAMA", type: "Trama — Ingreso por juramento pendiente",
        desc: "LIBRO 1, CAPÍTULO 13: PRIMERA EVIDENCIA: LIBRO 1, CAPÍTULO 13. Aunque sus rescatadores y Torvik lo consideran uno de ellos, Varg no ha prestado un juramento en los capítulos leídos. Torvik explica que todos deben demostrar valor o lealtad antes de jurar; Varg se inquieta al oírlo. Su entrenamiento y su gesto de levantarse con la compañía son hechos observados, no confirmación de que Glornir lo dé por probado ni de que haya jurado. Pregunta pendiente: cuándo y cómo completará ese ingreso. ESTADO: ABIERTA.",
        star: ""
    },

// ── LIBRO 1, CAPÍTULO 14 — ELVAR ──
    {
        id: "elvar", label: "Elvar", group: "ELVAR", type: "Personaje — Guerrera de los Battle-Grim",
        status: "updated",
        previousState: "Discute la evidencia de los linajes y sobrevive al ataque nocturno.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrera rubia y la más joven de la compañía de Agnar. Rema hasta Iskalt y se equipa con brynja, espada, seax, hacha, casco, escudo y lanza. Su escudo rojo muestra espada, hacha y lanza cruzadas con nudos ornamentales. Ambiciona fama de batalla y desprecia el arco por matar a distancia. Se enorgullece de que Agnar la elija para acompañarlo y vigilar a los aldeanos. Advierte a una niña que abandona la multitud y, por orden de Agnar, la sigue. Derriba a un arquero con el escudo y hiere a una lancera; Grend mata a esta cuando intenta cortarle las piernas. Dirige la inspección de una cabaña y descubre el hueco por el que han escapado. Nota el interés de Biórr y aparta la mirada; también aparta la vista cuando un guardia patea a Kráka. Conserva la brynja enrollada en piel de oveja aceitada para evitar la oxidación; se la pone sobre la cabeza y ajusta el cinturón para descargar los hombros. Una punta de lanza raspa su malla y hace saltar una chispa. LIBRO 1, CAPÍTULO 7: Acepta el honor de explorar en vanguardia con Grend y Biórr. Advierte telarañas de arañas del hielo y recuerda su veneno. Tras fallar con la lanza contra el trol, combate con Grend y le abre una arteria del muslo, causando la hemorragia que lo mata. Grend la ayuda a levantarse ilesa. Sonríe a Biórr cuando la sostiene tras un resbalón, pero se libera de su mano; piensa expresamente que Grend no es su padre. Duda de que el cautivo sea Berserkir hasta ver su transformación. Aparta la mirada cuando Agnar amenaza al niño: matar niños no es su forma de ganar fama. Agnar le exige mirar al prisionero y ella presencia su sometimiento. En las ramas de Iskalt reconoce telas con hilos del grosor de un dedo y restos de ratas, un cuervo y una marta; avisa a Grend y Biórr. LIBRO 1, CAPÍTULO 9: Lleva poco más de tres años con la compañía y se ha ganado la primera fila del muro de escudos por trabajar más que los demás. Recuerda la máxima de su padre: la bondad vuelve blando. Discute con Grend la supervivencia de Lik-Rifa: no acepta que ignorar la causa de un temblor pruebe la intervención de una diosa. Agnar le entrega un colmillo del trol por el golpe mortal; valora la honra más que el oro. Al atacar una serpiente marina el Wave-Jarl, salta desarmada al agua helada y rescata al hijo de Berak. El canto de la madre desvía a la criatura y Grend lleva a ambos hasta el barco. Pregunta en voz baja a la mujer qué arrojó a la lava, sin obtener respuesta. Agnar la recompensa con un anillo de oro. Su alegría se apaga al saber que irán a Snakavik a vender a Berak a Störr; niega que sea un problema, pero siente angustia. Dice a Grend que vuelven a casa. No se identifica aquí a su padre. LIBRO 1, CAPÍTULO 14: Presencia la revelación de la roca de juramento e identifica el relato del Bosque de las Horcas. Sostiene que Lik-Rifa es un cuento porque nunca ha visto un descendiente del dragón ni ha recibido noticias de uno de alguien fiable; es su argumento, no una prueba de inexistencia. Acepta los linajes divinos que cree haber visto: sabueso en el rastreador, oso en Berak y serpiente en Kráka y Uspa. Recuerda haber visto con la compañía en Iskidan Tainted de Toro, Halcón y Caballo. Por la noche despierta inmovilizada y casi asfixiada por gusanos; uno entra en su nariz. Agnar y Grend la liberan y ella extrae con cuidado al gusano para no dejar parte dentro. Después de vomitar, combate con el seax. Se pregunta si el resplandor de la roca atrajo a la multitud de criaturas; no lo sabe.",
        star: "★ Su búsqueda de fama convive con su participación en la caza de Tainted y la violencia contra los habitantes de Iskalt. CAPÍTULO 9: Su rescate espontáneo del niño contrasta con la violencia contra la familia; el destino anunciado amenaza su alegría por la fama obtenida. CAPÍTULO 14: La posible atracción ejercida por la roca es una sospecha suya, no una causa demostrada; véase piedra-gusanos."
    },
    {
        id: "agnar", label: "Agnar", group: "ELVAR", type: "Personaje — Jefe de los Battle-Grim",
        status: "updated",
        previousState: "Busca refugio, expone su justificación de la caza y ordena la retirada.",
        desc: "LIBRO 1, CAPÍTULO 5: Jefe rubio de los Battle-Grim, con trenza de guerrero y el resto de la cabeza rasurado. Lleva piel de oso negro, torques de plata y anillos en los brazos. Gobierna el timón del Wave-Jarl durante la aproximación a Iskalt, deja diez o doce guerreros custodiándolo y desembarca con los demás. Busca a Berak, un hombre grande con cicatrices en un lado de la cara, acompañado por una mujer y un niño. Ofrece dinero o muerte a los aldeanos. Afirma que Berak es Tainted, tocado por los dioses, y que traerá sangre y matanza. Usa un trapo ensangrentado para dar su olor al esclavo Hundur y pronuncia «Hlýða», haciendo palpitar vetas rojas en su collar. Al interponerse Hrut, le corta la lanza y le hiere barbilla y labio; avanza después con escudo y espada mientras estalla la lucha. Al descubrir que los perseguidos han escapado de la cabaña, ordena seguirlos al bosque. LIBRO 1, CAPÍTULO 7: Se confirma que mató a Hrut en la aldea. Deja una docena de guerreros con Thrud y continúa con veintiséis. Envía a Elvar, Grend y Biórr a explorar, y ordena combatir al trol por parejas en vez de formar muro de escudos. Le clava la espada en la espalda. Ordena capturar a la mujer y al niño y reconoce al hombre como Berak Bjornasson, pese a sus negativas. Para probar su condición, amenaza con degollar al niño y le corta levemente el cuello; la transformación de Berak convence a Elvar. Activa el collar con «HALDA» y lo obliga a arrodillarse con «Á HNÉN». Afirma que la sangre del dios muerto Berser corre por Berak y que tres jarls lo buscan por asesinato, deuda de sangre y weregild. Pretende venderlo por un buen precio. Ordena recoger a sus muertos y descuartizar al trol para aprovechar todo lo valioso. LIBRO 1, CAPÍTULO 9: Entrega a Elvar un colmillo de trol como trofeo. Durante el ataque reconoce a la serpiente como Sjávarorm. Tras el canto de la cautiva, la declara bruja Seiðr con sangre de Snaka; esta identificación y el linaje son afirmaciones suyas. Amenaza con matar a su hijo si usa sus poderes contra la tripulación. Golpea a Kráka por no proteger el barco mientras dormía, luego reconoce que quizá le ha exigido demasiado y le da un asta del trol como fuente de poder para el regreso. Ordena en lengua Galdur «Hlýða og fá verðlaun», mientras vetas rojas recorren el hierro de su collar. Premia el valor de Elvar con un anillo de oro y anuncia que piensa llevar a Berak a Snakavik, donde espera el mejor precio de Störr. Aconseja a Elvar afrontar el viaje con ingenio y astucia. LIBRO 1, CAPÍTULO 14: Elige refugiarse de una tormenta en la isla más meridional de las Islas de la Escarcha, a dos días al sur de Iskalt y aproximadamente a mitad de camino de Snakavik. Deja cinco hombres con el barco y acampa arriba. Pide al Hundur que examine la roca y corta la palma de Uspa a petición de ella. Señala la imagen de Berser como origen de Berak. Dice que no haber visto algo no demuestra su inexistencia y espera que los descendientes del dragón existan por el precio que obtendría al venderlos. Justifica la caza de Tainted como impedimento para que los dioses recuperen poder mediante sus hijos, culpándolos de la casi destrucción del mundo. Liberado por Sighvat durante el ataque, corta los gusanos que sujetan a Elvar. Ordena regresar al Wave-Jarl.",
        star: "★ Su amenaza de prosperar o morir convierte la búsqueda de Berak en un ataque contra la aldea."
    },
    {
        id: "berak", label: "Berak Bjornasson", group: "ELVAR", type: "Personaje — Berserkir cautivo",
        status: "updated",
        previousState: "Se conocen los nombres de su familia y la rescata de los gusanos.",
        desc: "LIBRO 1, CAPÍTULO 5: Hombre al que busca Agnar en Iskalt. Según este, es alto y ancho, tiene cicatrices en un lado de la cara y viaja con una mujer y un niño; calcula que llegó dos o tres días antes. Agnar lo identifica públicamente como Tainted y asegura que traerá sangre y matanza: esta última es la acusación del cazador. El esclavo Hundur confirma por el olor que Berak estuvo en la cabaña, pero el grupo ya ha escapado por un hueco en la pared trasera. No se muestra su captura ni se identifica expresamente al hombre que envía a la niña desde la multitud. LIBRO 1, CAPÍTULO 7: Agnar lo identifica como Berak Bjornasson. Combate con lanza a un trol junto a una cascada de lava mientras una mujer y un niño esperan cerca. Después de morir el trol, mata a un guerrero de la compañía con una estocada en la garganta. Acorralado contra la lava, resiste los golpes de Sighvat, pero lo encadenan y le ponen un collar. Niega ser el hombre buscado. Cuando Agnar amenaza al niño, sus ojos se tornan ambarinos, aumenta su volumen, se afilan sus dientes y le crecen uñas como garras; arrastra a seis hombres y a Sighvat. El collar lo detiene al grito de «HALDA» y «Á HNÉN» lo obliga a arrodillarse. Agnar lo declara Berserkir, descendiente de Berser, y afirma que tres jarls lo reclaman por asesinato, deuda de sangre y weregild: las acusaciones proceden de Agnar. Elvar queda convencida de su condición. La mujer y el niño también son capturados; aquí no se revelan sus nombres ni su parentesco explícito con él. LIBRO 1, CAPÍTULO 9: La narración identifica expresamente a la mujer y al niño como su esposa e hijo. Los collares y grilletes le han dejado la piel en carne viva. Sighvat lo fija al barco con cadenas junto al Hundur. Cuando la serpiente arroja a su hijo al agua, intenta saltar tras él, pero las cadenas lo impiden; grita y forcejea. Elvar rescata al niño. Su esposa ahuyenta a la serpiente cantando; Agnar la llama bruja Seiðr con sangre de Snaka. Agnar planea llevar a Berak a Snakavik para obtener el mejor precio de Jarl Störr; todavía no se produce la venta. LIBRO 1, CAPÍTULO 14: Su esposa recibe el nombre Uspa y su hijo Bjarn. Intenta detenerla cuando ofrece revelar las inscripciones de la roca, pero Agnar lo impide. Durante el ataque nocturno, todavía encadenado, se incorpora arrancándose los gusanos, libera a Uspa y Bjarn y los pone de pie. No se narra una nueva transformación ni su liberación del cautiverio.",
        star: "★ La persecución continúa hacia el bosque de Iskalt; el grupo no ha sido capturado al terminar el capítulo. CAPÍTULO 7: La captura confirma su poder, que Agnar doblega amenazando al niño y activando el collar."
    },
    {
        id: "kraka", label: "Kráka", group: "ELVAR", type: "Personaje — Esclava Tainted",
        status: "updated",
        previousState: "Reconoce la roca y explica la ascendencia divina de los Tainted.",
        desc: "LIBRO 1, CAPÍTULO 5: Esclava Tainted de los Battle-Grim. Canta magia durante la travesía para alejar del casco a las serpientes y otros Vaesen marinos. Tras la llegada a Iskalt queda desplomada en la proa, exhausta, con el pelo negro empapado. Lleva collar y cadena; un guardia la patea y ella se encoge levantando las manos. Elvar aparta la mirada. LIBRO 1, CAPÍTULO 9: Duerme acurrucada en la proa cuando la serpiente ataca. Agnar la abofetea por no proteger a la tripulación; ella explica que estaba dormida y había cantado protección durante todo el viaje de ida. Elvar observa su agotamiento y el coste del canto Seiðr. Agnar le entrega un asta de trol como poder para el regreso y activa las vetas rojas del collar al ordenarle proteger el casco en lengua Galdur. Al salir al mar canta de nuevo y las formas que Elvar percibe bajo las olas desaparecen. Al tocar su cadena, Agnar pronuncia «Hlýða og fá verðlaun»; las vetas rojas recorren el hierro y ella responde que obedecerá. LIBRO 1, CAPÍTULO 14: Reconoce la roca de juramento bajo el musgo y señala dónde debe oler el rastreador. Identifica al lobo representado como Ulfrir y explica que los dioses representados son padres y madres de los Tainted. Elvar le atribuye sangre de Snaka por el canto de serpiente. Es una de las cautivas que forcejean durante el ataque nocturno.",
        star: "★ Su magia sirve de protección a quienes la mantienen esclavizada."
    },
    {
        id: "hundur", label: "Hundur (Thrall)", group: "ELVAR", type: "Personaje — Esclavo rastreador",
        status: "updated",
        previousState: "Detecta sangre antigua y Elvar identifica su linaje de sabueso.",
        desc: "LIBRO 1, CAPÍTULO 5: Esclavo al que Agnar denomina su Hundur-thrall; el capítulo no revela su nombre personal. Lleva cabello largo, ojos hundidos y una capa de piel de foca maltrecha. Sighvat lo mantiene sujeto por una cadena al cuello. Agnar le entrega un trapo ensangrentado con el olor de Berak y pronuncia «Hlýða»; vetas rojas palpitan en el collar, el hombre gime y olfatea el paño. Rastrea a ras de suelo y confirma por el olor de la paja que Berak estuvo en la cabaña. No se explica aquí su linaje divino concreto. LIBRO 1, CAPÍTULO 7: Guía a los cazadores por las colinas nevadas; identifica estiércol de trol y extrae un hueso de él. Sighvat fija su cadena a un árbol. Agnar fundamenta en su rastreo la identificación del cautivo como Berak; el esclavo observa con expresión desdichada. LIBRO 1, CAPÍTULO 14: Al principio no huele nada en el granito; cuando Kráka le indica una zona y retira el musgo, reconoce el rastro tenue de sangre derramada y juramentos. Elvar atribuye su capacidad a la sangre del dios Hundur, el sabueso; el dios y el esclavo son entidades distintas.",
        star: ""
    },
    {
        id: "grend", label: "Grend", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Sobrevive al ataque y ayuda de nuevo a Elvar.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero corpulento, de cabello entrecano y expresión adusta. Rema delante de Elvar y la acompaña cuando Agnar la llama. Le enseñó desde su primer contacto con una espada a comprobar que la hoja no se atasque al desenvainar. Sigue a Elvar en la persecución de una niña y mata de un hachazo a la mujer que intenta herirle las piernas. Obedece su señal para rodear la cabaña, abre parte de la pared con el hacha y encuentra el rastro hacia el bosque. Viste una brynja o cota de malla. LIBRO 1, CAPÍTULO 7: Vigila el bosque y se interpone, ceñudo, entre Elvar y Biórr cuando este la ayuda. Biórr lo toma por su padre; Elvar piensa que no lo es. Explora junto a ambos por orden de Agnar. Combate por parejas con Elvar contra el trol, la recoge cuando cae y lanza un hachazo a los testículos de la criatura antes de caer ambos. Después la ayuda a levantarse; ella no está herida. LIBRO 1, CAPÍTULO 9: Deja dormir a Elvar en vez de despertarla para la última guardia y le lleva gachas. Ella recuerda su destreza y que nunca necesita jactarse. Atribuye el temblor a Lik-Rifa: según él, la diosa dragón quedó encerrada bajo Oskutreð antes de Guðfalla y desgarra las almas que pasan por Vergelmir. Desaprueba a Biórr y no niega que le disgusten quienes se interesan por Elvar. Se lanza al mar tras ella, apuñala a la serpiente sin detenerla y, después de que el canto la ahuyente, ayuda a Elvar y al niño a volver a bordo. La reprende por el riesgo, aunque reconoce haberse comportado como un necio aún mayor al seguirla. LIBRO 1, CAPÍTULO 14: Afirma que todas las rocas de juramento fueron destruidas y lleva la mano al hacha cuando se revelan las inscripciones. Por la noche queda sujeto por gusanos que intentan entrar por su boca cerrada y su nariz. Tras liberarse ayuda a cortar los que sujetan a Elvar, la levanta y comprueba cómo está.",
        star: ""
    },
    {
        id: "biorr", label: "Biórr", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Localiza el campamento y emplea fuego contra los gusanos.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero de los Battle-Grim que desembarca en Iskalt. Comenta el frío sonriendo a Elvar, quien percibe interés en sus ojos y mira hacia otro lado. Sigue a Elvar, Grend, Sighvat y el esclavo rastreador durante el combate y llega a la cabaña con el rostro encendido por la lucha y la carrera. LIBRO 1, CAPÍTULO 7: Sostiene a Elvar cuando resbala; ambos sonríen, pero ella aparta el brazo. Ante la hostilidad de Grend, bromea con que su padre no lo aprecia, sin que Elvar le explique el error. Sigue a ambos fuera del sendero y Agnar lo elige con ellos como explorador. Avanza junto al arroyo y presencia al hombre combatiendo al trol. LIBRO 1, CAPÍTULO 9: Sonríe a Elvar al despertar. Lleva dos cuencos de gachas a la esposa de Berak y a su hijo, y se agacha para entregar al niño su comida. LIBRO 1, CAPÍTULO 14: Encuentra una meseta abrigada por alisos donde pueden acampar sin perder de vista el barco. Reconoce la Guðfalla en las imágenes reveladas. Durante el ataque enciende una rama en las brasas y quema los gusanos; otros lo imitan y los hacen retirarse bajo tierra.",
        star: ""
    },
    {
        id: "sighvat", label: "Sighvat", group: "ELVAR", type: "Personaje — Guerrero de los Battle-Grim",
        status: "updated",
        previousState: "Libera a Agnar durante el ataque nocturno.",
        desc: "LIBRO 1, CAPÍTULO 5: Guerrero voluminoso que marca el ritmo de los cincuenta remos golpeando un barril con una cuerda anudada y transmite las órdenes de Agnar. Amarra el Wave-Jarl al muelle. Anuncia a los Battle-Grim como cazadores de Vaesen y Tainted y amenaza a los isleños con demostrar su fama. Lleva un saco y sujeta la cadena del esclavo Hundur, al que arrastra y obliga a rastrear. Sigue a Elvar y Grend hasta la cabaña y pregunta al esclavo si Berak estuvo allí; este lo confirma asintiendo. Grita «niðing» a los remeros del Wave-Jarl como insulto. LIBRO 1, CAPÍTULO 7: Lleva encadenado al Hundur durante el ascenso y lo fija a un árbol con un pasador de hierro antes del combate. Golpea con una cadena la cabeza del hombre perseguido, lo derriba de un puñetazo y organiza su inmovilización. Le coloca el collar y remacha el pasador con el pomo de su seax. Golpea a la mujer cuando protesta por la amenaza al niño. La fuerza transformada de Berak lo arrastra junto con seis hombres hasta que Agnar activa el collar. Elvar conoce la contundencia de sus golpes en el pugil-ring. LIBRO 1, CAPÍTULO 9: Asegura a Berak y al Hundur con anillas y pasadores de hierro fijados a la borda. Hiere con un hacha de mano a la serpiente por debajo del cráneo; una sacudida lo derriba. Después dirige los cincuenta remos, marca el ritmo sobre un escudo y da la orden de izar mástil y vela. Gobierna el timón mientras Agnar conversa con Elvar. LIBRO 1, CAPÍTULO 14: Desembarca primero y conduce a Berak, Uspa y Bjarn hasta el campamento. Reparte estofado y bromea sobre el tamaño de la roca antes de quedar atónito ante su revelación. Pregunta por la causa de la guerra divina. Durante el ataque se arranca los gusanos, los aplasta rodando y libera a Agnar con hacha y seax. Declara que no volverá a dormir.",
        star: ""
    },
    {
        id: "thrud", label: "Thrud", group: "ELVAR", type: "Personaje — Guerrero herido",
        status: "updated",
        previousState: "Permanece de guardia junto al barco por su herida.",
        desc: "LIBRO 1, CAPÍTULO 7: Una flecha le atraviesa la pantorrilla en el combate de la aldea. Es la única baja de la compañía en aquel enfrentamiento. Agnar lo deja atrás, furioso por no seguir, con una docena de guerreros que custodian a los prisioneros. LIBRO 1, CAPÍTULO 14: Queda con otros cuatro hombres custodiando el Wave-Jarl en la playa debido a la herida de flecha; protesta mientras los demás ascienden al campamento. No se le sitúa entre los atacados en la meseta.",
        star: ""
    },
    {
        id: "wave-jarl", label: "Wave-Jarl", group: "ELVAR", type: "Barco — Drakkar",
        status: "updated",
        previousState: "Queda varado y vigilado en la isla de la roca.",
        desc: "LIBRO 1, CAPÍTULO 5: Drakkar de proa de dragón que transporta a los Battle-Grim a Iskalt. Cincuenta remos lo impulsan bajo el ritmo de Sighvat, mientras Agnar maneja el remo de gobierno. Al llegar a Iskalt se recogen los remos en sus soportes y se cierran los agujeros con tapones giratorios. Sus cofres de mar sirven de asiento y guardan el equipo. Kráka canta para mantener a serpientes y otros Vaesen marinos lejos del casco. Entra en un puerto natural y queda amarrado a un muelle; diez o doce guerreros permanecen como guardia. LIBRO 1, CAPÍTULO 9: Carga pescado conservado, carne de tiburón, marfil de morsa, pieles, cabras y los restos valiosos del trol, además de los cautivos. Una serpiente devora parte de una cabra y rompe la borda al caer sobre cubierta; los guerreros revisan las tracas del casco después. La esposa de Berak la ahuyenta con su canto. Parte con cincuenta remos, iza mástil y vela y navega hacia el sur con Kráka protegiéndolo. Agnar anuncia Snakavik como destino. LIBRO 1, CAPÍTULO 14: Tras dos días de navegación al sur de Iskalt, aproximadamente a mitad de camino de Snakavik, queda varado por encima de la marea en una playa estrecha de guijarros de la isla más meridional de las Islas de la Escarcha. Lo amarran con cuerdas a rocas y cinco hombres lo custodian. La meseta del campamento mantiene el barco a la vista.",
        star: ""
    },
    {
        id: "battle-grim", label: "Terrores de la batalla (Battle-Grim)", group: "ELVAR", type: "Facción — Compañía guerrera",
        status: "updated",
        previousState: "Sufren un ataque nocturno con una muerte observada y abandonan el campamento.",
        desc: "LIBRO 1, CAPÍTULO 5: Compañía de Agnar que viaja en el Wave-Jarl. Sighvat los proclama matadores de Vaesen, cazadores de Tainted y segadores de almas. Sus guerreros curtidos portan hierro y cotas de malla; Elvar es la más joven. Mantienen esclavizados a Kráka y a un rastreador Hundur. Desembarcan en Iskalt buscando a Berak; forman una línea de escudos ante los aldeanos y avanzan con gritos de guerra cuando Agnar ataca a Hrut. Continúan la persecución después de hallar vacía la cabaña. LIBRO 1, CAPÍTULO 7: El ataque a la aldea termina con Hrut muerto, otra docena de aldeanos caídos y los demás rendidos. Su única baja allí es la herida de flecha de Thrud en la pantorrilla; una docena queda con él custodiando prisioneros y veintiséis siguen a Agnar. En las colinas luchan por parejas contra un trol: uno muere ensartado, una mujer arde en la lava y otra es aplastada. Elvar mata al trol; el hombre perseguido mata a otro guerrero antes de ser capturado como Berak. Capturan también a la mujer y al niño y Agnar ordena recoger los muertos y aprovechar el cadáver del trol. LIBRO 1, CAPÍTULO 9: Cargan provisiones y mercancías tomadas de la aldea, que sigue sometida y vigilada hasta la partida. Sus guerreros llevan trofeos de hueso, diente, colmillo o uña concedidos por Agnar cuando los considera merecidos. Elvar lleva poco más de tres años con ellos y ocupa la primera fila del muro de escudos. Arrojan lanzas contra la serpiente que ataca el barco y después zarpan de Iskalt hacia el sur. Los guerreros raspan la piel del trol y hierven sus huesos para retirar la carne. Preparan piel, esqueleto y dientes, testículos en salmuera, corazón e hígado conservados con hielo y uñas destinadas a molerse. Los aldeanos de Iskalt siguen bajo vigilancia mientras los guerreros cargan mercancías y preparan la partida. LIBRO 1, CAPÍTULO 14: Se refugian de una tormenta a mitad de la ruta hacia Snakavik y acampan junto a una roca de juramento que creían imposible encontrar intacta. La activación de Uspa revela imágenes de la guerra divina. Por la noche una multitud de gusanos inmoviliza a guerreros y cautivos; al menos un guerrero anónimo muere, semienterrado y con gusanos en la garganta. Se liberan y usan ramas encendidas siguiendo a Biórr hasta que las criaturas se retiran. Agnar manda volver al barco.",
        star: ""
    },
    {
        id: "uspa", label: "Uspa", group: "ELVAR", type: "Personaje — Bruja Seiðr cautiva",
        desc: "LIBRO 1, CAPÍTULO 14: Nombre de la esposa de Berak y madre de Bjarn, cautiva de los Battle-Grim. Es la mujer que desvió al Sjávarorm cantando en el capítulo 9 y que arrojó el objeto a la lava en el capítulo 7, aún sin explicar qué destruyó ni por qué. Pese a la protesta de Berak, ofrece revelar las inscripciones de la roca. Pide a Agnar que le corte la palma y presiona la sangre contra el granito: una luz recorre las líneas, quema el musgo y descubre runas e imágenes. Elvar la identifica como bruja Seiðr de sangre de Snaka. Relata que Lik-Rifa mató a la hija de Orna y Ulfrir, creó a los vaesen y fue encerrada por Orna y sus hermanos bajo Oskutreð, provocando la guerra divina. Se registra como relato de Uspa. Escupe tras la negación de Elvar sobre los descendientes del dragón, sin ofrecer una demostración de su existencia. Berak la libera a ella y a su hijo de los gusanos.",
        star: "★ PRIMERA IDENTIFICACIÓN POR NOMBRE: capítulo 14. Su conocimiento y su magia no explican el objeto destruido; véase objeto-quemado-iskalt."
    },
    {
        id: "bjarn", label: "Bjarn", group: "ELVAR", type: "Personaje — Hijo cautivo de Berak y Uspa",
        desc: "LIBRO 1, CAPÍTULO 14: Nombre del niño que acompaña a Berak y Uspa, sus padres. Es el niño amenazado por Agnar durante la captura del capítulo 7 y rescatado del mar por Elvar en el capítulo 9; esos hechos no revelaron entonces su nombre. Llama a su madre cuando ella se aproxima a la roca y Uspa lo tranquiliza nombrándolo. Durante el ataque nocturno Berak arranca los gusanos que lo sujetan y lo levanta. El capítulo no demuestra poderes ni linaje propio del niño.",
        star: ""
    },
    {
        id: "oath-stone-frost-isles", label: "Roca de Juramento de Islas de Escarcha", group: "OBJETO", type: "Objeto — Roca de juramento superviviente",
        desc: "LIBRO 1, CAPÍTULO 14: Gran bloque de granito cubierto de musgo y liquen, alto y ancho como una sala de hidromiel, en una meseta de la isla más meridional de las Islas de la Escarcha. El lugar tiene hierba pastada por cabras y alisos que abrigan del viento oriental. Kráka la reconoce pese a la creencia de que todas habían sido destruidas. El Hundur detecta sangre y juramentos antiguos bajo el musgo. Al contacto con la sangre de Uspa, líneas luminosas queman la cubierta vegetal y descubren runas e imágenes de la guerra divina: Lik-Rifa cautiva entre raíces, Ulfrir encadenado, cadáveres del Bosque de las Horcas y los dioses combatiendo, incluido Snaka devorando a sus hijos. Continúa brillando débilmente después del ataque. La posible relación de su luz con los gusanos es una sospecha de Elvar; véase piedra-gusanos.",
        star: "★★ CAPÍTULO 14: Su supervivencia contradice la creencia de destrucción total; la atracción de los gusanos sigue sin confirmar en piedra-gusanos."
    },
    {
        id: "night-wyrm", label: "Gusanos Nocturnos (Night-Wyrms)", group: "VAESEN", type: "Criatura — Gusanos subterráneos",
        desc: "LIBRO 1, CAPÍTULO 14: Criaturas pálidas, translúcidas, segmentadas, viscosas y provistas de cerdas. Los ejemplares observados tienen aproximadamente el grosor de un pulgar y la longitud de un seax. Emergen del suelo, se enroscan para inmovilizar y estrangular e intentan penetrar por boca y nariz. El fuego quema sus cuerpos y provoca su retirada bajo tierra. El capítulo no demuestra que una roca de juramento los convoque. El ataque concreto pertenece a ataque-night-wyrms.",
        star: ""
    },
    {
        id: "ataque-night-wyrms", label: "Ataque de los Gusanos Nocturnos", group: "EVENTO", type: "Evento — Ataque al campamento",
        desc: "LIBRO 1, CAPÍTULO 14: En la noche posterior a la revelación de la roca, cientos o miles de gusanos emergen del suelo e inmovilizan a guerreros y cautivos dormidos. Berak se libera y rescata a Uspa y Bjarn; Sighvat libera a Agnar, y este y Grend ayudan a Elvar. Un gusano penetra en la nariz de Elvar y ella lo extrae entero. Al menos un guerrero anónimo aparece muerto, semienterrado y con gusanos en la garganta. Biórr prende una rama, otros lo imitan y el fuego obliga a las criaturas a retirarse. Agnar ordena volver al Wave-Jarl. Elvar se pregunta si la roca los atrajo: no se confirma la causa.",
        star: ""
    },
    {
        id: "piedra-gusanos", label: "¿La Roca Atrajo a los Gusanos?", group: "TRAMA", type: "Trama — Causa del ataque sin confirmar",
        desc: "LIBRO 1, CAPÍTULO 14: PRIMERA EVIDENCIA: LIBRO 1, CAPÍTULO 14. Tras el ataque nocturno, Elvar observa que la roca aún brilla y se pregunta si llamó o atrajo a los gusanos, pues nunca los había visto en tal número. La proximidad temporal es una observación, no prueba causal. Evidencia: oath-stone-frost-isles, ataque-night-wyrms y la observación de elvar. Pregunta pendiente: si existe relación entre la roca activada y la concentración de criaturas, y mediante qué mecanismo. ESTADO: ABIERTA.",
        star: ""
    },
    {
        id: "gallows-wood", label: "Bosque de las Horcas", group: "LUGAR", type: "Lugar mítico — Escenario de la primera venganza",
        desc: "LIBRO 1, CAPÍTULO 14: Según el relato que Elvar reconoce en las imágenes de la roca, Orna y Ulfrir vengaron la muerte de su primera hija a manos de Lik-Rifa matando a los descendientes tocados por la sangre de la diosa dragón. Abrieron sus espaldas, separaron las costillas a modo de alas y colgaron sus cadáveres de los árboles. Las figuras representadas tienen alas esqueléticas saliendo de la espalda. Elvar lo recuerda como la primera deuda de sangre. El capítulo no establece aquí la ubicación geográfica del bosque.",
        star: ""
    },
    {
        id: "blood-eagle", label: "Águila de Sangre (Blood-Eagle)", group: "NORSE", type: "Práctica — Mutilación de la espalda",
        desc: "LIBRO 1, CAPÍTULO 14: Nombre actual del procedimiento que el relato del Bosque de las Horcas describe: abrir la espalda y separar las costillas en una imitación de alas. Elvar relaciona el nombre con aquella venganza mítica. Los responsables, víctimas y cadáveres colgados de aquella ocurrencia se recogen en gallows-wood.",
        star: ""
    },
    {
        id: "hundur-dios", label: "Hundur, Dios-Sabueso", group: "DIOS", type: "Dios — Sabueso",
        desc: "LIBRO 1, CAPÍTULO 14: Deidad con forma de sabueso representada entre los dioses en guerra de la roca. Elvar atribuye a su sangre las capacidades del esclavo rastreador llamado Hundur-thrall. El nombre del dios no es un nombre personal confirmado para ese esclavo.",
        star: ""
    },
    {
        id: "dragon-born", label: "Dragon-Born (Tainted de Lik-Rifa)", group: "MAGIA", type: "Concepto — Linaje de dragón discutido",
        desc: "LIBRO 1, CAPÍTULO 14: Denominación de los hipotéticos Tainted descendientes de Lik-Rifa. El relato del Bosque de las Horcas habla de sus descendientes tocados por sangre divina; su existencia actual se discute. Elvar la niega porque no ha visto ninguno ni recibido testimonios fiables; Agnar replica que no haberlos visto no prueba que no existan. El capítulo no presenta un ejemplar identificado. Véase existencia-dragon-born.",
        star: ""
    },
    {
        id: "existencia-dragon-born", label: "¿Existen Descendientes del Dragón?", group: "TRAMA", type: "Trama — Linaje de Lik-Rifa sin confirmar",
        desc: "LIBRO 1, CAPÍTULO 14: PRIMERA EVIDENCIA: LIBRO 1, CAPÍTULO 14. Elvar sostiene que Lik-Rifa es un cuento porque no conoce un Tainted nacido del dragón ni un testigo fiable. Ninguno de los presentes afirma haber visto uno. El relato del Bosque de las Horcas sí atribuye descendientes a Lik-Rifa, y Agnar señala que la falta de observación no demuestra inexistencia. Pregunta pendiente: si existen actualmente los dragon-born; las imágenes y el relato no aportan un individuo contemporáneo confirmado. Participantes: elvar, agnar y uspa; evidencia: dragon-born y gallows-wood. ESTADO: ABIERTA.",
        star: ""
    },
    {
        id: "ulfrir", label: "Ulfrir", group: "DIOS", type: "Dios muerto — Lobo",
        status: "updated",
        previousState: "Añade la representación encadenada y la venganza mítica con Orna.",
        desc: "LIBRO 1, CAPÍTULO 12: Nombre invocado por Thorkel al llamar «Ulfrir-kin» a la guerrera esclavizada de Sigrún. La expresión la presenta como emparentada con Ulfrir; este capítulo no expone la identidad ni la historia de ese referente. LIBRO 1, CAPÍTULO 13: Galinn canta a Ulfrir como dios lobo, rompedor de cadenas, que corre a Guðfalla y muere en la batalla. Esta identidad procede de la saga, sin identificar a la esclava de Sigrún ni atribuirle nuevas capacidades. LIBRO 1, CAPÍTULO 14: Kráka reconoce al dios lobo en la roca, representado encadenado y acosado por pequeñas figuras. En el relato recordado por Elvar es padre, junto a Orna, de una primera hija asesinada por Lik-Rifa; ambos se vengan sobre los descendientes de la diosa dragón en el Bosque de las Horcas.",
        star: ""
    },
    {
        id: "orna", label: "Orna", group: "DIOS", type: "Dios — Muerto",
        status: "updated",
        previousState: "Añade parentescos, venganza y su papel en el encierro según los relatos.",
        desc: "LIBRO 1, CAPÍTULO 10: Dios muerto de restos alados. Según Sigrún, sus huesos se alzan sobre la fortaleza de Helka en Darl. LIBRO 1, CAPÍTULO 13: La saga de Galinn la representa alada como un águila, con garras y pico que desgarran, y la cuenta entre los dioses abatidos en la guerra. LIBRO 1, CAPÍTULO 14: Elvar recuerda que es hermana de Lik-Rifa y madre, con Ulfrir, de una primera hija a la que la diosa dragón mató y cortó las alas. Según ese relato, Orna y Ulfrir se vengaron matando a los descendientes de Lik-Rifa en el Bosque de las Horcas. Uspa cuenta que Orna descubrió el plan secreto de su hermana y la atrajo a las cámaras bajo Oskutreð, donde la encerró con ayuda de sus hermanos.",
        star: ""
    },
    {
        id: "likrafa", label: "Lik-Rifa", group: "DIOS", type: "Deidad — Dragón en la tradición de Grend",
        status: "updated",
        previousState: "Añade el origen atribuido de la disputa sin confirmar su supervivencia.",
        desc: "LIBRO 1, CAPÍTULO 4: Deidad asociada a la cámara de Vergelmir. LIBRO 1, CAPÍTULO 9: Según Grend, es una diosa dragón e hija de Snaka, encerrada mediante astucia en una cámara bajo Oskutreð antes de Guðfalla. Esta tradición sostiene que no murió con los otros dioses y que desgarra las almas de los guerreros en Vergelmir. Los relatos infantiles la presentan como una devoradora de quienes salen de noche. Su supervivencia permanece discutida. LIBRO 1, CAPÍTULO 13: Galinn la llama dragón astuto y desgarradora de cadáveres de las Colinas de Luna Oscura; canta su encadenamiento en una cámara profunda bajo Oskutreð. El poema no aclara la cronología exacta respecto de Guðfalla ni demuestra su estado presente. LIBRO 1, CAPÍTULO 14: Según el relato recordado por Elvar, mató a la primera hija de su hermana Orna y Ulfrir y le cortó las alas; la represalia de ambos recayó sobre sus descendientes tocados por sangre divina. Uspa afirma que Rotta alimentó su temor a que Orna tramara su muerte, que creó en secreto a los vaesen para destruir a su hermana y sus aliados y que Orna descubrió el plan, la atrajo bajo Oskutreð y la encerró con ayuda de sus hermanos. Uspa presenta ese encierro como causa de la guerra. La roca muestra un dragón pálido cautivo entre las raíces. Estas imágenes y relatos no demuestran por sí solos su estado actual ni la existencia actual de descendientes del dragón.",
        star: ""
    },
    {
        id: "rotta", label: "Rotta", group: "DIOS", type: "Dios — Rata",
        status: "updated",
        previousState: "Añade su forma de rata y el papel que Uspa le atribuye.",
        desc: "LIBRO 1, CAPÍTULO 13: Galinn lo nombra entre los dioses que acuden a la Llanura de Batalla y lo califica de engañoso. No aporta forma ni destino individual. LIBRO 1, CAPÍTULO 14: Se identifica como dios rata en las imágenes de la roca. Según Uspa, alimentó la paranoia de Lik-Rifa acerca de un supuesto plan de Orna para matarla.",
        star: ""
    },
    {
        id: "snaka", label: "Snaka", group: "DIOS", type: "Dios Muerto — Padre",
        status: "updated",
        previousState: "Añade la representación y las atribuciones del capítulo.",
        desc: "LIBRO 1, CAPÍTULO 1: Según la tradición relatada por Thorkel, Snaka es la serpiente, el Más Anciano y padre de los dioses; algunos lo consideran el mayor de ellos, y era el más grande. Había crecido desde el nacimiento del mundo. Sus hijos incluyen águila, oso, lobo y dragón, todavía sin nombres propios en esta fuente. Murió a manos de sus hijos en la guerra divina. Su caída destrozó reinos y sus huesos, cubiertos de tierra, forman montañas. LIBRO 1, CAPÍTULO 9: Según Grend, Lik-Rifa es su hija dragón y quedó encerrada antes de Guðfalla, sin poder luchar junto a él. Agnar le atribuye también la ascendencia divina de la esposa de Berak; es una genealogía no confirmada por ella. LIBRO 1, CAPÍTULO 13: La saga de Galinn lo llama serpiente y segador de almas; canta que muda la piel al despertar y que su caída, entre veneno y destrucción de tierras y montañas, quebró las laderas del monte Eldrafell. Se conserva como tradición cantada. LIBRO 1, CAPÍTULO 14: La roca lo representa con veneno en los colmillos, entrando en la lucha y devorando a sus hijos. Kráka dice que amaba a sus creaciones cuando no se alimentaba de ellas. Elvar atribuye sangre suya tanto a Kráka como a Uspa; son identificaciones de Elvar, no una nueva demostración genealógica.",
        star: "★★ La geografía se presenta como el resto material de un cuerpo divino, a través de la saga de Thorkel."
    },
    {
        id: "gudfall", label: "Guðfalla (Caída de Dioses)", group: "EVENTO", type: "Evento Histórico",
        status: "updated",
        previousState: "Añade la explicación de Uspa sobre el inicio de la guerra.",
        desc: "LIBRO 1, CAPÍTULO 1: La guerra y caída de los dioses se narran aquí sin emplear todavía el nombre Guðfalla, conservado como identificador canónico del archivo. Según Thorkel, los parientes divinos combatieron entre sí, los hijos mataron a Snaka y su caída aplastó y levantó reinos, dejando entrar al mar. Orka añade que abrió el foso de los vaesen y liberó sus criaturas. La época actual se llama Edad de la Paz porque la guerra antigua ha terminado y los dioses están muertos. LIBRO 1, CAPÍTULO 9: Grend emplea el nombre Guðfalla y sostiene que Lik-Rifa no murió aquel día con los otros dioses: había quedado encerrada y no pudo acudir junto a Snaka. Elvar disputa su supervivencia durante los casi trescientos años transcurridos. LIBRO 1, CAPÍTULO 10: Thorkel explica a Breca que los supervivientes de la caída de Snaka odiaron y persiguieron a los descendientes de los dioses, culpando a estos de haber roto el mundo. El culto a los dioses muertos está prohibido bajo pena de muerte. LIBRO 1, CAPÍTULO 13: Galinn canta el toque del Vackna que despierta a los dioses y los llama a la Llanura de Batalla. Combaten dioses, parientes y descendientes de sangre divina: Berser es atravesado, Orna desgarrada y Ulfrir muerto. Lik-Rifa queda encadenada bajo Oskutreð; cae Snaka, se quiebra Eldrafell y los vaesen salen del foso entre hielo y fuego. El canto presenta el fin y renacimiento del mundo. Su secuencia poética no precisa cuándo fue encarcelada Lik-Rifa; no sustituye la afirmación anterior de Grend de que ocurrió antes de la batalla. LIBRO 1, CAPÍTULO 14: La roca superviviente representa episodios de la guerra divina. Uspa atribuye su comienzo a celos, asesinato y venganza: Rotta avivó la sospecha de Lik-Rifa hacia Orna; el asesinato de la hija de Orna y Ulfrir provocó represalias, y el plan secreto de destruir a Orna con vaesen llevó al encierro de Lik-Rifa bajo Oskutreð. Uspa presenta ese encierro como detonante de la guerra. Agnar usa la ruina causada por los dioses para justificar que sus descendientes nunca recuperen el poder. Se distinguen el relato sobre el origen y la interpretación política del cazador.",
        star: "★★ Orka cuestiona que el final de aquella guerra equivalga a paz para quienes viven ahora."
    },
    {
        id: "oskutred", label: "Oskutreð (Árbol de Ceniza)", group: "COSMO", type: "Lugar mítico — Árbol y prisión",
        status: "updated",
        previousState: "Amplía la tradición de su prisión subterránea.",
        desc: "LIBRO 1, CAPÍTULO 9: Árbol de Ceniza. Según la tradición de Grend, bajo él se encuentra la cámara donde Lik-Rifa fue encerrada mediante astucia antes de Guðfalla. LIBRO 1, CAPÍTULO 14: La roca representa al dragón encerrado en una cámara entre las raíces de un gran árbol. Uspa identifica las cavernas y cámaras de sus raíces como el lugar al que Orna atrajo a Lik-Rifa para encerrarla con sus hermanos.",
        star: ""
    },
    {
        id: "tainted", label: "Tainted", group: "MAGIA", type: "Concepto — Personas tocadas por los dioses",
        status: "updated",
        previousState: "Añade linajes observados según Elvar y distingue el linaje de dragón discutido.",
        desc: "LIBRO 1, CAPÍTULO 5: Personas tocadas por los dioses, perseguidas y esclavizadas por sus capacidades. LIBRO 1, CAPÍTULO 7: Los Berserkir constituyen un linaje asociado a Berser. LIBRO 1, CAPÍTULO 10: Según Thorkel, son descendientes de los dioses cuya sangre se mezcla con la humana. El odio de los supervivientes de la Guðfalla dio origen a su persecución. LIBRO 1, CAPÍTULO 14: Kráka presenta a los dioses de la roca como los antepasados de los Tainted. El testimonio de Elvar amplía los linajes conocidos con Toro, Halcón y Caballo, que dice haber visto en Iskidan. La categoría de descendientes del dragón permanece discutida; no se demuestra que la ausencia de ejemplares observados implique inexistencia.",
        star: ""
    },
    {
        id: "objeto-quemado-iskalt", label: "Misterio del Objeto Quemado", group: "TRAMA", type: "Trama — Pregunta u objetivo abierto",
        status: "updated",
        previousState: "Se identifica a Uspa sin resolver el objeto destruido.",
        desc: "LIBRO 1, CAPÍTULO 7: La mujer que acompaña a Berak arroja a la lava un objeto semejante a una tablilla de cera o un libro de pergamino. No se confirma qué era ni por qué lo destruyó. LIBRO 1, CAPÍTULO 9: Elvar pregunta a la mujer qué arrojó a la lava, sin obtener respuesta. LIBRO 1, CAPÍTULO 14: La mujer que destruyó el objeto es nombrada Uspa. Revela inscripciones con sangre y relata la guerra divina, pero esos hechos no identifican el objeto ni explican su destrucción. Pregunta pendiente: qué arrojó a la lava y por qué. ESTADO: ABIERTA.",
        star: ""
    },
];
