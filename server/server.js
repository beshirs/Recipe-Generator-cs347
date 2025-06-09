const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const recipe = require('./utils/recipe');
const pluralize = require('pluralize');



const PORT = process.env.PORT || 3500;

// Serve React frontend 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', function(req, res) {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.get('/api/search', async (req, res) => {
  const raw = req.query.ingredient?.toLowerCase() || '';
  const query = pluralize.singular(raw);
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

// Connect to MongoDB
mongoose.connect('mongodb+srv://taha:Myballs12@cluster347.uraihne.mongodb.net/recipeDB?retryWrites=true&w=majority', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
