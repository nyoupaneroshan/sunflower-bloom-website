
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
      const [rows] = await connection.execute(
        'SELECT * FROM `gallery_images` ORDER BY `display_order` ASC'
      );
      
      const formattedRows = rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        url: row.image_url,
        category: row.category,
      }));

      res.status(200).json({ images: formattedRows });
    }
    else if (req.method === 'PUT') {
      const { images } = req.body;
      
      // Clear existing images
      await connection.execute('DELETE FROM `gallery_images`');
      
      // Insert new images
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await connection.execute(
          'INSERT INTO `gallery_images` (id, title, description, image_url, category, display_order) VALUES (?, ?, ?, ?, ?, ?)',
          [image.id, image.title, image.description, image.url, image.category, i]
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
      error: 'Failed to handle gallery data',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
