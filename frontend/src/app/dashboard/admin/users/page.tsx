"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { Card, CardContent } from "@/components/ui/Card"
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
  MoreHorizontal, 
  User, 
  Mail, 
  Shield, 
  Lock,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users", roleFilter],
    queryFn: async () => {
      const res = await api.get("/v1/admin/users", { 
        params: { role: roleFilter === "all" ? undefined : roleFilter } 
      })
      return res.data.data
    }
  })

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Platform Users</h1>
          <p className="text-slate-500">Overview of all active accounts across customers, owners, and administrators.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-sm text-white focus:ring-teal-500/50" placeholder="Search user..." />
          </div>
          <Button variant="outline" className="border-white/10 glass rounded-xl gap-2 h-10">
            <Filter className="w-4 h-4 text-teal-400" />
            Filter
          </Button>
        </div>
      </header>

      <div className="flex gap-4 p-1 glass rounded-2xl border border-white/5 w-fit">
        {["all", "customer", "owner", "admin"].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={cn(
              "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
              roleFilter === role 
                ? "bg-teal-500 text-white shadow-lg glow-teal" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {role}s
          </button>
        ))}
      </div>

      <Card className="border-white/5 glass">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identity</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Security</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i} className="animate-pulse">
                   <TableCell colSpan={5}><div className="h-6 bg-white/5 rounded" /></TableCell>
                </TableRow>
              ))
            ) : users?.map((u: any) => (
              <TableRow key={u.id} className="group hover:bg-white/[0.01]">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{u.name}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5 italic">ID: #{u.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-[11px] text-slate-400">
                     <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-teal-500/50" /> {u.email}</span>
                     <span className="text-[9px] text-slate-600 font-medium ml-4.5 italic">Member since Jan 2026</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-[8px] uppercase font-heavy tracking-[0.1em]",
                    u.role === 'admin' ? "bg-rose-500/10 text-rose-500 border-rose-500/10" :
                    u.role === 'owner' ? "bg-teal-500/10 text-teal-400 border-teal-500/10" :
                    "bg-blue-500/10 text-blue-400 border-blue-500/10"
                  )}>
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                   <div className="flex items-center justify-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-slate-600 italic">2FA Active</span>
                   </div>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg hover:bg-rose-500/5 text-slate-700 hover:text-rose-500 transition-all">
                          <Lock className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg hover:bg-white/5">
                          <MoreHorizontal className="w-4 h-4 text-slate-600" />
                       </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
