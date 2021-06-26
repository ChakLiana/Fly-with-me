import { combineReducers } from "redux";
import iventReduser from "./iventReduser";
import currentCoordsReduser from "./currentCoordsReduser";

const rootReduser = combineReducers({
  ivents: iventReduser,
  curentCoords: currentCoordsReduser
});

export default rootReduser;
