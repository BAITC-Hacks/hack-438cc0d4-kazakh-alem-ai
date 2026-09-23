// Interface dictionaries. User-entered text is never translated or replaced.
const TEXT = [
  ['AI Sana Challenge Hub — Бизнес идеядан нақты тапсырмаға', 'AI Sana Challenge Hub — От бизнес-идеи к понятной задаче', 'AI Sana Challenge Hub — From business idea to a clear task'],
  ['AI Sana Challenge Hub — басты бет', 'AI Sana Challenge Hub — главная', 'AI Sana Challenge Hub — home'],
  ['Тіл', 'Язык', 'Language'],
  ['БИЗНЕС ПЕН ИННОВАЦИЯ КЕЗДЕСЕТІН ОРТА', 'ПРОСТРАНСТВО БИЗНЕСА И ИННОВАЦИЙ', 'WHERE BUSINESS MEETS INNOVATION'],
  ['Идеяңыздан', 'От вашей идеи', 'From your idea'],
  ['нақты тапсырмаға.', 'к понятной задаче.', 'to a clear task.'],
  ['Бизнес мәселеңізді сипаттаңыз. AI жетіспейтін ақпаратты анықтап, командаға түсінікті тапсырма дайындауға көмектеседі.', 'Опишите бизнес-задачу. AI поможет уточнить недостающую информацию и подготовить понятное задание для команды.', 'Describe your business challenge. AI helps clarify missing information and prepare a clear task for the team.'],
  ['Тапсырма дайындау кезеңдері', 'Этапы подготовки задания', 'Task preparation steps'],
  ['Мәселені сипаттау', 'Описание задачи', 'Describe the challenge'],
  ['Ақпаратты нақтылау', 'Уточнение деталей', 'Clarify the details'],
  ['Тапсырма карточкасы', 'Карточка задания', 'Task card'],
  ['Бизнес тапсырмасын сипаттаңыз', 'Опишите бизнес-задачу', 'Describe your business task'],
  ['Алғашқы қадам — шешкіңіз келетін мәселені бөлісу.', 'Первый шаг — рассказать о задаче, которую хотите решить.', 'Start by describing the problem you want to solve.'],
  ['Бизнес саласы', 'Отрасль бизнеса', 'Business industry'],
  ['Саланы таңдаңыз', 'Выберите отрасль', 'Select an industry'],
  ['Білім беру', 'Образование', 'Education'],
  ['Денсаулық сақтау', 'Здравоохранение', 'Healthcare'],
  ['Сауда және e-commerce', 'Торговля и e-commerce', 'Retail and e-commerce'],
  ['Қаржы', 'Финансы', 'Finance'],
  ['Ауыл шаруашылығы', 'Сельское хозяйство', 'Agriculture'],
  ['Көлік және логистика', 'Транспорт и логистика', 'Transport and logistics'],
  ['Қызмет көрсету', 'Услуги', 'Services'],
  ['Басқа сала', 'Другая отрасль', 'Other industry'],
  ['Бизнес саласын таңдаңыз.', 'Выберите отрасль бизнеса.', 'Please select a business industry.'],
  ['Тапсырма сипаттамасы', 'Описание задания', 'Task description'],
  ['Мысалы, дүкенімізге клиенттерден көп сұрақ келеді. Жиі қойылатын сұрақтарға жауап беруді автоматтандырғымыз келеді, бірақ неден бастарымызды білмейміз...', 'Например, в наш магазин поступает много вопросов. Мы хотим автоматизировать ответы на частые вопросы, но не знаем, с чего начать...', 'For example, our store receives many customer questions. We want to automate answers to common questions but do not know where to start...'],
  ['Идея толық болмаса да болады. Нақтылауға көмектесеміз.', 'Идея может быть неполной. Поможем уточнить детали.', 'Your idea does not need to be complete. We will help clarify it.'],
  ['Тапсырма сипаттамасын енгізіңіз.', 'Введите описание задания.', 'Please enter a task description.'],
  ['AI агент · OpenAI', 'AI агент · OpenAI', 'AI agent · OpenAI'],
  ['AI арқылы талдау', 'Анализировать с AI', 'Analyze with AI'],
  ['Нақтылаушы сұрақтар', 'Уточняющие вопросы', 'Clarifying questions'],
  ['Дұрыс сұрақтар — сапалы тапсырманың негізі.', 'Правильные вопросы — основа качественного задания.', 'The right questions lead to a clear task.'],
  ['Алдымен мәселеңізді сипаттаңыз', 'Сначала опишите задачу', 'Describe your challenge first'],
  ['Талдаудан кейін осы жерде нақтылаушы сұрақтар пайда болады.', 'После анализа здесь появятся уточняющие вопросы.', 'Clarifying questions will appear here after analysis.'],
  ['Барлық сұраққа жауап беріңіз. Жауаптардан өңделетін карточка жасалады. Бетті жаңартқанда деректер өшеді.', 'Ответьте на все вопросы. На основе ответов будет создана редактируемая карточка. При обновлении страницы данные удаляются.', 'Answer every question to create an editable task card. Reloading the page clears your data.'],
  ['Жауаптарды сақтау', 'Сохранить ответы', 'Save answers'],
  ['Тапсырманың дайындық күйі', 'Состояние готовности задания', 'Task readiness status'],
  ['Дайындық рейтингі', 'Рейтинг готовности', 'Readiness rating'],
  ['Тапсырманың дайындық рейтингі', 'Рейтинг готовности задания', 'Task readiness rating'],
  ['дайындық деңгейі', 'уровень готовности', 'readiness level'],
  ['Әзірге бағаланбаған', 'Пока не оценено', 'Not rated yet'],
  ['Жұмысқа жарамды', 'Можно брать в работу', 'Workable'],
  ['Тапсырманың дайындық деңгейі', 'Уровень готовности задания', 'Task readiness level'],
  ['Карточка жасалғанда тестілік баға: 65/100.', 'После создания карточки тестовая оценка: 65/100.', 'The demo score after creating a card is 65/100.'],
  ['Толтырылмаған өрістер', 'Незаполненные поля', 'Missing fields'],
  ['Алдымен сұрақтарға жауап беріңіз.', 'Сначала ответьте на вопросы.', 'Please answer the questions first.'],
  ['65 — тұрақты демо баға, AI бағалауы емес. Бос өрістер тізімі өңдеу кезінде жаңарады.', '65 — фиксированная демо-оценка, а не оценка AI. Список пустых полей обновляется при редактировании.', '65 is a fixed demo score, not an AI assessment. The missing fields list updates as you edit.'],
  ['Болашақ шешім осы жерден басталады', 'Будущее решение начинается здесь', 'Your future solution starts here'],
  ['Нақтылау аяқталған соң тапсырма карточкасы осы жерде пайда болады.', 'После уточнения деталей здесь появится карточка задания.', 'Your task card will appear here once the details are clarified.'],
  ['Барлық өрісті өңдеуге болады. Жарияламас бұрын мәліметтердің дұрыстығын тексеріңіз.', 'Все поля можно редактировать. Проверьте точность информации перед дальнейшим использованием.', 'You can edit every field. Review the information before using the card.'],
  ['Карточка жобасы дайын.', 'Черновик карточки готов.', 'Your draft task card is ready.'],
  ['Карточканы растау', 'Подтвердить карточку', 'Confirm task card'],
  ['Бизнес мәселесі → Нақты сұрақтар → Айқын тапсырма', 'Бизнес-задача → Уточняющие вопросы → Понятное задание', 'Business challenge → Clear questions → Clear task'],
  ['Шешімді нақты кімдер қолданады?', 'Кто именно будет пользоваться решением?', 'Who exactly will use the solution?'],
  ['Қандай деректер немесе материалдар қолжетімді?', 'Какие данные или материалы доступны?', 'What data or materials are available?'],
  ['Команда жұмысының соңында қандай нәтиже күтіледі?', 'Какой результат ожидается по завершении работы команды?', 'What result is expected when the team finishes its work?'],
  ['Тапсырма атауы', 'Название задания', 'Task title'],
  ['Контекст', 'Контекст', 'Context'],
  ['Бизнес қажеттілігі', 'Бизнес-потребность', 'Business need'],
  ['Қолданушылар', 'Пользователи', 'Users'],
  ['Қолжетімді деректер', 'Доступные данные', 'Available data'],
  ['Шектеулер', 'Ограничения', 'Constraints'],
  ['Күтілетін нәтиже', 'Ожидаемый результат', 'Expected result'],
  ['Табыс критерийлері', 'Критерии успеха', 'Success criteria'],
  ['Байланыс ақпараты', 'Контактная информация', 'Contact details'],
  ['Өзара әрекеттесу форматы', 'Формат взаимодействия', 'Collaboration format'],
  ['Жауабыңызды жазыңыз…', 'Введите ответ…', 'Enter your answer…'],
  ['Осы сұраққа жауап енгізіңіз.', 'Ответьте на этот вопрос.', 'Please answer this question.'],
  ['Өрісті толтырыңыз…', 'Заполните поле…', 'Complete this field…'],
  ['Өзгерістер енгізілді. Карточканы қайта растаңыз.', 'Внесены изменения. Подтвердите карточку заново.', 'Changes made. Please confirm the card again.'],
  ['Карточканы тексеріп, қайта растаңыз.', 'Проверьте и подтвердите карточку заново.', 'Review and confirm the card again.'],
  ['Бастапқы деректер өзгерді. Қайта талдап, жауаптарды сақтаңыз.', 'Исходные данные изменились. Повторите анализ и сохраните ответы.', 'The source data changed. Analyze again and save your answers.'],
  ['Жауаптарды қайта сақтаңыз.', 'Сохраните ответы заново.', 'Please save your answers again.'],
  ['Жауаптар сақталған.', 'Ответы сохранены.', 'Answers saved.'],
  ['Сақталмаған өзгерістер бар.', 'Есть несохранённые изменения.', 'There are unsaved changes.'],
  ['Барлық өріс толтырылған.', 'Все поля заполнены.', 'All fields are complete.'],
  ['Саланы таңдап, тапсырма сипаттамасын енгізіңіз.', 'Выберите отрасль и введите описание задания.', 'Select an industry and enter a task description.'],
  ['Нақтылаушы сұрақтар дайын.', 'Уточняющие вопросы готовы.', 'Clarifying questions are ready.'],
  ['Саланы, сипаттаманы және барлық жауаптарды толтырыңыз.', 'Заполните отрасль, описание и все ответы.', 'Complete the industry, description and all answers.'],
  ['Жауаптар осы бетте сақталды.', 'Ответы сохранены на этой странице.', 'Answers saved on this page.'],
  ['Карточка жобасы дайын. Өрістерді тексеріп, толықтырыңыз.', 'Черновик готов. Проверьте и дополните поля.', 'Your draft is ready. Review and complete the fields.'],
  ['Барлық сұраққа жауап беріп, жауаптарды сақтаңыз.', 'Ответьте на все вопросы и сохраните ответы.', 'Answer all questions and save your answers.'],
  ['Карточка осы бетте расталды. Серверде сақталмаған.', 'Карточка подтверждена на этой странице. На сервере она не сохранена.', 'The card is confirmed on this page. It has not been saved on the server.'],
  ['Расталды ✓', 'Подтверждено ✓', 'Confirmed ✓'],
  ['Сервермен байланыс жоқ. npm start арқылы іске қосып, бетті localhost:3000 арқылы ашыңыз.', 'Нет связи с сервером. Запустите npm start и откройте localhost:3000.', 'Cannot reach the server. Run npm start and open localhost:3000.'],
  ['Сұрау уақыты аяқталды. Қайта көріңіз.', 'Время ожидания истекло. Попробуйте снова.', 'The request timed out. Please try again.'],
  ['Талдау орындалуда…', 'Анализируем…', 'Analyzing…'],
  ['Карточка жасалуда…', 'Создаём карточку…', 'Creating your card…'],
  ['OpenAI қосылған', 'OpenAI подключён', 'OpenAI connected'],
  ['Кілт жоқ · Демо режим', 'Без ключа · Демо-режим', 'No API key · Demo mode'],
  ['API қолжетімсіз · Резервтік режим', 'API недоступен · Резервный режим', 'API unavailable · Fallback mode'],
  ['Бетті localhost:3000 арқылы ашыңыз.', 'Откройте страницу через localhost:3000.', 'Open this page through localhost:3000.'],
  ['AI мәтіні бастапқы тілде сақталды. Жаңа тілде сұрақтар алу үшін қайта талдаңыз.', 'Текст AI сохранён на исходном языке. Для вопросов на новом языке повторите анализ.', 'AI text stays in its original language. Analyze again for questions in the new language.']
];
const locales = ['kk', 'ru', 'en'];
const translations = Object.fromEntries(locales.map((locale, index) => [locale, Object.fromEntries(TEXT.map((row) => [row[0], row[index]]))]));
let locale = 'kk';
try { const saved = localStorage.getItem('ai-sana-language'); if (locales.includes(saved)) locale = saved; } catch { /* Language switching works without storage. */ }
const t = (key) => translations[locale][key] || key;
const get = (id) => document.getElementById(id);
function text(element, key) { element.dataset.i18n = key; element.textContent = t(key); }
function placeholder(element, key) { element.dataset.i18nPlaceholder = key; element.placeholder = t(key); }

