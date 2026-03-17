"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { BusinessCard } from "@/components/marketplace/BusinessCard";
import { Pagination } from "@/components/ui/Pagination";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { ErrorState } from "@/components/ui/ErrorState";
import { Search, MapPin, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["marketplace", search, category, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(search && { q: search }),
        ...(category !== "all" && { category_id: category }),
      });
      const response = await api.get(`/v1/marketplace/search?${params.toString()}`);
      return response.data;
    },
  });

  const businesses = data?.data || [];
  const meta = data?.meta || { current_page: 1, last_page: 1 };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center border border-stone-100 shadow-sm">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Deneyiminizi Keşfedin</h1>
          </motion.div>
          <p className="text-slate-500 max-w-xl leading-relaxed font-bold opacity-80 text-lg">
            Yakınınızdaki premium işletmeleri keşfedin. Kategoriye ve konuma göre filtreleyerek elit hizmetlere ulaşın.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card p-5 rounded-[3rem] border-stone-100 mb-20 flex flex-col lg:flex-row gap-5 items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] bg-white/90">
          <div className="relative flex-1 w-full pl-6">
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <Input 
              placeholder="Hizmet, işletme veya profesyonel arayın..." 
              className="pl-14 bg-transparent border-0 focus-visible:ring-0 h-16 text-lg font-bold placeholder:text-stone-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-10 w-px bg-stone-100 hidden lg:block" />
          <div className="flex w-full lg:w-auto gap-5">
            <div className="relative flex-1 lg:w-72">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 z-10" />
              <Input 
                placeholder="Tüm Şehirler" 
                className="pl-14 bg-stone-50/50 border-stone-100 h-16 rounded-[1.5rem] font-bold text-slate-900 placeholder:text-stone-300"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full lg:w-56 h-16 rounded-[1.5rem] border-stone-100 bg-stone-50/50 font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-slate-300" />
                  <SelectValue placeholder="Kategori" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-[2rem] border-stone-100">
                <SelectItem value="all" className="font-bold py-3 uppercase tracking-wider text-[10px]">Tüm Kategoriler</SelectItem>
                <SelectItem value="1" className="font-bold py-3 uppercase tracking-wider text-[10px]">Saç ve Güzellik</SelectItem>
                <SelectItem value="2" className="font-bold py-3 uppercase tracking-wider text-[10px]">Sağlık ve Zindelik</SelectItem>
                <SelectItem value="3" className="font-bold py-3 uppercase tracking-wider text-[10px]">Profesyonel Hizmetler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingOverlay />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorState 
                  message="Pazar yeri listeleri yüklenemedi." 
                  onRetry={() => refetch()} 
                />
              </motion.div>
            ) : businesses.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sonuç bulunamadı</h3>
                <p className="text-slate-500 max-w-xs font-medium">Mevcut arama kriterlerinize uygun herhangi bir işletme bulamadık.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {businesses.map((business: any) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {!isLoading && !error && businesses.length > 0 && (
          <div className="mt-20 flex justify-center">
            <Pagination 
              currentPage={meta.current_page} 
              totalPages={meta.last_page} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
