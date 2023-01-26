import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Profile" profile />
      <div>
        <h4 data-testid="profile-email">{ email.email }</h4>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer title="Footer" />
    </div>
  );
}

export default Profile;
