import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppWrapper from "./App";
import reportWebVitals from "./reportWebVitals";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
/* import  {configureStore}  from "./reducers/index"; */
import rootReducer from './reducers/index'

import "antd/dist/antd.css";

// development
 const store = createStore(rootReducer, composeWithDevTools()); 
// production
/* const store = createStore(rootReducer,);  */


ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
