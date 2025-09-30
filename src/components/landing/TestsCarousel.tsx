'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPopularTests } from '@/data/tests';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { TestCard } from '@/components/shared/TestCard';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

export function TestsCarousel() {
  const tests = getPopularTests(9); // Get top 9 popular tests
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateButtons();
    api.on('select', updateButtons);
    api.on('reInit', updateButtons);

    return () => {
      api.off('select', updateButtons);
      api.off('reInit', updateButtons);
    };
  }, [api]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground mb-4 uppercase">
            Популярные{' '}
            <span
              className="text-main"
              style={{
                textShadow:
                  '2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000',
              }}
            >
              тесты
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
            Самые востребованные психологические тесты, которые уже прошли тысячи пользователей
          </p>
        </motion.div>

        {/* Carousel wrapper with padding to prevent shadow cutoff */}
        <div className="px-4 sm:px-8 -mx-4 sm:-mx-8 pb-4 relative overflow-hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4 pr-2 sm:pr-4 cursor-grab active:cursor-grabbing">
              {tests.map((test) => (
                <CarouselItem
                  key={test.id}
                  className="pl-2 sm:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="py-2">
                    <TestCard test={test} variant="detailed" showStats={true} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6">
          <Button
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            variant="outline"
            size="icon"
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-border shadow-shadow hover:shadow-[6px_6px_0px_0px_theme(colors.border)] hover:-translate-x-[2px] hover:-translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            variant="outline"
            size="icon"
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-border shadow-shadow hover:shadow-[6px_6px_0px_0px_theme(colors.border)] hover:-translate-x-[2px] hover:-translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link href="/tests">
            <Button size="lg" className="uppercase font-bold">
              Смотреть все тесты
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
