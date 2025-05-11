
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from './LanguageProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const isRtl = language === 'ar';
  
  return (
    <div className={`min-h-screen flex flex-col dark:bg-gray-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-700/20">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold dark:text-white">
                CleanRide
              </Link>
              <nav className="ml-8 hidden md:flex space-x-6">
                <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('home')}
                </Link>
                <Link to="/booking" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/booking' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('booking')}
                </Link>
                <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('dashboard')}
                </Link>
                <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                  {t('contact')}
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeToggle />
              {location.pathname !== '/booking' && (
                <Link to="/booking">
                  <Button>{t('bookNow')}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">CleanRide</h3>
              <p className="text-gray-400">Professional vehicle cleaning services</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white">{t('home')}</Link></li>
                  <li><Link to="/booking" className="text-gray-400 hover:text-white">{t('booking')}</Link></li>
                  <li><Link to="/dashboard" className="text-gray-400 hover:text-white">{t('dashboard')}</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">{t('contact')}</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">Services</h3>
                <ul className="space-y-2">
                  <li><span className="text-gray-400">Basic Wash</span></li>
                  <li><span className="text-gray-400">Full Clean</span></li>
                  <li><span className="text-gray-400">Interior Detailing</span></li>
                  <li><span className="text-gray-400">Premium Package</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-300">Contact</h3>
                <ul className="space-y-2">
                  <li><span className="text-gray-400">123 Clean Street</span></li>
                  <li><span className="text-gray-400">contact@cleanride.com</span></li>
                  <li><span className="text-gray-400">(123) 456-7890</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} CleanRide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
