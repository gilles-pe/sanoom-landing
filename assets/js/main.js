const search = document.getElementById('productSearch');
const searchHint = document.getElementById('searchHint');
const cards = [...document.querySelectorAll('.product-card')];
const emptyState = document.getElementById('emptyState');
const loadSurveyButtons = [...document.querySelectorAll('[data-load-survey]')];
const typeformUrl = 'https://form.typeform.com/to/WTmiFoUU';
let typeformReady = false;
let typeformLoadPromise;

search?.addEventListener('input', () => {
  const query = search.value.toLocaleLowerCase('de').trim();
  let visible = 0;

  cards.forEach(card => {
    const match = card.dataset.search.includes(query);
    card.hidden = !match;
    if (match) visible += 1;
  });

  emptyState.style.display = visible ? 'none' : 'block';
  searchHint.textContent = `${visible} ${visible === 1 ? 'Treffer' : 'Treffer'}`;
});

const loadTypeformEmbed = () => {
  if (typeformLoadPromise) return typeformLoadPromise;

  typeformLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    script.dataset.typeformEmbed = 'true';
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  return typeformLoadPromise;
};

const openSurvey = async event => {
  if (typeformReady) return;

  event.preventDefault();
  const button = event.currentTarget;
  const originalContent = button.innerHTML;
  button.disabled = true;
  button.classList.add('is-loading');
  button.textContent = 'Umfrage wird geöffnet …';

  try {
    await loadTypeformEmbed();
    typeformReady = true;
    button.disabled = false;
    button.classList.remove('is-loading');
    button.innerHTML = originalContent;
    button.click();
  } catch {
    button.classList.remove('is-loading');
    window.location.assign(typeformUrl);
  }
};

loadSurveyButtons.forEach(button => button.addEventListener('click', openSurvey));

const header = document.querySelector('.site-header');
if (header) {
  const updateHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = [...document.querySelectorAll(
  '.hero-copy, .hero-visual, .survey-copy, .survey-frame, .proof-item, .feature-row, .workflow-card, .time-benefit-copy, .time-comparison, .modules-heading, .platform-cockpit, .module-card, .sets-heading, .set-feature-card, .contact-copy, .contact-form, .product-card, .chat-message, .pilot-benefits > div'
)];

if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  const siblingCounts = new Map();
  revealEls.forEach(el => {
    el.classList.add('js-reveal');
    const parent = el.parentElement;
    const index = siblingCounts.get(parent) ?? 0;
    el.style.transitionDelay = `${Math.min(index, 5) * 90}ms`;
    siblingCounts.set(parent, index + 1);
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('js-reveal', 'is-visible'));
}
