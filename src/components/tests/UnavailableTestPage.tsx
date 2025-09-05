'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Bell } from 'lucide-react';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { PaintRollerLoader } from '@/components/animations/PaintRollerLoader';

interface UnavailableTestPageProps {
  testTitle: string;
  expectedDate?: string;
  description?: string;
}

export function UnavailableTestPage({
  testTitle,
  expectedDate,
  description,
}: UnavailableTestPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link href="/tests" className="inline-block mb-8">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Назад к тестам
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NeoCard className="mb-8">
          <NeoCardContent className="p-8">
            <h1 className="font-heading font-bold text-3xl uppercase mb-4 text-center">
              {testTitle}
            </h1>

            {description && (
              <p className="text-foreground/80 text-center mb-8 max-w-2xl mx-auto">{description}</p>
            )}

            <PaintRollerLoader message="Тест в разработке" />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {expectedDate && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <NeoCard color="yellow" className="h-full">
                    <NeoCardContent className="p-6 flex items-center gap-4">
                      <Calendar className="w-8 h-8 text-chart-1" />
                      <div>
                        <p className="text-sm font-bold uppercase">Ожидается</p>
                        <p className="text-lg">{expectedDate}</p>
                      </div>
                    </NeoCardContent>
                  </NeoCard>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <NeoCard color="blue" className="h-full">
                  <NeoCardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Bell className="w-8 h-8 text-chart-2" />
                      <p className="font-bold uppercase">Уведомить меня</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        // TODO: Implement notification subscription
                        alert('Функция уведомлений скоро будет доступна!');
                      }}
                    >
                      Получить уведомление
                    </Button>
                  </NeoCardContent>
                </NeoCard>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-foreground/60 mb-4">
                А пока можете попробовать другие тесты:
              </p>
              <Link href="/tests">
                <Button variant="default">Все тесты</Button>
              </Link>
            </motion.div>
          </NeoCardContent>
        </NeoCard>
      </motion.div>
    </div>
  );
}
