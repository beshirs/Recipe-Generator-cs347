import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SearchResults from './pages/SearchResults';
import AllRecipes from './pages/AllRecipes';
import NotFound from './pages/NotFound';
import './App.css';
import MyRecipes from './pages/MyRecipes'; 
import NavSearch from './components/NavSearch';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo-section">
              <Link to="/" className="nav-logo">Cookly</Link>
              <NavSearch />
            </div>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/recipes" className="nav-link">All Recipes</Link>
              </li>
              <li className="nav-item">
                <Link to="/my-recipes" className="nav-link">My Recipes</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;