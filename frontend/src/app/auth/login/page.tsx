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

    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
          Tekrar Hoş Geldiniz
        </h2>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          İşletmenizi ve randevularınızı yönetmek için giriş yapın.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">E-posta Adresi</label>
          <Input 
            type="email" 
            placeholder="isim@ornek.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 rounded-2xl border-stone-100 bg-stone-50/30 focus:bg-white transition-all text-slate-900 placeholder:text-stone-300 font-bold"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Şifre</label>
            <Link href="/auth/forgot-password" title="Şifremi Unuttum" className="text-[10px] font-black uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
              Şifremi Unuttum
            </Link>
          </div>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-14 rounded-2xl border-stone-100 bg-stone-50/30 focus:bg-white transition-all text-slate-900 placeholder:text-stone-300 font-bold"
          />
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
            <p className="text-rose-600 text-[10px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              {error}
            </p>
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full h-16 rounded-full shadow-[0_20px_40px_-10px_rgba(63,176,172,0.3)] font-black text-lg transition-all active:scale-[0.98] hover:shadow-[0_25px_50px_-12px_rgba(63,176,172,0.4)]" 
            size="lg" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
              </span>
            ) : 'Giriş Yap'}
          </Button>
        </div>
        
        <div className="pt-6 border-t border-stone-100">
          <p className="text-center text-slate-400 text-sm font-bold">
            Hesabınız yok mu? {' '}
            <Link href="/auth/register" className="text-primary hover:text-primary/80 underline underline-offset-8 decoration-primary/20 hover:decoration-primary/40 transition-all font-black ml-1">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </form>
    </div>
}
