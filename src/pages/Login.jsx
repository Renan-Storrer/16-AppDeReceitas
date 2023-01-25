import React from 'react';

export default function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        placeholder="Email"
        type="email"
      />

      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar
      </button>

    </form>
  );
}
