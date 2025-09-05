'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, History, ChevronRight } from 'lucide-react';
import Link from 'next/link';
// import { getResultsHistory } from '@/lib/results-storage';
import { getTestBySlug } from '@/data/tests';

interface ResultHistoryItem {
  testSlug: string;
  resultUrl: string;
  resultName: string;
  timestamp: string;
}

export default function RecentResults() {
  const [results, setResults] = useState<ResultHistoryItem[]>([]);

  useEffect(() => {
    // Временно отключаем историю результатов
    // const history = getResultsHistory();
    // setResults(history.slice(0, 5)); // Показываем последние 5 результатов
    setResults([]);
  }, []);

  if (results.length === 0) {
    return null;
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 3600000) { // меньше часа
      const minutes = Math.floor(diff / 60000);
      return `${minutes} мин назад`;
    } else if (diff < 86400000) { // меньше дня
      const hours = Math.floor(diff / 3600000);
      return `${hours} ч назад`;
    } else if (diff < 604800000) { // меньше недели
      const days = Math.floor(diff / 86400000);
      return `${days} дн назад`;
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-black mb-4 uppercase">
            Ваши последние результаты
          </h2>
          <p className="text-xl text-foreground/80">
            Быстрый доступ к вашим недавним тестам
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {results.map((result, index) => {
            const test = getTestBySlug(result.testSlug);
            if (!test) return null;

            return (
              <motion.div
                key={result.timestamp}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={result.resultUrl}>
                  <NeoCard className="cursor-pointer hover:translate-x-2 hover:-translate-y-2 transition-transform">
                    <NeoCardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-3xl">🎯</div>
                            <div>
                              <h3 className="font-heading font-bold text-lg uppercase">
                                {result.resultName}
                              </h3>
                              <p className="text-sm text-foreground/60">
                                {test.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(result.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <NeoBadge color="yellow">
                            <History className="w-3 h-3 mr-1" />
                            Результат
                          </NeoBadge>
                          <ExternalLink className="w-5 h-5 text-foreground/40" />
                        </div>
                      </div>
                    </NeoCardContent>
                  </NeoCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/profile">
            <Button variant="outline" className="uppercase font-bold">
              <History className="w-5 h-5 mr-2" />
              Вся история результатов
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}