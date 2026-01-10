// Firebase initialization (uses SDK scripts included in HTML)
const firebaseConfig = {
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
    firebase.initializeApp(firebaseConfig);
}
const database = window.firebase ? firebase.database() : null;

// AOS initialization
if (window.AOS) {
    AOS.init({ duration: 400, once: true, offset: 50, easing: 'ease-out' });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('jobFairForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn ? btn.innerHTML : '';

            if (btn) {
                btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Processing...';
                btn.disabled = true;
            }

            const selectedCategory = document.querySelector('input[name="category"]:checked');
            const formData = {
                fullname: document.getElementById('fullname') ? document.getElementById('fullname').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
                experience: document.getElementById('experience') ? document.getElementById('experience').value : '',
                linkedin: document.getElementById('linkedin') ? document.getElementById('linkedin').value : '',
                category: selectedCategory ? selectedCategory.value : '',
                submittedAt: new Date().toISOString(),
                type: 'job_fair'
            };

            try {
                if (!database) throw new Error('Firebase not initialized');
                const newRef = database.ref('jobfair_registrations').push();
                await newRef.set(formData);
                if (btn) {
                    btn.innerHTML = '<i class="ph-bold ph-check-circle text-xl"></i> Registered!';
                    btn.classList.remove('from-pink-600', 'to-purple-600');
                    btn.classList.add('bg-green-600');
                }

                setTimeout(() => {
                    alert("Registration Successful! Your Entry Pass has been emailed to you.");
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.classList.remove('bg-green-600');
                        btn.classList.add('from-pink-600', 'to-purple-600');
                    }
                    form.reset();
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                }
            }
        });
    }

    // Light mode enforcement for this page
    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');

    // Back-to-top button logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    console.log('jobfairregistration.js loaded');
});
