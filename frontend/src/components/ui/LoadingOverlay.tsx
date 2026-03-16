import { cn } from "@/lib/utils"

interface LoadingOverlayProps {
  className?: string
  variant?: 'full' | 'inner'
}

export function LoadingOverlay({ className, variant = 'inner' }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-slate-950/20 backdrop-blur-sm z-40 transition-all",
        variant === 'full' ? "fixed inset-0" : "absolute inset-0 rounded-inherit",
        className
      )}
    >
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute inset-[-20px] bg-teal-500/10 blur-2xl rounded-full animate-pulse" />
        
        {/* Spinner */}
        <div className="w-10 h-10 border-2 border-white/5 border-t-teal-500 rounded-full animate-spin relative z-10" />
        
        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-teal-500 rounded-full" />
      </div>
    </div>
  )
}
