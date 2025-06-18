import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Bell, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    type: 'info',
    isActive: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  const typeOptions = [
    { value: 'info', label: 'Information', color: 'bg-blue-100 text-blue-600', description: 'General information' },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-100 text-yellow-600', description: 'Important updates' },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-600', description: 'Good news' },
    { value: 'error', label: 'Alert', color: 'bg-red-100 text-red-600', description: 'Urgent announcements' }
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      console.log('Loading notifications from API');
      setConnectionError(null);
      
      const response = await fetch('/api/notifications');
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', text.substring(0, 200));
        throw new Error(`Server returned HTML instead of JSON. Check API endpoint configuration.`);
      }
      
      const data = await response.json();
      console.log('Loaded notifications:', data);
      
      if (data && data.notifications) {
        setNotifications(data.notifications);
      } else if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      setConnectionError(error.message);
      toast({
        title: "Database Connection Error",
        description: `Failed to load notifications: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const saveNotifications = async (updatedNotifications: any[]) => {
    setIsSaving(true);
    try {
      console.log('Saving notifications to API:', updatedNotifications);
      setConnectionError(null);
      
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notifications: updatedNotifications })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setNotifications(updatedNotifications);
        toast({
          title: "Success!",
          description: "Notification updated successfully. It will appear on the website banner.",
        });
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      setConnectionError(error.message);
      toast({
        title: "Error",
        description: `Failed to save notification: ${error.message}`,
        variant: "destructive"
      });
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    if (!formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the notification message.",
        variant: "destructive"
      });
      return;
    }

    const newNotification = {
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString()
    };
    
    const updated = [...notifications, newNotification];
    await saveNotifications(updated);
    
    setFormData({ message: '', type: 'info', isActive: true });
    setShowAddForm(false);
  };

  const handleEdit = (notification: any) => {
    setEditingId(notification.id);
    setFormData({
      message: notification.message,
      type: notification.type,
      isActive: notification.isActive
    });
  };

  const handleUpdate = async () => {
    if (!formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the notification message.",
        variant: "destructive"
      });
      return;
    }

    const updated = notifications.map((notif: any) =>
      notif.id === editingId ? { ...notif, ...formData } : notif
    );
    await saveNotifications(updated);
    setEditingId(null);
    setFormData({ message: '', type: 'info', isActive: true });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this notification? This action cannot be undone.')) {
      const updated = notifications.filter((notif: any) => notif.id !== id);
      await saveNotifications(updated);
    }
  };

  const resetForm = () => {
    setFormData({ message: '', type: 'info', isActive: true });
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
            <Bell className="w-8 h-8" />
            <span>Manage Notifications</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage announcements that appear on your website's notification banner.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Notification</span>
        </button>
      </div>

      {/* Connection Error Alert */}
      {connectionError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Database Connection Issue</h3>
              <p className="text-sm text-red-700 mb-2">{connectionError}</p>
              <button
                onClick={loadNotifications}
                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{editingId ? 'Edit Notification' : 'Create New Notification'}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Show this notification on the website</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter the notification message that will be displayed to website visitors..."
            />
          </div>
          
          <div className="flex space-x-2 justify-end">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              disabled={isSaving}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Update' : 'Create'} Notification</span>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">📢 How notifications work:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Active notifications appear in the banner at the top of your website</li>
          <li>• Different types have different colors and styling</li>
          <li>• Only active notifications are visible to website visitors</li>
          <li>• You can edit or delete notifications at any time</li>
        </ul>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">Create your first notification to keep your website visitors informed!</p>
          </div>
        ) : (
          notifications.map((notification: any) => (
            <div
              key={notification.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      typeOptions.find(p => p.value === notification.type)?.color || 'bg-gray-100 text-gray-600'
                    }`}>
                      {typeOptions.find(p => p.value === notification.type)?.label || notification.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      notification.isActive 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {notification.isActive ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mb-2">{notification.message}</p>
                  <p className="text-gray-400 text-xs">
                    Created: {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(notification)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit notification"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
