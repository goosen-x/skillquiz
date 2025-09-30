/**
 * Тест на стили коммуникации
 * Определяет доминирующий стиль общения и коммуникации
 */

export interface CommunicationQuestion {
  id: string;
  text: string;
  situation: 'conflict' | 'leadership' | 'feedback' | 'daily' | 'stress';
  options: {
    text: string;
    assertive: number; // Уверенный/ассертивный
    aggressive: number; // Агрессивный
    passive: number; // Пассивный
    passive_aggressive: number; // Пассивно-агрессивный
  }[];
}

export interface CommunicationResult {
  primary_style: 'assertive' | 'aggressive' | 'passive' | 'passive_aggressive';
  secondary_style?: 'assertive' | 'aggressive' | 'passive' | 'passive_aggressive';
  scores: {
    assertive: number;
    aggressive: number;
    passive: number;
    passive_aggressive: number;
  };
  percentages: {
    assertive: number;
    aggressive: number;
    passive: number;
    passive_aggressive: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  in_relationships: string[];
  at_work: string[];
  development_tips: string[];
  phrase_examples: {
    typical: string[];
    alternative: string[];
  };
  body_language: string[];
  triggers: string[];
}

export const communicationQuestions: CommunicationQuestion[] = [
  {
    id: '1',
    text: 'Когда кто-то не согласен с вашим мнением на встрече, вы:',
    situation: 'conflict',
    options: [
      {
        text: 'Спокойно объясняете свою точку зрения и выслушиваете их аргументы',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Настаиваете на своем и перебиваете оппонента',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Соглашаетесь, чтобы избежать конфликта, даже если не согласны',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Формально соглашаетесь, но позже критикуете решение за их спиной',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '2',
    text: 'Как вы реагируете, когда коллега не выполняет свою часть работы?',
    situation: 'feedback',
    options: [
      {
        text: 'Прямо говорите с ним о проблеме и предлагаете решение',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Обвиняете его в безответственности и требуете немедленных действий',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Делаете его работу сами, ничего не говоря',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Намекаете на проблему косвенно или жалуетесь другим коллегам',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '3',
    text: 'В ресторане вам принесли не то блюдо, которое вы заказывали. Вы:',
    situation: 'daily',
    options: [
      {
        text: 'Вежливо обращаетесь к официанту и просите исправить ошибку',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Громко выражаете недовольство и требуете менеджера',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Едите то, что принесли, не желая никого беспокоить',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Ничего не говорите, но оставляете плохой отзыв онлайн',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '4',
    text: 'Когда вам нужно дать обратную связь подчиненному о его ошибках:',
    situation: 'leadership',
    options: [
      {
        text: 'Планируете приватную встречу и конструктивно обсуждаете проблемы',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Критикуете его открыто перед другими сотрудниками',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Избегаете разговора, надеясь что проблема решится сама',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Делаете саркастические комментарии или даете менее важные задачи',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '5',
    text: 'Когда вы находитесь под сильным давлением на работе:',
    situation: 'stress',
    options: [
      {
        text: 'Открыто обсуждаете с руководством свою нагрузку и просите поддержки',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Взрываетесь на коллег или подчиненных',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Молча страдаете и пытаетесь справиться в одиночку',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Начинаете работать медленнее или "забывать" о некоторых задачах',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '6',
    text: 'Как вы обычно выражаете несогласие с решением руководства?',
    situation: 'conflict',
    options: [
      {
        text: 'Запрашиваете встречу и излагаете свои опасения с фактами',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Открыто критикуете решение на общих собраниях',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Не высказываете своего мнения, даже если считаете решение неправильным',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Формально соглашаетесь, но саботируете выполнение',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '7',
    text: 'Когда друг постоянно опаздывает на встречи:',
    situation: 'daily',
    options: [
      {
        text: 'Говорите с ним честно о том, как это влияет на вас',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Устраиваете ему сцену и угрожаете прекратить дружбу',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Ничего не говорите, но внутри злитесь и расстраиваетесь',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Начинаете опаздывать в ответ или отменяете планы в последний момент',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '8',
    text: 'Как вы реагируете на конструктивную критику?',
    situation: 'feedback',
    options: [
      {
        text: 'Выслушиваете, задаете уточняющие вопросы и благодарите за обратную связь',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Защищаетесь и контратакуете критикой в адрес говорящего',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Соглашаетесь со всем, даже если критика неконструктивна',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Формально принимаете, но потом игнорируете советы',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '9',
    text: 'В групповой дискуссии вы обычно:',
    situation: 'leadership',
    options: [
      {
        text: 'Активно участвуете, выражаете свои идеи и выслушиваете других',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Доминируете в разговоре и перебиваете других',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Молчите и соглашаетесь с мнением большинства',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Делаете скептические комментарии или показываете несогласие невербально',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '10',
    text: 'Когда кто-то перебивает вас во время разговора:',
    situation: 'conflict',
    options: [
      {
        text: 'Спокойно просите дать вам закончить мысль',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Говорите еще громче или перебиваете в ответ',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Замолкаете и не продолжаете свою мысль',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Продолжаете говорить, но с раздражением в голосе',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '11',
    text: 'Как вы просите о повышении зарплаты?',
    situation: 'leadership',
    options: [
      {
        text: 'Подготавливаете аргументы и назначаете встречу с руководителем',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Ультимативно требуете повышения или угрожаете уволиться',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Ждете, что руководство само заметит ваш вклад',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Намекаете коллегам, надеясь что информация дойдет до руководства',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
  {
    id: '12',
    text: 'Когда вы злитесь на близкого человека:',
    situation: 'stress',
    options: [
      {
        text: 'Говорите о своих чувствах открыто и конструктивно',
        assertive: 3,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Кричите или устраиваете эмоциональную сцену',
        assertive: 0,
        aggressive: 3,
        passive: 0,
        passive_aggressive: 0,
      },
      {
        text: 'Подавляете злость и притворяетесь что все нормально',
        assertive: 0,
        aggressive: 0,
        passive: 3,
        passive_aggressive: 0,
      },
      {
        text: 'Становитесь холодными и отстраненными',
        assertive: 0,
        aggressive: 0,
        passive: 0,
        passive_aggressive: 3,
      },
    ],
  },
];

export const calculateCommunicationResult = (
  answers: Record<string, number>
): CommunicationResult => {
  const scores = {
    assertive: 0,
    aggressive: 0,
    passive: 0,
    passive_aggressive: 0,
  };

  // Подсчитываем баллы для каждого стиля
  communicationQuestions.forEach((question) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.assertive += option.assertive;
      scores.aggressive += option.aggressive;
      scores.passive += option.passive;
      scores.passive_aggressive += option.passive_aggressive;
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
    assertive: Math.round((scores.assertive / totalScore) * 100),
    aggressive: Math.round((scores.aggressive / totalScore) * 100),
    passive: Math.round((scores.passive / totalScore) * 100),
    passive_aggressive: Math.round((scores.passive_aggressive / totalScore) * 100),
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let challenges: string[];
  let in_relationships: string[];
  let at_work: string[];
  let development_tips: string[];
  let phrase_examples: { typical: string[]; alternative: string[] };
  let body_language: string[];
  let triggers: string[];

  switch (primary_style) {
    case 'assertive':
      title = 'Ассертивный стиль коммуникации';
      description =
        'Ваш основной стиль коммуникации - ассертивный. Это наиболее здоровый и эффективный способ общения. Вы умеете выражать свои мысли и чувства честно и прямо, при этом уважая права и мнения других людей. Вы способны отстаивать свои интересы, не причиняя вреда окружающим.';
      characteristics = [
        'Открытое и честное выражение мыслей',
        'Уважение к себе и другим',
        'Четкие границы в общении',
        'Способность сказать "нет" при необходимости',
        'Конструктивное решение конфликтов',
        'Активное слушание',
      ];
      strengths = [
        'Высокая самооценка и уверенность',
        'Здоровые отношения с окружающими',
        'Эффективное лидерство',
        'Способность к переговорам и компромиссам',
        'Ясное выражение потребностей',
        'Уважение со стороны коллег',
      ];
      challenges = [
        'Иногда может показаться слишком прямолинейным',
        'Может вызывать дискомфорт у людей с другими стилями',
        'Требует постоянной практики для поддержания',
      ];
      in_relationships = [
        'Открыто обсуждают проблемы и потребности',
        'Поддерживают здоровые границы',
        'Способны на компромиссы',
        'Выражают любовь и признательность',
        'Конструктивно решают конфликты',
      ];
      at_work = [
        'Эффективно руководят командами',
        'Ясно коммуницируют цели и ожидания',
        'Дают конструктивную обратную связь',
        'Успешно ведут переговоры',
        'Пользуются уважением коллег',
      ];
      development_tips = [
        'Продолжайте развивать эмпатию',
        'Изучайте культурные различия в коммуникации',
        'Помогайте другим развивать ассертивность',
        'Практикуйте активное слушание',
      ];
      phrase_examples = {
        typical: [
          'Я считаю, что...',
          'Мне бы хотелось...',
          'Я не согласен с этим, потому что...',
          'Помогите мне понять вашу точку зрения',
        ],
        alternative: [
          'Продолжайте использовать подобные фразы',
          'Развивайте словарь эмоций',
          'Используйте "Я-сообщения"',
          'Подтверждайте понимание собеседника',
        ],
      };
      body_language = [
        'Прямой зрительный контакт',
        'Открытая поза',
        'Спокойный тон голоса',
        'Расслабленные плечи',
        'Соответствующие жесты',
      ];
      triggers = ['Минимальные триггеры благодаря здоровым границам'];
      break;

    case 'aggressive':
      title = 'Агрессивный стиль коммуникации';
      description =
        'Ваш преобладающий стиль коммуникации - агрессивный. Вы склонны выражать свои потребности и мнения напористо, иногда за счет чувств и прав других людей. Хотя этот стиль может помочь добиться краткосрочных целей, он часто наносит вред отношениям и может создавать враждебную атмосферу.';
      characteristics = [
        'Доминирование в разговоре',
        'Перебивание других',
        'Громкий или резкий тон',
        'Игнорирование чужих потребностей',
        'Склонность к критике и обвинениям',
        'Нетерпимость к возражениям',
      ];
      strengths = [
        'Способность быстро принимать решения',
        'Уверенность в выражении мнения',
        'Энергичность и настойчивость',
        'Способность мотивировать через давление',
      ];
      challenges = [
        'Разрушение отношений',
        'Создание враждебной атмосферы',
        'Подавление творчества команды',
        'Высокий уровень стресса',
        'Отсутствие доверия со стороны окружающих',
        'Проблемы с долгосрочным лидерством',
      ];
      in_relationships = [
        'Частые конфликты и ссоры',
        'Эмоциональное дистанцирование партнера',
        'Попытки контролировать других',
        'Трудности с компромиссами',
        'Накопление обид у близких',
      ];
      at_work = [
        'Высокая текучесть кадров в команде',
        'Подавление инициативы подчиненных',
        'Конфликты с коллегами',
        'Краткосрочные результаты за счет отношений',
        'Репутация "трудного" сотрудника',
      ];
      development_tips = [
        'Учитесь распознавать свои триггеры',
        'Практикуйте техники управления гневом',
        'Развивайте эмпатию и активное слушание',
        'Изучайте ассертивную коммуникацию',
        'Работайте с психологом при необходимости',
      ];
      phrase_examples = {
        typical: ['Ты должен...', 'Это глупо!', 'Почему ты никогда не...', 'Делай, как я сказал!'],
        alternative: [
          'Я бы предпочел, чтобы...',
          'У меня другое мнение на этот счет',
          'Давайте найдем решение вместе',
          'Помогите мне понять вашу позицию',
        ],
      };
      body_language = [
        'Напряженная поза',
        'Интенсивный зрительный контакт',
        'Громкий голос',
        'Агрессивные жесты',
        'Вторжение в личное пространство',
      ];
      triggers = [
        'Критика или возражения',
        'Чувство потери контроля',
        'Стресс и давление',
        'Неуважение к статусу',
        'Медленное принятие решений',
      ];
      break;

    case 'passive':
      title = 'Пассивный стиль коммуникации';
      description =
        'Ваш доминирующий стиль коммуникации - пассивный. Вы избегаете выражения своих потребностей и мнений, стремясь избежать конфликтов. Хотя это может создавать впечатление миролюбия, пассивность часто приводит к накоплению негативных эмоций и неудовлетворенности.';
      characteristics = [
        'Избегание выражения своего мнения',
        'Согласие с другими даже при несогласии',
        'Трудности с принятием решений',
        'Извинения за свои потребности',
        'Боязнь конфликтов',
        'Подавление собственных эмоций',
      ];
      strengths = [
        'Способность к сотрудничеству',
        'Эмпатия к другим',
        'Создание гармоничной атмосферы',
        'Готовность помочь',
        'Терпеливость',
      ];
      challenges = [
        'Неудовлетворенные потребности',
        'Накопление обид и фрустрации',
        'Низкая самооценка',
        'Эксплуатация со стороны других',
        'Стресс от внутренних конфликтов',
        'Отсутствие влияния на решения',
      ];
      in_relationships = [
        'Односторонние отношения',
        'Накопление невысказанных обид',
        'Трудности с выражением потребностей',
        'Привлечение доминирующих партнеров',
        'Недооценка собственной важности',
      ];
      at_work = [
        'Недооценка вклада',
        'Перегрузка работой',
        'Пропуск возможностей продвижения',
        'Отсутствие влияния на решения',
        'Накопление профессионального стресса',
      ];
      development_tips = [
        'Изучайте ассертивную коммуникацию',
        'Практикуйте выражение своих потребностей',
        'Развивайте уверенность в себе',
        'Учитесь говорить "нет"',
        'Работайте над самооценкой',
      ];
      phrase_examples = {
        typical: ['Извините, но...', 'Может быть, вы правы', 'Это неважно', 'Как скажете'],
        alternative: [
          'Я думаю, что...',
          'Мое мнение отличается',
          'Это важно для меня',
          'Я предлагаю рассмотреть...',
        ],
      };
      body_language = [
        'Избегание зрительного контакта',
        'Закрытая поза',
        'Тихий голос',
        'Нервные жесты',
        'Сутулость',
      ];
      triggers = [
        'Необходимость высказать мнение',
        'Конфликтные ситуации',
        'Критика или недовольство',
        'Просьбы о помощи',
        'Давление принять решение',
      ];
      break;

    case 'passive_aggressive':
      title = 'Пассивно-агрессивный стиль коммуникации';
      description =
        'Ваш преобладающий стиль коммуникации - пассивно-агрессивный. Вы избегаете прямого выражения негативных эмоций, но выражаете их косвенными способами. Это создает напряжение в отношениях и затрудняет решение проблем, так как истинные чувства остаются скрытыми.';
      characteristics = [
        'Косвенное выражение негативных эмоций',
        'Саркастические комментарии',
        'Саботаж или "забывание" обязательств',
        'Молчаливое несогласие',
        'Избегание прямой конфронтации',
        'Скрытая критика',
      ];
      strengths = [
        'Избежание открытых конфликтов',
        'Способность к наблюдению',
        'Понимание скрытых мотивов',
        'Чувствительность к атмосфере',
      ];
      challenges = [
        'Создание токсичной атмосферы',
        'Накопление неразрешенных проблем',
        'Разрушение доверия',
        'Манипулятивное поведение',
        'Хронический стресс',
        'Отсутствие реального решения проблем',
      ];
      in_relationships = [
        'Скрытые конфликты и обиды',
        'Манипулятивное поведение',
        'Эмоциональное дистанцирование',
        'Создание чувства вины у партнера',
        'Нестабильная эмоциональная атмосфера',
      ];
      at_work = [
        'Саботаж проектов или процессов',
        'Скрытое сопротивление изменениям',
        'Создание интриг в коллективе',
        'Снижение командной эффективности',
        'Репутация "сложного" сотрудника',
      ];
      development_tips = [
        'Учитесь выражать эмоции прямо',
        'Развивайте навыки ассертивности',
        'Работайте с гневом и обидами',
        'Практикуйте честную обратную связь',
        'Изучайте конструктивные способы решения конфликтов',
      ];
      phrase_examples = {
        typical: [
          'Конечно, без проблем (с сарказмом)',
          'Как скажешь (с обидой)',
          'Все нормально (когда явно не нормально)',
          'Забыл упомянуть...',
        ],
        alternative: [
          'Я чувствую себя расстроенным из-за...',
          'У меня есть опасения по поводу...',
          'Мне нужно обсудить с вами...',
          'Я не согласен и вот почему...',
        ],
      };
      body_language = [
        'Закатывание глаз',
        'Напряженная улыбка',
        'Избегающий зрительный контакт',
        'Сарказм в интонации',
        'Демонстративное игнорирование',
      ];
      triggers = [
        'Чувство несправедливости',
        'Невозможность выразить мнение',
        'Давление или принуждение',
        'Критика или неодобрение',
        'Потеря контроля над ситуацией',
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
    in_relationships,
    at_work,
    development_tips,
    phrase_examples,
    body_language,
    triggers,
  };
};
