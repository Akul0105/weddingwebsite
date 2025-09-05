'use client';

import * as React from 'react';
import { format, isSameDay, isAfter, isBefore, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Star } from 'lucide-react';

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
      // Replace with actual API call
      // const response = await fetch(`/api/vendors/${id}/availability`);
      // const data = await response.json();
      // setAvailability(data);
      
      // For now, use mock data
      const mockData = generateMockAvailability();
      // You would set the state here with real data
    } catch (error) {
      console.error('Failed to load availability:', error);
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
    <div className={`space-y-6 ${className}`}>
      {/* Status Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-semibold text-green-800">Available</div>
            <div className="text-sm text-green-600">{statusCounts.available || 0} days this month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <Clock className="w-5 h-5 text-yellow-600" />
          <div>
            <div className="font-semibold text-yellow-800">Limited</div>
            <div className="text-sm text-yellow-600">{statusCounts.partial || 0} days this month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <div className="font-semibold text-red-800">Booked</div>
            <div className="text-sm text-red-600">{statusCounts.unavailable || 0} days this month</div>
          </div>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Availability Calendar</h3>
              <p className="text-gray-600">Click on available dates to check availability</p>
            </div>
            
            <div className="w-full">
              {/* Custom Weekday Headers */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center font-semibold text-lg text-gray-600 h-16 flex items-center justify-center">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
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
                        h-20 w-full text-lg font-medium flex items-center justify-center
                        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                        ${isSelected ? 'bg-pink-600 text-white hover:bg-pink-700 rounded-lg' : ''}
                        ${!isSelected && status === 'available' ? 'bg-green-100 text-green-800 hover:bg-green-200 border-2 border-green-300 rounded-lg' : ''}
                        ${!isSelected && status === 'unavailable' ? 'bg-red-100 text-red-800 hover:bg-red-200 border-2 border-red-300 rounded-lg' : ''}
                        ${!isSelected && status === 'partial' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-2 border-yellow-300 rounded-lg' : ''}
                        ${!isSelected && isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg' : ''}
                        ${!isSelected && status === 'unknown' && !isPast ? 'hover:bg-gray-50 rounded-lg' : ''}
                        transition-colors duration-200
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{finalAvailableDates.length}</div>
            <div className="text-sm text-gray-600">Available Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{finalPartiallyAvailableDates.length}</div>
            <div className="text-sm text-gray-600">Limited Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{finalUnavailableDates.length}</div>
            <div className="text-sm text-gray-600">Booked Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-pink-600">
              {Math.round((finalAvailableDates.length / (finalAvailableDates.length + finalUnavailableDates.length + finalPartiallyAvailableDates.length)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Availability Rate</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
