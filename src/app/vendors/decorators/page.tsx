'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for decorator vendors - replace with database data later
const decoratorVendors = [
  {
    id: 1,
    name: "Elegant Events",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 145,
    price: "From $800",
    image: "/decorations.jpg",
    description: "Luxury wedding decor with attention to every detail and custom designs.",
    specialties: ["Luxury Decor", "Custom Designs", "Floral Arrangements", "Lighting"],
    services: "Full Service Decoration"
  },
  {
    id: 2,
    name: "Tropical Blooms",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 98,
    price: "From $600",
    image: "/decorations.jpg",
    description: "Tropical and beach-themed decorations perfect for island weddings.",
    specialties: ["Tropical Theme", "Beach Weddings", "Natural Elements", "Colorful"],
    services: "Theme Design + Setup"
  },
  {
    id: 3,
    name: "Island Elegance",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 167,
    price: "From $700",
    image: "/decorations.jpg",
    description: "Elegant and sophisticated decor with a touch of island charm.",
    specialties: ["Elegant", "Sophisticated", "Island Charm", "Modern"],
    services: "Complete Decoration Package"
  },
  {
    id: 4,
    name: "Dream Designs",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 89,
    price: "From $1000",
    image: "/decorations.jpg",
    description: "Premium decoration service with unique and creative designs.",
    specialties: ["Premium", "Creative", "Unique", "Exclusive"],
    services: "Premium Full Service"
  },
  {
    id: 5,
    name: "Affordable Elegance",
    location: "Trou aux Biches, Mauritius",
    rating: 4.6,
    reviews: 123,
    price: "From $450",
    image: "/decorations.jpg",
    description: "Beautiful decorations at affordable prices without compromising quality.",
    specialties: ["Affordable", "Quality", "Beautiful", "Budget-Friendly"],
    services: "Basic + Premium Options"
  },
  {
    id: 6,
    name: "Cultural Creations",
    location: "Le Morne, Mauritius",
    rating: 4.8,
    reviews: 76,
    price: "From $750",
    image: "/decorations.jpg",
    description: "Cultural and traditional decorations with modern twists.",
    specialties: ["Cultural", "Traditional", "Modern Twist", "Authentic"],
    services: "Cultural + Modern Mix"
  }
];

export default function DecoratorsPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/decorations.jpg"
          alt="Wedding Decorations"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Decorators
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Transform your venue into a magical wedding wonderland
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Get Quote
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
              <Button variant="outline">Services</Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search decorators..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorator Vendors Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decoratorVendors.map((vendor) => (
              <Card key={vendor.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {vendor.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {vendor.services}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold">{vendor.rating}</span>
                      <span className="text-sm text-gray-500">({vendor.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{vendor.location}</p>
                  <p className="text-gray-700 mb-4">{vendor.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">View Portfolio</Button>
                    <Button variant="outline">Get Quote</Button>
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
