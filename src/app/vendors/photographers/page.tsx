'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for photographers - replace with database data later
const photographers = [
  {
    id: 1,
    name: "Sarah Johnson Photography",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 127,
    price: "From $800",
    image: "/Photographer.jpg",
    description: "Specializing in elegant wedding photography with a natural, candid style.",
    specialties: ["Wedding", "Engagement", "Portrait"]
  },
  {
    id: 2,
    name: "Mauritius Moments",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 89,
    price: "From $650",
    image: "/Photographer.jpg",
    description: "Capturing beautiful moments with a creative and artistic approach.",
    specialties: ["Wedding", "Destination", "Cultural"]
  },
  {
    id: 3,
    name: "Island Light Studios",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From $750",
    image: "/Photographer.jpg",
    description: "Professional wedding photography with stunning island backdrops.",
    specialties: ["Wedding", "Beach", "Luxury"]
  },
  {
    id: 4,
    name: "Pure Love Photography",
    location: "Trou aux Biches, Mauritius",
    rating: 4.9,
    reviews: 203,
    price: "From $900",
    image: "/Photographer.jpg",
    description: "Documentary-style wedding photography that tells your unique story.",
    specialties: ["Wedding", "Documentary", "Storytelling"]
  },
  {
    id: 5,
    name: "Tropical Dreams",
    location: "Le Morne, Mauritius",
    rating: 4.6,
    reviews: 67,
    price: "From $600",
    image: "/Photographer.jpg",
    description: "Affordable wedding photography without compromising on quality.",
    specialties: ["Wedding", "Budget", "Traditional"]
  },
  {
    id: 6,
    name: "Luxe Lens",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 178,
    price: "From $1200",
    image: "/Photographer.jpg",
    description: "Premium wedding photography for luxury celebrations.",
    specialties: ["Wedding", "Luxury", "Fine Art"]
  }
];

export default function PhotographersPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/Photographer.jpg"
          alt="Wedding Photography"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Photographers
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Capture your special day with Mauritius' finest photographers
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Book Consultation
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline">All Locations</Button>
              <Button variant="outline">Price Range</Button>
              <Button variant="outline">Style</Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search photographers..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Photographers Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographers.map((photographer) => (
              <Card key={photographer.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={photographer.image}
                    alt={photographer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {photographer.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{photographer.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold">{photographer.rating}</span>
                      <span className="text-sm text-gray-500">({photographer.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{photographer.location}</p>
                  <p className="text-gray-700 mb-4">{photographer.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {photographer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/vendors/photographers/${photographer.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        View Portfolio
                      </Link>
                    </Button>
                    <Button variant="outline">Contact</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
