
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const AdminPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState([]);
  const [editingNotification, setEditingNotification] = useState(null);
  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    priority: 'medium',
    isActive: true
  });

  const tabs = [
    { id: 'notifications', name: 'Notifications' },
    { id: 'hero', name: 'Hero Section' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'activities', name: 'Activities' },
    { id: 'contact', name: 'Contact' }
  ];

  const handleSaveNotification = () => {
    const notification = {
      ...newNotification,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    
    // This would update the JSON file in a real implementation
    console.log('Saving notification:', notification);
    
    setNotifications([...notifications, notification]);
    setNewNotification({ title: '', content: '', priority: 'medium', isActive: true });
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-5/6 flex overflow-hidden shadow-2xl">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-50 p-6 border-r">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Manage Notifications</h3>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Add New Notification Form */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Add New Notification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Notification title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newNotification.priority}
                      onChange={(e) => setNewNotification({...newNotification, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newNotification.content}
                    onChange={(e) => setNewNotification({...newNotification, content: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Notification content"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.isActive}
                      onChange={(e) => setNewNotification({...newNotification, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <button
                    onClick={handleSaveNotification}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-gray-800">{notification.title}</h5>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            notification.priority === 'high' 
                              ? 'bg-red-100 text-red-600'
                              : notification.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.priority}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            notification.isActive 
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {notification.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{notification.content}</p>
                        <p className="text-gray-400 text-xs mt-2">{notification.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'notifications' && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {tabs.find(t => t.id === activeTab)?.name} Management
              </h3>
              <p className="text-gray-600">
                Content management for {tabs.find(t => t.id === activeTab)?.name.toLowerCase()} will be implemented here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
