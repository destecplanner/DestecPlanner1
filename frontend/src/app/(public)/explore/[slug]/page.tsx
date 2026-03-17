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
    <div className="min-h-screen pb-32 bg-white">
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
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-white border border-slate-100 p-2 shrink-0 shadow-2xl">
                <img 
                  src={business.logo_url || "https://ui-avatars.com/api/?name=" + business.name} 
                  alt={business.name} 
                  className="w-full h-full object-cover rounded-[2.5rem]" 
                />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="glass" className="bg-teal-50 text-teal-700 border-teal-100 uppercase tracking-widest text-[10px] font-black">
                    {business.category?.name || 'Profesyonel Hizmet'}
                  </Badge>
                  {business.rating && (
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-900">{business.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-2">{business.name}</h1>
                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    {business.address || "Şehir Merkezi, Türkiye"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    18:00'e kadar açık
                  </div>
                </div>
              </div>
              <div className="pb-4">
                <Button size="lg" className="h-16 px-10 rounded-2xl shadow-lg shadow-teal-600/20 text-lg font-bold" asChild>
                  <Link href={`/book/${business.slug}`}>
                    <Calendar className="mr-2 w-5 h-5" />
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
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                  <Info className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">İşletme Hakkında</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line font-medium">
                {business.description || "Bu işletme için henüz bir açıklama girilmemiş."}
              </p>
            </section>

            {/* Services */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Hizmetlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service: any) => (
                  <motion.div 
                    key={service.id}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="border-slate-100 bg-white hover:border-teal-500/20 cursor-pointer overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-all">
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-slate-50 flex items-center justify-center group-hover:border-teal-500/20 transition-all">
                             <CheckCircle2 className="w-6 h-6 text-teal-600/40 group-hover:text-teal-600 transition-colors" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{service.name}</h3>
                            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                              <span className="flex items-center gap-1.5 uppercase tracking-widest font-black">
                                <Clock className="w-3 h-3" />
                                {service.duration} DK
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                              <span className="text-teal-600 font-black">{service.price} {business.currency || '₺'}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-slate-200 group-hover:border-teal-500/40 transition-all font-bold" asChild>
                           <Link href={`/book/${business.slug}?service=${service.id}`}>Seç</Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                  <User className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Ekibimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staff.map((member: any) => (
                  <Card key={member.id} className="border-slate-100 bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                      <img 
                        src={member.profile_image_url || "https://ui-avatars.com/api/?name=" + member.name} 
                        alt={member.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-2">{member.role_title || 'Uzman'}</p>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-slate-700">4.9 (42 Değerlendirme)</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar / Info */}
          <div className="space-y-8">
            <Card className="sticky top-32 border-slate-100 bg-white p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center justify-between font-black">
                Çalışma Saatleri
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </h3>
              <div className="space-y-4">
                {[
                  { d: 'Pazartesi', open: '09:00 - 18:00' },
                  { d: 'Salı', open: '09:00 - 18:00' },
                  { d: 'Çarşamba', open: '09:00 - 18:00' },
                  { d: 'Perşembe', open: '09:00 - 18:00' },
                  { d: 'Cuma', open: '09:00 - 18:00' },
                  { d: 'Cumartesi', open: '10:00 - 14:00' },
                  { d: 'Pazar', open: 'Kapalı' },
                ].map((item) => (
                  <div key={item.d} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">{item.d}</span>
                    <span className="text-slate-900 font-bold">
                       {item.open}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-slate-50">
                 <div className="flex items-center gap-4 text-slate-500 mb-6 group cursor-pointer">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-teal-500/20 transition-all">
                     <MapPin className="w-4 h-4 group-hover:text-teal-600" />
                   </div>
                   <div className="flex-1">
                     <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-0.5">Konum</p>
                     <p className="text-sm text-slate-900 font-bold leading-tight">{business.address || 'Cadde Sokak, No: 42, Şehir'}</p>
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-300" />
                 </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
