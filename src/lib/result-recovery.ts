/**
 * Утилиты для восстановления результатов тестов из параметров URL
 */

import { UniversalTestResult, LoadedTestData } from './test-loader';

/**
 * Восстанавливает результат теста из параметров URL
 */
export function recoverTestResult(
  testSlug: string,
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  // Сначала пытаемся найти в предопределенных результатах
  if (testData.results && testData.results.length > 0) {
    const foundResult = testData.results.find(
      r => r.id === urlData.resultType || r.name === urlData.resultType
    );
    if (foundResult) {
      return foundResult;
    }
  }

  // Если не нашли, пытаемся восстановить результат динамически
  switch (testSlug) {
    case 'love-language':
      return recoverLoveLanguageResult(urlData, testData);
    
    case 'temperament':
      return recoverTemperamentResult(urlData, testData);
    
    case 'communication-style':
      return recoverCommunicationStyleResult(urlData, testData);
    
    case 'attachment-style':
      return recoverAttachmentStyleResult(urlData, testData);
    
    case 'learning-style':
      return recoverLearningStyleResult(urlData, testData);
      
    case 'personality-type':
      return recoverPersonalityTypeResult(urlData, testData);
      
    // Для остальных тестов, которые сохраняют результат в числовом виде
    default:
      if (urlData.scores && urlData.scores.length > 0) {
        return recoverScoreBasedResult(testSlug, urlData, testData);
      }
  }

  return null;
}

/**
 * Восстанавливает результат теста "Язык любви"
 */
function recoverLoveLanguageResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  if (!urlData.scores || urlData.scores.length < 5) return null;

  const languages = ['words', 'time', 'gifts', 'acts', 'touch'];
  const languageNames: Record<string, string> = {
    words: 'Слова поддержки',
    time: 'Качественное время', 
    gifts: 'Подарки',
    acts: 'Дела заботы',
    touch: 'Физическое прикосновение'
  };

  // Находим язык с максимальным счетом
  let maxScore = 0;
  let primaryLanguage = 'words';
  
  languages.forEach((lang, index) => {
    if (urlData.scores![index] > maxScore) {
      maxScore = urlData.scores![index];
      primaryLanguage = lang;
    }
  });

  // Для love-language нужно правильно мапить названия
  const languageMapping: Record<string, string> = {
    'words': 'words',
    'time': 'time', 
    'gifts': 'gifts',
    'service': 'acts', // В коде используется 'acts', а не 'service'
    'touch': 'touch',
    'Слова поддержки': 'words',
    'Качественное время': 'time',
    'Подарки': 'gifts',
    'Дела заботы': 'acts',
    'Физическое прикосновение': 'touch'
  };

  // Мапим primaryLanguage на правильный ключ
  const mappedLanguage = languageMapping[primaryLanguage] || languageMapping[urlData.resultType] || 'acts';

  // Создаем фейковые ответы для функции расчета
  const fakeAnswers: Record<string, string> = {};
  // Заполняем ответы так, чтобы выбранный язык имел максимальный балл
  for (let i = 1; i <= 15; i++) {
    // Каждый третий вопрос ставим выбранный язык для гарантии максимального балла
    if (i % 3 === 0 || i % 5 === 0) {
      fakeAnswers[i.toString()] = mappedLanguage;
    } else {
      // Остальные ответы распределяем случайно между другими языками
      const otherLanguages = languages.filter(l => l !== primaryLanguage);
      fakeAnswers[i.toString()] = otherLanguages[Math.floor(Math.random() * otherLanguages.length)];
    }
  }

  // Вызываем оригинальную функцию расчета
  const result = testData.calculateResult(fakeAnswers);
  
  // Переопределяем данные на основе URL для точности
  const totalScores = urlData.scores!.reduce((sum, score) => sum + score, 0);
  
  // Конвертируем баллы в проценты
  const percentages = urlData.scores!.map(score => 
    Math.round((score / totalScores) * 100)
  );
  
  // Корректируем, чтобы сумма была ровно 100%
  const currentSum = percentages.reduce((sum, p) => sum + p, 0);
  if (currentSum !== 100) {
    const maxIndex = percentages.indexOf(Math.max(...percentages));
    percentages[maxIndex] += (100 - currentSum);
  }
  
  result.chartData = languages.map((lang, index) => ({
    factor: languageNames[lang],
    value: percentages[index]
  }));
  result.chartType = 'bar';
  result.factorScores = languages.reduce((acc, lang, index) => {
    acc[lang] = urlData.scores![index];
    return acc;
  }, {} as Record<string, number>);
  
  // Пересчитываем percentage на основе актуальных scores
  const maxScoreIndex = urlData.scores!.indexOf(Math.max(...urlData.scores!));
  result.percentage = percentages[maxScoreIndex];

  return result;
}

/**
 * Восстанавливает результат теста "Темперамент"
 */
function recoverTemperamentResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData  
): UniversalTestResult | null {
  // Создаем фейковые ответы на основе типа темперамента
  const fakeAnswers: Record<string, string> = {};
  const temperament = urlData.resultType; // sanguine, choleric, etc.
  
  for (let i = 1; i <= 20; i++) {
    fakeAnswers[i.toString()] = temperament;
  }

  const result = testData.calculateResult(fakeAnswers);
  
  if (urlData.scores && urlData.scores.length >= 4) {
    const temperaments = ['sanguine', 'choleric', 'melancholic', 'phlegmatic'];
    const temperamentNames: Record<string, string> = {
      sanguine: 'Сангвиник',
      choleric: 'Холерик',
      melancholic: 'Меланхолик',
      phlegmatic: 'Флегматик'
    };
    
    // Восстанавливаем scores из URL
    const scores: Record<string, number> = {};
    temperaments.forEach((temp, index) => {
      scores[temp] = urlData.scores![index];
    });
    
    result.scores = scores;
    result.chartData = temperaments.map((temp, index) => ({
      factor: temperamentNames[temp],
      value: urlData.scores![index]
    }));
    result.chartType = 'bar';
    result.factorScores = scores;
  }
  
  return result;
}

