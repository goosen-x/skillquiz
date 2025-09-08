'use client';

/**
 * TestCard Component - Neo-Brutalism Design System
 * 
 * Новый дизайн индикаторов:
 * 1. DifficultyBlocks - геометрические блоки разной высоты вместо звёзд
 * 2. TestMetrics - компактные цветные иконки с временем и количеством вопросов
 * 3. TestIntensity - новый умный показатель интенсивности теста
 * 
 * Особенности необруталистического стиля:
 * - Толстые границы 2px
 * - Жёсткие тени без blur
 * - Яркие цвета из chart-palette
 * - Минимальные скругления
 * - Жирная типографика UPPERCASE
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { Clock, Brain, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCardProps {
  test: {
    id: string;
    title: string;
    description: string;
    category: 'psychology' | 'career' | 'lifestyle';
    difficulty: 'Легкий' | 'Средний' | 'Сложный';
    duration: string;
    questionsCount: number;
    usersCount: string;
    popularity: number;
    tags: string[];
    featured?: boolean;
    new?: boolean;
    slug: string;
    status?: 'completed' | 'in_development' | 'planned';
    expectedDate?: string;
  };
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
  onHover?: () => void;
}

const categoryConfig = {
  psychology: {
    color: 'blue' as const,
    icon: Brain,
    label: 'Психология',
  },
  career: {
    color: 'green' as const,
    icon: TrendingUp,
    label: 'Карьера',
  },
  lifestyle: {
    color: 'purple' as const,
    icon: Award,
    label: 'Образ жизни',
  },
};


// Компонент для отображения сложности геометрическими блоками
function DifficultyBlocks({ difficulty }: { difficulty: 'Легкий' | 'Средний' | 'Сложный' }) {
  const getDifficultyConfig = (diff: typeof difficulty) => {
    switch (diff) {
      case "Легкий":
        return { 
          level: 1, 
          color: "bg-chart-4", 
          label: "ЛЕГКО",
          borderColor: "border-chart-4"
        };
      case "Средний":
        return { 
          level: 2, 
          color: "bg-chart-1", 
          label: "СРЕДНЕ",
          borderColor: "border-chart-1"
        };
      case "Сложный":
        return { 
          level: 3, 
          color: "bg-chart-3", 
          label: "СЛОЖНО",
          borderColor: "border-chart-3"
        };
    }
  };

  const config = getDifficultyConfig(difficulty);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-6 border-2 border-border transition-all duration-200",
              index < config.level 
                ? `${config.color} shadow-[2px_2px_0px_0px_theme(colors.border)]` 
                : "bg-background opacity-30"
            )}
            style={{
              height: `${16 + (index + 1) * 4}px`
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  );
}

// Компонент для отображения времени и вопросов в компактном формате
function TestMetrics({ duration, questionsCount }: { duration: string; questionsCount: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 bg-chart-2 border-2 border-border flex items-center justify-center">
          <Clock className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs font-bold uppercase">{duration}</span>
      </div>
      <div className="w-px h-4 bg-border"></div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 bg-chart-5 border-2 border-border flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
        <span className="text-xs font-bold uppercase">{questionsCount}Q</span>
      </div>
    </div>
  );
}

// Компонент интенсивности теста (комбинированный показатель)
function TestIntensity({ difficulty, questionsCount, duration }: { 
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  questionsCount: number;
  duration: string;
}) {
  const calculateIntensity = () => {
    let score = 0;
    
    // Баллы за сложность
    switch (difficulty) {
      case "Легкий": score += 1; break;
      case "Средний": score += 2; break;
      case "Сложный": score += 3; break;
    }
    
    // Баллы за количество вопросов
    if (questionsCount > 20) score += 2;
    else if (questionsCount > 10) score += 1;
    
    // Баллы за время (парсим минуты)
    const minutes = parseInt(duration);
    if (minutes > 15) score += 2;
    else if (minutes > 5) score += 1;
    
    return Math.min(score, 5); // Максимум 5
  };

  const intensity = calculateIntensity();
  const getIntensityColor = (level: number) => {
    if (level <= 2) return "bg-chart-4"; // Зеленый
    if (level <= 3) return "bg-chart-1"; // Желтый
    return "bg-chart-3"; // Оранжевый
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase text-foreground/60">ИНТЕНСИВНОСТЬ:</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 border border-border",
              index < intensity 
                ? `${getIntensityColor(intensity)} shadow-[1px_1px_0px_0px_theme(colors.border)]`
                : "bg-background opacity-30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function TestCard({ test, variant = 'default', showStats = true, onHover }: TestCardProps) {
  const category = categoryConfig[test.category];
  const isAvailable = test.status === 'completed' || !test.status;

  const categoryColors = {
    psychology: 'bg-chart-2',
    career: 'bg-chart-4', 
    lifestyle: 'bg-chart-5',
  };

  const cardContent = (
    <NeoCard
      color={isAvailable ? 'white' : 'white'}
      hover={isAvailable}
      className={cn(
        'h-full transition-all duration-200 flex flex-col',
        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
    >
      {/* Цветной хедер */}
      <div className={cn(
        'h-20 relative border-b-2 border-border',
        isAvailable ? categoryColors[test.category] : 'bg-muted',
        !isAvailable && 'opacity-60'
      )}>
        <div className="absolute top-3 right-3 flex gap-2">
          {test.status === 'in_development' ? (
            <NeoBadge color="orange" className="text-xs bg-background">
              В разработке
            </NeoBadge>
          ) : test.status === 'planned' ? (
            <NeoBadge color="blue" className="text-xs bg-background">
              Запланирован
            </NeoBadge>
          ) : (
            <>
              {test.featured && (
                <NeoBadge color="yellow" className="text-xs bg-background">
                  <Award className="w-3 h-3 mr-1" />
                  Популярный
                </NeoBadge>
              )}
              {test.new && !test.featured && (
                <NeoBadge color="green" className="text-xs bg-background">
                  Новый
                </NeoBadge>
              )}
            </>
          )}
        </div>
        <div className="absolute bottom-3 left-4">
          <NeoBadge color={category.color} className="text-xs bg-background">
            <category.icon className="w-3 h-3 mr-1" />
            {category.label}
          </NeoBadge>
        </div>
      </div>
      
      <NeoCardContent className={cn(
        "p-6 flex-1 flex flex-col relative",
        !isAvailable && "opacity-60"
      )}>
        
        {/* Fixed height title */}
        <h3 className="font-heading font-bold text-lg uppercase mb-2 line-clamp-2 min-h-[56px]">
          {test.title}
        </h3>
        
        {/* Fixed height description */}
        <p className="text-sm text-foreground/80 mb-4 line-clamp-4 min-h-[80px]">
          {test.description}
        </p>

        {/* Expected date for in development */}
        {test.status === 'in_development' && test.expectedDate && (
          <p className="text-xs text-foreground/60 mb-4">Ожидается: {test.expectedDate}</p>
        )}

        {/* Tags with fixed min height */}
        {variant !== 'compact' && (
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            {test.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-secondary-background border-2 border-border font-bold uppercase shadow-[2px_2px_0px_0px_theme(colors.border)] h-fit"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* New Modern Stats Layout */}
        {showStats && variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Compact Time & Questions */}
            <TestMetrics duration={test.duration} questionsCount={test.questionsCount} />
            
            {/* Difficulty with new design */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-foreground/60">СЛОЖНОСТЬ:</span>
              <DifficultyBlocks difficulty={test.difficulty} />
            </div>
            
            {/* Test Intensity - New Feature */}
            <TestIntensity 
              difficulty={test.difficulty} 
              questionsCount={test.questionsCount} 
              duration={test.duration}
            />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4">
          {isAvailable ? (
            <Button
              variant="default"
              className="w-full uppercase font-bold"
              size={variant === 'compact' ? 'sm' : 'default'}
            >
              Начать тест
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full uppercase font-bold opacity-50"
              disabled
              size={variant === 'compact' ? 'sm' : 'default'}
            >
              {test.status === 'in_development' ? 'В разработке' : 'Скоро доступен'}
            </Button>
          )}
        </div>
      </NeoCardContent>
    </NeoCard>
  );

  if (!isAvailable) {
    return (
      <div className="h-full" onMouseEnter={onHover}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/tests/${test.slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="h-full"
        onMouseEnter={onHover}
      >
        {cardContent}
      </motion.div>
    </Link>
  );
}
