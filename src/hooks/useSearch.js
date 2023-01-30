import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useSearch() {
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const [url, setUrl] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();

    if (json.meals === null || json.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    const filter = url.includes('filter.php?c=');

    if (json.meals && json.meals.length === 1 && !filter) {
      history.push(`/meals/${json.meals[0].idMeal}`);
    } else if (json.drinks && json.drinks.length === 1 && !filter) {
      history.push(`/drinks/${json.drinks[0].idDrink}`);
    }

    setSearchResult(json);
  }, [url, history]);

  const handleSearch = (parameters) => {
    const { searchInput, radioInput } = parameters;
    let category = '';

    if (pathname.includes('meals')) category = 'themealdb';
    else category = 'thecocktaildb';

    switch (radioInput) {
    case 'Ingredient':
      setUrl(`https://www.${category}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      break;

    case 'Name':
      setUrl(`https://www.${category}.com/api/json/v1/1/search.php?s=${searchInput}`);
      break;

    case 'First letter':
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setUrl(`https://www.${category}.com/api/json/v1/1/search.php?f=${searchInput}`);
      break;

    default:
      setUrl('');
      break;
    }
  };

  const handleFilters = (filter) => {
    let category = '';

    if (pathname.includes('meals')) category = 'themealdb';
    else category = 'thecocktaildb';

    const filterUrl = `https://www.${category}.com/api/json/v1/1/filter.php?c=${filter}`;

    if (filterUrl === url) {
      setUrl(`https://www.${category}.com/api/json/v1/1/search.php?s=`);
    } else setUrl(filterUrl);
  };

  useEffect(() => {
    if (pathname === ('/drinks')) {
      setUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, [pathname]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  return {
    handleSearch,
    searchResult,
    handleFilters,
  };
}

export default useSearch;
