'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NeoBrutalButton } from '@/components/animations/NeoBrutalButton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EngagementNotificationProps {
  timeThreshold?: number; // в миллисекундах
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

interface NotificationMessage {
  title: string;
  description: string;
  action?: {
    text: string;
    href: string;
  };
}

const messages: NotificationMessage[] = [
  {
    title: 'Спасибо за интерес к нашим тестам!',
    description: 'Изучаете внимательно? Отлично! Попробуйте пройти тест.',
    action: {
      text: 'Выбрать тест',
      href: '/tests'
    }
  },
  {
    title: 'Находите что-то интересное?',
    description: 'У нас 58 тестов в трёх категориях. Найдите свой!',
    action: {
      text: 'К каталогу',
      href: '/tests'
    }
  },
  {
    title: 'Отличное внимание к деталям!',
    description: 'Такая внимательность пригодится в наших тестах.',
    action: {
      text: 'Начать тест',
      href: '/tests'
    }
  }
];

export function EngagementNotification({ 
  timeThreshold = 300000, // 5 минут по умолчанию
  position = 'bottom-right' 
}: EngagementNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Проверяем, показывали ли уже уведомление в этой сессии
    const shownInSession = sessionStorage.getItem('engagement-notification-shown');
    
    if (shownInSession) {
      setHasBeenShown(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasBeenShown) {
        setShowNotification(true);
        // Выбираем случайное сообщение
        setMessageIndex(Math.floor(Math.random() * messages.length));
        // Отмечаем, что показали уведомление
        sessionStorage.setItem('engagement-notification-shown', 'true');
        setHasBeenShown(true);

        // Автоскрытие через 15 секунд
        setTimeout(() => {
          setShowNotification(false);
        }, 15000);
      }
    }, timeThreshold);

    return () => clearTimeout(timer);
  }, [timeThreshold, hasBeenShown]);

  const handleClose = () => {
    setShowNotification(false);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const currentMessage = messages[messageIndex];

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className={cn(
            "fixed z-50 max-w-sm",
            positionClasses[position]
          )}
          initial={{ 
            opacity: 0, 
            y: position.includes('bottom') ? 100 : -100,
            scale: 0.8 
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1 
          }}
          exit={{ 
            opacity: 0, 
            y: position.includes('bottom') ? 100 : -100,
            scale: 0.8 
          }}
          transition={{ 
            type: "spring", 
            duration: 0.6,
            bounce: 0.3
          }}
        >
          <div className={cn(
            "relative p-6 bg-chart-1",
            "border-2 border-border",
            "shadow-[6px_6px_0px_0px_theme(colors.border)]"
          )}>
            {/* Кнопка закрытия */}
            <button
              onClick={handleClose}
              className={cn(
                "absolute -top-2 -right-2",
                "w-8 h-8 bg-secondary-background",
                "border-2 border-border",
                "shadow-[2px_2px_0px_0px_theme(colors.border)]",
                "flex items-center justify-center",
                "hover:translate-x-0.5 hover:translate-y-0.5",
                "hover:shadow-[1px_1px_0px_0px_theme(colors.border)]",
                "transition-all duration-200"
              )}
              aria-label="Закрыть уведомление"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Контент */}
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-bold uppercase">
                {currentMessage.title}
              </h3>
              
              <p className="text-sm text-foreground/80">
                {currentMessage.description}
              </p>

              {currentMessage.action && (
                <Link href={currentMessage.action.href}>
                  <NeoBrutalButton
                    variant="secondary"
                    size="sm"
                    className="w-full mt-4"
                  >
                    {currentMessage.action.text}
                  </NeoBrutalButton>
                </Link>
              )}
            </div>

            {/* Декоративный элемент */}
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-chart-3 border-2 border-border rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Альтернативная версия для использования с Sonner toast
export function showEngagementToast() {
  // Эта функция может быть использована с Sonner для более простой интеграции
  const messages = [
    'Спасибо за интерес к нашим тестам!',
    'Находите что-то интересное? Попробуйте пройти тест!',
    'Отличное внимание к деталям! Это пригодится в наших тестах.'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  // Здесь можно вызвать toast из Sonner
  // toast(randomMessage, { ... });
  
  return randomMessage;
}