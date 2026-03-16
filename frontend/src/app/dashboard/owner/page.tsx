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
        <h1 className="text-3xl font-bold text-white mb-2">Business Overview</h1>
        <p className="text-slate-500">Welcome back. Here's what's happening with your business today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.revenue || '0.00'}`} 
          change="+12.5%" 
          icon={<DollarSign className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Total Bookings" 
          value={stats?.appointments_count || '0'} 
          change="+18.2%" 
          icon={<Calendar className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="New Customers" 
          value={stats?.customers_count || '0'} 
          change="+4.3%" 
          icon={<Users className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Retention Rate" 
          value="94%" 
          change="+2.1%" 
          icon={<TrendingUp className="w-5 h-5" />} 
          loading={isStatsLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 p-8 rounded-[2rem] border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              Upcoming Appointments
            </h2>
            <Link href="/dashboard/owner/calendar" className="text-sm text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-medium">
              View Calendar
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {isAppsLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 glass rounded-2xl animate-pulse" />)
            ) : recentAppointments?.length > 0 ? (
               recentAppointments.map((app: any) => (
                 <div key={app.id} className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between hover:border-teal-500/20 transition-all group">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-teal-400 font-bold shrink-0">
                       {app.customer?.name?.[0] || 'C'}
                     </div>
                     <div>
                       <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">{app.customer?.name}</h4>
                       <p className="text-xs text-slate-500">{app.service?.name} • {app.staff?.user?.name}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-white">{app.start_time}</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider">{format(new Date(app.appointment_date), 'MMM dd')}</p>
                   </div>
                 </div>
               ))
            ) : (
              <div className="py-20 text-center glass rounded-3xl border-dashed border-white/10">
                <p className="text-slate-500">No upcoming appointments found.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions / Activity */}
        <div className="space-y-8">
           <Card className="p-8 rounded-[2rem] border-teal-500/10">
             <h3 className="text-lg font-bold mb-6 text-white">Quick Actions</h3>
             <div className="grid grid-cols-1 gap-3">
               <QuickActionButton label="Add Appointment" icon={<Calendar className="w-4 h-4" />} />
               <QuickActionButton label="New Service" icon={<TrendingUp className="w-4 h-4" />} />
               <QuickActionButton label="Export Data" icon={<ArrowUpRight className="w-4 h-4" />} />
             </div>
           </Card>

           <Card className="p-8 rounded-[2rem] border-white/5 bg-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 underline decoration-teal-500/40 underline-offset-8">Account Policy</h3>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Precision is the difference between a business and a legacy." Keep your availability updated to ensure maximum customer satisfaction.
              </p>
           </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, loading }: { title: string, value: string, change: string, icon: any, loading: boolean }) {
  return (
    <Card className="p-6 border-white/5 group hover:border-teal-500/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
          {icon}
        </div>
        <Badge variant="success" className="text-[10px]">
          {change}
        </Badge>
      </div>
      {loading ? (
        <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-1" />
      ) : (
        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</h3>
      )}
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{title}</p>
    </Card>
  );
}

function QuickActionButton({ label, icon }: { label: string, icon: any }) {
  return (
    <button className="flex items-center gap-3 w-full p-4 glass rounded-xl border-white/5 hover:border-teal-500/20 hover:bg-teal-500/5 transition-all text-sm font-medium text-slate-400 hover:text-white group">
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
        {icon}
      </div>
      {label}
    </button>
  );
}
