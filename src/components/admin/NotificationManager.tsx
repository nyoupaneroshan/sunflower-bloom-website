
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    isActive: true
  });
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('/src/data/notifications.json');
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const saveNotifications = (updatedNotifications: any[]) => {
    // In a real app, this would save to backend/file system
    // For demo, we'll update local state and show success message
    setNotifications(updatedNotifications);
    toast({
      title: "Success",
      description: "Notifications updated successfully",
    });
  };

  const handleAdd = () => {
    const newNotification = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updated = [...notifications, newNotification];
    saveNotifications(updated);
    
    setFormData({ title: '', content: '', priority: 'medium', isActive: true });
    setShowAddForm(false);
  };

  const handleEdit = (notification: any) => {
    setEditingId(notification.id);
    setFormData(notification);
  };

  const handleUpdate = () => {
    const updated = notifications.map((notif: any) =>
      notif.id === editingId ? { ...formData, id: editingId } : notif
    );
    saveNotifications(updated);
    setEditingId(null);
    setFormData({ title: '', content: '', priority: 'medium', isActive: true });
  };

  const handleDelete = (id: number) => {
    const updated = notifications.filter((notif: any) => notif.id !== id);
    saveNotifications(updated);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', priority: 'medium', isActive: true });
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Notifications</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Notification</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Notification' : 'Add New Notification'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Notification title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Notification content"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
            
            <div className="flex space-x-2">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification: any) => (
          <div
            key={notification.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
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
                <p className="text-gray-600 text-sm mb-2">{notification.content}</p>
                <p className="text-gray-400 text-xs">{notification.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(notification)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(notification.id)}
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
  );
};

export default NotificationManager;
