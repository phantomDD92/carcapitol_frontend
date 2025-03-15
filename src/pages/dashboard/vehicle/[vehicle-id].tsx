import Link from 'next/link';
import { Calendar, Heart, MessageSquare, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarSpecifications } from '@/sections/dashboard/vehicle/car-specification';
import { CarDocuments } from '@/sections/dashboard/vehicle/car-documents';
import { CarCarousel } from '@/sections/dashboard/vehicle/car-carousel';

import React from 'react';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';

export default function CarPage() {
  const car = {
    name: 'Porsche Cayman 2019',
    model: '718 Cayman S',
    location: 'Germany, Stuttgart',
    price: 58000,
    priceChange: -1200,
    images: [
      {
        id: 1,
        url: '/assets/images/cars/car1.svg',
        alt: 'Porsche Cayman Front View',
      },
      {
        id: 2,
        url: '/assets/images/cars/car2.svg',
        alt: 'Porsche Cayman Side View',
      },
      {
        id: 3,
        url: '/assets/images/cars/car3.svg',
        alt: 'Porsche Cayman Rear View',
      },
    ],
  };

  return (
    <main className="flex-1 overflow-auto p-6 text-[var(--font-size-base)]">
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 p-6 text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-gray-900">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900">{car.name}</span>
        </div>

        <div className="px-6 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">{car.name}</h1>
              <p className="text-gray-500">
                {car.model} • {car.location}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-start">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Scale className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-600"
                >
                  <Calendar className="h-5 w-5" />
                  Book test drive
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 bg-red-600 text-white  hover:text-white hover:bg-red-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  Write a message
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-[2fr,1fr] gap-8">
            {/* Left Column */}
            <div className="space-y-6 bg-gray-50 p-5">
              <CarCarousel images={car.images} />

              {/* Price and Tags */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">
                    ${car.price.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-500">
                    ↘ ${Math.abs(car.priceChange).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Imported from the USA</Badge>
                  <Badge variant="secondary">Bargaining</Badge>
                  <Badge variant="secondary">Exchange</Badge>
                </div>
              </div>

              {/* Car Specifications */}
              <CarSpecifications />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Description</h2>
                <p className="text-gray-600">
                  The Porsche 718 Cayman S is a sports coupe with a powerful
                  2.5-liter turbo engine and a rear-mounted engine that provides
                  perfect balance and dynamics on the road. Released in 2024,
                  this model features...
                </p>
                <Button variant="link" className="h-auto p-0 text-red-600">
                  More
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-gray-500">Air conditioning</h3>
                  <p className="font-medium">Multi-zone climate control</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gray-500">Electric windows</h3>
                  <p className="font-medium">Front</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gray-500">Interior materials</h3>
                  <p className="font-medium">Combined</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gray-500">Interior color</h3>
                  <p className="font-medium">Brown</p>
                </div>
                <Button variant="link" className="h-auto p-0 text-red-600">
                  More
                </Button>
              </div>

              {/* Documents */}
              <CarDocuments />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

CarPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
