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
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Your Appointments</h1>
          <p className="text-slate-500">Manage your upcoming bookings and review your service history.</p>
        </div>
        <Button asChild className="rounded-2xl h-14 px-8 glow-teal gap-2 text-lg">
          <Link href="/explore">
            <Zap className="w-5 h-5" />
            Book New Service
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              Upcoming Visits
            </h2>
            <div className="space-y-6">
              {isLoading ? (
                [1, 2].map(i => <div key={i} className="h-40 glass rounded-[2.5rem] animate-pulse" />)
              ) : upcoming.length > 0 ? (
                upcoming.map((app: any) => (
                  <BookingCard key={app.id} appointment={app} />
                ))
              ) : (
                <EmptyState 
                  icon={Calendar}
                  title="No Upcoming Visits"
                  description="You haven't scheduled any elite sessions yet. Start exploring our premium marketplace."
                  actionLabel="Discover Services"
                  onAction={() => window.location.href = '/explore'}
                />
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-500" />
              Past Experiences
            </h2>
            {isLoading ? (
              <div className="h-48 glass rounded-[2.5rem] animate-pulse" />
            ) : past.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service & Business</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {past.map((app: any) => (
                    <TableRow key={app.id} className="group cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-600 group-hover:text-teal-400 transition-colors">
                              <Zap className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-bold text-white leading-tight">{app.service?.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{app.business?.name}</p>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                           <p className="text-white font-medium">{format(new Date(app.appointment_date), 'MMM dd, yyyy')}</p>
                           <p className="text-[10px] text-slate-500 uppercase">{app.start_time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {app.status === 'completed' && !app.review ? (
                          <Button variant="ghost" size="sm" className="rounded-lg h-9 text-teal-400 hover:bg-teal-500/10 gap-2" asChild>
                             <Link href={`/dashboard/customer/reviews?appId=${app.id}`}>
                               <Star className="w-3.5 h-3.5" />
                               Review
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
              <div className="py-12 px-8 glass rounded-[2rem] border border-white/5 italic text-sm text-slate-500 text-center">
                Your journey with us hasn't started yet. Your past experiences will appear here.
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-10">
           <Card className="border-teal-500/10 bg-teal-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-teal-400" />
                  Booking Tip
                </CardTitle>
                <CardDescription className="italic leading-relaxed mt-2 text-xs">
                  "Arriving 5-10 minutes early ensures you get the most out of your elite service session."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full rounded-xl border-teal-500/20 text-teal-400 h-12 text-[10px] uppercase font-bold tracking-widest hover:bg-teal-500/10">
                   Rescheduling Policy
                </Button>
              </CardContent>
           </Card>

           <Card className="border-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Need Assistance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-4 glass rounded-xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                       </div>
                       <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Support Center</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-800" />
                 </div>
                 <div className="flex items-center justify-between p-4 glass rounded-xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                          <Star className="w-4 h-4" />
                       </div>
                       <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Leave Feedback</span>
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
    <Card className="group overflow-hidden relative border-white/5 hover:border-teal-500/20 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl -z-10 group-hover:bg-teal-500/10 transition-colors" />
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-[1.5rem] bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-teal-500/20 transition-colors">
             {appointment.business?.logo_url ? (
               <img src={appointment.business.logo_url} className="w-full h-full object-cover" />
             ) : (
               <Zap className="w-10 h-10 text-teal-400 opacity-20" />
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
             <Button variant="outline" className="rounded-xl border-white/5 h-12 gap-2 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
                <MoreHorizontal className="w-4 h-4" />
                Manage
             </Button>
             <Button variant="ghost" className="rounded-xl h-12 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 text-[10px] font-bold uppercase tracking-widest">
                Cancel
             </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-500 border-amber-500/20",
    confirmed: "bg-teal-500/20 text-teal-500 border-teal-500/20 shadow-[0_0_15px_-5px_rgba(20,184,166,0.3)]",
    completed: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
    cancelled: "bg-rose-500/20 text-rose-500 border-rose-500/20",
  };

  return (
    <Badge className={cn("px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold border", styles[status] || "bg-slate-500/20 text-slate-500")}>
       {status}
    </Badge>
  );
}
