'use client';

import { useState, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/v1/auth/login', { email, password });
      login(res.data.data.access_token, res.data.data.user);
      
      const role = res.data.data.user.role;
      const returnTo = searchParams.get('returnTo');
      
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
    <div className="flex flex-col gap-10">
      {/* Logo & Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">
            Destec<span className="text-teal-600 italic">planner</span>
          </h1>
        </div>
        <div className="space-y-3">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">Hoş Geldiniz</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">YÖNETİM PANELİNE GİRİŞ</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 ml-1">
            E-posta Adresi <span className="text-teal-500 ml-0.5">*</span>
          </label>
          <Input 
            type="email" 
            placeholder="ornek@mail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 rounded-2xl border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-base"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 ml-1">
            Şifre <span className="text-teal-500 ml-0.5">*</span>
          </label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-14 rounded-2xl border-gray-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-base"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 transition-all" />
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Beni Hatırla</span>
          </label>
          <Link href="/auth/forgot-password" title="Şifremi Unuttum" className="text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors">
            Şifremi Unuttum
          </Link>
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
            <p className="text-rose-600 text-xs font-bold text-center leading-relaxed">
              {error}
            </p>
          </div>
        )}
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl bg-[#45B1A8] hover:bg-[#3ca198] text-white font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98] disabled:opacity-70 border-0 text-lg" 
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            İşletme hesabınız yok mu? {' '}
            <Link href="/auth/register" className="text-teal-500 hover:text-teal-600 font-bold ml-1">
              Şimdi kayıt olun
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-400 font-bold tracking-widest text-xs">Yükleniyor...</div>}>
      <LoginForm />
    </Suspense>
  );
}
