import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./startpage/Login";
import Forgot from "./startpage/Forgot";
import Menu from "./menupage/Menu";
//@Baran Polat

/* The initial component rendered in index.js. Handles the routing between all components   */
function Start() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/menu" component={Menu} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}
export default Start;
