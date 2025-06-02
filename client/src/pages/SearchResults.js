import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

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
        <Link to="/" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="page search-results">
      <h2>Results for "{ingredient}"</h2>
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
      <Link to="/search" className="back-link">Back to Search</Link>
    </div>
  );
}

export default SearchResults;
