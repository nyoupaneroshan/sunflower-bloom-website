
import React from 'react';
import aboutData from '../data/about.json';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {aboutData.vision.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutData.vision.content}
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {aboutData.mission.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutData.mission.content}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 h-full flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-6xl">🌻</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Growing Minds, Building Futures
                </h3>
                <p className="text-gray-600">
                  Since 2061 B.S., nurturing excellence in education
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {aboutData.coreValues.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {aboutData.coreValues.values.map((value, index) => (
              <div
                key={value.name}
                className="group text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">
                    {value.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {value.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {aboutData.history.title}
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              {aboutData.history.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-600">2061 B.S.</div>
                <div className="text-gray-600">Established</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-yellow-600">2081 B.S.</div>
                <div className="text-gray-600">International Recognition</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-600">1000+</div>
                <div className="text-gray-600">Current Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
