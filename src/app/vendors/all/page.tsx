'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchBar } from '@/components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Grid, List } from 'lucide-react';

// All vendors data - same as in SearchBar component
const allVendors = [
  // Photographers
  {
    id: 1,
    name: "Sarah Johnson Photography",
    category: "Photographers",
    location: "Port Louis, Mauritius",
    rating: 4.9,
    reviews: 127,
    price: "From Rs 25,000",
    image: "/Photographer.jpg",
    description: "Specializing in elegant wedding photography with a natural, candid style.",
    specialties: ["Wedding", "Engagement", "Portrait"],
    link: "/vendors/photographers/sarah-johnson-photography"
  },
  {
    id: 2,
    name: "Mauritius Moments",
    category: "Photographers",
    location: "Grand Baie, Mauritius",
    rating: 4.8,
    reviews: 89,
    price: "From Rs 20,000",
    image: "/Photographer.jpg",
    description: "Capturing beautiful moments with a creative and artistic approach.",
    specialties: ["Wedding", "Destination", "Cultural"],
    link: "/vendors/photographers/mauritius-moments"
  },
  {
    id: 3,
    name: "Island Light Studios",
    category: "Photographers",
    location: "Flic en Flac, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From Rs 22,000",
    image: "/Photographer.jpg",
    description: "Professional wedding photography with stunning island backdrops.",
    specialties: ["Wedding", "Beach", "Luxury"],
    link: "/vendors/photographers/island-light-studios"
  },
  {
    id: 4,
    name: "Pure Love Photography",
    category: "Photographers",
    location: "Trou aux Biches, Mauritius",
    rating: 4.9,
    reviews: 203,
    price: "From Rs 30,000",
    image: "/Photographer.jpg",
    description: "Documentary-style wedding photography that tells your unique story.",
    specialties: ["Wedding", "Documentary", "Storytelling"],
    link: "/vendors/photographers/pure-love-photography"
  },
  // Venues
  {
    id: 5,
    name: "Paradise Cove Hotel",
    category: "Venues",
    location: "Anse la Raie, Mauritius",
    rating: 4.7,
    reviews: 156,
    price: "From Rs 50,000",
    image: "/Venues.jpg",
    description: "Stunning beachfront venue with panoramic ocean views.",
    specialties: ["Beach", "Luxury", "Outdoor"],
    link: "/vendors/venues/paradise-cove-hotel"
  },
  {
    id: 6,
    name: "Château de Labourdonnais",
    category: "Venues",
    location: "Mapou, Mauritius",
    rating: 4.9,
    reviews: 203,
    price: "From Rs 40,000",
    image: "/Venues.jpg",
    description: "Historic colonial mansion with beautiful gardens.",
    specialties: ["Historic", "Garden", "Indoor"],
    link: "/vendors/venues/chateau-de-labourdonnais"
  },
  {
    id: 7,
    name: "Le Telfair Golf & Spa Resort",
    category: "Venues",
    location: "Bel Ombre, Mauritius",
    rating: 4.8,
    reviews: 178,
    price: "From Rs 60,000",
    image: "/Venues.jpg",
    description: "Luxury resort with world-class facilities and stunning views.",
    specialties: ["Luxury", "Resort", "Golf"],
    link: "/vendors/venues/le-telfair-golf-spa-resort"
  },
  // Cakes
  {
    id: 8,
    name: "Sweet Dreams Bakery",
    category: "Cakes",
    location: "Curepipe, Mauritius",
    rating: 4.8,
    reviews: 95,
    price: "From Rs 8,000",
    image: "/Cake.jpg",
    description: "Artisanal wedding cakes with unique designs and flavors.",
    specialties: ["Custom", "Artisanal", "Traditional"],
    link: "/vendors/cakes/sweet-dreams-bakery"
  },
  {
    id: 9,
    name: "Sugar & Spice Cakes",
    category: "Cakes",
    location: "Port Louis, Mauritius",
    rating: 4.6,
    reviews: 67,
    price: "From Rs 6,000",
    image: "/Cake.jpg",
    description: "Delicious wedding cakes made with love and attention to detail.",
    specialties: ["Custom", "Budget", "Traditional"],
    link: "/vendors/cakes/sugar-spice-cakes"
  },
  // DJs
  {
    id: 10,
    name: "Island Beats DJ",
    category: "DJs",
    location: "Grand Baie, Mauritius",
    rating: 4.6,
    reviews: 78,
    price: "From Rs 15,000",
    image: "/DJ.jpg",
    description: "Professional DJ services with modern sound equipment.",
    specialties: ["Wedding", "Party", "Sound System"],
    link: "/vendors/djs/island-beats-dj"
  },
  {
    id: 11,
    name: "Tropical Vibes DJ",
    category: "DJs",
    location: "Flic en Flac, Mauritius",
    rating: 4.5,
    reviews: 89,
    price: "From Rs 12,000",
    image: "/DJ.jpg",
    description: "Keep your dance floor moving with the best music selection.",
    specialties: ["Wedding", "Party", "Music"],
    link: "/vendors/djs/tropical-vibes-dj"
  },
  // Decorators
  {
    id: 12,
    name: "Elegant Events",
    category: "Decorators",
    location: "Port Louis, Mauritius",
    rating: 4.7,
    reviews: 112,
    price: "From Rs 20,000",
    image: "/decorations.jpg",
    description: "Transform your venue into a magical wonderland.",
    specialties: ["Floral", "Lighting", "Themed"],
    link: "/vendors/decorators/elegant-events"
  },
  {
    id: 13,
    name: "Dream Decorations",
    category: "Decorators",
    location: "Curepipe, Mauritius",
    rating: 4.5,
    reviews: 84,
    price: "From Rs 18,000",
    image: "/decorations.jpg",
    description: "Beautiful decorations to make your wedding day special.",
    specialties: ["Floral", "Balloons", "Lighting"],
    link: "/vendors/decorators/dream-decorations"
  },
  // Makeup Artists
  {
    id: 14,
    name: "Bridal Beauty Studio",
    category: "Makeup Artists",
    location: "Flic en Flac, Mauritius",
    rating: 4.9,
    reviews: 145,
    price: "From Rs 12,000",
    image: "/makeup.jpg",
    description: "Professional bridal makeup and hair styling services.",
    specialties: ["Bridal", "Hair", "Makeup"],
    link: "/vendors/makeup/bridal-beauty-studio"
  },
  {
    id: 15,
    name: "Glamour Studio",
    category: "Makeup Artists",
    location: "Grand Baie, Mauritius",
    rating: 4.7,
    reviews: 98,
    price: "From Rs 10,000",
    image: "/makeup.jpg",
    description: "Expert makeup artists for your special day.",
    specialties: ["Bridal", "Party", "Makeup"],
    link: "/vendors/makeup/glamour-studio"
  }
];

