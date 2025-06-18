
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
      const [rows] = await connection.execute('SELECT * FROM `about_content` LIMIT 1');
      
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
        // Return default data if no records found
        const defaultData = {
          title: "About Sunflower Academy",
          subtitle: "Cultivating Excellence in Education Since 1995",
          description: "At Sunflower Academy, we believe every child is unique and deserves personalized attention to reach their full potential. Our nurturing environment combines academic excellence with character development.",
          principalMessage: "Welcome to Sunflower Academy! As the principal, I'm proud to lead an institution that has been shaping young minds for over two decades.",
          principalName: "Keshab Raj Sharma",
          principalImage: "/principal.jpeg",
          schoolHistory: "Founded in 1995, Sunflower Academy has grown from a small neighborhood school to one of the region's most respected educational institutions.",
          mission: "To provide quality education that nurtures intellectual curiosity, creativity, and character development in a safe and supportive environment.",
          vision: "To be a leading educational institution that prepares students to become confident, compassionate, and contributing members of society."
        };
        res.status(200).json(defaultData);
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
      
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to handle about content',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
