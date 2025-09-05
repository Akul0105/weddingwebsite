import { Vendor, VendorSearchFilters, VendorSearchResult } from '@/types/vendor';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class VendorService {
  // Get all vendors with optional filtering
  static async getVendors(filters?: VendorSearchFilters): Promise<VendorSearchResult> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.category) params.append('category', filters.category);
      if (filters?.location) params.append('location', filters.location);
      if (filters?.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters?.rating) params.append('minRating', filters.rating.toString());
      if (filters?.specialties) {
        filters.specialties.forEach(specialty => params.append('specialties', specialty));
      }

      const response = await fetch(`${API_BASE_URL}/api/vendors?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  }

  // Get a specific vendor by slug
  static async getVendorBySlug(slug: string): Promise<Vendor | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${slug}`);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendor');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching vendor:', error);
      throw error;
    }
  }

  // Search vendors by query
  static async searchVendors(query: string): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors?search=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search vendors');
      }

      const result = await response.json();
      return result.vendors;
    } catch (error) {
      console.error('Error searching vendors:', error);
      throw error;
    }
  }

  // Get vendors by category
  static async getVendorsByCategory(category: string): Promise<Vendor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors?category=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vendors by category');
      }

      const result = await response.json();
      return result.vendors;
    } catch (error) {
      console.error('Error fetching vendors by category:', error);
      throw error;
    }
  }

  // Create a new vendor
  static async createVendor(vendorData: Omit<Vendor, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Vendor> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Failed to create vendor');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  }

  // Update a vendor
  static async updateVendor(slug: string, vendorData: Partial<Vendor>): Promise<Vendor> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Failed to update vendor');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  }

  // Delete a vendor
  static async deleteVendor(slug: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vendor');
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  }

  // Get vendor availability
  static async getVendorAvailability(slug: string): Promise<Vendor['availability']> {
    try {
      const vendor = await this.getVendorBySlug(slug);
      return vendor?.availability || { availableDates: [], unavailableDates: [], partiallyAvailableDates: [] };
    } catch (error) {
      console.error('Error fetching vendor availability:', error);
      throw error;
    }
  }

  // Update vendor availability
  static async updateVendorAvailability(slug: string, availability: Vendor['availability']): Promise<void> {
    try {
      await this.updateVendor(slug, { availability });
    } catch (error) {
      console.error('Error updating vendor availability:', error);
      throw error;
    }
  }
}
