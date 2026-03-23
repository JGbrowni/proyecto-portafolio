    // Variables para control de secciones
    
    const container = document.getElementById('main-container');
    const sections = container.querySelectorAll('section');
    let currentIndex = 0;


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

        // Botón de regreso + lightbox de confirmación espacial
        const backButton = document.getElementById('backButton');
        const confirmLightbox = document.getElementById('confirmLightbox');
        const confirmYes = document.getElementById('confirmYes');
        const confirmNo = document.getElementById('confirmNo');

        console.log('backButton:', backButton); // Debug

        function openConfirmLightbox() {
          console.log('Opening confirm lightbox'); // Debug
          confirmLightbox.classList.add('active');
          confirmLightbox.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }

        function closeConfirmLightbox() {
          console.log('Closing confirm lightbox'); // Debug
          confirmLightbox.classList.remove('active');
          confirmLightbox.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = 'auto';
        }

        if (backButton) {
          console.log('Adding event listener to backButton'); // Debug
          backButton.addEventListener('click', openConfirmLightbox);
        } else {
          console.log('backButton not found'); // Debug
        }
        if (confirmNo) {
          confirmNo.addEventListener('click', closeConfirmLightbox);
        }
        if (confirmLightbox) {
          confirmLightbox.addEventListener('click', (e) => {
            if (e.target === confirmLightbox) closeConfirmLightbox();
          });
        }
        if (confirmYes) {
          confirmYes.addEventListener('click', () => {
            window.location.href = '../index.html';
          });
        }
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
    const sozoriaBtn = document.getElementById('sozoriaBtn');
    if (sozoriaBtn) {
        sozoriaBtn.addEventListener('click', () => {
            // Redirige a la página de Archivos de Sozoria
            window.location.href = '../secciones/sozoria-archives.html';
        });
    }

document.getElementById("current-year").textContent = new Date().getFullYear();