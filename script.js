// script.js

// Variables para los inputs
const titleInput = document.getElementById('titleInput');
const titleColorInput = document.getElementById('titleColorInput');
const titleSizeInput = document.getElementById('titleSizeInput');
const titleFont = document.getElementById('titleFont'); // Nueva variable para la fuente del título

const descriptionInput1 = document.getElementById('descriptionInput1');
const description1ColorInput = document.getElementById('description1ColorInput');
const description1SizeInput = document.getElementById('description1SizeInput');
const description1Font = document.getElementById('description1Font'); // Nueva variable para la fuente de la primera descripción

const descriptionInput2 = document.getElementById('descriptionInput2');
const description2ColorInput = document.getElementById('description2ColorInput');
const description2SizeInput = document.getElementById('description2SizeInput');
const description2Font = document.getElementById('description2Font'); // Nueva variable para la fuente de la segunda descripción



// Variables para la vista previa
const previewTitle = document.getElementById('previewTitle');
const previewDescription1 = document.getElementById('previewDescription1');
const previewDescription2 = document.getElementById('previewDescription2');
const canvas = document.getElementById('canvas');

// Variables para imágenes
const imagenFondoInput = document.getElementById('imagenFondo');
const cenefaInput = document.getElementById('cenefa');

// Función para ajustar el ancho del texto dinámicamente
function adjustTextWidth(element) {
  const context = canvas.getContext('2d');
  context.font = window.getComputedStyle(element).font;
  const textWidth = context.measureText(element.textContent).width;
  element.style.width = textWidth + 20 + 'px'; // Añadimos un padding de 20px
}

// Función para mostrar una página y ocultar las demás
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');
  document.getElementById(pageId).style.display = 'block';
}

// Inicializamos en la página 1
showPage('page1');

// Navegación entre páginas
document.getElementById('next1').addEventListener('click', () => showPage('page2'));
document.getElementById('next2').addEventListener('click', () => showPage('page3'));
document.getElementById('next3').addEventListener('click', () => showPage('page4'));
document.getElementById('next4').addEventListener('click', () => showPage('page5'));

document.getElementById('prev2').addEventListener('click', () => showPage('page1'));
document.getElementById('prev3').addEventListener('click', () => showPage('page2'));
document.getElementById('prev4').addEventListener('click', () => showPage('page3'));
document.getElementById('prev5').addEventListener('click', () => showPage('page4'));

// Actualización en tiempo real de la vista previa

// Título
titleInput.addEventListener('input', function() {
  previewTitle.textContent = titleInput.value || 'Vista previa del título';
  adjustTextWidth(previewTitle); // Ajusta el ancho del texto
});

titleColorInput.addEventListener('input', function() {
  previewTitle.style.color = titleColorInput.value
  });

titleSizeInput.addEventListener('input', function() {
  const textSize = `${titleSizeInput.value}px`;
  previewTitle.style.fontSize = textSize;
  adjustTextWidth(previewTitle); // Ajusta el ancho del texto al cambiar el tamaño
});

// Aplicamos la fuente seleccionada para el título
titleFont.addEventListener('change', function() {
  previewTitle.style.fontFamily = titleFont.value;
  adjustTextWidth(previewTitle); // Ajusta el ancho del texto al cambiar la fuente
});

// Descripción 1
descriptionInput1.addEventListener('input', function() {
  previewDescription1.textContent = descriptionInput1.value || 'Vista previa de la descripción';
  adjustTextWidth(previewDescription1); // Ajusta el ancho del texto
});

description1ColorInput.addEventListener('input', function() {
  previewDescription1.style.color = description1ColorInput.value;
});

description1SizeInput.addEventListener('input', function() {
  const textSize = `${description1SizeInput.value}px`;
  previewDescription1.style.fontSize = textSize;
  adjustTextWidth(previewDescription1); // Ajusta el ancho del texto al cambiar el tamaño
});

// Aplicamos la fuente seleccionada para la primera descripción
description1Font.addEventListener('change', function() {
  previewDescription1.style.fontFamily = description1Font.value;
  adjustTextWidth(previewDescription1); // Ajusta el ancho del texto al cambiar la fuente
});

// Descripción 2
descriptionInput2.addEventListener('input', function() {
  previewDescription2.textContent = descriptionInput2.value || 'Vista previa de la segunda descripción';
  adjustTextWidth(previewDescription2); // Ajusta el ancho del texto
});

description2ColorInput.addEventListener('input', function() {
  previewDescription2.style.color = description2ColorInput.value;
});

description2SizeInput.addEventListener('input', function() {
  const textSize = `${description2SizeInput.value}px`;
  previewDescription2.style.fontSize = textSize;
  adjustTextWidth(previewDescription2); // Ajusta el ancho del texto al cambiar el tamaño
});

// Aplicamos la fuente seleccionada para la segunda descripción
description2Font.addEventListener('change', function() {
  previewDescription2.style.fontFamily = description2Font.value;
  adjustTextWidth(previewDescription2); // Ajusta el ancho del texto al cambiar la fuente
});



// Funcionalidad de arrastrar y soltar
function makeElementDraggable(el) {
  el.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - el.getBoundingClientRect().left;
    let shiftY = event.clientY - el.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      let newLeft = pageX - shiftX - canvas.getBoundingClientRect().left;
      let newTop = pageY - shiftY - canvas.getBoundingClientRect().top;

      // Limitar dentro del canvas
      newLeft = Math.max(0, Math.min(newLeft, canvas.clientWidth - el.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, canvas.clientHeight - el.offsetHeight));

      el.style.left = newLeft + 'px';
      el.style.top = newTop + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    el.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;
    };
  };

  el.ondragstart = function() {
    return false;
  };
}

makeElementDraggable(previewTitle);
makeElementDraggable(previewDescription1);
makeElementDraggable(previewDescription2);

// Función para exportar la vista previa como imagen PNG con dimensiones específicas
document.getElementById('exportBtn').addEventListener('click', function() {
  const dpi = 300; // Puntos por pulgada para alta definición
  const widthInCm = 10; // Ancho en cm
  const heightInCm = 15; // Alto en cm
  const cmToInch = 2.54; // Conversión de cm a pulgadas

  // Convertir cm a píxeles (a 300 DPI)
  const widthInPx = (widthInCm / cmToInch) * dpi;
  const heightInPx = (heightInCm / cmToInch) * dpi;

  const scaleFactor = widthInPx / canvas.clientWidth;
  
  

  html2canvas(canvas, {
    scale: scaleFactor,
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }).then(function(canvasExported) {
    let link = document.createElement('a');
    link.href = canvasExported.toDataURL('image/png');
    link.download = 'vista-previa.png';
    link.click();
  });
  
});