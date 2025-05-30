import React from 'react';

function About() {
  return (
    <div className="about-page">
      <div className="about-title">
      <h2>About Recipe Generator</h2>
      </div>
      <div className="about-description"> 
      <p>
        Recipe Finder is a web application designed to help you discover delicious recipes
        based on ingredients you already have in your kitchen or find the best recipes for your macros.
      </p>
      <p>
        Our database contains a wide variety of recipes from different cuisines around the world.
        Simply enter an ingredient, and we'll show you all the amazing dishes you can prepare!
      </p>
      </div>
      <div className="use-title">
      <h2>How to Use:</h2>
      </div>
        <div className="about-instruction">
        <li>Go to the Search page</li>
        <li>Enter an ingredient you'd like to cook with</li>
        <li>Browse through the matching recipes</li>
        <li>Enjoy your delicious meal!</li>
        </div>
    </div>
  );
}

export default About;