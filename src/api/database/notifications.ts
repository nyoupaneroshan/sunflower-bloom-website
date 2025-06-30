import { getNotifications, updateNotifications } from '../../lib/database';

export async function GET() {
  try {
    const notificationsData = getNotifications();
    return Response.json(notificationsData);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to fetch notifications',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    updateNotifications(data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ 
      error: 'Failed to update notifications',
      details: error.message
    }, { status: 500 });
  }
}