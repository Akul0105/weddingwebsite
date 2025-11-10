// src/components/VendorCarousel.tsx

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

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
  return (
    <div className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-pink-600 bg-clip-text text-transparent">
            Find vendors for every vibe
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover top-rated pros for any budget, background and style.
          </p>
        </motion.div>

        {/* Static Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4 max-w-6xl mx-auto">
          {vendorCategories.map((category, index) => (
            <Link key={index} href={category.link}>
              <Card className="overflow-hidden relative group h-80 cursor-pointer hover:shadow-xl transition-shadow duration-300">
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
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-pink-500 text-pink-600 hover:bg-pink-50 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/vendors/all">
                View All Vendors
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
