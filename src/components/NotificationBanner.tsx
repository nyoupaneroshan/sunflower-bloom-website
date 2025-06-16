
import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import notificationsData from '../data/notifications.json';

const NotificationBanner = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const activeNotifications = notificationsData.notifications.filter(n => n.isActive);
    setNotifications(activeNotifications);
  }, []);

  useEffect(() => {
    if (notifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [notifications.length]);

  if (!isVisible || notifications.length === 0) return null;

  const currentNotification = notifications[currentIndex];

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${
      currentNotification?.priority === 'high' 
        ? 'bg-gradient-to-r from-red-500 to-orange-500' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500'
    } text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 animate-pulse" />
            <div className="flex-1">
              <span className="font-semibold">{currentNotification?.title}</span>
              <span className="ml-2 text-sm opacity-90">{currentNotification?.content}</span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {notifications.length > 1 && (
          <div className="flex justify-center mt-2 space-x-2">
            {notifications.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;
