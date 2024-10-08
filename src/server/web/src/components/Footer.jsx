import React from 'react';
import Link from 'next/link';
import { Sprout } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center mb-4 sm:mb-0">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              <Link href="/">
                HydroEdu
              </Link>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700">About Us</Link>
            <Link href="/contact" className="hover:text-gray-700">Contact</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} HydroEdu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;