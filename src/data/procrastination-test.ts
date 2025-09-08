/**
 * Тест на прокрастинацию
 * Определяет уровень прокрастинации и ее причины
 */

export interface ProcrastinationQuestion {
  id: string;
  text: string;
  category: 'avoidance' | 'perfectionism' | 'time_management' | 'motivation' | 'fear';
  options: {
    text: string;
    score: number; // 1 (никогда) до 5 (всегда)
  }[];
}

export interface ProcrastinationResult {
  level: 'minimal' | 'mild' | 'moderate' | 'high' | 'severe';
  score: number; // от 20 до 100
  percentage: number; // 0-100
  title: string;
  description: string;
  category_scores: {
    avoidance: number;
    perfectionism: number;
    time_management: number;
    motivation: number;
    fear: number;
  };
  main_causes: string[];
  consequences: string[];
  strategies: string[];
  immediate_steps: string[];
  long_term_plan: string[];
  warning_signs: string[];
}

export const procrastinationQuestions: ProcrastinationQuestion[] = [
  {
    id: '1',
    text: 'Я откладываю выполнение важных задач до последнего момента',
    category: 'avoidance',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '2',
    text: 'Мне трудно начать работу над проектом из-за желания сделать всё идеально',
    category: 'perfectionism',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '3',
    text: 'Я плохо планирую своё время и недооцениваю, сколько времени займут задачи',
    category: 'time_management',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '4',
    text: 'Мне трудно найти мотивацию для выполнения скучных или неинтересных задач',
    category: 'motivation',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '5',
    text: 'Я избегаю задач, которые могут закончиться неудачей',
    category: 'fear',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '6',
    text: 'Я отвлекаюсь на социальные сети, когда должен работать',
    category: 'avoidance',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '7',
    text: 'Я не могу начать задачу, пока не найду "идеальный" момент',
    category: 'perfectionism',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '8',
    text: 'Я часто недооцениваю сложность задач при планировании',
    category: 'time_management',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '9',
    text: 'Мне нужна внешняя мотивация (дедлайны, давление) чтобы что-то делать',
    category: 'motivation',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '10',
    text: 'Я боюсь, что результат моей работы будет недостаточно хорош',
    category: 'fear',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '11',
    text: 'Я делаю множество мелких дел, чтобы избежать важных задач',
    category: 'avoidance',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '12',
    text: 'Я трачу слишком много времени на подготовку и планирование вместо выполнения',
    category: 'perfectionism',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '13',
    text: 'Я работаю наиболее эффективно в последний момент перед дедлайном',
    category: 'time_management',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '14',
    text: 'Мне трудно работать над задачами, которые не приносят немедленного удовлетворения',
    category: 'motivation',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '15',
    text: 'Я боюсь критики и поэтому откладываю показ своей работы другим',
    category: 'fear',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '16',
    text: 'Я говорю себе: "Я лучше работаю под давлением" как оправдание откладывания',
    category: 'avoidance',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '17',
    text: 'Я переделываю работу снова и снова, вместо того чтобы считать её законченной',
    category: 'perfectionism',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '18',
    text: 'Я плохо оцениваю приоритеты и часто занимаюсь менее важными делами',
    category: 'time_management',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '19',
    text: 'Мне трудно начать работу, если я не чувствую себя "в настроении"',
    category: 'motivation',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  },
  {
    id: '20',
    text: 'Я откладываю задачи из-за страха, что не справлюсь с ними',
    category: 'fear',
    options: [
      { text: 'Никогда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Иногда', score: 3 },
      { text: 'Часто', score: 4 },
      { text: 'Всегда', score: 5 }
    ]
  }
];

