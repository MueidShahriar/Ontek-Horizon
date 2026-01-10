console.log('services.js loaded');

AOS && AOS.init({ duration: 800, once: true });

document.documentElement.classList.add('light-mode');
document.body.classList.add('light-mode');

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { backToTop && backToTop.classList.add('show'); }
    else { backToTop && backToTop.classList.remove('show'); }
});
backToTop && backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

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

document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
});
