'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import * as React from 'react';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { ChatSidebar } from '@/sections/chat/chat-sidebar';
import { useRouter } from 'next/router';

interface ApplicationDetails {
  id: string;
  vehicle: string;
  creditor: string;
  approvalAmount: number;
  applicationDate: string;
  status:
    | 'submitted'
    | 'under_consideration'
    | 'approved'
    | 'waiting_for_payment'
    | 'completed';
  interestRate: number;
  rateType: string;
  monthlyPayment: number;
  loanTerm: number;
  originationFee: number;
  insurancePremium: number;
  modificationFee: number;
}

const getApplicationDetails = (id: string): ApplicationDetails => {
  // This would typically fetch from an API
  return {
    id,
    vehicle: 'Porsche Cayman 2019, 718 Cayman S',
    creditor: 'Capital One Auto Finance',
    approvalAmount: 25000,
    applicationDate: 'Sep 1, 2024',
    status: 'waiting_for_payment',
    interestRate: 4.5,
    rateType: 'Fixed Interest Rate: 4.5% APR.',
    monthlyPayment: 450,
    loanTerm: 36,
    originationFee: 20,
    insurancePremium: 5,
    modificationFee: 5,
  };
};

const statusSteps = [
  { key: 'submitted', label: 'Application submitted' },
  { key: 'under_consideration', label: 'Under consideration' },
  { key: 'approved', label: 'Approved' },
  { key: 'waiting_for_payment', label: 'Waiting for payment' },
  { key: 'completed', label: 'Completed' },
];

export default function ApplicationDetailPage() {
  const router = useRouter();
  const { applicationId } = router.query;
  const application = getApplicationDetails(applicationId as string);
  const [chatOpen, setChatOpen] = React.useState(false);
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === application.status,
  );
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="min-h-screen bg-white rounded-lg">
      <div className="container mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-gray-900">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/application" className="hover:text-gray-900">
            Application Status
          </Link>
          <span>/</span>
          <span className="text-gray-900">Application Status</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{application.vehicle}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => setChatOpen(true)}
              >
                Contact lender
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Pay now</Button>
            </div>
          </div>

          {/* Application Info */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Creditor</p>
              <p className="font-medium">{application.creditor}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Approval Amount</p>
              <p className="font-medium">
                ${application.approvalAmount.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Application Date</p>
              <p className="font-medium">{application.applicationDate}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-6">
            <Progress value={progress} className="h-2" />
            <div className="grid grid-cols-5 gap-4">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                return (
                  <div
                    key={step.key}
                    className={`text-center ${
                      isActive ? 'text-red-600' : 'text-gray-500'
                    }`}
                  >
                    <p className="text-sm font-medium">{step.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Loan Details */}
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Interest Rate</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                {application.interestRate}%
              </p>
              <p className="text-sm text-gray-500">{application.rateType}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Monthly payment</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                ${application.monthlyPayment}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Loan term</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                {application.loanTerm} months
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Origination fee</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                ${application.originationFee}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Insurance premium</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                ${application.insurancePremium} per month
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Modification fee</p>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold">
                ${application.modificationFee}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChatSidebar isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

ApplicationDetailPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
