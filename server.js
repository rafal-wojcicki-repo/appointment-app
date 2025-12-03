import { HttpClientModule } from '@angular/common/http';

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('./appointments.db');

app.use(cors());
app.use(express.json())

const sqlQuery = 'CREATE TABLE appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, time TEXT, notes TEXT, important INTEGER)';
db.run(sqlQuery);


app.get('/appointments', (req, res) => {
    db.all('SELECT * FROM appointments', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/appointments', (req, res) => {
  const { title, date, time, notes, important } = req.body;
  db.run('INSERT INTO appointments (title, date, time, notes, important) VALUES (?, ?, ?, ?, ?)',
    [title, date, time, notes, important ? 1 : 0], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.delete('/appointments/:id', (req, res) => {
  db.run('DELETE FROM appointments WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));