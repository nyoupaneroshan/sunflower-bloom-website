
// Data writer utility for updating JSON files
export const updateJsonFile = async (filename, data) => {
  try {
    console.log(`Updating ${filename} with:`, data);
    
    // Basic security check - ensure user is authenticated
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      console.error('Unauthorized access attempt');
      return false;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store in localStorage to persist data across sessions
    localStorage.setItem(`sunflower_${filename}`, JSON.stringify(data));
    
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
    // First try to load from localStorage (for admin updates)
    const stored = localStorage.getItem(`sunflower_${filename}`);
    if (stored) {
      console.log(`Loading ${filename} from localStorage`);
      return JSON.parse(stored);
    }
    
    // Fallback to loading the initial data from the imported JSON files
    console.log(`Loading initial ${filename} data`);
    let initialData = null;
    
    switch (filename) {
      case 'hero.json':
        initialData = await import('../data/hero.json');
        break;
      case 'facilities.json':
        initialData = await import('../data/facilities.json');
        break;
      case 'activities.json':
        initialData = await import('../data/activities.json');
        break;
      case 'contact.json':
        initialData = await import('../data/contact.json');
        break;
      case 'notifications.json':
        initialData = await import('../data/notifications.json');
        break;
      case 'gallery.json':
        initialData = await import('../data/gallery.json');
        break;
      case 'about.json':
        initialData = await import('../data/about.json');
        break;
      default:
        console.warn(`Unknown file: ${filename}`);
        return null;
    }
    
    // Extract the default export and store it in localStorage for future use
    const data = initialData.default || initialData;
    localStorage.setItem(`sunflower_${filename}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
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
