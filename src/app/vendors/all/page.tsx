'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchBar } from '@/components/SearchBar';
import { vendors, getVendorLink } from '@/lib/data/vendors';
import { VendorCategory } from '@/types/vendor';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, List } from 'lucide-react';

const CATEGORIES: ('All' | VendorCategory)[] = [
  'All',
  'Photographers',
  'Venues',
  'Cakes',
  'DJs',
  'Decorators',
  'Makeup Artists',
];

function AllVendorsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<'All' | VendorCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl as VendorCategory)) {
      setSelectedCategory(categoryFromUrl as VendorCategory);
    }
  }, [categoryFromUrl]);

  const filteredVendors = vendors.filter((vendor) => {
    if (!vendor.isActive) return false;
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image src="/Venues.jpg" alt="All Wedding Vendors" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Wedding Vendors</h1>
          <p className="text-lg md:text-xl max-w-2xl">Discover all our trusted wedding vendors in one place</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-pink-600 hover:bg-pink-700' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-pink-600 hover:bg-pink-700' : ''}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-pink-600 hover:bg-pink-700' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
      </div>

      {/* Vendor Grid / List */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {viewMode === 'grid' ? (
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
                      {vendor.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                          {s}
                        </span>
                      ))}
                      {vendor.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{vendor.specialties.length - 2}
                        </span>
                      )}
                    </div>
                    <Button className="w-full" size="sm" asChild>
                      <Link href={getVendorLink(vendor)}>View Details</Link>
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
                          {vendor.specialties.map((s) => (
                            <span key={s} className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button asChild>
                            <Link href={getVendorLink(vendor)}>View Details</Link>
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
                  setSelectedCategory('All');
                  setSearchTerm('');
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

export default function AllVendorsPage() {
  return (
    <Suspense>
      <AllVendorsContent />
    </Suspense>
  );
}
