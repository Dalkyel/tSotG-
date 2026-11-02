# Lectura del mapa y marcadores

- Los nombres del mapa completo aparecen fuera de los círculos y mantienen un tamaño de 14 píxeles en pantalla. Al alejar, se priorizan el reparto principal, los temas más conectados y los marcadores. Al acercar aparecen más nombres. Seleccionar o señalar un nodo da prioridad a su nombre y conexiones; los nombres se espacian para reducir solapamientos. Todos los nodos permanecen en el gráfico y el buscador.
- La **Leyenda** explica los colores por arco o tema, los tipos de líneas, las flechas y los registros del Libro 2. Se puede plegar; en móvil comienza plegada. El explorador de conexiones también tiene una leyenda.
- Señala una línea para ver su etiqueta. Púlsala para leer todos los vínculos registrados entre ambos temas, con sus direcciones y referencias de lectura. En el mapa completo, el recuadro de relaciones permite abrir cualquiera de los dos temas.
- El panel de un nodo muestra primero una presentación breve. **Descripción completa** y **Observaciones originales** conservan los textos enteros. Las conexiones se agrupan por tipo de vínculo; el buscador consulta nombres, alias y textos de relación. Los registros repetidos entre dos temas permanecen accesibles en sus desplegables.
- Usa **☆ Guardar marcador** en el panel de un nodo, una ficha de personaje, el explorador o una entrada del tablero de pistas. **★ Marcadores**, en la cabecera, reúne los accesos guardados y permite buscarlos o quitarlos.

## Límite y almacenamiento

Los marcadores se guardan en este navegador. No se comparten al copiar el enlace del límite del club y pueden perderse al borrar los datos del sitio.

Se guardan únicamente el tipo y el identificador del tema, sin copiar nombres, títulos ni respuestas. La lista obtiene esos textos de la vista de lectura actual: un personaje futuro queda oculto hasta su capítulo y un título anterior reaparece al retroceder. Los marcadores ocultos no se eliminan. Las preguntas se resuelven contra las versiones permitidas por el tablero de pistas.

Si el almacenamiento está lleno o no permite escribir, el botón muestra el error y se conservan los marcadores anteriores. Una colección ilegible no se sobrescribe automáticamente.

La mejora de presentación no cambia los archivos de los libros ni sus vínculos. Puedes ampliar el texto con el zoom del navegador; los botones de cierre y los controles principales también admiten teclado.

## Verificación

Ejecuta `node --test tests/*.test.cjs`. Las pruebas de marcadores comprueban la conservación de identificadores, el uso de nombres del capítulo actual, la ocultación de temas futuros y la validación del almacenamiento.
