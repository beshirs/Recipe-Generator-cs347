import React from 'react';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="about-title">Welcome to <span className="accent">Cookly</span></h1>
        <p className="about-tagline">
          Your smart kitchen companion — find the perfect recipe from what you already have.
        </p>
      </section>

      <section className="about-section">
        <h2>What is Cookly?</h2>
        <p>
          <strong>Cookly</strong> is a simple and powerful web app that helps you discover recipes based on ingredients
          you already have. Whether you’re planning meals, avoiding waste, or just need inspiration, Cookly helps you cook smarter.
        </p>
        <p>
          Our app pulls from a diverse collection of recipes to accommodate a variety of dietary needs, cuisines,
          and skill levels — from student snacks to gourmet meals.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <ul className="about-steps">
          <li>Go to the <strong>Search</strong> page</li>
          <li>Enter ingredients like <em>"chicken, rice"</em> or <em>"tofu, spinach"</em></li>
          <li>Explore matching recipes curated for you</li>
          <li>Click <strong>Save</strong> on favorites — they're added to <strong>My Recipes</strong></li>
          <li>Cook and enjoy!</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Cookly?</h2>
        <p>
          We built Cookly to reduce food waste, speed up dinner decisions, and make home cooking more accessible and fun.
          It’s your go-to app when you’re asking: <em>“What can I make with what I’ve got?”</em>
        </p>
      </section>
    </div>
  );
}

export default About;
