// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez

const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

// OPEN_READWRITE: open the file that already exists. If voyage.db is missing, this
// fails with an error instead of silently creating a new, empty database.
const db = new sqlite3.Database(path.join(__dirname, 'voyage.db'), sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error('Could not open voyage.db:', err.message);
  console.log('Connected to the SQLite database.');
});


db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS monsters (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      name    TEXT    NOT NULL,
      species TEXT    NOT NULL,
      attack  INTEGER NOT NULL,
      defense INTEGER NOT NULL,
      hp      INTEGER NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) AS count FROM monsters', (err, row) => {
    if (!err && row.count === 0) {
      const stmt = db.prepare(
        'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)'
      );
      stmt.run('Flameclaw',  'Fire Drake',   85, 60, 120);
      stmt.run('Ironshell',  'Rock Golem',   40, 95, 200);
      stmt.run('Shadowfang', 'Shadow Wolf',  75, 50, 140);
      stmt.run('Aquajet',    'Sea Serpent',  65, 70, 160);
      stmt.run('Thornback',  'Spine Lizard', 55, 80, 150);
      stmt.finalize();
    }
  });
});


module.exports = db;