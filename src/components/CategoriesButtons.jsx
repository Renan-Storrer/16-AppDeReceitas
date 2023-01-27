import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CategoriesButtons(props) {
  const [results, setResults] = useState([]);
  const { title } = props;
  let url = '';

  if (title === 'Meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    if (json.meals) setResults(json.meals);
    else setResults(json.drinks);
  }, [url]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const MAX_LENGTH = 4;

  const buttonFunction = (index, category) => (
    <button
      key={ `category-${index}` }
      data-testid={ `${category}-category-filter` }
    >
      { category }
    </button>
  );

  return (
    <div>
      { results
        .map((category, index) => (index <= MAX_LENGTH)
        && buttonFunction(index, category.strCategory)) }
    </div>
  );
}

CategoriesButtons.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default CategoriesButtons;
