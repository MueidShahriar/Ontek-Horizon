// careers.js — extracted from pages/careers.html
console.log('careers.js loaded');

if (typeof AOS !== 'undefined') AOS.init();

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop && backToTop.classList.toggle('show', window.scrollY > 200);
});
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
