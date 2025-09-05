// Конфигурация для тестов
export const testsConfig = {
  // Настройки отображения
  display: {
    questionsPerPage: 1,
    showQuestionNumbers: true,
    showProgress: true,
    showTimeRemaining: false,
    animateTransitions: true,
  },

  // Настройки прохождения
  progression: {
    allowBackNavigation: true,
    allowSkipQuestions: false,
    randomizeQuestions: false,
    randomizeAnswers: false,
    saveProgress: true,
    autoSaveInterval: 30000, // 30 секунд
  },

  // Настройки результатов
  results: {
    showDetailedAnalysis: true,
    showComparison: true,
    showRecommendations: true,
    showShareButtons: true,
    saveResults: true,
    generateCertificate: false,
  },

  // Настройки валидации
  validation: {
    minQuestionsAnswered: 1,
    requireAllQuestions: true,
    minTimePerQuestion: 3000, // 3 секунды
    maxTimePerQuestion: 300000, // 5 минут
  },

  // Настройки хранения
  storage: {
    prefix: 'professional-test',
    progressKey: 'test-progress',
    resultsKey: 'test-result',
    settingsKey: 'test-settings',
    maxStorageTime: 30 * 24 * 60 * 60 * 1000, // 30 дней
    compression: true,
  },

  // Настройки аналитики
  analytics: {
    trackQuestionTime: true,
    trackAnswerChanges: true,
    trackCompletionRate: true,
    trackShareEvents: true,
    anonymizeData: true,
  },

  // Настройки доступности
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReaderSupport: true,
    highContrastMode: false,
    fontSize: 'normal',
    reduceMotion: false,
  },

  // Настройки уведомлений
  notifications: {
    showWelcomeMessage: true,
    showProgressMilestones: true,
    showCompletionMessage: true,
    showResultsPreview: true,
    playSound: true,
    showConfetti: true,
  },

  // Типы вопросов
  questionTypes: {
    singleChoice: {
      enabled: true,
      icon: 'RadioButton',
      minOptions: 2,
      maxOptions: 6,
    },
    multipleChoice: {
      enabled: false,
      icon: 'CheckSquare',
      minOptions: 2,
      maxOptions: 8,
      minSelections: 1,
      maxSelections: null,
    },
    scale: {
      enabled: true,
      icon: 'Slider',
      minValue: 1,
      maxValue: 5,
      step: 1,
      showLabels: true,
    },
    text: {
      enabled: false,
      icon: 'MessageSquare',
      minLength: 10,
      maxLength: 500,
    },
  },

  // Настройки результатов по типам
  resultTypes: {
    persona: {
      showEmoji: true,
      showPercentage: true,
      showCharacteristics: true,
      showAdvice: true,
      maxCharacteristics: 5,
      maxAdvice: 5,
    },
    score: {
      showNumericScore: true,
      showPercentile: true,
      showInterpretation: true,
      showComparison: true,
    },
    category: {
      showPrimaryCategory: true,
      showSecondaryCategories: true,
      showDistribution: true,
      showRecommendations: true,
    },
  },

  // Пресеты для разных типов тестов
  presets: {
    personality: {
      questionsCount: 20,
      timeLimit: null,
      resultType: 'persona',
      showProgress: true,
      allowBackNavigation: true,
    },
    career: {
      questionsCount: 30,
      timeLimit: 1800000, // 30 минут
      resultType: 'category',
      showProgress: true,
      allowBackNavigation: true,
    },
    quick: {
      questionsCount: 10,
      timeLimit: 300000, // 5 минут
      resultType: 'score',
      showProgress: false,
      allowBackNavigation: false,
    },
  },
} as const;

// Типы для TypeScript
export type QuestionType = keyof typeof testsConfig.questionTypes;
export type ResultType = keyof typeof testsConfig.resultTypes;
export type TestPreset = keyof typeof testsConfig.presets;
