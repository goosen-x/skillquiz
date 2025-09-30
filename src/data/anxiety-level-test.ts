/**
 * Тест на уровень тревожности
 * Оценивает общий уровень тревоги и её проявления в различных сферах жизни
 */

export interface AnxietyQuestion {
  id: string;
  text: string;
  category: 'physical' | 'emotional' | 'cognitive' | 'behavioral' | 'social';
  options: {
    text: string;
    score: number; // 0 (никогда) до 3 (почти всегда)
  }[];
}

export interface AnxietyResult {
  level: 'minimal' | 'mild' | 'moderate' | 'severe';
  total_score: number; // от 0 до 63
  percentage: number; // 0-100
  title: string;
  description: string;
  category_scores: {
    physical: number;
    emotional: number;
    cognitive: number;
    behavioral: number;
    social: number;
  };
  symptoms: string[];
  triggers: string[];
  coping_strategies: string[];
  professional_help: string[];
  lifestyle_changes: string[];
  warning_signs: string[];
  emergency_resources: string[];
}

export const anxietyQuestions: AnxietyQuestion[] = [
  {
    id: '1',
    text: 'Я чувствую напряжение, беспокойство или нервозность',
    category: 'emotional',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '2',
    text: 'У меня учащается сердцебиение без физической нагрузки',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '3',
    text: 'Я постоянно беспокоюсь о будущем',
    category: 'cognitive',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '4',
    text: 'Я избегаю определенных ситуаций из-за беспокойства',
    category: 'behavioral',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '5',
    text: 'Мне трудно расслабиться и отдыхать',
    category: 'emotional',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '6',
    text: 'У меня потеют ладони или дрожат руки',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '7',
    text: 'Я прокручиваю в голове негативные сценарии развития событий',
    category: 'cognitive',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '8',
    text: 'Мне сложно заводить новые знакомства',
    category: 'social',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '9',
    text: 'У меня проблемы со сном из-за беспокойных мыслей',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '10',
    text: 'Я откладываю важные дела из-за беспокойства',
    category: 'behavioral',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '11',
    text: 'Я чувствую страх без явной причины',
    category: 'emotional',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '12',
    text: 'У меня появляется одышка в стрессовых ситуациях',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '13',
    text: 'Мне сложно сконцентрироваться из-за беспокойных мыслей',
    category: 'cognitive',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '14',
    text: 'Я чувствую неуверенность в социальных ситуациях',
    category: 'social',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '15',
    text: 'У меня бывают головные боли от напряжения',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '16',
    text: 'Я перепроверяю свои действия несколько раз',
    category: 'behavioral',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '17',
    text: 'Я испытываю чувство надвигающейся опасности',
    category: 'emotional',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '18',
    text: 'Я катастрофизирую - представляю худшие исходы',
    category: 'cognitive',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '19',
    text: 'Я боюсь оказаться в центре внимания',
    category: 'social',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '20',
    text: 'У меня бывают мышечные зажимы и напряжение',
    category: 'physical',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
  {
    id: '21',
    text: 'Я ищу постоянные подтверждения от других людей',
    category: 'behavioral',
    options: [
      { text: 'Никогда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти всегда', score: 3 },
    ],
  },
];

export const calculateAnxietyResult = (answers: Record<string, number>): AnxietyResult => {
  const total_score = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxScore = anxietyQuestions.length * 3;
  const percentage = Math.round((total_score / maxScore) * 100);

  // Подсчет баллов по категориям
  const category_scores = {
    physical: 0,
    emotional: 0,
    cognitive: 0,
    behavioral: 0,
    social: 0,
  };

  const categoryCount = {
    physical: 0,
    emotional: 0,
    cognitive: 0,
    behavioral: 0,
    social: 0,
  };

  anxietyQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      category_scores[question.category] += answer;
      categoryCount[question.category]++;
    }
  });

  // Нормализуем оценки по категориям (средний балл)
  Object.keys(category_scores).forEach((category) => {
    const key = category as keyof typeof category_scores;
    category_scores[key] = Math.round(((category_scores[key] / categoryCount[key]) * 100) / 3);
  });

  let level: 'minimal' | 'mild' | 'moderate' | 'severe';
  let title: string;
  let description: string;
  let symptoms: string[];
  let triggers: string[];
  let coping_strategies: string[];
  let professional_help: string[];
  let lifestyle_changes: string[];
  let warning_signs: string[];
  let emergency_resources: string[];

  if (total_score <= 15) {
    level = 'minimal';
    title = 'Минимальный уровень тревожности';
    description =
      'У вас низкий уровень тревожности. Периодические волнения - это нормальная реакция на стрессовые ситуации. Вы хорошо справляетесь с повседневными вызовами и в целом чувствуете себя спокойно.';
    symptoms = ['Редкие эпизоды беспокойства', 'Легкое волнение перед важными событиями'];
    triggers = ['Важные экзамены или презентации', 'Неопределенные ситуации'];
    warning_signs = ['Практически отсутствуют'];
    emergency_resources = ['Не требуются при текущем уровне'];
  } else if (total_score <= 30) {
    level = 'mild';
    title = 'Легкая тревожность';
    description =
      'У вас легкий уровень тревожности. Беспокойство иногда влияет на вашу жизнь, но в целом вы справляетесь с ним самостоятельно. Изучение техник управления стрессом поможет чувствовать себя еще лучше.';
    symptoms = [
      'Периодические волнения',
      'Легкие физические симптомы стресса',
      'Иногда сложности с концентрацией',
      'Небольшие проблемы со сном',
    ];
    triggers = ['Рабочий стресс', 'Социальные ситуации', 'Изменения в жизни', 'Финансовые вопросы'];
    warning_signs = ['Усиление беспокойства', 'Избегание важных дел', 'Ухудшение сна'];
    emergency_resources = ['Горячие линии психологической поддержки'];
  } else if (total_score <= 45) {
    level = 'moderate';
    title = 'Умеренная тревожность';
    description =
      'У вас умеренный уровень тревожности, который заметно влияет на вашу повседневную жизнь. Тревога может мешать работе, отношениям и общему самочувствию. Рекомендуется обратиться к специалисту для получения профессиональной помощи.';
    symptoms = [
      'Частое беспокойство и волнение',
      'Физические симптомы тревоги',
      'Проблемы с концентрацией и памятью',
      'Нарушения сна',
      'Избегание определенных ситуаций',
      'Раздражительность',
    ];
    triggers = [
      'Ежедневный стресс',
      'Межличностные отношения',
      'Рабочие обязанности',
      'Здоровье и безопасность',
      'Будущее и неопределенность',
    ];
    warning_signs = [
      'Панические атаки',
      'Значительное избегание ситуаций',
      'Проблемы в отношениях',
      'Снижение работоспособности',
    ];
    emergency_resources = [
      'Служба экстренной психологической помощи: 051',
      'Телефон доверия: 8-800-2000-122',
      'Кризисные центры в вашем городе',
    ];
  } else {
    level = 'severe';
    title = 'Высокий уровень тревожности';
    description =
      'У вас высокий уровень тревожности, который серьезно влияет на качество жизни. Тревога может парализовать нормальную деятельность и привести к серьезным проблемам. Настоятельно рекомендуется немедленно обратиться к квалифицированному специалисту.';
    symptoms = [
      'Постоянное беспокойство и тревога',
      'Сильные физические симптомы',
      'Панические атаки',
      'Серьезные нарушения сна',
      'Значительное избегание ситуаций',
      'Проблемы с концентрацией',
      'Социальная изоляция',
    ];
    triggers = [
      'Практически любые ситуации',
      'Мысли о будущем',
      'Социальные взаимодействия',
      'Рабочие задачи',
      'Повседневные обязанности',
    ];
    warning_signs = [
      'Суицидальные мысли',
      'Полная неспособность функционировать',
      'Злоупотребление веществами',
      'Самоповреждение',
    ];
    emergency_resources = [
      'НЕМЕДЛЕННО: Служба экстренной психологической помощи: 051',
      'Кризисная линия: 8-800-2000-122',
      'Скорая помощь: 103',
      'Психиатрическая помощь в вашем регионе',
      'Кризисные центры и стационары',
    ];
  }

  // Общие стратегии преодоления
  coping_strategies = [
    'Техники глубокого дыхания',
    'Прогрессивная мышечная релаксация',
    'Медитация и осознанность',
    'Регулярные физические упражнения',
    'Ограничение кофеина и алкоголя',
    'Здоровый режим сна',
  ];

  if (level === 'minimal' || level === 'mild') {
    coping_strategies = [
      ...coping_strategies,
      'Ведение дневника эмоций',
      'Техники когнитивной реструктуризации',
      'Планирование времени для отдыха',
    ];
    professional_help = [
      'Психолог для изучения техник управления стрессом',
      'Групповые занятия по релаксации',
    ];
    lifestyle_changes = [
      'Регулярный режим дня',
      'Сбалансированное питание',
      'Социальная поддержка',
      'Хобби и творчество',
    ];
  } else {
    coping_strategies = [
      ...coping_strategies,
      'Техники заземления при панических атаках',
      'Постепенное преодоление избегания',
      'Построение системы поддержки',
    ];
    professional_help = [
      'Когнитивно-поведенческая терапия (КПТ)',
      'EMDR при травматических триггерах',
      'Медикаментозное лечение при необходимости',
      'Групповая терапия',
    ];
    lifestyle_changes = [
      'Структурированный распорядок дня',
      'Исключение триггеров из окружения',
      'Поддержка близких и друзей',
      'Возможно временное изменение рабочей нагрузки',
    ];
  }

  return {
    level,
    total_score,
    percentage,
    title,
    description,
    category_scores,
    symptoms,
    triggers,
    coping_strategies,
    professional_help,
    lifestyle_changes,
    warning_signs,
    emergency_resources,
  };
};
