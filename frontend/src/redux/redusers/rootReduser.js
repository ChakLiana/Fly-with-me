import { combineReducers } from "redux";
import iventReduser from "./iventReduser";

const rootReduser = combineReducers({
  ivents: iventReduser,
});

export default rootReduser;
