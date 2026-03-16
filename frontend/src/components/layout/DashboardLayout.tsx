'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface SharedDashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'owner' | 'customer';
}

export function SharedDashboardLayout({ children, requiredRole }: SharedDashboardLayoutProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/auth/login');
    }
    
    if (!loading && user && requiredRole && user.role !== requiredRole) {
      // Basic role protection
      if (user.role === 'owner') redirect('/dashboard/owner');
      else if (user.role === 'admin') redirect('/dashboard/admin');
      else redirect('/dashboard/customer');
    }
  }, [user, loading, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header isDashboard={true} />
        <main className="flex-1 p-6 lg:p-10 animate-fade-in overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
