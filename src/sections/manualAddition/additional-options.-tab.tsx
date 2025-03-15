'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OptionField {
  label: string;
  options: string[];
}

const leftColumnFields: OptionField[] = [
  {
    label: 'Air conditioning',
    options: ['Multi-zone climate control', 'Single-zone', 'Manual', 'None'],
  },
  {
    label: 'Interior materials',
    options: ['Combined', 'Leather', 'Fabric', 'Alcantara'],
  },
  {
    label: 'Power steering',
    options: ['Hydro', 'Electric', 'Electro-hydraulic'],
  },
  {
    label: 'Spare wheel',
    options: ['Full size', 'Space saver', 'Repair kit'],
  },
  {
    label: 'Height adjustment of interior seats',
    options: [
      'Electric adjustment of front and rear seats',
      'Manual adjustment',
      'Fixed',
    ],
  },
  {
    label: 'Heated seats',
    options: ['Front seats', 'All seats', 'None'],
  },
];

const rightColumnFields: OptionField[] = [
  {
    label: 'Electric windows',
    options: ['Front', 'Front and rear', 'None'],
  },
  {
    label: 'Interior color',
    options: ['Brown', 'Black', 'Beige', 'Gray'],
  },
  {
    label: 'Steering wheel adjustment',
    options: ['By height and departure', 'Height only', 'Manual', 'None'],
  },
  {
    label: 'Headlights',
    options: ['Matrix', 'LED', 'Xenon', 'Halogen'],
  },
  {
    label: 'Seat position memory',
    options: ['Front and rear seats', 'Driver seat only', 'None'],
  },
  {
    label: 'Seat ventilation',
    options: ['Front and rear seats', 'Front seats only', 'None'],
  },
];

export function AdditionalOptionsTab() {
  const [options, setOptions] = React.useState<Record<string, string>>({});

  const handleOptionChange = (field: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderOptionField = (field: OptionField) => (
    <div key={field.label} className="space-y-2">
      <label className="text-sm font-medium text-gray-500">{field.label}</label>
      <Select
        value={options[field.label] || ''}
        onValueChange={(value) => handleOptionChange(field.label, value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">{leftColumnFields.map(renderOptionField)}</div>

      {/* Right Column */}
      <div className="space-y-4">
        {rightColumnFields.map(renderOptionField)}
      </div>
    </div>
  );
}
