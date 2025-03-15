'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PriceTab() {
  const [price, setPrice] = React.useState('39099.00');
  const [currency, setCurrency] = React.useState('USD');
  const [options, setOptions] = React.useState({
    notCleared: false,
    exchange: true,
    bargaining: true,
    installments: true,
  });

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Price Input */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </div>
          <Input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="pl-6"
          />
        </div>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notCleared"
            checked={options.notCleared}
            onCheckedChange={() => handleOptionChange('notCleared')}
          />
          <Label htmlFor="notCleared">Not cleared through customs</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="exchange"
            checked={options.exchange}
            onCheckedChange={() => handleOptionChange('exchange')}
          />
          <Label htmlFor="exchange">Exchange is possible</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="bargaining"
            checked={options.bargaining}
            onCheckedChange={() => handleOptionChange('bargaining')}
          />
          <Label htmlFor="bargaining">Bargaining is possible</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="installments"
            checked={options.installments}
            onCheckedChange={() => handleOptionChange('installments')}
          />
          <Label htmlFor="installments">
            Payment in installments is possible
          </Label>
        </div>
      </div>
    </div>
  );
}
