import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import UserDetail from "./components/UserDetail/UserDetail";
import Nav from "./components/NavBarCompot/NavBarCompot";
import SignUp from "./components/Forms/SignUp/SignUp";
import SignOut from "./components/Forms/SignOut/SignOut";
import SignIn from "./components/Forms/SignIn/SignIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../src/redux/actions/user.ac";
import Main from "./components/Main/Main";
import UserEdit from "./components/UserEdit/UserEdit";
import Map from "./components/YandexMap/YandexMap";
import Flight from "./components/Flights/Flights";
import UserCabinet from "../src/Profiles/RoleSwitches";
import RoleSwitches from "./components/Forms/SignUp/RoleSwitches";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Nav />

      <div className="container py-5">
        <Switch>
          <PrivateRoute path="/users/:id">
            <UserDetail />
          </PrivateRoute>

          <PrivateRoute path="/map">
            <Map />
          </PrivateRoute>

          <PrivateRoute path="/user/edit">
            <UserEdit />
          </PrivateRoute>

          <PrivateRoute path="/user/flight">
            <Flight />
          </PrivateRoute>
          <PrivateRoute path="/user/cabinet">
            <UserCabinet />
          </PrivateRoute>
          <Route path="/auth/signup">
            {/* <SignUp /> */}
            <RoleSwitches />
          </Route>

          <Route path="/auth/signin">
            <SignIn />
          </Route>

          <Route path="/auth/signout">
            <SignOut />
          </Route>

          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