/**
 * Восстанавливает результат теста "Стиль общения"
 */
function recoverCommunicationStyleResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  const fakeAnswers: Record<string, string> = {};
  
  for (let i = 1; i <= 20; i++) {
    fakeAnswers[i.toString()] = urlData.resultType;
  }
  
  return testData.calculateResult(fakeAnswers);
}

/**
 * Восстанавливает результат теста "Стиль привязанности"
 */
function recoverAttachmentStyleResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  const fakeAnswers: Record<string, string> = {};
  
  for (let i = 1; i <= 20; i++) {
    fakeAnswers[i.toString()] = urlData.resultType;
  }
  
  return testData.calculateResult(fakeAnswers);
}

/**
 * Восстанавливает результат теста "Стиль обучения"
 */
function recoverLearningStyleResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  const fakeAnswers: Record<string, string> = {};
  
  for (let i = 1; i <= 20; i++) {
    fakeAnswers[i.toString()] = urlData.resultType;
  }
  
  const result = testData.calculateResult(fakeAnswers);
  
  if (urlData.scores && urlData.scores.length >= 4) {
    const styles = ['visual', 'auditory', 'kinesthetic', 'reading'];
    const styleNames: Record<string, string> = {
      visual: 'Визуальный',
      auditory: 'Аудиальный',
      kinesthetic: 'Кинестетический',
      reading: 'Чтение/Письмо'
    };
    
    result.chartData = styles.map((style, index) => ({
      factor: styleNames[style],
      value: urlData.scores![index]
    }));
    result.chartType = 'radar';
  }
  
  return result;
}

/**
 * Восстанавливает результат теста "Тип личности"
 */
function recoverPersonalityTypeResult(
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  if (!urlData.scores || urlData.scores.length < 5) return null;

  // Big Five факторы в правильном порядке
  const factors = ['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'];
  const factorNames: Record<string, string> = {
    extraversion: 'Экстраверсия',
    agreeableness: 'Доброжелательность',
    conscientiousness: 'Добросовестность',
    neuroticism: 'Эмоциональная стабильность',
    openness: 'Открытость опыту'
  };

  // Создаем объект с баллами факторов
  const factorScores: Record<string, number> = {};
  factors.forEach((factor, index) => {
    factorScores[factor] = urlData.scores![index];
  });

  // Создаем фейковые ответы для функции расчета
  // Генерируем ответы на основе баллов факторов
  const fakeAnswers: number[] = [];
  const questionsCount = testData.questions.length;
  const questionsPerFactor = Math.floor(questionsCount / 5);

  factors.forEach((factor, factorIndex) => {
    const score = urlData.scores![factorIndex];
    const normalizedScore = Math.max(0, Math.min(4, Math.round(score / 25))); // 0-100 -> 0-4
    
    for (let i = 0; i < questionsPerFactor; i++) {
      fakeAnswers.push(normalizedScore);
    }
  });

  // Добавляем оставшиеся вопросы если есть
  while (fakeAnswers.length < questionsCount) {
    fakeAnswers.push(2); // средний балл
  }

  const result = testData.calculateResult(fakeAnswers);
  
  // Переопределяем данные графика на основе URL
  result.chartData = factors.map((factor, index) => ({
    factor: factorNames[factor],
    // Для эмоциональной стабильности инвертируем значение нейротизма
    value: factor === 'neuroticism' ? 100 - urlData.scores![index] : urlData.scores![index]
  }));
  result.chartType = 'radar';
  result.factorScores = factorScores;

  return result;
}

/**
 * Восстанавливает результат для тестов на основе числовых оценок
 */
function recoverScoreBasedResult(
  testSlug: string,
  urlData: { resultType: string; scores?: number[] },
  testData: LoadedTestData
): UniversalTestResult | null {
  // Для тестов, которые используют числовые ответы (1-4 или 0-3)
  const totalScore = urlData.scores?.[0] || 0;
  
  // Создаем фейковые ответы для воспроизведения результата
  const questionsCount = testData.questions.length;
  const averageScore = Math.round(totalScore / questionsCount);
  const fakeAnswers: number[] = new Array(questionsCount).fill(averageScore);
  
  // Некоторые тесты требуют специфическую логику
  switch (testSlug) {
    case 'stress-level':
    case 'anxiety-level':
    case 'self-esteem':
    case 'procrastination':
    case 'perfectionism':
    case 'time-management':
    case 'work-life-balance':
      // Эти тесты используют числовые оценки напрямую
      const adjustedAnswers = distributeScore(totalScore, questionsCount);
      return testData.calculateResult(adjustedAnswers);
    
    default:
      return testData.calculateResult(fakeAnswers);
  }
}

/**
 * Распределяет общий счет по вопросам для более реалистичного результата
 */
function distributeScore(totalScore: number, questionsCount: number): number[] {
  const answers: number[] = [];
  let remaining = totalScore;
  
  for (let i = 0; i < questionsCount; i++) {
    const maxForQuestion = Math.min(3, remaining);
    const minForQuestion = Math.max(0, remaining - (questionsCount - i - 1) * 3);
    const score = Math.floor(Math.random() * (maxForQuestion - minForQuestion + 1)) + minForQuestion;
    answers.push(score);
    remaining -= score;
  }
  
  return answers;
}