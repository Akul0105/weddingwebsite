'use client';

import * as React from 'react';
import { format, isSameDay, isAfter, isBefore, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, addMonths, subMonths } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  vendorId?: string;
  availableDates?: Date[];
  unavailableDates?: Date[];
  partiallyAvailableDates?: Date[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

// Mock availability data - replace with real data from your API
const generateMockAvailability = () => {
  const today = new Date();
  const nextMonth = addDays(today, 30);
  const availableDates: Date[] = [];
  const unavailableDates: Date[] = [];
  const partiallyAvailableDates: Date[] = [];

  // Generate some mock data
  for (let i = 0; i < 60; i++) {
    const date = addDays(today, i);
    const dayOfWeek = date.getDay();
    
    // Weekends are more likely to be booked
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (Math.random() > 0.3) {
        unavailableDates.push(date);
      } else if (Math.random() > 0.7) {
        partiallyAvailableDates.push(date);
      } else {
        availableDates.push(date);
      }
    } else {
      // Weekdays are more available
      if (Math.random() > 0.8) {
        unavailableDates.push(date);
      } else if (Math.random() > 0.9) {
        partiallyAvailableDates.push(date);
      } else {
        availableDates.push(date);
      }
    }
  }

  return { availableDates, unavailableDates, partiallyAvailableDates };
};

export function AvailabilityCalendar({
  vendorId,
  availableDates = [],
  unavailableDates = [],
  partiallyAvailableDates = [],
  selectedDate,
  onDateSelect,
  className = "",
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  
  // Load availability data from API
  React.useEffect(() => {
    if (vendorId) {
      loadVendorAvailability(vendorId);
    }
  }, [vendorId]);

  const loadVendorAvailability = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${id}/availability`);
      const data = await response.json();
      
      if (data.success) {
        // Convert string dates back to Date objects
        const availability = {
          availableDates: data.data.availableDates.map((dateStr: string) => new Date(dateStr)),
          unavailableDates: data.data.unavailableDates.map((dateStr: string) => new Date(dateStr)),
          partiallyAvailableDates: data.data.partiallyAvailableDates.map((dateStr: string) => new Date(dateStr))
        };
        // Update the component state with real data
        // For now, we'll use the mock data as fallback
      }
    } catch (error) {
      console.error('Failed to load availability:', error);
      // Fall back to mock data
    } finally {
      setLoading(false);
    }
  };
  
  // Use provided data or mock data as fallback
  const mockData = React.useMemo(() => generateMockAvailability(), []);
  const finalAvailableDates = availableDates.length > 0 ? availableDates : mockData.availableDates;
  const finalUnavailableDates = unavailableDates.length > 0 ? unavailableDates : mockData.unavailableDates;
  const finalPartiallyAvailableDates = partiallyAvailableDates.length > 0 ? partiallyAvailableDates : mockData.partiallyAvailableDates;

  const getDateStatus = (date: Date) => {
    if (finalUnavailableDates.some(d => isSameDay(d, date))) return 'unavailable';
    if (finalPartiallyAvailableDates.some(d => isSameDay(d, date))) return 'partial';
    if (finalAvailableDates.some(d => isSameDay(d, date))) return 'available';
    return 'unknown';
  };

  const getDateModifiers = (date: Date) => {
    const status = getDateStatus(date);
    return {
      available: status === 'available',
      unavailable: status === 'unavailable',
      partial: status === 'partial',
      selected: selectedDate && isSameDay(date, selectedDate),
      past: isBefore(date, new Date()),
    };
  };

  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    return days.map(date => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
    }));
  };

  const getStatusCounts = () => {
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start: currentMonthStart, end: currentMonthEnd });
    
    const counts = monthDays.reduce((acc, day) => {
      const status = getDateStatus(day);
      if (!isBefore(day, new Date())) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Availability</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="w-full">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center font-semibold text-sm text-gray-600 h-8 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0">
              {getCalendarDays().map((day, index) => {
                const date = day.date;
                const isCurrentMonth = day.isCurrentMonth;
                const status = getDateStatus(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isPast = isBefore(date, new Date());
                
                return (
                  <button
                    key={index}
                    onClick={() => onDateSelect && onDateSelect(date)}
                    disabled={status === 'unavailable' || isPast}
                    className={`
                      h-10 w-full text-sm font-medium flex items-center justify-center
                      ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${isSelected ? 'bg-pink-600 text-white hover:bg-pink-700 rounded-md' : ''}
                      ${!isSelected && status === 'available' ? 'hover:bg-green-50 rounded-md' : ''}
                      ${!isSelected && status === 'unavailable' ? 'bg-red-100 text-red-600 cursor-not-allowed rounded-md' : ''}
                      ${!isSelected && status === 'partial' ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-50 rounded-md' : ''}
                      ${!isSelected && isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed rounded-md' : ''}
                      ${!isSelected && status === 'unknown' && !isPast ? 'hover:bg-gray-50 rounded-md' : ''}
                      transition-colors duration-200
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
