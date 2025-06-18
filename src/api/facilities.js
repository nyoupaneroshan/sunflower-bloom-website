
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
      const [titleRows] = await connection.execute('SELECT * FROM `facilities_content` LIMIT 1');
      const [facilityRows] = await connection.execute('SELECT * FROM `facilities` ORDER BY `display_order` ASC');
      
      const facilitiesData = {
        title: titleRows[0]?.title || "World-Class Facilities",
        subtitle: titleRows[0]?.subtitle || "Creating the perfect environment for learning and growth",
        facilities: facilityRows.map(row => ({
          id: row.id,
          title: row.title,
          description: row.description,
          image: row.image_url,
          icon: row.icon
        }))
      };
      
      res.status(200).json(facilitiesData);
    }
    else if (req.method === 'PUT') {
      const { title, subtitle, facilities } = req.body;
      
      // Update content
      await connection.execute(
        `INSERT INTO facilities_content (id, title, subtitle, updated_at) 
         VALUES (1, ?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         subtitle = VALUES(subtitle), 
         updated_at = NOW()`,
        [title, subtitle]
      );
      
      // Clear existing facilities
      await connection.execute('DELETE FROM `facilities`');
      
      // Insert new facilities
      for (let i = 0; i < facilities.length; i++) {
        const facility = facilities[i];
        await connection.execute(
          'INSERT INTO `facilities` (id, title, description, image_url, icon, display_order) VALUES (?, ?, ?, ?, ?, ?)',
          [facility.id, facility.title, facility.description, facility.image, facility.icon, i]
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
      error: 'Failed to handle facilities',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
