// Data loader utility for fetching data from SQLite database via API
export const loadDataFromDatabase = async (endpoint: string) => {
  try {
    console.log(`Loading data from ${endpoint}`);
    
    const response = await fetch(`/api/database/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Loaded data from ${endpoint}:`, data);
    
    return data;
  } catch (error) {
    console.error(`Error loading data from ${endpoint}:`, error);
    
    // Fallback to localStorage if API fails
    const stored = localStorage.getItem(`sunflower_${endpoint}`);
    if (stored) {
      console.log(`Fallback: Loading ${endpoint} from localStorage`);
      return JSON.parse(stored);
    }
    
    return null;
  }
};

export const updateDataInDatabase = async (endpoint: string, data: any) => {
  try {
    console.log(`Updating ${endpoint} with:`, data);
    
    // Basic security check - ensure user is authenticated
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      console.error('Unauthorized access attempt');
      return false;
    }
    
    // Send PUT request to update data
    const response = await fetch(`/api/database/${endpoint}`, {
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
      detail: { endpoint, data } 
    }));
    
    return true;
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    return false;
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
export const sanitizeData = (data: any) => {
  // Remove any potential script tags or malicious content
  const sanitized = JSON.parse(JSON.stringify(data));
  
  const sanitizeString = (str: string) => {
    if (typeof str !== 'string') return str;
    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+=/gi, '');
  };
  
  const sanitizeObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitizedObj: any = {};
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