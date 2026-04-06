    // Variables para control de secciones
    
    const container = document.getElementById('main-container');
    const sections = container.querySelectorAll('section');
    let currentIndex = 0;


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


    document.addEventListener('DOMContentLoaded', () => {
            const background = document.getElementById('background-silhouette');

            // --- Efecto Parallax ---
            document.body.addEventListener('mousemove', (e) => {
                // Calcula los valores de movimiento. Un número mayor lo hace más sutil.
                const x = (window.innerWidth / 2 - e.clientX) / 50;
                const y = (window.innerHeight / 2 - e.clientY) / 50;

                if (background) {
                    // Mantenemos la escala para evitar que se vean los bordes.
                    background.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
                }
            });
        });


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

 // ─── Botón Cósmico - Redirección a Archivos de Sozoria ───────────────────
    // DESHABILITADO TEMPORALMENTE: Para activar, descomenta el código abajo
    /*
    const sozoriaBtn = document.getElementById('sozoriaBtn');
    if (sozoriaBtn) {
        sozoriaBtn.addEventListener('click', () => {
            // Redirige a la página de Archivos de Sozoria
            window.location.href = '../sozoriArchivos/archivos-inicio.html';
        });
    }
    */

document.getElementById("current-year").textContent = new Date().getFullYear();