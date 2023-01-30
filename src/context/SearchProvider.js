import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useSearch from '../hooks/useSearch';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const { handleSearch, searchResult, handleFilters } = useSearch();

  const value = useMemo(() => ({
    handleSearch,
    searchResult,
    handleFilters,
  }), [handleSearch, searchResult, handleFilters]);

  return (
    <SearchContext.Provider value={ value }>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
