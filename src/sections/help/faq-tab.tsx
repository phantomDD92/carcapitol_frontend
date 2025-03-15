'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How can I check the status of my auto loan application?',
    answer:
      'To check the status of your application, log in to your account on the lender\'s website and go to the "Application Status" section. Here, you will see the current status, progress stages, and any additional information we might need from you. You can also set up notifications to receive updates via email or SMS.',
  },
  {
    question: 'What documents do I need to upload to complete my application?',
    answer:
      'Required documents typically include: valid government-issued ID, proof of income (pay stubs or W-2), proof of residence (utility bill or lease agreement), vehicle information (if pre-selected), and insurance information. Additional documents may be requested based on your specific situation.',
  },
  {
    question: 'How can I check the status of my auto loan application?',
    answer:
      "You can check your application status by logging into your account and visiting the Applications section. There you'll find real-time updates on your application's progress.",
  },
  {
    question: 'How do I list my car for sale?',
    answer:
      "To list your car, click on the 'Sell' button in the main navigation, then select 'Create Listing.' Follow the step-by-step process to add photos, vehicle details, pricing, and contact information. Make sure to provide accurate information to attract potential buyers.",
  },
  {
    question: 'What is the process for buying a car?',
    answer:
      'The car buying process includes: browsing available vehicles, scheduling test drives, negotiating price, securing financing (if needed), completing paperwork, and finalizing the purchase. Our platform guides you through each step to ensure a smooth transaction.',
  },
  {
    question: 'How do I schedule a test drive?',
    answer:
      "To schedule a test drive, find the vehicle you're interested in and click the 'Schedule Test Drive' button. Choose your preferred date and time, and we'll confirm the appointment with the seller. You'll receive a confirmation email with all the details.",
  },
  {
    question: 'Can I change my appointment time?',
    answer:
      "Yes, you can modify your appointment time. Go to your account dashboard, find the scheduled appointment, and click 'Reschedule.' Select a new time that works better for you, and we'll update all parties involved.",
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer various financing options including traditional auto loans, lease options, and special financing programs. You can compare rates from multiple lenders, apply online, and get pre-approved before making your purchase.',
  },
  {
    question: 'How do I add an insurance policy?',
    answer:
      "To add an insurance policy, go to your account settings and select 'Insurance Information.' You can either upload your existing policy documents or purchase new coverage through our partner insurance providers.",
  },
];

export function FaqTab() {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-medium">Welcome to the Help Center!</h1>
          <p className="text-sm text-gray-500">
            Here you can find answers to common questions and resources to
            assist you in using our platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="text-sm">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
