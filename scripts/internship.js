document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }

  // Safe Firebase init: only initialize if firebase exists and not already initialized
  if (window.firebase && window.firebase.apps && window.firebase.apps.length === 0 && window.firebaseConfig) {
    try {
      firebase.initializeApp(window.firebaseConfig);
    } catch (e) {
      console.warn('Firebase init skipped or failed:', e);
    }
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', (e) => {
      e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // Theme toggle (light-mode)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      const isLight = document.documentElement.classList.contains('light-mode');
      try { localStorage.setItem('oh-theme-light', isLight ? '1' : '0'); } catch (e) {}
    });
    try {
      if (localStorage.getItem('oh-theme-light') === '1') document.documentElement.classList.add('light-mode');
    } catch (e) {}
  }

  // File input UI for any input[type=file]
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    const container = input.closest('.file-drop') || input.parentElement;
    const label = container ? container.querySelector('.file-name') : null;
    input.addEventListener('change', () => {
      const f = input.files && input.files[0];
      if (label) label.textContent = f ? f.name : 'No file chosen';
    });
  });

  // Form submit handler - looks for #internshipForm
  const form = document.getElementById('internshipForm') || document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const data = {};
      new FormData(form).forEach((value, key) => { data[key] = value; });

      // If firebase is available, push to realtime DB under 'internshipApplications'
      try {
        if (window.firebase && firebase.database) {
          const db = firebase.database();
          const ref = db.ref('internshipApplications');
          const newRef = ref.push();
          await newRef.set(Object.assign({}, data, { submittedAt: new Date().toISOString() }));
          alert('Application submitted — thank you!');
          form.reset();
        } else {
          // Fallback: just log and show a message
          console.log('Form data (no firebase):', data);
          alert('Form captured locally (firebase not available).');
          form.reset();
        }
      } catch (err) {
        console.error('Form submit failed:', err);
        alert('Submission failed. Please try again later.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
    console.log('internship.js loaded');
});
