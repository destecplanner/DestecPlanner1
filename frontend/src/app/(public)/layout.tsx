import { Header } from '@/components/layout/Header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-slate-900 py-12 px-6 lg:px-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">© 2026 DestecPlanner. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-teal-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-500 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
