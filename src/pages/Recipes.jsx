import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes(props) {
  const { title } = props;

  return (
    <div>
      <Header title={ title } profile search />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
