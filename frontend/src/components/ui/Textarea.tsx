import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-white/5 bg-slate-900/40 px-6 py-4 text-sm text-slate-100 ring-offset-background placeholder:text-slate-600 focus-visible:outline-none focus-visible:border-teal-500/50 focus-visible:ring-1 focus-visible:ring-teal-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
