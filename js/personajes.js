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


// LIGHTBOX SISTEMA
// ============================================

// Elementos del DOM
const boxes = document.querySelectorAll('.box');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const characterName = document.getElementById('characterName');
const characterAge = document.getElementById('characterAge');
const characterHeight = document.getElementById('characterHeight');
const characterRole = document.getElementById('characterRole');
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
        const age = box.getAttribute('data-age');
        const height = box.getAttribute('data-height');
        const role = box.getAttribute('data-role');
        const description = box.getAttribute('data-description');

        // Actualizar información en el lightbox
        characterName.textContent = character;
        lightboxImage.src = profileImg;
        characterAge.textContent = age;
        characterHeight.textContent = height;
        characterRole.textContent = role;
        characterDescription.textContent = description;
        
        // Guardar URL de la hoja de personaje
        currentSheetUrl = sheetImg;

        // Mostrar lightbox con animación
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// ============================================
// CERRAR LIGHTBOX PRINCIPAL
// ============================================
closeLightbox.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar al hacer click fuera del contenido
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// ABRIR LIGHTBOX DE HOJA DE PERSONAJE
// ============================================
openCharacterSheet.addEventListener('click', () => {
    if (currentSheetUrl) {
        sheetImage.src = currentSheetUrl;
        lightboxSheet.classList.add('active');
        // Mantener el body bloqueado
    }
});

// ============================================
// CERRAR LIGHTBOX DE HOJA DE PERSONAJE
// ============================================
closeSheet.addEventListener('click', () => {
    lightboxSheet.classList.remove('active');
});

// Cerrar al hacer click fuera de la imagen
lightboxSheet.addEventListener('click', (e) => {
    if (e.target === lightboxSheet) {
        lightboxSheet.classList.remove('active');
    }
});

// ============================================
// CERRAR LIGHTBOX CON TECLA ESC
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (lightboxSheet.classList.contains('active')) {
            lightboxSheet.classList.remove('active');
        } else if (lightboxOverlay.classList.contains('active')) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ============================================
// PREVENIR SCROLL EN LIGHTBOX SHEET
// ============================================
lightboxSheet.addEventListener('wheel', (e) => {
    e.preventDefault();}, { passive: false });