export const calculateProcrastinationResult = (answers: Record<string, number>): ProcrastinationResult => {
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const percentage = Math.round(((totalScore - 20) / 80) * 100);
  
  // Подсчет баллов по категориям
  const category_scores = {
    avoidance: 0,
    perfectionism: 0,
    time_management: 0,
    motivation: 0,
    fear: 0
  };

  const categoryCount = {
    avoidance: 0,
    perfectionism: 0,
    time_management: 0,
    motivation: 0,
    fear: 0
  };

  procrastinationQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      category_scores[question.category] += answer;
      categoryCount[question.category]++;
    }
  });

  // Нормализуем оценки по категориям
  Object.keys(category_scores).forEach((category) => {
    const key = category as keyof typeof category_scores;
    category_scores[key] = Math.round((category_scores[key] / categoryCount[key]) * 100 / 5);
  });

  let level: 'minimal' | 'mild' | 'moderate' | 'high' | 'severe';
  let title: string;
  let description: string;
  let main_causes: string[];
  let consequences: string[];
  let strategies: string[];
  let immediate_steps: string[];
  let long_term_plan: string[];
  let warning_signs: string[];

  // Определяем основные причины прокрастинации
  const topCauses = Object.entries(category_scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const causeMap = {
    avoidance: 'Избегание неприятных задач',
    perfectionism: 'Перфекционизм',
    time_management: 'Плохое управление временем',
    motivation: 'Недостаток мотивации',
    fear: 'Страх неудачи или критики'
  };

  main_causes = topCauses.map(([cause]) => causeMap[cause as keyof typeof causeMap]);

  if (totalScore <= 35) {
    level = 'minimal';
    title = 'Минимальная прокрастинация';
    description = 'У вас очень низкий уровень прокрастинации. Вы хорошо управляете своим временем и редко откладываете важные дела. Продолжайте поддерживать эти здоровые привычки!';
    consequences = ['Практически отсутствуют'];
    warning_signs = ['Отсутствуют'];
  } else if (totalScore <= 50) {
    level = 'mild';
    title = 'Легкая прокрастинация';
    description = 'У вас легкий уровень прокрастинации. Иногда вы можете откладывать дела, но в целом справляетесь с задачами в срок. Небольшие улучшения помогут стать еще эффективнее.';
    consequences = [
      'Периодическая спешка',
      'Незначительное снижение качества работы',
      'Легкий стресс перед дедлайнами'
    ];
    warning_signs = [
      'Периодические отвлечения',
      'Иногда работа в последний момент',
      'Небольшое чувство вины за откладывание'
    ];
  } else if (totalScore <= 65) {
    level = 'moderate';
    title = 'Умеренная прокрастинация';
    description = 'У вас умеренный уровень прокрастинации. Вы регулярно откладываете дела, что может влиять на качество работы и уровень стресса. Пора принимать активные меры для изменения этой привычки.';
    consequences = [
      'Регулярная работа в авральном режиме',
      'Снижение качества результатов',
      'Повышенный стресс',
      'Проблемы с самооценкой',
      'Конфликты из-за несоблюдения сроков'
    ];
    warning_signs = [
      'Частые отвлечения на неважные дела',
      'Регулярная работа по ночам',
      'Постоянное чувство вины',
      'Обещания "завтра точно начну"'
    ];
  } else if (totalScore <= 80) {
    level = 'high';
    title = 'Высокая прокрастинация';
    description = 'У вас высокий уровень прокрастинации, который серьезно влияет на вашу продуктивность и благополучие. Откладывание дел стало привычным паттерном поведения. Необходимы кардинальные изменения в подходе к планированию и выполнению задач.';
    consequences = [
      'Постоянный стресс и тревога',
      'Значительное снижение качества работы',
      'Пропуск важных дедлайнов',
      'Проблемы в карьере и отношениях',
      'Хроническое чувство вины и стыда',
      'Снижение самооценки'
    ];
    warning_signs = [
      'Постоянное откладывание важных задач',
      'Работа только под давлением дедлайнов',
      'Избежание сложных проектов',
      'Хроническое опоздание',
      'Потеря контроля над временем'
    ];
  } else {
    level = 'severe';
    title = 'Тяжелая прокрастинация';
    description = 'У вас тяжелый уровень прокрастинации, который парализует вашу способность к действию. Это может указывать на глубокие психологические причины. Настоятельно рекомендуется обратиться к специалисту.';
    consequences = [
      'Полная потеря контроля над временем',
      'Серьезные проблемы в работе/учебе',
      'Разрушение отношений',
      'Депрессивные состояния',
      'Социальная изоляция',
      'Финансовые проблемы'
    ];
    warning_signs = [
      'Полное избегание важных задач',
      'Панические атаки перед дедлайнами',
      'Ложь другим о прогрессе работы',
      'Самосаботаж возможностей',
      'Чувство полного бессилия'
    ];
  }

  // Стратегии борьбы с прокрастинацией
  strategies = [
    'Техника "Помидора" - работа интервалами 25 минут',
    'Разбивание больших задач на мелкие шаги',
    'Правило "2 минут" - делать сразу то, что займет меньше 2 минут',
    'Устранение отвлекающих факторов',
    'Создание системы вознаграждений за выполнение задач',
    'Использование внешней отчетности',
    'Планирование самых сложных задач на утро'
  ];

  immediate_steps = [
    'Выберите одну отложенную задачу и начните прямо сейчас',
    'Установите таймер на 15 минут и работайте над задачей',
    'Уберите телефон и закройте социальные сети',
    'Запишите 3 небольших шага для завершения текущего проекта',
    'Найдите партнера по отчетности'
  ];

  long_term_plan = [
    'Развитие навыков планирования и организации времени',
    'Работа с перфекционизмом и страхом неудачи',
    'Создание устойчивых рабочих привычек',
    'Изучение техник управления стрессом',
    'При необходимости - работа с психологом'
  ];

  return {
    level,
    score: totalScore,
    percentage,
    title,
    description,
    category_scores,
    main_causes,
    consequences,
    strategies,
    immediate_steps,
    long_term_plan,
    warning_signs
  };
};