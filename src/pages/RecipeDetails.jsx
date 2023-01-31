import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function RecipeDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState({});

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setRecipe(json);
  }, [url]);

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
