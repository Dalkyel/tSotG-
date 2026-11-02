# Explorar conexiones

Abre **Explorar conexiones** en la cabecera, en una ficha de personaje o en el panel de un nodo del mapa completo. Desde el tablero de pistas, pulsa uno de los temas de **Explorar conexiones**.

1. El mapa comienza con el tema elegido y hasta 12 vecinos directos (6 en pantallas más pequeñas). Se priorizan vínculos útiles del reparto principal. El contador indica cuántos vecinos quedan fuera de la vista.
2. Pulsa un nodo para leerlo. **Mostrar más conexiones** abre sus vecinos por lotes; **Mostrar todas sus conexiones** muestra todos los vecinos que cumplen los filtros.
3. **Centrar el mapa aquí** inicia una vista alrededor del nodo seleccionado. **Cerrar esta rama** retira su expansión; los nodos compartidos con otras ramas se conservan.
4. Filtra por tipo de nodo o vínculo. El centro permanece visible aunque no corresponda al tipo seleccionado. Las ramas desconectadas por los filtros se ocultan y reaparecen al restaurarlos.
5. Las líneas agrupan los vínculos entre cada pareja de temas. Púlsalas para leer todos los registros originales, con dirección y libro. Las flechas reflejan las direcciones registradas; no implican que todas las relaciones sigan vigentes simultáneamente.
6. **Volver** y **Adelante** restauran el centro, los filtros, las ramas y la vista anterior. **Solo conexiones iniciales** cierra las expansiones. **Mapa completo** vuelve al gráfico original y sitúa el centro seleccionado.

Puedes mover nodos, arrastrar el fondo y ampliar o reducir la vista. **Ajustar vista** encuadra los nodos visibles. En móvil, al seleccionar un nodo se abre su detalle debajo del gráfico; ampliar una rama vuelve a situar el gráfico en pantalla.

Esta vista usa copias para calcular las posiciones. No modifica los nodos, vínculos ni posiciones del mapa completo. Las expansiones y el historial se mantienen durante la sesión de la página, sin escribir en los archivos de los libros. Se respeta el límite compartido de libro y capítulo antes de indexar los nodos y vínculos. Consulta `READING_LIMIT.md` para el caso especial del Libro 1.

## Mantenimiento y verificación

`focus-core.js` indexa los vínculos y calcula las ramas visibles sin modificar los datos de entrada. `focus.js` controla la presentación, los filtros y el historial. Los nodos centrales y de categoría del mapa general no se añaden como vecinos de la vista enfocada; siguen disponibles en el mapa completo.

Ejecuta `node --test tests/*.test.cjs` para comprobar el modelo y las funciones de referencia existentes.
