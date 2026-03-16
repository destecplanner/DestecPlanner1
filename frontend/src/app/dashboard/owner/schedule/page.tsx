'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Clock, 
  Save, 
  Plus, 
  Trash2, 
  AlertCircle,
  CalendarDays,
  Coffee,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SchedulePage() {
  const queryClient = useQueryClient();

  const { data: schedule, isLoading } = useQuery({
    queryKey: ['business-schedule'],
    queryFn: async () => {
      const res = await api.get('/v1/business/schedule');
      return res.data.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      await api.put('/v1/business/schedule', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-schedule'] });
      toast.success('Schedule updated successfully');
    }
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Business Hours</h1>
          <p className="text-slate-500">Define your weekly availability and operational breaks.</p>
        </div>
        <Button className="rounded-2xl h-14 px-10 glow-teal gap-3 text-lg" onClick={() => toast.info('Advanced overrides coming soon')}>
           <Plus className="w-5 h-5" />
           Add Override
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-24 glass rounded-3xl animate-pulse" />)
        ) : days.map((day) => {
           const dayData = schedule?.find((s: any) => s.day_of_week === days.indexOf(day));
           return (
             <Card key={day} className={cn(
               "p-6 rounded-[2rem] border-white/5 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group",
               dayData?.is_closed ? "opacity-50" : "hover:border-teal-500/20"
             )}>
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-teal-400 font-bold shrink-0">
                      {day.slice(0, 2)}
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">{day}</h3>
                      <p className="text-sm text-slate-500 font-medium">
                         {dayData?.is_closed ? 'Business is Closed' : `${dayData?.open_time} — ${dayData?.close_time}`}
                      </p>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                   {!dayData?.is_closed && (
                     <div className="flex items-center gap-2 glass p-2 px-4 rounded-xl border-white/5 italic text-[10px] text-slate-500">
                        <Coffee className="w-3 h-3 text-teal-500" />
                        {dayData?.breaks?.length || 0} breaks scheduled
                     </div>
                   )}
                   <Button variant="outline" className="rounded-xl border-white/5 gap-2 h-12 text-xs font-bold uppercase tracking-widest hover:bg-white/10">
                      <Clock className="w-4 h-4 text-teal-500" />
                      Configure
                   </Button>
                   <Button 
                    variant="ghost" 
                    className={cn(
                      "rounded-xl h-12 px-6 text-xs font-bold uppercase tracking-widest border border-white/5 transition-all",
                      dayData?.is_closed ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" : "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20"
                    )}
                   >
                     {dayData?.is_closed ? 'Open Day' : 'Close Day'}
                   </Button>
                </div>
             </Card>
           )
        })}
      </div>

      <Card className="p-10 rounded-[3rem] border-amber-500/10 bg-amber-500/5 flex flex-col md:flex-row gap-8 items-center justify-between">
         <div className="flex gap-6 items-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
               <AlertCircle className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-xl font-bold text-white mb-1">Global Precision Warning</h4>
               <p className="text-slate-400 text-sm max-w-lg leading-relaxed italic">"A business without a schedule is a ship without a compass." Ensure your hours are locked before launching your public profile.</p>
            </div>
         </div>
         <Button className="h-16 px-10 rounded-2xl glow-teal gap-2 text-lg">
            <Save className="w-5 h-5" />
            Save Changes
         </Button>
      </Card>
    </div>
  );
}
