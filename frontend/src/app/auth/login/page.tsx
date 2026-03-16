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
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Email Address</label>
        <Input 
          type="email" 
          placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Password</label>
        <Input 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
      
      <p className="text-center text-slate-400 text-sm mt-4">
        Don't have an account? {' '}
        <button type="button" className="text-teal-400 hover:underline">Register</button>
      </p>
    </form>
  );
}
