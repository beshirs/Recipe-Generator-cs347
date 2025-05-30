# Cookly

## Description

**Cookly** is a web application that allows users to discover recipes based on ingredients they already have.

Instead of requiring users to browse long lists or enter full recipe names, Cookly enables them to input one or more ingredients (e.g., `"eggs"`, `"spinach"`, etc.) and instantly receive a list of suggested recipes. The app is built with a user-first approach—minimalist, responsive, and quick to use.

Saved recipes are stored locally, and all recipe data is cleaned and stored in a MongoDB database.

---

## Getting Started

### Install dependencies

- Ensure Node.js and MongoDB are installed.
- Clone this repository:

```bash
git clone https://github.com/beshirs/Recipe-Generator-cs347.git
cd Recipe-Generator-cs347
```

### Backend setip
 - cd server
 - npm install

### Frontend setup
 - cd ../client
 - npm install

### Run the application
In the root folder, run both the frontend and backend:

``` bash
npm run dev
```
The backend will run at http://localhost:3500

The frontend will run at http://localhost:3000

## Existing Features
- Search recipes by ingredient
- Display recipe title, ingredients, and instructions
- Toggle to expand long instructions
- Save favorite recipes to local storage
- View all recipes from the database


## Todo List
UI improvements, Add filter for dietary restrictions (vegan, gluten-free, etc.), Enable login & user accounts(reaching)


  
