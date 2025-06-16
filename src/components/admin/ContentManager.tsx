
import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentManagerProps {
  contentType: string;
}

const ContentManager: React.FC<ContentManagerProps> = ({ contentType }) => {
  const [content, setContent] = useState<any>({});
  const [originalContent, setOriginalContent] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = async () => {
    try {
      const response = await fetch(`/src/data/${contentType}.json`);
      const data = await response.json();
      setContent(data);
      setOriginalContent(data);
    } catch (error) {
      console.error(`Error loading ${contentType} content:`, error);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to backend/file system
    toast({
      title: "Success",
      description: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} content updated successfully`,
    });
  };

  const handleReset = () => {
    setContent(originalContent);
  };

  const renderFields = (obj: any, path = '') => {
    return Object.keys(obj).map(key => {
      const value = obj[key];
      const fieldPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={fieldPath} className="space-y-4">
            <h4 className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
            <div className="pl-4 border-l-2 border-gray-200">
              {renderFields(value, fieldPath)}
            </div>
          </div>
        );
      }
      
      if (Array.isArray(value)) {
        return (
          <div key={fieldPath} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <div className="space-y-2">
              {value.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={typeof item === 'string' ? item : JSON.stringify(item)}
                  onChange={(e) => {
                    const newValue = [...value];
                    newValue[index] = e.target.value;
                    setContent((prev: any) => updateNestedValue(prev, fieldPath, newValue));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ))}
            </div>
          </div>
        );
      }
      
      return (
        <div key={fieldPath} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          {typeof value === 'string' && value.length > 100 ? (
            <textarea
              value={value}
              onChange={(e) => setContent((prev: any) => updateNestedValue(prev, fieldPath, e.target.value))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <input
              type={typeof value === 'number' ? 'number' : 'text'}
              value={value}
              onChange={(e) => {
                const newValue = typeof value === 'number' ? parseFloat(e.target.value) : e.target.value;
                setContent((prev: any) => updateNestedValue(prev, fieldPath, newValue));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
        </div>
      );
    });
  };

  const updateNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const newObj = { ...obj };
    let current = newObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          Manage {contentType.replace(/([A-Z])/g, ' $1')}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <div className="space-y-6">
          {renderFields(content)}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
