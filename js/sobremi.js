    const bear = document.querySelector('.bear-logo');
    const mask = document.getElementById('mask');
    const main = document.getElementById('mainContent');

    // Activar máscara gris cuando el oso toca el suelo
    setTimeout(() => {
      mask.style.animation = "revealMask 1s ease-out forwards";
      setTimeout(() => {
        main.style.display = 'block';
        main.style.animation = 'fadeIn 1.5s ease-out forwards';
      }, 900);
    }, 1700);

    // Al final de la animación, ocultar el oso
    bear.addEventListener('animationend', (e) => {
      if (e.animationName === 'fadeOut') {
        bear.style.display = 'none';
      }
    });


    // Navegación del menú
//Icono de menu
    // Funcionalidad del menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const sideMenu = document.getElementById('sideMenu');
const menuItems = document.querySelectorAll('.menu-item');

// Toggle del menú
function toggleMenu() {
  menuToggle.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  sideMenu.classList.toggle('active');
  
  // Prevenir scroll del body cuando el menú está abierto
  document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
}


menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const href = item.getAttribute('href');
    
    // Si es un enlace a otra página, permitir navegación normal
    if (href && (!href.startsWith('#') || href.startsWith('http'))) {

      // Cerrar el menú antes de navegar
      toggleMenu();
      // No prevenir default para que navegue normalmente
      return true;
    }
    
    // Si no es un enlace válido, prevenir default
    e.preventDefault();
  });
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
    toggleMenu();
  }
});

 let currentSlide = 0;
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = items.length;

        function showSlide(n) {
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            currentSlide = (n + totalSlides) % totalSlides;
            
            items[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function moveSlide(direction) {
            showSlide(currentSlide + direction);
        }

        function goToSlide(n) {
            showSlide(n);
        }