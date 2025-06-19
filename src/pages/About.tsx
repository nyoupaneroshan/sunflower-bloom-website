
import React, { useState, useEffect } from 'react';
import { Users, Target, Eye, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadJsonFile } from '../utils/dataWriter';

const About = () => {
  const [aboutData, setAboutData] = useState({
    title: "About Sunflower Academy",
    subtitle: "Cultivating Excellence in Education Since 1995",
    description: "At Sunflower Academy, we believe every child is unique and deserves personalized attention to reach their full potential. Our nurturing environment combines academic excellence with character development.",
    principalMessage: "Welcome you to Sunflower Academy — a place where young minds bloom and futures are built with care, vision, and dedication.<br> At Sunflower Academy, we believe that every child is unique and full of potential. Our mission is to provide a nurturing and inspiring environment where students are encouraged to think critically, act responsibly, and strive for excellence in all aspects of life. True to our motto, “Inspiring Excellence, Building Future,” we are committed to guiding our students toward academic achievement, personal growth, and social responsibility.<br> We take pride in our modern infrastructure, which includes well-equipped science and computer labs, a digital classroom, an expansive library, and international-standard sports facilities. These resources, along with a dedicated team of experienced and passionate educators, help us create a balanced learning experience — blending academic rigor with co-curricular engagement.<br> As a proud member of the World Schools League, we continuously embrace global best practices in education while remaining rooted in our cultural values. Whether it is through book reviews, public speaking, or extracurricular programs, we aim to develop confident, compassionate, and capable individuals ready to face the world.<br> Thank you for considering Sunflower Academy as the stepping stone in your child’s educational journey. We look forward to working hand-in-hand with parents and the community to shape a generation of learners who are not only knowledgeable but also kind, curious, and future-ready.",
    principalName: "Keshab Raj Sharma",
    principalImage: "/principal.jpeg",
    schoolHistory: "Founded in 1995, Sunflower Academy has grown from a small neighborhood school to one of the region's most respected educational institutions, serving over 800 students.",
    mission: "To provide quality education that nurtures intellectual curiosity, creativity, and character development in a safe and supportive environment.",
    vision: "To be a leading educational institution that prepares students to become confident, compassionate, and contributing members of society."
  });

  useEffect(() => {
    loadAboutData();
    
    // Listen for data updates from admin panel
    const handleDataUpdate = (event) => {
      if (event.detail.filename === 'about.json') {
        setAboutData(event.detail.data);
      }
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    return () => window.removeEventListener('dataUpdated', handleDataUpdate);
  }, []);

  const loadAboutData = async () => {
    const data = await loadJsonFile('about.json');
    if (data) {
      setAboutData(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            {aboutData.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            {aboutData.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {aboutData.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutData.schoolHistory}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="School building"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-orange-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.mission}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.vision}
              </p>
            </div>
          </div>

          {/* Principal's Message */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <img
                  src={aboutData.principalImage}
                  alt={aboutData.principalName}
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-xl"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Message from Our Principal</h3>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                  "{aboutData.principalMessage}"
                </blockquote>
                <footer className="text-gray-600">
                  <strong>{aboutData.principalName}</strong>
                  <br />
                  Principal, Sunflower Academy
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
