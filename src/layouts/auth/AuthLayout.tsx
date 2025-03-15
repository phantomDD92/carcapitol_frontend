'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const carousel_data = [
  {
    title: 'Driving Innovation',
    subtitle: 'Delivering Excellence',
    image: '/assets/images/carousels/carousel_1.svg',
  },
  {
    title: 'Driving Deals',
    subtitle: 'Setting Standards ',
    image: '/assets/images/carousels/carousel_2.svg',
  },
  {
    title: 'Accelerating Sales',
    subtitle: 'Financing, and Trade',
    image: '/assets/images/carousels/carousel_3.svg',
  },
];

export function AuthLayout({ children }: AuthLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left side */}
      <div className="flex w-full lg:w-1/2 flex-col flex-auto">
        <div className="absolute px-8 pt-6">
          <Image
            src="/assets/icons/logo.svg"
            alt="CarCapitol"
            width={120}
            height={32}
          />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <div className="flex justify-center pb-6">
          <div className="w-full max-w-sm flex justify-between text-gray-500 text-sm">
            <span>©2024 CarCapitol</span>
            <Link href="/settings/privacy-settings" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:block relative w-1/2">
        {carousel_data.map((dta, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-start z-10 p-8 bg-gradient-to-b from-[#FF985F] to-[#B52126] transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-white text-center mt-8">
              <h2 className="text-[48px] font-bold mb-2">{dta.title}</h2>
              <p className="text-[48px] font-bold opacity-75">{dta.subtitle}</p>
            </div>

            <div className="flex flex-1 items-center justify-center w-full max-w-full lg:max-w-[60%] overflow-hidden">
              <Image
                src={dta.image}
                alt="Car marketplace interface"
                layout="responsive"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2 z-10">
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + carousel_data.length) % carousel_data.length,
              )
            }
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {carousel_data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % carousel_data.length)
            }
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
