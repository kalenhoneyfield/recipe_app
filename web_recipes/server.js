const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const indexRoutes = require('./routes/index');
const recipeRoutes = require('./routes/recipes');
const addRecipeRoutes = require('./routes/add-recipe');
const pantryRoutes = require('./routes/pantry');

const app = express();
const port = 3001;

// Set up Handlebars with a custom helper and partials directory
const hbs = exphbs.create({
  helpers: {
    json: function (context) {
      return JSON.stringify(context, null, 2);
    },
  },
  partialsDir: path.join(__dirname, 'views', 'partials'),
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', indexRoutes);
app.use('/', recipeRoutes);
app.use('/', addRecipeRoutes);
app.use('/', pantryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
