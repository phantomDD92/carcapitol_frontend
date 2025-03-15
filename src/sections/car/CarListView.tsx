import { Button } from '@/components/ui/button';
import { ICar } from "@/types/car-info.interface";
import CarListItem from "./CarListItem";
import { LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight } from 'lucide-react';

type Props = {
  page?: number,
  total?: number,
  totalPages?: number,
  dataSource?: ICar[],
  onPageChange?: (page: number) => void,
}

const CarListView = ({
  page = 1,
  total = 0,
  totalPages = 1,
  dataSource,
  onPageChange,
}: Props) => {
  return (
    <>
      {/* Results count */}
      <div className="mb-4">
        {total?.toLocaleString()} results
      </div>
      {/* Car grid */}
      <div className="grid grid-cols-3 gap-6">
        {(dataSource || []).map((car) => (
          <CarListItem key={car.id} data={car} />
        ))}
      </div>
      {/* Car Pagination */}
      {(totalPages > 1) &&
        <div className="flex items-center justify-center mt-4">
          <div className='flex gap-4 items-center'>
            <Button className='rounded-full size-12' disabled={page == 1} onClick={() => onPageChange && onPageChange(1)}>
              <LucideChevronsLeft className='text-xl size-10' />
            </Button>
            <Button className='rounded-full size-12' disabled={page == 1} onClick={() => onPageChange && onPageChange(page - 1)}>
              <LucideChevronLeft className='text-xl size-10' />
            </Button>
            <div className="text-lg ">
              Page {page} of {totalPages}
            </div>
            <Button className='rounded-full size-12' disabled={page == totalPages} onClick={() => onPageChange && onPageChange(page + 1)}>
              <LucideChevronRight className='text-xl size-10' />
            </Button>
            <Button className='rounded-full size-12' disabled={page == totalPages} onClick={() => onPageChange && onPageChange(totalPages)}>
              <LucideChevronsRight className='text-xl size-10' />
            </Button>
          </div>
        </div>
      }
    </>
  )
};

export default CarListView;