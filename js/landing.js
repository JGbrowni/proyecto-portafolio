  // Cuando termina la animación de las nubes, mostramos el fondo y el contenido

  const cloudsContainer = document.getElementById('clouds');
  const landingBg = document.getElementById('landingBg');
  const content = document.getElementById('content');

  // Escuchar el evento de fin de animación de la primera nube, ya que todas duran igual
  const cloud1 = cloudsContainer.querySelector('.cloud1');

  cloud1.addEventListener('animationend', () => {
    // Parar la animación de las nubes (eliminar clase)
    cloudsContainer.classList.remove('clouds-moving');

    // Mostrar y subir la imagen de fondo
    landingBg.classList.add('show');

    // Mostrar título y botón animados
    content.classList.add('show');
  });

