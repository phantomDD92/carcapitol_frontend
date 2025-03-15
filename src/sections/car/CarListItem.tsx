import Image from 'next/image';
import Link from 'next/link';
import { Scale, Heart } from 'lucide-react';
import type { ICar } from "@/types/car-info.interface"
import { Button } from '@/components/ui/button';
import { getFuleTypeName } from '@/utils/string';

type Props = {
  data: ICar
};

const CarListItem = ({ data }: Props) => {

  return (
    <Link
      key={data.id}
      href={`/car/${data.id}`}
      className="bg-white rounded-2xl overflow-hidden border"
    >
      {/* Car image */}
      <div className="relative aspect-[16/9]">
        <Image
          src={data.preview}
          alt={data.name}
          fill
          className="w-100 h-100 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${false ? 'bg-red-600 text-white' : 'bg-white/90 hover:bg-white'}`}
          // onClick={() => toggleCompare(data.id)}
          >
            <Scale className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${false ? 'bg-red-600 text-white' : 'bg-white/90 hover:bg-white'}`}
          // onClick={() => toggleFavorite(data.id)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Car details */}
      <div className="flex flex-col p-4 gap-2">
        <div className='flex flex-col gap-2'>
          {/* eyebrow */}
          <div></div>
          <h3 className="truncate w-full leading-[1.5]">{data.name}</h3>
        </div>
        <div className='flex justify-between'>
          <div className='flex-1 mr-4'>
            <p>{`${(Math.floor(data.mileage)).toLocaleString()} mi`}</p>
            <p>{data.engineName}</p>
            <p className='text-sm mt-2'>{data.transmission}</p>
          </div>
          <div className='flex flex-col items-end justify-between text-right'>
            <h2 className='leading-[1.25] text-2xl'>{`$${Math.floor(data.price).toLocaleString()}`}</h2>
            <p className='text-sm'>{getFuleTypeName(data.fuelType)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CarListItem;