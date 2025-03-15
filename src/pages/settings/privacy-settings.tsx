'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { TermsOfUseTab } from '@/sections/settings/terms-of-use-tab';
import { PrivacyPolicyTab } from '@/sections/settings/privacy-policy-tab';

export default function PrivacySettings() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-lg font-medium">Privacy Settings</h1>
        <p className="text-sm text-gray-500">
          View our Terms of Use and Privacy Policy to understand how your data
          is handled and protected. For any changes to your privacy preferences,
          please contact support.
        </p>
      </div>

      <Tabs defaultValue="terms" className="w-full">
        <TabsList className="w-full border-b rounded-none h-auto p-0 space-x-6">
          <TabsTrigger
            value="terms"
            className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
          >
            Terms of Use
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
          >
            Privacy Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="terms" className="pt-6">
          <TermsOfUseTab />
        </TabsContent>

        <TabsContent value="privacy" className="pt-6">
          <PrivacyPolicyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

PrivacySettings.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
