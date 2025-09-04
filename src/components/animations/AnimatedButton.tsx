'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  animation?: 'bounce' | 'scale' | 'shake' | 'pulse' | 'glow' | 'float';
  children: React.ReactNode;
  asChild?: boolean;
}

const animations: Record<string, Partial<MotionProps>> = {
  bounce: {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  shake: {
    whileHover: { 
      x: [0, -2, 2, -2, 2, 0],
      transition: { duration: 0.4 }
    },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  pulse: {
    whileHover: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: Infinity }
    },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  glow: {
    whileHover: { 
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
      scale: 1.02
    },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  float: {
    animate: { 
      y: [0, -4, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    whileHover: { y: -6 },
    whileTap: { y: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

export function AnimatedButton({ 
  animation = 'bounce', 
  className,
  children,
  variant,
  size,
  asChild = false,
  ...props 
}: AnimatedButtonProps) {
  const animationProps = animations[animation];
  
  return (
    <motion.div
      {...animationProps}
      className="inline-block"
    >
      <Button
        variant={variant}
        size={size}
        asChild={asChild}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <motion.span
          className="relative z-10"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1 }}
        >
          {children}
        </motion.span>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-md"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    </motion.div>
  );
}

interface MagicButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  sparkles?: boolean;
  asChild?: boolean;
}

export function MagicButton({ 
  children, 
  sparkles = true, 
  className, 
  variant,
  size,
  asChild = false,
  ...props 
}: MagicButtonProps) {
  return (
    <motion.div className="relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur-lg opacity-30"
        animate={{
          background: [
            "linear-gradient(45deg, #9333ea, #ec4899, #3b82f6)",
            "linear-gradient(45deg, #ec4899, #3b82f6, #9333ea)",
            "linear-gradient(45deg, #3b82f6, #9333ea, #ec4899)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <Button
        variant={variant}
        size={size}
        asChild={asChild}
        className={cn(
          "relative z-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg",
          className
        )}
        {...props}
      >
        {children}
        
        {sparkles && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        )}
      </Button>
    </motion.div>
  );
}

interface FloatingActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

export function FloatingActionButton({ 
  children, 
  onClick, 
  className,
  variant = 'primary' 
}: FloatingActionButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    warning: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
  };

  return (
    <motion.button
      className={cn(
        "fixed bottom-8 right-8 w-14 h-14 rounded-full text-white shadow-2xl z-50 flex items-center justify-center",
        variants[variant],
        className
      )}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        y: [0, -5, 0],
        boxShadow: [
          "0 10px 25px rgba(0,0,0,0.3)",
          "0 15px 35px rgba(0,0,0,0.4)",
          "0 10px 25px rgba(0,0,0,0.3)"
        ]
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}