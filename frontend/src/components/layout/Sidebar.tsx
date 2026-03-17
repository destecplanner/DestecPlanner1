'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Zap, 
  Settings, 
  LogOut,
  ChevronRight,
  User,
  Search,
  History,
  Heart,
  ShieldCheck,
  Building2,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const roleNavItems: Record<string, any[]> = {
    owner: [
      { name: 'Genel Bakış', href: '/dashboard/owner', icon: LayoutDashboard },
      { name: 'Takvim', href: '/dashboard/owner/calendar', icon: Calendar },
      { name: 'Personel', href: '/dashboard/owner/staff', icon: Users },
      { name: 'Hizmetler', href: '/dashboard/owner/services', icon: Zap },
      { name: 'Ayarlar', href: '/dashboard/owner/settings', icon: Settings },
    ],
    customer: [
      { name: 'Keşfet', href: '/explore', icon: Search },
      { name: 'Randevularım', href: '/dashboard/customer', icon: Calendar },
      { name: 'Favoriler', href: '/dashboard/customer/favorites', icon: Heart },
      { name: 'Değerlendirmelerim', href: '/dashboard/customer/reviews', icon: MessageSquare },
      { name: 'Profil', href: '/dashboard/customer/profile', icon: User },
    ],
    admin: [
      { name: 'Platform Özeti', href: '/dashboard/admin', icon: TrendingUp },
      { name: 'İşletmeler', href: '/dashboard/admin/businesses', icon: Building2 },
      { name: 'Kullanıcı Yönetimi', href: '/dashboard/admin/users', icon: ShieldCheck },
      { name: 'Yorum Denetimi', href: '/dashboard/admin/reviews', icon: MessageSquare },
      { name: 'Sistem Ayarları', href: '/dashboard/admin/settings', icon: Settings },
    ]
  };

  const navigation = roleNavItems[user?.role || 'customer'] || roleNavItems.customer;

  return (
    <aside className="w-64 border-r border-slate-200 flex flex-col bg-slate-50 sticky top-0 h-screen hidden lg:flex shrink-0">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center glow-teal">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Destec<span className="text-teal-600">Planner</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between group px-4 py-3 rounded-xl transition-all border border-transparent",
                isActive 
                ? "bg-teal-600/10 text-teal-700 border-teal-600/20" 
                : "text-slate-500 hover:bg-white hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass p-4 flex flex-col gap-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-600 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900">{user?.name}</p>
              <Badge variant="secondary" className="text-[10px] uppercase h-4 px-1 leading-none mt-1">
                {user?.role === 'owner' ? 'işletme sahibi' : user?.role === 'admin' ? 'yönetici' : 'müşteri'}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="w-full gap-2 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </aside>
  );
}
