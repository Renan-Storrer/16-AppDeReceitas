import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import RecommendationCard from '../components/RecommendationCard';

import '../style/RecipeDetails.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const location = useLocation();
  const history = useHistory();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [keyName, setKeyName] = useState('');
  const [recCategory, setRecCategory] = useState('');
  const [showStartRecipeBtn, setShowStartRecipeBtn] = useState(true);
  const [continueBtn, setContinueBtn] = useState(false);
  const [shared, setShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesLocalStorage,
    setFavoritesLocalStorage] = useState(localStorage.getItem('favoriteRecipes'));
  const { searchResult } = useContext(SearchContext);
  const YT = 32;
  const MAX_RECOMENDATION = 6;

  let recomendations = [];

  if (searchResult[recCategory]) {
    recomendations = searchResult[recCategory].slice(0, MAX_RECOMENDATION);
  }

  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes'))];
    const isDone = doneRecipes.find((doneRecipe) => doneRecipe.id === id);
    if (isDone) setShowStartRecipeBtn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      const favorite = favorites.find((favRecipe) => favRecipe.id === id);
      if (favorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  }, [id, favoritesLocalStorage]);

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

  useEffect(() => {
    if (recipe) {
      const recipeIngredients = [];
      for (let i = 1; i < 100; i += 1) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) recipeIngredients.push({ ingredient, measure });
        else break;
      }
      setIngredients(recipeIngredients);
    }
  }, [recipe]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes[category]) setContinueBtn(true);
      else setContinueBtn(false);
    }
  }, [category, location.pathname]);

  const handleFavorites = () => {
    let favorites = [];
    const favorite = {
      id,
      type: keyName.toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe[`str${keyName}`],
      image: recipe[`str${keyName}Thumb`],
    };

    if (!isFavorite) {
      if (localStorage.getItem('favoriteRecipes')) {
        favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      }
      favorites.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      const favorites2 = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites2));
    }

    setFavoritesLocalStorage(localStorage.getItem('favoriteRecipes'));
  };

  return (
    <>
      { ingredients && (
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
          <div>
            <img
              src={ shareIcon }
              alt="share"
              role="presentation"
              data-testid="share-btn"
              onClick={ () => {
                copy(`http://localhost:3000${location.pathname}`);
                setShared(true);
              } }
            />
            <img
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="share"
              role="presentation"
              data-testid="favorite-btn"
              onClick={ handleFavorites }
            />
          </div>
          { shared && <small>Link copied!</small> }
          <p
            data-testid="instructions"
          >
            { recipe.strInstructions }
          </p>
          { category === 'meals' && recipe.strYoutube && <iframe
            title="recipe-video"
            width="420"
            height="315"
            src={ `http://www.youtube.com/embed/${recipe?.strYoutube.slice(YT)}` }
            data-testid="video"
          /> }
        </div>)}
      <div className="recommendation-container">
        { recomendations
          .map((recomendation, i) => (
            <RecommendationCard
              key={ `recipe-card-${i}` }
              index={ i }
              recipe={ recomendation }
            />))}
      </div>
      { showStartRecipeBtn && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${location.pathname}/in-progress`) }
        >
          { continueBtn ? 'Continue Recipe' : 'Start Recipe' }
        </button>)}
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
