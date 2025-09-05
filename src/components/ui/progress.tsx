'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  color = 'yellow',
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple' | 'default';
}) {
  const colorClasses = {
    default: 'bg-foreground',
    yellow: 'bg-chart-1',
    blue: 'bg-chart-2',
    orange: 'bg-chart-3',
    green: 'bg-chart-4',
    purple: 'bg-chart-5',
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-6 w-full overflow-hidden rounded-[15px] bg-secondary-background',
        'border-2 border-border shadow-[4px_4px_0px_0px_theme(colors.border)]',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 transition-all duration-300',
          'border-r-2 border-border',
          colorClasses[color]
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
