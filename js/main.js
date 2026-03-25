// ── Active nav link ──
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Exact match or sub-path match
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (
      linkPath === path ||
      (path.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

// ── Staggered entrance animation ──
(function () {
  const targets = document.querySelectorAll('.card, .file-list li, .page-title, .page-subtitle');

  const style = document.createElement('style');
  style.textContent = `
    .reveal-ready { opacity: 0; transform: translateY(18px); }
    .reveal-done  { opacity: 1; transform: translateY(0);  transition: opacity 0.45s ease, transform 0.45s ease; }
  `;
  document.head.appendChild(style);

  targets.forEach(el => el.classList.add('reveal-ready'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('reveal-ready', 'reveal-done');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
})();

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('Portfolio chargé ✓');