document.addEventListener('DOMContentLoaded', function () {
    console.log('ecommerceseminar.js loaded');
    if (window.AOS) AOS.init({ duration: 400, once: true, offset: 50, easing: 'ease-out' });

    // Safe Firebase init (SDKs are included in the page)
    try {
        if (window.firebase && window.firebase.apps && window.firebase.apps.length === 0 && window.firebaseConfig) {
            firebase.initializeApp(window.firebaseConfig);
        }
    } catch (e) { console.warn('Firebase init error', e); }

    const database = window.firebase ? firebase.database() : null;

    // Seminar form handler
    const form = document.getElementById('seminarForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn ? btn.innerHTML : '';
            if (btn) { btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Registering...'; btn.disabled = true; }

            const data = {
                fullname: document.getElementById('fullname') ? document.getElementById('fullname').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
                stage: document.getElementById('stage') ? document.getElementById('stage').value : '',
                website: document.getElementById('website') ? document.getElementById('website').value : '',
                question: document.getElementById('question') ? document.getElementById('question').value : '',
                submittedAt: new Date().toISOString(),
                type: 'ecommerce_seminar'
            };

            try {
                if (!database) throw new Error('Firebase not initialized');
                const newRef = database.ref('seminar_registrations').push();
                await newRef.set(data);
                if (btn) { btn.innerHTML = '<i class="ph-bold ph-check-circle text-xl"></i> Seat Reserved!'; btn.classList.remove('from-blue-600','to-cyan-600'); btn.classList.add('bg-green-600'); }
                setTimeout(() => {
                    alert('Registration Successful! The Zoom link has been sent to your email.');
                    if (btn) { btn.disabled = false; btn.innerHTML = originalText; btn.classList.remove('bg-green-600'); btn.classList.add('from-blue-600','to-cyan-600'); }
                    form.reset();
                }, 1200);
            } catch (err) {
                console.error(err);
                alert('Something went wrong. Please try again.');
                if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
            }
        });
    }

    // UI niceties
    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => backToTopBtn.classList.toggle('show', window.pageYOffset > 300));
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});
