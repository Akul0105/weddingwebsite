'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for makeup artist vendors - replace with database data later
const makeupVendors = [
  {
    id: 1,
    name: "Glamour by Sarah",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 178,
    price: "From $150",
    image: "/makeup.jpg",
    description: "Professional makeup artist specializing in bridal beauty and glamorous looks.",
    specialties: ["Bridal Makeup", "Glamorous", "Natural", "Airbrush"],
    services: "Bridal + Bridal Party"
  },
  {
    id: 2,
    name: "Natural Beauty Studio",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 134,
    price: "From $120",
    image: "/makeup.jpg",
    description: "Natural and fresh makeup looks that enhance your natural beauty.",
    specialties: ["Natural", "Fresh", "Minimal", "Enhancement"],
    services: "Bridal + Special Occasions"
  },
  {
    id: 3,
    name: "Tropical Glow",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From $140",
    image: "/makeup.jpg",
    description: "Beach wedding specialist with long-lasting makeup for tropical weather.",
    specialties: ["Beach Weddings", "Long-lasting", "Tropical", "Waterproof"],
    services: "Beach Wedding Specialist"
  },
  {
    id: 4,
    name: "Luxury Beauty",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 89,
    price: "From $200",
    image: "/makeup.jpg",
    description: "Premium makeup service with luxury products and personalized consultation.",
    specialties: ["Luxury", "Premium Products", "Personalized", "Exclusive"],
    services: "Premium Full Service"
  },
  {
    id: 5,
    name: "Affordable Beauty",
    location: "Trou aux Biches, Mauritius",
    rating: 4.6,
    reviews: 167,
    price: "From $100",
    image: "/makeup.jpg",
    description: "Quality makeup services at affordable prices for every budget.",
    specialties: ["Affordable", "Quality", "Budget-friendly", "Professional"],
    services: "Basic + Premium Options"
  },
  {
    id: 6,
    name: "Cultural Beauty",
    location: "Le Morne, Mauritius",
    rating: 4.8,
    reviews: 78,
    price: "From $160",
    image: "/makeup.jpg",
    description: "Cultural and traditional makeup styles with modern techniques.",
    specialties: ["Cultural", "Traditional", "Modern", "Authentic"],
    services: "Cultural + Modern Mix"
  }
];

export default function MakeupPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/makeup.jpg"
          alt="Wedding Makeup Artists"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Makeup Artists
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Look stunning on your special day with professional makeup artists
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Book Trial
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
                placeholder="Search makeup artists..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Makeup Artist Vendors Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {makeupVendors.map((vendor) => (
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
                        className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">View Portfolio</Button>
                    <Button variant="outline">Book Trial</Button>
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
