import React from 'react';

import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

import App from '../App';
import CategoriesButtons from '../components/CategoriesButtons';

import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';

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

    const firstRecipe = await screen.findByTestId('0-card-name');
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
    const AllCategory = await screen.findByTestId('All-category-filter');

    expect(firstCategory).toBeInTheDocument();
    expect(lastCategory).not.toBeInTheDocument();
    expect(AllCategory).toBeInTheDocument();
  });

  // it('Verifica se os botões de filtro funcionam corretamente', async () => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mealCategories),
  //   });

  //   renderWithRouterAndContext(<CategoriesButtons title="Meals" />);

  //   const firstCategory = await screen.findByTestId('Beef-category-filter');
  //   const lastCategory = screen.queryByTestId('Vegetarian-category-filter');
  //   const AllCategory = await screen.findByTestId('All-category-filter');

  //   expect(firstCategory).toBeInTheDocument();
  //   expect(lastCategory).not.toBeInTheDocument();
  //   expect(AllCategory).toBeInTheDocument();
  // });
});
