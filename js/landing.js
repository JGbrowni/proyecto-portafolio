const btnComenzar = document.querySelector('.btn');
const cloudsContainer = document.getElementById('clouds');
const landingBg = document.getElementById('landingBg');
const content = document.getElementById('content');
const nextSection = document.getElementById('nextSection');
const sozoria = document.getElementById('sozoria');
const botonComenzar = document.getElementById('botonComenzar');
const WelcomeText = document.getElementById('WelcomeText');
const TitleStatic = document.getElementById('TitleStatic');
const Logos = document.getElementById('Logos');


btnComenzar.addEventListener('click', function(e) {
  e.preventDefault();
  // Animar todo hacia arriba
  landingBg.classList.add('move-up');
  content.classList.add('move-up');
  sozoria.classList.add('move-up');
  botonComenzar.classList.add('move-up');
  Logos.classList.add('move-up');
  WelcomeText.style.display = 'none';
  TitleStatic.style.display = 'none';


  

  // Espera la animación y muestra la siguiente sección
  setTimeout(() => {
    cloudsContainer.style.display = 'none';
    landingBg.style.display = 'none';
    content.style.display = 'none';
    sozoria.style.display = 'none';
    botonComenzar.style.display = 'none';
    WelcomeText.style.display = 'none';
    TitleStatic.style.display = 'none';
    nextSection.style.display = 'block';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
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



document.addEventListener('DOMContentLoaded', function() {

  // Barras móviles → abren el mismo lightbox que las cards
  document.querySelectorAll('.mobile-bar').forEach(function(bar) {
    bar.addEventListener('click', function() {
      var idx = bar.getAttribute('data-lightbox');
      var lightbox = document.getElementById('lightboxCard' + idx);
      if (lightbox) lightbox.classList.add('show');
    });
  });

  // Selecciona todos los cards
  var cards = document.querySelectorAll('.cardd');
  cards.forEach(function(card, idx) {
    var lightbox = document.getElementById('lightboxCard' + (idx + 1));
    var closeBtn = lightbox.querySelector('.lightbox-card-close');
    var goBtn = lightbox.querySelector('.ir-pagina');

    card.addEventListener('click', function(e) {
      // Evita que se abra si se hace click en el lightbox, botón o la X
      if (
        e.target.classList.contains('lightbox-card-close') ||
        e.target.classList.contains('ir-pagina') ||
        lightbox.classList.contains('show')
      ) return;
      lightbox.classList.add('show');
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      lightbox.classList.remove('show');
    });

    goBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      window.location.href = goBtn.getAttribute('data-url');
    });

    // Opcional: cerrar al hacer click fuera del contenido
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
      }
    });
  });
});

// Ejemplo para todos los botones .ir-pagina y el principal
document.querySelectorAll('.ir-pagina, #btnComenzar').forEach(btn => {
  btn.addEventListener('click', function() {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 400);
  });
});