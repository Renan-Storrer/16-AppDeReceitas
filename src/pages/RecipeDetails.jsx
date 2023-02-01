import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import RecommendationCard from '../components/RecommendationCard';

import '../style/RecipeDetails.css';

function RecipeDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState('');
  const [keyName, setKeyName] = useState('');
  const [recCategory, setRecCategory] = useState('');
  const { searchResult } = useContext(SearchContext);
  const YT = 32;
  const MAX_RECOMENDATION = 6;

  let recomendations = [];

  if (searchResult[recCategory]) {
    recomendations = searchResult[recCategory].slice(0, MAX_RECOMENDATION);
  }

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
      setRecCategory('drinks');
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('drinks');
      setKeyName('Drink');
      setRecCategory('meals');
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  const ingredients = [];

  for (let i = 1; i < 100; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    } else break;
  }

  return (
    <>
      <div>
        <img
          src={ recipe[`str${keyName}Thumb`] }
          alt="recipe"
          data-testid="recipe-photo"
        />
        <h2
          data-testid="recipe-title"
        >
          { recipe[`str${keyName}`] }
        </h2>
        <h3
          data-testid="recipe-category"
        >
          { recipe.strCategory }
          { category === 'drinks' && <small>{ ` (${recipe.strAlcoholic})` }</small> }
        </h3>
        <ul>
          { ingredients.map((ingredient, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <strong>{ingredient.measure}</strong>
              { ingredient.measure && ' of ' }
              {ingredient.ingredient}
            </li>))}
        </ul>
        <p
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
        { category === 'meals' && recipe.strYoutube && <iframe
          title="recipe-video"
          width="420"
          height="315"
          src={ `https://www.youtube.com/embed/${recipe?.strYoutube.slice(YT)}` }
          data-testid="video"
        /> }
      </div>
      <div className="recommendation-container">
        { recomendations
          .map((recomendation, i) => (
            <RecommendationCard
              key={ `recipe-card-${i}` }
              index={ i }
              recipe={ recomendation }
            />))}
      </div>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
