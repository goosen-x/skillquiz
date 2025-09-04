'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'brain' | 'heart';
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full bg-indigo-500 ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'}`}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 ${sizeClasses[size]} ${className}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  if (variant === 'brain') {
    return (
      <motion.div className={`${className} flex items-center justify-center`}>
        <motion.div
          className={`${sizeClasses[size]} text-purple-500`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🧠
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'heart') {
    return (
      <motion.div className={`${className} flex items-center justify-center`}>
        <motion.div
          className={`${sizeClasses[size]} text-red-500`}
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          💗
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`border-4 border-gray-200 border-t-indigo-500 rounded-full ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

interface FullPageLoadingProps {
  message?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'brain';
}

export function FullPageLoading({ 
  message = "Загружаем ваш тест...", 
  variant = 'brain' 
}: FullPageLoadingProps) {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" variant={variant} className="mb-6" />
        
        <motion.h2
          className="text-2xl font-semibold text-gray-700 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center space-x-2 text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>Подготавливаем вопросы</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}