
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import NotificationBanner from '../components/NotificationBanner';
import About from '../components/About';
import Facilities from '../components/Facilities';
import Activities from '../components/Activities';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AdminPanel from '../components/AdminPanel';

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <NotificationBanner />
      <Hero />
      <About />
      <Facilities />
      <Activities />
      <Education />
      <Contact />
      <Footer />
      
      {/* Admin Panel Trigger - Hidden in production */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110"
          title="Admin Panel"
        >
          ⚙️
        </button>
      </div>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default Index;
