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

  navMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Scroll reveal
const revealItems = document.querySelectorAll('[data-reveal]');
revealItems.forEach((item) => {
  const delay = item.getAttribute('data-reveal-delay');
  if (delay) item.style.setProperty('--reveal-delay', `${delay}ms`);
});

if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Tilt interaction
const tiltTargets = document.querySelectorAll('[data-tilt]');
if (!prefersReducedMotion.matches) {
  tiltTargets.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 12;
      const rotateX = (0.5 - py) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// Hero parallax
const hero = document.querySelector('.hero');
const scene = document.querySelector('.hero-scene');
const orbs = document.querySelectorAll('.orb');

if (hero && scene && !prefersReducedMotion.matches) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) - 0.5;
    const y = ((event.clientY - rect.top) / rect.height) - 0.5;

    scene.style.transform = `translate3d(${x * 20}px, ${y * 14}px, 0)`;

    orbs.forEach((orb, index) => {
      const depth = (index + 1) * 10;
      orb.style.transform = `translate3d(${x * depth}px, ${y * depth * -0.7}px, 0)`;
    });
  });

  hero.addEventListener('pointerleave', () => {
    scene.style.transform = '';
    orbs.forEach((orb) => {
      orb.style.transform = '';
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
