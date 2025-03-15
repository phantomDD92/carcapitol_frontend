'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CarCarouselProps {
  images: string[];
}

export function CarCarousel({ images }: CarCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const previousImage = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const nextImage = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#1A1A1A]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={image}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute bottom-6 right-6 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={previousImage}
          className="bg-black/50 border-0 hover:bg-black/75 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="bg-black/50 border-0 hover:bg-black/75 backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
