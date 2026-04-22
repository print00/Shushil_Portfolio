const body = document.body;
const toggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const spotlight = document.querySelector('.spotlight');
const revealItems = document.querySelectorAll('.reveal-item');
const tiltCards = document.querySelectorAll('.tilt-card');
const magneticButtons = document.querySelectorAll('.magnetic');
const yearEl = document.getElementById('year');

if (toggleBtn && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open menu');
    body.classList.remove('menu-open');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    body.classList.toggle('menu-open', isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

revealItems.forEach((item) => {
  const delay = item.getAttribute('data-reveal-delay');
  if (delay) item.style.setProperty('--reveal-delay', `${delay}ms`);
});

if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (spotlight && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    spotlight.style.setProperty('--spotlight-x', x);
    spotlight.style.setProperty('--spotlight-y', y);
  });
}

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 10;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  magneticButtons.forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
