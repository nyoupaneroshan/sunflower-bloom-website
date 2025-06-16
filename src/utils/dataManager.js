
// Utility functions for managing JSON data
export const updateJsonFile = async (fileName, data) => {
  try {
    // In a real implementation, this would make an API call to update the JSON file
    console.log(`Updating ${fileName} with:`, data);
    
    // For now, we'll just log the operation
    // In production, this would be handled by a backend service
    localStorage.setItem(fileName, JSON.stringify(data));
    
    return { success: true, message: `${fileName} updated successfully` };
  } catch (error) {
    console.error(`Error updating ${fileName}:`, error);
    return { success: false, message: `Failed to update ${fileName}` };
  }
};

export const loadJsonFile = async (fileName) => {
  try {
    // In a real implementation, this would fetch from the server
    const data = localStorage.getItem(fileName);
    if (data) {
      return JSON.parse(data);
    }
    
    // Fallback to import the default file
    const module = await import(`../data/${fileName}.json`);
    return module.default;
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return null;
  }
};

export const addNotification = async (notification) => {
  try {
    const currentData = await loadJsonFile('notifications');
    const newNotification = {
      ...notification,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedData = {
      ...currentData,
      notifications: [...currentData.notifications, newNotification]
    };
    
    return await updateJsonFile('notifications', updatedData);
  } catch (error) {
    console.error('Error adding notification:', error);
    return { success: false, message: 'Failed to add notification' };
  }
};

export const updateHeroContent = async (heroData) => {
  return await updateJsonFile('hero', heroData);
};

export const updateFacilities = async (facilitiesData) => {
  return await updateJsonFile('facilities', facilitiesData);
};

export const updateActivities = async (activitiesData) => {
  return await updateJsonFile('activities', activitiesData);
};

export const updateContact = async (contactData) => {
  return await updateJsonFile('contact', contactData);
};
