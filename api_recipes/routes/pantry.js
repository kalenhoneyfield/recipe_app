const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all pantry items
router.get('/pantry', (req, res) => {
  db.all('SELECT * FROM pantry', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ pantry: rows });
  });
});

// Add a new pantry item
router.post('/pantry', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  db.run('INSERT INTO pantry (name) VALUES (?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      pantry: { id: this.lastID, name },
    });
  });
});

// Update a pantry item
router.put('/pantry/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  db.run('UPDATE pantry SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Pantry item not found' });
      return;
    }
    res.json({ message: 'Pantry item updated successfully' });
  });
});

// Delete a pantry item
router.delete('/pantry/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM pantry WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Pantry item not found' });
      return;
    }
    res.json({ message: 'Pantry item deleted successfully' });
  });
});

module.exports = router;
