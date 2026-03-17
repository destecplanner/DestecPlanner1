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
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sıradaki Deneyiminizi Bulun</h1>
          </motion.div>
          <p className="text-slate-600 max-w-xl leading-relaxed font-medium">
            Yakınınızdaki premium işletmeleri keşfedin. Kategoriye, konuma göre filtreleyin veya doğrudan favori profesyonellerinizi arayın.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card p-4 rounded-[2.5rem] border-slate-200 mb-16 flex flex-col lg:flex-row gap-4 items-center shadow-xl bg-white/80">
          <div className="relative flex-1 w-full pl-6">
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Hizmet, işletme veya profesyonel arayın..." 
              className="pl-12 bg-transparent border-0 focus-visible:ring-0 h-14"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-8 w-px bg-slate-200 hidden lg:block" />
          <div className="flex w-full lg:w-auto gap-4">
            <div className="relative flex-1 lg:w-64">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <Input 
                placeholder="Tüm Şehirler" 
                className="pl-12 bg-slate-50 border-slate-200 h-14 rounded-2xl"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full lg:w-48 h-14 rounded-2xl border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <SelectValue placeholder="Kategori" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="1">Saç ve Güzellik</SelectItem>
                <SelectItem value="2">Sağlık ve Zindelik</SelectItem>
                <SelectItem value="3">Profesyonel Hizmetler</SelectItem>
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
