
// Data writer utility for updating JSON files
export const updateJsonFile = async (filename, data) => {
  try {
    // In a real application, this would make an API call to your backend
    // For demo purposes, we'll simulate the update and show success
    console.log(`Updating ${filename} with:`, data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would be:
    // const response = await fetch(`/api/update/${filename}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.ok;
    
    return true;
  } catch (error) {
    console.error(`Error updating ${filename}:`, error);
    return false;
  }
};

export const loadJsonFile = async (filename) => {
  try {
    const response = await fetch(`/src/data/${filename}`);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
};
