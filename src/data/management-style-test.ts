/**
 * Тест на стиль управления
 * Определяет доминирующий стиль руководства и управленческие предпочтения
 */

export interface ManagementStyleQuestion {
  id: string;
  text: string;
  category: 'decision_making' | 'team_interaction' | 'conflict_resolution' | 'motivation' | 'communication' | 'development';
  scenario?: string;
  options: {
    text: string;
    autocratic: number;      // Автократический стиль
    democratic: number;      // Демократический стиль
    transformational: number; // Трансформационный стиль
    servant: number;         // Служащее лидерство
    coaching: number;        // Коучинговый стиль
    laissez_faire: number;   // Невмешательство
  }[];
}

export interface ManagementStyleResult {
  primary_style: 'autocratic' | 'democratic' | 'transformational' | 'servant' | 'coaching' | 'laissez_faire';
  secondary_style?: 'autocratic' | 'democratic' | 'transformational' | 'servant' | 'coaching' | 'laissez_faire';
  scores: {
    autocratic: number;
    democratic: number;
    transformational: number;
    servant: number;
    coaching: number;
    laissez_faire: number;
  };
  percentages: {
    autocratic: number;
    democratic: number;
    transformational: number;
    servant: number;
    coaching: number;
    laissez_faire: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  ideal_situations: string[];
  team_types: string[];
  decision_approach: string[];
  communication_style: string[];
  conflict_management: string[];
  employee_development: string[];
  organizational_fit: string[];
  improvement_areas: string[];
  situational_adaptations: string[];
}

export const managementStyleQuestions: ManagementStyleQuestion[] = [
  {
    id: '1',
    text: 'Как вы обычно принимаете важные решения в команде?',
    category: 'decision_making',
    options: [
      {
        text: 'Принимаю решения самостоятельно на основе экспертизы',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Консультируюсь с командой и принимаю коллективное решение',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Вдохновляю команду на поиск инновационных решений',
        autocratic: 0, democratic: 1, transformational: 3, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Выясняю, что нужно команде для принятия решения',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Помогаю команде развить навыки принятия решений',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Предоставляю команде полную свободу в принятии решений',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '2',
    text: 'Как вы мотивируете свою команду?',
    category: 'motivation',
    options: [
      {
        text: 'Устанавливаю четкие цели и контролирую их выполнение',
        autocratic: 3, democratic: 1, transformational: 0, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Вовлекаю всех в постановку целей и планирование',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Создаю вдохновляющее видение будущего',
        autocratic: 0, democratic: 1, transformational: 3, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Фокусируюсь на том, как помочь каждому сотруднику',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Развиваю внутреннюю мотивацию сотрудников',
        autocratic: 0, democratic: 1, transformational: 2, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Предоставляю свободу самостоятельной мотивации',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '3',
    text: 'Как вы подходите к развитию сотрудников?',
    category: 'development',
    options: [
      {
        text: 'Даю четкие инструкции и обеспечиваю их выполнение',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Обсуждаем планы развития всей командой',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Вдохновляю на личностный и профессиональный рост',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Выясняю потребности каждого и помогаю их реализовать',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Задаю вопросы, помогающие найти собственные решения',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Позволяю сотрудникам самостоятельно определять развитие',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 1, laissez_faire: 3
      }
    ]
  },
  {
    id: '4',
    text: 'Как вы реагируете на конфликты в команде?',
    category: 'conflict_resolution',
    options: [
      {
        text: 'Быстро принимаю решение и требую его исполнения',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Организую открытое обсуждение с участием всех сторон',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Использую конфликт как возможность для позитивных изменений',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Сосредотачиваюсь на потребностях всех участников',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Помогаю сторонам найти решение самостоятельно',
        autocratic: 0, democratic: 1, transformational: 1, servant: 2, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Предпочитаю не вмешиваться в конфликты',
        autocratic: 0, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '5',
    text: 'Какой стиль коммуникации вы предпочитаете?',
    category: 'communication',
    options: [
      {
        text: 'Четкие директивы сверху вниз',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Открытый диалог со всеми членами команды',
        autocratic: 0, democratic: 3, transformational: 1, servant: 2, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Вдохновляющие речи о видении и целях',
        autocratic: 0, democratic: 1, transformational: 3, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Активное слушание потребностей сотрудников',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Вопросы, развивающие мышление сотрудников',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Минимальная коммуникация, больше свободы',
        autocratic: 0, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '6',
    text: 'Как вы распределяете задачи в команде?',
    category: 'team_interaction',
    options: [
      {
        text: 'Назначаю задачи на основе своего понимания приоритетов',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Обсуждаем распределение задач коллективно',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Связываю задачи с общим видением и целями',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Учитываю сильные стороны и потребности каждого',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Помогаю команде самостоятельно организовать работу',
        autocratic: 0, democratic: 2, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Позволяю команде самостоятельно распределить задачи',
        autocratic: 0, democratic: 1, transformational: 0, servant: 1, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '7',
    text: 'Как вы контролируете выполнение работы?',
    category: 'team_interaction',
    options: [
      {
        text: 'Регулярно проверяю прогресс и корректирую действия',
        autocratic: 3, democratic: 1, transformational: 0, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Организую регулярные командные обсуждения прогресса',
        autocratic: 1, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Фокусируюсь на достижении общих целей и видения',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Обеспечиваю поддержку там, где она нужна',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Помогаю развивать навыки самоконтроля',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 1
      },
      {
        text: 'Доверяю команде самостоятельно контролировать работу',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 1, laissez_faire: 3
      }
    ]
  },
  {
    id: '8',
    text: 'Как вы относитесь к ошибкам сотрудников?',
    category: 'development',
    options: [
      {
        text: 'Указываю на ошибки и требую их исправления',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Обсуждаем ошибки открыто в команде для общего обучения',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Использую ошибки как возможность для инноваций',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Поддерживаю сотрудника и помогаю справиться с ошибкой',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Превращаю ошибку в обучающий момент',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Считаю, что сотрудники сами должны учиться на ошибках',
        autocratic: 0, democratic: 0, transformational: 0, servant: 0, coaching: 1, laissez_faire: 3
      }
    ]
  },
  {
    id: '9',
    text: 'Как вы внедряете изменения в команде?',
    category: 'decision_making',
    options: [
      {
        text: 'Принимаю решение об изменениях и внедряю их',
        autocratic: 3, democratic: 0, transformational: 0, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Вовлекаю команду в планирование изменений',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Создаю вдохновляющее видение необходимости изменений',
        autocratic: 0, democratic: 1, transformational: 3, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Выясняю, как изменения повлияют на каждого сотрудника',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Помогаю команде самостоятельно адаптироваться к изменениям',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Позволяю команде самостоятельно определить необходимость изменений',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 1, laissez_faire: 3
      }
    ]
  },
  {
    id: '10',
    text: 'Какова ваша роль во время кризиса?',
    category: 'decision_making',
    options: [
      {
        text: 'Беру контроль на себя и принимаю быстрые решения',
        autocratic: 3, democratic: 0, transformational: 1, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Собираю команду для коллективного решения проблемы',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Мобилизую команду вокруг общего видения выхода из кризиса',
        autocratic: 1, democratic: 1, transformational: 3, servant: 1, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Обеспечиваю поддержку и ресурсы для команды',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Помогаю команде развить навыки антикризисного управления',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Доверяю команде самостоятельно справиться с кризисом',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '11',
    text: 'Как вы планируете карьерное развитие сотрудников?',
    category: 'development',
    options: [
      {
        text: 'Определяю траектории развития на основе потребностей бизнеса',
        autocratic: 3, democratic: 1, transformational: 0, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'Обсуждаем планы развития в команде',
        autocratic: 0, democratic: 3, transformational: 1, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Связываю развитие с достижением амбициозных целей',
        autocratic: 0, democratic: 1, transformational: 3, servant: 0, coaching: 1, laissez_faire: 0
      },
      {
        text: 'Ставлю потребности и цели сотрудников на первое место',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'Задаю вопросы, помогающие сотрудникам определить свои цели',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 0
      },
      {
        text: 'Предоставляю полную свободу в планировании карьеры',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 0, laissez_faire: 3
      }
    ]
  },
  {
    id: '12',
    text: 'Как вы оцениваете успешность своего управления?',
    category: 'team_interaction',
    options: [
      {
        text: 'По достижению поставленных мною целей',
        autocratic: 3, democratic: 1, transformational: 1, servant: 0, coaching: 0, laissez_faire: 0
      },
      {
        text: 'По уровню вовлеченности и удовлетворенности команды',
        autocratic: 0, democratic: 3, transformational: 1, servant: 2, coaching: 1, laissez_faire: 0
      },
      {
        text: 'По способности команды превосходить ожидания',
        autocratic: 0, democratic: 1, transformational: 3, servant: 1, coaching: 1, laissez_faire: 0
      },
      {
        text: 'По росту и развитию каждого сотрудника',
        autocratic: 0, democratic: 1, transformational: 1, servant: 3, coaching: 2, laissez_faire: 0
      },
      {
        text: 'По способности команды к самоуправлению',
        autocratic: 0, democratic: 1, transformational: 1, servant: 1, coaching: 3, laissez_faire: 1
      },
      {
        text: 'По минимальной потребности в моем вмешательстве',
        autocratic: 0, democratic: 0, transformational: 0, servant: 1, coaching: 1, laissez_faire: 3
      }
    ]
  }
];

export const calculateManagementStyleResult = (answers: Record<string, number>): ManagementStyleResult => {
  const scores = {
    autocratic: 0,
    democratic: 0,
    transformational: 0,
    servant: 0,
    coaching: 0,
    laissez_faire: 0
  };

  // Подсчитываем баллы для каждого стиля управления
  managementStyleQuestions.forEach((question, index) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.autocratic += option.autocratic;
      scores.democratic += option.democratic;
      scores.transformational += option.transformational;
      scores.servant += option.servant;
      scores.coaching += option.coaching;
      scores.laissez_faire += option.laissez_faire;
    }
  });

  // Находим основной и вторичный стили
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary_style = sortedScores[0][0] as keyof typeof scores;
  const secondary_style = sortedScores[1][1] > 0 ? sortedScores[1][0] as keyof typeof scores : undefined;

  // Вычисляем проценты
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    autocratic: Math.round((scores.autocratic / totalScore) * 100),
    democratic: Math.round((scores.democratic / totalScore) * 100),
    transformational: Math.round((scores.transformational / totalScore) * 100),
    servant: Math.round((scores.servant / totalScore) * 100),
    coaching: Math.round((scores.coaching / totalScore) * 100),
    laissez_faire: Math.round((scores.laissez_faire / totalScore) * 100)
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let challenges: string[];
  let ideal_situations: string[];
  let team_types: string[];
  let decision_approach: string[];
  let communication_style: string[];
  let conflict_management: string[];
  let employee_development: string[];
  let organizational_fit: string[];
  let improvement_areas: string[];
  let situational_adaptations: string[];

  switch (primary_style) {
    case 'autocratic':
      title = 'Автократический стиль управления';
      description = 'Вы предпочитаете централизованное принятие решений и четкий контроль. Ваш стиль эффективен в ситуациях, требующих быстрых решений и четкого руководства, особенно в кризисных или структурированных средах.';
      characteristics = [
        'Централизованное принятие решений',
        'Четкий контроль и надзор',
        'Директивное общение',
        'Быстрое принятие решений',
        'Ясная иерархия и структура',
        'Фокус на результатах и эффективности'
      ];
      strengths = [
        'Быстрое принятие решений в кризисных ситуациях',
        'Четкое направление и структура',
        'Эффективность в рутинных задачах',
        'Ясность в распределении ролей',
        'Сильный контроль качества'
      ];
      challenges = [
        'Ограниченная креативность команды',
        'Низкая мотивация сотрудников',
        'Зависимость от лидера',
        'Сопротивление изменениям',
        'Высокая текучка кадров'
      ];
      ideal_situations = [
        'Кризисные ситуации',
        'Военные и силовые структуры',
        'Производственные линии',
        'Строгие временные рамки',
        'Неопытные команды'
      ];
      team_types = [
        'Новые сотрудники',
        'Команды, требующие четкого руководства',
        'Высококвалифицированные исполнители',
        'Кризисные команды'
      ];
      improvement_areas = [
        'Развитие демократических элементов',
        'Делегирование полномочий',
        'Активное слушание',
        'Развитие эмпатии',
        'Стимулирование инициативы сотрудников'
      ];
      break;

    case 'democratic':
      title = 'Демократический стиль управления';
      description = 'Вы цените коллективное принятие решений и активно вовлекаете команду в управленческие процессы. Ваш подход способствует высокой мотивации и вовлеченности сотрудников.';
      characteristics = [
        'Коллективное принятие решений',
        'Активное участие команды',
        'Открытая коммуникация',
        'Консультативный подход',
        'Разделение ответственности',
        'Фокус на командной работе'
      ];
      strengths = [
        'Высокая мотивация команды',
        'Креативные решения',
        'Развитие навыков сотрудников',
        'Приверженность решениям',
        'Хорошая атмосфера в команде'
      ];
      challenges = [
        'Медленное принятие решений',
        'Трудности в кризисных ситуациях',
        'Возможные конфликты мнений',
        'Размывание ответственности'
      ];
      ideal_situations = [
        'Творческие проекты',
        'Планирование и стратегия',
        'Опытные команды',
        'Инновационные задачи'
      ];
      team_types = [
        'Опытные профессионалы',
        'Креативные команды',
        'Команды экспертов',
        'Самомотивированные сотрудники'
      ];
      improvement_areas = [
        'Развитие навыков быстрого принятия решений',
        'Управление конфликтами',
        'Балансирование мнений',
        'Эффективное делегирование'
      ];
      break;

    case 'transformational':
      title = 'Трансформационный стиль управления';
      description = 'Вы вдохновляете команду на достижение выдающихся результатов через создание привлекательного видения будущего. Ваш стиль способствует инновациям и превосходству.';
      characteristics = [
        'Вдохновляющее лидерство',
        'Создание видения',
        'Стимулирование инноваций',
        'Развитие потенциала',
        'Харизматическое влияние',
        'Фокус на трансформации'
      ];
      strengths = [
        'Высокая мотивация к превосходству',
        'Стимулирование инноваций',
        'Развитие лидерских качеств в команде',
        'Адаптивность к изменениям',
        'Сильная корпоративная культура'
      ];
      challenges = [
        'Риск выгорания команды',
        'Трудности в рутинных задачах',
        'Зависимость от харизмы лидера',
        'Возможная переоценка амбиций'
      ];
      ideal_situations = [
        'Организационные изменения',
        'Инновационные проекты',
        'Развитие новых направлений',
        'Кризисные трансформации'
      ];
      team_types = [
        'Амбициозные профессионалы',
        'Команды, готовые к вызовам',
        'Инновационные группы',
        'Развивающиеся таланты'
      ];
      improvement_areas = [
        'Внимание к деталям',
        'Управление ожиданиями',
        'Балансирование амбиций с реальностью',
        'Поддержка в рутинных задачах'
      ];
      break;

    case 'servant':
      title = 'Служащий стиль лидерства';
      description = 'Вы ставите потребности команды на первое место и фокусируетесь на служении сотрудникам. Ваш подход создает среду доверия и взаимной поддержки.';
      characteristics = [
        'Служение команде',
        'Эмпатия и поддержка',
        'Развитие сотрудников',
        'Этичное лидерство',
        'Построение отношений',
        'Фокус на благополучии команды'
      ];
      strengths = [
        'Высокое доверие в команде',
        'Сильная лояльность сотрудников',
        'Этичная культура',
        'Развитие человеческого потенциала',
        'Устойчивые отношения'
      ];
      challenges = [
        'Медленное принятие сложных решений',
        'Риск избежания конфликтов',
        'Возможная эксплуатация доверия',
        'Трудности в конкурентной среде'
      ];
      ideal_situations = [
        'Социальные организации',
        'Образовательные учреждения',
        'Здравоохранение',
        'Долгосрочные проекты'
      ];
      team_types = [
        'Команды, нуждающиеся в поддержке',
        'Сотрудники в стрессе',
        'Разнообразные группы',
        'Ценностно-ориентированные команды'
      ];
      improvement_areas = [
        'Развитие ассертивности',
        'Навыки принятия сложных решений',
        'Управление производительностью',
        'Балансирование потребностей'
      ];
      break;

    case 'coaching':
      title = 'Коучинговый стиль управления';
      description = 'Вы фокусируетесь на развитии потенциала каждого сотрудника через вопросы, обратную связь и поддержку самостоятельного обучения. Ваш стиль способствует росту и самостоятельности.';
      characteristics = [
        'Развитие потенциала',
        'Задавание развивающих вопросов',
        'Поддержка самообучения',
        'Индивидуальный подход',
        'Конструктивная обратная связь',
        'Фокус на росте'
      ];
      strengths = [
        'Высокое развитие навыков команды',
        'Самостоятельность сотрудников',
        'Сильная мотивация к обучению',
        'Адаптивность команды',
        'Долгосрочные результаты'
      ];
      challenges = [
        'Требует больше времени',
        'Не подходит для всех ситуаций',
        'Нужны развитые коучинговые навыки',
        'Медленные результаты'
      ];
      ideal_situations = [
        'Развитие талантов',
        'Долгосрочные проекты',
        'Обучающие организации',
        'Переходные периоды'
      ];
      team_types = [
        'Мотивированные к росту сотрудники',
        'Команды с потенциалом',
        'Профессионалы в развитии',
        'Самообучающиеся группы'
      ];
      improvement_areas = [
        'Развитие коучинговых навыков',
        'Терпение с результатами',
        'Адаптация к различным стилям обучения',
        'Балансирование поддержки и вызовов'
      ];
      break;

    case 'laissez_faire':
      title = 'Стиль невмешательства (Laissez-faire)';
      description = 'Вы предоставляете команде максимальную свободу и минимально вмешиваетесь в рабочие процессы. Ваш стиль эффективен с высококвалифицированными и самомотивированными командами.';
      characteristics = [
        'Минимальное вмешательство',
        'Делегирование полномочий',
        'Доверие к команде',
        'Свобода принятия решений',
        'Самоуправление команды',
        'Фокус на автономии'
      ];
      strengths = [
        'Высокая креативность команды',
        'Быстрая адаптация',
        'Инновационные решения',
        'Самостоятельность сотрудников',
        'Гибкость в работе'
      ];
      challenges = [
        'Риск отсутствия направления',
        'Возможная неэффективность',
        'Сложности с координацией',
        'Проблемы с ответственностью'
      ];
      ideal_situations = [
        'Креативные индустрии',
        'Исследования и разработка',
        'Экспертные команды',
        'Стартапы'
      ];
      team_types = [
        'Высококвалифицированные профессионалы',
        'Самомотивированные сотрудники',
        'Креативные команды',
        'Опытные эксперты'
      ];
      improvement_areas = [
        'Развитие навыков предоставления направления',
        'Установление ясных целей',
        'Координация усилий команды',
        'Обеспечение обратной связи'
      ];
      break;
  }

  // Подход к принятию решений
  decision_approach = primary_style === 'autocratic' 
    ? ['Быстрые единоличные решения', 'Основаны на опыте и экспертизе', 'Четкие и директивные']
    : primary_style === 'democratic'
    ? ['Коллективные решения', 'Консультации с командой', 'Консенсус и компромиссы']
    : primary_style === 'transformational'
    ? ['Вдохновляющие решения', 'Связанные с видением', 'Мотивирующие к действию']
    : primary_style === 'servant'
    ? ['Решения в интересах команды', 'Этичные и справедливые', 'Поддерживающие развитие']
    : primary_style === 'coaching'
    ? ['Развивающие решения', 'Обучающие возможности', 'Поддержка самостоятельности']
    : ['Делегированные решения', 'Автономия команды', 'Минимальное вмешательство'];

  // Стиль коммуникации
  communication_style = primary_style === 'autocratic'
    ? ['Директивное общение', 'Четкие инструкции', 'Нисходящая коммуникация']
    : primary_style === 'democratic'
    ? ['Открытый диалог', 'Двусторонняя коммуникация', 'Активное слушание']
    : primary_style === 'transformational'
    ? ['Вдохновляющие выступления', 'Эмоциональная связь', 'Мотивирующие сообщения']
    : primary_style === 'servant'
    ? ['Эмпатическое слушание', 'Поддерживающее общение', 'Внимание к потребностям']
    : primary_style === 'coaching'
    ? ['Развивающие вопросы', 'Конструктивная обратная связь', 'Поддержка обучения']
    : ['Минимальная коммуникация', 'По необходимости', 'Предоставление свободы'];

  // Управление конфликтами
  conflict_management = primary_style === 'autocratic'
    ? ['Быстрое разрешение', 'Авторитарные решения', 'Подавление конфликтов']
    : primary_style === 'democratic'
    ? ['Открытое обсуждение', 'Поиск компромиссов', 'Медиация']
    : primary_style === 'transformational'
    ? ['Превращение в возможности', 'Фокус на общих целях', 'Мобилизация энергии']
    : primary_style === 'servant'
    ? ['Забота о всех сторонах', 'Восстановительный подход', 'Построение отношений']
    : primary_style === 'coaching'
    ? ['Обучение через конфликт', 'Развитие навыков', 'Самостоятельное решение']
    : ['Невмешательство', 'Самостоятельное решение командой', 'Минимальная поддержка'];

  // Развитие сотрудников
  employee_development = primary_style === 'autocratic'
    ? ['Структурированное обучение', 'Четкие программы развития', 'Контролируемый прогресс']
    : primary_style === 'democratic'
    ? ['Коллективное планирование развития', 'Групповое обучение', 'Взаимное наставничество']
    : primary_style === 'transformational'
    ? ['Развитие через вызовы', 'Расширение горизонтов', 'Лидерское развитие']
    : primary_style === 'servant'
    ? ['Индивидуальная поддержка', 'Холистическое развитие', 'Личностный рост']
    : primary_style === 'coaching'
    ? ['Персонализированное развитие', 'Самообучение', 'Раскрытие потенциала']
    : ['Самостоятельное развитие', 'Свобода выбора', 'Автономное обучение'];

  // Организационное соответствие
  organizational_fit = primary_style === 'autocratic'
    ? ['Иерархические структуры', 'Традиционные компании', 'Кризисные организации']
    : primary_style === 'democratic'
    ? ['Плоские структуры', 'Консультативные организации', 'Коллективные предприятия']
    : primary_style === 'transformational'
    ? ['Инновационные компании', 'Растущие организации', 'Изменяющиеся среды']
    : primary_style === 'servant'
    ? ['Социальные организации', 'Некоммерческий сектор', 'Ценностно-ориентированные компании']
    : primary_style === 'coaching'
    ? ['Обучающиеся организации', 'Развивающиеся компании', 'Талант-ориентированные среды']
    : ['Креативные организации', 'Исследовательские институты', 'Автономные структуры'];

  // Ситуационные адаптации
  situational_adaptations = [
    'Изучайте контекст и адаптируйте стиль',
    'Развивайте гибкость в подходах',
    'Учитывайте зрелость команды',
    'Адаптируйтесь к организационной культуре',
    'Комбинируйте элементы разных стилей'
  ];

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
    ideal_situations,
    team_types,
    decision_approach,
    communication_style,
    conflict_management,
    employee_development,
    organizational_fit,
    improvement_areas,
    situational_adaptations
  };
};