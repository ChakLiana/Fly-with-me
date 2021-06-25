import YandexMap from "./components/YandexMap/YandexMap";
import ProfileUser from "./Profiles/ProfileUser.jsx";
import NavBarCompot from "./components/NavBarCompot/NavBarCompot";
import Main from "./components/Main/Main";
import {Switch} from 'react-router-dom'

function App() {
  return (
    <div>
     <NavBarCompot /> 
     <Switch>
     <Main />
     </Switch>
    </div>
  );
}

export default App;
