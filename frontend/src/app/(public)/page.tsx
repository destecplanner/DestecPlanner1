'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, ArrowRight, Sparkles, Search, MapPin, Scissors, HeartPulse, GraduationCap, Dumbbell, Star } from "lucide-react";

export default function HomePage() {
  const popularSearches = [
    "Kişisel Bakım", "Sağlık & Terapi", "Eğitim", "Fitness", "Danışmanlık", "Etkinlik"
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-teal-50/50 to-transparent -z-10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 md:pt-40 md:pb-48 max-w-7xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold shadow-sm mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            Kendinize En Uygun Hizmeti Bulun
          </motion.div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Profesyonel Hizmet ve <br />
              <span className="text-primary">Randevunuzu Alın</span>
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Şehrinizdeki en iyi uzmanları, hizmet merkezlerini ve profesyonel işletmeleri keşfedin. Saniyeler içinde online randevu oluşturun.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full p-2 pl-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row items-center gap-4 transition-all duration-300">
              <div className="flex-1 flex items-center gap-4 w-full border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                <Search className="w-6 h-6 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Ne arıyorsunuz? (Örn. Saç Kesimi)" 
                  className="bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-bold"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-4 w-full py-3 md:py-0">
                <MapPin className="w-6 h-6 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Nerede? (Örn. Kadıköy, İstanbul)" 
                  className="bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-bold"
                />
              </div>

              <Button className="w-full md:w-auto px-12 bg-primary hover:brightness-110 text-white shadow-xl shadow-primary/20 border-0">
                Ara
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-slate-400 text-sm font-medium mr-2">Popüler aramalar:</span>
            {popularSearches.map((search) => (
              <button 
                key={search} 
                className="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-24 relative bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4 text-left">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">Hizmet Kategorileri</h2>
                <p className="text-slate-500 text-lg font-bold opacity-80">İhtiyacınıza en uygun uzmanı seçin</p>
              </div>
              <Link href="/explore" className="flex items-center gap-2 text-primary font-bold hover:text-primary transition-colors group">
                Tümünü Gör
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard 
              icon={<Scissors className="w-8 h-8 text-teal-600" />}
              title="Kişisel Bakım"
              subtext="2.5k+ Hizmet Noktası"
            />
            <CategoryCard 
              icon={<HeartPulse className="w-8 h-8 text-teal-600" />}
              title="Sağlık & Terapi"
              subtext="1.2k+ Uzman"
            />
            <CategoryCard 
              icon={<GraduationCap className="w-8 h-8 text-teal-600" />}
              title="Eğitim & Kurs"
              subtext="450+ Eğitmen"
            />
            <CategoryCard 
              icon={<Dumbbell className="w-8 h-8 text-teal-600" />}
              title="Spor & Fitness"
              subtext="600+ Salon"
            />
          </div>
        </div>
      </section>

      {/* Popular Businesses Section */}
      <section className="px-6 py-24 relative bg-[#FBFBFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Şehrin En İyileri</h2>
            <p className="text-slate-500 text-lg font-bold opacity-80">Müşterilerden en yüksek puan alan işletmeleri keşfedin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <BusinessCard 
              image="/placeholder-business.jpg"
              rating="4.9"
              category="Hizmet Merkezi"
              title="Premium Bakım Merkezi"
              location="Kadıköy, İstanbul (1.2 km)"
              price="250"
            />
            <BusinessCard 
              image="/placeholder-business.jpg"
              rating="4.8"
              category="Güzellik Salonu"
              title="Elite Hair & Beauty"
              location="Şişli, İstanbul (3.5 km)"
              price="180"
            />
            <BusinessCard 
              image="/placeholder-business.jpg"
              rating="5.0"
              category="Spa & Masaj"
              title="Zen Wellness Center"
              location="Beşiktaş, İstanbul (2.1 km)"
              price="450"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-40">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass-card rounded-[5rem] p-24 md:p-48 text-center border-stone-100 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)]"
        >
          <h2 className="text-7xl md:text-[9rem] font-black mb-12 tracking-tighter text-slate-900 leading-[0.9]">İşletmenizi <br/> yükseltin.</h2>
          <p className="text-slate-500 text-xl mb-20 max-w-2xl mx-auto font-bold opacity-70 italic">Zamanlarını ve büyümelerini yönetmek için DestecPlanner kullanan profesyonellerin premium ağına katılın.</p>
          <Button size="lg" asChild className="h-24 px-20 text-2xl">
            <Link href="/register">Ücretsiz Başla</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

function BusinessCard({ image, rating, category, title, location, price }: { 
  image: string, rating: string, category: string, title: string, location: string, price: string 
}) {
  return (
    <motion.div 
      className="premium-card flex flex-col group overflow-hidden"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm self-start px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 z-10 border border-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-slate-900">{rating}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
            {category}
          </div>
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="text-slate-900 font-bold">
            <span className="text-slate-400 text-sm font-medium mr-2">Başlangıç</span>
            <span className="text-xl">₺{price}'den</span>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-slate-50 text-slate-400 font-bold text-sm group-hover:bg-teal-50 group-hover:text-teal-600 transition-all border border-transparent group-hover:border-teal-100">
            Randevu Al
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryCard({ icon, title, subtext }: { icon: React.ReactNode, title: string, subtext: string }) {
  return (
    <motion.div 
      className="premium-card p-10 flex flex-col items-center text-center gap-8 group cursor-pointer"
    >
      <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-black text-slate-900 leading-tight">{title}</h3>
        <p className="text-slate-500 font-bold text-sm tracking-tight opacity-70">{subtext}</p>
      </div>
    </motion.div>
  );
}
