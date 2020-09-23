import React, { Component } from "react";
import Addkeypage from "../addkeypage/Addkeypage";
import Newplatformpage from "../newplatformpage/Newplatformpage";
import Newregionpage from "../newregionpage/Newregionpage";

import Addonekeypage from "../addkeypage/Addonekeypage";

import Removekeypage from "../removekeypage/Removekeypage";
import Manageuserspage from "../manageuserspage/Manageuserspage";
import Adduserpage from "../manageuserspage/Adduserpage";
import TrackUserActivityPage from "../manageuserspage/TrackUserActivity";
import ViewKeyspage from "../viewkeyspage/Viewkeyspage";
import Addmorekeypage from "../addkeypage/Addmorekeypage";
import NavbarOptions from "./Navbar";
import "../index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Newgamepage from "../newgamepage/Newgamepage";

//@Baran Polat

/*Represents the menu component containing all the menu-options components */
class Menu extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    }
  }
  /* This function is called when logging out*/
  handleLogout() {
    localStorage.clear();
    this.props.history.push("/");
  }

  /*Handles the routing between all the pages, rendering the relevent page based on what 
  option has been chosen */
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/menu"
            component={() => <NavbarOptions handleLogout={this.handleLogout} />}
          />
          <header className="App-header">
            <Switch>
              <Route path="/menu/addkey" exact component={Addkeypage} />
              <Route path="/menu/removekey" component={Removekeypage} />
              <Route path="/menu/viewkeys" component={ViewKeyspage} />

              <Route path="/menu/newplatform" component={Newplatformpage} />
              <Route path="/menu/newregion" component={Newregionpage} />

              <Route path="/menu/addkey/onekey" component={Addonekeypage} />
              <Route path="/menu/manageusers" exact component={Manageuserspage} />
              <Route path="/menu/manageusers/add" component={Adduserpage} />
              <Route path="/menu/manageusers/useractivity" component={TrackUserActivityPage} />
              <Route path="/menu/addkey/morekeys" component={Addmorekeypage} />
              <Route path="/menu/newgame" component={Newgamepage} />
            </Switch>
          </header>
        </div>
      </Router>
    );
  }
}

export default Menu;
