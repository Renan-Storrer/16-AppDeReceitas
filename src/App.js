import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/meals"
          render={ () => <Recipes title="Meals" /> }
        />
        <Route
          exact
          path="/drinks"
          render={ () => <Recipes title="Drinks" /> }
        />
        <Route
          exact
          path="/meals/:id-da-receita"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id-da-receita"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
      </Switch>
    </div>
  );
}

export default App;
