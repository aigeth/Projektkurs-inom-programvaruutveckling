import React, { Component } from "react";
import Select from "react-select";
import Data from "../Data";
//@Baran Polat

/* Class representing the newregion page */
class Newregionpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      message: "",
    };
  }

  /*This function is called whenever the user selects a platform. 
  Sets the 'region' attribute*/
  changeHandler = (event) => {
    let value = event.target.value;
    this.setState({ region: value });
  };

  /*This function is called whenever the user adds the region, which will send the data to the backend
  if something goes wrong,"Error: an error occured" will be typed out . */
  handleAddRegion = (event) => {
    event.preventDefault();
    var data = new Data();

    if (this.state.region.length !== 0) {
      data.addRegion(this.state.region).then((responseJson) => {
        if (responseJson.response) {
          this.setState({ message: responseJson.response });
        } else {
          this.setState({ message: "Error: an error occured" });
        }
      });
      this.setState({
        region: "",
      });
    } else {
      this.setState({
        message: "Error: This field cannot be empty",
      });
    }
  };

  render() {
    return (
      <form>
        <h1 style={{ color: "black" }} className="p-4">
          Add your region
        </h1>
        <div style={{ color: "black", width: 300, margin: "auto" }}>
          Region
          <input
            placeholder="Enter region"
            class="form-control"
            name="region"
            value={this.state.region}
            onChange={this.changeHandler}
          />
          <text className="text-muted" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
        </div>
        <button
          className="btn btn-secondary btn-md m-2"
          onClick={this.handleAddRegion}
        >
          Add region
        </button>
      </form>
    );
  }
}
export default Newregionpage;
