import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

import App from '../App';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const MEAL = 'Spicy Arrabiata Penne';
const DRINK = 'Aquamarine';
const FAVORITE_RECIPE_LINK = '/favorite-recipes';
const FIRST_HORIZONTAL_IMAGE = '0-horizontal-image';

describe('Testes da página de Receitas Feitas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  it('Verifica se a página de receitas feitas renderiza corretamente ao iniciar', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(FAVORITE_RECIPE_LINK);
    });

    const mealRecipe = await screen.findByTestId(FIRST_HORIZONTAL_IMAGE);
    const drinkRecipe = await screen.findByTestId('1-horizontal-image');

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();
  });

  it('Verifica se os botões de filtro funcionam corretamente', () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(FAVORITE_RECIPE_LINK);
    });

    let mealRecipe = screen.getByText(MEAL);
    let drinkRecipe = screen.getByText(DRINK);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();

    userEvent.click(mealsButton);

    mealRecipe = screen.getByText(MEAL);
    drinkRecipe = screen.queryByText(DRINK);

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).not.toBeInTheDocument();

    userEvent.click(drinksButton);

    mealRecipe = screen.queryByText(MEAL);
    drinkRecipe = screen.getByText(DRINK);

    expect(mealRecipe).not.toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();

    userEvent.click(allButton);

    mealRecipe = screen.getByText(MEAL);
    drinkRecipe = screen.getByText(DRINK);

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();
  });

  it('Verifica se encaminha para a página de detalhes ao clicar em uma receita', () => {
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push(FAVORITE_RECIPE_LINK);
    });

    let mealRecipe = screen.getByTestId(FIRST_HORIZONTAL_IMAGE);

    userEvent.click(mealRecipe);

    expect(history.location.pathname).toBe('/meals/52771');

    act(() => {
      history.push(FAVORITE_RECIPE_LINK);
    });

    mealRecipe = screen.getByTestId('0-horizontal-name');

    userEvent.click(mealRecipe);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Verifica se uma receita some da tela ao ser desfavoritada', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push(FAVORITE_RECIPE_LINK);
    });

    const mealRecipe = await screen.findByTestId(FIRST_HORIZONTAL_IMAGE);
    const drinkRecipe = await screen.findByTestId('1-horizontal-image');

    const unfavoriteDrinkRecipeButton = await screen.findByTestId('1-horizontal-favorite-btn');

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();

    userEvent.click(unfavoriteDrinkRecipeButton);

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).not.toBeInTheDocument();
  });
});
