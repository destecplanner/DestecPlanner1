'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/Table';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight, 
  Zap,
  MoreHorizontal,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['customer-appointments'],
    queryFn: async () => {
      const res = await api.get('/v1/customer/appointments');
      return res.data.data;
    }
  });

  const upcoming = appointments?.filter((a: any) => ['pending', 'confirmed'].includes(a.status)) || [];
  const past = appointments?.filter((a: any) => ['completed', 'cancelled'].includes(a.status)) || [];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Randevularınız</h1>
          <p className="text-slate-600 font-medium">Yaklaşan rezervasyonlarınızı yönetin ve hizmet geçmişinizi inceleyin.</p>
        </div>
        <Button asChild className="rounded-2xl h-14 px-8 glow-teal gap-2 text-lg">
          <Link href="/explore">
            <Zap className="w-5 h-5" />
            Yeni Randevu Al
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Yaklaşan Ziyaretler
            </h2>
            <div className="space-y-6">
              {isLoading ? (
                [1, 2].map(i => <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse" />)
              ) : upcoming.length > 0 ? (
                upcoming.map((app: any) => (
                  <BookingCard key={app.id} appointment={app} />
                ))
              ) : (
                <EmptyState 
                  icon={Calendar}
                  title="Yaklaşan Ziyaret Yok"
                  description="Henüz seçkin bir oturum planlamadınız. Premium pazar yerimizi keşfetmeye başlayın."
                  actionLabel="Hizmetleri Keşfet"
                  onAction={() => window.location.href = '/explore'}
                />
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              Geçmiş Deneyimler
            </h2>
            {isLoading ? (
              <div className="h-48 glass rounded-[2.5rem] animate-pulse" />
            ) : past.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hizmet ve İşletme</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-center">Durum</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {past.map((app: any) => (
                    <TableRow key={app.id} className="group cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors">
                              <Zap className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-bold text-slate-900 leading-tight">{app.service?.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{app.business?.name}</p>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                           <p className="text-slate-900 font-medium">{format(new Date(app.appointment_date), 'MMM dd, yyyy')}</p>
                           <p className="text-[10px] text-slate-400 uppercase">{app.start_time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {app.status === 'completed' && !app.review ? (
                          <Button variant="ghost" size="sm" className="rounded-lg h-9 text-teal-600 hover:bg-teal-50 gap-2" asChild>
                             <Link href={`/dashboard/customer/reviews?appId=${app.id}`}>
                               <Star className="w-3.5 h-3.5" />
                               Değerlendir
                             </Link>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg">
                             <ChevronRight className="w-4 h-4 text-slate-700" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 px-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-sm text-slate-500 text-center font-medium">
                Bizimle yolculuğunuz henüz başlamadı. Geçmiş deneyimleriniz burada görünecek.
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-10">
           <Card className="border-teal-500/10 bg-teal-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-teal-400" />
                  Randevu İpucu
                </CardTitle>
                <CardDescription className="italic leading-relaxed mt-2 text-xs">
                  "5-10 dakika erken gelmek, seçkin hizmet oturumunuzdan en iyi şekilde yararlanmanızı sağlar."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full rounded-xl border-teal-200 text-teal-700 h-12 text-[10px] uppercase font-bold tracking-widest hover:bg-teal-50 shadow-sm">
                   Yeniden Planlama Politikası
                </Button>
              </CardContent>
           </Card>

           <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Yardıma mı İhtiyacınız Var?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-4 glass rounded-xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                       </div>
                       <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Destek Merkezi</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-800" />
                 </div>
                 <div className="flex items-center justify-between p-4 glass rounded-xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                          <Star className="w-4 h-4" />
                       </div>
                       <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Geri Bildirim Bırak</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-800" />
                 </div>
              </CardContent>
           </Card>
        </aside>
      </div>
    </div>
  );
}

function BookingCard({ appointment }: { appointment: any }) {
  return (
    <Card className="group overflow-hidden relative border-slate-100 hover:border-teal-500/20 transition-all bg-white shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl -z-10 group-hover:bg-teal-500/10 transition-colors" />
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-teal-500/20 transition-colors">
             {appointment.business?.logo_url ? (
               <img src={appointment.business.logo_url} className="w-full h-full object-cover" />
             ) : (
               <Zap className="w-10 h-10 text-teal-600 opacity-20" />
             )}
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
             <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 justify-center md:justify-start">
                   <h3 className="text-2xl font-bold text-white">{appointment.service?.name}</h3>
                   <StatusBadge status={appointment.status} />
                </div>
                <p className="text-slate-400 font-medium flex items-center gap-2 justify-center md:justify-start">
                   <MapPin className="w-4 h-4 text-teal-500" />
                   {appointment.business?.name}
                </p>
             </div>

             <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <Calendar className="w-4 h-4 text-teal-500/60" />
                   {format(new Date(appointment.appointment_date), 'EEEE, MMM dd')}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <Clock className="w-4 h-4 text-teal-500/60" />
                   {appointment.start_time}
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
             <Button variant="outline" className="rounded-xl border-slate-200 h-12 gap-2 hover:bg-slate-50 font-bold uppercase tracking-widest text-[10px]">
                <MoreHorizontal className="w-4 h-4" />
                Yönet
             </Button>
             <Button variant="ghost" className="rounded-xl h-12 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-[10px] font-bold uppercase tracking-widest">
                İptal Et
             </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-teal-50 text-teal-700 border-teal-200 shadow-sm",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <Badge className={cn("px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold border", styles[status] || "bg-slate-500/20 text-slate-500")}>
       {status === 'pending' ? 'bekliyor' : status === 'confirmed' ? 'onaylandı' : status === 'completed' ? 'tamamlandı' : status === 'cancelled' ? 'iptal edildi' : status}
    </Badge>
  );
}
