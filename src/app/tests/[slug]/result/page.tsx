import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTestBySlug } from '@/data/tests';
import { parseShortUrl } from '@/lib/short-urls';
import { getPersonalityTypeById } from '@/data/personality-type-test';
import { getDigitalPersonaById } from '@/data/digital-wellness-test';
import { getEmotionalIntelligenceById } from '@/data/emotional-intelligence-test';
import { impostorSyndromeResults } from '@/data/impostor-syndrome-test';
import { psychologicalResilienceResults } from '@/data/mental-resilience-test';
import { dopamineDetoxResults } from '@/data/dopamine-detox-test';
import UniversalTestResults from '@/components/tests/UniversalTestResults';
import { YandexAd } from '@/components/shared/YandexAd';
import { loadTest, UniversalTestResult } from '@/lib/test-loader';
import { recoverTestResult } from '@/lib/result-recovery';

// Универсальный тип результата теста
interface UniversalTestResult {
  name: string;
  description: string;
  emoji: string;
  color: string;
  percentage: number;
  characteristics: string[];
  advice: string[];
  chartData?: unknown[];
  chartType?: 'bar' | 'pie' | 'radar';
  factorScores?: { [key: string]: number };
  factorDescriptions?: {
    [key: string]: {
      high: string;
      medium: string;
      low: string;
    };
  };
  methodology?: {
    title: string;
    description: string;
    applications: string[];
    notes: string[];
  };
  detailedFactors?: Array<{
    name: string;
    score: number;
    level: 'high' | 'medium' | 'low';
    description: string;
    icon?: string;
    color?: string;
  }>;
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const search = await searchParams;
  const test = getTestBySlug(slug);
  const urlData = parseShortUrl(new URLSearchParams(search as Record<string, string>));

  if (!test || !urlData) {
    return {
      title: 'Результат не найден',
    };
  }

  return {
    title: `${urlData.resultType} - Результат теста "${test.title}"`,
    description: `Результат прохождения теста "${test.title}". Пройдите тест и узнайте свой результат!`,
  };
}

