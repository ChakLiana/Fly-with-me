import { applyMiddleware, createStore } from "redux";
import rootReduser from "./redusers/rootReduser";
import initialState from "./initialState";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

// functuion to SAVE object to session store:
const saveStateToSS = (state) => {
  try {
    // storring session storage data in Json formant is 100% success
    const currentState = JSON.stringify(state);

    // save data to Sesion storage:

    window.sessionStorage.setItem("lastState", currentState);
  } catch (error) {
    console.err("SESSION STORAGE ERROR =====> ", error);
  }
};

// function to LOAD object from session storage
const loadStateFromSS = () => {
  try {
    // fetching data fromSS:
    const recievedState = window.sessionStorage.getItem("lastState");
    if (!recievedState) return undefined;
    // do not forget to parse the incoming json
    return JSON.parse(recievedState);
  } catch (error) {
    console.err("LOAD FROM SS ERROR", error);
    return undefined;
  }
};

const stateFromSS = loadStateFromSS();

// Redux store declaration
const store = createStore(
  rootReduser,
  stateFromSS,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// function to continiously save state to session store

store.subscribe(() => {
  saveStateToSS(store.getState());
});

export default store;
