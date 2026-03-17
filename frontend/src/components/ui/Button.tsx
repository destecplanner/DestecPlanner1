import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-black tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-[0_10px_30px_-5px_rgba(63,176,172,0.3)] hover:brightness-105 hover:shadow-[0_15px_35px_-5px_rgba(63,176,172,0.4)] hover:-translate-y-0.5",
        destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-xl shadow-rose-500/10",
        outline: "border-2 border-stone-100 bg-white text-slate-800 hover:bg-stone-50 hover:border-stone-200",
        secondary: "bg-stone-100 border border-stone-200 text-slate-900 hover:bg-stone-200",
        ghost: "hover:bg-stone-100 text-slate-600 hover:text-slate-900",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/90 backdrop-blur-md border border-white text-slate-900 shadow-sm hover:bg-white",
        premium: "bg-slate-900 text-white border border-slate-800 hover:bg-black shadow-2xl shadow-black/20",
      },
      size: {
        default: "h-14 px-10 rounded-full",
        sm: "h-11 rounded-full px-6 text-xs uppercase tracking-widest font-black",
        lg: "h-20 rounded-full px-14 text-xl font-black",
        icon: "h-12 w-12 rounded-2xl",
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
