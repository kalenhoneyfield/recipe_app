const express = require('express');
const router = express.Router();
const axios = require('axios');

// Recipes page route
router.get('/recipes', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/recipes');
    const recipes = response.data.recipes; // Extract the recipes array
    res.render('recipes', { title: 'Recipes', recipes: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
