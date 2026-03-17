'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  Heart, 
  MapPin, 
  Star, 
  Zap, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function FavoritesPage() {
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['customer-favorites'],
    queryFn: async () => {
      const res = await api.get('/v1/customer/profile');
      return res.data.data.favorites || [];
    }
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.post(`/v1/customer/favorites/${id}/toggle`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-favorites'] });
      toast.success('Favoriler güncellendi');
    }
  });

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Favorileriniz</h1>
        <p className="text-slate-500">En sevdiğiniz premium işletmelere hızlı erişim.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-[400px] glass rounded-3xl animate-pulse" />)
        ) : favorites?.length > 0 ? (
          favorites.map((business: any) => (
             <div key={business.id} className="relative group">
                <Link href={`/explore/${business.slug}`}>
                  <Card className="overflow-hidden h-full flex flex-col border-white/5 hover:border-teal-500/40 transition-all duration-500">
                    <div className="aspect-video bg-slate-900 relative overflow-hidden">
                      {business.logo_url ? (
                        <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-slate-800">
                          <Zap className="w-16 h-16 opacity-10" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant="glass" className="bg-black/60 backdrop-blur-md">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                          {business.rating || '4.9'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{business.name}</h2>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                          <MapPin className="w-4 h-4 text-teal-500" />
                          <span className="truncate">{business.address || 'Premium District, Istanbul'}</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all font-bold uppercase tracking-widest text-[10px]">
                        Profili Görüntüle
                        <ExternalLink className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
                
                <button 
                  onClick={(e) => { e.preventDefault(); toggleFavoriteMutation.mutate(business.id); }}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full glass bg-black/40 flex items-center justify-center text-rose-500 hover:scale-110 transition-transform shadow-xl border border-white/10"
                >
                  <Heart className="w-5 h-5 fill-rose-500" />
                </button>
             </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState 
              icon={Heart}
              title="Henüz Favori Yok"
              description="Pazar yerini keşfedin ve favori işletmelerinizi hızlı erişim için kaydetmek üzere kalp simgesine tıklayın."
              actionLabel="Keşfetmeye Başla"
              onAction={() => window.location.href = '/explore'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
