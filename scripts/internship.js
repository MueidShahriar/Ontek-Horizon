// internship.js - Internship page specific functionality
console.log('internship.js loaded');

document.addEventListener('DOMContentLoaded', function () {
  // Safe Firebase init
  if (window.firebase && window.firebase.apps && window.firebase.apps.length === 0 && window.firebaseConfig) {
    try {
      firebase.initializeApp(window.firebaseConfig);
    } catch (e) {
      console.warn('Firebase init skipped or failed:', e);
    }
  }

  // File input UI
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    const container = input.closest('.file-drop') || input.parentElement;
    const label = container ? container.querySelector('.file-name') : null;
    input.addEventListener('change', () => {
      const f = input.files && input.files[0];
      if (label) label.textContent = f ? f.name : 'No file chosen';
    });
  });

  // Form submit handler
  const form = document.getElementById('internshipForm') || document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      const data = {};
      new FormData(form).forEach((value, key) => { data[key] = value; });

      try {
        if (window.firebase && firebase.database) {
          const db = firebase.database();
          const ref = db.ref('internshipApplications');
          const newRef = ref.push();
          await newRef.set(Object.assign({}, data, { submittedAt: new Date().toISOString() }));
          alert('Application submitted  thank you!');
          form.reset();
        } else {
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
