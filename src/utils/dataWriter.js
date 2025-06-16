
// Data writer utility for updating JSON files
export const updateJsonFile = async (filename, data) => {
  try {
    console.log(`Updating ${filename} with:`, data);
    
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
      return JSON.parse(stored);
    }
    
    // Fallback to fetching the original file
    const response = await fetch(`/src/data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }
    const data = await response.json();
    
    // Store in localStorage for future use
    localStorage.setItem(`sunflower_${filename}`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
};
