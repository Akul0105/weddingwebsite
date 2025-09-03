'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for DJ vendors - replace with database data later
const djVendors = [
  {
    id: 1,
    name: "DJ Island Vibes",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 134,
    price: "From $400",
    image: "/DJ.jpg",
    description: "Professional DJ specializing in wedding receptions with seamless transitions.",
    specialties: ["Wedding Receptions", "Hip Hop", "R&B", "Top 40"],
    equipment: "Professional Sound System"
  },
  {
    id: 2,
    name: "Mauritius Music Masters",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 89,
    price: "From $350",
    image: "/DJ.jpg",
    description: "Versatile DJ playing everything from classic hits to modern chart-toppers.",
    specialties: ["Classic Hits", "Modern Pop", "Dance", "International"],
    equipment: "Full DJ Setup + Lighting"
  },
  {
    id: 3,
    name: "Beach Beats",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From $380",
    image: "/DJ.jpg",
    description: "Beach wedding specialist with tropical and international music selection.",
    specialties: ["Beach Weddings", "Tropical", "International", "Acoustic"],
    equipment: "Portable Sound System"
  },
  {
    id: 4,
    name: "Luxury Sound",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 78,
    price: "From $600",
    image: "/DJ.jpg",
    description: "Premium DJ service with custom playlists and professional MC skills.",
    specialties: ["Luxury Events", "Custom Playlists", "MC Services", "Premium"],
    equipment: "High-End Sound + Lighting"
  },
  {
    id: 5,
    name: "Party Starters",
    location: "Trou aux Biches, Mauritius",
    rating: 4.6,
    reviews: 112,
    price: "From $320",
    image: "/DJ.jpg",
    description: "Energetic DJ guaranteed to keep your dance floor packed all night.",
    specialties: ["High Energy", "Dance Floor", "Party Hits", "Interactive"],
    equipment: "Standard DJ Setup"
  },
  {
    id: 6,
    name: "Cultural Beats",
    location: "Le Morne, Mauritius",
    rating: 4.8,
    reviews: 67,
    price: "From $450",
    image: "/DJ.jpg",
    description: "Cultural music specialist blending traditional and modern sounds.",
    specialties: ["Cultural Music", "Traditional", "Fusion", "Multilingual"],
    equipment: "Professional Audio + Cultural Instruments"
  }
];

export default function DJsPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/DJ.jpg"
          alt="Wedding DJs"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding DJs
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Keep your dance floor moving with Mauritius' top wedding DJs
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
              <Button variant="outline">Music Style</Button>
              <Button variant="outline">Equipment</Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search DJs..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DJ Vendors Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {djVendors.map((vendor) => (
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
                    {vendor.equipment}
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
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">View Profile</Button>
                    <Button variant="outline">Book Now</Button>
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
