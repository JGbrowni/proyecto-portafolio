  // Cuando termine la animación de las nubes, mostramos el contenido
  const cloudsContainer = document.querySelector('.clouds-container');
  const content = document.getElementById('content');

  // La animación dura 6 segundos, podemos usar un timeout o evento animationend
  cloudsContainer.addEventListener('animationend', () => {
    // Ocultamos las nubes
    cloudsContainer.style.display = 'none';
    // Mostramos el contenido
    content.classList.add('visible');
  });

  // En algunos navegadores el animationend no se dispara en el contenedor, 
  // así que también podemos usar un timeout como fallback
  setTimeout(() => {
    if (!content.classList.contains('visible')) {
      cloudsContainer.style.display = 'none';
      content.classList.add('visible');
    }
  }, 6500);