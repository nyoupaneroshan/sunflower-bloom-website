import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { loadJsonFile } from '../utils/dataWriter';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Welcome to Sunflower Academy",
    subtitle: "Nurturing Young Minds for Tomorrow's Success",
    description: "A place where children grow, learn, and flourish in a safe and inspiring environment. Our dedicated teachers and innovative programs ensure every child reaches their full potential.",
    buttonText: "Explore Our Programs",
    backgroundImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
  });

  useEffect(() => {
    loadHeroData();
    
    // Listen for data updates from admin panel
    const handleDataUpdate = (event) => {
      if (event.detail.filename === 'hero.json') {
        setHeroData(event.detail.data);
      }
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    return () => window.removeEventListener('dataUpdated', handleDataUpdate);
  }, []);

  const loadHeroData = async () => {
    const data = await loadJsonFile('hero.json');
    if (data) {
      setHeroData(data);
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full mix-blend-multiply filter blur-2xl animate-float"></div>
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl animate-float animation-delay-8"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {heroData.title}
          </h1>
          <p className="text-xl md:text-2xl text-yellow-200 mb-8 font-medium">
            {heroData.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-2">
              <span>{heroData.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-2xl">
              Take Virtual Tour
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center z-10 animate-bounce">
        <a href="#about" className="text-white text-sm font-bold hover:text-yellow-200 transition-colors duration-300">
          Scroll Down
        </a>
      </div>
    </section>
  );
};

export default Hero;
