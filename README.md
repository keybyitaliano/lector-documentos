# Lector de Documentos Estilo Word 📄✨

Un visor de documentos web moderno, limpio y formal que emula la interfaz de un procesador de textos de escritorio (como Microsoft Word o Google Docs). Está diseñado específicamente para ofrecer una lectura cómoda de archivos **.docx** y **.pdf** sobre un lienzo estructurado en formato de página física.

## 🚀 Características Principales

* **Renderizado Estilo Word:** Interfaz con fondo de escritorio gris y páginas blancas estructuradas con márgenes reglamentarios independientes.
* **Reparación Avanzada de Títulos PDF:** Algoritmo inteligente que detecta y fusiona automáticamente los títulos de capítulos que han sido corrompidos o divididos en múltiples renglones por el formato original del PDF.
* **Esquema de Navegación Dinámico:** Generación automática de un índice interactivo en el panel lateral izquierdo basado en los encabezados detectados.
* **Control de Lectura Completo:** Ajuste dinámico del tamaño de fuente, selector de tipografías (Serif/Sans-Serif) y tres modos visuales: Impresión (Blanco), Lectura (Sepia) y Modo Oscuro.
* **Persistencia Local:** Guarda automáticamente tu progreso de lectura y el último archivo cargado mediante `LocalStorage`.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías web nativas, sin necesidad de frameworks pesados:

* **HTML5 & CSS3:** Estructura semántica y maquetación responsiva con Variables CSS.
* **JavaScript (ES6+):** Lógica del lector y algoritmos de procesamiento de texto.
* **Mammoth.js:** Para la conversión limpia de archivos `.docx` a HTML.
* **PDF.js (Mozilla):** Para la extracción de flujos de texto desde archivos `.pdf`.

## 📂 Estructura del Proyecto

```text
├── index.html       # Estructura de la interfaz y barra de herramientas
├── style.css        # Diseño del entorno ofimático y maquetación de hojas
├── script.js        # Motor de lectura, persistencia y unificación de títulos
└── README.md        # Documentación del proyecto
