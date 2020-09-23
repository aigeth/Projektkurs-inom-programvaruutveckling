import React, { Component } from "react";
import Select from "react-select";
import Data from "../Data";
//@Baran Polat

/* Class representing the newplatform page */
class Newplatformpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: "",
      message: "",
    };
  }

  /*This function is called whenever the user types in the platform.
  Sets the 'platform' attribute */
  changeHandler = (event) => {
    let value = event.target.value;
    this.setState({ platform: value });
  };

  /*This function is called whenever the user adds the platform, which will send the data to the backend
  if something goes wrong,"Error: an error occured" will be typed out . */
  handleAddPlatform = (event) => {
    event.preventDefault();
    var data = new Data();

    if (this.state.platform.length !== 0) {
      data.addPlatform(this.state.platform).then((responseJson) => {
        if (responseJson.response) {
          this.setState({ message: responseJson.response });
        } else {
          this.setState({ message: "Error: an error occured" });
        }
      });
      this.setState({
        platform: "",
      });
    } else {
      this.setState({
        message: "Error: This field cannot be empty",
      });
    }
  };

  /* The layout which is rendered*/
  render() {
    return (
      <form>
        <h1 style={{ color: "black" }} className="p-4">
          Add your platform
        </h1>
        <div style={{ color: "black", width: 300, margin: "auto" }}>
          Platform
          <input
            placeholder="Enter platform"
            class="form-control"
            name="platform"
            value={this.state.platform}
            onChange={this.changeHandler}
          />
          <text className="text-muted" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
        </div>
        <button
          className="btn btn-secondary btn-md m-2"
          onClick={this.handleAddPlatform}
        >
          Add platform
        </button>
      </form>
    );
  }
}
export default Newplatformpage;
