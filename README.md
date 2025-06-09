# Cookly

## Description

**Cookly** is a web application that allows users to discover recipes based on ingredients they already have.

Instead of requiring users to browse long lists or enter full recipe names, Cookly enables them to input one or more ingredients (e.g., "eggs", "spinach", etc.) and instantly receive a list of suggested recipes. The app is built with a user-first approach—minimalist, responsive, and quick to use.

Saved recipes are stored locally, and all recipe data is cleaned and stored in a MongoDB database.

---

## Getting Started 1: Using Docker

### Install dependencies

- Ensure Node.js is installed (node.js download on google) 
- Ensure Docker Desktop are installed and running
- Ensure mongoose (MongoDB/pymongo) is installed (pip3 install)
- Clone this repository:

``` bash
git clone https://github.com/beshirs/Recipe-Generator-cs347.git
cd Recipe-Generator-cs347
```

Backend Setup
``` bash
cd server
npm install express
```

Frontend Setup (Note: During installation, you may see vulnerability warnings from npm. These are common and can typically be ignored unless they block functionality)
``` bash
cd ../client
npm install express
```


### Run the application
```bash
cd ..
```
In the root folder, run both the frontend and backend:

``` bash
docker-compose up --build
```

Docker will automatically build backend and frontend services, with starting a MongoDB container.

To use our app: open http://localhost:3000

---

## Existing Features
- Search recipes by ingredient
- Display recipe title, ingredients, and instructions
- Toggle to expand long instructions
- Save favorite recipes to local storage
- View all recipes from the database

## What We Learned
Working on this project over the course of the term gave us hands-on expierence with various devleopment tools such as: 
- Docker Desktop
- MongoDB Atlas
- Node.js/Express
- React
- Jest Unit Testing
- Project Management(Sprints/Status Reports)
