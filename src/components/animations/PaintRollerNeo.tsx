'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PaintRollerNeoProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
}

export function PaintRollerNeo({
  className = '',
  primaryColor = '#FFD23F', // Yellow from the design system
  secondaryColor = '#FF6B35', // Orange from the design system
  borderColor = '#000000',
}: PaintRollerNeoProps) {
  return (
    <div className={cn('relative h-[350px] w-[350px] -rotate-45', className)}>
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
        .roller-animation {
          animation: roller 2s infinite;
        }
        .paint-animation {
          animation: paint 2s infinite;
        }
      `}</style>

      {/* Roller */}
      <div
        className="roller-animation absolute inset-x-0 top-0 mx-auto h-[45px] w-[150px] rounded-[7px] border-[5px]"
        style={{
          borderColor,
          backgroundImage: `linear-gradient(to bottom, ${primaryColor} 0, ${primaryColor} 80%, ${secondaryColor} 80%)`,
        }}
      >
        {/* Shine effect */}
        <div className="absolute top-[8px] left-[8px] h-[7px] w-[75px] rounded-[10px] bg-white/70" />

        {/* Roller extension */}
        <div
          className="absolute -right-[20px] top-[20px] -z-10 h-[40px] w-[85px] rounded-[7px] border-[7px] border-l-0"
          style={{ borderColor }}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute top-[68px] right-[65px] h-[30px] w-[7px]"
        style={{ backgroundColor: borderColor }}
      >
        <div
          className="absolute -bottom-[75px] -right-[8px] h-[75px] w-[25px] rounded-[5px]"
          style={{ backgroundColor: borderColor }}
        />
      </div>

      {/* Paint trail */}
      <div
        className="paint-animation absolute inset-x-0 mx-auto -z-10 h-0 w-[130px]"
        style={{ backgroundColor: primaryColor }}
      />
    </div>
  );
}
