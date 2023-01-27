import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { index, recipe } = props;
  let picture = '';
  let name = '';

  if (recipe.strMeal) {
    picture = recipe.strMealThumb;
    name = recipe.strMeal;
  } else {
    picture = recipe.strDrinkThumb;
    name = recipe.strDrink;
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
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
