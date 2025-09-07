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
} from 'lucide-react';
import { TestData } from '@/data/tests';
import {
  digitalWellnessQuestions,
  DigitalPersona,
  calculateDigitalPersona,
} from '@/data/digital-wellness-test';
import {
  personalityTypeQuestions,
  TestResult,
  calculatePersonalityTypeResult,
} from '@/data/personality-type-test';
import {
  emotionalIntelligenceQuestions,
  TestResult as EITestResult,
  calculateEmotionalIntelligenceResult,
} from '@/data/emotional-intelligence-test';
import {
  impostorSyndromeQuestions,
  TestResult as ISTestResult,
  calculateImpostorSyndromeResult,
} from '@/data/impostor-syndrome-test';
import {
  psychologicalResilienceQuestions,
  TestResult as PRTestResult,
  calculatePsychologicalResilienceResult,
} from '@/data/mental-resilience-test';
import {
  dopamineDetoxQuestions,
  TestResult as DDTestResult,
  calculateDopamineDetoxResult,
} from '@/data/dopamine-detox-test';
// Removed unused imports
// import { saveResultToHistory } from '@/lib/results-storage';
import { generateShortResultUrl } from '@/lib/short-urls';
import { useRouter } from 'next/navigation';
import { calculateBigFiveScores } from '@/data/personality-type-test';

interface TestPageProps {
  test: TestData;
}

// Функция для рендеринга иконок
const renderIcon = (iconName: string, className: string = 'w-12 h-12 text-foreground') => {
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

    // Icon name mappings (lowercase)
    trophy: Trophy,
    brain: Brain,
    star: Star,
    eye: Eye,
    scale: Balance,
    'user-x': UserX,
    clover: Lightbulb, // Using lightbulb as substitute for clover
    compass: Compass,
    users2: Users2,
    'alert-triangle': AlertTriangle,
    redo: Shuffle, // Using shuffle as substitute for redo
    target: Target,
    'calendar-x': Calendar, // Using calendar as substitute for calendar-x
    balance: Balance,
    briefcase: FolderOpen, // Using folder-open as substitute for briefcase
    'shield-x': ShieldAlert, // Using shield-alert as substitute for shield-x
    'user-check': UserCheck,
  };

  const IconComponent = iconMap[iconName] || Brain;
  return <IconComponent className={className} />;
};

export default function TestPage({ test }: TestPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults] = useState(false);
  const [result, setResult] = useState<
    DigitalPersona | TestResult | EITestResult | ISTestResult | PRTestResult | DDTestResult | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(0); // 1 for forward, -1 for backward
  const router = useRouter();

  // Определяем тип теста и соответствующие вопросы
  const questions =
    test.slug === 'digital-wellness-persona'
      ? digitalWellnessQuestions
      : test.slug === 'personality-type'
        ? personalityTypeQuestions
        : test.slug === 'emotional-intelligence'
          ? emotionalIntelligenceQuestions
          : test.slug === 'impostor-syndrome'
            ? impostorSyndromeQuestions
            : test.slug === 'mental-resilience'
              ? psychologicalResilienceQuestions
              : test.slug === 'dopamine-detox-need'
                ? dopamineDetoxQuestions
                : digitalWellnessQuestions;
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
      setAnimationDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Последний вопрос - показываем результаты
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers: number[]) => {
    setIsLoading(true);

    // Имитация загрузки для эффекта
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Вычисляем результат в зависимости от типа теста
    let testResult;
    if (test.slug === 'digital-wellness-persona') {
      testResult = calculateDigitalPersona(finalAnswers);
    } else if (test.slug === 'personality-type') {
      testResult = calculatePersonalityTypeResult(finalAnswers);
    } else if (test.slug === 'emotional-intelligence') {
      testResult = calculateEmotionalIntelligenceResult(finalAnswers);
    } else if (test.slug === 'impostor-syndrome') {
      testResult = calculateImpostorSyndromeResult(finalAnswers);
    } else if (test.slug === 'mental-resilience') {
      testResult = calculatePsychologicalResilienceResult(finalAnswers);
    } else if (test.slug === 'dopamine-detox-need') {
      testResult = calculateDopamineDetoxResult(finalAnswers);
    } else {
      testResult = calculateDigitalPersona(finalAnswers); // Fallback
    }

    setResult(testResult);
    setIsLoading(false);

    // Генерируем короткую ссылку
    let shortUrl: string;
    let scores: { [key: string]: number } | undefined;

    if (test.slug === 'personality-type') {
      // Для теста личности добавляем оценки Big Five
      const bigFiveScores = calculateBigFiveScores(finalAnswers);
      scores = {
        extraversion: bigFiveScores.extraversion,
        agreeableness: bigFiveScores.agreeableness,
        conscientiousness: bigFiveScores.conscientiousness,
        neuroticism: bigFiveScores.neuroticism,
        openness: bigFiveScores.openness,
      };
      shortUrl = generateShortResultUrl(test.slug, testResult, scores);
    } else {
      shortUrl = generateShortResultUrl(test.slug, testResult);
    }

    // Сохраняем в историю короткую ссылку
    // saveResultToHistory(test.slug, shortUrl, testResult.name);

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
                        currentQ.icon.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
                          5
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
                      className={`w-full p-4 text-left border-2 transition-all font-base cursor-pointer ${
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
    </div>
  );
}
