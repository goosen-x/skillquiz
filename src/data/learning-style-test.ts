/**
 * Тест на стили обучения
 * Определяет предпочитаемые способы восприятия и обработки информации
 */

export interface LearningStyleQuestion {
  id: string;
  text: string;
  category: 'processing' | 'perception' | 'input' | 'understanding' | 'organization';
  options: {
    text: string;
    visual: number; // Визуальный стиль
    auditory: number; // Аудиальный стиль
    kinesthetic: number; // Кинестетический стиль
    reading: number; // Чтение/письмо стиль
  }[];
}

export interface LearningStyleResult {
  primary_style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  secondary_style?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  scores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    reading: number;
  };
  percentages: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    reading: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  learning_preferences: string[];
  effective_methods: string[];
  challenging_situations: string[];
  study_tips: string[];
  technology_tools: string[];
  career_advantages: string[];
  development_suggestions: string[];
  memory_techniques: string[];
}

export const learningStyleQuestions: LearningStyleQuestion[] = [
  {
    id: '1',
    text: 'Когда вы изучаете новый материал, вам легче всего:',
    category: 'input',
    options: [
      {
        text: 'Использовать диаграммы, схемы и изображения',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Слушать объяснения или лекции',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Практиковаться и экспериментировать',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Читать тексты и делать заметки',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '2',
    text: 'При объяснении сложной идеи другим вы предпочитаете:',
    category: 'processing',
    options: [
      {
        text: 'Рисовать схемы или показывать картинки',
        visual: 3,
        auditory: 0,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Рассказывать устно, используя примеры',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Показывать на практике или использовать жесты',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Писать детальное объяснение',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '3',
    text: 'Ваша память лучше всего работает с:',
    category: 'perception',
    options: [
      {
        text: 'Образами, цветами и пространственным расположением',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Звуками, мелодиями и ритмами',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Движениями, ощущениями и действиями',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Словами, списками и текстовой информацией',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '4',
    text: 'При изучении нового языка вы предпочитаете:',
    category: 'input',
    options: [
      {
        text: 'Смотреть фильмы с субтитрами и изображениями',
        visual: 3,
        auditory: 1,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Слушать аудиозаписи и говорить вслух',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Использовать карточки и писать от руки',
        visual: 1,
        auditory: 0,
        kinesthetic: 1,
        reading: 3,
      },
      {
        text: 'Играть в языковые игры и петь песни',
        visual: 1,
        auditory: 1,
        kinesthetic: 3,
        reading: 0,
      },
    ],
  },
  {
    id: '5',
    text: 'Когда вам объясняют дорогу, вы предпочитаете:',
    category: 'understanding',
    options: [
      {
        text: 'Посмотреть на карту или схему',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Выслушать устные направления',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Пройти маршрут вместе с объясняющим',
        visual: 0,
        auditory: 1,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Получить письменные инструкции',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '6',
    text: 'При подготовке к экзамену вы:',
    category: 'organization',
    options: [
      {
        text: 'Создаете яркие конспекты с выделениями и схемами',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Читаете материал вслух или обсуждаете с другими',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Делаете карточки и повторяете, ходя по комнате',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Многократно перечитываете и переписываете заметки',
        visual: 0,
        auditory: 0,
        kinesthetic: 1,
        reading: 3,
      },
    ],
  },
  {
    id: '7',
    text: 'В учебной группе вы обычно:',
    category: 'processing',
    options: [
      {
        text: 'Рисуете диаграммы на доске для группы',
        visual: 3,
        auditory: 0,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Активно участвуете в обсуждениях',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Предлагаете практические упражнения',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Делитесь письменными материалами',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '8',
    text: 'Когда вы работаете с новым программным обеспечением, вы:',
    category: 'understanding',
    options: [
      {
        text: 'Изучаете интерфейс и пробуете разные кнопки',
        visual: 3,
        auditory: 0,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Смотрите видеоуроки с объяснениями',
        visual: 1,
        auditory: 3,
        kinesthetic: 0,
        reading: 0,
      },
      {
        text: 'Сразу начинаете экспериментировать методом проб и ошибок',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Читаете документацию и инструкции',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '9',
    text: 'Ваше рабочее место для учебы обычно:',
    category: 'organization',
    options: [
      {
        text: 'Украшено постерами, картинками и цветными стикерами',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Оборудовано хорошими колонками для музыки/подкастов',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Позволяет двигаться: мяч для сидения, стоячий стол',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Заполнено книгами, статьями и письменными материалами',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '10',
    text: 'При запоминании списка покупок вы:',
    category: 'perception',
    options: [
      {
        text: 'Визуализируете продукты и их расположение в магазине',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Повторяете список вслух несколько раз',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Связываете каждый продукт с действием или жестом',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Записываете список на бумаге или в телефоне',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '11',
    text: 'При решении математических задач вам помогает:',
    category: 'processing',
    options: [
      {
        text: 'Рисование графиков и диаграмм',
        visual: 3,
        auditory: 0,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Проговаривание задачи вслух',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Использование предметов или пальцев для счета',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Написание подробного решения по шагам',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '12',
    text: 'При изучении истории вы предпочитаете:',
    category: 'input',
    options: [
      {
        text: 'Карты, временные линии и исторические фотографии',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Документальные фильмы и аудиокниги',
        visual: 1,
        auditory: 3,
        kinesthetic: 0,
        reading: 0,
      },
      {
        text: 'Исторические реконструкции и музеи',
        visual: 1,
        auditory: 1,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Чтение исторических книг и документов',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '13',
    text: 'Когда вы концентрируетесь, вам нужно:',
    category: 'organization',
    options: [
      {
        text: 'Порядок и визуальная организация пространства',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Тишина или определенная фоновая музыка',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Возможность менять позу и двигаться',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Письменные материалы под рукой',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '14',
    text: 'При обучении практическому навыку (например, готовка) вы:',
    category: 'understanding',
    options: [
      {
        text: 'Смотрите видео или изучаете картинки с пошаговыми инструкциями',
        visual: 3,
        auditory: 1,
        kinesthetic: 0,
        reading: 0,
      },
      {
        text: 'Слушаете объяснения опытного человека',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Практикуетесь под наблюдением, повторяя движения',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        reading: 0,
      },
      {
        text: 'Следуете письменным рецептам и инструкциям',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
  {
    id: '15',
    text: 'Ваш идеальный способ получения обратной связи:',
    category: 'perception',
    options: [
      {
        text: 'Графики прогресса и визуальные отчеты',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        reading: 1,
      },
      {
        text: 'Устное обсуждение с преподавателем',
        visual: 0,
        auditory: 3,
        kinesthetic: 1,
        reading: 0,
      },
      {
        text: 'Практические тесты и упражнения',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        reading: 1,
      },
      {
        text: 'Письменные комментарии и оценки',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        reading: 3,
      },
    ],
  },
];

export const calculateLearningStyleResult = (
  answers: Record<string, number>
): LearningStyleResult => {
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    reading: 0,
  };

  // Подсчитываем баллы для каждого стиля
  learningStyleQuestions.forEach((question) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.visual += option.visual;
      scores.auditory += option.auditory;
      scores.kinesthetic += option.kinesthetic;
      scores.reading += option.reading;
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
    visual: Math.round((scores.visual / totalScore) * 100),
    auditory: Math.round((scores.auditory / totalScore) * 100),
    kinesthetic: Math.round((scores.kinesthetic / totalScore) * 100),
    reading: Math.round((scores.reading / totalScore) * 100),
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let learning_preferences: string[];
  let effective_methods: string[];
  let challenging_situations: string[];
  let study_tips: string[];
  let technology_tools: string[];
  let career_advantages: string[];
  let development_suggestions: string[];
  let memory_techniques: string[];

  switch (primary_style) {
    case 'visual':
      title = 'Визуальный стиль обучения';
      description =
        'Вы лучше всего усваиваете информацию через зрение. Картинки, диаграммы, схемы, цвета и пространственное расположение помогают вам понимать и запоминать материал. Вы мыслите образами и предпочитаете видеть информацию, а не только слышать или читать о ней.';
      characteristics = [
        'Предпочтение визуальной информации',
        'Сильная пространственная память',
        'Мышление образами и картинками',
        'Внимание к деталям и цветам',
        'Способность к визуализации',
        'Любовь к схемам и диаграммам',
      ];
      learning_preferences = [
        'Диаграммы, схемы и карты',
        'Цветное выделение и маркировка',
        'Видеоматериалы и презентации',
        'Графики и таблицы',
        'Mind maps (карты мышления)',
        'Визуальные органайзеры',
      ];
      effective_methods = [
        'Создавайте визуальные заметки с рисунками',
        'Используйте цветовое кодирование',
        'Рисуйте диаграммы и схемы',
        'Создавайте карты мышления',
        'Используйте стикеры и визуальные напоминания',
        'Организуйте информацию в таблицы',
      ];
      challenging_situations = [
        'Длинные лекции без визуальных материалов',
        'Аудиокниги без сопровождающих материалов',
        'Устные инструкции без визуального подтверждения',
        'Текстовая информация без иллюстраций',
      ];
      study_tips = [
        'Создавайте визуальные конспекты',
        'Используйте highlighter для выделения ключевых моментов',
        'Рисуйте схемы процессов и взаимосвязей',
        'Организуйте рабочее место визуально',
        'Используйте флэш-карты с картинками',
        'Создавайте timeline для исторических событий',
      ];
      technology_tools = [
        'Canva для создания инфографики',
        'MindMeister для карт мышления',
        'Prezi для динамичных презентаций',
        'Notion для визуальной организации заметок',
        'Draw.io для создания диаграмм',
        'Pinterest для сбора визуальных материалов',
      ];
      career_advantages = [
        'Дизайн и творческие профессии',
        'Архитектура и инженерия',
        'Преподавание с визуальными материалами',
        'Маркетинг и реклама',
        'Наука и исследования (графики, схемы)',
        'IT и веб-дизайн',
      ];
      development_suggestions = [
        'Развивайте навыки аудиального восприятия',
        'Практикуйте вербализацию визуальных концепций',
        'Учитесь объяснять идеи словами',
        'Тренируйте слуховую память',
      ];
      memory_techniques = [
        'Метод локусов (дворец памяти)',
        'Визуальные ассоциации',
        'Цветовое кодирование информации',
        'Пространственное группирование',
        'Создание ментальных карт',
      ];
      break;

    case 'auditory':
      title = 'Аудиальный стиль обучения';
      description =
        'Вы лучше всего усваиваете информацию через слух. Лекции, дискуссии, аудиозаписи и устные объяснения являются для вас наиболее эффективными способами обучения. Вы хорошо запоминаете услышанную информацию и любите проговаривать изученное.';
      characteristics = [
        'Сильная слуховая память',
        'Предпочтение устной информации',
        'Любовь к обсуждениям и дискуссиям',
        'Чувствительность к тону и ритму речи',
        'Склонность думать вслух',
        'Хорошее восприятие музыки и звуков',
      ];
      learning_preferences = [
        'Лекции и устные объяснения',
        'Аудиокниги и подкасты',
        'Групповые дискуссии',
        'Музыкальное сопровождение',
        'Повторение вслух',
        'Устные вопросы и ответы',
      ];
      effective_methods = [
        'Слушайте аудиолекции и подкасты',
        'Участвуйте в учебных группах',
        'Читайте материал вслух',
        'Записывайте себя и прослушивайте',
        'Обсуждайте материал с другими',
        'Используйте мнемонические приемы со звуками',
      ];
      challenging_situations = [
        'Тихое чтение больших текстов',
        'Визуальная информация без объяснений',
        'Самостоятельное изучение без обсуждений',
        'Работа в полной тишине',
      ];
      study_tips = [
        'Находите партнера для учебы',
        'Записывайте лекции для повторного прослушивания',
        'Проговаривайте ключевые концепции',
        'Используйте ритм и рифмы для запоминания',
        'Объясняйте материал другим людям',
        'Слушайте фоновую музыку во время учебы',
      ];
      technology_tools = [
        'Audible для аудиокниг',
        'Spotify для подкастов по интересующим темам',
        'Voice Recorder для записи лекций',
        'Zoom для участия в онлайн-дискуссиях',
        'YouTube для образовательных видео',
        'Discord для учебных голосовых каналов',
      ];
      career_advantages = [
        'Преподавание и тренинги',
        'Журналистика и радио',
        'Консультирование и коучинг',
        'Переводческая деятельность',
        'Музыка и звукорежиссура',
        'Продажи и переговоры',
      ];
      development_suggestions = [
        'Развивайте визуальные навыки',
        'Учитесь работать с диаграммами',
        'Практикуйте письменное изложение мыслей',
        'Тренируйте концентрацию в тишине',
      ];
      memory_techniques = [
        'Рифмы и ритмические паттерны',
        'Звуковые ассоциации',
        'Повторение с интонацией',
        'Музыкальные мнемоники',
        'Вербальное кодирование информации',
      ];
      break;

    case 'kinesthetic':
      title = 'Кинестетический стиль обучения';
      description =
        'Вы лучше всего учитесь через движение, прикосновения и практический опыт. Физическая активность, эксперименты и "обучение на практике" являются для вас наиболее эффективными. Вы предпочитаете активное участие в процессе обучения.';
      characteristics = [
        'Потребность в физической активности',
        'Обучение через практику и эксперименты',
        'Хорошая мышечная память',
        'Предпочтение практических занятий',
        'Использование жестов при объяснении',
        'Чувствительность к физическим ощущениям',
      ];
      learning_preferences = [
        'Практические занятия и эксперименты',
        'Ролевые игры и симуляции',
        'Строительство и создание моделей',
        'Физические упражнения',
        'Экскурсии и полевые исследования',
        'Интерактивные демонстрации',
      ];
      effective_methods = [
        'Практикуйтесь и экспериментируйте',
        'Используйте движения во время изучения',
        'Создавайте физические модели',
        'Применяйте изученное на практике',
        'Делайте регулярные перерывы для движения',
        'Используйте манипулятивные материалы',
      ];
      challenging_situations = [
        'Долгие лекции без активности',
        'Длительное сидение за партой',
        'Только теоретическое обучение',
        'Запрет на движение во время учебы',
      ];
      study_tips = [
        'Используйте стоячий стол или мяч для сидения',
        'Ходите во время заучивания материала',
        'Создавайте физические модели концепций',
        'Используйте жесты для запоминания',
        'Делайте частые активные перерывы',
        'Изучайте материал в разных местах',
      ];
      technology_tools = [
        'VR-приложения для образования',
        'Интерактивные симуляторы',
        'Приложения с AR (дополненная реальность)',
        'Игровые обучающие платформы',
        'Приложения для фитнеса и движения',
        'Сенсорные планшеты и интерактивные доски',
      ];
      career_advantages = [
        'Медицина и хирургия',
        'Инженерия и технические профессии',
        'Спорт и фитнес-тренировки',
        'Строительство и архитектура',
        'Ремесла и прикладное искусство',
        'Лабораторные исследования',
      ];
      development_suggestions = [
        'Развивайте навыки концентрации в статике',
        'Учитесь работать с текстовой информацией',
        'Практикуйте визуальное мышление',
        'Тренируйте терпение к теоретическому материалу',
      ];
      memory_techniques = [
        'Мышечная память через повторение движений',
        'Ассоциации с физическими действиями',
        'Создание "телесных" мнемоник',
        'Использование жестов для кодирования',
        'Пространственное размещение информации',
      ];
      break;

    case 'reading':
      title = 'Стиль обучения через чтение/письмо';
      description =
        'Вы лучше всего усваиваете информацию через чтение и письмо. Текстовые материалы, заметки, списки и письменные упражнения являются для вас наиболее эффективными способами обучения. Вы предпочитаете работать с написанным словом.';
      characteristics = [
        'Любовь к чтению и письму',
        'Сильные навыки работы с текстом',
        'Предпочтение письменной информации',
        'Систематический подход к заметкам',
        'Хорошее понимание грамматики и структуры',
        'Склонность к детальному анализу текстов',
      ];
      learning_preferences = [
        'Учебники и письменные материалы',
        'Подробные конспекты и заметки',
        'Списки и bullet points',
        'Письменные упражнения',
        'Исследовательские работы',
        'Словари и справочники',
      ];
      effective_methods = [
        'Читайте разнообразные материалы',
        'Делайте подробные письменные заметки',
        'Создавайте списки и планы',
        'Переписывайте важную информацию',
        'Составляйте резюме и краткие изложения',
        'Пишите эссе и размышления',
      ];
      challenging_situations = [
        'Только устная подача материала',
        'Визуальная информация без текста',
        'Групповые дискуссии без письменных материалов',
        'Практические занятия без инструкций',
      ];
      study_tips = [
        'Создавайте подробные письменные планы',
        'Переписывайте заметки для лучшего запоминания',
        'Используйте различные методы конспектирования',
        'Читайте дополнительную литературу',
        'Пишите резюме после каждой главы',
        'Создавайте глоссарии терминов',
      ];
      technology_tools = [
        'Microsoft Word/Google Docs для заметок',
        'Notion для организации информации',
        'Evernote для сбора материалов',
        'Grammarly для улучшения письма',
        'Kindle для чтения электронных книг',
        'Obsidian для связывания заметок',
      ];
      career_advantages = [
        'Писательская деятельность и журналистика',
        'Академические исследования',
        'Библиотечное дело и архивы',
        'Редактирование и корректура',
        'Юриспруденция и законодательство',
        'Техническая документация',
      ];
      development_suggestions = [
        'Развивайте навыки устного общения',
        'Практикуйте визуальное мышление',
        'Участвуйте в дискуссиях и презентациях',
        'Изучайте невербальную коммуникацию',
      ];
      memory_techniques = [
        'Акронимы и аббревиатуры',
        'Списки и категоризация',
        'Письменное повторение',
        'Создание словесных ассоциаций',
        'Структурированные конспекты',
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
    learning_preferences,
    effective_methods,
    challenging_situations,
    study_tips,
    technology_tools,
    career_advantages,
    development_suggestions,
    memory_techniques,
  };
};
