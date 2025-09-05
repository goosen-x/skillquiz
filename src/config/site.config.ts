export const siteConfig = {
  name: 'PsyTest',
  url: 'https://psytest.ru',
  description:
    'Профессиональные психологические тесты онлайн для определения типа личности, выбора профессии и саморазвития',
  defaultTitle: 'PsyTest - Психологические тесты онлайн | Тесты на тип личности',
  titleTemplate: '%s | PsyTest',

  // SEO мета-теги по умолчанию
  seo: {
    keywords: [
      'психологические тесты',
      'тест на тип личности',
      'тест на профессию',
      'тесты онлайн бесплатно',
      'узнать характер',
      'профориентация',
      'тест темперамент',
    ],
    authors: [{ name: 'PsyTest Team' }],
    creator: 'PsyTest',
    publisher: 'PsyTest',
    robots: 'index, follow',
    googlebot: 'index, follow',
    yandex: 'index, follow',
  },

  // Open Graph настройки
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'PsyTest',
    images: [
      {
        url: 'https://psytest.ru/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PsyTest - Психологические тесты онлайн',
      },
    ],
  },

  // Twitter Card настройки
  twitter: {
    card: 'summary_large_image',
    site: '@psytest_ru',
    creator: '@psytest_ru',
  },

  // Контактная информация
  contacts: {
    email: 'info@psytest.ru',
    telegram: 'https://t.me/psytest_ru',
    vk: 'https://vk.com/psytest_ru',
  },

  // Аналитика
  analytics: {
    yandexMetrikaId: 'XXXXXXXXX', // TODO: Заменить на реальный ID Яндекс.Метрики
    googleAnalyticsId: '', // Не используем Google Analytics - фокус на Яндекс
  },

  // Настройки тестов
  tests: {
    questionsPerPage: 1,
    showProgress: true,
    saveProgress: true,
    progressStorageKey: 'test-progress',
    resultsStorageKey: 'test-result',
    maxStorageTime: 30 * 24 * 60 * 60 * 1000, // 30 дней
  },

  // Категории тестов
  categories: {
    psychology: {
      id: 'psychology',
      name: 'Психология личности',
      slug: 'psychology',
      icon: 'Brain',
      color: 'blue',
      description:
        'Тесты для изучения особенностей характера, темперамента и психологического типа',
    },
    career: {
      id: 'career',
      name: 'Карьера и профессия',
      slug: 'career',
      icon: 'Briefcase',
      color: 'green',
      description: 'Тесты для выбора профессии, определения карьерных предпочтений и навыков',
    },
    lifestyle: {
      id: 'lifestyle',
      name: 'Образ жизни',
      slug: 'lifestyle',
      icon: 'Heart',
      color: 'purple',
      description: 'Тесты про привычки, продуктивность, здоровье и баланс жизни',
    },
  },

  // Цветовая схема
  theme: {
    colors: {
      main: 'oklch(84.08% 0.1725 84.2)',
      background: 'oklch(96.22% 0.0569 95.61)',
      secondaryBackground: 'oklch(100% 0 0)',
      foreground: 'oklch(0% 0 0)',
      border: 'oklch(0% 0 0)',
      chart1: '#FFBF00',
      chart2: '#0099FF',
      chart3: '#FF7A05',
      chart4: '#00D696',
      chart5: '#7A83FF',
    },
    shadows: {
      default: '4px 4px 0px 0px var(--border)',
      lg: '6px 6px 0px 0px var(--border)',
      xl: '8px 8px 0px 0px var(--border)',
    },
    borderWidth: '2px',
    fontFamily: {
      base: 'Montserrat',
      heading: 'Archivo Black',
    },
  },

  // Навигация
  navigation: {
    main: [
      { name: 'Главная', href: '/' },
      { name: 'Тесты', href: '/tests' },
      { name: 'О проекте', href: '/about' },
      { name: 'Контакты', href: '/contact' },
    ],
    footer: {
      categories: [
        { name: 'Тест на тип личности', href: '/tests/personality-type' },
        { name: 'Тест на профессию', href: '/tests/career-choice' },
        { name: 'Эмоциональный интеллект', href: '/tests/emotional-intelligence' },
        { name: 'Тест на продуктивность', href: '/tests/productivity' },
      ],
      about: [
        { name: 'О нас', href: '/about' },
        { name: 'Контакты', href: '/contact' },
        { name: 'Конфиденциальность', href: '/privacy' },
        { name: 'Условия использования', href: '/terms' },
      ],
    },
  },

  // Лимиты и ограничения
  limits: {
    maxTestsPerUser: 100,
    maxResultsStored: 50,
    minQuestionsPerTest: 5,
    maxQuestionsPerTest: 100,
  },

  // Feature flags
  features: {
    enableSharing: true,
    enableComments: false,
    enableRatings: true,
    enableUserAccounts: false,
    enableStatistics: true,
    enableConfetti: true,
    enableSoundEffects: true,
    enableGeometricSeparators: true,
  },

  // API endpoints (для будущего использования)
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.psytest.ru',
    endpoints: {
      tests: '/api/tests',
      results: '/api/results',
      statistics: '/api/statistics',
      feedback: '/api/feedback',
    },
  },

  // Социальные сети для шаринга
  sharing: {
    platforms: [
      {
        name: 'Twitter',
        icon: 'Twitter',
        shareUrl: (url: string, text: string) =>
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      },
      {
        name: 'Telegram',
        icon: 'Send',
        shareUrl: (url: string, text: string) =>
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      },
      {
        name: 'VK',
        icon: 'Share2',
        shareUrl: (url: string, text: string) =>
          `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      },
    ],
  },
} as const;

// Типы для TypeScript
export type SiteConfig = typeof siteConfig;
export type TestCategory = keyof typeof siteConfig.categories;
export type NavigationItem = (typeof siteConfig.navigation.main)[number];
