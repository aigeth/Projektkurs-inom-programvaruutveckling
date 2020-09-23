import React, { Component } from "react";
import { Link } from "react-router-dom";
import Data from "../Data";

/** Forgot class, 
 * used to reset a forgotten password by entering an email that exist in
 * the database. If the email is valid the user will receive an email with further
 * instructions. If not, an error message will appear. Pressing the "Back to login" button
 * redirects the user back to the login page.
 * 
 * @author Kamile Juvencius
 */
class Forgot extends Component {
  /* Initializes the states. */
  constructor(props) {
    super(props);
    this.state = { email: "", message: "", isError: false, errorStatusCode: 200 };
  }
  /* Changes the email state. */
  changeHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  /* This function is called when the user presses the "Reset" button. 
    If the entered email exist in the database, a reset link will be sent to the entered email.
    If not, an error message will appear. */
  resetHandler = (event) => {
    event.preventDefault();

    if (this.state.email.length===0) {
      this.setState({ message: "Error: This field cannot be empty" });
    }
    else {
      var data = new Data();
      data.forgotPassword(this.state.email)
      .catch(error => this.setState({ isError: true, errorStatusCode: error.message }))
      .then(responseJson => {
        if (!this.state.isError && responseJson.response) {
          this.setState({ message: responseJson.response })
        }
        else 
          this.setState({ message: "Error: Internal server error", email: "" });
      });
    }
    this.setState({ isError: false, errorStatusCode: 200 });
  };
  render() {
    return (
      <div>
        <p></p>
        <form>
          <h1 style={{ color: "black", marginTop: 180 }}>Forgot your password?</h1>
          <p></p>
          <p style={{ color: "black" }}>
            Enter your email and we will send you a link to reset your password
          </p>
          <text className="text-muted" class="text-danger" style={{ fontSize: 10 }}>
            {this.state.message}
          </text>
          <p></p>
          <label style={{ color: "black" }}>
            <input
              placeholder="Enter email"
              class="form-control"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </label>
          <p></p>
          <input
            className="btn btn-secondary btn-sm m-2"
            type="submit"
            value="Reset password"
            onClick={this.resetHandler}
          />
          <Link to="/">
          <button className="btn btn-secondary btn-sm m-2">
            Back to login
          </button>
        </Link>
        </form>
      </div>
    );
  }
}
export default Forgot;
