
import React, { useState, useEffect } from 'react';
import { Save, X, RefreshCw, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentManagerProps {
  contentType: string;
}

const ContentManager: React.FC<ContentManagerProps> = ({ contentType }) => {
  const [content, setContent] = useState<any>({});
  const [originalContent, setOriginalContent] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const contentLabels = {
    hero: 'Homepage Banner',
    facilities: 'School Facilities',
    activities: 'Student Activities',
    contact: 'Contact Information',
    about: 'About Us Page'
  };

  const fieldLabels = {
    title: 'Page Title',
    subtitle: 'Page Subtitle',
    description: 'Description',
    content: 'Main Content',
    name: 'Name',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'School Address',
    buttonText: 'Button Text',
    backgroundImage: 'Background Image URL',
    image: 'Image URL',
    icon: 'Icon Type',
    mapUrl: 'Google Maps URL',
    activities: 'Activities List',
    facilities: 'Facilities List',
    principalMessage: 'Principal Message',
    principalName: 'Principal Name',
    principalImage: 'Principal Image',
    schoolHistory: 'School History',
    mission: 'Mission Statement',
    vision: 'Vision Statement'
  };

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      console.log(`Loading content for ${contentType} from API`);
      
      const response = await fetch(`/api/${contentType}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Loaded data from API:`, data);
      
      setContent(data);
      setOriginalContent(data);
    } catch (error) {
      console.error(`Error loading ${contentType} content:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${contentLabels[contentType] || contentType} content`,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log(`Saving content to API:`, content);
      
      const response = await fetch(`/api/${contentType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setOriginalContent(content);
        toast({
          title: "✅ Success!",
          description: `${contentLabels[contentType] || contentType} has been updated successfully. Changes are now live on your website!`,
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "❌ Error",
        description: `Failed to save changes. Please try again.`,
        variant: "destructive"
      });
    }
    setIsSaving(false);
  };

  const handleReset = () => {
    setContent(originalContent);
    toast({
      title: "🔄 Reset Complete",
      description: "All changes have been reverted to the last saved version.",
    });
  };

  const getFieldLabel = (key: string) => {
    return fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const renderField = (obj: any, path = '', parentKey = '') => {
    return Object.keys(obj).map(key => {
      const value = obj[key];
      const fieldPath = path ? `${path}.${key}` : key;
      const displayLabel = getFieldLabel(key);
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={fieldPath} className="space-y-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-800 text-lg border-b pb-2">
              📝 {displayLabel}
            </h4>
            <div className="space-y-4">
              {renderField(value, fieldPath, key)}
            </div>
          </div>
        );
      }
      
      if (Array.isArray(value)) {
        return (
          <div key={fieldPath} className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              📋 {displayLabel}
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {value.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border">
                  <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                  <input
                    type="text"
                    value={typeof item === 'string' ? item : (item.title || item.name || JSON.stringify(item))}
                    onChange={(e) => {
                      const newValue = [...value];
                      if (typeof item === 'string') {
                        newValue[index] = e.target.value;
                      } else {
                        newValue[index] = { ...item, title: e.target.value };
                      }
                      setContent((prev: any) => updateNestedValue(prev, fieldPath, newValue));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={`Enter ${displayLabel.toLowerCase()} item`}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      const isLongText = typeof value === 'string' && value.length > 100;
      const isUrl = typeof value === 'string' && (value.includes('http') || key.toLowerCase().includes('image') || key.toLowerCase().includes('url') || key.toLowerCase().includes('map'));
      
      return (
        <div key={fieldPath} className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {isUrl ? '🖼️' : '📝'} {displayLabel}
            {isUrl && <span className="text-xs text-blue-500 ml-1">(Image/Link URL)</span>}
          </label>
          {isLongText ? (
            <textarea
              value={value || ''}
              onChange={(e) => setContent((prev: any) => updateNestedValue(prev, fieldPath, e.target.value))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={`Enter ${displayLabel.toLowerCase()}`}
            />
          ) : (
            <input
              type={typeof value === 'number' ? 'number' : isUrl ? 'url' : 'text'}
              value={value || ''}
              onChange={(e) => {
                const newValue = typeof value === 'number' ? parseFloat(e.target.value) : e.target.value;
                setContent((prev: any) => updateNestedValue(prev, fieldPath, newValue));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={`Enter ${displayLabel.toLowerCase()}`}
            />
          )}
          {isUrl && value && (
            <div className="mt-2">
              <img 
                src={value} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-lg border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-8 h-8 text-green-500" />
            Edit {contentLabels[contentType] || contentType}
          </h1>
          <p className="text-gray-600 mt-1">
            Make changes to your website content. All changes are saved to the database and will appear on your website immediately.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Reset Changes</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <div className="space-y-6">
          {Object.keys(content).length > 0 ? renderField(content) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No content available to edit.</p>
              <button onClick={loadContent} className="text-orange-500 hover:text-orange-600">
                Try reloading content
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for editing content:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click "Save Changes" to make your updates live on the website</li>
          <li>• For images, paste the complete web address (URL starting with https://)</li>
          <li>• Use "Reset Changes" to undo all unsaved modifications</li>
          <li>• Long text fields support multiple paragraphs and detailed descriptions</li>
          <li>• 🔒 All changes are saved securely to the database</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentManager;
