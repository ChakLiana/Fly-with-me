import { applyMiddleware, createStore } from "redux";
import rootReduser from "./redusers/rootReduser";
import initialState from "./initialState";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const temp = (state, action) => {
  return state;
};
const store = createStore(
  rootReduser,
  // temp,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
