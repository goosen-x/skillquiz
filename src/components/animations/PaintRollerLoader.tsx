'use client';

import { motion } from 'framer-motion';

interface PaintRollerLoaderProps {
  message?: string;
  className?: string;
}

export function PaintRollerLoader({
  message = 'Тест временно недоступен',
  className = '',
}: PaintRollerLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      <div className="relative mb-8">
        <div className="wrapper">
          <div className="container h-[350px] w-[350px] rotate-[-45deg]">
            <div className="roller absolute h-[45px] w-[150px] border-[5px] border-border rounded-[7px] bg-gradient-to-b from-chart-1 from-0% via-chart-1 via-80% to-chart-3 to-80% m-auto left-0 right-0 top-0 animate-[roller_2s_infinite] before:absolute before:content-[''] before:bg-white/70 before:h-[7px] before:w-[75px] before:top-[8px] before:left-[8px] before:rounded-[10px] after:absolute after:content-[''] after:h-[40px] after:w-[85px] after:border-[7px] after:border-border after:border-l-0 after:right-[-20px] after:top-[20px] after:z-[-1] after:rounded-[7px]">
              <div className="handle h-[30px] w-[7px] bg-border absolute top-[68px] right-[65px] after:absolute after:content-[''] after:h-[75px] after:w-[25px] after:bg-border after:bottom-[-75px] after:right-[-8px] after:rounded-[5px]"></div>
            </div>
            <div className="paint bg-chart-1 h-0 w-[130px] absolute m-auto left-0 right-0 z-[-1] animate-[paint_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <motion.h3
        className="font-heading font-bold text-xl uppercase text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.h3>

      <motion.p
        className="text-foreground/60 text-center mt-2 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Мы работаем над этим тестом. Скоро он будет доступен!
      </motion.p>

      <style jsx>{`
        @keyframes roller {
          40% {
            top: 165px;
          }
        }

        @keyframes paint {
          40% {
            height: 165px;
          }
        }
      `}</style>
    </div>
  );
}
