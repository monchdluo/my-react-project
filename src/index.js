import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "../src/redux/store";
import App from "./App";
import "./index.less";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
