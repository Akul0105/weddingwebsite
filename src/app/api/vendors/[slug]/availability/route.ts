import { NextRequest, NextResponse } from 'next/server';

// Mock availability data - replace with database calls
const mockAvailability = new Map<string, {
  availableDates: string[];
  unavailableDates: string[];
  partiallyAvailableDates: string[];
}>();

// Initialize with some mock data
mockAvailability.set('1', {
  availableDates: ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'],
  unavailableDates: ['2024-01-20', '2024-01-21', '2024-01-22'],
  partiallyAvailableDates: ['2024-01-23', '2024-01-24']
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendorId = slug;
    const availability = mockAvailability.get(vendorId) || {
      availableDates: [],
      unavailableDates: [],
      partiallyAvailableDates: []
    };

    return NextResponse.json({
      success: true,
      data: availability
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendorId = slug;
    const body = await request.json();
    
    const { availableDates, unavailableDates, partiallyAvailableDates } = body;
    
    // Validate the data
    if (!Array.isArray(availableDates) || !Array.isArray(unavailableDates) || !Array.isArray(partiallyAvailableDates)) {
      return NextResponse.json(
        { success: false, error: 'Invalid availability data format' },
        { status: 400 }
      );
    }

    // Store the availability data (replace with database update)
    mockAvailability.set(vendorId, {
      availableDates,
      unavailableDates,
      partiallyAvailableDates
    });

    return NextResponse.json({
      success: true,
      message: 'Availability updated successfully'
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}
