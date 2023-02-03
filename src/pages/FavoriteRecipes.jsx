import React, { useState } from 'react';
import Header from '../components/Header';

import DoneOrFavoriteRecipeCard from '../components/DoneOrFavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes,
    setFavoriteRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const handleTypeFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(favoriteRecipes);
    else {
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  const handleFavorites = (id) => {
    const favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    const newFilteredRecipes = filteredRecipes.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes([...JSON.parse(localStorage.getItem('favoriteRecipes'))]);
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div>
      <Header title="Favorite Recipes" profile />
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
      { filteredRecipes.map((favoriteRecipe, i) => (<DoneOrFavoriteRecipeCard
        key={ `favorite-recipe-card-${i}` }
        index={ i }
        recipe={ favoriteRecipe }
        doneOrFav="favorite"
        handleFavorites={ handleFavorites }
      />))}
    </div>
  );
}

export default FavoriteRecipes;
