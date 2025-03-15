import { CarCard } from './CarCard';
import { CarInfo } from '@/types/car-info.interface';

interface CarGridProps {
  cars: CarInfo[];
}

export function CarGrid({ cars }: CarGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[var(--font-size-lg)] font-semibold">Saved cars</h2>
        <button className="text-[var(--font-size-sm)] text-blue-600">
          See All
        </button>
      </div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
