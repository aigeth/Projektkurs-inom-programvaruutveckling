import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Start from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

/*Renders the main initial component */
ReactDOM.render(
  <React.StrictMode>
    <Start />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
