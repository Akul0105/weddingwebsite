'use client';

import * as React from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Save, RotateCcw, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AvailabilityManagerProps {
  vendorId: string;
  vendorName: string;
  onSave?: (availability: VendorAvailability) => void;
  className?: string;
}

interface VendorAvailability {
  availableDates: Date[];
  unavailableDates: Date[];
  partiallyAvailableDates: Date[];
}

export function AvailabilityManager({
  vendorId,
  vendorName,
  onSave,
  className = "",
}: AvailabilityManagerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [availability, setAvailability] = React.useState<VendorAvailability>({
    availableDates: [],
    unavailableDates: [],
    partiallyAvailableDates: [],
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [isEditing, setIsEditing] = React.useState(false);

  // Load availability data (replace with API call)
  React.useEffect(() => {
    // Mock data - replace with actual API call
    const mockAvailability = generateMockAvailability();
    setAvailability(mockAvailability);
  }, [vendorId]);

  const generateMockAvailability = () => {
    const today = new Date();
    const availableDates: Date[] = [];
    const unavailableDates: Date[] = [];
    const partiallyAvailableDates: Date[] = [];

    for (let i = 0; i < 90; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        if (Math.random() > 0.3) {
          unavailableDates.push(date);
        } else if (Math.random() > 0.7) {
          partiallyAvailableDates.push(date);
        } else {
          availableDates.push(date);
        }
      } else {
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

  const getDateStatus = (date: Date) => {
    if (availability.unavailableDates.some(d => d.toDateString() === date.toDateString())) return 'unavailable';
    if (availability.partiallyAvailableDates.some(d => d.toDateString() === date.toDateString())) return 'partial';
    if (availability.availableDates.some(d => d.toDateString() === date.toDateString())) return 'available';
    return 'unknown';
  };

  const getDateModifiers = (date: Date) => {
    const status = getDateStatus(date);
    return {
      available: status === 'available',
      unavailable: status === 'unavailable',
      partial: status === 'partial',
      selected: selectedDate && date.toDateString() === selectedDate.toDateString(),
      past: date < new Date(),
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

  const handleDateClick = (date: Date | undefined) => {
    if (!date || date < new Date()) return;
    
    setSelectedDate(date);
    setIsEditing(true);
  };

  const setDateStatus = (date: Date, status: 'available' | 'unavailable' | 'partial') => {
    if (!date || date < new Date()) return;

    const dateString = date.toDateString();
    
    setAvailability(prev => {
      const newAvailability = { ...prev };
      
      // Remove from all arrays first
      newAvailability.availableDates = newAvailability.availableDates.filter(d => d.toDateString() !== dateString);
      newAvailability.unavailableDates = newAvailability.unavailableDates.filter(d => d.toDateString() !== dateString);
      newAvailability.partiallyAvailableDates = newAvailability.partiallyAvailableDates.filter(d => d.toDateString() !== dateString);
      
      // Add to appropriate array
      if (status === 'available') {
        newAvailability.availableDates.push(date);
      } else if (status === 'unavailable') {
        newAvailability.unavailableDates.push(date);
      } else if (status === 'partial') {
        newAvailability.partiallyAvailableDates.push(date);
      }
      
      return newAvailability;
    });
  };

  const handleSave = () => {
    // Save to API
    if (onSave) {
      onSave(availability);
    }
    toast.success('Availability updated successfully!');
    setIsEditing(false);
    setSelectedDate(undefined);
  };

  const handleReset = () => {
    const mockAvailability = generateMockAvailability();
    setAvailability(mockAvailability);
    toast.success('Availability reset to default');
  };

  const getStatusCounts = () => {
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start: currentMonthStart, end: currentMonthEnd });
    
    const counts = monthDays.reduce((acc, day) => {
      const status = getDateStatus(day);
      if (day >= new Date()) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Availability</h2>
          <p className="text-gray-600">Vendor: {vendorName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!isEditing}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

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
            <div className="font-semibold text-red-800">Unavailable</div>
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
              <p className="text-gray-600">Click on dates to change their availability status</p>
            </div>
            
            <div className="w-full">
              {/* Custom Weekday Headers */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center font-semibold text-xl text-gray-600 h-20 flex items-center justify-center">
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
                  const isPast = date < new Date();
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      disabled={isPast}
                      className={`
                        h-24 w-full text-xl font-medium flex items-center justify-center cursor-pointer
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

      {/* Date Status Controls */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                Set Status for {format(selectedDate, 'PPP')}
              </h4>
              <div className="flex gap-3">
                <Button
                  variant={getDateStatus(selectedDate) === 'available' ? 'default' : 'outline'}
                  onClick={() => setDateStatus(selectedDate, 'available')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Available
                </Button>
                <Button
                  variant={getDateStatus(selectedDate) === 'partial' ? 'default' : 'outline'}
                  onClick={() => setDateStatus(selectedDate, 'partial')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Limited
                </Button>
                <Button
                  variant={getDateStatus(selectedDate) === 'unavailable' ? 'default' : 'outline'}
                  onClick={() => setDateStatus(selectedDate, 'unavailable')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Unavailable
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{availability.availableDates.length}</div>
            <div className="text-sm text-gray-600">Available Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{availability.partiallyAvailableDates.length}</div>
            <div className="text-sm text-gray-600">Limited Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{availability.unavailableDates.length}</div>
            <div className="text-sm text-gray-600">Unavailable Days</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-pink-600">
              {Math.round((availability.availableDates.length / (availability.availableDates.length + availability.unavailableDates.length + availability.partiallyAvailableDates.length)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Availability Rate</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
