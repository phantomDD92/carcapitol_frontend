import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface SavedCar {
  id: string;
  name: string;
  type: string;
  year: string;
  image: string;
  price: number;
  priceChange: number;
}

const initialSavedCars: SavedCar[] = [
  {
    id: '1',
    name: 'Porsche 718 Cayma...',
    type: 'Coupe',
    year: '2011',
    image: '/assets/images/cars/car1.svg', // Replace with actual image path
    price: 65000,
    priceChange: -500,
  },
  {
    id: '2',
    name: 'Porsche 718 Cayma...',
    type: 'Coupe',
    year: '2011',
    image: '/assets/images/cars/car2.svg', // Replace with actual image path
    price: 49000,
    priceChange: -1200,
  },
  {
    id: '3',
    name: 'Porsche 718 Cayma...',
    type: 'Coupe',
    year: '2011',
    image: '/assets/images/cars/car3.svg', // Replace with actual image path
    price: 122080,
    priceChange: 650,
  },
];

export function SavedCars() {
  const router = useRouter();
  const [savedCars, setSavedCars] = useState<SavedCar[]>(initialSavedCars);

  const handleViewDetails = async (vehicleId: string) => {
    await router.push(`/dashboard/vehicle/${vehicleId}`);
  };

  const handleRemoveFromFavorites = (id: string) => {
    // Handle remove from favorites action
    console.log('Remove from favorites:', id);
  };

  const handleAddNewVehicle = () => {
    const newCar: SavedCar = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Porsche 718 Cayma...',
      type: 'Coupe',
      year: '2011',
      image: '/assets/images/cars/car1.svg',
      price: 4790,
      priceChange: 500,
    };
    setSavedCars((cars) => [...cars, newCar]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Saved cars</h2>
        <Link href="#" className="text-sm font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {savedCars.map((car) => (
          <Card
            key={car.id}
            className="border-0 shadow-none p-5"
            onClick={() => handleViewDetails(car.id)}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-0 pb-2">
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {car.type} {car.year}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="-mr-2 -mt-2 bg-red-100 text-red-600 hover:bg-red-200 "
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => handleViewDetails(car.id)}
                    className="text-sm hover:text-red-600 hover:bg-red-100"
                  >
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRemoveFromFavorites(car.id)}
                    className="text-sm hover:text-red-600 hover:bg-red-100"
                  >
                    Remove from favorites
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  ${car.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-medium ${
                    car.priceChange < 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {car.priceChange < 0 ? '↘' : '↗'} $
                  {Math.abs(car.priceChange)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Add New Vehicle Card */}
        <Card className="border-0 shadow-none p-5">
          <button
            onClick={handleAddNewVehicle}
            className="flex flex-col items-center justify-center w-full h-full gap-2 rounded-lg border-2 border-dashed border-red-200 bg-white transition-colors hover:border-red-300"
          >
            <Plus className="h-8 w-8 text-red-600" />
            <span className="text-sm font-medium text-center text-red-600">
              Add new vehicle
              <br />
              to favorites
            </span>
          </button>
        </Card>
      </div>
    </div>
  );
}
