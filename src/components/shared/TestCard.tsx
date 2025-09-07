'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Brain, Award, TrendingUp } from 'lucide-react';
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

const difficultyColors = {
  Легкий: 'green',
  Средний: 'yellow',
  Сложный: 'orange',
};

export function TestCard({ test, variant = 'default', showStats = true, onHover }: TestCardProps) {
  const category = categoryConfig[test.category];
  const isAvailable = test.status === 'completed' || !test.status;

  const cardContent = (
    <NeoCard
      color={isAvailable ? 'white' : 'white'}
      hover={isAvailable}
      className={cn('h-full transition-all duration-200', !isAvailable && 'opacity-75')}
    >
      <NeoCardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {test.status === 'in_development' ? (
              <NeoBadge color="orange" className="text-xs">
                В разработке
              </NeoBadge>
            ) : test.status === 'planned' ? (
              <NeoBadge color="blue" className="text-xs">
                Запланирован
              </NeoBadge>
            ) : (
              <>
                {test.featured && (
                  <NeoBadge color="yellow" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Популярный
                  </NeoBadge>
                )}
                {test.new && !test.featured && (
                  <NeoBadge color="green" className="text-xs">
                    Новый
                  </NeoBadge>
                )}
              </>
            )}
          </div>
          <NeoBadge color={category.color} className="text-xs">
            <category.icon className="w-3 h-3 mr-1" />
            {category.label}
          </NeoBadge>
        </div>

        {/* Title & Description */}
        <div className="flex-grow">
          <h3 className="font-heading font-bold text-lg uppercase mb-2">{test.title}</h3>
          <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{test.description}</p>

          {/* Expected date for in development */}
          {test.status === 'in_development' && test.expectedDate && (
            <p className="text-xs text-foreground/60 mb-4">Ожидается: {test.expectedDate}</p>
          )}

          {/* Tags */}
          {variant !== 'compact' && (
            <div className="flex flex-wrap gap-2 mb-4">
              {test.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-secondary-background border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {showStats && variant !== 'compact' && (
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{test.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              <span>{test.questionsCount} вопросов</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{test.usersCount}</span>
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-foreground/60">Сложность:</span>
          <NeoBadge
            color={difficultyColors[test.difficulty] as 'green' | 'yellow' | 'orange'}
            className="text-xs"
          >
            {test.difficulty}
          </NeoBadge>
        </div>

        {/* Action Button */}
        {isAvailable ? (
          <Button
            variant="outline"
            className="w-full"
            size={variant === 'compact' ? 'sm' : 'default'}
          >
            Пройти тест
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            disabled
            size={variant === 'compact' ? 'sm' : 'default'}
          >
            Скоро доступен
          </Button>
        )}
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
    <Link href={`/tests/${test.slug}`} className="block h-full" onMouseEnter={onHover}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    </Link>
  );
}
