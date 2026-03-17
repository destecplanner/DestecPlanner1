"use client"

import { motion } from "framer-motion"

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-sans">
      <main className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100"
        >
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight">KVKK Aydınlatma Metni</h1>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Veri Sorumlusu</h2>
              <p className="text-lg italic text-slate-500 mb-2">Destec Medya – Hüsnü Cihan Tepe</p>
              <p>İletişim: <a href="mailto:destek@destecmedya.com" className="text-teal-600 font-bold">destek@destecmedya.com</a></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">İşlenen Kişisel Veriler</h2>
              <p>DestecPlanner platformu kapsamında aşağıdaki kişisel veriler işlenebilir:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Ad ve soyad</li>
                <li>Telefon numarası</li>
                <li>E-posta adresi</li>
                <li>Randevu bilgileri</li>
                <li>IP adresi</li>
                <li>İşlem kayıtları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Kişisel Verilerin İşlenme Amaçları</h2>
              <p>Kişisel veriler aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Kullanıcı hesaplarının oluşturulması</li>
                <li>Randevu yönetimi</li>
                <li>SMS ve e-posta bildirimleri gönderilmesi</li>
                <li>Abonelik hizmetinin sağlanması</li>
                <li>Platform güvenliğinin sağlanması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Kişisel Verilerin Aktarılması</h2>
              <p>Kişisel veriler aşağıdaki hizmet sağlayıcılarla paylaşılabilir:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Ödeme işlemleri için <strong>iyzico</strong> gibi BDDK onaylı kuruluşlar</li>
                <li>Altyapı ve barındırma hizmetleri</li>
              </ul>
            </section>

            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-4">İlgili Kişinin Hakları</h2>
              <p>Kullanıcılar Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahiptir:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
                <li>Verilerine erişim talep etme</li>
                <li>Verilerin düzeltilmesini isteme</li>
                <li>Verilerin silinmesini talep etme</li>
              </ul>
              <p className="mt-6 font-bold text-slate-900">
                Başvurularınız için: <span className="text-teal-600">destek@destecmedya.com</span>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
