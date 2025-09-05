import { NextRequest, NextResponse } from 'next/server';
import { Vendor } from '@/types/vendor';

// This would be replaced with actual database calls
// For now, we'll import the mock data from the main vendors route
// In a real app, you'd have a shared database service

// Mock database - in real app, this would be a database query
const getVendorBySlug = async (slug: string): Promise<Vendor | null> => {
  // This is a simplified version - in real app, you'd query your database
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vendors`);
  const data = await response.json();
  return data.vendors.find((vendor: Vendor) => vendor.slug === slug) || null;
};

// GET /api/vendors/[slug] - Get a specific vendor by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendor = await getVendorBySlug(slug);

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(vendor);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    );
  }
}

// PUT /api/vendors/[slug] - Update a specific vendor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendorData = await request.json();
    
    // In a real app, you'd update the database here
    // For now, we'll just return the updated data
    
    const updatedVendor: Vendor = {
      ...vendorData,
      slug: slug,
      updatedAt: new Date()
    };

    return NextResponse.json(updatedVendor);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
}

// DELETE /api/vendors/[slug] - Delete a specific vendor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // In a real app, you'd delete from the database here
    // For now, we'll just return success
    
    return NextResponse.json(
      { message: 'Vendor deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
}
