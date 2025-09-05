import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[15px] font-bold uppercase transition-all cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border-2 border-border shadow-[4px_4px_0px_0px_theme(colors.border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_theme(colors.border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: 'bg-main text-main-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-background text-foreground hover:bg-secondary-background',
        secondary: 'bg-secondary-background text-foreground',
        ghost:
          'shadow-none border-0 hover:bg-secondary-background hover:shadow-none hover:translate-x-0 hover:translate-y-0',
        link: 'shadow-none border-0 text-primary underline-offset-4 hover:underline hover:shadow-none hover:translate-x-0 hover:translate-y-0',
        yellow: 'bg-chart-1 text-foreground',
        blue: 'bg-chart-2 text-foreground',
        orange: 'bg-chart-3 text-foreground',
        green: 'bg-chart-4 text-foreground',
        purple: 'bg-chart-5 text-foreground',
      },
      size: {
        default: 'h-12 px-6 text-sm',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
