import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, profile, search } = props;
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchButton = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header>
      { profile && <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        role="presentation"
        onClick={ () => history.push('/profile') }
      /> }
      { search
        && (
          <div>
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
              role="presentation"
              onClick={ handleSearchButton }
            />
            { showSearchBar && <input
              type="text"
              name="searchInput"
              id="search-input"
              data-testid="search-input"
            /> }
          </div>
        ) }
      <h2 data-testid="page-title">{ title }</h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;

export default Header;
