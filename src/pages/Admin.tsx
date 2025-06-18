
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LogOut, Users, Bell, Image, BookOpen, Mail, Settings, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationManager from '../components/admin/NotificationManager';
import GalleryManager from '../components/admin/GalleryManager';
import ContentManager from '../components/admin/ContentManager';

const Admin = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'hero', name: 'Hero Section', icon: BookOpen },
    { id: 'about', name: 'About Us', icon: Info },
    { id: 'facilities', name: 'Facilities', icon: Settings },
    { id: 'activities', name: 'Activities', icon: Users },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌻</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Admin Panel</h2>
              <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-6">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
          
          <div className="border-t pt-6 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'notifications' && <NotificationManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {(activeTab === 'hero' || activeTab === 'about' || activeTab === 'facilities' || activeTab === 'activities' || activeTab === 'contact') && (
            <ContentManager contentType={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
