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
  // Реализованные тесты
  'digital-wellness-persona': { status: 'completed' as const },
  'personality-type': { status: 'completed' as const },
  'emotional-intelligence': { status: 'completed' as const },
  
  // В разработке (приоритет 1)
  'career-test': { 
    status: 'in_development' as const, 
    expectedDate: 'Февраль 2025' 
  },
  'chronotype': { 
    status: 'in_development' as const, 
    expectedDate: 'Январь 2025' 
  },
  'productivity-test': { 
    status: 'in_development' as const, 
    expectedDate: 'Январь 2025' 
  },
  
  // В разработке (приоритет 2)
  'temperament': { 
    status: 'in_development' as const, 
    expectedDate: 'Февраль 2025' 
  },
  'leadership-test': { 
    status: 'in_development' as const, 
    expectedDate: 'Февраль 2025' 
  },
  'lark-owl': { 
    status: 'in_development' as const, 
    expectedDate: 'Февраль 2025' 
  },
  
  // Планируются (приоритет 3)
  'introvert-extrovert': { status: 'planned' as const },
  'stress-level': { status: 'planned' as const },
  'digital-burnout': { status: 'planned' as const },
  'career-orientation': { status: 'planned' as const },
  'strengths-test': { status: 'planned' as const },
  'team-role': { status: 'planned' as const },
  'professional-burnout': { status: 'planned' as const },
  'work-life-balance': { status: 'planned' as const },
  'bad-habits': { status: 'planned' as const },
  'motivation-level': { status: 'planned' as const },

  // Новые тесты - все планируются
  'love-language': { status: 'planned' as const },
  'attachment-style': { status: 'planned' as const },
  'communication-style': { status: 'planned' as const },
  'self-esteem': { status: 'planned' as const },
  'conflict-style': { status: 'planned' as const },
  'anxiety-level': { status: 'planned' as const },
  'perfectionism': { status: 'planned' as const },
  'cognitive-style': { status: 'planned' as const },
  'emotional-stability': { status: 'planned' as const },
  'social-intelligence': { status: 'planned' as const },
  'creativity-test': { status: 'planned' as const },
  'decision-making': { status: 'planned' as const },
  'memory-type': { status: 'planned' as const },
  'learning-style': { status: 'planned' as const },
  'risk-tolerance': { status: 'planned' as const },
  'work-motivation': { status: 'planned' as const },
  'management-style': { status: 'planned' as const },
  'sales-potential': { status: 'planned' as const },
  'entrepreneurship': { status: 'planned' as const },
  'negotiation-skills': { status: 'planned' as const },
  'workplace-personality': { status: 'planned' as const },
  'innovation-style': { status: 'planned' as const },
  'delegation-skills': { status: 'planned' as const },
  'career-values': { status: 'planned' as const },
  'remote-work-fit': { status: 'planned' as const },
  'sleep-quality': { status: 'planned' as const },
  'nutrition-habits': { status: 'planned' as const },
  'exercise-motivation': { status: 'planned' as const },
  'time-management': { status: 'planned' as const },
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
  'procrastination': { status: 'planned' as const },
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
    ...(statusInfo && 'expectedDate' in statusInfo ? { expectedDate: statusInfo.expectedDate } : {})
  };
}