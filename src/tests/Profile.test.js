import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';

const DONE_BUTTON = 'profile-done-btn';
const FAVORITE_BUTTON = 'profile-favorite-btn';
const LOGOUT_TITLE = 'profile-logout-btn';
const email = 'email-input';
const password = 'password-input';
const emailTest = 'renan@teste.com';
const passwordTest = '0123456';

describe('Testes do componente Profile', () => {
  it('Verifica que o Profile possui as informações corretas nas páginas da aplicação', () => {
    const { history } = renderWithRouterAndContext(<App />);

    userEvent.type(screen.getByTestId(email), emailTest);
    userEvent.type(screen.getByTestId(password), passwordTest);

    const renderButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.click(renderButton);

    userEvent.click(screen.getByTestId('profile-top-btn'));

    const { pathname } = history.location;
    const seg = 3000;

    setTimeout(() => {
      expect(pathname).toBe('/profile');
    }, seg);

    const user = screen.getByText(emailTest);
    const doneBtn = screen.getByTestId(DONE_BUTTON);
    const favoriteBtn = screen.getByTestId(FAVORITE_BUTTON);
    const logoutBtn = screen.getByTestId(LOGOUT_TITLE);

    expect(user).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(screen.getByTestId(DONE_BUTTON));

    setTimeout(() => {
      expect(pathname).toBe('/done-recipes');
    }, seg);

    act(() => {
      history.push('/profile');
    });

    userEvent.click(screen.getByTestId(FAVORITE_BUTTON));

    setTimeout(() => {
      expect(pathname).toBe('/favorite-recipes');
    }, seg);

    act(() => {
      history.push('/profile');
    });

    userEvent.click(screen.getByTestId(LOGOUT_TITLE));

    setTimeout(() => {
      expect(pathname).toBe('/');
    }, seg);
  });
});