const industry = get('industry');
const description = get('description');
const questionsForm = get('questions-content');
const cardForm = get('card-form');
const cardInputs = {};
let answers = [];
let activeQuestions = [];
let analysisSource = '';
let analysisLanguage = 'kk';
let analysisMode = 'fallback';
let savedSource = null;
let generatedCard = null;
let cardCreated = false;
let busy = false;
const questionFields = ['users', 'data', 'expectedResult'];
const questionKeys = TEXT.filter((row) => ['Шешімді нақты кімдер қолданады?', 'Қандай деректер немесе материалдар қолжетімді?', 'Команда жұмысының соңында қандай нәтиже күтіледі?'].includes(row[0])).map((row) => row[0]);
const cardFields = [
  ['title', 'Тапсырма атауы'], ['context', 'Контекст'], ['need', 'Бизнес қажеттілігі'], ['users', 'Қолданушылар'],
  ['data', 'Қолжетімді деректер'], ['constraints', 'Шектеулер'], ['expectedResult', 'Күтілетін нәтиже'],
  ['successCriteria', 'Табыс критерийлері'], ['contact', 'Байланыс ақпараты'], ['interactionFormat', 'Өзара әрекеттесу форматы']
];
function setLanguage(value) {
  locale = locales.includes(value) ? value : 'kk';
  document.documentElement.lang = locale;
  document.title = t(TEXT[0][0]);
  get('language').value = locale;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-label]').forEach((element) => { element.setAttribute('aria-label', t(element.dataset.i18nLabel)); });
  get('language-note').hidden = analysisMode !== 'ai' || analysisLanguage === locale;
  updateRating();
  try { localStorage.setItem('ai-sana-language', locale); } catch { /* Optional preference only. */ }
}
function setStep(index) {
  document.querySelectorAll('.steps li').forEach((step, i) => {
    step.classList.toggle('step-current', i === index);
    if (i === index) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
  });
}
function setBusy(value) {
  busy = value;
  document.querySelector('main').setAttribute('aria-busy', String(value));
  document.querySelectorAll('button, select, textarea').forEach((element) => { element.disabled = value; });
  if (!value) get('confirm-card').disabled = cardCreated && !sourceIsSaved();
}
function validateField(field) {
  const valid = field.value.trim() !== '';
  field.setAttribute('aria-invalid', String(!valid));
  get(`${field.id}-error`).hidden = valid;
  return valid;
}
const sourceValues = () => [industry.value, description.value.trim(), ...answers.map((answer) => answer.value.trim())];
const sourceIsSaved = () => savedSource && sourceValues().every((value, index) => value === savedSource[index]);
const currentAnalysisSource = () => JSON.stringify([industry.value, description.value.trim()]);
function markDraft(key = 'Өзгерістер енгізілді. Карточканы қайта растаңыз.') {
  text(get('card-status'), key);
  get('card-status').classList.remove('success-message');
  text(get('confirm-card'), 'Карточканы растау');
}
function sourceChanged() {
  if (!cardCreated) return;
  get('confirm-card').disabled = !sourceIsSaved();
  markDraft(sourceIsSaved() ? 'Карточканы тексеріп, қайта растаңыз.' : 'Жауаптарды қайта сақтаңыз.');
  text(get('answers-status'), sourceIsSaved() ? 'Жауаптар сақталған.' : 'Сақталмаған өзгерістер бар.');
}
async function api(url, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    if (location.protocol === 'file:') throw new TypeError('Use HTTP');
    const response = await fetch(url, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', 'X-App-Language': locale }, ...(body ? { body: JSON.stringify(body) } : {}), signal: controller.signal });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Server error');
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error(t('Сұрау уақыты аяқталды. Қайта көріңіз.'));
    if (error instanceof TypeError || error instanceof SyntaxError) throw new Error(t('Сервермен байланыс жоқ. npm start арқылы іске қосып, бетті localhost:3000 арқылы ашыңыз.'));
    throw error;
  } finally { clearTimeout(timeout); }
}
function showMode(result) {
  text(get('ai-mode'), result.mode === 'ai' ? 'OpenAI қосылған' : result.fallbackReason === 'api_unavailable' ? 'API қолжетімсіз · Резервтік режим' : 'Кілт жоқ · Демо режим');
}
function renderQuestions(result) {
  answers = [];
  activeQuestions = result.questions.map((question, index) => ({ question, field: result.questionFields[index] }));
  get('questions-list').replaceChildren();
  activeQuestions.forEach((item, index) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const answer = document.createElement('textarea');
    const error = document.createElement('p');
    answer.id = `answer-${index + 1}`;
    answer.name = item.field;
    answer.rows = 2;
    answer.maxLength = 5000;
    answer.required = true;
    placeholder(answer, 'Жауабыңызды жазыңыз…');
    answer.setAttribute('aria-describedby', `${answer.id}-error`);
    label.htmlFor = answer.id;
    if (result.mode === 'fallback') text(label, questionKeys[index]); else label.textContent = item.question;
    error.id = `${answer.id}-error`;
    error.className = 'field-error';
    text(error, 'Осы сұраққа жауап енгізіңіз.');
    error.hidden = true;
    answer.addEventListener('input', () => {
      if (answer.getAttribute('aria-invalid') === 'true') validateField(answer);
      sourceChanged();
    });
    li.append(label, answer, error);
    get('questions-list').append(li);
    answers.push(answer);
  });
}
cardFields.forEach(([key, title]) => {
  const field = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('textarea');
  field.className = 'card-field';
  input.id = `task-field-${key}`;
  input.name = key;
  input.rows = 2;
  placeholder(input, 'Өрісті толтырыңыз…');
  label.htmlFor = input.id;
  text(label, title);
  input.addEventListener('input', () => {
    markDraft(sourceIsSaved() ? undefined : 'Жауаптарды қайта сақтаңыз.');
    updateRating();
  });
  field.append(label, input);
  get('card-fields').append(field);
  cardInputs[key] = input;
});
function updateRating() {
  const score = cardCreated ? 65 : 0;
  get('rating-score').textContent = score;
  text(get('rating-level'), cardCreated ? 'Жұмысқа жарамды' : 'Әзірге бағаланбаған');
  document.querySelector('.rating-circle').setAttribute('aria-valuenow', String(score));
  get('rating-progress').value = score;
  get('rating-progress').textContent = `${score}/100`;
  const missing = cardFields.filter(([key]) => !cardInputs[key].value.trim());
  get('missing-fields').replaceChildren();
  get('missing-fields').hidden = !cardCreated || missing.length === 0;
  get('missing-placeholder').hidden = cardCreated && missing.length > 0;
  text(get('missing-placeholder'), cardCreated ? 'Барлық өріс толтырылған.' : 'Алдымен сұрақтарға жауап беріңіз.');
  if (cardCreated) missing.forEach(([, title]) => {
    const item = document.createElement('li'); text(item, title); get('missing-fields').append(item);
  });
}
get('task-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (busy) return;
  const valid = [industry, description].map(validateField);
  if (valid.includes(false)) {
    text(get('analysis-status'), 'Саланы таңдап, тапсырма сипаттамасын енгізіңіз.');
    (valid[0] ? description : industry).focus(); return;
  }
  if (analysisSource === currentAnalysisSource() && analysisLanguage === locale && answers.length) { answers[0].focus(); return; }
  setBusy(true);
  text(get('analysis-status'), 'Талдау орындалуда…');
  try {
    const result = await api('/api/analyze', { description: description.value.trim(), industry: industry.value, language: locale });
    if (!Array.isArray(result.questions) || result.questions.length < 3 || !Array.isArray(result.questionFields)) throw new Error('Invalid response');
    renderQuestions(result);
    analysisSource = currentAnalysisSource(); analysisLanguage = locale; analysisMode = result.mode;
    cardCreated = false; savedSource = null; generatedCard = null;
    for (const input of Object.values(cardInputs)) input.value = '';
    get('card-empty').hidden = false; cardForm.hidden = true;
    get('questions-empty').hidden = true; questionsForm.hidden = false;
    get('language-note').hidden = true;
    get('answers-status').textContent = ''; delete get('answers-status').dataset.i18n;
    showMode(result); updateRating(); setStep(1);
    text(get('analysis-status'), 'Нақтылаушы сұрақтар дайын.');
  } catch (error) { get('analysis-status').textContent = error.message; delete get('analysis-status').dataset.i18n; }
  finally { setBusy(false); }
  if (answers.length) answers[0].focus();
});
questionsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (busy) return;
  const fields = [industry, description, ...answers];
  const valid = fields.map(validateField);
  if (valid.includes(false) || answers.length < 3) {
    text(get('answers-status'), 'Саланы, сипаттаманы және барлық жауаптарды толтырыңыз.');
    fields[Math.max(0, valid.indexOf(false))].focus(); return;
  }
  if (analysisSource !== currentAnalysisSource()) {
    text(get('answers-status'), 'Бастапқы деректер өзгерді. Қайта талдап, жауаптарды сақтаңыз.'); return;
  }
  if (cardCreated && sourceIsSaved()) { cardInputs.title.focus(); return; }
  setBusy(true); text(get('answers-status'), 'Карточка жасалуда…');
  try {
    const payload = activeQuestions.map((question, index) => ({ ...question, answer: answers[index].value.trim() }));
    const result = await api('/api/task-card', { description: description.value.trim(), industry: industry.value, language: locale, answers: payload });
    const changedFields = new Set(activeQuestions.filter((_, index) => savedSource?.[index + 2] !== answers[index].value.trim()).map((item) => item.field));
    cardFields.forEach(([key]) => {
      const manuallyEdited = generatedCard && cardInputs[key].value !== generatedCard[key];
      if (!manuallyEdited || changedFields.has(key)) cardInputs[key].value = result.card[key] || '';
    });
    generatedCard = { ...result.card }; savedSource = sourceValues(); cardCreated = true;
    get('card-empty').hidden = true; cardForm.hidden = false;
    text(get('answers-status'), 'Жауаптар осы бетте сақталды.');
    markDraft('Карточка жобасы дайын. Өрістерді тексеріп, толықтырыңыз.');
    showMode(result); updateRating(); setStep(2);
  } catch (error) { get('answers-status').textContent = error.message; delete get('answers-status').dataset.i18n; }
  finally { setBusy(false); }
  if (cardCreated) cardInputs.title.focus();
});
cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (busy || !cardCreated || !sourceIsSaved() || answers.some((answer) => !answer.value.trim())) {
    markDraft('Барлық сұраққа жауап беріп, жауаптарды сақтаңыз.'); return;
  }
  text(get('card-status'), 'Карточка осы бетте расталды. Серверде сақталмаған.');
  get('card-status').classList.add('success-message'); text(get('confirm-card'), 'Расталды ✓');
});
industry.addEventListener('change', () => { validateField(industry); sourceChanged(); });
description.addEventListener('input', () => { if (description.getAttribute('aria-invalid') === 'true') validateField(description); sourceChanged(); });
get('language').addEventListener('change', (event) => setLanguage(event.target.value));
setLanguage(locale);
if (location.protocol === 'file:') text(get('ai-mode'), 'Бетті localhost:3000 арқылы ашыңыз.');
else api('/api/config').then((config) => text(get('ai-mode'), config.aiConfigured ? 'OpenAI қосылған' : 'Кілт жоқ · Демо режим')).catch(() => text(get('ai-mode'), 'Бетті localhost:3000 арқылы ашыңыз.'));
