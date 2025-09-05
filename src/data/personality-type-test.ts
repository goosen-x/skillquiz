export interface TestQuestion {
  id: number;
  question: string;
  icon: string; // lucide-react icon name
  options: {
    text: string;
    value: number;
    factor?: string; // для многофакторных тестов
  }[];
  category?: string; // для группировки вопросов
}

export interface TestResult {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  advice: string[];
  color: string;
  emoji: string;
  score: {
    min: number;
    max: number;
  };
}

export interface BigFiveScores {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
}

export interface ChartData {
  factor: string;
  value: number;
  fullMark: number;
}

// 60 вопросов Big Five (12 на каждый фактор)
export const personalityTypeQuestions: TestQuestion[] = [
  // Экстраверсия (Extraversion) - вопросы 1-12
  {
    id: 1,
    question: "Я легко начинаю разговор с незнакомыми людьми",
    icon: "Users",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 2,
    question: "Я чувствую себя комфортно в центре внимания",
    icon: "Star",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 3,
    question: "Я предпочитаю проводить время в одиночестве",
    icon: "Home",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "extraversion" },
      { text: "Скорее не согласен", value: 4, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 2, factor: "extraversion" },
      { text: "Полностью согласен", value: 1, factor: "extraversion" }
    ]
  },
  {
    id: 4,
    question: "Я получаю энергию от общения с людьми",
    icon: "Zap",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 5,
    question: "Я люблю большие компании и вечеринки",
    icon: "PartyPopper",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 6,
    question: "Я редко беру инициативу в социальных ситуациях",
    icon: "UserMinus",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "extraversion" },
      { text: "Скорее не согласен", value: 4, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 2, factor: "extraversion" },
      { text: "Полностью согласен", value: 1, factor: "extraversion" }
    ]
  },
  {
    id: 7,
    question: "Я активно участвую в групповых дискуссиях",
    icon: "MessageCircle",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 8,
    question: "Мне нужно время в одиночестве для восстановления сил",
    icon: "Battery",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "extraversion" },
      { text: "Скорее не согласен", value: 4, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 2, factor: "extraversion" },
      { text: "Полностью согласен", value: 1, factor: "extraversion" }
    ]
  },
  {
    id: 9,
    question: "Я быстро знакомлюсь с новыми людьми",
    icon: "Handshake",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 10,
    question: "Я предпочитаю слушать, а не говорить",
    icon: "Ear",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "extraversion" },
      { text: "Скорее не согласен", value: 4, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 2, factor: "extraversion" },
      { text: "Полностью согласен", value: 1, factor: "extraversion" }
    ]
  },
  {
    id: 11,
    question: "Я с энтузиазмом отношусь к общественным мероприятиям",
    icon: "Calendar",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "extraversion" },
      { text: "Скорее не согласен", value: 2, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 4, factor: "extraversion" },
      { text: "Полностью согласен", value: 5, factor: "extraversion" }
    ]
  },
  {
    id: 12,
    question: "Я чувствую себя неуверенно в больших группах людей",
    icon: "Users2",
    category: "extraversion",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "extraversion" },
      { text: "Скорее не согласен", value: 4, factor: "extraversion" },
      { text: "Нейтрально", value: 3, factor: "extraversion" },
      { text: "Скорее согласен", value: 2, factor: "extraversion" },
      { text: "Полностью согласен", value: 1, factor: "extraversion" }
    ]
  },

  // Доброжелательность (Agreeableness) - вопросы 13-24
  {
    id: 13,
    question: "Я стараюсь помочь другим, даже если это неудобно для меня",
    icon: "Heart",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 14,
    question: "Я быстро прощаю людей за их ошибки",
    icon: "HeartHandshake",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 15,
    question: "Я склонен подозревать скрытые мотивы у других людей",
    icon: "Eye",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 4, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 2, factor: "agreeableness" },
      { text: "Полностью согласен", value: 1, factor: "agreeableness" }
    ]
  },
  {
    id: 16,
    question: "Я верю в то, что большинство людей по природе добры",
    icon: "Smile",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 17,
    question: "Я стараюсь избегать конфликтов с другими",
    icon: "Shield",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 18,
    question: "Мне сложно сочувствовать проблемам других людей",
    icon: "UserX",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 4, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 2, factor: "agreeableness" },
      { text: "Полностью согласен", value: 1, factor: "agreeableness" }
    ]
  },
  {
    id: 19,
    question: "Я готов идти на компромиссы ради общего блага",
    icon: "Balance",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 20,
    question: "Я часто ставлю свои интересы выше интересов других",
    icon: "User",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 4, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 2, factor: "agreeableness" },
      { text: "Полностью согласен", value: 1, factor: "agreeableness" }
    ]
  },
  {
    id: 21,
    question: "Я чувствую радость, когда другие люди счастливы",
    icon: "PartyPopper",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 22,
    question: "Я считаю, что люди должны заслужить мое уважение",
    icon: "Trophy",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 4, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 2, factor: "agreeableness" },
      { text: "Полностью согласен", value: 1, factor: "agreeableness" }
    ]
  },
  {
    id: 23,
    question: "Я активно участвую в благотворительности",
    icon: "Gift",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 2, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 4, factor: "agreeableness" },
      { text: "Полностью согласен", value: 5, factor: "agreeableness" }
    ]
  },
  {
    id: 24,
    question: "Мне трудно доверять незнакомым людям",
    icon: "Lock",
    category: "agreeableness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "agreeableness" },
      { text: "Скорее не согласен", value: 4, factor: "agreeableness" },
      { text: "Нейтрально", value: 3, factor: "agreeableness" },
      { text: "Скорее согласен", value: 2, factor: "agreeableness" },
      { text: "Полностью согласен", value: 1, factor: "agreeableness" }
    ]
  },

  // Добросовестность (Conscientiousness) - вопросы 25-36
  {
    id: 25,
    question: "Я всегда выполняю свои обещания",
    icon: "CheckCircle",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 26,
    question: "Я склонен откладывать важные дела на потом",
    icon: "Clock",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },
  {
    id: 27,
    question: "Порядок и организованность очень важны для меня",
    icon: "FolderOpen",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 28,
    question: "Я часто делаю вещи импульсивно, не думая о последствиях",
    icon: "Zap",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },
  {
    id: 29,
    question: "Я устанавливаю высокие стандарты для себя и других",
    icon: "Target",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 30,
    question: "Мне трудно заставить себя заниматься скучными задачами",
    icon: "Frown",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },
  {
    id: 31,
    question: "Я тщательно планирую свою деятельность заранее",
    icon: "Calendar",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 32,
    question: "Я легко отвлекаюсь и теряю концентрацию",
    icon: "Brain",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },
  {
    id: 33,
    question: "Я проверяю свою работу несколько раз перед завершением",
    icon: "Search",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 34,
    question: "Я предпочитаю гибкость строгому расписанию",
    icon: "Wind",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },
  {
    id: 35,
    question: "Я настойчив в достижении долгосрочных целей",
    icon: "Mountain",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 2, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 4, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 5, factor: "conscientiousness" }
    ]
  },
  {
    id: 36,
    question: "Мне нравится беспорядок и хаос вокруг меня",
    icon: "Shuffle",
    category: "conscientiousness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "conscientiousness" },
      { text: "Скорее не согласен", value: 4, factor: "conscientiousness" },
      { text: "Нейтрально", value: 3, factor: "conscientiousness" },
      { text: "Скорее согласен", value: 2, factor: "conscientiousness" },
      { text: "Полностью согласен", value: 1, factor: "conscientiousness" }
    ]
  },

  // Нейротизм (Neuroticism) - вопросы 37-48
  {
    id: 37,
    question: "Я часто чувствую тревогу и беспокойство",
    icon: "AlertTriangle",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 38,
    question: "Я остаюсь спокойным в стрессовых ситуациях",
    icon: "Zen",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 4, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 2, factor: "neuroticism" },
      { text: "Полностью согласен", value: 1, factor: "neuroticism" }
    ]
  },
  {
    id: 39,
    question: "Мое настроение часто меняется без особых причин",
    icon: "TrendingUp",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 40,
    question: "Я легко расстраиваюсь из-за мелочей",
    icon: "Frown",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 41,
    question: "Я чувствую себя уверенно в большинстве ситуаций",
    icon: "Shield",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 4, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 2, factor: "neuroticism" },
      { text: "Полностью согласен", value: 1, factor: "neuroticism" }
    ]
  },
  {
    id: 42,
    question: "Я склонен переживать о вещах, которые могут пойти не так",
    icon: "Cloud",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 43,
    question: "Я обычно чувствую себя в хорошем настроении",
    icon: "Sun",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 4, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 2, factor: "neuroticism" },
      { text: "Полностью согласен", value: 1, factor: "neuroticism" }
    ]
  },
  {
    id: 44,
    question: "Я часто чувствую себя подавленным",
    icon: "CloudRain",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 45,
    question: "Мне трудно справляться с критикой",
    icon: "HeartCrack",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 46,
    question: "Я быстро восстанавливаюсь после неудач",
    icon: "ArrowUp",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 4, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 2, factor: "neuroticism" },
      { text: "Полностью согласен", value: 1, factor: "neuroticism" }
    ]
  },
  {
    id: 47,
    question: "Я склонен винить себя, когда что-то идет не так",
    icon: "UserX",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 2, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 4, factor: "neuroticism" },
      { text: "Полностью согласен", value: 5, factor: "neuroticism" }
    ]
  },
  {
    id: 48,
    question: "Я чувствую себя эмоционально стабильным",
    icon: "Anchor",
    category: "neuroticism",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "neuroticism" },
      { text: "Скорее не согласен", value: 4, factor: "neuroticism" },
      { text: "Нейтрально", value: 3, factor: "neuroticism" },
      { text: "Скорее согласен", value: 2, factor: "neuroticism" },
      { text: "Полностью согласен", value: 1, factor: "neuroticism" }
    ]
  },

  // Открытость опыту (Openness) - вопросы 49-60
  {
    id: 49,
    question: "Мне нравится изучать новые идеи и концепции",
    icon: "Lightbulb",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 50,
    question: "Я предпочитаю традиционные и проверенные способы",
    icon: "Archive",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "openness" },
      { text: "Скорее не согласен", value: 4, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 2, factor: "openness" },
      { text: "Полностью согласен", value: 1, factor: "openness" }
    ]
  },
  {
    id: 51,
    question: "Я открыт для новых и необычных переживаний",
    icon: "Compass",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 52,
    question: "Мне нравится анализировать сложные проблемы",
    icon: "Puzzle",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 53,
    question: "Я ценю искусство, красоту и эстетику",
    icon: "Palette",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 54,
    question: "Мне не интересны абстрактные и теоретические вопросы",
    icon: "X",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "openness" },
      { text: "Скорее не согласен", value: 4, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 2, factor: "openness" },
      { text: "Полностью согласен", value: 1, factor: "openness" }
    ]
  },
  {
    id: 55,
    question: "Я люблю экспериментировать с новыми способами делания вещей",
    icon: "FlaskConical",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 56,
    question: "Я считаю важным придерживаться установленных правил",
    icon: "BookOpen",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "openness" },
      { text: "Скорее не согласен", value: 4, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 2, factor: "openness" },
      { text: "Полностью согласен", value: 1, factor: "openness" }
    ]
  },
  {
    id: 57,
    question: "Меня привлекают философские размышления",
    icon: "BookOpenCheck",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 58,
    question: "Я предпочитаю знакомые и предсказуемые ситуации",
    icon: "Home",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "openness" },
      { text: "Скорее не согласен", value: 4, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 2, factor: "openness" },
      { text: "Полностью согласен", value: 1, factor: "openness" }
    ]
  },
  {
    id: 59,
    question: "Мне нравится погружаться в богатый мир воображения",
    icon: "CloudLightning",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 1, factor: "openness" },
      { text: "Скорее не согласен", value: 2, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 4, factor: "openness" },
      { text: "Полностью согласен", value: 5, factor: "openness" }
    ]
  },
  {
    id: 60,
    question: "Я скептически отношусь к новым идеям",
    icon: "ShieldAlert",
    category: "openness",
    options: [
      { text: "Полностью не согласен", value: 5, factor: "openness" },
      { text: "Скорее не согласен", value: 4, factor: "openness" },
      { text: "Нейтрально", value: 3, factor: "openness" },
      { text: "Скорее согласен", value: 2, factor: "openness" },
      { text: "Полностью согласен", value: 1, factor: "openness" }
    ]
  }
];

