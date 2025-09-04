'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { 
  Play, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Sparkles,
  Gift,
  Zap
} from 'lucide-react';

export function CTA() {
  const features = [
    {
      icon: Clock,
      text: 'Результат за 5-15 минут',
      color: 'bg-chart-1'
    },
    {
      icon: CheckCircle,
      text: 'Научно обоснованные методики',
      color: 'bg-chart-2'
    },
    {
      icon: Users,
      text: 'Более 50,000 довольных пользователей',
      color: 'bg-chart-3'
    },
    {
      icon: Gift,
      text: '100% бесплатно, без регистрации',
      color: 'bg-chart-4'
    }
  ];

  const urgencyFactors = [
    'Узнайте свой истинный потенциал уже сегодня',
    'Найдите профессию мечты за несколько минут',
    'Получите персональные рекомендации от экспертов'
  ];

  return (
    <section className="py-20 bg-main relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 bg-chart-1 rotate-45 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-chart-2 rounded-full transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-4 border-border" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-chart-3 transform rotate-12" />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Специальное предложение */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-chart-1 border-2 border-border shadow-shadow text-foreground font-bold uppercase">
              <Sparkles className="w-4 h-4 mr-2" />
              СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
            </div>
          </motion.div>

          {/* Основной заголовок */}
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-main-foreground mb-6 leading-tight uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Откройте секреты своей{' '}
            <span className="text-foreground bg-chart-1 px-2 inline-block transform -rotate-1">личности</span>{' '}
            прямо сейчас!
          </motion.h2>

          {/* Подзаголовок */}
          <motion.p 
            className="text-xl sm:text-2xl text-main-foreground mb-8 leading-relaxed font-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Пройдите <strong className="font-bold">психологический тест</strong> и получите 
            персональную карту личности с рекомендациями по карьере
          </motion.p>

          {/* Факторы срочности */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-3">
              {urgencyFactors.map((factor, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center text-main-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-chart-1 border-2 border-border shadow-shadow flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="font-base">{factor}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Основные CTA кнопки */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                className="bg-chart-1 text-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none px-8 py-6 text-lg font-heading uppercase"
              >
                <Play className="w-5 h-5 mr-2" />
                Начать тест на личность
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                variant="outline"
                className="bg-background text-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none px-8 py-6 text-lg font-heading uppercase"
              >
                Выбрать профессию
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Преимущества */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <motion.div 
                    className={`w-16 h-16 ${feature.color} border-2 border-border shadow-shadow flex items-center justify-center mb-3`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-foreground" />
                  </motion.div>
                  <span className="text-main-foreground text-sm font-bold uppercase">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Гарантия */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <NeoCard className="bg-chart-4" hover={false}>
              <NeoCardContent className="p-6">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-foreground mr-2" />
                  <span className="text-foreground font-heading font-bold uppercase">
                    Гарантия точности результатов
                  </span>
                </div>
                <p className="text-foreground text-sm font-base">
                  Все наши <strong className="font-bold">психологические тесты</strong> основаны на научных 
                  исследованиях и проверены тысячами пользователей. Если результат вам не подойдет - 
                  мы поможем подобрать альтернативный тест
                </p>
              </NeoCardContent>
            </NeoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Дополнительный компонент для финальной CTA в конце страницы
export function FinalCTA() {
  return (
    <section className="py-16 bg-foreground relative overflow-hidden">
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-background border-2 border-background transform rotate-45" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-chart-5 rounded-full" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 uppercase text-background">
            Готовы узнать себя лучше?
          </h2>
          <p className="text-background/80 mb-8 text-lg font-base">
            Присоединяйтесь к тысячам людей, которые уже нашли свой путь с помощью наших тестов
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg"
                className="bg-chart-5 text-foreground border-2 border-background shadow-[4px_4px_0px_0px_theme(colors.background)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none px-8 py-3 text-base font-heading uppercase"
              >
                <Play className="w-4 h-4 mr-2" />
                Пройти тест сейчас
              </Button>
            </motion.div>
            <div className="flex items-center gap-2 text-sm text-background/80 font-bold uppercase">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-chart-1 border-2 border-background shadow-[2px_2px_0px_0px_theme(colors.background)] flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <span>Результат за 5 минут</span>
              </div>
              <span className="text-background">•</span>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-chart-4 border-2 border-background shadow-[2px_2px_0px_0px_theme(colors.background)] flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Абсолютно бесплатно</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}