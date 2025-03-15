'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { FaqTab } from '@/sections/help/faq-tab';
import { VideoGuidesTab } from '@/sections/help/video-guide-tab';
import { ContactSupportTab } from '@/sections/help/contact-support-tab';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-medium">Welcome to the Help Center!</h1>
          <p className="text-sm text-gray-500">
            Here you can find answers to common questions and resources to
            assist you in using our platform.
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="w-full border-b rounded-none h-auto p-0 space-x-6">
            <TabsTrigger
              value="faq"
              className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
            >
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="video-guides"
              className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
            >
              Video Guides
            </TabsTrigger>
            <TabsTrigger
              value="contact-support"
              className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal data-[state=active]:border-red-600 data-[state=active]:text-red-600"
            >
              Contact Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <FaqTab />
          </TabsContent>

          <TabsContent value="video-guides">
            <VideoGuidesTab />
          </TabsContent>

          <TabsContent value="contact-support">
            <ContactSupportTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

HelpPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
