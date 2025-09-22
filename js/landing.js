const btnComenzar = document.querySelector('.btn');
const cloudsContainer = document.getElementById('clouds');
const landingBg = document.getElementById('landingBg');
const content = document.getElementById('content');
const nextSection = document.getElementById('nextSection');
const sozoria = document.getElementById('sozoria');
const botonComenzar = document.getElementById('botonComenzar');

btnComenzar.addEventListener('click', function(e) {
  e.preventDefault();
  // Animar todo hacia arriba
  landingBg.classList.add('move-up');
  content.classList.add('move-up');
  sozoria.classList.add('move-up');
  botonComenzar.classList.add('move-up');

  // Espera la animación y muestra la siguiente sección
  setTimeout(() => {
    cloudsContainer.style.display = 'none';
    landingBg.style.display = 'none';
    content.style.display = 'none';
    sozoria.style.display = 'none';
    botonComenzar.style.display = 'none';
    nextSection.style.display = 'block';
    // Agrega la clase para animar la entrada
    setTimeout(() => {
      nextSection.classList.add('show');
    }, 100); // <-- Aquí puedes ajustar el pequeño delay para la animación de entrada
    // window.location.href = 'secciones/categorias.html'; // si quieres navegar
  }, 1200); // <-- Aquí puedes ajustar el tiempo total de la animación de salida
});

// Cuando termina la animación de las nubes, mostramos el fondo y el contenido

// const cloudsContainer = document.getElementById('clouds');
// const landingBg = document.getElementById('landingBg');
// const content = document.getElementById('content');

// Escuchar el evento de fin de animación de la primera nube, ya que todas duran igual
const cloud1 = cloudsContainer.querySelector('.cloud1');

cloud1.addEventListener('animationend', () => {
  // Parar la animación de las nubes (eliminar clase)
  cloudsContainer.classList.remove('clouds-moving');

  // Mostrar y subir la imagen de fondo
  landingBg.classList.add('show');

  // Mostrar título y botón animados
  content.classList.add('show');
});



