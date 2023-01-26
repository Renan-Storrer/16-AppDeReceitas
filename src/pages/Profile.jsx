import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <Header title="Profile" profile />
      <div>
        <h4 data-testid="profile-email">{ email.email }</h4>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ handleDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ handleFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer title="Footer" />
    </div>
  );
}

export default Profile;
