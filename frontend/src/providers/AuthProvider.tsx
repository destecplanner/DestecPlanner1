'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'owner' | 'admin' | 'staff';
  business_id?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    
    // Sync cookie in case it was cleared but token remains or vice-versa
    if (token) {
      document.cookie = `auth_session=true; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
      api.get('/v1/auth/me')
        .then(res => setUser(res.data.data))
        .catch(() => {
          localStorage.removeItem('auth_token');
          document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        })
        .finally(() => setLoading(false));
    } else {
      document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setLoading(false);
    }

    // Cross-tab sync: Logout if token is removed in another tab
    const syncLogout = (e: StorageEvent) => {
      if (e.key === 'auth_token' && !e.newValue) {
        setUser(null);
        document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = '/auth/login';
      }
    };

    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token);
    // Set lightweight cookie for middleware access
    document.cookie = `auth_session=true; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
    setUser(userData);
  };

  const logout = () => {
    api.post('/v1/auth/logout').finally(() => {
      localStorage.removeItem('auth_token');
      document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
      window.location.href = '/auth/login';
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
