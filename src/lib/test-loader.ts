/**
 * Универсальный загрузчик тестов
 * Обеспечивает динамическую загрузку и унификацию всех типов тестов
 */

import { TestData } from '@/data/tests';

// Универсальный интерфейс для вопросов
export interface UniversalQuestion {
  id: string;
  text: string;
  icon?: string;
  options: {
    text: string;
    value: string | number;
    factor?: string;
  }[];
  category?: string;
}

// Универсальный интерфейс для результатов
export interface UniversalTestResult {
  id: string;
  name: string;
  title?: string;
  description: string;
  characteristics?: string[];
  advice?: string[];
  recommendations?: string[];
  color?: string;
  emoji?: string;
  percentage?: number;
  chartData?: Array<{ factor: string; value: number }>;
  chartType?: 'bar' | 'pie' | 'radar';
  factorScores?: Record<string, number>;
  level?: string;
  score?: number;
}

// Тип для функций расчета результатов
export type CalculateResultFunction = (
  answers: (string | number)[] | Record<string, string | number>
) => UniversalTestResult;

// Интерфейс для загруженных данных теста
export interface LoadedTestData {
  questions: UniversalQuestion[];
  calculateResult: CalculateResultFunction;
  results?: UniversalTestResult[];
}

// Маппинг всех тестов
const testImportMap: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => Promise<any>
> = {
  'digital-wellness-persona': () => import('@/data/digital-wellness-test'),
  'personality-type': () => import('@/data/personality-type-test'),
  'emotional-intelligence': () => import('@/data/emotional-intelligence-test'),
  'impostor-syndrome': () => import('@/data/impostor-syndrome-test'),
  'mental-resilience': () => import('@/data/mental-resilience-test'),
  'dopamine-detox-need': () => import('@/data/dopamine-detox-test'),
  chronotype: () => import('@/data/chronotype-test'),
  'communication-style': () => import('@/data/communication-style-test'),
  'conflict-style': () => import('@/data/conflict-style-test'),
  'creativity-test': () => import('@/data/creativity-test'),
  'decision-making': () => import('@/data/decision-making-test'),
  'emotional-stability': () => import('@/data/emotional-stability-test'),
  'learning-style': () => import('@/data/learning-style-test'),
  temperament: () => import('@/data/temperament-test'),
  'stress-level': () => import('@/data/stress-level-test'),
  'introvert-extrovert': () => import('@/data/introvert-extrovert-test'),
  perfectionism: () => import('@/data/perfectionism-test'),
  'anxiety-level': () => import('@/data/anxiety-level-test'),
  'attachment-style': () => import('@/data/attachment-style-test'),
  'love-language': () => import('@/data/love-language-test'),
  'time-management': () => import('@/data/time-management-test'),
  procrastination: () => import('@/data/procrastination-test'),
  'self-esteem': () => import('@/data/self-esteem-test'),
  'work-life-balance': () => import('@/data/work-life-balance-test'),
  'social-intelligence': () => import('@/data/social-intelligence-test'),
  'memory-type': () => import('@/data/memory-type-test'),
  'risk-tolerance': () => import('@/data/risk-tolerance-test'),
  'work-motivation': () => import('@/data/work-motivation-test'),
  'management-style': () => import('@/data/management-style-test'),
  'sales-potential': () => import('@/data/sales-potential-test'),
  entrepreneurship: () => import('@/data/entrepreneurship-test'),
};

