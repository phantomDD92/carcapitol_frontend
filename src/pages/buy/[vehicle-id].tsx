'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MessageSquare,
  Calendar,
  Heart,
  Scale,
  FileText,
  ChevronDown,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { CarCarousel } from '@/sections/dashboard/vehicle/car-carousel';
import { CarSpecifications } from '@/sections/dashboard/vehicle/car-specification';
import { CarDocuments } from '@/sections/dashboard/vehicle/car-documents';
import { BookTestDriveDialog } from '@/components/custom/book-test-drive-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MakeOfferDialog } from '@/sections/dashboard/payment/make-offer-dialog';
import { BuyNowSidebar } from '@/sections/dashboard/payment/buy-now-sidebar';

interface CarImage {
  id: number;
  url: string;
  alt: string;
}

interface CarDetails {
  name: string;
  location: string;
  price: number;
  priceChange: number;
  images: CarImage[];
  specifications: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
  documents: Array<{
    name: string;
    size: string;
  }>;
  similarCars: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    importInfo: string;
    date: string;
  }>;
}

const car: CarDetails = {
  name: 'Porsche Cayman 2019',
  location: '718 Cayman S • Germany, Stuttgart',
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
  specifications: [
    { icon: 'car', label: 'Body type', value: 'Coupe' },
    { icon: 'gauge', label: 'Mileage', value: '15,000 km' },
    {
      icon: 'engine',
      label: 'Modification',
      value: '2.5L Turbocharged Flat-4',
    },
    { icon: 'gear', label: 'Transmission', value: 'Automatic' },
    { icon: 'fuel', label: 'Engine', value: 'Petrol, 3 L' },
    { icon: 'wheel', label: 'Drive', value: 'All-wheel' },
    { icon: 'paint', label: 'Color', value: 'Black, Glossy coating' },
    {
      icon: 'warning',
      label: 'Road traffic accident',
      value: 'Restored after',
    },
    { icon: 'map', label: 'Driven from', value: 'Japan' },
    {
      icon: 'wrench',
      label: 'Technical condition',
      value: 'Well-Maintained',
    },
  ],
  documents: [
    { name: 'vehicle_passport_PTS.pdf', size: '2mb' },
    { name: 'vehicle_registration_certificate_VPC.pdf', size: '2mb' },
  ],
  similarCars: [
    {
      id: '1',
      name: 'Porsche 718 Cayman S',
      price: 65000,
      image: '/assets/images/cars/car1.svg',
      importInfo: 'Imported from the USA',
      date: '9.09.2024',
    },
    {
      id: '2',
      name: 'Land Rover Range Rover 2015',
      price: 38500,
      image: '/assets/images/cars/car1.svg',
      importInfo: 'Imported from the USA',
      date: '9.09.2024',
    },
    {
      id: '3',
      name: 'Porsche Cayenne 2018',
      price: 58000,
      image: '/assets/images/cars/car2.svg',
      importInfo: 'Imported from the USA',
      date: '9.09.2024',
    },
    {
      id: '4',
      name: 'Volkswagen ID.4 Crozz 2024',
      price: 30099,
      image: '/assets/images/cars/car3.svg',
      importInfo: 'Imported from the USA',
      date: '9.09.2024',
    },
  ],
};

export default function BuyCarDetailPage() {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isCompared, setIsCompared] = React.useState(false);

  const [showBuyNowSidebar, setShowBuyNowSidebar] = React.useState(false);
  const [showBookingDialog, setShowBookingDialog] = React.useState(false);
  const [showOfferDialog, setShowOfferDialog] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 p-6 text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-gray-900">
            Buy
          </Link>
          <span>/</span>
          <span className="text-gray-900">{car.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              isFavorite && 'bg-red-50 text-red-600 border-red-200',
            )}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              isCompared && 'bg-red-50 text-red-600 border-red-200',
            )}
            onClick={() => setIsCompared(!isCompared)}
          >
            <Scale className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowBookingDialog(true)}
          >
            <Calendar className="h-4 w-4" />
            Book test drive
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 bg-red-600 hover:bg-red-700">
                Buy a vehicle
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => setShowBuyNowSidebar(true)}>
                Buy Now
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowOfferDialog(true)}>
                Make Your Offer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-[2fr,1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-6 bg-gray-50 p-5">
            {/* <CarCarousel images={car.images} /> */}

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
            {/* <CarSpecifications /> */}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Description</h2>
              <p className="text-gray-600">
                The Porsche 718 Cayman S is a sports coupe with a powerful
                2.5-liter turbo engine and a rear-mounted engine that provides
                perfect balance and dynamics on the road. Released in 2024, this
                model features...
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

        {/* Car Info */}
        <div className="space-y-6">
          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documents</h3>
            <div className="grid gap-4">
              {car.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
                >
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Seller */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100" />
              <div>
                <h3 className="font-medium">City Auto Center</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>4.8</span>
                  <span className="text-[10px]">★</span>
                </div>
              </div>
            </div>
            <Textarea
              placeholder="Message text"
              className="min-h-[100px] resize-none"
            />
            <Button className="w-full gap-2">
              <MessageSquare className="h-4 w-4" />
              Send message
            </Button>
          </div>

          {/* Similar Cars */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Similar cars</h3>
            <div className="grid grid-cols-4 gap-6">
              {car.similarCars.map((similarCar) => (
                <Link
                  key={similarCar.id}
                  href={`/buy/${similarCar.id}`}
                  className="group space-y-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={similarCar.image}
                      alt={similarCar.name}
                      fill
                      className="w-100 h-100 transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{similarCar.name}</h3>
                    <p className="mt-1 text-lg font-medium">
                      ${similarCar.price.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {similarCar.importInfo}
                    </Badge>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <div className="h-4 w-4 rounded bg-gray-100" />
                      {similarCar.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BookTestDriveDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
      />

      <MakeOfferDialog
        open={showOfferDialog}
        onOpenChange={setShowOfferDialog}
        carName={car.name}
        currentPrice={car.price}
      />

      <BuyNowSidebar
        isOpen={showBuyNowSidebar}
        onClose={() => setShowBuyNowSidebar(false)}
        carName={car.name}
        carImage={car.images[0].url}
        price={car.price}
      />
    </div>
  );
}

BuyCarDetailPage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
