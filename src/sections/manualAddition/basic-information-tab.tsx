import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const vehicleTypes = [
  { id: 'car', label: 'Car', icon: '🚗' },
  { id: 'motorbike', label: 'Motorbike', icon: '🏍' },
  { id: 'bus', label: 'Bus', icon: '🚌' },
  { id: 'motorhome', label: 'Motorhome', icon: '🚐' },
  { id: 'trailer', label: 'Trailer', icon: '🚛' },
  { id: 'machinery', label: 'Machinery', icon: '🚜' },
  { id: 'trucks', label: 'Trucks', icon: '🚚' },
  { id: 'boats', label: 'Boats', icon: '🚤' },
];

export function BasicInformationTab() {
  const [selectedType, setSelectedType] = React.useState('car');
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [bodyType, setBodyType] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [mileage, setMileage] = React.useState('');
  const [modification, setModification] = React.useState('');
  const [city, setCity] = React.useState('');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-8 gap-4">
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg border p-4 hover:border-red-200',
              selectedType === type.id && 'border-red-600',
            )}
          >
            <span className="text-2xl">{type.icon}</span>
            <span className="text-sm">{type.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Car brand</label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Year of release</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => (
                  <SelectItem key={i} value={(2024 - i).toString()}>
                    {2024 - i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Body type</label>
            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Car model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-series">3 Series</SelectItem>
                <SelectItem value="5-series">5 Series</SelectItem>
                <SelectItem value="7-series">7 Series</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mileage</label>
            <Input
              placeholder="thousand km"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Modification</label>
            <Input
              placeholder="Specify if any"
              value={modification}
              onChange={(e) => setModification(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Choose from the dropdown" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
