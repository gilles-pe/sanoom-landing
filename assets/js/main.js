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
  button.textContent = 'Umfrage wird geöffnet …';

  try {
    await loadTypeformEmbed();
    typeformReady = true;
    button.disabled = false;
    button.innerHTML = originalContent;
    button.click();
  } catch {
    window.location.assign(typeformUrl);
  }
};

loadSurveyButtons.forEach(button => button.addEventListener('click', openSurvey));
