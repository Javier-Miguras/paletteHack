//Esconder paleta, refresh, b&w button

let div = document.querySelector('#grid');
        div.classList.add('hidden');

let but = document.querySelector('#refresh');
but.classList.add('hidden');

let bnwBut = document.querySelector('#bnwButton');
bnwBut.classList.add('hidden');



//Crear previsualización

const $seleccionArchivos = document.querySelector("#fileInput"),
$imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");


// Oculta previsualización inicialmente

$imagenPrevisualizacion.classList.add('normal');


// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {

// Los archivos seleccionados, pueden ser muchos o uno
const archivos = $seleccionArchivos.files;
// Si no hay archivos salimos de la función y quitamos la imagen
if (!archivos || !archivos.length) {
$imagenPrevisualizacion.src = "";
return;
}

// Vuelve visible previsualización

$imagenPrevisualizacion.classList.remove('normal');

// Ahora tomamos el primer archivo, el cual vamos a previsualizar
const primerArchivo = archivos[0];
// Lo convertimos a un objeto de tipo objectURL
const objectURL = URL.createObjectURL(primerArchivo);
// Y a la fuente de la imagen le ponemos el objectURL
$imagenPrevisualizacion.src = objectURL;

});


//Maximizar-Minificar imagen

let isImageScaled = false;
const $container = $imagenPrevisualizacion.parentElement; // Contenedor de la imagen

$imagenPrevisualizacion.addEventListener('click', function() {
  isImageScaled = !isImageScaled;
  const scale = isImageScaled ? 2 : 1;
  $imagenPrevisualizacion.style.transform = `scale(${scale})`;
  $imagenPrevisualizacion.style.transformOrigin = '0 0';

  // Cambia el cursor según el estado de escala
  if (isImageScaled) {
    $imagenPrevisualizacion.classList.add('zoomed-out');
    $imagenPrevisualizacion.classList.remove('zoomed-in');
  } else {
    $imagenPrevisualizacion.classList.add('zoomed-in');
    $imagenPrevisualizacion.classList.remove('zoomed-out');
  }
});

$imagenPrevisualizacion.addEventListener('mousemove', function(event) {
  if (isImageScaled) {
    const container = $imagenPrevisualizacion.parentElement;
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    $imagenPrevisualizacion.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  }
});

$container.addEventListener('mouseout', function() {
  // Reestablece la escala cuando el mouse sale del contenedor
  isImageScaled = false;
  $imagenPrevisualizacion.style.transform = 'scale(1)';
  $imagenPrevisualizacion.style.transformOrigin = '0 0';

  // Cambia el cursor a zoomed-in
  $imagenPrevisualizacion.classList.add('zoomed-in');
  $imagenPrevisualizacion.classList.remove('zoomed-out');
});


