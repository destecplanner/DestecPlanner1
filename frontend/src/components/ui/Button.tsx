import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-bold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-700/30",
        destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20",
        outline: "border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300",
        secondary: "bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
        link: "text-teal-600 underline-offset-4 hover:underline",
        glass: "bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 hover:bg-white",
        premium: "bg-slate-900 text-white border border-slate-800 hover:bg-black glow-teal shadow-xl",
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
