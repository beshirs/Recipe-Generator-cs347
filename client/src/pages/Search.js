import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [ingredient, setIngredient] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchResult?ingredient=${encodeURIComponent(ingredient)}`);
  };

  return (
    <div className="search-page">
      <h2>Recipe Search</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter an ingredient..."
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Search;