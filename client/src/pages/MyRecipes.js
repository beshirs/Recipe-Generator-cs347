import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

function MyRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

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

  const handleToggleSection = (index, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [section]: !prev[index]?.[section]
      }
    }));
  };

  if (savedRecipes.length === 0) {
    return <div className="no-recipes">No saved recipes yet.</div>;
  }

  return (
    <div className="page">
      <h2>My Recipes</h2>
      <div className="recipes-grid">
        {savedRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            expanded={expandedSections[index]}
            onToggleSection={(section) => handleToggleSection(index, section)}
            onRemove={() => handleRemove(index)}
            showSaveButton={false}
          />
        ))}
      </div>
    </div>
  );
}

export default MyRecipes;
