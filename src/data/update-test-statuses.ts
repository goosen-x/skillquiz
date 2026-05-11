// Временный файл для обновления статусов тестов
// После применения можно удалить

interface BaseTestData {
  id: string;
  title: string;
  description: string;
  category: 'psychology' | 'career' | 'lifestyle';
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  duration: string;
  questionsCount: number;
  usersCount: string;
  popularity: number;
  tags: string[];
  seoKeywords: string[];
  featured: boolean;
  new: boolean;
  slug: string;
}

export const testStatuses = {
  // ✅ Полностью рабочие тесты (есть массив Results или специальный recoverer)
  'personality-type': { status: 'completed' as const },
  'emotional-intelligence': { status: 'completed' as const },
  'impostor-syndrome': { status: 'completed' as const },
  'mental-resilience': { status: 'completed' as const },
  'dopamine-detox-need': { status: 'completed' as const },
  temperament: { status: 'completed' as const },
  'love-language': { status: 'completed' as const },
  'attachment-style': { status: 'completed' as const },
  'communication-style': { status: 'completed' as const },
  'learning-style': { status: 'completed' as const },

  // ⚠️ Тесты в доработке: страница результата падает (нет статичного Results массива)
  // TODO: добавить массив <test>Results с возможными результатами в каждый файл
  'digital-wellness-persona': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'introvert-extrovert': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'stress-level': { status: 'in_development' as const, expectedDate: 'Скоро' },
  chronotype: { status: 'in_development' as const, expectedDate: 'Скоро' },
  'work-life-balance': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'self-esteem': { status: 'in_development' as const, expectedDate: 'Скоро' },
  procrastination: { status: 'in_development' as const, expectedDate: 'Скоро' },
  'time-management': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'anxiety-level': { status: 'in_development' as const, expectedDate: 'Скоро' },
  perfectionism: { status: 'in_development' as const, expectedDate: 'Скоро' },
  'creativity-test': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'decision-making': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'emotional-stability': { status: 'in_development' as const, expectedDate: 'Скоро' },

  // В разработке (приоритет 1)
  'career-test': {
    status: 'in_development' as const,
    expectedDate: 'Февраль 2025',
  },
  'productivity-test': {
    status: 'in_development' as const,
    expectedDate: 'Январь 2025',
  },

  // В разработке (приоритет 2)
  'leadership-test': {
    status: 'in_development' as const,
    expectedDate: 'Февраль 2025',
  },
  'lark-owl': {
    status: 'in_development' as const,
    expectedDate: 'Февраль 2025',
  },

  // Планируются (приоритет 3)
  'digital-burnout': { status: 'planned' as const },
  'career-orientation': { status: 'planned' as const },
  'strengths-test': { status: 'planned' as const },
  'team-role': { status: 'planned' as const },
  'professional-burnout': { status: 'planned' as const },
  'bad-habits': { status: 'planned' as const },
  'motivation-level': { status: 'planned' as const },

  // Новые тесты - в доработке (страница результата падает)
  'conflict-style': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'social-intelligence': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'memory-type': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'risk-tolerance': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'work-motivation': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'management-style': { status: 'in_development' as const, expectedDate: 'Скоро' },
  'sales-potential': { status: 'in_development' as const, expectedDate: 'Скоро' },
  entrepreneurship: { status: 'in_development' as const, expectedDate: 'Скоро' },
  'negotiation-skills': { status: 'planned' as const },
  'workplace-personality': { status: 'planned' as const },
  'innovation-style': { status: 'planned' as const },
  'delegation-skills': { status: 'planned' as const },
  'career-values': { status: 'planned' as const },
  'remote-work-fit': { status: 'planned' as const },
  'sleep-quality': { status: 'planned' as const },
  'nutrition-habits': { status: 'planned' as const },
  'exercise-motivation': { status: 'planned' as const },
  // 'time-management' уже в списке выше как completed
  'money-mindset': { status: 'planned' as const },
  'social-media-usage': { status: 'planned' as const },
  'travel-style': { status: 'planned' as const },
  'minimalism-tendency': { status: 'planned' as const },
  'hobby-matcher': { status: 'planned' as const },
  'environmental-consciousness': { status: 'planned' as const },
  'parenting-style': { status: 'planned' as const },
  'relationship-readiness': { status: 'planned' as const },
  'friendship-quality': { status: 'planned' as const },
  'happiness-level': { status: 'planned' as const },
  // 'procrastination' уже в списке выше как completed
  'digital-detox-readiness': { status: 'planned' as const },
  'mindfulness-level': { status: 'planned' as const },
  'goal-setting-style': { status: 'planned' as const },
  'energy-management': { status: 'planned' as const },
  'organization-skills': { status: 'planned' as const },
  'focus-ability': { status: 'planned' as const },
  'change-adaptability': { status: 'planned' as const },
  'life-satisfaction': { status: 'planned' as const },
  'generation-gap': { status: 'planned' as const },
  'humor-style': { status: 'planned' as const },
  'music-personality': { status: 'planned' as const },
  'color-psychology': { status: 'planned' as const },
  'personal-brand': { status: 'planned' as const },
  'networking-style': { status: 'planned' as const },
  'presentation-skills': { status: 'planned' as const },
  'ai-readiness': { status: 'planned' as const },
  'crypto-mindset': { status: 'planned' as const },
  'sustainability-lifestyle': { status: 'planned' as const },
  'influencer-potential': { status: 'planned' as const },
  'gaming-personality': { status: 'planned' as const },
  'shopping-behavior': { status: 'planned' as const },
  'home-personality': { status: 'planned' as const },
  'weather-mood': { status: 'planned' as const },
  'pet-compatibility': { status: 'planned' as const },
  'tech-role-fit': { status: 'planned' as const },
  'creative-role-fit': { status: 'planned' as const },
  'consulting-aptitude': { status: 'planned' as const },
  'teaching-potential': { status: 'planned' as const },
  'social-battery': { status: 'planned' as const },
  'weekend-archetype': { status: 'planned' as const },
  'morning-routine': { status: 'planned' as const },
  'vacation-style': { status: 'planned' as const },
  'reading-personality': { status: 'planned' as const },
  'city-country-preference': { status: 'planned' as const },
  'social-media-personality': { status: 'planned' as const },
  'generation-z-traits': { status: 'planned' as const },
  'mindset-type': { status: 'planned' as const },
  'life-priorities': { status: 'planned' as const },
  'future-readiness': { status: 'planned' as const },
};

// Функция для обновления тестов
export function updateTestWithStatus(test: BaseTestData) {
  const statusInfo = testStatuses[test.id as keyof typeof testStatuses];
  return {
    ...test,
    status: statusInfo?.status || 'planned',
    ...(statusInfo && 'expectedDate' in statusInfo
      ? { expectedDate: statusInfo.expectedDate }
      : {}),
  };
}
