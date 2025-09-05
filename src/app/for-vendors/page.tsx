'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WeddingDatePicker } from '@/components/ui/date-picker';
import { 
  Users, 
  Star, 
  TrendingUp, 
  Shield, 
  Calendar, 
  MessageCircle, 
  CheckCircle,
  ArrowRight,
  Heart,
  Camera,
  Cake,
  Music,
  Palette,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

const benefits = [
  {
    icon: Users,
    title: "Reach More Couples",
    description: "Connect with thousands of couples planning their perfect wedding day."
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description: "Showcase your work and build trust through reviews and ratings."
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Increase bookings and expand your client base with our platform."
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid safely and on time with our secure payment system."
  },
  {
    icon: Calendar,
    title: "Easy Booking Management",
    description: "Manage your bookings, availability, and client communications in one place."
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Chat directly with couples and answer their questions instantly."
  }
];

const vendorCategories = [
  { name: "Photographers", icon: Camera, count: "50+", color: "bg-blue-500" },
  { name: "Venues", icon: Heart, count: "30+", color: "bg-red-500" },
  { name: "Cakes", icon: Cake, count: "25+", color: "bg-yellow-500" },
  { name: "DJs", icon: Music, count: "40+", color: "bg-purple-500" },
  { name: "Decorators", icon: Palette, count: "35+", color: "bg-green-500" },
  { name: "Makeup Artists", icon: Sparkles, count: "45+", color: "bg-pink-500" }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Sarah Johnson Photography",
    rating: 5,
    text: "Since joining Vivah.mu, my bookings have increased by 300%. The platform makes it so easy to connect with couples."
  },
  {
    name: "Mike Chen",
    business: "Elegant Events",
    rating: 5,
    text: "The best decision I made for my business. The quality of leads is amazing and the platform is so professional."
  },
  {
    name: "Lisa Rodriguez",
    business: "Sweet Dreams Bakery",
    rating: 5,
    text: "I love how easy it is to showcase my work and communicate with couples. Highly recommend!"
  }
];

export default function ForVendorsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src="/Venues.jpg"
          alt="For Vendors"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Join Our Platform
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
              Connect with thousands of couples and grow your wedding business with Mauritius' leading wedding platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Couples" },
              { number: "200+", label: "Active Vendors" },
              { number: "4.9", label: "Average Rating" },
              { number: "95%", label: "Booking Success" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Vivah.mu?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to grow your wedding business and connect with the perfect couples.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Categories */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Vendor Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We welcome vendors from all wedding categories to join our growing community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vendorCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} vendors</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Vendors Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from successful vendors who have grown their business with Vivah.mu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.business}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 bg-gradient-to-r from-pink-600 to-pink-700">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Platform
              </h2>
              <p className="text-pink-100">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your business name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="+230 5 123 4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Category *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select your category</option>
                      <option value="photographer">Photographer</option>
                      <option value="venue">Venue</option>
                      <option value="cake">Cake Designer</option>
                      <option value="dj">DJ/Music</option>
                      <option value="decorator">Decorator</option>
                      <option value="makeup">Makeup Artist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="City, Mauritius"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                      <option value="">Select experience level</option>
                      <option value="beginner">Just starting out (0-1 years)</option>
                      <option value="intermediate">Some experience (1-3 years)</option>
                      <option value="experienced">Experienced (3-5 years)</option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your business *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Describe your services, specialties, and what makes you unique..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/Website (Optional)
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-pink-600 hover:underline">Terms of Service</a> and <a href="#" className="text-pink-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit Application
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
