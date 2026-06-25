import { NextRequest, NextResponse } from 'next/server';
import { getVendorBySlug } from '@/lib/data/vendors';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendor = getVendorBySlug(slug);

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch vendor' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendorData = await request.json();

    const updatedVendor = {
      ...vendorData,
      slug,
      updatedAt: new Date(),
    };

    return NextResponse.json(updatedVendor);
  } catch {
    return NextResponse.json({ error: 'Failed to update vendor' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendor = getVendorBySlug(slug);

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete vendor' }, { status: 500 });
  }
}
