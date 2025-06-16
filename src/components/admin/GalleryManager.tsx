
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateJsonFile, loadJsonFile } from '../../utils/dataWriter';

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
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: 'academics', label: 'Academic Activities', description: 'Classroom learning, labs, library' },
    { value: 'sports', label: 'Sports & Athletics', description: 'Basketball, swimming, futsal' },
    { value: 'cultural', label: 'Cultural Events', description: 'Dance, music, arts, festivals' },
    { value: 'events', label: 'School Events', description: 'Field trips, ceremonies, celebrations' }
  ];

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await loadJsonFile('gallery.json');
      if (data && data.images) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const saveImages = async (updatedImages: any[]) => {
    setIsSaving(true);
    try {
      const success = await updateJsonFile('gallery.json', { images: updatedImages });
      if (success) {
        setImages(updatedImages);
        toast({
          title: "Success!",
          description: "Gallery updated successfully. Changes will appear on the gallery page.",
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save gallery changes. Please try again.",
        variant: "destructive"
      });
    }
    setIsSaving(false);
  };

  const handleAdd = async () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and image URL.",
        variant: "destructive"
      });
      return;
    }

    const newImage = {
      id: Date.now(),
      ...formData
    };
    
    const updated = [...images, newImage];
    await saveImages(updated);
    
    setFormData({ title: '', description: '', url: '', category: 'academics' });
    setShowAddForm(false);
  };

  const handleEdit = (image: any) => {
    setEditingId(image.id);
    setFormData(image);
  };

  const handleUpdate = async () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and image URL.",
        variant: "destructive"
      });
      return;
    }

    const updated = images.map((img: any) =>
      img.id === editingId ? { ...formData, id: editingId } : img
    );
    await saveImages(updated);
    setEditingId(null);
    setFormData({ title: '', description: '', url: '', category: 'academics' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      const updated = images.filter((img: any) => img.id !== id);
      await saveImages(updated);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', url: '', category: 'academics' });
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
            <ImageIcon className="w-8 h-8" />
            <span>Manage Gallery</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Add and manage photos for your school's gallery page. Students and parents can view these images.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Image</span>
        </button>
      </div>

      {/* Gallery Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 mb-2">📸 About Gallery Management:</h3>
        <p className="text-sm text-amber-700">
          This is the <strong>main gallery</strong> that appears on your Gallery page. This is different from images that appear in other sections of your website (like hero banners or facility photos). You can organize photos by category to help visitors find what they're looking for.
        </p>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>{editingId ? 'Edit Image Details' : 'Add New Image to Gallery'}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Science Lab Experiment"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label} - {cat.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/your-image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the full URL of your image. You can upload images to services like Imgur, Google Drive, or your school's server.
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Brief description of what's happening in this photo..."
            />
          </div>
          
          {formData.url && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview:</label>
              <img src={formData.url} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
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
              disabled={isSaving}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Update Image' : 'Add to Gallery'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images in gallery yet</h3>
            <p className="text-gray-600">Add your first image to get started with your school gallery!</p>
          </div>
        ) : (
          images.map((image: any) => (
            <div key={image.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={image.url} alt={image.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-800 text-sm">{image.title}</h5>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {categories.find(c => c.value === image.category)?.label || image.category}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{image.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit image"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete image"
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

export default GalleryManager;
