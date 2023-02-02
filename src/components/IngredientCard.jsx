import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ ingredient, index, id }) {
  const [checked, setchecked] = useState(
    JSON.parse(localStorage.getItem(`${id}-ingredient-${index}`)) || false,
  );

  const handleCheck = () => {
    setchecked(!checked);
    localStorage.setItem(`${id}-ingredient-${index}`, !checked);
  };

  return (
    <label
      htmlFor={ `input-${id}-${index}` }
      data-testid={ `${index}-ingredient-step` }
      key={ index }
      style={ { textDecoration: checked ? 'line-through solid rgb(0, 0, 0)' : '' } }
    >
      <input
        type="checkbox"
        id={ `input-${id}-${index}` }
        name={ `input-${id}-${index}` }
        value={ index }
        checked={ checked }
        onChange={ handleCheck }
      />
      {ingredient.name}
    </label>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

IngredientCard.defaultProps = {
  index: 0,
};

export default IngredientCard;