// 5 типов результатов на основе доминирующих факторов
export const personalityTypeResults: TestResult[] = [
  {
    id: "extraversion-dominant",
    name: "Социальный Лидер",
    description: "Энергичная и общительная личность, которая процветает в социальных ситуациях и легко вдохновляет окружающих.",
    characteristics: [
      "Высокая социальная энергия и коммуникабельность",
      "Естественные лидерские качества",
      "Любовь к командной работе и сотрудничеству",
      "Способность мотивировать и вдохновлять других",
      "Комфорт в центре внимания"
    ],
    advice: [
      "Используйте свою социальную энергию для построения широких профессиональных сетей",
      "Рассмотрите карьеры в сфере продаж, маркетинга, управления персоналом",
      "Не забывайте выделять время для восстановления в одиночестве",
      "Развивайте навыки публичных выступлений и презентаций",
      "Участвуйте в командных проектах и общественных мероприятиях"
    ],
    color: "var(--chart-1)",
    emoji: "👥",
    score: { min: 0, max: 100 }
  },
  {
    id: "agreeableness-dominant",
    name: "Гармонизатор",
    description: "Эмпатичная и отзывчивая личность, которая ценит гармонию в отношениях и стремится помогать другим.",
    characteristics: [
      "Высокий уровень эмпатии и сочувствия",
      "Стремление к гармонии и избегание конфликтов",
      "Готовность помочь и поддержать других",
      "Доверие к людям и позитивный взгляд на человеческую природу",
      "Склонность к компромиссам и сотрудничеству"
    ],
    advice: [
      "Рассмотрите профессии в сфере помощи людям: психология, социальная работа, медицина",
      "Развивайте навыки медиации и разрешения конфликтов",
      "Учитесь устанавливать границы и отстаивать свои интересы",
      "Используйте свои способности для создания позитивной атмосферы в команде",
      "Не забывайте о собственных потребностях, помогая другим"
    ],
    color: "var(--chart-2)",
    emoji: "🤝",
    score: { min: 0, max: 100 }
  },
  {
    id: "conscientiousness-dominant",
    name: "Систематизатор",
    description: "Организованная и целеустремленная личность, которая ценит порядок, дисциплину и достижение поставленных целей.",
    characteristics: [
      "Высокий уровень самодисциплины и организованности",
      "Систематический подход к решению задач",
      "Надежность и ответственность в обязательствах",
      "Способность к долгосрочному планированию",
      "Стремление к совершенству и высоким стандартам"
    ],
    advice: [
      "Подходят роли менеджера проектов, аналитика, бухгалтера, исследователя",
      "Развивайте навыки тайм-менеджмента и планирования",
      "Учитесь делегировать задачи и работать с командой",
      "Не забывайте о гибкости и адаптации к изменениям",
      "Используйте свои организационные способности для создания эффективных систем"
    ],
    color: "var(--chart-3)",
    emoji: "📊",
    score: { min: 0, max: 100 }
  },
  {
    id: "openness-dominant",
    name: "Новатор",
    description: "Творческая и любознательная личность, которая постоянно ищет новые идеи, опыт и нестандартные решения.",
    characteristics: [
      "Высокая креативность и воображение",
      "Открытость к новым идеям и опыту",
      "Любовь к обучению и интеллектуальным вызовам",
      "Способность мыслить нестандартно",
      "Интерес к искусству, культуре и философии"
    ],
    advice: [
      "Рассмотрите творческие профессии: дизайн, искусство, исследования, инновации",
      "Развивайте свои творческие способности и экспериментируйте с новыми подходами",
      "Ищите возможности для непрерывного обучения и развития",
      "Не бойтесь рисковать и пробовать новое",
      "Используйте свою креативность для решения сложных проблем"
    ],
    color: "var(--chart-4)",
    emoji: "💡",
    score: { min: 0, max: 100 }
  },
  {
    id: "balanced",
    name: "Универсал",
    description: "Сбалансированная личность с гармоничным сочетанием всех факторов, способная адаптироваться к различным ситуациям.",
    characteristics: [
      "Гибкость и адаптивность в различных ситуациях",
      "Сбалансированный подход к работе и отношениям",
      "Способность понимать разные точки зрения",
      "Устойчивость к стрессу и эмоциональная стабильность",
      "Универсальные навыки и широкий кругозор"
    ],
    advice: [
      "Используйте свою адаптивность для работы в различных сферах",
      "Развивайте лидерские качества и навыки командной работы",
      "Рассмотрите междисциплинарные профессии и проекты",
      "Продолжайте развивать все аспекты личности равномерно",
      "Используйте свою способность видеть разные перспективы для решения комплексных задач"
    ],
    color: "var(--chart-5)",
    emoji: "⚖️",
    score: { min: 0, max: 100 }
  }
];

