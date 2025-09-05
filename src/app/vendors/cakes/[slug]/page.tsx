'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeddingDatePicker } from '@/components/ui/date-picker';
import { AvailabilityCalendar } from '@/components/ui/availability-calendar';
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, Clock } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

// Mock data - replace with API data
const cakeVendors = {
  'sweet-dreams-bakery': {
    id: 1,
    name: 'Sweet Dreams Bakery',
    category: 'Cakes',
    location: 'Curepipe, Mauritius',
    rating: 4.8,
    reviews: 156,
    price: 'From Rs 8,000',
    image: '/Cake.jpg',
    description: 'Creating beautiful and delicious wedding cakes that make your special day even sweeter.',
    specialties: ['Wedding Cakes', 'Custom Designs', 'Sugar Flowers'],
    experience: '8 years',
    languages: ['English', 'French', 'Creole'],
    portfolio: [
      '/Cake.jpg',
      '/Cake.jpg',
      '/Cake.jpg'
    ],
    packages: [
      {
        name: 'Classic Package',
        price: 'Rs 8,000',
        includes: ['2-tier cake', 'Basic decoration', 'Delivery']
      },
      {
        name: 'Premium Package',
        price: 'Rs 15,000',
        includes: ['3-tier cake', 'Custom design', 'Sugar flowers', 'Delivery & setup']
      }
    ],
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    }
  }
};

export default function CakeVendorPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [weddingDate, setWeddingDate] = useState<Date | undefined>();
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] = useState<Date | undefined>();

  const cakeData = cakeVendors[params.slug as keyof typeof cakeVendors];

  if (!cakeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cake Vendor Not Found</h1>
          <p className="text-gray-600">The cake vendor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-white mb-4"
              >
                {cakeData.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-4 text-white mb-4"
              >
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">{cakeData.rating}</span>
                  <span className="text-pink-200">({cakeData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{cakeData.location}</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <Image
                src={cakeData.image}
                alt={cakeData.name}
                width={500}
                height={300}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <Card className="shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">About</h3>
                  <p className="text-gray-700">{cakeData.description}</p>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {cakeData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability Calendar */}
              <AvailabilityCalendar
                vendorId={cakeData.id.toString()}
                selectedDate={selectedAvailabilityDate}
                onDateSelect={setSelectedAvailabilityDate}
              />

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-pink-600" />
                      <span className="text-sm">{cakeData.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-pink-600" />
                      <span className="text-sm">{cakeData.reviews} reviews</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-pink-600" />
                      <span className="text-sm">Available for consultation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Get Quote</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Wedding Date</label>
                      <WeddingDatePicker
                        date={weddingDate}
                        onDateChange={setWeddingDate}
                        placeholder="Select your wedding date"
                        minDate={new Date()}
                        maxDate={new Date(new Date().getFullYear() + 2, 11, 31)}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                      Request Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakeData.portfolio.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <Image
                      src={image}
                      alt={`Cake ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact {cakeData.name}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wedding Date</label>
                      <WeddingDatePicker
                        date={weddingDate}
                        onDateChange={setWeddingDate}
                        placeholder="Select your wedding date"
                        minDate={new Date()}
                        maxDate={new Date(new Date().getFullYear() + 2, 11, 31)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Tell us about your dream cake..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-pink-600" />
                      <span>{cakeData.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-pink-600" />
                      <span>{cakeData.rating} rating ({cakeData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-pink-600" />
                      <span>{cakeData.experience} experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
