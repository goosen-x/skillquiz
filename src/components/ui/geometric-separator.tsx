'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GeometricSeparatorProps {
  variant?: 'simple' | 'complex' | 'animated';
  className?: string;
}

export function GeometricSeparator({ 
  variant = 'simple',
  className 
}: GeometricSeparatorProps) {
  if (variant === 'simple') {
    return (
      <div className={cn("relative w-full h-16 flex items-center justify-center overflow-hidden", className)}>
        <div className="flex gap-4">
          <div className="w-4 h-4 bg-chart-1 border-2 border-border shadow-shadow" />
          <div className="w-4 h-4 bg-chart-2 border-2 border-border shadow-shadow rounded-full" />
          <div className="w-4 h-4 bg-chart-3 border-2 border-border shadow-shadow transform rotate-45" />
          <div className="w-4 h-4 bg-chart-4 border-2 border-border shadow-shadow rounded-full" />
          <div className="w-4 h-4 bg-chart-5 border-2 border-border shadow-shadow" />
        </div>
      </div>
    );
  }

  if (variant === 'complex') {
    return (
      <div className={cn("relative w-full h-24 flex items-center justify-center overflow-hidden", className)}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/2 w-16 h-16 border-2 border-border transform -translate-y-1/2 rotate-12" />
          <div className="absolute right-1/4 top-1/2 w-12 h-12 bg-chart-1 transform -translate-y-1/2" />
          <div className="absolute left-1/3 top-1/2 w-8 h-8 bg-chart-2 rounded-full transform -translate-y-1/2" />
          <div className="absolute right-1/3 top-1/2 w-10 h-10 border-2 border-border transform -translate-y-1/2 rotate-45" />
        </div>
        
        {/* Center elements */}
        <div className="relative z-10 flex gap-6 items-center">
          <div className="w-6 h-6 bg-chart-3 border-2 border-border shadow-shadow" />
          <div className="w-2 h-2 bg-foreground rounded-full" />
          <div className="w-8 h-8 bg-chart-4 border-2 border-border shadow-shadow transform rotate-45" />
          <div className="w-2 h-2 bg-foreground rounded-full" />
          <div className="w-6 h-6 bg-chart-5 border-2 border-border shadow-shadow" />
        </div>
      </div>
    );
  }

  // Animated variant
  return (
    <div className={cn("relative w-full h-20 flex items-center justify-center overflow-hidden", className)}>
      <div className="flex gap-8 items-center">
        <motion.div 
          className="w-6 h-6 bg-chart-1 border-2 border-border shadow-shadow"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        />
        <motion.div 
          className="w-4 h-4 bg-chart-2 border-2 border-border shadow-shadow rounded-full"
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-8 h-8 bg-chart-3 border-2 border-border shadow-shadow transform rotate-45"
          animate={{ 
            rotate: [45, 405],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-4 h-4 bg-chart-4 border-2 border-border shadow-shadow rounded-full"
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="w-6 h-6 bg-chart-5 border-2 border-border shadow-shadow"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, delay: 1 }
          }}
        />
      </div>
    </div>
  );
}