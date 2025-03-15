'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carName: string;
  currentPrice: number;
}

export function MakeOfferDialog({
  open,
  onOpenChange,
  carName,
  currentPrice,
}: MakeOfferDialogProps) {
  const [step, setStep] = React.useState<'form' | 'success'>('form');
  const [offerAmount, setOfferAmount] = React.useState('');
  const [comments, setComments] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after animation completes
    setTimeout(() => {
      setStep('form');
      setOfferAmount('');
      setComments('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 'form' ? (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <DialogTitle>Make Your Offer</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleClose}
                ></Button>
              </div>
              <p className="text-xs text-gray-500">
                By submitting an offer, you agree to the terms of the deal and
                the platform&#39;s privacy policy.
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{carName}</h3>
                  <p className="text-sm text-gray-500">Coupe</p>
                </div>
                <div className="text-sm font-medium">
                  ${currentPrice.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Enter your offer</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="pl-6"
                    placeholder="58,000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                    USD
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  The offer cannot be higher or significantly lower than the
                  current price
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm">
                  Your comments or terms of the deal
                </label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="I am willing to pay this amount if the car is delivered within a week..."
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Write at least 10 characters
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Send
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-green-50 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium">
              Your offer will be reviewed within 24 hours
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              Your offer will be reviewed within 24 hours. We will contact you
              with further steps.
            </p>
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleClose}
            >
              Ok
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
