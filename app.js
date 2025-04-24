// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');

// const port = 3000;

// function serveHTML(filePath, res) {
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             res.writeHead(500);
//             res.end('Server Error');
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(data);
//         }
//     });
// }

// function serveRecipes(res) {
//     const results = [];

//     fs.createReadStream('recipes-sample.csv')
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             res.writeHead(200, { 'Content-Type': 'text/html' });

//             let html = `
//                 <html>
//                 <head><title>Recipes</title></head>
//                 <body>
//                     <h1>Recipes</h1>
//                     ${results.map(recipe => `
//                         <div style="margin-bottom: 30px;">
//                             <h2>${recipe.Title}</h2>
//                             <p><strong>Ingredients:</strong> ${recipe.Ingredients}</p>
//                             <p><strong>Instructions:</strong> ${recipe.Instructions}</p>
//                             <hr>
//                         </div>
//                     `).join('')}
//                 </body>
//                 </html>
//             `;
//             res.end(html);
//         });
// }

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         serveHTML(path.join(__dirname, 'pages', 'index.html'), res);
//     } else if (req.url === '/about') {
//         serveHTML(path.join(__dirname, 'pages', 'about.html'), res);
//     } else if (req.url === '/recipes') {
//         serveRecipes(res);
//     } else {
//         serveHTML(path.join(__dirname, 'pages', 'error.html'), res);
//     }
// });

// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });




// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');

// const port = 3000;

// function serveHTML(filePath, res) {
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             res.writeHead(500);
//             res.end('Server Error');
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(data);
//         }
//     });
// }

// function serveRecipes(res) {
//     const results = [];

//     fs.createReadStream('recipes-sample.csv')
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             fs.readFile(path.join(__dirname, 'pages', 'recipes.html'), 'utf8', (err, template) => {
//                 if (err) {
//                     res.writeHead(500);
//                     res.end('Server Error');
//                     return;
//                 }

//                 const recipeHtml = results.map(recipe => `
//                     <div style="margin-bottom: 30px;">
//                         <h2>${recipe.Title}</h2>
//                         <p><strong>Ingredients:</strong> ${recipe.Ingredients}</p>
//                         <p><strong>Instructions:</strong> ${recipe.Instructions}</p>
//                         <hr>
//                     </div>
//                 `).join('');

//                 const finalHtml = template.replace('<!-- RECIPE_LIST -->', recipeHtml);

//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.end(finalHtml);
//             });
//         });
// }

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         serveHTML(path.join(__dirname, 'pages', 'index.html'), res);
//     } else if (req.url === '/about') {
//         serveHTML(path.join(__dirname, 'pages', 'about.html'), res);
//     } else if (req.url === '/recipes') {
//         serveRecipes(res);
//     } else {
//         serveHTML(path.join(__dirname, 'pages', 'error.html'), res);
//     }
// });

// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = 3000;

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

// Home page: Search form
app.get('/', (req, res) => {
  res.send(`
    <h2>Recipe Search</h2>
    <form method="GET" action="/search">
      <input name="ingredient" placeholder="Enter an ingredient..." required />
      <button type="submit">Search</button>
    </form>
    <p><a href="/about">About</a> | <a href="/recipes">All Recipes</a> | <a href="/home"> Home</a></p>
  `);
});

// Search route
app.get('/search', (req, res) => {
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

  res.send(`<h2>Results for "${query}"</h2>${html}<p><a href="/">Back to Search</a></p>`);
});

// About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

// All recipes page
app.get('/recipes', (req, res) => {
  if (recipes.length === 0) {
    return res.send('No recipes available.');
  }
//   res.sendFile(path.join(__dirname, 'pages', 'recipes.html'))

  const html = recipes.map(r => `
    <h3>${r.Title}</h3>
    <p><strong>Ingredients:</strong> ${r.Cleaned_Ingredients}</p>
    <p><strong>Instructions:</strong> ${r.Instructions}</p>
    <hr/>
  `).join('');

  res.send(`<h2>All Recipes</h2>${html}<p><a href="/">Back to Search</a></p>`);
});

// Handle all other routes with a 404 error
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p>This route does not exist on this server.</p><a href="/">Go back home</a>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});