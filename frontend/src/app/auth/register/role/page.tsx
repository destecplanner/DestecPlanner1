'use client';

import { ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';

export default function RoleSelectionPage() {
  const roles = [
    {
      id: 'customer',
      title: 'Müşteriyim',
      description: 'Randevu alıp hizmetleri keşfetmek istiyorum.',
      icon: <ShoppingBag className="w-6 h-6 text-teal-600" />,
      href: '/auth/register?role=customer',
      iconBg: 'bg-teal-50',
    },
    {
      id: 'owner',
      title: 'İşletme Sahibiyim',
      description: 'Hizmet verip işletmemi yönetmek istiyorum.',
      icon: <Store className="w-6 h-6 text-indigo-600" />,
      href: '/auth/register/sector',
      iconBg: 'bg-indigo-50',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Logo & Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">
            Destec<span className="text-teal-600 italic">Planner</span>
          </h1>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Hoş Geldiniz</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            LÜTFEN DEVAM ETMEK İÇİN BİR HESAP TÜRÜ SEÇİN
          </p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="flex flex-col gap-4">
        {roles.map((role) => (
          <Link 
            key={role.id}
            href={role.href}
            className="flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
          >
            <div className={`flex-shrink-0 w-14 h-14 ${role.iconBg} rounded-xl flex items-center justify-center group-hover:bg-opacity-80 transition-colors`}>
              {role.icon}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
              <p className="text-sm text-slate-500">{role.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Zaten bir hesabınız var mı? {' '}
          <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 font-bold ml-1">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
