'use client';

import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge, NeoStatCard } from '@/components/ui/neo-card';
import { Star, Quote, Users, Award, TrendingUp } from 'lucide-react';

export function SocialProof() {
  const testimonials = [
    {
      name: 'Анна К.',
      role: 'Маркетолог',
      age: 28,
      rating: 5,
      text: 'Прошла тест на тип личности и была поражена точностью результатов! Наконец-то поняла, почему мне так подходит творческая работа. Рекомендую всем, кто ищет себя.',
      testType: 'Тест на личность',
      avatar: 'AK',
    },
    {
      name: 'Михаил С.',
      role: 'Студент',
      age: 22,
      rating: 5,
      text: 'Благодаря тесту на профессию выбрал IT-направление. Сейчас изучаю программирование и чувствую, что это действительно моё призвание. Спасибо за помощь!',
      testType: 'Тест на профессию',
      avatar: 'МС',
    },
    {
      name: 'Елена В.',
      role: 'HR-директор',
      age: 35,
      rating: 5,
      text: 'Использую тесты для подбора сотрудников. Качество и достоверность результатов на высоком уровне. Коллегам тоже советую для понимания команды.',
      testType: 'Психологические тесты',
      avatar: 'ЕВ',
    },
    {
      name: 'Дмитрий Л.',
      role: 'Предприниматель',
      age: 31,
      rating: 5,
      text: 'Тест на продуктивность помог оптимизировать рабочий день. Узнал, что я "жаворонок" и теперь планирую важные дела на утро. Продуктивность выросла в 2 раза!',
      testType: 'Тест продуктивности',
      avatar: 'ДЛ',
    },
  ];

  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Довольных пользователей',
      neoColor: 'yellow' as const,
    },
    {
      icon: Award,
      value: '98%',
      label: 'Точность результатов',
      neoColor: 'green' as const,
    },
    {
      icon: TrendingUp,
      value: '15+',
      label: 'Типов тестов',
      neoColor: 'purple' as const,
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Средняя оценка',
      neoColor: 'orange' as const,
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
    <section className="py-20 bg-secondary-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4 uppercase">
            Что говорят наши пользователи
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto font-base">
            Тысячи людей уже прошли наши{' '}
            <strong className="font-bold">психологические тесты</strong> и получили ценные инсайты о
            своей личности и карьерном пути
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
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Отзывы */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <NeoCard className="h-full">
                <NeoCardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-chart-5 border-2 border-border shadow-shadow flex items-center justify-center font-heading font-bold text-foreground">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground uppercase">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-foreground/80 font-base">
                          {testimonial.role}, {testimonial.age} лет
                        </p>
                      </div>
                    </div>
                    <NeoBadge color="blue" className="text-xs">
                      {testimonial.testType}
                    </NeoBadge>
                  </div>

                  <div className="flex items-center mb-4 gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-chart-1 fill-chart-1" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative bg-secondary-background border-2 border-border p-4">
                    <Quote className="absolute top-2 left-2 w-8 h-8 text-border opacity-50" />
                    <p className="text-foreground leading-relaxed font-base italic relative z-10 pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                </NeoCardContent>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional information */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <NeoCard className="bg-chart-5" hover={false}>
            <NeoCardContent className="p-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-4 uppercase">
                Присоединяйтесь к тысячам довольных пользователей
              </h3>
              <p className="text-foreground leading-relaxed max-w-3xl mx-auto mb-8 font-base">
                Каждый день сотни людей проходят наши{' '}
                <strong className="font-bold">тесты на личность</strong> и
                <strong className="font-bold"> профориентацию</strong>, получая точные результаты и
                персональные рекомендации. Станьте частью нашего сообщества саморазвития!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  'Бесплатные тесты',
                  'Мгновенные результаты',
                  'Научная достоверность',
                  'Персональные рекомендации',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-chart-4 border-2 border-border shadow-shadow flex items-center justify-center">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm font-bold uppercase text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Geometric separator */}
        <div className="flex justify-center mt-16 gap-4">
          <motion.div
            className="w-4 h-4 bg-chart-5 border-2 border-border"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-4 h-4 bg-chart-4 border-2 border-border rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-4 h-4 bg-chart-3 border-2 border-border"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
