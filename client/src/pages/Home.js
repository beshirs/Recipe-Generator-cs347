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

  const sampleRecipe2 = {
    title: "Creamy Mushroom Risotto",
    ingredients: [
      "Arborio rice",
      "Mixed mushrooms",
      "White wine",
      "Vegetable broth",
      "Parmesan cheese",
      "Butter and olive oil"
    ],
    instructions: [
      "Sauté mushrooms until golden",
      "Toast rice with onions",
      "Add wine and let it absorb",
      "Gradually add hot broth",
      "Stir until creamy",
      "Finish with parmesan and butter"
    ]
  };

  return (
    <div className="home-container">
      <div className="home-section title-section">
        <h1 className="home-title">Cookly</h1>
        <div className="title-decoration"></div>
      </div>

      <div className="home-section recipes-preview">
        <RecipeCard
          recipe={sampleRecipe1}
          expanded={{ ingredients: true, instructions: true }}
          onToggleSection={() => {}}
          showSaveButton={true}
          saveToLocalStorage={() => {}}
        />
        <div className="home-sectionrecipes-preview-second">
          <RecipeCard
            recipe={sampleRecipe2}
            expanded={false}
            onToggleSection={() => {}}
            showSaveButton={true}
            saveToLocalStorage={() => {}}
          />
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

          {/* 🔔 Note added right before the buttons */}
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            The recipes shown above are just sample previews. Buttons below may not be fully functional yet.
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
