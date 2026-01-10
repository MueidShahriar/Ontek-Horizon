console.log('aboutus.js loaded');

if (window.AOS) {
    AOS.init();
}

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

if (slides.length) {
    setInterval(nextSlide, 3000);
}

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 200);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.menu-close-icon');
    
    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon && closeIcon) {
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        }
    }
    
    function closeMenu() {
        mobileMenu.classList.add('hidden');
        if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }
    
    mobileMenuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', closeMenu); });
    
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });
}

document.body.classList.add('light-mode');
document.documentElement.classList.add('light-mode');
