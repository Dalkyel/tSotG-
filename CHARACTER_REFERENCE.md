# Índice de personajes

Abre **Personajes** en la cabecera. Busca un nombre, apodo o título y selecciona una ficha. También puedes pulsar un resultado de la búsqueda del mapa o **Abrir ficha del personaje** en su panel de detalle.

Ejemplos: `Guthvarr` encuentra a Guðvarr; `Ilmur` abre la ficha de Hundur; `Lif` encuentra la ficha compartida de Mord y Lif. Se admiten las grafías nórdicas y sus equivalentes sin acentos.

Cada ficha presenta un recordatorio breve, el último desarrollo con capítulo identificado cuando existe, vínculos principales y todas las conexiones agrupadas por tema. Pulsa un nombre vinculado para abrir su ficha; **Volver a la ficha anterior** recorre tu navegación. **Ver en el mapa** centra el gráfico en ese nodo.

Las descripciones completas, las observaciones y los registros anteriores se conservan en secciones desplegables. El recorrido por capítulos se obtiene de encabezados explícitos en las notas, por lo que no representa necesariamente todas las apariciones del personaje.

El índice aplica el límite compartido de libro y capítulo. En un tramo parcial se usan las versiones originales permitidas y sus extractos; las guías generales del reparto se reservan para el último capítulo registrado del libro, para evitar adelantar identidades o papeles. Consulta `READING_LIMIT.md` para el caso especial del Libro 1.

## Mantenimiento

- `characters-data.js` contiene las presentaciones preparadas para el reparto principal, los alias adicionales y una selección de vínculos útiles. Las novedades del Libro 2 se guardan con su libro y capítulo; solo se muestran cuando coinciden con el último capítulo registrado para esa ficha. Conviene revisar las presentaciones al añadir nuevos libros o cambios importantes de papel.
- Las demás presentaciones son extractos identificados como tales de las notas originales. Los nombres anteriores se obtienen de los registros del libro permitido.
- `characters-core.js` genera las búsquedas, el recorrido y las agrupaciones. Acepta los enlaces tanto antes como después de que D3 resuelva sus extremos.
- `characters.js` presenta el índice y lo conecta con el mapa. No necesita introducir, editar ni clasificar datos para usarlo.

Verificación: `node --test tests/*.test.cjs`.
