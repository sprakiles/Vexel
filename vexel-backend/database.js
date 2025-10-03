const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setupDatabase() {
  const db = await open({
    filename: './vexel.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL,
      embeds_sent INTEGER DEFAULT 0,
      tests_sent INTEGER DEFAULT 0
    )
  `);
  
  console.log('Database connection is ready.');
  return db;
}

module.exports = setupDatabase;