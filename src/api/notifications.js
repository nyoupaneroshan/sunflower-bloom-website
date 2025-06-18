
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
      const [rows] = await connection.execute('SELECT * FROM `notifications` ORDER BY `created_at` DESC');
      res.status(200).json({ notifications: rows });
    } 
    else if (req.method === 'PUT') {
      const { notifications } = req.body;
      
      // Clear existing notifications
      await connection.execute('DELETE FROM `notifications`');
      
      // Insert new notifications
      for (const notification of notifications) {
        await connection.execute(
          'INSERT INTO `notifications` (id, message, type, isActive, created_at) VALUES (?, ?, ?, ?, NOW())',
          [notification.id, notification.message, notification.type || 'info', notification.isActive || false]
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
      error: 'Failed to handle notifications',
      details: error.message,
      code: error.code
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
