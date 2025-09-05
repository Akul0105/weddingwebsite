export interface Vendor {
  id: string;
  slug: string;
  name: string;
  category: VendorCategory;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  description: string;
  specialties: string[];
  experience: string;
  languages: string[];
  portfolio: string[];
  packages: VendorPackage[];
  contact: VendorContact;
  availability: VendorAvailability;
  features?: string[];
  amenities?: string[];
  equipment?: string;
  gallery?: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type VendorCategory = 
  | 'Photographers'
  | 'Venues'
  | 'Cakes'
  | 'DJs'
  | 'Decorators'
  | 'Makeup Artists';

export interface VendorPackage {
  id: string;
  name: string;
  price: string;
  duration?: string;
  includes: string[];
  isPopular?: boolean;
}

export interface VendorContact {
  phone: string;
  email: string;
  website?: string;
  address: string;
}

export interface VendorAvailability {
  availableDates: Date[];
  unavailableDates: Date[];
  partiallyAvailableDates: Date[];
}

export interface VendorSearchFilters {
  category?: VendorCategory;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  specialties?: string[];
}

export interface VendorSearchResult {
  vendors: Vendor[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
