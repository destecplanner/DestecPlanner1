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
  if (error) return <ErrorState message="Could not find this business profile." onRetry={() => refetch()} />;

  const services = business?.services || [];
  const staff = business?.staff || [];

  return (
    <div className="min-h-screen pb-32">
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-slate-900 overflow-hidden">
        {business.banner_url && (
          <img 
            src={business.banner_url} 
            alt={business.name} 
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-end gap-8"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] glass border-white/10 p-2 shrink-0">
                <img 
                  src={business.logo_url || "https://ui-avatars.com/api/?name=" + business.name} 
                  alt={business.name} 
                  className="w-full h-full object-cover rounded-[2.5rem]" 
                />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="glass">{business.category?.name || 'Professional Service'}</Badge>
                  {business.rating && (
                    <div className="flex items-center gap-1.5 glass px-3 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-white">{business.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">{business.name}</h1>
                <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    {business.address || "City Center, Turkey"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-500" />
                    Open until 18:00
                  </div>
                </div>
              </div>
              <div className="pb-4">
                <Button size="lg" className="h-16 px-10 rounded-2xl glow-teal" asChild>
                  <Link href={`/book/${business.slug}`}>
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Now
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
                  <Info className="w-4 h-4 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">About Business</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                {business.description || "No description provided for this business."}
              </p>
            </section>

            {/* Services */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Services</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service: any) => (
                  <motion.div 
                    key={service.id}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="border-white/5 bg-slate-900/40 hover:bg-slate-900 transition-all hover:border-teal-500/20 cursor-pointer overflow-hidden rounded-3xl">
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-teal-500/5 border border-white/5 flex items-center justify-center group-hover:border-teal-500/20 transition-all">
                             <CheckCircle2 className="w-6 h-6 text-teal-500/40 group-hover:text-teal-500 transition-colors" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                            <div className="flex items-center gap-4 text-slate-500 text-xs">
                              <span className="flex items-center gap-1.5 uppercase tracking-widest font-bold">
                                <Clock className="w-3 h-3" />
                                {service.duration} MIN
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                              <span className="text-teal-400 font-black">{service.price} {business.currency || 'TL'}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 group-hover:border-teal-500/40 transition-all" asChild>
                           <Link href={`/book/${business.slug}?service=${service.id}`}>Book</Link>
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
                  <User className="w-4 h-4 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">The Experts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staff.map((member: any) => (
                  <Card key={member.id} className="border-white/5 bg-slate-900/40 p-6 rounded-3xl flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden glass border-white/10">
                      <img 
                        src={member.profile_image_url || "https://ui-avatars.com/api/?name=" + member.name} 
                        alt={member.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">{member.role_title || 'Specialist'}</p>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-white">4.9 (42 Reviews)</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar / Info */}
          <div className="space-y-8">
            <Card className="sticky top-32 border-white/5 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center justify-between">
                Business Hours
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </h3>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">{day}</span>
                    <span className="text-slate-300 font-bold">
                       {idx < 5 ? '09:00 - 18:00' : idx === 5 ? '10:00 - 14:00' : 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/5">
                 <div className="flex items-center gap-4 text-slate-400 mb-6 group cursor-pointer">
                   <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-teal-500/20 transition-all">
                     <MapPin className="w-4 h-4 group-hover:text-teal-400" />
                   </div>
                   <div className="flex-1">
                     <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-0.5">Location</p>
                     <p className="text-sm text-slate-300 font-medium leading-tight">{business.address || 'Street Avenue, No: 42, City'}</p>
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-700" />
                 </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
