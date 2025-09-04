'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import { AnimatedButton, MagicButton } from './AnimatedButton';
import { AnimatedCard, TestCard } from './AnimatedCard';
import { ConfettiEffect, CelebrationModal } from './ConfettiEffect';
import { useSoundEffects } from './SoundEffects';
import { PageTransition, StaggerContainer, StaggerItem } from './PageTransition';
import { Play, Star, Sparkles, Gift, Rocket, Heart } from 'lucide-react';

interface AnimationShowcaseProps {
  isDemo?: boolean;
}

export function AnimationShowcase({ isDemo = false }: AnimationShowcaseProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState<'default' | 'dots' | 'pulse' | 'brain' | 'heart'>('default');

  const { playClick, playSuccess, playCompletion, playMilestone } = useSoundEffects();

  const triggerLoader = (variant: typeof loadingVariant) => {
    playClick();
    setLoadingVariant(variant);
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 3000);
  };

  const triggerConfetti = () => {
    playSuccess();
    setShowConfetti(true);
  };

  const triggerCelebration = () => {
    playCompletion();
    setShowCelebration(true);
  };

  if (!isDemo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <PageTransition variant="scale">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <motion.h2 
                    className="text-3xl font-bold gradient-text mb-4"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨ Демонстрация анимаций ✨
                  </motion.h2>
                  <p className="text-gray-600">
                    Попробуйте все наши восхитительные анимации и эффекты!
                  </p>
                </div>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Loading Animations */}
                  <StaggerItem>
                    <AnimatedCard animation="lift" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                        Загрузочные анимации
                      </h3>
                      <div className="space-y-3">
                        {(['default', 'dots', 'pulse', 'brain', 'heart'] as const).map((variant) => (
                          <Button
                            key={variant}
                            variant="outline"
                            size="sm"
                            onClick={() => triggerLoader(variant)}
                            className="w-full capitalize"
                          >
                            {variant}
                          </Button>
                        ))}
                      </div>
                    </AnimatedCard>
                  </StaggerItem>

                  {/* Button Animations */}
                  <StaggerItem>
                    <AnimatedCard animation="tilt" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Play className="w-5 h-5 mr-2 text-blue-500" />
                        Кнопки с анимацией
                      </h3>
                      <div className="space-y-3">
                        <AnimatedButton animation="bounce" size="sm" className="w-full">
                          Bounce
                        </AnimatedButton>
                        <AnimatedButton animation="scale" size="sm" className="w-full">
                          Scale
                        </AnimatedButton>
                        <AnimatedButton animation="shake" size="sm" className="w-full">
                          Shake
                        </AnimatedButton>
                        <MagicButton size="sm" className="w-full">
                          ✨ Magic
                        </MagicButton>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>

                  {/* Card Animations */}
                  <StaggerItem>
                    <AnimatedCard animation="glow" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        Карточки
                      </h3>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          Наведите на эту карточку для свечения
                        </div>
                        <TestCard
                          title="Тест демо"
                          description="Пример анимированной карточки теста"
                          duration="5 мин"
                          questionsCount={10}
                          icon="🧪"
                          onClick={() => playClick()}
                        />
                      </div>
                    </AnimatedCard>
                  </StaggerItem>

                  {/* Celebrations */}
                  <StaggerItem>
                    <AnimatedCard animation="float" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Gift className="w-5 h-5 mr-2 text-green-500" />
                        Праздничные эффекты
                      </h3>
                      <div className="space-y-3">
                        <Button
                          onClick={triggerConfetti}
                          className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                          size="sm"
                        >
                          🎊 Конфетти
                        </Button>
                        <Button
                          onClick={triggerCelebration}
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          size="sm"
                        >
                          🎉 Поздравление
                        </Button>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>

                  {/* Sound Effects */}
                  <StaggerItem>
                    <AnimatedCard animation="scale" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-500" />
                        Звуковые эффекты
                      </h3>
                      <div className="space-y-2 text-sm">
                        <Button size="sm" onClick={playClick} className="w-full">
                          🔊 Click
                        </Button>
                        <Button size="sm" onClick={playSuccess} className="w-full">
                          ✅ Success
                        </Button>
                        <Button size="sm" onClick={playMilestone} className="w-full">
                          🏆 Milestone
                        </Button>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>

                  {/* CSS Animations */}
                  <StaggerItem>
                    <AnimatedCard animation="lift" className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Rocket className="w-5 h-5 mr-2 text-indigo-500" />
                        CSS анимации
                      </h3>
                      <div className="space-y-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto animate-float"></div>
                        <div className="text-center animate-bounce-soft">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div className="text-center animate-wiggle">
                          <span className="text-2xl">🎪</span>
                        </div>
                        <div className="text-center animate-heartbeat">
                          <span className="text-2xl">💖</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                </StaggerContainer>

                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-gray-500 text-sm mb-4">
                    🥚 Попробуйте найти пасхальные яйца на сайте!
                  </p>
                  <p className="text-gray-500 text-xs">
                    Подсказка: попробуйте код Konami ↑↑↓↓←→←→BA
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </PageTransition>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-60 bg-white/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <LoadingSpinner variant={loadingVariant} size="lg" className="mb-4" />
              <p className="text-gray-600">Демонстрация загрузки...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effects */}
      <ConfettiEffect trigger={showConfetti} intensity="high" onComplete={() => setShowConfetti(false)} />
      
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Потрясающе!"
        message="Вы открыли все анимации! 🎈"
        emoji="🎊"
      />
    </div>
  );
}