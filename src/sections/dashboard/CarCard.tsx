import { CarInfo } from '@/types/car-info.interface';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface CarCardProps {
  car: CarInfo;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="relative rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[var(--font-size-base)] font-medium">
            {car.model}
          </h3>
          <p className="text-[var(--font-size-sm)] text-gray-500">
            {car.type} {car.year}
          </p>
        </div>
        <button className="rounded-full p-1 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="my-4 aspect-video overflow-hidden rounded-lg">
        <Image
          src={car.image}
          alt={car.model}
          width={300}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[var(--font-size-lg)] font-semibold">
          ${car.price.toLocaleString()}
        </div>
        <div
          className={cn(
            'flex items-center text-[var(--font-size-sm)]',
            car.priceChange > 0 ? 'text-red-500' : 'text-green-500',
          )}
        >
          {car.priceChange > 0 ? '+' : ''}${Math.abs(car.priceChange)}
        </div>
      </div>
    </div>
  );
}
