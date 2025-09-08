/**
 * Тест на стили поведения в конфликтах
 * Определяет предпочитаемые способы разрешения конфликтных ситуаций
 */

export interface ConflictStyleQuestion {
  id: string;
  text: string;
  scenario: 'workplace' | 'personal' | 'family' | 'public' | 'online';
  options: {
    text: string;
    competing: number;     // Соперничество
    accommodating: number; // Приспособление
    avoiding: number;      // Избегание
    compromising: number;  // Компромисс
    collaborating: number; // Сотрудничество
  }[];
}

export interface ConflictStyleResult {
  primary_style: 'competing' | 'accommodating' | 'avoiding' | 'compromising' | 'collaborating';
  secondary_style?: 'competing' | 'accommodating' | 'avoiding' | 'compromising' | 'collaborating';
  scores: {
    competing: number;
    accommodating: number;
    avoiding: number;
    compromising: number;
    collaborating: number;
  };
  percentages: {
    competing: number;
    accommodating: number;
    avoiding: number;
    compromising: number;
    collaborating: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  advantages: string[];
  disadvantages: string[];
  best_situations: string[];
  worst_situations: string[];
  development_tips: string[];
  communication_patterns: string[];
  relationship_impact: string[];
  alternative_strategies: string[];
}

export const conflictStyleQuestions: ConflictStyleQuestion[] = [
  {
    id: '1',
    text: 'Коллега публично критикует ваш проект. Ваша реакция:',
    scenario: 'workplace',
    options: [
      {
        text: 'Решительно защищаю свою позицию и указываю на его ошибки',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 0
      },
      {
        text: 'Благодарю за критику и принимаю все замечания',
        competing: 0,
        accommodating: 3,
        avoiding: 0,
        compromising: 0,
        collaborating: 1
      },
      {
        text: 'Стараюсь быстро закончить обсуждение и уйти от темы',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 1,
        collaborating: 0
      },
      {
        text: 'Предлагаю учесть некоторые замечания в обмен на признание сильных сторон',
        competing: 0,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Предлагаю вместе найти способы улучшить проект',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '2',
    text: 'Вы с партнером не можете договориться, куда поехать в отпуск:',
    scenario: 'personal',
    options: [
      {
        text: 'Настаиваю на своем варианте, объясняя его преимущества',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 0
      },
      {
        text: 'Соглашаюсь с его выбором, чтобы избежать ссоры',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Откладываю решение, надеясь что проблема решится сама',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Предлагаю поехать на половину срока в одно место, на половину в другое',
        competing: 1,
        accommodating: 0,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Ищем третий вариант, который устроит обоих',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '3',
    text: 'Родственники критикуют ваши жизненные выборы на семейном празднике:',
    scenario: 'family',
    options: [
      {
        text: 'Жестко отстаиваю свою правоту и критикую их подход',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Соглашаюсь с критикой, чтобы сохранить мир в семье',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Меняю тему разговора или ухожу из комнаты',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Признаю их заботу, но объясняю свои мотивы',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Предлагаю открыто обсудить разные точки зрения',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '4',
    text: 'Сосед постоянно слушает громкую музыку по ночам:',
    scenario: 'public',
    options: [
      {
        text: 'Иду и требую немедленно выключить музыку',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 1
      },
      {
        text: 'Терплю и стараюсь привыкнуть к шуму',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Надеваю беруши и избегаю разговора с соседом',
        competing: 0,
        accommodating: 1,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Предлагаю ограничить громкую музыку определенными часами',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Ищу решение, которое учтет его потребности и мой комфорт',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '5',
    text: 'В онлайн-дискуссии кто-то агрессивно не согласен с вашим мнением:',
    scenario: 'online',
    options: [
      {
        text: 'Отвечаю еще жестче, доказывая свою правоту',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Извиняюсь и соглашаюсь с его точкой зрения',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Удаляю свой комментарий или блокирую пользователя',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Признаю частичную правоту с обеих сторон',
        competing: 0,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Предлагаю конструктивно разобрать аргументы',
        competing: 1,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '6',
    text: 'Ваш начальник несправедливо обвиняет вас в ошибке:',
    scenario: 'workplace',
    options: [
      {
        text: 'Категорически отвергаю обвинения и требую разбирательства',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 1
      },
      {
        text: 'Принимаю вину, чтобы не портить отношения',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Молча выслушиваю и стараюсь не возвращаться к теме',
        competing: 0,
        accommodating: 1,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Частично признаю ответственность, но указываю на внешние факторы',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Предлагаю разобраться в ситуации и найти реальные причины ошибки',
        competing: 1,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '7',
    text: 'Друг постоянно опаздывает на встречи с вами:',
    scenario: 'personal',
    options: [
      {
        text: 'Прямо говорю что это неуважение и требую измениться',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 1
      },
      {
        text: 'Не говорю ничего и приспосабливаюсь к его опозданиям',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Начинаю встречаться с ним реже или вообще перестаю',
        competing: 1,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Договариваемся встречаться на 15 минут раньше оговоренного времени',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Обсуждаем проблему и ищем способы её решения',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '8',
    text: 'В ресторане вам подали некачественное блюдо:',
    scenario: 'public',
    options: [
      {
        text: 'Громко выражаю недовольство и требую менеджера',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Ем что подали, не хочу создавать проблемы',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Оставляю блюдо нетронутым и молча ухожу',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Прошу заменить блюдо или сделать скидку',
        competing: 1,
        accommodating: 0,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Вежливо объясняю проблему и предлагаю варианты решения',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '9',
    text: 'Родители не одобряют ваш выбор партнера:',
    scenario: 'family',
    options: [
      {
        text: 'Заявляю что это мой выбор и они не имеют права вмешиваться',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 1
      },
      {
        text: 'Соглашаюсь с их мнением и расстаюсь с партнером',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Избегаю этой темы в разговорах с родителями',
        competing: 0,
        accommodating: 1,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Ограничиваю время с партнером, но отношения не прекращаю',
        competing: 1,
        accommodating: 2,
        avoiding: 1,
        compromising: 3,
        collaborating: 0
      },
      {
        text: 'Организую встречу чтобы родители лучше узнали партнера',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '10',
    text: 'Коллега берет кредит за вашу идею на совещании:',
    scenario: 'workplace',
    options: [
      {
        text: 'Немедленно заявляю что идея моя и требую признания',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Молчу и позволяю ему получить признание',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Ничего не говорю на совещании, но избегаю сотрудничества с ним',
        competing: 1,
        accommodating: 0,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'После совещания предлагаю поделить признание пополам',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Подхожу к коллеге и предлагаю обсудить ситуацию открыто',
        competing: 1,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '11',
    text: 'Ваши политические взгляды кардинально не совпадают с взглядами собеседника:',
    scenario: 'public',
    options: [
      {
        text: 'Активно доказываю свою правоту и критикую его позицию',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Соглашаюсь с ним чтобы избежать конфликта',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Перевожу разговор на другую тему',
        competing: 0,
        accommodating: 0,
        avoiding: 3,
        compromising: 1,
        collaborating: 0
      },
      {
        text: 'Признаю правоту некоторых его аргументов в обмен на то же',
        competing: 0,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Предлагаю выяснить корни наших разногласий и найти общие ценности',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  },
  {
    id: '12',
    text: 'Ваш подросток ребенок нарушил установленные правила:',
    scenario: 'family',
    options: [
      {
        text: 'Строго наказываю и требую беспрекословного подчинения',
        competing: 3,
        accommodating: 0,
        avoiding: 0,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Прощаю и отменяю наказание, чтобы сохранить отношения',
        competing: 0,
        accommodating: 3,
        avoiding: 1,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Делаю вид что ничего не заметил, надеясь что больше не повторится',
        competing: 0,
        accommodating: 1,
        avoiding: 3,
        compromising: 0,
        collaborating: 0
      },
      {
        text: 'Договариваемся о послаблении наказания в обмен на обещания',
        competing: 1,
        accommodating: 1,
        avoiding: 0,
        compromising: 3,
        collaborating: 1
      },
      {
        text: 'Обсуждаем почему правила важны и вместе ищем решение',
        competing: 0,
        accommodating: 0,
        avoiding: 0,
        compromising: 1,
        collaborating: 3
      }
    ]
  }
];

export const calculateConflictStyleResult = (answers: Record<string, number>): ConflictStyleResult => {
  const scores = {
    competing: 0,
    accommodating: 0,
    avoiding: 0,
    compromising: 0,
    collaborating: 0
  };

  // Подсчитываем баллы для каждого стиля
  conflictStyleQuestions.forEach((question) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.competing += option.competing;
      scores.accommodating += option.accommodating;
      scores.avoiding += option.avoiding;
      scores.compromising += option.compromising;
      scores.collaborating += option.collaborating;
    }
  });

  // Находим основной и вторичный стили
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary_style = sortedScores[0][0] as keyof typeof scores;
  const secondary_style = sortedScores[1][1] > 0 ? sortedScores[1][0] as keyof typeof scores : undefined;

  // Вычисляем проценты
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    competing: Math.round((scores.competing / totalScore) * 100),
    accommodating: Math.round((scores.accommodating / totalScore) * 100),
    avoiding: Math.round((scores.avoiding / totalScore) * 100),
    compromising: Math.round((scores.compromising / totalScore) * 100),
    collaborating: Math.round((scores.collaborating / totalScore) * 100)
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let advantages: string[];
  let disadvantages: string[];
  let best_situations: string[];
  let worst_situations: string[];
  let development_tips: string[];
  let communication_patterns: string[];
  let relationship_impact: string[];
  let alternative_strategies: string[];

  switch (primary_style) {
    case 'competing':
      title = 'Соперничающий стиль';
      description = 'Вы предпочитаете решительно отстаивать свои интересы в конфликтных ситуациях. Для вас важно победить и добиться своего, даже если это может негативно сказаться на отношениях. Вы не боитесь конфронтации и готовы идти на конфликт ради достижения цели.';
      characteristics = [
        'Настойчивость в достижении целей',
        'Готовность к конфронтации',
        'Доминирование в спорах',
        'Фокус на собственных интересах',
        'Быстрое принятие решений',
        'Низкая кооперативность'
      ];
      advantages = [
        'Эффективен в кризисных ситуациях',
        'Помогает защитить важные принципы',
        'Быстрое разрешение конфликтов',
        'Демонстрирует лидерские качества',
        'Защищает права и интересы'
      ];
      disadvantages = [
        'Может разрушать отношения',
        'Создает враждебную атмосферу',
        'Игнорирует потребности других',
        'Может привести к эскалации конфликта',
        'Снижает командную работу'
      ];
      best_situations = [
        'Экстренные ситуации требующие быстрых решений',
        'Защита важных принципов или прав',
        'Ситуации где другие пытаются воспользоваться вами',
        'Когда нужно принять непопулярное но правильное решение'
      ];
      worst_situations = [
        'Долгосрочные отношения с коллегами',
        'Семейные конфликты',
        'Ситуации требующие творческого решения',
        'Когда важно сохранить доверие'
      ];
      development_tips = [
        'Учитесь выслушивать других людей',
        'Развивайте эмпатию и понимание',
        'Практикуйте компромиссы',
        'Изучайте долгосрочные последствия конфликтов',
        'Работайте над контролем эмоций'
      ];
      communication_patterns = [
        'Прямые утверждения и требования',
        'Критика позиций оппонента',
        'Использование власти и авторитета',
        'Игнорирование эмоциональных аспектов',
        'Фокус на фактах поддерживающих свою позицию'
      ];
      relationship_impact = [
        'Может создавать напряжение в отношениях',
        'Другие могут избегать открытого общения',
        'Риск потери доверия и уважения',
        'Возможная изоляция в коллективе'
      ];
      alternative_strategies = [
        'Попробуйте сотрудничество в менее важных вопросах',
        'Изучайте техники активного слушания',
        'Ищите win-win решения',
        'Развивайте навыки переговоров'
      ];
      break;

    case 'accommodating':
      title = 'Приспосабливающийся стиль';
      description = 'Вы склонны жертвовать своими интересами ради сохранения отношений и избежания конфликтов. Для вас важна гармония и мир, даже если это означает уступки в важных вопросах. Вы готовы идти навстречу другим людям.';
      characteristics = [
        'Высокая кооперативность',
        'Жертвование собственными интересами',
        'Стремление сохранить отношения',
        'Избегание конфронтации',
        'Чувствительность к нуждам других',
        'Склонность к уступкам'
      ];
      advantages = [
        'Сохраняет гармонию в отношениях',
        'Демонстрирует заботу о других',
        'Быстро заканчивает конфликты',
        'Создает позитивную атмосферу',
        'Показывает гибкость'
      ];
      disadvantages = [
        'Собственные потребности остаются неудовлетворенными',
        'Может привести к накоплению обид',
        'Другие могут воспользоваться уступчивостью',
        'Снижает собственную самооценку',
        'Не решает корень проблемы'
      ];
      best_situations = [
        'Когда отношения важнее конкретного вопроса',
        'Если вы поняли что были неправы',
        'Когда вопрос важнее для другой стороны',
        'Для сохранения мира в критический момент'
      ];
      worst_situations = [
        'Когда затрагиваются важные принципы',
        'В ситуациях касающихся ваших прав',
        'Когда нужно защитить свою команду',
        'В повторяющихся конфликтах'
      ];
      development_tips = [
        'Учитесь определять свои важные потребности',
        'Практикуйте ассертивность',
        'Развивайте уверенность в себе',
        'Изучайте техники конструктивного выражения несогласия',
        'Работайте над установлением границ'
      ];
      communication_patterns = [
        'Согласие даже при внутреннем несогласии',
        'Извинения и самообвинения',
        'Фокус на потребностях других',
        'Минимизация собственных интересов',
        'Поиск способов угодить другим'
      ];
      relationship_impact = [
        'Краткосрочно улучшает отношения',
        'Долгосрочно может привести к неуважению',
        'Создает дисбаланс в отношениях',
        'Может привести к эмоциональному истощению'
      ];
      alternative_strategies = [
        'Изучайте компромиссные решения',
        'Практикуйте выражение своих потребностей',
        'Развивайте навыки переговоров',
        'Учитесь говорить "нет" в подходящих ситуациях'
      ];
      break;

    case 'avoiding':
      title = 'Избегающий стиль';
      description = 'Вы предпочитаете уходить от конфликтных ситуаций и откладывать решение проблем. Для вас характерно стремление избежать как конфронтации, так и необходимости идти на уступки. Вы надеетесь что проблемы решатся сами собой.';
      characteristics = [
        'Уход от конфликтных ситуаций',
        'Откладывание решения проблем',
        'Низкая ассертивность',
        'Минимальная кооперативность',
        'Надежда на самоустранение проблем',
        'Дискомфорт от напряженности'
      ];
      advantages = [
        'Дает время для обдумывания',
        'Может предотвратить эскалацию',
        'Полезен при незначительных проблемах',
        'Позволяет эмоциям остыть',
        'Экономит энергию'
      ];
      disadvantages = [
        'Проблемы накапливаются и усугубляются',
        'Другие могут решать за вас',
        'Упущенные возможности',
        'Накопление стресса и фрустрации',
        'Репутация безответственного человека'
      ];
      best_situations = [
        'Когда конфликт тривиален и временен',
        'Если нужно время для сбора информации',
        'Когда эмоции слишком накалены',
        'Если другие могут решить проблему лучше'
      ];
      worst_situations = [
        'Серьезные проблемы требующие решения',
        'Ситуации затрагивающие важные принципы',
        'Когда вы единственный кто может решить проблему',
        'Повторяющиеся конфликты'
      ];
      development_tips = [
        'Учитесь различать важные и неважные конфликты',
        'Развивайте навыки конструктивного общения',
        'Практикуйте постепенное вовлечение в решение проблем',
        'Изучайте техники управления стрессом',
        'Работайте над уверенностью в себе'
      ];
      communication_patterns = [
        'Молчание или уклончивые ответы',
        'Смена темы разговора',
        'Физический уход из ситуации',
        'Откладывание разговоров',
        'Минимальное выражение мнений'
      ];
      relationship_impact = [
        'Может создавать фрустрацию у других',
        'Проблемы остаются неразрешенными',
        'Снижение доверия',
        'Репутация пассивного человека'
      ];
      alternative_strategies = [
        'Начните с малых конфликтов',
        'Изучайте техники ассертивности',
        'Найдите союзника для поддержки',
        'Практикуйте выражение мнений в безопасной обстановке'
      ];
      break;

    case 'compromising':
      title = 'Компромиссный стиль';
      description = 'Вы стремитесь найти средний путь, при котором каждая сторона получает и теряет что-то. Для вас важна справедливость и взаимные уступки. Вы готовы пожертвовать частью своих интересов ради достижения приемлемого решения.';
      characteristics = [
        'Поиск средних решений',
        'Готовность к взаимным уступкам',
        'Стремление к справедливости',
        'Прагматичный подход',
        'Умеренная ассертивность и кооперативность',
        'Фокус на практических результатах'
      ];
      advantages = [
        'Быстрое достижение приемлемых решений',
        'Сохранение отношений',
        'Восприятие как справедливого человека',
        'Эффективность в переговорах',
        'Предотвращение эскалации конфликта'
      ];
      disadvantages = [
        'Не всегда оптимальные решения',
        'Может не удовлетворять полностью ни одну сторону',
        'Упущение возможности лучших решений',
        'Возможная цинизм в подходе к отношениям',
        'Поверхностное решение глубоких проблем'
      ];
      best_situations = [
        'Когда цели взаимоисключающие',
        'При ограниченном времени',
        'Если стороны равны по силе',
        'Когда сотрудничество не работает'
      ];
      worst_situations = [
        'Сложные проблемы требующие творческих решений',
        'Ситуации касающиеся принципиальных вопросов',
        'Когда одна сторона значительно сильнее',
        'Проблемы требующие полного решения'
      ];
      development_tips = [
        'Изучайте техники интегративных переговоров',
        'Развивайте креативность в поиске решений',
        'Учитесь определять истинные интересы сторон',
        'Практикуйте сотрудничество',
        'Изучайте win-win подходы'
      ];
      communication_patterns = [
        'Предложение взаимных уступок',
        'Поиск золотой середины',
        'Фокус на практических аспектах',
        'Рациональная аргументация',
        'Призывы к справедливости'
      ];
      relationship_impact = [
        'В целом положительное влияние',
        'Восприятие как надежного партнера',
        'Возможны разочарования при неоптимальных решениях',
        'Долгосрочная стабильность отношений'
      ];
      alternative_strategies = [
        'Попробуйте найти решения выгодные всем сторонам',
        'Инвестируйте время в понимание глубинных потребностей',
        'Изучайте техники творческого решения проблем',
        'Развивайте навыки фасилитации'
      ];
      break;

    case 'collaborating':
      title = 'Сотрудничающий стиль';
      description = 'Вы стремитесь найти решения, которые полностью удовлетворяют потребности всех сторон. Для вас важно понимание глубинных интересов и творческий поиск win-win решений. Вы готовы инвестировать время и энергию в поиск наилучших решений.';
      characteristics = [
        'Поиск win-win решений',
        'Высокая ассертивность и кооперативность',
        'Фокус на интересах а не позициях',
        'Творческий подход к решению проблем',
        'Долгосрочная перспектива',
        'Инвестирование времени в понимание'
      ];
      advantages = [
        'Оптимальные решения для всех сторон',
        'Укрепление отношений',
        'Высокое качество решений',
        'Развитие доверия и понимания',
        'Предотвращение будущих конфликтов'
      ];
      disadvantages = [
        'Требует много времени и энергии',
        'Не всегда возможно найти win-win решение',
        'Может быть неэффективно в кризисных ситуациях',
        'Требует готовности всех сторон к сотрудничеству',
        'Может восприниматься как нерешительность'
      ];
      best_situations = [
        'Важные долгосрочные отношения',
        'Сложные проблемы требующие творческого решения',
        'Когда есть время для обсуждения',
        'Ситуации где возможны win-win решения'
      ];
      worst_situations = [
        'Кризисные ситуации требующие быстрых решений',
        'Когда другие не готовы к сотрудничеству',
        'Простые проблемы не стоящие усилий',
        'Ситуации с четким победителем и проигравшим'
      ];
      development_tips = [
        'Изучайте техники активного слушания',
        'Развивайте навыки фасилитации',
        'Практикуйте разделение интересов и позиций',
        'Учитесь управлять временем в переговорах',
        'Развивайте терпение и настойчивость'
      ];
      communication_patterns = [
        'Открытые вопросы для понимания интересов',
        'Активное слушание и парафразирование',
        'Генерация множества вариантов решений',
        'Фокус на общих целях',
        'Поощрение открытости и честности'
      ];
      relationship_impact = [
        'Значительное укрепление отношений',
        'Высокий уровень доверия',
        'Взаимное уважение и понимание',
        'Основа для будущего сотрудничества'
      ];
      alternative_strategies = [
        'В ситуациях ограниченного времени используйте компромисс',
        'При кризисах будьте готовы к более директивному подходу',
        'Изучайте когда стоит уступить для сохранения отношений',
        'Развивайте навыки быстрого принятия решений'
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
    advantages,
    disadvantages,
    best_situations,
    worst_situations,
    development_tips,
    communication_patterns,
    relationship_impact,
    alternative_strategies
  };
};