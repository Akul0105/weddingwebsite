'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function ForVendorsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      businessName: formData.get('businessName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      category: formData.get('category') as string,
      location: formData.get('location') as string,
      experience: formData.get('experience') as string,
      about: formData.get('about') as string,
      website: formData.get('website') as string,
    };

    try {
      const res = await fetch('/api/vendor-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setStatus((prev) => (prev === 'success' ? 'success' : status));
      if (status !== 'success') {
        setStatus((prev) => (prev === 'success' ? prev : 'idle'));
      }
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute z-20 top-6 left-6">
          <Button variant="ghost" className="bg-white/80 text-gray-900 hover:bg-white" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>
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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        name="firstName"
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
                        name="lastName"
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
                      name="businessName"
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
                      name="email"
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
                      name="phone"
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
                      name="category"
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
                      name="location"
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
                    <select
                      name="experience"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
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
                      name="about"
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
                      name="website"
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
                      disabled={status === 'loading'}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </motion.div>

                  {status === 'success' && (
                    <p className="text-sm text-green-700">
                      Thanks! Your application was submitted successfully.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-600">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
