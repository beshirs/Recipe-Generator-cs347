// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 3500
// const fs = require('fs');
// const csv = require('csv-parser');

// let recipes = [];

// // Load recipes on server start
// fs.createReadStream(path.join(__dirname, 'recipes-sample.csv'))
//   .pipe(csv())
//   .on('data', (row) => {
//     if (row['Cleaned_Ingredients']) {
//       row['Cleaned_Ingredients'] = row['Cleaned_Ingredients'].toLowerCase();
//     }
//     recipes.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV loaded.');
//   });

// // Home page: Search form
// app.get('/', (req, res) => {
//   res.send(`
//     <h2>Recipe Search</h2>
//     <form method="GET" action="/search">
//       <input name="ingredient" placeholder="Enter an ingredient..." required />
//       <button type="submit">Search</button>
//     </form>
//     <p><a href="/about">About</a> | <a href="/recipes">All Recipes</a> | <a href="/home"> Home</a></p>
//   `);
// });

// // Search route
// app.get('/search', (req, res) => {
//   const query = req.query.ingredient?.toLowerCase();

//   if (!query) {
//     return res.send('Please provide an ingredient to search.');
//   }

//   const results = recipes.filter(recipe =>
//     recipe['Cleaned_Ingredients']?.includes(query)
//   );

//   if (results.length === 0) {
//     return res.send('No recipes found with that ingredient.');
//   }

//   const html = results.map(r => `
//     <h3>${r.Title}</h3>
//     <p><strong>Ingredients:</strong> ${r.Cleaned_Ingredients}</p>
//     <p><strong>Instructions:</strong> ${r.Instructions}</p>
//     <hr/>
//   `).join('');

//   res.send(`<h2>Results for "${query}"</h2>${html}<p><a href="/">Back to Search</a></p>`);
// });

// // About page
// app.use('/', require('./routes/root'))

// // All recipes page
// app.get('/recipes', (req, res) => {
//   if (recipes.length === 0) {
//     return res.send('No recipes available.');
//   }

//   const html = recipes.map(r => `
//     <h3>${r.Title}</h3>
//     <p><strong>Ingredients:</strong> ${r.Cleaned_Ingredients}</p>
//     <p><strong>Instructions:</strong> ${r.Instructions}</p>
//     <hr/>
//   `).join('');

//   res.send(`<h2>All Recipes</h2>${html}<p><a href="/">Back to Search</a></p>`);
// });

// // Handle all other routes with a 404 error
// app.use((req, res) => {
//   res.status(404).send('<h1>404 - Page Not Found</h1><p>This route does not exist on this server.</p><a href="/">Go back home</a>');
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const fs = require('fs');
const csv = require('csv-parser');

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
app.use(express.static(path.join(__dirname, 'views')));

// Home page ('/' and '/home')
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Search page ('/search') — shows form
app.get('/search', (req, res) => {
  res.send(`
    <h2>Recipe Search</h2>
    <form method="GET" action="/searchResult">
      <input name="ingredient" placeholder="Enter an ingredient..." required />
      <button type="submit">Search</button>
    </form>
    <p><a href="/about">About</a> | <a href="/recipes">All Recipes</a> | <a href="/home"> Home</a></p>
  `);
});

// Search Result page ('/searchResult') — processes search
app.get('/searchResult', (req, res) => {
  const query = req.query.ingredient?.toLowerCase();

  if (!query) {
    return res.send('Please provide an ingredient to search.');
  }

  const results = recipes.filter(recipe =>
    recipe['Cleaned_Ingredients']?.includes(query)
  );

  if (results.length === 0) {
    return res.send('No recipes found with that ingredient.');
  }

  const html = results.map(r => `
    <h3>${r.Title}</h3>
    <p><strong>Ingredients:</strong> ${r.Cleaned_Ingredients}</p>
    <p><strong>Instructions:</strong> ${r.Instructions}</p>
    <hr/>
  `).join('');

  res.send(`<h2>Results for "${query}"</h2>${html}<p><a href="/search">Back to Search</a></p>`);
});

// About page ('/about')
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Recipes page ('/recipes')
app.get('/recipes', (req, res) => {
  if (recipes.length === 0) {
    return res.send('No recipes available.');
  }

  const html = recipes.map(r => `
    <h3>${r.Title}</h3>
    <p><strong>Ingredients:</strong> ${r.Cleaned_Ingredients}</p>
    <p><strong>Instructions:</strong> ${r.Instructions}</p>
    <hr/>
  `).join('');

  res.send(`<h2>All Recipes</h2>${html}<p><a href="/">Back to Home</a></p>`);
});

// 404 page
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p>This route does not exist on this server.</p><a href="/">Go back home</a>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});