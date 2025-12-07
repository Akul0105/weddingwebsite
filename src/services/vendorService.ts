import { Vendor } from '@/types/vendor';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class VendorService {
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
}
