'use client';

import * as React from 'react';
import { Search, Filter, Bell, X, Scale } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/auth/UserContext';
import useLocalStorage, { ACCESS_TOKEN_KEY } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { BackDrop } from '@/components/ui/backDrop';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

const filterCategories: FilterCategory[] = [
  {
    id: 'transaction',
    label: 'Transaction status',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'completed', label: 'Completed' },
      { id: 'pending', label: 'Pending' },
      { id: 'in_progress', label: 'In Progress' },
    ],
  },
  {
    id: 'operation',
    label: 'Operation type',
    options: [
      { id: 'purchase', label: 'Purchase' },
      { id: 'sale', label: 'Sale' },
      { id: 'trade_in', label: 'Trade-In' },
      { id: 'credit', label: 'Credit' },
    ],
  },
  {
    id: 'time',
    label: 'Time',
    options: [
      { id: 'today', label: 'Today' },
      { id: 'this_week', label: 'This week' },
      { id: 'this_month', label: 'This month' },
      { id: 'this_year', label: 'This year' },
    ],
  },
  {
    id: 'payment',
    label: 'Payment method',
    options: [
      { id: 'credit', label: 'Credit' },
      { id: 'cash', label: 'Cash' },
      { id: 'bank_transfer', label: 'Bank Transfer' },
    ],
  },
];

export function DashboardHeader() {
  const [selectedFilters, setSelectedFilters] = React.useState<{
    [key: string]: Set<string>;
  }>({});

  const toggleFilter = (categoryId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[categoryId]) {
        newFilters[categoryId] = new Set();
      }
      const categorySet = new Set(newFilters[categoryId]);
      if (categorySet.has(optionId)) {
        categorySet.delete(optionId);
      } else {
        categorySet.add(optionId);
      }
      newFilters[categoryId] = categorySet;
      return newFilters;
    });
  };

  const removeFilter = (categoryId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[categoryId]) {
        const categorySet = new Set(newFilters[categoryId]);
        categorySet.delete(optionId);
        newFilters[categoryId] = categorySet;
      }
      return newFilters;
    });
  };

  return (
    <header className="flex h-16 justify-between items-center gap-4 border-b bg-gray-50 px-6">
      {/* Search Section */}
      <div className="flex items-start gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search Vehicle, customer, other..."
            className="pl-9 pr-4 h-10 text-sm bg-white border-gray-200"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 bg-white"
            >
              <Filter className="h-5 w-5 text-red-600" />
              <span className="sr-only">Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-6" align="start">
            <div className="space-y-6">
              {filterCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h3 className="text-base text-gray-500">{category.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.options.map((option) => {
                      const isSelected = selectedFilters[category.id]?.has(
                        option.id,
                      );
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleFilter(category.id, option.id)}
                          className={cn(
                            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors',
                            isSelected
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                          )}
                        >
                          {option.label}
                          {isSelected && (
                            <X
                              className="h-4 w-4 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFilter(category.id, option.id);
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Actions Section */}
      <div className="flex items-end gap-6">
        {/* Language Selector */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 bg-white"
        >
          <Scale className="text-red-600" />
          <span className="sr-only">Compare Vehicles</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 bg-white"
        >
          <Bell className="h-5 w-5 text-red-600" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Profile */}
        <AccountMenu />
      </div>
    </header>
  );
}

const AccountMenu = () => {
  const router = useRouter();
  const { data } = useUser();
  const {
    user: { firstName, lastName },
  } = data;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorage<string>(ACCESS_TOKEN_KEY, '');
  const [isOpen, setOpen] = React.useState(false);

  const handleLogout = () => {
    setAccessToken('');
    router.push('/auth/sign-in');
  };

  return (
    <BackDrop className="w-auto" onClick={() => setOpen(false)}>
      <div className="relative">
        <button
          className="flex items-center gap-3"
          onClick={() => setOpen(!isOpen)}
        >
          <div className="h-10 w-10 rounded-full bg-gray-100" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{`${firstName || ''} ${lastName || ''}`}</span>
            <span className="flex items-center text-xs text-yellow-500">
              4.8 <span className="ml-0.5 text-[10px]">★</span>
            </span>
          </div>
        </button>
        {isOpen && (
          <div className="absolute right-0 w-full min-w-[150px] border top-full mt-2 flex flex-col shadow-lg rounded-lg bg-white py-2 px-3">
            <button className="" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </BackDrop>
  );
};
