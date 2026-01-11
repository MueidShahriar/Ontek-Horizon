// common.js - Shared functionality across all pages
console.log('common.js loaded');

// Initialize AOS if available
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 400, once: true, offset: 50, easing: 'ease-out' });
}

// Set light mode
document.documentElement.classList.add('light-mode');
document.body.classList.add('light-mode');

// Mobile Menu Toggle
(function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenuBtn || !mobileMenu) return;

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
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMenu();
    }
  });
})();

// Back to Top Button
(function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Spotlight Card Effect
(function initSpotlightCards() {
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
})();
