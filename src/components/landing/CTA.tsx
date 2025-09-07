'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  Trophy,
  Rocket,
  Shield,
  Star,
  TrendingUp,
  Lightbulb,
  Heart,
  Award,
  MousePointer,
  Clock,
  Gift,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function CTA() {
  const [activeStat, setActiveStat] = useState(0);

  const stats = [
    {
      number: '73,482',
      label: 'пользователей',
      icon: Heart,
      color: 'bg-[#FF6B35]',
    },
    {
      number: '250K+',
      label: 'тестов пройдено',
      icon: Trophy,
      color: 'bg-[#4ECDC4]',
    },
    {
      number: '94.7%',
      label: 'точность',
      icon: Target,
      color: 'bg-[#FFD23F]',
    },
    {
      number: '4.8/5',
      label: 'рейтинг',
      icon: Star,
      color: 'bg-[#AA96DA]',
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Мгновенный старт',
      text: 'Без регистрации и SMS',
    },
    {
      icon: Brain,
      title: 'Научная база',
      text: 'Проверенные методики',
    },
    {
      icon: Shield,
      title: 'Конфиденциально',
      text: 'Данные защищены',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Dynamic background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, #000 50px, #000 51px),
                           repeating-linear-gradient(0deg, transparent, transparent 50px, #000 50px, #000 51px)`,
            opacity: 0.02,
          }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-[#FFD23F] opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-[#4ECDC4] rounded-full opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated badge */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <NeoBadge color="yellow" className="text-sm">
              <Sparkles className="w-4 h-4 mr-1" />
              ВРЕМЯ ДЕЙСТВОВАТЬ
            </NeoBadge>
          </motion.div>

          {/* Main heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-center mb-8 uppercase">
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Твоя личность —
            </motion.span>
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative z-10">твоя суперсила</span>
              <motion.div
                className="absolute inset-0 bg-[#FFD23F] -rotate-2 z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </motion.span>
          </h2>

          {/* Dynamic stats */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className={cn(
                      'relative p-4 border-2 border-border shadow-[4px_4px_0px_0px_#000000] transition-all hover:shadow-[6px_6px_0px_0px_#000000]',
                      activeStat === index ? stat.color : 'bg-white'
                    )}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex flex-col items-center">
                      <IconComponent
                        className={cn(
                          'w-8 h-8 mb-2',
                          activeStat === index ? 'text-white' : 'text-foreground'
                        )}
                      />
                      <div
                        className={cn(
                          'text-2xl font-heading font-black',
                          activeStat === index ? 'text-white' : 'text-foreground'
                        )}
                      >
                        {stat.number}
                      </div>
                      <div
                        className={cn(
                          'text-xs uppercase font-bold',
                          activeStat === index ? 'text-white' : 'text-foreground/60'
                        )}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive CTA section */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NeoCard className="overflow-hidden bg-gradient-to-br from-[#FFD23F]/10 to-[#FF6B35]/10">
              <NeoCardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Text content */}
                  <div className="text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-heading font-black mb-4 uppercase">
                        Раскрой свой потенциал за <span className="text-[#FF6B35]">10 минут</span>
                      </h3>
                      <p className="text-foreground/80 mb-6 leading-relaxed">
                        Получи детальный анализ личности, рекомендации по карьере и развитию. Узнай,
                        что делает тебя уникальным!
                      </p>
                    </motion.div>

                    {/* Features list */}
                    <div className="space-y-3 mb-8">
                      {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          >
                            <div className="w-10 h-10 bg-white border-2 border-border shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-heading font-bold text-sm uppercase">
                                {feature.title}
                              </div>
                              <div className="text-sm text-foreground/70">{feature.text}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right side - Action area */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      className="relative"
                      animate={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-[#FFD23F] blur-xl opacity-50" />
                      <div className="relative bg-white border-2 border-border shadow-[6px_6px_0px_0px_#000000] p-8 text-center">
                        <Award className="w-16 h-16 text-[#FF6B35] mx-auto mb-4" />
                        <div className="text-3xl font-heading font-black mb-2">БЕСПЛАТНО</div>
                        <div className="text-sm text-foreground/60 uppercase">
                          Навсегда • Без рекламы
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="mt-8 space-y-4 w-full max-w-sm">
                      <Link href="/tests/personality-type">
                        <motion.div whileTap={{ scale: 0.98 }} className="relative group">
                          <div className="absolute inset-0 bg-[#FF6B35] group-hover:bg-[#FFD23F] transition-colors" />
                          <Button
                            size="lg"
                            className="relative w-full bg-[#FFD23F] hover:bg-[#FFD23F] text-foreground border-2 border-border shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all py-6 text-lg font-heading uppercase group"
                          >
                            <Brain className="w-5 h-5 mr-2" />
                            Начать тест
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </Link>

                      <Link href="/tests">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full border-2 hover:bg-foreground hover:text-background transition-all py-5 font-heading uppercase"
                        >
                          Все тесты
                          <TrendingUp className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    {/* Trust indicator */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-sm text-foreground/60"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Shield className="w-4 h-4 text-[#4ECDC4]" />
                      <span>Защищено SSL • Анонимно</span>
                    </motion.div>
                  </div>
                </div>
              </NeoCardContent>
            </NeoCard>

            {/* Animated cursor pointer */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-[#FF6B35] border-2 border-border shadow-[3px_3px_0px_0px_#000000] p-3 rounded-full">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom message */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-foreground/60 text-sm mb-2">
              Присоединяйся к тысячам людей, которые уже открыли свой потенциал
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <Lightbulb className="w-4 h-4 text-[#FFD23F]" />
                <span className="text-xs font-bold uppercase">Инсайты</span>
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-bold uppercase">Цели</span>
              </div>
              <span className="text-foreground/30">•</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
                <span className="text-xs font-bold uppercase">Рост</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Дополнительный компонент для финальной CTA в конце страницы
export function FinalCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section className="py-20 bg-[#FF6B35] relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, #FFD23F, transparent 50%)`,
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-[#FFD23F] border-2 border-border"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-[#4ECDC4] rounded-full border-2 border-border"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-20 w-12 h-12 bg-[#AA96DA] border-2 border-border transform -rotate-12"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Central card */}
          <NeoCard className="bg-white overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD23F]/5 to-[#4ECDC4]/5" />
            <NeoCardContent className="p-8 md:p-12 text-center relative">
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-[#FFD23F] border-2 border-border shadow-[3px_3px_0px_0px_#000000] px-4 py-2 transform -rotate-3">
                  <span className="text-sm font-heading font-black uppercase">
                    Последний шанс сегодня
                  </span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-6 uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Не упусти возможность{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">изменить жизнь</span>
                  <motion.div
                    className="absolute inset-0 bg-[#4ECDC4] -rotate-1 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  />
                </span>
              </motion.h2>

              {/* Subtext */}
              <motion.p
                className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Каждый день откладывая тест, ты теряешь возможность лучше понять себя и найти свой
                идеальный путь развития
              </motion.p>

              {/* Stats row */}
              <motion.div
                className="grid grid-cols-3 gap-4 md:gap-8 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-black text-[#FF6B35]">
                    89%
                  </div>
                  <div className="text-xs uppercase text-foreground/60">Находят призвание</div>
                </div>
                <div className="text-center border-x-2 border-border">
                  <div className="text-3xl md:text-4xl font-heading font-black text-[#4ECDC4]">
                    10
                  </div>
                  <div className="text-xs uppercase text-foreground/60">Минут на тест</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-black text-[#AA96DA]">
                    24/7
                  </div>
                  <div className="text-xs uppercase text-foreground/60">Доступ к результатам</div>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col md:flex-row gap-4 items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/tests/personality-type">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-[#FFD23F] group-hover:bg-[#FF6B35] transition-colors" />
                    <Button
                      size="lg"
                      className="relative bg-[#FF6B35] hover:bg-[#FF6B35] text-white border-2 border-border shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all py-6 px-10 text-lg font-heading uppercase group"
                    >
                      <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Начать прямо сейчас
                    </Button>
                  </motion.div>
                </Link>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Target className="w-4 h-4 text-[#4ECDC4]" />
                  <span className="font-bold uppercase">Точность 94.7%</span>
                  <span className="text-foreground/60">•</span>
                  <Gift className="w-4 h-4 text-[#FFD23F]" />
                  <span className="font-bold uppercase">100% Бесплатно</span>
                </motion.div>
              </motion.div>

              {/* Timer effect */}
              <motion.div
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-[#FFD23F]/10 border-2 border-[#FFD23F] text-sm font-bold"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                <span className="uppercase">Среднее время принятия решения: 3 минуты</span>
              </motion.div>
            </NeoCardContent>
          </NeoCard>

          {/* Bottom decorative elements */}
          <motion.div
            className="flex justify-center mt-8 gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white border border-border"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
