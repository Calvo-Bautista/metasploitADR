# Metasploit: presentación académica

Abrir `index.html` en un navegador moderno. No necesita servidor, instalación ni conexión a Internet. Mantener `index.html`, `styles.css` y `presentation.js` en la misma carpeta.

## Recorrido

11 diapositivas en el orden solicitado:

| Bloque | Diapositivas | Contenido |
| --- | --- | --- |
| 1. Presentación y qué es | 1–2 | Portada, definición y evidencia |
| 2. Usos, arquitectura y conceptos | 3–6 | Aplicaciones, capas, módulos y ciclo de prueba |
| 3. Caso de uso | 7 | EternalBlue, MS17-010 y WannaCry |
| 4. Demo | 8 | Laboratorio aislado; la prueba se muestra en la terminal |
| 5. Historia | 9 | 2003, Ruby, Rapid7 y comunidad |
| 6. Forma de evitarlo | 10–11 | Defensa en capas, cierre y fuentes |

Tiempo orientativo: 15 minutos de diapositivas, más preguntas y el margen necesario para la demo real.

## Controles

| Acción | Control |
| --- | --- |
| Avanzar / retroceder | Flechas, Page Down / Page Up o botones inferiores |
| Avanzar | Barra espaciadora, salvo si un botón o enlace tiene foco |
| Primera / última diapositiva | Home / End |
| Elegir bloque | Navegación superior |
| Ver índice | `O` o botón de cuadrícula |
| Notas del expositor | `N` o botón de notas |
| Pantalla completa | `F` o botón de pantalla completa; F11 como alternativa |
| Cerrar un panel | Esc, botón de cierre o clic fuera |
| Navegar en móvil | Deslizamiento horizontal o botones |
| Leer contenido largo en móvil | Desplazamiento vertical dentro de la diapositiva |
| Leer contenido largo con teclado | Flechas verticales, Page Up/Down, espacio y Home/End desplazan el contenido; flechas horizontales cambian de slide |
| Imprimir / exportar PDF | Ctrl+P; elegir Guardar como PDF, horizontal, sin encabezados/pies y con gráficos de fondo |

Las notas aparecen en la misma pantalla, no en una ventana privada del presentador. Cerrarlas antes de seguir proyectando.

Los atajos de una letra se pueden desactivar desde el índice de diapositivas.

Los enlaces `index.html#7`, por ejemplo, abren directamente una diapositiva. La presentación no avanza sola: los efectos se activan al entrar en cada slide. Respeta la preferencia de movimiento reducido del sistema.

## Proyección en 800×600

La presentación adapta automáticamente su distribución a pantallas horizontales de 700 a 900 píxeles de ancho y hasta 650 píxeles de alto. En 800×600 usa columnas específicas, controles compactos, mayor contraste y menos espacio decorativo para que las diapositivas se vean completas.

Configurar la salida del proyector en 800×600, mantener el zoom del navegador en 100% y activar pantalla completa con `F` o F11. No hace falta reducir el zoom para que entre el contenido.

## Demo y precisión técnica

La diapositiva 8 es la única del bloque de demo y muestra la arquitectura del laboratorio. Para ejecutar la prueba, cambiar a la terminal del laboratorio autorizado. La presentación no incluye una simulación de terminal.

La demo propone Kali y Metasploitable 2 en una red virtual interna, sin adaptadores hacia Internet durante la prueba. Las IP son ejemplos. No utilizar máquinas ajenas ni datos reales. Para una demo en vivo, cambiar a la terminal del laboratorio autorizado.

MS17-010 es un boletín con varias correcciones. El Framework era open source antes de 2011. Si se usa vsftpd en la demo real, recordar que su backdoor afectó una distribución comprometida: el número de versión por sí solo no confirma su presencia.

## Personalización

La portada usa una identificación académica genérica, sin inventar integrantes ni materia. Se pueden agregar esos datos en `index.html`, dentro de `hero-footer`. Las notas están en los elementos `aside.speaker-note`; los colores y tamaños se definen en `styles.css`. El escudo es una recreación vectorial local del logo de referencia, para uso educativo.

Fuentes oficiales enlazadas en el cierre: repositorio y documentación de Metasploit, módulo de vsftpd, boletín Microsoft MS17-010 y guía de Metasploitable 2.
