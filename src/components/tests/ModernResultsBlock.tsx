'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Award, Star, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Star2 from '../ui/star2';
import Star21 from '../ui/star21';

interface ModernResultsBlockProps {
  result: {
    emoji: string;
    name: string;
    description: string;
    percentage: number;
    color?: string;
    traits?: string[];
    strengths?: string[];
    compatibleTypes?: string[];
    characteristics?: string[];
  };
  test: {
    title: string;
  };
  allTypesData?: Array<{
    name: string;
    value: number;
  }>;
  // Optional metadata for controlling what to show
  metadata?: {
    showCompatibility?: boolean;
    showPopularity?: boolean;
    showStrengthsCount?: boolean;
    showRarity?: boolean;
    customMetrics?: Array<{
      label: string;
      value: string | number;
      sublabel?: string;
      color?: 'yellow' | 'blue' | 'green' | 'orange' | 'purple';
      trend?: string;
    }>;
  };
}

// Neobrutalist colors for charts
const CHART_COLORS = ['#FFD23F', '#FF6B35', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA'];

// Custom tooltip for pie chart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary-background border-2 border-border p-3 rounded-[15px] shadow-[4px_4px_0px_0px_theme(colors.border)]">
        <p className="font-bold text-xs uppercase">{payload[0].name}</p>
        <p className="text-sm font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// Trait emojis mapping
const traitEmojis: { [key: string]: string } = {
  // Personality traits
  analytical: '🧠',
  creative: '✨',
  leader: '🏆',
  empathetic: '💖',
  energetic: '⚡',
  reliable: '🛡️',
  strategic: '🎯',
  innovative: '💡',
  balanced: '⚖️',
  flexible: '🌊',
  social: '👥',
  independent: '🦅',

  // Emotional intelligence traits
  'Хорошее базовое понимание эмоций': '🎭',
  'Умеренные навыки самоконтроля': '🎛️',
  'Адекватная эмпатия': '💝',
  'Неплохие коммуникативные способности': '💬',
  'Высокая эмпатия': '🤝',
  'Отличное понимание эмоций': '🎨',
  'Сильные навыки самоконтроля': '💪',
  'Превосходные коммуникативные способности': '🗣️',

  // Default fallback emojis by keywords
  эмоци: '😊',
  самоконтрол: '🎯',
  эмпати: '💕',
  коммуникатив: '💭',
  понимани: '🔮',
  навык: '🛠️',
  способност: '🌟',
};

export default function ModernResultsBlock({
  result,
  allTypesData,
  metadata,
}: ModernResultsBlockProps) {
  // Count visible default metrics
  const getVisibleDefaultMetricsCount = () => {
    let count = 0;
    if (metadata?.showRarity !== false) count++;
    if (metadata?.showStrengthsCount !== false) count++;
    if (metadata?.showCompatibility !== false && result.compatibleTypes) count++;
    if (metadata?.showPopularity !== false && !metadata?.customMetrics) count++;
    return count;
  };

  const visibleMetricsCount = metadata?.customMetrics?.length || getVisibleDefaultMetricsCount();
  // Calculate expression level based on percentage
  const getExpressionLevel = (percentage: number, resultColor: string) => {
    // Выбираем цвет отличный от цвета основной карточки
    const getContrastColor = () => {
      switch (resultColor) {
        case 'yellow': return 'purple';
        case 'blue': return 'orange';
        case 'orange': return 'blue';
        case 'green': return 'purple';
        case 'purple': return 'green';
        default: return 'blue';
      }
    };
    
    // Определяем цвет текста для хорошей читаемости
    const getTextColor = (bgColor: string) => {
      switch (bgColor) {
        case 'yellow': return 'text-black'; // Черный на желтом
        case 'orange': return 'text-black'; // Черный на оранжевом
        case 'blue': return 'text-white'; // Белый на синем
        case 'green': return 'text-white'; // Белый на зеленом
        case 'purple': return 'text-white'; // Белый на фиолетовом
        default: return 'text-black';
      }
    };
    
    const contrastColor = getContrastColor();
    const textColor = getTextColor(contrastColor);
    
    // Логика для выраженности типа
    if (percentage > 60) return { label: 'Ярко выражен', color: contrastColor, textColor };
    if (percentage > 45) return { label: 'Выраженный', color: contrastColor, textColor };
    if (percentage > 30) return { label: 'Умеренный', color: contrastColor, textColor };
    if (percentage > 20) return { label: 'Слабый', color: contrastColor, textColor };
    return { label: 'Смешанный', color: contrastColor, textColor };
  };

  const rarity = getExpressionLevel(result.percentage, result.color || 'yellow');

  // Default pie chart data if not provided
  const pieData = allTypesData || [
    { name: result.name, value: result.percentage },
    { name: 'Другие типы', value: 100 - result.percentage },
  ];

  // Default traits if not provided
  // Extract traits from result
  const getTraits = () => {
    if (result.traits) return result.traits.slice(0, 4);
    if (result.characteristics) return result.characteristics.slice(0, 4);
    return ['analytical', 'creative', 'empathetic', 'strategic'];
  };
  const traits = getTraits();

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-4 gap-4 max-w-6xl mx-auto"
      variants={containerAnimation}
      initial="hidden"
      animate="show"
    >
      {/* Main Result Card - 2x1 */}
      <motion.div variants={itemAnimation} className="col-span-4 md:col-span-2 h-full">
        <NeoCard
          color="white"
          hover={false}
          className="h-full relative overflow-hidden"
        >
          {/* Colored header */}
          <div
            className={`px-6 py-4 border-b-2 border-border ${
              result.color === 'yellow'
                ? 'bg-chart-1'
                : result.color === 'blue'
                  ? 'bg-chart-2'
                  : result.color === 'orange'
                    ? 'bg-chart-3'
                    : result.color === 'green'
                      ? 'bg-chart-4'
                      : result.color === 'purple'
                        ? 'bg-chart-5'
                        : 'bg-chart-1'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.div
                  className="mr-3"
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: 1,
                    repeatType: 'reverse',
                  }}
                >
                  <div className="w-12 h-12 bg-white border-2 border-border shadow-[2px_2px_0px_0px_#000000] rounded-full flex items-center justify-center">
                    <span className="text-2xl">{result.emoji}</span>
                  </div>
                </motion.div>
                <h2 className="text-xl font-heading font-black uppercase">{result.name}</h2>
              </div>
              {/* Rarity badge */}
              <NeoBadge
                color={rarity.color as 'yellow' | 'blue' | 'orange' | 'green' | 'purple'}
                className={`shadow-[2px_2px_0px_0px_#000000] ${rarity.textColor}`}
              >
                <Award className="w-3 h-3 mr-1" />
                {rarity.label}
              </NeoBadge>
            </div>
          </div>
          <NeoCardContent className="p-6 h-full">
            <div className="relative z-10">
              <div>
                <p className="text-sm font-bold text-foreground/60 mb-2">
                  Ваш психологический профиль
                </p>
                <p className="text-sm leading-relaxed mb-3">{result.description}</p>

                {/* Key points */}
                {/* Key points from characteristics */}
                <div className="space-y-1">
                  {(
                    result.characteristics || [
                      'Адаптивность к изменениям',
                      'Баланс логики и эмоций',
                      'Гибкость в общении',
                    ]
                  )
                    .slice(0, 3)
                    .map((characteristic, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-border rounded-full mr-2" />
                        <span className="text-sm">{characteristic}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </NeoCardContent>
        </NeoCard>
      </motion.div>

      {/* Quick Stats Grid - 2x2 */}
      <motion.div variants={itemAnimation} className="col-span-4 md:col-span-2">
        <div
          className={`grid ${visibleMetricsCount === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4 h-full auto-rows-fr`}
        >
          {/* Use custom metrics if provided, otherwise default metrics */}
          {metadata?.customMetrics ? (
            metadata.customMetrics.map((metric, index) => (
              <NeoCard
                key={index}
                color="white"
                hover={false}
                className={`relative overflow-hidden h-full ${
                  visibleMetricsCount === 3 && index === 2 ? 'col-span-2' : ''
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold uppercase text-foreground/80">
                        {metric.label}
                      </h3>
                      <p className="text-3xl font-heading mt-2">{metric.value}</p>
                    </div>
                  </div>
                  {metric.sublabel && (
                    <p className="text-sm text-foreground/60">{metric.sublabel}</p>
                  )}
                  {metric.trend && <div className="text-sm font-bold mt-2">{metric.trend}</div>}
                </div>
                {index % 3 === 2 ? (
                  <Star2
                    color={
                      metric.color ||
                      (['yellow', 'blue', 'green', 'orange'][index % 4] as
                        | 'yellow'
                        | 'blue'
                        | 'green'
                        | 'orange')
                    }
                    stroke="black"
                    size={80}
                    strokeWidth={4}
                    className="absolute -bottom-3 -right-3 rotate-45"
                  />
                ) : (
                  <div className={`absolute -bottom-1 -right-1 size-12 border-[3px] border-border rotate-45 ${
                    metric.color === 'yellow'
                      ? 'bg-chart-1'
                      : metric.color === 'blue'
                        ? 'bg-chart-2'
                        : metric.color === 'green'
                          ? 'bg-chart-4'
                          : metric.color === 'orange'
                            ? 'bg-chart-3'
                            : metric.color === 'purple'
                              ? 'bg-chart-5'
                              : (['bg-chart-1', 'bg-chart-2', 'bg-chart-4', 'bg-chart-3'][index % 4])
                  }`} />
                )}
              </NeoCard>
            ))
          ) : (
            <>
              {/* Default metrics */}
              {metadata?.showRarity !== false && (
                <NeoCard color="white" hover={false} className={`relative overflow-hidden h-full ${
                  visibleMetricsCount === 3 ? 'col-span-1' : ''
                }`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase text-foreground/80">Выраженность</h3>
                        <p className="text-3xl font-heading mt-2">{result.percentage}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">основного типа</p>
                    <div className="text-sm font-bold mt-2 text-chart-4">
                      {result.percentage > 50 ? '↑ Доминирующий' : result.percentage > 35 ? '→ Выраженный' : '↓ Умеренный'}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-12 border-[3px] border-border bg-chart-1 rotate-45" />
                </NeoCard>
              )}

              {metadata?.showStrengthsCount !== false && (
                <NeoCard color="white" hover={false} className={`relative overflow-hidden h-full ${
                  visibleMetricsCount === 3 ? 'col-span-1' : ''
                }`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase text-foreground/80">
                          Сильных сторон
                        </h3>
                        <p className="text-3xl font-heading mt-2">
                          {result.strengths?.length || result.characteristics?.length || 5}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">ключевых качеств</p>
                  </div>
                  <Star21
                    color="#0099ff"
                    stroke="black"
                    size={80}
                    strokeWidth={4}
                    className="absolute -bottom-3 -right-3 rotate-45"
                  />
                </NeoCard>
              )}

              {metadata?.showCompatibility !== false && result.compatibleTypes && (
                <NeoCard color="white" hover={false} className={`relative overflow-hidden h-full ${
                  visibleMetricsCount === 3 ? 'col-span-2' : ''
                }`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase text-foreground/80">
                          Совместимость
                        </h3>
                        <p className="text-3xl font-heading mt-2">
                          {result.compatibleTypes?.length || 3}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">подходящих типа</p>
                  </div>
                  <Star2
                    color="green"
                    stroke="black"
                    size={80}
                    strokeWidth={4}
                    className="absolute -bottom-3 -right-3 rotate-45"
                  />
                </NeoCard>
              )}

              {metadata?.showPopularity !== false && !metadata?.customMetrics && (
                <NeoCard color="white" hover={false} className="relative overflow-hidden h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase text-foreground/80">
                          Популярность
                        </h3>
                        <p className="text-3xl font-heading mt-2">#3</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">по встречаемости</p>
                    <div className="text-sm font-bold mt-2 text-foreground">→ Стабильно</div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-12 border-[3px] border-border bg-chart-3 rotate-45" />
                </NeoCard>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Percentage Visualization - 2x1 */}
      <motion.div variants={itemAnimation} className="col-span-4 md:col-span-2">
        <NeoCard hover={false} className="h-full">
          <NeoCardContent className="p-6">
            <h3 className="text-lg font-heading font-bold mb-4 uppercase flex items-center">
              <div className="w-8 h-8 bg-chart-2 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
                <BarChart3 className="w-4 h-4" />
              </div>
              Распределение типов
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        stroke="#000000"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {pieData.slice(0, 4).map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div
                    className="w-3 h-3 border-2 border-border mr-2"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  <span className="text-xs font-bold uppercase">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </NeoCardContent>
        </NeoCard>
      </motion.div>

      {/* Traits Grid - 2x1 */}
      <motion.div variants={itemAnimation} className="col-span-4 md:col-span-2">
        <NeoCard hover={false} className="h-full">
          <NeoCardContent className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-heading font-bold mb-4 uppercase flex items-center">
              <div className="w-8 h-8 bg-chart-4 border-2 border-border rounded-[15px] shadow-shadow flex items-center justify-center mr-3">
                <Star className="w-4 h-4" />
              </div>
              Ключевые черты
            </h3>
            <div className="space-y-3 flex-1">
              {traits.map((trait, index) => (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 bg-foreground rounded-full mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{trait}</span>
                </motion.div>
              ))}
            </div>
          </NeoCardContent>
        </NeoCard>
      </motion.div>
    </motion.div>
  );
}
