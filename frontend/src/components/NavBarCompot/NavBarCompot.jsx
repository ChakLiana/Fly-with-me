import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import SignalCompot from "../Signal/Signal";
// import logo from "./ok.png";       /// тут показано
const Nav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        сюда добавить лого
        {/* <img src={logo} alt={"logo"} width="100" heigth="50" />    /// тут показано */}
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            На главную
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/auth/signout"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Выйти
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/user/flight"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Мои полеты
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/user/cabinet"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Личный кабинет
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/user/cabinet"
                      className="nav-link"
                      activeClassName="active"
                      color="primary"
                    >
                      {
                        <p>
                          Вы зашли как <b> {user.nickName} </b>
                        </p>
                      }
                    </NavLink>
                    {/* <SignalCompot /> */}
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/auth/signup"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Зарегистрироваться
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/auth/signin"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Войти
                    </NavLink>
                  </li>
                </>
              )}

              {/* <li className="nav-item">
                <NavLink
                  exact
                  to="/map"
                  className="nav-link"
                  activeClassName="active"
                >
                  Карта
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
