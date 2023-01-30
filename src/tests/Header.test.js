import React from 'react';

import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';

import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import Header from '../components/Header';

const PROFILE_BUTTON = 'profile-top-btn';
const SEARCH_BUTTON = 'search-top-btn';
const PAGE_TITLE = 'page-title';

describe('Testes do componente Header', () => {
  it('Verifica que o Header possui as informações corretas nas páginas da aplicação', () => {
    const { history } = renderWithRouterAndContext(<App />);

    act(() => {
      history.push('/meals');
    });

    let profileIcon = screen.getByTestId(PROFILE_BUTTON);
    let searchIcon = screen.getByTestId(SEARCH_BUTTON);
    let title = screen.getByTestId(PAGE_TITLE);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');

    act(() => {
      history.push('/drinks');
    });

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toHaveTextContent('Drinks');

    act(() => {
      history.push('/meals/:id-da-receita');
    });

    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();

    act(() => {
      history.push('/drinks/:id-da-receita');
    });

    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();

    act(() => {
      history.push('/meals/:id-da-receita/in-progress');
    });

    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();

    act(() => {
      history.push('/drinks/:id-da-receita/in-progress');
    });

    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();

    act(() => {
      history.push('/profile');
    });

    profileIcon = screen.getByTestId(PROFILE_BUTTON);
    searchIcon = screen.queryByTestId(SEARCH_BUTTON);
    title = screen.getByTestId(PAGE_TITLE);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toHaveTextContent('Profile');

    act(() => {
      history.push('/done-recipes');
    });

    profileIcon = screen.getByTestId(PROFILE_BUTTON);
    searchIcon = screen.queryByTestId(SEARCH_BUTTON);
    title = screen.getByTestId(PAGE_TITLE);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toHaveTextContent('Done Recipes');

    act(() => {
      history.push('/favorite-recipes');
    });

    profileIcon = screen.getByTestId(PROFILE_BUTTON);
    searchIcon = screen.queryByTestId(SEARCH_BUTTON);
    title = screen.getByTestId(PAGE_TITLE);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toHaveTextContent('Favorite Recipes');

    act(() => {
      history.push('/');
    });

    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  it('Verifica se o botão de profile leva à página correta', () => {
    const { history } = renderWithRouterAndContext(<Header profile />);

    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se o botão de busca funciona corretamente', () => {
    renderWithRouterAndContext(<Header search />);

    let searchBar = screen.queryByTestId('search-input');

    expect(searchBar).not.toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    userEvent.click(searchButton);

    searchBar = screen.getByTestId('search-input');

    expect(searchBar).toBeInTheDocument();
  });
});
