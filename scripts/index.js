// index.js - Homepage specific functionality
console.log('index.js loaded');

// Preloader with logo fill animation (homepage has custom preloader)
(function() {
  let progress = 0;
  const duration = 2000;
  const interval = 20;
  const steps = duration / interval;
  const increment = 100 / steps;

  const percentEl = document.getElementById('percent');
  const logoFill = document.querySelector('.logo-fill');

  function updateProgress() {
    progress += increment;
    if (progress > 100) progress = 100;

    const percent = Math.round(progress);
    if (percentEl) percentEl.textContent = percent + '%';
    if (logoFill) {
      const clipValue = 100 - percent;
      logoFill.style.clipPath = 'inset(' + clipValue + '% 0 0 0)';
    }

    if (progress < 100) setTimeout(updateProgress, interval);
  }
  updateProgress();
})();

window.addEventListener('load', function () {
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }
    initThreeJSGlobe();
    initTypewriter();
    initHeroCarousel();
  }, 2000);
});

// Hero Carousel Slideshow
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-carousel .hero-slide');
  if (slides.length <= 1) return;
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 3000);
}

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    document.querySelectorAll('.accordion-content').forEach(item => {
      if (item !== content) {
        item.classList.remove('open');
        const prevIcon = item.previousElementSibling.querySelector('.toggle-icon');
        if (prevIcon) {
          prevIcon.classList.remove('ph-minus');
          prevIcon.classList.add('ph-plus');
        }
      }
    });
    content.classList.toggle('open');
    icon.classList.toggle('ph-plus');
    icon.classList.toggle('ph-minus');
  });
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('data-target');
      const data = +counter.innerText;
      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    }
    animate();
  });
}

const counterSection = document.querySelector('section:has(.counter)');
if (counterSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(counterSection);
}

// Navbar scroll effect
let ticking = false;
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (navbar) {
    if (window.scrollY > 20) { navbar.classList.add('shadow-md'); navbar.classList.replace('h-20', 'h-16'); }
    else { navbar.classList.remove('shadow-md'); navbar.classList.replace('h-16', 'h-20'); }
  }
  ticking = false;
}
window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(updateNavbar); ticking = true; } });

// Typewriter
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;
  const phrases = [
    { text: "Digital E-Commerce", color: "typewriter-purple" },
    { text: "Amazon Growth", color: "typewriter-orange" },
    { text: "AI Solutions", color: "typewriter-cyan" },
    { text: "Software Systems", color: "typewriter-blue" },
    { text: "Content Writing", color: "typewriter-rose" },
    { text: "Graphics Design", color: "typewriter-pink" },
    { text: "Digital Marketing", color: "typewriter-green" }
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    textElement.className = currentPhrase.color;
    if (isDeleting) {
      textElement.textContent = currentPhrase.text.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.text.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }
    if (!isDeleting && charIndex === currentPhrase.text.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
  }
  type();
}

// Three.js Globe
function initThreeJSGlobe() {
  const container = document.getElementById('globe-container');
  if (!container || typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 20;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i += 3) {
    const r = 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = r * Math.cos(phi);
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({ size: 0.15, color: 0x3B82F6, transparent: true, opacity: 0.8 });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (event) => { mouseX = event.clientX / window.innerWidth - 0.5; mouseY = event.clientY / window.innerHeight - 0.5; });
  const clock = new THREE.Clock();
  function animate() {
    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = elapsedTime * 0.1;
    particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y += (mouseX * 0.5 - (particlesMesh.rotation.y - (elapsedTime * 0.1))) * 0.05;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Lightbox
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const src = element.querySelector('img').src;
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  setTimeout(() => {
    lightbox.classList.remove('opacity-0');
    lightboxImg.classList.remove('scale-95');
    lightboxImg.classList.add('scale-100');
  }, 10);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightbox.classList.add('opacity-0');
  lightboxImg.classList.remove('scale-100');
  lightboxImg.classList.add('scale-95');
  setTimeout(() => { lightbox.classList.add('hidden'); }, 300);
}

// About Carousel (if present on homepage)
let currentSlide = 0;
const slides = document.querySelectorAll('.about-carousel .carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
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
if (slides.length) setInterval(nextSlide, 4000);

// Scroll Progress
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
});
