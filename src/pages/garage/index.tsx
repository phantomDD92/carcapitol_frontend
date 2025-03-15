'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search, Scale, Heart, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CCMainLayout from '@/layouts/main/MainLayout';
import DashboardLayout from '@/layouts/dashboard/Layout';

interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: string;
  price: number;
  status: 'checking_documents' | 'for_sale' | 'sold_out' | 'blocked';
  image: string;
  specs: {
    mileage: string;
    fuelType: string;
    transmission: string;
    efficiency: string;
  };
  date: string;
  isCompared?: boolean;
  isFavorite?: boolean;
}

const initialCars: Car[] = [
  {
    id: '1',
    name: 'Porsche 718 Cayman S',
    make: 'Porsche',
    model: 'Cayman',
    year: '2019',
    price: 65000,
    status: 'checking_documents',
    image: '/assets/images/cars/car1.svg',
    specs: {
      mileage: '127 th km',
      fuelType: 'Petrol, 3.6 L',
      transmission: 'Automatic',
      efficiency: '7.9 th km',
    },
    date: '9.09.2024',
  },
  {
    id: '2',
    name: 'Land Rover Range Rover 2015',
    make: 'Land Rover',
    model: 'Range Rover',
    year: '2015',
    price: 38500,
    status: 'for_sale',
    image: '/assets/images/cars/car2.svg',
    specs: {
      mileage: '185 th km',
      fuelType: 'Diesel, 4.4 L',
      transmission: 'Automatic',
      efficiency: '181 th km',
    },
    date: '9.09.2024',
  },
  {
    id: '3',
    name: 'Porsche Cayenne 2018',
    make: 'Porsche',
    model: 'Cayenne',
    year: '2018',
    price: 58000,
    status: 'sold_out',
    image: '/assets/images/cars/car3.svg',
    specs: {
      mileage: '182 th km',
      fuelType: 'Petrol, 3 L',
      transmission: 'Automatic',
      efficiency: '173 th km',
    },
    date: '9.09.2024',
  },
  {
    id: '4',
    name: 'Volkswagen ID.4 Crozz 2024',
    make: 'Volkswagen',
    model: 'ID.4',
    year: '2024',
    price: 30099,
    status: 'blocked',
    image: '/assets/images/cars/car1.svg',
    specs: {
      mileage: '1 th km',
      fuelType: 'Electro',
      transmission: 'Automatic',
      efficiency: '173 th km',
    },
    date: '9.09.2024',
  },
  {
    id: '5',
    name: 'Porsche Cayenne 2018',
    make: 'Porsche',
    model: 'Cayenne',
    year: '2018',
    price: 58000,
    status: 'for_sale',
    image: '/assets/images/cars/car2.svg',
    specs: {
      mileage: '182 th km',
      fuelType: 'Petrol, 3 L',
      transmission: 'Automatic',
      efficiency: '173 th km',
    },
    date: '9.09.2024',
  },
  {
    id: '6',
    name: 'Porsche 718 Cayman S',
    make: 'Porsche',
    model: 'Cayman',
    year: '2019',
    price: 65000,
    status: 'for_sale',
    image: '/assets/images/cars/car3.svg',
    specs: {
      mileage: '127 th km',
      fuelType: 'Petrol, 3.6 L',
      transmission: 'Automatic',
      efficiency: '7.9 th km',
    },
    date: '9.09.2024',
  },
];

const statusStyles = {
  checking_documents: 'bg-yellow-50 text-yellow-600',
  for_sale: 'bg-green-50 text-green-600',
  sold_out: 'bg-gray-100 text-gray-600',
  blocked: 'bg-red-50 text-red-600',
};

const statusLabels = {
  checking_documents: 'Checking documents',
  for_sale: 'For sale',
  sold_out: 'Sold out',
  blocked: 'Blocked',
};

export default function GaragePage() {
  const [make, setMake] = React.useState('Any');
  const [model, setModel] = React.useState('Any');
  const [year, setYear] = React.useState('Any');
  const [status, setStatus] = React.useState('Any');
  const [cars, setCars] = React.useState(
    initialCars.map((car) => ({
      ...car,
      isCompared: false,
      isFavorite: false,
    })),
  );

  // Get unique makes, models, and years from the data
  const makes = React.useMemo(
    () => ['Any', ...new Set(initialCars.map((car) => car.make))].sort(),
    [],
  );

  const models = React.useMemo(() => {
    if (make === 'Any') {
      return ['Any', ...new Set(initialCars.map((car) => car.model))].sort();
    }
    return [
      'Any',
      ...new Set(
        initialCars.filter((car) => car.make === make).map((car) => car.model),
      ),
    ].sort();
  }, [make]);

  const years = React.useMemo(
    () => ['Any', ...new Set(initialCars.map((car) => car.year))].sort(),
    [],
  );

  // Filter cars based on all criteria
  const filteredCars = React.useMemo(() => {
    return cars.filter((car) => {
      const matchesMake = make === 'Any' || car.make === make;
      const matchesModel = model === 'Any' || car.model === model;
      const matchesYear = year === 'Any' || car.year === year;
      const matchesStatus =
        status === 'Any' || car.status === status.toLowerCase();

      return matchesMake && matchesModel && matchesYear && matchesStatus;
    });
  }, [cars, make, model, year, status]);

  // Reset model when make changes
  React.useEffect(() => {
    setModel('Any');
  }, [make]);

  const toggleCompare = (id: string) => {
    setCars(
      cars.map((car) =>
        car.id === id ? { ...car, isCompared: !car.isCompared } : car,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setCars(
      cars.map((car) =>
        car.id === id ? { ...car, isFavorite: !car.isFavorite } : car,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <span className="flex items-center">
                  <span className="mr-2 text-gray-400">Make:</span>
                  {make}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <span className="flex items-center">
                  <span className="mr-2 text-gray-400">Model:</span>
                  {model}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <span className="flex items-center">
                  <span className="mr-2 text-gray-400">Year:</span>
                  {year}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <span className="flex items-center">
                  <span className="mr-2 text-gray-400">Status:</span>
                  {status}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="for_sale">For sale</SelectItem>
              <SelectItem value="sold_out">Sold out</SelectItem>
              <SelectItem value="checking_documents">
                Checking documents
              </SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="rounded-lg">
            <Search className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="bg-red-600 hover:bg-red-700">
                <span className="mr-2">Add New</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Automatic Population</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/garage/manual-addition" className="text-red-600">
                  Manual Addition
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-500">
        {filteredCars.length} results
      </div>

      {/* Car grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg overflow-hidden border"
          >
            {/* Car image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="w-100 h-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${car.isCompared ? 'bg-red-600 text-white' : 'bg-white/90 hover:bg-white'}`}
                  onClick={() => toggleCompare(car.id)}
                >
                  <Scale className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${car.isFavorite ? 'bg-red-600 text-white' : 'bg-white/90 hover:bg-white'}`}
                  onClick={() => toggleFavorite(car.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Car details */}
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-medium line-clamp-1">{car.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium">
                    ${car.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${statusStyles[car.status]}`}
                  >
                    {statusLabels[car.status]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <span className="text-gray-600">{car.specs.mileage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <span className="text-gray-600">{car.specs.fuelType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <span className="text-gray-600">
                    {car.specs.transmission}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-100" />
                  <span className="text-gray-600">{car.specs.efficiency}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <div className="h-4 w-4 rounded bg-gray-100 mr-2" />
                {car.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

GaragePage.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </CCMainLayout>
);
