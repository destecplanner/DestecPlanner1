"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Mail, MapPin, Phone, MessageSquare, Globe, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">İletişim</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya teknik destek talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-100 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all p-8">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">E-posta</h3>
              <p className="text-slate-500 font-medium mb-4">Genel sorular ve destek için:</p>
              <a href="mailto:destek@destecmedya.com" className="text-teal-600 font-black text-lg hover:underline">
                destek@destecmedya.com
              </a>
            </Card>

            <Card className="border-slate-100 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all p-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Canlı Destek</h3>
              <p className="text-slate-500 font-medium mb-4">Hafta içi 09:00 - 18:00 arası portal üzerinden ulaşabilirsiniz.</p>
              <span className="text-blue-600 font-black text-lg">Panel içi mesajlaşma</span>
            </Card>

            <Card className="border-slate-100 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all p-8 md:col-span-2">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ofis Adresi</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                Destec Medya – Hüsnü Cihan Tepe<br />
                Uşak / Türkiye
              </p>
            </Card>
          </div>

          {/* Business Info Sidebar */}
          <Card className="border-slate-100 bg-white rounded-[2.5rem] shadow-xl p-8 h-fit">
            <h3 className="text-xl font-black text-slate-900 mb-8">Kurumsal Bilgiler</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unvan</p>
                  <p className="text-sm font-bold text-slate-900">Destec Medya</p>
                  <p className="text-xs text-slate-500">Hüsnü Cihan Tepe</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Çalışma Saatleri</p>
                  <p className="text-sm font-bold text-slate-900">Pzt - Cuma: 09:00 - 18:00</p>
                  <p className="text-xs text-slate-500">Hafta sonu kapalı</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                DestecPlanner bir Destec Medya iştirakidir. Tüm teknik altyapı ve destek hizmetleri Destec Medya tarafından sağlanmaktadır.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
