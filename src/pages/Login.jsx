import React, { useCallback, useEffect, useState } from 'react';

export default function Login() {
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const loginInputValidation = useCallback(() => {
    const passwordLength = 6;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValid = infos.email.match(emailFormat);
    if (emailValid && infos.password.length > passwordLength) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [infos.email, infos.password.length]);

  const handleValidation = (event) => {
    setInfos({
      ...infos,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: infos.email }));
  };

  useEffect(() => {
    loginInputValidation();
  }, [loginInputValidation, infos]);

  return (
    <form>
      <input
        data-testid="email-input"
        placeholder="Email"
        type="email"
        name="email"
        value={ infos.email }
        onChange={ handleValidation }
      />

      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
        value={ infos.password }
        name="password"
        onChange={ handleValidation }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isButtonDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>

    </form>
  );
}
