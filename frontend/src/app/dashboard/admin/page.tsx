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
      title: "Toplam Gelir",
      value: "₺" + (stats?.total_revenue || "0.00"),
      description: "geçen aydan beri +12.5%",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      title: "Aktif İşletmeler",
      value: stats?.active_businesses || 0,
      description: "24 onay bekliyor",
      icon: Store,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-100"
    },
    {
      title: "Platform Kullanıcıları",
      value: stats?.total_users || 0,
      description: "bu hafta 84 yeni",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: "Sistem Sağlığı",
      value: "99.9%",
      description: "Tüm sistemler çalışıyor",
      icon: Activity,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    }
  ]

  return (
    <div className="space-y-12 pb-10">
      <header>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Platform Özeti</h1>
        <p className="text-slate-500 font-medium">Gerçek zamanlı sistem metrikleri, finansal büyüme ve platform sağlık izleme.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white border border-slate-100 rounded-[2rem] animate-pulse" />)
        ) : (
          cards.map((card, i) => (
            <Card key={i} className={cn("border-slate-100 bg-white hover:border-teal-500/20 transition-all group overflow-hidden rounded-[2rem] shadow-sm hover:shadow-md")}>
               <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 group-hover:opacity-100 transition-opacity", card.bg)} />
               <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border", card.bg, card.color, card.border)}>
                        <card.icon className="w-6 h-6" />
                     </div>
                     <TrendingUp className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold italic">{card.description}</p>
                  </div>
               </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <Card className="lg:col-span-2 border-slate-100 bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
            <CardHeader className="p-8 pb-0">
               <CardTitle className="flex items-center gap-2 text-slate-900 font-black">
                  <Zap className="w-5 h-5 text-teal-600" />
                  Sistem Aktivitesi
               </CardTitle>
               <CardDescription className="text-slate-500 font-medium">
                  Platform trafiği ve randevu hacminin ayrıntılı dökümü.
               </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center border-t border-slate-50 mt-8">
                <p className="text-slate-400 italic text-sm font-medium">Etkileşimli Analiz Grafiği v2.0 sürümünde gelecek</p>
            </CardContent>
         </Card>

         <Card className="border-slate-100 bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
            <CardHeader className="p-8">
               <CardTitle className="text-slate-900 font-black">Son Uyarılar</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
               <div className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 hover:border-amber-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-amber-100">
                     <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Yüksek Trafik Uyarısı</h4>
                    <p className="text-[10px] text-amber-700 font-medium font-medium">Randevu motorunda son 2 saatte %140 artış yaşandı.</p>
                  </div>
               </div>
               <div className="flex gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-100 hover:border-teal-300 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-600 shrink-0 shadow-sm border border-teal-100">
                     <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Kuyruk Senkronizasyonu</h4>
                    <p className="text-[10px] text-teal-700 font-medium">Arka plan çalışanları 3.421 müsaitlik yuvasını senkronize etti.</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
