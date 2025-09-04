'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface ConfettiEffectProps {
  trigger?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  colors?: string[];
  onComplete?: () => void;
}

export function ConfettiEffect({ 
  trigger = false, 
  intensity = 'medium',
  colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
  onComplete
}: ConfettiEffectProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fireConfetti = React.useCallback(() => {
    const intensityConfig = {
      low: { particleCount: 50, spread: 60 },
      medium: { particleCount: 100, spread: 80 },
      high: { particleCount: 200, spread: 100 }
    };

    const config = intensityConfig[intensity];
    
    // First burst
    confetti({
      particleCount: config.particleCount,
      spread: config.spread,
      origin: { y: 0.6 },
      colors: colors,
      gravity: 0.8,
      drift: 0,
      ticks: 200
    });

    // Second burst from left
    setTimeout(() => {
      confetti({
        particleCount: config.particleCount / 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
    }, 250);

    // Third burst from right  
    setTimeout(() => {
      confetti({
        particleCount: config.particleCount / 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });
    }, 500);

    // Cleanup after animation
    timeoutRef.current = setTimeout(() => {
      onComplete?.();
    }, 3000);
  }, [intensity, colors, onComplete]);

  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, fireConfetti]);

  return null;
}

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  emoji?: string;
  confettiColors?: string[];
}

export function CelebrationModal({
  isOpen,
  onClose,
  title,
  message,
  emoji = '🎉',
  confettiColors
}: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 3 seconds
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <ConfettiEffect trigger={isOpen} intensity="high" colors={confettiColors} />
      
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 m-4 max-w-md w-full text-center shadow-2xl"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
          >
            {emoji}
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold text-gray-800 mb-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>

          <motion.div
            className="flex justify-center space-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['⭐', '✨', '🎊'].map((sparkle, index) => (
              <motion.span
                key={index}
                className="text-2xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
              >
                {sparkle}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export function MilestoneToast({ 
  milestone, 
  currentQuestion, 
  totalQuestions 
}: { 
  milestone: number; 
  currentQuestion: number; 
  totalQuestions: number; 
}) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  if (progress < milestone) return null;

  const messages = {
    25: { text: "Отличное начало!", emoji: "🚀" },
    50: { text: "Ты на полпути!", emoji: "⚡" },
    75: { text: "Почти готово!", emoji: "🔥" },
    100: { text: "Невероятно!", emoji: "🎉" }
  };

  const message = messages[milestone as keyof typeof messages];
  
  return (
    <motion.div
      className="fixed top-20 right-4 z-40 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl">{message.emoji}</span>
        <span className="font-semibold">{message.text}</span>
      </div>
    </motion.div>
  );
}