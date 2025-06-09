# Cookly

## Description

**Cookly** is a web application that allows users to discover recipes based on ingredients they already have.

Instead of requiring users to browse long lists or enter full recipe names, Cookly enables them to input one or more ingredients (e.g., `"eggs"`, `"spinach"`, etc.) and instantly receive a list of suggested recipes. The app is built with a user-first approach—minimalist, responsive, and quick to use.

All recipe data is clean and stored in a MongoDB database.
We use Docker to conatinerize the application, which ensures that it runs the same way on any computer.

---

## Getting Started 1: Using Docker

### Install dependencies

- Ensure Node.js is installed 
- Ensure Docker Desktop are installed and running
- Clone this repository:

```bash
git clone https://github.com/beshirs/Recipe-Generator-cs347.git
cd Recipe-Generator-cs347
```

### Run the application
In the root folder, run both the frontend and backend:

``` bash
docker-compose up --build
```
Docker will automatically build backend and frontend services, with starting a MongoDB container.

To use our app: open http://localhost:3000

The backendruns at http://localhost:3500

---
## Getting Started 2 (Without Docker):

Ensure Node.js, MongoDB Atlas, and all dependiencies are installed

Backend Setup
```bash
cd server
npm install
```
Frontend Setup
```bash
cd ../client
npm install
```
Run the application
```bash
npm run dev
```

## Existing Features
- Search recipes by ingredient
- Display recipe title, ingredients, and instructions
- Toggle to expand long instructions
- Save favorite recipes to local storage
- View all recipes from the database

## Unfinished Features
- User login and authentication
- Dietary filters (e.g., vegan, gluten-free)
- Download saved recipes as PDF
- Share recipe links with others

## What We Learned
-Working on this project over the course of the term gave us hands-on experience with a variety of develoment tools and practices:
-Docker
-MongoDB
-Node.js and Express
-React
-Jest Testing
-Project Managemnt(Sprints/Status Reports)




  
