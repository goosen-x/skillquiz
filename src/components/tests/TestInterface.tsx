'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TestData } from '@/data/tests';
import { TestQuestion } from '@/data/digital-wellness-test';
import { useSoundEffects } from '@/components/animations/SoundEffects';
import { MilestoneToast } from '@/components/animations/ConfettiEffect';

interface TestInterfaceProps {
  test: TestData;
  questions: TestQuestion[];
  answers: Record<string, string>;
  onAnswerSelect: (questionId: string, answerId: string) => void;
  onComplete: () => void;
}

export function TestInterface({ 
  test, 
  questions, 
  answers, 
  onAnswerSelect, 
  onComplete 
}: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showMilestone, setShowMilestone] = useState<number | null>(null);
  const [achievedMilestones, setAchievedMilestones] = useState<Set<number>>(new Set());
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Check if current question is answered
  const isCurrentQuestionAnswered = !!answers[currentQuestion.id];
  
  // Check if all questions are answered
  const allQuestionsAnswered = questions.every(q => !!answers[q.id]);

  const { playClick, playSuccess, playTransition, playMilestone } = useSoundEffects();

  // Check for milestones
  useEffect(() => {
    const milestones = [25, 50, 75];
    
    milestones.forEach(milestone => {
      if (progress >= milestone && !achievedMilestones.has(milestone)) {
        setAchievedMilestones(prev => new Set(prev).add(milestone));
        setShowMilestone(milestone);
        playMilestone();
        
        setTimeout(() => setShowMilestone(null), 3000);
      }
    });
  }, [progress, achievedMilestones, playMilestone]);

  const handleNext = () => {
    if (isLastQuestion && allQuestionsAnswered) {
      playSuccess();
      onComplete();
    } else if (currentQuestionIndex < questions.length - 1) {
      playTransition();
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      playTransition();
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerClick = (answerId: string) => {
    playClick();
    onAnswerSelect(currentQuestion.id.toString(), answerId);
  };

  const questionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with progress */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {test.title}
            </h1>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {currentQuestionIndex + 1} из {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={currentQuestionIndex}
              custom={1}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <Card className="p-6 md:p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-sm font-medium text-indigo-600 mb-4">
                    Вопрос {currentQuestionIndex + 1}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => handleAnswerClick(option.value.toString())}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        answers[currentQuestion.id.toString()] === option.value.toString()
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                          answers[currentQuestion.id.toString()] === option.value.toString()
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion.id.toString()] === option.value.toString() && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium leading-relaxed">
                            {option.text}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-t">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Назад</span>
            </Button>

            <div className="flex items-center gap-2 mx-4">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-indigo-500'
                      : answers[questions[index].id.toString()]
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Перейти к вопросу ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className={`flex items-center gap-2 transition-all duration-200 ${
                isLastQuestion && allQuestionsAnswered
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  : ''
              }`}
            >
              <span className="hidden sm:inline">
                {isLastQuestion && allQuestionsAnswered ? 'Завершить' : 'Далее'}
              </span>
              <span className="sm:hidden">
                {isLastQuestion && allQuestionsAnswered ? 'Готово' : 'Далее'}
              </span>
              {isLastQuestion && allQuestionsAnswered ? (
                <Check className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Mobile progress indicator */}
          <div className="mt-3 text-center text-sm text-gray-500">
            {answers[currentQuestion.id.toString()] ? (
              <span className="text-green-600 font-medium">✓ Отвечено</span>
            ) : (
              <span>Выберите ответ для продолжения</span>
            )}
          </div>
        </div>
      </div>

      {/* Milestone celebration toast */}
      <AnimatePresence>
        {showMilestone && (
          <MilestoneToast 
            milestone={showMilestone} 
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
}