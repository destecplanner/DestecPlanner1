import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-bold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.5)] hover:bg-teal-500",
        destructive: "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white shadow-sm",
        outline: "border-2 border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20",
        secondary: "bg-slate-900 border border-white/5 text-slate-300 hover:text-white hover:bg-slate-800",
        ghost: "hover:bg-white/5 text-slate-400 hover:text-white",
        link: "text-teal-500 underline-offset-4 hover:underline",
        glass: "glass text-slate-100 hover:bg-white/10 hover:border-white/20",
        premium: "bg-slate-950 text-white border border-white/10 hover:border-teal-500/40 glow-teal hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.2)]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-xl px-4 text-xs uppercase tracking-widest",
        lg: "h-16 rounded-[1.5rem] px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), isLoading && "opacity-80 cursor-wait")}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
