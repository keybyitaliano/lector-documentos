// Desactivación de workers para garantizar compatibilidad local y evitar bloqueos CORS
pdfjsLib.GlobalWorkerOptions.workerDisabled = true;

// Inicialización de componentes de la interfaz de usuario
const filePicker = document.getElementById('filePicker');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const reader = document.getElementById('reader');
const welcome = document.getElementById('welcome');

const btnIncrease = document.getElementById('btnIncrease');
const btnDecrease = document.getElementById('btnDecrease');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');
const themeSelect = document.getElementById('themeSelect');
const fontSelect = document.getElementById('fontSelect');

const btnToggleSidebar = document.getElementById('btnToggleSidebar');
const indexContainer = document.getElementById('indexContainer');
const btnFullscreen = document.getElementById('btnFullscreen');

let currentFontSize = 16; // Tamaño base estándar tipo Word

// AL ARRANCAR LA APP: Verificar si existe progreso guardado en LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedContent = localStorage.getItem("word_reader_content");
    const savedName = localStorage.getItem("word_reader_filename");
    const savedScroll = localStorage.getItem("word_reader_scroll");

    if (savedContent && savedName) {
        fileNameDisplay.textContent = savedName;
        displayContent(savedContent, false);
        
        setTimeout(() => {
            window.scrollTo({ top: parseInt(savedScroll || 0) });
        }, 250);
    }
});

// Guardar progreso del scroll
window.addEventListener("scroll", () => {
    if (reader.innerHTML !== "" && reader.style.display !== "none") {
        localStorage.setItem("word_reader_scroll", window.scrollY);
    }
});

// Gestor de eventos para la carga de archivos (.docx y .pdf)
filePicker.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    fileNameDisplay.textContent = file.name;
    localStorage.setItem("word_reader_filename", file.name);
    
    const fileReader = new FileReader();

    if (file.name.endsWith('.docx')) {
        fileReader.onload = function(e) {
            const arrayBuffer = e.target.result;
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(function(result) {
                    displayContent(result.value, true);
                })
                .catch(function(err) {
                    alert("Error al procesar el archivo Word: " + err);
                });
        };
        fileReader.readAsArrayBuffer(file);

    } else if (file.name.endsWith('.pdf')) {
        fileReader.onload = function(e) {
            const typedarray = new Uint8Array(e.target.result);
            
            pdfjsLib.getDocument({ data: typedarray }).promise.then(function(pdf) {
                let maxPages = pdf.numPages;
                let countPromises = [];

                for (let i = 1; i <= maxPages; i++) {
                    countPromises.push(
                        pdf.getPage(i).then(function(page) {
                            return page.getTextContent().then(function(textContent) {
                                return textContent.items.map(item => item.str.trim());
                            });
                        })
                    );
                }

                Promise.all(countPromises).then(function(pagesLines) {
                    let fullHtml = "";
                    // Filtrar strings vacías pero conservar la estructura original
                    let allLines = pagesLines.flat().map(l => l.trim()).filter(l => l !== '');
                    
                    let processedElements = [];
                    
                    for (let i = 0; i < allLines.length; i++) {
                        let line = allLines[i];
                        if (!line) continue;

                        // Expresión regular ultra-sensible para detectar inicios de capítulos
                        const isChapterTrigger = /^(CAPITULO|CAPÍTULO|CHAPTER|PRÓLOGO|PROLOGO|PARTE|SECCIÓN|SECCION|\bLIVRO\b|\bLIBRO\b)/i.test(line);

                        if (isChapterTrigger) {
                            let accumulatedTitle = line;
                            
                            // Forzamos un bucle de reparación agresivo (mira hasta 3 líneas abajo buscando la continuación)
                            while (i + 1 < allLines.length) {
                                let nextLine = allLines[i + 1];
                                
                                // Si la línea de abajo es un número suelto (número de página del PDF), la saltamos e ignoramos
                                if (/^\d+$/.test(nextLine)) {
                                    i++; 
                                    continue;
                                }

                                // Si la línea de abajo inicia un capítulo nuevo, nos detenemos inmediatamente
                                const nextIsAnotherChapter = /^(CAPITULO|CAPÍTULO|CHAPTER|PRÓLOGO|PROLOGO|PARTE|SECCIÓN|SECCION|\bLIVRO\b|\bLIBRO\b)/i.test(nextLine);
                                if (nextIsAnotherChapter) {
                                    break;
                                }

                                // CRITERIO REPARADOR CLAVE: 
                                // Si el título acumulado NO termina con un punto o signo de puntuación, 
                                // o si la línea de abajo empieza con minúscula, significa con 100% de certeza 
                                // que el texto se rompió por error del PDF.
                                const endsWithPunctuation = /[.!?:;]$/.test(accumulatedTitle);
                                const nextStartsWithLowercase = /^[a-zñáéíóú]/.test(nextLine);
                                const isNextLineShort = nextLine.length < 90;

                                if (!endsWithPunctuation || nextStartsWithLowercase || isNextLineShort) {
                                    accumulatedTitle += " " + nextLine;
                                    i++; // Consumimos la línea porque ya se integró con éxito arriba
                                } else {
                                    break; // Es un párrafo normal, detenemos la absorción
                                }
                            }
                            
                            // Limpieza profunda de espacios dobles y tabulaciones raras del PDF
                            accumulatedTitle = accumulatedTitle.replace(/\s+/g, ' ').trim();
                            
                            processedElements.push(`<h3>${accumulatedTitle}</h3>`);
                        } else {
                            processedElements.push(`<p>${line}</p>`);
                        }
                    }

                    fullHtml = processedElements.join("");
                    displayContent(fullHtml, true);
                });
            }).catch(function(err) {
                alert("Error al procesar el documento PDF: " + err);
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
});

// Inyección de contenido estructurado
function displayContent(htmlContent, resetScroll = true) {
    welcome.style.display = 'none';
    reader.innerHTML = htmlContent;
    reader.style.display = 'block';
    
    localStorage.setItem("word_reader_content", htmlContent);
    
    if (resetScroll) {
        window.scrollTo({ top: 0 });
        localStorage.setItem("word_reader_scroll", 0);
    }

    generarIndiceDocumento();
}

// Generar esquema dinámico en el panel de navegación
function generarIndiceDocumento() {
    indexContainer.innerHTML = "";
    const headings = reader.querySelectorAll("h3");

    if (headings.length === 0) {
        indexContainer.innerHTML = '<span class="index-empty">Ningún encabezado detectado</span>';
        return;
    }

    headings.forEach((heading, index) => {
        const headingId = `heading-${index}`;
        heading.id = headingId;

        const link = document.createElement("a");
        link.className = "index-item";
        link.textContent = heading.textContent;
        
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetOffset = heading.getBoundingClientRect().top + window.scrollY - 75;
            window.scrollTo({ top: targetOffset, behavior: "smooth" });
        });

        indexContainer.appendChild(link);
    });
}

// Interacción del panel lateral de navegación
btnToggleSidebar.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
});

// Modificaciones tipográficas
btnIncrease.addEventListener('click', () => {
    if (currentFontSize < 32) {
        currentFontSize += 1;
        updateFontSize();
    }
});

btnDecrease.addEventListener('click', () => {
    if (currentFontSize > 11) {
        currentFontSize -= 1;
        updateFontSize();
    }
});

function updateFontSize() {
    reader.style.fontSize = currentFontSize + 'px';
    fontSizeDisplay.textContent = currentFontSize + 'px';
}

themeSelect.addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});

fontSelect.addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--font-reader', e.target.value);
});

// Pantalla Completa
btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error al activar pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});