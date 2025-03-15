'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FullPaymentTab } from '@/components/custom/full-payment-tab';
import { InstallmentTab } from '@/components/custom/installment-tab';
import { LoanTab } from '@/components/custom/loan-tab';

interface BuyNowSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carImage: string;
  price: number;
}

export function BuyNowSidebar({
  isOpen,
  onClose,
  carName,
  carImage,
  price,
}: BuyNowSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-lg flex flex-col z-50 ">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Buy now</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="full-payment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="full-payment">Full Payment</TabsTrigger>
            <TabsTrigger value="installment">Installment</TabsTrigger>
            <TabsTrigger value="loan">Loan</TabsTrigger>
          </TabsList>

          <TabsContent value="full-payment">
            <FullPaymentTab
              carName={carName}
              carImage={carImage}
              price={price}
              onComplete={onClose}
            />
          </TabsContent>

          <TabsContent value="installment">
            <InstallmentTab
              carName={carName}
              carImage={carImage}
              price={price}
              onComplete={onClose}
            />
          </TabsContent>

          <TabsContent value="loan">
            <LoanTab
              carName={carName}
              carImage={carImage}
              price={price}
              onComplete={onClose}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
