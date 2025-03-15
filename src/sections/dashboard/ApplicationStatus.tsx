'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface Application {
  id: string;
  vehicle: string;
  status:
    | 'awaiting_payment'
    | 'confirmed'
    | 'in_progress'
    | 'paid'
    | 'cancelled'
    | 'completed';
  lender: string;
  submittedDate: string;
  approvalAmount: number;
}

const applications: Application[] = [
  {
    id: '1',
    vehicle: '2021 Honda Accord EX',
    status: 'awaiting_payment',
    lender: 'Capital One Auto Finance',
    submittedDate: 'Sep 1, 2024',
    approvalAmount: 25000,
  },
  {
    id: '2',
    vehicle: '2023 Ford Explorer XLT',
    status: 'confirmed',
    lender: 'Wells Fargo Dealer Services',
    submittedDate: 'Sep 2, 2024',
    approvalAmount: 25000,
  },
  {
    id: '3',
    vehicle: '2020 Chevrolet Tahoe LT',
    status: 'in_progress',
    lender: 'Chase Auto',
    submittedDate: 'Aug 29, 2024',
    approvalAmount: 25000,
  },
  {
    id: '4',
    vehicle: '2021 Honda Accord EX',
    status: 'paid',
    lender: 'Capital One Auto Finance',
    submittedDate: 'Sep 1, 2024',
    approvalAmount: 25000,
  },
  {
    id: '5',
    vehicle: '2023 Ford Explorer XLT',
    status: 'cancelled',
    lender: 'Wells Fargo Dealer Services',
    submittedDate: 'Sep 2, 2024',
    approvalAmount: 25000,
  },
  {
    id: '6',
    vehicle: '2020 Chevrolet Tahoe LT',
    status: 'completed',
    lender: 'Chase Auto',
    submittedDate: 'Aug 29, 2024',
    approvalAmount: 25000,
  },
];

const statusStyles = {
  awaiting_payment: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  confirmed: 'bg-green-50 text-green-600 border-green-100',
  in_progress: 'bg-blue-50 text-blue-600 border-blue-100',
  paid: 'bg-green-50 text-green-600 border-green-100',
  cancelled: 'bg-red-50 text-red-600 border-red-100',
  completed: 'bg-gray-50 text-gray-600 border-gray-100',
};

const statusLabels = {
  awaiting_payment: 'Awaiting payment',
  confirmed: 'Confirmed',
  in_progress: 'In progress',
  paid: 'Paid',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export function ApplicationStatus() {
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const sortedApplications = React.useMemo(() => {
    return [...applications].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.vehicle.localeCompare(b.vehicle);
      }
      return b.vehicle.localeCompare(a.vehicle);
    });
  }, [sortOrder]);

  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Application Status</h2>
        <Link href="/dashboard/application" className="text-sm font-medium">
          See All
        </Link>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }
              >
                Vehicle <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lender</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead className="text-right">Approval Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.map((application) => (
              <TableRow key={application.id} className="hover:bg-transparent">
                <TableCell className="font-medium">
                  {application.vehicle}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-block rounded-full border px-2 py-1 text-xs font-medium',
                      statusStyles[application.status],
                    )}
                  >
                    {statusLabels[application.status]}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500">
                  {application.lender}
                </TableCell>
                <TableCell className="text-gray-500">
                  {application.submittedDate}
                </TableCell>
                <TableCell className="text-right">
                  ${application.approvalAmount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
