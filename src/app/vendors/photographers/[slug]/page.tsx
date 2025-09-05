'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WeddingDatePicker } from '@/components/ui/date-picker';
import { AvailabilityCalendar } from '@/components/ui/availability-calendar';
import Image from 'next/image';
import { Calendar, MapPin, Star, Phone, Mail, Globe, Clock, Users, Award } from 'lucide-react';

// Mock data for individual photographer - replace with database data later
const photographerData = {
  id: 1,
  slug: 'sarah-johnson-photography',
  name: "Sarah Johnson Photography",
  location: "Port Louis, Mauritius",
  rating: 4.9,
  reviews: 127,
  price: "From Rs 25,000",
  image: "/Photographer.jpg",
  description: "Specializing in elegant wedding photography with a natural, candid style. Sarah captures the authentic moments that make your wedding day truly special.",
  specialties: ["Wedding Photography", "Engagement Sessions", "Portrait Photography", "Destination Weddings"],
  experience: "8+ years",
  languages: ["English", "French", "Creole"],
  equipment: "Canon EOS R5, Sony A7R IV, Professional Lighting",
  portfolio: [
    "/Photographer.jpg",
    "/Photographer.jpg", 
    "/Photographer.jpg",
    "/Photographer.jpg",
    "/Photographer.jpg",
    "/Photographer.jpg"
  ],
  packages: [
    {
      name: "Basic Package",
      price: "Rs 25,000",
      duration: "6 hours",
      includes: [
        "Full day coverage",
        "200+ edited photos",
        "Online gallery",
        "USB with photos",
        "Basic editing"
      ]
    },
    {
      name: "Premium Package", 
      price: "Rs 35,000",
      duration: "8 hours",
      includes: [
        "Full day coverage",
        "300+ edited photos",
        "Online gallery",
        "USB with photos",
        "Advanced editing",
        "Engagement session",
        "Wedding album (20 pages)"
      ]
    },
    {
      name: "Luxury Package",
      price: "Rs 50,000", 
      duration: "10 hours",
      includes: [
        "Full day coverage",
        "400+ edited photos",
        "Online gallery",
        "USB with photos",
        "Premium editing",
        "Engagement session",
        "Wedding album (30 pages)",
        "Second photographer",
        "Drone coverage"
      ]
    }
  ],
  contact: {
    phone: "+230 5 123 4567",
    email: "sarah@sarahjohnsonphoto.mu",
    website: "www.sarahjohnsonphoto.mu",
    address: "123 Victoria Street, Port Louis, Mauritius"
  },
  availability: [
    "January 2025 - Available",
    "February 2025 - Available", 
    "March 2025 - 2 dates left",
    "April 2025 - Available",
    "May 2025 - Available"
  ]
};

export default function PhotographerProfilePage({ params }: { params: { slug: string } }) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [weddingDate, setWeddingDate] = useState<Date | undefined>();
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] = useState<Date | undefined>();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={photographerData.image}
          alt={photographerData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {photographerData.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            {photographerData.description}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" />
              <span className="font-semibold">{photographerData.rating}</span>
              <span className="text-gray-300">({photographerData.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-gray-300" />
              <span>{photographerData.location}</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-gray-900 hover:bg-gray-200"
            onClick={() => setShowBookingForm(true)}
          >
            Book Now - {photographerData.price}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
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
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {photographerData.name}</h2>
                  <p className="text-gray-700 mb-6">{photographerData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Award className="text-pink-500" />
                      <span className="font-medium">Experience:</span>
                      <span>{photographerData.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-pink-500" />
                      <span className="font-medium">Languages:</span>
                      <span>{photographerData.languages.join(', ')}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {photographerData.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Equipment</h3>
                  <p className="text-gray-700">{photographerData.equipment}</p>
                </CardContent>
              </Card>

              {/* Availability Calendar */}
              <AvailabilityCalendar
                vendorId={photographerData.id.toString()}
                selectedDate={selectedAvailabilityDate}
                onDateSelect={setSelectedAvailabilityDate}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Rating</span>
                      <span className="font-semibold">{photographerData.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reviews</span>
                      <span className="font-semibold">{photographerData.reviews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience</span>
                      <span className="font-semibold">{photographerData.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Starting Price</span>
                      <span className="font-semibold">{photographerData.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographerData.portfolio.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Portfolio image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {/* Mock reviews - replace with real data later */}
              {[1, 2, 3].map((review) => (
                <Card key={review}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">S</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Sarah & Michael</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      "Sarah was absolutely amazing! She captured every special moment of our wedding day. 
                      Her attention to detail and creative eye made our photos absolutely stunning. 
                      Highly recommend!"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact {photographerData.name}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="+230 5 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wedding Date</label>
                      <WeddingDatePicker
                        date={weddingDate}
                        onDateChange={setWeddingDate}
                        placeholder="Select your wedding date"
                        minDate={new Date()}
                        maxDate={new Date(new Date().getFullYear() + 2, 11, 31)} // 2 years from now
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Tell us about your wedding plans and what you're looking for..."
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
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">★</span>
                      </div>
                      <div>
                        <div className="font-medium">Rating</div>
                        <div className="text-gray-600">{photographerData.rating}/5 ({photographerData.reviews} reviews)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">📍</span>
                      </div>
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-gray-600">{photographerData.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">💰</span>
                      </div>
                      <div>
                        <div className="font-medium">Starting Price</div>
                        <div className="text-gray-600">{photographerData.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">⏱️</span>
                      </div>
                      <div>
                        <div className="font-medium">Experience</div>
                        <div className="text-gray-600">{photographerData.experience}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Book {photographerData.name}</h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wedding Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Package</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    {photographerData.packages.map((pkg, index) => (
                      <option key={index} value={index}>
                        {pkg.name} - {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Requirements</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Any special requests or requirements..."
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Options</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" id="bank-transfer" />
                      <label htmlFor="bank-transfer">Bank Transfer (MCB/SBM)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" id="cash" />
                      <label htmlFor="cash">Cash Payment</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" id="mobile-money" />
                      <label htmlFor="mobile-money">Mobile Money (Juice/MyT)</label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
                    Book Consultation
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
