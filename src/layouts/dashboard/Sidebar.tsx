'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Home,
  Car,
  ShoppingCart,
  DollarSign,
  Settings,
  Wrench,
  Calendar,
  Bell,
  HelpCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  expandable?: boolean;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Garage',
    href: '/garage',
    icon: Car,
  },
  {
    title: 'Buy',
    href: '/buy',
    icon: ShoppingCart,
  },
  {
    title: 'Sell',
    href: '/sell',
    icon: DollarSign,
  },
  {
    title: 'Services',
    href: '/services',
    icon: Wrench,
    expandable: true,
    children: [
      { title: 'Insurance', href: '/services/insurance' },
      { title: 'Installment & Lending', href: '/services/install-lending' },
      { title: 'Trade-In', href: '/services/trade-in' },
      { title: 'Vehicle Valuation', href: '/services/valuation' },
    ],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    expandable: true,
    children: [
      { title: 'Profile Information', href: '/settings/profile' },
      { title: 'Privacy Settings', href: '/settings/privacy-settings' },
    ],
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Notification',
    href: '/notification',
    icon: Bell,
  },
  {
    title: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[240px] flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-red-600"
        >
          <span className="text-xl">CARCAPITOL</span>
        </Link>
      </div>

      {/* Create Offer Button */}
      <div className="p-4">
        <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
          Create Offer
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          if (item.expandable) {
            return (
              <Collapsible key={item.href}>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-gray-500" />
                    )}
                    {item.title}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block rounded-lg px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
                        pathname === child.href && 'bg-gray-100',
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
                pathname === item.href && 'bg-gray-100',
              )}
            >
              {IconComponent && (
                <IconComponent className="h-5 w-5 text-gray-500" />
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <nav className="border-t px-2 py-4 space-y-1">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
                pathname === item.href && 'bg-gray-100',
              )}
            >
              {IconComponent && (
                <IconComponent className="h-5 w-5 text-gray-500" />
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
