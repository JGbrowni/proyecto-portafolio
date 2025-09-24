    // Variables para control de secciones
    
    const container = document.getElementById('main-container');
    const sections = container.querySelectorAll('section');
    let currentIndex = 0;

    // Función para navegar a la siguiente sección
    function goToNextSection() {
      currentIndex++;
      if (currentIndex >= sections.length) {
        currentIndex = 0; // Vuelve al inicio si pasa la última sección
      }
      sections[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    // Función para navegar a la sección anterior
    function goToPrevSection() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = sections.length - 1; // Va a la última sección si está en la primera
      }
      sections[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    // Botones Tailwind con funcionalidad completa
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', goToNextSection);
    prevBtn.addEventListener('click', goToPrevSection);

    // Modal trigger (si existe el botón)
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
      const aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));
      openModalBtn.addEventListener('click', () => {
        aboutModal.show();
      });
    }

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