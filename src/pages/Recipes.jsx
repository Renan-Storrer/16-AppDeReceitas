import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes(props) {
  const { title } = props;

  return (
    <div>
      <Header title={ title } profile search />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
