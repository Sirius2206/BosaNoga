import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import headerLogo from "../../assets/img/header-logo.png";

function Header() {
  const [searchVisible, setVisible] = useState(false);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={headerLogo} alt="Bosa Noga" />
      </Link>
      <div className="collapase navbar-collapse" id="navbarMain">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-link" to="/">
            Главная
          </NavLink>
          <NavLink className="nav-link" to="/catalog">
            Каталог
          </NavLink>
          <NavLink className="nav-link" to="/about">
            О магазине
          </NavLink>
          <NavLink className="nav-link" to="/contacts">
            Контакты
          </NavLink>
        </div>
        <div>
          <div className="header-controls-pics">
            <label htmlFor="search"
              data-id="search-expander"
              className="header-controls-pic header-controls-search"
              onClick={() => setVisible(!searchVisible)}
            ></label>
            <div className="header-controls-pic header-controls-cart">
              <div className="header-controls-cart-full">1</div>
              <div className="header-controls-cart-menu"></div>
            </div>
          </div>
          <form
            data-id="search-form"
            className={
              "header-controls-search-form form-inline " +
              (searchVisible ? "" : "invisible")
            }
          >
            <input id="search" className="form-control" placeholder="Поиск" />
          </form>
        </div>
      </div>
    </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