// Адаптеры для преобразования разных форматов вопросов
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptQuestions(questions: any[], testSlug: string): UniversalQuestion[] {
  // Для тестов с форматом TestQuestion (digital-wellness, personality-type, etc)
  if (
    (questions[0] as { question?: string; icon?: string })?.question &&
    (questions[0] as { question?: string; icon?: string })?.icon
  ) {
    return questions.map((q) => ({
      id: (q as { id: string | number }).id.toString(),
      text: (q as { question: string }).question,
      icon: (q as { icon: string }).icon,
      options: (
        q as { options: Array<{ text: string; value: unknown; factor?: string }> }
      ).options.map((opt: { text: string; value: unknown; factor?: string }) => ({
        text: opt.text,
        value: opt.value as string | number,
        factor: opt.factor,
      })),
      category: (q as { category?: string }).category,
    })) as UniversalQuestion[];
  }

  // Для тестов с форматом {id: string, text: string} (новые тесты)
  if ((questions[0] as { text?: string })?.text) {
    return questions.map((q) => ({
      id: (q as { id: string | number }).id.toString(),
      text: (q as { text: string }).text,
      icon: getDefaultIconForTest(testSlug),
      options: (
        q as {
          options: Array<{
            text: string;
            score?: number;
            value?: unknown;
            points?: number;
            type?: string;
            style?: string;
            language?: string;
            temperament?: string;
            secure?: number;
            anxious?: number;
            avoidant?: number;
            disorganized?: number;
            primary?: string;
            category?: string;
            factor?: string;
          }>;
        }
      ).options.map(
        (
          opt: {
            text: string;
            score?: number;
            value?: unknown;
            points?: number;
            type?: string;
            style?: string;
            language?: string;
            temperament?: string;
            secure?: number;
            anxious?: number;
            avoidant?: number;
            disorganized?: number;
            primary?: string;
            category?: string;
            factor?: string;
          },
          optIndex: number
        ) => ({
          text: opt.text,
          value:
            opt.score ??
            opt.value ??
            opt.points ??
            opt.type ??
            opt.style ??
            opt.language ??
            opt.temperament ??
            // Для attachment-style и других тестов с множественными баллами используем индекс
            ((opt.secure !== undefined ||
            opt.anxious !== undefined ||
            opt.avoidant !== undefined ||
            opt.disorganized !== undefined
              ? optIndex.toString()
              : (opt.primary ?? opt.category ?? optIndex.toString())) as string | number),
          factor: opt.factor ?? opt.category ?? opt.temperament,
        })
      ),
      category: (q as { category?: string }).category,
    })) as UniversalQuestion[];
  }

  throw new Error(`Unknown question format for test: ${testSlug}`);
}

// Получить иконку по умолчанию для теста
function getDefaultIconForTest(testSlug: string): string {
  const iconMap: Record<string, string> = {
    temperament: 'thermometer',
    'stress-level': 'alert-triangle',
    'introvert-extrovert': 'users',
    chronotype: 'sun',
    'communication-style': 'message-circle',
    'conflict-style': 'shield',
    'creativity-test': 'lightbulb',
    'decision-making': 'compass',
    'emotional-stability': 'heart',
    'learning-style': 'book-open',
    perfectionism: 'target',
    'anxiety-level': 'cloud-lightning',
    'attachment-style': 'heart-handshake',
    'love-language': 'heart',
    'time-management': 'clock',
    procrastination: 'pause',
    'self-esteem': 'star',
    'work-life-balance': 'balance',
    'social-intelligence': 'users2',
    'memory-type': 'brain',
    'risk-tolerance': 'flame',
    'work-motivation': 'target',
    'management-style': 'briefcase',
    'sales-potential': 'trending-up',
    entrepreneurship: 'rocket',
  };
  return iconMap[testSlug] || 'brain';
}

// Адаптировать функцию расчета результатов
function adaptCalculateFunction(
  originalCalculate: (...args: unknown[]) => unknown,
  testSlug: string
): CalculateResultFunction {
  return (answers: (string | number)[] | Record<string, string | number>) => {
    // Преобразуем ответы в нужный формат
    let adaptedAnswers: (string | number)[] | Record<string, string | number> = answers;

    // Для некоторых тестов нужно преобразовать формат ответов
    if (
      testSlug === 'temperament' ||
      testSlug === 'love-language' ||
      testSlug === 'communication-style' ||
      testSlug === 'learning-style' ||
      testSlug === 'attachment-style'
    ) {
      // Эти тесты ожидают объект с ответами
      if (Array.isArray(answers)) {
        // Если пришел массив, преобразуем в объект
        const answerObj: Record<string, string> = {};
        answers.forEach((answer, index) => {
          if (answer != null) {
            // Проверяем на null/undefined
            answerObj[(index + 1).toString()] = answer.toString();
          }
        });
        adaptedAnswers = answerObj;
      } else {
        // Если уже объект, преобразуем значения безопасно
        const safeAnswers: Record<string, string> = {};
        Object.entries(answers).forEach(([key, value]) => {
          if (value != null) {
            safeAnswers[key] = value.toString();
          }
        });
        adaptedAnswers = safeAnswers;
      }
    } else if (Array.isArray(answers)) {
      // Фильтруем null значения и преобразуем если нужно
      adaptedAnswers = answers
        .filter((a) => a != null)
        .map((a) => {
          const str = a.toString();
          const num = parseInt(str);
          return isNaN(num) ? str : num;
        });
    }

    // Вызываем оригинальную функцию
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = originalCalculate(adaptedAnswers) as any;

    // Адаптируем результат к универсальному формату
    return adaptResult(result, testSlug);
  };
}

