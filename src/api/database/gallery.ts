import { getGalleryImages, updateGalleryImages } from '../../lib/database';

export async function GET() {
  try {
    const galleryData = getGalleryImages();
    return Response.json(galleryData);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch gallery data',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateGalleryImages(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update gallery data',
      details: error.message
    }, { status: 500 });
  }
}