
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'academics'
  });
  const { toast } = useToast();

  const categories = ['academics', 'sports', 'cultural', 'events'];

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await fetch('/src/data/gallery.json');
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const saveImages = (updatedImages: any[]) => {
    setImages(updatedImages);
    toast({
      title: "Success",
      description: "Gallery updated successfully",
    });
  };

  const handleAdd = () => {
    const newImage = {
      id: Date.now(),
      ...formData
    };
    
    const updated = [...images, newImage];
    saveImages(updated);
    
    setFormData({ title: '', description: '', url: '', category: 'academics' });
    setShowAddForm(false);
  };

  const handleEdit = (image: any) => {
    setEditingId(image.id);
    setFormData(image);
  };

  const handleUpdate = () => {
    const updated = images.map((img: any) =>
      img.id === editingId ? { ...formData, id: editingId } : img
    );
    saveImages(updated);
    setEditingId(null);
    setFormData({ title: '', description: '', url: '', category: 'academics' });
  };

  const handleDelete = (id: number) => {
    const updated = images.filter((img: any) => img.id !== id);
    saveImages(updated);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', url: '', category: 'academics' });
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Image' : 'Add New Image'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Image title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Image description"
            />
          </div>
          
          {formData.url && (
            <div className="mb-4">
              <img src={formData.url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
            </div>
          )}
          
          <div className="flex items-center justify-end space-x-2">
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
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image: any) => (
          <div key={image.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img src={image.url} alt={image.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-800">{image.title}</h5>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {image.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{image.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
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

export default GalleryManager;