// Функция для подсчета баллов по каждому фактору
export function calculateBigFiveScores(answers: number[]): BigFiveScores {
  const scores = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0
  };

  // Подсчитываем баллы по каждому фактору (по 12 вопросов на фактор)
  personalityTypeQuestions.forEach((question, index) => {
    const answer = answers[index] || 3; // По умолчанию нейтральный ответ
    const factor = question.options[0].factor as keyof BigFiveScores;
    
    // Находим значение для выбранного ответа
    const selectedOption = question.options.find(option => option.value === answer);
    if (selectedOption && factor) {
      scores[factor] += selectedOption.value;
    }
  });

  // Преобразуем в проценты (каждый фактор: 12 вопросов × 5 баллов max = 60 баллов max)
  return {
    extraversion: Math.round((scores.extraversion / 60) * 100),
    agreeableness: Math.round((scores.agreeableness / 60) * 100),
    conscientiousness: Math.round((scores.conscientiousness / 60) * 100),
    neuroticism: Math.round((scores.neuroticism / 60) * 100),
    openness: Math.round((scores.openness / 60) * 100)
  };
}

// Функция для определения результата теста
export function calculatePersonalityTypeResult(answers: number[]): TestResult {
  const scores = calculateBigFiveScores(answers);
  
  // Находим доминирующий фактор
  const factors = Object.entries(scores) as [keyof BigFiveScores, number][];
  const dominantFactor = factors.reduce((prev, current) => 
    current[1] > prev[1] ? current : prev
  );

  // Проверяем, сбалансированная ли личность (разница между max и min < 20)
  const maxScore = Math.max(...factors.map(([, score]) => score));
  const minScore = Math.min(...factors.map(([, score]) => score));
  
  if (maxScore - minScore < 20) {
    return personalityTypeResults.find(result => result.id === 'balanced')!;
  }

  // Определяем тип на основе доминирующего фактора
  const [dominantFactorName] = dominantFactor;
  let resultId: string;

  switch (dominantFactorName) {
    case 'extraversion':
      resultId = 'extraversion-dominant';
      break;
    case 'agreeableness':
      resultId = 'agreeableness-dominant';
      break;
    case 'conscientiousness':
      resultId = 'conscientiousness-dominant';
      break;
    case 'openness':
      resultId = 'openness-dominant';
      break;
    default:
      resultId = 'balanced';
  }

  return personalityTypeResults.find(result => result.id === resultId)!;
}

// Функция для получения типа личности по ID
export function getPersonalityTypeById(id: string): TestResult | undefined {
  return personalityTypeResults.find(result => result.id === id);
}

// Функция для получения данных для radar chart
export function getPersonalityTypeChartData(answers: number[]): ChartData[] {
  const scores = calculateBigFiveScores(answers);
  
  return [
    { factor: "Экстраверсия", value: scores.extraversion, fullMark: 100 },
    { factor: "Доброжелательность", value: scores.agreeableness, fullMark: 100 },
    { factor: "Добросовестность", value: scores.conscientiousness, fullMark: 100 },
    { factor: "Эмоциональная стабильность", value: 100 - scores.neuroticism, fullMark: 100 }, // Инвертируем для лучшей интерпретации
    { factor: "Открытость опыту", value: scores.openness, fullMark: 100 }
  ];
}