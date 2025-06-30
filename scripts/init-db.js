const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(process.cwd(), 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const dbPath = path.join(dbDir, 'sunflower.db');
const db = new Database(dbPath);

// Read and execute schema
const schemaPath = path.join(dbDir, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

try {
  db.exec(schema);
  console.log('✅ Database initialized successfully!');
  console.log(`📁 Database created at: ${dbPath}`);
} catch (error) {
  console.error('❌ Error initializing database:', error);
} finally {
  db.close();
}