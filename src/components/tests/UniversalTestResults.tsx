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
  Send,
  BarChart3,
  Heart,
  Target,
  Shield,
  Sparkles,
  Info,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { TestData } from '@/data/tests';
import { toast } from 'sonner';
import { ConfettiEffect } from '@/components/animations/ConfettiEffect';
import { useSoundEffects } from '@/components/animations/SoundEffects';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import NeoBrutalistRadarChartFixed from './NeoBrutalistRadarChartFixed';
import ModernResultsBlock from './ModernResultsBlock';

interface ChartDataPoint {
  factor: string;
  value: number;
}

// Универсальный тип результата теста
interface UniversalTestResult {
  name: string;
  description: string;
  emoji: string;
  color: string;
  percentage: number;
  characteristics: string[];
  advice: string[];
  chartData?: unknown[];
  chartType?: 'bar' | 'pie' | 'radar';
  factorScores?: { [key: string]: number };
  factorDescriptions?: {
    [key: string]: {
      high: string;
      medium: string;
      low: string;
    };
  };
  methodology?: {
    title: string;
    description: string;
    applications: string[];
    notes: string[];
  };
  detailedFactors?: Array<{
    name: string;
    score: number;
    level: 'high' | 'medium' | 'low';
    description: string;
    icon?: string;
    color?: string;
  }>;
}

interface UniversalTestResultsProps {
  test: TestData;
  result: UniversalTestResult;
  answers: number[];
}

// Helper function to get custom metrics for specific tests
function getCustomMetricsForTest(testSlug: string, result: UniversalTestResult) {
  switch (testSlug) {
    case 'impostor-syndrome':
      return [
        {
          label: 'Уровень синдрома',
          value: result.name.includes('отсутствует')
            ? 'Минимальный'
            : result.name.includes('Легкий')
              ? 'Легкий'
              : result.name.includes('Умеренный')
                ? 'Умеренный'
                : 'Выраженный',
          color: result.name.includes('отсутствует')
            ? 'green'
            : result.name.includes('Легкий')
              ? 'yellow'
              : result.name.includes('Умеренный')
                ? 'orange'
                : 'orange',
          sublabel: 'текущий статус',
        } as const,
        {
          label: 'Факторов риска',
          value:
            (result.chartData as Array<{ score?: number }>)?.filter((d) => (d.score ?? 0) > 50)
              .length || 0,
          color: 'blue' as const,
          sublabel: 'выше среднего',
        },
      ];
    case 'mental-resilience':
      return [
        {
          label: 'Устойчивость',
          value: result.percentage > 70 ? 'Высокая' : result.percentage > 40 ? 'Средняя' : 'Низкая',
          color: result.percentage > 70 ? 'green' : result.percentage > 40 ? 'yellow' : 'orange',
          sublabel: 'общий уровень',
        } as const,
      ];
    case 'dopamine-detox-need':
      return [
        {
          label: 'Детокс нужен',
          value: result.name.includes('срочно')
            ? 'Срочно!'
            : result.name.includes('желателен')
              ? 'Желательно'
              : result.name.includes('не требуется')
                ? 'Не требуется'
                : 'Рекомендован',
          color: result.name.includes('срочно')
            ? 'orange'
            : result.name.includes('желателен')
              ? 'orange'
              : result.name.includes('не требуется')
                ? 'green'
                : 'yellow',
          sublabel: 'рекомендация',
        } as const,
      ];
    default:
      return undefined;
  }
}

