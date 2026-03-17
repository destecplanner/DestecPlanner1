'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-40 md:pt-56 md:pb-72 max-w-7xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-stone-100 border border-stone-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            VİZYONER İŞLETMELERİ GÜÇLENDİRİYORUZ
          </motion.div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-12 leading-[0.85] text-slate-900">
            Modern Randevu <br />
            <span className="text-gradient">Yeniden Tanımlandı.</span>
          </h1>
          
          <p className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto mb-20 leading-relaxed font-bold opacity-80">
            Hızla büyüyen işletmeler için elit randevu ekosistemi. 
            Müşterilerle bağlantı kurun, iş akışlarını otomatikleştirin ve markanızı hassasiyetle ölçeklendirin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button size="lg" asChild className="group">
              <Link href="/explore">
                Keşfetmeye Başla
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-stone-200 hover:bg-stone-50 text-slate-800">
              <Link href="/register">İşletme Kaydı</Link>
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 blur-[160px] rounded-full -z-10 animate-pulse" />
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
