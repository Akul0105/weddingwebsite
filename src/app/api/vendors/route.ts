import { NextRequest, NextResponse } from 'next/server';
import { Vendor, VendorSearchFilters, VendorSearchResult } from '@/types/vendor';

// Mock database - replace with actual database calls
const mockVendors: Vendor[] = [
  // Photographers
  {
    id: '1',
    slug: 'sarah-johnson-photography',
    name: 'Sarah Johnson Photography',
    category: 'Photographers',
    location: 'Port Louis, Mauritius',
    rating: 4.9,
    reviews: 127,
    price: 'From Rs 25,000',
    image: '/Photographer.jpg',
    description: 'Specializing in elegant wedding photography with a natural, candid style. Sarah captures the authentic moments that make your wedding day truly special.',
    specialties: ['Wedding Photography', 'Engagement Sessions', 'Portrait Photography', 'Destination Weddings'],
    experience: '8+ years',
    languages: ['English', 'French', 'Creole'],
    equipment: 'Canon EOS R5, Sony A7R IV, Professional Lighting',
    portfolio: ['/Photographer.jpg', '/Photographer.jpg', '/Photographer.jpg'],
    packages: [
      {
        id: '1',
        name: 'Basic Package',
        price: 'Rs 25,000',
        duration: '6 hours',
        includes: ['Full day coverage', '200+ edited photos', 'Online gallery', 'USB with photos', 'Basic editing']
      }
    ],
    contact: {
      phone: '+230 5 123 4567',
      email: 'sarah@sarahjohnsonphoto.mu',
      website: 'www.sarahjohnsonphoto.mu',
      address: '123 Victoria Street, Port Louis, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  {
    id: '2',
    slug: 'mauritius-moments',
    name: 'Mauritius Moments',
    category: 'Photographers',
    location: 'Grand Baie, Mauritius',
    rating: 4.8,
    reviews: 89,
    price: 'From Rs 20,000',
    image: '/Photographer.jpg',
    description: 'Capturing beautiful moments with a creative and artistic approach. Specializing in destination weddings and cultural celebrations.',
    specialties: ['Wedding Photography', 'Destination Weddings', 'Cultural Events', 'Portrait Photography'],
    experience: '6+ years',
    languages: ['English', 'French', 'Creole'],
    equipment: 'Nikon D850, Canon EOS R6, Professional Lighting',
    portfolio: ['/Photographer.jpg', '/Photographer.jpg', '/Photographer.jpg'],
    packages: [
      {
        id: '2',
        name: 'Essential Package',
        price: 'Rs 20,000',
        duration: '6 hours',
        includes: ['Full day coverage', '150+ edited photos', 'Online gallery', 'USB with photos', 'Basic editing']
      }
    ],
    contact: {
      phone: '+230 5 234 5678',
      email: 'info@mauritiusmoments.mu',
      website: 'www.mauritiusmoments.mu',
      address: '456 Coastal Road, Grand Baie, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  // Venues
  {
    id: '3',
    slug: 'paradise-cove-hotel',
    name: 'Paradise Cove Hotel',
    category: 'Venues',
    location: 'Anse la Raie, Mauritius',
    rating: 4.7,
    reviews: 156,
    price: 'From Rs 50,000',
    image: '/Venues.jpg',
    description: 'Stunning beachfront venue with panoramic ocean views.',
    specialties: ['Beach', 'Luxury', 'Outdoor'],
    experience: '15+ years',
    languages: ['English', 'French', 'Creole'],
    features: ['Beachfront', 'Ocean View', 'Luxury', 'All-inclusive', 'Spa', 'Pool', 'Restaurant'],
    amenities: ['Beachfront ceremony location', 'Indoor/outdoor reception options', 'Bridal suite with ocean view'],
    portfolio: ['/Venues.jpg', '/Venues.jpg', '/Venues.jpg'],
    packages: [
      {
        id: '3',
        name: 'Beach Package',
        price: 'Rs 50,000',
        duration: '6 hours',
        includes: ['Beachfront ceremony setup', 'Grand reception hall', 'Luxury decoration']
      }
    ],
    contact: {
      phone: '+230 5 234 5678',
      email: 'events@tropicalparadise.mu',
      website: 'www.tropicalparadise.mu',
      address: 'Belle Mare Beach, Belle Mare, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  {
    id: '4',
    slug: 'chateau-de-labourdonnais',
    name: 'Château de Labourdonnais',
    category: 'Venues',
    location: 'Mapou, Mauritius',
    rating: 4.9,
    reviews: 203,
    price: 'From Rs 40,000',
    image: '/Venues.jpg',
    description: 'Historic colonial mansion with beautiful gardens.',
    specialties: ['Historic', 'Garden', 'Indoor'],
    experience: '20+ years',
    languages: ['English', 'French', 'Creole'],
    features: ['Historic', 'Garden', 'Indoor', 'Outdoor', 'Elegant', 'Intimate'],
    amenities: ['Historic mansion ceremony location', 'Beautiful garden reception options', 'Elegant indoor dining hall'],
    portfolio: ['/Venues.jpg', '/Venues.jpg', '/Venues.jpg'],
    packages: [
      {
        id: '4',
        name: 'Garden Package',
        price: 'Rs 40,000',
        duration: '6 hours',
        includes: ['Garden ceremony setup', 'Outdoor reception area', 'Basic decoration']
      }
    ],
    contact: {
      phone: '+230 5 345 6789',
      email: 'events@chateaulabourdonnais.mu',
      website: 'www.chateaulabourdonnais.mu',
      address: 'Château de Labourdonnais, Mapou, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  // Cakes
  {
    id: '5',
    slug: 'sweet-dreams-bakery',
    name: 'Sweet Dreams Bakery',
    category: 'Cakes',
    location: 'Curepipe, Mauritius',
    rating: 4.8,
    reviews: 95,
    price: 'From Rs 8,000',
    image: '/Cake.jpg',
    description: 'Artisanal wedding cakes with unique designs and flavors.',
    specialties: ['Custom', 'Artisanal', 'Traditional'],
    experience: '8 years',
    languages: ['English', 'French', 'Creole'],
    portfolio: ['/Cake.jpg', '/Cake.jpg', '/Cake.jpg'],
    packages: [
      {
        id: '5',
        name: 'Classic Package',
        price: 'Rs 8,000',
        includes: ['2-tier cake', 'Basic decoration', 'Delivery']
      }
    ],
    contact: {
      phone: '+230 5 456 7890',
      email: 'orders@sweetdreamsbakery.mu',
      website: 'www.sweetdreamsbakery.mu',
      address: '789 Main Street, Curepipe, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  // DJs
  {
    id: '6',
    slug: 'island-beats-dj',
    name: 'Island Beats DJ',
    category: 'DJs',
    location: 'Grand Baie, Mauritius',
    rating: 4.6,
    reviews: 78,
    price: 'From Rs 15,000',
    image: '/DJ.jpg',
    description: 'Professional DJ services with modern sound equipment.',
    specialties: ['Wedding', 'Party', 'Sound System'],
    experience: '5 years',
    languages: ['English', 'French', 'Creole'],
    portfolio: ['/DJ.jpg', '/DJ.jpg', '/DJ.jpg'],
    packages: [
      {
        id: '6',
        name: 'Basic Package',
        price: 'Rs 15,000',
        includes: ['4-hour DJ service', 'Basic sound system', 'Music library']
      }
    ],
    contact: {
      phone: '+230 5 567 8901',
      email: 'bookings@islandbeats.mu',
      website: 'www.islandbeats.mu',
      address: '321 Beach Road, Grand Baie, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  // Decorators
  {
    id: '7',
    slug: 'elegant-events',
    name: 'Elegant Events',
    category: 'Decorators',
    location: 'Port Louis, Mauritius',
    rating: 4.7,
    reviews: 112,
    price: 'From Rs 20,000',
    image: '/decorations.jpg',
    description: 'Transform your venue into a magical wonderland.',
    specialties: ['Floral', 'Lighting', 'Themed'],
    experience: '6 years',
    languages: ['English', 'French', 'Creole'],
    portfolio: ['/decorations.jpg', '/decorations.jpg', '/decorations.jpg'],
    packages: [
      {
        id: '7',
        name: 'Basic Package',
        price: 'Rs 20,000',
        includes: ['Basic floral arrangements', 'Table decorations', 'Setup']
      }
    ],
    contact: {
      phone: '+230 5 678 9012',
      email: 'info@elegantevents.mu',
      website: 'www.elegantevents.mu',
      address: '654 Event Street, Port Louis, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  },
  // Makeup Artists
  {
    id: '8',
    slug: 'bridal-beauty-studio',
    name: 'Bridal Beauty Studio',
    category: 'Makeup Artists',
    location: 'Flic en Flac, Mauritius',
    rating: 4.9,
    reviews: 145,
    price: 'From Rs 12,000',
    image: '/makeup.jpg',
    description: 'Professional bridal makeup and hair styling services.',
    specialties: ['Bridal', 'Hair', 'Makeup'],
    experience: '7 years',
    languages: ['English', 'French', 'Creole'],
    portfolio: ['/makeup.jpg', '/makeup.jpg', '/makeup.jpg'],
    packages: [
      {
        id: '8',
        name: 'Bridal Package',
        price: 'Rs 12,000',
        includes: ['Bridal makeup', 'Hair styling', 'Trial session']
      }
    ],
    contact: {
      phone: '+230 5 789 0123',
      email: 'appointments@bridalbeauty.mu',
      website: 'www.bridalbeauty.mu',
      address: '987 Beauty Lane, Flic en Flac, Mauritius'
    },
    availability: {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isActive: true
  }
];

// GET /api/vendors - Get all vendors with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const minRating = parseFloat(searchParams.get('minRating') || '0');

    let filteredVendors = mockVendors.filter(vendor => vendor.isActive);

    // Apply filters
    if (category) {
      filteredVendors = filteredVendors.filter(vendor => vendor.category === category);
    }

    if (location) {
      filteredVendors = filteredVendors.filter(vendor => 
        vendor.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredVendors = filteredVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchLower) ||
        vendor.category.toLowerCase().includes(searchLower) ||
        vendor.location.toLowerCase().includes(searchLower) ||
        vendor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower))
      );
    }

    if (minRating > 0) {
      filteredVendors = filteredVendors.filter(vendor => vendor.rating >= minRating);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVendors = filteredVendors.slice(startIndex, endIndex);

    const result: VendorSearchResult = {
      vendors: paginatedVendors,
      total: filteredVendors.length,
      page,
      limit,
      hasMore: endIndex < filteredVendors.length
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}

// POST /api/vendors - Create a new vendor
export async function POST(request: NextRequest) {
  try {
    const vendorData = await request.json();
    
    // Generate slug from name
    const slug = vendorData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newVendor: Vendor = {
      id: (mockVendors.length + 1).toString(),
      slug,
      ...vendorData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    mockVendors.push(newVendor);

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vendor' },
      { status: 500 }
    );
  }
}
