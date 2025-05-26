const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // if using .env
const recipe = require('./utils/recipe');


const PORT = process.env.PORT || 3500;
const fs = require('fs');
const csv = require('csv-parser');
const filterRecipes = require('./utils/filterRecipes');

let recipes = [];

// Load recipes on server start
// fs.createReadStream(path.join(__dirname, 'Data/recipes.csv'))
fs.createReadStream(path.join(__dirname, 'recipes-sample.csv'))
  .pipe(csv())
  .on('data', (row) => {
    if (row['Cleaned_Ingredients']) {
      row['Cleaned_Ingredients'] = row['Cleaned_Ingredients'].toLowerCase();
    }
    recipes.push(row);
  })
  .on('end', () => {
    console.log('CSV loaded.');
  });

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve React frontend if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', function(req, res) {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Views (HTML templates)
app.use('/views', express.static(path.join(__dirname, 'views')));

// Route: Home
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route: Search Form
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'search.html'));
});

app.get('/api/search', async (req, res) => {
  const query = req.query.ingredient?.toLowerCase();
  console.log(' Search API called with:', query);
  if (!query) return res.json([]);

  try {
    const results = await recipe.find({
      Ingredients: { $regex: query, $options: 'i' }
    }).limit(100);
    res.json(results);
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// API: Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipe.find().limit(1000);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Route: About Page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://bsaid2004:K0y2iR9kuW03Robg@cluster347.uraihne.mongodb.net/recipeDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//using MongoDB uri from env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
