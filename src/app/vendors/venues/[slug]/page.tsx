'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WeddingDatePicker } from '@/components/ui/date-picker';
import { AvailabilityCalendar } from '@/components/ui/availability-calendar';
import Image from 'next/image';
import { MapPin, Star, Phone, Mail, Globe, Users, Award, Calendar, Clock, Wifi, Car, Utensils } from 'lucide-react';

// Mock data for individual venue - replace with database data later
const venueData = {
  id: 1,
  slug: 'tropical-paradise-resort',
  name: "Tropical Paradise Resort",
  location: "Belle Mare, Mauritius",
  rating: 4.9,
  reviews: 89,
  price: "From Rs 75,000",
  image: "/Venues.jpg",
  description: "Beachfront resort with stunning ocean views and luxury amenities. Perfect for dream destination weddings in Mauritius.",
  capacity: "50-200 guests",
  experience: "15+ years",
  languages: ["English", "French", "Creole"],
  features: ["Beachfront", "Ocean View", "Luxury", "All-inclusive", "Spa", "Pool", "Restaurant"],
  amenities: [
    "Beachfront ceremony location",
    "Indoor/outdoor reception options",
    "Bridal suite with ocean view",
    "Professional catering service",
    "Audio-visual equipment",
    "Wedding coordinator",
    "Parking for 100+ cars",
    "Free WiFi throughout venue"
  ],
  gallery: [
    "/Venues.jpg",
    "/Venues.jpg", 
    "/Venues.jpg",
    "/Venues.jpg",
    "/Venues.jpg",
    "/Venues.jpg"
  ],
  packages: [
    {
      name: "Intimate Package",
      price: "Rs 75,000",
      capacity: "50-80 guests",
      includes: [
        "Beachfront ceremony setup",
        "Indoor reception area",
        "Basic decoration",
        "Standard catering (3 courses)",
        "Wedding coordinator",
        "Bridal suite (2 hours)",
        "Basic audio system"
      ]
    },
    {
      name: "Classic Package", 
      price: "Rs 120,000",
      capacity: "80-150 guests",
      includes: [
        "Beachfront ceremony setup",
        "Large reception hall",
        "Premium decoration",
        "Premium catering (4 courses)",
        "Wedding coordinator",
        "Bridal suite (4 hours)",
        "Professional audio system",
        "Lighting setup",
        "Welcome cocktail"
      ]
    },
    {
      name: "Luxury Package",
      price: "Rs 200,000", 
      capacity: "150-200 guests",
      includes: [
        "Beachfront ceremony setup",
        "Grand reception hall",
        "Luxury decoration",
        "Gourmet catering (5 courses)",
        "Dedicated wedding coordinator",
        "Bridal suite (6 hours)",
        "Professional audio-visual system",
        "Premium lighting setup",
        "Welcome cocktail + canapés",
        "Wedding cake included",
        "Photography locations access"
      ]
    }
  ],
  contact: {
    phone: "+230 5 234 5678",
    email: "events@tropicalparadise.mu",
    website: "www.tropicalparadise.mu",
    address: "Belle Mare Beach, Belle Mare, Mauritius"
  },
  availability: [
    "January 2025 - 3 dates left",
    "February 2025 - 1 date left", 
    "March 2025 - Available",
    "April 2025 - Available",
    "May 2025 - Available"
  ]
};

export default function VenueProfilePage({ params }: { params: { slug: string } }) {
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
          src={venueData.image}
          alt={venueData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {venueData.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            {venueData.description}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" />
              <span className="font-semibold">{venueData.rating}</span>
              <span className="text-gray-300">({venueData.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-gray-300" />
              <span>{venueData.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="text-gray-300" />
              <span>{venueData.capacity}</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-gray-900 hover:bg-gray-200"
            onClick={() => setShowBookingForm(true)}
          >
            Book Venue - {venueData.price}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'packages', label: 'Packages & Pricing' },
              { id: 'amenities', label: 'Amenities' },
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
                  <h2 className="text-2xl font-bold mb-4">About {venueData.name}</h2>
                  <p className="text-gray-700 mb-6">{venueData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Award className="text-pink-500" />
                      <span className="font-medium">Experience:</span>
                      <span>{venueData.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-pink-500" />
                      <span className="font-medium">Capacity:</span>
                      <span>{venueData.capacity}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {venueData.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Languages</h3>
                  <p className="text-gray-700">{venueData.languages.join(', ')}</p>
                </CardContent>
              </Card>

              {/* Availability Calendar */}
              <AvailabilityCalendar
                vendorId={venueData.id.toString()}
                selectedDate={selectedAvailabilityDate}
                onDateSelect={setSelectedAvailabilityDate}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="text-pink-500" />
                      <span>{venueData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-pink-500" />
                      <span>{venueData.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="text-pink-500" />
                      <span>{venueData.contact.website}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-pink-500" />
                      <span className="text-sm">{venueData.contact.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Rating</span>
                      <span className="font-semibold">{venueData.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reviews</span>
                      <span className="font-semibold">{venueData.reviews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity</span>
                      <span className="font-semibold">{venueData.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Starting Price</span>
                      <span className="font-semibold">{venueData.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Venue Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venueData.gallery.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Venue image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Wedding Packages & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {venueData.packages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden ${
                    selectedPackage === index ? 'ring-2 ring-pink-500' : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-pink-600 mb-2">{pkg.price}</div>
                    <div className="text-gray-600 mb-4">{pkg.capacity}</div>
                    <ul className="space-y-2 mb-6">
                      {pkg.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        selectedPackage === index 
                          ? 'bg-pink-600 hover:bg-pink-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      {selectedPackage === index ? 'Selected' : 'Select Package'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedPackage !== null && (
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={() => setShowBookingForm(true)}
                >
                  Book {venueData.packages[selectedPackage].name} - {venueData.packages[selectedPackage].price}
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'amenities' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Venue Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venueData.amenities.map((amenity, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {amenity.includes('WiFi') && <Wifi className="text-pink-600" />}
                      {amenity.includes('Parking') && <Car className="text-pink-600" />}
                      {amenity.includes('catering') && <Utensils className="text-pink-600" />}
                      {!amenity.includes('WiFi') && !amenity.includes('Parking') && !amenity.includes('catering') && 
                        <Award className="text-pink-600" />
                      }
                    </div>
                    <h3 className="font-semibold text-gray-900">{amenity}</h3>
                  </CardContent>
                </Card>
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
                        <span className="text-pink-600 font-semibold">M</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Marie & Pierre</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      "Absolutely stunning venue! The beachfront ceremony was magical and the staff was incredibly professional. 
                      Our guests couldn't stop talking about how beautiful everything was. Worth every penny!"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="text-pink-500" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-gray-600">{venueData.contact.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-pink-500" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-gray-600">{venueData.contact.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="text-pink-500" />
                      <div>
                        <div className="font-medium">Website</div>
                        <div className="text-gray-600">{venueData.contact.website}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-pink-500" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">{venueData.contact.address}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Send Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Tell us about your wedding plans..."
                      ></textarea>
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Send Message
                    </Button>
                  </form>
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
                <h2 className="text-2xl font-bold">Book {venueData.name}</h2>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium mb-2">Expected Guest Count</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Package</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    {venueData.packages.map((pkg, index) => (
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
                    Book Venue Tour
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
