const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const pantryRoutes = require('./routes/pantry');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', recipeRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', pantryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
