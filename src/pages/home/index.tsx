import React, { useEffect, useState } from 'react';
import { FilterSidebar, ICarLeftFilters as ICarSideFilters } from '@/sections/advanced-search/filter-sidebar';
import CCMainLayout from '@/layouts/main/MainLayout';
import HomeLayout from '@/layouts/home/Layout';
import TopFiltersBar, { ICarFilters as ICarTopFilters } from '@/sections/advanced-search/filter-topbar';
import CarListView from '@/sections/car/CarListView';
import { ICarMake, ICarModel, type ICar } from '@/types/car-info.interface';
import axios from 'axios';

type Props = {
  makes?: ICarMake[],
  models?: ICarModel[],
}

interface ICarFilters {
  page: number,
  make?: number,
  model?: number,
  condition?: number,
  color?: number,
  yearRange?: number[],
  mileageRange?: number[],
  priceRange?: number[],
};

export default function Page({ makes = [], models = [] }: Props) {
  const [make, setMake] = React.useState(0);
  const [model, setModel] = React.useState(0);
  // const [status, setStatus] = React.useState('Any');
  const [page, setPage] = React.useState(1);
  const [condition, setCondition] = React.useState(0);
  const [color, setColor] = React.useState(0);
  const [yearRange, setYearRange] = React.useState([1990, 2010]);
  const [priceRange, setPriceRange] = React.useState([0, 100000]);
  const [mileageRange, setMileageRange] = React.useState([0, 100000]);

  const [cars, setCars] = useState<ICar[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    async function fetchCars(filters: ICarFilters) {
      try {
        const res = await axios.get(`
          ${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/cars`,
          { params: filters }
        );
        const { data, total, totalPages } = res.data
        setCars(data);
        setTotal(total);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error)
      }
    }
    fetchCars({ page, make, model, color, condition, priceRange, mileageRange });
  }, [page, make, model, condition, color, mileageRange, yearRange, priceRange]);

  const handleTopFiltersChange = ({ make, model }: ICarTopFilters) => {
    setMake(make);
    setModel(model);
    
  }


  const handleSideFiltersChange = ({ condition, color, yearRange, priceRange, mileageRange }: ICarSideFilters) => {
    setCondition(condition);
    setColor(color);
    setYearRange(yearRange);
    setPriceRange(priceRange);
    setMileageRange(mileageRange);
  }

  return (
    <div className="container mx-auto pt-8 flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 flex-shrink-0 space-y-6 overflow-y-auto">
        <FilterSidebar
          onFiltersChange={handleSideFiltersChange}
        />
      </div>
      <div className="bg-gray-50/50 p-6 flex-1">
        <TopFiltersBar
          dataSource={{
            makes: [{ id: 0, name: "Any" }].concat(makes),
            models: [{ id: 0, name: "Any" }].concat(models)
          }}
          onFiltersChange={handleTopFiltersChange}
        />
        <CarListView
          page={page}
          total={total}
          totalPages={totalPages}
          dataSource={cars}
          onPageChange={value => setPage(value)}
        />
      </div>
    </div>
  );
}

Page.getLayout = (page: React.ReactElement) => (
  <CCMainLayout>
    <HomeLayout>{page}</HomeLayout>
  </CCMainLayout>
);

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/cars/models`);
    const { makes, models } = res.data;
    return {
      props: { makes, models }
    }
  } catch (error) {
    return {
      props: { makes: [], models: [] },
    };
  }
}
