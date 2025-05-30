import React, { useEffect, useState } from 'react';

function MyRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Load saved recipes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('myRecipes')) || [];
    setSavedRecipes(saved);
  }, []);

  // Remove a recipe
  const handleRemove = (indexToRemove) => {
    const updated = savedRecipes.filter((_, index) => index !== indexToRemove);
    setSavedRecipes(updated);
    localStorage.setItem('myRecipes', JSON.stringify(updated));
  };

  return (
    <div className="my-recipes">
      <h2>My Recipes</h2>

      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        savedRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3>{recipe.Name}</h3>
            <p><strong>Ingredients:</strong> {recipe.Ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.Instructions}</p>
            <button onClick={() => handleRemove(index)} className="btn btn-secondary">
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRecipes;
