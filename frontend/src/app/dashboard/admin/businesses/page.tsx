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
  Search, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  ExternalLink,
  ShieldAlert,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AdminBusinessesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")

  const { data: businesses, isLoading } = useQuery({
    queryKey: ["admin-businesses"],
    queryFn: async () => {
      const res = await api.get("/v1/admin/users", { params: { role: "owner" } })
      return res.data.data
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await api.patch(`/v1/admin/businesses/${id}/status`, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-businesses"] })
      toast.success("İşletme durumu güncellendi")
    }
  })

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">İş Ortakları</h1>
          <p className="text-slate-500">Yeni kayıtları onaylayın, büyümeyi izleyin ve platform erişimini yönetin.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:ring-teal-500/50 transition-all font-medium"
            placeholder="İsim veya kısa ad (slug) ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <Card className="border-white/5 glass">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İşletme ve Sahibi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Kayıt Tarihi</TableHead>
              <TableHead className="text-center">Abonelik</TableHead>
              <TableHead className="text-center">Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={6}>
                    <div className="h-6 bg-white/5 rounded w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : businesses?.map((user: any) => (
              <TableRow key={user.id} className="group hover:bg-white/[0.02]">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-teal-400 font-bold shrink-0 shadow-lg">
                      {user.business_name?.[0] || user.name?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors leading-tight">
                        {user.business_name || "Yeni Ortak"}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-0.5">
                        Sahibi: {user.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="glass" className="bg-slate-950 border-white/5 text-[9px] uppercase tracking-widest px-3 py-1">
                    Berber
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-400 font-medium">Mar 12, 2026</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/10 text-[8px] uppercase font-heavy">Premium</Badge>
                    <span className="text-[9px] text-slate-600 italic">18 gün içinde yenilenir</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={user.status || "active"} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-xl text-teal-400 hover:bg-teal-500/10 border border-transparent hover:border-teal-500/20"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white/5">
                      <MoreHorizontal className="w-5 h-5 text-slate-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {!isLoading && !businesses?.length && (
        <div className="py-24 text-center glass rounded-[3rem] border border-dashed border-white/10">
          <ShieldAlert className="w-12 h-12 text-slate-800 mx-auto mb-6" />
          <h3 className="text-white font-bold text-xl mb-2">İş Ortaklığı Bulunmadı</h3>
          <p className="text-slate-500 text-sm italic">Filtrelerinizi düzenleyin veya platforma yeni işletmeler davet edin.</p>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/10",
    active: "bg-teal-500/10 text-teal-400 border-teal-500/10 shadow-[0_0_15px_-5px_rgba(20,184,166,0.2)]",
    suspended: "bg-rose-500/10 text-rose-500 border-rose-500/10 shadow-[0_0_15px_-5px_rgba(244,63,94,0.2)]",
  }

  return (
    <Badge
      className={cn(
        "px-4 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold border",
        styles[status] || "bg-slate-500/10 text-slate-500"
      )}
    >
      {status === 'pending' ? 'bekliyor' : status === 'active' ? 'aktif' : status === 'suspended' ? 'askıya alındı' : status}
    </Badge>
  )
}
