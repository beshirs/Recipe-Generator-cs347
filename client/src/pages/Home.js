import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
        <div class="main-content">
            <h1> Recipe Generator </h1>
            <h2> App </h2>
            <p>Find the best!</p>
        </div>
      <div className="cta-buttons">
        <Link to="/search" className="btn btn-primary">Search Recipes</Link>
        <Link to="/recipes" className="btn btn-secondary">Browse All Recipes</Link>
      </div>
    </div>
  );
}

export default Home;