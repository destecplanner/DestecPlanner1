import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest font-bold transition-all select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-teal-500/10 text-teal-400",
        secondary: "border-transparent bg-slate-800/40 text-slate-400",
        destructive: "border-transparent bg-rose-500/10 text-rose-500",
        outline: "border-white/10 text-slate-300",
        success: "border-transparent bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-5px_rgba(52,211,153,0.3)]",
        warning: "border-transparent bg-amber-500/10 text-amber-500",
        glass: "bg-white/5 backdrop-blur-md border-white/10 text-white",
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
