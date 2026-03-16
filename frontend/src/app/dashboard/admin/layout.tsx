'use client';

import { SharedDashboardLayout } from '@/components/layout/DashboardLayout';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SharedDashboardLayout requiredRole="admin">
      {children}
    </SharedDashboardLayout>
  );
}
