import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/recipes');
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const data = await response.json();
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (recipes.length === 0) {
    return <div className="no-recipes">No recipes available.</div>;
  }

  return (
    <div className="all-recipes">
      <h2>All Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default AllRecipes;