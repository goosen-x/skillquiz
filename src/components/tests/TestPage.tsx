'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Clock, 
  Users, 
  Shield,
  Zap,
  Heart,
  Brain,
} from 'lucide-react';
import { TestData } from '@/data/tests';
import { digitalWellnessQuestions, DigitalPersona, calculateDigitalPersona } from '@/data/digital-wellness-test';
import TestResults from './TestResults';

interface TestPageProps {
  test: TestData;
}

export default function TestPage({ test }: TestPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<DigitalPersona | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = digitalWellnessQuestions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Загрузка сохраненного прогресса
    const savedProgress = localStorage.getItem(`test-progress-${test.slug}`);
    if (savedProgress) {
      const { answers: savedAnswers, currentQuestion: savedQuestion } = JSON.parse(savedProgress);
      setAnswers(savedAnswers);
      setCurrentQuestion(savedQuestion);
    }
  }, [test.slug]);

  const saveProgress = (newAnswers: number[], questionIndex: number) => {
    localStorage.setItem(
      `test-progress-${test.slug}`,
      JSON.stringify({ answers: newAnswers, currentQuestion: questionIndex })
    );
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      saveProgress(newAnswers, currentQuestion + 1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Последний вопрос - показываем результаты
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: number[]) => {
    setIsLoading(true);
    
    // Имитация загрузки для эффекта
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const persona = calculateDigitalPersona(finalAnswers);
    setResult(persona);
    setShowResults(true);
    setIsLoading(false);

    // Сохраняем результат
    localStorage.setItem(
      `test-result-${test.slug}`,
      JSON.stringify({ persona, date: new Date().toISOString() })
    );
    
    // Очищаем прогресс
    localStorage.removeItem(`test-progress-${test.slug}`);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      saveProgress(answers, currentQuestion - 1);
    }
  };

  if (showResults && result) {
    return <TestResults test={test} result={result} answers={answers} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              className="w-24 h-24 mx-auto bg-chart-5 border-2 border-border shadow-shadow flex items-center justify-center"
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-16 h-16 text-foreground" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4 uppercase">Анализируем ваши ответы...</h2>
          <p className="text-foreground/80 font-base">Определяем вашу цифровую личность</p>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-secondary-background relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-48 h-48 border-2 border-border transform rotate-45" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-chart-1 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-chart-2" />
      </div>
      
      <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        {/* Шапка с прогрессом */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-heading font-bold uppercase">{test.title}</h1>
            <NeoBadge color="yellow" className="text-sm">
              {currentQuestion + 1} из {questions.length}
            </NeoBadge>
          </div>
          <div className="bg-background border-2 border-border p-1">
            <div 
              className="h-3 bg-chart-3 border-border border transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-foreground/80 mt-2 font-base font-bold uppercase">
            {Math.round(progress)}% пройдено
          </p>
        </div>

        {/* Карточка вопроса */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <NeoCard className="bg-background">
              <NeoCardContent className="p-8">
                {/* Иконка вопроса */}
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className={`w-24 h-24 border-2 border-border shadow-shadow flex items-center justify-center ${
                      currentQ.icon === 'smartphone' ? 'bg-chart-2' :
                      currentQ.icon === 'clock' ? 'bg-chart-5' :
                      currentQ.icon === 'users' ? 'bg-chart-4' :
                      currentQ.icon === 'shield' ? 'bg-chart-3' :
                      currentQ.icon === 'zap' ? 'bg-chart-1' :
                      currentQ.icon === 'heart' ? 'bg-chart-3' : ''
                    }`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentQ.icon === 'smartphone' && <Smartphone className="w-12 h-12 text-foreground" />}
                    {currentQ.icon === 'clock' && <Clock className="w-12 h-12 text-foreground" />}
                    {currentQ.icon === 'users' && <Users className="w-12 h-12 text-foreground" />}
                    {currentQ.icon === 'shield' && <Shield className="w-12 h-12 text-foreground" />}
                    {currentQ.icon === 'zap' && <Zap className="w-12 h-12 text-foreground" />}
                    {currentQ.icon === 'heart' && <Heart className="w-12 h-12 text-foreground" />}
                  </motion.div>
                </div>

                {/* Вопрос */}
                <h2 className="text-xl font-heading font-bold text-center mb-8 uppercase">
                  {currentQ.question}
                </h2>

                {/* Варианты ответов */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 4, y: 4 }}
                      whileTap={{ x: 0, y: 0 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 text-left border-2 transition-all font-base ${
                        answers[currentQuestion] === option.value
                          ? 'bg-chart-3 border-border shadow-shadow'
                          : 'bg-secondary-background border-border hover:shadow-shadow'
                      }`}
                    >
                      <span className="text-lg font-bold">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </NeoCardContent>
            </NeoCard>
          </motion.div>
        </AnimatePresence>

        {/* Навигация */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center uppercase font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
          
          <div className="text-sm text-foreground/60 flex items-center font-bold uppercase">
            Вопрос {currentQuestion + 1} из {questions.length}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (answers[currentQuestion] !== undefined && currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              }
            }}
            disabled={answers[currentQuestion] === undefined || currentQuestion === questions.length - 1}
            className="flex items-center uppercase font-bold"
          >
            Далее
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Подсказка для мобильных */}
        <p className="text-center text-sm text-foreground/60 mt-4 font-base">
          Выберите вариант ответа, который лучше всего описывает вас
        </p>
      </div>
    </div>
  );
}