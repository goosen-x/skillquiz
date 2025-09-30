'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeoBrutalButton } from '@/components/animations/NeoBrutalButton';
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
  Star,
  Home,
  PartyPopper,
  UserMinus,
  MessageCircle,
  Battery,
  Handshake,
  Ear,
  Calendar,
  Users2,
  HeartHandshake,
  Eye,
  Smile,
  Scale as Balance,
  User,
  Trophy,
  Gift,
  Lock,
  CheckCircle,
  FolderOpen,
  Target,
  Frown,
  Search,
  Wind,
  Mountain,
  Shuffle,
  AlertTriangle,
  TrendingUp,
  CloudRain,
  HeartCrack,
  ArrowUp,
  UserX,
  Anchor,
  Lightbulb,
  Archive,
  Compass,
  Puzzle,
  Palette,
  X,
  FlaskConical,
  BookOpen,
  BookOpenCheck,
  CloudLightning,
  ShieldAlert,
  Sun,
  Cloud,
  Glasses,
  FileText,
  Pause,
  Flame,
  Hand,
  Network,
  UserCheck,
  Globe,
  Thermometer,
  Activity,
  Magnet,
  Settings,
  Grid,
  Route,
  HandHeart,
  CheckSquare,
  PlayCircle,
  Play,
  Wifi,
  ShoppingCart,
  Timer,
  CreditCard,
  Monitor,
  ArrowLeftRight,
  Bell,
  Coffee,
  Focus,
  Rocket,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { TestData } from '@/data/tests';
import { generateShortResultUrl } from '@/lib/short-urls';
import { useRouter } from 'next/navigation';
import { YandexAd } from '@/components/shared/YandexAd';
import { loadTest, UniversalTestResult, LoadedTestData } from '@/lib/test-loader';

interface TestPageProps {
  test: TestData;
}

// Функция для рендеринга иконок
const renderIcon = (iconName?: string, className: string = 'w-12 h-12 text-foreground') => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    // Digital wellness icons
    smartphone: Smartphone,
    clock: Clock,
    users: Users,
    shield: Shield,
    zap: Zap,
    heart: Heart,

    // Personality type icons
    Star,
    Home,
    PartyPopper,
    UserMinus,
    MessageCircle,
    Battery,
    Handshake,
    Ear,
    Calendar,
    Users2,
    HeartHandshake,
    Eye,
    Smile,
    User,
    Trophy,
    Gift,
    Lock,
    CheckCircle,
    FolderOpen,
    Target,
    Frown,
    Search,
    Wind,
    Mountain,
    Shuffle,
    AlertTriangle,
    TrendingUp,
    CloudRain,
    HeartCrack,
    ArrowUp,
    UserX,
    Anchor,
    Lightbulb,
    Archive,
    Compass,
    Puzzle,
    Palette,
    X,
    FlaskConical,
    BookOpen,
    BookOpenCheck,
    CloudLightning,
    ShieldAlert,
    Sun,
    Cloud,
    Balance,

    // Emotional Intelligence icons
    Glasses,
    FileText,
    Pause,
    Flame,
    Hand,
    Network,
    UserCheck,
    Globe,
    Thermometer,
    Activity,
    Magnet,
    Settings,

    // Psychological Resilience icons
    Grid,
    Route,
    HandHeart,

    // Dopamine Detox icons
    Play,
    Wifi,
    ShoppingCart,
    Timer,
    CreditCard,
    Monitor,
    ArrowLeftRight,
    Bell,
    Coffee,
    CheckSquare,
    PlayCircle,
    Focus,

    // Additional icons for new tests
    Rocket,
    Briefcase,
    'message-circle': MessageCircle,
    'book-open': BookOpen,
    'message-square': MessageSquare,

    // Icon name mappings (lowercase)
    trophy: Trophy,
    brain: Brain,
    star: Star,
    eye: Eye,
    scale: Balance,
    'user-x': UserX,
    clover: Lightbulb,
    compass: Compass,
    users2: Users2,
    'alert-triangle': AlertTriangle,
    redo: Shuffle,
    target: Target,
    'calendar-x': Calendar,
    balance: Balance,
    briefcase: Briefcase,
    'shield-x': ShieldAlert,
    'user-check': UserCheck,
    thermometer: Thermometer,
    sun: Sun,
    lightbulb: Lightbulb,
    flame: Flame,
    'heart-handshake': HeartHandshake,
    pause: Pause,
    'cloud-lightning': CloudLightning,
    'trending-up': TrendingUp,
    rocket: Rocket,
  };

  const IconComponent = iconMap[iconName || ''] || Brain;
  return <IconComponent className={className} />;
};

