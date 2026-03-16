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
      isDashboard ? "border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md" : (isScrolled ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50" : "bg-transparent")
    )}>
      <div className="flex items-center gap-8">
        {!isDashboard && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center glow-teal">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Destec<span className="text-teal-500">Planner</span>
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
                <button className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full border-2 border-slate-950" />
                </button>
                <div className="h-8 w-[1px] bg-slate-800 mx-2" />
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400">
                     <User className="w-5 h-5" />
                   </div>
                </div>
              </>
            ) : (
              <Button asChild variant="glass" size="sm" className="hidden sm:flex gap-2">
                <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/customer'}>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
            <Button asChild size="sm">
              <Link href="/auth/register">
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
