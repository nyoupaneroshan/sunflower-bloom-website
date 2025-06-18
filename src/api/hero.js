
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
      const [rows] = await connection.execute('SELECT * FROM `hero_content` LIMIT 1');
      
      if (rows.length > 0) {
        const heroData = {
          title: rows[0].title,
          subtitle: rows[0].subtitle,
          description: rows[0].description,
          buttonText: rows[0].button_text,
          backgroundImage: rows[0].background_image
        };
        res.status(200).json(heroData);
      } else {
        // Return default data if no records found
        const defaultData = {
          title: "Welcome to Sunflower Academy",
          subtitle: "Nurturing Young Minds for Tomorrow's Success",
          description: "A place where children grow, learn, and flourish in a safe and inspiring environment. Our dedicated teachers and innovative programs ensure every child reaches their full potential.",
          buttonText: "Explore Our Programs",
          backgroundImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
        };
        res.status(200).json(defaultData);
      }
    }
    else if (req.method === 'PUT') {
      const { title, subtitle, description, buttonText, backgroundImage } = req.body;
      
      await connection.execute(
        `INSERT INTO hero_content (id, title, subtitle, description, button_text, background_image, updated_at) 
         VALUES (1, ?, ?, ?, ?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         subtitle = VALUES(subtitle), 
         description = VALUES(description), 
         button_text = VALUES(button_text), 
         background_image = VALUES(background_image), 
         updated_at = NOW()`,
        [title, subtitle, description, buttonText, backgroundImage]
      );
      
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to handle hero content',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
