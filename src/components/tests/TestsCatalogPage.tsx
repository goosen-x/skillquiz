'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  Briefcase,
  Heart,
  Clock,
  Users,
  HelpCircle,
  Star,
  TrendingUp,
  Filter,
  Search,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

import {
  allTests,
  testCategories,
  getTestsByCategory,
  getPopularTests,
  type TestData,
  type TestCategory,
} from '@/data/tests';
import { siteConfig } from '@/config/site.config';

function TestsCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (categoryParam && testCategories.some((cat) => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredTests = useMemo(() => {
    let tests = allTests;

    if (activeCategory !== 'all') {
      tests = getTestsByCategory(activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      tests = tests.filter(
        (test) =>
          test.title.toLowerCase().includes(query) ||
          test.description.toLowerCase().includes(query) ||
          test.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          test.seoKeywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    }

    return tests;
  }, [activeCategory, searchQuery]);

  const popularTests = getPopularTests(3);

  const getCategoryIcon = (iconName: string) => {
    const icons = {
      Brain,
      Briefcase,
      Heart,
    };
    return icons[iconName as keyof typeof icons] || Brain;
  };

  const breadcrumbItems = [{ label: 'Каталог тестов' }];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Каталог психологических тестов онлайн',
            description:
              'Полный каталог психологических тестов: на личность, профориентацию, продуктивность.',
            url: `${siteConfig.url}/tests`,
            publisher: {
              '@type': 'Organization',
              name: 'Professional Test',
              url: siteConfig.url,
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-foreground mb-6 uppercase">
            Каталог <span className="text-main">тестов</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground max-w-4xl mx-auto mb-8 font-base">
            Откройте свой потенциал с научными{' '}
            <strong className="font-bold">психологическими тестами</strong>. Всё{' '}
            <strong className="font-bold">бесплатно</strong> с детальной расшифровкой.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: allTests.length, label: 'Тестов', color: 'bg-chart-1' },
              { value: '50K+', label: 'Пользователей', color: 'bg-chart-2' },
              { value: '3', label: 'Категории', color: 'bg-chart-3' },
              { value: '100%', label: 'Бесплатно', color: 'bg-chart-4' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="border-2 border-border bg-secondary-background p-4 shadow-shadow"
                whileHover={{
                  x: -2,
                  y: -2,
                  boxShadow: '6px 6px 0px 0px var(--border)',
                }}
              >
                <div
                  className={`text-3xl font-heading font-black ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Tests */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-8 text-center uppercase">
            Топ тесты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/tests/${test.slug}`}>
                  <Card className="h-full border-2 border-border shadow-shadow hover:shadow-[6px_6px_0px_0px_theme(colors.border)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all cursor-pointer bg-secondary-background">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="warning" className="uppercase">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Популярный
                        </Badge>
                        <div className="flex items-center text-chart-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < test.popularity ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-foreground mb-2 uppercase">
                        {test.title}
                      </h3>

                      <p className="text-foreground/80 text-sm mb-4 line-clamp-2 font-base">
                        {test.description}
                      </p>

                      <div className="flex items-center justify-between text-xs font-bold uppercase mb-4">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {test.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {test.usersCount}
                        </span>
                      </div>

                      <Button className="w-full uppercase font-bold">
                        Пройти тест
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4 lg:mb-0 uppercase">
                Все тесты
              </h2>

              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-auto gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="border-2 border-border bg-secondary-background data-[state=active]:bg-main data-[state=active]:text-main-foreground shadow-shadow data-[state=active]:shadow-[4px_4px_0px_0px_theme(colors.border)] font-bold uppercase"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Все
                </TabsTrigger>
                {testCategories.map((category) => {
                  const IconComponent = getCategoryIcon(category.icon);
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="border-2 border-border bg-secondary-background data-[state=active]:bg-main data-[state=active]:text-main-foreground shadow-shadow data-[state=active]:shadow-[4px_4px_0px_0px_theme(colors.border)] font-bold uppercase"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0].slice(0, 4)}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск тестов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border bg-secondary-background focus:shadow-[4px_4px_0px_0px_theme(colors.border)] focus:-translate-x-[2px] focus:-translate-y-[2px] transition-all duration-300 shadow-shadow font-base placeholder:uppercase"
              />
            </div>

            <TabsContent value="all" className="mt-0">
              <TestGrid tests={filteredTests} />
            </TabsContent>

            {testCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <CategoryHeader category={category} />
                <TestGrid
                  tests={getTestsByCategory(category.id).filter((test) => {
                    if (!searchQuery.trim()) return true;
                    const query = searchQuery.toLowerCase().trim();
                    return (
                      test.title.toLowerCase().includes(query) ||
                      test.description.toLowerCase().includes(query) ||
                      test.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                      test.seoKeywords.some((keyword) => keyword.toLowerCase().includes(query))
                    );
                  })}
                />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* SEO Block */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-2 border-border bg-secondary-background p-8 shadow-shadow"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-8 text-center uppercase">
            Почему наши тесты?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Target,
                title: 'Точность',
                description: 'Научные методики с высокой достоверностью',
                color: 'bg-chart-1',
              },
              {
                icon: Zap,
                title: 'Быстро',
                description: '5-15 минут для полного анализа',
                color: 'bg-chart-2',
              },
              {
                icon: Award,
                title: 'Подробно',
                description: 'Детальные результаты и рекомендации',
                color: 'bg-chart-3',
              },
              {
                icon: Sparkles,
                title: 'Бесплатно',
                description: 'Все тесты без регистрации и оплаты',
                color: 'bg-chart-4',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} className="text-center" whileHover={{ y: -5 }}>
                  <motion.div
                    className={`w-20 h-20 ${feature.color} border-2 border-border shadow-shadow mx-auto mb-4 flex items-center justify-center`}
                    whileHover={{
                      boxShadow: '4px 4px 0px 0px var(--border)',
                      x: -2,
                      y: -2,
                    }}
                  >
                    <Icon className="w-10 h-10 text-foreground" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-foreground mb-2 uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80 text-sm font-base">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="border-2 border-border bg-main p-6 shadow-shadow">
            <h3 className="text-xl font-heading font-bold text-main-foreground mb-4 text-center uppercase">
              Популярные запросы:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'тест на тип личности',
                'узнать характер',
                'тест на профессию',
                'темперамент',
                'профориентация',
                'тест жаворонок сова',
                'интроверт экстраверт',
                'эмоциональный интеллект',
              ].map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-secondary-background text-foreground text-sm font-bold uppercase border-2 border-border shadow-[2px_2px_0px_0px_theme(colors.border)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function CategoryHeader({ category }: { category: TestCategory }) {
  const colors = {
    blue: 'bg-chart-2',
    green: 'bg-chart-4',
    purple: 'bg-chart-5',
  };

  const colorClass = colors[category.color as keyof typeof colors];
  const IconComponent = getCategoryIcon(category.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 p-6 border-2 border-border bg-secondary-background shadow-shadow"
    >
      <div className="flex items-center mb-4">
        <div
          className={`w-16 h-16 ${colorClass} border-2 border-border shadow-shadow flex items-center justify-center mr-4`}
        >
          <IconComponent className="w-8 h-8 text-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground uppercase">
            {category.name}
          </h2>
          <p className="text-foreground/80 font-bold uppercase">{category.testsCount} тестов</p>
        </div>
      </div>
      <p className="text-foreground/80 leading-relaxed font-base">{category.description}</p>
    </motion.div>
  );
}

function TestGrid({ tests }: { tests: TestData[] }) {
  if (tests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 border-2 border-border bg-secondary-background shadow-shadow rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-12 h-12 text-foreground/60" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-2 uppercase">
          Тесты не найдены
        </h3>
        <p className="text-foreground/80 font-base">Попробуйте изменить запрос или категорию</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {tests.map((test, index) => (
        <TestCard key={test.id} test={test} index={index} />
      ))}
    </motion.div>
  );
}

function TestCard({ test, index }: { test: TestData; index: number }) {
  const categoryColors = {
    psychology: 'bg-chart-2',
    career: 'bg-chart-4',
    lifestyle: 'bg-chart-5',
  };

  const bgColor = categoryColors[test.category];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      }}
      whileHover={test.status === 'completed' ? { y: -5 } : {}}
    >
      {test.status === 'completed' ? (
        <Link href={`/tests/${test.slug}`}>
          <Card className="h-full border-2 border-border shadow-shadow hover:shadow-[6px_6px_0px_0px_theme(colors.border)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all cursor-pointer overflow-hidden bg-secondary-background">
            {/* Header */}
            <div className={`h-20 ${bgColor} relative border-b-2 border-border`}>
              <div className="absolute top-3 right-3 flex gap-2">
                {test.featured && (
                  <Badge variant="warning" className="text-xs px-2 py-1 uppercase">
                    <Star className="w-3 h-3 mr-1" />
                    ТОП
                  </Badge>
                )}
                {test.new && (
                  <Badge variant="destructive" className="text-xs px-2 py-1 uppercase">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
              </div>

              <div className="absolute bottom-3 left-4">
                <Badge variant="secondary" className="text-xs px-2 py-1 uppercase font-bold">
                  {test.difficulty}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 uppercase">
                {test.title}
              </h3>
              <p className="text-foreground/80 text-sm mb-4 line-clamp-3 leading-relaxed font-base">
                {test.description}
              </p>

              <div className="flex items-center justify-between text-xs font-bold uppercase mb-4 pb-4 border-b-2 border-border">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {test.duration}
                </span>
                <span className="flex items-center">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  {test.questionsCount}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {test.usersCount}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {test.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block px-3 py-1 bg-background border-2 border-border text-foreground text-xs font-bold uppercase shadow-[2px_2px_0px_0px_theme(colors.border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-xs font-bold uppercase mr-2">Рейтинг:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < test.popularity ? 'text-chart-1 fill-current' : 'text-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {test.status === 'completed' ? (
                <Button className="w-full uppercase font-bold">
                  Начать тест
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="space-y-2">
                  {test.expectedDate && test.status === 'in_development' && (
                    <p className="text-xs text-center font-bold uppercase text-foreground/60">
                      Ожидается: {test.expectedDate}
                    </p>
                  )}
                  <Button variant="outline" className="w-full uppercase font-bold" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    {test.status === 'in_development' ? 'В разработке' : 'Запланирован'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card className="h-full border-2 border-border shadow-shadow transition-all overflow-hidden bg-secondary-background opacity-75">
          {/* Header */}
          <div className={`h-20 ${bgColor} relative border-b-2 border-border`}>
            <div className="absolute top-3 right-3 flex gap-2">
              {test.status === 'in_development' && (
                <Badge variant="secondary" className="text-xs px-2 py-1 uppercase">
                  <Clock className="w-3 h-3 mr-1" />В РАЗРАБОТКЕ
                </Badge>
              )}
              {test.status === 'planned' && (
                <Badge variant="outline" className="text-xs px-2 py-1 uppercase">
                  <Clock className="w-3 h-3 mr-1" />
                  ЗАПЛАНИРОВАН
                </Badge>
              )}
            </div>

            <div className="absolute bottom-3 left-4">
              <Badge variant="secondary" className="text-xs px-2 py-1 uppercase font-bold">
                {test.difficulty}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 uppercase">
              {test.title}
            </h3>
            <p className="text-foreground/80 text-sm mb-4 line-clamp-3 leading-relaxed font-base">
              {test.description}
            </p>

            <div className="flex items-center justify-between text-xs font-bold uppercase mb-4 pb-4 border-b-2 border-border">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {test.duration}
              </span>
              <span className="flex items-center">
                <HelpCircle className="w-3 h-3 mr-1" />
                {test.questionsCount}
              </span>
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {test.usersCount}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {test.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-block px-3 py-1 bg-background border-2 border-border text-foreground text-xs font-bold uppercase shadow-[2px_2px_0px_0px_theme(colors.border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-xs font-bold uppercase mr-2">Рейтинг:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < test.popularity ? 'text-chart-1 fill-current' : 'text-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {test.expectedDate && test.status === 'in_development' && (
                <p className="text-xs text-center font-bold uppercase text-foreground/60">
                  Ожидается: {test.expectedDate}
                </p>
              )}
              <Button variant="outline" className="w-full uppercase font-bold" disabled>
                <Clock className="w-4 h-4 mr-2" />
                {test.status === 'in_development' ? 'В разработке' : 'Запланирован'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

function getCategoryIcon(iconName: string) {
  const icons = {
    Brain,
    Briefcase,
    Heart,
  };
  return icons[iconName as keyof typeof icons] || Brain;
}

export function TestsCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-foreground font-bold uppercase">Загрузка...</div>
        </div>
      }
    >
      <TestsCatalogContent />
    </Suspense>
  );
}
