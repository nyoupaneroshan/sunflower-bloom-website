
// Data writer utility for updating data via API calls to MySQL database
export const updateJsonFile = async (filename, data) => {
  try {
    console.log(`Updating ${filename} with:`, data);
    
    // Basic security check - ensure user is authenticated
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      console.error('Unauthorized access attempt');
      return false;
    }
    
    // Map filename to API endpoint
    const endpointMap = {
      'facilities.json': '/api/facilities',
      'gallery.json': '/api/gallery',
      'notifications.json': '/api/notifications',
      'hero.json': '/api/hero',
      'activities.json': '/api/activities',
      'contact.json': '/api/contact',
      'about.json': '/api/about'
    };
    
    const endpoint = endpointMap[filename];
    if (!endpoint) {
      console.error(`No API endpoint found for ${filename}`);
      return false;
    }
    
    // Send PUT request to update data
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Dispatch custom event to notify components of data changes
    window.dispatchEvent(new CustomEvent('dataUpdated', { 
      detail: { filename, data } 
    }));
    
    return true;
  } catch (error) {
    console.error(`Error updating ${filename}:`, error);
    return false;
  }
};

export const loadJsonFile = async (filename) => {
  try {
    console.log(`Loading ${filename} from API`);
    
    // Map filename to API endpoint
    const endpointMap = {
      'facilities.json': '/api/facilities',
      'gallery.json': '/api/gallery',
      'notifications.json': '/api/notifications',
      'hero.json': '/api/hero',
      'activities.json': '/api/activities',
      'contact.json': '/api/contact',
      'about.json': '/api/about'
    };
    
    const endpoint = endpointMap[filename];
    if (!endpoint) {
      console.error(`No API endpoint found for ${filename}`);
      return null;
    }
    
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Loaded ${filename} data:`, data);
    
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    
    // Fallback to localStorage if API fails
    const stored = localStorage.getItem(`sunflower_${filename}`);
    if (stored) {
      console.log(`Fallback: Loading ${filename} from localStorage`);
      return JSON.parse(stored);
    }
    
    return null;
  }
};

// Security function to validate admin access
export const validateAdminAccess = () => {
  const adminUser = localStorage.getItem('admin_user');
  if (!adminUser) {
    console.error('Unauthorized access attempt detected');
    return false;
  }
  
  try {
    const user = JSON.parse(adminUser);
    return user && user.username && user.role === 'admin';
  } catch (error) {
    console.error('Invalid admin session');
    return false;
  }
};

// Function to sanitize and validate data before saving
export const sanitizeData = (data) => {
  // Remove any potential script tags or malicious content
  const sanitized = JSON.parse(JSON.stringify(data));
  
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+=/gi, '');
  };
  
  const sanitizeObject = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitizedObj = {};
      for (const key in obj) {
        sanitizedObj[key] = sanitizeObject(obj[key]);
      }
      return sanitizedObj;
    } else if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    return obj;
  };
  
  return sanitizeObject(sanitized);
};
