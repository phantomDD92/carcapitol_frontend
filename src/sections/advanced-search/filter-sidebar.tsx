'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getColorName, getColorStyle, getConditionName } from '@/utils/string';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const fuelTypes = ['Gasoline', 'Hybrid', 'Diesel', 'Electric'];
const transmissions = [
  'Manual',
  'Automatic',
  'CVT',
  'Semi-Automatic',
  'Dual-Clutch',
  'Tiptronic',
];
const drivetrains = ['FWD', 'RWD', 'AWD', '4WD'];
const features = [
  'Air Conditioning',
  'Sunroof',
  'Navigation System',
  'Type of Seats',
  'Backup Camera',
];
const headlights = ['Matrix', 'LED', 'Xenon', 'Halogen'];
const interiorMaterials = ['Combined', 'Leather', 'Fabric', 'Alcantara'];
const interiorColors = ['Brown', 'Black', 'Beige', 'Gray'];
const seatVentilations = ['Front and rear seats', 'Front seats only', 'None'];
const seatHeatings = ['Front seats', 'All seats', 'None'];
const powerWindows = ['Front', 'Front and rear', 'None'];

export interface ICarLeftFilters {
  condition: number,
  color: number,
  yearRange: number[],
  priceRange: number[],
  mileageRange: number[],
}

type Props = {
  onFiltersChange?: (filters: ICarLeftFilters) => void,
};

