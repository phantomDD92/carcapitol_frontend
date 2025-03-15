'use client';

import * as React from 'react';
import {
  ChevronDown,
  MoreHorizontal,
  ChevronUp,
  X,
  Clock,
  RotateCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

import { cn } from '@/lib/utils';

import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { CustomDatePicker } from '@/components/custom/custom-date-picker';
import { DeleteSaleDialog } from '@/components/custom/delete-sale-dialog';
import { PriceReductionDialog } from '@/components/custom/price-reduction-dialog';

interface Sale {
  id: string;
  vehicle: string;
  vin: string;
  price: number;
  views: number;
  date: string;
  status:
    | 'active'
    | 'confirmed'
    | 'paid'
    | 'in_progress'
    | 'under_review'
    | 'not_available';
}

const statusStyles = {
  active: 'bg-green-50 text-green-600 border-green-100',
  confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
  paid: 'bg-green-50 text-green-600 border-green-100',
  in_progress: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  under_review: 'bg-orange-50 text-orange-600 border-orange-100',
  not_available: 'bg-gray-50 text-gray-600 border-gray-100',
};

const statusLabels = {
  active: 'Active',
  confirmed: 'Confirmed',
  paid: 'Paid',
  in_progress: 'In Progress',
  under_review: 'Under Review',
  not_available: 'Not Available',
};

// Updated sample data
const initialSales: Sale[] = [
  {
    id: '1',
    vehicle: '2020 Honda Accord EX',
    vin: '1HGCV1F34LA001234',
    price: 31000,
    views: 245,
    date: 'Sep 1, 2024 10:30 am',
    status: 'active',
  },
  {
    id: '2',
    vehicle: '2023 Ford Explorer XLT',
    vin: '1FM5K8D85PGA12345',
    price: 45775,
    views: 189,
    date: 'Sep 1, 2024 9:45 am',
    status: 'confirmed',
  },
  {
    id: '3',
    vehicle: '2020 Chevrolet Tahoe LT',
    vin: '1GNSKBKC0LR123456',
    price: 54645,
    views: 156,
    date: 'Aug 31, 2024 4:20 pm',
    status: 'in_progress',
  },
  {
    id: '4',
    vehicle: '2022 Toyota Camry SE',
    vin: '4T1C11AK1NU123456',
    price: 28500,
    views: 210,
    date: 'Sep 2, 2024 11:15 am',
    status: 'active',
  },
  {
    id: '5',
    vehicle: '2021 Tesla Model 3',
    vin: '5YJ3E1EA1MF123456',
    price: 41990,
    views: 302,
    date: 'Sep 3, 2024 2:30 pm',
    status: 'under_review',
  },
  {
    id: '6',
    vehicle: '2019 BMW X5 xDrive40i',
    vin: '5UXCR6C55KLL12345',
    price: 52900,
    views: 178,
    date: 'Sep 4, 2024 3:45 pm',
    status: 'active',
  },
  {
    id: '7',
    vehicle: '2022 Audi Q5 Premium',
    vin: 'WA1ANAFY5N2123456',
    price: 47500,
    views: 225,
    date: 'Sep 5, 2024 1:20 pm',
    status: 'confirmed',
  },
  {
    id: '8',
    vehicle: '2021 Lexus RX 350',
    vin: '2T2HZMDA5MC123456',
    price: 49800,
    views: 198,
    date: 'Sep 6, 2024 10:10 am',
    status: 'in_progress',
  },
  {
    id: '9',
    vehicle: '2023 Hyundai Tucson SEL',
    vin: '5NMJDDAF7PH123456',
    price: 32450,
    views: 167,
    date: 'Sep 7, 2024 9:30 am',
    status: 'active',
  },
  {
    id: '10',
    vehicle: '2020 Mercedes-Benz C-Class',
    vin: '55SWF8EB5LU123456',
    price: 39900,
    views: 234,
    date: 'Sep 8, 2024 4:55 pm',
    status: 'not_available',
  },
];

type SortField = keyof Sale;
type SortOrder = 'asc' | 'desc';

export default function SellPage() {
  const [sales, setSales] = React.useState<Sale[]>(initialSales);
  const [searchQuery] = React.useState('');
  const [selectedSale, setSelectedSale] = React.useState<Sale | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showPriceDialog, setShowPriceDialog] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('available');
  const [sortConfig, setSortConfig] = React.useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: 'date',
    order: 'desc',
  });
  const [timeFilter, setTimeFilter] = React.useState<string>('all_time');
  const [timeFilterOpen, setTimeFilterOpen] = React.useState(false);
  const [isCustomDate, setIsCustomDate] = React.useState(false);
  const [customDate, setCustomDate] = React.useState<Date | undefined>();
  const [customFromTime, setCustomFromTime] = React.useState('00:00');
  const [customToTime, setCustomToTime] = React.useState('23:59');
  const [statusFilterOpen, setStatusFilterOpen] = React.useState(false);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([
    'active',
    'confirmed',
    'in_progress',
  ]);

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

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'paid', label: 'Paid' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'not_available', label: 'Not Available' },
  ];

  const filteredSales = React.useMemo(() => {
    return sales
      .filter((sale) => {
        const matchesSearch =
          sale.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sale.vin.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(sale.status);
        const matchesTab =
          (activeTab === 'available' &&
            ['active', 'confirmed'].includes(sale.status)) ||
          (activeTab === 'in_progress' && sale.status === 'in_progress');
        return matchesSearch && matchesStatus && matchesTab;
      })
      .sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.order === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [sales, searchQuery, selectedStatuses, activeTab, sortConfig, timeFilter]);

  const handleDeleteSale = (confirmed: boolean) => {
    if (confirmed && selectedSale) {
      setSales(sales.filter((sale) => sale.id !== selectedSale.id));
    }
    setShowDeleteDialog(false);
    setSelectedSale(null);
  };

  const handlePriceReduction = (newPrice: number) => {
    if (selectedSale) {
      setSales(
        sales.map((sale) =>
          sale.id === selectedSale.id ? { ...sale, price: newPrice } : sale,
        ),
      );
    }
    setShowPriceDialog(false);
    setSelectedSale(null);
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
    if (sortConfig.field !== field) return null;
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
      .map((status) => statusOptions.find((opt) => opt.value === status)?.label)
      .join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Manage Sale</h1>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Popover open={timeFilterOpen} onOpenChange={setTimeFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'gap-2',
                  timeFilter !== 'all_time'
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700'
                    : '',
                )}
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
                      className={cn(
                        'flex items-center px-4 py-2 text-sm hover:bg-gray-100',
                        timeFilter === option.value
                          ? 'text-red-600'
                          : 'text-gray-700',
                      )}
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
                className={cn(
                  'gap-2',
                  selectedStatuses.length > 0
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:text-red-700'
                    : '',
                )}
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
        </div>
      </div>

      {/* Tabs and Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="available">Available for Purchase</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-6">
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('vehicle')}
                  >
                    Vehicle {renderSortIcon('vehicle')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('vin')}
                  >
                    VIN {renderSortIcon('vin')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    Price {renderSortIcon('price')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('views')}
                  >
                    Views {renderSortIcon('views')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {renderSortIcon('date')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status {renderSortIcon('status')}
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      {sale.vehicle}
                    </TableCell>
                    <TableCell>{sale.vin}</TableCell>
                    <TableCell>${sale.price.toLocaleString()}</TableCell>
                    <TableCell>{sale.views}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusStyles[sale.status]}
                      >
                        {statusLabels[sale.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSale(sale);
                              setShowPriceDialog(true);
                            }}
                          >
                            Price reduction
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSale(sale);
                              setShowDeleteDialog(true);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="in_progress" className="mt-6">
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('vehicle')}
                  >
                    Vehicle {renderSortIcon('vehicle')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('vin')}
                  >
                    VIN {renderSortIcon('vin')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    Price {renderSortIcon('price')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('views')}
                  >
                    Views {renderSortIcon('views')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {renderSortIcon('date')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status {renderSortIcon('status')}
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      {sale.vehicle}
                    </TableCell>
                    <TableCell>{sale.vin}</TableCell>
                    <TableCell>${sale.price.toLocaleString()}</TableCell>
                    <TableCell>{sale.views}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusStyles[sale.status]}
                      >
                        {statusLabels[sale.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSale(sale);
                              setShowPriceDialog(true);
                            }}
                          >
                            Price reduction
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSale(sale);
                              setShowDeleteDialog(true);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <DeleteSaleDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteSale}
      />

      <PriceReductionDialog
        open={showPriceDialog}
        onOpenChange={setShowPriceDialog}
        currentPrice={selectedSale?.price || 0}
        onConfirm={handlePriceReduction}
      />
    </div>
  );
}

SellPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
