// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (toggleBtn && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open menu');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu after clicking a link (mobile)
  navMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// Subtle scroll reveal for major content blocks
const revealItems = document.querySelectorAll(
  '.section-head, .split > *, .timeline-card, .featured-project, .card, .skill-card, .resume, .contact-panel'
);

if ('IntersectionObserver' in window && revealItems.length) {
  revealItems.forEach((item) => item.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
