
import React from 'react';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';
import educationData from '../data/education.json';

const Education = () => {
  const features = [
    {
      title: educationData.curriculum.title,
      description: educationData.curriculum.description,
      icon: BookOpen
    },
    {
      title: educationData.mentoring.title,
      description: educationData.mentoring.description,
      icon: Users
    },
    {
      title: educationData.classrooms.title,
      description: educationData.classrooms.description,
      icon: Clock
    },
    {
      title: educationData.counseling.title,
      description: educationData.counseling.description,
      icon: Calendar
    }
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Excellence in Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach to education ensures every student reaches their full potential
          </p>
        </div>

        {/* Education Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Beyond Books & Grades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {educationData.beyondBooks.title}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {educationData.beyondBooks.description}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {educationData.grades.title}
            </h3>
            <div className="space-y-6">
              {educationData.grades.levels.map((level, index) => (
                <div
                  key={level.level}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {level.level}
                      </h4>
                      <p className="text-gray-600">{level.grades}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
