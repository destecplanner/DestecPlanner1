import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-24 text-center glass rounded-[3rem] border-dashed border-white/10",
        className
      )}
    >
      <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700 mb-8">
        <Icon className="w-10 h-10" />
      </div>
      <div className="max-w-xs space-y-2 mb-8">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed italic">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-xl px-10 h-14 glow-teal">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
