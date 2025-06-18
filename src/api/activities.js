
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectTimeout: 10000,
      acquireTimeout: 10000,
    });

    if (req.method === 'GET') {
      const [titleRows] = await connection.execute('SELECT * FROM `activities_content` LIMIT 1');
      const [activityRows] = await connection.execute('SELECT * FROM `activities` ORDER BY `display_order` ASC');
      
      const activitiesData = {
        title: titleRows[0]?.title || "Beyond Classroom",
        subtitle: titleRows[0]?.subtitle || "Take a virtual tour of our Activities",
        activities: activityRows.map(row => ({
          id: row.id,
          title: row.title,
          image: row.image_url
        }))
      };
      
      res.status(200).json(activitiesData);
    }
    else if (req.method === 'PUT') {
      const { title, subtitle, activities } = req.body;
      
      // Update content
      await connection.execute(
        `INSERT INTO activities_content (id, title, subtitle, updated_at) 
         VALUES (1, ?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         subtitle = VALUES(subtitle), 
         updated_at = NOW()`,
        [title, subtitle]
      );
      
      // Clear existing activities
      await connection.execute('DELETE FROM `activities`');
      
      // Insert new activities
      for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        await connection.execute(
          'INSERT INTO `activities` (id, title, image_url, display_order) VALUES (?, ?, ?, ?)',
          [activity.id, activity.title, activity.image, i]
        );
      }
      
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to handle activities',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
