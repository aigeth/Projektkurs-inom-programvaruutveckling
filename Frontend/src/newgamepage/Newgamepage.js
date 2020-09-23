import React, { Component } from "react";
import Select from "react-select";
import Data from "../Data";
//@Baran Polat

/* Represent the page for adding a game */
class Newgamepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: "",
      message: "",
    };
  }

  /*This function is called whenever the user selects a game.
  Sets the 'game' attribute.  */
  changeHandler = (event) => {
    let value = event.target.value;
    this.setState({ game: value });
  };

  /*This function is called whenever the user adds the game, which will send the data to the backend
  if something goes wrong,"Error: an error occured" will be typed out . */
  handleAddGame = (event) => {
    event.preventDefault();
    var data = new Data();
    if (this.state.game.length !== 0) {
      data.addGame(this.state.game).then((responseJson) => {
        if (responseJson.response) {
          this.setState({ message: responseJson.response });
        } else {
          this.setState({ message: "Error: an error occured" });
        }
      });
      this.setState({
        game: "",
      });
    } else {
      this.setState({
        message: "Error: This field cannot be empty",
      });
    }
  };
  /*Layout for the page */
  render() {
    return (
      <form>
        <h1 style={{ color: "black" }} className="p-4">
          Add your game
        </h1>
        <div style={{ color: "black", width: 300, margin: "auto" }}>
          Game
          <input
            placeholder="Enter game"
            class="form-control"
            name="game"
            value={this.state.game}
            onChange={this.changeHandler}
          />
          <text className="text-muted" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
        </div>
        <button
          className="btn btn-secondary btn-md m-2"
          onClick={this.handleAddGame}
        >
          Add game
        </button>
      </form>
    );
  }
}
export default Newgamepage;
