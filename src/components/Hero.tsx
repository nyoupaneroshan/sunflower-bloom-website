
import React, { useState, useEffect } from 'react';
import heroData from '../data/hero.json';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const texts = ['Excellence', 'Innovation', 'Future Leaders', 'Success'];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const text = texts[textIndex];
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= text.length) {
        setCurrentText(text.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    };
    
    typeText();
  }, [textIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-400"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          >
            <div className="w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {heroData.title}
            </h1>
            <div className="text-xl md:text-2xl text-yellow-100 font-medium">
              Inspiring{' '}
              <span className="text-yellow-300 font-bold min-w-[200px] inline-block text-left">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={heroData.ctaButton.link}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {heroData.ctaButton.text}
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">1000+</div>
              <div className="text-yellow-100">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">20+</div>
              <div className="text-yellow-100">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">17</div>
              <div className="text-yellow-100">Batches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
