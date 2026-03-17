'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Scissors, 
  Hand, 
  Waves, 
  Palette, 
  PenTool, 
  ArrowLeft,
  ChevronLeft 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SectorSelectionPage() {
  const router = useRouter();

  const sectors = [
    { id: 'psikolojik-danismanlik', title: 'Psikolojik Danışmanlık', icon: <Brain className="w-6 h-6 text-indigo-600" />, bg: 'bg-indigo-50' },
    { id: 'guzellik-estetik', title: 'Güzellik ve Estetik Merkezi', icon: <Sparkles className="w-6 h-6 text-teal-600" />, bg: 'bg-teal-50' },
    { id: 'bayan-kuaforu', title: 'Bayan Kuaförü', icon: <Scissors className="w-6 h-6 text-pink-600" />, bg: 'bg-pink-50' },
    { id: 'erkek-kuaforu', title: 'Erkek Kuaförü', icon: <Scissors className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-50' },
    { id: 'tirnak-atolyesi', title: 'Tırnak Atölyesi', icon: <Hand className="w-6 h-6 text-rose-600" />, bg: 'bg-rose-50' },
    { id: 'spa-merkezi', title: 'Spa Merkezi', icon: <Waves className="w-6 h-6 text-cyan-600" />, bg: 'bg-cyan-50' },
    { id: 'makyaj-atolyesi', title: 'Makyaj Atölyesi', icon: <Palette className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50' },
    { id: 'dovme-merkezi', title: 'Dövme Merkezi', icon: <PenTool className="w-6 h-6 text-slate-800" />, bg: 'bg-slate-100' },
    { id: 'sac-tasarim', title: 'Saç Tasarım Merkezi', icon: <Scissors className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header with Back Button */}
      <div className="relative">
        <button 
          onClick={() => router.back()}
          className="absolute -top-1 left-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          GERİ DÖN
        </button>

        <div className="text-center pt-8 space-y-4">
          <div className="inline-flex items-center justify-center">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900">
              Destec<span className="text-teal-600 italic">Planner</span>
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Sektörünüzü Seçin</h2>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <Link
            key={sector.id}
            href={`/auth/register?role=owner&sector=${sector.id}`}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:scale-[1.05] transition-all duration-300 gap-4 group"
          >
            <div className={`w-14 h-14 ${sector.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              {sector.icon}
            </div>
            <span className="text-[11px] font-bold text-slate-900 text-center leading-tight px-1">
              {sector.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Zaten bir hesabınız var mı? {' '}
          <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 font-bold ml-1">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
