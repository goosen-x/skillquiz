'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { 
  Brain, 
  Briefcase, 
  Heart, 
  Clock, 
  Users, 
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { useSoundEffects } from '@/components/animations/SoundEffects';

export function TestCategories() {
  const { playHover, playClick } = useSoundEffects();

  const categories = [
    {
      id: 'psychology',
      icon: Brain,
      title: 'Психологические тесты',
      description: 'Узнайте свой тип личности, темперамент и психологические особенности',
      neoColor: 'yellow' as const,
      bgColor: 'bg-chart-1',
      popular: true,
      tests: [
        { name: 'Тест на тип личности', time: '10 мин', users: '25K+' },
        { name: 'Тест эмоциональный интеллект', time: '8 мин', users: '18K+' },
        { name: 'Определить темперамент', time: '6 мин', users: '15K+' },
        { name: 'Тест на интроверсию', time: '5 мин', users: '12K+' }
      ],
      keywords: ['психология', 'личность', 'характер', 'темперамент', 'эмоции', 'интроверт', 'экстраверт']
    },
    {
      id: 'career',
      icon: Briefcase, 
      title: 'Карьерные тесты',
      description: 'Выберите подходящую профессию и направление карьерного развития',
      neoColor: 'blue' as const,
      bgColor: 'bg-chart-2',
      popular: false,
      tests: [
        { name: 'Тест на профессию', time: '12 мин', users: '22K+' },
        { name: 'Профориентация онлайн', time: '15 мин', users: '19K+' },
        { name: 'Тест лидерские качества', time: '8 мин', users: '14K+' },
        { name: 'Определить сильные стороны', time: '10 мин', users: '11K+' }
      ],
      keywords: ['профессия', 'карьера', 'работа', 'специальность', 'навыки', 'лидер', 'менеджмент']
    },
    {
      id: 'lifestyle',
      icon: Heart,
      title: 'Тесты образа жизни', 
      description: 'Оптимизируйте свою продуктивность и улучшите качество жизни',
      neoColor: 'orange' as const,
      bgColor: 'bg-chart-3',
      popular: false,
      tests: [
        { name: 'Тест на продуктивность', time: '7 мин', users: '16K+' },
        { name: 'Определить хронотип', time: '6 мин', users: '13K+' },
        { name: 'Тест жаворонок или сова', time: '5 мин', users: '20K+' },
        { name: 'Баланс работа-жизнь', time: '9 мин', users: '8K+' }
      ],
      keywords: ['продуктивность', 'хронотип', 'биоритмы', 'здоровье', 'баланс', 'мотивация']
    }
  ];



  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 border-2 border-border rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-chart-5 transform rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-border" />
        <div className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-chart-4 rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4 uppercase">
            Популярные категории тестов
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto font-base">
            Выберите подходящую категорию и пройдите <strong className="font-bold">психологический тест онлайн</strong> 
            для получения персональных рекомендаций
          </p>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <StaggerItem key={category.id}>
                <NeoCard 
                  color={category.neoColor}
                  className="h-full"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                >
                  {/* Header with icon and badge */}
                  <div className="relative p-6 pb-0">
                    {category.popular && (
                      <div className="absolute top-4 right-4">
                        <NeoBadge color="yellow">
                          <Star className="w-3 h-3 mr-1 inline" />
                          ПОПУЛЯРНО
                        </NeoBadge>
                      </div>
                    )}
                    <motion.div 
                      className={`w-20 h-20 ${category.bgColor} border-2 border-border shadow-shadow flex items-center justify-center mb-4`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <IconComponent className="w-10 h-10 text-foreground" />
                    </motion.div>
                  </div>

                  <NeoCardContent className="p-6 pt-0">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3 uppercase">
                      {category.title}
                    </h3>
                    <p className="text-foreground/80 mb-6 leading-relaxed font-base">
                      {category.description}
                    </p>

                    {/* Test list */}
                    <div className="space-y-2 mb-6 border-2 border-border p-4 bg-secondary-background">
                      {category.tests.slice(0, 3).map((test, testIndex) => (
                        <div key={testIndex} className="flex items-center justify-between py-2 border-b-2 border-border last:border-b-0">
                          <div className="flex-1">
                            <span className="text-sm font-bold text-foreground uppercase">{test.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1 px-2 py-1 bg-background border-2 border-border">
                              <Clock className="w-3 h-3" />
                              <span className="font-bold">{test.time}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-background border-2 border-border">
                              <Users className="w-3 h-3" />
                              <span className="font-bold">{test.users}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {category.tests.length > 3 && (
                        <div className="text-center pt-2">
                          <span className="text-sm font-bold text-foreground uppercase">
                            +{category.tests.length - 3} других тестов
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Keywords for SEO */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {category.keywords.slice(0, 4).map((keyword, keyIndex) => (
                          <NeoBadge
                            key={keyIndex}
                            color={category.neoColor}
                            className="text-xs"
                          >
                            {keyword}
                          </NeoBadge>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <Link href={`/tests?category=${category.id}`}>
                      <Button className="w-full" size="lg">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        ПЕРЕЙТИ К ТЕСТАМ
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </NeoCardContent>
                </NeoCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Additional SEO information */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <NeoCard className="bg-main" hover={false}>
            <NeoCardContent className="p-8">
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-main-foreground mb-8 text-center uppercase">
                Как правильно выбрать психологический тест?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-1 border-2 border-border shadow-shadow flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="font-heading font-bold text-main-foreground mb-2 uppercase">Для самопознания</h4>
                  <p className="text-main-foreground text-sm font-base">
                    Выберите <strong className="font-bold">тест на тип личности</strong> для понимания своего характера и поведенческих особенностей
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-2 border-2 border-border shadow-shadow flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="font-heading font-bold text-main-foreground mb-2 uppercase">Для карьеры</h4>
                  <p className="text-main-foreground text-sm font-base">
                    Пройдите <strong className="font-bold">тест на профессию</strong> для выбора подходящего направления деятельности
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-chart-3 border-2 border-border shadow-shadow flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-foreground" />
                  </div>
                  <h4 className="font-heading font-bold text-main-foreground mb-2 uppercase">Для развития</h4>
                  <p className="text-main-foreground text-sm font-base">
                    Используйте тесты продуктивности для оптимизации рабочих процессов и повышения эффективности
                  </p>
                </div>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>
        
        {/* Geometric separator */}
        <div className="flex justify-center mt-16 gap-4">
          <motion.div 
            className="w-4 h-4 bg-chart-1 border-2 border-border rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="w-4 h-4 bg-chart-2 border-2 border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="w-4 h-4 bg-chart-3 border-2 border-border rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}