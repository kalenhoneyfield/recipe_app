const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all recipes
router.get('/recipes', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ recipes: rows });
  });
});

// Get a single recipe by ID
router.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM recipes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json({ recipe: row });
  });
});

// Add a new recipe
router.post('/recipes', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  db.run(
    'INSERT INTO recipes (title, description) VALUES (?, ?)',
    [title, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ recipe: { id: this.lastID, title, description } });
    },
  );
});

// Update a recipe
router.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  db.run(
    'UPDATE recipes SET title = ?, description = ? WHERE id = ?',
    [title, description, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }
      res.json({ message: 'Recipe updated successfully' });
    },
  );
});

// Delete a recipe
router.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM recipes WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json({ message: 'Recipe deleted successfully' });
  });
});

module.exports = router;
