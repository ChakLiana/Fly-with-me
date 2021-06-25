import { applyMiddleware, createStore } from "redux";
import rootReduser from './redusers/rootReduser';
import initialState from './initialState';
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const store = createStore(
  rootReduser,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
