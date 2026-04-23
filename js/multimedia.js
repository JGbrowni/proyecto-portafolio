    // ─── Parallax del hero (mousemove sobre el fondo fijo) ───────────────────
    document.addEventListener('DOMContentLoaded', () => {
        const background = document.getElementById('background-silhouette');

        document.body.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth  / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;

            if (background) {
                background.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.08)`;
            }
        });
    });


    // ─── Menú hamburguesa ─────────────────────────────────────────────────────
    const menuToggle  = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const sideMenu    = document.getElementById('sideMenu');
    const menuItems   = document.querySelectorAll('.menu-item');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        sideMenu.classList.toggle('active');
        document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && (!href.startsWith('#') || href.startsWith('http'))) {
                toggleMenu();
                return true;
            }
            e.preventDefault();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    // ─── Modal (si existe) ───────────────────────────────────────────────────
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
        const aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));
        openModalBtn.addEventListener('click', () => aboutModal.show());
    }


    // ─── Bloqueo orientación horizontal en móvil ─────────────────────────────
    function handleOrientationChange() {
        const overlay      = document.getElementById('orientationOverlay');
        const mainContent  = document.querySelector('.main-content');

        const isMobile    = window.innerWidth  <= 896;
        const isLandscape = window.orientation === 90 || window.orientation === -90;

        if (isMobile && isLandscape) {
            overlay.style.display = 'flex';
            if (mainContent) mainContent.style.display = 'none';
            document.body.style.overflow = 'hidden';
        } else {
            overlay.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';
            document.body.style.overflow = 'auto';
        }
    }

    window.addEventListener('orientationchange', () => setTimeout(handleOrientationChange, 100));
    window.addEventListener('resize', handleOrientationChange);
    document.addEventListener('DOMContentLoaded', handleOrientationChange);

    // ─── Botón Cósmico - Redirección a Archivos de Sozoria ───────────────────
    const sozoriaBtn = document.getElementById('sozoriaBtn');
    if (sozoriaBtn) {
        sozoriaBtn.addEventListener('click', () => {
            // Redirige a la página de Archivos de Sozoria
            window.location.href = 'https://archivos-sozoria.netlify.app/';
        });
    }

    document.getElementById("current-year").textContent = new Date().getFullYear();