'use client';

import { motion } from 'framer-motion';
import { Play, Users, CheckCircle, ArrowDown, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative bg-background min-h-screen overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px),
                        repeating-linear-gradient(90deg, var(--border) 0px, transparent 2px, transparent 80px, var(--border) 82px)`,
          opacity: 0.1,
        }}
      />
      {/* Floating geometric shapes */}
      <div className="w-10 h-10 absolute top-0 left-0 bg-white">dkfkj</div>
      <motion.div
        className="absolute w-48 h-48 border-2 border-border bg-chart-1 rotate-12"
        style={{ left: '5%', top: '10%' }}
        animate={{
          rotate: [12, 24, 12],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <motion.div className="text-center" variants={stagger} initial="initial" animate="animate">
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center px-6 py-3 border-2 border-border bg-chart-1 text-foreground text-sm font-bold uppercase shadow-shadow">
              <Users className="w-4 h-4 mr-2" />
              50K+ человек уже прошли тесты
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-foreground mb-6 leading-tight uppercase"
          >
            <span className="text-main">Психологические</span> <br className="hidden sm:inline" />
            тесты онлайн
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-base"
          >
            Узнай свой <strong className="font-bold">тип личности</strong>, найди подходящую{' '}
            <strong className="font-bold">профессию</strong> и раскрой потенциал с научными тестами
          </motion.h2>

          {/* Features */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
          >
            <div className="flex items-center text-foreground font-bold uppercase text-sm">
              <CheckCircle className="w-5 h-5 text-chart-4 mr-2" />
              <span>Быстро</span>
            </div>
            <div className="flex items-center text-foreground font-bold uppercase text-sm">
              <Star className="w-5 h-5 text-chart-1 mr-2" />
              <span>Точно</span>
            </div>
            <div className="flex items-center text-foreground font-bold uppercase text-sm">
              <Zap className="w-5 h-5 text-chart-3 mr-2" />
              <span>Бесплатно</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12"
          >
            <Link href="/tests">
              <Button size="lg" className="uppercase font-bold text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Начать тест
              </Button>
            </Link>
            <Link href="/tests?category=career">
              <Button variant="outline" size="lg" className="uppercase font-bold text-lg px-8 py-6">
                Тест на профессию
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <motion.div
              className="border-2 border-border bg-secondary-background p-6 shadow-shadow"
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: '6px 6px 0px 0px var(--border)',
              }}
            >
              <div className="text-4xl font-heading font-black text-main mb-2">58</div>
              <div className="text-sm font-bold uppercase">Тестов</div>
            </motion.div>
            <motion.div
              className="border-2 border-border bg-secondary-background p-6 shadow-shadow"
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: '6px 6px 0px 0px var(--border)',
              }}
            >
              <div className="text-4xl font-heading font-black text-chart-3 mb-2">50K+</div>
              <div className="text-sm font-bold uppercase">Пользователей</div>
            </motion.div>
            <motion.div
              className="border-2 border-border bg-secondary-background p-6 shadow-shadow"
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: '6px 6px 0px 0px var(--border)',
              }}
            >
              <div className="text-4xl font-heading font-black text-chart-4 mb-2">98%</div>
              <div className="text-sm font-bold uppercase">Точность</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="border-2 border-border p-2 bg-secondary-background shadow-shadow">
            <ArrowDown className="w-6 h-6 text-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
