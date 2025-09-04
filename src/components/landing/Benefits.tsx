'use client';

import { motion } from 'framer-motion';
import { Brain, Target, Clock, Shield, Users, Lightbulb } from 'lucide-react';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';

export function Benefits() {
  const benefits = [
    {
      icon: Brain,
      title: 'Самопознание',
      description: 'Глубокое понимание своего характера, темперамента и психологических особенностей для личностного роста',
      keywords: ['психология', 'самопознание', 'характер', 'темперament'],
      color: 'bg-chart-1'
    },
    {
      icon: Target,
      title: 'Точная профориентация', 
      description: 'Научно обоснованные рекомендации по выбору профессии на основе ваших интересов и способностей',
      keywords: ['профориентация', 'выбор профессии', 'карьера', 'специальность'],
      color: 'bg-chart-2'
    },
    {
      icon: Clock,
      title: 'Экономия времени',
      description: 'Быстрые тесты за 5-15 минут с мгновенными результатами и подробной расшифровкой',
      keywords: ['быстро', 'эффективно', 'результат', 'онлайн'],
      color: 'bg-chart-3'
    },
    {
      icon: Shield,
      title: 'Научная достоверность',
      description: 'Все тесты основаны на проверенных психологических методиках и научных исследованиях',
      keywords: ['наука', 'достоверность', 'методика', 'точность'],
      color: 'bg-chart-4'
    },
    {
      icon: Users,
      title: 'Социальное взаимодействие',
      description: 'Лучшее понимание других людей и улучшение отношений в семье, работе и дружбе',
      keywords: ['отношения', 'общение', 'эмпатия', 'коммуникация'],
      color: 'bg-chart-5'
    },
    {
      icon: Lightbulb,
      title: 'Развитие потенциала',
      description: 'Выявление скрытых талантов и возможностей для максимального раскрытия своих способностей',
      keywords: ['потенциал', 'таланты', 'способности', 'развитие'],
      color: 'bg-chart-1'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 border-2 border-border rotate-45" />
        <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-border" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-chart-2 rotate-12" />
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-chart-3 rounded-full" />
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
            Преимущества <span className="text-main">психологических тестов</span>
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto font-base">
            Узнайте, как наши тесты помогут вам лучше понять себя, выбрать подходящую 
            профессию и улучшить качество жизни
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <NeoCard className="h-full">
                  <NeoCardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <motion.div 
                          className={`w-16 h-16 ${benefit.color} border-2 border-border shadow-shadow flex items-center justify-center`}
                          whileHover={{ 
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.3 }
                          }}
                        >
                          <IconComponent className="w-8 h-8 text-foreground" />
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-foreground mb-2 uppercase">
                          {benefit.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed mb-4 font-base">
                          {benefit.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {benefit.keywords.map((keyword, keyIndex) => (
                            <NeoBadge 
                              key={keyIndex}
                              className="text-xs"
                            >
                              {keyword}
                            </NeoBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NeoCardContent>
                </NeoCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* SEO info block - now in neobrutalism style */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NeoCard className="bg-main">
            <NeoCardContent className="p-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-main-foreground mb-4 uppercase">
                Почему важно знать свой тип личности?
              </h3>
              <p className="text-main-foreground leading-relaxed max-w-4xl mx-auto font-base">
                Понимание своего <strong className="font-bold">типа личности</strong> помогает принимать правильные решения 
                в карьере, отношениях и саморазвитии. Наши <strong className="font-bold">психологические тесты</strong> основаны 
                на научных методиках и помогают тысячам людей найти свой путь. Пройдите 
                <strong className="font-bold"> тест на личность бесплатно</strong> и получите персональные рекомендации 
                от профессиональных психологов.
              </p>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Geometric separator */}
        <div className="flex justify-center mt-16 gap-4">
          <motion.div 
            className="w-4 h-4 bg-chart-1 border-2 border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="w-4 h-4 bg-chart-2 border-2 border-border"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="w-4 h-4 bg-chart-3 border-2 border-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}