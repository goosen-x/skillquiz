'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  animation?: 'lift' | 'tilt' | 'scale' | 'glow' | 'flip' | 'float';
  children: React.ReactNode;
  delay?: number;
}

const cardAnimations = {
  lift: {
    whileHover: { 
      y: -8, 
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  },
  tilt: {
    whileHover: { 
      rotateY: 5,
      rotateX: 5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    style: { transformStyle: "preserve-3d" as const }
  },
  scale: {
    whileHover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  },
  glow: {
    whileHover: { 
      boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
      borderColor: "rgba(99, 102, 241, 0.5)",
      transition: { duration: 0.3 }
    }
  },
  flip: {
    whileHover: { 
      rotateY: 180,
      transition: { duration: 0.6 }
    },
    style: { transformStyle: "preserve-3d" as const }
  },
  float: {
    animate: { 
      y: [0, -2, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
    },
    whileHover: { y: -6 }
  }
};

export function AnimatedCard({ 
  animation = 'lift', 
  className, 
  children, 
  delay = 0,
  ...props 
}: AnimatedCardProps) {
  const MotionCard = motion(Card);
  const animationConfig = cardAnimations[animation];
  
  // Handle different animation types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const motionProps: any = {
    className: cn("cursor-pointer", className),
    initial: { opacity: 0, y: 20 },
    animate: animation === 'float' && 'animate' in animationConfig
      ? animationConfig.animate 
      : { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
    whileHover: animationConfig.whileHover,
    ...('style' in animationConfig ? { style: animationConfig.style } : {}),
    ...props
  };
  
  return (
    <MotionCard {...motionProps}>
      {children}
    </MotionCard>
  );
}

interface TestCardProps {
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  icon?: string;
  color?: string;
  onClick?: () => void;
  delay?: number;
}

export function TestCard({ 
  title, 
  description, 
  duration, 
  questionsCount, 
  icon = "🧠", 
  color = "from-blue-500 to-purple-600",
  onClick,
  delay = 0
}: TestCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Background glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Main card */}
      <Card className="relative z-10 p-6 h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <div className="flex items-start space-x-4 mb-4">
          <motion.div 
            className="text-3xl"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span>📊</span>
            <span>{questionsCount} вопросов</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>⏱️</span>
            <span>{duration}</span>
          </span>
        </div>
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent"
          whileHover={{
            borderColor: "rgba(99, 102, 241, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

interface ProgressCardProps {
  current: number;
  total: number;
  title: string;
  subtitle?: string;
  showCelebration?: boolean;
}

export function ProgressCard({ 
  current, 
  total, 
  title, 
  subtitle,
  showCelebration = false 
}: ProgressCardProps) {
  const progress = (current / total) * 100;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-100, 200]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{current} из {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        
        {showCelebration && progress >= 50 && (
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >
            🎉
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}