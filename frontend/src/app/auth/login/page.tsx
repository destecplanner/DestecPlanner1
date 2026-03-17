'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">E-posta Adresi</label>
        <Input 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Şifre</label>
        <Input 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {error && <p className="text-rose-600 text-[10px] font-bold uppercase tracking-wider mt-2 bg-rose-50 p-3 rounded-xl border border-rose-100">{error}</p>}
      
      <Button type="submit" className="w-full h-14 rounded-2xl shadow-lg shadow-teal-600/20" size="lg" disabled={loading}>
        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </Button>
      
      <p className="text-center text-slate-500 text-sm mt-6 font-medium">
        Hesabınız yok mu? {' '}
        <button type="button" className="text-teal-600 hover:text-teal-700 font-bold underline underline-offset-4 decoration-teal-600/20">Kayıt Ol</button>
      </p>
    </form>
  );
}
