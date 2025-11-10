let currentSlide = 0;
const items = document.querySelectorAll('.sobremi-slide');
const totalSlides = items.length;

function showSlide(n) {
    items.forEach(item => item.classList.remove('sobremi-slide-active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    items[currentSlide].classList.add('sobremi-slide-active');
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-play opcional (descomenta si lo deseas)
// setInterval(() => moveSlide(1), 5000);

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


//Bloqueador de dispositivos
//bloqueo horizontal
function handleOrientationChange() {
            const overlay = document.getElementById('orientationOverlay');
            const mainContent = document.querySelector('.main-content');
            
            // Verificar si es un dispositivo móvil y está en horizontal
            const isMobile = window.innerWidth <= 896;
            const isLandscape = window.orientation === 90 || window.orientation === -90;
            
            if (isMobile && isLandscape) {
                overlay.style.display = 'flex';
                mainContent.style.display = 'none';
                document.body.style.overflow = 'hidden';
            } else {
                overlay.style.display = 'none';
                mainContent.style.display = 'block';
                document.body.style.overflow = 'auto';
            }
        }

        // Escuchar cambios de orientación
        window.addEventListener('orientationchange', function() {
            // Pequeño delay para esperar a que el cambio se complete
            setTimeout(handleOrientationChange, 100);
        });

        // Escuchar cambios de tamaño de ventana (como respaldo)
        window.addEventListener('resize', handleOrientationChange);

        // Ejecutar al cargar la página
        document.addEventListener('DOMContentLoaded', handleOrientationChange);


// Elementos del DOM
const boxes = document.querySelectorAll('.box');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const characterName = document.getElementById('characterName');
const characterBirthday = document.getElementById('characterBirthday');
const characterHeight = document.getElementById('characterHeight');
const characterDescription = document.getElementById('characterDescription');
const openCharacterSheet = document.getElementById('openCharacterSheet');

// Lightbox de hoja de personaje
const lightboxSheet = document.getElementById('lightboxSheet');
const closeSheet = document.getElementById('closeSheet');
const sheetImage = document.getElementById('sheetImage');

let currentSheetUrl = '';

// ============================================
// ABRIR LIGHTBOX PRINCIPAL
// ============================================
boxes.forEach(box => {
    box.addEventListener('click', () => {
        // Obtener datos del personaje
        const character = box.getAttribute('data-character');
        const profileImg = box.getAttribute('data-profile');
        const sheetImg = box.getAttribute('data-sheet');
    const birthday = box.getAttribute('data-birthday');
    const height = box.getAttribute('data-height');
    const description = box.getAttribute('data-description');

    // Actualizar información en el lightbox
        characterName.textContent = character;
        lightboxImage.src = profileImg;
    characterBirthday.textContent = birthday;
        characterHeight.textContent = height;
        characterDescription.textContent = description;
        
        // Guardar URL de la hoja de personaje
        currentSheetUrl = sheetImg;

        // Mostrar lightbox con animación
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll al inicio del lightbox en móviles
        lightboxOverlay.scrollTop = 0;
    });
});

// ============================================
// CERRAR LIGHTBOX PRINCIPAL
// ============================================
function closeLightboxMain() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Pequeño delay para que la animación se vea bien
    setTimeout(() => {
        lightboxOverlay.scrollTop = 0;
    }, 300);
}

closeLightbox.addEventListener('click', closeLightboxMain);

// Cerrar al hacer click en el overlay (solo en el fondo oscuro)
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        closeLightboxMain();
    }
});

// ============================================
// ABRIR LIGHTBOX DE HOJA DE PERSONAJE
// ============================================
openCharacterSheet.addEventListener('click', () => {
    if (currentSheetUrl) {
        sheetImage.src = currentSheetUrl;
        lightboxSheet.classList.add('active');
        lightboxSheet.scrollTop = 0;
    }
});

// ============================================
// CERRAR LIGHTBOX DE HOJA DE PERSONAJE
// ============================================
function closeSheetLightbox() {
    lightboxSheet.classList.remove('active');
    setTimeout(() => {
        lightboxSheet.scrollTop = 0;
    }, 300);
}

closeSheet.addEventListener('click', closeSheetLightbox);

// Cerrar al hacer click fuera de la imagen
lightboxSheet.addEventListener('click', (e) => {
    if (e.target === lightboxSheet) {
        closeSheetLightbox();
    }
});

// ============================================
// CERRAR LIGHTBOX CON TECLA ESC
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (lightboxSheet.classList.contains('active')) {
            closeSheetLightbox();
        } else if (lightboxOverlay.classList.contains('active')) {
            closeLightboxMain();
        }
    }
});

// ============================================
// PREVENIR ZOOM EN DOBLE TAP EN MÓVILES (LIGHTBOX)
// ============================================
let lastTouchEnd = 0;
lightboxOverlay.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

lightboxSheet.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });