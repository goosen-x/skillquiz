export interface TestData {
  id: string;
  title: string;
  description: string;
  category: 'psychology' | 'career' | 'lifestyle';
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  duration: string; // e.g., "10 мин"
  questionsCount: number;
  usersCount: string; // e.g., "25K+"
  popularity: number; // 1-5, где 5 - самый популярный
  tags: string[];
  seoKeywords: string[];
  featured: boolean;
  new: boolean;
  slug: string;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  testsCount: number;
}

export const testCategories: TestCategory[] = [
  {
    id: 'psychology',
    name: 'Психологические тесты',
    description: 'Узнайте свой тип личности, темперамент и психологические особенности для лучшего самопонимания',
    icon: 'Brain',
    color: 'blue',
    seoTitle: 'Психологические тесты онлайн бесплатно - определить тип личности',
    seoDescription: 'Пройдите психологический тест онлайн бесплатно. Узнайте свой тип личности, темперамент, характер. Точные результаты с расшифровкой.',
    keywords: ['психологический тест', 'тест на личность', 'тип личности', 'темперамент', 'характер', 'эмоциональный интеллект'],
    testsCount: 24
  },
  {
    id: 'career',
    name: 'Карьерные тесты',
    description: 'Выберите подходящую профессию и определите направление карьерного развития',
    icon: 'Briefcase',
    color: 'green',
    seoTitle: 'Тест на профессию онлайн - профориентация бесплатно',
    seoDescription: 'Пройдите тест на профессию онлайн бесплатно. Профориентация для подростков и взрослых. Определите подходящую специальность.',
    keywords: ['тест на профессию', 'профориентация', 'выбор профессии', 'карьера', 'лидерские качества', 'навыки'],
    testsCount: 18
  },
  {
    id: 'lifestyle',
    name: 'Тесты образа жизни',
    description: 'Оптимизируйте продуктивность, определите хронотип и улучшите качество жизни',
    icon: 'Heart',
    color: 'purple',
    seoTitle: 'Тесты образа жизни - продуктивность и хронотип онлайн',
    seoDescription: 'Тест на продуктивность, определение хронотипа жаворонок или сова, баланс работы и жизни. Улучшите качество жизни.',
    keywords: ['тест на продуктивность', 'хронотип', 'жаворонок или сова', 'баланс работы', 'образ жизни', 'эффективность'],
    testsCount: 16
  }
];

export const allTests: TestData[] = [
  // Психологические тесты
  {
    id: 'personality-type',
    title: 'Тест на тип личности',
    description: 'Определите свой психологический тип личности по научно обоснованной методике. Узнайте свои сильные стороны и особенности характера.',
    category: 'psychology',
    difficulty: 'Средний',
    duration: '10 мин',
    questionsCount: 60,
    usersCount: '45K+',
    popularity: 5,
    tags: ['личность', 'характер', 'психотип', 'самопознание'],
    seoKeywords: ['тест на тип личности', 'определить тип личности', 'психологический тест личности', 'тест характера'],
    featured: true,
    new: false,
    slug: 'personality-type'
  },
  {
    id: 'emotional-intelligence',
    title: 'Тест эмоциональный интеллект',
    description: 'Оцените свою способность понимать и управлять эмоциями. Узнайте уровень эмпатии и социальных навыков.',
    category: 'psychology',
    difficulty: 'Средний',
    duration: '8 мин',
    questionsCount: 45,
    usersCount: '32K+',
    popularity: 4,
    tags: ['эмоции', 'эмпатия', 'интеллект', 'социальные навыки'],
    seoKeywords: ['тест эмоциональный интеллект', 'эмоциональный интеллект тест', 'тест на эмпатию'],
    featured: true,
    new: false,
    slug: 'emotional-intelligence'
  },
  {
    id: 'temperament',
    title: 'Определить темперамент',
    description: 'Выявите свой темперамент: холерик, сангвиник, флегматик или меланхолик. Поймите особенности своего поведения.',
    category: 'psychology',
    difficulty: 'Легкий',
    duration: '6 мин',
    questionsCount: 30,
    usersCount: '28K+',
    popularity: 4,
    tags: ['темперамент', 'холерик', 'сангвиник', 'флегматик', 'меланхолик'],
    seoKeywords: ['определить темперамент', 'тест на темперамент', 'холерик сангвиник флегматик меланхолик'],
    featured: false,
    new: false,
    slug: 'temperament'
  },
  {
    id: 'introvert-extrovert',
    title: 'Тест на интроверсию',
    description: 'Определите, являетесь ли вы интровертом, экстравертом или амбивертом. Поймите свои коммуникативные предпочтения.',
    category: 'psychology',
    difficulty: 'Легкий',
    duration: '5 мин',
    questionsCount: 25,
    usersCount: '24K+',
    popularity: 3,
    tags: ['интроверт', 'экстраверт', 'амбиверт', 'общение'],
    seoKeywords: ['тест на интроверсию', 'интроверт или экстраверт тест', 'тест интроверт экстраверт'],
    featured: false,
    new: false,
    slug: 'introvert-extrovert'
  },
  {
    id: 'stress-level',
    title: 'Оценка уровня стресса',
    description: 'Определите свой текущий уровень стресса и получите рекомендации по его снижению и профилактике.',
    category: 'psychology',
    difficulty: 'Легкий',
    duration: '7 мин',
    questionsCount: 35,
    usersCount: '19K+',
    popularity: 3,
    tags: ['стресс', 'тревожность', 'психическое здоровье', 'релаксация'],
    seoKeywords: ['тест на стресс', 'уровень стресса тест', 'оценить стресс онлайн'],
    featured: false,
    new: true,
    slug: 'stress-level'
  },
  {
    id: 'digital-burnout',
    title: 'Цифровое выгорание тест',
    description: 'Современный тест на цифровое выгорание. Узнайте, как технологии влияют на ваше психическое состояние.',
    category: 'psychology',
    difficulty: 'Средний',
    duration: '9 мин',
    questionsCount: 40,
    usersCount: '12K+',
    popularity: 2,
    tags: ['цифровое выгорание', 'технологии', 'психическое здоровье', 'зависимость'],
    seoKeywords: ['цифровое выгорание тест', 'тест на цифровую зависимость', 'выгорание от технологий'],
    featured: false,
    new: true,
    slug: 'digital-burnout'
  },

  // Карьерные тесты
  {
    id: 'career-test',
    title: 'Тест на профессию',
    description: 'Определите подходящую профессию на основе ваших интересов, навыков и личностных особенностей.',
    category: 'career',
    difficulty: 'Средний',
    duration: '12 мин',
    questionsCount: 80,
    usersCount: '38K+',
    popularity: 5,
    tags: ['профессия', 'карьера', 'профориентация', 'выбор специальности'],
    seoKeywords: ['тест на профессию', 'выбор профессии тест', 'профориентация онлайн', 'какая профессия подходит'],
    featured: true,
    new: false,
    slug: 'career-test'
  },
  {
    id: 'career-orientation',
    title: 'Профориентация онлайн',
    description: 'Комплексная профориентация для подростков и взрослых. Выявите склонности к различным видам деятельности.',
    category: 'career',
    difficulty: 'Сложный',
    duration: '15 мин',
    questionsCount: 100,
    usersCount: '29K+',
    popularity: 4,
    tags: ['профориентация', 'склонности', 'способности', 'деятельность'],
    seoKeywords: ['профориентация онлайн бесплатно', 'профориентация тест', 'определить склонности'],
    featured: true,
    new: false,
    slug: 'career-orientation'
  },
  {
    id: 'leadership-test',
    title: 'Тест лидерские качества',
    description: 'Оцените свой лидерский потенциал и управленческие способности. Узнайте свой стиль руководства.',
    category: 'career',
    difficulty: 'Средний',
    duration: '8 мин',
    questionsCount: 50,
    usersCount: '22K+',
    popularity: 3,
    tags: ['лидерство', 'управление', 'руководство', 'менеджмент'],
    seoKeywords: ['тест на лидерские качества', 'лидерский потенциал тест', 'тест лидера'],
    featured: false,
    new: false,
    slug: 'leadership-test'
  },
  {
    id: 'strengths-test',
    title: 'Определить сильные стороны',
    description: 'Выявите свои главные сильные стороны и таланты для успешного карьерного развития.',
    category: 'career',
    difficulty: 'Средний',
    duration: '10 мин',
    questionsCount: 60,
    usersCount: '18K+',
    popularity: 3,
    tags: ['сильные стороны', 'таланты', 'способности', 'навыки'],
    seoKeywords: ['определить сильные стороны тест', 'тест на сильные стороны', 'выявить таланты'],
    featured: false,
    new: false,
    slug: 'strengths-test'
  },
  {
    id: 'team-role',
    title: 'Роль в команде',
    description: 'Определите свою идеальную роль в команде по методике Белбина. Узнайте, как эффективнее работать в группе.',
    category: 'career',
    difficulty: 'Средний',
    duration: '9 мин',
    questionsCount: 45,
    usersCount: '15K+',
    popularity: 2,
    tags: ['команда', 'роль', 'сотрудничество', 'белбин'],
    seoKeywords: ['роль в команде тест', 'тест белбина', 'командная роль'],
    featured: false,
    new: false,
    slug: 'team-role'
  },
  {
    id: 'professional-burnout',
    title: 'Тест на профессиональное выгорание',
    description: 'Оцените риск профессионального выгорания и получите рекомендации по восстановлению мотивации.',
    category: 'career',
    difficulty: 'Средний',
    duration: '11 мин',
    questionsCount: 55,
    usersCount: '13K+',
    popularity: 2,
    tags: ['выгорание', 'мотивация', 'карьера', 'работа'],
    seoKeywords: ['тест на профессиональное выгорание', 'профессиональное выгорание тест', 'выгорание на работе'],
    featured: false,
    new: true,
    slug: 'professional-burnout'
  },

  // Тесты образа жизни
  {
    id: 'productivity-test',
    title: 'Тест на продуктивность',
    description: 'Оцените свою продуктивность и эффективность. Получите персональные рекомендации по улучшению результатов.',
    category: 'lifestyle',
    difficulty: 'Средний',
    duration: '7 мин',
    questionsCount: 40,
    usersCount: '26K+',
    popularity: 4,
    tags: ['продуктивность', 'эффективность', 'тайм-менеджмент', 'результативность'],
    seoKeywords: ['тест на продуктивность', 'продуктивность тест', 'эффективность тест'],
    featured: true,
    new: false,
    slug: 'productivity-test'
  },
  {
    id: 'chronotype',
    title: 'Определить хронотип',
    description: 'Узнайте свой биологический хронотип для оптимизации режима дня и повышения работоспособности.',
    category: 'lifestyle',
    difficulty: 'Легкий',
    duration: '6 мин',
    questionsCount: 30,
    usersCount: '31K+',
    popularity: 5,
    tags: ['хронотип', 'биоритмы', 'режим', 'сон'],
    seoKeywords: ['определить хронотип тест', 'хронотип тест', 'биоритмы тест'],
    featured: true,
    new: false,
    slug: 'chronotype'
  },
  {
    id: 'lark-owl',
    title: 'Тест жаворонок или сова',
    description: 'Классический тест для определения вашего циркадного ритма. Жаворонок, сова или голубь?',
    category: 'lifestyle',
    difficulty: 'Легкий',
    duration: '5 мин',
    questionsCount: 25,
    usersCount: '35K+',
    popularity: 5,
    tags: ['жаворонок', 'сова', 'голубь', 'циркадные ритмы'],
    seoKeywords: ['тест жаворонок или сова', 'жаворонок сова тест', 'определить жаворонок сова'],
    featured: false,
    new: false,
    slug: 'lark-owl'
  },
  {
    id: 'work-life-balance',
    title: 'Баланс работа-жизнь',
    description: 'Оцените баланс между работой и личной жизнью. Получите советы по гармонизации всех сфер жизни.',
    category: 'lifestyle',
    difficulty: 'Средний',
    duration: '9 мин',
    questionsCount: 45,
    usersCount: '17K+',
    popularity: 3,
    tags: ['баланс', 'работа', 'жизнь', 'гармония'],
    seoKeywords: ['баланс работа жизнь тест', 'тест баланс работы и жизни', 'work life balance тест'],
    featured: false,
    new: false,
    slug: 'work-life-balance'
  },
  {
    id: 'bad-habits',
    title: 'Тест на вредные привычки',
    description: 'Проанализируйте свои привычки и определите, какие из них мешают достижению целей.',
    category: 'lifestyle',
    difficulty: 'Легкий',
    duration: '8 мин',
    questionsCount: 35,
    usersCount: '14K+',
    popularity: 2,
    tags: ['привычки', 'саморазвитие', 'здоровье', 'изменения'],
    seoKeywords: ['тест на вредные привычки', 'вредные привычки тест', 'анализ привычек'],
    featured: false,
    new: false,
    slug: 'bad-habits'
  },
  {
    id: 'motivation-level',
    title: 'Уровень мотивации',
    description: 'Определите свой уровень внутренней мотивации и узнайте, что вас действительно вдохновляет.',
    category: 'lifestyle',
    difficulty: 'Средний',
    duration: '10 мин',
    questionsCount: 50,
    usersCount: '11K+',
    popularity: 2,
    tags: ['мотивация', 'цели', 'вдохновение', 'драйв'],
    seoKeywords: ['тест уровень мотивации', 'мотивация тест', 'внутренняя мотивация тест'],
    featured: false,
    new: true,
    slug: 'motivation-level'
  },
  {
    id: 'digital-wellness-persona',
    title: 'Твоя цифровая личность',
    description: 'Узнайте свой тип цифрового поведения и получите персональные рекомендации по здоровому использованию технологий. Определите, Digital Minimalist вы или Tech Overwhelmed.',
    category: 'lifestyle',
    difficulty: 'Средний',
    duration: '8 мин',
    questionsCount: 12,
    usersCount: '8K+',
    popularity: 4,
    tags: ['цифровое здоровье', 'технологии', 'баланс', 'экранное время', 'социальные сети'],
    seoKeywords: ['цифровая личность тест', 'цифровое здоровье', 'экранное время тест', 'digital wellness', 'цифровой детокс'],
    featured: true,
    new: true,
    slug: 'digital-wellness-persona'
  }
];

// Функции для работы с данными
export const getTestsByCategory = (category: string): TestData[] => {
  return allTests.filter(test => test.category === category);
};

export const getFeaturedTests = (): TestData[] => {
  return allTests.filter(test => test.featured);
};

export const getPopularTests = (limit: number = 10): TestData[] => {
  return allTests
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getNewTests = (): TestData[] => {
  return allTests.filter(test => test.new);
};

export const getAllTests = (): TestData[] => {
  return allTests;
};

export const getTestById = (id: string): TestData | undefined => {
  return allTests.find(test => test.id === id);
};

export const getTestBySlug = (slug: string): TestData | undefined => {
  return allTests.find(test => test.slug === slug);
};

export const searchTests = (query: string): TestData[] => {
  const lowercaseQuery = query.toLowerCase();
  return allTests.filter(test => 
    test.title.toLowerCase().includes(lowercaseQuery) ||
    test.description.toLowerCase().includes(lowercaseQuery) ||
    test.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    test.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCategoryById = (id: string): TestCategory | undefined => {
  return testCategories.find(category => category.id === id);
};