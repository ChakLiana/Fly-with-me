import { combineReducers } from "redux";
import iventReduser from "./iventReduser";
import currentCoordsReduser from "./currentCoordsReduser";
import currentWeatherReduser from "./currentWeatherReduser";
import userReducer from './userReducer'

const rootReduser = combineReducers({
  user: userReducer,
  ivents: iventReduser,
  curentCoords: currentCoordsReduser,
  currentWeather: currentWeatherReduser,
});

export default rootReduser;
