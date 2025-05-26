import React, { useState, useEffect } from 'react';

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (recipes.length === 0) return <p>No recipes available.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Recipes</h2>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{
              background: '#f9f9f9',
              color: '#333',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{recipe.title || recipe.Name || 'Untitled Recipe'}</h3>

            <p><strong>Ingredients:</strong></p>
            <ul>
              {Array.isArray(recipe.ingredients || recipe.Ingredients) ? (
                (recipe.ingredients || recipe.Ingredients).map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <li>{recipe.ingredients || recipe.Ingredients || 'None listed'}</li>
              )}
            </ul>

            <p><strong>Instructions:</strong></p>
            <ol>
              {Array.isArray(recipe.instructions || recipe.Instructions) ? (
                (recipe.instructions || recipe.Instructions).map((step, i) => (
                  <li key={i}>{step}</li>
                ))
              ) : (
                <li>{recipe.instructions || recipe.Instructions || 'No instructions'}</li>
              )}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRecipes;
