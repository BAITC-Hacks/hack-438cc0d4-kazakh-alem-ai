// Deterministic fallback: only explicit details count as supplied information.
// Industry is context, never evidence of users, available data, or deliverables.
const fields = [
  {
    name: 'users',
    evidence: /(?:қолданушылар|пайдаланушылар|аудитория|users|audience|пользователи)\s*[:–-]\s*\S|\S+\s+(?:қолданады|пайдаланады)/iu,
    question: 'Шешімді нақты кімдер қолданады?',
  },
  {
    name: 'data',
    evidence: /(?:деректер|материалдар|data|данные)\s*[:–-]\s*\S|(?:деректер|материалдар|датасет|dataset|csv|xlsx)[^.!?\n]{0,80}(?:бар|қолжетімді|available|имеются|доступны)/iu,
    question: 'Қандай деректер немесе материалдар қолжетімді?',
  },
  {
    name: 'expectedResult',
    evidence: /(?:күтілетін нәтиже|соңғы нәтиже|expected result|deliverable|ожидаемый результат)\s*[:–-]\s*\S/iu,
    question: 'Команда жұмысының соңында қандай нәтиже күтіледі?',
  },
];

const followUpQuestions = [
  'Шешімнің сәттілігін қандай нақты көрсеткіштермен бағалайсыз?',
  'Тапсырманы орындау мерзімі қандай?',
  'Шешімге қандай техникалық немесе бюджеттік шектеулер қойылады?',
];

function analyzeTask(description, industry) {
  if (typeof description !== 'string' || !description.trim()) {
    throw new TypeError('description бос емес мәтін болуы керек.');
  }
  if (industry !== undefined && typeof industry !== 'string') {
    throw new TypeError('industry мәтін болуы керек.');
  }

  const missing = fields.filter((field) => !field.evidence.test(description));
  const questions = missing.map((field) => field.question);
  for (const question of followUpQuestions) {
    if (questions.length >= 3) break;
    questions.push(question);
  }

  return {
    missingFields: missing.map((field) => field.name),
    questions,
    summary: missing.length
      ? 'Тапсырма сипаттамасында маңызды мәліметтер жетіспейді.'
      : 'Негізгі мәліметтер көрсетілген. Тапсырманың шарттарын нақтылау қажет.',
  };
}

module.exports = { analyzeTask };
