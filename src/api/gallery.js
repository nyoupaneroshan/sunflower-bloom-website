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

    // Select all images from the gallery_images table, ordering them
    const [rows] = await connection.execute(
      'SELECT * FROM `gallery_images` ORDER BY `display_order` ASC'
    );
    
    await connection.end();

    // The database returns 'image_url', but the frontend expects 'url'.
    // We can map the data here to match the frontend's expected structure.
    const formattedRows = rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      url: row.image_url, // Renaming image_url to url
      category: row.category,
    }));

    res.status(200).json({ images: formattedRows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch gallery data' });
  }
}