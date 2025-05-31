import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Fetched recipes count:', data.length);
        setRecipes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleToggleSection = (index, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [section]: !prev[index]?.[section]
      }
    }));
  };

  const saveToLocalStorage = (recipe) => {
    const existing = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const isDuplicate = existing.some((r) => r.Name === recipe.Name || r.Title === recipe.Title);
    if (!isDuplicate) {
      localStorage.setItem('myRecipes', JSON.stringify([...existing, recipe]));
      alert('Recipe saved successfully!');
    } else {
      alert('This recipe is already saved!');
    }
  };

  if (loading) return <div className="loading">Loading recipes...</div>;
  if (error) return <div className="error">{error}</div>;
  if (recipes.length === 0) return <div className="no-recipes">No recipes available.</div>;

  return (
    <div className="page">
      <h2>All Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            expanded={expandedSections[index]}
            onToggleSection={(section) => handleToggleSection(index, section)}
            saveToLocalStorage={saveToLocalStorage}
          />
        ))}
      </div>
    </div>
  );
}

export default AllRecipes;
