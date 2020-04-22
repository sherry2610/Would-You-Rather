import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router} from 'react-router-dom'
import "./index.css";
import App from "./components/App";
import reducer from "./reducers";
import middleware from "./middlewares";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>
  ,

  document.getElementById("root")
);
