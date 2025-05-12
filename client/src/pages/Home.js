import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Recipe Finder</h1>
      <p>Find delicious recipes based on ingredients you have at home.</p>
      <div className="cta-buttons">
        <Link to="/search" className="btn btn-primary">Search Recipes</Link>
        <Link to="/recipes" className="btn btn-secondary">Browse All Recipes</Link>
      </div>
    </div>
  );
}

export default Home;