export default async function ShortResultPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const search = await searchParams;
  const test = getTestBySlug(slug);
  const urlData = parseShortUrl(new URLSearchParams(search as Record<string, string>));

  if (!test || !urlData) {
    notFound();
  }

  // Восстанавливаем результат из короткой ссылки
  let result: UniversalTestResult | null = null;

  // Пытаемся загрузить тест для новых тестов
  const isLegacyTest = ['personality-type', 'digital-wellness-persona', 'emotional-intelligence', 
                       'impostor-syndrome', 'mental-resilience', 'dopamine-detox-need'].includes(slug);
  
  if (!isLegacyTest) {
    // Для новых тестов используем универсальный загрузчик
    try {
      const testData = await loadTest(test);
      
      // Используем универсальную функцию восстановления результатов
      result = recoverTestResult(slug, urlData, testData);
    } catch (error) {
      console.error('Failed to load test data:', error);
    }
  } else if (slug === 'personality-type') {
    // Для теста личности восстанавливаем из типа и оценок
    const personalityResult = getPersonalityTypeById(urlData.resultType);
    if (!personalityResult) {
      notFound();
    }
    
    // Если scores отсутствуют, используем значения по умолчанию для типа
    const defaultScores = urlData.scores || [50, 50, 50, 50, 50];

    // Восстанавливаем оценки Big Five
    const [extraversion, agreeableness, conscientiousness, neuroticism, openness] = defaultScores;
    const scores = {
      extraversion,
      agreeableness,
      conscientiousness,
      neuroticism,
      openness,
    };

    // Генерируем данные для графика
    const chartData = [
      { factor: 'Экстраверсия', value: extraversion },
      { factor: 'Доброжелательность', value: agreeableness },
      { factor: 'Добросовестность', value: conscientiousness },
      { factor: 'Эмоциональная стабильность', value: 100 - neuroticism },
      { factor: 'Открытость опыту', value: openness },
    ];

    // Определяем уровень для каждого фактора
    const getFactorLevel = (score: number): 'high' | 'medium' | 'low' => {
      if (score >= 70) return 'high';
      if (score >= 40) return 'medium';
      return 'low';
    };

    // Описания факторов
    const factorDescriptions = {
      extraversion: {
        high: 'Вы общительны, энергичны и получаете энергию от взаимодействия с людьми. Любите быть в центре внимания и легко заводите новые знакомства.',
        medium:
          'Вы сбалансированы в социальном плане - можете наслаждаться как общением, так и одиночеством, в зависимости от ситуации.',
        low: 'Вы предпочитаете тишину и уединение, тщательно выбираете круг общения. Получаете энергию от времени, проведенного наедине с собой.',
      },
      agreeableness: {
        high: 'Вы эмпатичны, отзывчивы и стремитесь помогать другим. Цените гармонию в отношениях и легко идете на компромиссы.',
        medium:
          'Вы умеете находить баланс между заботой о других и защитой собственных интересов. Проявляете здоровый скептицизм.',
        low: 'Вы независимы, прямолинейны и ставите свои цели выше желания нравиться. Цените честность больше дипломатии.',
      },
      conscientiousness: {
        high: 'Вы организованны, дисциплинированы и всегда доводите дела до конца. Любите порядок и планирование.',
        medium:
          'Вы способны быть организованными при необходимости, но также цените спонтанность и гибкость в подходах.',
        low: 'Вы предпочитаете гибкость и спонтанность строгому планированию. Любите импровизировать и адаптироваться на ходу.',
      },
      neuroticism: {
        high: 'Вы эмоционально стабильны, спокойны в стрессовых ситуациях и обладаете устойчивым настроением.',
        medium:
          'Ваша эмоциональная стабильность варьируется в зависимости от обстоятельств. Иногда стресс может повлиять на вас.',
        low: 'Вы чувствительны к стрессу и можете переживать эмоциональные колебания. Важно развивать стратегии управления стрессом.',
      },
      openness: {
        high: 'Вы любопытны, креативны и открыты новому опыту. Цените искусство, идеи и нестандартное мышление.',
        medium:
          'Вы открыты новому, но также цените проверенные подходы. Умеете совмещать творчество с практичностью.',
        low: 'Вы предпочитаете традиционные подходы и проверенные методы. Цените стабильность и предсказуемость.',
      },
    };

    // Создаем детальные факторы
    const detailedFactors = [
      {
        name: 'Экстраверсия',
        score: scores.extraversion,
        level: getFactorLevel(scores.extraversion),
        description: factorDescriptions.extraversion[getFactorLevel(scores.extraversion)],
        icon: 'Users',
        color: 'chart-1',
      },
      {
        name: 'Доброжелательность',
        score: scores.agreeableness,
        level: getFactorLevel(scores.agreeableness),
        description: factorDescriptions.agreeableness[getFactorLevel(scores.agreeableness)],
        icon: 'Heart',
        color: 'chart-2',
      },
      {
        name: 'Добросовестность',
        score: scores.conscientiousness,
        level: getFactorLevel(scores.conscientiousness),
        description: factorDescriptions.conscientiousness[getFactorLevel(scores.conscientiousness)],
        icon: 'Target',
        color: 'chart-3',
      },
      {
        name: 'Эмоциональная стабильность',
        score: 100 - scores.neuroticism,
        level: getFactorLevel(100 - scores.neuroticism),
        description: factorDescriptions.neuroticism[getFactorLevel(100 - scores.neuroticism)],
        icon: 'Shield',
        color: 'chart-4',
      },
      {
        name: 'Открытость опыту',
        score: scores.openness,
        level: getFactorLevel(scores.openness),
        description: factorDescriptions.openness[getFactorLevel(scores.openness)],
        icon: 'Sparkles',
        color: 'chart-5',
      },
    ];

    result = {
      name: personalityResult.name,
      description: personalityResult.description,
      emoji: personalityResult.emoji,
      color:
        personalityResult.color === 'var(--chart-1)'
          ? 'yellow'
          : personalityResult.color === 'var(--chart-2)'
            ? 'blue'
            : personalityResult.color === 'var(--chart-3)'
              ? 'green'
              : personalityResult.color === 'var(--chart-4)'
                ? 'purple'
                : personalityResult.color === 'var(--chart-5)'
                  ? 'orange'
                  : 'blue',
      percentage: 15,
      characteristics: personalityResult.characteristics,
      advice: personalityResult.advice,
      chartData: chartData,
      chartType: 'radar',
      factorScores: scores,
      detailedFactors: detailedFactors,
      factorDescriptions: factorDescriptions,
      methodology: {
        title: 'О модели Big Five',
        description:
          'Модель Big Five (Большая Пятерка) - это научно обоснованная система описания личности, основанная на пяти ключевых факторах. Эта модель широко используется в психологии и признана одной из наиболее валидных и надежных систем оценки личностных черт.',
        applications: [
          'Карьерное планирование',
          'Командная работа',
          'Личностное развитие',
          'Улучшение отношений',
        ],
        notes: [
          'Личность может изменяться',
          'Нет "правильных" результатов',
          'Все типы имеют сильные стороны',
          'Результат - основа для развития',
        ],
      },
    };
  } else if (slug === 'digital-wellness-persona') {
    const digitalResult = getDigitalPersonaById(urlData.resultType);
    if (digitalResult) {
      result = {
        name: digitalResult.name,
        description: digitalResult.description,
        emoji: digitalResult.emoji,
        color: digitalResult.color,
        percentage: digitalResult.percentage,
        characteristics: digitalResult.characteristics || [],
        advice: digitalResult.advice || [],
      };
    }
  } else if (slug === 'emotional-intelligence') {
    const emotionalResult = getEmotionalIntelligenceById(urlData.resultType);
    if (emotionalResult) {
      result = {
        name: emotionalResult.name,
        description: emotionalResult.description,
        emoji: emotionalResult.emoji,
        color: emotionalResult.color,
        percentage: 20, // Добавляем значение по умолчанию
        characteristics: emotionalResult.characteristics || [],
        advice: emotionalResult.advice || [],
      };
    }
  } else if (slug === 'impostor-syndrome') {
    const impostorResult = impostorSyndromeResults.find((r) => r.id === urlData.resultType);
    if (impostorResult) {
      // Generate chartData if not present
      const chartData = impostorResult.chartData?.length
        ? impostorResult.chartData
        : [
            {
              factor: 'Сомнения в себе',
              value: Math.round(impostorResult.factors?.selfDoubt || 50),
            },
            {
              factor: 'Страх разоблачения',
              value: Math.round(impostorResult.factors?.fearOfExposure || 50),
            },
            {
              factor: 'Приписывание везению',
              value: Math.round(impostorResult.factors?.attributionToLuck || 50),
            },
            {
              factor: 'Перфекционизм',
              value: Math.round(impostorResult.factors?.perfectionism || 50),
            },
            {
              factor: 'Сомнения в компетенции',
              value: Math.round(impostorResult.factors?.competenceDoubt || 50),
            },
          ];

      result = {
        name: impostorResult.title,
        description: impostorResult.description,
        emoji: impostorResult.emoji,
        color: impostorResult.color === 'red' ? 'orange' : (impostorResult.color || 'yellow'),
        percentage: 15, // Добавляем значение по умолчанию
        characteristics: impostorResult.characteristics || [],
        advice: impostorResult.advice || [],
        chartData: chartData,
        chartType: 'radar',
        factorScores: impostorResult.factors,
      };
    }
  } else if (slug === 'mental-resilience') {
    const resilienceResult = psychologicalResilienceResults.find(
      (r) => r.id === urlData.resultType
    );
    if (resilienceResult) {
      // Generate chartData if factors present
      let chartData;
      if (resilienceResult.factors) {
        chartData = [
          {
            factor: 'Адаптивность',
            value: Math.round(resilienceResult.factors.adaptability || 50),
          },
          {
            factor: 'Эмоциональная регуляция',
            value: Math.round(resilienceResult.factors.emotionalRegulation || 50),
          },
          { factor: 'Оптимизм', value: Math.round(resilienceResult.factors.optimism || 50) },
          {
            factor: 'Решение проблем',
            value: Math.round(resilienceResult.factors.problemSolving || 50),
          },
          {
            factor: 'Социальная поддержка',
            value: Math.round(resilienceResult.factors.socialSupport || 50),
          },
        ];
      }

      result = {
        name: resilienceResult.name,
        description: resilienceResult.description,
        emoji: resilienceResult.emoji,
        color: resilienceResult.color,
        percentage: 20, // Добавляем значение по умолчанию
        characteristics: resilienceResult.characteristics || [],
        advice: resilienceResult.advice || [],
        chartData: chartData,
        chartType: chartData ? 'radar' : undefined,
        factorScores: resilienceResult.factors,
      };
    }
  } else if (slug === 'dopamine-detox-need') {
    const dopamineResult = dopamineDetoxResults.find((r) => r.id === urlData.resultType);
    if (dopamineResult) {
      // Generate chartData if factors present
      let chartData;
      if (dopamineResult.factors) {
        chartData = [
          {
            factor: 'Цифровая зависимость',
            value: Math.round(dopamineResult.factors.digitalAddiction || 50),
          },
          {
            factor: 'Мгновенное удовлетворение',
            value: Math.round(dopamineResult.factors.instantGratification || 50),
          },
          {
            factor: 'Фокус и концентрация',
            value: Math.round(dopamineResult.factors.focusConcentration || 50),
          },
          {
            factor: 'Прокрастинация',
            value: Math.round(dopamineResult.factors.procrastination || 50),
          },
          {
            factor: 'Поиск вознаграждений',
            value: Math.round(dopamineResult.factors.rewardSeeking || 50),
          },
        ];
      }

      result = {
        name: dopamineResult.name,
        description: dopamineResult.description,
        emoji: dopamineResult.emoji,
        color: dopamineResult.color,
        percentage: 10, // Добавляем значение по умолчанию
        characteristics: dopamineResult.characteristics || [],
        advice: dopamineResult.advice || [],
        chartData: chartData,
        chartType: chartData ? 'radar' : undefined,
        factorScores: dopamineResult.factors,
      };
    }
  } else {
    notFound();
  }

  if (!result) {
    notFound();
  }

  // Примерные ответы для совместимости (в реальности не используются для отображения)
  const dummyAnswers: number[] = [];

  return (
    <div className="min-h-screen bg-secondary-background relative">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px),
                        repeating-linear-gradient(90deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px)`,
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="px-4 py-8">
          {/* Main content with padding for ad */}
          <div className="lg:pr-[332px]">
            <UniversalTestResults test={test} result={result} answers={dummyAnswers} />
          </div>
        </div>
        
        {/* Fixed Advertisement */}
        <div className="hidden lg:block fixed top-8 right-8 w-[300px]" 
             style={{ right: 'max(2rem, calc((100vw - 80rem) / 2 + 2rem))' }}>
          <div className="border-2 border-border bg-background p-4 shadow-shadow">
            <p className="text-sm font-bold uppercase mb-4 text-center">Реклама</p>
            <YandexAd blockId="R-A-17138338-1" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