//Crear paleta



   // Obtén la referencia a la imagen
   const sourceImage = document.getElementById('imagenPrevisualizacion');

   // Crea una instancia de ColorThief
   const colorThief = new ColorThief();

   // Espera a que la imagen se cargue completamente
   sourceImage.addEventListener('load', () => {
       // Obtiene la paleta de colores de la imagen y el color dominante
       const colorPalette = colorThief.getPalette(sourceImage, 10);
       const dominantColor = colorThief.getColor(sourceImage);

       // La paleta de colores estará en colorPalette

       // Función para calcular la luminosidad de un color RGB
        function calcularLuminosidad(color) {
        const r = color[0] / 255;
        const g = color[1] / 255;
        const b = color[2] / 255;

        const luminosidad = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminosidad;
        
        }

        // Ordenar la lista de colores por luminosidad (de menor a mayor)

        colorPalette.sort((color1, color2) => calcularLuminosidad(color1) - calcularLuminosidad(color2));

       


       // Crea una variable de css para cada color

       document.documentElement.style.setProperty('--dColor', `rgb(${dominantColor})`);

       document.documentElement.style.setProperty('--color1', `rgb(${colorPalette[0]})`);
       document.documentElement.style.setProperty('--color2', `rgb(${colorPalette[1]})`);
       document.documentElement.style.setProperty('--color3', `rgb(${colorPalette[2]})`);
       document.documentElement.style.setProperty('--color4', `rgb(${colorPalette[3]})`);
       document.documentElement.style.setProperty('--color5', `rgb(${colorPalette[4]})`);
       document.documentElement.style.setProperty('--color6', `rgb(${colorPalette[5]})`);
       document.documentElement.style.setProperty('--color7', `rgb(${colorPalette[6]})`);
       document.documentElement.style.setProperty('--color8', `rgb(${colorPalette[7]})`);
       document.documentElement.style.setProperty('--color9', `rgb(${colorPalette[8]})`);
       document.documentElement.style.setProperty('--color10', `rgb(${colorPalette[9]})`);

       bnwBut.classList.remove('hidden');
       div.classList.remove('hidden');
       but.classList.remove('hidden');

       let drop = document.querySelector('#drop-icon');
        drop.classList.add('hidden');

        let drop1 = document.querySelector('#drop-text');
        drop1.classList.add('hidden');

        let drop2 = document.querySelector('#fileInput');
        drop2.classList.add('hidden');

                   

        

   // Black $ White button event

   bnwBut.addEventListener('click', function() {

        if (sourceImage.classList.contains('bnw')) {
                sourceImage.classList.remove('bnw');
            } else {
                sourceImage.classList.add('bnw');
            }
    });

  //Modal Window

  const modal = document.querySelector('#modal');
  const openModal = document.querySelectorAll('.modalBtn');
  const closeModal = document.querySelector('#closeModal');

  openModal.forEach((button) => {
    button.addEventListener('click', () => {
      modal.showModal();
      modal.classList.add('dsp-flex');
      if(modal.classList.contains('hidden')){
        modal.classList.remove('hidden');  
      }
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('dsp-flex');    
    modal.classList.add('hidden');    
    modal.close();
  });


 //Crear paleta de variaciones

 
 
// Evento de clic en los elementos HTML
document.querySelectorAll('.modalBtn').forEach(function(elemento) {
  elemento.addEventListener('click', function(evento) {
    // Obtiene el valor de background-color del elemento clickeado
    const colorDeFondo = getComputedStyle(evento.target).getPropertyValue('background-color');

    
    

    //transformar rgb a array

    const colorString = colorDeFondo;
    const colorArray = colorString
    .substring(4, colorString.length - 1) // Elimina "rgb(" y ")"
    .split(', ')
    .map(Number);

    


const colorPrincipal = colorArray; 






// Función para verificar si un color es claro u oscuro
function esColorClaro(color) {
  // Calcula el valor promedio de los canales de color (RGB)
  const promedio = (color[0] + color[1] + color[2]) / 3;

  // Define un umbral (generalmente 128) para distinguir entre claro y oscuro
  const umbral = 128;

  // Retorna verdadero si el color es más claro que el umbral
  return promedio > umbral;
}


function generarVariacionesDeColor(color, cantidad){

  if (!esColorClaro(colorArray)) {
    // Función para generar variaciones de color más claro
    
      const variaciones = [];
      for (let i = 1; i <= cantidad; i++) {
        const factor = 1 + (i / (cantidad + 1)); // Ajusta el factor según la cantidad de variaciones
        const variacion = color.map(channel => Math.round(channel * factor));
        variaciones.push(variacion);
      }
      return variaciones;
    
  } else {
    // Función para generar variaciones de color más oscuro
    
      const variaciones = [];
      for (let i = 1; i <= cantidad; i++) {
        const factor = 1 - (i / (cantidad + 1)); // Resta el factor para obtener colores más oscuros
        const variacion = color.map(channel => Math.round(channel * factor));
        variaciones.push(variacion);
      }
      return variaciones;
    
  }
  

}




  
// Generar 5 variaciones del color principal
const variacionesDeColor = generarVariacionesDeColor(colorPrincipal, 5);
  
// Guardar cada variación como una variable de color
const colorVariacion1 = `rgb(${variacionesDeColor[0].join(", ")})`;
const colorVariacion2 = `rgb(${variacionesDeColor[1].join(", ")})`;
const colorVariacion3 = `rgb(${variacionesDeColor[2].join(", ")})`;
const colorVariacion4 = `rgb(${variacionesDeColor[3].join(", ")})`;
const colorVariacion5 = `rgb(${variacionesDeColor[4].join(", ")})`;

document.documentElement.style.setProperty('--ptone', `rgb(${colorPrincipal})`);
document.documentElement.style.setProperty('--tone1', colorVariacion1);
document.documentElement.style.setProperty('--tone2', colorVariacion2);
document.documentElement.style.setProperty('--tone3', colorVariacion3);
document.documentElement.style.setProperty('--tone4', colorVariacion4);
document.documentElement.style.setProperty('--tone5', colorVariacion5);

  





  });
});





        



  
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const hamburguer = dropdownBtn.innerHTML;


  dropdownContent.style.display = "none";



  dropdownBtn.addEventListener("click", function () {
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      dropdownBtn.innerHTML = hamburguer;
    } else {
      dropdownContent.style.display = "block";
      dropdownBtn.innerHTML = "&#10005;";
    }
  });

  // Cierra el botón desplegable si se hace clic en cualquier parte del documento
  document.addEventListener("click", function (event) {
    if (!dropdownBtn.contains(event.target) && event.target !== dropdownBtn) {
      dropdownContent.style.display = "none";
      dropdownBtn.innerHTML = hamburguer;
    }
  });

  // Evita que el clic en el botón se propague y cierre el desplegable
  dropdownBtn.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

//Modal about

//Open

const modalAbout = document.querySelector('#modal-about');
const openModalAbout = document.querySelector('#open-about');

openModalAbout.addEventListener('click', (event) => {
  event.preventDefault();
  modalAbout.showModal();
  modalAbout.classList.add('dsp-flex');
  if(modalAbout.classList.contains('hidden')){
    modalAbout.classList.remove('hidden');  
  }
});


//Close

const closeModalAbout = document.querySelector('#closeModalAbout');

closeModalAbout.addEventListener('click', () => {
  modalAbout.classList.remove('dsp-flex');    
  modalAbout.classList.add('hidden'); 
  modalAbout.close();
});


//Light-Dark Mode

const colorMode = document.querySelector('#color-mode');
const body = document.querySelector('#body');
const light = colorMode.innerHTML;


// Escucha el evento click en colorMode
colorMode.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    colorMode.innerHTML = "Light mode";
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    colorMode.innerHTML = light;
  }
  guardarModo(); // Guarda el estado del modo al cambiarlo
});

// Carga el modo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarModo();
});

// Función para cargar el modo desde localStorage
function cargarModo() {
  const modo = localStorage.getItem('modo');
  if (modo === 'dark-mode') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    colorMode.innerHTML = "Light mode";
  }
}

// Función para guardar el modo en localStorage
function guardarModo() {
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('modo', 'dark-mode');
  } else {
    localStorage.setItem('modo', 'light-mode');
  }
}

