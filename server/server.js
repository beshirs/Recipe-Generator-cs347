const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const fs = require('fs');
const csv = require('csv-parser');
const filterRecipes = require('./utils/filterRecipes');

let recipes = [];

// Load recipes on server start
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

// Middleware to serve static HTML files
app.use(express.static(path.join(__dirname, 'public')));

// Set up views directory for HTML templates
app.use('/views', express.static(path.join(__dirname, 'views')));

// Home page ('/' and '/home')
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Search page ('/search') — shows form
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'search.html'));
});

// Search Results page ('/searchResult') 
app.get('/searchResult', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'search-results.html'));
});

// API endpoint to get search results
app.get('/api/search', (req, res) => {
  const query = req.query.ingredient?.toLowerCase();

  if (!query) {
    return res.json([]);
  }

  const results = filterRecipes(recipes, query);
  res.json(results);
});

// API endpoint to get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// About page ('/about')
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Recipes page ('/recipes')
app.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'recipes.html'));
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});