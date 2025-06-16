
import React from 'react';
import { Computer, School, Users } from 'lucide-react';
import facilitiesData from '../data/facilities.json';

const iconMap = {
  computer: Computer,
  school: School,
  users: Users,
};

const Facilities = () => {
  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {facilitiesData.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {facilitiesData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {facilitiesData.facilities.map((facility, index) => {
            const IconComponent = iconMap[facility.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={facility.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {facility.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {facility.description}
                    </p>
                    <div className="pt-4">
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
