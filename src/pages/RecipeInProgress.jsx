import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeInProgress(props) {
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState('');
  const [keyName, setKeyName] = useState('');

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setRecipe(json[category][0]);
  }, [url, category]);

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('meals');
      setKeyName('Meal');
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('drinks');
      setKeyName('Drink');
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  const ingredientsList = () => {
    const ingredients = [];
    const size = 20;

    for (let i = 1; i < size; i++) {
      if (recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`]) {
        const name = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];  
        ingredients.push({ name, measure });
      }
    }

    console.log(ingredients)
  
    return ingredients;
  }

  return (
    <div>
      <h1 data-testid="recipe-title">Recipe in Progress</h1>
      <img
        src={ recipe[`str${keyName}Thumb`] }
        alt={ recipe[`id${keyName}`] }
        data-testid="recipe-photo"
        width="400px"
      />

      <br />

      <button
        type="button"
        data-testid="share-btn"
        // onClick={ handleShare }
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        // onClick={ handleFavorite }
      >
        Favorite
      </button>
      <button
        type="button"
        data-testid="recipe-category"
        // onClick={ handleCategory }
      >
        Category
      </button>

      <h5 data-testid="instructions">{ recipe.strInstructions }</h5>

      <br />

      { ingredientsList().map((ingredient, index) => (
        <label
          htmlFor={ `input${index}` }
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input type="checkbox" name={ `input${index}` } />
          { ingredient.name }
        </label>
      ))}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        // onClick={ handleFinish }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string, }),
  }).isRequired };

export default RecipeInProgress;
