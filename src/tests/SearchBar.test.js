import React from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';

import pepperMock from './helpers/pepperMock.json';
import fruitMock from './helpers/fruitMock.json';
import EggCreamMock from './helpers/EggCreamMock.json';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

const searchIDbutton = 'search-top-btn';
const searchIDInput = 'search-input';
const filterIDbutton = 'exec-search-btn';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pepperMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth', () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'pepper');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFechDrinks realiza o fecth', () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });
    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'orange');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Verifica se ao clicar no botao buscar com a opcao "first-letter" e o input > 1 e chamado um alert', async () => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'test');

    const ingredientRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao clicar no botao buscar com a opcao "first-letter" e o input > 1 e chamado um alert', async () => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });
    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'test');

    const ingredientRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fruitMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'fruit');

    const ingredientRadio = screen.getByTestId('name-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52957');
    });
  });
});

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(EggCreamMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/drinks');
    });

    const searchButton = screen.getByTestId(searchIDbutton);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchIDInput);
    userEvent.type(searchInput, 'egg cream');

    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);

    const filterButton = screen.getByTestId(filterIDbutton);
    userEvent.click(filterButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/12668');
    });
  });
});
