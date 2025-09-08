'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { Home, Search, AlertTriangle, Brain, Zap } from 'lucide-react';
import { GeometricSeparator } from '@/components/ui/geometric-separator';

const floatingShapes = [
  { type: 'square', color: 'bg-chart-1', size: 'w-16 h-16', rotate: 45 },
  { type: 'circle', color: 'bg-chart-2', size: 'w-20 h-20', rotate: 0 },
  { type: 'triangle', color: 'bg-chart-3', size: 'w-0 h-0', rotate: 0 },
  { type: 'square', color: 'bg-chart-4', size: 'w-12 h-12', rotate: 0 },
  { type: 'circle', color: 'bg-chart-5', size: 'w-14 h-14', rotate: 0 },
];

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  return (
    <div className="min-h-screen bg-secondary-background relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-5">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.color} ${shape.size} border-2 border-border ${
              shape.type === 'circle' ? 'rounded-full' : ''
            } ${shape.type === 'triangle' ? 'triangle' : ''}`}
            style={{
              left: `${15 + index * 17}%`,
              top: `${10 + (index % 2) * 60}%`,
              transform: `rotate(${shape.rotate}deg)`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [shape.rotate, shape.rotate + 180, shape.rotate],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Giant 404 */}
          <motion.div
            className="mb-8 relative"
            onMouseEnter={triggerGlitch}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <motion.h1
              className={`text-[150px] md:text-[200px] font-heading font-bold leading-none ${
                isGlitching ? 'glitch' : ''
              }`}
              animate={isGlitching ? {
                x: [0, -5, 5, -5, 5, 0],
                textShadow: [
                  '4px 4px 0px #000000',
                  '-4px 4px 0px #FF7A05, 4px -4px 0px #0099FF',
                  '4px 4px 0px #000000',
                ],
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <span className="text-chart-1">4</span>
              <span className="text-chart-2">0</span>
              <span className="text-chart-3">4</span>
            </motion.h1>
            
            {/* Shadow effect */}
            <div className="absolute inset-0 -z-10 transform translate-x-2 translate-y-2">
              <h1 className="text-[150px] md:text-[200px] font-heading font-bold leading-none text-foreground">
                404
              </h1>
            </div>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NeoCard className="bg-background mb-8">
              <NeoCardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-chart-4 border-2 border-border shadow-shadow flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-foreground" />
                  </div>
                </div>

                <h2 className="text-3xl font-heading font-bold uppercase mb-4">
                  Страница не найдена
                </h2>
                
                <p className="text-lg mb-6 font-base">
                  Эта страница решила пройти тест на исчезновение и получила максимальный балл!
                </p>

                <GeometricSeparator className="my-6" />

                {/* Fun suggestions */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    className="p-4 bg-chart-1 border-2 border-border shadow-shadow cursor-pointer"
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 0, y: 0 }}
                  >
                    <Brain className="w-8 h-8 mb-2 text-foreground" />
                    <p className="font-bold text-sm uppercase">Тест на внимательность</p>
                    <p className="text-xs">Вы прошли!</p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-chart-2 border-2 border-border shadow-shadow cursor-pointer"
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 0, y: 0 }}
                  >
                    <Zap className="w-8 h-8 mb-2 text-foreground" />
                    <p className="font-bold text-sm uppercase">Навык поиска</p>
                    <p className="text-xs">+100 XP</p>
                  </motion.div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button
                      variant="default"
                      size="lg"
                      className="uppercase font-bold flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      На главную
                    </Button>
                  </Link>

                  <Link href="/tests">
                    <Button
                      variant="outline"
                      size="lg"
                      className="uppercase font-bold flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Все тесты
                    </Button>
                  </Link>
                </div>
              </NeoCardContent>
            </NeoCard>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 bg-chart-${i} border-2 border-border`}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            ))}
          </motion.div>

          {/* Secret hint */}
          <motion.p
            className="mt-8 text-sm text-foreground/60 font-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2 }}
          >
            Подсказка: попробуйте навести курсор на цифры
          </motion.p>
        </div>
      </div>

      <style jsx>{`
        .triangle {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid currentColor;
        }

        .glitch {
          animation: glitch 0.3s linear;
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </div>
  );
}