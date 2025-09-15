const scrollContainer = document.querySelector('.scroll-container');
  const btnLeft = document.querySelector('.scroll-btn.left');
  const btnRight = document.querySelector('.scroll-btn.right');

  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  });

