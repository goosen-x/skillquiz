'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Brain,
  Briefcase,
  Heart,
  Filter,
  Search,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { TestCard } from '@/components/shared/TestCard';
import { siteConfig } from '@/config/site.config';

function TestsCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    if (categoryParam && testCategories.some((cat) => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
    // Сброс видимого количества при смене категории
    setVisibleCount(9);
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

    // Сортировка: сначала готовые тесты, потом в разработке, потом запланированные
    tests = tests.sort((a, b) => {
      const statusOrder = { completed: 0, in_development: 1, planned: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

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
            Каталог{' '}
            <span
              className="text-main"
              style={{
                textShadow:
                  '2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000',
              }}
            >
              тестов
            </span>
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
                <TestCard test={test} variant="detailed" showStats={true} />
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

              <TabsList
                className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-auto gap-2 bg-transparent p-0"
                onClick={() => setVisibleCount(9)}
              >
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9); // Сброс видимого количества при поиске
                }}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border bg-secondary-background focus:shadow-[4px_4px_0px_0px_theme(colors.border)] focus:-translate-x-[2px] focus:-translate-y-[2px] transition-all duration-300 shadow-shadow font-base placeholder:uppercase"
              />
            </div>

            <TabsContent value="all" className="mt-0">
              <TestGrid tests={filteredTests} visibleCount={visibleCount} />
              {filteredTests.length > visibleCount && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    size="lg"
                    className="uppercase font-bold"
                  >
                    Показать ещё
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </TabsContent>

            {testCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <CategoryHeader category={category} />
                {(() => {
                  const categoryTests = getTestsByCategory(category.id)
                    .filter((test) => {
                      if (!searchQuery.trim()) return true;
                      const query = searchQuery.toLowerCase().trim();
                      return (
                        test.title.toLowerCase().includes(query) ||
                        test.description.toLowerCase().includes(query) ||
                        test.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                        test.seoKeywords.some((keyword) => keyword.toLowerCase().includes(query))
                      );
                    })
                    .sort((a, b) => {
                      const statusOrder = { completed: 0, in_development: 1, planned: 2 };
                      return statusOrder[a.status] - statusOrder[b.status];
                    });

                  return (
                    <>
                      <TestGrid tests={categoryTests} visibleCount={visibleCount} />
                      {categoryTests.length > visibleCount && (
                        <div className="text-center mt-8">
                          <Button
                            onClick={() => setVisibleCount((prev) => prev + 6)}
                            size="lg"
                            className="uppercase font-bold"
                          >
                            Показать ещё
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })()}
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

function TestGrid({ tests, visibleCount }: { tests: TestData[]; visibleCount: number }) {
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
      {tests.slice(0, visibleCount).map((test, index) => (
        <motion.div
          key={test.id}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
          }}
        >
          <TestCard test={test} variant="detailed" showStats={true} />
        </motion.div>
      ))}
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
