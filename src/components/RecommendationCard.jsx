import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecommendationCard(props) {
  const history = useHistory();
  const { index, recipe } = props;
  let pathname = '';
  let picture = '';
  let name = '';
  let id = '';

  if (recipe.strMeal) {
    pathname = '/meals';
    picture = recipe.strMealThumb;
    name = recipe.strMeal;
    id = recipe.idMeal;
  } else {
    pathname = '/drinks';
    picture = recipe.strDrinkThumb;
    name = recipe.strDrink;
    id = recipe.idDrink;
  }

  return (
    <div
      className="recommendation-card"
      role="presentation"
      data-testid={ `${index}-recommendation-card` }
      onClick={ () => history.push(`${pathname}/${id}`) }
    >
      <img
        src={ picture }
        alt={ `recommendation-${index}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-recommendation-title` }>{ name }</p>
    </div>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }),
}.isRequired;

export default RecommendationCard;
