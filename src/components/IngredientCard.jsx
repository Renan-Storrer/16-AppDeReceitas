import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ ingredient, index }) {
  const [checked, setchecked] = useState(false);

  return (
    <label
      htmlFor={ `input${index}` }
      data-testid={ `${index}-ingredient-step` }
      key={ index }
      style={ { textDecoration: checked
        ? 'line-through solid rgb(0, 0, 0)' : '' } }
    >
      <input
        type="checkbox"
        name={ `input${index}` }
        value={ index }
        checked={ checked }
        onChange={ () => setchecked(!checked) }
      />
      { ingredient.name }
    </label>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.shape({
    name: PropTypes.string,
  }),
}.isRequired;

export default IngredientCard;
