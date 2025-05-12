import React, { useState } from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = useState(false);

  // Format ingredients for display
  const ingredients = recipe.Cleaned_Ingredients
    ? recipe.Cleaned_Ingredients.split(',').map(ingredient => ingredient.trim())
    : [];

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{recipe.Title}</h3>
      
      <div className="recipe-ingredients">
        <h4>Ingredients:</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className={`recipe-instructions ${expanded ? 'expanded' : ''}`}>
        <h4>Instructions:</h4>
        <p>{recipe.Instructions}</p>
      </div>
      
      {recipe.Instructions && recipe.Instructions.length > 100 && (
        <button 
          className="expand-button" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

export default RecipeCard;