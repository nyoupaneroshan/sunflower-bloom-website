
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutComponent from '../components/About';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <AboutComponent />
      </div>
      <Footer />
    </div>
  );
};

export default About;
