'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Clock,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Link from 'next/link';

export default function OwnerOverviewPage() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['business-stats'],
    queryFn: async () => {
      const res = await api.get('/v1/business/stats');
      return res.data.data;
    }
  });

  const { data: recentAppointments, isLoading: isAppsLoading } = useQuery({
    queryKey: ['recent-appointments'],
    queryFn: async () => {
      const res = await api.get('/v1/bookings', { params: { limit: 5 } });
      return res.data.data; // Assuming same structure as slots or standard list
    }
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">İşletme Özeti</h1>
        <p className="text-slate-600 font-medium">Tekrar hoş geldiniz. İşte işletmenizdeki güncel durum.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Toplam Gelir" 
          value={`$${stats?.revenue || '0.00'}`} 
          change="+12.5%" 
          icon={<DollarSign className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Toplam Randevu" 
          value={stats?.appointments_count || '0'} 
          change="+18.2%" 
          icon={<Calendar className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Yeni Müşteriler" 
          value={stats?.customers_count || '0'} 
          change="+4.3%" 
          icon={<Users className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Elde Tutma Oranı" 
          value="94%" 
          change="+2.1%" 
          icon={<TrendingUp className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 p-8 rounded-[2rem] border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              Yaklaşan Randevular
            </h2>
            <Link href="/dashboard/owner/calendar" className="text-sm text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 font-bold">
              Takvimi Görüntüle
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {isAppsLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse" />)
            ) : recentAppointments?.length > 0 ? (
               recentAppointments.map((app: any) => (
                 <div key={app.id} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-teal-500/20 transition-all group cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-600 font-bold shrink-0 shadow-sm">
                       {app.customer?.name?.[0] || 'C'}
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{app.customer?.name}</h4>
                       <p className="text-xs text-slate-500 font-medium">{app.service?.name} • {app.staff?.user?.name}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-slate-900">{app.start_time}</p>
                     <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{format(new Date(app.appointment_date), 'MMM dd')}</p>
                   </div>
                 </div>
               ))
            ) : (
              <div className="py-20 text-center bg-slate-50 rounded-3xl border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">Yaklaşan randevu bulunamadı.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions / Activity */}
        <div className="space-y-8">
           <Card className="p-8 rounded-[2rem] border-slate-100 bg-white shadow-sm">
             <h3 className="text-lg font-bold mb-6 text-slate-900">Hızlı İşlemler</h3>
             <div className="grid grid-cols-1 gap-3">
               <QuickActionButton label="Randevu Ekle" icon={<Calendar className="w-4 h-4" />} />
               <QuickActionButton label="Yeni Hizmet" icon={<TrendingUp className="w-4 h-4" />} />
               <QuickActionButton label="Verileri Dışa Aktar" icon={<ArrowUpRight className="w-4 h-4" />} />
             </div>
           </Card>

           <Card className="p-8 rounded-[2rem] border-slate-100 bg-teal-50/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700 mb-6 underline decoration-teal-500/40 underline-offset-8">Hesap Politikası</h3>
              <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                "Hassasiyet, bir işletme ile bir gelenek arasındaki farktır." Müşteri memnuniyetini en üst düzeye çıkarmak için müsaitlik durumunuzu güncel tutun.
              </p>
           </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, loading }: { title: string, value: string, change: string, icon: any, loading: boolean }) {
  return (
    <Card className="p-6 border-slate-100 bg-white shadow-sm group hover:border-teal-500/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
          {icon}
        </div>
        <Badge variant="success" className="text-[10px]">
          {change}
        </Badge>
      </div>
      {loading ? (
        <div className="h-8 w-24 bg-slate-50 rounded animate-pulse mb-1" />
      ) : (
        <h3 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">{value}</h3>
      )}
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{title}</p>
    </Card>
  );
}

function QuickActionButton({ label, icon }: { label: string, icon: any }) {
  return (
    <button className="flex items-center gap-3 w-full p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-500/20 hover:bg-teal-50 transition-all text-sm font-bold text-slate-600 hover:text-teal-700 group shadow-sm">
      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors shadow-sm">
        {icon}
      </div>
      {label}
    </button>
  );
}
