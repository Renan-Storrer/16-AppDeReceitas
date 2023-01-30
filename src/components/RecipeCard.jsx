import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

function RecipeCard(props) {
  const history = useHistory();
  const location = useLocation();
  const { index, recipe } = props;
  let picture = '';
  let name = '';
  let id = '';

  if (recipe.strMeal) {
    picture = recipe.strMealThumb;
    name = recipe.strMeal;
    id = recipe.idMeal;
  } else {
    picture = recipe.strDrinkThumb;
    name = recipe.strDrink;
    id = recipe.idDrink;
  }

  return (
    <div
      role="presentation"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${location.pathname}/${id}`) }
    >
      <img
        src={ picture }
        alt={ `recipe-${index}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }),
}.isRequired;

export default RecipeCard;
