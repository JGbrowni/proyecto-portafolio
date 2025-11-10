
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

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Navegación del menú
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

// --- Nuevo: lightbox de reinicio ---
const confirmationLightbox = document.getElementById('confirmationLightbox');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

// Anula la acción previa del icono (si tenía toggle)
if (menuToggle) {
  try { menuToggle.removeEventListener('click', toggleMenu); } catch (e) {}
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirmationLightbox) {
      confirmationLightbox.classList.add('show');
      confirmationLightbox.setAttribute('aria-hidden','false');
      // focus en el botón No por accesibilidad
      if (confirmNo) confirmNo.focus();
    }
  });
}

// Cerrar lightbox (No)
if (confirmNo) {
  confirmNo.addEventListener('click', function() {
    if (confirmationLightbox) {
      confirmationLightbox.classList.remove('show');
      confirmationLightbox.setAttribute('aria-hidden','true');
      menuToggle.focus();
    }
  });
}

if (confirmationLightbox) {
  confirmationLightbox.addEventListener('click', function(e) {
    if (e.target === confirmationLightbox) {
      confirmationLightbox.classList.remove('show');
      confirmationLightbox.setAttribute('aria-hidden','true');
      if (menuToggle) menuToggle.focus();
    }
  });
}

// Reiniciar recorrido
function restartJourney() {
  // Redirigir al index.html
  window.location.href = '../index.html';
}

if (confirmYes) {
  confirmYes.addEventListener('click', function() {
    restartJourney();
  });
}

// Cerrar lightbox con ESC para accesibilidad
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (confirmationLightbox && confirmationLightbox.classList.contains('show')) {
      confirmationLightbox.classList.remove('show');
      confirmationLightbox.setAttribute('aria-hidden','true');
      if (menuToggle) menuToggle.focus();
    }
  }
});


const cloudsContainer = document.getElementById('clouds');
const landingBg = document.getElementById('landingBg');
const content = document.getElementById('content');
const nextSection = document.getElementById('nextSection');

// Función para mostrar el fondo y el contenido
function revealLandingBg() {
  if (landingBg) {
    landingBg.classList.add('show');
    // Aplicar escala inicial para evitar ver el borde antes de que rAF empiece
    try { landingBg.style.transform = 'translate3d(0px, 0px, 0) scale(1.06)'; } catch (e) {}
  }
  if (content) content.classList.add('show');
}

// Escuchar el fin de la animación de la primera nube (si existe)
let cloud1 = null;
if (cloudsContainer) cloud1 = cloudsContainer.querySelector('.cloud1');

if (cloud1) {
  cloud1.addEventListener('animationend', () => {
    // No eliminamos la clase clouds-moving para evitar errores y mantener el comportamiento
    // Simplemente revelamos el fondo cuando la animación termine
    revealLandingBg();
  });
} else {
  // Fallback: si no existe la nube, mostramos el fondo al cargar la página
  window.addEventListener('load', () => {
    setTimeout(revealLandingBg, 200);
  });
}

// --- Parallax: scroll (y mousemove) ---
// Habilitar scroll y aplicar parallax después de revelar el fondo
function enableParallax() {
  if (!landingBg) return;

  // permitir scroll si estaba deshabilitado
  try { document.body.style.overflow = 'auto'; } catch (e) {}

  // variables para rAF
  let latestScrollY = 0;
  let ticking = false;
  let mouseX = 0, mouseY = 0;

  function update() {
    ticking = false;
    const scrollOffset = latestScrollY;
    // movimiento vertical suave
    const translateY = scrollOffset * 0.18; // ajuste del factor parallax

    // efecto de movimiento horizontal/vertical del puntero (muy sutil)
    const offsetX = (mouseX - window.innerWidth / 2) * 0.02;
    const offsetY = (mouseY - window.innerHeight / 2) * 0.02;

    // Escala ligera para prevenir franjas en los bordes cuando se mueve
    const scale = 1.06;
    landingBg.style.transform = `translate3d(${offsetX}px, ${translateY + offsetY}px, 0) scale(${scale})`;
  }

  window.addEventListener('scroll', function() {
    latestScrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // mousemove para desktop (opcional y ligero)
  window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  });
}

// Llamar enableParallax tras revelar el fondo; también usar fallback en carga
if (landingBg) {
  // Si el fondo ya tiene la clase show (por alguna razón), habilitamos directamente
  if (landingBg.classList.contains('show')) enableParallax();

  // Observador para detectar la adición de la clase 'show'
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && landingBg.classList.contains('show')) {
        enableParallax();
        obs.disconnect();
        break;
      }
    }
  });
  obs.observe(landingBg, { attributes: true });
} else {
  // Fallback: enable on load
  window.addEventListener('load', () => setTimeout(enableParallax, 300));
}



document.addEventListener('DOMContentLoaded', function() {
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

//efecto parallax background
