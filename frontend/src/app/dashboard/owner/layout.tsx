'use client';

import { SharedDashboardLayout } from '@/components/layout/DashboardLayout';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SharedDashboardLayout requiredRole="owner">
      {children}
    </SharedDashboardLayout>
  );
}
