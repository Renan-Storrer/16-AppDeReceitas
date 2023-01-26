import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, profile, search } = props;
  const history = useHistory();

  return (
    <header>
      { profile && <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        role="presentation"
        onClick={ () => history.push('/profile') }
      /> }
      { search && <SearchBar /> }
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
