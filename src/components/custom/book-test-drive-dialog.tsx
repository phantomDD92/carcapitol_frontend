'use client';

import * as React from 'react';
import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookTestDriveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookTestDriveDialog({
  open,
  onOpenChange,
}: BookTestDriveDialogProps) {
  const [driveType, setDriveType] = React.useState<'showroom' | 'doorstep'>(
    'showroom',
  );
  const [selectedDate, setSelectedDate] = React.useState('9');
  const [selectedTime, setSelectedTime] = React.useState('10:00 - 11:00');
  const [selectedDealer, setSelectedDealer] = React.useState('');

  const dates = Array.from({ length: 9 }, (_, i) => {
    const date = 8 + i;
    const day = ['We', 'Fr', 'Sa', 'Su', 'Mo', 'Th', 'We', 'Fr', 'Sa'][i];
    return { date: date.toString(), day };
  });

  const times = [
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">Book test drive</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onOpenChange(false)}
            ></Button>
          </div>
          <p className="text-xs text-gray-500">
            Fill in the fields and select a dealership
          </p>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Drive Type Selection */}
          <div className="flex gap-2">
            <Button
              variant={driveType === 'showroom' ? 'default' : 'outline'}
              className="flex-1 h-9 text-sm"
              onClick={() => setDriveType('showroom')}
            >
              🏢 Showroom
            </Button>
            <Button
              variant={driveType === 'doorstep' ? 'default' : 'outline'}
              className="flex-1 h-9 text-sm"
              onClick={() => setDriveType('doorstep')}
            >
              🚗 Door Step
            </Button>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500">
              Pick the Date on September 2024
            </h4>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {dates.map(({ date, day }) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? 'default' : 'outline'}
                  className="flex-col px-2 py-1 h-auto"
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-[10px]">{day}</span>
                  <span className="text-xs font-medium">{date}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500">
              Select Time Slot
            </h4>
            <div className="flex flex-wrap gap-1">
              {times.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  className="text-xs h-8"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Dealership Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500">
              Select a dealership
            </h4>
            <Select value={selectedDealer} onValueChange={setSelectedDealer}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Glar. Olazabal, 14" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="olazabal">Glar. Olazabal, 14</SelectItem>
                <SelectItem value="downtown">Downtown Showroom</SelectItem>
                <SelectItem value="westside">Westside Dealership</SelectItem>
              </SelectContent>
            </Select>
            <div className="aspect-video w-full rounded-lg bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 h-9 text-sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button className="flex-1 h-9 text-sm bg-red-600 hover:bg-red-700">
            Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
