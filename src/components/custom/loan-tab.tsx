'use client';

import * as React from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LoanTabProps {
  carName: string;
  carImage: string;
  price: number;
  onComplete: () => void;
}

export function LoanTab({
  carName,
  carImage,
  price,
  onComplete,
}: LoanTabProps) {
  const [step, setStep] = React.useState<'select' | 'details'>('select');
  const [selectedBank, setSelectedBank] = React.useState<string>('');
  const [selectedMonths, setSelectedMonths] = React.useState<number>(12);
  const [loanAmount, setLoanAmount] = React.useState<number>(price);

  const monthOptions = [4, 6, 12];
  const apr = 2.5;
  const monthlyPayment = Math.round(
    (loanAmount * (1 + apr / 100)) / selectedMonths,
  );
  const totalOverpayment = monthlyPayment * selectedMonths - loanAmount;

  const handleConfirm = () => {
    if (step === 'select' && selectedBank) {
      setStep('details');
    } else if (step === 'details') {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        {step === 'details' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep('select')}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <Image src={carImage} alt={carName} fill className="w-100 h-100" />
        </div>
        <div>
          <h3 className="font-medium">{carName}</h3>
          <div className="text-sm text-gray-500">Coupe</div>
          <p className="text-lg font-medium">${price.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-gray-500">
            Bank or credit institution
          </Label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Choose from dropdown" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="axa">AXA Insurance</SelectItem>
              <SelectItem value="citibank">Citibank</SelectItem>
              <SelectItem value="goldman">Goldman Sachs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Loan amount</Label>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1">
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="bg-gray-50"
              />
            </div>
            <Button variant="outline" size="sm">
              USD <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Loan term (months)</Label>
          <div className="flex gap-2 mt-1">
            {monthOptions.map((month) => (
              <Button
                key={month}
                variant={selectedMonths === month ? 'default' : 'outline'}
                className={
                  selectedMonths === month ? 'bg-red-600 hover:bg-red-700' : ''
                }
                onClick={() => setSelectedMonths(month)}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>

        {step === 'details' && (
          <>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-sm text-gray-500">
                  Annual Percentage Rate (APR)
                </div>
                <div className="font-medium">{apr}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly payment</div>
                <div className="font-medium">
                  ${monthlyPayment.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Initial payment</div>
                <div className="font-medium">
                  ${monthlyPayment.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total overpayment</div>
                <div className="font-medium">
                  ${totalOverpayment.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-sm text-gray-500">First payment date</div>
                <div className="font-medium">Sep 27, 2024</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Loan expiration date
                </div>
                <div className="font-medium">Sep 27, 2025</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button
          className="ml-auto bg-red-600 hover:bg-red-700"
          onClick={handleConfirm}
          disabled={!selectedBank}
        >
          {step === 'select' ? 'Confirm' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
