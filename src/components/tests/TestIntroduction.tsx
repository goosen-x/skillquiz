'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, BarChart3, Play, Smartphone, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestData } from '@/data/tests';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface TestIntroductionProps {
  test: TestData;
  onStart: () => void;
}

export function TestIntroduction({ test, onStart }: TestIntroductionProps) {
  const features = [
    {
      icon: Smartphone,
      title: 'Цифровые привычки',
      description: 'Анализ вашего отношения к гаджетам и социальным сетям'
    },
    {
      icon: Brain,
      title: 'Осознанность',
      description: 'Оценка уровня контроля над цифровым потреблением'
    },
    {
      icon: Target,
      title: 'Персональные рекомендации',
      description: 'Советы для улучшения цифрового wellness'
    }
  ];

  const personas = [
    'Digital Minimalist',
    'Social Butterfly', 
    'Mindful Scroller',
    'Tech Overwhelmed',
    'Digital Zen Master',
    'Connected Achiever',
    'Screen Time Warrior',
    'Digital Nomad'
  ];

  const breadcrumbItems = [
    { label: 'Тесты', href: '/tests' },
    { label: test.title }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4 text-sm">
              {test.category === 'lifestyle' ? 'Образ жизни' : test.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {test.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {test.description}
            </p>
          </motion.div>
        </div>

        {/* Test Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{test.duration}</div>
            <div className="text-gray-600">Время прохождения</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{test.questionsCount}</div>
            <div className="text-gray-600">Вопросов</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{test.usersCount}</div>
            <div className="text-gray-600">Пользователей прошли</div>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Persona Types Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12"
        >
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Возможные типы цифровой личности
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {personas.map((persona, index) => (
                <motion.div
                  key={persona}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                >
                  <Badge 
                    variant="outline" 
                    className="w-full justify-center py-2 px-3 text-sm font-medium hover:bg-indigo-50 transition-colors"
                  >
                    {persona}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Начать тест
          </Button>
          
          <p className="text-gray-500 mt-4 text-sm">
            Тест анонимен • Результаты сохраняются локально
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}