// Адаптировать результат к универсальному формату
function adaptResult(
  result: {
    id?: string;
    type?: string;
    level?: string;
    primary_type?: string;
    primary_language?: string;
    name?: string;
    title?: string;
    description?: string;
    characteristics?: string[];
    traits?: string[];
    strengths?: string[];
    advice?: string[];
    recommendations?: string[];
    tips?: string[];
    partner_advice?: string[];
    color?: string;
    emoji?: string;
    percentage?: number;
    score?: number;
    totalScore?: number;
    scores?: Record<string, number>;
    percentages?: Record<string, number>;
    how_to_receive_love?: string[];
    growth_tips?: string[];
    factors?: Record<string, number>;
    factorScores?: Record<string, number>;
  },
  testSlug: string
): UniversalTestResult {
  // Базовая адаптация
  const adapted: UniversalTestResult = {
    id:
      result.id ||
      result.type ||
      result.level ||
      result.primary_type ||
      result.primary_language ||
      '',
    name: result.name || result.title || '',
    title: result.title,
    description: result.description || '',
    characteristics: result.characteristics || result.traits || result.strengths || [],
    advice: result.advice || result.recommendations || result.tips || result.partner_advice || [],
    recommendations: result.recommendations || result.advice || result.partner_advice || [],
    color: result.color || 'yellow', // Добавляем фолбек цвет
    emoji: result.emoji || '🧠',
    percentage: result.percentage || 15,
    level: result.level,
    score: result.score || result.totalScore,
  };

  // Преобразуем недопустимые цвета в допустимые для NeoCard
  // Допустимые: 'white', 'yellow', 'blue', 'orange', 'green', 'purple'
  if (adapted.color === 'red') {
    adapted.color = 'orange';
  }

  // Временное логирование для отладки
  console.log(
    'Test slug:',
    testSlug,
    'Original color:',
    result.color,
    'Adapted color:',
    adapted.color
  );

  // Специальная обработка для разных тестов
  if (testSlug === 'impostor-syndrome') {
    // Мапим цвета для уровней синдрома самозванца
    const titleOrName = result.title || result.name || '';
    if (titleOrName.includes('Выраженный')) {
      adapted.color = 'orange';
    } else if (titleOrName.includes('Умеренный')) {
      adapted.color = 'yellow';
    } else if (titleOrName.includes('Легкий')) {
      adapted.color = 'blue';
    } else {
      adapted.color = 'green';
    }
    adapted.emoji = adapted.emoji || '🎭';
    // Убеждаемся, что name правильно установлен
    if (!adapted.name && result.title) {
      adapted.name = result.title;
    }
  } else if (testSlug === 'love-language') {
    // Добавляем эмодзи для языков любви
    const emojiMap: Record<string, string> = {
      words: '💬',
      acts: '🤝',
      gifts: '🎁',
      time: '⏰',
      touch: '🤗',
    };
    adapted.emoji = result.primary_language ? emojiMap[result.primary_language] || '❤️' : '❤️';
    adapted.color = 'yellow';

    // Добавляем percentage из результата
    if (result.percentages && result.primary_language) {
      adapted.percentage = result.percentages[result.primary_language];
    }

    // Копируем поля из результата
    adapted.characteristics = result.characteristics || [];
    adapted.advice = result.how_to_receive_love || [];
    adapted.recommendations = result.growth_tips || [];

    // Добавляем данные для графика
    if (result.scores) {
      const languageNames: Record<string, string> = {
        words: 'Слова поддержки',
        acts: 'Дела заботы',
        gifts: 'Подарки',
        time: 'Качественное время',
        touch: 'Физическое прикосновение',
      };

      adapted.chartData = Object.entries(result.scores).map(([lang, score]) => ({
        factor: languageNames[lang] || lang,
        value: score,
      }));
      adapted.chartType = 'bar';
      adapted.factorScores = result.scores;
    }
  }

  // Дополнительная проверка для других тестов без цвета
  if (testSlug === 'mental-resilience') {
    adapted.color = adapted.color || 'green';
    adapted.emoji = adapted.emoji || '💪';
  } else if (testSlug === 'dopamine-detox-need') {
    adapted.color = adapted.color || 'purple';
    adapted.emoji = adapted.emoji || '🧘';
  } else if (testSlug === 'emotional-intelligence') {
    adapted.color = adapted.color || 'blue';
    adapted.emoji = adapted.emoji || '🎭';
  }

  // Добавляем данные для графиков
  if (result.factors || result.scores || result.factorScores) {
    adapted.chartType = 'radar';
    adapted.factorScores = result.factors || result.scores || result.factorScores;
    if (adapted.factorScores) {
      adapted.chartData = generateChartData(adapted.factorScores, testSlug);
    }
  }

  // Специальная обработка для теста темперамента
  if (testSlug === 'temperament' && result.scores) {
    adapted.chartType = 'bar';
    adapted.chartData = Object.entries(result.scores).map(([type, score]) => ({
      factor:
        {
          sanguine: 'Сангвиник',
          choleric: 'Холерик',
          melancholic: 'Меланхолик',
          phlegmatic: 'Флегматик',
        }[type] || type,
      value: score,
    }));
    adapted.factorScores = result.scores;

    // Вычисляем правильный percentage для основного типа
    const totalScore = Object.values(result.scores).reduce((sum, score) => sum + score, 0);
    const primaryScore = result.primary_type ? result.scores[result.primary_type] || 0 : 0;
    adapted.percentage = totalScore > 0 ? Math.round((primaryScore / totalScore) * 100) : 15;

    // Устанавливаем правильные цвета и эмодзи для темпераментов
    const temperamentConfig: Record<string, { color: string; emoji: string }> = {
      sanguine: { color: 'yellow', emoji: '🌟' },
      choleric: { color: 'orange', emoji: '🧠' },
      melancholic: { color: 'blue', emoji: '💭' },
      phlegmatic: { color: 'green', emoji: '🧘' },
    };

    const config = result.primary_type ? temperamentConfig[result.primary_type] : undefined;
    if (config) {
      adapted.color = config.color;
      adapted.emoji = config.emoji;
    }
  }

  return adapted;
}

