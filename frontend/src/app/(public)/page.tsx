'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, ArrowRight, Sparkles, Search, MapPin } from "lucide-react";

export default function HomePage() {
  const popularSearches = [
    "Kişisel Bakım", "Sağlık & Terapi", "Eğitim", "Fitness", "Danışmanlık", "Etkinlik"
  ];

  return (
    <div className="relative overflow-hidden bg-[#FBFBFC]">
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Profesyonel Hizmet ve <br />
              <span className="text-teal-500">Randevunuzu Alın</span>
            </h1>
            
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Şehrinizdeki en iyi uzmanları, hizmet merkezlerini ve profesyonel işletmeleri keşfedin. Saniyeler içinde online randevu oluşturun.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full p-2 pl-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Ne arıyorsunuz? (Örn. Saç Kesimi)" 
                  className="bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-medium"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-3 w-full py-3 md:py-0">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Nerede? (Örn. Kadıköy, İstanbul)" 
                  className="bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-medium"
                />
              </div>

              <Button className="w-full md:w-auto h-14 px-10 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg shadow-lg shadow-teal-500/20 border-0">
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

      {/* Feature Grid */}
      <section className="px-6 py-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Anında Randevu"
              description="Tescilli gerçek zamanlı doğrulama motoru, çakışan randevuları ortadan kaldırır ve sıfır gecikmeli planlama sağlar."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Üst Düzey Güvenlik"
              description="İşletmenizi ve müşteri verilerinizi koruyan kurumsal düzeyde izolasyon ve rol tabanlı erişim kontrolü."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-primary" />}
              title="Gelişmiş Analizler"
              description="Gelir hızı, personel performansı ve müşteri elde tutma metriklerine ilişkin derin bilgiler."
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="p-12 glass-card border-stone-100 hover:border-primary/20 transition-all flex flex-col gap-8 shadow-xl hover:shadow-2xl"
    >
      <div className="w-16 h-16 bg-stone-50 rounded-[2rem] flex items-center justify-center border border-stone-100 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-base leading-relaxed font-medium opacity-80">{description}</p>
      </div>
    </motion.div>
  );
}
