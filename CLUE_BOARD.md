# Pistas y preguntas

Abre **Pistas y preguntas** en la cabecera del mapa.

- Busca por texto o filtra por estado y personaje/tema vinculado.
- Las observaciones originales se importan como **Por revisar**: no se deduce automáticamente si una teoría es cierta o una pregunta está resuelta.
- Selecciona una entrada para cambiar el título, registrar evidencias y teorías por separado, añadir referencias y clasificar su estado. Pulsa **Guardar entrada** para conservar los cambios.
- Usa **Nueva pregunta** para crear una entrada independiente. En la selección múltiple de vínculos, usa Cmd/Ctrl para seleccionar varios temas en escritorio.
- Consulta **Historial del club** para ver las revisiones guardadas. **Notas y contexto originales** conserva los registros originales de los libros, incluso si cambias los vínculos de una entrada importada.
- Los botones de los temas vinculados abren su detalle en el mapa.

## Guardado y copias compartidas

Los cambios se guardan en `localStorage` del navegador y del sitio desde el que se abre el proyecto. No se sincronizan automáticamente con otros dispositivos ni se escriben en los archivos de los libros. Borrar los datos del navegador puede borrar las revisiones del club: exporta copias con regularidad.

**Exportar copia** descarga un JSON con las entradas actuales y todas las revisiones guardadas, incluidas las de capítulos posteriores al límite visible. **Importar copia** valida todo el archivo antes de guardar. Añade entradas nuevas y conserva sin cambios las entradas que ya tienen una versión guardada en este navegador. No combina revisiones simultáneas: para una copia compartida, conviene que una persona mantenga y distribuya el tablero principal. Las notas originales del proyecto nunca se sobrescriben.

## Alcance de lectura

El tablero respeta el límite compartido de **libro y capítulo**. Cada revisión nueva se fecha con el límite aplicado; las referencias concretas de evidencias siguen siendo texto libre y no sustituyen esa fecha. Las revisiones anteriores se conservan para reconstruir el tablero al retroceder. Las notas antiguas sin fecha de lectura se reservan hasta el último capítulo disponible. Las copias de versión 1 siguen siendo importables; las nuevas usan la versión 2 y conservan las revisiones. Consulta `READING_LIMIT.md`.

## Verificación

Ejecuta `node --test tests/clues.test.cjs` desde la carpeta del proyecto para comprobar la conservación de notas, el límite por libro y la validación de copias.
