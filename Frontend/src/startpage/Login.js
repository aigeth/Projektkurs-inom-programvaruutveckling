import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Data from "../Data";

/** Login class, 
 * used to access the web application by entering an email and password. 
 * Pressing the "Forgot password?" button redirects the user to the "Forgot Password" page.
 * 
 * @author Kamile Juvencius
 */
class Login extends React.Component {
  /* Initializes the states. */
  constructor(props) {
    super(props);
    this.state = { eMail: "", password: "", message: "", isError: false, errorStatusCode: 200 };
  }
  /* Whenever the user types something in the form this function will be called
    and change the state of the eMail and password. */
  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /* This function is called when the user presses 'submit'. A call to the backend
    is made to check if the email and password are correct, if the information is
    correct, the user will successfully log in.
    If not, the text 'Incorrect email or password' will be displayed. If the server 
    is not responding an error message will appear. */
  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.eMail.length === 0 || this.state.password.length === 0){
      this.setState({ message: "Error: Fields cannot be empty" });
    }
    else {
      var data = new Data();
      data.getToken(this.state.eMail, this.state.password)
        .catch(error => this.setState({ isError: true, errorStatusCode: error.message }))
        .then((responseJson) => {
          if (!this.state.isError) {
            localStorage.setItem("token", JSON.stringify(responseJson));
            data.getUser(this.state.eMail).then((responseJson) => {
              localStorage.setItem("user", JSON.stringify(responseJson));
              this.props.history.push("/menu/viewkeys");
            });
          } 
          else if (this.state.errorStatusCode == 400) {
            this.setState({ message: "Incorrect email or password" });
          }
          else {
            this.setState({ message: "Error: Internal server error", email: "" });
          }
        });
    }
    this.setState({ isError: false, errorStatusCode: 200 });
  };
  render() {
    return (
      <div>
        <p></p>
        <img
          alt="rawfury"
          src={require("./rawF.png")}
          style={{ blockSize: 180 }}
        />
        <form>
          <p></p>
          <text className="text-muted" class="text-danger" style={{ fontSize: 10 }}>
            {this.state.message}
          </text>
          <p></p>
          <label style={{ color: "black" }}>
            Email
            <input
              placeholder="Enter email"
              class="form-control"
              type="email"
              name="eMail"
              onChange={this.changeHandler}
            />
            <p></p>
            Password
            <input
              placeholder="Enter password"
              class="form-control"
              type="password"
              name="password"
              onChange={this.changeHandler}
            />
          </label>
          <p></p>
          <input
            className="btn btn-secondary btn-sm m-2"
            type="submit"
            value="Log in"
            onClick={this.submitHandler}
          />
          <Link to="/forgot">
            <button className="btn btn-secondary btn-sm m-2">
              Forgot password?
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
export default Login;
