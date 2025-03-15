'use client';

import * as React from 'react';
import {
  MapPin,
  ChevronRight,
  CreditCard,
  Building2,
  Wallet,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type Step = 'delivery' | 'payment' | 'insurance' | 'summary';

interface StepConfig {
  title: string;
  icon: React.ReactNode;
}

const steps: Record<Step, StepConfig> = {
  delivery: {
    title: 'Delivery method',
    icon: <MapPin className="h-4 w-4" />,
  },
  payment: {
    title: 'Payment Method',
    icon: <CreditCard className="h-4 w-4" />,
  },
  insurance: {
    title: 'Insurance',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  summary: {
    title: 'Summary',
    icon: <ChevronRight className="h-4 w-4" />,
  },
};

interface FullPaymentTabProps {
  carName: string;
  carImage: string;
  price: number;
  onComplete: () => void;
}

export function FullPaymentTab({
  carName,
  carImage,
  price,
  onComplete,
}: FullPaymentTabProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>('delivery');
  const [deliveryMethod, setDeliveryMethod] = React.useState<string>('');
  const [paymentMethod, setPaymentMethod] = React.useState<string>('');
  const [insuranceType, setInsuranceType] = React.useState<string>('');

  const handleNext = () => {
    const stepOrder: Step[] = ['delivery', 'payment', 'insurance', 'summary'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['delivery', 'payment', 'insurance', 'summary'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Steps */}
      <div className="flex items-center justify-between px-2 mb-6">
        {(Object.entries(steps) as [Step, StepConfig][]).map(
          ([key, step], index) => (
            <div
              key={key}
              className={cn(
                'flex items-center gap-2',
                currentStep === key ? 'text-red-600' : 'text-gray-500',
              )}
            >
              <div className="flex items-center gap-1 text-sm">
                {step.icon}
                <span className="hidden sm:inline">{step.title}</span>
              </div>
              {index < Object.keys(steps).length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ),
        )}
      </div>

      {/* Car Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <Image src={carImage} alt={carName} fill className="w-100 h-100" />
        </div>
        <div>
          <h3 className="font-medium">{carName}</h3>
          <p className="text-lg font-medium">${price.toLocaleString()}</p>
        </div>
      </div>

      {currentStep === 'delivery' && (
        <div className="space-y-4">
          <h3 className="font-medium">Select delivery method</h3>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="showroom" id="showroom" />
                <Label htmlFor="showroom" className="flex-1">
                  <div className="font-medium">Pickup from showroom</div>
                  <div className="text-sm text-gray-500">Free</div>
                </Label>
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="doorstep" id="doorstep" />
                <Label htmlFor="doorstep" className="flex-1">
                  <div className="font-medium">Doorstep delivery</div>
                  <div className="text-sm text-gray-500">+$299</div>
                </Label>
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {currentStep === 'payment' && (
        <div className="space-y-4">
          <h3 className="font-medium">Select payment method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1">
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-gray-500">
                    Secure payment with credit card
                  </div>
                </Label>
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1">
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm text-gray-500">
                    Direct bank transfer
                  </div>
                </Label>
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1">
                  <div className="font-medium">Cash</div>
                  <div className="text-sm text-gray-500">
                    Pay in cash at pickup
                  </div>
                </Label>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {currentStep === 'insurance' && (
        <div className="space-y-4">
          <h3 className="font-medium">Select insurance type</h3>
          <RadioGroup value={insuranceType} onValueChange={setInsuranceType}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic" className="flex-1">
                  <div className="font-medium">Basic Coverage</div>
                  <div className="text-sm text-gray-500">
                    Essential protection for your vehicle
                  </div>
                </Label>
                <Badge variant="secondary">$99/month</Badge>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="flex-1">
                  <div className="font-medium">Premium Coverage</div>
                  <div className="text-sm text-gray-500">
                    Comprehensive protection with additional benefits
                  </div>
                </Label>
                <Badge variant="secondary">$149/month</Badge>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="flex-1">
                  <div className="font-medium">No Insurance</div>
                  <div className="text-sm text-gray-500">
                    I&#39;ll arrange my own insurance
                  </div>
                </Label>
                <Badge variant="secondary">$0/month</Badge>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {currentStep === 'summary' && (
        <div className="space-y-4">
          <h3 className="font-medium">Order summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Vehicle price</span>
              <span className="font-medium">${price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Delivery fee</span>
              <span className="font-medium">
                {deliveryMethod === 'doorstep' ? '$299' : 'Free'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Insurance (monthly)</span>
              <span className="font-medium">
                {insuranceType === 'basic'
                  ? '$99'
                  : insuranceType === 'premium'
                    ? '$149'
                    : '$0'}
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  $
                  {(
                    price + (deliveryMethod === 'doorstep' ? 299 : 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        {currentStep !== 'delivery' && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button
          className="ml-auto bg-red-600 hover:bg-red-700"
          onClick={currentStep === 'summary' ? onComplete : handleNext}
        >
          {currentStep === 'summary' ? 'Complete Purchase' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
