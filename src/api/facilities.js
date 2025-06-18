// File: /api/facilities.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    // Connect to the database using credentials from Environment Variables
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Example query: select all rows from a 'facilities' table
    const [rows] = await connection.execute('SELECT * FROM `facilities`');

    // End the connection
    await connection.end();

    // Return the data as JSON
    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}