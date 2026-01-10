// Preloader with logo fill animation
(function() {
  let progress = 0;
  const duration = 2000; // 2 seconds
  const interval = 20; // Update every 20ms
  const steps = duration / interval;
  const increment = 100 / steps;

  const percentEl = document.getElementById('percent');
  const logoFill = document.querySelector('.logo-fill');

  function updateProgress() {
    progress += increment;
    if (progress > 100) progress = 100;

    const percent = Math.round(progress);
    if (percentEl) percentEl.textContent = percent + '%';
    
    // Update clip-path to reveal logo from bottom to top
    if (logoFill) {
      const clipValue = 100 - percent;
      logoFill.style.clipPath = `inset(${clipValue}% 0 0 0)`;
    }

    if (progress < 100) {
      setTimeout(updateProgress, interval);
    }
  }

  // Start animation
  updateProgress();
})();

window.addEventListener('load', function () {
  // Hide preloader after animation completes
  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }
  }, 2000);
});
