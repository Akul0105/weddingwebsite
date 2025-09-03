'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for venues - replace with database data later
const venues = [
  {
    id: 1,
    name: "Tropical Paradise Resort",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 89,
    price: "From $2,500",
    image: "/Venues.jpg",
    description: "Beachfront resort with stunning ocean views and luxury amenities.",
    capacity: "50-200 guests",
    features: ["Beachfront", "Ocean View", "Luxury", "All-inclusive"]
  },
  {
    id: 2,
    name: "Historic Chateau",
    location: "Port Louis, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From $1,800",
    image: "/Venues.jpg",
    description: "Elegant colonial mansion with beautiful gardens and vintage charm.",
    capacity: "30-120 guests",
    features: ["Historic", "Garden", "Elegant", "Cultural"]
  },
  {
    id: 3,
    name: "Mountain View Estate",
    location: "Le Morne, Mauritius",
    rating: 4.8,
    reviews: 67,
    price: "From $2,200",
    image: "/Venues.jpg",
    description: "Secluded mountain estate with panoramic views and privacy.",
    capacity: "40-150 guests",
    features: ["Mountain View", "Secluded", "Panoramic", "Luxury"]
  },
  {
    id: 4,
    name: "Garden Palace",
    location: "Grand Baie, Mauritius",
    rating: 4.6,
    reviews: 134,
    price: "From $1,600",
    image: "/Venues.jpg",
    description: "Beautiful garden venue perfect for intimate outdoor ceremonies.",
    capacity: "20-80 guests",
    features: ["Garden", "Outdoor", "Intimate", "Affordable"]
  },
  {
    id: 5,
    name: "Beach Club",
    location: "Flic en Flac, Mauritius",
    rating: 4.5,
    reviews: 98,
    price: "From $1,900",
    image: "/Venues.jpg",
    description: "Modern beach club with contemporary design and beach access.",
    capacity: "60-180 guests",
    features: ["Beach", "Modern", "Contemporary", "Party"]
  },
  {
    id: 6,
    name: "Luxury Villa",
    location: "Trou aux Biches, Mauritius",
    rating: 4.9,
    reviews: 78,
    price: "From $3,000",
    image: "/Venues.jpg",
    description: "Exclusive private villa with infinity pool and ocean views.",
    capacity: "25-100 guests",
    features: ["Private", "Villa", "Infinity Pool", "Exclusive"]
  }
];

export default function VenuesPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/Venues.jpg"
          alt="Wedding Venues"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Venues
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Find the perfect venue for your dream wedding in Mauritius
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Book Venue Tour
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
              <Button variant="outline">Capacity</Button>
              <Button variant="outline">Style</Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search venues..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    {venue.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {venue.capacity}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold">{venue.rating}</span>
                      <span className="text-sm text-gray-500">({venue.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{venue.location}</p>
                  <p className="text-gray-700 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/vendors/venues/${venue.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline">Book Tour</Button>
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