// Генерация данных для графиков
function generateChartData(
  scores: Record<string, number>,
  testSlug: string
): Array<{ factor: string; value: number }> {
  const factorLabels: Record<string, Record<string, string>> = {
    'personality-type': {
      extraversion: 'Экстраверсия',
      agreeableness: 'Доброжелательность',
      conscientiousness: 'Добросовестность',
      neuroticism: 'Нейротизм',
      openness: 'Открытость опыту',
    },
    temperament: {
      sanguine: 'Сангвиник',
      choleric: 'Холерик',
      melancholic: 'Меланхолик',
      phlegmatic: 'Флегматик',
    },
    // Добавить маппинг для других тестов
  };

  const labels = factorLabels[testSlug] || {};

  return Object.entries(scores).map(([key, value]) => ({
    factor: labels[key] || key,
    value: value,
  }));
}

// Основная функция загрузки теста
export async function loadTest(test: TestData): Promise<LoadedTestData> {
  const importFn = testImportMap[test.slug];

  if (!importFn) {
    throw new Error(`No import mapping found for test: ${test.slug}`);
  }

  const testModule = await importFn();

  // Находим вопросы (разные тесты используют разные названия)
  const questionsKey = Object.keys(testModule).find((key) => key.endsWith('Questions'));
  if (!questionsKey) {
    throw new Error(`No questions found for test: ${test.slug}`);
  }

  const questions = testModule[questionsKey];

  // Находим функцию расчета
  const calculateKey = Object.keys(testModule).find(
    (key) => key.startsWith('calculate') && (key.endsWith('Result') || key.endsWith('Results'))
  );

  if (!calculateKey) {
    throw new Error(`No calculate function found for test: ${test.slug}`);
  }

  const calculateFn = testModule[calculateKey];

  // Находим результаты (опционально)
  const resultsKey = Object.keys(testModule).find((key) => key.endsWith('Results'));
  const results = resultsKey ? testModule[resultsKey] : undefined;

  return {
    questions: adaptQuestions(questions, test.slug),
    calculateResult: adaptCalculateFunction(calculateFn, test.slug),
    results: results
      ? results.map((r: unknown) =>
          adaptResult(
            r as {
              id?: string;
              type?: string;
              level?: string;
              primary_type?: string;
              primary_language?: string;
              name?: string;
              title?: string;
              description?: string;
              characteristics?: string[];
              traits?: string[];
              strengths?: string[];
              advice?: string[];
              recommendations?: string[];
              tips?: string[];
              partner_advice?: string[];
              color?: string;
              emoji?: string;
              percentage?: number;
              score?: number;
              totalScore?: number;
              scores?: Record<string, number>;
              percentages?: Record<string, number>;
              how_to_receive_love?: string[];
              growth_tips?: string[];
              factors?: Record<string, number>;
              factorScores?: Record<string, number>;
            },
            test.slug
          )
        )
      : undefined,
  };
}

// Проверка доступности теста
export function isTestAvailable(test: TestData): boolean {
  return !!testImportMap[test.slug];
}