export default function UniversalTestResults({ test, result }: UniversalTestResultsProps) {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const { playCompletion, playClick } = useSoundEffects();

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Я прошел тест "${test.title}" и мой результат: ${result.name} ${result.emoji}. Пройди тест и узнай свой результат!`;

  useEffect(() => {
    playCompletion();
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

  const colors = ['#FFBF00', '#0099FF', '#FF7A05', '#00D696', '#7A83FF'];

  const renderChart = () => {
    if (!result.chartData || !result.chartType) return null;

    switch (result.chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--secondary-background)',
                  border: '2px solid var(--border)',
                  borderRadius: '15px',
                  boxShadow: '4px 4px 0px 0px var(--border)',
                }}
              />
              <Bar dataKey="value" fill="#FFBF00" stroke="var(--border)" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={result.chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="var(--border)"
                strokeWidth={2}
              >
                {result.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        if (!result.chartData || result.chartData.length === 0) {
          return (
            <div className="text-center py-8 text-foreground/60">Нет данных для отображения</div>
          );
        }

        try {
          const typedChartData = result.chartData as ChartDataPoint[];
          return <NeoBrutalistRadarChartFixed data={typedChartData} />;
        } catch (error) {
          console.error('Error rendering radar chart:', error);
          return (
            <div className="text-center py-8 text-red-500">
              <div>Ошибка отображения радар-чарта</div>
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-background py-8 relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px),
                        repeating-linear-gradient(90deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px)`,
          opacity: 0.1,
        }}
      />

      {/* Confetti Effect */}
      <ConfettiEffect
        trigger={showConfetti}
        intensity="high"
        colors={colors}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-heading mb-2 uppercase">Ваш результат готов!</h1>
          <p className="text-foreground/80 font-base">Тест &quot;{test.title}&quot; пройден</p>
        </motion.div>

        {/* Modern Results Block with Bento Grid */}
        <div className="mb-8">
          <ModernResultsBlock
            result={{
              emoji: result.emoji,
              name: result.name,
              description: result.description,
              percentage: result.percentage,
              color: result.color,
              traits: result.characteristics?.slice(0, 4),
              strengths: result.characteristics,
              compatibleTypes:
                test.slug === 'personality-type' ? ['Аналитик', 'Лидер', 'Творец'] : undefined,
              characteristics: result.characteristics,
            }}
            test={test}
            metadata={{
              showCompatibility:
                test.slug === 'personality-type' || test.slug === 'emotional-intelligence',
              showPopularity: false, // Remove hard-coded popularity
              showStrengthsCount: true,
              showRarity: true,
              customMetrics: getCustomMetricsForTest(test.slug, result),
            }}
          />
        </div>

        {/* График результатов */}
        {result.chartData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <NeoCard>
              <NeoCardContent className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center uppercase">
                  <div className="w-8 h-8 bg-chart-1 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
                    <BarChart3 className="w-4 h-4 text-foreground" />
                  </div>
                  {test.slug === 'personality-type'
                    ? 'Профиль личности Big Five'
                    : test.slug === 'impostor-syndrome'
                      ? 'Анализ факторов синдрома'
                      : test.slug === 'mental-resilience'
                        ? 'Компоненты психологической устойчивости'
                        : test.slug === 'dopamine-detox-need'
                          ? 'Профиль дофаминовой зависимости'
                          : 'Детальный анализ'}
                </h3>
                {result.chartType === 'radar' && (
                  <p className="text-sm text-foreground/60 mb-4">
                    Ваши показатели по пяти основным факторам личности (0-100%)
                  </p>
                )}
                {renderChart()}
                {result.chartType === 'radar' && result.detailedFactors && (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {result.detailedFactors.map((factor) => (
                      <div key={factor.name} className="flex items-center">
                        <div className={`w-3 h-3 bg-${factor.color} border border-border mr-2`} />
                        <span className="font-bold">{factor.name}:</span>
                        <span className="ml-1">{factor.score}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </NeoCardContent>
            </NeoCard>
          </motion.div>
        )}

        {/* Детальный анализ факторов */}
        {result.detailedFactors && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <NeoCard>
              <NeoCardContent className="p-6">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center uppercase">
                  <div className="w-8 h-8 bg-chart-3 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-foreground" />
                  </div>
                  Детальный анализ факторов
                </h3>
                <div className="space-y-6">
                  {result.detailedFactors.map((factor, index) => {
                    const IconComponent =
                      factor.icon === 'Users'
                        ? Users
                        : factor.icon === 'Heart'
                          ? Heart
                          : factor.icon === 'Target'
                            ? Target
                            : factor.icon === 'Shield'
                              ? Shield
                              : factor.icon === 'Sparkles'
                                ? Sparkles
                                : Info;

                    const levelBadge =
                      factor.level === 'high'
                        ? { text: 'Высокий', color: 'green' as const }
                        : factor.level === 'medium'
                          ? { text: 'Средний', color: 'yellow' as const }
                          : { text: 'Низкий', color: 'blue' as const };

                    return (
                      <motion.div
                        key={factor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-bold text-lg flex items-center">
                            <div
                              className={`w-8 h-8 bg-${factor.color} border-2 border-border shadow-shadow flex items-center justify-center mr-3`}
                            >
                              <IconComponent className="w-4 h-4 text-foreground" />
                            </div>
                            {factor.name}
                          </h4>
                          <div className="flex items-center gap-3">
                            <NeoBadge color={levelBadge.color}>{levelBadge.text}</NeoBadge>
                            <span className="font-bold text-lg min-w-[3rem] text-right">
                              {factor.score}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-2 bg-${factor.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.score}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                            }}
                          />
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {factor.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </NeoCardContent>
            </NeoCard>
          </motion.div>
        )}

        {/* Методология теста */}
        {result.methodology && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="mb-8"
          >
            <NeoCard>
              <NeoCardContent className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center uppercase">
                  <div className="w-8 h-8 bg-chart-5 border-2 border-border shadow-shadow flex items-center justify-center mr-3">
                    <Info className="w-4 h-4 text-foreground" />
                  </div>
                  {result.methodology.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {result.methodology.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-heading font-bold mb-3 uppercase">
                      Применение результатов:
                    </h4>
                    <ul className="space-y-2">
                      {result.methodology.applications.map((app, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/80">
                          <span className="text-chart-5 font-bold mr-2">•</span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold mb-3 uppercase">Важно помнить:</h4>
                    <ul className="space-y-2">
                      {result.methodology.notes.map((note, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/80">
                          <span className="text-chart-5 font-bold mr-2">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NeoCardContent>
            </NeoCard>
          </motion.div>
        )}

        {/* Характеристики и рекомендации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <NeoCard>
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center uppercase">
                <div className="w-8 h-8 bg-chart-4 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
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
                <div className="w-8 h-8 bg-chart-2 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
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
              <h3 className="text-lg font-heading font-bold mb-4 uppercase">
                Поделитесь результатом
              </h3>
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
            <Link href="/tests/personality-type">
              <NeoCard hover={true} className="h-full">
                <NeoCardContent className="p-6">
                  <h4 className="font-heading font-bold mb-2 uppercase">Тест на тип личности</h4>
                  <p className="text-sm text-foreground/80 mb-3 font-base">
                    Определите свой психологический тип по модели Big Five
                  </p>
                  <div className="flex items-center justify-between">
                    <NeoBadge color="purple">60 вопросов</NeoBadge>
                    <span className="text-sm text-foreground/60 font-bold">10 мин</span>
                  </div>
                </NeoCardContent>
              </NeoCard>
            </Link>

            <Link href="/tests/emotional-intelligence">
              <NeoCard hover={true} className="h-full">
                <NeoCardContent className="p-6">
                  <h4 className="font-heading font-bold mb-2 uppercase">Эмоциональный интеллект</h4>
                  <p className="text-sm text-foreground/80 mb-3 font-base">
                    Узнайте, насколько хорошо вы понимаете свои эмоции и эмоции других
                  </p>
                  <div className="flex items-center justify-between">
                    <NeoBadge color="orange">45 вопросов</NeoBadge>
                    <span className="text-sm text-foreground/60 font-bold">8 мин</span>
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
