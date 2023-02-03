import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

import '../style/DoneRecipeCard.css';

const copy = require('clipboard-copy');

function DoneRecipeCard(props) {
  const [shared, setShared] = useState(false);

  const { recipe, index } = props;
  const { id, tags } = recipe;
  const history = useHistory();
  const recipeUrl = `http://localhost:3000/${recipe.type}s/${id}`;

  const firstTags = tags?.slice(0, 2) || [];

  return (
    <div>
      <img
        className="done-recipe-img"
        src={ recipe.image }
        alt={ `done-recipe-${index}` }
        data-testid={ `${index}-horizontal-image` }
        role="presentation"
        onClick={ () => history.push(`/${recipe.type}s/${id}`) }
      />
      <h3
        data-testid={ `${index}-horizontal-name` }
        role="presentation"
        onClick={ () => history.push(`/${recipe.type}s/${id}`) }
      >
        { recipe.name }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.type === 'meal' && `${recipe.nationality} - ${recipe.category}` }
        { recipe?.alcoholicOrNot }
      </h3>
      <h4
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </h4>
      <img
        src={ shareIcon }
        alt="share"
        role="presentation"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          copy(recipeUrl);
          setShared(true);
        } }
      />
      <br />
      { shared && <small>Link copied!</small> }
      <br />
      { firstTags.map((tag) => (
        <span
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { `${tag} ` }
        </span>
      ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

export default DoneRecipeCard;
