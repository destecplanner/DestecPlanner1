'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Zap, 
  Trash2, 
  Edit2, 
  Shield,
  Star,
  Settings2,
  Calendar,
  Smile
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function StaffPage() {
  const queryClient = useQueryClient();

  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const res = await api.get('/v1/staff');
      return res.data.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/v1/staff/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Staff member removed');
    }
  });

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Team Management</h1>
          <p className="text-slate-500">Manage your specialists, their roles, and specialized services.</p>
        </div>
        <Button className="rounded-2xl h-14 px-10 glow-teal gap-3 text-lg">
          <UserPlus className="w-5 h-5" />
          Add Member
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading ? (
          [1, 2].map(i => <div key={i} className="h-64 glass rounded-[2.5rem] animate-pulse" />)
        ) : staff?.map((member: any) => (
          <Card key={member.id} className="p-8 rounded-[2.5rem] border-white/5 group hover:border-teal-500/20 transition-all">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Profile Side */}
              <div className="flex flex-col items-center gap-4 text-center sm:text-left sm:items-start shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center text-3xl font-bold text-teal-400 glow-teal/10 relative">
                  {member.user?.name?.[0]}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-teal-500 border-4 border-slate-950 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                   <Badge variant="glass" className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-2 py-0.5 text-[10px]">Senior Specialist</Badge>
                   <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold justify-center sm:justify-start">
                     <Star className="w-3 h-3 fill-yellow-500" />
                     4.9 (88)
                   </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-2xl font-bold text-white mb-1">{member.user?.name}</h3>
                     <p className="text-slate-500 font-medium">{member.specialization || 'Lead Professional'}</p>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white/10">
                       <Edit2 className="w-4 h-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       onClick={() => { if(confirm('Remove this staff?')) deleteMutation.mutate(member.id)}}
                       className="w-10 h-10 rounded-xl text-rose-500 hover:bg-rose-500/10"
                     >
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ContactItem icon={<Mail className="w-3.5 h-3.5" />} text={member.user?.email} />
                  <ContactItem icon={<Phone className="w-3.5 h-3.5" />} text="+1 234 567 890" />
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                   {member.services?.slice(0, 3).map((s: any) => (
                      <Badge key={s.id} variant="secondary" className="bg-white/5 border-white/5">{s.name}</Badge>
                   ))}
                   {member.services?.length > 3 && (
                     <Badge variant="outline" className="border-white/5 text-slate-500">+{member.services.length - 3}</Badge>
                   )}
                </div>

                <div className="flex gap-4 pt-2">
                   <Button variant="ghost" className="h-10 px-4 rounded-xl text-xs gap-2 border border-white/5 hover:bg-white/5 text-slate-400">
                     <Calendar className="w-3.5 h-3.5" />
                     Manage Schedule
                   </Button>
                   <Button variant="ghost" className="h-10 px-4 rounded-xl text-xs gap-2 border border-white/5 hover:bg-white/5 text-slate-400">
                     <Settings2 className="w-3.5 h-3.5" />
                     Custom Skills
                   </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {!isLoading && staff?.length === 0 && (
           <div className="col-span-full py-40 text-center glass rounded-[3rem] border-dashed border-white/10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700">
                <Users className="w-10 h-10" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-white font-bold text-xl mb-2">Build Your Dream Team</h3>
                <p className="text-slate-500 text-sm">Add your high-performing specialists to start scaling your service operations.</p>
              </div>
              <Button className="rounded-xl px-10 h-14 glow-teal">Get Started</Button>
           </div>
        )}
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 px-3 rounded-lg border border-white/5 truncate">
      <div className="text-teal-500">{icon}</div>
      <span className="truncate">{text}</span>
    </div>
  );
}
