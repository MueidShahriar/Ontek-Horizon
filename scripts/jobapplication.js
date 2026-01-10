// jobapplication page behaviors: Firebase init, AOS, file-drop, form submit, theme, back-to-top, mobile menu
const firebaseConfig_jobapplication = {
    apiKey: "AIzaSyAK6D5o3ethosrnGHNmzAU70Hh8et3okik",
    authDomain: "ontek-horizon.firebaseapp.com",
    projectId: "ontek-horizon",
    storageBucket: "ontek-horizon.firebasestorage.app",
    messagingSenderId: "210494330142",
    appId: "1:210494330142:web:09c86a149fdecfb391a50f",
    measurementId: "G-K9YWTK029X",
    databaseURL: "https://ontek-horizon-default-rtdb.firebaseio.com"
};

if (window.firebase && !window.firebase.apps.length) {
    firebase.initializeApp(firebaseConfig_jobapplication);
}
const database = window.firebase ? firebase.database() : null;
const storage = window.firebase ? firebase.storage && firebase.storage() : null;

if (window.AOS) AOS.init({ duration: 800, once: true });

document.addEventListener('DOMContentLoaded', function () {
    const dropInput = document.getElementById('dropzone-file');
    const dropContent = document.getElementById('dropzone-content');
    if (dropInput && dropContent) {
        dropInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                dropContent.innerHTML = `
                    <i class="ph ph-file-pdf text-3xl text-green-400 mb-2"></i>
                    <p class="text-sm text-green-400 font-semibold">${file.name}</p>
                    <p class="text-xs text-slate-500">${(file.size / 1024).toFixed(1)} KB</p>
                `;
            }
        });
    }

    const form = document.getElementById('jobForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn ? btn.innerHTML : '';
            if (btn) { btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Saving...'; btn.disabled = true; }

            const fileInput = document.getElementById('dropzone-file');
            const file = fileInput ? fileInput.files[0] : null;
            const cvFileName = file ? file.name : '';

            try {
                if (!database) throw new Error('Firebase not initialized');
                const formData = {
                    fullname: document.getElementById('fullname') ? document.getElementById('fullname').value : '',
                    email: document.getElementById('email') ? document.getElementById('email').value : '',
                    phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
                    position: document.getElementById('position') ? document.getElementById('position').value : '',
                    experience: document.getElementById('experience') ? document.getElementById('experience').value : '',
                    portfolio: document.getElementById('portfolio') ? document.getElementById('portfolio').value : '',
                    message: document.getElementById('message') ? document.getElementById('message').value : '',
                    cvFileName,
                    submittedAt: new Date().toISOString(),
                    type: 'job_application'
                };

                const newRef = database.ref('job_applications').push();
                await newRef.set(formData);
                if (btn) { btn.innerHTML = '<i class="ph-bold ph-check-circle text-xl"></i> Application Sent!'; btn.classList.remove('from-purple-600','to-pink-600'); btn.classList.add('bg-green-600'); }

                setTimeout(() => {
                    alert('Thank you for your application! HR will review your profile.');
                    if (btn) { btn.disabled = false; btn.innerHTML = originalText; btn.classList.remove('bg-green-600'); btn.classList.add('from-purple-600','to-pink-600'); }
                    form.reset();
                    if (dropContent) dropContent.innerHTML = `
                        <i class="ph ph-cloud-arrow-up text-3xl text-slate-400 mb-2"></i>
                        <p class="text-sm text-slate-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-slate-500">PDF, DOCX (MAX. 5MB)</p>
                    `;
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
                alert('Database Error: ' + (error.message || error));
                if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
            }
        });
    }

    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => { backToTopBtn.classList.toggle('show', window.pageYOffset > 300); });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) { icon.classList.toggle('ph-list'); icon.classList.toggle('ph-x'); }
        });
    }
});
