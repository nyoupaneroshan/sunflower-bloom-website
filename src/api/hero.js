
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
      const [rows] = await connection.execute('SELECT * FROM `hero_content` LIMIT 1');
      await connection.end();
      
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
        res.status(404).json({ error: 'No hero content found' });
      }
    }
    else if (req.method === 'PUT') {
      const { title, subtitle, description, buttonText, backgroundImage } = req.body;
      
      // Update or insert hero content
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
      
      await connection.end();
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle hero content' });
  }
}
