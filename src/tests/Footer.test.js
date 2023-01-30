import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';

describe('Testes do componente Footer', () => {
  const userEmail = 'user@email.com';
  const userPassword = 'supersecurepassword';

  test('se os ícones são carregados corretamente na tela e se direcionam para o caminho carreto', () => {
    const { history } = renderWithRouterAndContext(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEnter = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(buttonEnter);

    expect(history.location.pathname).toBe('/meals');

    const mealsIcon = screen.getByRole('img', { name: /tomeal/i });
    const drinksIcon = screen.getByRole('img', { name: /todrink/i });

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/meals');
  });
});
