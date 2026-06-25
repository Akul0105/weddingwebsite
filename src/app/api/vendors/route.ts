import { NextRequest, NextResponse } from 'next/server';
import { VendorSearchResult } from '@/types/vendor';
import { vendors } from '@/lib/data/vendors';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const minRating = parseFloat(searchParams.get('minRating') || '0');

    let filtered = vendors.filter((v) => v.isActive);

    if (category) {
      filtered = filtered.filter((v) => v.category === category);
    }

    if (location) {
      filtered = filtered.filter((v) =>
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((v) => v.rating >= minRating);
    }

    const startIndex = (page - 1) * limit;
    const paginatedVendors = filtered.slice(startIndex, startIndex + limit);

    const result: VendorSearchResult = {
      vendors: paginatedVendors,
      total: filtered.length,
      page,
      limit,
      hasMore: startIndex + limit < filtered.length,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const vendorData = await request.json();

    const slug = vendorData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newVendor = {
      id: (vendors.length + 1).toString(),
      slug,
      ...vendorData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    return NextResponse.json(newVendor, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}
