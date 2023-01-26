import { useCallback, useEffect, useState } from 'react';

function useSearch() {
  const [url, setUrl] = useState('');

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }, [url]);

  const handleSearch = (parameters) => {
    const { searchInput, radioInput, pathname } = parameters;
    let category = '';

    if (pathname === '/meals') category = 'themealdb';
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

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  return {
    handleSearch,
  };
}

export default useSearch;
