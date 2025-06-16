
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import NotificationBanner from '../components/NotificationBanner';
import About from '../components/About';
import Facilities from '../components/Facilities';
import Activities from '../components/Activities';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
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
    </div>
  );
};

export default Index;