const categories = ["All", "Photographers", "Venues", "Cakes", "DJs", "Decorators", "Makeup Artists"];

export default function AllVendorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredVendors = allVendors.filter(vendor => {
    const matchesCategory = selectedCategory === "All" || vendor.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src="/Venues.jpg"
          alt="All Wedding Vendors"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Wedding Vendors
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Discover all our trusted wedding vendors in one place
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-pink-600 hover:bg-pink-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-pink-600 hover:bg-pink-700" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>
      </div>

      {/* Vendors Grid/List */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                      {vendor.price}
                    </div>
                    <div className="absolute top-3 left-3 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {vendor.category}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{vendor.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm font-semibold">{vendor.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{vendor.location}</p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{vendor.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {vendor.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {vendor.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{vendor.specialties.length - 2}
                        </span>
                      )}
                    </div>
                    <Button className="w-full" size="sm" asChild>
                      <Link href={vendor.link}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={vendor.image}
                          alt={vendor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                            <p className="text-gray-600">{vendor.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-pink-600">{vendor.price}</div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="font-semibold">{vendor.rating}</span>
                              <span className="text-gray-500 text-sm">({vendor.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{vendor.description}</p>
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
                          <Button asChild>
                            <Link href={vendor.link}>
                              View Details
                            </Link>
                          </Button>
                          <Button variant="outline">Contact</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredVendors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No vendors found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
