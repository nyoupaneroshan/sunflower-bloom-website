import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* MODIFIED SECTION: 
                - Replaced the colored div with an <img> tag.
                - The src attribute points to `/main-logo.png`, which correctly
                  references the image from the public folder.
                - Added an alt attribute for accessibility.
              */}
              <img 
                src="/main-logo.png" 
                alt="Sunflower Academy Logo" 
                className="w-12 h-12" 
              />
              <div>
                <h3 className="text-2xl font-bold">Sunflower Academy</h3>
                <p className="text-gray-400">Inspiring Excellence Building Future</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Sunflower Academy offers a well-rounded education that blends academic excellence with creativity, innovation, and real-world skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Facilities', 'Activities', 'Education', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Tarakeshwor- 06, KTM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(977) 01-5136321</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">sfa2061@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-gray-400">for education</span>
            </div>
            <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sunflower Academy. All rights reserved.
          </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;