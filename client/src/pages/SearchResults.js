import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ingredient = searchParams.get('ingredient');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?ingredient=${encodeURIComponent(ingredient)}`);
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

    if (ingredient) {
      fetchRecipes();
    }
  }, [ingredient]);

  const saveToLocalStorage = (recipe) => {
    const existing = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const isDuplicate = existing.some((r) => r.Name === recipe.Name || r.Title === recipe.Title);
    if (!isDuplicate) {
      localStorage.setItem('myRecipes', JSON.stringify([...existing, recipe]));
    }
  };

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="page no-results">
        <h2>No recipes found with "{ingredient}"</h2>
        <p>Try searching for a different ingredient.</p>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="page search-results">
      <h2>Results for "{ingredient}"</h2>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3 className="recipe-title">{recipe.Name || recipe.Title}</h3>
            <p><strong>Ingredients:</strong> {recipe.Cleaned_Ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.Instructions}</p>
            <button onClick={() => saveToLocalStorage(recipe)} className="btn btn-secondary">
              Save
            </button>
          </div>
        ))}
      </div>
      <Link to="/search" className="back-link">Back to Search</Link>
    </div>
  );
}

export default SearchResults;
