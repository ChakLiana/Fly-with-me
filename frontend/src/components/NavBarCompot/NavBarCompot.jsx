import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import SignalCompot from "../Signal/Signal";
import logo from "./Fly with me-logos_black.png";
const Nav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container ">
        <img src={logo} alt={"logo"} style={{ width: "150px" }} />

        <div className="container-fluid d-flex align-items-center ">
          <div className="collapse navbar-collapse  " id="navbarNav ">
            <ul className="navbar-nav container-fluid d-flex align-items-center justify-content-between">
              <Link className="navbar-brand" to="/">
                На главную
              </Link>
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
                    ></NavLink>
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
