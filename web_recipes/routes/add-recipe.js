const express = require('express');
const router = express.Router();
const axios = require('axios');

// Display the add recipe form
router.get('/add-recipe', (req, res) => {
  res.render('add-recipe', { title: 'Add Recipe' });
});

// Handle form submission
router.post('/add-recipe', async (req, res) => {
  const { title, description, ingredients } = req.body;
  try {
    // Create the recipe
    const recipeResponse = await axios.post('http://localhost:3000/api/recipes', {
      title,
      description,
    });
    const recipeId = recipeResponse.data.recipe.id; // Extract the recipe ID

    // Create the ingredients
    if (Array.isArray(ingredients)) {
      for (const ingredient of ingredients) {
        await axios.post('http://localhost:3000/api/ingredients', {
          name: ingredient.name,
          amount: ingredient.amount,
          volume: ingredient.volume,
          recipe_id: recipeId,
        });
      }
    }

    res.status(200).json({ message: 'Recipe and ingredients added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
