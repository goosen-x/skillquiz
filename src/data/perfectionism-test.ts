/**
 * Тест на перфекционизм
 * Оценивает уровень перфекционистских тенденций и их влияние на жизнь
 */

export interface PerfectionismQuestion {
  id: string;
  text: string;
  category: 'self_oriented' | 'other_oriented' | 'socially_prescribed' | 'adaptive' | 'maladaptive';
  options: {
    text: string;
    score: number; // 1 (совершенно не согласен) до 5 (полностью согласен)
  }[];
}

export interface PerfectionismResult {
  overall_level: 'low' | 'moderate' | 'high' | 'extreme';
  total_score: number; // от 25 до 125
  percentage: number; // 0-100
  title: string;
  description: string;
  perfectionism_type: 'healthy' | 'unhealthy' | 'mixed';
  category_scores: {
    self_oriented: number;      // Перфекционизм, ориентированный на себя
    other_oriented: number;     // Перфекционизм, ориентированный на других
    socially_prescribed: number; // Социально предписанный перфекционизм
    adaptive: number;           // Адаптивный перфекционизм
    maladaptive: number;        // Дезадаптивный перфекционизм
  };
  strengths: string[];
  challenges: string[];
  impact_areas: string[];
  coping_strategies: string[];
  therapy_recommendations: string[];
  warning_signs: string[];
  healthy_standards: string[];
}

export const perfectionismQuestions: PerfectionismQuestion[] = [
  {
    id: '1',
    text: 'Я устанавливаю для себя очень высокие стандарты',
    category: 'self_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '2',
    text: 'Мне трудно чувствовать удовлетворение от своих достижений',
    category: 'maladaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '3',
    text: 'Я ожидаю от других людей высокого качества работы',
    category: 'other_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '4',
    text: 'Другие люди ожидают от меня совершенства',
    category: 'socially_prescribed',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '5',
    text: 'Мне нравится работать на высоком уровне качества',
    category: 'adaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '6',
    text: 'Я часто откладываю выполнение задач из-за страха сделать их неидеально',
    category: 'maladaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '7',
    text: 'Если я не могу сделать что-то идеально, я предпочитаю не делать это вообще',
    category: 'self_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '8',
    text: 'Я раздражаюсь, когда другие делают работу не так хорошо, как я ожидаю',
    category: 'other_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '9',
    text: 'Мне кажется, что люди ожидают от меня больше, чем от других',
    category: 'socially_prescribed',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '10',
    text: 'Я получаю удовлетворение от выполнения сложных задач на высоком уровне',
    category: 'adaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '11',
    text: 'Даже небольшие ошибки сильно расстраивают меня',
    category: 'maladaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '12',
    text: 'Я трачу много времени на проверку и перепроверку своей работы',
    category: 'self_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '13',
    text: 'Я критикую других за небрежность в работе',
    category: 'other_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '14',
    text: 'Я чувствую давление соответствовать ожиданиям окружающих',
    category: 'socially_prescribed',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '15',
    text: 'Мне нравится ставить перед собой амбициозные цели',
    category: 'adaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '16',
    text: 'Я боюсь делать ошибки',
    category: 'maladaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '17',
    text: 'Моя самооценка зависит от того, насколько хорошо я выполняю задачи',
    category: 'self_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '18',
    text: 'Мне сложно работать с людьми, которые не разделяют мои стандарты качества',
    category: 'other_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '19',
    text: 'Если я не оправдаю чьих-то ожиданий, я чувствую себя неудачником',
    category: 'socially_prescribed',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '20',
    text: 'Я умею находить баланс между качеством и эффективностью',
    category: 'adaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '21',
    text: 'Я часто переделываю работу, чтобы она была "идеальной"',
    category: 'maladaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '22',
    text: 'Мне трудно принимать помощь других, потому что они могут сделать не так хорошо',
    category: 'self_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '23',
    text: 'Я легко замечаю недостатки в работе других людей',
    category: 'other_oriented',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '24',
    text: 'Я беспокоюсь о том, что подумают другие, если увидят мои несовершенства',
    category: 'socially_prescribed',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  },
  {
    id: '25',
    text: 'Я могу признать свои ошибки и учиться на них',
    category: 'adaptive',
    options: [
      { text: 'Совершенно не согласен', score: 1 },
      { text: 'Не согласен', score: 2 },
      { text: 'Нейтрально', score: 3 },
      { text: 'Согласен', score: 4 },
      { text: 'Полностью согласен', score: 5 }
    ]
  }
];

