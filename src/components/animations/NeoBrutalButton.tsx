'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

interface NeoBrutalButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof Button> {
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
  disabled?: boolean;
}

const colorClasses = {
  yellow: 'bg-chart-1 hover:bg-chart-1/90',
  blue: 'bg-chart-2 hover:bg-chart-2/90',
  orange: 'bg-chart-3 hover:bg-chart-3/90',
  green: 'bg-chart-4 hover:bg-chart-4/90',
  purple: 'bg-chart-5 hover:bg-chart-5/90',
};

export function NeoBrutalButton({
  children,
  className,
  color = 'yellow',
  variant,
  size,
  disabled,
  ...props
}: NeoBrutalButtonProps) {
  return (
    <motion.div
      whileHover={!disabled ? { x: -2, y: -2 } : {}}
      whileTap={!disabled ? { x: 4, y: 4 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn("inline-block", className?.includes('w-full') ? 'w-full' : '')}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn(colorClasses[color], 'relative overflow-hidden', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

interface NeoBrutalIconButtonProps
  extends Omit<
    React.ComponentProps<'button'>,
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
  > {
  icon: React.ReactNode;
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
  size?: 'sm' | 'default' | 'lg';
}

export function NeoBrutalIconButton({
  icon,
  color = 'yellow',
  size = 'default',
  className,
  ...props
}: NeoBrutalIconButtonProps) {
  const sizeClasses = {
    sm: 'size-10',
    default: 'size-12',
    lg: 'size-14',
  };

  return (
    <motion.button
      className={cn(
        'border-2 border-border shadow-[4px_4px_0px_0px_theme(colors.border)]',
        'flex items-center justify-center font-bold cursor-pointer',
        colorClasses[color],
        sizeClasses[size],
        'transition-all duration-300',
        className
      )}
      whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px var(--border)' }}
      whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px 0px var(--border)' }}
      {...props}
    >
      {icon}
    </motion.button>
  );
}

interface NeoBrutalFloatingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
}

export function NeoBrutalFloatingButton({
  children,
  onClick,
  position = 'bottom-right',
  color = 'yellow',
}: NeoBrutalFloatingButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  return (
    <motion.button
      className={cn(
        'fixed z-50 size-16',
        'border-2 border-border shadow-[4px_4px_0px_0px_theme(colors.border)]',
        'flex items-center justify-center font-bold cursor-pointer',
        colorClasses[color],
        positionClasses[position]
      )}
      animate={{
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        x: -2,
        y: -2,
        boxShadow: '6px 6px 0px 0px var(--border)',
      }}
      whileTap={{
        scale: 0.9,
        x: 4,
        y: 4,
        boxShadow: '0px 0px 0px 0px var(--border)',
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

interface NeobrutalToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
}

export function NeoBrutalToggleButton({
  isActive,
  onToggle,
  activeIcon,
  inactiveIcon,
  activeColor = 'bg-chart-4',
  inactiveColor = 'bg-secondary-background',
}: NeobrutalToggleButtonProps) {
  return (
    <motion.button
      className={cn(
        'size-12 border-2 border-border',
        'flex items-center justify-center font-bold cursor-pointer',
        'transition-colors duration-200',
        isActive ? activeColor : inactiveColor
      )}
      animate={{
        boxShadow: isActive ? '6px 6px 0px 0px var(--border)' : '4px 4px 0px 0px var(--border)',
        x: isActive ? -2 : 0,
        y: isActive ? -2 : 0,
      }}
      whileHover={{
        x: -2,
        y: -2,
        boxShadow: '6px 6px 0px 0px var(--border)',
      }}
      whileTap={{
        x: 4,
        y: 4,
        boxShadow: '0px 0px 0px 0px var(--border)',
      }}
      onClick={onToggle}
    >
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {isActive ? activeIcon : inactiveIcon}
      </motion.div>
    </motion.button>
  );
}
