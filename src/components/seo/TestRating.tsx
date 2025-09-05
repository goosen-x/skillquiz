'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { cn } from '@/lib/utils';

interface TestRatingProps {
  rating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

export function TestRating({ rating, totalReviews, distribution, className }: TestRatingProps) {
  return (
    <NeoCard className={cn('w-full', className)}>
      <NeoCardContent className="p-6">
        <h3 className="font-heading font-bold text-lg uppercase mb-6">Рейтинг теста</h3>

        {/* Overall Rating */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold">{rating.toFixed(1)}</div>
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < Math.floor(rating)
                      ? 'fill-chart-1 text-chart-1'
                      : i < rating
                        ? 'fill-chart-1/50 text-chart-1'
                        : 'fill-secondary-background text-foreground'
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-foreground/60">{totalReviews} отзывов</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {([5, 4, 3, 2, 1] as const).map((stars) => {
            const count = distribution[stars];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium">{stars}</span>
                  <Star className="w-4 h-4 fill-chart-1 text-chart-1" />
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-secondary-background border-2 border-border relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-chart-1"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: stars * 0.1 }}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium w-12 text-right">{count}</div>
              </div>
            );
          })}
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: totalReviews,
              bestRating: 5,
              worstRating: 1,
            }),
          }}
        />
      </NeoCardContent>
    </NeoCard>
  );
}
