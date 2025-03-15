'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PriceReductionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPrice: number;
  onConfirm: (newPrice: number) => void;
}

export function PriceReductionDialog({
  open,
  onOpenChange,
  currentPrice,
  onConfirm,
}: PriceReductionDialogProps) {
  const [newPrice, setNewPrice] = React.useState(currentPrice);

  React.useEffect(() => {
    setNewPrice(currentPrice);
  }, [currentPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(newPrice);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Price reduction</DialogTitle>
          <DialogDescription>
            Enter the new price for your car. The old price will be shown
            crossed out.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="pr-16"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              </div>
              <Button variant="outline" size="icon" type="button">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
