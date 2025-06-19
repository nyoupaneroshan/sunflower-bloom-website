import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// The raw URL to your gallery.json file on GitHub.
const GALLERY_DATA_URL = 'https://raw.githubusercontent.com/nyoupaneroshan/sunflower-bloom-website/main/src/data/gallery.json';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data directly from the GitHub raw URL
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // --- MODIFIED: Fetching directly from GitHub ---
        const response = await fetch(GALLERY_DATA_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // This calculation now only runs when the `images` state changes.
  const categories = useMemo(() => {
    if (images.length === 0) return ['all'];
    return ['all', ...Array.from(new Set(images.map((img) => img.category)))];
  }, [images]);

  // This calculation now only runs when `selectedCategory` or `images` change.
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return images;
    }
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Explore our vibrant school life through photos and memories
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 capitalize ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
              <p className="ml-4 text-lg text-gray-600">Loading Gallery...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-lg text-red-500">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative aspect-square">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold">{image.title}</h3>
                        <p className="text-sm">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button onClick={closeLightbox} className="absolute -top-10 right-0 text-white hover:text-yellow-400 p-2 z-10">
              <X className="w-8 h-8" />
            </button>
            
            <button onClick={() => navigateImage('prev')} className="absolute left-0 sm:-left-12 top-1/2 transform -translate-y-12 text-white hover:bg-white/20 p-3 rounded-full">
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button onClick={() => navigateImage('next')} className="absolute right-0 sm:-right-12 top-1/2 transform -translate-y-12 text-white hover:bg-white/20 p-3 rounded-full">
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] object-contain"
                />
                <div className="mt-4 text-white text-center p-4 bg-black/50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                    <p className="text-gray-300 text-sm">{selectedImage.description}</p>
                </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
