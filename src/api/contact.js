
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
      const [rows] = await connection.execute('SELECT * FROM `contact_info` LIMIT 1');
      await connection.end();
      
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
        res.status(404).json({ error: 'No contact info found' });
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
      
      await connection.end();
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle contact info' });
  }
}
