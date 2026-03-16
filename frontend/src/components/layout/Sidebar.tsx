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
      { name: 'Overview', href: '/dashboard/owner', icon: LayoutDashboard },
      { name: 'Calendar', href: '/dashboard/owner/calendar', icon: Calendar },
      { name: 'Staff', href: '/dashboard/owner/staff', icon: Users },
      { name: 'Services', href: '/dashboard/owner/services', icon: Zap },
      { name: 'Settings', href: '/dashboard/owner/settings', icon: Settings },
    ],
    customer: [
      { name: 'Explore', href: '/explore', icon: Search },
      { name: 'My Bookings', href: '/dashboard/customer', icon: Calendar },
      { name: 'Favorites', href: '/dashboard/customer/favorites', icon: Heart },
      { name: 'My Reviews', href: '/dashboard/customer/reviews', icon: MessageSquare },
      { name: 'Profile', href: '/dashboard/customer/profile', icon: User },
    ],
    admin: [
      { name: 'Platform Overview', href: '/dashboard/admin', icon: TrendingUp },
      { name: 'Businesses', href: '/dashboard/admin/businesses', icon: Building2 },
      { name: 'User Management', href: '/dashboard/admin/users', icon: ShieldCheck },
      { name: 'Review Moderation', href: '/dashboard/admin/reviews', icon: MessageSquare },
      { name: 'System Settings', href: '/dashboard/admin/settings', icon: Settings },
    ]
  };

  const navigation = roleNavItems[user?.role || 'customer'] || roleNavItems.customer;

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-950 sticky top-0 h-screen hidden lg:flex shrink-0">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center glow-teal">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Destec<span className="text-teal-500">Planner</span>
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
                ? "bg-teal-600/10 text-teal-400 border-teal-500/20" 
                : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300"
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
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-100">{user?.name}</p>
              <Badge variant="secondary" className="text-[10px] uppercase h-4 px-1 leading-none mt-1">
                {user?.role}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="w-full gap-2 border-slate-800 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
