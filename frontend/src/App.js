import YandexMap from "./components/YandexMap/YandexMap";
import ProfileUser from "./Profiles/ProfileUser.jsx";
import NavBarCompot from "./components/NavBarCompot/NavBarCompot";
import Main from "./components/Main/Main";
import Login from './components/auth/Auth/LoginForm'
import Register from './components/auth/Auth/SignupForm'
import { Route,Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import AUTH from './utils/AUTH'

//      


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (!!response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });

      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
	};

  return (
    <div className="App">
     < Switch>
      { loggedIn && (
        <div>
          <NavBarCompot  logout={logout} />
        </div>
       
      )}
      { !loggedIn && (
         <div className="auth-wrapper" style={{paddingTop:40}}>
         <NavBarCompot />
        <Route exact path="/" component={() => <Login login={login}/>} />
       <Route exact path="/main" component={Main}/>
        <Route exact path="/signup" component={Register} /> 
      </div>
      )}
      </Switch>
    </div>
  );
}

export default App;
