/**
 * Тест на тип памяти
 * Определяет доминирующий тип памяти и оптимальные стратегии запоминания
 */

export interface MemoryTypeQuestion {
  id: string;
  text: string;
  category: 'storage' | 'recall' | 'processing' | 'retention' | 'application';
  options: {
    text: string;
    visual: number;      // Зрительная память
    auditory: number;    // Слуховая память
    kinesthetic: number; // Двигательная память
    logical: number;     // Логическая/аналитическая память
  }[];
}

export interface MemoryTypeResult {
  primary_type: 'visual' | 'auditory' | 'kinesthetic' | 'logical';
  secondary_type?: 'visual' | 'auditory' | 'kinesthetic' | 'logical';
  scores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    logical: number;
  };
  percentages: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    logical: number;
  };
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  optimal_strategies: string[];
  study_methods: string[];
  memory_techniques: string[];
  workplace_applications: string[];
  daily_life_tips: string[];
  combination_advice: string[];
  improvement_areas: string[];
}

export const memoryTypeQuestions: MemoryTypeQuestion[] = [
  {
    id: '1',
    text: 'Когда вы пытаетесь вспомнить телефонный номер, вы:',
    category: 'recall',
    options: [
      {
        text: 'Представляете, как он выглядит написанным',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Повторяете его про себя или вслух',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Записываете в воздухе или нажимаете воображаемые клавиши',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Разбиваете на части и анализируете закономерности',
        visual: 0,
        auditory: 1,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '2',
    text: 'Лучше всего вы запоминаете имена новых людей, когда:',
    category: 'storage',
    options: [
      {
        text: 'Видите их написанными на бейджике или визитке',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Слышите, как их произносят несколько раз',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Пожимаете руку и активно взаимодействуете',
        visual: 0,
        auditory: 1,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Связываете с какими-то фактами или ассоциациями',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '3',
    text: 'Когда изучаете новый материал, вы предпочитаете:',
    category: 'processing',
    options: [
      {
        text: 'Читать учебники, смотреть схемы и диаграммы',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Слушать лекции, аудиокниги или объяснения',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Практиковаться и делать что-то руками',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        logical: 1
      },
      {
        text: 'Анализировать, структурировать и находить логику',
        visual: 1,
        auditory: 1,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '4',
    text: 'Когда вам объясняют дорогу, вы лучше запоминаете:',
    category: 'storage',
    options: [
      {
        text: 'Когда показывают на карте или рисуют схему',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Устные указания с названиями улиц',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Когда прохожу маршрут вместе с объясняющим',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Логическую последовательность: "сначала направо, потом..."',
        visual: 0,
        auditory: 1,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '5',
    text: 'При запоминании списка покупок вы:',
    category: 'application',
    options: [
      {
        text: 'Представляете, как продукты выглядят в магазине',
        visual: 3,
        auditory: 0,
        kinesthetic: 1,
        logical: 0
      },
      {
        text: 'Проговариваете список несколько раз',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Представляете, как берете каждый товар в руки',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Группируете по категориям: молочное, мясо, овощи',
        visual: 0,
        auditory: 1,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '6',
    text: 'Вы лучше помните лица людей, когда:',
    category: 'recall',
    options: [
      {
        text: 'Внимательно изучаю их черты и особенности',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Слышу их голос и манеру речи',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Долго общаюсь и взаимодействую с ними',
        visual: 1,
        auditory: 1,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Знаю факты о них и их деятельности',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '7',
    text: 'При изучении иностранного языка вам легче всего запомнить:',
    category: 'storage',
    options: [
      {
        text: 'Слова, которые вы видели написанными',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Слова, которые много раз слышали',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Слова, которые использовали в разговоре',
        visual: 0,
        auditory: 1,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Слова, значение которых логически понятно',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '8',
    text: 'Когда вы пытаетесь вспомнить, где оставили ключи, вы:',
    category: 'recall',
    options: [
      {
        text: 'Представляете места, где они могут лежать',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Пытаетесь вспомнить звуки, когда их клали',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Воспроизводите свои движения и действия',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Логически анализируете свой маршрут и действия',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '9',
    text: 'При подготовке к экзамену вы:',
    category: 'application',
    options: [
      {
        text: 'Создаете яркие конспекты с выделениями и схемами',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Читаете материал вслух или слушаете записи',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Переписываете заметки и делаете карточки',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Структурируете информацию в логические блоки',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '10',
    text: 'Лучше всего вы запоминаете анекдоты или истории:',
    category: 'retention',
    options: [
      {
        text: 'Когда представляю описываемые сцены',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Когда слышу их с хорошей интонацией',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Когда сам их рассказываю другим',
        visual: 0,
        auditory: 1,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Когда понимаю их структуру и логику',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '11',
    text: 'При запоминании последовательности действий (рецепт, инструкция) вы:',
    category: 'processing',
    options: [
      {
        text: 'Представляете каждый шаг как картинку',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Проговариваете последовательность действий',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Имитируете движения или жесты',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Понимаете логику и принципы процесса',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '12',
    text: 'Когда встречаете человека во второй раз, вы чаще всего помните:',
    category: 'retention',
    options: [
      {
        text: 'Как он выглядит, его одежду и внешность',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Его голос и то, о чем говорили',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Где и при каких обстоятельствах встречались',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Факты о нем и сферу его деятельности',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '13',
    text: 'При изучении карты новой местности вы:',
    category: 'processing',
    options: [
      {
        text: 'Запоминаете визуальное расположение объектов',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Запоминаете названия улиц и районов',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Нужно пройти маршрут, чтобы запомнить',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Понимаете логику планировки и связи между районами',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '14',
    text: 'Вы лучше всего запоминаете пароли и коды, когда:',
    category: 'storage',
    options: [
      {
        text: 'Видите их написанными или набранными',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Проговариваете их ритмично',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Много раз набираете их на клавиатуре',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Они имеют для вас логический смысл',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '15',
    text: 'При запоминании важной даты вы:',
    category: 'application',
    options: [
      {
        text: 'Представляете календарь с выделенным числом',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Повторяете дату вслух несколько раз',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Записываете в нескольких местах',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Связываете с другими важными событиями',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '16',
    text: 'Когда изучаете новую компьютерную программу, вы лучше запоминаете:',
    category: 'processing',
    options: [
      {
        text: 'Расположение кнопок и интерфейс',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Словесные инструкции и объяснения',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Последовательность действий и горячие клавиши',
        visual: 1,
        auditory: 0,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Принципы работы и логику программы',
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '17',
    text: 'При запоминании стихотворения вы:',
    category: 'retention',
    options: [
      {
        text: 'Представляете образы, описанные в стихах',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Учите наизусть, обращая внимание на ритм',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Жестикулируете или двигаетесь в такт',
        visual: 0,
        auditory: 1,
        kinesthetic: 3,
        logical: 0
      },
      {
        text: 'Анализируете структуру и смысл',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  },
  {
    id: '18',
    text: 'Лучше всего вы помните события прошлого через:',
    category: 'recall',
    options: [
      {
        text: 'Визуальные образы и картинки в памяти',
        visual: 3,
        auditory: 0,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Звуки, музыку и разговоры того времени',
        visual: 0,
        auditory: 3,
        kinesthetic: 0,
        logical: 1
      },
      {
        text: 'Физические ощущения и действия',
        visual: 0,
        auditory: 0,
        kinesthetic: 3,
        logical: 1
      },
      {
        text: 'Хронологию и логическую последовательность',
        visual: 1,
        auditory: 0,
        kinesthetic: 0,
        logical: 3
      }
    ]
  }
];

export const calculateMemoryTypeResult = (answers: Record<string, number>): MemoryTypeResult => {
  const scores = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    logical: 0
  };

  // Подсчитываем баллы для каждого типа памяти
  memoryTypeQuestions.forEach((question, index) => {
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.options[answerIndex]) {
      const option = question.options[answerIndex];
      scores.visual += option.visual;
      scores.auditory += option.auditory;
      scores.kinesthetic += option.kinesthetic;
      scores.logical += option.logical;
    }
  });

  // Находим основной и вторичный типы
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary_type = sortedScores[0][0] as keyof typeof scores;
  const secondary_type = sortedScores[1][1] > 0 ? sortedScores[1][0] as keyof typeof scores : undefined;

  // Вычисляем проценты
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages = {
    visual: Math.round((scores.visual / totalScore) * 100),
    auditory: Math.round((scores.auditory / totalScore) * 100),
    kinesthetic: Math.round((scores.kinesthetic / totalScore) * 100),
    logical: Math.round((scores.logical / totalScore) * 100)
  };

  let title: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let challenges: string[];
  let optimal_strategies: string[];
  let study_methods: string[];
  let memory_techniques: string[];
  let workplace_applications: string[];
  let daily_life_tips: string[];
  let combination_advice: string[];
  let improvement_areas: string[];

  switch (primary_type) {
    case 'visual':
      title = 'Зрительный тип памяти';
      description = 'Вы лучше всего запоминаете информацию через зрительные образы. Диаграммы, схемы, цвета, картинки и пространственное расположение объектов помогают вам эффективно сохранять и воспроизводить информацию.';
      characteristics = [
        'Сильная визуальная память на детали',
        'Способность создавать мысленные образы',
        'Хорошее пространственное восприятие',
        'Предпочтение схем и диаграмм',
        'Внимательность к визуальным деталям',
        'Способность к визуализации абстрактных концепций'
      ];
      strengths = [
        'Отличная память на лица и места',
        'Способность быстро ориентироваться в пространстве',
        'Эффективное использование mind maps',
        'Хорошие результаты с цветовым кодированием',
        'Сильная память на прочитанный текст'
      ];
      challenges = [
        'Трудности с запоминанием устной информации',
        'Проблемы при отсутствии визуальных подсказок',
        'Слабая память на имена и цифры',
        'Зависимость от зрительного контакта'
      ];
      optimal_strategies = [
        'Создавайте ментальные карты',
        'Используйте цветное выделение',
        'Рисуйте схемы и диаграммы',
        'Создавайте визуальные ассоциации',
        'Организуйте информацию в таблицы'
      ];
      memory_techniques = [
        'Метод локусов (дворец памяти)',
        'Визуальные мнемоники',
        'Создание ментальных образов',
        'Цветовое кодирование',
        'Пространственные ассоциации'
      ];
      study_methods = [
        'Создание наглядных конспектов',
        'Использование highlighter',
        'Просмотр обучающих видео',
        'Создание timeline и схем',
        'Использование флешкарт с картинками'
      ];
      break;

    case 'auditory':
      title = 'Слуховой тип памяти';
      description = 'Вы эффективно запоминаете информацию через слух. Лекции, аудиозаписи, музыка и устные объяснения являются для вас наиболее продуктивными способами усвоения и сохранения информации.';
      characteristics = [
        'Отличная слуховая память',
        'Чувствительность к интонации и ритму',
        'Способность к эхолокации в памяти',
        'Предпочтение устного общения',
        'Хорошая музыкальная память',
        'Склонность к вербализации мыслей'
      ];
      strengths = [
        'Отличная память на имена и голоса',
        'Способность запоминать мелодии и ритмы',
        'Эффективное обучение через лекции',
        'Хорошая память на разговоры',
        'Способность к языковому обучению'
      ];
      challenges = [
        'Трудности с визуальной информацией',
        'Проблемы в шумной обстановке',
        'Слабая пространственная память',
        'Зависимость от устных объяснений'
      ];
      optimal_strategies = [
        'Читайте вслух',
        'Слушайте аудиокниги и подкасты',
        'Участвуйте в дискуссиях',
        'Записывайте лекции',
        'Создавайте ритмические паттерны'
      ];
      memory_techniques = [
        'Рифмы и акронимы',
        'Музыкальные мнемоники',
        'Повторение с интонацией',
        'Создание песен и джинглов',
        'Вербальные ассоциации'
      ];
      study_methods = [
        'Прослушивание аудиолекций',
        'Групповые обсуждения',
        'Чтение материала вслух',
        'Использование записывающих устройств',
        'Объяснение материала другим'
      ];
      break;

    case 'kinesthetic':
      title = 'Двигательный тип памяти';
      description = 'Вы лучше всего запоминаете через физические действия и движения. Практические упражнения, моторные навыки и тактильные ощущения являются ключом к эффективному запоминанию и воспроизведению информации.';
      characteristics = [
        'Сильная моторная память',
        'Потребность в физической активности',
        'Хорошая мышечная память',
        'Предпочтение практического обучения',
        'Использование жестов при запоминании',
        'Связь между движением и памятью'
      ];
      strengths = [
        'Отличная память на процедуры и навыки',
        'Быстрое освоение физических навыков',
        'Хорошая память на маршруты',
        'Эффективное обучение через практику',
        'Сильная связь движения и памяти'
      ];
      challenges = [
        'Трудности с теоретическим материалом',
        'Проблемы при длительном сидении',
        'Слабая память на абстрактные концепции',
        'Зависимость от физической активности'
      ];
      optimal_strategies = [
        'Практикуйтесь и экспериментируйте',
        'Используйте движения при изучении',
        'Создавайте физические модели',
        'Делайте регулярные перерывы',
        'Используйте жесты и мимику'
      ];
      memory_techniques = [
        'Связывание с движениями',
        'Создание физических ассоциаций',
        'Использование жестов',
        'Пространственные мнемоники',
        'Тактильные методы запоминания'
      ];
      study_methods = [
        'Ходьба во время заучивания',
        'Создание моделей и макетов',
        'Интерактивные занятия',
        'Использование стоячего стола',
        'Частые физические перерывы'
      ];
      break;

    case 'logical':
      title = 'Логический тип памяти';
      description = 'Вы эффективно запоминаете информацию через понимание логических связей и структур. Систематизация, анализ закономерностей и понимание причинно-следственных связей помогают вам лучше усваивать материал.';
      characteristics = [
        'Сильная аналитическая память',
        'Способность к структурированию',
        'Потребность в понимании логики',
        'Предпочтение систематического подхода',
        'Способность к абстрактному мышлению',
        'Хорошая память на закономерности'
      ];
      strengths = [
        'Отличная память на системы и правила',
        'Способность видеть связи и паттерны',
        'Эффективное решение логических задач',
        'Хорошая долгосрочная память',
        'Способность к абстрактному запоминанию'
      ];
      challenges = [
        'Трудности с бессистемной информацией',
        'Проблемы с эмоциональной памятью',
        'Медленное запоминание деталей',
        'Зависимость от понимания логики'
      ];
      optimal_strategies = [
        'Структурируйте информацию',
        'Ищите закономерности и связи',
        'Создавайте логические схемы',
        'Используйте дедуктивный метод',
        'Анализируйте причины и следствия'
      ];
      memory_techniques = [
        'Логические цепочки',
        'Категоризация и классификация',
        'Создание иерархических структур',
        'Причинно-следственные связи',
        'Систематические схемы'
      ];
      study_methods = [
        'Создание логических конспектов',
        'Анализ структуры материала',
        'Построение ментальных моделей',
        'Использование алгоритмов',
        'Систематическое повторение'
      ];
      break;
  }

  // Общие применения на рабочем месте
  workplace_applications = [
    'Адаптация методов презентации под свой тип',
    'Оптимизация процесса обучения новых навыков',
    'Улучшение запоминания имен коллег',
    'Эффективное усвоение корпоративных процедур',
    'Повышение продуктивности через правильные техники'
  ];

  // Советы для повседневной жизни
  daily_life_tips = [
    'Применяйте свои сильные стороны в повседневных задачах',
    'Компенсируйте слабые стороны дополнительными методами',
    'Создавайте окружение, поддерживающее ваш тип памяти',
    'Используйте технологии, соответствующие вашим предпочтениям',
    'Развивайте комплексный подход к запоминанию'
  ];

  // Советы по комбинированию типов
  combination_advice = [
    'Сочетайте свой основной тип с элементами других',
    'Используйте мультисенсорный подход для важной информации',
    'Развивайте слабые типы памяти для более полного охвата',
    'Создавайте персональную систему запоминания',
    'Экспериментируйте с различными техниками'
  ];

  // Области для улучшения
  if (primary_type === 'visual') {
    improvement_areas = [
      'Развитие слуховой памяти через аудиоматериалы',
      'Тренировка памяти на имена и числа',
      'Практика запоминания без визуальных подсказок'
    ];
  } else if (primary_type === 'auditory') {
    improvement_areas = [
      'Развитие визуальной памяти через схемы',
      'Улучшение пространственной ориентации',
      'Тренировка памяти в тихой обстановке'
    ];
  } else if (primary_type === 'kinesthetic') {
    improvement_areas = [
      'Развитие способности к статичному обучению',
      'Улучшение абстрактного мышления',
      'Тренировка теоретического запоминания'
    ];
  } else {
    improvement_areas = [
      'Развитие эмоциональной памяти',
      'Улучшение запоминания деталей',
      'Тренировка интуитивного запоминания'
    ];
  }

  return {
    primary_type,
    secondary_type,
    scores,
    percentages,
    title,
    description,
    characteristics,
    strengths,
    challenges,
    optimal_strategies,
    study_methods,
    memory_techniques,
    workplace_applications,
    daily_life_tips,
    combination_advice,
    improvement_areas
  };
};