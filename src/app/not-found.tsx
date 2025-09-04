'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { Home, Search, RefreshCw } from 'lucide-react';

const emotions = ['😔', '🤔', '😅', '🧐', '😊'];
const floatingElements = ['🔍', '📄', '💭', '🤷‍♂️', '🎯', '✨'];

export default function NotFound() {
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion((prev) => (prev + 1) % emotions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-10"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + (index % 3) * 25}%`
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element}
        </motion.div>
      ))}

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Animated face */}
        <motion.div
          className="text-6xl mb-6"
          key={currentEmotion}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {emotions[currentEmotion]}
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Упс! Страница потерялась
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Похоже, эта страница решила пройти собственный тест на исчезновение... 
            и успешно его прошла! 🎭
          </p>
        </motion.div>

        {/* Animated suggestions */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Что можно сделать:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <motion.div 
              className="flex items-start space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-medium text-gray-700">Вернуться домой</p>
                <p className="text-sm text-gray-500">Начните с главной страницы</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🧪</span>
              <div>
                <p className="font-medium text-gray-700">Пройти тест</p>
                <p className="text-sm text-gray-500">Узнайте что-то новое о себе</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-medium text-gray-700">Поискать</p>
                <p className="text-sm text-gray-500">Попробуйте другой запрос</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-medium text-gray-700">Выпить кофе</p>
                <p className="text-sm text-gray-500">И попробовать еще раз</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link href="/">
            <AnimatedButton 
              animation="bounce" 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            >
              <Home className="w-5 h-5 mr-2" />
              На главную
            </AnimatedButton>
          </Link>
          
          <Link href="/tests">
            <AnimatedButton 
              animation="scale" 
              variant="outline" 
              size="lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Все тесты
            </AnimatedButton>
          </Link>
          
          <AnimatedButton
            animation="shake"
            variant="ghost"
            size="lg"
            onClick={handleRefresh}
            disabled={isSpinning}
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
            </motion.div>
            Обновить
          </AnimatedButton>
        </motion.div>

        {/* Easter egg - hidden click area */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            // Secret surprise
            const surprises = ['🎉', '✨', '🦄', '🚀', '💫'];
            const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
            alert(`Секретный сюрприз найден! ${randomSurprise}`);
          }}
        >
          <motion.div
            className="text-2xl opacity-20 hover:opacity-60 transition-opacity"
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            🥚
          </motion.div>
        </motion.div>

        {/* Animated quote */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <p className="text-gray-400 italic">
            &ldquo;Иногда самые интересные открытия происходят, когда мы теряемся&rdquo;
            <br />
            — Неизвестный психолог 🧠
          </p>
        </motion.div>
      </div>
    </div>
  );
}