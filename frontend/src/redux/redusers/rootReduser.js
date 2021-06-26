import { combineReducers } from "redux";
import iventReduser from "./iventReduser";
import currentCoordsReduser from "./currentCoordsReduser";
import currentWeatherReduser from "./currentWeatherReduser";


const rootReduser = combineReducers({
  ivents: iventReduser,
  curentCoords: currentCoordsReduser,
  currentWeather: currentWeatherReduser,
});

export default rootReduser;
