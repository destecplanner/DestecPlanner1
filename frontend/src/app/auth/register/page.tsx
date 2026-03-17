'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'customer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== passwordConfirmation) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/v1/auth/register', { 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation,
        role: roleFromUrl
      });
      
      login(res.data.data.access_token, res.data.data.user);
      
      const role = res.data.data.user.role;
      if (role === 'owner') {
        router.push('/dashboard/owner');
      } else {
        router.push('/dashboard/customer');
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          Hesabınızı Oluşturun
        </h2>
        <p className="text-slate-500 text-sm font-medium mt-1">
          {roleFromUrl === 'owner' ? 'İşletmenizi yönetmeye hemen başlayın.' : 'Randevularınızı kolayca yönetin.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ad Soyad</label>
          <Input 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-slate-100 focus:border-teal-500/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">E-posta Adresi</label>
          <Input 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-slate-100 focus:border-teal-500/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Şifre</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-slate-100 focus:border-teal-500/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Şifre Tekrar</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="border-slate-100 focus:border-teal-500/30"
          />
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
            <p className="text-rose-600 text-[10px] font-black uppercase tracking-wider text-center">{error}</p>
          </div>
        )}
        
        <div className="pt-2">
          <Button type="submit" className="w-full h-14 rounded-2xl shadow-xl shadow-teal-600/10 font-black text-base" size="lg" disabled={loading}>
            {loading ? 'Hesap oluşturuluyor...' : 'Ücretsiz Kayıt Ol'}
          </Button>
        </div>
        
        <p className="text-center text-slate-500 text-sm mt-6 font-bold">
          Zaten hesabınız var mı? {' '}
          <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 underline underline-offset-4 decoration-teal-600/20">Giriş Yap</Link>
        </p>
      </form>
    </div>
  );
}
