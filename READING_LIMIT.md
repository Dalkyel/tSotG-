# Límite compartido de lectura

En la cabecera, elige **Libro** y **Hasta capítulo**, y pulsa **Aplicar límite**. La página vuelve a cargar todas sus vistas con ese punto de lectura. El capítulo 0 significa antes del primer capítulo; en el Libro 2 permite el reparto/glosario registrado y todo el Libro 1.

El límite se aplica antes de construir el mapa, el índice de personajes, los buscadores, el explorador de conexiones, los archivos de versiones, las observaciones y los resúmenes. Retroceder el límite reconstruye las versiones anteriores; no basta con ocultar los nodos nuevos. Ningún archivo original se elimina.

## Compartir con el club

**Compartir límite** copia un enlace con `?book=2&chapter=32`, por ejemplo. Quien abra ese enlace en la web del proyecto verá el mismo límite, aunque su navegador tuviera otro guardado. El límite también se recuerda en ese navegador.

No hay sincronización en tiempo real entre dispositivos: distribuye el nuevo enlace cuando cambie el capítulo acordado. Si abres el proyecto como archivo local, el botón copia el límite y los parámetros; añádelos a la dirección de la web que usa el club. Si el navegador impide copiar al portapapeles, aparece un campo seleccionable.

Un enlace inválido abre el inicio del Libro 1 y muestra un aviso, en lugar de exponer el último capítulo.

## Fechas y conservación

- **Libro 2:** las actualizaciones y los vínculos se fechan a partir de sus bloques de capítulo. Un registro que incorpora explícitamente información de un capítulo posterior se reserva hasta ese capítulo completo; la versión anterior sigue disponible. Se corrigió el encabezado ausente del bloque de vínculos del capítulo 37. La confirmación del linaje de lobo de Breca se fecha en el capítulo 1, no en el reparto inicial.
- **Libro 1 antes del final:** las notas originales acumuladas no tienen fechas fiables por capítulo. Se muestran únicamente los resúmenes leídos, fichas con los párrafos de esos resúmenes que mencionan un nombre, y vínculos que indican su presencia en un capítulo. Esos vínculos no afirman alianzas ni parentescos. No se incorporan los títulos, identidades, observaciones o relaciones del mapa acumulado. Al completar el capítulo 53 se incorpora íntegro el archivo del Libro 1.
- **Guías del reparto:** las presentaciones generales y los alias añadidos manualmente se reservan para el final del tramo registrado. En capítulos anteriores se usan solo los nombres, versiones y extractos permitidos.
- **Notas del club:** las revisiones nuevas llevan el punto de lectura aplicado. Al retroceder, reaparecen sus versiones anteriores. Las ediciones antiguas sin procedencia de lectura se reservan hasta el último capítulo registrado de toda la colección (actualmente Libro 2, capítulo 48). Se conservan en almacenamiento y copias; no se les inventa una fecha anterior.
- **Copias:** la exportación incluye todas las versiones guardadas, también las posteriores al límite visible. Es una copia de respaldo completa. La importación acepta versiones 1 y 2; las entradas existentes conservan su versión local, como antes.

## Añadir capítulos

Los encabezados de capítulo de `book2/nodes.js` y `book2/links.js` delimitan el conocimiento de cada bloque. Mantén esos bloques y sus versiones anteriores; si corriges una entrada incorporando información posterior, indica explícitamente el capítulo correspondiente. Puedes añadir un campo numérico `chapter` para reservar un registro hasta un capítulo posterior al de su bloque.

Después de añadir o corregir capítulos, ejecuta:

```sh
node scripts/build-reading-metadata.cjs
node --test tests/*.test.cjs
```

`reading-metadata.js` contiene las fechas y huellas de cada registro; el compilador informa de los registros que ha tenido que retrasar. Una entrada nueva o modificada cuya huella no coincide con los metadatos queda oculta hasta que se revise y se regeneren. El archivo también conserva las huellas SHA-256 de los dos fuentes para detectar metadatos desactualizados durante las pruebas.

Las fuentes completas permanecen en el proyecto. Este límite controla la presentación de la aplicación; los archivos fuente y los respaldos completos contienen la información acumulada.
