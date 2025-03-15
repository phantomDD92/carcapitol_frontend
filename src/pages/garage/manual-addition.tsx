'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { AdditionalOptionsTab } from '@/sections/manualAddition/additional-options.-tab';
import { BasicInformationTab } from '@/sections/manualAddition/basic-information-tab';
import { CharacteristicsTab } from '@/sections/manualAddition/chracteristics-tab';
import { DocumentsTab } from '@/sections/manualAddition/documents-tab';
import { PriceTab } from '@/sections/manualAddition/price-tab';
import { PhotoTab } from '@/sections/manualAddition/photo-tab';
import { UnsavedChangesDialog } from '@/components/custom/unsaved-changes';

const tabOrder = [
  'photo',
  'basic_information',
  'characteristics',
  'additional_options',
  'documents',
  'price',
];

export default function AddCarPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('photo');
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(false);
  const [hasUnsavedChanges] = React.useState(true); // In a real app, track form changes

  const currentTabIndex = tabOrder.indexOf(activeTab);

  const handleNext = () => {
    if (currentTabIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentTabIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabOrder[currentTabIndex - 1]);
    }
  };

  const handleAddToGarage = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
    } else {
      router.push('/garage');
    }
  };

  const handleConfirmNavigation = () => {
    setShowUnsavedDialog(false);
    router.push('/garage');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/garage"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Garage
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">Manual Addition</h1>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} className="space-y-6">
        <TabsList className="bg-white border-b rounded-none h-auto p-0 space-x-6">
          {tabOrder.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                'rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 font-normal cursor-default',
                activeTab === tab && 'border-red-600 font-medium',
              )}
              disabled
            >
              {tab
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="photo">
          <PhotoTab />
        </TabsContent>

        <TabsContent value="basic_information">
          <BasicInformationTab />
        </TabsContent>

        <TabsContent value="characteristics">
          <CharacteristicsTab />
        </TabsContent>

        <TabsContent value="additional_options">
          <AdditionalOptionsTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="price">
          <PriceTab />
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentTabIndex === 0}
        >
          Back
        </Button>
        {currentTabIndex === tabOrder.length - 1 ? (
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleAddToGarage}
          >
            Add to Garage
          </Button>
        ) : (
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>

      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onClose={() => setShowUnsavedDialog(false)}
        onConfirm={handleConfirmNavigation}
      />
    </div>
  );
}

AddCarPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
