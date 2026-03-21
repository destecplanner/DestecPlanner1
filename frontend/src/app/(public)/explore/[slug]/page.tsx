"use client"

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { ErrorState } from "@/components/ui/ErrorState";
import { Star, MapPin, Clock, Info, User, CheckCircle2, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BusinessDetailPage() {
  const { slug } = useParams();

  const { data: business, isLoading, error, refetch } = useQuery({
    queryKey: ["business", slug],
    queryFn: async () => {
      const response = await api.get(`/v1/marketplace/business/${slug}`);
      return response.data.data;
    },
  });

  if (isLoading) return <LoadingOverlay variant="full" />;
  if (error) return <ErrorState message="Bu işletme profili bulunamadı." onRetry={() => refetch()} />;

  const services = business?.services || [];
  const staff = business?.staff || [];

  return (
    <div className="min-h-screen pb-32 bg-slate-50">
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-slate-50 overflow-hidden">
        {business.banner_url ? (
          <img 
            src={business.banner_url} 
            alt={business.name} 
            className="w-full h-full object-cover"
          />
        ) : (
             <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-slate-100 flex items-center justify-center">
                <Sparkles className="w-20 h-20 text-teal-600/20" />
             </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-end gap-8"
            >
              <div className="w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] bg-white border border-slate-100 p-2 shrink-0 shadow-2xl relative z-10 -mb-16 md:-mb-24 ml-0 md:ml-6">
                <img 
                  src={business.logo_url || "https://ui-avatars.com/api/?name=" + business.name} 
                  alt={business.name} 
                  className="w-full h-full object-cover rounded-[2rem]" 
                />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="glass" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[10px] font-black px-4 py-1.5 rounded-full">
                    {business.category?.name || 'Profesyonel Hizmet'}
                  </Badge>
                  {business.rating && (
                    <div className="flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-black text-slate-900">{business.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">{business.name}</h1>
                <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {business.address || "Şehir Merkezi, Türkiye"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-slate-900">18:00'e kadar açık</span>
                  </div>
                </div>
              </div>
              <div className="pb-4">
                <Button size="lg" className="h-16 px-12 rounded-full bg-primary hover:brightness-110 shadow-xl shadow-primary/20 text-lg font-black" asChild>
                  <Link href={`/book/${business.slug}`}>
                    <Calendar className="mr-2 w-6 h-6" />
                    Hemen Randevu Al
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Services & Staff */}
          <div className="lg:col-span-2 space-y-16">
            {/* About */}
            <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">İşletme Hakkında</h2>
              </div>
              <p className="text-slate-500 leading-relaxed text-lg whitespace-pre-line font-bold opacity-80">
                {business.description || "Bu işletme için henüz bir açıklama girilmemiş."}
              </p>
            </section>

            {/* Services */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hizmetlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {services.map((service: any) => (
                  <motion.div 
                    key={service.id}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <div className="bg-white border border-slate-100 rounded-[1.5rem] p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                           <CheckCircle2 className="w-8 h-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase tracking-tight">{service.name}</h3>
                          <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 text-slate-400 text-sm font-black uppercase tracking-widest">
                              <Clock className="w-4 h-4" />
                              {service.duration} DK
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <span className="text-primary font-black text-lg">₺{service.price}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="default" className="rounded-full px-8 h-12 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-widest text-xs border-0" asChild>
                         <Link href={`/book/${business.slug}?service=${service.id}`}>Seç</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ekibimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staff.map((member: any) => (
                  <div key={member.id} className="bg-white border border-slate-100 p-8 rounded-[1.5rem] flex items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                      <img 
                        src={member.profile_image_url || "https://ui-avatars.com/api/?name=" + member.name} 
                        alt={member.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{member.name}</h3>
                      <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-3">{member.role_title || 'Uzman'}</p>
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">4.9 (42 Yorum)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar / Info */}
          <div className="space-y-8">
            <Card className="sticky top-32 border-slate-100 bg-white p-10 rounded-[2.5rem] shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center justify-between tracking-tight">
                Çalışma Saatleri
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </h3>
              <div className="space-y-5">
                {[
                  { d: 'Pazartesi', open: '09:00 - 18:00' },
                  { d: 'Salı', open: '09:00 - 18:00' },
                  { d: 'Çarşamba', open: '09:00 - 18:00' },
                  { d: 'Perşembe', open: '09:00 - 18:00' },
                  { d: 'Cuma', open: '09:00 - 18:00' },
                  { d: 'Cumartesi', open: '10:00 - 14:00' },
                  { d: 'Pazar', open: 'Kapalı' },
                ].map((item) => (
                  <div key={item.d} className="flex justify-between items-center text-sm group">
                    <span className="text-slate-500 font-bold group-hover:text-slate-900 transition-colors">{item.d}</span>
                    <span className="text-slate-900 font-black tracking-tight">
                       {item.open}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-10 border-t border-slate-100">
                 <div className="flex items-center gap-5 text-slate-500 group cursor-pointer">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-primary/30 transition-all">
                     <MapPin className="w-5 h-5 group-hover:text-primary transition-colors" />
                   </div>
                   <div className="flex-1">
                     <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Konum</p>
                     <p className="text-sm text-slate-900 font-black leading-tight tracking-tight">{business.address || 'Cadde Sokak, No: 42, Şehir'}</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                   </div>
                 </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 md:hidden z-50">
        <Button size="lg" className="w-full h-14 rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-base font-black" asChild>
          <Link href={`/book/${business.slug}`}>
            <Calendar className="mr-2 w-5 h-5" />
            Randevu Al
          </Link>
        </Button>
      </div>
    </div>
  );
}
