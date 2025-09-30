/**
 * Тест на стили привязанности
 * Определяет стиль привязанности в близких отношениях на основе теории Боулби и Эйнсворт
 */

export interface AttachmentQuestion {
  id: string;
  text: string;
  category: 'relationships' | 'emotions' | 'self_view' | 'others_view' | 'behaviors';
  options: {
    text: string;
    secure: number; // Надежная привязанность
    anxious: number; // Тревожная привязанность
    avoidant: number; // Избегающая привязанность
    disorganized: number; // Дезорганизованная привязанность
  }[];
}

export interface AttachmentResult {
  primary_style: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
  secondary_style?: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
  scores: {
    secure: number;
    anxious: number;
    avoidant: number;
    disorganized: number;
  };
  percentages: {
    secure: number;
    anxious: number;
    avoidant: number;
    disorganized: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  in_relationships: string[];
  growth_strategies: string[];
  partner_compatibility: {
    best_matches: string[];
    challenges_with: string[];
  };
  childhood_origins: string[];
  healing_path: string[];
}

export const attachmentQuestions: AttachmentQuestion[] = [
  {
    id: '1',
    text: 'Как вы обычно реагируете, когда близкий человек не отвечает на ваши сообщения?',
    category: 'emotions',
    options: [
      {
        text: 'Спокойно жду ответа, понимая что у человека могут быть свои дела',
        secure: 3,
        anxious: 0,
        avoidant: 1,
        disorganized: 0,
      },
      {
        text: 'Начинаю беспокоиться и придумывать негативные сценарии',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Меня это не особо беспокоит, у меня есть свои дела',
        secure: 1,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'То злюсь, то беспокоюсь - реакции непредсказуемы',
        secure: 0,
        anxious: 1,
        avoidant: 0,
        disorganized: 3,
      },
    ],
  },
  {
    id: '2',
    text: 'Как легко вам открываться эмоционально в отношениях?',
    category: 'emotions',
    options: [
      {
        text: 'Могу открыться, когда чувствую доверие и безопасность',
        secure: 3,
        anxious: 1,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Очень трудно, боюсь быть отвергнутым или непонятым',
        secure: 0,
        anxious: 2,
        avoidant: 1,
        disorganized: 1,
      },
      {
        text: 'Предпочитаю держать чувства при себе',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Иногда слишком откровенен, иногда полностью закрыт',
        secure: 0,
        anxious: 1,
        avoidant: 0,
        disorganized: 3,
      },
    ],
  },
  {
    id: '3',
    text: 'Что вы чувствуете, когда партнер проводит время с друзьями без вас?',
    category: 'relationships',
    options: [
      {
        text: 'Рад что у него есть свои интересы и социальные связи',
        secure: 3,
        anxious: 0,
        avoidant: 1,
        disorganized: 0,
      },
      {
        text: 'Беспокойство, что он предпочитает их компанию моей',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Облегчение - получаю время для себя',
        secure: 1,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Смешанные чувства - то ревность, то безразличие',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '4',
    text: 'Как вы справляетесь с конфликтами в отношениях?',
    category: 'behaviors',
    options: [
      {
        text: 'Стараюсь обсудить проблему открыто и найти компромисс',
        secure: 3,
        anxious: 0,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Очень переживаю, боюсь разрушить отношения',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Предпочитаю дистанцироваться и избегать разговора',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Реакции непоследовательны - то агрессия, то избегание',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '5',
    text: 'Как вы относитесь к идее долгосрочных отношений?',
    category: 'relationships',
    options: [
      {
        text: 'Стремлюсь к стабильным, долгосрочным отношениям',
        secure: 3,
        anxious: 2,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Хочу близости, но боюсь что партнер меня оставит',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Ценю независимость больше чем близость',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Хочу близости, но одновременно боюсь её',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '6',
    text: 'Как вы обычно просите о помощи?',
    category: 'behaviors',
    options: [
      {
        text: 'Прямо говорю о своих потребностях когда нужно',
        secure: 3,
        anxious: 0,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Намекаю, ожидая что партнер догадается',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Предпочитаю справляться сам, редко прошу помощи',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'То требую помощи, то отвергаю её',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '7',
    text: 'Что происходит когда ваш партнер расстроен?',
    category: 'emotions',
    options: [
      {
        text: 'Стараюсь его поддержать и выяснить как помочь',
        secure: 3,
        anxious: 1,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Беспокоюсь что это из-за меня, стараюсь исправить',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Чувствую дискомфорт и хочется дистанцироваться',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'То пытаюсь помочь, то ухожу - реакции хаотичны',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '8',
    text: 'Как вы реагируете на комплименты от партнера?',
    category: 'self_view',
    options: [
      {
        text: 'Принимаю их с благодарностью',
        secure: 3,
        anxious: 1,
        avoidant: 1,
        disorganized: 0,
      },
      {
        text: 'Сомневаюсь в искренности, ищу скрытый смысл',
        secure: 0,
        anxious: 3,
        avoidant: 1,
        disorganized: 2,
      },
      {
        text: 'Чувствую неловкость, пытаюсь сменить тему',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 1,
      },
      {
        text: 'Реакции непредсказуемы - от радости до недоверия',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '9',
    text: 'Как вы ведете себя в начале отношений?',
    category: 'relationships',
    options: [
      {
        text: 'Постепенно открываюсь, изучаю партнера',
        secure: 3,
        anxious: 0,
        avoidant: 1,
        disorganized: 0,
      },
      {
        text: 'Быстро привязываюсь, хочу проводить много времени вместе',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Держу дистанцию, не тороплюсь с близостью',
        secure: 1,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'То сближаюсь, то отдаляюсь - поведение непоследовательно',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '10',
    text: 'Что для вас означает "быть любимым"?',
    category: 'self_view',
    options: [
      {
        text: 'Чувствовать принятие, понимание и поддержку',
        secure: 3,
        anxious: 1,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Знать что партнер никогда не оставит меня',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Иметь партнера, который уважает мои границы',
        secure: 2,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Сложно определить - мои потребности часто противоречивы',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '11',
    text: 'Как вы справляетесь с ревностью?',
    category: 'emotions',
    options: [
      {
        text: 'Открыто обсуждаю свои чувства с партнером',
        secure: 3,
        anxious: 0,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Ревность сильно меня мучает, трудно контролировать',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 2,
      },
      {
        text: 'Стараюсь подавлять эти чувства',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 1,
      },
      {
        text: 'То взрываюсь от ревности, то притворяюсь что всё нормально',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '12',
    text: 'Как вы относитесь к критике от близких людей?',
    category: 'self_view',
    options: [
      {
        text: 'Стараюсь выслушать и понять, если критика конструктивна',
        secure: 3,
        anxious: 0,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Очень болезненно воспринимаю, начинаю сомневаться в себе',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Защищаюсь или отстраняюсь эмоционально',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Реакции непредсказуемы - от агрессии до самобичевания',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '13',
    text: 'Что происходит когда отношения заканчиваются?',
    category: 'relationships',
    options: [
      {
        text: 'Грущу, но со временем восстанавливаюсь и готов к новым отношениям',
        secure: 3,
        anxious: 0,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Очень тяжело переживаю, долго не могу отпустить',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Быстро переключаюсь, стараюсь не думать об этом',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'То страдаю, то злюсь, то притворяюсь что всё нормально',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '14',
    text: 'Как вы выражаете любовь?',
    category: 'behaviors',
    options: [
      {
        text: 'Разными способами в зависимости от потребностей партнера',
        secure: 3,
        anxious: 1,
        avoidant: 0,
        disorganized: 0,
      },
      {
        text: 'Постоянно стараюсь доказать свою любовь',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 1,
      },
      {
        text: 'Через дела и поддержку, не люблю словесные проявления',
        secure: 1,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Способы выражения любви часто противоречивы',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
  {
    id: '15',
    text: 'Что вы думаете о себе в отношениях?',
    category: 'self_view',
    options: [
      {
        text: 'Я достоин любви и способен любить других',
        secure: 3,
        anxious: 0,
        avoidant: 1,
        disorganized: 0,
      },
      {
        text: 'Я недостаточно хорош, партнер может меня бросить',
        secure: 0,
        anxious: 3,
        avoidant: 0,
        disorganized: 2,
      },
      {
        text: 'Я самодостаточен и не нуждаюсь в особой близости',
        secure: 0,
        anxious: 0,
        avoidant: 3,
        disorganized: 0,
      },
      {
        text: 'Мои мысли о себе часто противоречивы и меняются',
        secure: 0,
        anxious: 1,
        avoidant: 1,
        disorganized: 3,
      },
    ],
  },
];

export const calculateAttachmentResult = (answers: Record<string, number>): AttachmentResult => {
  const scores = {
    secure: 0,
    anxious: 0,
    avoidant: 0,
    disorganized: 0,
  };

  // Подсчитываем баллы для каждого стиля привязанности
  attachmentQuestions.forEach((question, _index) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.secure += option.secure;
      scores.anxious += option.anxious;
      scores.avoidant += option.avoidant;
      scores.disorganized += option.disorganized;
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
    secure: Math.round((scores.secure / totalScore) * 100),
    anxious: Math.round((scores.anxious / totalScore) * 100),
    avoidant: Math.round((scores.avoidant / totalScore) * 100),
    disorganized: Math.round((scores.disorganized / totalScore) * 100),
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let challenges: string[];
  let in_relationships: string[];
  let growth_strategies: string[];
  let partner_compatibility: { best_matches: string[]; challenges_with: string[] };
  let childhood_origins: string[];
  let healing_path: string[];

  switch (primary_style) {
    case 'secure':
      title = 'Надежная привязанность';
      description =
        'У вас надежный стиль привязанности. Вы комфортно чувствуете себя в близких отношениях, способны доверять партнеру и открыто выражать свои потребности. Вы видите себя достойным любви, а других - заслуживающими доверия. Это самый здоровый стиль привязанности.';
      characteristics = [
        'Комфортность с интимностью и автономией',
        'Способность открыто выражать чувства',
        'Доверие к партнеру',
        'Эффективное разрешение конфликтов',
        'Позитивное отношение к себе и другим',
        'Эмоциональная регуляция',
      ];
      strengths = [
        'Высокая эмоциональная стабильность',
        'Способность к глубокой близости',
        'Конструктивное решение проблем',
        'Поддержка независимости партнера',
        'Адекватная самооценка',
        'Умение создавать доверие',
      ];
      challenges = [
        'Могут недооценивать потребности менее безопасных партнеров',
        'Иногда слишком оптимистичны в оценке отношений',
        'Могут не замечать тонкие признаки проблем',
      ];
      in_relationships = [
        'Создают атмосферу безопасности и доверия',
        'Открыто обсуждают проблемы и потребности',
        'Поддерживают баланс между близостью и независимостью',
        'Способны к компромиссам',
        'Легко прощают и идут на примирение',
      ];
      growth_strategies = [
        'Продолжайте развивать эмпатию к менее безопасным партнерам',
        'Изучайте признаки других стилей привязанности',
        'Помогайте партнерам чувствовать себя безопаснее',
        'Поддерживайте свое эмоциональное здоровье',
      ];
      partner_compatibility = {
        best_matches: [
          'Любой стиль (особенно хорошо с надежным)',
          'Могут "исцелить" тревожных и избегающих партнеров',
        ],
        challenges_with: [
          'Минимальные трудности',
          'Могут потребоваться дополнительные усилия с дезорганизованными партнерами',
        ],
      };
      childhood_origins = [
        'Последовательная и отзывчивая забота',
        'Эмоциональная поддержка родителей',
        'Баланс между защитой и поощрением независимости',
        'Позитивные модели отношений',
      ];
      healing_path = [
        'Продолжайте поддерживать здоровые паттерны',
        'Помогайте другим развивать безопасность',
        'Изучайте психологию отношений',
        'Практикуйте осознанность в отношениях',
      ];
      break;

    case 'anxious':
      title = 'Тревожная привязанность';
      description =
        'У вас тревожный стиль привязанности. Вы сильно нуждаетесь в близости, но постоянно беспокоитесь о том, что партнер может вас покинуть. Вы склонны к интенсивным эмоциональным переживаниям в отношениях и можете быть очень чувствительными к изменениям в поведении партнера.';
      characteristics = [
        'Сильная потребность в близости и одобрении',
        'Страх быть покинутым',
        'Повышенная чувствительность к сигналам отвержения',
        'Склонность к "прилипчивому" поведению',
        'Интенсивные эмоциональные реакции',
        'Низкая самооценка в отношениях',
      ];
      strengths = [
        'Глубокая способность к любви',
        'Высокая эмпатия и чувствительность',
        'Мотивация работать над отношениями',
        'Способность к эмоциональной близости',
        'Интуитивное понимание потребностей других',
      ];
      challenges = [
        'Чрезмерная потребность в подтверждении',
        'Склонность к драматизации проблем',
        'Трудности с границами',
        'Ревность и подозрительность',
        'Страх конфликтов и одновременно их провоцирование',
      ];
      in_relationships = [
        'Ищут постоянные подтверждения любви',
        'Могут быть "навязчивыми" в выражении чувств',
        'Склонны к протестному поведению при угрозе разлуки',
        'Часто интерпретируют нейтральное поведение как отвержение',
        'Могут жертвовать собой ради отношений',
      ];
      growth_strategies = [
        'Развивайте самооценку независимо от отношений',
        'Практикуйте самоуспокоение и эмоциональную регуляцию',
        'Изучайте техники осознанности',
        'Работайте с терапевтом над травмами привязанности',
        'Учитесь доверять партнеру',
      ];
      partner_compatibility = {
        best_matches: ['Надежный стиль привязанности', 'Другие тревожные (при работе над собой)'],
        challenges_with: ['Избегающий стиль', 'Дезорганизованный стиль'],
      };
      childhood_origins = [
        'Непоследовательная родительская забота',
        'Эмоционально нестабильные родители',
        'Чрезмерная опека или недостаток внимания',
        'Ранние потери или разлуки',
      ];
      healing_path = [
        'Терапия привязанности или семейная терапия',
        'Практика медитации и осознанности',
        'Работа с самооценкой',
        'Изучение здоровых границ',
        'Постепенное развитие доверия',
      ];
      break;

    case 'avoidant':
      title = 'Избегающая привязанность';
      description =
        'У вас избегающий стиль привязанности. Вы цените независимость превыше близости и чувствуете дискомфорт от чрезмерной эмоциональной интимности. Вы склонны подавлять свои эмоции и потребности в привязанности, предпочитая полагаться только на себя.';
      characteristics = [
        'Высокая ценность независимости',
        'Дискомфорт с эмоциональной близостью',
        'Склонность к эмоциональному дистанцированию',
        'Подавление потребностей в привязанности',
        'Self-reliance (опора на себя)',
        'Трудности с выражением эмоций',
      ];
      strengths = [
        'Высокая самостоятельность',
        'Эмоциональная стабильность в кризисах',
        'Рациональный подход к проблемам',
        'Способность давать партнеру пространство',
        'Ответственность и надежность',
      ];
      challenges = [
        'Трудности с эмоциональной близостью',
        'Склонность к отстранению в стрессе',
        'Недооценка важности отношений',
        'Трудности с выражением потребностей',
        'Может казаться холодным или отчужденным',
      ];
      in_relationships = [
        'Поддерживают эмоциональную дистанцию',
        'Избегают глубоких разговоров о чувствах',
        'Могут "исчезать" во время конфликтов',
        'Ценят партнеров, которые уважают их пространство',
        'Показывают любовь через дела, а не слова',
      ];
      growth_strategies = [
        'Практикуйте выражение эмоций в безопасной обстановке',
        'Изучайте важность эмоциональной близости',
        'Работайте с терапевтом над страхами интимности',
        'Развивайте эмпатию к потребностям партнера',
        'Учитесь просить о помощи',
      ];
      partner_compatibility = {
        best_matches: [
          'Надежный стиль привязанности',
          'Другие избегающие (с работой над близостью)',
        ],
        challenges_with: ['Тревожный стиль', 'Дезорганизованный стиль'],
      };
      childhood_origins = [
        'Эмоционально недоступные родители',
        'Поощрение независимости в ущерб близости',
        'Критика за выражение эмоций',
        'Ранняя самостоятельность из необходимости',
      ];
      healing_path = [
        'Терапия, фокусирующаяся на эмоциях',
        'Постепенное развитие эмоциональной близости',
        'Изучение своих эмоциональных потребностей',
        'Практика уязвимости в безопасных отношениях',
        'Работа с детскими травмами',
      ];
      break;

    case 'disorganized':
      title = 'Дезорганизованная привязанность';
      description =
        'У вас дезорганизованный стиль привязанности. Вы одновременно стремитесь к близости и боитесь её. Ваше поведение в отношениях может быть непредсказуемым - от сильной привязанности до внезапного отстранения. Это часто результат сложных детских переживаний.';
      characteristics = [
        'Противоречивые потребности в близости и дистанции',
        'Непредсказуемые эмоциональные реакции',
        'Страх как близости, так и покинутости',
        'Хаотичные паттерны поведения в отношениях',
        'Интенсивные и нестабильные эмоции',
        'Трудности с саморегуляцией',
      ];
      strengths = [
        'Глубокая способность к эмпатии',
        'Интенсивность чувств',
        'Способность к трансформации при поддержке',
        'Интуитивное понимание боли других',
        'Творческие способности',
      ];
      challenges = [
        'Непредсказуемость в отношениях',
        'Интенсивные эмоциональные взрывы',
        'Трудности с доверием',
        'Саморазрушительное поведение',
        'Хаотичная самооценка',
      ];
      in_relationships = [
        'Быстрые переходы от идеализации к обесцениванию',
        'Провокация конфликтов из страха покинутости',
        'Интенсивные и нестабильные отношения',
        'Трудности с поддержанием границ',
        'Склонность к драматичным реакциям',
      ];
      growth_strategies = [
        'Обязательно обратитесь к квалифицированному психотерапевту',
        'Изучайте техники эмоциональной регуляции',
        'Практикуйте осознанность и заземление',
        'Работайте с травмами детства',
        'Развивайте навыки здоровой коммуникации',
      ];
      partner_compatibility = {
        best_matches: [
          'Очень терпеливый и понимающий надежный партнер',
          'Профессиональная поддержка необходима',
        ],
        challenges_with: [
          'Большинство стилей без профессиональной помощи',
          'Особенно сложно с другими нестабильными стилями',
        ],
      };
      childhood_origins = [
        'Травматические переживания в детстве',
        'Родители как источник как утешения, так и страха',
        'Противоречивое воспитание',
        'Серьезные потери или разлуки',
        'Физическое или эмоциональное насилие',
      ];
      healing_path = [
        'Долгосрочная психотерапия (DBT, EMDR, травма-терапия)',
        'Работа с травмами детства',
        'Развитие навыков эмоциональной регуляции',
        'Создание стабильной системы поддержки',
        'Медикаментозная поддержка при необходимости',
        'Группы поддержки',
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
    growth_strategies,
    partner_compatibility,
    childhood_origins,
    healing_path,
  };
};
