import { combineReducers } from "redux";
import iventReduser from "./iventReduser";
import currentCoordsReduser from "./currentCoordsReduser";
import currentWeatherReduser from "./currentWeatherReduser";
import userReducer from './userReducer';
import selectIventReduser from "./selectIventReduser";



const rootReduser = combineReducers({
  user: userReducer,
  ivents: iventReduser,
  selectIvent: selectIventReduser,
  curentCoords: currentCoordsReduser,
  currentWeather: currentWeatherReduser,
});

export default rootReduser;
