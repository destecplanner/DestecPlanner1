'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Zap, Bell, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Header({ isDashboard = false }: { isDashboard?: boolean }) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "h-20 flex items-center justify-between px-6 lg:px-12 z-50 sticky top-0 transition-all",
      isDashboard ? "border-b border-stone-200 bg-white/80 backdrop-blur-md" : (isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-stone-100 shadow-sm" : "bg-transparent")
    )}>
      <div className="flex items-center gap-8">
        {!isDashboard && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Destec<span className="text-primary">Planner</span>
            </span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {isDashboard ? (
              <>
                <button className="w-11 h-11 rounded-full border border-stone-100 flex items-center justify-center text-slate-400 hover:bg-stone-50 hover:text-slate-900 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
                </button>
                <div className="h-8 w-[1px] bg-stone-100 mx-2" />
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-primary">
                     <User className="w-6 h-6" />
                   </div>
                </div>
              </>
            ) : (
              <Button asChild variant="glass" size="sm" className="hidden sm:flex rounded-full px-6">
                <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/customer'}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Panel
                </Link>
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-8">
            <Link href="/auth/login" className="text-sm font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
              Giriş Yap
            </Link>
            <Button asChild size="sm" className="rounded-full px-8 shadow-2xl shadow-primary/20">
              <Link href="/auth/register">
                Hemen Dene
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
