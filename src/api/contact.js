
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
    console.log('Connecting to database with:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE
    });

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectTimeout: 10000,
      acquireTimeout: 10000,
    });

    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM `contact_info` LIMIT 1');
      
      if (rows.length > 0) {
        const contactData = {
          title: rows[0].title,
          subtitle: rows[0].subtitle,
          email: rows[0].email,
          phone: rows[0].phone,
          address: rows[0].address,
          mapUrl: rows[0].map_url
        };
        res.status(200).json(contactData);
      } else {
        // Return default data if no records found
        const defaultData = {
          title: "Contact Information",
          address: "Tarakeshwor- 06, KTM",
          phone: "(977) 01-5136321",
          email: "sfa2061@gmail.com",
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032.0402149898878!2d85.2998052!3d27.750960300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cce4ffffe7%3A0x161276d0d897c665!2sSunflower%20Academy%20(English%20Medium%20SS)!5e1!3m2!1sen!2snp!4v1750232702113!5m2!1sen!2snp"
        };
        res.status(200).json(defaultData);
      }
    }
    else if (req.method === 'PUT') {
      const { title, subtitle, email, phone, address, mapUrl } = req.body;
      
      await connection.execute(
        `INSERT INTO contact_info (id, title, subtitle, email, phone, address, map_url, updated_at) 
         VALUES (1, ?, ?, ?, ?, ?, ?, NOW()) 
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         subtitle = VALUES(subtitle), 
         email = VALUES(email), 
         phone = VALUES(phone), 
         address = VALUES(address), 
         map_url = VALUES(map_url), 
         updated_at = NOW()`,
        [title, subtitle, email, phone, address, mapUrl]
      );
      
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to handle contact info',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