export default function TestPage({ test }: TestPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [showResults] = useState(false);
  const [result, setResult] = useState<UniversalTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(0); // 1 for forward, -1 for backward
  const [testData, setTestData] = useState<LoadedTestData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const router = useRouter();

  // Загружаем данные теста
  useEffect(() => {
    const loadTestData = async () => {
      try {
        setIsLoading(true);
        const data = await loadTest(test);
        setTestData(data);
        setLoadError(null);
      } catch (error) {
        console.error('Error loading test:', error);
        setLoadError(error instanceof Error ? error.message : 'Failed to load test');
      } finally {
        setIsLoading(false);
      }
    };

    loadTestData();
  }, [test]);

  const questions = testData?.questions || [];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    // Загрузка сохраненного прогресса
    const savedProgress = localStorage.getItem(`test-progress-${test.slug}`);
    if (savedProgress) {
      const { answers: savedAnswers, currentQuestion: savedQuestion } = JSON.parse(savedProgress);
      setAnswers(savedAnswers);
      setCurrentQuestion(savedQuestion);
    }
  }, [test.slug]);

  const saveProgress = (newAnswers: (string | number)[], questionIndex: number) => {
    localStorage.setItem(
      `test-progress-${test.slug}`,
      JSON.stringify({ answers: newAnswers, currentQuestion: questionIndex })
    );
  };

  const handleAnswer = (value: string | number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      saveProgress(newAnswers, currentQuestion + 1);
      setAnimationDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Последний вопрос - показываем результаты
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: (string | number)[]) => {
    if (!testData) {
      console.error('Test data not loaded');
      return;
    }

    setIsLoading(true);

    // Имитация загрузки для эффекта
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Вычисляем результат используя универсальный загрузчик
    const testResult = testData.calculateResult(finalAnswers);
    setResult(testResult);

    // Генерируем короткую ссылку
    // Для personality-type теста нужно передать Big Five scores
    let scores = testResult.factorScores;
    if (test.slug === 'personality-type' && !scores) {
      // Импортируем функцию из оригинального файла
      const { calculateBigFiveScores } = await import('@/data/personality-type-test');
      const bigFiveScores = calculateBigFiveScores(finalAnswers as number[]);
      scores = {
        extraversion: bigFiveScores.extraversion,
        agreeableness: bigFiveScores.agreeableness,
        conscientiousness: bigFiveScores.conscientiousness,
        neuroticism: bigFiveScores.neuroticism,
        openness: bigFiveScores.openness,
      };
    }

    const shortUrl = generateShortResultUrl(test.slug, testResult, scores);

    // Сохраняем результат в localStorage для совместимости
    localStorage.setItem(
      `test-result-${test.slug}`,
      JSON.stringify({ result: testResult, date: new Date().toISOString() })
    );

    // Очищаем прогресс
    localStorage.removeItem(`test-progress-${test.slug}`);

    // Редиректим на короткую ссылку
    router.push(shortUrl);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setAnimationDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      saveProgress(answers, currentQuestion - 1);
    }
  };

  // Убираем показ результатов здесь, так как теперь редиректим на новую страницу
  if (showResults && result) {
    return null; // Результаты теперь показываются на отдельной странице
  }

  if (isLoading && !testData) {
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
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-16 h-16 text-foreground" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4 uppercase">Загружаем тест...</h2>
          <p className="text-foreground/80 font-base">Подготавливаем вопросы</p>
        </motion.div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-red-500 border-2 border-border shadow-shadow flex items-center justify-center">
              <X className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4 uppercase">Ошибка загрузки теста</h2>
          <p className="text-foreground/80 font-base mb-6">{loadError}</p>
          <Button onClick={() => router.back()} variant="outline">
            Вернуться назад
          </Button>
        </div>
      </div>
    );
  }

  if (!testData || questions.length === 0) {
    return null;
  }

  if (isLoading && result) {
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
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-16 h-16 text-foreground" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4 uppercase">
            Анализируем ваши ответы...
          </h2>
          <p className="text-foreground/80 font-base">Определяем результат</p>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-secondary-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Test content */}
          <div className="flex-1 w-full max-w-3xl lg:max-w-none mx-auto lg:mx-0">
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
            <AnimatePresence mode="wait" custom={animationDirection}>
              <motion.div
                key={currentQuestion}
                custom={animationDirection}
                initial={{ opacity: 0, x: animationDirection * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: animationDirection * -100 }}
                transition={{ duration: 0.3 }}
              >
                <NeoCard className="bg-background">
                  <NeoCardContent className="p-8">
                    {/* Иконка вопроса */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className={`w-24 h-24 border-2 border-border shadow-shadow flex items-center justify-center ${
                          // Используем хеширование названия иконки для выбора цвета
                          ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'][
                            (currentQ.icon || 'brain')
                              .split('')
                              .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5
                          ]
                        }`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderIcon(currentQ.icon)}
                      </motion.div>
                    </div>

                    {/* Вопрос */}
                    <h2 className="text-xl font-heading font-bold text-center mb-8 uppercase">
                      {currentQ.text}
                    </h2>

                    {/* Варианты ответов */}
                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => (
                        <NeoBrutalButton
                          key={index}
                          onClick={() => handleAnswer(option.value)}
                          variant="outline"
                          className={`w-full p-4 text-left justify-start font-base ${
                            answers[currentQuestion] === option.value
                              ? 'bg-chart-1 border-border shadow-[6px_6px_0px_0px_theme(colors.border)]'
                              : 'bg-secondary-background border-border'
                          }`}
                        >
                          <span className="text-lg font-bold">{option.text}</span>
                        </NeoBrutalButton>
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
                  if (
                    answers[currentQuestion] !== undefined &&
                    currentQuestion < questions.length - 1
                  ) {
                    setAnimationDirection(1);
                    setCurrentQuestion(currentQuestion + 1);
                    saveProgress(answers, currentQuestion + 1);
                  }
                }}
                disabled={
                  answers[currentQuestion] === undefined || currentQuestion === questions.length - 1
                }
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

          {/* Right column - Advertisement */}
          <div className="hidden lg:block lg:w-[300px] flex-shrink-0">
            <div className="sticky top-8">
              <div className="border-2 border-border bg-background p-4 shadow-shadow">
                <p className="text-sm font-bold uppercase mb-4 text-center">Реклама</p>
                <YandexAd blockId="R-A-17138338-1" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