export function FilterSidebar({ onFiltersChange }: Props) {
  const [condition, setCondition] = React.useState(0);
  const [color, setColor] = React.useState(0);
  const [yearRange, setYearRange] = React.useState([1990, 2010]);
  const [priceRange, setPriceRange] = React.useState([0, 1000000]);
  const [mileageRange, setMileageRange] = React.useState([0, 1000000]);

  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<string[]>(
    [],
  );
  const [selectedTransmissions, setSelectedTransmissions] = React.useState<
    string[]
  >([]);
  const [selectedDrivetrains, setSelectedDrivetrains] = React.useState<
    string[]
  >([]);
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);

  const handleConditionChange = (value: number) => {
    setCondition(value);
    onFiltersChange && onFiltersChange({ color, yearRange, priceRange, mileageRange, condition: value })
  }

  const handleColorChange = (value: number) => {
    setColor(value);
    onFiltersChange && onFiltersChange({ color: value, yearRange, priceRange, mileageRange, condition })
  }

  const handleYearRangeChange = (value: number[]) => {
    setYearRange(value);
    onFiltersChange && onFiltersChange({ color, yearRange: value, priceRange, mileageRange, condition })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange && onFiltersChange({ color, yearRange, priceRange: value, mileageRange, condition })
  }

  const handleMileageRangeChange = (value: number[]) => {
    setMileageRange(value);
    onFiltersChange && onFiltersChange({ color, yearRange, priceRange, mileageRange: value, condition })
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-solid border-#ddd">
      {/* Key Information */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Key information</h3>
        {/* <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="recommended" className="accent-red-600" />
            <label htmlFor="recommended" className="text-sm">
              Recommended cars
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="dealerships" className="accent-red-600" />
            <label htmlFor="dealerships" className="text-sm">
              Dealerships Near Me
            </label>
          </div>
        </div> */}
      </div>
      {/* Condition */}
      <div className="space-y-4">
        <h3>Condition</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3].map((item) => (
            <button
              key={item}
              onClick={() => handleConditionChange(item)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors min-w-[75px]',
                condition === item
                  ? 'border-red-600 text-red-600'
                  : 'border-gray-200 text-gray-900 hover:bg-gray-50',
              )}
            >
              {getConditionName(item)}
            </button>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-4">
        <h3>Year Range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select
              value={yearRange[0].toString()}
              onValueChange={(value) =>
                handleYearRangeChange([parseInt(value), yearRange[1]])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 36 }, (_, i) => 1990 + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={yearRange[1].toString()}
              onValueChange={(value) =>
                handleYearRangeChange([yearRange[0], parseInt(value)])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 36 }, (_, i) => 1990 + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Slider
            value={yearRange}
            min={1990}
            max={2024}
            step={1}
            onValueChange={handleYearRangeChange}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1990</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3>Price range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-full"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
          </div>
          <Slider
            value={priceRange}
            min={0}
            max={1000000}
            step={10000}
            onValueChange={handlePriceRangeChange}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>$1000,000</span>
          </div>
        </div>
      </div>

      {/* Mileage */}
      <div className="space-y-4">
        <h3>Mileage range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              value={mileageRange[0]}
              onChange={(e) =>
                handleMileageRangeChange([parseInt(e.target.value), mileageRange[1]])
              }
              className="w-full"
            />
            <Input
              type="number"
              value={mileageRange[1]}
              onChange={(e) =>
                handleMileageRangeChange([mileageRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
          </div>
          <Slider
            value={mileageRange}
            min={0}
            max={1000000}
            step={10000}
            onValueChange={handleMileageRangeChange}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 mi</span>
            <span>1,000,000 mi</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2 mb-4">
        <h3>Color</h3>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {[...Array(15).keys()].map((item) => (
              <Tooltip key={item} content={getColorName(item)}>
                <button
                  onClick={() => handleColorChange(item)}
                  className={cn(
                    'h-8 w-8 rounded-full border transition-all hover:scale-110',
                    getColorStyle(item),
                    color === item &&
                    'ring-2 ring-red-600 ring-offset-2',
                  )}
                >
                  <span className="sr-only">{item}</span>
                </button>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      {/* Technical Specifications */}
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <h3>Technical specifications</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          {/* Fuel Type */}
          <div className="space-y-2 mt-2">
            <h4 className="text-sm">Fuel Type</h4>
            <div className="flex flex-wrap gap-2">
              {fuelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedFuelTypes((prev) =>
                      prev.includes(type)
                        ? prev.filter((t) => t !== type)
                        : [...prev, type],
                    )
                  }
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    selectedFuelTypes.includes(type)
                      ? 'border-red-600 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50',
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <h4 className="text-sm">Transmission</h4>
            <div className="flex flex-wrap gap-2">
              {transmissions.map((transmission) => (
                <button
                  key={transmission}
                  onClick={() =>
                    setSelectedTransmissions((prev) =>
                      prev.includes(transmission)
                        ? prev.filter((t) => t !== transmission)
                        : [...prev, transmission],
                    )
                  }
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    selectedTransmissions.includes(transmission)
                      ? 'border-red-600 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50',
                  )}
                >
                  {transmission}
                </button>
              ))}
            </div>
          </div>

          {/* Drivetrain */}
          <div className="space-y-2">
            <h4 className="text-sm">Drivetrain Type</h4>
            <div className="flex flex-wrap gap-2">
              {drivetrains.map((drivetrain) => (
                <button
                  key={drivetrain}
                  onClick={() =>
                    setSelectedDrivetrains((prev) =>
                      prev.includes(drivetrain)
                        ? prev.filter((d) => d !== drivetrain)
                        : [...prev, drivetrain],
                    )
                  }
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    selectedDrivetrains.includes(drivetrain)
                      ? 'border-red-600 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50',
                  )}
                >
                  {drivetrain}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Consumption */}
          <div className="space-y-2">
            <h4 className="text-sm">Fuel Consumption</h4>
            <div className="flex gap-4">
              <Input placeholder="Min" className="w-full" />
              <Input placeholder="Max" className="w-full" />
            </div>
          </div>

          {/* Engine Capacity */}
          <div className="space-y-2">
            <h4 className="text-sm">Engine Capacity</h4>
            <div className="flex gap-4">
              <Input placeholder="Min" className="w-full" />
              <Input placeholder="Max" className="w-full" />
            </div>
          </div>

          {/* Number of Seats */}
          <div className="space-y-2">
            <h4 className="text-sm">Number of Seats</h4>
            <Slider defaultValue={[0]} max={8} step={1} className="py-4" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>8</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Additional Options */}
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <h3>Additional options</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          {/* Features */}
          <div className="space-y-2 mt-4">
            <h4 className="text-sm">Features</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <button
                  key={feature}
                  onClick={() =>
                    setSelectedFeatures((prev) =>
                      prev.includes(feature)
                        ? prev.filter((f) => f !== feature)
                        : [...prev, feature],
                    )
                  }
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    selectedFeatures.includes(feature)
                      ? 'border-red-600 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50',
                  )}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Headlights */}
          <div className="space-y-2">
            <h4 className="text-sm">Headlights</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {headlights.map((headlight) => (
                  <SelectItem key={headlight} value={headlight.toLowerCase()}>
                    {headlight}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interior Materials */}
          <div className="space-y-2">
            <h4 className="text-sm">Interior Materials</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {interiorMaterials.map((material) => (
                  <SelectItem key={material} value={material.toLowerCase()}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interior Color */}
          <div className="space-y-2">
            <h4 className="text-sm">Interior Color</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {interiorColors.map((color) => (
                  <SelectItem key={color} value={color.toLowerCase()}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seat Ventilation */}
          <div className="space-y-2">
            <h4 className="text-sm">Seat Ventilation</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {seatVentilations.map((ventilation) => (
                  <SelectItem
                    key={ventilation}
                    value={ventilation.toLowerCase()}
                  >
                    {ventilation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seat Heating */}
          <div className="space-y-2">
            <h4 className="text-sm">Seat Heating</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {seatHeatings.map((heating) => (
                  <SelectItem key={heating} value={heating.toLowerCase()}>
                    {heating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Power Windows */}
          <div className="space-y-2">
            <h4 className="text-sm">Power Windows</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {powerWindows.map((window) => (
                  <SelectItem key={window} value={window.toLowerCase()}>
                    {window}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
