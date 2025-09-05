'use client';

import { useState, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Mock vendor data - replace with actual API call later
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
  // Venues
  {
    id: 3,
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
    id: 4,
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
  // Cakes
  {
    id: 5,
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
  // DJs
  {
    id: 6,
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
  // Decorators
  {
    id: 7,
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
  // Makeup Artists
  {
    id: 8,
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
  }
];

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      const filtered = allVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(filtered);
      setShowResults(true);
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      setShowResults(true);
      toast.success(`Found ${searchResults.length} vendors!`);
    } else {
      toast.error('Please enter at least 3 characters to search');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.form 
        onSubmit={handleSearch} 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: searchTerm.length > 0 ? 1.1 : 1,
              rotate: searchTerm.length > 0 ? 5 : 0 
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </motion.div>
          <input
            type="text"
            placeholder="Search vendors, locations, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="mt-2 w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 shadow-lg"
            disabled={searchTerm.length <= 2}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Search
          </Button>
        </motion.div>
      </motion.form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto backdrop-blur-sm"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isSearching ? (
              <motion.div 
                className="p-4 text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.div>
                <p className="mt-2">Searching...</p>
              </motion.div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                <motion.div 
                  className="text-sm text-gray-600 mb-2 px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Found {searchResults.length} vendor{searchResults.length !== 1 ? 's' : ''}
                </motion.div>
                {searchResults.slice(0, 5).map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={vendor.link}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className="mb-2 hover:bg-gradient-to-r hover:from-pink-50 hover:to-white cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-300">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <motion.div 
                                className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                                whileHover={{ rotate: 5 }}
                              >
                                <Image
                                  src={vendor.image}
                                  alt={vendor.name}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate">{vendor.name}</h4>
                                <p className="text-xs text-gray-600 truncate">{vendor.category}</p>
                                <p className="text-xs text-gray-500 truncate">{vendor.location}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-semibold text-pink-600">{vendor.price}</div>
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-500 text-xs">★</span>
                                  <span className="text-xs">{vendor.rating}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                {searchResults.length > 5 && (
                  <motion.div 
                    className="p-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button variant="outline" size="sm" className="w-full hover:bg-pink-50">
                      View all {searchResults.length} results
                    </Button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div 
                className="p-4 text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <X className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No vendors found for "{searchTerm}"</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
