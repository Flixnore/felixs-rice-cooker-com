const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./logs.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, action TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

module.exports = db;

