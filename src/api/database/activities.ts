import { getActivities, updateActivities } from '../../lib/database';

export async function GET() {
  try {
    const activitiesData = getActivities();
    return Response.json(activitiesData);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch activities',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateActivities(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update activities',
      details: error.message
    }, { status: 500 });
  }
}