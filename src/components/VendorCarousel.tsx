// src/components/VendorCarousel.tsx

'use client'; // This component needs to be a client component for the carousel to work

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';

// --- FAKE DATA (Replace with your database data later) ---
const vendorCategories = [
  { name: 'Photographers', description: 'Browse galleries to find your look.', image: '/Photographer.jpg', link: '/vendors/photographers' },
  { name: 'Venues', description: 'See outdoor spaces and historic buildings.', image: '/Venues.jpg', link: '/vendors/venues' },
  { name: 'Cakes', description: 'Meet bakers and set up tastings.', image: '/Cake.jpg', link: '/vendors/cakes' },
  { name: 'DJs', description: 'Keep your dance floor moving.', image: '/DJ.jpg', link: '/vendors/djs' },
  { name: 'Decorators', description: 'Bring your vision to life.', image: '/decorations.jpg', link: '/vendors/decorators' },
  { name: 'Makeup Artists', description: 'Get the perfect bridal glow.', image: '/makeup.jpg', link: '/vendors/makeup' },
];
// ---------------------------------------------------------

export function VendorCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4100, stopOnInteraction: true })
  );

  return (
    <div className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Find vendors for every vibe</h2>
        <p className="text-lg text-gray-600 mb-12">Discover top-rated pros for any budget, background and style.</p>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {vendorCategories.map((category, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden relative group h-80">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <CardContent className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-6">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="mb-4">{category.description}</p>
                      <Button 
                        variant="outline" 
                        className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                        asChild
                      >
                        <Link href={category.link}>
                          Discover {category.name}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}