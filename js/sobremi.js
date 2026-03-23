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


// ========== ANIMACIÓN DE BARRAS DE PORCENTAJE ==========

// Función para animar una barra individual
function animateBar(barElement, percentageElement, targetPercentage) {
    let currentPercentage = 0;
    const duration = 2000; // 2 segundos
    const startTime = performance.now();
    
    function updateBar(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        currentPercentage = Math.floor(easeProgress * targetPercentage);
        
        // Actualizar texto y ancho
        percentageElement.textContent = currentPercentage + '%';
        barElement.style.width = currentPercentage + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateBar);
        } else {
            percentageElement.textContent = targetPercentage + '%';
            barElement.style.width = targetPercentage + '%';
        }
    }
    
    requestAnimationFrame(updateBar);
}

// Función para iniciar animación de todas las barras en un slide
function animateBarsInSlide(slideElement) {
    const bars = slideElement.querySelectorAll('.bar[data-bar]');
    
    bars.forEach((bar, index) => {
        const percentage = parseInt(bar.getAttribute('data-bar'));
        const percentageElement = bar.parentElement.parentElement.querySelector('.bar-percentage');
        
        // Pequeño delay escalonado para efecto visual
        setTimeout(() => {
            animateBar(bar, percentageElement, percentage);
        }, index * 150);
    });
}

// Guardar la función showSlide original
const originalShowSlide = showSlide;

// Sobrescribir showSlide para incluir animación de barras
function showSlide(n) {
    items.forEach(item => item.classList.remove('sobremi-slide-active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    items[currentSlide].classList.add('sobremi-slide-active');
    
    // Obtener el slide activo actual
    const activeSlide = items[currentSlide];
    
    // Si el slide tiene barras, animarlas
    if (activeSlide.querySelector('.bar[data-bar]')) {
        // Reset todas las barras primero
        const bars = activeSlide.querySelectorAll('.bar');
        const percentages = activeSlide.querySelectorAll('.bar-percentage');
        
        bars.forEach(bar => bar.style.width = '0%');
        percentages.forEach(p => p.textContent = '0%');
        
        // Pequeño delay antes de animar
        setTimeout(() => {
            animateBarsInSlide(activeSlide);
        }, 100);
    }
}

// ========== DETECCIÓN DE SCROLL PARA RESPONSIVE ==========

// Intersection Observer para detectar cuando el slide de software es visible
function setupScrollAnimation() {
    // Solo aplicar en modo responsive (cuando las flechas están ocultas)
    const isResponsive = window.innerWidth <= 1024;
    
    if (!isResponsive) return;
    
    // Selecciona ambos slides: software (4) y habilidades en programación (5)
    const slidesToObserve = [
        document.querySelector('.sobremi-slide:nth-child(4)'),
        document.querySelector('.sobremi-slide:nth-child(5)')
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                // El slide está visible
                const bars = entry.target.querySelectorAll('.bar[data-bar]');
                const hasAnimated = entry.target.getAttribute('data-animated');

                if (!hasAnimated) {
                    // Reset barras
                    bars.forEach(bar => bar.style.width = '0%');
                    const percentages = entry.target.querySelectorAll('.bar-percentage');
                    percentages.forEach(p => p.textContent = '0%');

                    // Animar
                    setTimeout(() => {
                        animateBarsInSlide(entry.target);
                        entry.target.setAttribute('data-animated', 'true');
                    }, 200);
                }
            }
        });
    }, {
        threshold: [0.5] // Activar cuando el 50% del elemento es visible
    });

    slidesToObserve.forEach(slide => {
        if (slide) observer.observe(slide);
    });
}

// Reiniciar observer cuando cambie el tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupScrollAnimation();
    }, 250);
});

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimation();
    
    // Si estamos en escritorio y el slide de software está activo, animarlo
    if (window.innerWidth > 1024) {
        const activeSlide = document.querySelector('.sobremi-slide-active');
        if (activeSlide && activeSlide.querySelector('.bar[data-bar]')) {
            setTimeout(() => {
                animateBarsInSlide(activeSlide);
            }, 300);
        }
    }
});

document.getElementById("current-year").textContent = new Date().getFullYear();