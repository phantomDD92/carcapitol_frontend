'use client';

import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICarMake, ICarModel } from '@/types/car-info.interface';

export interface ICarFilters {
  make: number,
  model: number,
};

type Props = {
  dataSource: { makes: ICarMake[], models: ICarModel[] }
  onFiltersChange?: (filters: ICarFilters) => void,
}

const TopFiltersBar = ({
  dataSource: { makes = [], models = [] },
  onFiltersChange }: Props) => {

  const [make, setMake] = useState(0);
  const [model, setModel] = useState(0);
  const [filteredModels, setFilteredModels] = useState<ICarModel[]>(models);

  // const handleSearchClick = () => {
  //   onFiltersChange && onFiltersChange({ make, model, year: year ? year + 1999 : 0 })
  // }

  const handleMakeChange = (value: string) => {
    const makeValue = parseInt(value);
    setMake(makeValue);
    setModel(0);
    const filtered = models.filter(item => item.id == 0 || item.make?.id == makeValue)
    setFilteredModels(filtered);
    if (onFiltersChange)
      onFiltersChange({ make: makeValue, model: 0 })
  }

  const handleModelChange = (value: string) => {
    const modelValue = parseInt(value);
    setModel(modelValue);
    if (onFiltersChange)
      onFiltersChange({ make, model: modelValue });
  }

  const getMakeName = (id: number) => {
    const current = makes.find(item => item.id == id)
    return current?.name || "Any";
  }

  const getModelName = (id: number) => {
    return models.find(item => item.id == id)?.name || "Any";
  }

  const getYearName = (year: number) => {
    return year ? `${year + 1999}` : 'Any';
  }

  return (
    <div className="mb-6 flex gap-4">
      <Select value={`${make}`} onValueChange={handleMakeChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue>
            <span className="flex items-center">
              <span className="mr-2 text-gray-400">Make:</span>
              {getMakeName(make)}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {makes.map((element) => (
            <SelectItem key={element.id} value={`${element.id}`}>
              {element.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={`${model}`} onValueChange={handleModelChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue>
            <span className="flex items-center">
              <span className="mr-2 text-gray-400">Model:</span>
              {getModelName(model)}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {filteredModels.map((model) => (
            <SelectItem key={model.id} value={`${model.id}`}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <Select value={`${year}`} onValueChange={value => setYear(parseInt(value))}>
        <SelectTrigger className="w-[250px]">
          <SelectValue>
            <span className="flex items-center">
              <span className="mr-2 text-gray-400">Year:</span>
              {getYearName(year)}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {[...Array(25).keys()].map((element) => (
            <SelectItem key={element} value={`${element}`}>
              {getYearName(element)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      {/* <Select value={`${status}`} onValueChange={value => setStatus(parseInt(value))}>
        <SelectTrigger className="w-[200px]">
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
      </Select> */}
      {/* <Button variant="outline" size="icon" className="rounded-lg" onClick={handleSearchClick}>
        <Search className="size-8" />
      </Button> */}
    </div>
  );
}

export default TopFiltersBar;