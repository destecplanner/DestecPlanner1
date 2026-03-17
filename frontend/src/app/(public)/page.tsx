'use client';

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 md:pt-40 md:pb-56 max-w-7xl mx-auto z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            <Sparkles className="w-3 h-3" />
            Vizyoner İşletmeleri Güçlendiriyoruz
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] text-slate-900">
            Modern Randevu <br />
            <span className="text-gradient">Yeniden Tanımlandı.</span>
          </h1>
          
          <p className="text-slate-600 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed font-bold">
            Hızla büyüyen işletmeler için elit randevu ekosistemi. 
            Müşterilerle bağlantı kurun, iş akışlarını otomatikleştirin ve markanızı cerrahi hassasiyetle ölçeklendirin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button size="lg" asChild className="group h-20 px-12 rounded-full">
              <Link href="/explore">
                Keşfetmeye Başla
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-20 px-12 rounded-full border-stone-200 hover:bg-stone-50 text-slate-800">
              <Link href="/auth/register?role=owner">İşletme Kaydı</Link>
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full -z-10 animate-pulse" />
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
      <section className="px-6 py-32">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass-card rounded-[4rem] p-16 md:p-32 text-center border-stone-100 shadow-2xl"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">İşletme operasyonlarınızı <br/> yükseltmeye hazır mısınız?</h2>
          <p className="text-slate-600 text-xl mb-16 max-w-2xl mx-auto font-bold opacity-80">Zamanlarını ve büyümelerini yönetmek için DestecPlanner kullanan profesyonellerin premium ağına katılın.</p>
          <Button size="lg" asChild className="h-20 px-16 rounded-full shadow-3xl shadow-primary/30">
            <Link href="/auth/register?role=owner">Ücretsiz Başla</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-10 glass-card border-slate-100 hover:border-teal-500/20 transition-all flex flex-col gap-6"
    >
      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
      </div>
    </motion.div>
  );
}
