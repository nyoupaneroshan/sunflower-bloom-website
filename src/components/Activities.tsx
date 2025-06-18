
import React, { useState, useEffect } from 'react';
import { loadJsonFile } from '../utils/dataWriter';

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState({
    title: "Beyond Classroom",
    subtitle: "Take a virtual tour of our Activities",
    activities: []
  });

  useEffect(() => {
    loadActivitiesData();
    
    // Listen for data updates from admin panel
    const handleDataUpdate = (event) => {
      if (event.detail.filename === 'activities.json') {
        setActivitiesData(event.detail.data);
      }
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    return () => window.removeEventListener('dataUpdated', handleDataUpdate);
  }, []);

  const loadActivitiesData = async () => {
    const data = await loadJsonFile('activities.json'); 
    if (data) {
      setActivitiesData(data);
    }
  };

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {activitiesData.title}
          </h2>
          <p className="text-xl text-gray-600">
            {activitiesData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesData.activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-orange-600/80 transition-all duration-500"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                  {activity.title}
                </h3>
                <div className="w-16 h-1 bg-yellow-400 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            View All Activities
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Activities;
