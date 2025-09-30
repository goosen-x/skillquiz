/**
 * Тест на стили принятия решений
 * Определяет предпочитаемый способ принятия решений в различных ситуациях
 */

export interface DecisionMakingQuestion {
  id: string;
  text: string;
  scenario: 'work' | 'personal' | 'financial' | 'relationships' | 'crisis';
  options: {
    text: string;
    analytical: number; // Аналитический стиль
    intuitive: number; // Интуитивный стиль
    directive: number; // Директивный стиль
    conceptual: number; // Концептуальный стиль
  }[];
}

export interface DecisionMakingResult {
  primary_style: 'analytical' | 'intuitive' | 'directive' | 'conceptual';
  secondary_style?: 'analytical' | 'intuitive' | 'directive' | 'conceptual';
  scores: {
    analytical: number;
    intuitive: number;
    directive: number;
    conceptual: number;
  };
  percentages: {
    analytical: number;
    intuitive: number;
    directive: number;
    conceptual: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  decision_process: string[];
  ideal_conditions: string[];
  stress_response: string[];
  development_tips: string[];
  compatible_roles: string[];
  potential_biases: string[];
}

export const decisionMakingQuestions: DecisionMakingQuestion[] = [
  {
    id: '1',
    text: 'При выборе нового места работы вы в первую очередь:',
    scenario: 'work',
    options: [
      {
        text: 'Тщательно анализируете зарплату, льготы, перспективы роста',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Слушаете свои внутренние ощущения об атмосфере компании',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Быстро принимаете решение на основе ключевых факторов',
        analytical: 0,
        intuitive: 1,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Рассматриваете, как это повлияет на ваши долгосрочные цели',
        analytical: 1,
        intuitive: 0,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '2',
    text: 'Когда нужно решить финансовый вопрос, вы:',
    scenario: 'financial',
    options: [
      {
        text: 'Изучаете все доступные данные и варианты',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Полагаетесь на интуицию и предыдущий опыт',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Принимаете решение быстро, основываясь на очевидных фактах',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Думаете о том, как это впишется в вашу общую стратегию',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '3',
    text: 'В критической ситуации на работе вы склонны:',
    scenario: 'crisis',
    options: [
      {
        text: 'Собирать максимум информации перед действием',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Действовать на основе первых впечатлений и инстинктов',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Быстро определить приоритеты и начать действовать',
        analytical: 0,
        intuitive: 1,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Искать творческие и нестандартные решения',
        analytical: 1,
        intuitive: 0,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '4',
    text: 'При планировании отпуска вы обычно:',
    scenario: 'personal',
    options: [
      {
        text: 'Детально исследуете варианты, сравниваете цены и отзывы',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Выбираете место, которое "чувствуется" правильным',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Быстро выбираете проверенный или рекомендованный вариант',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете уникальные и необычные варианты путешествий',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '5',
    text: 'Когда возникает конфликт в отношениях, вы:',
    scenario: 'relationships',
    options: [
      {
        text: 'Анализируете причины и ищете логичное решение',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Полагаетесь на эмоциональное понимание ситуации',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Прямо обозначаете проблему и предлагаете решение',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете способы трансформировать отношения',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '6',
    text: 'При выборе нового руководителя команды вы оцениваете:',
    scenario: 'work',
    options: [
      {
        text: 'Квалификацию, опыт и достижения кандидата',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Совместимость с командой и лидерский потенциал',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Способность принимать быстрые и четкие решения',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Видение будущего и способность к инновациям',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '7',
    text: 'Когда нужно инвестировать деньги, вы:',
    scenario: 'financial',
    options: [
      {
        text: 'Тщательно изучаете рынки, риски и доходность',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Инвестируете в то, что кажется многообещающим',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Выбираете простые и надежные инструменты',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете инновационные и перспективные направления',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '8',
    text: 'При выборе места для проживания вы учитываете:',
    scenario: 'personal',
    options: [
      {
        text: 'Цены, инфраструктуру, транспортную доступность',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Ощущения от места и совместимость с образом жизни',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Практичность и соответствие текущим потребностям',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Потенциал развития района и долгосрочные перспективы',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '9',
    text: 'Когда команда не может договориться, вы:',
    scenario: 'work',
    options: [
      {
        text: 'Предлагаете проанализировать все варианты систематически',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Пытаетесь почувствовать настроение группы и найти консенсус',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Принимаете решение на основе имеющейся информации',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете компромисс или альтернативное решение',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '10',
    text: 'Перед крупной покупкой вы:',
    scenario: 'financial',
    options: [
      {
        text: 'Сравниваете характеристики, цены и отзывы',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Покупаете то, что сразу понравилось',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Выбираете проверенный бренд или модель',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете что-то уникальное или инновационное',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '11',
    text: 'В стрессовой ситуации вы принимаете решения:',
    scenario: 'crisis',
    options: [
      {
        text: 'Стараетесь собрать больше информации, несмотря на время',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Полагаетесь на интуицию и первые импульсы',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Действуете быстро на основе очевидных фактов',
        analytical: 0,
        intuitive: 1,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете нестандартные пути выхода из ситуации',
        analytical: 1,
        intuitive: 0,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '12',
    text: 'При выборе партнера для серьезных отношений вы:',
    scenario: 'relationships',
    options: [
      {
        text: 'Анализируете совместимость по важным критериям',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Слушаете свое сердце и эмоциональную связь',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Оцениваете практические аспекты отношений',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Ищете кого-то, кто разделяет ваши мечты и видение',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '13',
    text: 'При планировании карьеры вы:',
    scenario: 'work',
    options: [
      {
        text: 'Исследуете рынок труда, требования и перспективы',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Следуете за тем, что вас действительно увлекает',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Ставите четкие цели и планируете шаги к ним',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Думаете о том, как создать уникальный карьерный путь',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '14',
    text: 'Когда нужно выбрать способ решения проблемы, вы:',
    scenario: 'work',
    options: [
      {
        text: 'Изучаете все возможные методы и их эффективность',
        analytical: 3,
        intuitive: 0,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Выбираете тот, который кажется наиболее правильным',
        analytical: 0,
        intuitive: 3,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Используете проверенный метод, который работал раньше',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Пробуете создать новый подход к проблеме',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
  {
    id: '15',
    text: 'В групповом обсуждении вы обычно:',
    scenario: 'work',
    options: [
      {
        text: 'Предоставляете факты и логическую аргументацию',
        analytical: 3,
        intuitive: 0,
        directive: 1,
        conceptual: 0,
      },
      {
        text: 'Делитесь своими ощущениями и видением ситуации',
        analytical: 0,
        intuitive: 3,
        directive: 0,
        conceptual: 1,
      },
      {
        text: 'Предлагаете конкретные решения и план действий',
        analytical: 1,
        intuitive: 0,
        directive: 3,
        conceptual: 0,
      },
      {
        text: 'Предлагаете альтернативные точки зрения и возможности',
        analytical: 0,
        intuitive: 1,
        directive: 0,
        conceptual: 3,
      },
    ],
  },
];

export const calculateDecisionMakingResult = (
  answers: Record<string, number>
): DecisionMakingResult => {
  const scores = {
    analytical: 0,
    intuitive: 0,
    directive: 0,
    conceptual: 0,
  };

  // Подсчитываем баллы для каждого стиля
  decisionMakingQuestions.forEach((question, _index) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.analytical += option.analytical;
      scores.intuitive += option.intuitive;
      scores.directive += option.directive;
      scores.conceptual += option.conceptual;
    }
  });

  // Находим основной и вторичный стили
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary_style = sortedScores[0][0] as keyof typeof scores;
  const secondary_style =
    sortedScores[1][1] > 0 ? (sortedScores[1][0] as keyof typeof scores) : undefined;

  // Вычисляем проценты
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    analytical: Math.round((scores.analytical / totalScore) * 100),
    intuitive: Math.round((scores.intuitive / totalScore) * 100),
    directive: Math.round((scores.directive / totalScore) * 100),
    conceptual: Math.round((scores.conceptual / totalScore) * 100),
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let challenges: string[];
  let decision_process: string[];
  let ideal_conditions: string[];
  let stress_response: string[];
  let development_tips: string[];
  let compatible_roles: string[];
  let potential_biases: string[];

  switch (primary_style) {
    case 'analytical':
      title = 'Аналитический стиль принятия решений';
      description =
        'Вы предпочитаете тщательно анализировать информацию перед принятием решений. Ваш подход основан на логике, фактах и систематическом изучении всех доступных данных. Вы стремитесь к объективности и рациональности в процессе выбора.';
      characteristics = [
        'Систематический сбор и анализ информации',
        'Логический подход к решению проблем',
        'Тщательное взвешивание всех за и против',
        'Предпочтение фактов эмоциям',
        'Стремление к объективности',
        'Детальное планирование',
      ];
      strengths = [
        'Принимаете хорошо обоснованные решения',
        'Минимизируете риски через тщательный анализ',
        'Способны работать со сложной информацией',
        'Высокая точность в оценке альтернатив',
        'Надежность в важных решениях',
      ];
      challenges = [
        'Медленность принятия решений',
        'Паралич анализа при избытке информации',
        'Игнорирование интуитивных факторов',
        'Трудности в ситуациях неопределенности',
        'Возможное упущение возможностей',
      ];
      decision_process = [
        'Определение критериев оценки',
        'Сбор максимального объема информации',
        'Анализ и сравнение альтернатив',
        'Оценка рисков и последствий',
        'Выбор оптимального варианта',
      ];
      ideal_conditions = [
        'Достаточно времени для анализа',
        'Доступ к полной информации',
        'Четкие критерии оценки',
        'Стабильная среда',
        'Возможность консультаций с экспертами',
      ];
      stress_response = [
        'Стремление собрать еще больше информации',
        'Замедление процесса принятия решений',
        'Повышенная тревожность при неопределенности',
        'Откладывание решений до последнего момента',
      ];
      development_tips = [
        'Учитесь устанавливать временные рамки для анализа',
        'Развивайте доверие к интуиции',
        'Практикуйте принятие решений в условиях неполной информации',
        'Изучайте техники быстрого анализа',
        'Учитесь принимать "достаточно хорошие" решения',
      ];
      compatible_roles = [
        'Аналитик данных',
        'Финансовый консультант',
        'Исследователь',
        'Стратегический планировщик',
        'Риск-менеджер',
      ];
      potential_biases = [
        'Паралич анализа',
        'Переоценка важности данных',
        'Игнорирование эмоциональных факторов',
        'Консерватизм в выборе',
      ];
      break;

    case 'intuitive':
      title = 'Интуитивный стиль принятия решений';
      description =
        'Вы полагаетесь на интуицию, эмоции и внутренние ощущения при принятии решений. Ваш подход основан на накопленном опыте, эмоциональном интеллекте и способности "чувствовать" правильные решения.';
      characteristics = [
        'Доверие внутренним ощущениям',
        'Быстрое принятие решений',
        'Учет эмоциональных факторов',
        'Использование накопленного опыта',
        'Гибкость в изменении решений',
        'Внимание к межличностным аспектам',
      ];
      strengths = [
        'Быстрота принятия решений',
        'Способность работать в условиях неопределенности',
        'Учет человеческого фактора',
        'Гибкость и адаптивность',
        'Креативные решения',
      ];
      challenges = [
        'Субъективность и предвзятость',
        'Недостаток систематичности',
        'Трудности в обосновании решений',
        'Возможные импульсивные ошибки',
        'Зависимость от настроения',
      ];
      decision_process = [
        'Первоначальное интуитивное впечатление',
        'Оценка эмоциональной реакции',
        'Сравнение с прошлым опытом',
        'Быстрая проверка ключевых факторов',
        'Принятие решения на основе "ощущения"',
      ];
      ideal_conditions = [
        'Знакомые ситуации и контексты',
        'Возможность личного взаимодействия',
        'Гибкие временные рамки',
        'Поддерживающая атмосfera',
        'Минимальное давление',
      ];
      stress_response = [
        'Усиление интуитивных реакций',
        'Поспешные решения',
        'Игнорирование важных фактов',
        'Эмоциональная импульсивность',
      ];
      development_tips = [
        'Развивайте навыки структурированного анализа',
        'Проверяйте интуитивные решения фактами',
        'Изучайте техники критического мышления',
        'Создавайте чек-листы для важных решений',
        'Советуйтесь с аналитическими типами',
      ];
      compatible_roles = [
        'HR-менеджер',
        'Творческий директор',
        'Психолог/коуч',
        'Продавец',
        'Лидер команды',
      ];
      potential_biases = [
        'Подтверждение предрассудков',
        'Эмоциональная предвзятость',
        'Переоценка интуиции',
        'Игнорирование данных',
      ];
      break;

    case 'directive':
      title = 'Директивный стиль принятия решений';
      description =
        'Вы предпочитаете быстрые, четкие и практичные решения. Ваш подход ориентирован на эффективность, результат и немедленное действие. Вы способны принимать решения в условиях ограниченной информации.';
      characteristics = [
        'Скорость принятия решений',
        'Ориентация на результат',
        'Практичный подход',
        'Четкость и решительность',
        'Минимум информации для действия',
        'Контроль над процессом',
      ];
      strengths = [
        'Быстрое реагирование на ситуации',
        'Эффективность в кризисных ситуациях',
        'Способность к лидерству',
        'Практичность решений',
        'Умение действовать под давлением',
      ];
      challenges = [
        'Недостаток тщательного анализа',
        'Игнорирование долгосрочных последствий',
        'Ограниченное рассмотрение альтернатив',
        'Возможная авторитарность',
        'Пренебрежение мнением других',
      ];
      decision_process = [
        'Быстрая оценка ключевых факторов',
        'Определение главного приоритета',
        'Выбор наиболее очевидного решения',
        'Немедленное начало действий',
        'Корректировка по ходу выполнения',
      ];
      ideal_conditions = [
        'Четкие цели и приоритеты',
        'Ограниченное время на решение',
        'Ситуации, требующие быстрых действий',
        'Контроль над ресурсами',
        'Поддержка руководства',
      ];
      stress_response = [
        'Еще более быстрые решения',
        'Усиление контроля',
        'Игнорирование альтернатив',
        'Авторитарное поведение',
      ];
      development_tips = [
        'Учитесь замедляться для важных решений',
        'Развивайте навыки консультации с другими',
        'Изучайте долгосрочные последствия',
        'Практикуйте рассмотрение альтернатив',
        'Учитесь делегировать принятие решений',
      ];
      compatible_roles = [
        'Топ-менеджер',
        'Предприниматель',
        'Военный командир',
        'Кризисный менеджер',
        'Операционный директор',
      ];
      potential_biases = [
        'Поспешные выводы',
        'Переоценка контроля',
        'Недооценка сложности',
        'Игнорирование альтернатив',
      ];
      break;

    case 'conceptual':
      title = 'Концептуальный стиль принятия решений';
      description =
        'Вы склонны к творческому и долгосрочному подходу к принятию решений. Ваш стиль характеризуется поиском инновационных решений, учетом множества альтернатив и стремлением к совершенству.';
      characteristics = [
        'Творческий подход к решению проблем',
        'Долгосрочная перспектива',
        'Рассмотрение множества альтернатив',
        'Стремление к инновациям',
        'Учет мнений других людей',
        'Гибкость в адаптации планов',
      ];
      strengths = [
        'Инновационные и креативные решения',
        'Долгосрочное стратегическое мышление',
        'Способность видеть большую картину',
        'Адаптивность к изменениям',
        'Учет интересов всех заинтересованных сторон',
      ];
      challenges = [
        'Медленность принятия решений',
        'Избыток альтернатив может парализовать',
        'Стремление к совершенству',
        'Недостаток практичности',
        'Трудности с приоритизацией',
      ];
      decision_process = [
        'Генерация множества идей',
        'Консультации с различными экспертами',
        'Оценка долгосрочных последствий',
        'Поиск творческих решений',
        'Постепенное сужение альтернатив',
      ];
      ideal_conditions = [
        'Достаточно времени для размышлений',
        'Доступ к разнообразным мнениям',
        'Поощрение креативности',
        'Гибкие дедлайны',
        'Возможность экспериментировать',
      ];
      stress_response = [
        'Еще большее число альтернатив',
        'Затруднения с завершением процесса',
        'Стремление к идеальному решению',
        'Откладывание окончательного выбора',
      ];
      development_tips = [
        'Учитесь устанавливать приоритеты',
        'Развивайте навыки быстрого прототипирования',
        'Практикуйте принцип "достаточно хорошего"',
        'Создавайте временные рамки для творчества',
        'Изучайте техники структурированного принятия решений',
      ];
      compatible_roles = [
        'Стратегический консультант',
        'Дизайнер',
        'R&D менеджер',
        'Архитектор',
        'Социальный планировщик',
      ];
      potential_biases = [
        'Паралич от избытка выбора',
        'Переоценка новизны',
        'Недооценка практических ограничений',
        'Стремление к совершенству',
      ];
      break;
  }

  return {
    primary_style,
    secondary_style,
    scores,
    percentages,
    title,
    description,
    characteristics,
    strengths,
    challenges,
    decision_process,
    ideal_conditions,
    stress_response,
    development_tips,
    compatible_roles,
    potential_biases,
  };
};
