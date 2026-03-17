'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Zap, 
  Trash2, 
  Edit3, 
  Clock, 
  DollarSign, 
  Plus, 
  Search,
  MoreVertical,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await api.get('/v1/services');
      return res.data.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/v1/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Hizmet başarıyla silindi');
    }
  });

  const filteredServices = services?.filter((s: any) => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Hizmet Kataloğu</h1>
          <p className="text-slate-500">Premium hizmet tekliflerinizi ve fiyatlandırmanızı tanımlayın ve yönetin.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 glow-teal gap-2 text-lg">
          <Plus className="w-5 h-5" />
          Hizmet Oluştur
        </Button>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-teal-500/50 transition-all" 
          placeholder="Hizmetlerde ara..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 glass rounded-[2rem] animate-pulse" />)
        ) : filteredServices?.map((service: any) => (
          <Card key={service.id} className="group hover:border-teal-500/20 transition-all flex flex-col h-full">
            <CardHeader className="flex flex-row justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Zap className="w-7 h-7" />
              </div>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-white rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1">
              <CardTitle className="mb-2 group-hover:text-teal-400 transition-colors uppercase tracking-tight">
                {service.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 mb-6 italic leading-relaxed">
                {service.description || 'Bu premium hizmet için açıklama belirtilmemiş.'}
              </CardDescription>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="glass p-3 rounded-xl border-white/5 flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Süre</span>
                  <span className="text-white font-bold flex items-center gap-1.5 text-sm">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    {service.duration} dk
                  </span>
                </div>
                <div className="glass p-3 rounded-xl border-white/5 flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Fiyat</span>
                  <span className="text-white font-bold flex items-center gap-1.5 text-sm">
                    <DollarSign className="w-3.5 h-3.5 text-teal-500" />
                    ₺{service.price}
                  </span>
                </div>
              </div>
            </CardContent>

            <div className="px-10 pb-10 flex items-center gap-3">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl border-white/5 hover:bg-teal-500/10 hover:text-teal-400 gap-2 h-12"
              >
                <Edit3 className="w-4 h-4" />
                Düzenle
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => { if(confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) deleteMutation.mutate(service.id)}}
                className="w-12 h-12 rounded-xl text-slate-600 hover:bg-rose-500/10 hover:text-rose-500 transition-all border border-transparent hover:border-rose-500/20"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}

        {!isLoading && filteredServices?.length === 0 && (
           <div className="col-span-full py-32 text-center glass rounded-[3rem] border-dashed border-white/10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-700">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-slate-500 italic">Kataloğunuzda hizmet bulunamadı.</p>
           </div>
        )}
      </div>
    </div>
  );
}
