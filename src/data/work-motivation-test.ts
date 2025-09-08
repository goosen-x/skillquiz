/**
 * Тест на трудовую мотивацию
 * Определяет основные мотивирующие факторы в профессиональной деятельности
 */

export interface WorkMotivationQuestion {
  id: string;
  text: string;
  category: 'values' | 'preferences' | 'satisfaction' | 'goals' | 'environment';
  options: {
    text: string;
    financial: number;      // Финансовая мотивация
    recognition: number;    // Признание и статус
    autonomy: number;       // Автономия и независимость
    purpose: number;        // Цель и смысл
    growth: number;         // Рост и развитие
    social: number;         // Социальные связи
    security: number;       // Безопасность и стабильность
    achievement: number;    // Достижения и соревнование
  }[];
}

export interface WorkMotivationResult {
  primary_motivation: 'financial' | 'recognition' | 'autonomy' | 'purpose' | 'growth' | 'social' | 'security' | 'achievement';
  secondary_motivation?: 'financial' | 'recognition' | 'autonomy' | 'purpose' | 'growth' | 'social' | 'security' | 'achievement';
  scores: {
    financial: number;
    recognition: number;
    autonomy: number;
    purpose: number;
    growth: number;
    social: number;
    security: number;
    achievement: number;
  };
  percentages: {
    financial: number;
    recognition: number;
    autonomy: number;
    purpose: number;
    growth: number;
    social: number;
    security: number;
    achievement: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  work_values: string[];
  ideal_job_features: string[];
  leadership_style: string[];
  team_dynamics: string[];
  career_advice: string[];
  potential_issues: string[];
  development_suggestions: string[];
  suitable_environments: string[];
  reward_preferences: string[];
}

export const workMotivationQuestions: WorkMotivationQuestion[] = [
  {
    id: '1',
    text: 'Что больше всего мотивирует вас работать усерднее?',
    category: 'values',
    options: [
      {
        text: 'Увеличение зарплаты или бонуса',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 1
      },
      {
        text: 'Публичное признание достижений',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Больше свободы в принятии решений',
        financial: 0, recognition: 0, autonomy: 3, purpose: 0, growth: 1, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Понимание важности своей работы',
        financial: 0, recognition: 0, autonomy: 0, purpose: 3, growth: 1, social: 0, security: 0, achievement: 0
      },
      {
        text: 'Возможность изучить что-то новое',
        financial: 0, recognition: 0, autonomy: 1, purpose: 0, growth: 3, social: 0, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '2',
    text: 'Какая рабочая среда вам больше подходит?',
    category: 'environment',
    options: [
      {
        text: 'Высокооплачиваемая позиция с четкими KPI',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 2
      },
      {
        text: 'Место, где ценят и отмечают успехи',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 2, security: 0, achievement: 1
      },
      {
        text: 'Гибкий график и удаленная работа',
        financial: 0, recognition: 0, autonomy: 3, purpose: 0, growth: 1, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Миссия компании созвучна с вашими ценностями',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Постоянные вызовы и обучение',
        financial: 0, recognition: 1, autonomy: 1, purpose: 0, growth: 3, social: 0, security: 0, achievement: 2
      }
    ]
  },
  {
    id: '3',
    text: 'Что бы вы выбрали из двух равных предложений работы?',
    category: 'preferences',
    options: [
      {
        text: 'Более высокую зарплату',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Престижную должность с признанием',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Больше независимости в работе',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 0, achievement: 0
      },
      {
        text: 'Возможность делать значимую работу',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 0, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Возможности карьерного роста',
        financial: 1, recognition: 1, autonomy: 0, purpose: 0, growth: 3, social: 0, security: 1, achievement: 1
      }
    ]
  },
  {
    id: '4',
    text: 'Как вы предпочитаете получать обратную связь?',
    category: 'preferences',
    options: [
      {
        text: 'Через бонусы и финансовые поощрения',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Публично на собраниях команды',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 2, security: 0, achievement: 1
      },
      {
        text: 'В частном порядке с предоставлением большей свободы',
        financial: 0, recognition: 0, autonomy: 3, purpose: 0, growth: 1, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Через объяснение влияния работы на общие цели',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 0, security: 0, achievement: 0
      },
      {
        text: 'С планом развития и новыми вызовами',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 0, achievement: 2
      }
    ]
  },
  {
    id: '5',
    text: 'Что делает вашу работу наиболее удовлетворительной?',
    category: 'satisfaction',
    options: [
      {
        text: 'Хорошая компенсация за усилия',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Признание коллег и руководства',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 2, security: 0, achievement: 1
      },
      {
        text: 'Контроль над своим рабочим процессом',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Ощущение, что работа имеет смысл',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 0, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Постоянное развитие навыков',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '6',
    text: 'Какой тип команды вам больше подходит?',
    category: 'environment',
    options: [
      {
        text: 'Команда с ясными ролями и справедливой оплатой',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 2, achievement: 0
      },
      {
        text: 'Команда, которая ценит индивидуальные достижения',
        financial: 1, recognition: 3, autonomy: 1, purpose: 0, growth: 0, social: 0, security: 0, achievement: 2
      },
      {
        text: 'Самоуправляемая команда с минимальным контролем',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Команда, объединенная общей миссией',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 2, security: 0, achievement: 0
      },
      {
        text: 'Команда, ориентированная на обучение и развитие',
        financial: 0, recognition: 1, autonomy: 1, purpose: 1, growth: 3, social: 1, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '7',
    text: 'Что вас больше всего демотивирует на работе?',
    category: 'satisfaction',
    options: [
      {
        text: 'Низкая оплата труда',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Отсутствие признания достижений',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Микроменеджмент и отсутствие свободы',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 0, social: 0, security: 0, achievement: 0
      },
      {
        text: 'Бессмысленная работа без видимого результата',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 0, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Отсутствие возможностей для развития',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 1, achievement: 1
      }
    ]
  },
  {
    id: '8',
    text: 'Какую роль вы предпочитаете в проекте?',
    category: 'preferences',
    options: [
      {
        text: 'Роль с четкими результатами и вознаграждением',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 1
      },
      {
        text: 'Видимую роль, где заслуги очевидны',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 2
      },
      {
        text: 'Роль с максимальной свободой действий',
        financial: 0, recognition: 1, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Роль, где я вижу влияние на конечный результат',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Роль, где можно освоить новые навыки',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 1, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '9',
    text: 'Как вы относитесь к рабочим задачам?',
    category: 'values',
    options: [
      {
        text: 'Главное - справедливая оплата за выполненную работу',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Хочу, чтобы мои успехи были замечены',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Предпочитаю работать в своем темпе',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Важно понимать, зачем я это делаю',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 0, security: 0, achievement: 0
      },
      {
        text: 'Каждая задача - возможность чему-то научиться',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '10',
    text: 'Что для вас означает карьерный успех?',
    category: 'goals',
    options: [
      {
        text: 'Высокий доход и финансовая стабильность',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 2, achievement: 1
      },
      {
        text: 'Признание и уважение в профессиональном сообществе',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 1, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Возможность работать на своих условиях',
        financial: 1, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 0, achievement: 0
      },
      {
        text: 'Способность влиять на важные изменения',
        financial: 0, recognition: 1, autonomy: 2, purpose: 3, growth: 1, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Постоянное профессиональное развитие',
        financial: 0, recognition: 1, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 0, achievement: 2
      }
    ]
  },
  {
    id: '11',
    text: 'Какие совещания вы предпочитаете?',
    category: 'environment',
    options: [
      {
        text: 'Совещания по результатам и планам премирования',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 1
      },
      {
        text: 'Совещания, где обсуждают достижения команды',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 2, security: 0, achievement: 1
      },
      {
        text: 'Минимум совещаний, максимум самостоятельности',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Совещания о миссии и влиянии нашей работы',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Совещания по обмену знаниями и планам развития',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 2, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '12',
    text: 'Что вы цените больше всего в руководителе?',
    category: 'environment',
    options: [
      {
        text: 'Справедливое распределение вознаграждений',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Признание заслуг и публичную поддержку',
        financial: 0, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 1
      },
      {
        text: 'Доверие и предоставление свободы действий',
        financial: 0, recognition: 1, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 1, achievement: 0
      },
      {
        text: 'Ясное объяснение целей и важности работы',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Инвестиции в мое профессиональное развитие',
        financial: 1, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 1, achievement: 1
      }
    ]
  },
  {
    id: '13',
    text: 'Как вы предпочитаете решать рабочие проблемы?',
    category: 'preferences',
    options: [
      {
        text: 'Сосредотачиваюсь на финансовых последствиях решений',
        financial: 3, recognition: 0, autonomy: 1, purpose: 0, growth: 0, social: 0, security: 1, achievement: 1
      },
      {
        text: 'Выбираю решения, которые принесут признание',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 0, social: 1, security: 0, achievement: 2
      },
      {
        text: 'Предпочитаю самостоятельно искать решения',
        financial: 0, recognition: 1, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 0, achievement: 1
      },
      {
        text: 'Ищу решения, соответствующие ценностям компании',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 1, security: 0, achievement: 0
      },
      {
        text: 'Рассматриваю проблемы как возможность учиться',
        financial: 0, recognition: 0, autonomy: 1, purpose: 1, growth: 3, social: 1, security: 0, achievement: 2
      }
    ]
  },
  {
    id: '14',
    text: 'Какую корпоративную культуру вы предпочитаете?',
    category: 'environment',
    options: [
      {
        text: 'Культуру результата с четкой системой вознаграждений',
        financial: 3, recognition: 1, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 1, achievement: 2
      },
      {
        text: 'Культуру признания индивидуальных достижений',
        financial: 1, recognition: 3, autonomy: 0, purpose: 0, growth: 1, social: 1, security: 0, achievement: 2
      },
      {
        text: 'Культуру доверия и самоуправления',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 1, security: 1, achievement: 0
      },
      {
        text: 'Культуру служения и социальной ответственности',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 2, security: 0, achievement: 0
      },
      {
        text: 'Культуру обучения и постоянного развития',
        financial: 0, recognition: 1, autonomy: 1, purpose: 1, growth: 3, social: 2, security: 0, achievement: 1
      }
    ]
  },
  {
    id: '15',
    text: 'Что является для вас главным признаком хорошей работы?',
    category: 'goals',
    options: [
      {
        text: 'Стабильный высокий доход',
        financial: 3, recognition: 0, autonomy: 0, purpose: 0, growth: 0, social: 0, security: 2, achievement: 0
      },
      {
        text: 'Возможность блистать и показать себя',
        financial: 1, recognition: 3, autonomy: 1, purpose: 0, growth: 1, social: 1, security: 0, achievement: 2
      },
      {
        text: 'Свобода в принятии решений',
        financial: 0, recognition: 0, autonomy: 3, purpose: 1, growth: 1, social: 0, security: 1, achievement: 1
      },
      {
        text: 'Ощущение важности и нужности работы',
        financial: 0, recognition: 0, autonomy: 1, purpose: 3, growth: 1, social: 2, security: 0, achievement: 0
      },
      {
        text: 'Постоянные вызовы и возможность расти',
        financial: 0, recognition: 1, autonomy: 1, purpose: 1, growth: 3, social: 0, security: 0, achievement: 2
      }
    ]
  }
];

export const calculateWorkMotivationResult = (answers: Record<string, number>): WorkMotivationResult => {
  const scores = {
    financial: 0,
    recognition: 0,
    autonomy: 0,
    purpose: 0,
    growth: 0,
    social: 0,
    security: 0,
    achievement: 0
  };

  // Подсчитываем баллы для каждого типа мотивации
  workMotivationQuestions.forEach((question, index) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.financial += option.financial;
      scores.recognition += option.recognition;
      scores.autonomy += option.autonomy;
      scores.purpose += option.purpose;
      scores.growth += option.growth;
      scores.social += option.social;
      scores.security += option.security;
      scores.achievement += option.achievement;
    }
  });

  // Находим основной и вторичный типы мотивации
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary_motivation = sortedScores[0][0] as keyof typeof scores;
  const secondary_motivation = sortedScores[1][1] > 0 ? sortedScores[1][0] as keyof typeof scores : undefined;

  // Вычисляем проценты
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    financial: Math.round((scores.financial / totalScore) * 100),
    recognition: Math.round((scores.recognition / totalScore) * 100),
    autonomy: Math.round((scores.autonomy / totalScore) * 100),
    purpose: Math.round((scores.purpose / totalScore) * 100),
    growth: Math.round((scores.growth / totalScore) * 100),
    social: Math.round((scores.social / totalScore) * 100),
    security: Math.round((scores.security / totalScore) * 100),
    achievement: Math.round((scores.achievement / totalScore) * 100)
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let work_values: string[];
  let ideal_job_features: string[];
  let leadership_style: string[];
  let team_dynamics: string[];
  let career_advice: string[];
  let potential_issues: string[];
  let development_suggestions: string[];
  let suitable_environments: string[];
  let reward_preferences: string[];

  switch (primary_motivation) {
    case 'financial':
      title = 'Финансовая мотивация';
      description = 'Вас в первую очередь мотивируют финансовые стимулы: зарплата, бонусы, льготы и материальные поощрения. Вы рассматриваете работу как способ достижения финансового благополучия и безопасности.';
      characteristics = [
        'Фокус на материальном вознаграждении',
        'Четкая связь усилий с финансовой отдачей',
        'Интерес к системам премирования',
        'Мотивация через конкретные финансовые цели',
        'Практичный подход к карьере'
      ];
      work_values = [
        'Справедливая оплата труда',
        'Прозрачная система бонусов',
        'Финансовая стабильность',
        'Рост доходов со временем',
        'Дополнительные финансовые льготы'
      ];
      ideal_job_features = [
        'Конкурентоспособная заработная плата',
        'Система бонусов за результат',
        'Четкие критерии повышения зарплаты',
        'Дополнительные финансовые поощрения',
        'Возможности для увеличения дохода'
      ];
      suitable_environments = [
        'Продажи и торговля',
        'Финансовые услуги',
        'Консалтинг',
        'Недвижимость',
        'Предпринимательство'
      ];
      reward_preferences = [
        'Денежные бонусы',
        'Комиссионные выплаты',
        'Акции компании',
        'Дополнительные льготы',
        'Повышение оклада'
      ];
      break;

    case 'recognition':
      title = 'Мотивация признанием';
      description = 'Вас мотивирует общественное признание ваших достижений, статус и уважение коллег. Важно, чтобы ваши успехи были замечены и оценены другими.';
      characteristics = [
        'Потребность во внешнем признании',
        'Важность статуса и репутации',
        'Мотивация через публичную похвалу',
        'Стремление к видимым достижениям',
        'Ценность профессиональной репутации'
      ];
      work_values = [
        'Общественное признание заслуг',
        'Статус и престиж позиции',
        'Уважение коллег и руководства',
        'Видимость достижений',
        'Профессиональная репутация'
      ];
      ideal_job_features = [
        'Программы признания сотрудников',
        'Возможности для публичных выступлений',
        'Престижные проекты',
        'Должности с высоким статусом',
        'Возможности для получения наград'
      ];
      suitable_environments = [
        'Маркетинг и PR',
        'Консалтинг',
        'Образование и тренинги',
        'Творческие индустрии',
        'Топ-менеджмент'
      ];
      reward_preferences = [
        'Публичное признание',
        'Награды и сертификаты',
        'Статусные символы',
        'Упоминания в корпоративных СМИ',
        'Престижные назначения'
      ];
      break;

    case 'autonomy':
      title = 'Мотивация автономией';
      description = 'Вас мотивирует свобода и независимость в работе. Вы цените возможность самостоятельно принимать решения и контролировать свой рабочий процесс.';
      characteristics = [
        'Потребность в самостоятельности',
        'Неприятие микроменеджмента',
        'Ценность гибкости в работе',
        'Предпочтение самоконтроля',
        'Мотивация через свободу выбора'
      ];
      work_values = [
        'Свобода принятия решений',
        'Гибкий график работы',
        'Минимальный контроль',
        'Возможность удаленной работы',
        'Самостоятельность в выборе методов'
      ];
      ideal_job_features = [
        'Гибкий график работы',
        'Возможность удаленной работы',
        'Минимальный контроль со стороны руководства',
        'Самостоятельное планирование задач',
        'Свобода в выборе инструментов и методов'
      ];
      suitable_environments = [
        'Фриланс и консалтинг',
        'IT и технологии',
        'Творческие профессии',
        'Исследования и разработка',
        'Предпринимательство'
      ];
      reward_preferences = [
        'Дополнительные выходные',
        'Гибкий график',
        'Возможность работать из дома',
        'Больше полномочий',
        'Меньше отчетности'
      ];
      break;

    case 'purpose':
      title = 'Мотивация смыслом';
      description = 'Вас мотивирует возможность делать значимую работу, которая приносит пользу обществу и соответствует вашим ценностям. Важен смысл и цель деятельности.';
      characteristics = [
        'Потребность в смысле работы',
        'Важность социального воздействия',
        'Связь с личными ценностями',
        'Мотивация через миссию',
        'Стремление к значимым результатам'
      ];
      work_values = [
        'Социальная значимость работы',
        'Соответствие личным ценностям',
        'Возможность помогать другим',
        'Этичность бизнеса',
        'Влияние на положительные изменения'
      ];
      ideal_job_features = [
        'Ясная миссия организации',
        'Социально значимые проекты',
        'Этичная корпоративная культура',
        'Возможность влиять на важные решения',
        'Работа в соответствии с ценностями'
      ];
      suitable_environments = [
        'Некоммерческие организации',
        'Образование и здравоохранение',
        'Экологические проекты',
        'Социальные сервисы',
        'Благотворительность'
      ];
      reward_preferences = [
        'Возможность участвовать в значимых проектах',
        'Обратная связь о влиянии работы',
        'Этические награды',
        'Участие в принятии важных решений',
        'Возможности для волонтерства'
      ];
      break;

    case 'growth':
      title = 'Мотивация развитием';
      description = 'Вас мотивируют возможности обучения, развития навыков и карьерного роста. Важно постоянно совершенствоваться и осваивать новые компетенции.';
      characteristics = [
        'Потребность в постоянном обучении',
        'Стремление к новым вызовам',
        'Мотивация через развитие навыков',
        'Интерес к карьерному росту',
        'Ценность профессионального развития'
      ];
      work_values = [
        'Возможности обучения',
        'Новые вызовы и задачи',
        'Карьерное продвижение',
        'Развитие навыков',
        'Профессиональный рост'
      ];
      ideal_job_features = [
        'Программы обучения и развития',
        'Разнообразные проекты',
        'Ясные пути карьерного роста',
        'Менторство и коучинг',
        'Возможности для экспериментов'
      ];
      suitable_environments = [
        'Быстрорастущие компании',
        'Технологические компании',
        'Консалтинг',
        'Образовательные учреждения',
        'Инновационные проекты'
      ];
      reward_preferences = [
        'Обучающие программы',
        'Конференции и семинары',
        'Новые проекты',
        'Карьерные возможности',
        'Сертификации и квалификации'
      ];
      break;

    case 'social':
      title = 'Социальная мотивация';
      description = 'Вас мотивируют отношения с коллегами, командная работа и социальное взаимодействие. Важна атмосфера в коллективе и качество рабочих отношений.';
      characteristics = [
        'Важность командной работы',
        'Потребность в социальном взаимодействии',
        'Мотивация через отношения',
        'Ценность корпоративной культуры',
        'Стремление к сотрудничеству'
      ];
      work_values = [
        'Дружелюбный коллектив',
        'Командная работа',
        'Открытая коммуникация',
        'Взаимная поддержка',
        'Корпоративные мероприятия'
      ];
      ideal_job_features = [
        'Сплоченная команда',
        'Открытая корпоративная культура',
        'Совместные проекты',
        'Регулярное взаимодействие с коллегами',
        'Корпоративные мероприятия'
      ];
      suitable_environments = [
        'HR и управление персоналом',
        'Маркетинг и PR',
        'Образование',
        'Социальные службы',
        'Командные проекты'
      ];
      reward_preferences = [
        'Командные мероприятия',
        'Корпоративные праздники',
        'Совместные проекты',
        'Неформальное общение',
        'Групповые поощрения'
      ];
      break;

    case 'security':
      title = 'Мотивация стабильностью';
      description = 'Вас мотивирует стабильность, безопасность и предсказуемость в работе. Важны гарантии занятости и стабильные условия труда.';
      characteristics = [
        'Потребность в стабильности',
        'Важность гарантий занятости',
        'Мотивация через безопасность',
        'Предпочтение предсказуемости',
        'Ценность долгосрочных отношений'
      ];
      work_values = [
        'Стабильность занятости',
        'Предсказуемые условия работы',
        'Социальные гарантии',
        'Долгосрочные контракты',
        'Надежность работодателя'
      ];
      ideal_job_features = [
        'Стабильная компания',
        'Долгосрочные контракты',
        'Социальный пакет',
        'Предсказуемый рабочий процесс',
        'Надежные гарантии'
      ];
      suitable_environments = [
        'Государственные учреждения',
        'Крупные корпорации',
        'Образование и здравоохранение',
        'Банковская сфера',
        'Страхование'
      ];
      reward_preferences = [
        'Социальный пакет',
        'Медицинская страховка',
        'Пенсионные программы',
        'Долгосрочные контракты',
        'Стабильные выплаты'
      ];
      break;

    case 'achievement':
      title = 'Мотивация достижениями';
      description = 'Вас мотивируют вызовы, соревнование и возможность достичь выдающихся результатов. Важно быть лучшим и превосходить ожидания.';
      characteristics = [
        'Стремление к превосходству',
        'Мотивация через соревнование',
        'Потребность в вызовах',
        'Ориентация на результат',
        'Желание быть лучшим'
      ];
      work_values = [
        'Амбициозные цели',
        'Соревновательная среда',
        'Измеримые результаты',
        'Возможность превзойти ожидания',
        'Признание за достижения'
      ];
      ideal_job_features = [
        'Четкие и амбициозные цели',
        'Конкурентная среда',
        'Система рейтингов',
        'Сложные проекты',
        'Возможности для лидерства'
      ];
      suitable_environments = [
        'Продажи',
        'Спорт и соревнования',
        'Стартапы',
        'Инвестиционные компании',
        'Консалтинг'
      ];
      reward_preferences = [
        'Бонусы за превышение целей',
        'Рейтинги и соревнования',
        'Призы и награды',
        'Публичное признание достижений',
        'Возможности для лидерства'
      ];
      break;
  }

  // Общие рекомендации по стилю лидерства
  leadership_style = [
    'Адаптируйте стиль под свою мотивацию',
    'Понимайте мотивацию членов команды',
    'Создавайте среду, поддерживающую различные типы мотивации',
    'Используйте разнообразные методы поощрения'
  ];

  // Командная динамика
  team_dynamics = [
    'Открыто обсуждайте мотивации в команде',
    'Создавайте индивидуальные планы мотивации',
    'Балансируйте различные потребности членов команды',
    'Используйте сильные стороны каждого типа мотивации'
  ];

  // Карьерные советы
  career_advice = [
    'Выбирайте работу, соответствующую вашей мотивации',
    'Обсуждайте свои потребности с руководителем',
    'Развивайте дополнительные источники мотивации',
    'Регулярно пересматривайте свои карьерные цели'
  ];

  // Потенциальные проблемы
  if (primary_motivation === 'financial') {
    potential_issues = [
      'Риск выгорания при фокусе только на деньгах',
      'Демотивация при отсутствии финансового роста',
      'Игнорирование других важных факторов',
      'Сложности в командной работе'
    ];
  } else if (primary_motivation === 'recognition') {
    potential_issues = [
      'Зависимость от внешнего одобрения',
      'Стресс от постоянной потребности в признании',
      'Конфликты из-за борьбы за внимание',
      'Демотивация при отсутствии обратной связи'
    ];
  } else if (primary_motivation === 'autonomy') {
    potential_issues = [
      'Сложности в структурированных организациях',
      'Проблемы с командной работой',
      'Избегание обратной связи',
      'Риск изоляции'
    ];
  } else {
    potential_issues = [
      'Возможная переоценка одного фактора',
      'Игнорирование практических аспектов',
      'Сложности с адаптацией к изменениям'
    ];
  }

  // Рекомендации по развитию
  development_suggestions = [
    'Развивайте понимание других типов мотивации',
    'Учитесь адаптироваться к различным рабочим средам',
    'Создавайте личный план мотивации',
    'Регулярно оценивайте свои потребности',
    'Обсуждайте мотивацию с коллегами и руководителем'
  ];

  return {
    primary_motivation,
    secondary_motivation,
    scores,
    percentages,
    title,
    description,
    characteristics,
    work_values,
    ideal_job_features,
    leadership_style,
    team_dynamics,
    career_advice,
    potential_issues,
    development_suggestions,
    suitable_environments,
    reward_preferences
  };
};