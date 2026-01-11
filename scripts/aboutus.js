// aboutus.js - About Us page specific functionality
console.log('aboutus.js loaded');

// About Carousel
const slides = document.querySelectorAll('.about-carousel .carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function nextSlide() {
  if (!slides.length) return;
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

// Make goToSlide available globally for onclick handlers
window.goToSlide = goToSlide;

if (slides.length) {
  setInterval(nextSlide, 3000);
}
