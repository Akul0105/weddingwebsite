'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Mock data for cake vendors - replace with database data later
const cakeVendors = [
  {
    id: 1,
    name: "Sweet Dreams Bakery",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 156,
    price: "From $200",
    image: "/Cake.jpg",
    description: "Artisanal wedding cakes with unique designs and premium ingredients.",
    specialties: ["Wedding Cakes", "Custom Designs", "Fondant", "Buttercream"]
  },
  {
    id: 2,
    name: "Mauritius Cake Studio",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 89,
    price: "From $180",
    image: "/Cake.jpg",
    description: "Creative cake designs that match your wedding theme perfectly.",
    specialties: ["Themed Cakes", "Sugar Flowers", "3D Designs", "Modern"]
  },
  {
    id: 3,
    name: "Island Delights",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 134,
    price: "From $150",
    image: "/Cake.jpg",
    description: "Traditional and modern cake designs with local flavor inspiration.",
    specialties: ["Traditional", "Local Flavors", "Affordable", "Classic"]
  },
  {
    id: 4,
    name: "Luxe Cakes",
    location: "Belle Mare, Mauritius",
    rating: 4.9,
    reviews: 78,
    price: "From $350",
    image: "/Cake.jpg",
    description: "Luxury wedding cakes with premium ingredients and elaborate designs.",
    specialties: ["Luxury", "Premium", "Elaborate", "Exclusive"]
  },
  {
    id: 5,
    name: "Cake Artistry",
    location: "Trou aux Biches, Mauritius",
    rating: 4.6,
    reviews: 112,
    price: "From $220",
    image: "/Cake.jpg",
    description: "Artistic cake designs that are both beautiful and delicious.",
    specialties: ["Artistic", "Creative", "Unique", "Delicious"]
  },
  {
    id: 6,
    name: "Wedding Cake Boutique",
    location: "Le Morne, Mauritius",
    rating: 4.8,
    reviews: 67,
    price: "From $250",
    image: "/Cake.jpg",
    description: "Boutique cake shop specializing in intimate wedding celebrations.",
    specialties: ["Boutique", "Intimate", "Personalized", "Quality"]
  }
];

export default function CakesPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/Cake.jpg"
          alt="Wedding Cakes"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wedding Cakes
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Delicious and beautiful cakes to sweeten your special day
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
            Schedule Tasting
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
              <Button variant="outline">Flavor</Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search cake vendors..."
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cake Vendors Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakeVendors.map((vendor) => (
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
                    <Button className="flex-1">View Gallery</Button>
                    <Button variant="outline">Book Tasting</Button>
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
