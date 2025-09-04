import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase border-2 border-border shadow-shadow",
  {
    variants: {
      variant: {
        default:
          "bg-main text-main-foreground",
        secondary:
          "bg-secondary-background text-foreground",
        destructive:
          "bg-chart-3 text-foreground",
        outline:
          "bg-background text-foreground",
        success:
          "bg-chart-4 text-foreground",
        warning:
          "bg-chart-1 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }