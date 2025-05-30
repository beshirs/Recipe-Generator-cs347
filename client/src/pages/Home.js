import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.ingredient.value.trim();
    if (query) {
      navigate(`/search?ingredient=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Cookly</h1>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="ingredient"
          placeholder="Search by ingredient (e.g., eggs, spinach)"
          className="search-input"
          required
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="cta-buttons">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/recipes')}
        >
          Browse All Recipes
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/my-recipes')}
        >
          View Saved Recipes
        </button>
      </div>
    </div>
  );
}

export default Home;
