import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../context/SearchContext';

import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState();
  const { handleSearch } = useContext(SearchContext);
  const history = useHistory();
  const { pathname } = history.location;

  const handleSearchButton = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioInput(e.target.value);
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
            value={ searchInput }
            onChange={ handleInputChange }
            data-testid="search-input"
          />
          <div>
            <label htmlFor="ingredient-search-radio">
              <input
                type="radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                value="Ingredient"
                onClick={ handleRadioChange }
                name="button"
              />
              Ingredient
            </label>
            <label htmlFor="name-search-radio">
              <input
                type="radio"
                id="name-search-radio"
                data-testid="name-search-radio"
                value="Name"
                onClick={ handleRadioChange }
                name="button"
              />
              Name
            </label>
            <label htmlFor="first-letter-search-radio">
              <input
                type="radio"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                value="First letter"
                onClick={ handleRadioChange }
                name="button"
              />
              First letter
            </label>
          </div>
          <button
            data-testid="exec-search-btn"
            onClick={ () => handleSearch({ searchInput, radioInput, pathname }) }
          >
            Search
          </button>
        </div>) }
    </div>
  );
}

export default SearchBar;
