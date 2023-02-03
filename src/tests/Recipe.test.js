import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

import App from '../App';
import CategoriesButtons from '../components/CategoriesButtons';

import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

const firstCardName = '0-card-name';
const allCategoriesFilter = 'All-category-filter';

describe('Testes da página de Receitas de Comida', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se a página de comida renderiza corretamente ao iniciar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });

    const firstRecipe = await screen.findByTestId(firstCardName);
    const lastRecipe = await screen.findByTestId('11-card-name');

    expect(firstRecipe).toHaveTextContent('Corba');
    expect(lastRecipe).toHaveTextContent('Pancakes');
  });

  it('Verifica se os botões de filtro possuem o valor correto na página de comida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    renderWithRouterAndContext(<CategoriesButtons title="Meals" />);

    const firstCategory = await screen.findByTestId('Beef-category-filter');
    const lastCategory = screen.queryByTestId('Vegetarian-category-filter');
    const AllCategory = await screen.findByTestId(allCategoriesFilter);

    expect(firstCategory).toBeInTheDocument();
    expect(lastCategory).not.toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();
  });

  it('Verifica se os botões de filtro funcionam corretamente na página de comida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(mealCategories),
      });
    });

    const firstCategory = await screen.findByTestId('Beef-category-filter');
    const AllCategory = await screen.findByTestId(allCategoriesFilter);

    expect(firstCategory).toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();

    const breakfastCategory = screen.getByTestId('Breakfast-category-filter');

    act(() => {
      userEvent.click(breakfastCategory);

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(breakfastMeals),
      });
    });

    const firstRecipe = await screen.findByTestId(firstCardName);
    const fourthRecipe = await screen.findByTestId('3-card-name');

    expect(firstRecipe).toHaveTextContent('Breakfast Potatoes');
    expect(fourthRecipe).toHaveTextContent('Full English Breakfast');

    userEvent.click(AllCategory);

    setTimeout(() => {
      const secondRecipe = screen.getByTestId('1-card-name');
      expect(secondRecipe).toHaveTextContent('Kumpir');
    }, 3000);
  });

  it('Verifica se a página de bebida renderiza corretamente ao iniciar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });

    const firstRecipe = await screen.findByTestId(firstCardName);
    const lastRecipe = await screen.findByTestId('11-card-name');

    expect(firstRecipe).toHaveTextContent('GG');
    expect(lastRecipe).toHaveTextContent('B-52');
  });

  it('Verifica se os botões de filtro possuem o valor correto na página de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndContext(<CategoriesButtons title="Drinks" />);

    const firstCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    const lastCategory = screen.queryByTestId('Soft Drink-category-filter');
    const AllCategory = await screen.findByTestId(allCategoriesFilter);

    expect(firstCategory).toBeInTheDocument();
    expect(lastCategory).not.toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();
  });

  it('Verifica se os botões de filtro funcionam corretamente na página de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(drinkCategories),
      });
    });

    const firstCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    const AllCategory = await screen.findByTestId(allCategoriesFilter);

    expect(firstCategory).toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();

    const cocktailCategory = screen.getByTestId('Cocktail-category-filter');

    act(() => {
      userEvent.click(cocktailCategory);

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(cocktailDrinks),
      });
    });

    const firstRecipe = await screen.findByTestId(firstCardName);
    const fourthRecipe = await screen.findByTestId('3-card-name');

    expect(firstRecipe).toHaveTextContent('\'57 Chevy with a White License Plate');
    expect(fourthRecipe).toHaveTextContent('9 1/2 Weeks');

    userEvent.click(AllCategory);

    setTimeout(() => {
      const secondRecipe = screen.getByTestId('1-card-name');
      expect(secondRecipe).toHaveTextContent('A1');
    }, 3000);
  });

  it('Verifica se direciona corretamente para a página de detalhes ao clicar em uma receita de comida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    const firstRecipe = await screen.findByTestId(firstCardName);

    userEvent.click(firstRecipe);

    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Verifica se direciona corretamente para a página de detalhes ao clicar em uma receita de bebida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/drinks');
    });

    const firstRecipe = await screen.findByTestId(firstCardName);

    userEvent.click(firstRecipe);

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
