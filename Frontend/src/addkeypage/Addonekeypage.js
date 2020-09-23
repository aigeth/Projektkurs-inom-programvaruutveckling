import React, { Component, useState } from "react";
import Select from "react-select";
import Data from "../Data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//@Baran Polat

/* Represent the page for adding a single key */
class Addonekeypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      game: "",
      region: [],
      platform: [],
      errorMessage: "",
      successMessage: "",
      games: [],
      platforms: [],
      regions: [],
      startDate: null,
      endDate: null,
    };
    this.handleAddKey = this.handleAddKey.bind(this);
  }

  /*This function runs after the component has been rendered.
    Get the platforms from the database. */
  componentDidMount() {
    var data = new Data();
    data.getPlatforms().then((responseJson) => {
      var platforms = [];
      responseJson.map((platform) => {
        platforms.push({ value: platform.name, label: platform.name });
      });
      this.setState({ platforms: platforms });
    });
    data.getGames().then((responseJson) => {
      var games = [];
      responseJson.map((game) => {
        games.push({ value: game.name, label: game.name });
      });
      this.setState({ games: games });
    });
    data.getRegions().then((responseJson) => {
      var regions = [];
      responseJson.map((region) => {
        regions.push({ value: region.name, label: region.name });
      });
      this.setState({ regions: regions });
    });
  }

  /*This function is called whenever the user selects a game.
  Sets the 'game' attribute. */
  gameChangeHandler = (selectedGame) => {
    if (selectedGame == null) selectedGame = [];
    this.setState({ game: selectedGame });
  };

  /*This function is called whenever the user selects a region.
  Sets the 'region' attribute.  */
  regionChangeHandler = (selectedRegion) => {
    if (selectedRegion == null) selectedRegion = [];
    this.setState({ region: selectedRegion });
  };

  /*This function is called whenever the user selects a platform.
  Sets the 'platform' attribute.  */
  platformChangeHandler = (selectedPlatform) => {
    if (selectedPlatform == null) selectedPlatform = [];
    this.setState({ platform: selectedPlatform });
  };

  /*This function is called whenever the user selects the startdate. 
  Sets the 'startDate' attribute. */
  startDateChangeHandler = (selectedStartDate) => {
    this.setState({ startDate: selectedStartDate });
  };

  /*This function is called whenever the user selects the enddate. 
  Sets the 'endDate' attribute. */
  endDateChangeHandler = (selectedEndDate) => {
    this.setState({ endDate: selectedEndDate });
  };

  /*This function is called whenever the user types in the key-id. 
  Sets the 'id' attribute. */
  changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  /*This function is called whenever the user adds the key, which will send the data to the backend
  if something goes wrong,"Error: an error occured" will be typed out . */
  handleAddKey = (event) => {
    event.preventDefault();
    if (
      this.state.id == "" ||
      this.state.game == [] ||
      this.state.region == [] ||
      this.state.platform == [] ||
      this.state.startDate == null ||
      this.state.endDate == null
    ) {
      this.setState({ message: "Please fill in all fields" });
    } else {
      var data = new Data();
      data
        .addKey({
          id: this.state.id,
          game: {
            name: this.state.game.value,
          },
          region: {
            name: this.state.region.value,
          },
          platform: {
            name: this.state.platform.value,
          },
          startDate: this.state.startDate.toLocaleDateString(),
          endDate: this.state.endDate.toLocaleDateString(),
          uploader: JSON.parse(localStorage.getItem("user")),
        })
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson));
          if (responseJson.response) {
            this.setState({ message: responseJson.response });
            this.setState({
              id: "",
              game: "",
              region: [],
              platform: [],
              startDate: null,
              endDate: null,
            });
          } else {
            this.setState({ message: "Error: an error occured" });
          }
        });
    }
  };

  /* Layout for the page*/
  render() {
    return (
      <form>
        <h1 style={{ color: "black" }} className="p-4">
          Add your key
        </h1>
        <div style={{ color: "black", width: 300, margin: "auto" }}>
          Key-id
          <input
            placeholder="Enter key-id"
            class="form-control"
            name="id"
            value={this.state.id}
            onChange={this.changeHandler}
          />
          <p></p>
          Game title
          <Select
            options={this.state.games}
            onChange={this.gameChangeHandler}
            value={this.state.game}
          />
          <p></p>
          Region
          <Select
            options={this.state.regions}
            onChange={this.regionChangeHandler}
            value={this.state.region}
          />
          <p></p>
          Platform
          <Select
            options={this.state.platforms}
            onChange={this.platformChangeHandler}
            value={this.state.platform}
          />
          <p></p>
          Start date
          <br />
          <DatePicker
            className="form-control"
            selected={this.state.startDate}
            onChange={this.startDateChangeHandler}
            value={this.state.startDate}
            dateFormat="dd/MM/yyy"
          />
          <p></p>
          End date
          <br />
          <DatePicker
            className="form-control"
            selected={this.state.endDate}
            onChange={this.endDateChangeHandler}
            value={this.state.endDate}
            minDate={this.state.startDate}
            dateFormat="dd/MM/yyy"
          />
          <p>
            <text className="text-muted" style={{ fontSize: 15 }}>
              {this.state.message}
            </text>
          </p>
          <button
            className="btn btn-secondary btn-md m-2"
            onClick={this.handleAddKey}
          >
            Add key
          </button>
        </div>
      </form>
    );
  }
}
export default Addonekeypage;
