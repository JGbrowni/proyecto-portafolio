document.addEventListener('DOMContentLoaded', () => {
            const mainContainer = document.querySelector('.main-container');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const background = document.getElementById('background-silhouette');

            // --- Lógica del carrusel ---
            const totalSections = 3;
            let currentSection = 0;

            function updateCarousel() {
                mainContainer.style.transform = `translateX(-${currentSection * 100}%)`;
            }

            nextBtn.addEventListener('click', () => {
                if (currentSection < totalSections - 1) {
                    currentSection++;
                    updateCarousel();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentSection > 0) {
                    currentSection--;
                    updateCarousel();
                }
            });

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