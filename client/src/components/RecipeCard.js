import React from 'react';
import './RecipeCard.css';

function RecipeCard({ 
  recipe, 
  expanded, 
  onToggleSection, 
  onRemove,
  saveToLocalStorage,
  showSaveButton = true
}) {
  // checks if saveToLocalStorage is an empty function
  const isStaticSaveButton = saveToLocalStorage?.toString() === '() => {}';

  return (
    <div className={`recipe-card ${expanded?.ingredients || expanded?.instructions ? 'expanded' : ''}`}>
      <h3 className="recipe-card-title">{recipe.title || recipe.Name || 'Untitled Recipe'}</h3>
      
      <div className="recipe-card-content">
        <div className="recipe-buttons-container">
          <button 
            onClick={() => onToggleSection('ingredients')} 
            className="btn btn-primary recipe-button"
          >
            {expanded?.ingredients ? 'Hide Ingredients' : 'Show Ingredients'}
          </button>
          <button 
            onClick={() => onToggleSection('instructions')} 
            className="btn btn-primary recipe-button"
          >
            {expanded?.instructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
          {showSaveButton && saveToLocalStorage && (
            <button 
              onClick={isStaticSaveButton ? undefined : () => saveToLocalStorage(recipe)}
              className={`btn btn-secondary recipe-button ${isStaticSaveButton ? 'static-button' : ''}`}
            >
              Save Recipe
            </button>
          )}
          {onRemove && (
            <button 
              onClick={onRemove} 
              className="btn btn-secondary recipe-button"
            >
              Remove Recipe
            </button>
          )}
        </div>

        <div className={`recipe-section ${expanded?.ingredients ? 'expanded' : ''}`}>
          <p className="recipe-section-title">Ingredients:</p>
          <ul className="recipe-ingredients-list">
            {Array.isArray(recipe.ingredients || recipe.Ingredients) ? (
              (recipe.ingredients || recipe.Ingredients).map((item, i) => (
                <li key={i}>{item}</li>
              ))
            ) : (
              <li>{recipe.ingredients || recipe.Ingredients || 'None listed'}</li>
            )}
          </ul>
        </div>

        <div className={`recipe-section ${expanded?.instructions ? 'expanded' : ''}`}>
          <p className="recipe-section-title">Instructions:</p>
          <ol className="recipe-instructions-list">
            {Array.isArray(recipe.instructions || recipe.Instructions) ? (
              (recipe.instructions || recipe.Instructions).map((step, i) => (
                <li key={i}>{step}</li>
              ))
            ) : (
              <li>{recipe.instructions || recipe.Instructions || 'No instructions'}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
