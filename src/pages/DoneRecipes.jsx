import React, { useState } from 'react';
import Header from '../components/Header';

import DoneOrFavoriteRecipeCard from '../components/DoneOrFavoriteRecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const handleTypeFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(doneRecipes);
    else {
      const filtered = doneRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" profile />
      <div>
        <button
          type="button"
          value="meal"
          data-testid="filter-by-meal-btn"
          onClick={ handleTypeFilter }
        >
          Meals
        </button>
        <button
          type="button"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleTypeFilter }
        >
          Drinks
        </button>
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ handleTypeFilter }
        >
          All
        </button>
      </div>
      { filteredRecipes.map((doneRecipe, i) => (<DoneOrFavoriteRecipeCard
        key={ `done-recipe-card-${i}` }
        index={ i }
        recipe={ doneRecipe }
        doneOrFav="done"
        handleFavorites=""
      />))}
    </div>
  );
}

export default DoneRecipes;
