'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AvailabilityManager } from '@/components/admin/AvailabilityManager';
import { Search, Filter, Users, Calendar, Settings } from 'lucide-react';

// Mock vendor data - replace with API data
const vendors = [
  {
    id: '1',
    name: 'Sarah Johnson Photography',
    category: 'Photographers',
    location: 'Port Louis, Mauritius',
    status: 'active',
    availabilityRate: 85
  },
  {
    id: '2',
    name: 'Tropical Paradise Resort',
    category: 'Venues',
    location: 'Belle Mare, Mauritius',
    status: 'active',
    availabilityRate: 72
  },
  {
    id: '3',
    name: 'Sweet Dreams Bakery',
    category: 'Cakes',
    location: 'Curepipe, Mauritius',
    status: 'active',
    availabilityRate: 90
  },
  {
    id: '4',
    name: 'Island Beats DJ',
    category: 'DJs',
    location: 'Grand Baie, Mauritius',
    status: 'active',
    availabilityRate: 78
  },
  {
    id: '5',
    name: 'Elegant Events',
    category: 'Decorators',
    location: 'Port Louis, Mauritius',
    status: 'active',
    availabilityRate: 65
  },
  {
    id: '6',
    name: 'Bridal Beauty Studio',
    category: 'Makeup Artists',
    location: 'Flic en Flac, Mauritius',
    status: 'active',
    availabilityRate: 88
  }
];

export default function AdminAvailabilityPage() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedVendorData = vendors.find(v => v.id === selectedVendor);

  const handleSaveAvailability = (availability: any) => {
    // Save to API
    console.log('Saving availability for vendor:', selectedVendor, availability);
    // Here you would make an API call to save the availability
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Vendor Availability Management</h1>
          <p className="text-gray-600">Manage availability calendars for all vendors</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vendor List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-pink-600" />
                  <h2 className="text-xl font-semibold">Vendors</h2>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Photographers">Photographers</option>
                    <option value="Venues">Venues</option>
                    <option value="Cakes">Cakes</option>
                    <option value="DJs">DJs</option>
                    <option value="Decorators">Decorators</option>
                    <option value="Makeup Artists">Makeup Artists</option>
                  </select>
                </div>

                {/* Vendor List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredVendors.map((vendor) => (
                    <motion.div
                      key={vendor.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all ${
                          selectedVendor === vendor.id 
                            ? 'ring-2 ring-pink-500 bg-pink-50' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedVendor(vendor.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-sm">{vendor.name}</h3>
                              <p className="text-xs text-gray-600">{vendor.category}</p>
                              <p className="text-xs text-gray-500">{vendor.location}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-pink-600">
                                {vendor.availabilityRate}%
                              </div>
                              <div className="text-xs text-gray-500">Available</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability Manager */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {selectedVendorData ? (
              <AvailabilityManager
                vendorId={selectedVendorData.id}
                vendorName={selectedVendorData.name}
                onSave={handleSaveAvailability}
              />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Select a Vendor
                  </h3>
                  <p className="text-gray-500">
                    Choose a vendor from the list to manage their availability calendar
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Bulk Update Availability
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Export Availability Data
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Send Availability Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
