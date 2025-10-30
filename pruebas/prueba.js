// ----- CARRUSEL -----
let currentSlide = 0;
const slides = document.querySelectorAll(".sobremi-slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("sobremi-slide-active"));
  currentSlide = (index + totalSlides) % totalSlides;
  slides[currentSlide].classList.add("sobremi-slide-active");
}

function moveSlide(dir) {
  showSlide(currentSlide + dir);
}

// ----- MENÚ LATERAL -----
const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const sideMenu = document.getElementById("sideMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  menuOverlay.classList.toggle("active");
  sideMenu.classList.toggle("active");
  document.body.style.overflow = sideMenu.classList.contains("active")
    ? "hidden"
    : "auto";
});

menuOverlay.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  menuOverlay.classList.remove("active");
  sideMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

// ----- BLOQUEO DE ORIENTACIÓN MÓVIL -----
function handleOrientationChange() {
  const overlay = document.getElementById("orientationOverlay");
  const isMobile = window.innerWidth <= 896;
  const isLandscape =
    window.orientation === 90 || window.orientation === -90;

  if (isMobile && isLandscape) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

window.addEventListener("orientationchange", () =>
  setTimeout(handleOrientationChange, 100)
);
window.addEventListener("resize", handleOrientationChange);
document.addEventListener("DOMContentLoaded", handleOrientationChange);