export const calculatePerfectionismResult = (answers: Record<string, number>): PerfectionismResult => {
  const total_score = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const percentage = Math.round(((total_score - 25) / 100) * 100);

  // Подсчет баллов по категориям
  const category_scores = {
    self_oriented: 0,
    other_oriented: 0,
    socially_prescribed: 0,
    adaptive: 0,
    maladaptive: 0
  };

  const categoryCount = {
    self_oriented: 0,
    other_oriented: 0,
    socially_prescribed: 0,
    adaptive: 0,
    maladaptive: 0
  };

  perfectionismQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      category_scores[question.category] += answer;
      categoryCount[question.category]++;
    }
  });

  // Нормализуем оценки по категориям
  Object.keys(category_scores).forEach((category) => {
    const key = category as keyof typeof category_scores;
    category_scores[key] = Math.round((category_scores[key] / categoryCount[key]) * 20);
  });

  // Определяем тип перфекционизма
  const adaptive_score = category_scores.adaptive;
  const maladaptive_score = category_scores.maladaptive;
  
  let perfectionism_type: 'healthy' | 'unhealthy' | 'mixed';
  if (adaptive_score > maladaptive_score + 10) {
    perfectionism_type = 'healthy';
  } else if (maladaptive_score > adaptive_score + 10) {
    perfectionism_type = 'unhealthy';
  } else {
    perfectionism_type = 'mixed';
  }

  let overall_level: 'low' | 'moderate' | 'high' | 'extreme';
  let title: string;
  let description: string;
  let strengths: string[];
  let challenges: string[];
  let impact_areas: string[];
  let coping_strategies: string[];
  let therapy_recommendations: string[];
  let warning_signs: string[];
  let healthy_standards: string[];

  if (total_score <= 50) {
    overall_level = 'low';
    title = 'Низкий уровень перфекционизма';
    description = 'У вас низкий уровень перфекционистских тенденций. Вы стремитесь к качеству, но не зацикливаетесь на совершенстве. Вы способны принимать несовершенства как часть жизни и не позволяете им препятствовать вашему прогрессу.';
    strengths = [
      'Гибкость в стандартах',
      'Способность завершать проекты',
      'Принятие несовершенств',
      'Здоровая самооценка',
      'Эффективное использование времени'
    ];
    challenges = [
      'Иногда может не хватать мотивации к совершенствованию',
      'Возможно недооценка важности качества в некоторых областях'
    ];
    warning_signs = ['Минимальные'];
  } else if (total_score <= 75) {
    overall_level = 'moderate';
    title = 'Умеренный уровень перфекционизма';
    description = 'У вас умеренный уровень перфекционизма. Вы стремитесь к высокому качеству, что может быть как преимуществом, так и вызовом. Важно следить, чтобы стремление к совершенству не становилось препятствием для продуктивности и благополучия.';
    strengths = [
      'Высокие стандарты качества',
      'Внимание к деталям',
      'Мотивация к достижениям',
      'Ответственный подход к работе'
    ];
    challenges = [
      'Иногда чрезмерное внимание к деталям',
      'Трудности с делегированием',
      'Склонность к самокритике',
      'Возможное откладывание задач'
    ];
    warning_signs = [
      'Увеличение времени на выполнение задач',
      'Недовольство результатами работы',
      'Стресс при необходимости соблюдать сроки'
    ];
  } else if (total_score <= 100) {
    overall_level = 'high';
    title = 'Высокий уровень перфекционизма';
    description = 'У вас высокий уровень перфекционизма, который может значительно влиять на вашу жизнь. Хотя стремление к совершенству может приводить к высоким достижениям, оно также может вызывать стресс, тревогу и препятствовать эффективности.';
    strengths = [
      'Исключительное качество работы',
      'Высокие стандарты',
      'Детальность и точность',
      'Мотивация к совершенствованию'
    ];
    challenges = [
      'Хроническое недовольство результатами',
      'Прокрастинация из-за страха несовершенства',
      'Высокий уровень стресса',
      'Трудности с делегированием',
      'Проблемы в отношениях из-за высоких ожиданий'
    ];
    warning_signs = [
      'Панические атаки перед дедлайнами',
      'Избегание новых вызовов',
      'Социальная изоляция',
      'Выгорание на работе'
    ];
  } else {
    overall_level = 'extreme';
    title = 'Экстремальный перфекционизм';
    description = 'У вас крайне высокий уровень перфекционизма, который может серьезно препятствовать вашему функционированию и благополучию. Стремление к совершенству стало дисфункциональным и требует профессиональной помощи.';
    strengths = [
      'Потенциально исключительное качество работы (когда удается завершить)',
      'Высокие стандарты могут вдохновлять других'
    ];
    challenges = [
      'Парализующий страх несовершенства',
      'Хроническая прокрастинация',
      'Серьезные проблемы с самооценкой',
      'Невозможность завершить проекты',
      'Серьезные проблемы в отношениях',
      'Высокий риск депрессии и тревоги'
    ];
    warning_signs = [
      'Полная неспособность завершать проекты',
      'Суицидальные мысли из-за "неудач"',
      'Полная социальная изоляция',
      'Злоупотребление веществами',
      'Серьезные проблемы на работе/учебе'
    ];
  }

  // Области влияния
  impact_areas = [
    'Работа и карьера',
    'Академические достижения',
    'Отношения с семьей и друзьями',
    'Творческая деятельность',
    'Физическое и психическое здоровье',
    'Самооценка и самоценность'
  ];

  // Стратегии преодоления
  if (overall_level === 'low' || overall_level === 'moderate') {
    coping_strategies = [
      'Устанавливайте реалистичные сроки',
      'Практикуйте принцип "достаточно хорошо"',
      'Отмечайте прогресс, а не только идеальные результаты',
      'Изучайте техники управления временем'
    ];
    therapy_recommendations = [
      'Коучинг по продуктивности',
      'Группы поддержки для амбициозных людей'
    ];
  } else {
    coping_strategies = [
      'Когнитивная реструктуризация негативных мыслей',
      'Техники принятия несовершенства',
      'Постановка процессуальных целей вместо результативных',
      'Практика самосострадания',
      'Техники заземления при тревоге'
    ];
    therapy_recommendations = [
      'Когнитивно-поведенческая терапия (КПТ)',
      'Терапия принятия и обязательств (ACT)',
      'Mindfulness-based терапия',
      'EMDR при травматических причинах перфекционизма'
    ];
  }

  // Здоровые стандарты
  healthy_standards = [
    'Стремитесь к прогрессу, а не к совершенству',
    'Устанавливайте реалистичные и достижимые цели',
    'Принимайте ошибки как часть процесса обучения',
    'Сосредотачивайтесь на усилиях, а не только на результатах',
    'Практикуйте самосострадание при неудачах',
    'Различайте важные и неважные детали',
    'Устанавливайте временные границы для задач',
    'Празднуйте промежуточные достижения'
  ];

  return {
    overall_level,
    total_score,
    percentage,
    title,
    description,
    perfectionism_type,
    category_scores,
    strengths,
    challenges,
    impact_areas,
    coping_strategies,
    therapy_recommendations,
    warning_signs,
    healthy_standards
  };
};