'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const colors = [
  { value: 'white', class: 'bg-white border-gray-200' },
  { value: 'black', class: 'bg-black' },
  { value: 'gray', class: 'bg-gray-500' },
  { value: 'silver', class: 'bg-gray-200' },
  { value: 'burgundy', class: 'bg-red-900' },
  { value: 'red', class: 'bg-red-500' },
  { value: 'pink', class: 'bg-pink-500' },
  { value: 'brown', class: 'bg-amber-900' },
  { value: 'orange-brown', class: 'bg-orange-800' },
  { value: 'gold', class: 'bg-yellow-500' },
  { value: 'beige', class: 'bg-yellow-100' },
  { value: 'orange', class: 'bg-orange-500' },
  { value: 'yellow', class: 'bg-yellow-400' },
  { value: 'green', class: 'bg-green-600' },
  { value: 'lime', class: 'bg-lime-400' },
  { value: 'blue', class: 'bg-blue-600' },
  { value: 'light-blue', class: 'bg-blue-400' },
  { value: 'purple', class: 'bg-purple-600' },
];

const paintCoatings = [
  'Metallic',
  'Chameleon',
  'Airbrushing',
  'Pearl',
  'Matte finish',
  'Glossy coating',
];

export function CharacteristicsTab() {
  const [selectedColor, setSelectedColor] = React.useState<string>('white');
  const [selectedCoating, setSelectedCoating] =
    React.useState<string>('Metallic');
  const [accidentHistory, setAccidentHistory] = React.useState('not_involved');
  const [description, setDescription] = React.useState('');
  const [drivenFrom, setDrivenFrom] = React.useState('');
  const [technicalCondition, setTechnicalCondition] = React.useState('');

  return (
    <div className="space-y-8">
      {/* Color Selection */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Color</h2>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                'h-8 w-8 rounded-full border transition-all hover:scale-110',
                color.class,
                selectedColor === color.value &&
                  'ring-2 ring-red-600 ring-offset-2',
              )}
            >
              <span className="sr-only">{color.value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Paint Coating */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Paint coating</h2>
        <div className="flex flex-wrap gap-2">
          {paintCoatings.map((coating) => (
            <button
              key={coating}
              onClick={() => setSelectedCoating(coating)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                selectedCoating === coating
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-100',
              )}
            >
              {coating}
            </button>
          ))}
        </div>
      </div>

      {/* Accident History */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">
          Participation in a road accident
        </h2>
        <RadioGroup
          value={accidentHistory}
          onValueChange={setAccidentHistory}
          className="flex flex-wrap gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="involved" id="involved" />
            <Label htmlFor="involved">Involved</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_involved" id="not_involved" />
            <Label htmlFor="not_involved">Not involved</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="restored" id="restored" />
            <Label htmlFor="restored">Restored after an accident</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="partially_restored"
              id="partially_restored"
            />
            <Label htmlFor="partially_restored">
              Partially restored after an accident
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Driven From and Technical Condition */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-500">Driven from</h2>
          <Select value={drivenFrom} onValueChange={setDrivenFrom}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-500">
            Technical condition
          </h2>
          <Select
            value={technicalCondition}
            onValueChange={setTechnicalCondition}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="well-maintained">Well-Maintained</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-gray-500">Description</h2>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a detailed description of the vehicle..."
          className="min-h-[150px] resize-none"
          maxLength={1000}
        />
        <div className="text-xs text-gray-500 text-right">
          Write at least 10 characters
        </div>
      </div>
    </div>
  );
}
