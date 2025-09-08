'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeoCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  color?: 'white' | 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
  hover?: boolean;
  className?: string;
}

const colorClasses = {
  white: 'bg-secondary-background',
  yellow: 'bg-chart-1',
  blue: 'bg-chart-2',
  orange: 'bg-chart-3',
  green: 'bg-chart-4',
  purple: 'bg-chart-5',
};

export function NeoCard({
  children,
  color = 'white',
  hover = false,
  className,
  ...props
}: NeoCardProps) {
  return (
    <motion.div
      className={cn(
        'border-2 border-border shadow-[4px_4px_0px_0px_theme(colors.border)] rounded-[15px] overflow-hidden',
        colorClasses[color],
        hover && 'transition-all duration-300 cursor-pointer',
        className
      )}
      whileHover={
        hover
          ? {
              x: -2,
              y: -2,
              boxShadow: '6px 6px 0px 0px var(--border)',
            }
          : {}
      }
      whileTap={
        hover
          ? {
              x: 4,
              y: 4,
              boxShadow: '0px 0px 0px 0px var(--border)',
            }
          : {}
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface NeoCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function NeoCardHeader({ children, className }: NeoCardHeaderProps) {
  return <div className={cn('border-b-2 border-border p-6', className)}>{children}</div>;
}

interface NeoCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function NeoCardContent({ children, className }: NeoCardContentProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

interface NeoCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function NeoCardFooter({ children, className }: NeoCardFooterProps) {
  return <div className={cn('border-t-2 border-border p-6', className)}>{children}</div>;
}

interface NeoBadgeProps {
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
  className?: string;
}

export function NeoBadge({ children, color = 'yellow', className }: NeoBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1',
        'border-2 border-border rounded-[15px]',
        'text-xs font-bold uppercase',
        'shadow-[2px_2px_0px_0px_theme(colors.border)]',
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}

interface NeoStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function NeoStatCard({
  title,
  value,
  description,
  icon,
  color = 'yellow',
  trend,
  trendValue,
}: NeoStatCardProps) {
  const trendColors = {
    up: 'text-chart-4',
    down: 'text-chart-3',
    neutral: 'text-foreground',
  };

  return (
    <NeoCard color={color} hover={false} className="relative overflow-hidden rounded-[15px]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase text-foreground/80">{title}</h3>
            <p className="text-3xl font-heading mt-2">{value}</p>
          </div>
          {icon && <div className="text-2xl opacity-80">{icon}</div>}
        </div>
        {description && <p className="text-sm text-foreground/60">{description}</p>}
        {trend && trendValue && (
          <div className={cn('text-sm font-bold mt-2', trendColors[trend])}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'neutral' && '→'} {trendValue}
          </div>
        )}
      </div>
      {/* Decorative corner */}
      <div className="absolute -bottom-2 -right-2 size-8 border-2 border-border bg-main rotate-45" />
    </NeoCard>
  );
}

interface NeoAccordionProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

export function NeoAccordion({ items }: NeoAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={cn(
            'border-2 border-border overflow-hidden',
            'shadow-[4px_4px_0px_0px_theme(colors.border)]',
            'bg-secondary-background'
          )}
          animate={{
            boxShadow:
              openIndex === index
                ? '6px 6px 0px 0px var(--border)'
                : '4px 4px 0px 0px var(--border)',
            x: openIndex === index ? -2 : 0,
            y: openIndex === index ? -2 : 0,
          }}
        >
          <button
            className={cn(
              'w-full p-4 text-left font-bold uppercase cursor-pointer',
              'flex items-center justify-between',
              'transition-colors duration-200',
              openIndex === index ? 'bg-main text-main-foreground' : 'hover:bg-main/10'
            )}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.title}
            <motion.span
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl"
            >
              ▼
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? 'auto' : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t-2 border-border">{item.content}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
