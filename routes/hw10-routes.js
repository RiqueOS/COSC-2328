// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez


const express = require('express');
const router = express.Router();
const db = require('../db');


function buildPage(monsters, message, error, battle){
    return `<!DOCTYPE html>
    <html>
    <head>
  <title>HW10</title>
  <link rel="stylesheet" href="/hw10/css/hw10.css">
</head>
<body>
  ${message ? `<p class="banner-success">${message}</p>` : ''}
  ${error ? `<p class="banner-error">${error}</p>` : ''}

  <h2>Monster Roster</h2>
  ${monsters.map(m => `
  <div class="monster-card">
    <h3>${m.name}</h3>
    <p>Species: ${m.species}</p>
    <p>Attack: ${m.attack}</p>
    <p>Defense: ${m.defense}</p>
    <p>HP: ${m.hp}</p>
    <p>ID: ${m.id}</p>
  </div>`).join('')}

  <h2>Recruit</h2>
  <form action="/hw10/recruit" method="POST">
    <label>Name <input type="text" name="name" required></label>
    <label>Species <input type="text" name="species" required></label>
    <label>Attack <input type="number" name="attack" required></label>
    <label>Defense <input type="number" name="defense" required></label>
    <label>HP <input type="number" name="hp" required></label>
    <button type="submit">Recruit</button>
  </form>

  <h2>Retire</h2>
  <form action="/hw10/retire" method="POST">
    <label>ID <input type="number" name="id" required></label>
    <button type="submit">Retire</button>
  </form>

  <h2>Battle</h2>
  <form action="/hw10/battle" method="POST">
    <button type="submit">Battle!</button>
  </form>

    ${battle ? `<div class="battle-results">
    <h2>Battle Results</h2>
    <p>${battle.a.name} (${battle.a.species}) - ATK ${battle.a.attack}, DEF ${battle.a.defense}, HP ${battle.a.hp} - Score: ${battle.scoreA}</p>
    <p>${battle.b.name} (${battle.b.species}) - ATK ${battle.b.attack}, DEF ${battle.b.defense}, HP ${battle.b.hp} - Score: ${battle.scoreB}</p>
    <p>${battle.winner}</p>
  </div>` : ''}
</body>
</html>`;
}


// 10.4 – GET /
router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

// 10.5 – POST /recruit
router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

// 10.6 – POST /retire
router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});


// 10.7 – POST /battle
router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;

