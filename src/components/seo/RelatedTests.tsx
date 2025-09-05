'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RelatedTestsProps {
  tests: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
    category: 'psychology' | 'career' | 'lifestyle';
    difficulty: 'Легкий' | 'Средний' | 'Сложный';
    duration: string;
  }>;
  currentTestId: string;
  title?: string;
  className?: string;
}

const categoryColors = {
  psychology: 'blue',
  career: 'green',
  lifestyle: 'purple',
} as const;

const categoryLabels = {
  psychology: 'Психология',
  career: 'Карьера',
  lifestyle: 'Образ жизни',
} as const;

export function RelatedTests({
  tests,
  currentTestId,
  title = 'Похожие тесты',
  className,
}: RelatedTestsProps) {
  const relatedTests = tests.filter((test) => test.id !== currentTestId).slice(0, 3);

  if (relatedTests.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="font-heading font-bold text-2xl uppercase">{title}</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {relatedTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/tests/${test.slug}`} className="block h-full">
              <NeoCard hover className="h-full">
                <NeoCardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <NeoBadge color={categoryColors[test.category]} className="text-xs">
                      {categoryLabels[test.category]}
                    </NeoBadge>
                    <span className="text-xs text-foreground/60">{test.duration}</span>
                  </div>

                  <h3 className="font-bold text-sm uppercase mb-2 line-clamp-2">{test.title}</h3>

                  <p className="text-xs text-foreground/80 mb-4 line-clamp-2">{test.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs">
                      Сложность: <strong>{test.difficulty}</strong>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </NeoCardContent>
              </NeoCard>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link href="/tests">
          <Button variant="outline" size="sm">
            Все тесты
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Structured Data for Related Content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: title,
            numberOfItems: relatedTests.length,
            itemListElement: relatedTests.map((test, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Quiz',
                name: test.title,
                description: test.description,
                url: `https://psytest.ru/tests/${test.slug}`,
                educationalLevel: test.difficulty,
                timeRequired: test.duration,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
