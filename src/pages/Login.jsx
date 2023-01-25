import React, { useEffect, useState } from 'react';

export default function Login() {
  const [infos, setInfos] = useState({
    isButtonDisabled: true,
    email: '',
    password: '',
  });

  const loginInputValidation = () => {
    const passwordLength = 6;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValid = infos.email.match(emailFormat);
    if (emailValid && infos.password.length > passwordLength) {
      setInfos({
        ...infos,
        isButtonDisabled: false,
      });
    } else {
      setInfos({
        ...infos,
        isButtonDisabled: true,
      });
    }
  };

  const handleValidation = (event) => {
    setInfos({
      ...infos,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    loginInputValidation();
  }, [infos]);

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
        disabled={ infos.isButtonDisabled }
        // onClick= { handleClick }
      >
        Entrar
      </button>

    </form>
  );
}
