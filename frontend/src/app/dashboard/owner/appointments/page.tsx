"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/Table"
import { 
  Calendar, 
  Search, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  User,
  Zap
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AppointmentsPage() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled" | "completed">("all")

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: async () => {
      const res = await api.get("/v1/bookings", { params: { status: filter === "all" ? undefined : filter } })
      return res.data.data
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await api.patch(`/v1/bookings/${id}/status`, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
      toast.success("Appointment status updated")
    }
  })

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Appointments</h1>
          <p className="text-slate-500">Manage your bookings, track performance, and coordinate with staff.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 glass rounded-xl gap-2">
            <Calendar className="w-4 h-4 text-teal-400" />
            Calendar View
          </Button>
          <Button className="rounded-xl glow-teal gap-2">
            <Zap className="w-4 h-4" />
            New Booking
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center glass p-4 rounded-2xl border border-white/5">
        <div className="flex gap-2 p-1 glass rounded-xl">
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                filter === s
                  ? "bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            className="w-full bg-slate-900/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:ring-teal-500/50"
            placeholder="Search customer..."
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Specialist</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <TableRow key={i} className="animate-pulse">
                <TableCell colSpan={6}>
                  <div className="h-4 bg-white/5 rounded w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : appointments?.map((app: any) => (
            <TableRow key={app.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-teal-400 font-bold shrink-0">
                    {app.customer?.name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">{app.customer?.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-0.5">
                      {app.customer?.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500/50" />
                  <span className="text-sm text-slate-300 font-medium">{app.service?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="text-white font-bold">{app.start_time}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-medium">
                    {format(new Date(app.appointment_date), "MMM dd, yyyy")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-slate-400 text-sm italic">
                  <User className="w-3.5 h-3.5" />
                  {app.staff?.user?.name}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={app.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {app.status === "pending" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
                      onClick={() => updateStatusMutation.mutate({ id: app.id, status: "confirmed" })}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  )}
                  {app.status !== "cancelled" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      onClick={() => updateStatusMutation.mutate({ id: app.id, status: "cancelled" })}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-500">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {!isLoading && !appointments?.length && (
            <TableRow>
              <TableCell colSpan={6} className="py-24 text-center text-slate-500 italic">
                No appointments found matches the criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-500 border-amber-500/20",
    confirmed: "bg-teal-500/20 text-teal-500 border-teal-500/20 shadow-[0_0_15px_-5px_rgba(20,184,166,0.3)]",
    completed: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
    cancelled: "bg-rose-500/20 text-rose-500 border-rose-500/20",
  }

  return (
    <Badge
      className={cn(
        "px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold border",
        styles[status] || "bg-slate-500/20 text-slate-500"
      )}
    >
      {status}
    </Badge>
  )
}
