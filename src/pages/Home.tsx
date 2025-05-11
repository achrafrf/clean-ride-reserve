
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Truck, Clock, Check } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552989548-af4207d1431e?q=80&w=1974')] bg-cover bg-center opacity-30"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Vehicle Cleaning Service</h1>
            <p className="text-xl mb-8">Premium cleaning for cars, motorcycles, vans, and trucks. Book online in minutes.</p>
            <Link to="/booking">
              <Button size="lg" className="text-lg px-8 py-6">Book Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Basic Wash</h3>
                <p className="text-gray-500 mb-4">Exterior wash, tire cleaning, and quick vacuum.</p>
                <p className="font-bold text-xl mb-2">$29.99</p>
                <p className="text-sm text-gray-500 mb-4">Duration: 30 minutes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Full Clean</h3>
                <p className="text-gray-500 mb-4">Thorough wash, wax, interior vacuum, and dashboard clean.</p>
                <p className="font-bold text-xl mb-2">$49.99</p>
                <p className="text-sm text-gray-500 mb-4">Duration: 1 hour</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Interior Detailing</h3>
                <p className="text-gray-500 mb-4">Deep interior cleaning, stain removal, and odor elimination.</p>
                <p className="font-bold text-xl mb-2">$79.99</p>
                <p className="text-sm text-gray-500 mb-4">Duration: 1.5 hours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Premium Package</h3>
                <p className="text-gray-500 mb-4">Complete interior and exterior detailing with premium products.</p>
                <p className="font-bold text-xl mb-2">$119.99</p>
                <p className="text-sm text-gray-500 mb-4">Duration: 2.5 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Professional Staff</h3>
              <p className="text-gray-500">Our staff is trained to handle all types of vehicles with care.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Quick Service</h3>
              <p className="text-gray-500">We value your time and ensure prompt service delivery.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Guaranteed Satisfaction</h3>
              <p className="text-gray-500">We're not happy until you're completely satisfied with our service.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/booking">
              <Button size="lg">Book Your Service Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
