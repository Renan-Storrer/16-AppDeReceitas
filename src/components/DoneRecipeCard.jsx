import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(props) {
  const { recipe, index } = props;
  const { tags } = recipe;
  const firstTags = tags.slice(0, 2);

  return (
    <div>
      <img
        src={ recipe.image }
        alt={ `done-recipe-${index}` }
        data-testid={ `${index}-horizontal-image` }
      />
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.type === 'meal' && `${recipe.nationality} - ` }
        { recipe.category }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
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
          copy('http://localhost:3000');
        } }
      />
      { firstTags.map((tag) => (
        <span
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
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
