import React, { useState } from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  const [expanded, setExpanded] = useState(false);

  const title = recipe.Title || recipe.Name || 'Untitled Recipe';
  const ingredientsRaw = recipe.Cleaned_Ingredients || recipe.Ingredients || '';
  const ingredients = ingredientsRaw
    .split(',')
    .map(ing => ing.trim())
    .filter(Boolean); // removes empty strings

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{title}</h3>

      {ingredients.length > 0 && (
        <div className="recipe-ingredients">
          <h4>Ingredients:</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.Instructions && (
        <div className={`recipe-instructions ${expanded ? 'expanded' : ''}`}>
          <h4>Instructions:</h4>
          <p>{recipe.Instructions}</p>
        </div>
      )}

      {recipe.Instructions && recipe.Instructions.length > 120 && (
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
