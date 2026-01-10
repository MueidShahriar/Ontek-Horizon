// gallery.js — extracted from pages/gallery.html
console.log('gallery.js loaded');

if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100 });

document.documentElement.classList.add('light-mode');
document.body.classList.add('light-mode');

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

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    }
});
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

let currentLightboxIndex = 0;
let visibleImages = [];
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    const img = element.querySelector('img');
    visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
    currentLightboxIndex = visibleImages.indexOf(element);
    lightboxImg.src = img ? img.src : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = visibleImages.length - 1;
    if (currentLightboxIndex >= visibleImages.length) currentLightboxIndex = 0;
    const lightboxImg = document.getElementById('lightbox-img');
    const img = visibleImages[currentLightboxIndex]?.querySelector('img');
    if (lightboxImg && img) lightboxImg.src = img.src;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

// expose for inline onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
