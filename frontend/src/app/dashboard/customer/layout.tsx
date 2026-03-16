'use client';

import { SharedDashboardLayout } from '@/components/layout/DashboardLayout';

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SharedDashboardLayout requiredRole="customer">
      {children}
    </SharedDashboardLayout>
  );
}
