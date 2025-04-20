// const http = require('http')
// const fs = require('fs')
// const port = 3000

// const server = http.createServer(function(req, res) {
//     let filePath = ''
//     let statusCode = 200

//     if (req.url === '/') {
//         filePath = './index.html'
//     } else if (req.url === '/recipes') {
//         filePath = './recipes.html'
//     } else if (req.url === '/about') {
//         filePath = './about.html'
//     } else {
//         filePath = null
//         statusCode = 404
//     }

//     if (filePath) {
//         fs.readFile(filePath, function (error, data) {
//             if (error) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' })
//                 res.write('Internal Server Error')
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' })
//                 res.write(data)
//                 res.end()
//             }
//         })
//     } else {
//         res.writeHead(statusCode, { 'Content-Type': 'text/html' })
//         res.write('<h1>404 - Page Not Found</h1>')
//         res.end()
//     }
// })

// server.listen(port, function (error) {
//     if (error) {
//         console.log('Something went wrong', error)
//     } else {
//         console.log('Server is listening on port ' + port)
//     }
// })

const http = require('http');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const port = 3000;

function serveHTML(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function serveRecipes(res) {
    const results = [];

    fs.createReadStream('recipes-sample.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });

            let html = `
                <html>
                <head><title>Recipes</title></head>
                <body>
                    <h1>Recipes</h1>
                    ${results.map(recipe => `
                        <div style="margin-bottom: 30px;">
                            <h2>${recipe.Title}</h2>
                            <p><strong>Ingredients:</strong> ${recipe.Ingredients}</p>
                            <p><strong>Instructions:</strong> ${recipe.Instructions}</p>
                            <hr>
                        </div>
                    `).join('')}
                </body>
                </html>
            `;
            res.end(html);
        });
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serveHTML(path.join(__dirname, 'pages', 'index.html'), res);
    } else if (req.url === '/about') {
        serveHTML(path.join(__dirname, 'pages', 'about.html'), res);
    } else if (req.url === '/recipes') {
        serveRecipes(res);
    } else {
        serveHTML(path.join(__dirname, 'pages', 'error.html'), res);
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});