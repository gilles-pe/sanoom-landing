document.getElementById("year").textContent = new Date().getFullYear();

const loadSurveyButton = document.getElementById("loadSurvey");
const surveyFrame = document.getElementById("surveyFrame");
const surveyConsent = document.getElementById("surveyConsent");

if (loadSurveyButton && surveyFrame && surveyConsent) {
  loadSurveyButton.addEventListener("click", () => {
    surveyFrame.src = surveyFrame.dataset.src;
    surveyFrame.hidden = false;
    surveyConsent.hidden = true;
    surveyFrame.focus();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});
