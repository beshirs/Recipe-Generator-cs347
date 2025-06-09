import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const navigate = useNavigate();

  const sampleRecipe1 = {
    title: "Classic Margherita Pizza",
    ingredients: [
      "Pizza dough",
      "Fresh mozzarella",
      "Fresh basil leaves",
      "San Marzano tomatoes",
      "Extra virgin olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 500°F with pizza stone",
      "Roll out the pizza dough",
      "Top with crushed tomatoes",
      "Add torn mozzarella pieces",
      "Bake until crust is golden",
      "Finish with fresh basil and olive oil"
    ]
  };

  return (
    <div className="home-container">
      <div className="home-section title-section">
        <h1 className="home-title">Cookly</h1>
        <div className="title-decoration"></div>
      </div>

      <div className="home-section recipes-preview">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <RecipeCard
            recipe={sampleRecipe1}
            expanded={{ ingredients: true, instructions: true }}
            onToggleSection={() => {}}
            showSaveButton={true}
            saveToLocalStorage={() => {}}
          />

          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666', margin: '4px 0 0 0' }}>
            The recipe shown above is just a sample preview. Buttons below may not be fully functional yet.
          </p>
        </div>
      </div>

      <div className="home-section intro-section">
        <div className="intro-content">
          <h2>Welcome to Cookly</h2>
          <p>
            Discover delicious recipes based on ingredients you already have.
            From quick weeknight dinners to impressive dishes, find the perfect
            recipe for any occasion.
          </p>

          <div className="cta-buttons">
            <button
              className="btn btn-primary"
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
      </div>
    </div>
  );
}

export default Home;
