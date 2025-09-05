'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const vendorCategories = [
  {
    name: 'Photographers',
    description: 'Capture your special moments with professional photographers',
    image: '/Photographer.jpg',
    link: '/vendors/photographers',
    count: '50+ vendors'
  },
  {
    name: 'Venues',
    description: 'Find the perfect location for your dream wedding',
    image: '/Venues.jpg',
    link: '/vendors/venues',
    count: '30+ venues'
  },
  {
    name: 'Cakes',
    description: 'Delicious and beautiful cakes for your celebration',
    image: '/Cake.jpg',
    link: '/vendors/cakes',
    count: '25+ bakers'
  },
  {
    name: 'DJs',
    description: 'Keep your dance floor moving all night long',
    image: '/DJ.jpg',
    link: '/vendors/djs',
    count: '40+ DJs'
  },
  {
    name: 'Decorators',
    description: 'Transform your venue into a magical wonderland',
    image: '/decorations.jpg',
    link: '/vendors/decorators',
    count: '35+ decorators'
  },
  {
    name: 'Makeup Artists',
    description: 'Look stunning on your special day',
    image: '/makeup.jpg',
    link: '/vendors/makeup',
    count: '45+ artists'
  }
];

export default function VendorsPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/Venues.jpg"
          alt="Wedding Vendors"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Vendors
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Find the perfect vendors for every aspect of your wedding
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200" asChild>
            <Link href="/vendors/all">
              Browse All Vendors
            </Link>
          </Button>
        </div>
      </div>

      {/* Vendor Categories Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Vendor Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From photographers to venues, we have everything you need to make your wedding perfect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendorCategories.map((category) => (
              <Card key={category.name} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {category.count}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.name}</h3>
                  <p className="text-gray-700 mb-6">{category.description}</p>
                  <Button className="w-full" asChild>
                    <Link href={category.link}>
                      Browse {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
