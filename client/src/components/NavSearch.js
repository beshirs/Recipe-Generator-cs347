import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavSearch.css';

function NavSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?ingredient=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="nav-search-container">
      <button 
        className="search-icon-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Toggle search"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
      
      <form 
        className={`nav-search-bar ${isExpanded ? 'expanded' : ''}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="nav-search-input"
          placeholder="Search by ingredient (e.g. 'chicken', 'spinach')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="nav-search-submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default NavSearch; 