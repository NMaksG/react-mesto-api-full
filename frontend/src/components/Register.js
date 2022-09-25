import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register({ onRegister }) {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(registerData);
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
            value={registerData.email}
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
            value={registerData.password}
            onChange={handleChange}
          />
          <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}