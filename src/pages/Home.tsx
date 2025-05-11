
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Truck, Clock, Check, Sparkles, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="dark:bg-gray-900">
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

      {/* Image Gallery */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Expert Cleaning Process</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Exterior car washing" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-white dark:bg-gray-700 dark:text-white">
                <h3 className="font-bold">Exterior Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300">Professional washing techniques for a spotless finish</p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1620455800201-7f00aeef12ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Interior car detailing" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-white dark:bg-gray-700 dark:text-white">
                <h3 className="font-bold">Interior Detailing</h3>
                <p className="text-gray-600 dark:text-gray-300">Deep cleaning for a fresh, like-new interior</p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Car waxing" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-white dark:bg-gray-700 dark:text-white">
                <h3 className="font-bold">Premium Finishing</h3>
                <p className="text-gray-600 dark:text-gray-300">Protective waxing and polishing for lasting shine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 dark:bg-primary/20">
                  <Car className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Basic Wash</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">Exterior wash, tire cleaning, and quick vacuum.</p>
                <p className="font-bold text-xl mb-2 dark:text-white">$29.99</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Duration: 30 minutes</p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 dark:bg-primary/20">
                  <Car className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Full Clean</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">Thorough wash, wax, interior vacuum, and dashboard clean.</p>
                <p className="font-bold text-xl mb-2 dark:text-white">$49.99</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Duration: 1 hour</p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 dark:bg-primary/20">
                  <Truck className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Interior Detailing</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">Deep interior cleaning, stain removal, and odor elimination.</p>
                <p className="font-bold text-xl mb-2 dark:text-white">$79.99</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Duration: 1.5 hours</p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 dark:bg-primary/20">
                  <Truck className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Premium Package</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">Complete interior and exterior detailing with premium products.</p>
                <p className="font-bold text-xl mb-2 dark:text-white">$119.99</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Duration: 2.5 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">Professional Staff</h3>
              <p className="text-gray-500 dark:text-gray-300">Our staff is trained to handle all types of vehicles with care.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">Quick Service</h3>
              <p className="text-gray-500 dark:text-gray-300">We value your time and ensure prompt service delivery.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary dark:text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">Guaranteed Satisfaction</h3>
              <p className="text-gray-500 dark:text-gray-300">We're not happy until you're completely satisfied with our service.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/booking">
              <Button size="lg">Book Your Service Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">"My car looks brand new after the premium package. The attention to detail was impressive!"</p>
                <p className="font-semibold dark:text-white">- Michael S.</p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">"Quick service and excellent results. The staff was friendly and professional. Will definitely return!"</p>
                <p className="font-semibold dark:text-white">- Jessica T.</p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">"They did an amazing job removing some tough stains from my truck's interior. Great value for the price."</p>
                <p className="font-semibold dark:text-white">- Robert K.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
