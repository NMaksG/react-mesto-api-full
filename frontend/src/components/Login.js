import { useState } from 'react';

export default function Login({ onLogin }) {
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if(!loginData.email || !loginData.password) {
      return
    }
    onLogin(loginData);
  }

  return(
    <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form
          className="auth__form"
          name="popup-form-name"
          id="name-form"
          onSubmit={handleSubmit}
        >
            <input
              required
              id="email"
              minLength="2"
              maxLength="40"
              className="auth__input"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={loginData.email}
              onChange={handleChange}
              />
            <input
              required
              id="password"
              minLength="2"
              maxLength="200"
              className="auth__input"
              name="password"
              type="password"
              placeholder="Пароль"
              autoComplete="off"
              value={loginData.password}
              onChange={handleChange}
            />
          <button className="auth__button" type="submit">Войти</button>
        </form>
      </div>
  );
}