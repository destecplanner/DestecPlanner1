'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Save, 
  Upload, 
  Zap,
  ChevronRight,
  Bell,
  Lock,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function CustomerProfilePage() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: async () => {
      const res = await api.get('/v1/customer/profile');
      return res.data.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      await api.put('/v1/customer/profile', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
      toast.success('Profile updated successfully');
    }
  });

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Your Profile</h1>
        <p className="text-slate-500">Manage your personal information and platform preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Card className="border-white/5 bg-slate-900/20">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <User className="w-5 h-5 text-teal-400" />
                   Personal Details
                </CardTitle>
                <CardDescription>
                   Update your contact information and identity on the platform.
                </CardDescription>
             </CardHeader>

             <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <Input defaultValue={profile?.name} className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-teal-500/50" placeholder="John Doe" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                      <div className="relative">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                         <Input defaultValue={profile?.email} disabled className="h-14 bg-white/5 border-white/10 rounded-2xl pl-16 pr-6 opacity-60 cursor-not-allowed" />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                      <div className="relative">
                         <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500/80" />
                         <Input defaultValue={profile?.phone} className="h-14 bg-white/5 border-white/10 rounded-2xl pl-16 pr-6 focus:ring-teal-500/50" placeholder="+1 (555) 000-0000" />
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <Button className="h-16 px-12 rounded-2xl glow-teal text-lg group">
                      <Save className="mr-2 w-5 h-5" />
                      Save Personal Info
                      <ChevronRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </Button>
                </div>
             </CardContent>
          </Card>

          <Card className="glass border-white/5">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Shield className="w-5 h-5 text-teal-400" />
                   Security Settings
                </CardTitle>
                <CardDescription>
                   Manage your account protection and data privacy.
                </CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors shadow-inner">
                         <Lock className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-sm mb-1">Change Password</h4>
                         <p className="text-xs text-slate-500 italic">Strengthen your account defense.</p>
                      </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-800" />
                </div>
                <div className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors shadow-inner">
                         <Bell className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-sm mb-1">Notifications</h4>
                         <p className="text-xs text-slate-500 italic">Manage your alert ecosystem.</p>
                      </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-800" />
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
           <Card className="p-8 border-white/5 flex flex-col items-center gap-8 text-center bg-white/5 overflow-hidden">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 italic">Profile Visual</h3>
              <div className="w-44 h-44 rounded-full bg-slate-950 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-slate-700 group hover:border-teal-500/40 transition-all cursor-pointer relative">
                 <div className="absolute inset-2 rounded-full border border-white/5 animate-pulse" />
                 {profile?.avatar_url ? (
                   <img src={profile.avatar_url} className="w-full h-full object-cover rounded-full" />
                 ) : (
                   <>
                    <User className="w-12 h-12 opacity-20" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Update Photo</span>
                   </>
                 )}
                 <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-sm">
                    <Upload className="w-8 h-8 text-white animate-bounce-subtle" />
                 </div>
              </div>
              <p className="text-[11px] text-slate-500 italic px-4 leading-relaxed">
                 Max size 2MB. Use a professional portrait for an elite presence.
              </p>
           </Card>

           <div className="p-10 border border-white/5 rounded-[3rem] glass bg-teal-500/[0.02] flex items-center gap-6 group hover:border-teal-500/10 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 shadow-lg group-hover:glow-teal/10">
                 <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-[0.2em]">Platform Identity</h4>
                <p className="text-sm font-bold text-white italic">Premium Member #{profile?.id || '2408'}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
