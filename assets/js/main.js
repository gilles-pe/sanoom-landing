const search = document.getElementById('productSearch');
const searchHint = document.getElementById('searchHint');
const cards = [...document.querySelectorAll('.product-card')];
const emptyState = document.getElementById('emptyState');
const loadSurvey = document.getElementById('loadSurvey');
const loadSurveyButtons = [...document.querySelectorAll('[data-load-survey]')];
const surveyFrame = document.getElementById('surveyFrame');

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

const showSurvey = () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://form.typeform.com/to/WTmiFoUU?typeform-medium=embed-snippet';
  iframe.title = 'hDRG-Umfrage von Sanoom';
  iframe.allow = 'camera; microphone; autoplay; encrypted-media';
  iframe.loading = 'eager';
  surveyFrame.replaceChildren(iframe);
  if (loadSurvey) {
    loadSurvey.disabled = true;
    loadSurvey.textContent = 'Umfrage geladen';
  }
};

loadSurveyButtons.forEach(button => button.addEventListener('click', showSurvey));
