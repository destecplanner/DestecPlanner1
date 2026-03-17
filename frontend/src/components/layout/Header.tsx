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
      isDashboard ? "border-b border-slate-200 bg-white/80 backdrop-blur-md" : (isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-slate-100" : "bg-transparent")
    )}>
      <div className="flex items-center gap-8">
        {!isDashboard && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-600/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Destec<span className="text-teal-600">Planner</span>
            </span>
          </Link>
        )}

        {isDashboard && (
          <div className="hidden md:flex items-center gap-3">
             {/* Dashboard-specific context like Breadcrumbs can go here */}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {isDashboard ? (
              <>
                <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
                </button>
                <div className="h-8 w-[1px] bg-slate-100 mx-2" />
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-teal-600">
                     <User className="w-5 h-5" />
                   </div>
                </div>
              </>
            ) : (
              <Button asChild variant="glass" size="sm" className="hidden sm:flex gap-2">
                <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/customer'}>
                  <LayoutDashboard className="w-4 h-4" />
                  Panel
                </Link>
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors">
              Giriş Yap
            </Link>
            <Button asChild size="sm" className="rounded-xl font-bold shadow-lg shadow-teal-600/10">
              <Link href="/auth/register">
                Ücretsiz Başlayın
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
