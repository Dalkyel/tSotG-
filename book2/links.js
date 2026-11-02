// ═══════════════════════════════════════════════════════════════════
// BOOK 2 — THE HUNGER OF THE GODS
// Links introduced in Book 2
// ═══════════════════════════════════════════════════════════════════

const linksBook2 = [
    // New links go here as Book 2 is read
    // Format: same as Book 1 links, with added field:
    //   book: 2
    //
    // To mark a Book 1 link as broken/evolved:
    //   { source: 'x', target: 'y', label: 'old label', status: 'broken', reason: 'why' }

    // Cast list confirmations
    { source: 'myrk', target: 'ilska', label: 'hermana menor de', type: 'rel' },
    { source: 'myrk', target: 'drekr', label: 'hermana de', type: 'rel' },
    { source: 'myrk', target: 'raven-feeders', label: 'miembro de', type: 'rel' },
    { source: 'myrk', target: 'dragon-born', label: 'es', type: 'lore' },
    { source: 'estrid', target: 'helka', label: 'hija de', type: 'rel' },
    { source: 'estrid', target: 'hakon', label: 'hermana de', type: 'rel' },
    { source: 'orka', target: 'bloodsworn', label: 'fue jefa de (= Skullsplitter)', type: 'rel' },
    { source: 'breca', target: 'ulfhednar', label: 'confirmado Tainted', type: 'lore' },
    { source: 'harek', target: 'tainted', label: 'confirmado Tainted', type: 'lore' },
    { source: 'einar', target: 'berserkir', label: 'confirmado como', type: 'lore' },
    { source: 'vaesen-gen', target: 'likrafa', label: 'creados por', type: 'lore' },
    { source: 'seidr', target: 'snaka', label: 'poder heredado de', type: 'lore' },

    // Recap confirmations
    { source: 'biorr', target: 'bjarn', label: 'organizó el secuestro de', type: 'trama' },
    { source: 'biorr', target: 'ilska', label: 'guió a Oskutreð a', type: 'trama' },

    // Capítulo 1
    { source: 'orka', target: 'mord-lif', label: 'revela que es Tainted a', type: 'rel' },
    { source: 'orka', target: 'svik', label: 'reencuentro tenso — "nos dejaste"', type: 'conflict' },
    { source: 'mord-lif', target: 'grimholt', label: 'Mord muere en, enterrado por Lif y Orka', type: 'event' },
    { source: 'skalk', target: 'grimholt', label: 'huye en snekke río abajo con Vol y un guerrero drengr', type: 'event' },
    { source: 'vesli', target: 'likrafa', label: 'anuncia la liberación de', type: 'lore' },
    { source: 'spert', target: 'likrafa', label: 'confirma la liberación de', type: 'lore' },
    { source: 'glornir', target: 'vol', label: 'confirma a Orka que Skalk tiene cautiva a', type: 'trama' },
    { source: 'orka', target: 'thorkel', label: 'sueña con él increpándola: "They took him"', type: 'rel' },
    { source: 'orka', target: 'solstodur', label: 'despierta durante la', type: 'lore' },

    // Capítulo 2
    { source: 'biorr', target: 'agnar', label: 'asesinó con una lanza al holmganga tenderle el brazo', type: 'conflict' },
    { source: 'elvar', target: 'tumulo-agnar', label: 'jura venganza contra Biórr en', type: 'event' },
    { source: 'elvar', target: 'biorr', label: 'jura vengarse — "Biórr morirá por su traición"', type: 'conflict' },
    { source: 'sighvat', target: 'tumulo-agnar', label: 'pronuncia el elogio funerario en', type: 'event' },
    { source: 'uspa', target: 'elvar', label: 'invoca el blóð svarið para exigir que vaya tras Bjarn', type: 'conflict' },
    { source: 'elvar', target: 'blod-svarid', label: 'arde al dudar en voz alta de cumplirlo', type: 'magic' },
    { source: 'sighvat', target: 'blod-svarid', label: 'casi lo rompe en voz alta, brazo en llamas', type: 'magic' },
    { source: 'uspa', target: 'blod-svarid', label: 'explica que conoce los pensamientos y el corazón del jurado', type: 'lore' },
    { source: 'elvar', target: 'grend', label: 'regala hacha de nudos de lobo hallada junto al esqueleto de Ulfrir', type: 'rel' },
    { source: 'grend', target: 'elvar', label: 'entrega brynja hallada junto al esqueleto de Ulfrir', type: 'rel' },
    { source: 'kraka', target: 'biorr', label: 'corrió a liberarse de su collar junto a él la noche de la traición', type: 'trama' },
    { source: 'elvar', target: 'hijas-orna-ulfrir', label: 'captura y esclaviza con collar de thrall a Skuld', type: 'conflict' },
    { source: 'hijas-orna-ulfrir', target: 'collares', label: 'sometida por primera vez a un', type: 'magic' },
    { source: 'captura-skuld', target: 'elvar', label: 'protagonizada por', type: 'event' },
    { source: 'captura-skuld', target: 'hijas-orna-ulfrir', label: 'esclaviza a Skuld, superviviente de las', type: 'event' },
    { source: 'captura-skuld', target: 'collares', label: 'usa un', type: 'magic' },
    { source: 'hijas-orna-ulfrir', target: 'oskutred', label: 'Skuld revela que el verdadero tesoro está bajo', type: 'lore' },
    { source: 'orv-sneak', target: 'battle-grim', label: 'miembro, cazador de', type: 'rel' },
    { source: 'orv-sneak', target: 'hijas-orna-ulfrir', label: 'encuentra el arco de la hermana blanca muerta', type: 'lore' },
    { source: 'tumulo-agnar', target: 'agnar', label: 'túmulo y ritos funerarios de', type: 'event' },
    { source: 'tumulo-agnar', target: 'battle-grim', label: 'ritual de duelo de', type: 'event' },

    // Capítulo 3
    { source: 'varg', target: 'tumulo-mord', label: 'ayuda a cavar y levantar', type: 'event' },
    { source: 'mord-lif', target: 'tumulo-mord', label: 'entierro y juramento de sangre de Lif en', type: 'event' },
    { source: 'orka', target: 'tumulo-mord', label: 'dirige el rito funerario en', type: 'event' },
    { source: 'mord-lif', target: 'gudvarr', label: 'Lif jura blood feud — "morirá por mi mano"', type: 'conflict' },
    { source: 'glornir', target: 'consejo-guerra-grimholt', label: 'reúne el consejo en', type: 'event' },
    { source: 'orka', target: 'consejo-guerra-grimholt', label: 'relata la historia de Drekr en', type: 'event' },
    { source: 'varg', target: 'hombre-ojos-rojos', label: 'lleva como botín el seax gemelo a los de Thorkel', type: 'lore' },
    { source: 'hombre-ojos-rojos', target: 'seaxes-tainted', label: 'portaba un seax del mismo artesano que', type: 'lore' },
    { source: 'skalk', target: 'darl', label: 'huye remando hacia, según deducción de Orka', type: 'event' },
    { source: 'olvir-yrsa', target: 'vol', label: 'avistada por Vesli cargando a, en la huida del Grimholt', type: 'event' },
    { source: 'consejo-guerra-grimholt', target: 'darl', label: 'decide marchar a', type: 'event' },

    // Capítulo 4
    { source: 'elvar', target: 'vergelmir', label: 'lidera el descenso de los Terrores de la batalla a', type: 'event' },
    { source: 'hijas-orna-ulfrir', target: 'vergelmir', label: 'guía a Elvar y los Terrores de la batalla por', type: 'event' },
    { source: 'elvar', target: 'collares', label: 'explica a Skuld las reglas del collar: obediencia, castigo y alcance infinito', type: 'magic' },
    { source: 'hijas-orna-ulfrir', target: 'orv-sneak', label: 'reconoce el arco y las flechas de su hermana Verdandi en manos de', type: 'lore' },
    { source: 'grend', target: 'orv-sneak', label: 'entrega un segundo fardo de flechas de Verdandi encontradas en la forja', type: 'rel' },
    { source: 'likrafa', target: 'vergelmir', label: 'se alimentó de almas y criaturas durante 300 años en', type: 'lore' },
    { source: 'likrafa', target: 'libro-negro-vergelmir', label: 'protegió en secreto con runas y guardianes', type: 'trama' },
    { source: 'huld', target: 'libro-negro-vergelmir', label: 'cruza el umbral rúnico y detona la trampa de', type: 'event' },
    { source: 'vergelmir', target: 'snaka', label: 'el camino de las almas conduce a los secretos de', type: 'lore' },
    { source: 'storr', target: 'elvar', label: 'su salón, con Galdurwoman y Berserkir-thralls, le enseñó sin saberlo las palabras del collar', type: 'lore' },
    { source: 'exploracion-vergelmir', target: 'elvar', label: 'protagonizada por', type: 'event' },
    { source: 'exploracion-vergelmir', target: 'vergelmir', label: 'explora por primera vez', type: 'event' },
    { source: 'exploracion-vergelmir', target: 'libro-negro-vergelmir', label: 'descubre y activa la trampa de', type: 'event' },
    { source: 'urt-unwashed', target: 'battle-grim', label: 'miembro, conductor del carro de botín de', type: 'rel' },

    // Capítulo 5
    { source: 'ilska', target: 'biorr', label: 'recompensa con pluma de cuervo y anillo de brazo de oro', type: 'rel' },
    { source: 'ilska', target: 'skrid', label: 'duelo oculto por la muerte de su hermano a manos de Agnar', type: 'rel' },
    { source: 'myrk', target: 'biorr', label: 'reencuentro afectuoso y coqueteo — "aún tengo tiempo de..."', type: 'rel' },
    { source: 'myrk', target: 'ilska', label: 'enviada por su hermana con diez guerreros, sin Biórr, a', type: 'event' },
    { source: 'myrk', target: 'culto-dragon', label: 'describe el orden social futuro de Lik-Rifa que incluye a', type: 'lore' },
    { source: 'myrk', target: 'camara-rotta', label: 'enviada con diez guerreros a recuperar el tesoro de su padre en', type: 'event' },
    { source: 'myrk', target: 'nastrandir', label: 'debe llevar el tesoro recuperado a la Franja de los Cadáveres, junto a', type: 'event' },
    { source: 'biorr', target: 'kraka', label: 'reencuentro — los visita junto a Myrk entre los niños Tainted', type: 'rel' },
    { source: 'biorr', target: 'hundur', label: 'reencuentro — los visita junto a Myrk entre los niños Tainted', type: 'rel' },
    { source: 'kraka', target: 'hundur', label: 'cuida junto a él de los niños Tainted collarados de los Raven-Feeders', type: 'rel' },
    { source: 'kraka', target: 'bjarn', label: 'cuida de él entre los niños Tainted collarados', type: 'rel' },
    { source: 'bjarn', target: 'biorr', label: 'destello de reconocimiento — dice "Tafl" antes de volver a nublarse', type: 'rel' },
    { source: 'bjarn', target: 'collares', label: 'mantenido dócil junto a casi un centenar de niños Tainted con', type: 'magic' },
    { source: 'likrafa', target: 'nastrandir', label: 'revela que sigue en pie, al este, y declara su plan de marchar a', type: 'trama' },
    { source: 'likrafa', target: 'plan-likrafa-nastrandir', label: 'anuncia tras devorar un oso y volver a forma humana', type: 'event' },
    { source: 'ilska', target: 'likrafa', label: 'se arrodilla ante ella y le pregunta cuál es el plan', type: 'rel' },
    { source: 'drekr', target: 'likrafa', label: 'se arrodilla ante ella portando el hacha de su hermano muerto Skrið', type: 'rel' },
    { source: 'nastrandir', target: 'svelgarth', label: 'ubicada en la costa justo al norte de', type: 'geo' },
    { source: 'nastrandir', target: 'camara-rotta', label: 'destino final del tesoro de los días antiguos recuperado de', type: 'geo' },
    { source: 'raven-feeders', target: 'eldrafell', label: 'acampan exhaustos en una loma cercana a', type: 'geo' },
    { source: 'regreso-biorr-raven-feeders', target: 'biorr', label: 'protagonizada por', type: 'event' },
    { source: 'regreso-biorr-raven-feeders', target: 'raven-feeders', label: 'reincorpora a Biórr a', type: 'event' },
    { source: 'plan-likrafa-nastrandir', target: 'likrafa', label: 'anunciada por', type: 'event' },
    { source: 'plan-likrafa-nastrandir', target: 'camara-rotta', label: 'requiere recuperar el tesoro de', type: 'event' },

    // Capítulo 6
    { source: 'elvar', target: 'hijas-orna-ulfrir', label: 'fuerza a luchar contra el enjambre con el collar al rojo vivo', type: 'conflict' },
    { source: 'uspa', target: 'libro-negro-vergelmir', label: 'identifica como Galdrabok escrito por Lik-Rifa, con magia de resurrección', type: 'magic' },
    { source: 'uspa', target: 'ulfrir', label: 'confirma que el Galdrabok de Lik-Rifa puede devolverle la vida', type: 'magic' },
    { source: 'elvar', target: 'ulfrir', label: 'propone resucitarlo como arma contra Lik-Rifa', type: 'trama' },
    { source: 'elvar', target: 'cadena-ulfrir', label: 'propone forjar con sus eslabones un nuevo collar para atar al dios resucitado', type: 'magic' },
    { source: 'hijas-orna-ulfrir', target: 'ulfrir', label: 'suplica su resurrección y jura servicio eterno si ocurre', type: 'rel' },
    { source: 'uspa', target: 'berak', label: 'exige su libertad a cambio de forjar el collar-dios — revelado como su esposo', type: 'rel' },
    { source: 'elvar', target: 'berak', label: 'promete intentar liberarlo de la esclavitud bajo Jarl Störr', type: 'trama' },
    { source: 'urt-unwashed', target: 'battle-grim', label: 'cifra la compañía en menos de cuarenta lanzas', type: 'lore' },
    { source: 'ataque-criaturas-likrafa', target: 'elvar', label: 'protagonizado por', type: 'event' },
    { source: 'ataque-criaturas-likrafa', target: 'hijas-orna-ulfrir', label: 'fuerza a combatir a', type: 'event' },
    { source: 'plan-resurreccion-ulfrir', target: 'elvar', label: 'propuesto por', type: 'event' },
    { source: 'plan-resurreccion-ulfrir', target: 'libro-negro-vergelmir', label: 'depende de la magia de resurrección de', type: 'magic' },
    { source: 'plan-resurreccion-ulfrir', target: 'battle-grim', label: 'debatido y finalmente aceptado por', type: 'event' },

    // Capítulo 7
    { source: 'orka', target: 'glornir', label: 'declina reunirse formalmente con los Bloodsworn — "solo hay sitio para Breca"', type: 'rel' },
    { source: 'glornir', target: 'edel', label: 'asigna para escoltar a Orka a la mina y recuperar el Sea-Wolf', type: 'event' },
    { source: 'edel', target: 'sea-wolf', label: 'enviada a recuperarlo en el Río Slågen de camino a la mina', type: 'event' },
    { source: 'orka', target: 'edel', label: 'escoltada por ella y nueve guerreros hacia la mina de las Boneback', type: 'rel' },
    { source: 'glornir', target: 'ninos-robados', label: 'acepta llevar a los niños Tainted rescatados hasta Darl', type: 'trama' },
    { source: 'einar', target: 'ninos-robados', label: 'conduce el carro con ellos camino a Darl', type: 'event' },
    { source: 'glornir', target: 'mord-lif', label: 'ofrece llevar a Lif a Darl con los Bloodsworn, con reservas', type: 'rel' },
    { source: 'mord-lif', target: 'orka', label: 'Lif elige quedarse con ella en vez de ir con los Bloodsworn', type: 'rel' },
    { source: 'mord-lif', target: 'gudvarr', label: 'pide a Glornir que no lo mate si lo encuentra — "Lif vendrá por él"', type: 'conflict' },
    { source: 'varg', target: 'juramento-varg-bloodsworn', label: 'Orka observa que aún no ha pronunciado las palabras formales', type: 'lore' },

    // Capítulo 8
    { source: 'uspa', target: 'cadena-ulfrir', label: 'funde sus eslabones en la fragua de Vergelmir para forjar el collar-dios', type: 'magic' },
    { source: 'uspa', target: 'collares', label: 'forja el primer collar capaz de atar a un dios resucitado', type: 'magic' },
    { source: 'elvar', target: 'collares', label: 'activa y liga el collar-dios a Ulfrir con el Galdur-tongue', type: 'magic' },
    { source: 'uspa', target: 'ulfrir', label: 'completa el ritual de resurrección usando el Galdrabok de Lik-Rifa', type: 'magic' },
    { source: 'elvar', target: 'ulfrir', label: 'nombra y liga el collar-dios al cuerpo resucitado', type: 'magic' },
    { source: 'battle-grim', target: 'ulfrir', label: 'vierte su sangre sobre sus huesos para completar la resurrección', type: 'magic' },
    { source: 'hijas-orna-ulfrir', target: 'ulfrir', label: 'se reúne con su padre resucitado y le confirma que su madre y hermanas murieron', type: 'rel' },
    { source: 'huld', target: 'plan-resurreccion-ulfrir', label: 'confirma el compromiso de toda la compañía: "estamos contigo"', type: 'event' },
    { source: 'resurreccion-ulfrir', target: 'ulfrir', label: 'devuelve a la vida a', type: 'event' },
    { source: 'resurreccion-ulfrir', target: 'plan-resurreccion-ulfrir', label: 'ejecuta el plan propuesto en', type: 'event' },
    { source: 'resurreccion-ulfrir', target: 'collares', label: 'culmina con la forja y activación del', type: 'magic' },
    { source: 'svin', target: 'oskutred', label: 'posible colmillo relicario hallado entre el tesoro de', type: 'lore' },
    // Linajes confirmados por el reparto del Libro 2
    {"source":"einar","target":"berser","label":"sangre de — confirmado en el reparto del Libro 2","type":"lore"},

    // Capítulo 9
    {"source":"red-fain","target":"kalv","label":"padre de","type":"rel"},
    {"source":"red-fain","target":"biorr","label":"primero en mostrarle bondad al llegar a los Raven-Feeders","type":"rel"},
    {"source":"red-fain","target":"raven-feeders","label":"miembro de","type":"rel"},
    {"source":"storolf-wartooth","target":"raven-feeders","label":"miembro de","type":"rel"},
    {"source":"storolf-wartooth","target":"biorr","label":"lo recibe como a un hermano tras tres años infiltrado","type":"rel"},
    {"source":"drekr","target":"raven-feeders","label":"trae nuevos combatientes para ampliar la compañía","type":"rel"},
    {"source":"drekr","target":"ilska","label":"salva a su hermana de las fauces y la protege frente a Lik-Rifa","type":"rel"},
    {"source":"likrafa","target":"drekr","label":"admira su lealtad fraterna y reclama esa devoción","type":"rel"},
    {"source":"ilska","target":"likrafa","label":"afirma que su linaje ha trabajado generaciones para liberarla","type":"rel"},
    {"source":"ilska","target":"raudskinna","label":"confirma haber usado su magia para liberar a Lik-Rifa","type":"magic"},
    {"source":"likrafa","target":"ulfrir","label":"siente su resurrección y decide reanudar el enfrentamiento","type":"conflict"},
    {"source":"likrafa","target":"libro-negro-vergelmir","label":"siente el uso de su propio hechizo y deduce la pérdida de","type":"magic"},
    {"source":"likrafa","target":"rotta","label":"dice que lo amaba y que su libro terminó salvándola","type":"history"},
    {"source":"likrafa","target":"snaka","label":"recuerda que su padre devoraba hijos y creaciones","type":"lore"},
    {"source":"likrafa","target":"isbrun","label":"ordena cruzarlo hacia el sur antes de acabar la sólstöður","type":"goal"},
    {"source":"isbrun","target":"solstodur","label":"debe cruzarse antes de su fin, según Lik-Rifa","type":"lore"},
    {"source":"plan-likrafa-nastrandir","target":"isbrun","label":"ruta inmediata hacia el sur con plazo límite","type":"goal"},
    {"source":"furia-likrafa-campamento","target":"likrafa","label":"protagonizada por","type":"event"},
    {"source":"furia-likrafa-campamento","target":"resurreccion-ulfrir","label":"desencadenada por la percepción de","type":"event"},
    {"source":"furia-likrafa-campamento","target":"raven-feeders","label":"precipita la partida de","type":"event"},
    {"source":"furia-likrafa-campamento","target":"isbrun","label":"fija como objetivo inmediato","type":"goal"},
    // Capítulo 10
    {
        "source": "night-hags",
        "target": "seidr",
        "label": "«Skuggar skilja» permite herir sus cuerpos de niebla",
        "type": "magic"
    },
    {
        "source": "orka",
        "target": "night-hags",
        "label": "destruye dos con el hacha y «Skuggar skilja»",
        "type": "conflict"
    },
    {
        "source": "night-hags",
        "target": "mord-lif",
        "label": "una estrangula a Lif tras dormirse de guardia",
        "type": "conflict"
    },
    {
        "source": "uspa",
        "target": "orka",
        "label": "le enseñó «Skuggar skilja», usada contra las night-hags",
        "type": "magic"
    },
    {
        "source": "orka",
        "target": "mord-lif",
        "label": "rescata y protege a Lif incluso frente a Edel",
        "type": "rel"
    },
    {
        "source": "edel",
        "target": "mord-lif",
        "label": "cuestiona a Lif por su fallo y el riesgo para el secreto Tainted",
        "type": "conflict"
    },
    {
        "source": "orka",
        "target": "edel",
        "label": "se enfrenta a ella para garantizar la protección de Lif",
        "type": "conflict"
    },
    {
        "source": "edel",
        "target": "ingmar",
        "label": "le ordena asumir la guardia tras el ataque",
        "type": "rel"
    },
    {
        "source": "ingmar",
        "target": "bloodsworn",
        "label": "miembro de la escolta de Edel",
        "type": "rel"
    },
    {
        "source": "ataque-night-hags",
        "target": "night-hags",
        "label": "ataque perpetrado por",
        "type": "event"
    },
    {
        "source": "ataque-night-hags",
        "target": "mord-lif",
        "label": "Lif sobrevive gracias a Orka",
        "type": "event"
    },
    {
        "source": "ataque-night-hags",
        "target": "bloodsworn",
        "label": "pone en peligro el campamento de la escolta",
        "type": "event"
    },
    {
        "source": "llamada-lobo-orka",
        "target": "orka",
        "label": "sueña que un lobo o un hombre aúlla su nombre",
        "type": "trama"
    },
    {
        "source": "llamada-lobo-orka",
        "target": "thorkel",
        "label": "invoca su nombre para resistir la llamada",
        "type": "trama"
    },
    {
        "source": "llamada-lobo-orka",
        "target": "breca",
        "label": "invoca su nombre para resistir la llamada",
        "type": "trama"
    },
    // Capítulo 11
    {
        "source": "rokia",
        "target": "bloodsworn",
        "label": "exploradora principal tras la partida de Edel",
        "type": "rel"
    },
    {
        "source": "sueno-lobo-varg",
        "target": "varg",
        "label": "recibe la llamada de un hombre entre lobos",
        "type": "trama"
    },
    {
        "source": "sueno-lobo-varg",
        "target": "llamada-lobo-orka",
        "label": "llamadas oníricas semejantes; vínculo sin confirmar",
        "type": "trama"
    },
    {
        "source": "sueno-lobo-varg",
        "target": "ulfrir",
        "label": "posible conexión tras su resurrección; no confirmada",
        "type": "trama"
    },
    {
        "source": "leccion-control-lobo",
        "target": "rokia",
        "label": "demuestra una transformación parcial controlada",
        "type": "event"
    },
    {
        "source": "leccion-control-lobo",
        "target": "varg",
        "label": "pide aprender a controlar al lobo",
        "type": "event"
    },
    {
        "source": "leccion-control-lobo",
        "target": "svik",
        "label": "aconseja dominar a la bestia de la sangre",
        "type": "event"
    },
    {
        "source": "leccion-control-lobo",
        "target": "hjalmar",
        "label": "correa ajustada con un colmillo de Røkia",
        "type": "event"
    },

    // Capítulo 12 — Guðvarr
    {
        "source": "huida-drammur",
        "target": "rio-drammur",
        "label": "desciende hacia Darl por el",
        "type": "geo"
    },
    {
        "source": "rio-drammur",
        "target": "darl",
        "label": "ruta fluvial de los fugitivos hacia",
        "type": "geo"
    },
    {
        "source": "gudvarr",
        "target": "huida-drammur",
        "label": "huye aterrorizado de Orka en",
        "type": "event"
    },
    {
        "source": "arild",
        "target": "huida-drammur",
        "label": "acompaña a Guðvarr en",
        "type": "event"
    },
    {
        "source": "vol",
        "target": "huida-drammur",
        "label": "despierta cautiva durante",
        "type": "event"
    },
    {
        "source": "skalk",
        "target": "huida-drammur",
        "label": "transporta a Vol y el cofre en",
        "type": "event"
    },
    {
        "source": "olvir-yrsa",
        "target": "huida-drammur",
        "label": "Yrsa custodia a Vol durante",
        "type": "event"
    },
    {
        "source": "skapti",
        "target": "huida-drammur",
        "label": "gobierna la snekke durante",
        "type": "event"
    },
    {
        "source": "gudvarr",
        "target": "orka",
        "label": "teme volver a enfrentarse a tras huir del Grimholt",
        "type": "conflict"
    },
    {
        "source": "sigrun",
        "target": "gudvarr",
        "label": "espera que regrese con la cabeza de Orka, según su sobrino",
        "type": "goal"
    },
    {
        "source": "vol",
        "target": "skalk",
        "label": "percibe su poder disminuido tras perder el bastón",
        "type": "magic"
    },
    {
        "source": "skalk",
        "target": "collares",
        "label": "amenaza con fabricar uno propio en Darl para someter a Vol",
        "type": "goal"
    },
    {
        "source": "vol",
        "target": "glornir",
        "label": "asegura a Skalk que lo encontrará incluso en Darl",
        "type": "trama"
    },
    {
        "source": "gudvarr",
        "target": "drengr-arrojado-drammur",
        "label": "roba el broche y arroja vivo al herido en",
        "type": "event"
    },
    {
        "source": "arild",
        "target": "drengr-arrojado-drammur",
        "label": "ayuda tras oír a Guðvarr declarar muerto al herido en",
        "type": "event"
    },
    {
        "source": "drengr-arrojado-drammur",
        "target": "rio-drammur",
        "label": "el herido desaparece bajo las aguas del",
        "type": "event"
    },
    // Capítulo 13 — Varg
    {
        "source": "terna",
        "target": "froya",
        "label": "vendidas juntas a Brimil; testifica sus intentos de fuga",
        "type": "rel"
    },
    {
        "source": "terna",
        "target": "varg",
        "label": "lo reconoce de la granja de Kolskegg",
        "type": "rel"
    },
    {
        "source": "njal-olafsson",
        "target": "terna",
        "label": "la compró a Brimil en Darl",
        "type": "rel"
    },
    {
        "source": "brimil",
        "target": "terna",
        "label": "la vendió a Njal",
        "type": "rel"
    },
    {
        "source": "brimil",
        "target": "froya",
        "label": "la compró a Kolskegg y la golpeaba por intentar huir",
        "type": "conflict"
    },
    {
        "source": "brimil",
        "target": "darl",
        "label": "esclavista del mercado de thralls",
        "type": "geo"
    },
    {
        "source": "varg",
        "target": "brimil",
        "label": "busca interrogarlo sobre Frøya y vengarse",
        "type": "goal"
    },
    {
        "source": "svik",
        "target": "brimil",
        "label": "promete ayudar a Varg a encontrarlo",
        "type": "goal"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "njal-olafsson",
        "label": "informa sobre los fugitivos",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "terna",
        "label": "aporta el testimonio sobre Frøya",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "huida-drammur",
        "label": "recoge noticias del paso de las dos snekkes",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "glornir",
        "label": "inspecciona el cadáver que no es Skalk",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "einar",
        "label": "abre el túmulo del fugitivo",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "varg",
        "label": "descubre la pista de Brimil",
        "type": "event"
    },
    {
        "source": "pistas-aldea-njal",
        "target": "svik",
        "label": "compra información con hacksilver",
        "type": "event"
    },
    {
        "source": "glornir",
        "target": "skalk",
        "label": "quiere darle muerte personalmente",
        "type": "goal"
    },
    {
        "source": "combate-culto-aldea",
        "target": "svik",
        "label": "derriba al predicador con un queso",
        "type": "event"
    },
    {
        "source": "combate-culto-aldea",
        "target": "varg",
        "label": "somete la furia antes del remate",
        "type": "event"
    },
    {
        "source": "combate-culto-aldea",
        "target": "culto-dragon",
        "label": "adoradores de Lik-Rifa atacan a Svik y Varg",
        "type": "conflict"
    },
    {
        "source": "combate-culto-aldea",
        "target": "leccion-control-lobo",
        "label": "pone a prueba las enseñanzas de Røkia",
        "type": "event"
    },
    {
        "source": "combate-culto-aldea",
        "target": "njal-olafsson",
        "label": "sus vecinos retienen a un atacante",
        "type": "event"
    },
    {
        "source": "svik",
        "target": "varg",
        "label": "detiene su golpe final y lo ayuda a dominar al lobo",
        "type": "rel"
    },
    {
        "source": "althing",
        "target": "culto-dragon",
        "label": "según Svik, su culto está prohibido en tierras de Helka",
        "type": "lore"
    },
    // Capítulo 14 — Biórr
    {
        "source": "red-fain",
        "target": "storolf-wartooth",
        "label": "padre de — confirmado en el capítulo 14",
        "type": "rel"
    },
    {
        "source": "red-fain",
        "target": "biorr",
        "label": "lo encontró tras escapar de la esclavitud siendo muy pequeño",
        "type": "history"
    },
    {
        "source": "biorr",
        "target": "alianza-tennur-isbrun",
        "label": "reconoce el nido y advierte a Ilska",
        "type": "event"
    },
    {
        "source": "ilska",
        "target": "alianza-tennur-isbrun",
        "label": "alza una cúpula de runas de fuego con los dragon-born",
        "type": "magic"
    },
    {
        "source": "drekr",
        "target": "alianza-tennur-isbrun",
        "label": "suma su voz a la protección rúnica",
        "type": "magic"
    },
    {
        "source": "red-fain",
        "target": "alianza-tennur-isbrun",
        "label": "organiza el muro de escudos con Storolf",
        "type": "event"
    },
    {
        "source": "storolf-wartooth",
        "target": "alianza-tennur-isbrun",
        "label": "conduce el muro de escudos hacia la diosa",
        "type": "event"
    },
    {
        "source": "likrafa",
        "target": "alianza-tennur-isbrun",
        "label": "impone el respeto entre sus creaciones y descendientes",
        "type": "event"
    },
    {
        "source": "alianza-tennur-isbrun",
        "target": "tennur",
        "label": "el enjambre acepta no devorar a sus seguidores",
        "type": "rel"
    },
    {
        "source": "likrafa",
        "target": "tennur",
        "label": "reconoce como hijos y aliados; obedecen sus órdenes",
        "type": "rel"
    },
    {
        "source": "likrafa",
        "target": "ilska",
        "label": "amenaza con devorarla si desprecia a sus vaesen",
        "type": "conflict"
    },
    {
        "source": "likrafa",
        "target": "sellado-isbrun",
        "label": "ejecuta el conjuro sobre la piedra de acceso",
        "type": "magic"
    },
    {
        "source": "sellado-isbrun",
        "target": "isbrun",
        "label": "desaparece de la vista tras el sellado",
        "type": "event"
    },
    {
        "source": "sellado-isbrun",
        "target": "tennur",
        "label": "reciben la orden de guardar el puente contra Ulfrir y sus acompañantes",
        "type": "trama"
    },
    {
        "source": "biorr",
        "target": "sellado-isbrun",
        "label": "sospecha que la tarea del enjambre está ligada al puente",
        "type": "trama"
    },
    {
        "source": "sellado-isbrun",
        "target": "plan-likrafa-nastrandir",
        "label": "tras cerrar el paso, prosiguen al este",
        "type": "event"
    },
    // LIBRO 2, CAPÍTULO 15 — ORKA
    {
        "source": "gunnar-prow",
        "target": "bloodsworn",
        "label": "miembro de los",
        "type": "rel"
    },
    {
        "source": "revna-hare-legs",
        "target": "bloodsworn",
        "label": "miembro de los",
        "type": "rel"
    },
    {
        "source": "gunnar-prow",
        "target": "revna-hare-legs",
        "label": "amantes",
        "type": "rel"
    },
    {
        "source": "gunnar-prow",
        "target": "camara-rotta",
        "label": "guía a Orka por",
        "type": "event"
    },
    {
        "source": "revna-hare-legs",
        "target": "raudskinna",
        "label": "recoge copias fragmentarias para la compañía",
        "type": "event"
    },
    {
        "source": "valkyrie",
        "target": "orna",
        "label": "hija de",
        "type": "rel"
    },
    {
        "source": "valkyrie",
        "target": "ulfrir",
        "label": "hija de",
        "type": "rel"
    },
    {
        "source": "rotta",
        "target": "valkyrie",
        "label": "asesino según la saga de Gunnar (versión en conflicto)",
        "type": "history"
    },
    {
        "source": "raudskinna",
        "target": "valkyrie",
        "label": "escrita sobre su piel según Gunnar",
        "type": "lore"
    },
    {
        "source": "rotta",
        "target": "ulfrir",
        "label": "encadenado por él y Orna, según la saga",
        "type": "history"
    },
    {
        "source": "hombre-ojos-rojos",
        "target": "drekr",
        "label": "Orka reconoce el mismo tatuaje de dragón alado",
        "type": "trama"
    },
    {
        "source": "hombre-ojos-rojos",
        "target": "altar-lik-rifa-boneback",
        "label": "tatuaje coincide con el símbolo del altar",
        "type": "trama"
    },
    {
        "source": "spert",
        "target": "tainted",
        "label": "distingue su naturaleza al examinar cadáveres",
        "type": "lore"
    },
    {
        "source": "breca",
        "target": "camara-rotta",
        "label": "su rastro confirma que estuvo cautivo aquí",
        "type": "history"
    },
    {
        "source": "orka",
        "target": "rastro-breca-camara-rotta",
        "label": "participa en el hallazgo",
        "type": "event"
    },
    {
        "source": "spert",
        "target": "rastro-breca-camara-rotta",
        "label": "participa en el hallazgo",
        "type": "event"
    },
    {
        "source": "vesli",
        "target": "rastro-breca-camara-rotta",
        "label": "participa en el hallazgo",
        "type": "event"
    },
    {
        "source": "rastro-breca-camara-rotta",
        "target": "breca",
        "label": "confirma su cautiverio anterior",
        "type": "trama"
    },
    {
        "source": "rastro-breca-camara-rotta",
        "target": "camara-rotta",
        "label": "hallado en la sala infantil de",
        "type": "geo"
    },
    // Capítulo 16 — Guðvarr
    {
        "source": "gudvarr",
        "target": "skalk",
        "label": "porta su cofre y recibe una promesa de reconocimiento",
        "type": "event"
    },
    {
        "source": "gudvarr",
        "target": "audiencia-skalk-darl",
        "label": "presencia",
        "type": "event"
    },
    {
        "source": "sturla",
        "target": "skalk",
        "label": "ejecuta sus órdenes de aislar a los testigos",
        "type": "rel"
    },
    {
        "source": "skapti",
        "target": "torre-galdur-darl",
        "label": "enviado bajo custodia de Sturla a",
        "type": "event"
    },
    {
        "source": "arild",
        "target": "torre-galdur-darl",
        "label": "enviado bajo custodia de Sturla a",
        "type": "event"
    },
    {
        "source": "hrolf",
        "target": "torre-galdur-darl",
        "label": "enviado bajo custodia de Sturla a",
        "type": "event"
    },
    {
        "source": "sturla",
        "target": "torre-galdur-darl",
        "label": "conduce a los fugitivos a",
        "type": "event"
    },
    {
        "source": "torre-galdur-darl",
        "target": "darl",
        "label": "se encuentra en",
        "type": "geo"
    },
    {
        "source": "skalk",
        "target": "hakon",
        "label": "oculta que conoce sus tratos con Drekr",
        "type": "trama"
    },
    {
        "source": "skalk",
        "target": "storr",
        "label": "lo acusa ante Helka de las desapariciones del norte",
        "type": "conflict"
    },
    {
        "source": "skalk",
        "target": "bloodsworn",
        "label": "los acusa falsamente de traición ante Helka",
        "type": "conflict"
    },
    {
        "source": "jaromir",
        "target": "bloodsworn",
        "label": "exige encontrarlos y propone perseguirlos",
        "type": "goal"
    },
    {
        "source": "helka",
        "target": "jaromir",
        "label": "promete ayudar a cazar a los Bloodsworn si no vienen",
        "type": "rel"
    },
    {
        "source": "hakon",
        "target": "bloodsworn",
        "label": "ofrece cazarlos para Helka",
        "type": "goal"
    },
    {
        "source": "glunn-iron-grip",
        "target": "helka",
        "label": "jarl que ha jurado lealtad a",
        "type": "rel"
    },
    {
        "source": "svard-the-scratcher",
        "target": "helka",
        "label": "jarl que ha jurado lealtad a",
        "type": "rel"
    },
    {
        "source": "skalk",
        "target": "espada-hueso",
        "label": "restituye al esqueleto de Orna mediante magia",
        "type": "magic"
    },
    {
        "source": "espada-hueso",
        "target": "orna",
        "label": "garra restituida al nudillo de",
        "type": "lore"
    },
    {
        "source": "orna",
        "target": "darl",
        "label": "esqueleto declarado completo por Helka en",
        "type": "geo"
    },
    {
        "source": "skalk",
        "target": "raudskinna",
        "label": "exhibe pergaminos que identifica como copias de",
        "type": "lore"
    },
    {
        "source": "culto-dragon",
        "target": "darl",
        "label": "siete cadáveres expuestos como adoradores del dragón en",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "skalk",
        "label": "participa en la audiencia:",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "helka",
        "label": "participa en la audiencia:",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "jaromir",
        "label": "participa en la audiencia:",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "vol",
        "label": "participa en la audiencia:",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "hakon",
        "label": "participa en la audiencia:",
        "type": "event"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "darl",
        "label": "ocurre en",
        "type": "geo"
    },
    {
        "source": "audiencia-skalk-darl",
        "target": "espada-hueso",
        "label": "devuelta al esqueleto durante",
        "type": "event"
    },
    // LIBRO 2, CAPÍTULO 17 — ELVAR
    {
        "source": "huld",
        "target": "battle-grim",
        "label": "reclama debatir la sucesión de Agnar y aspira al mando",
        "type": "goal"
    },
    {
        "source": "huld",
        "target": "elvar",
        "label": "cuestiona su autoridad sin elección como jefa",
        "type": "conflict"
    },
    {
        "source": "grend",
        "target": "elvar",
        "label": "la salva de caer al foso cuando el Isbrún está sellado",
        "type": "event"
    },
    {
        "source": "ulfrir",
        "target": "likrafa",
        "label": "reconoce con Elvar una causa común contra su hermana",
        "type": "conflict"
    },
    {
        "source": "ulfrir",
        "target": "isbrun",
        "label": "rompe con su sangre el sello de Lik-Rifa",
        "type": "magic"
    },
    {
        "source": "isbrun",
        "target": "langdagur",
        "label": "según Uspa, tras el cierre no podrán salir hasta",
        "type": "lore"
    },
    {
        "source": "reapertura-isbrun-ulfrir",
        "target": "sellado-isbrun",
        "label": "revierte el sello impuesto en el capítulo 14",
        "type": "event"
    },
    {
        "source": "reapertura-isbrun-ulfrir",
        "target": "isbrun",
        "label": "reabre",
        "type": "event"
    },
    {
        "source": "reapertura-isbrun-ulfrir",
        "target": "ulfrir",
        "label": "rompe el sello en",
        "type": "magic"
    },
    {
        "source": "reapertura-isbrun-ulfrir",
        "target": "uspa",
        "label": "su ritual habitual resulta insuficiente en",
        "type": "magic"
    },
    {
        "source": "reapertura-isbrun-ulfrir",
        "target": "battle-grim",
        "label": "permite cruzar al sur a",
        "type": "event"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "tennur",
        "label": "enjambre atacante",
        "type": "event"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "ulfrir",
        "label": "objetivo de la emboscada",
        "type": "conflict"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "hijas-orna-ulfrir",
        "label": "Skuld combate y sobrevive",
        "type": "event"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "uspa",
        "label": "abrasa el enjambre con runas",
        "type": "magic"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "elvar",
        "label": "acude a defender al dios",
        "type": "event"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "isbrun",
        "label": "ocurre al sur del",
        "type": "geo"
    },
    {
        "source": "emboscada-tennur-ulfrir",
        "target": "alianza-tennur-isbrun",
        "label": "ejecuta la orden de Lik-Rifa recogida en",
        "type": "event"
    },
    // LIBRO 2, CAPÍTULO 18
    {
        "source": "ingmar",
        "target": "berser",
        "label": "lleva la sangre de",
        "type": "magic"
    },
    {
        "source": "orka",
        "target": "ingmar",
        "label": "lo entrenó al llegar a los Bloodsworn",
        "type": "history"
    },
    {
        "source": "gunnar-prow",
        "target": "mord-lif",
        "label": "entrena a Lif con la lanza",
        "type": "rel"
    },
    {
        "source": "halja-vali",
        "target": "mord-lif",
        "label": "Halja y Lif comparten el duelo por sus hermanos",
        "type": "rel"
    },
    {
        "source": "leccion-escudo-lif",
        "target": "orka",
        "label": "impartida por",
        "type": "event"
    },
    {
        "source": "leccion-escudo-lif",
        "target": "mord-lif",
        "label": "instruye a Lif de la pareja",
        "type": "event"
    },
    {
        "source": "leccion-escudo-lif",
        "target": "edel",
        "label": "provocada por la insistencia de",
        "type": "event"
    },
    {
        "source": "leccion-escudo-lif",
        "target": "ingmar",
        "label": "participa en la demostración",
        "type": "event"
    },
    {
        "source": "leccion-escudo-lif",
        "target": "skjoldr",
        "label": "enseña el uso de",
        "type": "event"
    },
    {
        "source": "camara-rotta",
        "target": "llegada-raven-feeders-rotta",
        "label": "junto a este lugar ocurre",
        "type": "geo"
    },
    {
        "source": "raven-feeders",
        "target": "llegada-raven-feeders-rotta",
        "label": "protagonizan",
        "type": "event"
    },
    {
        "source": "vesli",
        "target": "llegada-raven-feeders-rotta",
        "label": "alerta de la llegada en",
        "type": "event"
    },
    {
        "source": "orka",
        "target": "llegada-raven-feeders-rotta",
        "label": "sale sola al claro en",
        "type": "event"
    },
    {
        "source": "breca",
        "target": "llegada-raven-feeders-rotta",
        "label": "su búsqueda motiva a Orka en",
        "type": "goal"
    },
    // CAPÍTULO 19 — VARG
    {
        "source": "varg",
        "target": "campamento-bloodsworn-darl",
        "label": "explora el acceso y presencia el dilema de",
        "type": "event"
    },
    {
        "source": "campamento-bloodsworn-darl",
        "target": "darl",
        "label": "se instala oculto a las afueras de",
        "type": "geo"
    },
    {
        "source": "einar",
        "target": "campamento-bloodsworn-darl",
        "label": "juega con los niños y pide protegerlos en",
        "type": "event"
    },
    {
        "source": "rokia",
        "target": "campamento-bloodsworn-darl",
        "label": "intenta ayudar en el juego de los niños en",
        "type": "event"
    },
    {
        "source": "glornir",
        "target": "campamento-bloodsworn-darl",
        "label": "ordena acampar y decide dejar a los niños en",
        "type": "event"
    },
    {
        "source": "campamento-bloodsworn-darl",
        "target": "vol",
        "label": "prioriza el rescate pendiente de",
        "type": "goal"
    },
    {
        "source": "glornir",
        "target": "sea-wolf",
        "label": "planea reunirse al sur tras recuperar a Vol con",
        "type": "goal"
    },
    {
        "source": "campamento-bloodsworn-darl",
        "target": "rio-drammur",
        "label": "prevé una marcha al sur siguiendo el",
        "type": "geo"
    },
    {
        "source": "campamento-bloodsworn-darl",
        "target": "collares",
        "label": "Einar advierte que los niños corren peligro de llevar",
        "type": "trama"
    },

    // LIBRO 2, CAPÍTULO 20 — Orka
    {
        "source": "myrk",
        "target": "hombre-ojos-rojos",
        "label": "hija del",
        "type": "rel"
    },
    {
        "source": "orka",
        "target": "myrk",
        "label": "rompe un brazo y deja inconsciente a",
        "type": "conflict"
    },
    {
        "source": "myrk",
        "target": "orka",
        "label": "muerde e invoca runas de fuego contra",
        "type": "magic"
    },
    {
        "source": "spert",
        "target": "orka",
        "label": "salva del estrangulamiento al envenenar al Berserkir que inmoviliza a",
        "type": "event"
    },
    {
        "source": "vesli",
        "target": "mord-lif",
        "label": "ayuda a Lif a matar a su atacante",
        "type": "event"
    },
    {
        "source": "combate-myrk-rotta",
        "target": "camara-rotta",
        "label": "ocurre en el claro ante",
        "type": "geo"
    },
    {
        "source": "orka",
        "target": "combate-myrk-rotta",
        "label": "combate y vence a Myrk en",
        "type": "event"
    },
    {
        "source": "myrk",
        "target": "combate-myrk-rotta",
        "label": "queda inconsciente en",
        "type": "event"
    },
    {
        "source": "edel",
        "target": "combate-myrk-rotta",
        "label": "acude con sus sabuesos al",
        "type": "event"
    },
    {
        "source": "revna-hare-legs",
        "target": "combate-myrk-rotta",
        "label": "rompe el cerco sobre Orka en",
        "type": "event"
    },
    {
        "source": "ingmar",
        "target": "combate-myrk-rotta",
        "label": "combate en",
        "type": "event"
    },
    {
        "source": "halja-vali",
        "target": "combate-myrk-rotta",
        "label": "Halja mata a un Raven-Feeder en",
        "type": "event"
    },
    {
        "source": "gunnar-prow",
        "target": "combate-myrk-rotta",
        "label": "queda herido en una pierna en",
        "type": "event"
    },
    {
        "source": "raven-feeders",
        "target": "combate-myrk-rotta",
        "label": "el destacamento de Myrk es derrotado en",
        "type": "event"
    },
    // CAPÍTULO 21 — GUÐVARR
    {
        "source": "helka",
        "target": "gudvarr",
        "label": "recompensa con un anillo de oro por salvar a Skalk",
        "type": "event"
    },
    {
        "source": "helka",
        "target": "vafri",
        "label": "entregó a Sigrún como valioso regalo de su manada",
        "type": "history"
    },
    {
        "source": "helka",
        "target": "orka",
        "label": "quiere que sea llevada ante ella",
        "type": "goal"
    },
    {
        "source": "frek",
        "target": "helka",
        "label": "sirve como Úlfhéðnar y guardia de su cámara",
        "type": "rel"
    },
    {
        "source": "estrid",
        "target": "frek",
        "label": "pide practicar el manejo de armas con",
        "type": "goal"
    },
    {
        "source": "gudvarr",
        "target": "audiencia-gudvarr-helka",
        "label": "recibe una recompensa y acepta un encargo en",
        "type": "event"
    },
    {
        "source": "helka",
        "target": "audiencia-gudvarr-helka",
        "label": "interroga a Guðvarr y le ofrece una tarea en",
        "type": "event"
    },
    {
        "source": "skalk",
        "target": "audiencia-gudvarr-helka",
        "label": "pregunta por Orka y conduce a Guðvarr al salir de",
        "type": "event"
    },
    {
        "source": "olvir-yrsa",
        "target": "audiencia-gudvarr-helka",
        "label": "Yrsa confirma el rescate de Skalk en",
        "type": "event"
    },
    // LIBRO 2, CAPÍTULO 22 — ORKA
{
    "source": "orka",
    "target": "interrogatorio-myrk",
    "label": "interroga y pierde el control en",
    "type": "event"
},
{
    "source": "interrogatorio-myrk",
    "target": "myrk",
    "label": "deja prisionera y malherida a",
    "type": "event"
},
{
    "source": "myrk",
    "target": "bloodsworn",
    "label": "descubre que todos son Tainted",
    "type": "lore"
},
{
    "source": "myrk",
    "target": "seaxes-tainted",
    "label": "reconoce un arma de Drekr entre los",
    "type": "rel"
},
{
    "source": "edel",
    "target": "rumbo-starl-orka",
    "label": "aconseja la ruta y autoriza tres voluntarios en",
    "type": "event"
},
{
    "source": "orka",
    "target": "rumbo-starl-orka",
    "label": "acepta ayuda y prepara la marcha en",
    "type": "event"
},
{
    "source": "rumbo-starl-orka",
    "target": "starl",
    "label": "tiene como destino recomendado, aún no alcanzado,",
    "type": "goal"
},
{
    "source": "rumbo-starl-orka",
    "target": "lake-horndal",
    "label": "sigue una ruta que conduce al",
    "type": "geo"
},
{
    "source": "halja-vali",
    "target": "rumbo-starl-orka",
    "label": "Halja se incorpora para vengar a Vali en",
    "type": "event"
},
{
    "source": "gunnar-prow",
    "target": "rumbo-starl-orka",
    "label": "se ofrece a acompañar a Orka en",
    "type": "event"
},
{
    "source": "revna-hare-legs",
    "target": "rumbo-starl-orka",
    "label": "se incorpora para ser parte de la saga en",
    "type": "event"
},
{
    "source": "vesli",
    "target": "gunnar-prow",
    "label": "cura la herida del muslo de",
    "type": "rel"
},
// ── LIBRO 2, CAPÍTULO 23 — GUÐVARR ──
{
    "source": "skalk",
    "target": "implantacion-hyrndur",
    "label": "ordena y ejecuta",
    "type": "event"
},
{
    "source": "implantacion-hyrndur",
    "target": "gudvarr",
    "label": "somete mediante un parásito a",
    "type": "event"
},
{
    "source": "olvir-yrsa",
    "target": "implantacion-hyrndur",
    "label": "Yrsa inmoviliza y descubre el brazo de Guðvarr durante",
    "type": "event"
},
{
    "source": "sturla",
    "target": "implantacion-hyrndur",
    "label": "ayuda a sujetar a Guðvarr durante",
    "type": "event"
},
{
    "source": "implantacion-hyrndur",
    "target": "hyrndur",
    "label": "utiliza una hembra de",
    "type": "event"
},
{
    "source": "implantacion-hyrndur",
    "target": "torre-galdur-darl",
    "label": "ocurre en el taller de",
    "type": "geo"
},
{
    "source": "gudvarr",
    "target": "hakon",
    "label": "recibe la orden de ganarse la amistad y espiar a",
    "type": "goal"
},
{
    "source": "skalk",
    "target": "hyrndur",
    "label": "ordena con Galdur excavar en el brazo de Guðvarr a una hembra de",
    "type": "magic"
},
{
    "source": "torre-galdur-darl",
    "target": "helka",
    "label": "conectada por túnel secreto con la zona de la cámara de",
    "type": "geo"
},
{
    "source": "torre-galdur-darl",
    "target": "vol",
    "label": "mantiene encerrada y con los labios cosidos a",
    "type": "conflict"
},
{
    "source": "torre-galdur-darl",
    "target": "cadena-ulfrir",
    "label": "alberga en su taller un fragmento de",
    "type": "lore"
},
{
    "source": "torre-galdur-darl",
    "target": "faunir",
    "label": "mantiene enjaulado un",
    "type": "rel"
},
{
    "source": "torre-galdur-darl",
    "target": "tennur",
    "label": "mantiene enjaulado un",
    "type": "rel"
},
{
    "source": "torre-galdur-darl",
    "target": "nacken",
    "label": "alberga en un estanque un",
    "type": "rel"
},
{
    "source": "torre-galdur-darl",
    "target": "hyrndur",
    "label": "alberga un nido de",
    "type": "rel"
},
{
    "source": "sturla",
    "target": "kuru",
    "label": "teme la muerte de",
    "type": "rel"
},
// ── LIBRO 2, CAPÍTULO 24 — VARG ──
{
    "source": "aesa",
    "target": "bloodsworn",
    "label": "guerrera de",
    "type": "rel"
},
{
    "source": "aesa",
    "target": "varg",
    "label": "comparte comida y ha entrenado con",
    "type": "rel"
},
{
    "source": "jokul",
    "target": "snaka",
    "label": "atribuye la creación humana con barro y aliento Seiðr a",
    "type": "lore"
},
{
    "source": "glornir",
    "target": "infiltracion-bloodsworn-darl",
    "label": "organiza",
    "type": "event"
},
{
    "source": "bloodsworn",
    "target": "infiltracion-bloodsworn-darl",
    "label": "entran en pequeños grupos durante",
    "type": "event"
},
{
    "source": "infiltracion-bloodsworn-darl",
    "target": "darl",
    "label": "ocurre en",
    "type": "geo"
},
{
    "source": "infiltracion-bloodsworn-darl",
    "target": "torre-galdur-darl",
    "label": "tiene como objetivo entrar en",
    "type": "goal"
},
{
    "source": "infiltracion-bloodsworn-darl",
    "target": "vol",
    "label": "busca rescatar a",
    "type": "goal"
},
{
    "source": "svik",
    "target": "infiltracion-bloodsworn-darl",
    "label": "dirige un grupo de cuatro durante",
    "type": "event"
},
{
    "source": "varg",
    "target": "infiltracion-bloodsworn-darl",
    "label": "participa en el grupo de Svik durante",
    "type": "event"
},
{
    "source": "jokul",
    "target": "infiltracion-bloodsworn-darl",
    "label": "participa en el grupo de Svik durante",
    "type": "event"
},
{
    "source": "aesa",
    "target": "infiltracion-bloodsworn-darl",
    "label": "participa en el grupo de Svik durante",
    "type": "event"
},
{
    "source": "jokul",
    "target": "olvir-yrsa",
    "label": "quiere vengar a Torvik si encuentra a Yrsa",
    "type": "goal"
},
// CAPÍTULO 25 — GUÐVARR
{
    "source": "jaromir",
    "target": "asalto-torre-galdur",
    "label": "dirige",
    "type": "event"
},
{
    "source": "asalto-torre-galdur",
    "target": "torre-galdur-darl",
    "label": "devasta",
    "type": "event"
},
{
    "source": "jaromir",
    "target": "vol",
    "label": "se lleva cautiva a",
    "type": "conflict"
},
{
    "source": "jaromir",
    "target": "hraeg",
    "label": "atribuye a este dios los huesos robados de la torre",
    "type": "lore"
},
{
    "source": "ilia",
    "target": "asalto-torre-galdur",
    "label": "recupera el cofre y ordena la retirada durante",
    "type": "event"
},
{
    "source": "jaromir",
    "target": "iva",
    "label": "da órdenes a su thrall",
    "type": "rel"
},
{
    "source": "jaromir",
    "target": "taras",
    "label": "emplea en el asalto a su thrall",
    "type": "rel"
},
{
    "source": "iva",
    "target": "seidr",
    "label": "practica",
    "type": "magic"
},
{
    "source": "iva",
    "target": "taras",
    "label": "apaga sus llamas y lo conduce fuera de la torre",
    "type": "rel"
},
{
    "source": "iva",
    "target": "vol",
    "label": "rompe la sujeción a la mesa y la entrega a Jaromir",
    "type": "conflict"
},
{
    "source": "iva",
    "target": "skalk",
    "label": "abre la sima en la que cae",
    "type": "conflict"
},
{
    "source": "taras",
    "target": "torre-galdur-darl",
    "label": "derriba el muro del taller de",
    "type": "event"
},
{
    "source": "taras",
    "target": "tainted",
    "label": "es",
    "type": "lore"
},
{
    "source": "skalk",
    "target": "asalto-torre-galdur",
    "label": "pierde un ojo por el halcón de Jaromir durante",
    "type": "event"
},
{
    "source": "sturla",
    "target": "asalto-torre-galdur",
    "label": "desaparece en la grieta durante",
    "type": "event"
},
{
    "source": "olvir-yrsa",
    "target": "asalto-torre-galdur",
    "label": "Yrsa salta tras Skalk a la grieta durante",
    "type": "event"
},
{
    "source": "gudvarr",
    "target": "arild",
    "label": "encuentra el cadáver en un barril de",
    "type": "event"
},
{
    "source": "gudvarr",
    "target": "asalto-torre-galdur",
    "label": "escapa por el túnel durante",
    "type": "event"
},
{
    "source": "jokul",
    "target": "asalto-torre-galdur",
    "label": "posiblemente es el hombre del martillo muerto durante (inferencia)",
    "type": "event"
},

// Capítulo 26 — Varg
{
    "source": "gudvarr",
    "target": "jokul",
    "label": "mata con el martillo del propio Jökul (identidad confirmada en C26)",
    "type": "conflict"
},
{
    "source": "varg",
    "target": "jokul",
    "label": "presencia y confirma la muerte de",
    "type": "rel"
},
{
    "source": "varg",
    "target": "gudvarr",
    "label": "persigue como asesino de Jökul sin conocer su nombre",
    "type": "conflict"
},
{
    "source": "asalto-torre-galdur",
    "target": "asalto-salon-helka",
    "label": "da paso a",
    "type": "event"
},
{
    "source": "glornir",
    "target": "asalto-salon-helka",
    "label": "dirige",
    "type": "event"
},
{
    "source": "bloodsworn",
    "target": "asalto-salon-helka",
    "label": "combaten ocultando su sangre Tainted durante",
    "type": "event"
},
{
    "source": "rokia",
    "target": "hakon",
    "label": "captura y amenaza con un seax para detener la batalla",
    "type": "conflict"
},
{
    "source": "rokia",
    "target": "yana",
    "label": "mata con una lanza",
    "type": "conflict"
},
{
    "source": "yana",
    "target": "hakon",
    "label": "guarda la habitación de",
    "type": "rel"
},
{
    "source": "sulich",
    "target": "varg",
    "label": "salva la vida a",
    "type": "rel"
},
{
    "source": "ulfhednar",
    "target": "asalto-salon-helka",
    "label": "combaten y obedecen el alto de Helka durante",
    "type": "event"
},
{
    "source": "helka",
    "target": "asalto-salon-helka",
    "label": "ordena detener al ver a Hákon como rehén",
    "type": "event"
},
// Capítulo 27 — Guðvarr
{
    "source": "helka",
    "target": "pacto-caza-jaromir",
    "label": "ofrece plata y un drakkar en",
    "type": "event"
},
{
    "source": "glornir",
    "target": "pacto-caza-jaromir",
    "label": "acepta y fija garantías en",
    "type": "event"
},
{
    "source": "pacto-caza-jaromir",
    "target": "jaromir",
    "label": "tiene por objetivo capturar a Jaromir o entregar su cabeza",
    "type": "goal"
},
{
    "source": "pacto-caza-jaromir",
    "target": "vol",
    "label": "permite a los Bloodsworn continuar la búsqueda de",
    "type": "goal"
},
{
    "source": "pacto-caza-jaromir",
    "target": "hakon",
    "label": "mantiene como rehén hasta salir de Darl a",
    "type": "rel"
},
{
    "source": "pacto-caza-jaromir",
    "target": "ulfhednar",
    "label": "incluye una guardiana de Hákon entre las",
    "type": "rel"
},
{
    "source": "bloodsworn",
    "target": "pacto-caza-jaromir",
    "label": "son contratados por Helka mediante",
    "type": "event"
},
{
    "source": "asalto-salon-helka",
    "target": "pacto-caza-jaromir",
    "label": "desemboca en",
    "type": "event"
},
{
    "source": "glornir",
    "target": "skalk",
    "label": "promete matarlo, pero aplaza la venganza al pactar con Helka",
    "type": "conflict"
},
{
    "source": "gudvarr",
    "target": "hakon",
    "label": "lo cubre con una capa para comenzar a ganarse su amistad",
    "type": "event"
},
{
    "source": "varg",
    "target": "gudvarr",
    "label": "confirma su identidad y le advierte que Lif va a por él",
    "type": "conflict"
},
{
    "source": "varg",
    "target": "mord-lif",
    "label": "dice haber prometido a Lif no matar a Guðvarr",
    "type": "rel"
},
{
    "source": "varg",
    "target": "olvir-yrsa",
    "label": "exige la entrega de Yrsa por la muerte de Torvik",
    "type": "conflict"
},
{
    "source": "estrid",
    "target": "hakon",
    "label": "propone dejarlo morir y afirma que gobernaría mejor que él",
    "type": "conflict"
},
// LIBRO 2, CAPÍTULO 28 — ELVAR
{
    "source": "elvar",
    "target": "battle-grim",
    "label": "asume la jefatura tras vencer a Huld",
    "type": "rel"
},
{
    "source": "uspa",
    "target": "elvar",
    "label": "cura su hombro con runas Seiðr antes del duelo",
    "type": "magic"
},
{
    "source": "huld",
    "target": "althing",
    "label": "convoca la asamblea para elegir al sucesor de Agnar",
    "type": "event"
},
{
    "source": "holmganga-elvar-huld",
    "target": "holmganga",
    "label": "se rige por las reglas del",
    "type": "lore"
},
{
    "source": "holmganga-elvar-huld",
    "target": "elvar",
    "label": "da la victoria y el mando a",
    "type": "event"
},
{
    "source": "holmganga-elvar-huld",
    "target": "huld",
    "label": "termina con la muerte de",
    "type": "event"
},
{
    "source": "grend",
    "target": "holmganga-elvar-huld",
    "label": "actúa como segundo de Elvar en",
    "type": "event"
},
{
    "source": "urt-unwashed",
    "target": "holmganga-elvar-huld",
    "label": "actúa como segundo de Huld en",
    "type": "event"
},
{
    "source": "sighvat",
    "target": "holmganga-elvar-huld",
    "label": "arbitra el duelo y proclama a la vencedora en",
    "type": "event"
},
{
    "source": "ulfrir",
    "target": "holmganga-elvar-huld",
    "label": "presencia el duelo de",
    "type": "event"
},
{
    "source": "hijas-orna-ulfrir",
    "target": "holmganga-elvar-huld",
    "label": "Skuld presencia el duelo de",
    "type": "event"
},
{
    "source": "elvar",
    "target": "wave-jarl",
    "label": "ordena regresar al sur hacia el",
    "type": "goal"
},

// Capítulo 29 — Varg
{
    "source": "varg",
    "target": "interrogatorio-brimil",
    "label": "busca respuestas sobre Frøya en",
    "type": "event"
},
{
    "source": "interrogatorio-brimil",
    "target": "dead-drengr",
    "label": "ocurre en",
    "type": "geo"
},
{
    "source": "svik",
    "target": "brimil",
    "label": "lo degüella tras quedar expuesto el secreto Tainted",
    "type": "conflict"
},
{
    "source": "brimil",
    "target": "brak-trolls-bane",
    "label": "afirma haber vendido a Frøya a",
    "type": "rel"
},
{
    "source": "brak-trolls-bane",
    "target": "froya",
    "label": "la compró según la confesión de Brimil",
    "type": "rel"
},
{
    "source": "brak-trolls-bane",
    "target": "dead-drengr",
    "label": "lo frecuenta cuando está en Darl según Brimil",
    "type": "geo"
},
{
    "source": "varg",
    "target": "brak-trolls-bane",
    "label": "busca como siguiente pista sobre Frøya",
    "type": "goal"
},
{
    "source": "glornir",
    "target": "brak-trolls-bane",
    "label": "promete a Varg que le exigirá cuentas",
    "type": "goal"
},
{
    "source": "rog",
    "target": "dead-drengr",
    "label": "sirve cerveza en",
    "type": "geo"
},
{
    "source": "bruised-men",
    "target": "iskidan",
    "label": "proceden del sur de",
    "type": "geo"
},
{
    "source": "bruised-men",
    "target": "darl",
    "label": "varios son subastados como esclavos en",
    "type": "geo"
},
{
    "source": "bloodsworn",
    "target": "partida-darl-liga",
    "label": "zarpan en",
    "type": "event"
},
{
    "source": "partida-darl-liga",
    "target": "pacto-caza-jaromir",
    "label": "pone en marcha",
    "type": "event"
},
{
    "source": "partida-darl-liga",
    "target": "liga",
    "label": "busca interceptar a Jaromir en",
    "type": "goal"
},
{
    "source": "partida-darl-liga",
    "target": "rio-drammur",
    "label": "sigue el curso del",
    "type": "geo"
},
{
    "source": "partida-darl-liga",
    "target": "hakon",
    "label": "transporta como rehén a",
    "type": "rel"
},
{
    "source": "frek",
    "target": "hakon",
    "label": "lo acompaña como escolta por orden de Helka",
    "type": "rel"
},
{
    "source": "aesa",
    "target": "hakon",
    "label": "lo vigila con su lanza a bordo",
    "type": "rel"
},
{
    "source": "sulich",
    "target": "partida-darl-liga",
    "label": "explica la estrategia de intercepción en Liga de",
    "type": "event"
},
// Capítulo 30 — Biórr
{
    "source": "likrafa",
    "target": "adoctrinamiento-ninos-likrafa",
    "label": "ordena quitar los collares y exige lealtad en",
    "type": "event"
},
{
    "source": "ilska",
    "target": "adoctrinamiento-ninos-likrafa",
    "label": "retira collares y dirige las aclamaciones en",
    "type": "event"
},
{
    "source": "dragon-born",
    "target": "adoctrinamiento-ninos-likrafa",
    "label": "retiran collares y cantan el conjuro en",
    "type": "magic"
},
{
    "source": "bjarn",
    "target": "adoctrinamiento-ninos-likrafa",
    "label": "pierde su collar junto a los demás niños en",
    "type": "event"
},
{
    "source": "breca",
    "target": "likrafa",
    "label": "permanece cautivo en el campamento de",
    "type": "conflict"
},
{
    "source": "brak-trolls-bane",
    "target": "drekr",
    "label": "forma parte del grupo de",
    "type": "rel"
},
{
    "source": "hundur",
    "target": "fuga-castigo-breca",
    "label": "Ilmur rastrea al fugitivo en",
    "type": "event"
},
{
    "source": "brak-trolls-bane",
    "target": "fuga-castigo-breca",
    "label": "recaptura y castiga al niño en",
    "type": "event"
},
{
    "source": "fuga-castigo-breca",
    "target": "breca",
    "label": "deja a Breca herido y con una cicatriz en la mejilla",
    "type": "event"
},
{
    "source": "biorr",
    "target": "fuga-castigo-breca",
    "label": "intenta frenar verbalmente la paliza en",
    "type": "event"
},
{
    "source": "brak-trolls-bane",
    "target": "breca",
    "label": "le rompe la nariz y la mano y le corta la mejilla",
    "type": "conflict"
},
// CAPÍTULO 31 — ORKA
{
    "source": "orka",
    "target": "myrk",
    "label": "jura liberarla para una holmganga cuando encuentre a Breca",
    "type": "rel"
},
{
    "source": "orka",
    "target": "myrk",
    "label": "le arranca un ojo durante el segundo interrogatorio",
    "type": "conflict"
},
{
    "source": "myrk",
    "target": "interrogatorio-myrk",
    "label": "revela el plan de marcha de Ilska y los niños en",
    "type": "event"
},
{
    "source": "halja-vali",
    "target": "myrk",
    "label": "Halja le revela que Varg mató a su padre",
    "type": "rel"
},
{
    "source": "myrk",
    "target": "varg",
    "label": "conoce su nombre como asesino de su padre y amenaza con vengarse",
    "type": "conflict"
},
{
    "source": "interrogatorio-myrk",
    "target": "iskalt",
    "label": "señala como destino previsto la costa frente a sus islas",
    "type": "geo"
},
{
    "source": "orka",
    "target": "iskalt",
    "label": "orienta la búsqueda de Breca hacia su costa según Myrk",
    "type": "goal"
},
{
    "source": "revna-hare-legs",
    "target": "mord-lif",
    "label": "entrena a Lif con lanza junto al arroyo",
    "type": "rel"
},
{
    "source": "interrogatorio-myrk",
    "target": "uspa",
    "label": "revela a Orka y sus compañeros que fue thrall y abrió el Isbrún",
    "type": "event"
},
// Capítulo 32 — Varg
{
    "source": "einar",
    "target": "ninos-polizones-drakkar",
    "label": "oculta a los niños en los barriles de",
    "type": "event"
},
{
    "source": "glornir",
    "target": "ninos-polizones-drakkar",
    "label": "descubre y permite alimentar a los niños de",
    "type": "event"
},
{
    "source": "ninos-polizones-drakkar",
    "target": "ninos-robados",
    "label": "protege a diez niños Tainted rescatados tras los",
    "type": "rel"
},
{
    "source": "glornir",
    "target": "hakon",
    "label": "aplaza hasta Liga la liberación de",
    "type": "conflict"
},
{
    "source": "frek",
    "target": "glornir",
    "label": "acepta comprobar su promesa de liberar a Hákon en Liga",
    "type": "rel"
},
{
    "source": "svik",
    "target": "fabula-viuda-lobo-trol",
    "label": "narra",
    "type": "lore"
},
{
    "source": "fabula-viuda-lobo-trol",
    "target": "frek",
    "label": "deja en silencio y con los puños apretados a",
    "type": "event"
},
{
    "source": "fabula-viuda-lobo-trol",
    "target": "hakon",
    "label": "incluye a un muchacho compasivo homónimo de",
    "type": "lore"
},
{
    "source": "fabula-viuda-lobo-trol",
    "target": "althing",
    "label": "invoca como forma de arbitraje dentro del cuento el",
    "type": "lore"
},

// LIBRO 2, CAPÍTULO 33 — GUÐVARR
{
    "source": "skalk",
    "target": "baston-froa-skalk",
    "label": "termina y utiliza",
    "type": "magic"
},
{
    "source": "baston-froa-skalk",
    "target": "hyrndur",
    "label": "permite a Skalk despertar y dormir al parásito de Guðvarr",
    "type": "magic"
},
{
    "source": "recordatorio-skalk-gudvarr",
    "target": "skalk",
    "label": "tiene como autor de la amenaza a",
    "type": "event"
},
{
    "source": "recordatorio-skalk-gudvarr",
    "target": "gudvarr",
    "label": "somete al dolor del hyrndur a",
    "type": "event"
},
{
    "source": "recordatorio-skalk-gudvarr",
    "target": "torre-galdur-darl",
    "label": "comienza en una cámara superior de",
    "type": "geo"
},
{
    "source": "recordatorio-skalk-gudvarr",
    "target": "baston-froa-skalk",
    "label": "muestra el funcionamiento de",
    "type": "magic"
},
{
    "source": "gudvarr",
    "target": "sigrun",
    "label": "busca ayuda y pide hablar a solas con",
    "type": "goal"
},
{
    "source": "sigrun",
    "target": "recordatorio-skalk-gudvarr",
    "label": "recibe en privado a su sobrino al final de",
    "type": "event"
},
{
    "source": "sturla",
    "target": "recordatorio-skalk-gudvarr",
    "label": "escolta a Guðvarr y presencia",
    "type": "event"
},
{
    "source": "olvir-yrsa",
    "target": "recordatorio-skalk-gudvarr",
    "label": "Yrsa sostiene a Guðvarr durante",
    "type": "event"
},
{
    "source": "vilja",
    "target": "gudvarr",
    "label": "lo acompaña en el pajar antes de que lo cite Skalk",
    "type": "rel"
},
{
    "source": "vilja",
    "target": "dead-drengr",
    "label": "se encuentra con Guðvarr en el pajar de",
    "type": "geo"
},
{
    "source": "jarn",
    "target": "sigrun",
    "label": "guarda la entrada de la casa donde se aloja",
    "type": "rel"
},
{
    "source": "jarn",
    "target": "gudvarr",
    "label": "le advierte que su tía lo busca",
    "type": "event"
},
{
    "source": "skalk",
    "target": "dead-drengr",
    "label": "investiga las visitas discretas de Hákon a",
    "type": "trama"
},
{
    "source": "hakon-operacion-oculta",
    "target": "dead-drengr",
    "label": "incluye visitas reiteradas de Hákon según las pesquisas de Skalk",
    "type": "trama"
},
// LIBRO 2, CAPÍTULO 34 — ELVAR
{
    "source": "uspa",
    "target": "ilska",
    "label": "abandonó su compañía al ver venganza en lugar de justicia",
    "type": "history"
},
{
    "source": "uspa",
    "target": "elvar",
    "label": "cuestiona la esclavitud como elección humana y le propone vivir en paz",
    "type": "conflict"
},
{
    "source": "wave-jarl",
    "target": "elvar",
    "label": "queda bajo el mando de",
    "type": "rel"
},
{
    "source": "skuggar",
    "target": "snaka",
    "label": "es hermana de",
    "type": "lore"
},
{
    "source": "ulfrir",
    "target": "skuggar",
    "label": "revela su existencia y la llama deshacedora",
    "type": "lore"
},
{
    "source": "ulfrir",
    "target": "krodil",
    "label": "venció en natación según Skuld",
    "type": "lore"
},
{
    "source": "ulfrir",
    "target": "sjavarom",
    "label": "combatió a cincuenta durante la competición según Skuld",
    "type": "lore"
},
{
    "source": "ulfrir",
    "target": "bosque-horca",
    "label": "mató y colgó allí a unos quinientos dragon-born según Skuld",
    "type": "lore"
},
{
    "source": "orna",
    "target": "oskutred",
    "label": "atrajo a Lik-Rifa con el camino de las almas según Skuld",
    "type": "lore"
},
{
    "source": "rotta",
    "target": "orna",
    "label": "avisó del ejército secreto de Lik-Rifa según Skuld",
    "type": "lore"
},
{
    "source": "ketil-silent",
    "target": "battle-grim",
    "label": "pertenecía a",
    "type": "cat"
},
{
    "source": "ulfrir",
    "target": "ketil-silent",
    "label": "mata y devora parcialmente para proteger a una Froa",
    "type": "conflict"
},
{
    "source": "muerte-ketil-sumision-ulfrir",
    "target": "elvar",
    "label": "la enfrenta a Ulfrir para proteger a su tripulación",
    "type": "event"
},
{
    "source": "muerte-ketil-sumision-ulfrir",
    "target": "ulfrir",
    "label": "termina con su promesa de no devorar a más compañeros",
    "type": "event"
},
{
    "source": "muerte-ketil-sumision-ulfrir",
    "target": "hijas-orna-ulfrir",
    "label": "incluye la amenaza de mutilar a Skuld para someter al padre",
    "type": "conflict"
},
{
    "source": "muerte-ketil-sumision-ulfrir",
    "target": "ketil-silent",
    "label": "comienza con la muerte de",
    "type": "event"
},

// ─── Capítulo 35 — Biórr ───
{
    "source": "biorr",
    "target": "breca",
    "label": "juega al tafl y le enseña estrategia para escapar con menos piezas",
    "type": "rel"
},
{
    "source": "breca",
    "target": "berser",
    "label": "identifica un oso junto al lobo en su sangre",
    "type": "lore"
},
{
    "source": "breca",
    "target": "ulfrir",
    "label": "identifica un lobo junto al oso en su sangre",
    "type": "lore"
},
{
    "source": "harek",
    "target": "svin",
    "label": "identifica el jabalí de su linaje",
    "type": "lore"
},
{
    "source": "harek",
    "target": "breca",
    "label": "reaparece vivo junto a su amigo en el campamento",
    "type": "rel"
},
{
    "source": "kraka",
    "target": "breca",
    "label": "le advierte contra otra fuga y lo consuela al reconocer sus linajes",
    "type": "rel"
},
{
    "source": "hundur",
    "target": "brak-trolls-bane",
    "label": "se sienta con él entre sus nuevos amigos",
    "type": "rel"
},
{
    "source": "hundur",
    "target": "drekr",
    "label": "se sienta junto a él, lo que preocupa a Biórr",
    "type": "rel"
},
{
    "source": "likrafa",
    "target": "reconocimiento-linajes-ninos",
    "label": "guía el ejercicio y se proclama nueva familia en",
    "type": "event"
},
{
    "source": "ilska",
    "target": "reconocimiento-linajes-ninos",
    "label": "demuestra sus rasgos de dragón ante los niños en",
    "type": "event"
},
{
    "source": "reconocimiento-linajes-ninos",
    "target": "breca",
    "label": "revela que siente lobo y oso",
    "type": "lore"
},
{
    "source": "reconocimiento-linajes-ninos",
    "target": "harek",
    "label": "revela que siente un jabalí",
    "type": "lore"
},
{
    "source": "reconocimiento-linajes-ninos",
    "target": "bjarn",
    "label": "recoge su identificación del oso",
    "type": "lore"
},
{
    "source": "tennur",
    "target": "regreso-tennur-noticia-isbrun",
    "label": "regresan y hablan con Lik-Rifa en",
    "type": "event"
},
{
    "source": "likrafa",
    "target": "regreso-tennur-noticia-isbrun",
    "label": "recibe a sus criaturas y anuncia furiosa el cruce en",
    "type": "event"
},
{
    "source": "regreso-tennur-noticia-isbrun",
    "target": "ulfrir",
    "label": "pone su cruce del puente en conocimiento de Lik-Rifa",
    "type": "trama"
},
{
    "source": "regreso-tennur-noticia-isbrun",
    "target": "isbrun",
    "label": "anuncia que el hermano de Lik-Rifa ha cruzado",
    "type": "event"
},

// LIBRO 2, CAPÍTULO 36 — ORKA
{
    "source": "rio-hvita",
    "target": "lake-horndal",
    "label": "nace en el",
    "type": "geo"
},
{
    "source": "rio-hvita",
    "target": "snakavik",
    "label": "desemboca en",
    "type": "geo"
},
{
    "source": "starl",
    "target": "rio-hvita",
    "label": "conecta su comercio lacustre con Snakavik por el",
    "type": "geo"
},
{
    "source": "haga-starl",
    "target": "starl",
    "label": "vende esclavos Tainted en",
    "type": "geo"
},
{
    "source": "haga-starl",
    "target": "saeunn",
    "label": "vende a Orka a",
    "type": "event"
},
{
    "source": "orka",
    "target": "saeunn",
    "label": "compra y equipa con ropa de abrigo a",
    "type": "rel"
},
{
    "source": "saeunn",
    "target": "tainted",
    "label": "es presentada como thrall",
    "type": "lore"
},
{
    "source": "orka",
    "target": "escala-starl-orka",
    "label": "protagoniza",
    "type": "event"
},
{
    "source": "escala-starl-orka",
    "target": "starl",
    "label": "tiene lugar en",
    "type": "geo"
},
{
    "source": "escala-starl-orka",
    "target": "myrk",
    "label": "mantiene cautiva a",
    "type": "event"
},
{
    "source": "escala-starl-orka",
    "target": "saeunn",
    "label": "incluye la compra de",
    "type": "event"
},
{
    "source": "halja-vali",
    "target": "escala-starl-orka",
    "label": "Halja sigue el rastro y acompaña a Orka en",
    "type": "event"
},
{
    "source": "predica-dragon-starl",
    "target": "starl",
    "label": "se escucha en los muelles de",
    "type": "geo"
},
{
    "source": "orka",
    "target": "predica-dragon-starl",
    "label": "escucha con inquietud",
    "type": "trama"
},
{
    "source": "llegada-battle-grim-starl",
    "target": "battle-grim",
    "label": "muestra un drakkar identificado por Halja como de los",
    "type": "event"
},
{
    "source": "llegada-battle-grim-starl",
    "target": "starl",
    "label": "ocurre ante los muelles de",
    "type": "geo"
},
{
    "source": "orka",
    "target": "llegada-battle-grim-starl",
    "label": "presencia",
    "type": "event"
},
{
    "source": "halja-vali",
    "target": "llegada-battle-grim-starl",
    "label": "Halja reconoce el emblema durante",
    "type": "event"
},
{
    "source": "llamada-lobo-orka",
    "target": "llegada-battle-grim-starl",
    "label": "se intensifica durante el episodio",
    "type": "trama"
},
{
    "source": "varg",
    "target": "sulich",
    "label": "paga una deuda de sangre con su botín iskidano a",
    "type": "rel"
},
{
    "source": "sulich",
    "target": "liga",
    "label": "compra una cuerda de arco en",
    "type": "geo"
},
{
    "source": "glornir",
    "target": "jarl-logur",
    "label": "confía el drakkar de Helka y a Hákon a",
    "type": "rel"
},
{
    "source": "jarl-logur",
    "target": "glornir",
    "label": "comparte noticias de Jaromir y reabastece a",
    "type": "rel"
},
{
    "source": "jaromir",
    "target": "iskidan",
    "label": "zarpa de Liga hacia",
    "type": "geo"
},
{
    "source": "palrun",
    "target": "jarl-logur",
    "label": "oficial portuario al servicio de",
    "type": "rel"
},
{
    "source": "refna",
    "target": "bloodsworn",
    "label": "se incorpora como remera de los",
    "type": "event"
},
{
    "source": "glornir",
    "target": "einar",
    "label": "acepta por fin a los niños como tripulación por mediación de",
    "type": "event"
},
{
    "source": "frek",
    "target": "jarl-logur",
    "label": "acompaña a Hákon hasta su entrega en custodia a",
    "type": "rel"
},
{
    "source": "edel",
    "target": "varg",
    "label": "relata el ataque de los Raven-Feeders en la Cámara de Rotta a",
    "type": "event"
},
{
    "source": "varg",
    "target": "myrk",
    "label": "aprende que el hombre que mató en la cámara de Rotta es el padre de",
    "type": "lore"
},
{
    "source": "edel",
    "target": "likrafa",
    "label": "confirma a los Bloodsworn que Ilska cuenta con la compañía de",
    "type": "trama"
},
{
    "source": "jarl-logur",
    "target": "hakon",
    "label": "recibe en custodia para devolver a su madre",
    "type": "rel"
},
// LIBRO 2, CAPÍTULO 38 — ELVAR
{
    source: "ulfrir",
    target: "orka",
    label: "reconoce de inmediato como «cría de lobo» a",
    type: "rel"
},
{
    source: "orka",
    target: "uspa",
    label: "exige en los muelles de Starl la entrega de",
    type: "conflict"
},
{
    source: "orka",
    target: "elvar",
    label: "se enfrenta en el muelle a",
    type: "conflict"
},
{
    source: "halja-vali",
    target: "uspa",
    label: "Halja reconoce con alegría y luego exige la entrega de",
    type: "rel"
},
{
    source: "battle-grim",
    target: "bloodsworn",
    label: "se encuentra por primera vez, al borde del combate, con",
    type: "event"
},
{
    source: "llamada-lobo-orka",
    target: "ulfrir",
    label: "queda resuelta: su fuente era",
    type: "trama"
},

// LIBRO 2, CAPÍTULO 39 — ORKA
{
    source: "ulfrir",
    target: "orka",
    label: "reclama como hija, afirmando que su sangre corre en sus venas",
    type: "rel"
},
{
    source: "orka",
    target: "ulfrir",
    label: "rechaza su paternidad y elige a Breca sobre él",
    type: "rel"
},
{
    source: "elvar",
    target: "orka",
    label: "acuerda una tregua y un intercambio de información con",
    type: "rel"
},
{
    source: "myrk",
    target: "orka",
    label: "mintió sobre el rumbo real de Ilska (afirmó que iban al oeste) a",
    type: "conflict"
},
{
    source: "elvar",
    target: "nastrandir",
    label: "rastrea las huellas de Ilska en el Isbrún hacia el este, en dirección a",
    type: "geo"
},
{
    source: "ulfrir",
    target: "rotta",
    label: "encadenó personalmente y sonrió viéndolo arder en veneno de serpiente — venganza por Valkyrie — contra",
    type: "history"
},
{
    source: "hijas-orna-ulfrir",
    target: "elvar",
    label: "pregunta si también podría resucitar a su madre Orna",
    type: "trama"
},

// LIBRO 2, CAPÍTULO 40 — BIÓRR
{
    source: "storolf-wartooth",
    target: "svin",
    label: "confirma llevar la sangre de",
    type: "lore"
},
{
    source: "storolf-wartooth",
    target: "harek",
    label: "enseña a reconocer su linaje de Svin a",
    type: "rel"
},
{
    source: "likrafa",
    target: "nastrandir",
    label: "llega y revela la entrada física de",
    type: "event"
},
{
    source: "likrafa",
    target: "ormsalur",
    label: "invoca con un canto en nórdico antiguo para que despierte",
    type: "magic"
},
{
    source: "ormsalur",
    target: "nastrandir",
    label: "se revela como la puerta de entrada de",
    type: "geo"
},
{
    source: "storolf-wartooth",
    target: "kraka",
    label: "afianza una camaradería cada vez más cómplice con",
    type: "rel"
},

// LIBRO 2, CAPÍTULO 41 — GUÐVARR
{
    source: "gudvarr",
    target: "orka",
    label: "admite ante Sigrún que no trajo la cabeza de, y confirma que es Tainted",
    type: "event"
},
{
    source: "sigrun",
    target: "gudvarr",
    label: "le enseña que la guile vale más que la fuerza bruta, citando la lección del holmganga",
    type: "rel"
},
{
    source: "skalk",
    target: "arild",
    label: "mató, según acusación de Sigrún, junto a otros drengrs suyos",
    type: "conflict"
},
{
    source: "sigrun",
    target: "skalk",
    label: "no se atreve a desafiar, aunque controla la vida de Guðvarr, a",
    type: "conflict"
},
{
    source: "glunn-iron-grip",
    target: "sigrun",
    label: "sospecha, junto a los demás jarls de Helka, que codicia las tierras de",
    type: "conflict"
},
{
    source: "svard-the-scratcher",
    target: "sigrun",
    label: "sospecha, junto a los demás jarls de Helka, que codicia las tierras de",
    type: "conflict"
},
{
    source: "illur-storm-crow",
    target: "sigrun",
    label: "sospecha, junto a los demás jarls de Helka, que codicia las tierras de",
    type: "conflict"
},
{
    source: "jarl-orlyg",
    target: "helka",
    label: "enviará mensajeros y acudirá a Darl a una reunión con, según invitación de esta",
    type: "trama"
},
{
    source: "jarl-orlyg",
    target: "reunion-helka-orlyg",
    label: "protagoniza, como enemigo invitado, la",
    type: "event"
},
{
    source: "helka",
    target: "reunion-helka-orlyg",
    label: "convoca, según la lectura política de Sigrún,",
    type: "event"
},
{
    source: "storr",
    target: "reunion-helka-orlyg",
    label: "es, según Sigrún, la amenaza fronteriza occidental detrás de",
    type: "trama"
},
{
    source: "hakon",
    target: "frek",
    label: "regresa a Darl desde Liga escoltado por",
    type: "event"
},
{
    source: "helka",
    target: "hakon",
    label: "recibe públicamente como «mi hijo» y anuncia un festín por el regreso de",
    type: "event"
},
{
    source: "gudvarr",
    target: "hakon",
    label: "saluda públicamente a su regreso a Darl, obteniendo un gesto de reconocimiento de",
    type: "event"
},
];
