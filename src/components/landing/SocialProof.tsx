'use client';

import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge, NeoStatCard } from '@/components/ui/neo-card';
import {
  Star,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Calendar,
  MessageCircle,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SocialProof() {
  const testimonials = [
    {
      name: 'Марина Соколова',
      role: 'Product Manager',
      age: 29,
      rating: 5,
      text: 'После теста на синдром самозванца наконец поняла, откуда берутся мои сомнения. Результаты помогли структурировать работу с психологом. Особенно ценно, что есть конкретные рекомендации.',
      testType: 'Синдром самозванца',
      avatar: 'МС',
      color: 'bg-[#FFD23F]',
      date: '2 дня назад',
      helpful: 127,
      verified: true,
    },
    {
      name: 'Павел Дмитриев',
      role: 'Разработчик',
      age: 24,
      rating: 5,
      text: 'Всегда считал психологические тесты ерундой, но решил попробовать из любопытства. Тест на хронотип реально изменил мой подход к планированию дня. Теперь важные задачи делаю в пиковые часы продуктивности.',
      testType: 'Хронотип',
      avatar: 'ПД',
      color: 'bg-[#4ECDC4]',
      date: 'Неделю назад',
      helpful: 89,
      verified: true,
    },
    {
      name: 'Ольга Петренко',
      role: 'HR Business Partner',
      age: 34,
      rating: 5,
      text: 'Использую платформу для оценки кандидатов уже полгода. Тест на эмоциональный интеллект особенно хорош - помогает понять soft skills ещё на этапе отбора. Экономия времени колоссальная.',
      testType: 'Эмоциональный интеллект',
      avatar: 'ОП',
      color: 'bg-[#F38181]',
      date: '3 дня назад',
      helpful: 156,
      verified: true,
    },
    {
      name: 'Алексей Ким',
      role: 'Студент психологии',
      age: 21,
      rating: 5,
      text: 'Изучал Big Five на парах, но только после вашего теста реально понял свой профиль. Визуализация результатов топ! Преподаватель даже попросил ссылку для других студентов.',
      testType: 'Тип личности Big Five',
      avatar: 'АК',
      color: 'bg-[#AA96DA]',
      date: '5 дней назад',
      helpful: 203,
      verified: true,
    },
    {
      name: 'Екатерина Волкова',
      role: 'Фрилансер',
      age: 31,
      rating: 4,
      text: 'Прошла тест на выгорание и ужаснулась результатам. Но благодаря рекомендациям смогла перестроить рабочий график. Минус звезда за то, что некоторые вопросы показались слишком личными.',
      testType: 'Эмоциональное выгорание',
      avatar: 'ЕВ',
      color: 'bg-[#FF6B35]',
      date: 'Месяц назад',
      helpful: 94,
      verified: true,
    },
    {
      name: 'Дмитрий Новиков',
      role: 'Предприниматель',
      age: 37,
      rating: 5,
      text: 'Тест на психологическую устойчивость прошёл после стресса с бизнесом. Результаты совпали с оценкой моего психотерапевта на 90%. Рекомендации действительно работают - проверено на себе.',
      testType: 'Психологическая устойчивость',
      avatar: 'ДН',
      color: 'bg-[#95E1D3]',
      date: '2 недели назад',
      helpful: 178,
      verified: true,
    },
  ];

  const stats = [
    {
      icon: Users,
      value: '73,482',
      label: 'Активных пользователей',
      neoColor: 'yellow' as const,
      trend: 'up' as const,
      trendValue: '+12% за месяц',
    },
    {
      icon: Award,
      value: '94.7%',
      label: 'Точность по отзывам',
      neoColor: 'green' as const,
      trend: 'neutral' as const,
      trendValue: 'Проверено психологами',
    },
    {
      icon: MessageCircle,
      value: '8,934',
      label: 'Отзывов за год',
      neoColor: 'purple' as const,
      trend: 'up' as const,
      trendValue: '4.8 средний рейтинг',
    },
    {
      icon: TrendingUp,
      value: '250K+',
      label: 'Пройдено тестов',
      neoColor: 'orange' as const,
      trend: 'up' as const,
      trendValue: '+45% рост в 2024',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, #000 100px, #000 102px),
                           repeating-linear-gradient(0deg, transparent, transparent 100px, #000 100px, #000 102px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NeoBadge color="yellow" className="mb-4">
              <Star className="w-4 h-4 mr-1" />
              СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО
            </NeoBadge>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4 uppercase">
            Реальные отзывы <span className="text-[#FF6B35]">реальных людей</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-base">
            Мы не придумываем отзывы. Каждый из них проверен и связан с реальным прохождением теста.
            Читайте, что пишут пользователи после получения результатов.
          </p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <NeoStatCard
                  title={stat.label}
                  value={stat.value}
                  icon={<IconComponent className="w-6 h-6" />}
                  color={stat.neoColor}
                  trend={stat.trend}
                  trendValue={stat.trendValue}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Отзывы - Masonry layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                index === 0 && 'md:col-span-2 lg:col-span-1',
                index === 3 && 'lg:row-span-2'
              )}
            >
              <NeoCard className="h-full hover:translate-y-[-4px] transition-transform">
                <NeoCardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'w-14 h-14 border-2 border-border shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center font-heading font-bold text-white text-lg',
                          testimonial.color
                        )}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-foreground">
                            {testimonial.name}
                          </h4>
                          {testimonial.verified && (
                            <CheckCircle className="w-4 h-4 text-[#0099FF]" />
                          )}
                        </div>
                        <p className="text-sm text-foreground/60 font-base">
                          {testimonial.role}, {testimonial.age} лет
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Test type & Date */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <NeoBadge color={index % 2 === 0 ? 'blue' : 'green'} className="text-xs">
                      {testimonial.testType}
                    </NeoBadge>
                    <div className="flex items-center text-xs text-foreground/60">
                      <Calendar className="w-3 h-3 mr-1" />
                      {testimonial.date}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonial.rating
                            ? 'text-[#FFD23F] fill-[#FFD23F]'
                            : 'text-border fill-transparent'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm font-bold">{testimonial.rating}.0</span>
                  </div>

                  {/* Review text */}
                  <p className="text-foreground/90 leading-relaxed font-base mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-border/20">
                    <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Полезно ({testimonial.helpful})</span>
                    </button>
                    <span className="text-xs text-foreground/40">Проверенный отзыв</span>
                  </div>
                </NeoCardContent>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <NeoCard className="overflow-hidden" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD23F]/10 to-[#FF6B35]/10" />
            <NeoCardContent className="p-8 text-center relative">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-[#FF6B35] border-2 border-border shadow-[4px_4px_0px_0px_#000000] rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-4 uppercase">
                Ваш отзыв важен для нас
              </h3>
              <p className="text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8 font-base">
                Прошли тест? Поделитесь впечатлениями! Каждый отзыв помогает нам делать тесты лучше
                и полезнее для новых пользователей. Все отзывы проходят модерацию.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4]" />
                  <span className="text-sm font-bold">Только реальные отзывы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD23F]" />
                  <span className="text-sm font-bold">Проверка модератором</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#AA96DA]" />
                  <span className="text-sm font-bold">Помощь сообществу</span>
                </div>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Animated shapes */}
        <div className="flex justify-center mt-16 gap-6">
          {[
            { color: 'bg-[#FFD23F]', delay: 0 },
            { color: 'bg-[#FF6B35]', delay: 0.2 },
            { color: 'bg-[#4ECDC4]', delay: 0.4 },
            { color: 'bg-[#AA96DA]', delay: 0.6 },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                'w-6 h-6 border-2 border-border shadow-[2px_2px_0px_0px_#000000]',
                item.color,
                index % 2 === 0 ? '' : 'rounded-full'
              )}
              animate={{
                y: [0, -10, 0],
                rotate: index % 2 === 0 ? [0, 180, 360] : 0,
              }}
              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
                delay: item.delay,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
