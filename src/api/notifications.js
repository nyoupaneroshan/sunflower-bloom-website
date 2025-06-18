
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
      const [rows] = await connection.execute('SELECT * FROM `notifications` ORDER BY `created_at` DESC');
      await connection.end();
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
      
      await connection.end();
      res.status(200).json({ success: true });
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to handle notifications' });
  }
}
