import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { searchInput, toggleTempUnit, getWeatherData } from "./reducers";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  searchInput,
  toggleTempUnit,
  getWeatherData,
});

const middlewares = [];
if (process.env.NODE_ENV !== `production`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares, thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
