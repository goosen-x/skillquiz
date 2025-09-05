'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Construction, 
  Clock, 
  Calendar,
  ChevronLeft,
  Home,
  Search,
  Bell,
  Sparkles,
  Rocket
} from 'lucide-react';
import { NeoCard, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { TestData } from '@/data/tests';
import { cn } from '@/lib/utils';

interface TestUnderDevelopmentProps {
  test: TestData;
}

export function TestUnderDevelopment({ test }: TestUnderDevelopmentProps) {
  const features = [
    { text: "Научно обоснованные вопросы", icon: "🔬" },
    { text: "Детальная расшифровка результатов", icon: "📊" },
    { text: "Персональные рекомендации", icon: "💡" },
    { text: "Возможность поделиться результатами", icon: "📱" }
  ];

  const similarTests = [
    { slug: 'digital-wellness-persona', title: 'Твоя цифровая личность', isReady: true },
    { slug: 'personality-type', title: 'Тест на тип личности', isReady: false },
    { slug: 'emotional-intelligence', title: 'Эмоциональный интеллект', isReady: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b-2 border-border bg-main">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-chart-2 rotate-45 -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-chart-3 rotate-12 translate-x-24 translate-y-24" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-chart-1 rounded-full" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Construction className="w-20 h-20 text-main-foreground" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-main-foreground mb-4 uppercase">
              {test.title}
            </h1>
            
            <NeoBadge color="yellow" className="mb-6 inline-flex">
              <Clock className="w-4 h-4 mr-2" />
              В РАЗРАБОТКЕ
            </NeoBadge>
            
            <p className="text-xl text-main-foreground/80 max-w-2xl mx-auto font-base">
              {test.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/tests">
            <Button variant="secondary" className="group">
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              К КАТАЛОГУ ТЕСТОВ
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <NeoCard className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-chart-1 border-2 border-border shadow-shadow flex items-center justify-center mr-4">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold uppercase">Тест в разработке</h2>
                    <p className="text-foreground/80 font-bold uppercase">Мы работаем над этим!</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg font-base">
                    Наша команда психологов и разработчиков активно работает над созданием этого теста. 
                    Мы хотим, чтобы он был максимально точным и полезным для вас.
                  </p>
                  
                  {test.expectedDate && (
                    <div className="flex items-center p-4 bg-chart-2/20 border-2 border-border">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span className="font-bold uppercase">
                        Ожидаемая дата: {test.expectedDate}
                      </span>
                    </div>
                  )}
                </div>
              </NeoCard>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NeoCard className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-6 uppercase">
                  Что будет в тесте
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-2xl mr-3">{feature.icon}</span>
                      <span className="font-base">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </NeoCard>
            </motion.div>

            {/* Subscribe Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NeoCard color="yellow" className="p-8">
                <div className="flex items-center mb-4">
                  <Bell className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-heading font-bold uppercase">
                    Получить уведомление
                  </h3>
                </div>
                
                <p className="mb-6 font-base">
                  Хотите узнать первыми, когда тест будет готов? Оставьте свой email, 
                  и мы сообщим вам о запуске.
                </p>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="ВАШ EMAIL"
                    className={cn(
                      "w-full px-4 py-3",
                      "border-2 border-border bg-secondary-background",
                      "shadow-shadow",
                      "font-bold uppercase placeholder:text-foreground/50",
                      "focus:shadow-[4px_4px_0px_0px_theme(colors.border)]",
                      "focus:-translate-x-[2px] focus:-translate-y-[2px]",
                      "transition-all duration-200"
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    ПОДПИСАТЬСЯ НА УВЕДОМЛЕНИЕ
                  </Button>
                </form>
              </NeoCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Test Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NeoCard className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4 uppercase">
                  О тесте
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase text-foreground/80">Категория</span>
                    <NeoBadge color="blue">
                      {test.category === 'psychology' ? 'ПСИХОЛОГИЯ' : 
                       test.category === 'career' ? 'КАРЬЕРА' : 'ОБРАЗ ЖИЗНИ'}
                    </NeoBadge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase text-foreground/80">Сложность</span>
                    <span className="font-bold uppercase">{test.difficulty}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase text-foreground/80">Время</span>
                    <span className="font-bold uppercase">{test.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase text-foreground/80">Вопросов</span>
                    <span className="font-bold uppercase">{test.questionsCount}</span>
                  </div>
                </div>
              </NeoCard>
            </motion.div>

            {/* Similar Tests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NeoCard className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4 uppercase">
                  Похожие тесты
                </h3>
                
                <div className="space-y-3">
                  {similarTests.map((similarTest, index) => (
                    <Link
                      key={index}
                      href={`/tests/${similarTest.slug}`}
                      className="block"
                    >
                      <motion.div
                        className={cn(
                          "p-4 border-2 border-border",
                          "shadow-shadow hover:shadow-[4px_4px_0px_0px_theme(colors.border)]",
                          "hover:-translate-x-[2px] hover:-translate-y-[2px]",
                          "transition-all duration-200",
                          similarTest.isReady ? "bg-chart-4/20" : "bg-secondary-background"
                        )}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold uppercase text-sm">
                            {similarTest.title}
                          </span>
                          {similarTest.isReady && (
                            <NeoBadge color="green">
                              <Sparkles className="w-3 h-3 mr-1" />
                              ГОТОВ
                            </NeoBadge>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                
                <Link href="/tests" className="block mt-6">
                  <Button variant="secondary" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    ВСЕ ТЕСТЫ
                  </Button>
                </Link>
              </NeoCard>
            </motion.div>

            {/* Back Home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  НА ГЛАВНУЮ
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Fun Animation */}
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 1,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <motion.div
            className="w-16 h-16 bg-chart-1 border-2 border-border shadow-shadow rounded-full flex items-center justify-center"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Construction className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default TestUnderDevelopment;