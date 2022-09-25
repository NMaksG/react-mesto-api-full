import { Link, Route, Switch } from 'react-router-dom';
import logoHeader from '../images/logo-header.svg';

export default function Header({ userData, onLogout, onMenuClick, isMenuOpen, onMenuCloseClick }) {

  function handleMenuClick() {
    onMenuClick();
  }

  function handleMenuCloseClick() {
    onMenuCloseClick();
  }
  
  function handleMenuCloseLogout() {
    onMenuCloseClick();
    onLogout();
  }

  return(
  <header className="header">
    <div className={`header__login header__login_menu ${isMenuOpen && 'header__login-active'}`}>
      {userData}
      <p className="header__link header__link_menu header__link_color" onClick={handleMenuCloseLogout}>Выйти</p>
    </div>
    <div className="header__container">
    <a href="##"><img className="header__logo" src={logoHeader} alt="Логотип Место"/></a>
    <Switch>
      <Route exact path="/">
        <button className={`header__close-menu ${isMenuOpen ? 'header__close-menu_active' : ''}`} type="button" aria-label="Закрыть" onClick={handleMenuCloseClick}></button>
        <div className={`header__menu ${isMenuOpen ? 'header__menu_remove' : ''}`} onClick={handleMenuClick}>&#9776;</div>
        <div className="header__login">
          {userData}
          <p className="header__link header__link_color" onClick={onLogout}>Выйти</p>
        </div>
      </Route>
      <Route path="/sign-in">
      <Link className="header__link header__link_indent" to="/sign-up">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
      <Link className="header__link header__link_indent" to="/sign-in">Вход</Link>
      </Route>
    </Switch>
    </div>
  </header>
  );
}