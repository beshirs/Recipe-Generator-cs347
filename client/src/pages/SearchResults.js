import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

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
        console.log('API Response:', data); // Add this line
        console.log('First recipe:', data[0]); // And this line
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

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="no-results">
        <h2>No recipes found with "{ingredient}"</h2>
        <p>Try searching for a different ingredient.</p>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Results for "{ingredient}"</h2>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <Link to="/search" className="back-link">Back to Search</Link>
    </div>
  );
}

export default SearchResults;