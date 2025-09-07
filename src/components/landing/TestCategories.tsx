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
  Sparkles,
  Target,
  Shield,
  Zap,
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
      bgColor: 'bg-[#FFD23F]',
      iconBg: 'bg-[#FF6B35]',
      popular: true,
      newBadge: { text: 'ХИТ', color: 'orange' as const },
      tests: [
        { name: 'Тест на тип личности', time: '10 мин', users: '25K+' },
        { name: 'Эмоциональный интеллект', time: '8 мин', users: '18K+' },
        { name: 'Определить темперамент', time: '6 мин', users: '15K+' },
        { name: 'Тест на интроверсию', time: '5 мин', users: '12K+' },
      ],
      keywords: [
        'психология',
        'личность',
        'характер',
        'темперамент',
        'эмоции',
        'интроверт',
        'экстраверт',
      ],
    },
    {
      id: 'career',
      icon: Briefcase,
      title: 'Карьерные тесты',
      description: 'Выберите подходящую профессию и направление карьерного развития',
      neoColor: 'blue' as const,
      bgColor: 'bg-[#4ECDC4]',
      iconBg: 'bg-[#0099FF]',
      popular: false,
      newBadge: { text: 'NEW', color: 'green' as const },
      tests: [
        { name: 'Тест на профессию', time: '12 мин', users: '22K+' },
        { name: 'Профориентация онлайн', time: '15 мин', users: '19K+' },
        { name: 'Лидерские качества', time: '8 мин', users: '14K+' },
        { name: 'Сильные стороны', time: '10 мин', users: '11K+' },
      ],
      keywords: [
        'профессия',
        'карьера',
        'работа',
        'специальность',
        'навыки',
        'лидер',
        'менеджмент',
      ],
    },
    {
      id: 'lifestyle',
      icon: Heart,
      title: 'Тесты образа жизни',
      description: 'Оптимизируйте свою продуктивность и улучшите качество жизни',
      neoColor: 'purple' as const,
      bgColor: 'bg-[#F38181]',
      iconBg: 'bg-[#AA96DA]',
      popular: false,
      newBadge: { text: 'TOP', color: 'yellow' as const },
      tests: [
        { name: 'Тест на продуктивность', time: '7 мин', users: '16K+' },
        { name: 'Определить хронотип', time: '6 мин', users: '13K+' },
        { name: 'Жаворонок или сова', time: '5 мин', users: '20K+' },
        { name: 'Баланс работа-жизнь', time: '9 мин', users: '8K+' },
      ],
      keywords: ['продуктивность', 'хронотип', 'биоритмы', 'здоровье', 'баланс', 'мотивация'],
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
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
            Выберите подходящую категорию и пройдите{' '}
            <strong className="font-bold">психологический тест онлайн</strong>
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
                    <div className="absolute top-4 right-4">
                      <NeoBadge color={category.newBadge.color}>
                        {category.newBadge.text === 'ХИТ' && (
                          <Star className="w-3 h-3 mr-1 inline" />
                        )}
                        {category.newBadge.text === 'NEW' && (
                          <Sparkles className="w-3 h-3 mr-1 inline" />
                        )}
                        {category.newBadge.text === 'TOP' && (
                          <Zap className="w-3 h-3 mr-1 inline" />
                        )}
                        {category.newBadge.text}
                      </NeoBadge>
                    </div>
                    <div
                      className={`w-20 h-20 ${category.iconBg} border-2 border-border shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center mb-4 transform rotate-3 hover:rotate-0 transition-transform`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <NeoCardContent className="p-6 pt-0">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3 uppercase">
                      {category.title}
                    </h3>
                    <p className="text-foreground/80 mb-6 leading-relaxed font-base">
                      {category.description}
                    </p>

                    {/* Test list */}
                    <div
                      className={`space-y-2 mb-6 border-2 border-border p-4 ${category.bgColor} bg-opacity-20`}
                    >
                      {category.tests.slice(0, 3).map((test, testIndex) => (
                        <motion.div
                          key={testIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: testIndex * 0.1 }}
                          className="flex items-center justify-between py-2 border-b-2 border-border/30 last:border-b-0 hover:pl-2 transition-all"
                        >
                          <div className="flex-1">
                            <span className="text-sm font-bold text-foreground">{test.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-border rounded-sm">
                              <Clock className="w-3 h-3" />
                              <span className="font-bold">{test.time}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-border rounded-sm">
                              <Users className="w-3 h-3" />
                              <span className="font-bold">{test.users}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {category.tests.length > 3 && (
                        <div className="text-center pt-2">
                          <span className="text-sm font-bold text-foreground/70">
                            +{category.tests.length - 3} других тестов
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Keywords for SEO */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {category.keywords.slice(0, 4).map((keyword, keyIndex) => (
                          <motion.div
                            key={keyIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + keyIndex * 0.05 }}
                          >
                            <span className="inline-block px-3 py-1 bg-white border border-border text-xs font-bold uppercase">
                              #{keyword}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA button */}
                    <Link href={`/tests?category=${category.id}`}>
                      <Button
                        className={`w-full group ${category.neoColor === 'yellow' ? 'bg-[#FF6B35] hover:bg-[#FF6B35]' : category.neoColor === 'blue' ? 'bg-[#0099FF] hover:bg-[#0099FF]' : 'bg-[#AA96DA] hover:bg-[#AA96DA]'} border-2 border-black text-white`}
                        size="lg"
                      >
                        ПЕРЕЙТИ К ТЕСТАМ
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
          <NeoCard className="overflow-hidden" hover={false}>
            {/* Pattern background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px),
                                   repeating-linear-gradient(-45deg, transparent, transparent 10px, #000 10px, #000 20px)`,
              }}
            />
            <NeoCardContent className="p-8 relative">
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-8 text-center uppercase">
                Как правильно выбрать психологический тест?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#FF6B35] border-2 border-border shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center mx-auto mb-4 transform rotate-6 hover:rotate-0 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2 uppercase">
                    Для самопознания
                  </h4>
                  <p className="text-foreground/80 text-sm font-base">
                    Выберите{' '}
                    <strong className="font-bold text-[#FF6B35]">тест на тип личности</strong> для
                    понимания своего характера и поведенческих особенностей
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#0099FF] border-2 border-border shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center mx-auto mb-4 transform -rotate-6 hover:rotate-0 transition-transform">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2 uppercase">
                    Для карьеры
                  </h4>
                  <p className="text-foreground/80 text-sm font-base">
                    Пройдите <strong className="font-bold text-[#0099FF]">тест на профессию</strong>{' '}
                    для выбора подходящего направления деятельности
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-[#AA96DA] border-2 border-border shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center mx-auto mb-4 transform rotate-6 hover:rotate-0 transition-transform">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2 uppercase">
                    Для развития
                  </h4>
                  <p className="text-foreground/80 text-sm font-base">
                    Используйте{' '}
                    <strong className="font-bold text-[#AA96DA]">тесты продуктивности</strong> для
                    оптимизации рабочих процессов и повышения эффективности
                  </p>
                </motion.div>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Geometric separator */}
        <div className="flex justify-center mt-16 gap-4">
          <motion.div
            className="w-6 h-6 bg-[#FFD23F] border-2 border-border shadow-[2px_2px_0px_0px_#000000]"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="w-6 h-6 bg-[#FF6B35] border-2 border-border rounded-full shadow-[2px_2px_0px_0px_#000000]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-6 h-6 bg-[#0099FF] border-2 border-border shadow-[2px_2px_0px_0px_#000000]"
            animate={{ rotate: [360, 180, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="w-6 h-6 bg-[#AA96DA] border-2 border-border rounded-full shadow-[2px_2px_0px_0px_#000000]"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
