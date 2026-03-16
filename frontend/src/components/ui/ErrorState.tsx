import * as React from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  message = "An unexpected error occurred while loading this section.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center glass rounded-3xl border-rose-500/10 bg-rose-500/5",
        className
      )}
    >
      <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 mb-6 border border-rose-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="max-w-xs space-y-2 mb-8 px-6">
        <h3 className="text-white font-bold text-lg">Operational Error</h3>
        <p className="text-rose-200/50 text-xs leading-relaxed italic">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="rounded-xl px-8 border-rose-500/20 text-rose-400 hover:bg-rose-500/10 h-11 text-xs uppercase tracking-widest font-bold">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Retry Operation
        </Button>
      )}
    </div>
  )
}
