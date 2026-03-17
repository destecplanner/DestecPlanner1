'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Upload, 
  Save, 
  Shield, 
  Zap,
  Info,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: business, isLoading } = useQuery({
    queryKey: ['business-profile'],
    queryFn: async () => {
      const res = await api.get('/v1/business/profile');
      return res.data.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      await api.put('/v1/business/profile', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-profile'] });
      toast.success('İşletme profili güncellendi');
    }
  });

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">İşletme Ayarları</h1>
        <p className="text-slate-500">Dijital kimliğinizi, operasyonel detaylarınızı ve platform varlığınızı yönetin.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 rounded-[3rem] border-white/5 bg-slate-900/20">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              Temel Kimlik
            </h3>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Business Name</label>
                    <Input defaultValue={business?.name} className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-teal-500/50" placeholder="Elegant Aesthetics" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Marketplace Slug</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-medium">/</div>
                      <Input defaultValue={business?.slug} className="h-14 bg-white/5 border-white/10 rounded-2xl pl-8 pr-6 focus:ring-teal-500/50" placeholder="elegant-aesthetics" />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">İşletme Kısa Bilgisi</label>
                <textarea 
                  className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:ring-teal-500/50 focus:outline-none transition-all placeholder:text-slate-700" 
                  defaultValue={business?.description}
                  placeholder="Mükemmeliyet taahhüdünüzü dünyaya anlatın..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Fiziksel Adres</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500/80" />
                  <Input defaultValue={business?.address} className="h-14 bg-white/5 border-white/10 rounded-2xl pl-16 pr-6 focus:ring-teal-500/50" placeholder="Premium Towers, Istanbul" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-10 rounded-[3rem] border-white/5 glass">
             <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
               <Shield className="w-5 h-5 text-teal-400" />
               Güvenlik ve Uyumluluk
             </h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between p-6 glass rounded-2xl border-white/5">
                   <div>
                      <h4 className="text-white font-bold text-sm mb-1">Public Marketplace Presence</h4>
                      <p className="text-xs text-slate-500 italic">Control whether your business is visible to potential clients.</p>
                   </div>
                   <div className="w-12 h-6 bg-teal-500 rounded-full relative p-1 cursor-pointer shadow-lg shadow-teal-500/20">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                   </div>
                </div>
                <div className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 opacity-50 pointer-events-none">
                   <div>
                      <h4 className="text-white font-bold text-sm mb-1">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500 italic">Add an extra layer of security to your admin account.</p>
                   </div>
                   <div className="w-12 h-6 bg-slate-800 rounded-full relative p-1">
                      <div className="w-4 h-4 bg-slate-600 rounded-full" />
                   </div>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Column: Branding & CTA */}
        <div className="space-y-10">
           <Card className="p-8 rounded-[3rem] border-white/5 flex flex-col items-center gap-8 text-center bg-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 italic">Brand Visuals</h3>
              <div className="w-40 h-40 rounded-[2.5rem] bg-slate-900 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-slate-600 group hover:border-teal-500/40 transition-all cursor-pointer relative overflow-hidden">
                 {business?.logo_url ? (
                   <img src={business.logo_url} className="w-full h-full object-cover" />
                 ) : (
                   <>
                    <ImageIcon className="w-8 h-8 opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Upload Logo</span>
                   </>
                 )}
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-white" />
                 </div>
              </div>
              <p className="text-xs text-slate-500 italic px-6 leading-relaxed">
                 Max size 2MB. Optimized for <span className="text-teal-400">square</span> aspect ratios to ensure premium display in search.
              </p>
           </Card>

            <Card className="p-10 rounded-[3rem] border-teal-500/10 bg-teal-500/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Save className="w-5 h-5 text-teal-400" />
                Güncellemeleri Yayınla
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed italic mb-10">
                "Bir marka sadece tutarlılığı kadar güçlüdür." Küresel pazar yeri ile senkronize etmeden önce tüm detayları doğrulayın.
              </p>
              <Button className="w-full h-16 rounded-[1.5rem] glow-teal text-lg group">
                Profili Kaydet 
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
           </Card>

           <div className="p-8 border border-white/5 rounded-[2.5rem] flex gap-4 text-slate-500">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                 <Zap className="w-5 h-5 text-teal-500/40" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-widest">Platform Tier</h4>
                <p className="text-[10px] italic">Expert Business Plan • Next billing Apr 16, 2026</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
