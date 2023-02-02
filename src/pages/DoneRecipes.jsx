import React from 'react';
import Header from '../components/Header';

import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  return (
    <div>
      <Header title="Done Recipes" profile />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { doneRecipes.map((doneRecipe, i) => (<DoneRecipeCard
        key={ `done-recipe-card-${i}` }
        index={ i }
        recipe={ doneRecipe }
      />))}
    </div>
  );
}

export default DoneRecipes;
