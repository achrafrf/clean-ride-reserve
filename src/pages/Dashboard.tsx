
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  Car, 
  Bike, 
  Truck, 
  Check, 
  X, 
  Calendar,
  ListChecks, 
  CheckIcon
} from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: 'car' | 'motorcycle' | 'van' | 'truck';
  serviceType: 'basic' | 'full' | 'interior' | 'premium';
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: string;
  price: number;
  cleaningStages?: {
    [key: string]: boolean;
  };
}

// Define cleaning stages corresponding to those in Tracking.tsx
const cleaningStagesList = [
  { id: "prewash", name: "Pre-wash" },
  { id: "mainWash", name: "Main Wash" },
  { id: "rinse", name: "Rinse" },
  { id: "waxing", name: "Waxing" },
  { id: "detailing", name: "Detailing" },
  { id: "drying", name: "Drying" }
];

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Convert string dates back to Date objects for proper sorting
    const processedBookings = storedBookings.map((booking: any) => ({
      ...booking,
      date: new Date(booking.date).toISOString(),
      createdAt: new Date(booking.createdAt).toISOString(),
      cleaningStages: booking.cleaningStages || {}
    }));
    
    // Sort by date, newest first
    processedBookings.sort((a: Booking, b: Booking) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setBookings(processedBookings);
  }, []);

  const updateBookingStatus = (id: string, status: 'confirmed' | 'rejected') => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    
    // Update localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    // Show toast message
    toast({
      title: `Booking ${status === 'confirmed' ? 'Confirmed' : 'Rejected'}`,
      description: `Booking #${id} has been ${status === 'confirmed' ? 'confirmed' : 'rejected'}.`,
    });
  };

  const toggleStageStatus = (bookingId: string, stageId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        const updatedCleaningStages = {
          ...booking.cleaningStages,
          [stageId]: !booking.cleaningStages?.[stageId]
        };
        
        // Check if all stages are complete
        const allStagesComplete = cleaningStagesList.every(stage => 
          updatedCleaningStages[stage.id] === true
        );
        
        if (allStagesComplete) {
          toast({
            title: "Cleaning Complete",
            description: `All cleaning stages for ${booking.name}'s vehicle have been completed.`,
            variant: "default",
          });
        }
        
        return {
          ...booking,
          cleaningStages: updatedCleaningStages
        };
      }
      return booking;
    });
    
    // Update localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };
  
  const toggleBookingExpanded = (id: string) => {
    if (expandedBooking === id) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(id);
    }
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  const getVehicleIcon = (type: string) => {
    switch(type) {
      case 'car':
      case 'van':
        return <Car className="h-5 w-5" />;
      case 'motorcycle':
        return <Bike className="h-5 w-5" />;
      case 'truck':
        return <Truck className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  const getServiceLabel = (type: string) => {
    switch(type) {
      case 'basic': return 'Basic Wash';
      case 'full': return 'Full Clean';
      case 'interior': return 'Interior Detailing';
      case 'premium': return 'Premium Package';
      default: return type;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {getVehicleIcon(booking.vehicleType)}
                          <span className="ml-2">
                            {booking.name} - {getServiceLabel(booking.serviceType)}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Booking #{booking.id} · {new Date(booking.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          booking.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                        <p className="text-sm">{booking.email}</p>
                        <p className="text-sm">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Schedule</p>
                        <p className="text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="text-lg font-bold">${booking.price.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                        >
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" /> Confirm
                        </Button>
                      </div>
                    )}
                    
                    {/* Add cleaning stages tracking for confirmed bookings */}
                    {booking.status === 'confirmed' && (
                      <>
                        <div className="mt-4">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => toggleBookingExpanded(booking.id)}
                            className="flex items-center gap-2"
                          >
                            <ListChecks className="h-4 w-4" />
                            {expandedBooking === booking.id ? "Hide Cleaning Stages" : "Manage Cleaning Stages"}
                          </Button>
                        </div>
                        
                        {expandedBooking === booking.id && (
                          <div className="mt-4 border rounded-md p-4">
                            <h3 className="font-medium mb-2">Cleaning Progress</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {cleaningStagesList.map(stage => (
                                <Button 
                                  key={stage.id}
                                  variant={booking.cleaningStages?.[stage.id] ? "default" : "outline"}
                                  size="sm"
                                  className={`justify-start ${booking.cleaningStages?.[stage.id] ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                  onClick={() => toggleStageStatus(booking.id, stage.id)}
                                >
                                  {booking.cleaningStages?.[stage.id] && <CheckIcon className="h-4 w-4 mr-2" />}
                                  {stage.name}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No bookings found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
