
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
      const [rows] = await connection.execute('SELECT * FROM `about_content` LIMIT 1');
      await connection.end();
      
      if (rows.length > 0) {
        const aboutData = {
          title: rows[0].title,
          subtitle: rows[0].subtitle,
          description: rows[0].description,
          principalMessage: rows[0].principal_message,
          principalName: rows[0].principal_name,
          principalImage: rows[0].principal_image,
          schoolHistory: rows[0].school_history,
          mission: rows[0].mission,
          vision: rows[0].vision
        };
        res.status(200).json(aboutData);
      } else {
        res.status(404).json({ error: 'No about content found' });
      }
    }
    else if (req.method === 'PUT') {
      const { 
        title, 
        subtitle, 
        description, 
        principalMessage, 
        principalName, 
        principalImage, 
        schoolHistory, 
        mission, 
        vision 
      } = req.body;
      
      await connection.execute(
        `INSERT INTO about_content (
          id, title, subtitle, description, principal_message, principal_name, 
          principal_image, school_history, mission, vision, updated_at
        ) 
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         subtitle = VALUES(subtitle), 
         description = VALUES(description), 
         principal_message = VALUES(principal_message), 
         principal_name = VALUES(principal_name), 
         principal_image = VALUES(principal_image), 
         school_history = VALUES(school_history), 
         mission = VALUES(mission), 
         vision = VALUES(vision), 
         updated_at = NOW()`,
        [title, subtitle, description, principalMessage, principalName, principalImage, schoolHistory, mission, vision]
      );
      
      await connection.end();
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle about content' });
  }
}
