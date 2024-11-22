const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all ingredients
router.get('/ingredients', (req, res) => {
  db.all('SELECT * FROM ingredients', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ ingredients: rows });
  });
});

// Get ingredients by recipe ID
router.get('/recipes/:recipe_id/ingredients', (req, res) => {
  const { recipe_id } = req.params;
  db.all('SELECT * FROM ingredients WHERE recipe_id = ?', [recipe_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ ingredients: rows });
  });
});

// Add a new ingredient
router.post('/ingredients', (req, res) => {
  const { name, amount, volume, recipe_id } = req.body;
  if (!name || !amount || !volume || !recipe_id) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  db.run(
    'INSERT INTO ingredients (name, amount, volume, recipe_id) VALUES (?, ?, ?, ?)',
    [name, amount, volume, recipe_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        ingredient: { id: this.lastID, name, amount, volume, recipe_id },
      });
    },
  );
});

// Update an ingredient
router.put('/ingredients/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount, volume, recipe_id } = req.body;
  if (!name || !amount || !volume || !recipe_id) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  db.run(
    'UPDATE ingredients SET name = ?, amount = ?, volume = ?, recipe_id = ? WHERE id = ?',
    [name, amount, volume, recipe_id, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
      }
      res.json({ message: 'Ingredient updated successfully' });
    },
  );
});

// Delete an ingredient
router.delete('/ingredients/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM ingredients WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Ingredient not found' });
      return;
    }
    res.json({ message: 'Ingredient deleted successfully' });
  });
});

module.exports = router;
