const form = document.querySelector('#task-form');
const industry = document.querySelector('#industry');
const description = document.querySelector('#description');
const questionsEmpty = document.querySelector('#questions-empty');
const questionsContent = document.querySelector('#questions-content');
const questionsList = document.querySelector('#questions-list');
const analysisStatus = document.querySelector('#analysis-status');

const submitButton = form.querySelector('button[type="submit"]');
const analysisError = document.querySelector('#analysis-error');
const analysisSummary = document.querySelector('#analysis-summary');
let lastAnalyzedInput = null;
let pending = false;

function validateField(field) {
  const valid = field.value.trim() !== '';
  const error = document.getElementById(`${field.id}-error`);
  field.setAttribute('aria-invalid', String(!valid));
  error.hidden = valid;
  return valid;
}

function showQuestions(result, inputKey) {
  // Preserve answers only when both the task and the question are unchanged.
  const answers = new Map();
  if (lastAnalyzedInput === inputKey) {
    questionsList.querySelectorAll('li').forEach((item) => {
      answers.set(item.querySelector('label').textContent, item.querySelector('textarea').value);
    });
  }
  questionsList.replaceChildren();
  result.questions.forEach((question, index) => {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const answer = document.createElement('textarea');

      answer.id = `answer-${index + 1}`;
      answer.name = answer.id;
      answer.rows = 2;
      answer.placeholder = 'Жауабыңызды жазыңыз…';
      label.htmlFor = answer.id;
      label.textContent = question;
      answer.value = answers.get(question) || '';

      item.append(label, answer);
      questionsList.append(item);
  });

  lastAnalyzedInput = inputKey;
  analysisSummary.textContent = result.summary;
  questionsEmpty.hidden = true;
  questionsContent.hidden = false;
  analysisStatus.textContent = `${result.questions.length} нақтылаушы сұрақ дайын. Жауаптарыңызды енгізе аласыз.`;
  questionsList.querySelector('textarea').focus();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pending) return;
  analysisError.hidden = true;
  const industryValid = validateField(industry);
  const descriptionValid = validateField(description);

  if (!industryValid || !descriptionValid) {
    analysisStatus.textContent = 'Саланы таңдап, тапсырма сипаттамасын енгізіңіз.';
    (!industryValid ? industry : description).focus();
    return;
  }

  const inputKey = JSON.stringify({ description: description.value.trim(), industry: industry.value });
  const buttonLabel = submitButton.textContent;
  pending = true;
  submitButton.disabled = true;
  industry.disabled = true;
  description.disabled = true;
  form.setAttribute('aria-busy', 'true');
  submitButton.textContent = 'Талданып жатыр…';
  analysisStatus.textContent = 'Тапсырма талданып жатыр.';
  questionsContent.hidden = true;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: inputKey,
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(typeof result.error === 'string' ? result.error : 'Талдау орындалмады. Қайта көріңіз.');
    }
    if (!Array.isArray(result.questions) || result.questions.length < 3 ||
        !result.questions.every((question) => typeof question === 'string' && question.trim()) ||
        typeof result.summary !== 'string') {
      throw new Error('Сервер жауабы түсініксіз. Қайта көріңіз.');
    }
    showQuestions(result, inputKey);
  } catch (error) {
    const message = error.name === 'AbortError'
      ? 'Сервер жауап бермеді. Қайта көріңіз.'
      : error instanceof TypeError || error instanceof SyntaxError
        ? 'Серверге қосылу мүмкін болмады. Қайта көріңіз.'
        : error.message;
    analysisError.textContent = message;
    analysisError.hidden = false;
    analysisStatus.textContent = message;
  } finally {
    clearTimeout(timeout);
    pending = false;
    submitButton.disabled = false;
    industry.disabled = false;
    description.disabled = false;
    form.setAttribute('aria-busy', 'false');
    submitButton.textContent = buttonLabel;
  }
});

industry.addEventListener('change', () => validateField(industry));
description.addEventListener('input', () => {
  if (description.getAttribute('aria-invalid') === 'true') {
    validateField(description);
  }
});
