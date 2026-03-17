import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-slate-100 py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-12">
            <div>
              <p className="text-slate-900 font-black text-xl mb-2">DestecPlanner</p>
              <p className="text-slate-500 text-sm font-medium">© 2026 Tüm hakları saklıdır. Bir Destec Medya iştirakidir.</p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-bold">
              <Link href="/contact" className="text-slate-600 hover:text-teal-600 transition-colors">İletişim</Link>
              <Link href="/kvkk" className="text-slate-600 hover:text-teal-600 transition-colors">KVKK</Link>
              <Link href="/privacy" className="text-slate-600 hover:text-teal-600 transition-colors">Gizlilik Politikası</Link>
              <Link href="/terms" className="text-slate-600 hover:text-teal-600 transition-colors">Kullanım Koşulları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
