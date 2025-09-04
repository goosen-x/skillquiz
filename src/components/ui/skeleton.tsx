'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md", className)}
      {...props}
    />
  )
}

interface AnimatedSkeletonProps {
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
  delay?: number;
}

function AnimatedSkeleton({ 
  className, 
  animation = 'shimmer',
  delay = 0 
}: AnimatedSkeletonProps) {
  const animationProps = {
    shimmer: {
      animate: {
        backgroundPosition: ['-200% 0', '200% 0'],
        opacity: 1
      },
      transition: {
        backgroundPosition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "linear" as const
        },
        opacity: { delay }
      }
    },
    pulse: {
      animate: {
        opacity: [0.4, 1, 0.4]
      },
      transition: {
        opacity: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay
        }
      }
    },
    wave: {
      animate: {
        scale: [1, 1.02, 1],
        opacity: 1
      },
      transition: {
        scale: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut" as const
        },
        opacity: { delay }
      }
    }
  };

  const selectedAnimation = animationProps[animation];

  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md",
        className
      )}
      initial={{ opacity: 0 }}
      animate={selectedAnimation.animate}
      transition={selectedAnimation.transition}
    />
  );
}

interface TestCardSkeletonProps {
  delay?: number;
}

function TestCardSkeleton({ delay = 0 }: TestCardSkeletonProps) {
  return (
    <motion.div
      className="p-6 border rounded-xl bg-white/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-start space-x-4 mb-4">
        <AnimatedSkeleton className="w-12 h-12 rounded-full" delay={delay + 0.1} />
        <div className="flex-1 space-y-2">
          <AnimatedSkeleton className="h-5 w-3/4" delay={delay + 0.2} />
          <AnimatedSkeleton className="h-4 w-full" delay={delay + 0.3} />
          <AnimatedSkeleton className="h-4 w-2/3" delay={delay + 0.4} />
        </div>
      </div>
      <div className="flex justify-between">
        <AnimatedSkeleton className="h-6 w-20 rounded-full" delay={delay + 0.5} />
        <AnimatedSkeleton className="h-6 w-16 rounded-full" delay={delay + 0.6} />
      </div>
    </motion.div>
  );
}

interface TestLoadingSkeletonProps {
  questionsCount?: number;
}

function TestLoadingSkeleton({ questionsCount = 5 }: TestLoadingSkeletonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="bg-white/80 backdrop-blur-sm border-b mb-8 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <AnimatedSkeleton className="h-6 w-48" />
            <AnimatedSkeleton className="h-5 w-20" />
          </div>
          <AnimatedSkeleton className="h-2 w-full rounded-full" delay={0.1} />
        </div>

        {/* Question skeleton */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <AnimatedSkeleton className="h-4 w-32 mx-auto mb-4" />
            <AnimatedSkeleton className="h-8 w-3/4 mx-auto mb-2" delay={0.1} />
            <AnimatedSkeleton className="h-8 w-1/2 mx-auto" delay={0.2} />
          </div>

          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-xl border-2 border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <AnimatedSkeleton className="w-6 h-6 rounded-full mt-1" />
                  <div className="flex-1 space-y-2">
                    <AnimatedSkeleton className="h-5 w-full" />
                    <AnimatedSkeleton className="h-5 w-3/4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation skeleton */}
        <div className="bg-white/80 backdrop-blur-sm border-t mt-8 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <AnimatedSkeleton className="h-10 w-24 rounded-lg" />
            <div className="flex space-x-2">
              {[...Array(questionsCount)].map((_, i) => (
                <AnimatedSkeleton 
                  key={i}
                  className="w-3 h-3 rounded-full" 
                  delay={0.8 + i * 0.05}
                />
              ))}
            </div>
            <AnimatedSkeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton, AnimatedSkeleton, TestCardSkeleton, TestLoadingSkeleton }
