import React, { useState } from 'react';

import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchButton = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      <img
        src={ searchIcon }
        alt="search"
        data-testid="search-top-btn"
        role="presentation"
        onClick={ handleSearchButton }
      />
      { showSearchBar
      && (
        <div>
          <input
            type="text"
            name="searchInput"
            id="search-input"
            data-testid="search-input"
          />
          <div>
            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                name="button"
              />
              Ingredient
            </label>
            <label htmlFor="name-search-radio">
              <input
                type="radio"
                id="name-search-radio"
                data-testid="name-search-radio"
                name="button"
              />
              Name
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                name="button"
              />
              First letter
            </label>
          </div>
          <button
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>) }
    </div>
  );
}

export default SearchBar;
