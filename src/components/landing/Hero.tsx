'use client';

import { motion } from 'framer-motion';
import { Play, Users, CheckCircle, ArrowDown, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SpiralImage from '@public/images/spiral.png';
import Star21 from '../ui/star21';
import { allTests } from '@/data/tests';

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
    <section className="relative bg-background overflow-hidden pb-20">
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
      <div className="w-64 h-auto absolute top-0 right-[10%]">
        <Image src={SpiralImage} alt="spiral" />
      </div>
      <Star21
        className="absolute -left-25 top-70"
        color="rgb(0, 153, 255)"
        size={400}
        stroke="black"
        strokeWidth={2}
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
            className="text-5xl sm:text-6xl lg:text-7xl font-heading text-foreground mb-6 leading-tight uppercase"
          >
            <span
              className="text-main"
              style={{
                textShadow:
                  '2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000',
              }}
            >
              Профессиональные
            </span>{' '}
            <br className="hidden sm:inline" />
            тесты и квизы онлайн
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
            <div className="border-2 border-border bg-secondary-background p-6 shadow-shadow">
              <div className="text-4xl font-heading font-black text-main mb-2">
                {allTests.length}
              </div>
              <div className="text-sm font-bold uppercase">Тестов</div>
            </div>
            <div className="border-2 border-border bg-secondary-background p-6 shadow-shadow">
              <div className="text-4xl font-heading font-black text-chart-3 mb-2">50K+</div>
              <div className="text-sm font-bold uppercase">Пользователей</div>
            </div>
            <div className="border-2 border-border bg-secondary-background p-6 shadow-shadow">
              <div className="text-4xl font-heading font-black text-chart-4 mb-2">98%</div>
              <div className="text-sm font-bold uppercase">Точность</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="border-2 border-border p-3 bg-secondary-background shadow-shadow rounded-full">
            <ArrowDown className="w-6 h-6 text-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
