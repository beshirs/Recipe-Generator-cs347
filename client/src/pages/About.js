import React from 'react';

function About() {
  return (
    <div className="about-page">
      <h2>About Recipe Finder</h2>
      <p>
        Recipe Finder is a web application designed to help you discover delicious recipes
        based on ingredients you already have in your kitchen.
      </p>
      <p>
        Our database contains a wide variety of recipes from different cuisines around the world.
        Simply enter an ingredient, and we'll show you all the amazing dishes you can prepare!
      </p>
      <h3>How to Use</h3>
      <ol>
        <li>Go to the Search page</li>
        <li>Enter an ingredient you'd like to cook with</li>
        <li>Browse through the matching recipes</li>
        <li>Enjoy your delicious meal!</li>
      </ol>
    </div>
  );
}

export default About;