// DashboardPage.tsx
import React from 'react';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';

import { SavedCars } from '@/sections/dashboard/SavedCars';
import { UpcomingEvents } from '@/sections/dashboard/UpcomingEvents';
import { ApplicationStatus } from '@/sections/dashboard/ApplicationStatus';

export default function DashboardPage() {
  return (
    <>
      <SavedCars />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="md:col-span-1">
          <UpcomingEvents />
        </div>
        <div className="md:col-span-2">
          <ApplicationStatus />
        </div>
      </div>
    </>
  );
}

DashboardPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
