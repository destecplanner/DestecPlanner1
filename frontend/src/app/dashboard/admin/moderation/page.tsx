"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { 
  Star, 
  ShieldAlert, 
  Trash2, 
  Clock, 
  ExternalLink,
  MessageSquare,
  Flag
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function AdminModerationPage() {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin-moderation"],
    queryFn: async () => {
      // Prototype endpoint for reported items or recent reviews
      const res = await api.get("/v1/admin/stats") 
      return [] // Placeholder for report listing
    }
  })

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Sistem Denetimi</h1>
          <p className="text-slate-500">Topluluk geri bildirimlerini izleyin, raporları yönetin ve platform standartlarını koruyun.</p>
        </div>
        <div className="flex bg-rose-500/5 p-1 rounded-xl glass border border-rose-500/10">
           <div className="px-5 py-2.5 bg-rose-500 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white shadow-xl">Acil İşaretler</div>
           <div className="px-5 py-2.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-slate-300 cursor-pointer">Tüm Aktivite</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Pending Reports
           </h2>

           <div className="space-y-6">
              {[1, 2].map(i => (
                <Card key={i} className="group overflow-hidden border-rose-500/10 bg-rose-500/[0.02] hover:border-rose-500/30 transition-all">
                   <div className="p-8">
                      <div className="flex flex-col md:flex-row gap-8">
                         <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-rose-500/40 shrink-0">
                            <Flag className="w-8 h-8" />
                         </div>
                         <div className="flex-1 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                               <div>
                                  <h3 className="text-lg font-bold text-white">Suspected Fake Review</h3>
                                  <p className="text-[10px] text-rose-400 uppercase tracking-widest font-heavy mt-1">Reported by: System Guard AI</p>
                               </div>
                               <Badge className="bg-rose-500 text-white border-rose-500 text-[8px] uppercase tracking-widest px-4 h-6">High Risk</Badge>
                            </div>
                            <div className="p-5 glass rounded-2xl bg-slate-950/40 border-white/5 italic text-slate-300 text-sm leading-relaxed">
                               "This business is amazing! I've been there 100 times in the last hour and every time it was perfect."
                            </div>
                            <div className="flex items-center gap-6 text-[10px] text-slate-500 font-medium">
                               <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {i === 1 ? '14 dakika önce' : '2 saat önce'}</span>
                               <span className="flex items-center gap-1.5 text-teal-400 cursor-pointer hover:underline"><ExternalLink className="w-3.5 h-3.5" /> Yorum Kaynağını Görüntüle</span>
                            </div>
                         </div>
                         <div className="flex md:flex-col gap-3 shrink-0">
                            <Button className="w-12 h-12 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg glow-rose/20">
                               <Trash2 className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" className="w-12 h-12 rounded-xl bg-white/5 text-slate-500 hover:text-white border border-white/5">
                               <Clock className="w-5 h-5" />
                            </Button>
                         </div>
                      </div>
                   </div>
                </Card>
              ))}
           </div>
        </div>

        <aside className="space-y-10">
           <Card className="border-teal-500/10 bg-teal-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Moderation Intelligence</CardTitle>
                <CardDescription className="italic text-xs leading-relaxed">Our AI models have filtered 42 suspected spam reviews today.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>Spam Detection Accuracy</span>
                       <span className="text-teal-400">98.4%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                       <div className="w-[98%] h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-white/5">
              <CardHeader>
                <CardTitle>Recent Moderation Log</CardTitle>
              </CardHeader>
              <CardContent className="p-0 border-t border-white/5">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="p-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-slate-700">
                            <Trash2 className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold text-slate-200">Review Deleted</p>
                            <p className="text-[9px] text-slate-600 italic">Moderator: #Admin14</p>
                         </div>
                      </div>
                      <span className="text-[9px] text-slate-700">2h ago</span>
                   </div>
                 ))}
              </CardContent>
           </Card>
        </aside>
      </div>
    </div>
  )
}
