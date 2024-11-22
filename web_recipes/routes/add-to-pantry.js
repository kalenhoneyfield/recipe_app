const express = require('express');
const router = express.Router();
const axios = require('axios');

// Display the add ingredient form
router.get('/add-to-pantry', (req, res) => {
  res.render('add-to-pantry', { title: 'Add to Pantry' });
});

// Handle form submission
router.post('/add-to-pantry', async (req, res) => {
  const { name } = req.body;
  try {
    await axios.post('http://localhost:3000/api/pantry', { name });
    res.redirect('/pantry');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
