'use client';

import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

import { CustomDatePicker } from '@/components/custom/custom-date-picker';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  Filter,
  MoreHorizontal,
  Search,
  X,
  Clock,
  RotateCw,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/router';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';

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

const statusOptions = [
  { value: 'awaiting_payment', label: 'Awaiting payment' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

const timeFilterOptions = [
  { value: 'all_time', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'this_week', label: 'This week' },
  { value: 'last_week', label: 'Last week' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_year', label: 'Last year' },
  { value: 'custom', label: 'Custom' },
];

// Mock data - replace with API call
const applications: Application[] = Array.from({ length: 50 }, (_, i) => ({
  id: `app-${i + 1}`,
  vehicle: [
    '2021 Honda Accord EX',
    '2023 Ford Explorer XLT',
    '2020 Chevrolet Tahoe LT',
  ][i % 3],
  status: [
    'awaiting_payment',
    'confirmed',
    'in_progress',
    'paid',
    'cancelled',
    'completed',
  ][i % 6] as Application['status'],
  lender: [
    'Capital One Auto Finance',
    'Wells Fargo Dealer Services',
    'Chase Auto',
  ][i % 3],
  submittedDate: ['Sep 1, 2024', 'Sep 2, 2024', 'Aug 29, 2024'][i % 3],
  approvalAmount: 25000 + i * 1000,
}));

type SortField = keyof Application;
type SortOrder = 'asc' | 'desc';

export default function ApplicationsPage() {
  const router = useRouter();
  const [selectedApplications, setSelectedApplications] = React.useState<
    Set<string>
  >(new Set());
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [timeFilter, setTimeFilter] = React.useState<string>('all_time');
  const [sortConfig, setSortConfig] = React.useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: 'vehicle',
    order: 'asc',
  });
  const [timeFilterOpen, setTimeFilterOpen] = React.useState(false);
  const [isCustomDate, setIsCustomDate] = React.useState(false);
  const [customDate, setCustomDate] = React.useState<Date | undefined>();
  const [customFromTime, setCustomFromTime] = React.useState('11:00');
  const [customToTime, setCustomToTime] = React.useState('23:00');
  const [statusFilterOpen, setStatusFilterOpen] = React.useState(false);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([
    'confirmed',
    'paid',
    'in_progress',
  ]);

  // New state variables
  const [selectedOperations, setSelectedOperations] = React.useState<string[]>(
    [],
  );
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = React.useState<
    string[]
  >([]);
  const [selectedDocumentStatuses, setSelectedDocumentStatuses] =
    React.useState<string[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const filteredAndSortedApplications = React.useMemo(() => {
    return applications
      .filter((app) => {
        const matchesSearch =
          app.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.lender.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(app.status);
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field])
          return sortConfig.order === 'asc' ? -1 : 1;
        if (a[sortConfig.field] > b[sortConfig.field])
          return sortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchQuery, selectedStatuses, sortConfig]);

  const paginatedApplications = filteredAndSortedApplications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(
        new Set(paginatedApplications.map((app) => app.id)),
      );
    } else {
      setSelectedApplications(new Set());
    }
  };

  const handleSelectApplication = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedApplications);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedApplications(newSelected);
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      order:
        prevConfig.field === field && prevConfig.order === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field)
      return <ChevronDown className="ml-2 h-4 w-4" />;
    return sortConfig.order === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const handleTimeFilterSelect = (value: string) => {
    if (value === 'custom') {
      setIsCustomDate(true);
    } else {
      setTimeFilter(value);
      setTimeFilterOpen(false);
    }
  };

  const handleCustomDateSelect = (
    date: Date | undefined,
    fromTime: string,
    toTime: string,
  ) => {
    if (date) {
      setCustomDate(date);
      setCustomFromTime(fromTime);
      setCustomToTime(toTime);
      setTimeFilter(`custom_${date.toISOString()}_${fromTime}_${toTime}`);
      setTimeFilterOpen(false);
      setIsCustomDate(false);
    }
  };

  const handleCustomDateBack = () => {
    setIsCustomDate(false);
    setTimeFilterOpen(true);
  };

  const getTimeFilterLabel = () => {
    if (timeFilter === 'all_time')
      return (
        <>
          <Clock className="h-4 w-4" />
          Time
        </>
      );
    if (timeFilter.startsWith('custom_')) {
      const [dateStr, fromTime, toTime] = timeFilter.split('_');
      const date = new Date(dateStr);
      return `Custom: ${date.toLocaleDateString()} ${fromTime} - ${toTime}`;
    }
    return (
      timeFilterOptions.find((opt) => opt.value === timeFilter)?.label || 'Time'
    );
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      }
      return [...prev, status];
    });
  };

  const getStatusFilterLabel = () => {
    if (selectedStatuses.length === 0)
      return (
        <>
          <RotateCw className="h-4 w-4" />
          Status
        </>
      );
    return selectedStatuses
      .map((status) => statusLabels[status as keyof typeof statusLabels])
      .join(', ');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-900">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-gray-900">Application Status</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Application Status</h1>
        <Button className="bg-red-600 hover:bg-red-700">Pay now</Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Popover open={timeFilterOpen} onOpenChange={setTimeFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${
                  timeFilter !== 'all_time'
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700'
                    : ''
                }`}
              >
                <span className="truncate max-w-[150px] flex items-center gap-2">
                  {getTimeFilterLabel()}
                </span>
                {timeFilter !== 'all_time' && (
                  <X
                    className="h-4 w-4 ml-2 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeFilter('all_time');
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              {isCustomDate ? (
                <CustomDatePicker
                  onBack={handleCustomDateBack}
                  onSelect={handleCustomDateSelect}
                  initialDate={customDate}
                  initialFromTime={customFromTime}
                  initialToTime={customToTime}
                />
              ) : (
                <div className="flex flex-col py-2">
                  {timeFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                        timeFilter === option.value
                          ? 'text-red-600'
                          : 'text-gray-700'
                      }`}
                      onClick={() => handleTimeFilterSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Popover open={statusFilterOpen} onOpenChange={setStatusFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${
                  selectedStatuses.length > 0
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700'
                    : ''
                }`}
              >
                <span className="truncate max-w-[150px] flex items-center gap-2">
                  {getStatusFilterLabel()}
                </span>
                {selectedStatuses.length > 0 && (
                  <X
                    className="h-4 w-4 ml-2 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStatuses([]);
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="flex flex-col py-2">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <Checkbox
                      id={option.value}
                      checked={selectedStatuses.includes(option.value)}
                      onCheckedChange={() => handleStatusSelect(option.value)}
                    />
                    <label
                      htmlFor={option.value}
                      className="ml-2 text-sm cursor-pointer flex-1"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'gap-2',
                  selectedOperations.length > 0 ||
                    selectedLocation ||
                    selectedPaymentMethods.length > 0 ||
                    selectedDocumentStatuses.length > 0
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700'
                    : '',
                )}
              >
                <Filter className="h-4 w-4" />
                More filters
                {(selectedOperations.length > 0 ||
                  selectedLocation ||
                  selectedPaymentMethods.length > 0 ||
                  selectedDocumentStatuses.length > 0) && (
                  <X
                    className="h-4 w-4 ml-2 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOperations([]);
                      setSelectedLocation('');
                      setSelectedPaymentMethods([]);
                      setSelectedDocumentStatuses([]);
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-6" align="start">
              <div className="space-y-6">
                {/* Operation type */}
                <div className="space-y-3">
                  <h3 className="text-sm text-gray-500">Operation type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Purchase', 'Sale', 'Trade-In', 'Credit'].map(
                      (operation) => (
                        <Button
                          key={operation}
                          variant="outline"
                          size="sm"
                          className={cn(
                            'rounded-full',
                            selectedOperations.includes(operation.toLowerCase())
                              ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700'
                              : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                          )}
                          onClick={() => {
                            const value = operation.toLowerCase();
                            setSelectedOperations((prev) =>
                              prev.includes(value)
                                ? prev.filter((item) => item !== value)
                                : [...prev, value],
                            );
                          }}
                        >
                          {operation}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <h3 className="text-sm text-gray-500">Location</h3>
                  <Select
                    value={selectedLocation}
                    onValueChange={(value) => setSelectedLocation(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose from the dropdown" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York, USA</SelectItem>
                      <SelectItem value="los-angeles">
                        Los Angeles, USA
                      </SelectItem>
                      <SelectItem value="chicago">Chicago, USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment method */}
                <div className="space-y-3">
                  <h3 className="text-sm text-gray-500">Payment method</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Credit', 'Cash', 'Bank Transfer'].map((method) => (
                      <Button
                        key={method}
                        variant="outline"
                        size="sm"
                        className={cn(
                          'rounded-full',
                          selectedPaymentMethods.includes(method.toLowerCase())
                            ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                        )}
                        onClick={() => {
                          const value = method.toLowerCase();
                          setSelectedPaymentMethods((prev) =>
                            prev.includes(value)
                              ? prev.filter((item) => item !== value)
                              : [...prev, value],
                          );
                        }}
                      >
                        {method}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Document Status */}
                <div className="space-y-3">
                  <h3 className="text-sm text-gray-500">Document Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'All uploaded',
                      'Additional required',
                      'Under review',
                    ].map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        size="sm"
                        className={cn(
                          'rounded-full',
                          selectedDocumentStatuses.includes(
                            status.toLowerCase(),
                          )
                            ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                        )}
                        onClick={() => {
                          const value = status.toLowerCase();
                          setSelectedDocumentStatuses((prev) =>
                            prev.includes(value)
                              ? prev.filter((item) => item !== value)
                              : [...prev, value],
                          );
                        }}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedApplications.size === paginatedApplications.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('vehicle')}
              >
                <div className="flex items-center">
                  Vehicle {renderSortIcon('vehicle')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {renderSortIcon('status')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('lender')}
              >
                <div className="flex items-center">
                  Lender {renderSortIcon('lender')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('submittedDate')}
              >
                <div className="flex items-center">
                  Submitted Date {renderSortIcon('submittedDate')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('approvalAmount')}
              >
                <div className="flex items-center">
                  Approval Amount {renderSortIcon('approvalAmount')}
                </div>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedApplications.has(application.id)}
                    onCheckedChange={(checked) =>
                      handleSelectApplication(
                        application.id,
                        typeof checked === 'boolean' ? checked : false,
                      )
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {application.vehicle}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-full border px-2 py-1 text-xs font-medium ${
                      statusStyles[application.status]
                    }`}
                  >
                    {statusLabels[application.status]}
                  </span>
                </TableCell>
                <TableCell>{application.lender}</TableCell>
                <TableCell>{application.submittedDate}</TableCell>
                <TableCell>
                  ${application.approvalAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-gray-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="hover:text-red-600 hover:bg-red-100"
                        onClick={() =>
                          router.push(
                            `/dashboard/application/${application.id}`,
                          )
                        }
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:text-red-600 hover:bg-red-100">
                        Delete application
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
}

ApplicationsPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
