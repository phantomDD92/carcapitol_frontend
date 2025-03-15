'use client';

import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CustomDatePickerProps {
  onBack: () => void;
  onSelect: (date: Date | undefined, fromTime: string, toTime: string) => void;
  initialDate?: Date;
  initialFromTime?: string;
  initialToTime?: string;
}

export function CustomDatePicker({
  onBack,
  onSelect,
  initialDate,
  initialFromTime,
  initialToTime,
}: CustomDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [fromTime, setFromTime] = React.useState(initialFromTime || '11:00');
  const [toTime, setToTime] = React.useState(initialToTime || '23:00');
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i,
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onSelect(newDate, fromTime, toTime);
    }
  };

  const handleTimeChange = (type: 'from' | 'to', value: string) => {
    if (type === 'from') {
      setFromTime(value);
    } else {
      setToTime(value);
    }
    if (date) {
      onSelect(
        date,
        type === 'from' ? value : fromTime,
        type === 'to' ? value : toTime,
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-gray-500 hover:text-gray-900"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">Custom</span>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="space-y-1.5">
          <label className="text-sm text-gray-500">From</label>
          <Input
            type="time"
            value={fromTime}
            onChange={(e) => handleTimeChange('from', e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-gray-500">To</label>
          <Input
            type="time"
            value={toTime}
            onChange={(e) => handleTimeChange('to', e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      <div className="px-4">
        <Select
          value={date ? date.getFullYear().toString() : undefined}
          onValueChange={(value) => {
            if (date) {
              const newDate = new Date(date);
              newDate.setFullYear(parseInt(value));
              handleDateSelect(newDate);
            }
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border-0"
      />
    </div>
  );
}
