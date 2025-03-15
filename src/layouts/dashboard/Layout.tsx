// DashboardLayout.tsx

import React from 'react';
import { DashboardSidebar } from '@/layouts/dashboard/Sidebar';
import { DashboardHeader } from '@/layouts/dashboard/Header';
import NotificationBanner from '@/components/notifications/default';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-6 text-[var(--font-size-base)]">
          <NotificationBanner />
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
