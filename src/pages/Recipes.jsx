import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';
import RecipeCard from '../components/RecipeCard';
import CategoriesButtons from '../components/CategoriesButtons';

function Recipes(props) {
  const { title } = props;
  const { searchResult } = useContext(SearchContext);
  const MAX_LENGTH = 11;

  return (
    <div>
      <Header title={ title } profile search />
      <CategoriesButtons title={ title } />
      { title.toLowerCase() in searchResult && searchResult[title.toLowerCase()]
        .map((recipe, index) => {
          if (index > MAX_LENGTH) return;
          return (<RecipeCard
            key={ `recipe-card-${index}` }
            recipe={ recipe }
            index={ index }
          />);
        }) }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
