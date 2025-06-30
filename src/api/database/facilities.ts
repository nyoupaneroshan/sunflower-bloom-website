import { getFacilities, updateFacilities } from '../../lib/database';

export async function GET() {
  try {
    const facilitiesData = getFacilities();
    return Response.json(facilitiesData);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch facilities',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateFacilities(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update facilities',
      details: error.message
    }, { status: 500 });
  }
}