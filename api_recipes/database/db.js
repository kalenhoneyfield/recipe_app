const sqlite3 = require('sqlite3').verbose();

// Connect to the in-memory database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the in-memory SQLite database.');
  }
});

// Create the recipes table with a description field
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    )`,
    (err) => {
      if (err) {
        console.error('Failed to create recipes table:', err.message);
      }
    },
  );

  // Create the ingredients table
  db.run(
    `CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      volume TEXT NOT NULL,
      recipe_id INTEGER,
      FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    )`,
    (err) => {
      if (err) {
        console.error('Failed to create ingredients table:', err.message);
      }
    },
  );

  // Create the pantry table
  db.run(
    `CREATE TABLE IF NOT EXISTS pantry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('Failed to create pantry table:', err.message);
      }
    },
  );
});

module.exports = db;
