"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <main className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100"
        >
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight">Kullanım Koşulları</h1>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
            <section>
              <p className="text-lg">
                DestecPlanner, profesyonel hizmet sağlayan işletmeler ve onların müşterileri için geliştirilmiş bir bulut tabanlı randevu yönetim platformudur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Kullanıcı Sorumlulukları</h2>
              <p>Platformu kullanan işletmeler ve bireysel kullanıcılar:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Sisteme girilen tüm verilerin (randevu saatleri, hizmet bedelleri vb.) doğruluğundan sorumludur.</li>
                <li>Platformu hukuka aykırı veya zarar verici amaçlarla kullanamaz.</li>
                <li>Üçüncü kişilerin veya müşterilerin kişisel verilerini platform dışı amaçlarla işleyemez.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Hizmet Sürekliliği</h2>
              <p>
                DestecPlanner, sistemin %99.9 oranında erişilebilir kalması için teknik altyapısını sürekli güncel tutar. Ancak mücbir sebepler, internet servis sağlayıcı kaynaklı sorunlar veya planlı bakım çalışmaları sırasındaki kısa süreli kesintilerden sorumlu tutulamaz.
              </p>
            </section>

            <section className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
              <h2 className="text-2xl font-black text-slate-900 mb-4 text-amber-900">Bildirimler ve Onay</h2>
              <p className="text-amber-800">
                Platform; randevu hatırlatmaları, doğrulama kodları ve sistem bilgilendirmeleri amacıyla SMS ve e-posta gönderebilir. İşletmeler, kendi müşterilerine ticari mesaj göndermeden önce gerekli yasal izinleri (İYS/KVKK) almakla yükümlüdür.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Yazılım Hakkı</h2>
              <p>
                DestecPlanner markası, kod tabanı, tasarımı ve tüm dijital varlıkları Destec Medya'ya aittir. Kopyalanması veya tersine mühendislik yapılması yasaktır.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
