'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'scale' | 'rotate' | 'blur';
}

const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  rotate: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
    transition: { duration: 0.6 }
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.4 }
  }
};

export function PageTransition({ 
  children, 
  className = '', 
  variant = 'fade' 
}: PageTransitionProps) {
  const transitionConfig = transitions[variant];
  
  return (
    <motion.div
      className={className}
      initial={transitionConfig.initial}
      animate={transitionConfig.animate}
      exit={transitionConfig.exit}
      transition={transitionConfig.transition}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerChildren = 0.1,
  delayChildren = 0,
  className = '' 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}

export function StaggerItem({ 
  children, 
  className = '',
  y = 20,
  duration = 0.5 
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: y 
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            duration,
            type: "spring",
            stiffness: 100,
            damping: 12
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface RouteTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export function RouteTransition({ children, routeKey }: RouteTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function SlideTransition({ 
  children, 
  direction, 
  className = '' 
}: SlideTransitionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100 };
      case 'right': return { x: 100 };
      case 'up': return { y: -100 };
      case 'down': return { y: 100 };
      default: return { x: 0, y: 0 };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case 'left': return { x: 100 };
      case 'right': return { x: -100 };
      case 'up': return { y: 100 };
      case 'down': return { y: -100 };
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...getExitPosition() }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}