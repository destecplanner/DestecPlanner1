"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <main className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100"
        >
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight">Gizlilik Politikası</h1>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
            <p className="text-lg">
              DestecPlanner kullanıcı verilerinin gizliliğini korumayı taahhüt eder. Bu politika, verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
            </p>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Veri Kullanım Amaçları</h2>
              <p>Toplanan bilgiler yalnızca şu amaçlarla kullanılmaktadır:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Randevu ve rezervasyon yönetimi</li>
                <li>Kullanıcı hesaplarının yönetimi ve doğrulanması</li>
                <li>Abonelik ve ödeme hizmetlerinin sağlanması</li>
                <li>Sistem güvenliği ve kötüye kullanımın önlenmesi</li>
              </ul>
            </section>

            <section className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
              <h2 className="text-2xl font-black text-slate-900 mb-4 text-teal-900">Ödeme ve Güvenlik</h2>
              <ul className="list-disc pl-6 space-y-3 text-teal-800">
                <li>Ödeme ve kredi kartı bilgileri platformumuz tarafından kesinlikle <strong>saklanmaz</strong>.</li>
                <li>Tüm finansal işlemler BDDK onaylı ve yüksek güvenlikli ödeme altyapıları üzerinden gerçekleştirilir.</li>
                <li>Kullanıcı verileri modern şifreleme yöntemleri (SSL/HTTPS) kullanılarak güvenli sunucularda saklanır.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Çerezler (Cookies)</h2>
              <p>
                Platformun işleyişini optimize etmek ve kullanıcı deneyimini iyileştirmek için teknik çerezler kullanılmaktadır. Bu çerezler oturum yönetimi ve tercihlerin hatırlanması gibi temel fonksiyonlar için gereklidir.
              </p>
            </section>

            <p className="pt-8 border-t border-slate-100 text-sm text-slate-400 italic">
              Gizlilik politikamızda yapılan güncellemeler bu sayfa üzerinden duyurulacaktır. Sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
