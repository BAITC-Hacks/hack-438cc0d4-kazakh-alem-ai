const form = document.querySelector('#task-form');
const industry = document.querySelector('#industry');
const description = document.querySelector('#description');
const questionsEmpty = document.querySelector('#questions-empty');
const questionsContent = document.querySelector('#questions-content');
const questionsList = document.querySelector('#questions-list');
const analysisStatus = document.querySelector('#analysis-status');

// Бірінші кезеңде тек тұрақты тестілік сұрақтар қолданылады.
const demoQuestions = [
  'Шешімді нақты кімдер қолданады?',
  'Қандай деректер немесе материалдар қолжетімді?',
  'Команда жұмысының соңында қандай нәтиже күтіледі?'
];

function validateField(field) {
  const valid = field.value.trim() !== '';
  const error = document.getElementById(`${field.id}-error`);
  field.setAttribute('aria-invalid', String(!valid));
  error.hidden = valid;
  return valid;
}

function showQuestions() {
  // Қайта басқанда сұрақтар қайталанбайды, жазылған жауаптар сақталады.
  if (questionsList.children.length === 0) {
    demoQuestions.forEach((question, index) => {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const answer = document.createElement('textarea');

      answer.id = `answer-${index + 1}`;
      answer.name = answer.id;
      answer.rows = 2;
      answer.placeholder = 'Жауабыңызды жазыңыз…';
      label.htmlFor = answer.id;
      label.textContent = question;

      item.append(label, answer);
      questionsList.append(item);
    });
  }

  questionsEmpty.hidden = true;
  questionsContent.hidden = false;
  analysisStatus.textContent = '3 тестілік нақтылаушы сұрақ дайын. Жауаптарыңызды енгізе аласыз.';
  questionsList.querySelector('textarea').focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const industryValid = validateField(industry);
  const descriptionValid = validateField(description);

  if (!industryValid || !descriptionValid) {
    analysisStatus.textContent = 'Саланы таңдап, тапсырма сипаттамасын енгізіңіз.';
    (!industryValid ? industry : description).focus();
    return;
  }

  showQuestions();
});

industry.addEventListener('change', () => validateField(industry));
description.addEventListener('input', () => {
  if (description.getAttribute('aria-invalid') === 'true') {
    validateField(description);
  }
});
