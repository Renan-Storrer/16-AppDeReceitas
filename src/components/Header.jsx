import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, profile, search } = props;

  return (
    <div className="header-component">
      { profile && <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
      /> }
      { search && <img
        src={ searchIcon }
        alt="search"
        data-testid="search-top-btn"
      /> }
      <h2 data-testid="page-title">{ title }</h2>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;

export default Header;
