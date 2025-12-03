import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_PATH = process.env.DATABASE_URL || './appointments.db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(DB_PATH);

app.use(cors());
app.use(express.json());

const sqlQuery = 'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, time TEXT, notes TEXT, important INTEGER)';
db.run(sqlQuery);

// API Routes
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

// Serve static Angular frontend files (production only)
if (NODE_ENV === 'production') {
  const candidates = [
    path.join(__dirname, 'dist', 'appointment-app', 'browser'),
    path.join(__dirname, 'dist', 'appointment-app'),
    path.join(__dirname, 'dist')
  ];

  const distPath = candidates.find(p => fs.existsSync(p));
    if (distPath) {
    app.use(express.static(distPath));
    // use '/*' instead of '*' to avoid path-to-regexp parsing issues in some environments
    app.get('/*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn('No frontend dist directory found. Make sure build produces files in /dist');
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`Database: ${DB_PATH}`);
});