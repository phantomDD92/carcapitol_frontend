'use client';

import * as React from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface InstallmentTabProps {
  carName: string;
  carImage: string;
  price: number;
  onComplete: () => void;
}

export function InstallmentTab({
  carName,
  carImage,
  price,
  onComplete,
}: InstallmentTabProps) {
  const [selectedMonths, setSelectedMonths] = React.useState<number>(12);
  const [initialPaymentPercent, setInitialPaymentPercent] =
    React.useState<number>(10);
  const [selectedBank, setSelectedBank] = React.useState<string>('');
  const [comments, setComments] = React.useState<string>('');

  const monthOptions = [4, 6, 12, 36];
  const deliveryFee = 9500;
  const vat = Math.round(price * 0.1); // 10% VAT
  const totalAmount = price + vat + deliveryFee;

  const handleIncreaseInitialPayment = () => {
    setInitialPaymentPercent((prev) => Math.min(prev + 5, 50));
  };

  const handleDecreaseInitialPayment = () => {
    setInitialPaymentPercent((prev) => Math.max(prev - 5, 5));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
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
          <Label className="text-sm text-gray-500">Cost of the vehicle</Label>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1">
              <Input
                value={`$ ${price.toLocaleString()}`}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <Button variant="outline" size="sm">
              USD <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">
            Installment period (months)
          </Label>
          <div className="flex gap-2 mt-1">
            {monthOptions.map((month) => (
              <Button
                key={month}
                variant={selectedMonths === month ? 'default' : 'outline'}
                className={cn(
                  'flex-1',
                  selectedMonths === month && 'bg-red-600 hover:bg-red-700',
                )}
                onClick={() => setSelectedMonths(month)}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Initial payment</Label>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecreaseInitialPayment}
              disabled={initialPaymentPercent <= 5}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              value={`% ${initialPaymentPercent}`}
              readOnly
              className="text-center bg-gray-50"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncreaseInitialPayment}
              disabled={initialPaymentPercent >= 50}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!selectedBank ? (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/assets/icons/citi.svg"
                  alt="Citibank logo"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">Citibank</div>
                  <div className="text-sm text-gray-500">Auto Loan</div>
                </div>
                <Badge variant="secondary">12-60 months</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">Interest Rate</div>
                  <div>4.5%</div>
                </div>
                <div>
                  <div className="text-gray-500">Min Down Payment</div>
                  <div>10%</div>
                </div>
              </div>
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => setSelectedBank('citibank')}
              >
                Apply Now
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/assets/icons/goldenman.svg"
                  alt="Goldman Sachs logo"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">Goldman Sachs Bank</div>
                  <div className="text-sm text-gray-500">Installment Plan</div>
                </div>
                <Badge variant="secondary">24-48 months</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">Interest Rate</div>
                  <div>5%</div>
                </div>
                <div>
                  <div className="text-gray-500">Min Down Payment</div>
                  <div>0%</div>
                </div>
              </div>
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => setSelectedBank('goldman')}
              >
                Apply Now
              </Button>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="payment">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <div className="font-medium">Payment</div>
                  <div className="text-sm text-gray-500">
                    Prepayment to the seller&#39;s card
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>Payment content here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <div className="font-medium">Delivery</div>
                  <div className="text-sm text-gray-500">
                    Car carrier (open)
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>Delivery options here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="installment">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <div className="font-medium">Installment</div>
                  <div className="text-sm text-gray-500">
                    {selectedBank === 'citibank'
                      ? 'Citibank, 4.5%, 12 months'
                      : 'Goldman Sachs, 5%, 12 months'}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>Installment details here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="promo">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <div className="font-medium">Promo code</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Input placeholder="Enter promo code" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="insurance">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <div className="font-medium">Insurance</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>Insurance options here</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {selectedBank && (
          <>
            <div className="pt-4">
              <Label className="text-sm text-gray-500">
                Your comments or order
              </Label>
              <Textarea
                placeholder="Leave comment..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Order amount</span>
                <span className="font-medium">${price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Value Added Tax (VAT)</span>
                <span className="font-medium">${vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Delivery</span>
                <span className="font-medium">
                  ${deliveryFee.toLocaleString()}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total amount</span>
                  <span className="font-medium">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          variant="outline"
          onClick={selectedBank ? () => setSelectedBank('') : onComplete}
        >
          Cancel
        </Button>
        <Button
          className="ml-auto bg-red-600 hover:bg-red-700"
          onClick={selectedBank ? onComplete : undefined}
          disabled={!selectedBank}
        >
          {selectedBank ? 'Continue' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
