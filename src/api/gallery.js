
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    if (req.method === 'GET') {
      const [rows] = await connection.execute(
        'SELECT * FROM `gallery_images` ORDER BY `display_order` ASC'
      );
      
      await connection.end();

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
      
      await connection.end();
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle gallery data' });
  }
}
