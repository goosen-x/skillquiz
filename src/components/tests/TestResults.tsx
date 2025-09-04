'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { 
  RefreshCw, 
  CheckCircle,
  Users,
  ArrowRight,
  Copy,
  Twitter,
  Send
} from 'lucide-react';
import Link from 'next/link';
import { TestData } from '@/data/tests';
import { DigitalPersona } from '@/data/digital-wellness-test';
import { toast } from 'sonner';
import { ConfettiEffect } from '@/components/animations/ConfettiEffect';
import { useSoundEffects } from '@/components/animations/SoundEffects';

interface TestResultsProps {
  test: TestData;
  result: DigitalPersona;
  answers: number[];
}

export default function TestResults({ test, result }: TestResultsProps) {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Я прошел тест &quot;${test.title}&quot; и мой результат: ${result.name} ${result.emoji}. Пройди тест и узнай свою цифровую личность!`;

  const { playCompletion, playClick } = useSoundEffects();

  useEffect(() => {
    // Play completion sound and show confetti on mount
    playCompletion();
    // Confetti will trigger automatically due to showConfetti state
  }, [playCompletion]);

  const handleShare = async (platform: 'twitter' | 'telegram' | 'copy') => {
    playClick();
    
    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'copy':
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        toast.success('Ссылка скопирована!');
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const getNeoColor = (color: string): 'yellow' | 'blue' | 'orange' | 'green' | 'purple' => {
    const colorMap = {
      green: 'green' as const,
      purple: 'purple' as const,
      blue: 'blue' as const,
      red: 'orange' as const,
      indigo: 'purple' as const,
      orange: 'orange' as const,
      yellow: 'yellow' as const,
      teal: 'blue' as const
    };
    return colorMap[color as keyof typeof colorMap] || 'blue';
  };

  return (
    <div className="min-h-screen bg-secondary-background py-8 relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-64 h-64 border-2 border-border rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-chart-3 transform rotate-45" />
        <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-chart-5" />
      </div>
      
      {/* Confetti Effect */}
      <ConfettiEffect 
        trigger={showConfetti} 
        intensity="high" 
        colors={['#FFBF00', '#0099FF', '#FF7A05', '#00D696', '#7A83FF']}
        onComplete={() => setShowConfetti(false)}
      />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-heading font-black mb-2 uppercase">Ваш результат готов!</h1>
          <p className="text-foreground/80 font-base">Тест &quot;{test.title}&quot; пройден</p>
        </motion.div>

        {/* Основная карточка результата */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <NeoCard color={getNeoColor(result.color)} className="mb-8">
            <NeoCardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="text-8xl mb-4 flex justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 2, delay: 1, repeat: 1 }}
                >
                  {result.emoji}
                </motion.div>
              </motion.div>
              
              <h2 className="text-4xl font-heading font-black mb-4 uppercase">{result.name}</h2>
              
              <p className="text-lg leading-relaxed mb-6 font-base">
                {result.description}
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-main border-2 border-border shadow-shadow flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold uppercase">
                  {result.percentage}% людей получили такой же результат
                </span>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Характеристики */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <NeoCard>
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center uppercase">
                <div className="w-8 h-8 bg-chart-4 border-2 border-border shadow-shadow flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-foreground" />
                </div>
                Ваши сильные стороны
              </h3>
              <ul className="space-y-3">
                {result.characteristics.map((char, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-chart-4 font-bold text-xl mr-3">•</span>
                    <span className="font-base">{char}</span>
                  </motion.li>
                ))}
              </ul>
            </NeoCardContent>
          </NeoCard>

          <NeoCard>
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center uppercase">
                <div className="w-8 h-8 bg-chart-2 border-2 border-border shadow-shadow flex items-center justify-center mr-3">
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </div>
                Рекомендации для вас
              </h3>
              <ul className="space-y-3">
                {result.advice.map((advice, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-chart-2 font-bold text-xl mr-3">→</span>
                    <span className="font-base">{advice}</span>
                  </motion.li>
                ))}
              </ul>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          {/* Кнопки шаринга */}
          <NeoCard>
            <NeoCardContent className="p-6">
              <h3 className="text-lg font-heading font-bold mb-4 uppercase">Поделитесь результатом</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleShare('twitter')}
                  variant="outline"
                  className="flex items-center uppercase font-bold"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  onClick={() => handleShare('telegram')}
                  variant="outline"
                  className="flex items-center uppercase font-bold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
                <Button
                  onClick={() => handleShare('copy')}
                  variant="outline"
                  className="flex items-center uppercase font-bold"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Копировать ссылку
                    </>
                  )}
                </Button>
              </div>
            </NeoCardContent>
          </NeoCard>

          {/* Дополнительные действия */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/tests/${test.slug}`} className="flex-1">
              <Button variant="outline" className="w-full uppercase font-bold" size="lg">
                <RefreshCw className="w-5 h-5 mr-2" />
                Пройти тест заново
              </Button>
            </Link>
            <Link href="/tests" className="flex-1">
              <Button className="w-full uppercase font-bold" size="lg">
                Другие тесты
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Рекомендуемые тесты */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-heading font-bold text-center mb-6 uppercase">
            Рекомендуем также пройти
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tests/emotional-intelligence">
              <NeoCard className="cursor-pointer h-full">
                <NeoCardContent className="p-6">
                  <h4 className="font-heading font-bold mb-2 uppercase">Эмоциональный интеллект</h4>
                  <p className="text-sm text-foreground/80 mb-3 font-base">
                    Узнайте, насколько хорошо вы понимаете свои эмоции и эмоции других
                  </p>
                  <div className="flex items-center justify-between">
                    <NeoBadge color="purple">15 вопросов</NeoBadge>
                    <span className="text-sm text-foreground/60 font-bold">7 мин</span>
                  </div>
                </NeoCardContent>
              </NeoCard>
            </Link>
            
            <Link href="/tests/stress-level">
              <NeoCard className="cursor-pointer h-full">
                <NeoCardContent className="p-6">
                  <h4 className="font-heading font-bold mb-2 uppercase">Уровень стресса</h4>
                  <p className="text-sm text-foreground/80 mb-3 font-base">
                    Определите ваш текущий уровень стресса и получите рекомендации
                  </p>
                  <div className="flex items-center justify-between">
                    <NeoBadge color="orange">20 вопросов</NeoBadge>
                    <span className="text-sm text-foreground/60 font-bold">10 мин</span>
                  </div>
                </NeoCardContent>
              </NeoCard>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}