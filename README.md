# 📄 Convertidor y Editor de Archivos a PDF — KeybyWord

Una aplicación web moderna e interactiva orientada a la **edición de texto, procesamiento de imágenes y exportación a formato PDF**. 

Su objetivo principal es ofrecer un espacio centralizado en el navegador para redactar, ajustar contenido visual y consolidar documentos o fotos en un archivo PDF listo para descargar.

---

## 🎯 ¿A qué se dedica esta aplicación?

Esta herramienta funciona como un **puente de edición y conversión a PDF** que abarca cuatro flujos principales:

1. **Transformación de Documentos e Imágenes a PDF:**
   Permite cargar archivos de texto o fotos (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) mediante arrastrar y soltar (*Drag & Drop*) para visualizarlos e integrarlos directamente en un lienzo de trabajo.

2. **Edición Visual en Tiempo Real:**
   Integra un editor tipo procesador de texto (WYSIWYG) que te permite redactar contenido desde cero, modificar textos existentes, insertar imágenes y dar formato (fuentes, alineación, negrita, cursiva) antes de generar el documento final.

3. **Generación Local y Descarga:**
   Procesa el contenido visualizado en pantalla y genera el archivo PDF final. Todo el proceso ocurre en el navegador del usuario, garantizando privacidad y rapidez sin requerir servidores externos ni instalación de software.

4. **Módulo de Firma, Aclaración y Sello Personalizable:**
   Permite crear, administrar e integrar firmas y validaciones dentro del documento con control total por parte del usuario:
   * **Trazo Manual:** Lienzo digital para dibujar la firma a mano alzada.
   * **Texto y Aclaración:** Campo para escribir datos identificativos (nombre, DNI, cargo) con vista previa en tiempo real.
   * **Sello Digital:** Carga de sellos corporativos en formato PNG sin fondo.
   * **Ajuste Personalizado:** Todo elemento insertado se puede arrastrar, posicionar, redimensionar y adaptar libremente según el gusto o las necesidades del usuario.

---

## 💼 Propósito y Enfoque

Esta aplicación fue desarrollada con el fin de **agilizar y facilitar la gestión documental en entornos empresariales y contractuales**. 

Permite a profesionales, PYMEs y empresas preparar, personalizar, validar y convertir contratos, acuerdos legales o formularios en archivos PDF finales de forma ágil, segura y 100% local.

---

## 📂 Estructura del Proyecto y Explicación de Rutas

```text
├── css/                                # Módulos de estilos CSS
│   ├── components.css                  # Estilos de botones, tarjetas, badges y UI reusable
│   ├── editor.css                      # Diseño del lienzo de hoja A4 y barra de herramientas
│   ├── modals-help-responsive.css     # Estilos adaptativos (Mobile/Tablet) y modales emergentes
│   └── variables-base.css              # Variables globales (colores dark-mode, 3D, tipografías)
├── imagenes/                           # Recursos gráficos y favicons de la web
│   ├── android-chrome-192x192.png      # Icono de app para dispositivos Android (resolución estándar)
│   ├── android-chrome-512x512.png      # Icono de alta definición para Android y pantallas Retina
│   ├── apple-touch-icon.png            # Icono para accesos directos en iOS (iPhone/iPad)
│   ├── favicon-16x16.png               # Favicon pequeño para navegadores web
│   ├── favicon-32x32.png               # Favicon estándar para pestañas del navegador
│   └── favicon.ico                     # Icono clásico de compatibilidad directa
├── js/                                 # Lógica del cliente
│   └── app.js                          # Control del DOM, Drag & Drop, firmas Canvas y exportación PDF
├── index.html                          # Estructura principal y maquetación semántica HTML5
├── README.md                           # Documentación técnica oficial del proyecto
└── site.webmanifest                    # Configuración PWA para instalación de la app

```

--- 

## 📜 Derechos de Autor y Contacto

Todos los derechos reservados © KeybyWord — Desarrollado y mantenido por keybyitaliano.

Queda estrictamente prohibida la reproducción, copia, distribución o modificación no autorizada de este software y sus recursos gráficos sin el consentimiento explícito del autor.

 Desarrollador: **keybyitaliano**

Sitio Web: keybyitaliano.dev

Correo de Contacto: **contacto@keybyitaliano.dev**

---
