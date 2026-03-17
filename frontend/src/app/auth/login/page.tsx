'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/v1/auth/login', { email, password });
      login(res.data.data.access_token, res.data.data.user);
      
      const role = res.data.data.user.role;
      const returnTo = new URLSearchParams(window.location.search).get('returnTo');
      
      if (returnTo) {
        router.push(returnTo);
      } else if (role === 'owner') {
        router.push('/dashboard/owner');
      } else if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Geçersiz bilgiler');
    } finally {
      setLoading(false);
    }
  };
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
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tekrar Hoş Geldiniz</h2>
          <p className="text-slate-500 text-sm font-medium">Büyümeye devam etmek için giriş yapın</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 ml-1">E-posta Adresi</label>
          <Input 
            type="email" 
            placeholder="isim@ornek.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-xl border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold text-slate-500">Şifre</label>
            <Link href="/auth/forgot-password" title="Şifremi Unuttum" className="text-xs font-bold text-teal-600 hover:text-teal-700">
              Şifremi Unuttum
            </Link>
          </div>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 rounded-xl border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium"
          />
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
            <p className="text-rose-600 text-xs font-bold text-center">
              {error}
            </p>
          </div>
        )}
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 border-0" 
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Giriş Yap'}
          </Button>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Hesabınız yok mu? {' '}
            <Link href="/auth/register" className="text-teal-600 hover:text-teal-700 font-bold ml-1">
              Hemen Kaydol
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
