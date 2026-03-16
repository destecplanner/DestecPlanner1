"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { 
  Users, 
  Store, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminStatsPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await api.get("/v1/admin/stats")
      return res.data.data
    }
  })

  const cards = [
    {
      title: "Total Revenue",
      value: "₺" + (stats?.total_revenue || "0.00"),
      description: "+12.5% from last month",
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Active Businesses",
      value: stats?.active_businesses || 0,
      description: "24 pending approval",
      icon: Store,
      color: "text-teal-400",
      bg: "bg-teal-500/10"
    },
    {
      title: "Platform Users",
      value: stats?.total_users || 0,
      description: "84 new this week",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "System Health",
      value: "99.9%",
      description: "All systems operational",
      icon: Activity,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    }
  ]

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Platform Overview</h1>
        <p className="text-slate-500">Real-time system metrics, financial growth, and platform health monitoring.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-32 glass rounded-3xl animate-pulse" />)
        ) : (
          cards.map((card, i) => (
            <Card key={i} className="border-white/5 bg-slate-900/40 hover:border-teal-500/20 transition-all group overflow-hidden">
               <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 group-hover:opacity-100 transition-opacity", card.bg.replace('/10', '/5'))} />
               <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                     <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-lg", card.bg, card.color)}>
                        <card.icon className="w-6 h-6" />
                     </div>
                     <TrendingUp className="w-4 h-4 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{card.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white tracking-tight">{card.value}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 italic font-medium">{card.description}</p>
                  </div>
               </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <Card className="lg:col-span-2 border-white/5 glass">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  System Activity
               </CardTitle>
               <CardDescription>
                  Detailed breakdown of platform traffic and booking volume (Placeholder).
               </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center border-t border-white/5">
                <p className="text-slate-600 italic text-sm">Interactive Analytics Chart coming in v2.0</p>
            </CardContent>
         </Card>

         <Card className="border-white/5">
            <CardHeader>
               <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex gap-4 p-4 glass rounded-2xl border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                     <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">High Traffic Warning</h4>
                    <p className="text-[10px] text-slate-500">Booking engine experienced 140% surge in last 2 hours.</p>
                  </div>
               </div>
               <div className="flex gap-4 p-4 glass rounded-2xl border-white/5 hover:border-teal-500/20 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                     <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Queue Sync Complete</h4>
                    <p className="text-[10px] text-slate-500">Background workers synchronized 3,421 availability slots.</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
